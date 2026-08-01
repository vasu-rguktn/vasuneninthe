import { HashRouter, Routes, Route } from 'react-router-dom'
import { PublicLayout } from './components/layout/PublicLayout'
import { Home } from './pages/Home'
import { WritersDesk } from './pages/WritersDesk'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        
        {/* Writer's Desk Dashboard (Auth is handled inside the component) */}
        <Route path="/writers-desk" element={<WritersDesk />} />
      </Routes>
    </HashRouter>
  )
}
