import { Config } from '@core/config'

export const getStaticProps = function () {
  return {
    props: {},
  }
}

export default function Home() {
  return <div className="bg-red-500 text-white">Views A Home {Config.name}</div>
}
