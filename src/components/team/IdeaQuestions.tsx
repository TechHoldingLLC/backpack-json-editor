import { useState } from 'react';
import { Question } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { PlusCircle, HelpCircle, ListChecks, Copy, ChevronDown, ChevronRight, MessageSquare } from 'lucide-react';
import { QuestionEditor } from './QuestionEditor';
import { ScrollArea } from '../ui/scroll-area';

interface IdeaQuestionsProps {
  questions: Question[];
  onQuestionChange: (questionIndex: number, field: keyof Question, value: unknown) => void;
  onQuestionAdd: () => void;
  onQuestionRemove: (questionIndex: number) => void;
  sectionTitle?: string;
  getFullImageUrl?: (path: string) => string;
  onQuestionCopy?: (questionIndex: number) => void;
}

export const IdeaQuestions = ({
  questions,
  onQuestionChange,
  onQuestionAdd,
  onQuestionRemove,
  sectionTitle = 'Questions',
  getFullImageUrl = (path) => path,
  onQuestionCopy,
}: IdeaQuestionsProps) => {
  // Track expanded state for each question
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>(
    // By default, expand the first question if any exist
    questions.length > 0 ? { 0: true } : {}
  );

  const toggleQuestion = (questionIndex: number) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  // Function to handle question copying
  const handleCopyQuestion = (questionIndex: number) => {
    if (onQuestionCopy) {
      onQuestionCopy(questionIndex);
    } else {
      // Fallback if onQuestionCopy is not provided - add a new question and copy values
      const questionToCopy = { ...questions[questionIndex] };
      onQuestionAdd();
      // We target the last question which is the one we just added
      setTimeout(() => {
        Object.entries(questionToCopy).forEach(([key, value]) => {
          onQuestionChange(questions.length, key as keyof Question, value);
        });
      }, 0);
    }
  };

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
            <HelpCircle className="w-4 h-4 text-primary mr-2" />
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
            <ListChecks className="w-8 h-8 text-gray-400 mx-auto mb-3" />
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
            <div className="space-y-4">
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Collapsible Question Header */}
                  <div 
                    className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => toggleQuestion(questionIndex)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-primary text-white text-xs font-medium h-5 w-5 rounded-full flex items-center justify-center">
                        {questionIndex + 1}
                      </div>
                      <div className="font-medium text-gray-900">
                        {question.question ? 
                          (question.question.length > 60 ? 
                            `${question.question.substring(0, 60)}...` : 
                            question.question
                          ) : 
                          `Question ${questionIndex + 1}`
                        }
                      </div>
                      <div className="flex items-center gap-1 ml-2 text-xs font-medium text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                        <MessageSquare className="w-3 h-3" />
                        {question.question_type.replace('_', ' ')}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyQuestion(questionIndex);
                        }}
                        variant="ghost"
                        size="sm"
                        className="h-8 text-gray-500 hover:text-primary hover:bg-gray-100 mr-2"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuestionRemove(questionIndex);
                        }}
                        variant="ghost"
                        size="sm"
                        className="h-8 text-gray-500 hover:text-red-500 hover:bg-red-50 mr-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </Button>
                      {expandedQuestions[questionIndex] ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                  
                  {/* Question Editor (shown only when expanded) */}
                  {expandedQuestions[questionIndex] && (
                    <div className="p-4 border-t border-gray-200">
                      <QuestionEditor
                        question={question}
                        onChange={(field, value) => onQuestionChange(questionIndex, field, value)}
                        onRemove={() => onQuestionRemove(questionIndex)}
                        getFullImageUrl={getFullImageUrl}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}; 