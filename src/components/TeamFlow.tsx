import { useState } from 'react';
import { Team, Mission, Question, Ideas as IdeasType, IdeaSection } from './team/types';
import { TeamDetails } from './team/TeamDetails';
import { Ideas } from './team/Ideas';
import { Missions } from './team/Missions';

interface TeamFlowProps {
  initialTeam: Team;
  onTeamUpdate: (team: Team) => void;
}

const TeamFlow = ({ initialTeam, onTeamUpdate }: TeamFlowProps) => {
  const [team, setTeam] = useState<Team>(initialTeam);

  const getFullImageUrl = (path: string) => {
    if (!path) return 'https://via.placeholder.com/150?text=No+Image';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    
    const assetUrl = import.meta.env.VITE_ASSET_URL;
    if (!assetUrl) {
      console.warn('VITE_ASSET_URL environment variable is not defined');
      return path;
    }

    // Remove any leading/trailing slashes from both assetUrl and path
    const cleanAssetUrl = assetUrl.replace(/\/+$/, '');
    const cleanPath = path.replace(/^\/+/, '');
    
    return `${cleanAssetUrl}/${cleanPath}`;
  };

  const handleTeamChange = (section: string, field: string, value: unknown) => {
    let updatedTeam: Team;

    switch (section) {
      case 'basic_info':
        updatedTeam = { ...team, [field]: value };
        break;
      case 'welcome_details':
        updatedTeam = {
          ...team,
          welcome_details: { ...team.welcome_details, [field]: value }
        };
        break;
      case 'team_home':
        updatedTeam = {
          ...team,
          team_home: { ...team.team_home, [field]: value }
        };
        break;
      default:
        return;
    }

    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleIdeasChange = (section: keyof IdeasType, field: string, value: unknown) => {
    const updatedTeam = {
      ...team,
      ideas: {
        ...team.ideas,
        [section]: typeof value === 'string' ? value : { ...team.ideas[section] as IdeaSection, [field]: value }
      }
    };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleMissionsChange = (index: number, field: string, value: unknown) => {
    const updatedMissions = [...team.missions];
    updatedMissions[index] = { ...updatedMissions[index], [field]: value };
    const updatedTeam = { ...team, missions: updatedMissions };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleMissionAdd = () => {
    const newMission: Mission = {
      id: '',
      title: '',
      description: '',
      image: '',
      focus_type: '',
      level: '',
      completion_msg: '',
      completion_image: '',
      questions: []
    };
    const updatedTeam = { ...team, missions: [...team.missions, newMission] };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleMissionRemove = (index: number) => {
    const updatedMissions = team.missions.filter((_, i) => i !== index);
    const updatedTeam = { ...team, missions: updatedMissions };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleQuestionChange = (
    missionIndex: number,
    questionIndex: number,
    field: keyof Question,
    value: unknown
  ) => {
    const updatedMissions = [...team.missions];
    const updatedQuestions = [...updatedMissions[missionIndex].questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      [field]: value
    };
    updatedMissions[missionIndex] = {
      ...updatedMissions[missionIndex],
      questions: updatedQuestions
    };
    const updatedTeam = { ...team, missions: updatedMissions };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleQuestionAdd = (missionIndex: number) => {
    const updatedMissions = [...team.missions];
    const newQuestion: Question = {
      question_type: 'options_list',
      question: '',
      allow_multiple_selection: false,
      options: []
    };
    updatedMissions[missionIndex].questions.push(newQuestion);
    const updatedTeam = { ...team, missions: updatedMissions };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleQuestionRemove = (missionIndex: number, questionIndex: number) => {
    const updatedMissions = [...team.missions];
    updatedMissions[missionIndex].questions = updatedMissions[missionIndex].questions.filter(
      (_, i) => i !== questionIndex
    );
    const updatedTeam = { ...team, missions: updatedMissions };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleIdeasQuestionChange = (
    section: "review_idea" | "select_idea",
    questionIndex: number,
    field: string,
    value: unknown
  ) => {
    const updatedTeam = {
      ...team,
      ideas: {
        ...team.ideas,
        [section]: {
          ...(team.ideas[section] as IdeaSection),
          questions: (team.ideas[section] as IdeaSection).questions?.map((q: Question, i: number) =>
            i === questionIndex ? { ...q, [field]: value } : q
          ) || []
        }
      }
    };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleIdeasQuestionAdd = (section: keyof IdeasType) => {
    const newQuestion: Question = {
      question_type: 'options_list',
      question: '',
      options: [],
      allow_multiple_selection: false
    };
    const updatedTeam = {
      ...team,
      ideas: {
        ...team.ideas,
        [section]: {
          ...(team.ideas[section] as IdeaSection),
          questions: [...((team.ideas[section] as IdeaSection).questions || []), newQuestion]
        }
      }
    };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleIdeasQuestionRemove = (section: keyof IdeasType, questionIndex: number) => {
    const updatedTeam = {
      ...team,
      ideas: {
        ...team.ideas,
        [section]: {
          ...(team.ideas[section] as IdeaSection),
          questions: (team.ideas[section] as IdeaSection).questions?.filter((_, i: number) => i !== questionIndex) || []
        }
      }
    };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  return (
    <div className="space-y-12">
      <TeamDetails
        team={team}
        getFullImageUrl={getFullImageUrl}
        onTeamChange={handleTeamChange}
      />

      <Missions
        missions={team.missions}
        getFullImageUrl={getFullImageUrl}
        onMissionChange={handleMissionsChange}
        onMissionAdd={handleMissionAdd}
        onMissionRemove={handleMissionRemove}
        onQuestionChange={handleQuestionChange}
        onQuestionAdd={handleQuestionAdd}
        onQuestionRemove={handleQuestionRemove}
      />

      <Ideas
        ideas={team.ideas}
        getFullImageUrl={getFullImageUrl}
        onIdeasChange={handleIdeasChange}
        onQuestionChange={handleIdeasQuestionChange}
        onQuestionAdd={handleIdeasQuestionAdd}
        onQuestionRemove={handleIdeasQuestionRemove}
      />
    </div>
  );
};

export default TeamFlow; 