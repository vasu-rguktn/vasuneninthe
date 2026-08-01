import { Marginalia } from './Marginalia'
export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div id="marginalia" className="relative z-10 pt-24">
        <Marginalia />
      </div>
    </div>
  )
}
