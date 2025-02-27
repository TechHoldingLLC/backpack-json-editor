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

interface LeagueData {
  leagues: League[];
}

interface Question {
  question_type: string;
  question: string;
  options?: string[];
  video?: string;
  allow_multiple_selection: boolean;
  options_title_left?: string;
  options_title_right?: string;
  option_image?: string;
  image_option_hint?: string;
  dropdown_options?: Array<{
    title: string;
    hint: string;
    options: string[];
  }>;
  image_selection?: Array<{
    title: string;
    image: string;
  }>;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  image: string;
  focus_type: string;
  level: string;
  completion_msg: string;
  completion_image: string;
  questions: Question[];
}

interface TeamHome {
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
}

interface Ideas {
  default_youtube_thumbnail_image: string;
  menu_list: {
    review_title: string;
    review_description: string;
    select_title: string;
    select_description: string;
    submit_title: string;
    submit_description: string;
  };
  play_ideas: string[];
  review_idea: {
    id: string;
    title: string;
    description: string;
    image: string;
    completion_msg: string;
    completion_image: string;
    questions: Question[];
  };
  select_idea: {
    id: string;
    title: string;
    description: string;
    image: string;
    completion_msg: string;
    completion_image: string;
    questions: Question[];
  };
  submit_idea: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
}

interface TeamData {
  id: string;
  name: string;
  logo_image: string;
  survey_url: string;
  enabled: boolean;
  welcome_details: {
    title: string;
    description: string;
    welcome_image: string;
    author: string;
  };
  team_home: TeamHome;
  missions: Mission[];
  ideas: Ideas;
}

interface JsonValidationResult {
  valid: boolean;
  errors: string[];
}

type JsonInput = LeagueData | TeamData;

export const validateJson = (
  json: JsonInput,
  type: 'league' | 'team'
): JsonValidationResult => {
  const errors: string[] = [];

  if (type === 'league') {
    const leagueData = json as LeagueData;
    // Validate league JSON structure
    if (!leagueData.leagues || !Array.isArray(leagueData.leagues)) {
      errors.push('Missing or invalid leagues array');
      return { valid: false, errors };
    }

    leagueData.leagues.forEach((league: League, index: number) => {
      if (!league.id) {
        errors.push(`League at index ${index} is missing id`);
      }
      if (!league.logo_image) {
        errors.push(`League at index ${index} is missing logo_image`);
      }
      if (typeof league.enabled !== 'boolean') {
        errors.push(`League at index ${index} is missing enabled status`);
      }
      if (!Array.isArray(league.teams)) {
        errors.push(`League at index ${index} is missing teams array`);
      } else {
        league.teams.forEach((team: Team, teamIndex: number) => {
          if (!team.id) {
            errors.push(`Team at index ${teamIndex} in league ${league.id} is missing id`);
          }
          if (!team.logo_image) {
            errors.push(`Team at index ${teamIndex} in league ${league.id} is missing logo_image`);
          }
          if (typeof team.enabled !== 'boolean') {
            errors.push(`Team at index ${teamIndex} in league ${league.id} is missing enabled status`);
          }
        });
      }
    });
  } else {
    const teamData = json as TeamData;
    // Validate team JSON structure
    if (!teamData.id) {
      errors.push('Missing team id');
    }
    if (!teamData.name) {
      errors.push('Missing team name');
    }
    if (!teamData.logo_image) {
      errors.push('Missing team logo_image');
    }
    if (!teamData.survey_url) {
      errors.push('Missing team survey_url');
    }
    if (teamData.enabled === undefined || teamData.enabled === null || typeof teamData.enabled !== 'boolean') {
      errors.push('Missing or invalid team enabled status');
    }
    if (!teamData.welcome_details) {
      errors.push('Missing welcome_details object');
    } else {
      if (!teamData.welcome_details.title) {
        errors.push('Missing welcome_details.title');
      }
      if (!teamData.welcome_details.description) {
        errors.push('Missing welcome_details.description');
      }
      if (!teamData.welcome_details.welcome_image) {
        errors.push('Missing welcome_details.welcome_image');
      }
      if (!teamData.welcome_details.author) {
        errors.push('Missing welcome_details.author');
      }
    }

    // Validate team_home
    if (!teamData.team_home) {
      errors.push('Missing team_home object');
    } else {
      if (!teamData.team_home.motto) {
        errors.push('Missing team_home.motto');
      }
      if (!teamData.team_home.best_ideas?.user_name || !teamData.team_home.best_ideas?.user_image) {
        errors.push('Missing or invalid team_home.best_ideas');
      }
      if (!teamData.team_home.most_missions?.user_name || !teamData.team_home.most_missions?.user_image) {
        errors.push('Missing or invalid team_home.most_missions');
      }
      if (!Array.isArray(teamData.team_home.top_team_rank)) {
        errors.push('Missing team_home.top_team_rank array');
      }
    }

    // Validate missions
    if (!Array.isArray(teamData.missions)) {
      errors.push('Missing missions array');
    } else {
      teamData.missions.forEach((mission, index) => {
        if (!mission.id || !mission.title || !mission.description || !mission.image ||
            !mission.focus_type || !mission.level || !mission.completion_msg || !mission.completion_image) {
          errors.push(`Missing required fields in mission at index ${index}`);
        }
        if (!Array.isArray(mission.questions)) {
          errors.push(`Missing questions array in mission at index ${index}`);
        }
      });
    }

    // Validate ideas
    if (!teamData.ideas) {
      errors.push('Missing ideas object');
    } else {
      if (!teamData.ideas.default_youtube_thumbnail_image) {
        errors.push('Missing ideas.default_youtube_thumbnail_image');
      }
      if (!teamData.ideas.menu_list) {
        errors.push('Missing ideas.menu_list');
      }
      if (!Array.isArray(teamData.ideas.play_ideas)) {
        errors.push('Missing ideas.play_ideas array');
      }
      if (!teamData.ideas.review_idea || !teamData.ideas.select_idea || !teamData.ideas.submit_idea) {
        errors.push('Missing required idea sections');
      }
    }
  }

  return { valid: errors.length === 0, errors };
};

export const validateS3ImagePath = (path: string): boolean => {
  if (!path) return false;
  const assetUrl = import.meta.env.VITE_ASSET_URL;
  if (!assetUrl) {
    console.warn('VITE_ASSET_URL environment variable is not defined');
    return false;
  }
  return path.startsWith(assetUrl) || path.startsWith('http://') || path.startsWith('https://');
}; 