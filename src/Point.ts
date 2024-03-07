export default class Point {
	x: number;
	y: number;
	p: any;

	constructor(x: number, y: number, p: any) {
		this.x = x;
		this.y = y;
		this.p = p;
	}

	draw(): void {
		// DO NOT MODIFY

		this.p.stroke("black");
		this.p.strokeWeight(500);
		this.p.point(this.x, this.y);
	}

	drawTo(that: Point) {
		// DO NOT MODIFY

		this.p.stroke("black");
		this.p.strokeWeight(200);
		this.p.line(this.x, this.y, that.x, that.y);
	}

	slopeTo(that: Point): number {
		if (that.x === this.x && that.y === this.y) {
			return Number.NEGATIVE_INFINITY;
		}

		let jX = that.x - this.x;
		let jY = that.y - this.y;

		if (jY === 0) {
			return 0;
		}
		if (jX === 0) {
			return Number.POSITIVE_INFINITY;
		}
		return jY / jX;
	}

	compareTo(q: Point): number {
		if (this.y < q.y || (this.y === q.y && this.x < q.x)) return -1;
		if (this.x === q.x && this.y === q.y) return 0;
		return 1;
	}
}