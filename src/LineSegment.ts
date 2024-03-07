import Point from "./Point";

export default class LineSegment {
  p: Point;
  q: Point;
  drawPoint: any;

  constructor(p: Point, q: Point, drawPoint: any) {
    // DO NOT MODIFY

    this.p = p;
    this.q = q;
    this.drawPoint = drawPoint;
  }

  draw(): void {
    // DO NOT MODIFY

    this.drawPoint.stroke("black");
    this.drawPoint.strokeWeight(2);
    this.drawPoint.line(this.p.x, this.p.y, this.q.x, this.q.y);
  }

  toStrings(): string {
    // DO NOT MODIFY

    return `${this.p.x} -> ${this.q.y}`
  }
}