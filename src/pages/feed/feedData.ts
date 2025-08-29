import IMAGES from "../../constants";

// Interface definitions for Feed data structure
export interface Reply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
}

export interface FeedPost {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  caption: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  postComments: Comment[];
}

// Sample feed data - replace with actual API data
export const feedPosts: FeedPost[] = [
  {
    id: "1",
    author: "Sasha Stores",
    avatar: IMAGES.sasha,
    timestamp: "2h ago",
    caption: "Get this phone at a cheap price for a limited period",
    image: IMAGES.feedPhone, // Using actual device images
    likes: 150,
    comments: 4,
    shares: 35,
    isLiked: false,
    postComments: [
      {
        id: "c1",
        author: "Adam Chris",
        avatar: IMAGES.adam,
        content: "The product looks really nice, do you deliver nationwide ?",
        timestamp: "1h",
        likes: 30,
        replies: [
          {
            id: "r1",
            author: "Sashaa Stones",
            avatar: IMAGES.sasha,
            content: "Yes, we deliver nationwide. Shipping is free for orders over $100!",
            timestamp: "45m",
            likes: 15
          },
          {
            id: "r2", 
            author: "John Doe",
            avatar: IMAGES.vee,
            content: "That's great! How long does delivery usually take?",
            timestamp: "30m",
            likes: 8
          },
          {
            id: "r3",
            author: "Adam Chris",
            avatar: IMAGES.adam,
            content: "@Sashaa Stones Perfect! I'll place my order today.",
            timestamp: "25m",
            likes: 5
          }
        ]
      },
      {
        id: "c2", 
        author: "Adam Chris",
        avatar: IMAGES.adam,
        content: "The product looks really nice, do you deliver nationwide ?",
        timestamp: "1h",
        likes: 30,
        replies: []
      },
      {
        id: "c3",
        author: "Adam Chris", 
        avatar: IMAGES.adam,
        content: "The product looks really nice, do you deliver nationwide ?",
        timestamp: "1h",
        likes: 30,
        replies: []
      },
      {
        id: "c4",
        author: "Sashaa Stones",
        avatar: IMAGES.sasha,
        content: "Thanks you all for positive responses",
        timestamp: "30m",
        likes: 0,
        replies: []
      }
    ]
  },
  {
    id: "2",
    author: "Vale Stones",
    avatar: IMAGES.adam,
    timestamp: "4h ago", 
    caption: "Get this phone at a cheap price for a limited period",
    image: IMAGES.feedPhone,
    likes: 150,
    comments: 4,
    shares: 35,
    isLiked: true,
    postComments: [
      {
        id: "c5",
        author: "John Doe",
        avatar: IMAGES.vee,
        content: "Amazing deal! Is this still available?",
        timestamp: "2h",
        likes: 15,
        replies: []
      },
      {
        id: "c6",
        author: "Jane Smith",
        avatar: IMAGES.vee,
        content: "I'm interested in purchasing this",
        timestamp: "1h",
        likes: 8,
        replies: []
      }
    ]
  },
  {
    id: "3",
    author: "Tech Store",
    avatar: IMAGES.vee,
    timestamp: "6h ago",
    caption: "Latest smartphone collection now available with amazing discounts!",
    image: IMAGES.feedPhone,
    likes: 289,
    comments: 12,
    shares: 67,
    isLiked: false,
    postComments: [
      {
        id: "c7",
        author: "Mike Johnson",
        avatar: IMAGES.vee,
        content: "What's the price range?",
        timestamp: "3h",
        likes: 20,
        replies: []
      },
      {
        id: "c8",
        author: "Sarah Wilson",
        avatar: IMAGES.vee,
        content: "Do you have warranty on these phones?",
        timestamp: "2h",
        likes: 25,
        replies: []
      }
    ]
  }
];

/**
 * Backend Developer Notes:
 * 
 * API Endpoints needed:
 * 1. GET /api/feed/posts - Fetch paginated feed posts
 * 2. POST /api/feed/posts/{id}/like - Toggle like on a post
 * 3. POST /api/feed/posts/{id}/share - Share a post
 * 4. GET /api/feed/posts/{id}/comments - Fetch comments for a post
 * 5. POST /api/feed/posts/{id}/comments - Add new comment
 * 6. POST /api/feed/comments/{id}/like - Like a comment
 * 
 * Database Schema Suggestions:
 * 
 * Posts Table:
 * - id (UUID, Primary Key)
 * - author_id (Foreign Key to Users)
 * - caption (TEXT)
 * - image_url (VARCHAR)
 * - likes_count (INTEGER, default 0)
 * - comments_count (INTEGER, default 0) 
 * - shares_count (INTEGER, default 0)
 * - created_at (TIMESTAMP)
 * - updated_at (TIMESTAMP)
 * 
 * Comments Table:
 * - id (UUID, Primary Key)
 * - post_id (Foreign Key to Posts)
 * - author_id (Foreign Key to Users)
 * - content (TEXT)
 * - likes_count (INTEGER, default 0)
 * - replies_count (INTEGER, default 0)
 * - created_at (TIMESTAMP)
 * 
 * Post_Likes Table:
 * - id (UUID, Primary Key)
 * - post_id (Foreign Key to Posts)
 * - user_id (Foreign Key to Users)
 * - created_at (TIMESTAMP)
 * 
 * Comment_Likes Table:
 * - id (UUID, Primary Key)
 * - comment_id (Foreign Key to Comments)
 * - user_id (Foreign Key to Users)
 * - created_at (TIMESTAMP)
 * 
 * Features to implement:
 * 1. Real-time updates for likes/comments
 * 2. Image upload and processing
 * 3. User tagging in posts
 * 4. Hashtag support
 * 5. Post reporting/moderation
 * 6. Infinite scroll pagination
 * 7. Push notifications for interactions
 */

// Utility functions for feed operations
export const formatPostTimestamp = (timestamp: string): string => {
  // Convert backend timestamp to user-friendly format
  return timestamp;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
