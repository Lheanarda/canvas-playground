const LS_CODE_HTML = "ls-canvas-html";
const LS_CODE_JS = "ls-canvas-js";
const INITIAL_CODE_HTML = `<!-- HTML -->
<canvas id="canvas"></canvas>`;
const INITIAL_CODE_JS = `// Javascript
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Code your canvas logics here
class Ball{
  constructor({x,y,radius}){
    this.x = x
    this.y = y 
    this.radius = radius
  }

  draw(){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }

  update(){
    this.draw()
  }
}

const ball = new Ball({x:0, y:0, radius: 100})

function animate(){
   requestAnimationFrame(animate)
   ctx.clearRect(0,0,canvas.width, canvas.height)
   ball.update()
}
 animate()

`;

export function setCacheHtml(html: string) {
  localStorage.setItem(LS_CODE_HTML, html);
}

export function getCacheHtml() {
  return localStorage.getItem(LS_CODE_HTML);
}

export function setCacheJS(js: string) {
  localStorage.setItem(LS_CODE_JS, js);
}

export function getCacheJS() {
  return localStorage.getItem(LS_CODE_JS);
}

export function setCacheCode(html: string, js: string) {
  setCacheHtml(html);
  setCacheJS(js);
}

export function getInitialCodeHTML() {
  const persisted = getCacheHtml();
  return persisted ?? INITIAL_CODE_HTML;
}

export function getInitialCodeJS() {
  const persisted = getCacheJS();
  return persisted ?? INITIAL_CODE_JS;
}
