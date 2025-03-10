import { Question } from './types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { ImagePreview } from './ImagePreview';
import { 
  Trash2, 
  Plus, 
  ListFilter, 
  MessageSquare, 
  List, 
  Image as ImageIcon, 
  Video, 
  CheckSquare,
  AlignLeft,
  AlignRight,
  ImagePlus,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';

interface QuestionEditorProps {
  question: Question;
  onChange: (field: keyof Question, value: unknown) => void;
  onRemove: () => void;
  getFullImageUrl?: (path: string) => string;
}

const questionTypes = [
  { value: 'options_list', label: 'Options List' },
  { value: '2_options_list', label: 'Two Column Options' },
  { value: 'image', label: 'Image Question' },
  { value: 'dropdown', label: 'Dropdown Question' }
] as const;

export const QuestionEditor = ({
  question,
  onChange,
  onRemove,
  getFullImageUrl = (path) => path, // Default implementation if not provided
}: QuestionEditorProps) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ListFilter className="w-4 h-4 text-primary" />
                  Question Type
                </Label>
                <Select
                  value={question.question_type}
                  onValueChange={(value) => onChange('question_type', value)}
                >
                  <SelectTrigger className="h-9 bg-white text-gray-900 border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    {questionTypes.map((type) => (
                      <SelectItem 
                        key={type.value} 
                        value={type.value}
                        className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900 cursor-pointer"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              onClick={onRemove}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Question Text
            </Label>
            <Textarea
              value={question.question}
              onChange={(e) => onChange('question', e.target.value)}
              placeholder="Enter question text"
              className="min-h-[60px] bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
            />
          </div>

          {(question.question_type === 'options_list' || question.question_type === '2_options_list') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <List className="w-4 h-4 text-primary" />
                  Options
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
                  onClick={() => {
                    const newOptions = [...(question.options || []), ''];
                    onChange('options', newOptions);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Option
                </Button>
              </div>
              <div className="space-y-2">
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(question.options || [])];
                        newOptions[index] = e.target.value;
                        onChange('options', newOptions);
                      }}
                      placeholder={`Option ${index + 1}`}
                      className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => {
                        const newOptions = [...(question.options || [])];
                        newOptions.splice(index, 1);
                        onChange('options', newOptions);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {question.question_type === '2_options_list' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-primary" />
                  Left Column Title
                </Label>
                <Input
                  value={question.options_title_left}
                  onChange={(e) => onChange('options_title_left', e.target.value)}
                  placeholder="Left column title"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <AlignRight className="w-4 h-4 text-primary" />
                  Right Column Title
                </Label>
                <Input
                  value={question.options_title_right}
                  onChange={(e) => onChange('options_title_right', e.target.value)}
                  placeholder="Right column title"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}

          {question.question_type === 'dropdown' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ChevronDown className="w-4 h-4 text-primary" />
                  Dropdown Options
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
                  onClick={() => {
                    const newDropdownOptions = [
                      ...(question.dropdown_options || []),
                      { 
                        title: '',
                        hint: '',
                        options: ['']
                      }
                    ];
                    onChange('dropdown_options', newDropdownOptions);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Dropdown
                </Button>
              </div>
              
              <div className="space-y-4">
                {(question.dropdown_options || []).map((dropdownItem, dropdownIndex) => (
                  <div 
                    key={dropdownIndex} 
                    className="border border-gray-200 rounded-lg p-4 space-y-4 relative"
                  >
                    <button 
                      type="button"
                      onClick={() => {
                        const newDropdownOptions = [...(question.dropdown_options || [])];
                        newDropdownOptions.splice(dropdownIndex, 1);
                        onChange('dropdown_options', newDropdownOptions);
                      }}
                      className="absolute top-2 right-2 p-1 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full shadow-sm border border-gray-200 transition-colors"
                      aria-label="Delete dropdown option"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Title
                        </Label>
                        <Input
                          value={dropdownItem.title}
                          onChange={(e) => {
                            const newDropdownOptions = [...(question.dropdown_options || [])];
                            newDropdownOptions[dropdownIndex] = {
                              ...newDropdownOptions[dropdownIndex],
                              title: e.target.value
                            };
                            onChange('dropdown_options', newDropdownOptions);
                          }}
                          placeholder="Dropdown title (e.g., 'Type of shot:')"
                          className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Hint
                        </Label>
                        <Input
                          value={dropdownItem.hint}
                          onChange={(e) => {
                            const newDropdownOptions = [...(question.dropdown_options || [])];
                            newDropdownOptions[dropdownIndex] = {
                              ...newDropdownOptions[dropdownIndex],
                              hint: e.target.value
                            };
                            onChange('dropdown_options', newDropdownOptions);
                          }}
                          placeholder="Placeholder hint (e.g., 'Choose type')"
                          className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <SlidersHorizontal className="w-4 h-4 text-primary" />
                          Options
                        </Label>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
                          onClick={() => {
                            const newDropdownOptions = [...(question.dropdown_options || [])];
                            const currentOptions = [...(newDropdownOptions[dropdownIndex].options || []), ''];
                            newDropdownOptions[dropdownIndex] = {
                              ...newDropdownOptions[dropdownIndex],
                              options: currentOptions
                            };
                            onChange('dropdown_options', newDropdownOptions);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Option
                        </Button>
                      </div>
                      
                      <div className="space-y-2 pl-2 border-l-2 border-gray-100">
                        {dropdownItem.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newDropdownOptions = [...(question.dropdown_options || [])];
                                const newOptions = [...newDropdownOptions[dropdownIndex].options];
                                newOptions[optionIndex] = e.target.value;
                                newDropdownOptions[dropdownIndex] = {
                                  ...newDropdownOptions[dropdownIndex],
                                  options: newOptions
                                };
                                onChange('dropdown_options', newDropdownOptions);
                              }}
                              placeholder={`Option ${optionIndex + 1}`}
                              className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                              onClick={() => {
                                const newDropdownOptions = [...(question.dropdown_options || [])];
                                const newOptions = [...newDropdownOptions[dropdownIndex].options];
                                newOptions.splice(optionIndex, 1);
                                newDropdownOptions[dropdownIndex] = {
                                  ...newDropdownOptions[dropdownIndex],
                                  options: newOptions
                                };
                                onChange('dropdown_options', newDropdownOptions);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {(question.dropdown_options || []).length === 0 && (
                <div className="border border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <ChevronDown className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Add dropdown options for users to select from.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => {
                      onChange('dropdown_options', [
                        { 
                          title: '',
                          hint: '',
                          options: ['']
                        }
                      ]);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add First Dropdown
                  </Button>
                </div>
              )}
            </div>
          )}

          {question.question_type === 'image' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  Image URL
                </Label>
                <Input
                  value={question.option_image}
                  onChange={(e) => onChange('option_image', e.target.value)}
                  placeholder="Enter image URL"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 555 × 651 pixels
                </p>
              </div>
              
              {question.option_image && (
                <div className="relative">
                  <ImagePreview
                    src={getFullImageUrl(question.option_image)}
                    alt="Option Image"
                    className="w-full aspect-[555/651] rounded-lg object-cover shadow-sm"
                  />
                  <div className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-sm border border-gray-200">
                    <ImageIcon className="w-4 h-4 text-primary" />
                  </div>
                </div>
              )}
              
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Image Hint
                </Label>
                <Input
                  value={question.image_option_hint}
                  onChange={(e) => onChange('image_option_hint', e.target.value)}
                  placeholder="Enter hint for image (e.g., Draw a line from the top)"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-1.5">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Video className="w-4 h-4 text-primary" />
                Video URL
              </Label>
              <Input
                value={question.video}
                onChange={(e) => onChange('video', e.target.value)}
                placeholder="Enter video URL"
                className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={question.allow_multiple_selection}
                onChange={(e) => onChange('allow_multiple_selection', e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-primary" />
                Allow Multiple Selection
              </Label>
            </div>
          </div>

          {/* Image Selection Section - Available for all question types */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <ImagePlus className="w-4 h-4 text-primary" />
                Image Selection (Up to 12 images)
              </Label>
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
                onClick={() => {
                  const currentImages = [...(question.image_selection || [])];
                  if (currentImages.length < 12) {
                    const newImage = { title: '', image: '' };
                    onChange('image_selection', [...currentImages, newImage]);
                  }
                }}
                disabled={(question.image_selection || []).length >= 12}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Image
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(question.image_selection || []).map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-3 relative">
                  <button 
                    type="button"
                    onClick={() => {
                      const newImages = [...(question.image_selection || [])];
                      newImages.splice(index, 1);
                      onChange('image_selection', newImages);
                    }}
                    className="absolute top-2 right-2 p-1 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full shadow-sm border border-gray-200 transition-colors"
                    aria-label="Delete image selection"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-1.5 mt-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Title
                    </Label>
                    <Input
                      value={item.title}
                      onChange={(e) => {
                        const newImages = [...(question.image_selection || [])];
                        newImages[index] = { ...newImages[index], title: e.target.value };
                        onChange('image_selection', newImages);
                      }}
                      placeholder="Image title"
                      className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-gray-700">
                      Image Path
                    </Label>
                    <Input
                      value={item.image}
                      onChange={(e) => {
                        const newImages = [...(question.image_selection || [])];
                        newImages[index] = { ...newImages[index], image: e.target.value };
                        onChange('image_selection', newImages);
                      }}
                      placeholder="Enter image path"
                      className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  
                  {item.image && (
                    <div className="relative">
                      <ImagePreview
                        src={getFullImageUrl(item.image)}
                        alt={item.title || "Selection Image"}
                        className="w-full aspect-square rounded-lg object-cover shadow-sm"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {(question.image_selection || []).length === 0 && (
              <div className="border border-dashed border-gray-200 rounded-lg p-6 text-center">
                <ImagePlus className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Add images that users can select as answers to this question.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => {
                    onChange('image_selection', [{ title: '', image: '' }]);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add First Image
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 