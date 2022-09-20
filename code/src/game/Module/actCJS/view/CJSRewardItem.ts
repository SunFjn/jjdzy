/**
 * @author: lujiahao 
 * @date: 2019-11-21 20:21:03 
 */
class CJSRewardItem extends fairygui.GComponent {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public tfLayer: fairygui.GRichTextField;
	public itemList1: fairygui.GList;
	public btnGo: Button1;
	public btnGet: Button1;
	//>>>>end

    public static URL: string = "ui://ehocr0vupwnzd";

    public static createInstance(): CJSRewardItem {
        return <CJSRewardItem><any>(fairygui.UIPackage.createObject("actCJS", "CJSRewardItem"));
    }

    private _curData: VoLayerRewardCJS;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.itemList1.itemRenderer = t.onItemRender;
        t.itemList1.callbackThisObj = t;
        t.itemList1.setVirtual();
    }

    //=========================================== API ==========================================
    public setData(pData: VoLayerRewardCJS) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);

            t.stateCtrl.selectedIndex = pData.state;

            let t_strLayer = ConfigHelp.NumberToChinese(pData.cfg.cs);
            t.tfLayer.text = `点亮第${t_strLayer}层`;

            t.itemList1.numItems = pData.rewardList.length;
        }
        else {
            t.registerEvent(false);
            t.itemList1.numItems = 0;
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
    private onItemRender(pIndex: number, pItem: ViewGrid) {
        if (this._curData && this._curData.rewardList) {
            let t_list = this._curData.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelCJS;
        switch (e.currentTarget) {
            case t.btnGo:
                break;
            case t.btnGet:
                if (t._curData) {
                    t_model.CG_AchievementTree_getReward_10573(t._curData.id);
                }
                break;
        }
    }
}