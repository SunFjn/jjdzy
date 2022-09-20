/**
 * @author: lujiahao 
 * @date: 2019-11-26 17:43:23 
 */
class BzptBoxItem extends fairygui.GComponent {

    //>>>>start
	public typeCtrl: fairygui.Controller;
	public stateCtrl: fairygui.Controller;
	public noticeImg: fairygui.GImage;
	public tfScore: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://twm3bfygot2y9";

    public static createInstance(): BzptBoxItem {
        return <BzptBoxItem><any>(fairygui.UIPackage.createObject("actBzpt", "BzptBoxItem"));
    }

    private _curData: VoBoxBzpt;
    private _pos = 0;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoBoxBzpt) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);

            t.stateCtrl.selectedIndex = pData.state;
            let t_color = Color.GREENSTR;
            switch (pData.state) {
                case 0:
                    t_color = Color.REDSTR;
                    t.showEff(false);
                    break;
                case 1:
                    t.showEff(true);
                    break;
                case 2:
                    t.showEff(false);
                    break;
            }
            t.tfScore.text = HtmlUtil.font(`${pData.curCount}/${pData.maxCount}`, t_color);

            if (pData.pos == 7)
                t.typeCtrl.selectedIndex = 1;
            else
                t.typeCtrl.selectedIndex = 0;
        }
        else {
            t.registerEvent(false);
            t.showEff(false);
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
    private _mc: Part;
    private showEff(pFlag: boolean) {
        let t = this;
        if (pFlag) {
            if (!t._mc) {
                t._mc = EffectMgr.addEff("uieff/10021", t.displayListContainer, t.width / 2, t.height / 2, 1000, -1, true);
                t._mc.refThis = t;
                t._mc.refKey = "_mc";
            }
        }
        else {
            if (t._mc) {
                EffectMgr.instance.removeEff(t._mc);
            }
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    }

    //======================================== handler =========================================
    private onClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelBzpt;
        switch (e.currentTarget) {
            case t:
                if (!t._curData)
                    return;
                GGlobal.layerMgr.open(UIConst.ACTCOM_BZPT_REWARD, t._curData);
                break;
        }
    }
}