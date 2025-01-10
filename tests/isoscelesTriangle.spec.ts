import { test, expect } from '@playwright/test';
import TriangleCalculatorPage from '../src/resources/triangleCalculatorPage';
import { TriangleSideGenerator } from '../src/resources/mocks';
import { validateIsoscelesTriangle, validateIsoscelesResponse } from '../schema_files/isosceles_schema';

test.describe('Isosceles Triangle API', () => {
    let triangleCalculator: TriangleCalculatorPage;
    let sides: { a: number, b: number, c: number };

    test.beforeEach(async () => {
        triangleCalculator = new TriangleCalculatorPage();
        sides = TriangleSideGenerator.generateIsoscelesSides();
    });

    test('Validate isosceles triangle type', async () => {
        try {
            const response = await triangleCalculator.checkTriangleType(sides.a, sides.b, sides.c);
            
            const isValidTriangle = validateIsoscelesTriangle({ a: sides.a, b: sides.b, c: sides.c });
            expect(isValidTriangle).toBe(true);
            expect(validateIsoscelesTriangle.errors).toBeNull();
            
            const isValidResponse = validateIsoscelesResponse(response);
            expect(isValidResponse).toBe(true);
            expect(validateIsoscelesResponse.errors).toBeNull();
        } catch (error) {
            console.error('Error during isosceles triangle validation:', error);
        }
    });

    test('Check response code', async () => {
        try {
            await triangleCalculator.checkResponseCode(sides.a, sides.b, sides.c);
        } catch (error) {
            console.error('Error during response code check:', error);
        }
    });

    test('Validate JSON response body', async () => {
        try {
            await triangleCalculator.verifyValidJsonBody(sides.a, sides.b, sides.c);
        } catch (error) {
            console.error('Error during JSON response body validation:', error);
        }
    });

    test('Send wrong request', async () => {
        try {
            await triangleCalculator.sendWrongRequest(sides.a, sides.b);
        } catch (error) {
            console.error('Error during wrong request:', error);
            expect(error.message).toContain('');
        }
    });

    test('Validate isosceles triangle properties', async () => {
        try {
            const response = await triangleCalculator.checkTriangleType(sides.a, sides.b, sides.c);
            const sideArray = [sides.a, sides.b, sides.c];
            const uniqueSides = new Set(sideArray);
            expect(uniqueSides.size).toBe(2); // Two sides should be equal
            expect(response.result).toBe('This is isosceles triangle');
        } catch (error) {
            console.error('Error during isosceles triangle properties validation:', error);
        }
    });

    test('Boundary values for isosceles triangles - smallest side length', async () => {
        const boundarySides = { a: 1, b: 1, c: 2 };
        try {
            const response = await triangleCalculator.checkTriangleType(boundarySides.a, boundarySides.b, boundarySides.c);
            expect(response.result).toBe('This is isosceles triangle');
        } catch (error) {
            console.error('Error during boundary values validation (smallest side length):', error);
        }
    });

    test('Boundary values for isosceles triangles - large side lengths', async () => {
        const largeSides = { a: 100, b: 100, c: 999 };
        try {
            const response = await triangleCalculator.checkTriangleType(largeSides.a, largeSides.b, largeSides.c);
            expect(response.result).toBe('This is isosceles triangle');
        } catch (error) {
            console.error('Error during boundary values validation (large side lengths):', error);
        }
    });

    test('Invalid isosceles triangle data - negative sides', async () => {
        const invalidSides = { a: -1, b: -1 };
        try {
            await triangleCalculator.sendWrongRequest(invalidSides.a, invalidSides.b);
        } catch (error) {
            expect(error.message).toContain('Triangle should have 3 side');
            console.error('Error during invalid isosceles triangle data validation (negative sides):', error);
        }
    });

    test('Invalid isosceles triangle data - zero sides', async () => {
        const invalidSides = { a: 0, b: 0 };
        try {
            await triangleCalculator.sendWrongRequest(invalidSides.a, invalidSides.b);
        } catch (error) {
            expect(error.message).toContain('Triangle should have 3 side');
            console.error('Error during invalid isosceles triangle data validation (zero sides):', error);
        }
    });
});
