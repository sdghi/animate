interface CanvasOptions {
  height: number;
  width: number;
  trackMouse?: boolean;
}

interface CanvasData {
  mouseX?: number;
  mouseY?: number;
}

export class Sketch {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  timestamp: number;
  ctx: CanvasRenderingContext2D;
  draw: CallableFunction;
  canvasData: CanvasData;
  trackMouse: boolean;

  constructor(canvas: HTMLCanvasElement, canvasOptions: CanvasOptions) {
    this.canvas = canvas;
    this.width = canvasOptions.width;
    this.height = canvasOptions.height;
    this.trackMouse = canvasOptions.trackMouse;
    this.timestamp = 0;
    this.ctx = this.canvas.getContext("2d");
    this.draw = () => {};
    this.canvasData = {};
  }

  public init() {
    this.canvas.width = this.width * devicePixelRatio;
    this.canvas.height = this.height * devicePixelRatio;

    this.canvas.style.setProperty("width", `${this.width}px`);
    this.canvas.style.setProperty("height", `${this.height}px`);

    if (this.trackMouse) {
      this.setMousePosition();
    }

    requestAnimationFrame((t) => this.render(t));
  }

  private setMousePosition() {
    //@ts-ignore
    this.canvas.addEventListener("mousemove", (e: MouseEvent) => {
      this.canvasData.mouseX = e.clientX;
      this.canvasData.mouseY = e.clientY;
    });
  }

  public render(ts: number) {
    ts /= 1000;

    this.timestamp = ts;

    this.draw(ts, this.ctx, this.canvasData);

    requestAnimationFrame((t) => this.render(t));
  }
}
