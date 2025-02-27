import { Button } from './ui/button';
import { Save } from 'lucide-react';

interface ValidationError {
  path: string;
  message: string;
}

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

interface SaveJsonButtonProps {
  data: League[];
  onSave: () => void;
  onValidationError: (errors: ValidationError[]) => void;
}

export const SaveJsonButton = ({ data, onSave, onValidationError }: SaveJsonButtonProps) => {
  const validateLeagueData = (leagues: League[]): ValidationError[] => {
    const errors: ValidationError[] = [];

    leagues.forEach((league, leagueIndex) => {
      // Validate required league fields
      if (!league.id) {
        errors.push({
          path: `League ${leagueIndex + 1}`,
          message: 'League ID is required'
        });
      }
      if (!league.logo_image) {
        errors.push({
          path: `League ${leagueIndex + 1}`,
          message: 'League Logo Image is required'
        });
      }

      // Validate teams
      if (!league.teams || league.teams.length === 0) {
        errors.push({
          path: `League ${leagueIndex + 1}`,
          message: 'At least one team is required'
        });
      } else {
        league.teams.forEach((team, teamIndex) => {
          // Validate required team fields
          if (!team.id) {
            errors.push({
              path: `League ${leagueIndex + 1} - Team ${teamIndex + 1}`,
              message: 'Team ID is required'
            });
          }
          if (!team.logo_image) {
            errors.push({
              path: `League ${leagueIndex + 1} - Team ${teamIndex + 1}`,
              message: 'Team Logo Image is required'
            });
          }
        });
      }
    });

    return errors;
  };

  const handleSave = () => {
    const validationErrors = validateLeagueData(data);
    if (validationErrors.length > 0) {
      onValidationError(validationErrors);
      return;
    }
    onSave();
  };

  return (
    <Button
      onClick={handleSave}
      className="bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2"
    >
      <Save className="w-4 h-4" />
      Save JSON
    </Button>
  );
}; 