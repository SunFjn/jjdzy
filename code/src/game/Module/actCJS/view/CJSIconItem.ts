/**
 * @author: lujiahao 
 * @date: 2019-11-20 17:23:31 
 */
class CJSIconItem extends fairygui.GComponent {

    //>>>>start
    public stateCtrl: fairygui.Controller;
    public iconLoader: fairygui.GLoader;
    //>>>>end

    public static URL: string = "ui://ehocr0vupwnz6";

    public static createInstance(): CJSIconItem {
        return <CJSIconItem><any>(fairygui.UIPackage.createObject("actCJS", "CJSIconItem"));
    }

    private _curData: VoTaskCJS;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoTaskCJS) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.visible = true;
            t.stateCtrl.selectedIndex = pData.state;
            IconUtil.setImg1(Enum_Path.CJS_URL + pData.cfg.tb + ".png", t.iconLoader);
            t.addClickListener(t.onOpen, t);
        } else {
            t.visible = false;
        }
    }

    private onOpen() {
        let t = this;
        GGlobal.layerMgr.open(UIConst.ACTCOM_CJS_TASK, { layer: t._curData.cfg.cs });
    }

    public dispose() {
        let t = this;
        t.removeClickListener(t.onOpen, t);
        t.setData(null);
        IconUtil.setImg1(null, t.iconLoader);
        super.dispose();
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}