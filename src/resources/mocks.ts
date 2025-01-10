export class TriangleSideGenerator {
    static generateValidSides(): { a: number, b: number, c: number } {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;

        if (a + b > c && a + c > b && b + c > a) {
            return { a, b, c };
        }
        return this.generateValidSides();
    }

    static generateIsoscelesSides(): { a: number, b: number, c: number } {
        let a = Math.floor(Math.random() * 10) + 1;
        let b = a;
        let c;

        do {
            c = Math.floor(Math.random() * 10) + 1;
        } while (c === a || c >= a + b);

        return { a, b, c };
    }

    static generateScaleneSides(): { a: number, b: number, c: number } {
        const a = Math.floor(Math.random() * 10) + 1;
        let b: number;
        let c: number;

        do {
            b = Math.floor(Math.random() * 10) + 1;
        } while (b === a);

        do {
            c = Math.floor(Math.random() * 10) + 1;
        } while (c === a || c === b);

        if (a + b > c && a + c > b && b + c > a) {
            return { a, b, c };
        }
        return this.generateScaleneSides();
    }

    static generateEquilateralSides(): { a: number, b: number, c: number } {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = a;
        const c = a;

        return { a, b, c };
    }
}
