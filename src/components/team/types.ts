export interface ImageSelectionOption {
  title: string;
  image: string;
}

export interface DropdownOption {
  title: string;
  hint: string;
  options: string[];
}

export interface Question {
  question_type: 'options_list' | '2_options_list' | 'image' | 'dropdown';
  question: string;
  options?: string[];
  options_title_left?: string;
  options_title_right?: string;
  option_image?: string;
  image_option_hint?: string;
  video?: string;
  allow_multiple_selection?: boolean;
  dropdown_options?: {
    title: string;
    hint: string;
    options: string[];
  }[];
  image_selection?: {
    title: string;
    image: string;
  }[];
}

export interface Mission {
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

export interface Idea {
  id: string;
  title: string;
  description: string;
  image?: string;
  completion_msg?: string;
  completion_image?: string;
  questions?: Question[];
}

export interface IdeaSection {
  id?: string;
  title: string;
  description: string;
  image?: string;
  completion_msg?: string;
  completion_image?: string;
  questions?: Question[];
}

export interface MenuList {
  review_title: string;
  review_description: string;
  select_title: string;
  select_description: string;
  submit_title: string;
  submit_description: string;
}

export interface Ideas {
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
  review_idea: Idea;
  select_idea: Idea;
  submit_idea: Idea;
}

export interface ExtendedTeam {
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
  missions: Mission[];
  ideas: Ideas;
}

export interface ImagePreviewProps {
  src: string;
  alt: string;
  error?: boolean;
} 