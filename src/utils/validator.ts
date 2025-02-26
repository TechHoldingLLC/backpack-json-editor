import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    leagues: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'logo_image', 'enabled', 'teams'],
        properties: {
          id: { type: 'string' },
          logo_image: { type: 'string' },
          enabled: { type: 'boolean' },
          teams: {
            type: 'array',
            items: {
              type: 'object',
              required: ['id', 'logo_image', 'enabled'],
              properties: {
                id: { type: 'string' },
                logo_image: { type: 'string' },
                enabled: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
  },
  required: ['leagues'],
};

const validate = ajv.compile(schema);

export const validateJson = (data: unknown): { valid: boolean; errors: string[] } => {
  const isValid = validate(data);

  if (isValid) {
    return { valid: true, errors: [] };
  }

  const errors = (validate.errors || []).map((error) => {
    const path = error.instancePath || '';
    const message = error.message || 'Unknown error';
    return `${path} ${message}`;
  });

  return { valid: false, errors };
};

export const validateS3ImagePath = (path: string): boolean => {
  const assetUrl = import.meta.env.VITE_ASSET_URL;
  if (!assetUrl) {
    console.warn('VITE_ASSET_URL environment variable is not defined');
    return false;
  }
  return path.startsWith(assetUrl);
}; 