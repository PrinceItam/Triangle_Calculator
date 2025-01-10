import Ajv from 'ajv';

const ajv = new Ajv();

const isoscelesTriangleSchema = {
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
            // Ensures any 2 sides are greater than the 3rd
            if: {
                properties: { a: { type: 'number' } }
            },
            then: {
                properties: { b: { type: 'number' } },
                required: ['b'],
            },
            else: false
        }
    ]
};

const isoscelesResponseSchema = {
    type: 'object',
    properties: {
        result: { type: 'string', enum: ['This is isosceles triangle'] }
    },
    required: ['result'],
    additionalProperties: false
};

export const validateIsoscelesTriangle = ajv.compile(isoscelesTriangleSchema);
export const validateIsoscelesResponse = ajv.compile(isoscelesResponseSchema);
