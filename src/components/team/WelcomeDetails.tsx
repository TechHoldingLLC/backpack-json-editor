import { ImagePreview } from './ImagePreview';
import { 
  Hand, 
  Type, 
  MessageSquare, 
  User, 
  Image as ImageIcon,
  MonitorSmartphone
} from 'lucide-react';

interface WelcomeDetailsProps {
  title: string;
  description: string;
  welcomeImage: string;
  author: string;
  getFullImageUrl: (path: string) => string;
  onWelcomeDetailsChange: (field: string, value: string) => void;
}

export const WelcomeDetails = ({
  title,
  description,
  welcomeImage,
  author,
  getFullImageUrl,
  onWelcomeDetailsChange,
}: WelcomeDetailsProps) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Hand className="w-6 h-6 text-primary" />
            Welcome Details
          </h2>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <MonitorSmartphone className="w-4 h-4" />
            Welcome Screen
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Type className="w-4 h-4 text-primary" />
                Welcome Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => onWelcomeDetailsChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter welcome title"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Welcome Message
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => onWelcomeDetailsChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                  placeholder="Enter welcome message"
                />
              </div>
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Author
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => onWelcomeDetailsChange('author', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter author name"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" />
              Welcome Image
            </label>
            <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
              <div className="space-y-4">
                <div className="relative">
                  <ImagePreview
                    src={getFullImageUrl(welcomeImage)}
                    alt="Welcome Image"
                    className="w-full aspect-[1170/1521] rounded-2xl object-cover bg-gray-50 shadow-md"
                  />
                  <div className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-sm border border-gray-200">
                    <ImageIcon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <input
                    type="text"
                    value={welcomeImage}
                    onChange={(e) => onWelcomeDetailsChange('welcome_image', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter welcome image path"
                  />
                  <p className="text-sm text-gray-500 text-center">
                    Recommended size: 1170 × 1521 pixels
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 