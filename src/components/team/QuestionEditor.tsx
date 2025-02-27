import { Question } from './types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { Trash2 } from 'lucide-react';

interface QuestionEditorProps {
  question: Question;
  onChange: (field: keyof Question, value: unknown) => void;
  onRemove: () => void;
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
}: QuestionEditorProps) => {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Question Type</Label>
                <Select
                  value={question.question_type}
                  onValueChange={(value) => onChange('question_type', value)}
                >
                  <SelectTrigger className="w-full h-10 bg-white text-gray-900 border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-offset-0 focus:ring-gray-200 transition-colors">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-md">
                    {questionTypes.map((type) => (
                      <SelectItem 
                        key={type.value} 
                        value={type.value}
                        className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900 cursor-pointer py-2.5"
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
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors mt-8"
              onClick={onRemove}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Question Text</Label>
            <Textarea
              value={question.question}
              onChange={(e) => onChange('question', e.target.value)}
              placeholder="Enter question text"
              className="resize-none min-h-[80px] bg-white text-gray-900 border-gray-200 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-gray-200 hover:border-gray-300 transition-colors placeholder:text-gray-400"
            />
          </div>

          {(question.question_type === 'options_list' || question.question_type === '2_options_list') && (
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <Label className="text-sm font-medium text-gray-700">Options</Label>
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
                      className="h-9 bg-white text-gray-900 border-gray-200 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-gray-200 hover:border-gray-300 transition-colors placeholder:text-gray-400"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
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
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-9 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
                  onClick={() => {
                    const newOptions = [...(question.options || []), ''];
                    onChange('options', newOptions);
                  }}
                >
                  Add Option
                </Button>
              </div>
            </div>
          )}

          {question.question_type === '2_options_list' && (
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Left Column Title</Label>
                <Input
                  value={question.options_title_left}
                  onChange={(e) => onChange('options_title_left', e.target.value)}
                  placeholder="Left column title"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-gray-200 hover:border-gray-300 transition-colors placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Right Column Title</Label>
                <Input
                  value={question.options_title_right}
                  onChange={(e) => onChange('options_title_right', e.target.value)}
                  placeholder="Right column title"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-gray-200 hover:border-gray-300 transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>
          )}

          {question.question_type === 'image' && (
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <Label className="text-sm font-medium text-gray-700">Image URL</Label>
              <Input
                value={question.option_image}
                onChange={(e) => onChange('option_image', e.target.value)}
                placeholder="Enter image URL"
                className="h-9 bg-white text-gray-900 border-gray-200 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-gray-200 hover:border-gray-300 transition-colors placeholder:text-gray-400"
              />
            </div>
          )}

          {question.question_type === 'dropdown' && (
            <div className="space-y-4">
              {question.dropdown_options?.map((dropdownOption, index) => (
                <div key={index} className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">Dropdown {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => {
                        const newDropdownOptions = [...(question.dropdown_options || [])];
                        newDropdownOptions.splice(index, 1);
                        onChange('dropdown_options', newDropdownOptions);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Input
                      value={dropdownOption.title}
                      onChange={(e) => {
                        const newDropdownOptions = [...(question.dropdown_options || [])];
                        newDropdownOptions[index] = {
                          ...newDropdownOptions[index],
                          title: e.target.value
                        };
                        onChange('dropdown_options', newDropdownOptions);
                      }}
                      placeholder="Dropdown title"
                      className="h-9 bg-white text-gray-900 border-gray-200 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-gray-200 hover:border-gray-300 transition-colors placeholder:text-gray-400"
                    />
                    <Input
                      value={dropdownOption.hint}
                      onChange={(e) => {
                        const newDropdownOptions = [...(question.dropdown_options || [])];
                        newDropdownOptions[index] = {
                          ...newDropdownOptions[index],
                          hint: e.target.value
                        };
                        onChange('dropdown_options', newDropdownOptions);
                      }}
                      placeholder="Dropdown hint"
                      className="h-9 bg-white text-gray-900 border-gray-200 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-gray-200 hover:border-gray-300 transition-colors placeholder:text-gray-400"
                    />
                    <div className="space-y-2">
                      {dropdownOption.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newDropdownOptions = [...(question.dropdown_options || [])];
                              const newOptions = [...(newDropdownOptions[index].options || [])];
                              newOptions[optionIndex] = e.target.value;
                              newDropdownOptions[index] = {
                                ...newDropdownOptions[index],
                                options: newOptions
                              };
                              onChange('dropdown_options', newDropdownOptions);
                            }}
                            placeholder={`Option ${optionIndex + 1}`}
                            className="h-9 bg-white text-gray-900 border-gray-200 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-gray-200 hover:border-gray-300 transition-colors placeholder:text-gray-400"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            onClick={() => {
                              const newDropdownOptions = [...(question.dropdown_options || [])];
                              const newOptions = [...(newDropdownOptions[index].options || [])];
                              newOptions.splice(optionIndex, 1);
                              newDropdownOptions[index] = {
                                ...newDropdownOptions[index],
                                options: newOptions
                              };
                              onChange('dropdown_options', newDropdownOptions);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-9 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
                        onClick={() => {
                          const newDropdownOptions = [...(question.dropdown_options || [])];
                          const newOptions = [...(newDropdownOptions[index].options || []), ''];
                          newDropdownOptions[index] = {
                            ...newDropdownOptions[index],
                            options: newOptions
                          };
                          onChange('dropdown_options', newDropdownOptions);
                        }}
                      >
                        Add Option
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full h-9 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
                onClick={() => {
                  const newDropdownOptions = [
                    ...(question.dropdown_options || []),
                    { title: '', hint: '', options: [] }
                  ];
                  onChange('dropdown_options', newDropdownOptions);
                }}
              >
                Add Dropdown
              </Button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Video URL</Label>
              <Input
                value={question.video}
                onChange={(e) => onChange('video', e.target.value)}
                placeholder="Enter video URL"
                className="h-9 bg-white text-gray-900 border-gray-200 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-gray-200 hover:border-gray-300 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-2 pt-8">
              <input
                type="checkbox"
                checked={question.allow_multiple_selection}
                onChange={(e) => onChange('allow_multiple_selection', e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label className="text-sm font-medium text-gray-700">Allow Multiple Selection</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 