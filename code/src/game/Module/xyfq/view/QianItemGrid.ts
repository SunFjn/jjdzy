/**
 * @author: lujiahao 
 * @date: 2020-04-10 10:38:36 
 */
class QianItemGrid extends fairygui.GLabel {

    //>>>>start
    public qianIcon: fairygui.GLoader;
    //>>>>end

    public static URL: string = "ui://7hwmix0gszt5w";

    public static createInstance(): QianItemGrid {
        return <QianItemGrid><any>(fairygui.UIPackage.createObject("xyfq", "QianItemGrid"));
    }

    public constructor() {
        super();
    }

    private _curData: VoQianXyfq;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoQianXyfq) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            let t_posId = pData.posId;
            t.qianIcon.url = CommonManager.getUrl("xyfq", `qian_${t_posId}`);
            t.icon = CommonManager.getUrl("xyfq", `color_${t_posId}`);
        }
        else {
            t.registerEvent(false);
        }
    }

    public clean() {
        this.setData(null);
        super.clean();
    }

    public dispose() {
        this.clean();
        super.dispose();
    }
    //===================================== private method =====================================
    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    }

    //======================================== handler =========================================
    private onClick(e: egret.TouchEvent) {
        let t = this;
        if (t._curData) {
            FastAPI.showItemTips(t._curData.id, ViewGrid.BAG);
        }
    }
}