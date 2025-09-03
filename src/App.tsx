import PWABadge from './PWABadge.tsx'
import Header from './layout/header.tsx'
import HomePage from './pages/Home'
import CreateStore from './pages/createstore/createstore.tsx'
import AddProduct from './pages/AddProduct'
import AddService from './pages/AddService'
import MyProducts from './pages/MyProducts'
import ProductDetails from './pages/ProductDetails'
import ServiceDetails from './pages/ServiceDetails'
import BoostProduct from './pages/BoostProduct'
import AdPreview from './pages/BoostProduct/AdPreview'
import Settings from './pages/settings/Settings'
import SavedItems from './pages/settings/SavedItems'
import FollowedStores from './pages/settings/FollowedStores'
import Reviews from './pages/settings/Reviews'
import Referrals from './pages/settings/Referrals'
import Support from './pages/settings/Support'
import FAQs from './pages/settings/FAQs'
import LoyaltyPoints from './pages/settings/LoyaltyPoints'
import SellerLeaderboard from './pages/settings/SellerLeaderboard'
import SavedAddresses from './pages/settings/SavedAddresses'
import Analytics from './pages/settings/Analytics'
import Subscriptions from './pages/settings/Subscriptions'
import PromotedProducts from './pages/settings/PromotedProducts'
import PromotionDetails from './pages/settings/PromotionDetails'
import Announcements from './pages/settings/Announcements'
import AccountAccessControl from './pages/settings/AccountAccessControl'
import MyProductsServices from './pages/settings/MyProductsServices'
import ShoppingWallet from './pages/settings/ShoppingWallet'
import TransactionDetails from './pages/settings/TransactionDetails'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ColorProvider } from './contexts/ColorContext'
import './index.css'
import Chat from './pages/chat/chat';
import Feed from './pages/feed/Feed';
import OrderDetails from './pages/orders/OrderDetails.tsx';

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
              <Route path="/service-details/:serviceId" element={<ServiceDetails />} />
              <Route path="/boost-product" element={<BoostProduct />} />
              <Route path="/boost-product/preview" element={<AdPreview />} />
              <Route path="/createstore" element={<CreateStore />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/orders" element={<OrderDetails />} />
              <Route path="/settings" element={<Settings />}>
                <Route path="analytics" element={<Analytics />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="promoted-products" element={<PromotedProducts />} />
                <Route path="promotion-details/:productId" element={<PromotionDetails />} />
                <Route path="announcements" element={<Announcements />} />
                <Route path="My-Products" element={<MyProductsServices />} />
                <Route path="shopping-wallet" element={<ShoppingWallet />} />
                <Route path="transaction-details" element={<TransactionDetails />} />
                <Route path="saved-items" element={<SavedItems />} />
                <Route path="saved-addresses" element={<SavedAddresses />} />
                <Route path="followed-stores" element={<FollowedStores />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="referrals" element={<Referrals />} />
                <Route path="support" element={<Support />} />
                <Route path="faqs" element={<FAQs />} />
                <Route path="loyalty-points" element={<LoyaltyPoints />} />
                <Route path="seller-leaderboard" element={<SellerLeaderboard />} />
                <Route path="account-access-control" element={<AccountAccessControl />} />
              </Route>
            </Routes>
            <PWABadge />
          </div>
        </div>
      </Router>
    </ColorProvider>
  )
}


export default App
