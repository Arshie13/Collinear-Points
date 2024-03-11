import Point from "./Point";
import p5 from 'p5'

export default class LineSegment {
  p: Point;
  q: Point;
  drawPoint: p5;

  constructor(p: Point, q: Point, drawPoint: p5) {
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