import { Question } from './types';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Button } from '../../components/ui/button';
import { Trash2 } from 'lucide-react';

interface QuestionEditorProps {
  question: Question;
  onChange: (field: string, value: unknown) => void;
  onRemove: () => void;
}

export const QuestionEditor = ({ question, onChange, onRemove }: QuestionEditorProps) => {
  const questionTypes = ['options_list', '2_options_list', 'dropdown', 'image'];

  const handleOptionAdd = () => {
    const newOptions = [...(question.options || []), ''];
    onChange('options', newOptions);
  };

  const handleOptionRemove = (index: number) => {
    const newOptions = (question.options || []).filter((_, i) => i !== index);
    onChange('options', newOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(question.options || [])];
    newOptions[index] = value;
    onChange('options', newOptions);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-4 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Question Type</Label>
              <Select
                value={question.question_type}
                onValueChange={(value: string) => onChange('question_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(question.question_type === 'options_list' || question.question_type === '2_options_list') && (
              <div className="space-y-2 flex items-center">
                <Label className="mr-2">Allow Multiple Selection</Label>
                <Switch
                  checked={question.allow_multiple_selection}
                  onCheckedChange={(checked: boolean) => onChange('allow_multiple_selection', checked)}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Question Text</Label>
            <Input
              value={question.question}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('question', e.target.value)}
              placeholder="Enter your question"
            />
          </div>

          {question.question_type === 'image' && (
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={question.option_image || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('option_image', e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
          )}

          {(question.question_type === 'options_list' || question.question_type === '2_options_list') && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Options</Label>
                <Button
                  onClick={handleOptionAdd}
                  variant="outline"
                  size="sm"
                  className="text-sm"
                >
                  Add Option
                </Button>
              </div>

              <div className="space-y-2">
                {(question.options || []).map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleOptionRemove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-destructive ml-4"
          onClick={onRemove}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}; 