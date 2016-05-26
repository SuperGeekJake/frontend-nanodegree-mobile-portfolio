import {logAverageFrame} from './utils';

/**
 * Background Animation Singleton
 * Handles the CSS animation of background pizza images for the pizzeria webpage
 */
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
  private _scrollY: number = 0;
  private _frame: number = 0;

  // Setting of properties is abstracted above
  constructor() {}

  /**
   * Initialize animation and listen for events
   */
  public init() {
    this._reset();

    // Listen for scroll and resize events
    // TODO: Resize event
    window.addEventListener('scroll', () => this._onScroll());
    window.addEventListener('resize', () => this._reset());
  }

  /**
   * Reset/set of animation in regards to the number of rows/columns
   */
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

  /**
   * Update animation
   */
  private _update() {
    this._ticking = false;
    let scrollY = this._scrollY;

    this._frame++;
    window.performance.mark("mark_start_frame");

    this._setImageCSS();
    this._setPositionCSS(scrollY);

    // User Timing API to the rescue again. Seriously, it's worth learning.
    // Super easy to create custom metrics.
    window.performance.mark("mark_end_frame");
    window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
    if (this._frame % 10 === 0) {
      var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
      logAverageFrame(timesToUpdatePosition);
    }
  }

  /**
   * Handles requesting animation on scroll
   */
  private _onScroll() {
    this._scrollY = window.scrollY;
    this._requestTick();
  }

  /**
   * Request an animation frame unless one is already requested
   */
  private _requestTick() {
    if (this._ticking) return;

    // Inspiration: http://www.html5rocks.com/en/tutorials/speed/animations/
    window.requestAnimationFrame(() => this._update());
    this._ticking = true;
  }

  /**
   * Create and set the CSS value for background-image
   */
  private _setImageCSS() {
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

  /**
   * Create and set the CSS value for background-position
   */
  private _setPositionCSS(scrollY) {
    // let positions = [];
    let posCSS = '';

    for (let i = 0; i < this._totalImages; i++) {
      let fromTop = Math.floor(i / this._cols) * this.spacing;
      let phase = Math.sin((scrollY / 1250) + (i % 5));
      let fromLeft = (i % this._cols) * this.spacing + 100 * phase;

      // positions[i] = [fromLeft, fromTop];
      posCSS += `${fromLeft}px ${fromTop}px`;

      // Add comman unless last
      if (i < this._totalImages - 1) posCSS += ',';
    }

    // return positions;
    this._$el.style.backgroundPosition = posCSS;
  }
}

// Export Singleton
export const bgAnimation = new BackgroundAnimation();
