import { ChangeEvent } from 'react';
import type { ExtendedTeam } from './team/types';

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

interface FileUploadProps {
  type: 'league' | 'team';
  onFileUpload: (jsonData: LeagueData | ExtendedTeam) => void;
  onError: (error: string) => void;
}

const FileUpload = ({ type, onFileUpload, onError }: FileUploadProps) => {
  const validateLeagueData = (data: unknown): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data || typeof data !== 'object') {
      errors.push('Invalid JSON structure');
      return { valid: false, errors };
    }

    const leagueData = data as Partial<LeagueData>;
    
    if (!Array.isArray(leagueData.leagues)) {
      errors.push('Leagues must be an array');
      return { valid: false, errors };
    }

    leagueData.leagues.forEach((league, index) => {
      if (!league.id) errors.push(`League ${index + 1}: Missing ID`);
      if (!league.logo_image) errors.push(`League ${index + 1}: Missing logo image`);
      if (league.enabled === undefined) errors.push(`League ${index + 1}: Missing enabled status`);
      
      if (!Array.isArray(league.teams)) {
        errors.push(`League ${index + 1}: Teams must be an array`);
      } else {
        league.teams.forEach((team, teamIndex) => {
          if (!team.id) errors.push(`League ${index + 1}, Team ${teamIndex + 1}: Missing ID`);
          if (!team.logo_image) errors.push(`League ${index + 1}, Team ${teamIndex + 1}: Missing logo image`);
          if (team.enabled === undefined) errors.push(`League ${index + 1}, Team ${teamIndex + 1}: Missing enabled status`);
        });
      }
    });

    return { valid: errors.length === 0, errors };
  };

  const validateTeamData = (data: unknown): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data || typeof data !== 'object') {
      errors.push('Invalid JSON structure');
      return { valid: false, errors };
    }

    const teamData = data as Partial<ExtendedTeam>;

    // Validate required fields
    if (!teamData.id) errors.push('Missing team ID');
    if (!teamData.name) errors.push('Missing team name');
    if (!teamData.logo_image) errors.push('Missing team logo image');
    if (!teamData.survey_url) errors.push('Missing survey URL');
    if (teamData.enabled === undefined) errors.push('Missing enabled status');

    // Validate welcome details
    if (!teamData.welcome_details) {
      errors.push('Missing welcome details');
    } else {
      if (!teamData.welcome_details.title) errors.push('Missing welcome details title');
      if (!teamData.welcome_details.description) errors.push('Missing welcome details description');
      if (!teamData.welcome_details.welcome_image) errors.push('Missing welcome image');
      if (!teamData.welcome_details.author) errors.push('Missing welcome details author');
    }

    // Validate team home
    if (!teamData.team_home) {
      errors.push('Missing team home section');
    } else {
      if (!teamData.team_home.motto) errors.push('Missing team motto');
      if (!teamData.team_home.best_ideas) errors.push('Missing best ideas section');
      if (!teamData.team_home.most_missions) errors.push('Missing most missions section');
      if (!Array.isArray(teamData.team_home.top_team_rank)) errors.push('Top team rank must be an array');
    }

    // Validate missions
    if (!Array.isArray(teamData.missions)) {
      errors.push('Missions must be an array');
    }

    // Validate ideas
    if (!teamData.ideas) {
      errors.push('Missing ideas section');
    } else {
      if (!teamData.ideas.default_youtube_thumbnail_image) errors.push('Missing default YouTube thumbnail image');
      if (!teamData.ideas.menu_list) errors.push('Missing menu list');
      if (!Array.isArray(teamData.ideas.play_ideas)) errors.push('Play ideas must be an array');
      if (!teamData.ideas.review_idea) errors.push('Missing review idea section');
      if (!teamData.ideas.select_idea) errors.push('Missing select idea section');
      if (!teamData.ideas.submit_idea) errors.push('Missing submit idea section');
    }

    return { valid: errors.length === 0, errors };
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      
      const validation = type === 'league' ? validateLeagueData(jsonData) : validateTeamData(jsonData);
      
      if (!validation.valid) {
        onError(`Invalid JSON structure: ${validation.errors.join(', ')}`);
        return;
      }

      onFileUpload(jsonData);
    } catch {
      onError('Error parsing JSON file. Please ensure it is a valid JSON file.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Get Started
        </h2>
        <p className="text-sm text-gray-600">
          Upload your {type === 'league' ? 'leagues and teams' : 'team'} JSON file to begin editing
        </p>
      </div>
      <label className="flex flex-col items-center justify-center w-64 h-40 bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">JSON files only</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".json"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload; 