/**
 * @author: lujiahao 
 * @date: 2020-01-07 17:46:30 
 */
class LuckyEggPoolItem extends fairygui.GButton {

    //>>>>start
	public typeLoader: fairygui.GLoader;
	public btn: fairygui.GButton;
	public effectShake: fairygui.Transition;
	//>>>>end

    public static URL: string = "ui://wx4kos8uosj39";

    public static createInstance(): LuckyEggPoolItem {
        return <LuckyEggPoolItem><any>(fairygui.UIPackage.createObject("luckyEgg", "LuckyEggPoolItem"));
    }

    public constructor() {
        super();
    }

    private _poolType = 0;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
        t.effectShake = t.getTransition("effectShake");
    }

    //=========================================== API ==========================================
    public setData(pPoolType: number) {
        let t = this;
        t._poolType = pPoolType;
        t.typeLoader.url = CommonManager.getUrl("luckyEgg", "levelImg_" + pPoolType);
        t.registerEvent(true);
    }

    public dispose() {
        let t = this;
        t.registerEvent(false);
        super.dispose();
    }

    //===================================== private method =====================================
    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btn, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }
    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btn:
                //打开查看奖池奖励
                GGlobal.layerMgr.open(UIConst.ACTCOM_LUCKY_EGG_PREVIEW, { poolType: t._poolType });
                break;
        }
    }
}