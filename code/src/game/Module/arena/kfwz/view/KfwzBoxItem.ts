/**
 * @author: lujiahao 
 * @date: 2019-12-04 18:06:18 
 */
class KfwzBoxItem extends fairygui.GComponent {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public tfScore: fairygui.GRichTextField;
	public noticeImg: fairygui.GImage;
	public imageGet: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://me1skowln9yf70";

    public static createInstance(): KfwzBoxItem {
        return <KfwzBoxItem><any>(fairygui.UIPackage.createObject("Arena", "KfwzBoxItem"));
    }

    private _curData: VoTargetKfwz;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoTargetKfwz) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.tfScore.text = `${pData.cfg.cs}场`;
            t.stateCtrl.selectedIndex = pData.state;
        }
        else {
            t.registerEvent(false);
        }
    }

    public recycle() {
        let t = this;
        t.setData(null);
    }

    //===================================== private method =====================================
    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    }

    //======================================== handler =========================================
    private onClick(e: egret.TouchEvent) {
        //打开奖励界面
        let t = this;
        if (t._curData) {
            GGlobal.layerMgr.open(UIConst.KFWZ_REWARD_VIEW, t._curData);
        }
    }
}