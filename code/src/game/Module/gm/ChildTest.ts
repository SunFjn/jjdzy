class ChildTest extends fairygui.GComponent {
    public static URL = "ui://vm9a8xq8p3a0e";
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHide, this);
    }
    protected onShow() {
        
    }
    protected onHide() {
        
    }
}