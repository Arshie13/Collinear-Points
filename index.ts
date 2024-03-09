import p5 from "p5";
import Point from "./src/Point";
import BruteCollinearPoints from "./src/BruteCollinearPoints";
import FastCollinearPoints from "./src/FastCollinearPoints";

const width: number = 800;
const height: number = 500;
const padding: number = 50;

let sketch = function (p: p5) {
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

  const points: Point[] = [
    new Point(5000, 0, p),
    new Point(10000, 0, p),
    new Point(15000, 0, p),
    new Point(20000, 0, p),
    new Point(25000, 0, p),
    new Point(30000, 0, p),
    new Point(1234, 5678, p),
    new Point(10000, 3100, p),
    new Point(15000, 6200, p),
    new Point(20000, 9300, p),
    new Point(25000, 12400, p),
    new Point(30000, 15700, p),
    new Point(27000, 7500, p),
    new Point(26000, 10000, p),
    new Point(20000, 25000, p),
    new Point(19000, 27500, p),
    new Point(18000, 30000, p),
    new Point(0, 0, p),
    new Point(2300, 4100, p),
    new Point(4600, 8200, p),
    new Point(11500, 20500, p),
    new Point(5678, 4321, p),
    new Point(0, 30000, p),
    new Point(0, 25000, p),
    new Point(0, 20000, p),
    new Point(0, 15000, p),
    new Point(0, 11000, p),
    new Point(0, 10000, p),
    new Point(0, 5000, p),
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

    const collinear = new FastCollinearPoints(points, p);
    const collinear2 = new BruteCollinearPoints(points, p);
    p.stroke("red");
    p.strokeWeight(2);
    p.line(100, 100, 200, 200);
    // console.log(collinear2);
    for (const segment of collinear.segments()) {
      console.log(segment.toStrings());
      segment.draw();
    }
  };
};

new p5(sketch);