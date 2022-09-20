/**
 * @author: lujiahao 
 * @date: 2019-11-21 18:19:52 
 */
class CJSTaskItem extends fairygui.GComponent {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public tfContent: fairygui.GRichTextField;
	public btnGo: Button0;
	//>>>>end

    public static URL: string = "ui://ehocr0vupwnza";

    public static createInstance(): CJSTaskItem {
        return <CJSTaskItem><any>(fairygui.UIPackage.createObject("actCJS", "CJSTaskItem"));
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
            t.registerEvent(true);

            t.stateCtrl.selectedIndex = pData.state;
            let t_color = Color.REDSTR;
            if (pData.count >= pData.cfg.cs1) {
                t_color = Color.GREENSTR;
            }
            t.tfContent.text = pData.cfg.ms + HtmlUtil.font(` (${ConfigHelp.getYiWanText(pData.count)}/${ConfigHelp.getYiWanText(parseInt(pData.cfg.cs1))})`, t_color);
        }
        else {
            t.registerEvent(false);
        }
    }

    public clean() {
        let t = this;
        t.setData(null);
        super.clean();
    }

    public dispose() {
        let t = this;
        t.clean();
        super.dispose();
    }

    //===================================== private method =====================================
    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnGo:
                if (!t._curData)
                    return;
                let t_openId = this._curData.cfg.open;
                if (t_openId == UIConst.CHONGZHI) //任务类型为充值
                {
                    //需要判断充值过没有，没有充值过的话，都是打开首充界面
                    ViewChongZhi.tryToOpenCZ();
                }
                else {
                    if (!ModuleManager.isOpen(t_openId, true))
                        return;
                    let t_cla = GGlobal.layerMgr.getClassById(t_openId);
                    if (t_cla == ViewActCom) {
                        //先关闭当前面板
                        GGlobal.layerMgr.close2(UIConst.ACTCOM);
                    }
                    GGlobal.layerMgr.open(t_openId);
                }
                break;
        }
        GGlobal.layerMgr.close2(UIConst.ACTCOM_CJS_TASK);
    }
}