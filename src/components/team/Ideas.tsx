import { Ideas as IdeasType, Idea, Question } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { IdeaCard } from './IdeaCard';
import { IdeaQuestions } from './IdeaQuestions';
import { YouTubeThumbnail } from './YouTubeThumbnail';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface IdeasProps {
  ideas: IdeasType;
  getFullImageUrl: (path: string) => string;
  onIdeaChange: (sectionId: 'review_idea' | 'select_idea' | 'submit_idea', field: keyof Idea, value: string) => void;
  onQuestionChange: (sectionId: 'review_idea' | 'select_idea', questionIndex: number, field: keyof Question, value: unknown) => void;
  onQuestionAdd: (sectionId: 'review_idea' | 'select_idea') => void;
  onQuestionRemove: (sectionId: 'review_idea' | 'select_idea', questionIndex: number) => void;
  onYouTubeThumbnailChange: (value: string) => void;
  onMenuListChange: (field: keyof IdeasType['menu_list'], value: string) => void;
  onPlayIdeaAdd: () => void;
  onPlayIdeaChange: (index: number, value: string) => void;
  onPlayIdeaRemove: (index: number) => void;
}

export const Ideas = ({
  ideas,
  getFullImageUrl,
  onIdeaChange,
  onQuestionChange,
  onQuestionAdd,
  onQuestionRemove,
  onYouTubeThumbnailChange,
  onMenuListChange,
  onPlayIdeaAdd,
  onPlayIdeaChange,
  onPlayIdeaRemove,
}: IdeasProps) => {
  const ideaCards = [
    {
      id: 'review_idea',
      title: ideas.menu_list.review_title,
      description: ideas.menu_list.review_description,
      count: ideas.review_idea.questions?.length,
      onTitleChange: (value: string) => onMenuListChange('review_title', value),
      onDescriptionChange: (value: string) => onMenuListChange('review_description', value),
    },
    {
      id: 'select_idea',
      title: ideas.menu_list.select_title,
      description: ideas.menu_list.select_description,
      count: ideas.select_idea.questions?.length,
      onTitleChange: (value: string) => onMenuListChange('select_title', value),
      onDescriptionChange: (value: string) => onMenuListChange('select_description', value),
    },
    {
      id: 'submit_idea',
      title: ideas.menu_list.submit_title,
      description: ideas.menu_list.submit_description,
      onTitleChange: (value: string) => onMenuListChange('submit_title', value),
      onDescriptionChange: (value: string) => onMenuListChange('submit_description', value),
    },
  ];

  const tabs = [
    {
      id: 'review_idea',
      title: ideas.review_idea.title || 'Review Ideas',
      content: (
        <div className="space-y-6">
          <IdeaCard
            idea={ideas.review_idea}
            index={0}
            getFullImageUrl={getFullImageUrl}
            onIdeaChange={(_, field, value) => onIdeaChange('review_idea', field, value)}
            onIdeaRemove={() => {}}
          />
          <IdeaQuestions
            questions={ideas.review_idea.questions || []}
            onQuestionChange={(questionIndex, field, value) => 
              onQuestionChange('review_idea', questionIndex, field, value)
            }
            onQuestionAdd={() => onQuestionAdd('review_idea')}
            onQuestionRemove={(questionIndex) => onQuestionRemove('review_idea', questionIndex)}
            sectionTitle="Review Questions"
          />
        </div>
      ),
    },
    {
      id: 'select_idea',
      title: ideas.select_idea.title || 'Select Ideas',
      content: (
        <div className="space-y-6">
          <IdeaCard
            idea={ideas.select_idea}
            index={1}
            getFullImageUrl={getFullImageUrl}
            onIdeaChange={(_, field, value) => onIdeaChange('select_idea', field, value)}
            onIdeaRemove={() => {}}
          />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Play Ideas</h3>
              <button
                onClick={onPlayIdeaAdd}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Add Play Idea
              </button>
            </div>
            <div className="space-y-2">
              {ideas.play_ideas.map((idea, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={idea}
                    onChange={(e) => onPlayIdeaChange(index, e.target.value)}
                    placeholder="Enter play idea"
                    className="flex-1 h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                  <button
                    onClick={() => onPlayIdeaRemove(index)}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <IdeaQuestions
            questions={ideas.select_idea.questions || []}
            onQuestionChange={(questionIndex, field, value) => 
              onQuestionChange('select_idea', questionIndex, field, value)
            }
            onQuestionAdd={() => onQuestionAdd('select_idea')}
            onQuestionRemove={(questionIndex) => onQuestionRemove('select_idea', questionIndex)}
            sectionTitle="Selection Questions"
          />
        </div>
      ),
    },
    {
      id: 'submit_idea',
      title: ideas.submit_idea.title || 'Submit Ideas',
      content: (
        <div className="space-y-6">
          <IdeaCard
            idea={ideas.submit_idea}
            index={2}
            getFullImageUrl={getFullImageUrl}
            onIdeaChange={(_, field, value) => onIdeaChange('submit_idea', field, value)}
            onIdeaRemove={() => {}}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Ideas</h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {ideaCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary transition-colors"
          >
            <div className="space-y-4">
              <Input
                value={card.title}
                onChange={(e) => card.onTitleChange(e.target.value)}
                placeholder="Enter title"
                className="text-lg font-semibold bg-white border-0 px-0 h-auto focus:ring-2 focus:ring-primary focus:border-primary p-0 placeholder:text-gray-400 text-gray-900"
              />
              <Textarea
                value={card.description}
                onChange={(e) => card.onDescriptionChange(e.target.value)}
                placeholder="Enter description"
                className="min-h-[80px] bg-white text-gray-600 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
              />
              {card.count !== undefined && (
                <div className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200 w-fit">
                  {card.count} Questions
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="review_idea" className="w-full">
        <TabsList className="w-full border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex-1 py-3 text-sm font-medium text-gray-600 [&[data-state=active]]:text-primary [&[data-state=active]]:border-b-2 [&[data-state=active]]:border-primary"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

      <YouTubeThumbnail
        imagePath={ideas.default_youtube_thumbnail_image}
        getFullImageUrl={getFullImageUrl}
        onChange={onYouTubeThumbnailChange}
      />
    </div>
  );
}; 