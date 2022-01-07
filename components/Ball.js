const
    DAMPING = 0.9,
    GRAVITY = 0.2,
    MAX_VEL = 10,
    FRICTION = 0.8;
class Ball {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} radius 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext('2d');
        /** @type {{ x: number, y: number}} */
        this.pos = { x: this.getRandomInt(canvas.width), y: this.getRandomInt(canvas.height) };
        /** @type {{ x: number, y: number}} */
        this.vel = { x: this.getRandomInt(MAX_VEL), y: this.getRandomInt(MAX_VEL) };
        /** @type {number} */
        this.radius = 10;
        /** @type {string} */
        this.color = this.genHex(6);
        
    }

    genHex(size) { 
        return `#${[...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    }

    update() {
        if (this.pos.x + this.radius >= this.canvas.width) {
            this.vel.x = -this.vel.x * DAMPING;
            this.pos.x = this.canvas.width - this.radius;
        } else if (this.pos.x - this.radius <= 0) {
            this.vel.x = -this.vel.x * DAMPING;
            this.pos.x = this.radius;
        }

        if (this.pos.y + this.radius >= this.canvas.height) {
            this.vel.y = -this.vel.y * DAMPING;
            this.pos.y = this.canvas.height - this.radius;
            this.vel.x *= FRICTION;
        } else if (this.pos.y - this.radius <= 0) {
            this.pos.y = this.radius;
            this.vel.y = -this.vel.y * DAMPING;
        }

        this.vel.y += GRAVITY;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    /**
     * @param {number} max 
     * @returns {number}
     */
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}