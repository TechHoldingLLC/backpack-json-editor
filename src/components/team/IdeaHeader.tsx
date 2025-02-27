import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { ImagePreview } from './ImagePreview';
import { Card, CardHeader } from '../ui/card';

interface IdeaHeaderProps {
  title: string;
  description: string;
  image?: string;
  getFullImageUrl: (path: string) => string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onImageChange: (value: string) => void;
}

export const IdeaHeader = ({
  title,
  description,
  image,
  getFullImageUrl,
  onTitleChange,
  onDescriptionChange,
  onImageChange
}: IdeaHeaderProps) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="p-6">
        <div className="flex items-start gap-8">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                className="w-full px-4 py-3 text-xl font-semibold text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Enter section title"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                className="w-full px-4 py-3 text-gray-600 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none min-h-[80px]"
                placeholder="Enter section description"
              />
            </div>
          </div>
          <div className="shrink-0 space-y-4">
            <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
              <div className="flex flex-col items-center space-y-4">
                {image && (
                  <ImagePreview
                    src={getFullImageUrl(image)}
                    alt="Section"
                    className="w-32 h-32 rounded-xl object-cover shadow-sm"
                  />
                )}
                <Input
                  type="text"
                  value={image || ''}
                  onChange={(e) => onImageChange(e.target.value)}
                  className="w-full px-4 py-3 text-sm text-gray-600 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Image path"
                />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}; 