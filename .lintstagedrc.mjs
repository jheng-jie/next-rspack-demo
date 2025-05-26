export default {
  /**
   * Prettier
   */
  '*.{json,scss,md,ts,tsx,mjs}': async (files) => `prettier --write ${files.join(' ')}`,
  /**
   * ESLint
   */
  '*.{ts,tsx}': async (files) => `npx eslint --cache ${files.join(' ')}`,
}
