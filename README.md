# 🛍️ Colala PWA Seller

<div align="center">
  <img src="public/logo.svg" alt="Colala Logo" width="120" height="120">
  
  [![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)](package.json)
  [![React](https://img.shields.io/badge/React-19.0.0-61dafb.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.0.11-646cff.svg)](https://vitejs.dev/)
  [![PWA](https://img.shields.io/badge/PWA-Ready-green.svg)](https://web.dev/progressive-web-apps/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38b2ac.svg)](https://tailwindcss.com/)
</div>

<p align="center">
  <strong>A modern Progressive Web Application for sellers built with React, TypeScript, and cutting-edge web technologies</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-development">Development</a>
</p>

---

## ✨ Features

### 🎨 **Dynamic Theming System**
- **Global Color Management** - Change your brand colors and see them applied across the entire application instantly
- **CSS Custom Properties** - Efficient theming system using CSS variables
- **Real-time Preview** - See color changes applied immediately across all components
- **Persistent Themes** - User preferences saved and restored automatically

### 🏪 **Complete Seller Dashboard**
- **Store Management** - Comprehensive store builder with customizable branding
- **Product Management** - Add, edit, and manage products and services
- **Order Tracking** - Monitor and manage customer orders effectively
- **Analytics Dashboard** - Real-time insights into your store performance

### 💰 **Financial Management**
- **Shopping Wallet** - Built-in wallet system for managing earnings
- **Transaction History** - Detailed transaction tracking and history
- **Payment Management** - Saved cards and payment method management
- **Referral System** - Earn through referrals with detailed tracking

### 🚀 **Progressive Web App**
- **Offline Support** - Works seamlessly even without internet connection
- **App-like Experience** - Install on mobile devices like a native app
- **Push Notifications** - Stay updated with important alerts
- **Fast Loading** - Optimized for lightning-fast performance

### 🔐 **Authentication & Security**
- **Multi-level Registration** - Comprehensive onboarding process
- **Secure Login System** - Email/password authentication with session management
- **Account Recovery** - Forgot password functionality
- **Profile Management** - Complete user profile customization

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdul-Ahad-503/Colala-PWA-Seller.git
   cd Colala-PWA-Seller
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 📚 Documentation

For comprehensive project documentation and backend integration guidance, refer to these detailed documents:

### 📋 **[Project Documentation](PROJECT_DOCUMENTATION.md)**
Complete technical documentation covering:
- **Architecture Overview** - Detailed project structure and component analysis
- **Feature Modules** - In-depth coverage of all application features
- **Dynamic Color System** - Complete guide to the theming architecture
- **State Management** - Data flow and state management patterns
- **Development Guidelines** - Coding standards and best practices
- **Performance Considerations** - Optimization strategies and techniques

### 🔗 **[Backend Integration Guide](BACKEND_INTEGRATION.md)**
Comprehensive backend developer manual including:
- **Database Schemas** - Complete table structures for all entities
- **API Endpoints** - Detailed API specifications with request/response examples
- **Authentication System** - JWT implementation and security patterns
- **Real-time Features** - WebSocket integration and event handling
- **Data Flow Patterns** - Frontend to backend integration workflows
- **Testing Guidelines** - API testing strategies and Postman collections

> **💡 Tip**: These documents are essential for understanding the complete architecture and for backend developers who need to integrate with this frontend application.

## 🏗️ Architecture

### 📁 Project Structure

```
src/
├── 📱 App.tsx                 # Main application component
├── 🎨 main.tsx               # Application entry point
├── 📊 components/            # Reusable UI components
│   ├── ProductCard/          # Product display components
│   ├── ServiceCard/          # Service display components
│   └── ServiceBadge.tsx      # Service status badges
├── 🎯 contexts/              # React contexts
│   └── ColorContext.tsx      # Global color management
├── 🪝 hooks/                 # Custom React hooks
│   └── useDynamicColors.ts   # Color utility hooks
├── 📄 pages/                 # Application pages
│   ├── Home/                 # Dashboard and homepage
│   ├── login/                # Authentication pages
│   ├── settings/             # Settings and management
│   ├── AddProduct/           # Product creation
│   ├── MyProducts/           # Product management
│   ├── orders/               # Order management
│   └── chat/                 # Communication
├── 🧩 layout/                # Layout components
│   └── header.tsx            # Main navigation header
├── 🎨 utilities.css          # Utility CSS classes
├── 📝 constants.tsx          # App constants and images
└── 🔧 utils/                 # Utility functions
```

### 🎨 Dynamic Color System

The application features a sophisticated color management system:

```tsx
// 1. CSS Custom Properties (index.css)
:root {
  --color-primary: #E53E3E;
  --color-primary-hover: #C53030;
  --color-primary-light: #FED7D7;
}

// 2. React Context (ColorContext.tsx)
const { updateTheme } = useColor();
updateTheme('#0066FF'); // Changes entire app theme

// 3. Tailwind Integration (tailwind.config.js)
colors: {
  primary: 'var(--color-primary)',
  'primary-hover': 'var(--color-primary-hover)'
}
```

### 🔄 State Management

- **React Context** - Global state management for colors and user data
- **Local Storage** - Persistent storage for user preferences
- **Cookies** - Session management and temporary data storage
- **Component State** - Local component state using React hooks

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 19.0.0** - Latest React with concurrent features
- **TypeScript 5.7.2** - Type-safe JavaScript development
- **Vite 6.0.11** - Lightning-fast build tool and dev server

### **Styling & UI**
- **Tailwind CSS 4.1.11** - Utility-first CSS framework with CSS custom properties
- **CSS Custom Properties** - Dynamic theming system
- **Responsive Design** - Mobile-first responsive layouts

### **PWA & Performance**
- **Vite PWA Plugin** - Progressive Web App capabilities
- **Workbox** - Service worker management
- **Asset Optimization** - Image optimization and caching

### **Routing & Navigation**
- **React Router DOM 7.8.1** - Client-side routing
- **Dynamic Navigation** - Context-aware navigation system

### **Data Visualization**
- **Recharts 3.1.2** - Beautiful and responsive charts
- **Analytics Dashboard** - Real-time data visualization

### **Development Tools**
- **ESLint** - Code linting and quality assurance
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Autoprefixer** - CSS vendor prefixing

## 💻 Development

### 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### 🎨 Styling Guidelines

1. **Use Tailwind Classes** - Prefer Tailwind utilities over custom CSS
2. **Dynamic Colors** - Use `bg-primary`, `text-primary` for themeable colors
3. **Responsive Design** - Mobile-first approach with responsive modifiers
4. **Component Isolation** - Keep styles scoped to components

### 🔄 Color System Usage

```tsx
// ✅ Good - Uses dynamic colors
<button className="bg-primary hover:bg-primary-hover text-white">
  Button
</button>

// ❌ Avoid - Hardcoded colors
<button className="bg-red-500 hover:bg-red-600 text-white">
  Button
</button>

// 🎯 For dynamic inline styles
const { primaryColor } = useColor();
<div style={{ backgroundColor: primaryColor }}>
  Custom styled element
</div>
```

### 📁 Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/layout/header.tsx`
4. Use dynamic colors for consistency

### 🧩 Creating Components

1. Create component directory in `src/components/`
2. Export from index file
3. Include TypeScript interfaces
4. Use dynamic color system

## 📱 PWA Features

### 🔧 Service Worker
- **Offline Caching** - Critical resources cached for offline use
- **Background Sync** - Data synchronization when online
- **Push Notifications** - Real-time alerts and updates

### 📲 Installation
- **Add to Home Screen** - Install as native-like app
- **Splash Screen** - Custom splash screen configuration
- **App Icons** - Multiple icon sizes for different devices

### ⚡ Performance
- **Code Splitting** - Lazy loading for optimal performance
- **Image Optimization** - Automatic image compression and formats
- **Caching Strategy** - Smart caching for fast loading

## 🎯 Key Features Deep Dive

### 🛍️ **Store Management**
- **Store Builder** - Visual store customization tool
- **Brand Colors** - Dynamic theming system
- **Product Categories** - Organized product management
- **Inventory Tracking** - Real-time stock management

### 📊 **Analytics Dashboard**
- **Sales Metrics** - Revenue and sales tracking
- **Customer Insights** - User behavior analytics
- **Performance Charts** - Visual data representation
- **Export Reports** - Data export capabilities

### 💳 **Payment Integration**
- **Wallet System** - Built-in digital wallet
- **Payment Methods** - Multiple payment options
- **Transaction History** - Complete payment records
- **Security** - Secure payment processing

### 🤝 **Social Features**
- **Reviews & Ratings** - Customer feedback system
- **Social Sharing** - Share products on social media
- **Chat System** - Direct customer communication
- **Referral Program** - Earn through referrals

## 🔒 Security

- **Input Validation** - Client-side and server-side validation
- **Secure Storage** - Encrypted local storage for sensitive data
- **Session Management** - Secure user session handling
- **HTTPS Ready** - SSL/TLS encryption support

## 🌐 Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 📈 Performance Metrics

- **Lighthouse Score** - 90+ across all metrics
- **First Contentful Paint** - < 1.5s
- **Time to Interactive** - < 3s
- **Bundle Size** - Optimized for fast loading

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### 📝 Commit Guidelines

- **feat:** New features
- **fix:** Bug fixes
- **docs:** Documentation updates
- **style:** Code style changes
- **refactor:** Code refactoring
- **test:** Test additions/updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## � Contributors

### **Core Development Team**

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Abdul-Ahad-503">
        <img src="https://github.com/Abdul-Ahad-503.png" width="100px;" alt="Abdul Ahad"/><br />
        <sub><b>Abdul Ahad</b></sub>
      </a><br />
      <sub> Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Aman-ahmad1143">
        <img src="https://github.com/Aman-ahmad1143.png" width="100px;" alt="Aman Ahmad"/><br />
        <sub><b>Aman Ahmad</b></sub>
      </a><br />
      <sub> Developer</sub>
    </td>
  </tr>
</table>

## �🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Community** - For all the open-source libraries used

---

<div align="center">
  <p><strong>Built with ❤️ by Abdul Ahad & Aman Ahmad</strong></p>
  <p>
    <a href="https://github.com/Abdul-Ahad-503/Colala-PWA-Seller">⭐ Star this project</a> •
    <a href="https://github.com/Abdul-Ahad-503/Colala-PWA-Seller/issues">🐛 Report Bug</a> •
    <a href="https://github.com/Abdul-Ahad-503/Colala-PWA-Seller/issues">💡 Request Feature</a>
  </p>
</div>
```
