abstract class ABActUI extends fairygui.GComponent {
    public constructor() {
        super();
        this.childrenCreated();
    }
    protected childrenCreated() {
        const self = this;
        const view = self.getView();
        this.addChild(view);
        CommonManager.parseChildren(view, self);
        self.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, self.onShow, self);
        self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onHide, self);
    }
    abstract getView();
    abstract onShow();
    abstract onHide();
}