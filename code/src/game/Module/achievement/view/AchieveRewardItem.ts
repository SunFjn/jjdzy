/**
 * @author: lujiahao 
 * @date: 2019-11-08 18:13:30 
 */
class AchieveRewardItem extends fairygui.GComponent {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public tfName: fairygui.GRichTextField;
	public itemList1: fairygui.GList;
	public btnGet: Button1;
	public imageGet: fairygui.GImage;
	public tfLimit: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://dllc71i9g7h32d";

    public static createInstance(): AchieveRewardItem {
        return <AchieveRewardItem><any>(fairygui.UIPackage.createObject("rebirth", "AchieveRewardItem"));
    }

    private _curData: VoMasterAchievement;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.itemList1.itemRenderer = this.onItemRender;
        t.itemList1.callbackThisObj = this;
        t.itemList1.setVirtual();
    }


    //=========================================== API ==========================================
    public setData(pData: VoMasterAchievement) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);

            let t_model = GGlobal.modelAchievement;

            t.stateCtrl.selectedIndex = pData.state;
            if (pData.state == EnumAchievement.STATE_CAN_GET) {
                t.btnGet.noticeImg.visible = true;
            }
            else {
                t.btnGet.noticeImg.visible = false;
            }

            if (t_model.level >= pData.id) {
                var t_color = Color.GREENSTR;
            }
            else {
                t_color = Color.REDSTR;
            }
            let t_strCount = HtmlUtil.font(` (${t_model.level}/${pData.id})`, t_color);
            t.tfName.text = `成就大师${pData.id}阶可领取` + t_strCount;

            t.tfLimit.text = `${pData.id}阶可领取`;

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
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        if (!t._curData)
            return;
        switch (e.currentTarget) {
            case t.btnGet:
                GGlobal.modelAchievement.CG_Achievement_getGoalReward_10327(t._curData.id);
                break;
        }
    }
}