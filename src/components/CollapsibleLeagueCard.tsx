import { useState } from 'react';
import { ChevronDown, Trophy, Trash2 } from 'lucide-react';
import LeagueCard from './LeagueCard';
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent 
} from './ui/accordion';
import { Button } from './ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

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
  onDelete?: (leagueId: string) => void;
  defaultExpanded?: boolean;
}

const CollapsibleLeagueCard = ({ 
  league, 
  onUpdate, 
  onDelete,
  defaultExpanded = false 
}: CollapsibleLeagueCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
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
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(league.id);
    }
    setShowDeleteDialog(false);
  };
  
  return (
    <>
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
              
              <div className="flex items-center gap-3">
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    onClick={handleDeleteClick}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete League</span>
                  </Button>
                )}
                <div className="flex-shrink-0 text-gray-400 group-hover:text-primary transition-colors">
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} />
                </div>
              </div>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="px-0 py-0 border-t border-gray-100">
            <LeagueCard league={league} onUpdate={onUpdate} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete League</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the league "{league.id}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmDelete}
            >
              Delete League
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CollapsibleLeagueCard; 