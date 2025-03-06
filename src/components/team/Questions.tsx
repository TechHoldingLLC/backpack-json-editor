import { Question } from './types';
import { ImagePreview } from './ImagePreview';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

interface QuestionsProps {
  questions: Question[];
  /** The index of the parent mission. Required for parent component's event handlers but not used directly. */
  missionIndex: number;
  getFullImageUrl: (path: string) => string;
  onQuestionChange: (questionIndex: number, field: keyof Question, value: unknown) => void;
  onQuestionAdd: () => void;
  onQuestionRemove: (questionIndex: number) => void;
}

export const Questions = ({
  questions,
  getFullImageUrl,
  onQuestionChange,
  onQuestionAdd,
  onQuestionRemove
}: QuestionsProps) => {
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-text">Questions</h4>
        {questions.length > 0 && (
          <button
            onClick={onQuestionAdd}
            className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary/80 transition-colors text-sm"
          >
            Add Question
          </button>
        )}
      </div>

      {questions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="text-center mb-4">
            <p className="text-gray-500 mb-2">No questions added yet</p>
            <p className="text-sm text-gray-400">Add questions to test mission knowledge</p>
          </div>
          <button
            onClick={onQuestionAdd}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add First Question</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="bg-white rounded-lg p-4 border border-gray-200 space-y-4">
              {/* Question Type Selection */}
              <div className="flex items-center justify-between">
                <div className="relative flex-1">
                  <select
                    value={question.question_type}
                    onChange={(e) => onQuestionChange(qIndex, 'question_type', e.target.value)}
                    className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="options_list">Options List</option>
                    <option value="2_options_list">2 Options List</option>
                    <option value="image">Image</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                  <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                    Question Type
                  </label>
                </div>
                <button
                  onClick={() => onQuestionRemove(qIndex)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Remove
                </button>
              </div>

              {/* Question Text */}
              <div className="relative">
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => onQuestionChange(qIndex, 'question', e.target.value)}
                  className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Question Text"
                />
                <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                  Question Text
                </label>
              </div>

              {/* Question Type Specific Fields */}
              {(question.question_type === 'options_list' || question.question_type === '2_options_list') && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-500">Options</label>
                    <button
                      onClick={() => onQuestionChange(qIndex, 'options', [...(question.options || []), ''])}
                      className="text-primary hover:text-primary/80 text-sm"
                    >
                      Add Option
                    </button>
                  </div>
                  {question.options?.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const updatedOptions = [...(question.options || [])];
                          updatedOptions[oIndex] = e.target.value;
                          onQuestionChange(qIndex, 'options', updatedOptions);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={`Option ${oIndex + 1}`}
                      />
                      <button
                        onClick={() => {
                          const updatedOptions = question.options?.filter((_, i) => i !== oIndex) || [];
                          onQuestionChange(qIndex, 'options', updatedOptions);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {question.question_type === '2_options_list' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={question.options_title_left || ''}
                      onChange={(e) => onQuestionChange(qIndex, 'options_title_left', e.target.value)}
                      className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Left Title"
                    />
                    <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                      Left Title
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={question.options_title_right || ''}
                      onChange={(e) => onQuestionChange(qIndex, 'options_title_right', e.target.value)}
                      className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Right Title"
                    />
                    <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                      Right Title
                    </label>
                  </div>
                </div>
              )}

              {question.question_type === 'image' && (
                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex items-center space-x-4">
                      <div className="w-full max-w-[555px]">
                        <ImagePreview
                          src={getFullImageUrl(question.option_image || '')}
                          alt="Option Image"
                          className="w-full aspect-[555/651] rounded-lg object-cover shadow-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={question.option_image || ''}
                          onChange={(e) => onQuestionChange(qIndex, 'option_image', e.target.value)}
                          className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Option Image"
                        />
                        <label className="absolute left-20 -top-2.5 bg-white px-2 text-xs text-gray-500">
                          Option Image
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended size: 555 × 651 pixels
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={question.image_option_hint || ''}
                      onChange={(e) => onQuestionChange(qIndex, 'image_option_hint', e.target.value)}
                      className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Image Option Hint"
                    />
                    <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                      Image Option Hint
                    </label>
                  </div>
                </div>
              )}

              {/* Image Selection Preview */}
              {question.image_selection && question.image_selection.length > 0 && (
                <div className="space-y-4">
                  <h5 className="text-sm font-medium text-gray-700">Image Selection Preview</h5>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {question.image_selection.map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="relative">
                          <ImagePreview
                            src={getFullImageUrl(item.image)}
                            alt={item.title}
                            className="w-full aspect-square rounded-lg object-cover shadow-sm"
                          />
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {item.title}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    Recommended size for selection images: 240 × 240 pixels
                  </p>
                </div>
              )}

              {/* Multiple Selection Toggle */}
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={question.allow_multiple_selection}
                    onChange={(e) => onQuestionChange(qIndex, 'allow_multiple_selection', e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">Allow Multiple Selection</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 