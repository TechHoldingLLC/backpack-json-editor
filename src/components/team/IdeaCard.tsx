import { Idea } from './types';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Trash2 } from 'lucide-react';
import { ImagePreview } from './ImagePreview';

interface IdeaCardProps {
  idea: Idea;
  index: number;
  getFullImageUrl: (path: string) => string;
  onIdeaChange: (index: number, field: keyof Idea, value: string) => void;
  onIdeaRemove: (index: number) => void;
}

export const IdeaCard = ({
  idea,
  index,
  getFullImageUrl,
  onIdeaChange,
  onIdeaRemove,
}: IdeaCardProps) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Title and Remove Button */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Input
                value={idea.title}
                onChange={(e) => onIdeaChange(index, 'title', e.target.value)}
                placeholder="Enter idea title"
                className="text-lg font-medium bg-white border-0 px-0 h-auto focus:ring-2 focus:ring-primary focus:border-primary p-0 placeholder:text-gray-400 text-gray-900"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              onClick={() => onIdeaRemove(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Description</Label>
            <Textarea
              value={idea.description}
              onChange={(e) => onIdeaChange(index, 'description', e.target.value)}
              placeholder="Enter idea description"
              rows={3}
              className="resize-none min-h-[80px] bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Idea Image */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`idea-${index}-image`}>Idea Image</Label>
              <div className="space-y-2">
                <Input
                  id={`idea-${index}-image`}
                  value={idea.image || ''}
                  onChange={(e) => onIdeaChange(index, 'image', e.target.value)}
                  placeholder="Enter idea image URL"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
                {idea.image && (
                  <ImagePreview
                    src={getFullImageUrl(idea.image)}
                    alt="Idea preview"
                    className="w-full h-[200px] rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Completion Message */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Completion Message</Label>
            <Textarea
              value={idea.completion_msg}
              onChange={(e) => onIdeaChange(index, 'completion_msg', e.target.value)}
              placeholder="Enter completion message"
              rows={2}
              className="resize-none min-h-[60px] bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Completion Image */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Completion Image</Label>
              <div className="space-y-2">
                <Input
                  value={idea.completion_image || ''}
                  onChange={(e) => onIdeaChange(index, 'completion_image', e.target.value)}
                  placeholder="Enter completion image URL"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
                {idea.completion_image && (
                  <ImagePreview
                    src={getFullImageUrl(idea.completion_image)}
                    alt="Completion preview"
                    className="w-full h-[200px] rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};