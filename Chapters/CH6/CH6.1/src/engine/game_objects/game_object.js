class GameObject {
    constructor(renderable) {
        this.mRenderComponent = renderable;
    }
    getXform() { return this.mRenderComponent.getXform(); }
    getRenderable() { return this.mRenderComponent; }
    update() { }
    draw(aCamera) {
        this.mRenderComponent.draw(aCamera);
    }
}
export default GameObject;