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
