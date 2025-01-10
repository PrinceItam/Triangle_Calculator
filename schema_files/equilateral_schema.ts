import Ajv from 'ajv';

const ajv = new Ajv();

const equilateralTriangleSchema = {
    type: 'object',
    properties: {
        a: { type: 'number', minimum: 1 },
        b: { type: 'number', minimum: 1 },
        c: { type: 'number', minimum: 1 },
    },
    required: ['a', 'b', 'c'],
    additionalProperties: false,
    allOf: [
        {
            // Ensures all three sides are equal
            properties: { a: { type: 'number' } },
            required: ['a'],
            if: {
                properties: { b: { type: 'number', const: { $data: '1/a' } } }
            },
            then: {
                properties: { c: { type: 'number', const: { $data: '1/a' } } },
                required: ['c']
            }
        }
    ]
};

const equilateralResponseSchema = {
    type: 'object',
    properties: {
        result: { type: 'string', const: 'This is equilateral triangle' }
    },
    required: ['result'],
    additionalProperties: false
};

export const validateEquilateralTriangle = ajv.compile(equilateralTriangleSchema);
export const validateEquilateralResponse = ajv.compile(equilateralResponseSchema);
