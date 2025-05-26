import createBundleAnalyzer from '@next/bundle-analyzer'
import StatoscopeWebpackPlugin from '@statoscope/webpack-plugin'
import withRspack from 'next-rspack'

const isDev = process.env.NODE_ENV === 'development'

const withPWA = (config) => withRspack(config)

/** Analyze */
const withBundleAnalyzer = createBundleAnalyzer({ enabled: process.env.ANALYZE === 'true', analyzerMode: 'static' })

/** @param {import('next').NextConfig & { replacement?: Map<RegExp,string> }} config */
export const withConfig = async (config = {}) => {
  const originConfig = { ...config }

  return withPWA(
    withBundleAnalyzer({
      output: !isDev ? 'export' : undefined,

      // Use eslint v9
      eslint: {
        ignoreDuringBuilds: true,
      },

      // URL locale trailing slash
      trailingSlash: !isDev,

      ...originConfig,

      transpilePackages: ['@tanstack', 'react-konva', '@date-fns', ...(originConfig?.transpilePackages || [])],

      //Remove console logs in production
      compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
      },

      /** Webpack Options */
      webpack(webpackConfig, options) {
        webpackConfig.resolve.fallback = { fs: false, path: false }

        /** Combine Platform */
        if (config.webpack) webpackConfig = config.webpack(webpackConfig, options)

        // Add .proto
        webpackConfig.module.rules.push({
          test: /\.proto$/,
          type: 'asset/source',
        })

        /** Analyze */
        if (process.env.ANALYZE === 'true') {
          const StatoscopeWebpack = StatoscopeWebpackPlugin.default
          webpackConfig.plugins.push(new StatoscopeWebpack())
        }

        /** SVG React Component */
        const fileLoaderRule = webpackConfig.module.rules.find((rule) => rule.test?.test?.('.svg'))
        webpackConfig.module.rules.push(
          // Default use Component for *.svg?url
          {
            ...fileLoaderRule,
            test: /\.svg$/i,
            resourceQuery: /url$/, // *.svg?url
          },
          // Convert all other *.svg imports to React components
          {
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url$/] }, // exclude if *.svg?url
            use: [{ loader: '@svgr/webpack', options: { dimensions: false } }],
          },
        )
        fileLoaderRule.exclude = /\.svg$/i

        return webpackConfig
      },
    }),
  )
}
