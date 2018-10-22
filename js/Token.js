class Token {
    constructor(index, owner){
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }
    
    get htmlToken() {
        return document.getElementById(this.id);
    }

    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }

    get offsetLeft() { 
        if (navigator.userAgent.search("Firefox") >= 0) { 
            return this.htmlToken.offsetLeft - 16; 
        } else { 
        return this.htmlToken.offsetLeft; 
    } 
}

    drawHTMLToken(){
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }

    moveLeft() {
        if (this.columnLocation > 0) {
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation -= 1;
        } 
    }

    moveRight(columns) {
        if (this.columnLocation < columns - 1) {
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation += 1;
        }
    }

	drop(target, reset) {
        this.dropped = true;
        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 800, 'easeOutBounce', reset);
	}
}