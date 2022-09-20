/**
 * @author: lujiahao 
 * @date: 2019-11-23 16:02:40 
 */
class View_Reward_Show4 extends UIModalPanel {

	//>>>>start
	public list: fairygui.GList;
	public surebt: Button0;
	public continuebt: Button1;
	public lab: fairygui.GRichTextField;
	public closeButton: Button2;
	//>>>>end

	public static URL: string = "ui://3me6ra11ot2y6";

	public constructor() {
		super();
		this.loadRes("bossTiShi", "bossTiShi_atlas0");
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("bossTiShi");
		self.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show4").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.surebt.addClickListener(self.OnSure, self);
		self.continuebt.addClickListener(self.oneceMore, self);
		self.isShowOpenAnimation = false;
		super.childrenCreated();
	}

	private updateMoney() {
		let t = this;
		t.continuebt.text = t.btnStr;
		if (t.getTipsFunc) {
			t.lab.text = t.getTipsFunc.apply(t.getTipsCaller, []);
		}
		else {
			t.lab.text = "";
		}
	}

	private source;
	private btnStr;
	private getTipsFunc;
	private getTipsCaller;
	public onOpen(arg) {
		let t = this;
		t.rewardArr = arg.award;
		t.btnStr = arg.btnStr;
		t.getTipsFunc = arg.getTipsFunc;
		t.getTipsCaller = arg.getTipsCaller;
		t.callBackHandler = arg.callBack;
		t.source = arg.source;
		super.onOpen(arg);
	}
	protected onShown() {
		this.list.numItems = this.rewardArr.length;
		this.times = 11;
		Timer.instance.listen(this.timeHandler, this, 1000);
		this.updateMoney();
	}

	public static isGuide: boolean = false;
	protected onHide(): void {
		if (this.list) {
			this.list.numItems = 0;
		}
		View_Reward_Show2.isGuide = true;
		Timer.instance.remove(this.timeHandler, this);
		GGlobal.layerMgr.close(UIConst.REWARD_SHOW4);
	}

	private OnSure() {
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
			this.doHideAnimation();
		}
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
	 * @param pGetTipsFunc 获取继续描述文本的函数
	 * @param pGetTipsCaller 调用获取描述文本函数的调用者
	 */
	public static show(source: number, pBtnStr: string, callBack: Handler, awards: IGridImpl[], pGetTipsFunc: () => string = null, pGetTipsCaller: any = null) {
		GGlobal.layerMgr.open(UIConst.REWARD_SHOW4, { "source": source, "btnStr": pBtnStr, "callBack": callBack, "award": awards, "getTipsFunc": pGetTipsFunc, "getTipsCaller": pGetTipsCaller });
	}
}