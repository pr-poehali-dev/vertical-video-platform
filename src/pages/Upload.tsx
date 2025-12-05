import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.startsWith('video/')) {
      setFile(droppedFile);
    } else {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, загрузите видео файл',
        variant: 'destructive'
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Загружено!',
      description: 'Ваше видео успешно загружено на платформу'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8 max-w-3xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Загрузить Видео
          </h1>
          <p className="text-muted-foreground">Поделись своим контентом с миром</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-scale-in">
          <div
            className={`border-4 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-primary bg-primary/10 scale-105' 
                : 'border-border hover:border-primary/50'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={64} className="mx-auto mb-4 text-primary" />
            <p className="text-xl font-bold mb-2">
              {file ? file.name : 'Перетащите видео сюда'}
            </p>
            <p className="text-muted-foreground mb-4">или выберите файл</p>
            <Input
              type="file"
              accept="video/*"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <Label htmlFor="file-upload">
              <Button type="button" variant="outline" size="lg" asChild>
                <span className="cursor-pointer">
                  <Icon name="FolderOpen" className="mr-2" size={20} />
                  Выбрать файл
                </span>
              </Button>
            </Label>
          </div>

          <div className="space-y-4 bg-card p-6 rounded-xl border-2 border-border">
            <div>
              <Label htmlFor="title" className="text-lg font-bold">Название</Label>
              <Input
                id="title"
                placeholder="Введите название видео"
                className="mt-2 h-12 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-lg font-bold">Описание</Label>
              <Textarea
                id="description"
                placeholder="Расскажите о своем видео"
                className="mt-2 min-h-32 text-lg"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 text-xl font-black"
            disabled={!file}
          >
            <Icon name="Rocket" className="mr-2" size={24} />
            Запустить в эфир
          </Button>
        </form>
      </div>
    </div>
  );
}
