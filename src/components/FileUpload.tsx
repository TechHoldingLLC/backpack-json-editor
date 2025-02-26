import { ChangeEvent } from 'react';
import { validateJson } from '../utils/validator';

interface Team {
  id: string;
  logo_image: string;
  enabled: boolean;
}

interface League {
  id: string;
  logo_image: string;
  enabled: boolean;
  teams: Team[];
}

interface JsonData {
  leagues: League[];
}

interface FileUploadProps {
  onFileUpload: (jsonData: JsonData) => void;
  onError: (error: string) => void;
}

const FileUpload = ({ onFileUpload, onError }: FileUploadProps) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      
      // Validate JSON structure
      const { valid, errors } = validateJson(jsonData);
      if (!valid) {
        onError(`Invalid JSON structure: ${errors.join(', ')}`);
        return;
      }

      onFileUpload(jsonData as JsonData);
    } catch {
      onError('Error parsing JSON file. Please ensure it is a valid JSON file.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Get Started
        </h2>
        <p className="text-sm text-gray-600">
          Upload your leagues and teams JSON file to begin editing
        </p>
      </div>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full max-w-2xl h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-12 h-12 mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mb-2 text-lg text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-gray-500">JSON file</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept=".json"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload; 