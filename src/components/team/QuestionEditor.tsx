import { Question } from './types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { Trash2, Plus } from 'lucide-react';

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
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Question Type</Label>
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
            <Label className="text-sm font-medium text-gray-700">Question Text</Label>
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
                <Label className="text-sm font-medium text-gray-700">Options</Label>
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
                <Label className="text-sm font-medium text-gray-700">Left Column Title</Label>
                <Input
                  value={question.options_title_left}
                  onChange={(e) => onChange('options_title_left', e.target.value)}
                  placeholder="Left column title"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Right Column Title</Label>
                <Input
                  value={question.options_title_right}
                  onChange={(e) => onChange('options_title_right', e.target.value)}
                  placeholder="Right column title"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}

          {question.question_type === 'image' && (
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Image URL</Label>
              <Input
                value={question.option_image}
                onChange={(e) => onChange('option_image', e.target.value)}
                placeholder="Enter image URL"
                className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Video URL</Label>
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
              <Label className="text-sm font-medium text-gray-700">Allow Multiple Selection</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 