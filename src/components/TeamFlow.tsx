import { useState } from 'react';
import { Mission, Question, Ideas as IdeasType, IdeaSection, ExtendedTeam } from './team/types';
import { TeamDetails } from './team/TeamDetails';
import { Ideas } from './team/Ideas';
import { Missions } from './team/Missions';

interface TeamFlowProps {
  initialTeam: ExtendedTeam;
  onTeamUpdate: (team: ExtendedTeam) => void;
}

const TeamFlow = ({ initialTeam, onTeamUpdate }: TeamFlowProps) => {
  const [team, setTeam] = useState(initialTeam);

  const handleTeamChange = (section: string, field: string, value: unknown) => {
    const updatedTeam = { ...team };

    if (section === 'basic_info') {
      updatedTeam[field as keyof ExtendedTeam] = value as never;
    } else if (section === 'welcome_details') {
      updatedTeam.welcome_details[field as keyof typeof team.welcome_details] = value as never;
    } else if (section === 'team_home') {
      if (field === 'motto' && typeof value === 'string') {
        updatedTeam.team_home.motto = value;
      } else if (typeof value === 'object' && value !== null) {
        updatedTeam.team_home[field as keyof typeof team.team_home] = value as never;
      }
    }

    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const assetUrl = import.meta.env.VITE_ASSET_URL || '';

  const getFullImageUrl = (path: string) => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const cleanPath = path.replace(/^\/+/, '');
    return `${assetUrl}${cleanPath}`;
  };

  const handleIdeasChange = (section: keyof IdeasType, field: string, value: unknown) => {
    const currentSection = team.ideas[section] as IdeaSection;
    const updatedTeam = {
      ...team,
      ideas: {
        ...team.ideas,
        [section]: {
          ...currentSection,
          [field]: value
        }
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
    const updatedMissions = team.missions.filter((_: Mission, i: number) => i !== index);
    const updatedTeam = { ...team, missions: updatedMissions };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleQuestionChange = (
    missionIndex: number,
    questionIndex: number,
    field: string,
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
      (_: Question, i: number) => i !== questionIndex
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
          questions: (team.ideas[section] as IdeaSection).questions?.filter((_: Question, i: number) => i !== questionIndex) || []
        }
      }
    };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleYouTubeThumbnailChange = (value: string) => {
    const updatedTeam = {
      ...team,
      ideas: {
        ...team.ideas,
        default_youtube_thumbnail_image: value
      }
    };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handleMenuListChange = (field: keyof IdeasType['menu_list'], value: string) => {
    const updatedTeam = {
      ...team,
      ideas: {
        ...team.ideas,
        menu_list: {
          ...team.ideas.menu_list,
          [field]: value
        }
      }
    };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handlePlayIdeaAdd = () => {
    const updatedTeam = {
      ...team,
      ideas: {
        ...team.ideas,
        play_ideas: [...team.ideas.play_ideas, '']
      }
    };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handlePlayIdeaChange = (index: number, value: string) => {
    const updatedTeam = {
      ...team,
      ideas: {
        ...team.ideas,
        play_ideas: team.ideas.play_ideas.map((idea, i) => i === index ? value : idea)
      }
    };
    setTeam(updatedTeam);
    onTeamUpdate(updatedTeam);
  };

  const handlePlayIdeaRemove = (index: number) => {
    const updatedTeam = {
      ...team,
      ideas: {
        ...team.ideas,
        play_ideas: team.ideas.play_ideas.filter((_, i) => i !== index)
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
        onIdeaChange={handleIdeasChange}
        onQuestionChange={handleIdeasQuestionChange}
        onQuestionAdd={handleIdeasQuestionAdd}
        onQuestionRemove={handleIdeasQuestionRemove}
        onYouTubeThumbnailChange={handleYouTubeThumbnailChange}
        onMenuListChange={handleMenuListChange}
        onPlayIdeaAdd={handlePlayIdeaAdd}
        onPlayIdeaChange={handlePlayIdeaChange}
        onPlayIdeaRemove={handlePlayIdeaRemove}
      />
    </div>
  );
};

export default TeamFlow; 