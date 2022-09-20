/**
 * @author: lujiahao 
 * @date: 2019-11-23 16:02:40 
 */
class View_Reward_Show5 extends UIModalPanel {

    //>>>>start
	public list: fairygui.GList;
	public surebt: Button0;
	public continuebt: Button1;
	public closeButton: Button2;
	public tfDes: fairygui.GRichTextField;
	public lab: fairygui.GRichTextField;
	public img: fairygui.GLoader;
	public groupMoney: fairygui.GGroup;
	public tfDes2: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://3me6ra11qid37";

    public constructor() {
        super();
        this.loadRes("bossTiShi", "bossTiShi_atlas0");
    }

    protected childrenCreated(): void {
        let self = this;
        GGlobal.createPack("bossTiShi");
        self.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show5").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.isShowOpenAnimation = false;
        super.childrenCreated();
    }

    private updateMoney() {
        let t = this;
        t.continuebt.text = t.btnStr;
        if (t.getTipsFunc) {
            t.tfDes.text = t.getTipsFunc.apply(t.getTipsCaller, []);
        }
        else {
            t.tfDes.text = "";
        }

        if (t.consumeNeed <= 0) {
            //免费
            t.groupMoney.visible = false;
            t.tfDes2.visible = true;
            t.tfDes2.text = "免费";

            if (t.source == UIConst.ACTCOM_GGL) {
                let t_model = GGlobal.modelGGL;
                t.tfDes2.text = `今日免费次数：<font color='#00ff00'>${t_model.freeCount}/${t_model.maxFree}</font>`;
            }
        }
        else {
            t.groupMoney.visible = true;
            t.tfDes2.visible = false;

            let t_color = Color.GREENSTR;
            if (!FastAPI.checkItemEnough(t.consumeId, t.consumeNeed))
                t_color = Color.REDSTR;
            t.lab.text = HtmlUtil.font(t.consumeNeed + "", t_color);

            let t_cfg = Config.daoju_204[t.consumeId];
            if (t_cfg) {
                IconUtil.setImg(t.img, Enum_Path.ICON70_URL + t_cfg.icon + ".png");
            }
            else {
                IconUtil.setImg(t.img, null);
            }
        }
    }

    private source;
    private btnStr;
    private getTipsFunc;
    private getTipsCaller;
    private sureCallback;
    private consumeId;
    private consumeNeed;
    public onOpen(arg) {
        let t = this;
        t.rewardArr = arg.award;
        t.btnStr = arg.btnStr;
        t.getTipsFunc = arg.getTipsFunc;
        t.getTipsCaller = arg.getTipsCaller;
        t.callBackHandler = arg.callBack;
        t.consumeId = arg.consumeId;
        t.consumeNeed = arg.consumeNeed;
        t.sureCallback = arg.sureCallback;
        t.source = arg.source;
        super.onOpen(arg);
    }
    protected onShown() {
        let t = this;
        t.registerEvent(true);
        t.list.numItems = t.rewardArr.length;
        t.times = 11;
        Timer.instance.listen(t.timeHandler, t, 1000);
        t.updateMoney();
    }

    public static isGuide: boolean = false;
    protected onHide(): void {
        let t = this;
        t.registerEvent(false);
        if (t.list) {
            t.list.numItems = 0;
        }
        // View_Reward_Show2.isGuide = true;
        Timer.instance.remove(t.timeHandler, t);
        GGlobal.layerMgr.close(UIConst.REWARD_SHOW5);
        if (t.sureCallback) {
            t.sureCallback.run();
            t.sureCallback = null;
        }
        IconUtil.setImg(t.img, null);
    }

    private OnSure() {
        let t = this;
        if (t.sureCallback) {
            t.sureCallback.run();
            t.sureCallback = null;
        }
        this.doHideAnimation();
    }

    public callBackHandler: Handler;
    private oneceMore() {
        let self = this;
        self.doHideAnimation();
        if (self.callBackHandler) {
            self.callBackHandler.run();
            self.callBackHandler = null;
        }
    }

    private renderHandler(index: number, obj: fairygui.GObject) {
        let grid = obj as ViewGridRender;
        let data = this.rewardArr[index];
        grid.vo = data;
    }

    private rewardArr = [];
    private times = 10;

    private timeHandler() {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.OnSure();
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.surebt, egret.TouchEvent.TOUCH_TAP, t.OnSure, t);
        EventUtil.register(pFlag, t.continuebt, egret.TouchEvent.TOUCH_TAP, t.oneceMore, t);
        EventUtil.register(pFlag, t.img, egret.TouchEvent.TOUCH_TAP, t.onIconClick, t);
    }

    private onIconClick(e: egret.TouchEvent) {
        let t = this;
        FastAPI.showItemTips(t.consumeId);
    }

    public guide_sureBt(step) {
        let self = this;
        GuideStepManager.instance.showGuide(self.surebt, self.surebt.width / 2, self.surebt.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.surebt, self.surebt.width / 2, self.surebt.height, 90, -106, 35);
    }

	/**
	 * 
	 * @param source 系统id
	 * @param pBtnStr 继续按钮文本
	 * @param callBack 继续回调
	 * @param awards 奖励列表
     * @param pConsumeId 消耗物品id
     * @param pConsumeNeed 消耗物品所需数量
	 * @param pGetTipsFunc 获取继续描述文本的函数
	 * @param pGetTipsCaller 调用获取描述文本函数的调用者
	 */
    public static show(source: number,
        pBtnStr: string,
        callBack: Handler,
        awards: IGridImpl[],
        pConsumeId: number,
        pConsumeNeed: number,
        pGetTipsFunc: () => string = null,
        pGetTipsCaller: any = null,
        pSureCallback: Handler = null) {

        GGlobal.layerMgr.open(UIConst.REWARD_SHOW5,
            {
                "source": source,
                "btnStr": pBtnStr,
                "callBack": callBack,
                "award": awards,
                "consumeId": pConsumeId,
                "consumeNeed": pConsumeNeed,
                "getTipsFunc": pGetTipsFunc,
                "getTipsCaller": pGetTipsCaller,
                "sureCallback": pSureCallback
            });
    }
}