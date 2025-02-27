import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface PlayIdeasProps {
  ideas: string[];
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}

export const PlayIdeas = ({ ideas, onAdd, onChange, onRemove }: PlayIdeasProps) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Play Ideas</h3>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Play Idea</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea, index) => (
          <div key={index} className="flex items-center space-x-3 group">
            <input
              type="text"
              value={idea}
              onChange={(e) => onChange(index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter play idea"
            />
            <button
              onClick={() => onRemove(index)}
              className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 