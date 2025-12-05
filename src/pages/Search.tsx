import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Input } from '@/components/ui/input';
import { VideoCard } from '@/components/video/VideoCard';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

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

const allVideos: Video[] = [
  {
    id: '1',
    title: 'Эпичный геймплей CS:GO',
    author: 'ProGamer',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
    videoUrl: 'https://example.com/video1.mp4',
    likes: 1250,
    views: 15000,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Лучшие моменты Dota 2',
    author: 'StreamKing',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    videoUrl: 'https://example.com/video2.mp4',
    likes: 890,
    views: 9500,
    rating: 4.5
  },
  {
    id: '3',
    title: 'Турнир PRO Fortnite',
    author: 'ESportsMaster',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc',
    videoUrl: 'https://example.com/video3.mp4',
    likes: 2100,
    views: 25000,
    rating: 4.9
  },
  {
    id: '4',
    title: 'Стрим Valorant',
    author: 'NightGamer',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f',
    videoUrl: 'https://example.com/video4.mp4',
    likes: 650,
    views: 7200,
    rating: 4.3
  }
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [filter, setFilter] = useState<'all' | 'top' | 'new'>('all');

  const filteredVideos = allVideos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Поиск
          </h1>
          
          <div className="relative mb-6">
            <Icon 
              name="Search" 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
              size={24}
            />
            <Input
              type="text"
              placeholder="Найди своё видео..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-4 h-14 text-lg border-2 focus:border-primary transition-colors"
            />
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="font-bold"
            >
              <Icon name="Grid3x3" className="mr-2" size={18} />
              Все
            </Button>
            <Button
              variant={filter === 'top' ? 'default' : 'outline'}
              onClick={() => setFilter('top')}
              className="font-bold"
            >
              <Icon name="TrendingUp" className="mr-2" size={18} />
              Топ
            </Button>
            <Button
              variant={filter === 'new' ? 'default' : 'outline'}
              onClick={() => setFilter('new')}
              className="font-bold"
            >
              <Icon name="Sparkles" className="mr-2" size={18} />
              Новые
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <VideoCard
                video={video}
                onPlay={() => setSelectedVideo(video)}
              />
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="SearchX" size={80} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-2xl font-bold text-muted-foreground">Ничего не найдено</p>
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
