import { useState, ChangeEvent, FormEvent } from 'react';
import { VideoCameraIcon } from '@heroicons/react/24/outline';
import { ImagePreview } from './ImagePreview';
import { IdeaSection } from './types';

interface SubmitIdeaProps {
  section: IdeaSection;
  getFullImageUrl: (path: string) => string;
  onSectionChange: (field: string, value: string) => void;
}

interface IdeaFormData {
  title: string;
  description: string;
  file?: File;
}

export const SubmitIdea = ({ section, getFullImageUrl, onSectionChange }: SubmitIdeaProps) => {
  const [formData, setFormData] = useState<IdeaFormData>({
    title: '',
    description: '',
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        alert('File size must be less than 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        alert('File size must be less than 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    // Here you would typically send the data to your backend
    // For now, we'll just log it
    console.log('Submitting idea:', formData);

    // Reset form
    setFormData({
      title: '',
      description: '',
    });
  };

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
              className="mt-2 w-full text-gray-600 border-0 border-b border-transparent hover:border-gray-300 focus:ring-0 focus:border-primary px-0 resize-none whitespace-pre-line"
              placeholder="Enter section description"
              rows={3}
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

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter idea title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Describe your idea in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachments (Optional)
            </label>
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-1 text-center">
                <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">Video or image files up to 10MB</p>
                {formData.file && (
                  <p className="text-sm text-gray-600">Selected: {formData.file.name}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Submit Idea
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}; 