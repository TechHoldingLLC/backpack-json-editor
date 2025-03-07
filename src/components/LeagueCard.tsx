import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { validateS3ImagePath } from '../utils/validator';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Trophy, 
  Image as ImageIcon,
  Hash,
  ToggleLeft
} from 'lucide-react';
import CollapsibleTeamsList from './CollapsibleTeamsList';

interface Team {
  id: string;
  logo_image: string;
  enabled: boolean;
  isNew?: boolean;
  errors?: {
    id?: string;
    logo_image?: string;
  };
}

interface League {
  id: string;
  logo_image: string;
  enabled: boolean;
  teams: Team[];
}

interface LeagueCardProps {
  league: League;
  onUpdate: (updatedLeague: League) => void;
}

const LeagueCard = ({ league, onUpdate }: LeagueCardProps) => {
  const [isEnabled, setIsEnabled] = useState(league.enabled);
  const [leagueId, setLeagueId] = useState(league.id);
  const [teams, setTeams] = useState<Team[]>(
    league.teams.map(team => ({
      ...team,
      id: team.id || '',
      logo_image: team.logo_image || '',
      isNew: false,
    }))
  );
  const [logoError, setLogoError] = useState(false);
  const [teamLogoErrors, setTeamLogoErrors] = useState<boolean[]>([]);

  const assetUrl = import.meta.env.VITE_ASSET_URL || '';

  const getFullImageUrl = (path: string) => {
    // If the path already starts with http(s), return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Remove any leading slashes from the path
    const cleanPath = path.replace(/^\/+/, '');
    return `${assetUrl}${cleanPath}`;
  };

  useEffect(() => {
    // Validate league logo
    setLogoError(!validateS3ImagePath(getFullImageUrl(league.logo_image)));

    // Validate team logos
    const errors = teams.map((team) => !validateS3ImagePath(getFullImageUrl(team.logo_image)));
    setTeamLogoErrors(errors);
  }, [league.logo_image, teams]);

  // Sync local state with parent props when league changes
  useEffect(() => {
    setLeagueId(league.id);
  }, [league.id]);

  const handleToggle = () => {
    const updatedEnabled = !isEnabled;
    setIsEnabled(updatedEnabled);
    onUpdate({
      ...league,
      enabled: updatedEnabled,
    });
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newId = event.target.value;
    setLeagueId(newId);
    // Update parent immediately with complete league data
    onUpdate({
      ...league,
      id: newId,
      enabled: isEnabled,
      teams: teams.map(team => ({
        id: team.id,
        logo_image: team.logo_image,
        enabled: team.enabled
      }))
    });
  };

  // Remove handleIdBlur since we're updating immediately
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLogoPath = e.target.value;
    onUpdate({
      ...league,
      id: leagueId, // Make sure to use the current leagueId
      logo_image: newLogoPath,
      enabled: isEnabled,
      teams: teams.map(team => ({
        id: team.id,
        logo_image: team.logo_image,
        enabled: team.enabled
      }))
    });
  };

  const handleTeamUpdate = (updatedTeam: Partial<Team>, index: number) => {
    const newTeams = teams.map((team, i) => {
      if (i === index) {
        return {
          ...team,
          ...updatedTeam,
        };
      }
      return team;
    });
    
    setTeams(newTeams);
    
    // Only update parent if team is not new
    if (!newTeams[index].isNew) {
      setTimeout(() => {
        const cleanTeams = newTeams.map(team => ({
          id: team.id,
          logo_image: team.logo_image,
          enabled: team.enabled
        }));
        
        onUpdate({
          ...league,
          teams: cleanTeams,
        });
      }, 300);
    }
  };

  const handleAddTeam = () => {
    const newTeam: Team = {
      id: '',
      logo_image: '',
      enabled: true,
      isNew: true,
    };
    const newTeams = [...teams, newTeam];
    setTeams(newTeams);
  };

  const validateTeam = (team: Team): boolean => {
    const errors = {
      id: !team.id ? 'Team ID is required' : undefined,
      logo_image: !team.logo_image ? 'Logo Path is required' : undefined,
    };

    const hasErrors = Object.values(errors).some(error => error !== undefined);
    if (hasErrors) {
      const newTeams = teams.map(t => 
        t === team ? { ...t, errors } : t
      );
      setTeams(newTeams);
    }

    return !hasErrors;
  };

  const handleSaveTeam = (index: number) => {
    const team = teams[index];
    if (!validateTeam(team)) {
      return;
    }

    const newTeams = teams.map((t, i) => {
      if (i === index) {
        return {
          ...t,
          isNew: false,
          errors: undefined
        };
      }
      return t;
    });
    setTeams(newTeams);
    
    const cleanTeams = newTeams.map(team => ({
      id: team.id,
      logo_image: team.logo_image,
      enabled: team.enabled
    }));
    
    onUpdate({
      ...league,
      teams: cleanTeams,
    });
  };

  const handleDeleteTeam = (index: number) => {
    const newTeams = teams.filter((_, i) => i !== index);
    setTeams(newTeams);
    onUpdate({
      ...league,
      teams: newTeams,
    });
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* League Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">League Basic Info</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-primary" />
                  League ID
                </Label>
                <Input
                  value={leagueId}
                  onChange={handleIdChange}
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter league ID"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ToggleLeft className="w-4 h-4 text-primary" />
                  Status
                </Label>
                <div className="flex items-center gap-3 h-9 px-3">
                  <Switch
                    checked={isEnabled}
                    onChange={handleToggle}
                    className={`${
                      isEnabled ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    <span className="sr-only">Enable League</span>
                    <span
                      className={`${
                        isEnabled ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                  <span className="text-sm text-gray-600">
                    {isEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className="col-span-2 space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  Logo Path
                </Label>
                <div className="flex items-start gap-6">
                  <div className="w-[400px]">
                    <Input
                      value={league.logo_image}
                      onChange={handleLogoChange}
                      className={`h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                        logoError ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="Enter logo path"
                    />
                    {logoError && (
                      <p className="mt-1 text-sm text-red-500">Invalid image path</p>
                    )}
                  </div>
                  <div className="shrink-0">
                    <div className="relative">
                      <img
                        src={getFullImageUrl(league.logo_image)}
                        alt={`${league.id} logo`}
                        className={`w-24 h-24 rounded-lg object-contain bg-gray-50 border ${
                          logoError ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {logoError && (
                        <div className="absolute -top-2 -right-2">
                          <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 text-red-500 rounded-full text-xs font-medium">
                            !
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teams Section */}
          <CollapsibleTeamsList
            teams={teams}
            onTeamUpdate={handleTeamUpdate}
            onTeamDelete={handleDeleteTeam}
            onTeamSave={handleSaveTeam}
            onAddTeam={handleAddTeam}
            getFullImageUrl={getFullImageUrl}
            teamLogoErrors={teamLogoErrors}
            defaultExpanded={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LeagueCard;