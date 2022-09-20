/**
 * @author: lujiahao 
 * @date: 2019-09-12 11:15:15 
 */
class XiandingItem extends fairygui.GComponent {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public btnGo: Button0;
	public btnGet: Button1;
	public imageGet: fairygui.GImage;
	public tfContent: fairygui.GRichTextField;
	public tfScore: fairygui.GRichTextField;
	public imageIcon: fairygui.GLoader;
	public tfValue: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://s98a5pruoz6c4";

    private _curData: VoXiandingTask;

    public static createInstance(): XiandingItem {
        return <XiandingItem><any>(fairygui.UIPackage.createObject("actComXianding", "XiandingItem"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);

        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoXiandingTask) {
        this._curData = pData;
        if (pData) {
            let t_countStr = "";
            let t_color = Color.REDSTR;
            if (pData.curCount >= pData.cfg.cs) {
                t_color = Color.GREENSTR;
            }
            t_countStr = ConfigHelp.reTxt(HtmlUtil.font("({0}/{1})", t_color), pData.curCount, pData.cfg.cs);
            this.tfContent.text = pData.cfg.ms + " " + t_countStr;

            this.tfScore.text = ConfigHelp.reTxt("活跃度+{0}", pData.cfg.hy);

            let t_reward = pData.rewardList[0];
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + t_reward.icon + ".png", this.imageIcon);
            this.tfValue.text = t_reward.count + "";

            EventUtil.register(true, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);

            this.stateCtrl.selectedIndex = pData.state;
            if (pData.state == Enum_Xianding.TASK_STATE_CAN_GET)
                this.btnGet.noticeImg.visible = true;
            else
                this.btnGet.noticeImg.visible = false;

            this.registerEvent(true);
        }
        else {
            this.registerEvent(false);
        }
    }

    public dispose() {
        this.registerEvent(false);
        EventUtil.register(false, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
        super.dispose();
    }

    //===================================== private method =====================================
    private onIconClick(e: egret.TouchEvent) {
        if (this._curData) {
            FastAPI.showItemTips(this._curData.rewardList[0]);
        }
    }

    private registerEvent(pFlag: boolean) {
        EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        EventUtil.register(pFlag, this.btnGet, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    }

    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        if (!this._curData)
            return;
        switch (e.currentTarget) {
            case this.btnGo:
                //打开别的界面
                let t_openId = this._curData.cfg.open;
                if (this._curData.cfg.rwlx == 13) //任务类型为充值
                {
                    //需要判断充值过没有，没有充值过的话，都是打开首充界面
                    // if (this._curData.curCount <= 0) {
                    //     t_openId = UIConst.SHOUCHONG;
                    // }
                    ViewChongZhi.tryToOpenCZ();
                }
                else
                {
                    GGlobal.layerMgr.open(t_openId);
                }
                break;

            case this.btnGet:
                GGlobal.modelXianding.cmdSendGetTaskReward(this._curData.id);
                break;
        }
    }
}