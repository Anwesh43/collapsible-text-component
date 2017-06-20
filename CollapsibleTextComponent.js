const w = window.innerHeight,h = window.innerHeight
class CollapsibleTextComponent extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode:'open'})
        this.img = document.createElement('img')
        shadow.appendChild(this.img)
        this.text = this.getAttribute('text')
        this.title = this.getAttribute('title')
        this.color = this.getAttribute('color')
    }
    render() {
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const context = canvas.getContext('2d')
        context.fillStyle = this.color
    }
    connectedCallback() {
        this.render()
    }
}
class CollapsibleText {
    constructor(text,title) {
        this.text  = text
        this.title = title
        this.dir = 0
        this.scale = 0
    }
    drawText(context) {
        let msg = ""
        const textParts = []
        var y = h/10
        const tokens = this.text.split(" ")
        for(var i=0;i<tokens.length;i++) {
            const tw = context.measureText(msg+tokens[i]).width
            if(tw < 4*w/5) {
                msg = msg+tokens[i]
            }
            else {
                y+= h/20
                textParts.push({msg,y})
                msg = tokens[i]
            }
        }
        y += h/20
        textParts.push({msg,y})
        y+=h/20
        console.log(textParts)
        context.save()
        context.beginPath()
        context.rect(0,h/12,w,(y)*this.scale)
        context.clip()
        context.fillRect(0,h/12,w,y*this.scale)
        context.fillStyle = 'white'
        this.textParts.forEach((textPart)=>{
            context.fillText(textPart.msg,w/10,textPart.y)
        })
        context.restore()
    }
    draw(context,color) {
        context.font = context.font.replace(/\d{2}/,h/30)
        context.save()
        context.fillStyle = color
        context.fillRect(0,0,w,h/12)
        this.drawText(context)
        context.restore()
    }
    update() {
        this.scale += 0.1*this.dir
        if(this.scale > 1) {
            this.dir = 0
            this.scale = 1
        }
        if(this.scale < 0) {
            this.dir = 0
            this.scale = 0
        }
    }
    stopped() {
        return this.dir == 0
    }
}
