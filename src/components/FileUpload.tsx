import { ChangeEvent, useState, useCallback } from 'react';
import type { ExtendedTeam } from './team/types';
import { Upload, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

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
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    await processFile(file);
  };

  const processFile = async (file: File) => {
    setError(null);
    
    if (file.type !== 'application/json') {
      setError('Please upload a JSON file');
      onError('Please upload a JSON file');
      return;
    }

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      
      const validation = type === 'league' ? validateLeagueData(jsonData) : validateTeamData(jsonData);
      
      if (!validation.valid) {
        const errorMessage = `Invalid JSON structure: ${validation.errors.join(', ')}`;
        setError(errorMessage);
        onError(errorMessage);
        return;
      }

      onFileUpload(jsonData);
    } catch {
      const errorMessage = 'Error parsing JSON file. Please ensure it is a valid JSON file.';
      setError(errorMessage);
      onError(errorMessage);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Upload {type === 'league' ? 'League' : 'Team'} Configuration
        </h2>
        <p className="text-base text-gray-600">
          Upload your {type === 'league' ? 'leagues and teams' : 'team'} JSON file to begin editing
        </p>
      </div>

      <div className="w-full">
        <label
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 bg-white",
            isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:bg-gray-50",
            error ? "border-red-300 bg-red-50" : ""
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
            {error ? (
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            ) : (
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
            )}
            
            <p className="mb-2 text-sm text-gray-500 text-center">
              <span className="font-semibold">
                {isDragging ? 'Drop your file here' : 'Click to upload or drag and drop'}
              </span>
            </p>
            <p className="text-xs text-gray-500 text-center">JSON files only</p>

            {error && (
              <div className="mt-4 text-sm text-red-600 text-center max-w-md">
                {error}
              </div>
            )}
          </div>

          <input
            type="file"
            className="hidden"
            accept=".json,application/json"
            onChange={handleFileChange}
          />
        </label>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Make sure your JSON file follows the required schema for {type === 'league' ? 'leagues' : 'teams'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload; 