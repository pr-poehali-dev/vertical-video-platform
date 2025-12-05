import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const navItems = [
  { path: '/', label: 'Главная', icon: 'Home' as const },
  { path: '/upload', label: 'Загрузить', icon: 'Upload' as const },
  { path: '/search', label: 'Поиск', icon: 'Search' as const },
  { path: '/favorites', label: 'Избранное', icon: 'Heart' as const },
  { path: '/rating', label: 'Рейтинг', icon: 'Trophy' as const },
  { path: '/profile', label: 'Профиль', icon: 'User' as const }
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b-2 border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="Gamepad2" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VITANET 2
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? 'default' : 'ghost'}
                  size="lg"
                  className="font-bold transition-all hover:scale-105"
                >
                  <Icon name={item.icon} size={20} className="mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
        <div className="grid grid-cols-3 gap-1 p-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? 'default' : 'ghost'}
                size="sm"
                className="w-full flex flex-col h-auto py-2 font-bold"
              >
                <Icon name={item.icon} size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
