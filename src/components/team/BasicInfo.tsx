import { ImagePreview } from './ImagePreview';
import {
  Hash,
  Link,
  Image as ImageIcon,
  User,
  Info
} from 'lucide-react';

interface BasicInfoProps {
  id: string;
  name: string;
  logoImage: string;
  surveyUrl: string;
  getFullImageUrl: (path: string) => string;
  onBasicInfoChange: (field: string, value: string | boolean) => void;
}

export const BasicInfo = ({
  id,
  name,
  logoImage,
  surveyUrl,
  getFullImageUrl,
  onBasicInfoChange,
}: BasicInfoProps) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Info className="w-6 h-6 text-primary" />
            Basic Information
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="id" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Hash className="w-4 h-4 text-primary" />
                Team ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="id"
                  value={id}
                  onChange={(e) => onBasicInfoChange('id', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter team ID"
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Team Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => onBasicInfoChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter team name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="surveyUrl" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Link className="w-4 h-4 text-primary" />
                Survey URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="surveyUrl"
                  value={surveyUrl}
                  onChange={(e) => onBasicInfoChange('survey_url', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter survey URL"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" />
              Team Logo
            </label>
            <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <ImagePreview
                    src={getFullImageUrl(logoImage)}
                    alt="Team Logo"
                    className="w-40 aspect-[324/402] rounded-2xl object-cover bg-gray-50 shadow-md"
                  />
                  <div className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-sm border border-gray-200">
                    <ImageIcon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <input
                    type="text"
                    value={logoImage}
                    onChange={(e) => onBasicInfoChange('logo_image', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter logo image path"
                  />
                  <p className="text-sm text-gray-500 text-center">
                    Recommended size: 324 × 402 pixels
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