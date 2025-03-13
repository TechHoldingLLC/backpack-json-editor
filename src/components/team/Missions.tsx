import { Mission } from './types';
import { Button } from '../ui/button';
import { 
  PlusCircle,
  Target,
  Medal,
  ListChecks
} from 'lucide-react';
import { MissionCard } from './MissionCard';
import { MissionQuestions } from './MissionQuestions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface MissionsProps {
  missions: Mission[];
  getFullImageUrl: (path: string) => string;
  onMissionChange: (index: number, field: keyof Mission, value: string) => void;
  onMissionAdd: () => void;
  onMissionRemove: (index: number) => void;
  onQuestionChange: (missionIndex: number, questionIndex: number, field: string, value: unknown) => void;
  onQuestionAdd: (missionIndex: number) => void;
  onQuestionRemove: (missionIndex: number, questionIndex: number) => void;
  onQuestionCopy?: (missionIndex: number, questionIndex: number) => void;
}

export const Missions = ({
  missions,
  getFullImageUrl,
  onMissionChange,
  onMissionAdd,
  onMissionRemove,
  onQuestionChange,
  onQuestionAdd,
  onQuestionRemove,
  onQuestionCopy,
}: MissionsProps) => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Missions
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <ListChecks className="w-4 h-4" />
            {missions.length}
          </span>
        </h2>
        <Button 
          onClick={onMissionAdd} 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Add Mission
        </Button>
      </div>

      <div className="space-y-6">
        {missions.map((mission, missionIndex) => (
          <Accordion 
            key={missionIndex} 
            type="single" 
            collapsible
            className="bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <AccordionItem value="mission" className="border-none">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-colors [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <span className="text-base font-medium text-gray-900 flex items-center gap-2">
                    <Medal className="w-4 h-4 text-primary" />
                    {mission.title || 'Untitled Mission'}
                  </span>
                  <span className="text-sm text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200 flex items-center gap-1">
                    <ListChecks className="w-3.5 h-3.5" />
                    {mission.questions.length} Questions
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t border-gray-200">
                <div className="p-6 space-y-6">
                  <MissionCard
                    mission={mission}
                    index={missionIndex}
                    getFullImageUrl={getFullImageUrl}
                    onMissionChange={onMissionChange}
                    onMissionRemove={onMissionRemove}
                  />
                  
                  <MissionQuestions
                    questions={mission.questions}
                    onQuestionChange={(questionIndex, field, value) => 
                      onQuestionChange(missionIndex, questionIndex, field as string, value)
                    }
                    onQuestionAdd={() => onQuestionAdd(missionIndex)}
                    onQuestionRemove={(questionIndex) => onQuestionRemove(missionIndex, questionIndex)}
                    getFullImageUrl={getFullImageUrl}
                    onQuestionCopy={onQuestionCopy ? (questionIndex) => onQuestionCopy(missionIndex, questionIndex) : undefined}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}

        {missions.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-sm text-gray-500 mb-4">No missions added yet</p>
            <Button
              onClick={onMissionAdd}
              variant="outline"
              size="sm"
              className="bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="font-medium">Add First Mission</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}; 