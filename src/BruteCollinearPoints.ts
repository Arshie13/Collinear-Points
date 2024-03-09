import LineSegment from "./LineSegment";
import Point from "./Point";
import p5 from "p5";
import Shellsort from "./shellsort";

export default class BruteCollinearPoints {

  private jSegments: LineSegment[] = new Array<LineSegment>();
  p: p5;

  constructor(points: Point[], p: p5) {
    this.p = p;
    let jCopy: Point[] = points.slice();
    Shellsort.sort(jCopy)

    // throw error if point is null
    if (points === null) {
      throw new Error("Point is null");
    }

    jCopy.sort((a, b) => a.x - b.x);

    if (this.hasDuplicate(jCopy)) {
      throw new Error("U have duplicate points");
    }

    for (let first = 0; first < jCopy.length - 3; first++) {

      for (let second = first + 1; second < jCopy.length - 2; second++) {
        let slopeFS = jCopy[first].slopeTo(jCopy[second]);

        for (let third = second + 1; third < jCopy.length - 1; third++) {
          let slopeFT = jCopy[first].slopeTo(jCopy[third]);

          if (slopeFS === slopeFT) {
            
            for (let fourth = third + 1; fourth < jCopy.length; fourth++) {
              let slopeFF = jCopy[first].slopeTo(jCopy[fourth]);

              if (slopeFS === slopeFF) {
                this.jSegments.push(new LineSegment(jCopy[first], jCopy[fourth], p));
              }
            }
          }
        }
      }
    }
  }

  numberOfSegments(): number {
    return this.jSegments.length;
  }

  segments(): LineSegment[] {
    return this.jSegments
  }

  private hasDuplicate(points: Point[]): boolean {
    for (let i = 0; i < points.length - 1; i++) {
      if (points[i].compareTo(points[i + 1]) === 0) {
        return true;
      }
    }
    return false;
  }
}
