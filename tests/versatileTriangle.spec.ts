import { test, expect } from '@playwright/test';
import TriangleCalculatorPage from '../src/resources/triangleCalculatorPage';
import { TriangleSideGenerator } from '../src/resources/mocks';
import { validateTriangle, validateResponse, responseSchema } from '../schema_files/versatile_schema';

test.describe('Versatile Triangle API', () => {
    let triangleCalculator;
    let sides;

    test.beforeEach(async () => {
        triangleCalculator = new TriangleCalculatorPage();
        sides = TriangleSideGenerator.generateScaleneSides();
    });

    test('Validate versatile triangle type', async () => {
        const response = await triangleCalculator.checkTriangleType(sides.a, sides.b, sides.c);

        const isValidTriangle = validateTriangle({ a: sides.a, b: sides.b, c: sides.c });
        expect(isValidTriangle).toBe(true);
        expect(validateTriangle.errors).toBeNull();

        const isValidResponse = validateResponse(response);
        expect(isValidResponse).toBe(true);
        expect(validateResponse.errors).toBeNull();

        // Assert the expected triangle type
        expect(response.result).toBe('This is versatile triangle');
    });

    test('Check response code', async () => {
        try {
            await triangleCalculator.checkResponseCode(sides.a, sides.b, sides.c);
            // Add an assertion for the response code if needed
        } catch (error) {
            // Propagate the error to fail the test
            throw new Error(`Error during response code check: ${error.message}`);
        }
    });

    test('Validate JSON response body', async () => {
        try {
            await triangleCalculator.verifyValidJsonBody(sides.a, sides.b, sides.c);
            // Add assertions for the JSON response body if needed
        } catch (error) {
            // Propagate the error to fail the test
            throw new Error(`Error during JSON response body validation: ${error.message}`);
        }
    });

    test('Validate versatile triangle properties', async () => {
        const response = await triangleCalculator.checkTriangleType(sides.a, sides.b, sides.c);
        expect(sides.a).not.toBe(sides.b);
        expect(sides.b).not.toBe(sides.c);
        expect(response.result).toBe('This is versatile triangle');
    });

    test('Boundary values for versatile triangles - large side lengths', async () => {
        const largeSides = { a: 100000, b: 99999, c: 99998 };
        const response = await triangleCalculator.checkTriangleType(largeSides.a, largeSides.b, largeSides.c);
        expect(response.result).toBe('This is versatile triangle');
    });
});
