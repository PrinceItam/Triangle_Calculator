import { validateTriangle, validateResponse } from '../../schema_files/versatile_schema';

const baseUrl = 'http://qa-task-env-1.eba-gpid92d6.eu-west-1.elasticbeanstalk.com';

class TriangleCalculatorPage {

    async fetchRequest(endpoint: string, method: string = 'GET', body?: object): Promise<any> {
        const options: RequestInit = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
        };
        const response = await fetch(`${baseUrl}${endpoint}`, options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Request failed with status code ${response.status}`);
        }
        return response.json();
    }

    async checkTriangleType(a: number, b: number, c: number) {
        return this.fetchRequest('/', 'POST', { a, b, c });
    }

    async checkResponseCode(a: number, b: number, c: number): Promise<void> {
        const response = await fetch(`${baseUrl}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a, b, c }),
        });
        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Expected status 200 or 201, but got ${response.status}`);
        }
    }

    async checkVersatileTriangle(a: number, b: number, c: number): Promise<void> {
        const response = await this.fetchRequest('/', 'POST', { a, b, c });

        const triangleData = { a, b, c };
        if (!validateTriangle(triangleData)) {
            throw new Error('Triangle data validation failed');
        }

        if (!validateResponse(response)) {
            throw new Error('Response data validation failed');
        }
    }

    async verifyValidJsonBody(a: number, b: number, c: number): Promise<void> {
        const response = await this.checkTriangleType(a, b, c);
        console.log('Valid JSON body:', response);
    }

    async sendWrongRequest(a: number, b: number): Promise<void> {
        const response = await fetch(`${baseUrl}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a, b }),
        });
        if (response.status !== 422) {
            throw new Error(`Expected status code 422, but received ${response.status}`);
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed with status code ${response.status}`);
    }

}

export default TriangleCalculatorPage;
