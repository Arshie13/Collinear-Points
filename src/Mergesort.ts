import Point from './Point';

export default class Mergesort {
  private aux: Point[];

  sort(a: Point[]): void {
    this.aux = new Array(a.length);
    this.sortAux(a, 0, a.length - 1);
  }

  private sortAux(a: Point[], lo: number, hi: number): void {
    if (hi <= lo) return;
    let mid = lo + Math.floor((hi - lo) / 2);
    this.sortAux(a, lo, mid);
    this.sortAux(a, mid + 1, hi);
    this.merge(a, lo, mid, hi);
  }

  private merge(a: Point[], lo: number, mid: number, hi: number): void {
    let i = lo;
    let j = mid + 1;

    for (let k = lo; k <= hi; k++) {
      this.aux[k] = a[k];
    }

    for (let k = lo; k <= hi; k++) {
      if (i > mid) a[k] = this.aux[j++];
      else if (j > hi) a[k] = this.aux[i++];
      else if (this.aux[j].compareTo(this.aux[i]) < 0) a[k] = this.aux[j++];
      else a[k] = this.aux[i++];
    }
  }
}