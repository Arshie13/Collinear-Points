import LineSegment from "./LineSegment";
import Point from "./Point";

export default class FastCollinearPoints {

  private jSegments: LineSegment[] = [];
  d: any;

  constructor(points: Point[], d: any) {
    // YOUR CODE HERE
    this.d = d;
    let jCopy: Point[] = points.slice();

    // throw error if point is null
    if (points === null) {
      throw new Error("Point is null");
    }
    
    jCopy.sort((a, b) => a.compareTo(b));

    // throw error if the argument to the constructor contains a repeated point.
    if (this.hasDuplicate(jCopy)) {
      throw new Error("U have duplicate points");
    }

    for (let i = 0; i < jCopy.length - 3; i++) {

      jCopy.sort((a, b) => jCopy[i].slopeTo(a) - jCopy[i].slopeTo(b));

      for (let p = 0, first = 1, last = 2; last < jCopy.length; last++) {
        while (last < jCopy.length &&
          jCopy[p].slopeTo(jCopy[first]) === jCopy[p].slopeTo(jCopy[last])
        ) {
          last++;
        }

        if (last - first >= 3 &&
          jCopy[p].compareTo(jCopy[first]) < 0) {
          this.jSegments.push(new LineSegment(jCopy[p], jCopy[last - 1], d));
        }
        first = last;
      }
    }
  }
  numberOfSegments(): number {
    // YOUR CODE HERE
    return this.jSegments.length;
  }

  segments(): LineSegment[] {
    // YOUR CODE HERE
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