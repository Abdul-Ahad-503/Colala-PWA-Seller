import React, { useState, useEffect, useRef } from "react";
import { feedPosts, formatNumber, FeedPost, Comment, Reply } from "./feedData";
import IMAGES from "../../constants";
import CreatePost from "./CreatePost";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<FeedPost[]>(feedPosts);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [newReply, setNewReply] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({ '1': true }); // Show comments for first post by default
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>({});
  const [replyingTo, setReplyingTo] = useState<{ [key: string]: boolean }>({});
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
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

  // Handle create post modal
  const handleOpenCreatePost = () => {
    setShowCreatePost(true);
  };

  const handleCloseCreatePost = () => {
    setShowCreatePost(false);
  };

  const handleCreatePost = (selectedImage: string, postText: string) => {
    if (selectedImage) {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === '1' ? { ...post, image: selectedImage } : post
        )
      );
    }
    
    // If you want to create a new post instead of updating existing one, you can add:
    // const newPost = {
    //   id: Date.now().toString(),
    //   user: "Current User",
    //   avatar: IMAGES.adam,
    //   content: postText,
    //   image: selectedImage,
    //   likes: 0,
    //   isLiked: false,
    //   // ... other post properties
    // };
    // setPosts(prevPosts => [newPost, ...prevPosts]);
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
    <div className="min-h-screen bg-[#F9F9F9] py-6">
      <div className="max-w-[1080px] mx-auto px-4">
        
        {/* Top Navigation Buttons */}
        <div className="mb-6">
          {/* My Posts / All Posts Toggle */}
          <div className="flex gap-4 mb-4">
            <button className="px-20 py-4 bg-[#E53E3E] text-white rounded-xl font-medium text-[10px]">
              My Posts
            </button>
            <button className="px-20 py-4 bg-[#FFFFFF] text-gray-600 rounded-xl font-medium text-[10px]  transition-colors">
              All Posts
            </button>
          </div>
          
          {/* Add New Posts Button */}
          <button 
            onClick={handleOpenCreatePost}
            className="w-[420px] bg-[#E53E3E] text-white py-4 rounded-xl font-medium text-[10px] flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Posts
          </button>
        </div>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="flex gap-6">
              {/* Left Side - Post */}
              <div className="w-[450px] flex-shrink-0">
                <div className="rounded-2xl overflow-hidden items-center px-7">
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-4 px-0">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={post.avatar} 
                        alt={post.author}
                        className="w-[55px] h-[55px] rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-[12px] text-gray-900">{post.author}</h3>
                        <p className="text-[10px] text-gray-500">Lagos, Nigeria • {post.timestamp}</p>
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
                            <img src="/public/share.svg" alt="Share Post" className="w-5 h-5 text-black" />
                            <span className="text-gray-700 text-sm">Share this post</span>
                          </button>
                          
                         
                          
                          <button
                            onClick={() => handleDropdownAction('hide', post.id)}
                            className="w-full flex items-center space-x-3 px-4 py-4 mb-[2px] text-left bg-white rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <img src="/public/editpost.svg" alt="Edit Post" className="w-5 h-5 text-black" />
                            <span className="text-gray-700 text-sm">Edit Post</span>
                          </button>
                          
                          <button
                            onClick={() => handleDropdownAction('report', post.id)}
                            className="w-full flex items-center space-x-3 px-4 py-4 mb-[2px] text-left bg-white rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <img src="/public/deletepost.svg" alt="Delete Post" className="w-5 h-5 text-black" />
                            <span className="text-red-500 text-sm">Delete Post</span>
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
                      className="w-[390px] h-[390px] object-cover"
                    />
                  </div>

                  {/* Post Content */}
                  <div className="py-4 ">
                    <p className="text-gray-800 bg-[#F0F0F0] text-sm py-[18px] px-[15px] text-[14px] rounded-[10px]">{post.caption}</p>

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
                <div className="w-[645px] mr-12 -mt-34 flex-shrink-0">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 h-fit">
                    {/* Comments Header */}
                    <div className="p-4  border-gray-100">
                      <h4 className="text-[20px] font-semibold text-gray-800">Comments</h4>
                    </div>
                    
                    {/* Comments List */}
                    <div className="p-6 space-y-6  ">
                      {/* Adam Chris Comment 1 */}
                      <div className="space-y-3">
                        <div className="flex space-x-3">
                          <img 
                            src={IMAGES.adam} 
                            alt="Adam Chris"
                            className="w-[47px] h-[47px] rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="font-semibold text-gray-900 text-[12px] text-base">Adam Chris</h5>
                              <span className="text-[12px] text-gray-500">1 min</span>
                            </div>
                            <p className="text-gray-800 text-base text-[12px] mb-3">This product looks really nice, do you deliver nationwide ?</p>
                            <div className="flex items-center space-x-4">
                              <button className="text-[12px] text-gray-600 hover:text-blue-500 transition-colors">
                                Reply
                              </button>
                              <div className="flex items-center space-x-1 text-[12px] text-gray-600">
                               <img src="/public/comment.svg" alt="Comment" className="w-[11px] h-[11px" />
                                <span>30</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Adam Chris Comment 2 */}
                      <div className="space-y-3">
                        <div className="flex space-x-3">
                          <img 
                            src={IMAGES.adam} 
                            alt="Adam Chris"
                            className="w-[47px] h-[41px] rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h5 className="font-semibold text-[12px] text-gray-900 text-base">Adam Chris</h5>
                              <span className="text-[12px] text-gray-500">1 min</span>
                            </div>
                            <p className="text-gray-800 text-base text-[12px] mb-3">This product looks really nice, do you deliver nationwide ?</p>
                            <div className="flex items-center space-x-4">
                              <button className="text-[12px] text-gray-600 hover:text-blue-500 transition-colors">
                                Reply
                              </button>
                              <div className="flex items-center space-x-1 text-[12px] text-gray-600">
                                <img src="/public/comment.svg" alt="Comment" className="w-[11px] h-[11px]" />
                                <span>30</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Adam Chris Comment 3 */}
                      <div className="space-y-3 ">
                        <div className="flex space-x-3">
                          <img 
                            src={IMAGES.adam} 
                            alt="Adam Chris"
                            className="w-[41px] h-[41px] rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h5 className="font-semibold text-[12px] text-gray-900 text-base">Adam Chris</h5>
                              <span className="text-[12px] text-gray-500">1 min</span>
                            </div>
                            <p className="text-gray-800 text-base text-[12px] mb-3">This product looks really nice, do you deliver nationwide ?</p>
                            <div className="flex items-center space-x-4">
                              <button className="text-[12px] text-gray-600 hover:text-blue-500 transition-colors">
                                Reply
                              </button>
                              <div className="flex items-center space-x-1 text-[12px] text-gray-600">
                                <img src="/public/comment.svg" alt="Comment" className="w-[11px] h-[11px]" />
                                <span>30</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      {/* Sasha Stores Reply */}
                      <div className="space-y-3 ml-12">
                        <div className="flex space-x-3">
                          <img 
                            src={IMAGES.adam}
                            alt="Sasha Stores"
                            className="w-[40px] h-[40px] rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h5 className="font-semibold text-[10px] text-gray-900 text-base">Sasha Stores</h5>
                              <span className="text-[10px] text-gray-500">1 min</span>
                            </div>
                            <p className="text-gray-800 text-base">
                              <span className="text-red-500 text-[10px] font-medium">@Adam Chris</span>
                              {' '}
                              <span className="text-[10px]">We do deliver nationwide.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add Comment */}
                    <div className="p-6  -mt-6 w-[651px]  rounded-b-2xl">
                      <div className="flex space-x-3">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            placeholder="Type a message"
                            value={newComment[post.id] || ""}
                            onChange={(e) => setNewComment(prev => ({
                              ...prev,
                              [post.id]: e.target.value
                            }))}
                            className="w-full bg-[#E0E0E0] rounded-2xl px-6 py-3 pr-12 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleComment(post.id);
                              }
                            }}
                          />
                          <button 
                            onClick={() => handleComment(post.id)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2  text-white rounded-full p-2 transition-colors"
                          >
                            <img src="/public/sendmsg.svg" alt="Send" className="w-5 h-5" />
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

        {/* Create Post Modal */}
        <CreatePost 
          isOpen={showCreatePost}
          onClose={handleCloseCreatePost}
          onCreatePost={handleCreatePost}
        />
       
      </div>
    </div>
  );
};

export default Feed;
