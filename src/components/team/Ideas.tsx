import { Ideas as IdeasType, IdeaSection as IdeaSectionType } from './types';
import { ImagePreview } from './ImagePreview';
import { Tab } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { IdeaSection } from './IdeaSection';
import { PlayIdeas } from './PlayIdeas';
import { SubmitIdea } from './SubmitIdea';

interface IdeasProps {
  ideas: IdeasType;
  getFullImageUrl: (path: string) => string;
  onIdeasChange: (section: keyof IdeasType, field: string, value: string | string[] | IdeaSectionType) => void;
  onQuestionChange: (section: 'review_idea' | 'select_idea', questionIndex: number, field: string, value: unknown) => void;
  onQuestionAdd: (section: 'review_idea' | 'select_idea') => void;
  onQuestionRemove: (section: 'review_idea' | 'select_idea', questionIndex: number) => void;
}

const TabButton = ({ selected }: { selected: boolean }) => {
  return `w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus:outline-none ${
    selected
      ? 'bg-white text-primary shadow'
      : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
  }`;
};

export const Ideas = ({
  ideas,
  getFullImageUrl,
  onIdeasChange,
  onQuestionChange,
  onQuestionAdd,
  onQuestionRemove
}: IdeasProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
  };

  const handleMenuListChange = (field: string, value: string) => {
    onIdeasChange('menu_list', field, value);
  };

  const handleSectionChange = (section: 'review_idea' | 'select_idea' | 'submit_idea', field: string, value: string) => {
    onIdeasChange(section, field, { ...ideas[section], [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* Menu List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Review Card */}
        <div 
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleTabChange(0)}
        >
          <div className="p-6">
            <input
              type="text"
              value={ideas.menu_list.review_title}
              onChange={(e) => handleMenuListChange('review_title', e.target.value)}
              className="w-full text-xl font-semibold text-gray-900 mb-2 border-0 border-b border-transparent hover:border-gray-300 focus:ring-0 focus:border-primary px-0"
              placeholder="Enter review title"
            />
            <textarea
              value={ideas.menu_list.review_description}
              onChange={(e) => handleMenuListChange('review_description', e.target.value)}
              className="w-full text-gray-600 mb-4 border-0 border-b border-transparent hover:border-gray-300 focus:ring-0 focus:border-primary px-0 resize-none"
              placeholder="Enter review description"
              rows={2}
            />
            <div className="flex items-center text-primary">
              <span>{ideas.review_idea.questions?.length || 0} Questions</span>
              <ChevronRightIcon className="w-5 h-5 ml-1" />
            </div>
          </div>
        </div>

        {/* Select Card */}
        <div 
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleTabChange(1)}
        >
          <div className="p-6">
            <input
              type="text"
              value={ideas.menu_list.select_title}
              onChange={(e) => handleMenuListChange('select_title', e.target.value)}
              className="w-full text-xl font-semibold text-gray-900 mb-2 border-0 border-b border-transparent hover:border-gray-300 focus:ring-0 focus:border-primary px-0"
              placeholder="Enter select title"
            />
            <textarea
              value={ideas.menu_list.select_description}
              onChange={(e) => handleMenuListChange('select_description', e.target.value)}
              className="w-full text-gray-600 mb-4 border-0 border-b border-transparent hover:border-gray-300 focus:ring-0 focus:border-primary px-0 resize-none"
              placeholder="Enter select description"
              rows={2}
            />
            <div className="flex items-center text-primary">
              <span>{ideas.play_ideas.length} Play Ideas</span>
              <ChevronRightIcon className="w-5 h-5 ml-1" />
            </div>
          </div>
        </div>

        {/* Submit Card */}
        <div 
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleTabChange(2)}
        >
          <div className="p-6">
            <input
              type="text"
              value={ideas.menu_list.submit_title}
              onChange={(e) => handleMenuListChange('submit_title', e.target.value)}
              className="w-full text-xl font-semibold text-gray-900 mb-2 border-0 border-b border-transparent hover:border-gray-300 focus:ring-0 focus:border-primary px-0"
              placeholder="Enter submit title"
            />
            <textarea
              value={ideas.menu_list.submit_description}
              onChange={(e) => handleMenuListChange('submit_description', e.target.value)}
              className="w-full text-gray-600 mb-4 border-0 border-b border-transparent hover:border-gray-300 focus:ring-0 focus:border-primary px-0 resize-none"
              placeholder="Enter submit description"
              rows={2}
            />
            <div className="flex items-center text-primary">
              <span>Share Your Ideas</span>
              <ChevronRightIcon className="w-5 h-5 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tab.Group selectedIndex={selectedTabIndex} onChange={handleTabChange}>
        <Tab.List className="flex space-x-2 rounded-xl bg-gray-100 p-1">
          <Tab className={({ selected }) => TabButton({ selected })}>
            {ideas.menu_list.review_title}
          </Tab>
          <Tab className={({ selected }) => TabButton({ selected })}>
            {ideas.menu_list.select_title}
          </Tab>
          <Tab className={({ selected }) => TabButton({ selected })}>
            {ideas.menu_list.submit_title}
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-4">
          {/* Review Ideas Panel */}
          <Tab.Panel>
            <IdeaSection
              section={ideas.review_idea}
              getFullImageUrl={getFullImageUrl}
              onSectionChange={(field, value) => handleSectionChange('review_idea', field, value)}
              onQuestionChange={(questionIndex, field, value) => 
                onQuestionChange('review_idea', questionIndex, field, value)
              }
              onQuestionAdd={() => onQuestionAdd('review_idea')}
              onQuestionRemove={(questionIndex) => onQuestionRemove('review_idea', questionIndex)}
            />
          </Tab.Panel>

          {/* Select Ideas Panel */}
          <Tab.Panel>
            <IdeaSection
              section={ideas.select_idea}
              getFullImageUrl={getFullImageUrl}
              onSectionChange={(field, value) => handleSectionChange('select_idea', field, value)}
              onQuestionChange={(questionIndex, field, value) => 
                onQuestionChange('select_idea', questionIndex, field, value)
              }
              onQuestionAdd={() => onQuestionAdd('select_idea')}
              onQuestionRemove={(questionIndex) => onQuestionRemove('select_idea', questionIndex)}
            />
            <PlayIdeas
              ideas={ideas.play_ideas}
              onAdd={() => onIdeasChange('play_ideas', '', [...ideas.play_ideas, ''])}
              onChange={(index, value) => {
                const newIdeas = [...ideas.play_ideas];
                newIdeas[index] = value;
                onIdeasChange('play_ideas', '', newIdeas);
              }}
              onRemove={(index) => {
                const newIdeas = ideas.play_ideas.filter((_, i) => i !== index);
                onIdeasChange('play_ideas', '', newIdeas);
              }}
            />
          </Tab.Panel>

          {/* Submit Ideas Panel */}
          <Tab.Panel>
            <SubmitIdea
              section={ideas.submit_idea}
              getFullImageUrl={getFullImageUrl}
              onSectionChange={(field, value) => handleSectionChange('submit_idea', field, value)}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* YouTube Thumbnail Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Default YouTube Thumbnail</h3>
        <div className="flex items-center space-x-4">
          <ImagePreview
            src={getFullImageUrl(ideas.default_youtube_thumbnail_image)}
            alt="Default YouTube Thumbnail"
            className="w-32 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <input
              type="text"
              value={ideas.default_youtube_thumbnail_image}
              onChange={(e) => onIdeasChange('default_youtube_thumbnail_image', '', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="YouTube Thumbnail Image Path"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 