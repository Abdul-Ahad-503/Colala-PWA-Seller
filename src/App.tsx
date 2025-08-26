import PWABadge from './PWABadge.tsx'
import Header from './layout/header.tsx'
import HomePage from './pages/Home'
// <<<<<<< HEAD
import CreateStore from './pages/createstore/createstore.tsx'

// =======
import AddProduct from './pages/AddProduct'
import AddService from './pages/AddService'
// >>>>>>> ca6fea2ee553f466862d3561b7bdeb468528c26d
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
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/add-service" element={<AddService />} />
              <Route path="/createstore" element={<CreateStore />} />
            </Routes>
            <PWABadge />
          </div>
        </div>
      </Router>
    </ColorProvider>
  )
}


export default App
