import { AppProps } from 'next/app'
import '@style/global.scss'

export default function App ({ Component }: AppProps) {
  return <Component />
}