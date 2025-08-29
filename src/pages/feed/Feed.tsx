import React, { useState, useEffect, useRef } from "react";
import { feedPosts, formatNumber, FeedPost, Comment, Reply } from "./feedData";
import IMAGES from "../../constants";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<FeedPost[]>(feedPosts);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [newReply, setNewReply] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({ '1': true }); // Show comments for first post by default
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>({});
  const [replyingTo, setReplyingTo] = useState<{ [key: string]: boolean }>({});
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle like on a post
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Toggle comments visibility
  const toggleComments = (postId: string) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Toggle dropdown menu
  const toggleDropdown = (postId: string) => {
    setDropdownOpen(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Handle dropdown actions
  const handleDropdownAction = (action: string, postId: string) => {
    setDropdownOpen(prev => ({
      ...prev,
      [postId]: false
    }));
    
    switch (action) {
      case 'share':
        console.log('Share post:', postId);
        break;
      case 'follow':
        console.log('Follow user from post:', postId);
        break;
      case 'hide':
        console.log('Hide post:', postId);
        break;
      case 'report':
        console.log('Report post:', postId);
        break;
    }
  };

  // Handle new comment
  const handleComment = (postId: string) => {
    const commentText = newComment[postId];
    if (!commentText?.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: "Current User",
      avatar: IMAGES.sasha,
      content: commentText,
      timestamp: "now",
      likes: 0,
      replies: []
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
          postComments: [...post.postComments, newCommentObj]
        };
      }
      return post;
    }));

    setNewComment(prev => ({
      ...prev,
      [postId]: ""
    }));
  };

  // Toggle showing replies for a comment
  const toggleReplies = (commentId: string) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  // Toggle reply input for a comment
  const toggleReplyInput = (commentId: string) => {
    setReplyingTo(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  // Handle new reply
  const handleReply = (postId: string, commentId: string) => {
    const replyText = newReply[commentId];
    if (!replyText?.trim()) return;

    const newReplyObj: Reply = {
      id: Date.now().toString(),
      author: "Current User",
      avatar: IMAGES.sasha,
      content: replyText,
      timestamp: "now",
      likes: 0
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          postComments: post.postComments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...comment.replies, newReplyObj]
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));

    setNewReply(prev => ({
      ...prev,
      [commentId]: ""
    }));
    setReplyingTo(prev => ({
      ...prev,
      [commentId]: false
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-[1080px] mx-auto px-4">
        
        
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="flex gap-6">
              {/* Left Side - Post */}
              <div className="flex-1 max-w-md">
                <div className="rounded-2xl    overflow-hidden items-center px-7">
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-4 px-0">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={post.avatar} 
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{post.author}</h3>
                        <p className="text-sm text-gray-500">Lagos, Nigeria • {post.timestamp}</p>
                      </div>
                    </div>
                    <div className="relative" ref={dropdownRef}>
                      <button 
                        onClick={() => toggleDropdown(post.id)}
                        className="p-2 px-0 hover:bg-gray-100 rounded-full"
                      >
                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {dropdownOpen[post.id] && (
                        <div className="absolute right-0 top-full p-2 mt-1 w-68 bg-[#F9F9F9] rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                          <button
                            onClick={() => handleDropdownAction('share', post.id)}
                            className="w-full flex items-center space-x-3 px-4 py-4 mb-[2px] text-left bg-white rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            <span className="text-gray-700 text-sm">Share this post</span>
                          </button>
                          
                          <button
                            onClick={() => handleDropdownAction('follow', post.id)}
                            className="w-full flex items-center space-x-3 px-4 py-4 mb-[2px] text-left bg-white rounded-xl  hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-gray-700 text-sm">Follow User</span>
                          </button>
                          
                          <button
                            onClick={() => handleDropdownAction('hide', post.id)}
                            className="w-full flex items-center space-x-3 px-4 py-4 mb-[2px] text-left bg-white rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                            <span className="text-gray-700 text-sm">Hide Post</span>
                          </button>
                          
                          <button
                            onClick={() => handleDropdownAction('report', post.id)}
                            className="w-full flex items-center space-x-3 px-4 py-4 mb-[2px] text-left bg-white rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span className="text-red-500 text-sm">Report Post</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="relative">
                    <img 
                      src="public/Feedphone.svg" 
                      alt="Post content"
                      className="w-97 h-97 object-cover"
                    />
                  </div>

                  {/* Post Content */}
                  <div className="py-4 ">
                    <p className="text-gray-800 bg-[#F0F0F0] text-sm py-[18px] px-[15px] rounded-[10px]">{post.caption}</p>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-2 pr-3">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          {post.isLiked ? (
                            <svg className="w-7 h-7 text-red-500 fill-current" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          ) : (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          )}
                          <span className="text-sm">{formatNumber(post.likes)}</span>
                        </button>

                        <button 
                          onClick={() => toggleComments(post.id)}
                          className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
                        >
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="text-sm">
                            {post.comments}
                          </span>
                        </button>

                        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          <span className="text-sm">{formatNumber(post.shares)}</span>
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="bg-[#E53E3E] text-white px-1 py-1 rounded-lg text-[10px] hover:bg-red-600 transition-colors">
                          Follow Store
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <img src={IMAGES.download} alt="Download" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Comments Panel */}
              {showComments[post.id] && (
                <div className="flex-1 max-w-2xl ">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 h-fit">
                    {/* Comments Header */}
                    <div className="p-4 border-b border-gray-100">
                      <h4 className="text-lg font-semibold text-gray-800">Comments</h4>
                    </div>
                    
                    {/* Comments List */}
                    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                      {post.postComments.map((comment) => (
                        <div key={comment.id} className="space-y-2">
                          <div className="flex space-x-3">
                            <img 
                              src={comment.avatar} 
                              alt={comment.author}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h5 className="font-medium text-gray-900 text-sm">{comment.author}</h5>
                                <span className="text-xs text-gray-500">{comment.timestamp}</span>
                              </div>
                              <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <button 
                                  onClick={() => toggleReplyInput(comment.id)}
                                  className="hover:text-blue-500 transition-colors"
                                >
                                  Reply
                                </button>
                                <span className="flex items-center space-x-1">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                  <span>{comment.likes}</span>
                                </span>
                                {comment.replies.length > 0 && (
                                  <button
                                    onClick={() => toggleReplies(comment.id)}
                                    className="hover:text-blue-500 transition-colors"
                                  >
                                    {showReplies[comment.id] ? 'Hide' : 'Show'} {comment.replies.length} replies
                                  </button>
                                )}
                              </div>

                              {/* Reply Input */}
                              {replyingTo[comment.id] && (
                                <div className="mt-3 flex space-x-2">
                                  <img 
                                    src={IMAGES.sasha} 
                                    alt="Your avatar"
                                    className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                                  />
                                  <div className="flex-1 flex space-x-2">
                                    <input
                                      type="text"
                                      placeholder="Write a reply..."
                                      value={newReply[comment.id] || ""}
                                      onChange={(e) => setNewReply(prev => ({
                                        ...prev,
                                        [comment.id]: e.target.value
                                      }))}
                                      className="flex-1 bg-gray-100 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          handleReply(post.id, comment.id);
                                        }
                                      }}
                                    />
                                    <button 
                                      onClick={() => handleReply(post.id, comment.id)}
                                      className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition-colors"
                                    >
                                      <svg className="w-3 h-3 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Replies */}
                              {showReplies[comment.id] && comment.replies.length > 0 && (
                                <div className="mt-3 ml-4 space-y-2 border-l-2 border-gray-100 pl-3">
                                  {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex space-x-2">
                                      <img 
                                        src={reply.avatar} 
                                        alt={reply.author}
                                        className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                          <h6 className="font-medium text-gray-900 text-xs">{reply.author}</h6>
                                          <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                        </div>
                                        <p className="text-gray-700 text-xs mb-1">{reply.content}</p>
                                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                                          <span className="flex items-center space-x-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            <span>{reply.likes}</span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment */}
                    <div className="p-4 border-t border-gray-100">
                      <div className="flex space-x-3">
                        <img 
                          src={IMAGES.sasha} 
                          alt="Your avatar"
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 flex space-x-2">
                          <input
                            type="text"
                            placeholder="Type a message"
                            value={newComment[post.id] || ""}
                            onChange={(e) => setNewComment(prev => ({
                              ...prev,
                              [post.id]: e.target.value
                            }))}
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleComment(post.id);
                              }
                            }}
                          />
                          <button 
                            onClick={() => handleComment(post.id)}
                            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
                          >
                            <svg className="w-4 h-4 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default Feed;
