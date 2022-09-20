/**
 * @author: lujiahao 
 * @date: 2019-09-12 11:13:52 
 */
class XiandingRewardItem extends fairygui.GComponent {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public item: ViewGrid;
	public tfScore: fairygui.GRichTextField;
	public noticeImg: fairygui.GImage;
	public imageGet: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://s98a5pruillc5";

    public static createInstance(): XiandingRewardItem {
        return <XiandingRewardItem><any>(fairygui.UIPackage.createObject("actComXianding", "XiandingRewardItem"));
    }

    private _curData: VoXiandingReward;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);

        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoXiandingReward) {
        this._curData = pData;
        if (pData) {
            this.registerEvent(true);

            let t_color = Color.WHITESTR;
            // let t_curValue = GGlobal.modelXianding.curScore;
            // if (t_curValue >= pData.cfg.hy)
            //     t_color = Color.YELLOWSTR;
            this.tfScore.text = HtmlUtil.font(pData.cfg.hy + "", t_color);

            this.item.vo = pData.rewardList[0];
            this.item.isShowEff = true;

            this.stateCtrl.selectedIndex = pData.state;
        }
        else {
            this.item.vo = null;
            this.registerEvent(false);
        }
    }

    public recycle() {
        this.setData(null);
    }

    //===================================== private method =====================================
    private registerEvent(pFlag: boolean) {
        EventUtil.register(pFlag, this, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    //======================================== handler =========================================
    private onClick(e: egret.TouchEvent) {
        GGlobal.layerMgr.open(UIConst.ACTCOM_XIANDING_REWARD, this._curData);
    }
}