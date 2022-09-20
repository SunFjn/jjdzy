/**
 * @author: lujiahao 
 * @date: 2019-10-24 18:22:12 
 */
class QiceRewardItem extends fairygui.GComponent {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public item: ViewGrid;
	public tfScore: fairygui.GRichTextField;
	public noticeImg: fairygui.GImage;
	public imageGet: fairygui.GImage;
	public tfRewardCount: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://cokk050npi6u18";

    public static createInstance(): QiceRewardItem {
        return <QiceRewardItem><any>(fairygui.UIPackage.createObject("qice", "QiceRewardItem"));
    }

    private _curData: VoTargetQice;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoTargetQice) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            let t_color = Color.WHITESTR
            t.tfScore.text = HtmlUtil.font(pData.cfg.pt + "次", t_color);

            t.item.vo = pData.rewardList[0];
            t.item.isShowEff = true;

            t.stateCtrl.selectedIndex = pData.state;

            t.tfRewardCount.text = pData.remain + "";
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
        let t = this;
        GGlobal.layerMgr.open(UIConst.QICE_LOTTERY_TARGET, t._curData);
    }
}