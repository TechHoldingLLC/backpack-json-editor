import { Mission } from './types';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Trash2 } from 'lucide-react';
import { ImagePreview } from './ImagePreview';

interface MissionCardProps {
  mission: Mission;
  index: number;
  getFullImageUrl: (path: string) => string;
  onMissionChange: (index: number, field: keyof Mission, value: string) => void;
  onMissionRemove: (index: number) => void;
}

export const MissionCard = ({
  mission,
  index,
  getFullImageUrl,
  onMissionChange,
  onMissionRemove,
}: MissionCardProps) => {
  const levelOptions = ['SuperFan', 'Analyst', 'Genius'];

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Title and Remove Button */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Input
                value={mission.title}
                onChange={(e) => onMissionChange(index, 'title', e.target.value)}
                placeholder="Enter mission title"
                className="text-lg font-medium bg-white border-0 px-0 h-auto focus-visible:ring-1 focus-visible:ring-gray-200 p-0 placeholder:text-gray-400 text-gray-900"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              onClick={() => onMissionRemove(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Focus Type and Level */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Focus Type</Label>
              <Input
                value={mission.focus_type}
                onChange={(e) => onMissionChange(index, 'focus_type', e.target.value)}
                placeholder="Enter focus type"
                className="h-9 bg-white text-gray-900 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400 hover:border-gray-300 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Level</Label>
              <Select
                value={mission.level}
                onValueChange={(value) => onMissionChange(index, 'level', value)}
              >
                <SelectTrigger className="h-9 bg-white text-gray-900 border-gray-200 hover:border-gray-300 focus:ring-1 focus:ring-gray-400 transition-colors">
                  <SelectValue placeholder="Select level" className="text-gray-500" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  {levelOptions.map((level) => (
                    <SelectItem 
                      key={level} 
                      value={level}
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900 cursor-pointer"
                    >
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Description</Label>
            <Textarea
              value={mission.description}
              onChange={(e) => onMissionChange(index, 'description', e.target.value)}
              placeholder="Enter mission description"
              rows={3}
              className="resize-none min-h-[80px] bg-white text-gray-900 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400 hover:border-gray-300 transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Mission Image */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`mission-${index}-image`}>Mission Image</Label>
              <div className="space-y-2">
                <Input
                  id={`mission-${index}-image`}
                  value={mission.image || ''}
                  onChange={(e) => onMissionChange(index, 'image', e.target.value)}
                  placeholder="Enter mission image URL"
                />
                {mission.image && (
                  <ImagePreview
                    src={getFullImageUrl(mission.image)}
                    alt="Mission preview"
                    className="w-full h-[200px] rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Completion Message */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Completion Message</Label>
            <Textarea
              value={mission.completion_msg}
              onChange={(e) => onMissionChange(index, 'completion_msg', e.target.value)}
              placeholder="Enter completion message"
              rows={2}
              className="resize-none min-h-[60px] bg-white text-gray-900 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400 hover:border-gray-300 transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Completion Image */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Completion Image</Label>
              <div className="space-y-2">
                <Input
                  value={mission.completion_image || ''}
                  onChange={(e) => onMissionChange(index, 'completion_image', e.target.value)}
                  placeholder="Enter completion image URL"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400 hover:border-gray-300 transition-colors placeholder:text-gray-400"
                />
                {mission.completion_image && (
                  <ImagePreview
                    src={getFullImageUrl(mission.completion_image)}
                    alt="Completion preview"
                    className="w-full h-[200px] rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 