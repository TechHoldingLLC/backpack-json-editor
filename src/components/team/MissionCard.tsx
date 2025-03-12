import { Mission } from './types';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Trash2, 
  Hash, 
  Type, 
  Target, 
  FileText, 
  Image as ImageIcon,
  MessageCircle,
  CheckCircle,
  Flag
} from 'lucide-react';
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
          {/* ID and Remove Button */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-primary" />
                  Mission ID
                </Label>
                <Input
                  value={mission.id}
                  onChange={(e) => onMissionChange(index, 'id', e.target.value)}
                  placeholder="Enter mission ID"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
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

          {/* Title */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Type className="w-4 h-4 text-primary" />
              Title
            </Label>
            <Input
              value={mission.title}
              onChange={(e) => onMissionChange(index, 'title', e.target.value)}
              placeholder="Enter mission title"
              className="text-lg font-medium bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>

          {/* Focus Type and Level */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Focus Type
              </Label>
              <Input
                value={mission.focus_type}
                onChange={(e) => onMissionChange(index, 'focus_type', e.target.value)}
                placeholder="Enter focus type"
                className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Flag className="w-4 h-4 text-primary" />
                Level
              </Label>
              <Select
                value={mission.level}
                onValueChange={(value) => onMissionChange(index, 'level', value)}
              >
                <SelectTrigger className="h-9 bg-white text-gray-900 border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors">
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
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Description
            </Label>
            <Textarea
              value={mission.description}
              onChange={(e) => onMissionChange(index, 'description', e.target.value)}
              placeholder="Enter mission description"
              rows={3}
              className="resize-none min-h-[80px] bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>

          {/* Start CTA Info */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Start CTA Info (Optional)
            </Label>
            <Textarea
              value={mission.start_cta_info || ''}
              onChange={(e) => onMissionChange(index, 'start_cta_info', e.target.value)}
              placeholder="Enter start CTA info (optional)"
              rows={2}
              className="resize-none min-h-[60px] bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>

          {/* Mission Image */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                Mission Image
              </Label>
              <div className="space-y-2">
                <Input
                  value={mission.image || ''}
                  onChange={(e) => onMissionChange(index, 'image', e.target.value)}
                  placeholder="Enter mission image URL"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
                <p className="text-xs text-gray-500">
                  Recommended size: 1098 × 633 pixels
                </p>
                {mission.image && (
                  <div className="relative">
                    <ImagePreview
                      src={getFullImageUrl(mission.image)}
                      alt="Mission preview"
                      className="w-full aspect-[1098/633] rounded-lg object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-sm border border-gray-200">
                      <ImageIcon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Completion Message */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              Completion Message
            </Label>
            <Textarea
              value={mission.completion_msg}
              onChange={(e) => onMissionChange(index, 'completion_msg', e.target.value)}
              placeholder="Enter completion message"
              rows={2}
              className="resize-none min-h-[60px] bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>

          {/* Completion Image */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Completion Image
              </Label>
              <div className="space-y-2">
                <Input
                  value={mission.completion_image || ''}
                  onChange={(e) => onMissionChange(index, 'completion_image', e.target.value)}
                  placeholder="Enter completion image URL"
                  className="h-9 bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
                <p className="text-xs text-gray-500">
                  Recommended size: 1725 × 933 pixels
                </p>
                {mission.completion_image && (
                  <div className="relative">
                    <ImagePreview
                      src={getFullImageUrl(mission.completion_image)}
                      alt="Completion preview"
                      className="w-full aspect-[1725/933] rounded-lg object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-sm border border-gray-200">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 