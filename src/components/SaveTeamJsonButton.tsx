import { Button } from './ui/button';
import { Save, X } from 'lucide-react';
import type { ExtendedTeam } from './team/types';

interface ValidationError {
  path: string;
  message: string;
}

interface SaveTeamJsonButtonProps {
  data: ExtendedTeam;
  onSave: () => void;
  onCancel: () => void;
  onValidationError: (errors: ValidationError[]) => void;
}

export const SaveTeamJsonButton = ({ data, onSave, onCancel, onValidationError }: SaveTeamJsonButtonProps) => {
  const validateTeamData = (team: ExtendedTeam): ValidationError[] => {
    const errors: ValidationError[] = [];

    // Basic info validation
    if (!team.id) errors.push({ path: 'Team', message: 'Team ID is required' });
    if (!team.name) errors.push({ path: 'Team', message: 'Team name is required' });
    if (!team.logo_image) errors.push({ path: 'Team', message: 'Team logo image is required' });
    if (!team.survey_url) errors.push({ path: 'Team', message: 'Survey URL is required' });

    // Welcome details validation
    if (!team.welcome_details) {
      errors.push({ path: 'Welcome Details', message: 'Welcome details are required' });
    } else {
      if (!team.welcome_details.title) {
        errors.push({ path: 'Welcome Details', message: 'Welcome title is required' });
      }
      if (!team.welcome_details.description) {
        errors.push({ path: 'Welcome Details', message: 'Welcome description is required' });
      }
      if (!team.welcome_details.welcome_image) {
        errors.push({ path: 'Welcome Details', message: 'Welcome image is required' });
      }
      if (!team.welcome_details.author) {
        errors.push({ path: 'Welcome Details', message: 'Welcome author is required' });
      }
    }

    // Team home validation
    if (!team.team_home) {
      errors.push({ path: 'Team Home', message: 'Team home section is required' });
    } else {
      if (!team.team_home.motto) {
        errors.push({ path: 'Team Home', message: 'Team motto is required' });
      }
      if (!team.team_home.best_ideas?.user_name || !team.team_home.best_ideas?.user_image) {
        errors.push({ path: 'Team Home', message: 'Best ideas user details are required' });
      }
      if (!team.team_home.most_missions?.user_name || !team.team_home.most_missions?.user_image) {
        errors.push({ path: 'Team Home', message: 'Most missions user details are required' });
      }
      if (!Array.isArray(team.team_home.top_team_rank) || team.team_home.top_team_rank.length === 0) {
        errors.push({ path: 'Team Home', message: 'Top team rank is required' });
      } else {
        team.team_home.top_team_rank.forEach((rank, index) => {
          if (!rank.user_name || !rank.user_image) {
            errors.push({ path: `Team Home - Top Rank ${index + 1}`, message: 'User name and image are required for each rank' });
          }
        });
      }
    }

    // Missions validation
    if (!Array.isArray(team.missions) || team.missions.length === 0) {
      errors.push({ path: 'Missions', message: 'At least one mission is required' });
    } else {
      team.missions.forEach((mission, index) => {
        if (!mission.id) {
          errors.push({ path: `Mission ${index + 1}`, message: 'Mission ID is required' });
        }
        if (!mission.title) {
          errors.push({ path: `Mission ${index + 1}`, message: 'Mission title is required' });
        }
        if (!mission.description) {
          errors.push({ path: `Mission ${index + 1}`, message: 'Mission description is required' });
        }
        if (!mission.image) {
          errors.push({ path: `Mission ${index + 1}`, message: 'Mission image is required' });
        }
        if (!mission.focus_type) {
          errors.push({ path: `Mission ${index + 1}`, message: 'Mission focus type is required' });
        }
        if (!mission.level) {
          errors.push({ path: `Mission ${index + 1}`, message: 'Mission level is required' });
        }
        if (!mission.completion_msg) {
          errors.push({ path: `Mission ${index + 1}`, message: 'Mission completion message is required' });
        }
        if (!mission.completion_image) {
          errors.push({ path: `Mission ${index + 1}`, message: 'Mission completion image is required' });
        }
        if (!Array.isArray(mission.questions) || mission.questions.length === 0) {
          errors.push({ path: `Mission ${index + 1}`, message: 'Mission must have at least one question' });
        }
      });
    }

    // Ideas validation
    if (!team.ideas) {
      errors.push({ path: 'Ideas', message: 'Ideas section is required' });
      return errors;
    }

    // Default YouTube thumbnail
    if (!team.ideas.default_youtube_thumbnail_image) {
      errors.push({ path: 'Ideas', message: 'Default YouTube thumbnail image is required' });
    }

    // Menu list validation
    if (!team.ideas.menu_list) {
      errors.push({ path: 'Ideas - Menu List', message: 'Menu list is required' });
    } else {
      const { menu_list } = team.ideas;
      if (!menu_list.review_title || !menu_list.review_description) {
        errors.push({ path: 'Ideas - Menu List', message: 'Review title and description are required' });
      }
      if (!menu_list.select_title || !menu_list.select_description) {
        errors.push({ path: 'Ideas - Menu List', message: 'Select title and description are required' });
      }
      if (!menu_list.submit_title || !menu_list.submit_description) {
        errors.push({ path: 'Ideas - Menu List', message: 'Submit title and description are required' });
      }
    }

    // Play ideas validation
    if (!Array.isArray(team.ideas.play_ideas) || team.ideas.play_ideas.length === 0) {
      errors.push({ path: 'Ideas', message: 'Play ideas array must not be empty' });
    }

    // Review idea validation
    const { review_idea } = team.ideas;
    if (review_idea) {
      if (!review_idea.id) {
        errors.push({ path: 'Ideas - Review', message: 'Review idea ID is required' });
      }
      if (!review_idea.title) {
        errors.push({ path: 'Ideas - Review', message: 'Review idea title is required' });
      }
      if (!review_idea.description) {
        errors.push({ path: 'Ideas - Review', message: 'Review idea description is required' });
      }
      if (!review_idea.image) {
        errors.push({ path: 'Ideas - Review', message: 'Review idea image is required' });
      }
      if (!review_idea.completion_msg) {
        errors.push({ path: 'Ideas - Review', message: 'Review idea completion message is required' });
      }
      if (!review_idea.completion_image) {
        errors.push({ path: 'Ideas - Review', message: 'Review idea completion image is required' });
      }
      if (!Array.isArray(review_idea.questions) || review_idea.questions.length === 0) {
        errors.push({ path: 'Ideas - Review', message: 'Review idea must have at least one question' });
      }
    } else {
      errors.push({ path: 'Ideas - Review', message: 'Review idea section is required' });
    }

    // Select idea validation
    const { select_idea } = team.ideas;
    if (select_idea) {
      if (!select_idea.id) {
        errors.push({ path: 'Ideas - Select', message: 'Select idea ID is required' });
      }
      if (!select_idea.title) {
        errors.push({ path: 'Ideas - Select', message: 'Select idea title is required' });
      }
      if (!select_idea.description) {
        errors.push({ path: 'Ideas - Select', message: 'Select idea description is required' });
      }
      if (!select_idea.image) {
        errors.push({ path: 'Ideas - Select', message: 'Select idea image is required' });
      }
      if (!select_idea.completion_msg) {
        errors.push({ path: 'Ideas - Select', message: 'Select idea completion message is required' });
      }
      if (!select_idea.completion_image) {
        errors.push({ path: 'Ideas - Select', message: 'Select idea completion image is required' });
      }
      if (!Array.isArray(select_idea.questions) || select_idea.questions.length === 0) {
        errors.push({ path: 'Ideas - Select', message: 'Select idea must have at least one question' });
      }
    } else {
      errors.push({ path: 'Ideas - Select', message: 'Select idea section is required' });
    }

    // Submit idea validation
    const { submit_idea } = team.ideas;
    if (submit_idea) {
      if (!submit_idea.id) {
        errors.push({ path: 'Ideas - Submit', message: 'Submit idea ID is required' });
      }
      if (!submit_idea.title) {
        errors.push({ path: 'Ideas - Submit', message: 'Submit idea title is required' });
      }
      if (!submit_idea.description) {
        errors.push({ path: 'Ideas - Submit', message: 'Submit idea description is required' });
      }
      if (!submit_idea.image) {
        errors.push({ path: 'Ideas - Submit', message: 'Submit idea image is required' });
      }
    } else {
      errors.push({ path: 'Ideas - Submit', message: 'Submit idea section is required' });
    }

    return errors;
  };

  const handleSave = () => {
    const validationErrors = validateTeamData(data);
    if (validationErrors.length > 0) {
      onValidationError(validationErrors);
      return;
    }
    onSave();
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={handleSave}
        className="bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2"
      >
        <Save className="w-4 h-4" />
        Save JSON
      </Button>
      <Button
        onClick={onCancel}
        variant="outline"
        className="border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
      >
        <X className="w-4 h-4" />
        Cancel
      </Button>
    </div>
  );
}; 