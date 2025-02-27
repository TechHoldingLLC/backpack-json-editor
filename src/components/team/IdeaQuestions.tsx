import { Question } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { QuestionEditor } from './QuestionEditor';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

interface IdeaQuestionsProps {
  questions: Question[];
  onQuestionChange: (questionIndex: number, field: keyof Question, value: unknown) => void;
  onQuestionAdd: () => void;
  onQuestionRemove: (questionIndex: number) => void;
  sectionTitle?: string;
}

export const IdeaQuestions = ({
  questions,
  onQuestionChange,
  onQuestionAdd,
  onQuestionRemove,
  sectionTitle = 'Questions',
}: IdeaQuestionsProps) => {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
            {sectionTitle}
            <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {questions.length}
            </span>
          </CardTitle>
          <Button
            onClick={onQuestionAdd}
            variant="outline"
            size="sm"
            className="h-8 px-3 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Add Question
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {questions.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-sm text-gray-500 mb-3">No questions added to this idea yet</p>
            <Button
              onClick={onQuestionAdd}
              variant="outline"
              size="sm"
              className="bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-1.5" />
              Add First Question
            </Button>
          </div>
        ) : (
          <ScrollArea className="max-h-[600px] overflow-y-auto">
            <div className="space-y-6 pl-8 pr-4">
              {questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                  {questionIndex > 0 && (
                    <Separator className="my-6 bg-gray-200" />
                  )}
                  <div className="relative">
                    <div className="absolute -left-8 top-0 bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-full">
                      Question {questionIndex + 1}
                    </div>
                    <div className="pt-8">
                      <QuestionEditor
                        question={question}
                        onChange={(field, value) => onQuestionChange(questionIndex, field, value)}
                        onRemove={() => onQuestionRemove(questionIndex)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}; 