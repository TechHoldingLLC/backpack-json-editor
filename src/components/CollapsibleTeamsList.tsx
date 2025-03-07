import { useState } from 'react';
import { ChevronDown, Users, Plus, Save, Trash2 } from 'lucide-react';
import { Switch } from '@headlessui/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
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
  isNew?: boolean;
  errors?: {
    id?: string;
    logo_image?: string;
  };
}

interface CollapsibleTeamsListProps {
  teams: Team[];
  onTeamUpdate: (updatedTeam: Partial<Team>, index: number) => void;
  onTeamDelete: (index: number) => void;
  onTeamSave: (index: number) => void;
  onAddTeam: () => void;
  getFullImageUrl: (path: string) => string;
  teamLogoErrors: boolean[];
  defaultExpanded?: boolean;
}

const CollapsibleTeamsList = ({
  teams,
  onTeamUpdate,
  onTeamDelete,
  onTeamSave,
  onAddTeam,
  getFullImageUrl,
  teamLogoErrors,
  defaultExpanded = false
}: CollapsibleTeamsListProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  // Count enabled teams
  const enabledTeamsCount = teams.filter(team => team.enabled).length;
  
  return (
    <div className="space-y-4">
      <Accordion 
        type="single" 
        collapsible 
        defaultValue={defaultExpanded ? "teams-section" : undefined}
        className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden"
      >
        <AccordionItem value="teams-section" className="border-0">
          <AccordionTrigger 
            className="px-6 py-4 hover:no-underline hover:bg-gray-50 group"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Teams</h3>
                <span className="ml-2 px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  {teams.length} total
                </span>
                <span className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {enabledTeamsCount} enabled
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddTeam();
                  }}
                  variant="outline"
                  size="sm"
                  className="h-8 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add Team
                </Button>
                
                <div className="flex-shrink-0 text-gray-400 group-hover:text-primary transition-colors">
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} />
                </div>
              </div>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="px-0 py-0 border-t border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[300px]">
                      Logo Path
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preview
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teams.map((team, index) => (
                    <tr key={index} className={team.isNew ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Input
                          value={team.id}
                          onChange={(e) => onTeamUpdate({ id: e.target.value }, index)}
                          className={`h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                            team.errors?.id ? 'border-red-500 focus:ring-red-500' : ''
                          }`}
                          placeholder="Enter team ID"
                        />
                        {team.errors?.id && (
                          <p className="mt-1 text-sm text-red-500">{team.errors.id}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Input
                          value={team.logo_image}
                          onChange={(e) => onTeamUpdate({ logo_image: e.target.value }, index)}
                          className={`h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                            team.errors?.logo_image || teamLogoErrors[index] ? 'border-red-500 focus:ring-red-500' : ''
                          }`}
                          placeholder="Enter logo path"
                        />
                        {(team.errors?.logo_image || teamLogoErrors[index]) && (
                          <p className="mt-1 text-sm text-red-500">
                            {team.errors?.logo_image || 'Invalid image path'}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <img
                            src={getFullImageUrl(team.logo_image)}
                            alt={`${team.id} logo`}
                            className={`w-20 h-20 rounded-lg object-contain bg-gray-50 border ${
                              teamLogoErrors[index] ? 'border-red-500' : 'border-gray-200'
                            }`}
                          />
                          {teamLogoErrors[index] && (
                            <div className="absolute -top-2 -right-2">
                              <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 text-red-500 rounded-full text-xs font-medium">
                                !
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={team.enabled}
                            onChange={() => onTeamUpdate({ enabled: !team.enabled }, index)}
                            className={`${
                              team.enabled ? 'bg-primary' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                          >
                            <span className="sr-only">Enable Team</span>
                            <span
                              className={`${
                                team.enabled ? 'translate-x-6' : 'translate-x-1'
                              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                            />
                          </Switch>
                          <span className="text-sm text-gray-600">
                            {team.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.isNew ? (
                          <Button
                            onClick={() => onTeamSave(index)}
                            variant="outline"
                            size="sm"
                            className="h-9 bg-white text-primary border-primary hover:bg-primary/10 transition-colors"
                            disabled={!team.id || !team.logo_image || teamLogoErrors[index]}
                          >
                            <Save className="w-4 h-4 mr-1.5" />
                            Save
                          </Button>
                        ) : (
                          <Button
                            onClick={() => onTeamDelete(index)}
                            variant="ghost"
                            size="sm"
                            className="h-9 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-1.5" />
                            Delete
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CollapsibleTeamsList; 