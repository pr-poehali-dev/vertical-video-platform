import { useState } from 'react';
import { VideoCard } from '@/components/video/VideoCard';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { Navigation } from '@/components/layout/Navigation';

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

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Эпичный геймплей',
    author: 'ProGamer',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
    videoUrl: 'https://example.com/video1.mp4',
    likes: 1250,
    views: 15000,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Лучшие моменты',
    author: 'StreamKing',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    videoUrl: 'https://example.com/video2.mp4',
    likes: 890,
    views: 9500,
    rating: 4.5
  },
  {
    id: '3',
    title: 'Турнир PRO',
    author: 'ESportsMaster',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc',
    videoUrl: 'https://example.com/video3.mp4',
    likes: 2100,
    views: 25000,
    rating: 4.9
  }
];

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/10">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg">
            VITANET 2
          </h1>
          <p className="text-xl text-muted-foreground">Твоя игровая видеоплатформа</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockVideos.map((video, index) => (
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

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
