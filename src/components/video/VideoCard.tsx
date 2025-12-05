import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface Video {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  videoUrl: string;
  likes: number;
  views: number;
  rating: number;
}

interface VideoCardProps {
  video: Video;
  onPlay: () => void;
}

export function VideoCard({ video, onPlay }: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      <div className="relative aspect-[9/16] overflow-hidden bg-muted cursor-pointer" onClick={onPlay}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm animate-pulse-glow">
            <Icon name="Play" size={40} className="text-primary-foreground ml-1" />
          </div>
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          <div className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1">
            <Icon name="Eye" size={14} />
            {(video.views / 1000).toFixed(1)}K
          </div>
          <div className="bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1">
            <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
            {video.rating}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="w-10 h-10 border-2 border-primary">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.author}`} />
            <AvatarFallback className="font-bold">{video.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg leading-tight mb-1 truncate">{video.title}</h3>
            <p className="text-sm text-muted-foreground">{video.author}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={isLiked ? 'default' : 'outline'}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="font-bold"
            >
              <Icon 
                name="ThumbsUp" 
                size={16} 
                className={isLiked ? 'fill-current' : ''} 
              />
              <span className="ml-1">{video.likes + (isLiked ? 1 : 0)}</span>
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Icon name="Share2" size={16} />
            </Button>
          </div>

          <Button
            size="sm"
            variant={isFavorite ? 'default' : 'ghost'}
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
          >
            <Icon 
              name="Heart" 
              size={18} 
              className={isFavorite ? 'fill-current text-secondary' : 'text-secondary'} 
            />
          </Button>
        </div>
      </div>
    </Card>
  );
}
