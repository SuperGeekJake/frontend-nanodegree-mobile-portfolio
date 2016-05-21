import {logAverageFrame} from './utils';

class BackgroundAnimation {
  public imagePath: string = 'img/pizza.png';
  public imageWidth: number = 73.333;
  public imageHeight: number = 100;
  public spacing: number = 256;

  private _$el: HTMLElement = document.body;
  private _rows: number = 0;
  private _cols: number = 0;
  private _totalImages: number;
  private _imageCSS: string = '';
  private _ticking: boolean = false;
  private _frame: number = 0;

  constructor() {}

  public init() {
    this._reset();

    // Listen for scroll and resize events
    // TODO: Resize event
    window.addEventListener('scroll', () => {
      this._requestTick();
    });

    window.addEventListener('resize', () => {
      this._reset();
    });
  }

  private _reset() {
    let newRows = Math.ceil(window.innerHeight / this.spacing);
    let newCols = Math.ceil(window.innerWidth / this.spacing);

    // Noop when rows and columns haven't changed
    if (newRows === this._rows && newCols === this._cols) return;

    this._rows = newRows;
    this._cols = newCols;
    this._totalImages = newRows * newCols;
    this._imageCSS = '';
    this._requestTick();
  }

  private _update() {
    this._frame++;
    window.performance.mark("mark_start_frame");

    this._getImageCSS();
    this._getPositionCSS();
    this._ticking = false;

    // User Timing API to the rescue again. Seriously, it's worth learning.
    // Super easy to create custom metrics.
    window.performance.mark("mark_end_frame");
    window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
    if (this._frame % 10 === 0) {
      var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
      logAverageFrame(timesToUpdatePosition);
    }
  }

  // Inspiration: http://www.html5rocks.com/en/tutorials/speed/animations/
  private _requestTick() {
    if (this._ticking) return;

    window.requestAnimationFrame(() => this._update());
    this._ticking = true;
  }

  private _calulatePositions() {
    let positions = [];

    let i = 0;
    for (let y = 0; y < this._rows; y++) {
      for (let x = 0; x < this._cols; x++) {
        // TODO: Calculte positioning
        let fromTop = y * this.spacing;
        let phase = Math.sin((window.scrollY / 1250) + (i % 5));
        let fromLeft = x * this.spacing + 100 * phase;
        positions[i] = [fromLeft, fromTop];

        // Increment total index
        i++;
      }
    }

    return positions;
  }

  private _getImageCSS() {
    // Generate background-image only if needed
    if (this._imageCSS !== '') return;

    let imageCSS = '';
    let urlCSS = `url("${this.imagePath}")`;
    for (let i = 0; i < this._totalImages; i++) {
      imageCSS += urlCSS;

      // Add comman unless last
      if (i < this._totalImages - 1) imageCSS += ',';
    }

    // Cache string
    this._imageCSS = imageCSS;

    this._$el.style.backgroundImage = imageCSS;
  }

  private _getPositionCSS() {
    const posList = this._calulatePositions();

    let posCSS = '';
    for (let i = 0; i < this._totalImages; i++) {
      posCSS += `${posList[i][0]}px ${posList[i][1]}px`;

      // Add comman unless last
      if (i < this._totalImages - 1) posCSS += ',';
    }

    this._$el.style.backgroundPosition = posCSS;
  }
}

export const bgAnimation = new BackgroundAnimation();
