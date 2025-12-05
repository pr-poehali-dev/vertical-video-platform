import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Video {
  id: number;
  author: string;
  authorAvatar: string;
  title: string;
  thumbnail: string;
  likes: number;
  reposts: number;
  rating: number;
  isLiked: boolean;
  isFavorite: boolean;
}

const mockVideos: Video[] = [
  {
    id: 1,
    author: 'ProGamer',
    authorAvatar: '/placeholder.svg',
    title: 'Эпичный момент в игре! 🔥',
    thumbnail: '/placeholder.svg',
    likes: 1542,
    reposts: 234,
    rating: 4.8,
    isLiked: false,
    isFavorite: false,
  },
  {
    id: 2,
    author: 'StreamKing',
    authorAvatar: '/placeholder.svg',
    title: 'Невероятный камбэк 💪',
    thumbnail: '/placeholder.svg',
    likes: 2341,
    reposts: 567,
    rating: 4.9,
    isLiked: false,
    isFavorite: false,
  },
  {
    id: 3,
    author: 'GameMaster',
    authorAvatar: '/placeholder.svg',
    title: 'ТОП 10 моментов недели ⚡',
    thumbnail: '/placeholder.svg',
    likes: 3421,
    reposts: 891,
    rating: 5.0,
    isLiked: false,
    isFavorite: false,
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [videos, setVideos] = useState(mockVideos);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLike = (id: number) => {
    setVideos(videos.map(video => 
      video.id === id 
        ? { ...video, isLiked: !video.isLiked, likes: video.isLiked ? video.likes - 1 : video.likes + 1 }
        : video
    ));
  };

  const handleRepost = (id: number) => {
    setVideos(videos.map(video => 
      video.id === id 
        ? { ...video, reposts: video.reposts + 1 }
        : video
    ));
  };

  const handleFavorite = (id: number) => {
    setVideos(videos.map(video => 
      video.id === id 
        ? { ...video, isFavorite: !video.isFavorite }
        : video
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-4">
            {videos.map((video, index) => (
              <Card 
                key={video.id} 
                className="relative overflow-hidden border-2 border-primary/20 bg-card hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative group">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2 animate-slide-up">
                    <Avatar className="w-10 h-10 border-2 border-primary">
                      <AvatarImage src={video.authorAvatar} />
                      <AvatarFallback className="bg-primary text-white">{video.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white text-sm drop-shadow-lg">{video.author}</p>
                      <Badge className="bg-primary/80 hover:bg-primary text-xs">PRO</Badge>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-white font-bold text-lg mb-3 drop-shadow-lg">{video.title}</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(video.id)}
                          className={`gap-2 transition-all duration-300 ${
                            video.isLiked 
                              ? 'bg-primary text-white hover:bg-primary/90 animate-scale-in' 
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          <Icon name={video.isLiked ? "Heart" : "Heart"} size={18} className={video.isLiked ? "fill-current" : ""} />
                          <span className="font-semibold">{video.likes}</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRepost(video.id)}
                          className="gap-2 bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                        >
                          <Icon name="Repeat2" size={18} />
                          <span className="font-semibold">{video.reposts}</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFavorite(video.id)}
                          className={`transition-all duration-300 ${
                            video.isFavorite 
                              ? 'bg-accent text-white hover:bg-accent/90 animate-scale-in' 
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          <Icon name={video.isFavorite ? "Star" : "Star"} size={18} className={video.isFavorite ? "fill-current" : ""} />
                        </Button>
                      </div>

                      <div className="flex items-center gap-1 bg-secondary/80 px-3 py-1 rounded-full">
                        <Icon name="TrendingUp" size={16} className="text-white" />
                        <span className="text-white font-bold text-sm">{video.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="lg" className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 animate-pulse-glow">
                      <Icon name="Play" size={32} className="fill-current" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'upload':
        return (
          <Card className="p-8 text-center border-2 border-dashed border-primary/50 bg-card/50 animate-fade-in">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
                <Icon name="Upload" size={40} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Загрузи своё видео</h2>
                <p className="text-muted-foreground">Поделись эпичными моментами с миром</p>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2">
                <Icon name="VideoIcon" size={20} />
                Выбрать видео
              </Button>
            </div>
          </Card>
        );

      case 'search':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск видео, авторов, тегов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border-2 border-primary/20 focus:border-primary rounded-lg text-foreground placeholder:text-muted-foreground outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['🎮 Игры', '🔥 Trending', '⚡ Новое', '🏆 ТОП', '🎯 Челленджи', '😂 Фейлы'].map((tag, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="border-primary/30 hover:bg-primary hover:text-white transition-all animate-scale-in"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'favorites':
        const favoriteVideos = videos.filter(v => v.isFavorite);
        return (
          <div className="animate-fade-in">
            {favoriteVideos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {favoriteVideos.map((video, i) => (
                  <Card 
                    key={video.id} 
                    className="overflow-hidden border-2 border-accent/30 hover:border-accent transition-all animate-scale-in"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="aspect-[9/16] bg-gradient-to-br from-accent/20 to-primary/20 relative">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2">
                        <Icon name="Star" size={20} className="text-accent fill-current" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center border-2 border-dashed border-accent/30">
                <Icon name="Star" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Нет избранных видео</p>
              </Card>
            )}
          </div>
        );

      case 'rating':
        const sortedVideos = [...videos].sort((a, b) => b.rating - a.rating);
        return (
          <div className="space-y-3 animate-fade-in">
            {sortedVideos.map((video, index) => (
              <Card 
                key={video.id} 
                className="p-4 border-2 border-secondary/30 hover:border-secondary transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <Avatar className="w-12 h-12 border-2 border-primary">
                    <AvatarImage src={video.authorAvatar} />
                    <AvatarFallback>{video.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{video.title}</p>
                    <p className="text-sm text-muted-foreground">{video.author}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-full">
                    <Icon name="Trophy" size={18} className="text-white" />
                    <span className="font-bold text-white">{video.rating}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4 animate-fade-in">
            <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-20 h-20 border-4 border-primary animate-pulse-glow">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-white text-2xl">У</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Пользователь</h2>
                  <Badge className="bg-gradient-to-r from-primary to-secondary">⭐ PRO Member</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Видео</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">5.2K</div>
                  <div className="text-sm text-muted-foreground">Лайков</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">892</div>
                  <div className="text-sm text-muted-foreground">Подписчиков</div>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              {[
                { icon: 'Settings', label: 'Настройки' },
                { icon: 'Bell', label: 'Уведомления' },
                { icon: 'Award', label: 'Достижения' },
                { icon: 'HelpCircle', label: 'Помощь' },
              ].map((item, i) => (
                <Button 
                  key={i}
                  variant="outline" 
                  className="w-full justify-start gap-3 h-12 border-primary/20 hover:bg-primary/10 hover:border-primary/50 transition-all animate-slide-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <Icon name={item.icon as any} size={20} />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            GameClips
          </h1>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="hover:bg-primary/10">
              <Icon name="Zap" size={20} className="text-primary" />
            </Button>
            <Button size="icon" variant="ghost" className="hover:bg-secondary/10">
              <Icon name="Gift" size={20} className="text-secondary" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-md mx-auto px-4 py-6 pb-24">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-primary/20 z-50">
        <div className="container max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            {[
              { id: 'home', icon: 'Home', label: 'Главная' },
              { id: 'search', icon: 'Search', label: 'Поиск' },
              { id: 'upload', icon: 'PlusCircle', label: 'Загрузка' },
              { id: 'favorites', icon: 'Star', label: 'Избранное' },
              { id: 'rating', icon: 'TrendingUp', label: 'Рейтинг' },
              { id: 'profile', icon: 'User', label: 'Профиль' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-primary scale-110'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon as any} size={22} className={activeTab === tab.id ? "animate-scale-in" : ""} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
