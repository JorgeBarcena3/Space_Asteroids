class animation {

    constructor(_img, _tempo = 2) {

        this.img = _img;
        this.timePerFrame = 1 / _tempo;
        this.currentFrametime = 0;
        this.frameWidth = 99;
        this.frameHeight = 75;
        this.actualX = 0;
        this.actualY = 0;
    }


    Update(deltaTime) {
        this.currentFrametime += deltaTime;
        if (this.currentFrametime >= this.timePerFrame) {
            // update the animation frame
            this.actualX += this.frameWidth;
            if (this.actualX >= 390) {
                this.actualX = 0;
               
            }
            this.currentFrametime = 0.0;
        }
    }

    Draw(ctx) {
        
    
        ctx.scale(0.5, 0.5);
        ctx.drawImage(this.img, this.actualX, this.actualY,
            this.frameWidth, this.frameHeight,
            -this.frameWidth / 2, -this.frameHeight / 2,
            this.frameWidth, this.frameHeight);
    }
}
