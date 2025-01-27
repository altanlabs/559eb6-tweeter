import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

interface Tweet {
  id: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  likes: number;
  retweets: number;
  replies: number;
  timestamp: string;
}

const mockTweets: Tweet[] = [
  {
    id: '1',
    content: 'Just launched my new website! 🚀',
    author: {
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      verified: true,
    },
    likes: 42,
    retweets: 12,
    replies: 5,
    timestamp: '2h',
  },
  {
    id: '2',
    content: 'Learning React is amazing! 💻\n\nBuilding awesome projects and learning new things every day.',
    author: {
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    },
    likes: 23,
    retweets: 5,
    replies: 2,
    timestamp: '4h',
  },
];

const TweetCard = ({ tweet }: { tweet: Tweet }) => (
  <div className="border-b border-gray-800 p-4 hover:bg-gray-900/50 cursor-pointer transition-colors">
    <div className="flex gap-3">
      <Avatar className="w-10 h-10">
        <img src={tweet.author.avatar} alt={tweet.author.name} />
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-bold hover:underline">{tweet.author.name}</span>
          {tweet.author.verified && (
            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
            </svg>
          )}
          <span className="text-gray-500">@{tweet.author.username} · {tweet.timestamp}</span>
        </div>
        <p className="mt-1 whitespace-pre-wrap">{tweet.content}</p>
        <div className="flex justify-between mt-3 max-w-md">
          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 group">
            <div className="p-2 rounded-full group-hover:bg-blue-500/10">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"/>
              </svg>
            </div>
            <span>{tweet.replies}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 group">
            <div className="p-2 rounded-full group-hover:bg-green-500/10">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"/>
              </svg>
            </div>
            <span>{tweet.retweets}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-pink-500 group">
            <div className="p-2 rounded-full group-hover:bg-pink-500/10">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"/>
              </svg>
            </div>
            <span>{tweet.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 group">
            <div className="p-2 rounded-full group-hover:bg-blue-500/10">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"/>
                <path fill="currentColor" d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function HomePage() {
  const [tweetContent, setTweetContent] = useState('');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid grid-cols-[auto,1fr,auto] max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="w-72 p-4 sticky top-0 h-screen">
          <div className="flex flex-col gap-1">
            <div className="p-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
                <path fill="currentColor" d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
              </svg>
            </div>
            <Button variant="ghost" className="flex items-center gap-4 text-xl p-4 hover:bg-gray-900 rounded-full">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"/>
              </svg>
              Inicio
            </Button>
            <Button variant="ghost" className="flex items-center gap-4 text-xl p-4 hover:bg-gray-900 rounded-full">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/>
              </svg>
              Explorar
            </Button>
            <Button variant="ghost" className="flex items-center gap-4 text-xl p-4 hover:bg-gray-900 rounded-full">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18.001c-.11.399-.166.824-.166 1.25 0 2.5 2.09 4.248 4.648 4.248 1.885 0 3.269-1.084 3.992-2.068.379-.52.535-.919.535-.919s.156.399.535.919c.723.984 2.107 2.068 3.992 2.068 2.558 0 4.648-1.748 4.648-4.248 0-.426-.057-.851-.166-1.25l-1.001-8.949zM12 21.25c-.686 0-1.393-.154-2.064-.479-.188-.09-.358-.207-.511-.336l-.001-.001c-.242-.204-.425-.439-.544-.693-.126-.273-.188-.566-.188-.866 0-.342.089-.678.262-.977.174-.299.42-.548.723-.727.303-.179.646-.273.998-.273s.695.094.998.273c.303.179.549.428.723.727.173.299.262.635.262.977 0 .3-.062.593-.188.866-.119.254-.302.489-.544.693h-.001c-.152.129-.322.246-.511.336-.671.325-1.378.479-2.064.479z"/>
              </svg>
              Notificaciones
            </Button>
            <Button variant="ghost" className="flex items-center gap-4 text-xl p-4 hover:bg-gray-900 rounded-full">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="currentColor" d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"/>
              </svg>
              Mensajes
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-8 text-xl mt-4">
              Postear
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <main className="border-l border-r border-gray-800 min-h-screen">
          <div className="sticky top-0 backdrop-blur-xl bg-black/70 border-b border-gray-800 p-4">
            <h1 className="text-xl font-bold">Inicio</h1>
          </div>

          {/* Tweet Composer */}
          <div className="border-b border-gray-800 p-4">
            <div className="flex gap-4">
              <Avatar className="w-12 h-12">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=current" alt="Current user" />
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="¡¿Qué está pasando?!"
                  value={tweetContent}
                  onChange={(e) => setTweetContent(e.target.value)}
                  className="min-h-[120px] bg-transparent border-none text-xl placeholder:text-gray-600 resize-none"
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2 text-blue-500">
                    <button className="p-2 hover:bg-blue-500/10 rounded-full">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"/>
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-blue-500/10 rounded-full">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"/>
                      </svg>
                    </button>
                  </div>
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4"
                    disabled={!tweetContent.trim()}
                  >
                    Postear
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tweet Feed */}
          <div>
            {mockTweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <div className="w-96 p-4 sticky top-0 h-screen">
          <div className="bg-gray-900 rounded-full mb-4">
            <div className="flex items-center p-3 gap-4">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/>
              </svg>
              <Input 
                placeholder="Buscar" 
                className="bg-transparent border-none focus-visible:ring-0 placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Qué está pasando</h2>
            <div className="space-y-4">
              {['Tecnología', 'Deportes', 'Política'].map((topic) => (
                <div key={topic} className="cursor-pointer hover:bg-white/5 -mx-4 px-4 py-2">
                  <div className="text-sm text-gray-500">Tendencias en España</div>
                  <div className="font-bold">{topic}</div>
                  <div className="text-sm text-gray-500">50.5K posts</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-4">
            <h2 className="text-xl font-bold mb-4">A quién seguir</h2>
            <div className="space-y-4">
              {['Tech News', 'Web Dev', 'AI Updates'].map((account) => (
                <div key={account} className="flex items-center justify-between cursor-pointer hover:bg-white/5 -mx-4 px-4 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${account}`} alt={account} />
                    </Avatar>
                    <div>
                      <div className="font-bold">{account}</div>
                      <div className="text-sm text-gray-500">@{account.toLowerCase().replace(' ', '')}</div>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-full">
                    Seguir
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}