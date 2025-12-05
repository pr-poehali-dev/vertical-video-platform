import { Navigation } from '@/components/layout/Navigation';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  videos: number;
  totalViews: number;
  badge: 'gold' | 'silver' | 'bronze' | null;
}

const topCreators: Creator[] = [
  {
    id: '1',
    name: 'ESportsMaster',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    rating: 4.9,
    videos: 342,
    totalViews: 1250000,
    badge: 'gold'
  },
  {
    id: '2',
    name: 'ProGamer',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
    rating: 4.8,
    videos: 256,
    totalViews: 980000,
    badge: 'silver'
  },
  {
    id: '3',
    name: 'StreamKing',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    rating: 4.7,
    videos: 198,
    totalViews: 750000,
    badge: 'bronze'
  },
  {
    id: '4',
    name: 'NightGamer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    rating: 4.6,
    videos: 167,
    totalViews: 520000,
    badge: null
  },
  {
    id: '5',
    name: 'PixelWarrior',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    rating: 4.5,
    videos: 145,
    totalViews: 450000,
    badge: null
  }
];

const getBadgeColor = (badge: Creator['badge']) => {
  switch (badge) {
    case 'gold':
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    case 'silver':
      return 'bg-gradient-to-r from-gray-300 to-gray-500';
    case 'bronze':
      return 'bg-gradient-to-r from-orange-400 to-orange-600';
    default:
      return '';
  }
};

const getBadgeIcon = (badge: Creator['badge']) => {
  switch (badge) {
    case 'gold':
      return 'Crown';
    case 'silver':
      return 'Medal';
    case 'bronze':
      return 'Award';
    default:
      return null;
  }
};

export default function Rating() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8 max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <Icon 
            name="Trophy" 
            size={64} 
            className="mx-auto mb-4 text-primary animate-pulse-glow"
          />
          <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Топ Создателей
          </h1>
          <p className="text-xl text-muted-foreground">
            Лучшие из лучших в мире VITANET 2
          </p>
        </div>

        <div className="space-y-4">
          {topCreators.map((creator, index) => (
            <Card
              key={creator.id}
              className={`p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up ${
                creator.badge ? getBadgeColor(creator.badge) : 'hover:border-primary'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className={`text-3xl font-black w-12 h-12 flex items-center justify-center rounded-full ${
                    index < 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  {creator.badge && (
                    <div className="absolute -top-2 -right-2">
                      <Icon 
                        name={getBadgeIcon(creator.badge)!} 
                        size={24} 
                        className="text-yellow-400 drop-shadow-lg"
                      />
                    </div>
                  )}
                </div>

                <Avatar className="w-20 h-20 border-4 border-primary">
                  <AvatarImage src={creator.avatar} />
                  <AvatarFallback className="text-2xl font-black">
                    {creator.name[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-1">{creator.name}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Video" size={16} />
                      {creator.videos} видео
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={16} />
                      {(creator.totalViews / 1000).toFixed(0)}K просмотров
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <Badge className="text-xl font-black px-4 py-2 bg-primary hover:bg-primary">
                    <Icon name="Star" size={18} className="mr-1 fill-yellow-400 text-yellow-400" />
                    {creator.rating}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
