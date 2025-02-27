import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Mission, Question } from './types';
import { ImagePreview } from './ImagePreview';
import { Questions } from './Questions';
import { AlertDialog } from './AlertDialog';

interface MissionsProps {
  missions: Mission[];
  getFullImageUrl: (path: string) => string;
  onMissionChange: (index: number, field: keyof Mission, value: string) => void;
  onMissionAdd: () => void;
  onMissionRemove: (index: number) => void;
  onQuestionChange: (missionIndex: number, questionIndex: number, field: keyof Question, value: unknown) => void;
  onQuestionAdd: (missionIndex: number) => void;
  onQuestionRemove: (missionIndex: number, questionIndex: number) => void;
}

const emptyMission: Mission = {
  id: '',
  title: '',
  description: '',
  image: '',
  focus_type: '',
  level: '',
  completion_msg: '',
  completion_image: '',
  questions: []
};

export const Missions = ({
  missions,
  getFullImageUrl,
  onMissionChange,
  onMissionAdd,
  onMissionRemove,
  onQuestionChange,
  onQuestionAdd,
  onQuestionRemove
}: MissionsProps) => {
  const [isAddingMission, setIsAddingMission] = useState(false);
  const [newMission, setNewMission] = useState<Mission>(emptyMission);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof Mission, string>>>({});
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const validateMission = (mission: Mission) => {
    const errors: Partial<Record<keyof Mission, string>> = {};
    
    if (!mission.id) errors.id = 'Mission ID is required';
    if (!mission.title) errors.title = 'Mission title is required';
    if (!mission.description) errors.description = 'Mission description is required';
    if (!mission.image) errors.image = 'Mission image is required';
    if (!mission.focus_type) errors.focus_type = 'Focus type is required';
    if (!mission.level) errors.level = 'Level is required';
    if (!mission.completion_msg) errors.completion_msg = 'Completion message is required';
    if (!mission.completion_image) errors.completion_image = 'Completion image is required';

    return errors;
  };

  const handleNewMissionChange = (field: keyof Mission, value: string) => {
    setNewMission(prev => ({ ...prev, [field]: value }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleStartAddMission = () => {
    setIsAddingMission(true);
    setNewMission(emptyMission);
    setValidationErrors({});
  };

  const handleSaveMission = () => {
    const errors = validateMission(newMission);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    onMissionAdd();
    onMissionChange(missions.length, 'id', newMission.id);
    onMissionChange(missions.length, 'title', newMission.title);
    onMissionChange(missions.length, 'description', newMission.description);
    onMissionChange(missions.length, 'image', newMission.image);
    onMissionChange(missions.length, 'focus_type', newMission.focus_type);
    onMissionChange(missions.length, 'level', newMission.level);
    onMissionChange(missions.length, 'completion_msg', newMission.completion_msg);
    onMissionChange(missions.length, 'completion_image', newMission.completion_image);
    
    setIsAddingMission(false);
    setNewMission(emptyMission);
    setValidationErrors({});
  };

  const handleCancelAddMission = () => {
    setShowCancelAlert(true);
  };

  const handleConfirmCancel = () => {
    setIsAddingMission(false);
    setNewMission(emptyMission);
    setValidationErrors({});
    setShowCancelAlert(false);
  };

  const handleNewQuestionChange = (questionIndex: number, field: keyof Question, value: unknown) => {
    const updatedQuestions = [...newMission.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      [field]: value
    };
    setNewMission(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  const handleNewQuestionAdd = () => {
    const newQuestion: Question = {
      question_type: 'options_list',
      question: '',
      options: [],
      allow_multiple_selection: false
    };
    setNewMission(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const handleNewQuestionRemove = (questionIndex: number) => {
    setNewMission(prev => ({
      ...prev,
      questions: prev.questions.filter((_, index) => index !== questionIndex)
    }));
  };

  return (
    <div className="space-y-4">
      <AlertDialog
        isOpen={showCancelAlert}
        title="Cancel Mission Creation"
        message="Are you sure you want to cancel? All unsaved changes will be lost."
        confirmLabel="Yes, Cancel"
        cancelLabel="No, Continue Editing"
        onConfirm={handleConfirmCancel}
        onCancel={() => setShowCancelAlert(false)}
      />

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-text">Missions</h3>
        {!isAddingMission && (
          <button
            onClick={handleStartAddMission}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
          >
            Add Mission
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* New Mission Form */}
        {isAddingMission && (
          <div className="bg-white rounded-lg border-2 border-primary p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-text">New Mission</h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCancelAddMission}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMission}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
                >
                  Save Mission
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={newMission.id}
                  onChange={(e) => handleNewMissionChange('id', e.target.value)}
                  className={`peer w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    validationErrors.id ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Mission ID"
                />
                <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                  Mission ID
                </label>
                {validationErrors.id && (
                  <p className="mt-1 text-xs text-red-500">{validationErrors.id}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={newMission.title}
                  onChange={(e) => handleNewMissionChange('title', e.target.value)}
                  className={`peer w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    validationErrors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Mission Title"
                />
                <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                  Mission Title
                </label>
                {validationErrors.title && (
                  <p className="mt-1 text-xs text-red-500">{validationErrors.title}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <textarea
                value={newMission.description}
                onChange={(e) => handleNewMissionChange('description', e.target.value)}
                className={`peer w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px] ${
                  validationErrors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={3}
                placeholder="Mission Description"
              />
              <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                Mission Description
              </label>
              {validationErrors.description && (
                <p className="mt-1 text-xs text-red-500">{validationErrors.description}</p>
              )}
            </div>

            <div className="relative">
              <div className="flex items-center space-x-4">
                <ImagePreview
                  src={getFullImageUrl(newMission.image)}
                  alt="Mission Image"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMission.image}
                    onChange={(e) => handleNewMissionChange('image', e.target.value)}
                    className={`peer w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      validationErrors.image ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Mission Image"
                  />
                  <label className="absolute left-20 -top-2.5 bg-white px-2 text-xs text-gray-500">
                    Mission Image
                  </label>
                  {validationErrors.image && (
                    <p className="mt-1 text-xs text-red-500">{validationErrors.image}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={newMission.focus_type}
                  onChange={(e) => handleNewMissionChange('focus_type', e.target.value)}
                  className={`peer w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    validationErrors.focus_type ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Focus Type"
                />
                <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                  Focus Type
                </label>
                {validationErrors.focus_type && (
                  <p className="mt-1 text-xs text-red-500">{validationErrors.focus_type}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={newMission.level}
                  onChange={(e) => handleNewMissionChange('level', e.target.value)}
                  className={`peer w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    validationErrors.level ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Level"
                />
                <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                  Level
                </label>
                {validationErrors.level && (
                  <p className="mt-1 text-xs text-red-500">{validationErrors.level}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={newMission.completion_msg}
                onChange={(e) => handleNewMissionChange('completion_msg', e.target.value)}
                className={`peer w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  validationErrors.completion_msg ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Completion Message"
              />
              <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                Completion Message
              </label>
              {validationErrors.completion_msg && (
                <p className="mt-1 text-xs text-red-500">{validationErrors.completion_msg}</p>
              )}
            </div>

            <div className="relative">
              <div className="flex items-center space-x-4">
                <ImagePreview
                  src={getFullImageUrl(newMission.completion_image)}
                  alt="Completion Image"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMission.completion_image}
                    onChange={(e) => handleNewMissionChange('completion_image', e.target.value)}
                    className={`peer w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      validationErrors.completion_image ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Completion Image"
                  />
                  <label className="absolute left-20 -top-2.5 bg-white px-2 text-xs text-gray-500">
                    Completion Image
                  </label>
                  {validationErrors.completion_image && (
                    <p className="mt-1 text-xs text-red-500">{validationErrors.completion_image}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Add Questions section to new mission form */}
            <Questions
              questions={newMission.questions}
              missionIndex={-1} // Use -1 to indicate this is for a new mission
              getFullImageUrl={getFullImageUrl}
              onQuestionChange={handleNewQuestionChange}
              onQuestionAdd={handleNewQuestionAdd}
              onQuestionRemove={handleNewQuestionRemove}
            />
          </div>
        )}

        {/* Existing Missions List */}
        {missions.map((mission, index) => (
          <Disclosure key={index} as="div" className="bg-white rounded-lg border border-gray-200">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <ImagePreview
                      src={getFullImageUrl(mission.image)}
                      alt={mission.title}
                      className="w-12 h-12 rounded-lg"
                    />
                    <span className="font-medium text-text">
                      {mission.title || 'Untitled Mission'}
                    </span>
                  </div>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-text transition-transform`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-6 pb-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={mission.id}
                        onChange={(e) => onMissionChange(index, 'id', e.target.value)}
                        className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Mission ID"
                      />
                      <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                        Mission ID
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={mission.title}
                        onChange={(e) => onMissionChange(index, 'title', e.target.value)}
                        className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Mission Title"
                      />
                      <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                        Mission Title
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      value={mission.description}
                      onChange={(e) => onMissionChange(index, 'description', e.target.value)}
                      className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
                      rows={3}
                      placeholder="Mission Description"
                    />
                    <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                      Mission Description
                    </label>
                  </div>

                  <div className="relative">
                    <div className="flex items-center space-x-4">
                      <ImagePreview
                        src={getFullImageUrl(mission.image)}
                        alt="Mission Image"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={mission.image}
                          onChange={(e) => onMissionChange(index, 'image', e.target.value)}
                          className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Mission Image"
                        />
                        <label className="absolute left-20 -top-2.5 bg-white px-2 text-xs text-gray-500">
                          Mission Image
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={mission.focus_type}
                        onChange={(e) => onMissionChange(index, 'focus_type', e.target.value)}
                        className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Focus Type"
                      />
                      <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                        Focus Type
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={mission.level}
                        onChange={(e) => onMissionChange(index, 'level', e.target.value)}
                        className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Level"
                      />
                      <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                        Level
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={mission.completion_msg}
                      onChange={(e) => onMissionChange(index, 'completion_msg', e.target.value)}
                      className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Completion Message"
                    />
                    <label className="absolute left-2 -top-2.5 bg-white px-2 text-xs text-gray-500">
                      Completion Message
                    </label>
                  </div>

                  <div className="relative">
                    <div className="flex items-center space-x-4">
                      <ImagePreview
                        src={getFullImageUrl(mission.completion_image)}
                        alt="Completion Image"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={mission.completion_image}
                          onChange={(e) => onMissionChange(index, 'completion_image', e.target.value)}
                          className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Completion Image"
                        />
                        <label className="absolute left-20 -top-2.5 bg-white px-2 text-xs text-gray-500">
                          Completion Image
                        </label>
                      </div>
                    </div>
                  </div>

                  <Questions
                    questions={mission.questions}
                    missionIndex={index}
                    getFullImageUrl={getFullImageUrl}
                    onQuestionChange={(questionIndex, field, value) =>
                      onQuestionChange(index, questionIndex, field, value)
                    }
                    onQuestionAdd={() => onQuestionAdd(index)}
                    onQuestionRemove={(questionIndex) => onQuestionRemove(index, questionIndex)}
                  />

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => onMissionRemove(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove Mission
                    </button>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}; 