import Point from "./Point";

export default class Shellsort {
  static sort(points: Point[]): Point[] {
    let h = 1;
    while (h < points.length / 3) {
      h = 3 * h + 1;
    }
    while (h >= 1) {
      for (let i = h; i < points.length; i++) {
        for (let j = i; j >= h && this.less(points[j], points[j - h]); j -= h) {
          this.exch(points, j, j - h);
        }
      }
      h = Math.floor(h / 3);
    }
    return points;
  }

  private static less(v: Point, w: Point): boolean {
    return v < w;
  }

  private static exch(points: Point[], i: number, j: number): void {
    let swap = points[i];
    points[i] = points[j];
    points[j] = swap;
  }
}
 