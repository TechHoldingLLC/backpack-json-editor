import { useState } from 'react';
import { Question } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { PlusCircle, HelpCircle, ListChecks, Copy, ChevronDown, ChevronRight, MessageSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { QuestionEditor } from './QuestionEditor';
import { ScrollArea } from '../ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';

interface MissionQuestionsProps {
  questions: Question[];
  onQuestionChange: (questionIndex: number, field: keyof Question, value: unknown) => void;
  onQuestionAdd: () => void;
  onQuestionRemove: (questionIndex: number) => void;
  getFullImageUrl?: (path: string) => string;
  onQuestionCopy?: (questionIndex: number) => void;
}

export const MissionQuestions = ({
  questions,
  onQuestionChange,
  onQuestionAdd,
  onQuestionRemove,
  getFullImageUrl = (path) => path,
  onQuestionCopy,
}: MissionQuestionsProps) => {
  // Track expanded state for each question
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>(
    // By default, expand the first question if any exist
    questions.length > 0 ? { 0: true } : {}
  );

  // State for alerts
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCopyConfirm, setShowCopyConfirm] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null);
  const [pendingCopyIndex, setPendingCopyIndex] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState('');

  const toggleQuestion = (questionIndex: number) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  // Function to initiate question copying with confirmation
  const confirmCopy = (questionIndex: number) => {
    setPendingCopyIndex(questionIndex);
    setShowCopyConfirm(true);
  };

  // Function to handle actual question copying
  const handleCopyConfirmed = () => {
    if (pendingCopyIndex !== null) {
      if (onQuestionCopy) {
        onQuestionCopy(pendingCopyIndex);
      } else {
        // Fallback if onQuestionCopy is not provided - add a new question and copy values
        const questionToCopy = { ...questions[pendingCopyIndex] };
        onQuestionAdd();
        
        // We target the last question which is the one we just added
        setTimeout(() => {
          Object.entries(questionToCopy).forEach(([key, value]) => {
            onQuestionChange(questions.length, key as keyof Question, value);
          });
        }, 0);
      }
      
      // Show success alert
      setAlertMessage(`Question ${pendingCopyIndex + 1} has been copied successfully`);
      setShowSuccessAlert(true);
      setShowCopyConfirm(false);
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }
  };

  // Function to confirm deletion
  const confirmDelete = (questionIndex: number) => {
    setPendingDeleteIndex(questionIndex);
    setShowDeleteConfirm(true);
  };

  // Function to handle actual deletion
  const handleDeleteConfirmed = () => {
    if (pendingDeleteIndex !== null) {
      onQuestionRemove(pendingDeleteIndex);
      setShowDeleteConfirm(false);
      setPendingDeleteIndex(null);
      
      // Show success alert
      setAlertMessage(`Question ${pendingDeleteIndex + 1} has been deleted`);
      setShowSuccessAlert(true);
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      <Card className="bg-white border border-gray-200">
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
              <HelpCircle className="w-4 h-4 text-primary mr-2" />
              Questions
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
              <p className="text-sm text-gray-500 mb-3">No questions added to this mission yet</p>
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
                            confirmCopy(questionIndex);
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
                            confirmDelete(questionIndex);
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
                          onRemove={() => confirmDelete(questionIndex)}
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

      {/* Success Alert Dialog */}
      {showSuccessAlert && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md bg-white border border-green-100 rounded-lg shadow-lg p-4 flex items-start gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">Success</h4>
            <p className="text-sm text-gray-600">{alertMessage}</p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete Question {pendingDeleteIndex !== null ? pendingDeleteIndex + 1 : ''}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteConfirm(false)}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirmed}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Copy Confirmation Dialog */}
      <Dialog open={showCopyConfirm} onOpenChange={setShowCopyConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5 text-primary" />
              Confirm Copy
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to copy Question {pendingCopyIndex !== null ? pendingCopyIndex + 1 : ''}?
              A duplicate will be created right after it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCopyConfirm(false)}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleCopyConfirmed}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Copy Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}; 