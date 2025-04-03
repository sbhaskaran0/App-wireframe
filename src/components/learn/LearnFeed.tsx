import React from 'react';
import { Play, Clock, TrendingUp, PiggyBank, CreditCard, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Story {
  id: string;
  title: string;
  icon: React.ReactNode;
  viewed: boolean;
}

interface Post {
  id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  likes: number;
  comments: number;
  route?: string;
}

export default function LearnFeed() {
  const navigate = useNavigate();
  
  const stories: Story[] = [
    { id: '1', title: 'Investing', icon: <TrendingUp className="h-6 w-6" />, viewed: false },
    { id: '2', title: 'Savings', icon: <PiggyBank className="h-6 w-6" />, viewed: false },
    { id: '3', title: 'Credit', icon: <CreditCard className="h-6 w-6" />, viewed: true },
    { id: '4', title: 'Budget', icon: <Wallet className="h-6 w-6" />, viewed: true },
  ];

  const posts: Post[] = [
    {
      id: '1',
      title: 'Understanding Compound Interest',
      description: 'Learn how your money can grow exponentially over time',
      duration: '5 min',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800',
      likes: 245,
      comments: 18,
      route: '/lesson/compound-interest'
    },
    {
      id: '2',
      title: 'Emergency Fund Basics',
      description: 'Why you need one and how to build it',
      duration: '4 min',
      image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=800',
      likes: 189,
      comments: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-secondary-dark pb-20">
      {/* Stories */}
      <div className="border-b border-gray-800 bg-secondary p-4">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center">
              <button
                className={`flex h-16 w-16 items-center justify-center rounded-full p-1 ${
                  story.viewed ? 'bg-gray-700' : 'bg-gradient-to-r from-primary to-blue-500'
                }`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary">
                  {story.icon}
                </div>
              </button>
              <span className="mt-2 text-xs text-gray-400">{story.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6 p-4">
        {posts.map((post) => (
          <div key={post.id} className="overflow-hidden rounded-xl bg-secondary">
            <img
              src={post.image}
              alt={post.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                <div className="flex items-center text-gray-400">
                  <Clock className="mr-1 h-4 w-4" />
                  <span className="text-sm">{post.duration}</span>
                </div>
              </div>
              <p className="mb-4 text-gray-400">{post.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <span className="text-sm text-gray-400">{post.likes} likes</span>
                  <span className="text-sm text-gray-400">
                    {post.comments} comments
                  </span>
                </div>
                <button 
                  onClick={() => post.route && navigate(post.route)}
                  className="flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-black"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}