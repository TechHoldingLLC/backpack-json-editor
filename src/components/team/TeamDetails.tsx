import { BasicInfo } from './BasicInfo';
import { WelcomeDetails } from './WelcomeDetails';
import { TeamHome } from './TeamHome';

interface TeamDetailsProps {
  team: {
    id: string;
    name: string;
    logo_image: string;
    survey_url: string;
    welcome_details: {
      title: string;
      description: string;
      welcome_image: string;
      author: string;
    };
    team_home: {
      motto: string;
      best_ideas: {
        user_name: string;
        user_image: string;
      };
      most_missions: {
        user_name: string;
        user_image: string;
      };
      top_team_rank: Array<{
        user_name: string;
        user_image: string;
      }>;
    };
  };
  getFullImageUrl: (path: string) => string;
  onTeamChange: (section: string, field: string, value: unknown) => void;
}

export const TeamDetails = ({ team, getFullImageUrl, onTeamChange }: TeamDetailsProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <BasicInfo
          id={team.id}
          name={team.name}
          logoImage={team.logo_image}
          surveyUrl={team.survey_url}
          getFullImageUrl={getFullImageUrl}
          onBasicInfoChange={(field, value) => onTeamChange('basic_info', field, value)}
        />

        <WelcomeDetails
          title={team.welcome_details.title}
          description={team.welcome_details.description}
          welcomeImage={team.welcome_details.welcome_image}
          author={team.welcome_details.author}
          getFullImageUrl={getFullImageUrl}
          onWelcomeDetailsChange={(field, value) => onTeamChange('welcome_details', field, value)}
        />

        <TeamHome
          teamHome={team.team_home}
          getFullImageUrl={getFullImageUrl}
          onTeamHomeChange={(field, value) => onTeamChange('team_home', field, value)}
        />
      </div>
    </div>
  );
}; 