import LineSegment from "./LineSegment";
import Point from "./Point";
import Shellsort from "./shellsort";

export default class FastCollinearPoints {

  private jSegments: LineSegment[] = [];
  d: any;

  constructor(points: Point[], d: any) {
    this.d = d;
    const n = points.length;
    let jCopy: Point[] = points.slice();

    // throw error if point is null
    if (points === null) {
      throw new Error("Point is null");
    }
    
    // jCopy.sort((a, b) => a.compareTo(b));
    Shellsort.sort(jCopy)

    if (this.hasDuplicate(jCopy)) {
      throw new Error("U have duplicate points");
    }

    for (let i = 0; i < n; i++) {
      const p = jCopy[i];
      const slopeSortedPoints = jCopy.slice().sort((a, b) => p.slopeTo(a) - p.slopeTo(b));

      let j = 1;
      while (j < n - 2) {
        let k = j + 1;
        while (k < n && p.slopeTo(slopeSortedPoints[j]) === p.slopeTo(slopeSortedPoints[k])) {
          k++;
        }
        if (k - j >= 3 && p.compareTo(slopeSortedPoints[j]) < 0) {
          this.jSegments.push(new LineSegment(p, slopeSortedPoints[k - 1], d));
        }
        j = k;
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