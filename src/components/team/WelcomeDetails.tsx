import { ImagePreview } from './ImagePreview';

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
          <h2 className="text-2xl font-bold text-gray-900">Welcome Details</h2>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium">
            Welcome Screen
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
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
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
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
              <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Welcome Image
            </label>
            <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
              <div className="space-y-4">
                <div className="relative">
                  <ImagePreview
                    src={getFullImageUrl(welcomeImage)}
                    alt="Welcome"
                    className="w-full h-56 rounded-xl object-cover bg-gray-50 shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">Change Image</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={welcomeImage}
                    onChange={(e) => onWelcomeDetailsChange('welcome_image', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter welcome image path"
                  />
                  <p className="text-sm text-gray-500 text-center">
                    Recommended size: 1200x630 pixels (16:9 ratio)
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