import { ImagePreview } from './ImagePreview';
import { 
  Trophy,
  Home,
  Quote,
  Lightbulb,
  Target,
  Medal,
  MonitorSmartphone,
  Crown,
  Star
} from 'lucide-react';

interface TeamMember {
  user_name: string;
  user_image: string;
}

interface TeamHomeData {
  motto: string;
  best_ideas: TeamMember;
  most_missions: TeamMember;
  top_team_rank: TeamMember[];
}

interface TeamHomeProps {
  teamHome: TeamHomeData;
  getFullImageUrl: (path: string) => string;
  onTeamHomeChange: (field: string, value: string | TeamMember | TeamMember[]) => void;
}

export const TeamHome = ({
  teamHome,
  getFullImageUrl,
  onTeamHomeChange,
}: TeamHomeProps) => {
  const handleTeamMemberChange = (
    section: 'best_ideas' | 'most_missions',
    field: string,
    value: string
  ) => {
    onTeamHomeChange(section, {
      ...teamHome[section],
      [field]: value,
    });
  };

  const handleTopTeamMemberChange = (index: number, field: string, value: string) => {
    const newTopTeam = [...teamHome.top_team_rank];
    newTopTeam[index] = {
      ...newTopTeam[index],
      [field]: value,
    };
    onTeamHomeChange('top_team_rank', newTopTeam);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            Team Home
          </h2>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <MonitorSmartphone className="w-4 h-4" />
            Home Screen
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Motto Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label htmlFor="motto" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Quote className="w-4 h-4 text-primary" />
              Team Motto
            </label>
            <input
              type="text"
              id="motto"
              value={teamHome.motto}
              onChange={(e) => onTeamHomeChange('motto', e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-lg font-medium"
              placeholder="Enter team motto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Best Ideas Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-900">Best Ideas</h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <ImagePreview
                    src={getFullImageUrl(teamHome.best_ideas.user_image)}
                    alt="Best Ideas User"
                    className="w-24 h-24 rounded-full object-cover bg-gray-50 shadow-md ring-4 ring-yellow-100"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white p-1.5 rounded-full">
                    <Star className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={teamHome.best_ideas.user_name}
                    onChange={(e) => handleTeamMemberChange('best_ideas', 'user_name', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter username"
                  />
                  <input
                    type="text"
                    value={teamHome.best_ideas.user_image}
                    onChange={(e) => handleTeamMemberChange('best_ideas', 'user_image', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter user image path"
                  />
                </div>
              </div>
            </div>

            {/* Most Missions Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900">Most Missions</h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <ImagePreview
                    src={getFullImageUrl(teamHome.most_missions.user_image)}
                    alt="Most Missions User"
                    className="w-24 h-24 rounded-full object-cover bg-gray-50 shadow-md ring-4 ring-red-100"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-red-500 text-white p-1.5 rounded-full">
                    <Medal className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={teamHome.most_missions.user_name}
                    onChange={(e) => handleTeamMemberChange('most_missions', 'user_name', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter username"
                  />
                  <input
                    type="text"
                    value={teamHome.most_missions.user_image}
                    onChange={(e) => handleTeamMemberChange('most_missions', 'user_image', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter user image path"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Top Team Rank Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">Top Team Rank</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {teamHome.top_team_rank.map((member, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl space-y-4">
                  <div className="relative flex flex-col items-center justify-center mb-2">
                    <ImagePreview
                      src={getFullImageUrl(member.user_image)}
                      alt={`Top Team Member ${index + 1}`}
                      className="w-24 h-24 rounded-full object-cover shadow-md ring-2 ring-primary/20"
                    />
                    <div className="absolute -top-2 -right-2 bg-white shadow-md text-primary font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      #{index + 1}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={member.user_name}
                      onChange={(e) => handleTopTeamMemberChange(index, 'user_name', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Enter username"
                    />
                    <input
                      type="text"
                      value={member.user_image}
                      onChange={(e) => handleTopTeamMemberChange(index, 'user_image', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Enter user image path"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 