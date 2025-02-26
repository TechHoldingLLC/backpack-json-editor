import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { validateS3ImagePath } from '../utils/validator';

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
    onUpdate({
      ...league,
      id: newId,
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
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative">
            <img
              src={getFullImageUrl(league.logo_image)}
              alt={`${league.id} logo`}
              className={`w-12 h-12 object-contain ${
                logoError ? 'border-2 border-red-500' : ''
              }`}
            />
            {logoError && (
              <div className="absolute -top-2 -right-2">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 text-red-500 rounded-full">
                  !
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 flex items-start space-x-4">
            <div className="relative w-64">
              <input
                type="text"
                id={`league-id-${league.id}`}
                value={leagueId}
                onChange={handleIdChange}
                className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white placeholder-transparent transition-all"
                placeholder="League ID"
              />
              <label
                htmlFor={`league-id-${league.id}`}
                className="absolute left-2 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                League ID
              </label>
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                id={`league-logo-${league.id}`}
                value={league.logo_image}
                onChange={(e) => onUpdate({ ...league, logo_image: e.target.value })}
                className={`peer w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white placeholder-transparent transition-all ${
                  logoError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="Logo Path"
              />
              <label
                htmlFor={`league-logo-${league.id}`}
                className={`absolute left-2 -top-2.5 bg-white px-2 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm ${
                  logoError 
                    ? 'text-red-500 peer-placeholder-shown:text-red-400 peer-focus:text-red-500' 
                    : 'text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-indigo-600'
                }`}
              >
                Logo Path
              </label>
              {logoError && (
                <p className="mt-1 text-sm text-red-500">Invalid image path</p>
              )}
            </div>
          </div>
        </div>
        <Switch
          checked={isEnabled}
          onChange={handleToggle}
          className={`${
            isEnabled ? 'bg-indigo-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full ml-4`}
        >
          <span className="sr-only">Enable league</span>
          <span
            className={`${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Teams</h3>
          <button
            onClick={handleAddTeam}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Team
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Logo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enabled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teams.map((team, index) => (
                <tr key={`team_${index}`} className={team.isNew ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <input
                        type="text"
                        id={`team-id-${team.id}`}
                        value={team.id}
                        onChange={(e) => handleTeamUpdate({ id: e.target.value }, index)}
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white placeholder-transparent transition-all"
                        placeholder="Team ID"
                      />
                      <label
                        htmlFor={`team-id-${team.id}`}
                        className="absolute left-2 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                      >
                        Team ID
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <img
                        src={getFullImageUrl(team.logo_image)}
                        alt={`${team.id} logo`}
                        className={`w-12 h-12 object-contain ${
                          teamLogoErrors[index] ? 'border-2 border-red-500' : ''
                        }`}
                      />
                      {teamLogoErrors[index] && (
                        <div className="absolute -top-2 -right-2">
                          <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 text-red-500 rounded-full">
                            !
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <img
                        src={getFullImageUrl(team.logo_image)}
                        alt={`${team.id} preview`}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <input
                        type="text"
                        id={`team-enabled-${team.id}`}
                        value={team.enabled ? 'Enabled' : 'Disabled'}
                        onChange={(e) => handleTeamUpdate({ enabled: e.target.value === 'Enabled' }, index)}
                        className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white placeholder-transparent transition-all"
                        placeholder="Team Enabled"
                      />
                      <label
                        htmlFor={`team-enabled-${team.id}`}
                        className="absolute left-2 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                      >
                        Team Enabled
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {team.isNew ? (
                      <button
                        onClick={() => handleSaveTeam(index)}
                        className={`px-4 py-2 rounded-md transition-colors ${
                          !team.id || !team.logo_image || teamLogoErrors[index]
                            ? 'bg-green-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white`}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteTeam(index)}
                        className="text-red-600 hover:text-red-900 px-4 py-2 rounded-md transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeagueCard;