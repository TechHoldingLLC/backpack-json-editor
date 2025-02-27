import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { ImagePreview } from './ImagePreview';
import { Youtube, Image as ImageIcon } from 'lucide-react';

interface YouTubeThumbnailProps {
  imagePath: string;
  getFullImageUrl: (path: string) => string;
  onChange: (value: string) => void;
}

export const YouTubeThumbnail = ({
  imagePath,
  getFullImageUrl,
  onChange
}: YouTubeThumbnailProps) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <Youtube className="w-5 h-5 text-primary" />
          Default YouTube Thumbnail
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <ImagePreview
                src={getFullImageUrl(imagePath)}
                alt="Default YouTube Thumbnail"
                className="w-40 h-32 rounded-xl object-cover shadow-sm"
              />
              <div className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-sm border border-gray-200">
                <ImageIcon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="w-full">
              <Input
                type="text"
                value={imagePath}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 text-sm text-gray-600 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="YouTube Thumbnail Image Path"
              />
              <p className="mt-2 text-sm text-gray-500 text-center">
                Recommended size: 1280x720 pixels
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 