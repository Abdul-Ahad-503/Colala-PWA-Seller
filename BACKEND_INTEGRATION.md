# 🔗 Backend Integration Guide - Colala PWA Seller

## 🎯 **Backend Developer Integration Manual**

This document provides comprehensive guidance for backend developers to understand the frontend expectations, data models, API requirements, and integration patterns for the Colala PWA Seller application.

---

## 📊 **Database Schema Requirements**

### **👤 Users & Authentication Table Structure**

#### **1. Users Table (`users`)**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    
    -- Profile information
    avatar_url VARCHAR(500),
    bio TEXT,
    location VARCHAR(255),
    
    -- Business verification
    is_verified_seller BOOLEAN DEFAULT FALSE,
    verification_documents JSON,
    
    -- Settings and preferences
    notification_preferences JSON DEFAULT '{}',
    privacy_settings JSON DEFAULT '{}',
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC'
);
```

#### **2. Stores Table (`stores`)**
```sql
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic store information (from registerlevel1)
    store_name VARCHAR(255) NOT NULL,
    store_email VARCHAR(255),
    store_phone VARCHAR(20),
    store_location VARCHAR(255),
    category VARCHAR(100),
    
    -- Social media links
    whatsapp_link VARCHAR(255),
    instagram_link VARCHAR(255),
    facebook_link VARCHAR(255),
    twitter_link VARCHAR(255),
    
    -- Store media (from registerlevel2 & 3)
    profile_image_url VARCHAR(500),
    banner_image_url VARCHAR(500),
    store_video_url VARCHAR(500),
    
    -- Store configuration (from registerlevel4)
    store_address TEXT,
    delivery_pricing JSON, -- Complex pricing structure
    brand_color VARCHAR(7) DEFAULT '#E53E3E', -- Hex color
    
    -- Business details
    subcategories JSON, -- Array of selected subcategories
    business_documents JSON, -- KYC documents
    
    -- Store settings
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    subscription_tier ENUM('basic', 'premium', 'enterprise') DEFAULT 'basic',
    
    -- Analytics and metrics
    total_views BIGINT DEFAULT 0,
    total_orders BIGINT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    rating_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **🛍️ Products & Services Table Structure**

#### **3. Products Table (`products`)**
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    
    -- Basic product information
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    original_price DECIMAL(12,2), -- For discounts
    currency VARCHAR(3) DEFAULT 'NGN',
    
    -- Categorization
    category VARCHAR(100),
    subcategory VARCHAR(100),
    tags JSON, -- Array of product tags
    
    -- Inventory management
    quantity INTEGER DEFAULT 0,
    is_in_stock BOOLEAN DEFAULT TRUE,
    low_stock_threshold INTEGER DEFAULT 5,
    sku VARCHAR(100) UNIQUE,
    
    -- Product media
    images JSON, -- Array of image URLs
    video_url VARCHAR(500),
    
    -- Product status and visibility
    status ENUM('active', 'inactive', 'pending', 'archived') DEFAULT 'active',
    is_featured BOOLEAN DEFAULT FALSE,
    is_sponsored BOOLEAN DEFAULT FALSE,
    
    -- SEO and metadata
    slug VARCHAR(255) UNIQUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Analytics
    view_count BIGINT DEFAULT 0,
    click_count BIGINT DEFAULT 0,
    purchase_count BIGINT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_products_store_id (store_id),
    INDEX idx_products_category (category),
    INDEX idx_products_status (status),
    INDEX idx_products_featured (is_featured),
    INDEX idx_products_sponsored (is_sponsored)
);
```

#### **4. Services Table (`services`)**
```sql
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    
    -- Basic service information
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_range_min DECIMAL(12,2),
    price_range_max DECIMAL(12,2),
    currency VARCHAR(3) DEFAULT 'NGN',
    
    -- Service categorization
    category VARCHAR(100),
    subcategory VARCHAR(100),
    service_type ENUM('hourly', 'fixed', 'package') DEFAULT 'fixed',
    
    -- Service details
    duration_estimate VARCHAR(100), -- e.g., "2-3 hours", "1 week"
    service_areas JSON, -- Geographic areas served
    
    -- Media
    images JSON,
    portfolio_images JSON,
    
    -- Availability
    is_available BOOLEAN DEFAULT TRUE,
    availability_schedule JSON, -- Working hours/days
    
    -- Analytics
    view_count BIGINT DEFAULT 0,
    inquiry_count BIGINT DEFAULT 0,
    booking_count BIGINT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **🛒 Orders & Transactions Table Structure**

#### **5. Orders Table (`orders`)**
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Relationships
    buyer_id UUID NOT NULL REFERENCES users(id),
    store_id UUID NOT NULL REFERENCES stores(id),
    
    -- Order details
    subtotal DECIMAL(12,2) NOT NULL,
    delivery_fee DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'NGN',
    
    -- Order status tracking
    status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    
    -- Delivery information
    delivery_address JSON, -- Full address object
    delivery_method VARCHAR(100),
    estimated_delivery DATE,
    actual_delivery TIMESTAMP,
    tracking_number VARCHAR(100),
    
    -- Customer information
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20),
    customer_email VARCHAR(255),
    
    -- Additional details
    notes TEXT,
    customer_code VARCHAR(20), -- For order verification
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_orders_buyer_id (buyer_id),
    INDEX idx_orders_store_id (store_id),
    INDEX idx_orders_status (status),
    INDEX idx_orders_payment_status (payment_status),
    INDEX idx_orders_created_at (created_at)
);
```

#### **6. Order Items Table (`order_items`)**
```sql
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    service_id UUID REFERENCES services(id),
    
    -- Item details at time of purchase
    item_name VARCHAR(255) NOT NULL,
    item_price DECIMAL(12,2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    total_price DECIMAL(12,2) NOT NULL,
    
    -- Snapshot of item at purchase time
    item_snapshot JSON, -- Product/service details when ordered
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **💰 Financial & Wallet System Tables**

#### **7. Wallets Table (`wallets`)**
```sql
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Wallet balances
    available_balance DECIMAL(12,2) DEFAULT 0.00,
    pending_balance DECIMAL(12,2) DEFAULT 0.00,
    total_earnings DECIMAL(12,2) DEFAULT 0.00,
    total_withdrawals DECIMAL(12,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'NGN',
    
    -- Wallet settings
    auto_withdrawal_enabled BOOLEAN DEFAULT FALSE,
    min_withdrawal_amount DECIMAL(12,2) DEFAULT 1000.00,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY idx_user_wallet (user_id)
);
```

#### **8. Transactions Table (`transactions`)**
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    wallet_id UUID NOT NULL REFERENCES wallets(id),
    
    -- Transaction details
    type ENUM('credit', 'debit') NOT NULL,
    category ENUM('sale', 'withdrawal', 'refund', 'fee', 'bonus', 'referral') NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'NGN',
    
    -- Transaction status
    status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    
    -- References
    order_id UUID REFERENCES orders(id),
    reference_id VARCHAR(100), -- External payment reference
    
    -- Additional information
    description TEXT,
    metadata JSON, -- Additional transaction data
    
    -- Timestamps
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_transactions_user_id (user_id),
    INDEX idx_transactions_wallet_id (wallet_id),
    INDEX idx_transactions_type (type),
    INDEX idx_transactions_category (category),
    INDEX idx_transactions_status (status),
    INDEX idx_transactions_created_at (created_at)
);
```

### **🤝 Social Features Tables**

#### **9. Feed Posts Table (`feed_posts`)**
```sql
CREATE TABLE feed_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES users(id),
    store_id UUID REFERENCES stores(id),
    
    -- Post content
    caption TEXT,
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    
    -- Post metrics
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    
    -- Post settings
    is_promoted BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    visibility ENUM('public', 'followers', 'private') DEFAULT 'public',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_feed_posts_author_id (author_id),
    INDEX idx_feed_posts_store_id (store_id),
    INDEX idx_feed_posts_created_at (created_at)
);
```

#### **10. Comments Table (`comments`)**
```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES feed_posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id),
    parent_comment_id UUID REFERENCES comments(id), -- For replies
    
    -- Comment content
    content TEXT NOT NULL,
    
    -- Comment metrics
    likes_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_comments_post_id (post_id),
    INDEX idx_comments_author_id (author_id),
    INDEX idx_comments_parent_comment_id (parent_comment_id)
);
```

---

## 🔌 **API Endpoints Specification**

### **🔐 Authentication Endpoints**

#### **POST `/api/auth/register`**
```json
{
  "endpoint": "/api/auth/register",
  "method": "POST",
  "description": "Multi-level registration system",
  "request_body": {
    "level": 1, // 1-4 for different registration levels
    "data": {
      // Level 1: Basic store information
      "storeName": "string",
      "storeEmail": "string",
      "storePhone": "string",
      "storeLocation": "string", 
      "category": "string",
      "whatsappLink": "string?",
      "instagramLink": "string?",
      "facebookLink": "string?",
      "twitterLink": "string?"
    }
  },
  "response": {
    "success": true,
    "data": {
      "userId": "uuid",
      "storeId": "uuid",
      "nextLevel": 2,
      "completionPercentage": 25
    }
  }
}
```

#### **POST `/api/auth/login`**
```json
{
  "endpoint": "/api/auth/login",
  "method": "POST",
  "request_body": {
    "email": "string",
    "password": "string",
    "rememberMe": "boolean?"
  },
  "response": {
    "success": true,
    "data": {
      "user": {
        "id": "uuid",
        "email": "string",
        "fullName": "string",
        "store": {
          "id": "uuid",
          "storeName": "string",
          "brandColor": "string",
          "isActive": "boolean"
        }
      },
      "tokens": {
        "accessToken": "string",
        "refreshToken": "string",
        "expiresIn": 3600
      }
    }
  }
}
```

### **🏪 Store Management Endpoints**

#### **PUT `/api/stores/{storeId}/theme`**
```json
{
  "endpoint": "/api/stores/{storeId}/theme",
  "method": "PUT",
  "description": "Update store brand color theme",
  "headers": {
    "Authorization": "Bearer {accessToken}",
    "Content-Type": "application/json"
  },
  "request_body": {
    "brandColor": "#0066FF", // Hex color code
    "applyToProducts": true, // Apply to existing products
    "notifyCustomers": false // Send theme update notification
  },
  "response": {
    "success": true,
    "data": {
      "storeId": "uuid",
      "brandColor": "#0066FF",
      "updatedAt": "2025-09-04T10:30:00Z"
    }
  }
}
```

#### **GET `/api/stores/{storeId}/analytics`**
```json
{
  "endpoint": "/api/stores/{storeId}/analytics",
  "method": "GET",
  "description": "Comprehensive store analytics data",
  "query_parameters": {
    "period": "7d|30d|90d|1y", // Time period
    "metrics": "views,sales,revenue,customers", // Comma-separated metrics
    "granularity": "day|week|month" // Data granularity
  },
  "response": {
    "success": true,
    "data": {
      "overview": {
        "totalViews": 15420,
        "totalSales": 245,
        "totalRevenue": 1250000,
        "totalCustomers": 189,
        "conversionRate": 1.59
      },
      "trends": [
        {
          "date": "2025-09-01",
          "views": 320,
          "sales": 12,
          "revenue": 65000
        }
      ],
      "topProducts": [
        {
          "productId": "uuid",
          "name": "Product Name",
          "sales": 45,
          "revenue": 225000
        }
      ],
      "customerInsights": {
        "averageOrderValue": 51020,
        "repeatCustomerRate": 0.32,
        "topLocations": ["Lagos", "Abuja", "Port Harcourt"]
      }
    }
  }
}
```

### **🛍️ Product Management Endpoints**

#### **POST `/api/products`**
```json
{
  "endpoint": "/api/products",
  "method": "POST",
  "description": "Create new product",
  "headers": {
    "Authorization": "Bearer {accessToken}",
    "Content-Type": "multipart/form-data"
  },
  "request_body": {
    "name": "string",
    "description": "string",
    "price": "number",
    "originalPrice": "number?",
    "category": "string",
    "subcategory": "string",
    "quantity": "number",
    "images": "File[]", // Multiple image files
    "video": "File?", // Optional video file
    "tags": "string[]",
    "isFeatured": "boolean?"
  },
  "response": {
    "success": true,
    "data": {
      "product": {
        "id": "uuid",
        "name": "string",
        "slug": "string",
        "price": "number",
        "images": ["url1", "url2"],
        "status": "active",
        "createdAt": "timestamp"
      }
    }
  }
}
```

#### **GET `/api/products`**
```json
{
  "endpoint": "/api/products",
  "method": "GET",
  "description": "Get products with filtering and pagination",
  "query_parameters": {
    "storeId": "uuid?", // Filter by store
    "category": "string?",
    "status": "active|inactive|all",
    "isSponsored": "boolean?",
    "isOutOfStock": "boolean?",
    "search": "string?",
    "sortBy": "name|price|created_at|views",
    "sortOrder": "asc|desc",
    "page": "number",
    "limit": "number"
  },
  "response": {
    "success": true,
    "data": {
      "products": [
        {
          "id": "uuid",
          "name": "string",
          "price": "number",
          "originalPrice": "number?",
          "images": ["url"],
          "isSponsored": "boolean",
          "isOutOfStock": "boolean",
          "analytics": {
            "viewCount": "number",
            "clickCount": "number",
            "purchaseCount": "number"
          }
        }
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 10,
        "totalItems": 95,
        "itemsPerPage": 10
      }
    }
  }
}
```

### **💰 Financial & Wallet Endpoints**

#### **GET `/api/wallet/balance`**
```json
{
  "endpoint": "/api/wallet/balance",
  "method": "GET",
  "description": "Get current wallet balance and summary",
  "headers": {
    "Authorization": "Bearer {accessToken}"
  },
  "response": {
    "success": true,
    "data": {
      "wallet": {
        "availableBalance": 125000.00,
        "pendingBalance": 25000.00,
        "totalEarnings": 500000.00,
        "totalWithdrawals": 350000.00,
        "currency": "NGN"
      },
      "recentTransactions": [
        {
          "id": "uuid",
          "type": "credit",
          "category": "sale",
          "amount": 5000.00,
          "description": "Product sale - iPhone 13",
          "status": "completed",
          "createdAt": "2025-09-04T08:30:00Z"
        }
      ]
    }
  }
}
```

#### **POST `/api/wallet/withdraw`**
```json
{
  "endpoint": "/api/wallet/withdraw",
  "method": "POST",
  "description": "Request withdrawal from wallet",
  "request_body": {
    "amount": 50000.00,
    "bankDetails": {
      "bankName": "string",
      "accountNumber": "string",
      "accountName": "string",
      "bankCode": "string?"
    },
    "description": "string?"
  },
  "response": {
    "success": true,
    "data": {
      "transactionId": "uuid",
      "amount": 50000.00,
      "processingFee": 150.00,
      "netAmount": 49850.00,
      "status": "pending",
      "estimatedProcessingTime": "2-5 business days"
    }
  }
}
```

### **📱 Social Feed Endpoints**

#### **GET `/api/feed/posts`**
```json
{
  "endpoint": "/api/feed/posts",
  "method": "GET",
  "description": "Get paginated feed posts",
  "query_parameters": {
    "page": "number",
    "limit": "number",
    "userId": "uuid?", // Filter by specific user
    "storeId": "uuid?" // Filter by specific store
  },
  "response": {
    "success": true,
    "data": {
      "posts": [
        {
          "id": "uuid",
          "author": {
            "id": "uuid",
            "name": "string",
            "avatar": "url",
            "storeName": "string?"
          },
          "caption": "string",
          "image": "url?",
          "video": "url?",
          "metrics": {
            "likes": "number",
            "comments": "number",
            "shares": "number",
            "views": "number"
          },
          "userInteractions": {
            "isLiked": "boolean",
            "isShared": "boolean"
          },
          "createdAt": "timestamp"
        }
      ],
      "pagination": {
        "hasNext": "boolean",
        "nextCursor": "string?"
      }
    }
  }
}
```

#### **POST `/api/feed/posts/{postId}/like`**
```json
{
  "endpoint": "/api/feed/posts/{postId}/like",
  "method": "POST",
  "description": "Toggle like on a post",
  "headers": {
    "Authorization": "Bearer {accessToken}"
  },
  "response": {
    "success": true,
    "data": {
      "isLiked": true,
      "likesCount": 156
    }
  }
}
```

---

## 🔄 **Data Flow & Integration Patterns**

### **📊 Frontend to Backend Data Flow**

#### **1. Registration Flow Integration**
```javascript
/**
 * Frontend Registration Process:
 * 
 * Level 1: Basic Information
 * - Collect: storeName, email, phone, location, category, social links
 * - Upload: profile image, banner image, business documents
 * - API Call: POST /api/auth/register (level: 1)
 * 
 * Level 2: Category Selection
 * - Collect: subcategories array, business type
 * - API Call: PUT /api/stores/{storeId}/categories
 * 
 * Level 3: Media Upload
 * - Upload: store video, additional promotional content
 * - API Call: POST /api/stores/{storeId}/media
 * 
 * Level 4: Final Configuration
 * - Collect: store address, delivery pricing, brand color
 * - API Call: PUT /api/stores/{storeId}/configuration
 * - Trigger: Global theme update via ColorContext
 */
```

#### **2. Dynamic Color System Integration**
```javascript
/**
 * Color Change Workflow:
 * 
 * Frontend:
 * 1. User selects color in StoreBuilder/Registration
 * 2. ColorContext.updateTheme(newColor) called
 * 3. CSS custom properties updated immediately
 * 4. Color persisted to localStorage
 * 
 * Backend Integration:
 * 5. API call: PUT /api/stores/{storeId}/theme
 * 6. Database updated with new brand color
 * 7. Optional: Apply to existing products
 * 8. Optional: Notify customers of brand update
 */
```

### **📱 Real-time Features Integration**

#### **WebSocket Events for Real-time Updates**
```javascript
/**
 * WebSocket Connection Setup:
 * - Connect on user login: ws://api.domain.com/ws?token={accessToken}
 * - Subscribe to user-specific events
 * - Handle reconnection logic for PWA offline/online states
 */

// Frontend WebSocket Event Handlers
const websocketEvents = {
  // New order received
  'order.created': (data) => {
    // Update order notifications
    // Show toast notification
    // Update order count in header
  },
  
  // Payment confirmed
  'payment.confirmed': (data) => {
    // Update wallet balance
    // Show success notification
    // Update transaction history
  },
  
  // Feed interactions
  'feed.like': (data) => {
    // Update like count in real-time
    // Show interaction notification
  },
  
  // Chat messages
  'chat.message': (data) => {
    // Update chat interface
    // Show message notification
    // Update unread count
  }
};
```

---

## 🔧 **Backend Implementation Guidelines**

### **🚀 Performance Optimization**

#### **Database Indexing Strategy**
```sql
-- Critical indexes for performance
CREATE INDEX idx_products_store_category ON products(store_id, category, status);
CREATE INDEX idx_orders_store_status_date ON orders(store_id, status, created_at);
CREATE INDEX idx_transactions_user_type_date ON transactions(user_id, type, created_at);
CREATE INDEX idx_feed_posts_author_created ON feed_posts(author_id, created_at);

-- Full-text search indexes
CREATE FULLTEXT INDEX idx_products_search ON products(name, description);
CREATE FULLTEXT INDEX idx_stores_search ON stores(store_name, store_location);
```

#### **Caching Strategy**
```javascript
/**
 * Redis Caching Pattern:
 * 
 * 1. User sessions: redis.set(`session:${userId}`, sessionData, 3600)
 * 2. Store analytics: redis.set(`analytics:${storeId}:${period}`, data, 1800)
 * 3. Popular products: redis.set(`trending:products`, productList, 900)
 * 4. Feed posts: redis.set(`feed:${userId}`, posts, 300)
 */
```

### **🔐 Security Implementation**

#### **Authentication & Authorization**
```javascript
/**
 * JWT Token Structure:
 * {
 *   "sub": "user_id",
 *   "email": "user@example.com",
 *   "store_id": "store_uuid",
 *   "role": "seller",
 *   "permissions": ["read:store", "write:products", "read:analytics"],
 *   "iat": timestamp,
 *   "exp": timestamp
 * }
 */

// Middleware for route protection
const authMiddleware = {
  requireAuth: (req, res, next) => {
    // Verify JWT token
    // Set req.user
  },
  
  requireStore: (req, res, next) => {
    // Verify user owns the store
    // Check store permissions
  },
  
  requireVerification: (req, res, next) => {
    // Check if seller is verified
    // Block sensitive operations for unverified sellers
  }
};
```

#### **File Upload Security**
```javascript
/**
 * File Upload Configuration:
 * 
 * 1. Size limits: 5MB for images, 50MB for videos
 * 2. File type validation: MIME type checking
 * 3. Virus scanning: Integrate with ClamAV or similar
 * 4. Content validation: Check image dimensions, video duration
 * 5. CDN integration: Upload to AWS S3/CloudFront
 */
```

### **📊 Analytics Data Processing**

#### **Data Aggregation Pipeline**
```sql
-- Daily analytics aggregation (run daily via cron)
INSERT INTO daily_analytics (store_id, date, total_views, total_sales, total_revenue)
SELECT 
    p.store_id,
    CURRENT_DATE - INTERVAL 1 DAY,
    SUM(p.view_count),
    COUNT(DISTINCT o.id),
    SUM(o.total_amount)
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id
WHERE DATE(o.created_at) = CURRENT_DATE - INTERVAL 1 DAY
GROUP BY p.store_id;
```

---

## 📧 **Email & Notification System**

### **Email Templates Required**

#### **1. Registration & Verification**
```html
<!-- Welcome Email Template -->
<div class="email-template">
  <h1>Welcome to Colala, {{storeName}}!</h1>
  <p>Thank you for joining our platform. Your store registration is {{completionStatus}}.</p>
  
  {{#if needsVerification}}
  <a href="{{verificationLink}}" class="cta-button">Complete Verification</a>
  {{/if}}
  
  <div class="next-steps">
    <h2>Next Steps:</h2>
    <ul>
      <li>Upload your products</li>
      <li>Customize your store appearance</li>
      <li>Set up payment methods</li>
    </ul>
  </div>
</div>
```

#### **2. Order Notifications**
```html
<!-- New Order Email Template -->
<div class="email-template">
  <h1>New Order Received! 🎉</h1>
  <p>Order #{{orderNumber}} from {{customerName}}</p>
  
  <div class="order-summary">
    <h2>Order Details:</h2>
    {{#each items}}
    <div class="order-item">
      <span>{{name}} x {{quantity}}</span>
      <span>{{price}}</span>
    </div>
    {{/each}}
    <div class="total">Total: {{totalAmount}}</div>
  </div>
  
  <a href="{{orderDetailsLink}}" class="cta-button">View Order Details</a>
</div>
```

### **Push Notification Events**
```javascript
/**
 * Push Notification Triggers:
 * 
 * 1. New order received
 * 2. Payment confirmed
 * 3. Low stock alert
 * 4. Customer message received
 * 5. Weekly analytics summary
 * 6. Promotional opportunities
 */
```

---

## 🧪 **Testing & API Documentation**

### **API Testing Examples**

#### **Postman Collection Structure**
```javascript
/**
 * Colala Seller API Collection:
 * 
 * 1. Authentication
 *    - Register (Multi-level)
 *    - Login
 *    - Refresh Token
 *    - Logout
 * 
 * 2. Store Management
 *    - Get Store Details
 *    - Update Store Info
 *    - Update Brand Colors
 *    - Upload Store Media
 * 
 * 3. Product Management
 *    - Create Product
 *    - List Products
 *    - Update Product
 *    - Delete Product
 *    - Upload Product Images
 * 
 * 4. Order Management
 *    - List Orders
 *    - Get Order Details
 *    - Update Order Status
 *    - Generate Customer Code
 * 
 * 5. Financial
 *    - Get Wallet Balance
 *    - Request Withdrawal
 *    - Transaction History
 * 
 * 6. Analytics
 *    - Store Analytics
 *    - Product Performance
 *    - Customer Insights
 * 
 * 7. Social Features
 *    - Feed Posts
 *    - Comments
 *    - Likes/Interactions
 */
```

### **Error Response Format**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      },
      {
        "field": "price",
        "message": "Price must be greater than 0"
      }
    ]
  },
  "timestamp": "2025-09-04T10:30:00Z",
  "requestId": "req_123456789"
}
```

---

## 🔄 **Migration & Deployment Notes**

### **Database Migrations**
```sql
-- Migration: Add brand color support
ALTER TABLE stores ADD COLUMN brand_color VARCHAR(7) DEFAULT '#E53E3E';
ALTER TABLE stores ADD INDEX idx_stores_brand_color (brand_color);

-- Migration: Add analytics tables
CREATE TABLE daily_analytics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    store_id UUID NOT NULL,
    date DATE NOT NULL,
    total_views BIGINT DEFAULT 0,
    total_sales BIGINT DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0,
    UNIQUE KEY idx_store_date (store_id, date)
);
```

### **Environment Configuration**
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=colala_seller
DB_USER=colala_user
DB_PASSWORD=secure_password

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis_password

# File Storage
AWS_S3_BUCKET=colala-media
AWS_S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# Email Service
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@mail.colala.com
SMTP_PASSWORD=mailgun_password

# Push Notifications
FCM_SERVER_KEY=firebase_server_key
VAPID_PUBLIC_KEY=vapid_public_key
VAPID_PRIVATE_KEY=vapid_private_key

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=3600
REFRESH_TOKEN_EXPIRY=604800
```

---

## 📞 **Support & Communication**

### **Frontend Team Contact Points**
- **API Questions**: Review this document first, then contact frontend team
- **Data Format Changes**: Coordinate with frontend team before implementation
- **New Feature Requests**: Document API requirements before development
- **Bug Reports**: Include request/response examples and error details

### **Development Workflow**
1. **API Design**: Frontend team provides requirements in this format
2. **Backend Development**: Implement according to specifications
3. **Testing**: Use provided Postman collections for testing
4. **Integration**: Coordinate with frontend team for testing
5. **Deployment**: Follow staging → production deployment process

---

**Last Updated**: September 4, 2025  
**Backend Integration Version**: 1.0  
**Frontend Version**: 0.0.0  
**Maintained By**: Abdul Ahad & Aman Ahmad
