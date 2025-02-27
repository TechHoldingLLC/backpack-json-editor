import { IdeaSection as IdeaSectionType } from './types';
import { ImagePreview } from './ImagePreview';
import { Questions } from './Questions';

interface IdeaSectionProps {
  section: IdeaSectionType;
  getFullImageUrl: (path: string) => string;
  onSectionChange: (field: string, value: string) => void;
  onQuestionChange: (questionIndex: number, field: string, value: unknown) => void;
  onQuestionAdd: () => void;
  onQuestionRemove: (questionIndex: number) => void;
}

export const IdeaSection = ({
  section,
  getFullImageUrl,
  onSectionChange,
  onQuestionChange,
  onQuestionAdd,
  onQuestionRemove
}: IdeaSectionProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <input
              type="text"
              value={section.title}
              onChange={(e) => onSectionChange('title', e.target.value)}
              className="w-full text-2xl font-bold text-gray-900 border-0 border-b border-transparent hover:border-gray-300 focus:ring-0 focus:border-primary px-0"
              placeholder="Enter section title"
            />
            <textarea
              value={section.description}
              onChange={(e) => onSectionChange('description', e.target.value)}
              className="mt-2 w-full text-gray-600 border-0 border-b border-transparent hover:border-gray-300 focus:ring-0 focus:border-primary px-0 resize-none"
              placeholder="Enter section description"
              rows={2}
            />
          </div>
          <div className="ml-6">
            <input
              type="text"
              value={section.image || ''}
              onChange={(e) => onSectionChange('image', e.target.value)}
              className="w-full mb-2 text-sm text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent px-2 py-1"
              placeholder="Image path"
            />
            <ImagePreview
              src={getFullImageUrl(section.image || '')}
              alt="Section"
              className="w-32 h-32 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <Questions
          questions={section.questions || []}
          missionIndex={-1}
          getFullImageUrl={getFullImageUrl}
          onQuestionChange={onQuestionChange}
          onQuestionAdd={onQuestionAdd}
          onQuestionRemove={onQuestionRemove}
        />
      </div>

      {section.completion_msg && (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={section.completion_msg}
                onChange={(e) => onSectionChange('completion_msg', e.target.value)}
                className="w-full text-gray-600 border-0 border-b border-transparent hover:border-gray-300 focus:ring-0 focus:border-primary px-0"
                placeholder="Enter completion message"
              />
            </div>
            {section.completion_image && (
              <div>
                <input
                  type="text"
                  value={section.completion_image}
                  onChange={(e) => onSectionChange('completion_image', e.target.value)}
                  className="w-full mb-2 text-sm text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent px-2 py-1"
                  placeholder="Completion image path"
                />
                <ImagePreview
                  src={getFullImageUrl(section.completion_image)}
                  alt="Completion"
                  className="w-24 h-24 rounded-lg object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 