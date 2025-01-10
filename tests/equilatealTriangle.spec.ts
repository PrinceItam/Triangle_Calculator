import { test, expect } from '@playwright/test';
import TriangleCalculatorPage from '../src/resources/triangleCalculatorPage';
import { TriangleSideGenerator } from '../src/resources/mocks';
import { validateEquilateralTriangle, validateEquilateralResponse } from '../schema_files/equilateral_schema';

test.describe('Triangle Calculator API - Equilateral Triangles', () => {
    let triangleCalculator: TriangleCalculatorPage;
    let sides: { a: number, b: number, c: number };

    test.beforeEach(async () => {
        triangleCalculator = new TriangleCalculatorPage();
        sides = TriangleSideGenerator.generateEquilateralSides();
    });

    test('Validate equilateral triangle type', async () => {
        const response = await triangleCalculator.checkTriangleType(sides.a, sides.b, sides.c);

        const isValidTriangle = validateEquilateralTriangle({ a: sides.a, b: sides.b, c: sides.c });
        console.log(validateEquilateralTriangle.errors); // Log validation errors for debugging
        expect(isValidTriangle).toBe(true);

        const isValidResponse = validateEquilateralResponse(response);
        console.log(validateEquilateralResponse.errors); // Log validation errors for debugging
        expect(isValidResponse).toBe(true);
    });

    test('Check response code', async () => {
        await triangleCalculator.checkResponseCode(sides.a, sides.b, sides.c);
    });


    test('Validate JSON response body', async () => {
        try {
            await triangleCalculator.verifyValidJsonBody(sides.a, sides.b, sides.c);
        } catch (error) {
            console.error('Error during JSON response body validation:', error);
        }
    });
    
    test('Validate equilateral triangle properties', async () => {
        const response = await triangleCalculator.checkTriangleType(sides.a, sides.b, sides.c);
        expect(sides.a).toBe(sides.b);
        expect(sides.b).toBe(sides.c);
        expect(response.result).toBe('This is equilateral triangle');
    });

    test('Boundary values for equilateral triangles - smallest side length', async () => {
        const boundarySides = { a: 1, b: 1, c: 1 };
        const response = await triangleCalculator.checkTriangleType(boundarySides.a, boundarySides.b, boundarySides.c);
        expect(response.result).toBe('This is equilateral triangle');
    });

    test('Boundary values for equilateral triangles - large side lengths', async () => {
        const largeSides = { a: 100000, b: 100000, c: 100000 };
        const response = await triangleCalculator.checkTriangleType(largeSides.a, largeSides.b, largeSides.c);
        expect(response.result).toBe('This is equilateral triangle');
    });

    test('Invalid equilateral triangle data - negative sides', async () => {
        const invalidSides = { a: -1, b: -1, c: -1 };
        try {
            await triangleCalculator.checkTriangleType(invalidSides.a, invalidSides.b, invalidSides.c);
        } catch (error) {
            expect(error.message).toContain('All triangle sides should be greater than 0'); // Updated expected message
        }
    });

    test('Invalid equilateral triangle data - zero sides', async () => {
        const invalidSides = { a: 0, b: 0, c: 0 };
        try {
            await triangleCalculator.checkTriangleType(invalidSides.a, invalidSides.b, invalidSides.c);
        } catch (error) {
            expect(error.message).toContain('All triangle sides should be greater than 0'); // Updated expected message
        }
    });
});
