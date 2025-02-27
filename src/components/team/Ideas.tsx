import { Ideas as IdeasType, Idea, Question } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { IdeaCard } from './IdeaCard';
import { IdeaQuestions } from './IdeaQuestions';
import { YouTubeThumbnail } from './YouTubeThumbnail';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { 
  LightbulbIcon, 
  ListChecks, 
  Send, 
  Plus,
  PlayCircle,
  PencilLine,
  CheckCircle2,
  Trophy
} from 'lucide-react';

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
      count: ideas.review_idea?.questions?.length ?? 0,
      onTitleChange: (value: string) => onMenuListChange('review_title', value),
      onDescriptionChange: (value: string) => onMenuListChange('review_description', value),
      icon: <ListChecks className="w-5 h-5 text-primary" />,
    },
    {
      id: 'select_idea',
      title: ideas.menu_list.select_title,
      description: ideas.menu_list.select_description,
      count: ideas.select_idea?.questions?.length ?? 0,
      onTitleChange: (value: string) => onMenuListChange('select_title', value),
      onDescriptionChange: (value: string) => onMenuListChange('select_description', value),
      icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
    },
    {
      id: 'submit_idea',
      title: ideas.menu_list.submit_title,
      description: ideas.menu_list.submit_description,
      onTitleChange: (value: string) => onMenuListChange('submit_title', value),
      onDescriptionChange: (value: string) => onMenuListChange('submit_description', value),
      icon: <Send className="w-5 h-5 text-primary" />,
    },
  ];

  const tabs = [
    {
      id: 'review_idea',
      title: 'Review Idea',
      icon: <ListChecks className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <IdeaCard
            idea={ideas.review_idea || {
              id: '',
              title: '',
              description: '',
              image: '',
              completion_msg: '',
              completion_image: '',
              questions: []
            }}
            index={0}
            getFullImageUrl={getFullImageUrl}
            onIdeaChange={(_, field, value) => onIdeaChange('review_idea', field, value)}
            onIdeaRemove={() => {}}
          />
          <IdeaQuestions
            questions={ideas.review_idea?.questions || []}
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
      title: 'Select Idea',
      icon: <CheckCircle2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <IdeaCard
            idea={ideas.select_idea || {
              id: '',
              title: '',
              description: '',
              image: '',
              completion_msg: '',
              completion_image: '',
              questions: []
            }}
            index={1}
            getFullImageUrl={getFullImageUrl}
            onIdeaChange={(_, field, value) => onIdeaChange('select_idea', field, value)}
            onIdeaRemove={() => {}}
          />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-primary" />
                <h3 className="text-base font-semibold text-gray-900">Play Ideas</h3>
              </div>
              <Button
                onClick={onPlayIdeaAdd}
                variant="ghost"
                size="sm"
                className="h-8 text-primary hover:text-primary/80 hover:bg-primary/10 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Play Idea
              </Button>
            </div>
            <div className="space-y-2">
              {(ideas.play_ideas || []).map((idea, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2">
                    <LightbulbIcon className="w-4 h-4 text-primary" />
                    <Input
                      value={idea}
                      onChange={(e) => onPlayIdeaChange(index, e.target.value)}
                      placeholder="Enter play idea"
                      className="flex-1 h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  <Button
                    onClick={() => onPlayIdeaRemove(index)}
                    variant="ghost"
                    size="sm"
                    className="h-9 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <IdeaQuestions
            questions={ideas.select_idea?.questions || []}
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
      title: 'Submit Idea',
      icon: <Send className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <IdeaCard
            idea={ideas.submit_idea || {
              id: '',
              title: '',
              description: '',
              image: '',
              completion_msg: '',
              completion_image: '',
              questions: []
            }}
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
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Ideas</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {ideaCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                {card.icon}
                <div className="flex-1">
                  <Input
                    value={card.title}
                    onChange={(e) => card.onTitleChange(e.target.value)}
                    placeholder="Enter title"
                    className="text-lg font-semibold bg-white border-0 px-0 h-auto focus:ring-2 focus:ring-primary focus:border-primary p-0 placeholder:text-gray-400 text-gray-900"
                  />
                </div>
              </div>
              <Textarea
                value={card.description}
                onChange={(e) => card.onDescriptionChange(e.target.value)}
                placeholder="Enter description"
                className="min-h-[80px] bg-white text-gray-600 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
              />
              {card.count !== undefined && (
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200 w-fit">
                  <PencilLine className="w-4 h-4" />
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
              <div className="flex items-center gap-2">
                {tab.icon}
                {tab.title}
              </div>
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