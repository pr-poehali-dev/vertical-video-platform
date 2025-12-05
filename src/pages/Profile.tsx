import { Navigation } from '@/components/layout/Navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VideoCard } from '@/components/video/VideoCard';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { VideoPlayer } from '@/components/video/VideoPlayer';

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

const userVideos: Video[] = [
  {
    id: '1',
    title: 'Мой эпичный геймплей',
    author: 'ProGamer',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
    videoUrl: 'https://example.com/video1.mp4',
    likes: 1250,
    views: 15000,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Турнирный стрим',
    author: 'ProGamer',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    videoUrl: 'https://example.com/video2.mp4',
    likes: 890,
    views: 9500,
    rating: 4.5
  }
];

export default function Profile() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Card className="max-w-4xl mx-auto p-8 mb-8 border-2 animate-scale-in">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-32 h-32 border-4 border-primary">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" />
              <AvatarFallback className="text-4xl font-black">PG</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ProGamer
              </h1>
              <p className="text-muted-foreground mb-4">Топ игрок • Стример • Создатель контента</p>
              
              <div className="flex gap-6 justify-center md:justify-start mb-4">
                <div className="text-center">
                  <p className="text-2xl font-black text-primary">256</p>
                  <p className="text-sm text-muted-foreground">Видео</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-secondary">15.2K</p>
                  <p className="text-sm text-muted-foreground">Подписчиков</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-accent">4.8</p>
                  <p className="text-sm text-muted-foreground">Рейтинг</p>
                </div>
              </div>

              <div className="flex gap-3 justify-center md:justify-start">
                <Button size="lg" className="font-bold">
                  <Icon name="Edit" className="mr-2" size={18} />
                  Редактировать
                </Button>
                <Button size="lg" variant="outline" className="font-bold">
                  <Icon name="Share2" className="mr-2" size={18} />
                  Поделиться
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-6 animate-fade-in">
            <Icon name="Video" className="inline mr-2 mb-1" size={32} />
            Мои видео
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userVideos.map((video, index) => (
              <div
                key={video.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <VideoCard
                  video={video}
                  onPlay={() => setSelectedVideo(video)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
