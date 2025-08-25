import PWABadge from './PWABadge.tsx'
import Header from './layout/header.tsx'
import HomePage from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ColorProvider } from './contexts/ColorContext'
import './index.css'

function App() {
  return (
    <ColorProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container-custom py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              
            </Routes>
            <PWABadge />
          </div>
        </div>
      </Router>
    </ColorProvider>
  )
}


export default App
