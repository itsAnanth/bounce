/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('game');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d'); 
resize(canvas);

/** @type {Ball[]} */
const balls = [];

render();
window.addEventListener('keydown', key => {
    if (key.keyCode == 32) {
        balls = balls.map(x => {
            x.pos.x = x.getRandomInt(canvas.width);
            x.pos.y = x.getRandomInt(canvas.height);
            x.vel.x = x.getRandomInt(10);
            x.vel.y = x.getRandomInt(10);
            return x;
        })
    }
})
window.addEventListener('resize', resize.apply(null, [canvas]));
window.addEventListener('click', (event) => {
    const ball = new Ball(canvas);
    ball.pos.x = event.clientX;
    ball.pos.y = event.clientY;
    console.log(ball);
    balls.push(ball);
})


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ballsLen = balls.length;
    for (let i = 0; i < ballsLen; i++) {
        const ball = balls[i];
        ball.update();
        ball.render();
    }

    requestAnimationFrame(render);
}


/**
 * @param {HTMLCanvasElement} canvas 
 */
function resize(canvas) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}