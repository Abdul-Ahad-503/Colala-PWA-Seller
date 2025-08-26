import PWABadge from './PWABadge.tsx'
import Header from './layout/header.tsx'
import HomePage from './pages/Home'
import CreateStore from './pages/createstore/createstore.tsx'
import AddProduct from './pages/AddProduct'
import AddService from './pages/AddService'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ColorProvider } from './contexts/ColorContext'
import './index.css'

function App() {
  return (
    <ColorProvider>
      <Router>
        <Routes>
          <Route path="/createstore" element={
            <div className="min-h-screen bg-background">
              <Header />
              <CreateStore />
            </div>
          } />
          <Route path="/*" element={
            <div className="min-h-screen bg-background">
              <Header />
              <div className="container-custom py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
                <PWABadge />
              </div>
            </div>
          } />
        </Routes>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container-custom py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/add-service" element={<AddService />} />
            </Routes>
            <PWABadge />
          </div>
        </div>
      </Router>
    </ColorProvider>
  )
}


export default App
