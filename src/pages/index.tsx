import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Tweet {
  id: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  likes: number;
  retweets: number;
  timestamp: string;
}

const mockTweets: Tweet[] = [
  {
    id: '1',
    content: 'Just launched my new website! 🚀',
    author: {
      name: 'John Doe',
      username: '@johndoe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    likes: 42,
    retweets: 12,
    timestamp: '2h ago',
  },
  {
    id: '2',
    content: 'Learning React is amazing! 💻',
    author: {
      name: 'Jane Smith',
      username: '@janesmith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    },
    likes: 23,
    retweets: 5,
    timestamp: '4h ago',
  },
];

const TweetCard = ({ tweet }: { tweet: Tweet }) => (
  <Card className="p-4 mb-4">
    <div className="flex gap-3">
      <Avatar className="w-10 h-10">
        <img src={tweet.author.avatar} alt={tweet.author.name} />
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold">{tweet.author.name}</span>
          <span className="text-gray-500">{tweet.author.username}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500">{tweet.timestamp}</span>
        </div>
        <p className="mt-2">{tweet.content}</p>
        <div className="flex gap-6 mt-4">
          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.79 13.29a1 1 0 1 0-1.41 1.42l4.79 4.79a1 1 0 0 0 1.41 0l4.79-4.79a1 1 0 0 0-1.41-1.42L13 17.17V3a1 1 0 0 0-2 0v14.17l-2.21-2.88z"/>
            </svg>
            <span>{tweet.retweets}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"/>
            </svg>
            <span>{tweet.likes}</span>
          </button>
        </div>
      </div>
    </div>
  </Card>
);

export default function HomePage() {
  const [tweetContent, setTweetContent] = useState('');

  const handleTweet = () => {
    // Handle tweet submission
    console.log('Tweet:', tweetContent);
    setTweetContent('');
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-4">
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586l6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"/>
                </svg>
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/>
                </svg>
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"/>
                </svg>
                Settings
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Tweet Composer */}
          <Card className="p-4 mb-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=current" alt="Current user" />
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="What's happening?"
                  value={tweetContent}
                  onChange={(e) => setTweetContent(e.target.value)}
                  className="mb-3"
                />
                <div className="flex justify-end">
                  <Button onClick={handleTweet} disabled={!tweetContent.trim()}>
                    Tweet
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Tweet Feed */}
          <ScrollArea className="h-[calc(100vh-200px)]">
            {mockTweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}