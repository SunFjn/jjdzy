class ViewActLuckTurnPrize extends UIModalPanel {

	public list: fairygui.GList;
	public surebt: Button0;
	public continuebt: Button1;
	public lab: fairygui.GRichTextField;
	public img: fairygui.GLoader;

	public constructor() {
		super();
		this.loadRes("bossTiShi", "bossTiShi_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("bossTiShi");
		this.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
		this.contentPane = this.view;

		let s = this;
		CommonManager.parseChildren(s.view, s);

		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandler;
		this.surebt.addClickListener(this.OnSure, this);
		this.continuebt.addClickListener(this.OnContinue, this);
		this.isShowOpenAnimation = false;
		this.closeButton = this.view.getChild("closeButton");
		super.childrenCreated();
	}

	private _cost1
	private _cost10

	public onOpen(arg) {
		this.rewardArr = arg[0];
		this.type = arg[1];
		super.onOpen(arg);
	}

	protected onShown() {
		let m = GGlobal.model_LuckTurn
		this.list.numItems = this.rewardArr.length;
		this.times = 11;
		Timer.instance.listen(this.timeHandler, this, 1000);

		if (!this._cost1) {
			this._cost1 = m.ybMust
		}
		if (!this._cost10) {
			this._cost10 = m.ybTen
		}

		if (this.type == 10) {
			this.continuebt.text = "再来十次"
			this.continuebt.visible = true;
			this.surebt.x = 149
			this.lab.text = "" + this._cost10
			if (Model_player.voMine.yuanbao >= this._cost10) {
				this.lab.color = Color.GREENINT;
			} else {
				this.lab.color = Color.REDINT;
			}
			this.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);//元宝
		} else if (this.type == 1) {
			this.continuebt.text = "再来一次"
			this.continuebt.visible = true;
			this.surebt.x = 149
			this.lab.text = "" + this._cost1
			if (Model_player.voMine.yuanbao >= this._cost1) {
				this.lab.color = Color.GREENINT;
			} else {
				this.lab.color = Color.REDINT;
			}
			this.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);//元宝
		} else {
			this.continuebt.text = ""
			this.continuebt.visible = false;
			this.surebt.x = (this.width - this.surebt.width) / 2
			this.lab.text = ""
			this.img.url = "";//元宝
		}
	}

	protected onHide(): void {
		ViewLingLongShow.isGuide = true;
		this.list.numItems = 0;
		Timer.instance.remove(this.timeHandler, this);
	}

	public static isGuide: boolean = false;
	private OnSure() {
		this.doHideAnimation();
	}

	private OnContinue(): void {
		if (!GGlobal.layerMgr.isOpenView(UIConst.LUCK_TURN)) {
			GGlobal.layerMgr.open(UIConst.LUCK_TURN)
		}
		if (this.rewardArr.length > 1) {
			this.onBuy10()
		} else {
			this.onBuy1()
		}
		this.doHideAnimation();
	}

	private onBuy1(): void {
		if (Model_player.voMine.yuanbao < this._cost1) {
			ModelChongZhi.guideToRecharge()
			return;
		}
		if (Model_LuckTurn.isMoive) {
			ViewCommonWarn.text("请稍后")
			return;
		}
		if(!Model_LuckTurn.skipTween){
			Model_LuckTurn.isMoive = true;
		}
		GGlobal.model_LuckTurn.CG_TURN_10341(20);
	}

	private onBuy10(): void {
		GGlobal.model_LuckTurn.turnTenCt()
	}

	public bigAward: any
	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as ViewGridRender;
		let v = this.rewardArr[index];
		grid.vo = v
	}

	private rewardArr: IGridImpl[] = [];
	private type;
	private times = 10;

	private timeHandler() {
		this.times--;
		this.surebt.text = "确定(" + this.times + ")";
		if (this.times <= 0) {
			this.doHideAnimation();
		}
	}
}