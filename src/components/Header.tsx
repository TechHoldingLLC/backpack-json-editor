import GreenLogo from '../assets/GreenLogo.png';

interface HeaderProps {
  activeTab: 'leagues' | 'teams';
  onTabChange: (tab: 'leagues' | 'teams') => void;
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={GreenLogo} alt="Backpack Logo" className="h-8" />
          </div>
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => onTabChange('teams')}
              className={`text-base font-medium transition-colors ${
                activeTab === 'teams' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Teams
            </button>
            <button
              onClick={() => onTabChange('leagues')}
              className={`text-base font-medium transition-colors ${
                activeTab === 'leagues' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Leagues
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}; 