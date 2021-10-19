export class Sketch {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  timestamp: number;
  ctx: CanvasRenderingContext2D;
  draw: CallableFunction;

  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.timestamp = 0;
    this.ctx = this.canvas.getContext("2d");
    this.draw = () => {};
  }

  public init() {
    this.canvas.width = this.width * devicePixelRatio;
    this.canvas.height = this.height * devicePixelRatio;

    this.canvas.style.setProperty("width", `${this.width}px`);
    this.canvas.style.setProperty("height", `${this.height}px`);

    requestAnimationFrame((t) => this.render(t));
  }

  public render(ts) {
    ts /= 1000;

    this.timestamp = ts;

    this.draw(ts, this.ctx);

    requestAnimationFrame((t) => this.render(t));
  }
}
