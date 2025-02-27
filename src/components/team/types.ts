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
  video?: string;
  allow_multiple_selection?: boolean;
  option_image?: string;
  image_option_hint?: string;
  options_title_left?: string;
  options_title_right?: string;
  dropdown_options?: DropdownOption[];
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
  default_youtube_thumbnail_image?: string;
  menu_list: MenuList;
  play_ideas: string[];
  review_idea: IdeaSection;
  select_idea: IdeaSection;
  submit_idea: IdeaSection;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  image: string;
  welcome_details: {
    title: string;
    description: string;
    image: string;
  };
  team_home: {
    title: string;
    description: string;
    image: string;
  };
  missions: Mission[];
  ideas: Ideas;
}

export interface ImagePreviewProps {
  src: string;
  alt: string;
  error?: boolean;
} 