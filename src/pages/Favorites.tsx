import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { VideoCard } from '@/components/video/VideoCard';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import Icon from '@/components/ui/icon';

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

const favoriteVideos: Video[] = [
  {
    id: '1',
    title: 'Лучший момент турнира',
    author: 'ESportsMaster',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc',
    videoUrl: 'https://example.com/video1.mp4',
    likes: 2100,
    views: 25000,
    rating: 4.9
  },
  {
    id: '2',
    title: 'Невероятная игра',
    author: 'ProGamer',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
    videoUrl: 'https://example.com/video2.mp4',
    likes: 1250,
    views: 15000,
    rating: 4.8
  },
  {
    id: '3',
    title: 'Эпичный камбэк',
    author: 'StreamKing',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    videoUrl: 'https://example.com/video3.mp4',
    likes: 890,
    views: 9500,
    rating: 4.5
  }
];

export default function Favorites() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="text-center mb-12 animate-fade-in">
          <Icon 
            name="Heart" 
            size={64} 
            className="mx-auto mb-4 text-secondary fill-secondary animate-pulse-glow"
          />
          <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Избранное
          </h1>
          <p className="text-xl text-muted-foreground">
            Твои любимые видео в одном месте
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteVideos.map((video, index) => (
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

        {favoriteVideos.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="HeartOff" size={80} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-2xl font-bold text-muted-foreground mb-2">
              Пока пусто
            </p>
            <p className="text-muted-foreground">
              Добавь видео в избранное и они появятся здесь
            </p>
          </div>
        )}
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
