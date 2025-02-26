# Backpack JSON Helper

A React.js web application for managing leagues and teams JSON data with validation and image path verification.

## Features

- Upload and validate JSON files
- Edit league and team information
- Add/remove teams
- Validate image paths
- Save modified JSON data
- Real-time validation
- Modern, responsive UI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```bash
VITE_ASSET_URL=https://d5gvige0osb8h.cloudfront.net/
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. Upload a JSON file using the file upload interface
2. Edit league and team information:
   - Modify IDs
   - Toggle enabled/disabled status
   - Update image paths
   - Add/remove teams
3. Save the modified JSON file

## JSON Structure

The application expects JSON files with the following structure:

```json
{
  "leagues": [
    {
      "id": "league_id",
      "logo_image": "image_path",
      "enabled": boolean,
      "teams": [
        {
          "id": "team_id",
          "logo_image": "image_path",
          "enabled": boolean
        }
      ]
    }
  ]
}
```

## Image Path Validation

Image paths (in the `logo_image` field) must start with the URL specified in the `VITE_ASSET_URL` environment variable. By default, this is set to `https://d5gvige0osb8h.cloudfront.net/`.

## Development

Built with:
- React.js
- TypeScript
- TailwindCSS
- Ajv (JSON Schema Validator)
- Headless UI
