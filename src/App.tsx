import PWABadge from './PWABadge.tsx'
import Header from './layout/header.tsx'
import HomePage from './pages/Home'
import CreateStore from './pages/createstore/createstore.tsx'
import AddProduct from './pages/AddProduct'
import AddService from './pages/AddService'
import MyProducts from './pages/MyProducts'
import ProductDetails from './pages/ProductDetails'
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
              <Route path="/my-products" element={<MyProducts />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
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
