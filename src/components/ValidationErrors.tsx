import { AlertCircle, X } from 'lucide-react';

interface ValidationError {
  path: string;
  message: string;
}

interface ValidationErrorsProps {
  errors: ValidationError[];
  onDismiss: () => void;
}

export function ValidationErrors({ errors, onDismiss }: ValidationErrorsProps) {
  if (errors.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg border border-red-100 p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <h3 className="font-medium">Validation Errors</h3>
        </div>
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <ul className="space-y-2">
        {errors.map((error, index) => (
          <li key={index} className="text-sm">
            <span className="font-medium text-gray-700">{error.path}:</span>{' '}
            <span className="text-red-600">{error.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 