import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

export function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRating, setCurrentRating] = useState(video.rating);
  const { toast } = useToast();

  const handleRate = (stars: number) => {
    setCurrentRating(stars);
    toast({
      title: 'Оценка отправлена!',
      description: `Вы поставили ${stars} звёзд`
    });
  };

  const handleShare = () => {
    toast({
      title: 'Скопировано!',
      description: 'Ссылка на видео скопирована в буфер обмена'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg animate-fade-in">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b-2 border-border">
          <h2 className="text-2xl font-black truncate flex-1">{video.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="ml-4">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6 max-w-2xl">
            <div className="aspect-[9/16] bg-muted rounded-xl overflow-hidden mb-6 mx-auto max-w-md border-2 border-border">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6 animate-slide-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.author}`} />
                    <AvatarFallback className="font-bold">{video.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-lg">{video.author}</p>
                    <p className="text-sm text-muted-foreground">Создатель контента</p>
                  </div>
                </div>
                <Button size="lg" className="font-bold">
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Подписаться
                </Button>
              </div>

              <div className="flex gap-3 flex-wrap">
                <Button
                  size="lg"
                  variant={isLiked ? 'default' : 'outline'}
                  onClick={() => setIsLiked(!isLiked)}
                  className="font-bold flex-1 min-w-32"
                >
                  <Icon name="ThumbsUp" size={20} className={isLiked ? 'fill-current mr-2' : 'mr-2'} />
                  {video.likes + (isLiked ? 1 : 0)}
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleShare}
                  className="font-bold flex-1 min-w-32"
                >
                  <Icon name="Share2" size={20} className="mr-2" />
                  Поделиться
                </Button>

                <Button
                  size="lg"
                  variant={isFavorite ? 'default' : 'outline'}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="font-bold"
                >
                  <Icon 
                    name="Heart" 
                    size={20} 
                    className={isFavorite ? 'fill-current text-secondary' : 'text-secondary'} 
                  />
                </Button>
              </div>

              <div className="bg-card p-6 rounded-xl border-2 border-border">
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Icon name="Star" size={24} className="text-primary" />
                  Оцени видео
                </h3>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="lg"
                      onClick={() => handleRate(star)}
                      className="hover:scale-125 transition-transform"
                    >
                      <Icon
                        name="Star"
                        size={32}
                        className={star <= currentRating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
                      />
                    </Button>
                  ))}
                </div>
                <p className="text-center mt-3 text-lg font-bold text-primary">
                  Текущий рейтинг: {currentRating.toFixed(1)} ⭐
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl border-2 border-border">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Eye" size={20} />
                    <span className="font-bold">{video.views.toLocaleString()} просмотров</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={20} />
                    <span className="font-bold">2 часа назад</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
