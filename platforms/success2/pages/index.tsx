import { Config } from '@core/config'

export const getStaticProps = function () {
  return {
    props: {}
  }
}

export default function Home() {
  return <div className="bg-pink-500 text-white">No Views Home {Config.name}</div>
}