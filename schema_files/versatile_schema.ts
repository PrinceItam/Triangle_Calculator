import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

export const versatileSchema = {
    type: 'object',
    properties: {
        a: { type: 'number', minimum: 1 },
        b: { type: 'number', minimum: 1 },
        c: { type: 'number', minimum: 1 },
    },
    required: ['a', 'b', 'c'],
    additionalProperties: false,
    not: {
        anyOf: [
            { properties: { a: { const: { $data: '1/b' } } }, required: ['a', 'b'] },
            { properties: { a: { const: { $data: '1/c' } } }, required: ['a', 'c'] },
            { properties: { b: { const: { $data: '1/c' } } }, required: ['b', 'c'] }
        ]
    }
};

export const responseSchema = {
    type: 'object',
    properties: {
        result: { type: 'string', const: 'This is versatile triangle' }
    },
    required: ['result'],
    additionalProperties: false
};

export const validateTriangle = ajv.compile(versatileSchema);
export const validateResponse = ajv.compile(responseSchema);
