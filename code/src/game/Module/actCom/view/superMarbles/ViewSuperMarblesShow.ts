class ViewSuperMarblesShow extends UIModalPanel {

	public list: fairygui.GList;
	public surebt: Button0;
	public continuebt: Button1;
	public lab: fairygui.GRichTextField;
	public img: fairygui.GLoader;
	public vresG10: fairygui.GGroup;
	public discount: fairygui.GTextField;

	public constructor() {
		super();
		this.loadRes("bossTiShi", "bossTiShi_atlas0");
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("bossTiShi");
		self.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.surebt.addClickListener(self.OnSure, self);
		self.continuebt.addClickListener(self.oneceMore, self);
		self.isShowOpenAnimation = false;
		self.closeButton = self.view.getChild("closeButton");
		super.childrenCreated();
	}

	private updateMoney() {
		let self = this;
		let money = Model_player.voMine.yuanbao;
		if (self.type == 1) {
			self.continuebt.text = "再来一次";
			self.lab.text = self.one + "";
			self.img.url = "ui://jvxpx9embwmw3y";
			self.lab.color = money >= self.one ? Color.GREENINT : Color.REDINT;
		} else if (self.type == 5) {
			self.continuebt.text = "再来五次";
			self.lab.text = self.one * 5 + "";
			self.img.url = "ui://jvxpx9embwmw3y";
			self.lab.color = money >= self.one ? Color.GREENINT : Color.REDINT;
		}
	}

	private one;
	private ten;
	private type = 1;
	private source
	private itemId
	public onOpen(arg) {
		this.rewardArr = arg.award;
		this.type = arg.type;
		this.callBackHandler = arg.callBack;
		this.one = arg.price1 ? arg.price1 : 1;
		this.ten = arg.price10;
		this.source = arg.source;
		this.itemId = arg.itemId;
		super.onOpen(arg);
	}
	protected onShown() {
		this.list.numItems = this.rewardArr.length;
		this.times = 11;
		Timer.instance.listen(this.timeHandler, this, 1000);
		this.vresG10.visible = false;
		this.updateMoney();
	}

	public static isGuide: boolean = false;
	protected onHide(): void {
		if (this.list) {
			this.list.numItems = 0;
		}
		Timer.instance.remove(this.timeHandler, this);
		GGlobal.layerMgr.close(UIConst.ACTCOMCJDZ_AWARDS);
		IconUtil.setImg(this.img, null)
	}

	private OnSure() {
		this.doHideAnimation();
	}

	public callBackHandler: Handler;
	private oneceMore() {
		let self = this;
		self.doHideAnimation();
		if (self.source > 0) {
			if (GGlobal.layerMgr.isOpenView(self.source) == false) {
				ViewCommonWarn.text("请先进入" + Config.xitong_001[self.source].name);
				return;
			}
		}
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

	/**
	 * source  系统id UIConst
	 * type 1  再来一次； 9999固定使用道具 其他 再来十次 
	 * callBack  继续抽回调  
	 * awards  奖励列表
	 * one 一次金额
	 * ten 十次金额
	 * itemId  抽卡消耗的道具id 
	 */
	public static show(source: number, type: number, callBack: Handler, awards: IGridImpl[], one: number, ten: number, itemId: number) {
		GGlobal.layerMgr.open(UIConst.ACTCOMCJDZ_AWARDS, { "source": source, "type": type, "callBack": callBack, "award": awards, "price1": one, "price10": ten, "itemId": itemId });
	}
}