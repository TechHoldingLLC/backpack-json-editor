import { useState } from 'react';
import { ChevronDown, Trophy } from 'lucide-react';
import LeagueCard from './LeagueCard';
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent 
} from './ui/accordion';

interface Team {
  id: string;
  logo_image: string;
  enabled: boolean;
}

interface League {
  id: string;
  logo_image: string;
  enabled: boolean;
  teams: Team[];
}

interface CollapsibleLeagueCardProps {
  league: League;
  onUpdate: (updatedLeague: League) => void;
  defaultExpanded?: boolean;
}

const CollapsibleLeagueCard = ({ 
  league, 
  onUpdate, 
  defaultExpanded = false 
}: CollapsibleLeagueCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  // Get the asset URL for image preview
  const assetUrl = import.meta.env.VITE_ASSET_URL || '';
  
  // Function to get full image URL
  const getFullImageUrl = (path: string) => {
    // If the path already starts with http(s), return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Remove any leading slashes from the path
    const cleanPath = path.replace(/^\/+/, '');
    return `${assetUrl}${cleanPath}`;
  };

  // Count enabled teams
  const enabledTeamsCount = league.teams.filter(team => team.enabled).length;
  
  return (
    <Accordion 
      type="single" 
      collapsible 
      defaultValue={defaultExpanded ? league.id : undefined}
      className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden"
    >
      <AccordionItem value={league.id} className="border-0">
        <AccordionTrigger 
          className="px-6 py-4 hover:no-underline hover:bg-gray-50 group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4 w-full">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={getFullImageUrl(league.logo_image)} 
                alt={`${league.id} logo`}
                className="w-full h-full object-contain bg-white"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">{league.id}</h3>
                <span className={`px-2 py-0.5 text-xs rounded-full ${league.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {league.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {league.teams.length} teams ({enabledTeamsCount} enabled)
              </p>
            </div>
            
            <div className="flex-shrink-0 text-gray-400 group-hover:text-primary transition-colors">
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} />
            </div>
          </div>
        </AccordionTrigger>
        
        <AccordionContent className="px-0 py-0 border-t border-gray-100">
          <LeagueCard league={league} onUpdate={onUpdate} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CollapsibleLeagueCard; 