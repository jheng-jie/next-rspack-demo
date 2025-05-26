import { Config } from '@app/model/core/config'

export const getStaticProps = function () {
  return {
    props: {}
  }
}

export default function Home() {
  return <div className="bg-blue-500 text-white">Views B Home {Config.name}</div>
}