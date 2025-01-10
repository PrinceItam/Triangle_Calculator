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
        expect(isValidTriangle).toBe(true);

        const isValidResponse = validateEquilateralResponse(response);
        expect(isValidResponse).toBe(true);
    });

    test('Check response code', async () => {
        await triangleCalculator.checkResponseCode(sides.a, sides.b, sides.c);
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
        const largeSides = { a: 100, b: 100, c: 100 };
        const response = await triangleCalculator.checkTriangleType(largeSides.a, largeSides.b, largeSides.c);
        expect(response.result).toBe('This is equilateral triangle');
    });

    test('Invalid equilateral triangle data - negative sides', async () => {
        const invalidSides = { a: -1, b: -1, c: -1 };
        await expect(triangleCalculator.checkTriangleType(invalidSides.a, invalidSides.b, invalidSides.c)).rejects.toThrow('All triangle sides should be greater than 0');
    });

    test('Invalid equilateral triangle data - zero sides', async () => {
        const invalidSides = { a: 0, b: 0, c: 0 };
        await expect(triangleCalculator.checkTriangleType(invalidSides.a, invalidSides.b, invalidSides.c)).rejects.toThrow('All triangle sides should be greater than 0');
    });
});
