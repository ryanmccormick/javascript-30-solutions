(function (global, docRef) {
  'use strict';

  // constants
  const CANVAS_SELECTOR = '#draw';

  // configured canvas instance
  let appCanvas = undefined;

  // runtime variables
  let canvasRuntime = undefined;
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = true;

  function init() {
    setup();
  }

  init();
  //////////

  function draw(event) {
    if (!isDrawing) {
      return;
    }

    appCanvas.ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    appCanvas.ctx.beginPath();
    appCanvas.ctx.moveTo(lastX, lastY);
    appCanvas.ctx.lineTo(event.offsetX, event.offsetY);
    appCanvas.ctx.stroke();

    // set state vars
    [lastX, lastY] = [event.offsetX, event.offsetY];

    // increment hue
    adjustHue();
  }

  function adjustHue() {
    if (hue >= 360) {
      hue = 0;
    }
    hue += 1;

    if (appCanvas.ctx.lineWidth >= 100 || appCanvas.ctx.lineWidth <= 1) {
      direction = !direction;
    }

    if (direction) {
      appCanvas.ctx.lineWidth++;
    } else {
      appCanvas.ctx.lineWidth--;
    }
  }

  function handleMouseDown(event) {
    setDrawState(true);
    // set state vars
    [lastX, lastY] = [event.offsetX, event.offsetY];
  }

  // Runtime methods and utils.
  function setup() {
    appCanvas = getConfiguredCanvas();
    canvasRuntime = getCanvasRuntime(appCanvas.canvasEl);
  }

  function setDrawState(value) {
    isDrawing = value;
  }

  function getCanvasRuntime(canvasInstance) {
    canvasInstance.addEventListener('mousemove', draw);
    canvasInstance.addEventListener('mousedown', handleMouseDown);
    canvasInstance.addEventListener('mouseup', () => setDrawState(false));
    canvasInstance.addEventListener('mouseout', () => setDrawState(false));

    return function () {
      canvasInstance.removeEventListener('mousemove', draw);
      canvasInstance.removeEventListener('mousedown', handleMouseDown);
      canvasInstance.removeEventListener('mouseup', () => setDrawState(false));
      canvasInstance.removeEventListener('mouseout', () => setDrawState(false));
    };
  }

  function getConfiguredCanvas() {
    const { canvasEl } = getAllElements();
    const ctx = canvasEl.getContext('2d');

    canvasEl.width = global.innerWidth;
    canvasEl.height = global.innerHeight;

    ctx.strokeStyle = '#BADA55';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 20;

    // fun feature
    // ctx.globalCompositeOperation = 'multiply';

    return {
      canvasEl,
      ctx,
    };
  }

  function getAllElements() {
    const canvasEl = docRef.querySelector(CANVAS_SELECTOR);

    return {
      canvasEl,
    };
  }
})(window, document);
