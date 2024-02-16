import p5 from "p5";
// import * as fs from "fs";

const width: number = 800;
const height: number = 500;
const padding: number = 50;

let sketch = function (p: any) {
  p.setup = function () {
    p.createCanvas(width, height);

    p.strokeWeight(5);
    p.stroke("blue");

    // x and y axes
    p.line(padding, padding, padding, height - padding);
    p.line(padding, height - padding, width - padding, height - padding);

    // y-axis arrow head
    p.line(padding, padding, padding - 5, padding + 5);
    p.line(padding, padding, padding + 5, padding + 5);

    // x-axis arrow head
    p.line(
      width - padding,
      height - padding,
      width - padding - 5,
      height - padding + 5
    );
    p.line(
      width - padding,
      height - padding,
      width - padding - 5,
      height - padding - 5
    );

    p.strokeWeight(0);
    p.text("(0, 0)", padding + 10, height - 30);
  };

  class Point {
    x: number;
    y: number;
    p;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    draw(): void {
      // DO NOT MODIFY

      p.stroke("black");
      p.strokeWeight(500);
      p.point(this.x, this.y);
    }

    drawTo(that: Point) {
      // DO NOT MODIFY

      p.stroke("black");
      p.strokeWeight(200);
      p.line(this.x, this.y, that.x, that.y);
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

    slopeOrder(): Comparator<Point> {
      return new jComparator()
    }
  }

  class Comparator<T> {
    compare(a: T, b: T): number {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  //possible error here
  class jComparator implements Comparator<Point> {
    compare(p1: Point, p2: Point): number {
      if (p1.y < p2.y) {
        return -1;
      } else if (p1.y > p2.y) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  class LineSegment {
    p: Point;
    q: Point;

    constructor(p: Point, q: Point) {
      // DO NOT MODIFY

      this.p = p;
      this.q = q;
    }

    draw(): void {
      // DO NOT MODIFY

      p.stroke("black");
      p.strokeWeight(2);
      p.line(this.p.x, this.p.y, this.q.x, this.q.y);
    }

    toString(): string {
      // DO NOT MODIFY

      return `${this.p} -> ${this.q}`
    }
  }

  class BruteCollinearPoints {

    private jSegments: LineSegment[] = new Array<LineSegment>();

    constructor(points: Point[]) {
      // YOUR CODE HERE
      let jCopy: Point[] = points.slice();
      jCopy.sort((a, b) => a.x - b.x);

      for (let first = 0; first < jCopy.length - 3; first++) {
        for (let second = first + 1; second < jCopy.length - 2; second++) {
          let slopeFS = jCopy[first].slopeTo(jCopy[second]);

          for (let third = second + 1; third < jCopy.length - 1; third++) {
            let slopeFT = jCopy[first].slopeTo(jCopy[third]);

            if (slopeFS === slopeFT) {
              for (let fourth = third + 1; fourth < jCopy.length; fourth++) {
                let slopeFF = jCopy[first].slopeTo(jCopy[fourth]);

                if (slopeFS === slopeFF) {
                  this.jSegments.push(new LineSegment(jCopy[first], jCopy[fourth]));
                }
              }
            }
          }
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
  }

  class FastCollinearPoints {

    private jSegments: LineSegment[] = new Array<LineSegment>();

    constructor(points: Point[]) {
      // YOUR CODE HERE
      let jCopy: Point[] = points.slice();
      jCopy.sort((a, b) => a.x - b.x);

      for (let i = 0; i < jCopy.length - 3; i++) {

        // possible error here
        jCopy.sort((a, b): number => {

          // to be tested
          if (a.x !== jCopy[i].x) {
            return a.slopeTo(jCopy[i]) - b.slopeTo(jCopy[i]);
          } else {
            return 0; // This ensures points with same x-coordinate are considered equal
          }
          // a.slopeTo(jCopy[i]) - b.slopeTo(jCopy[i])
        });

        for (let p = 0, first = 1, last = 2; last < jCopy.length; last++) {
          while (last < jCopy.length &&
            jCopy[p].slopeTo(jCopy[first]) === jCopy[p].slopeTo(jCopy[last])
          ) {

            last++;
          }

          if (last - first >= 3 &&
            jCopy[p].slopeTo(jCopy[first]) === jCopy[p].slopeTo(jCopy[last - 1])
          ) {
            this.jSegments.push(new LineSegment(jCopy[p], jCopy[last - 1]));
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
  }

  const points: Point[] = [
    new Point(5000, 0),
    new Point(10000, 0),
    new Point(15000, 0),
    new Point(20000, 0),
    new Point(25000, 0),
    new Point(30000, 0),

    new Point(1234, 5678),

    new Point(10000, 3100),
    new Point(15000, 6200),
    new Point(20000, 9300),
    new Point(25000, 12400),
    new Point(30000, 15700),

    new Point(27000, 7500),
    new Point(26000, 10000),
    new Point(20000, 25000),
    new Point(19000, 27500),
    new Point(18000, 30000),

    new Point(0, 0),
    new Point(2300, 4100),
    new Point(4600, 8200),
    new Point(11500, 20500),

    new Point(5678, 4321),

    new Point(0, 30000),
    new Point(0, 25000),
    new Point(0, 20000),
    new Point(0, 15000),
    new Point(0, 11000),
    new Point(0, 10000),
    new Point(0, 5000),
  ];


  // const testdata = './test_data/testdata.txt';
  // const data = fs.readFileSync(testdata, "utf-8");
  // const pointss = data.trim().split(/\s+/).map(Number);
  // const points: Point[] = [];
  
  // for (let i = 0; i < points.length; i++) {
  //   points.push(new Point(points[i], points[i + 1]));
  // }

  p.draw = function () {
    // p.background(255);
    p.translate(padding, height - padding);
    p.scale(1 / 100, -1 / 100);

    p.stroke("black")
    p.strokeWeight(5);

    for (const point of points) {
      point.draw();
      p.point(point.x, point.y)
    }

    const collinear = new FastCollinearPoints(points);
    const collinear2 = new BruteCollinearPoints(points);
    p.stroke("red");
    p.strokeWeight(2);
    p.line(100, 100, 200, 200);
    for (const segment of collinear2.segments()) {
      console.log(segment.toString());
      segment.draw();
    }
  };
};

new p5(sketch);
