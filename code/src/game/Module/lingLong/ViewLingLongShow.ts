class ViewLingLongShow extends UIModalPanel {

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

		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.surebt = <Button0><any>(this.view.getChild("surebt"));
		this.continuebt = <Button1><any>(this.view.getChild("continuebt"));
		this.lab = <fairygui.GRichTextField><any>(this.view.getChild("lab"));
		this.img = <fairygui.GLoader><any>(this.view.getChild("img"));

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
		this.rewardArr = arg;
		super.onOpen(arg);
	}

	protected onShown() {
		this.list.numItems = this.rewardArr.length;
		this.times = 11;
		Timer.instance.listen(this.timeHandler, this, 1000);

		if (!this._cost1) {
			this._cost1 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2602))[0][2])
		}
		if (!this._cost10) {
			this._cost10 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2603))[0][2])
		}

		if (this.rewardArr.length > 1) {
			this.continuebt.text = "再来十次"

			if (Model_LingLong.lingLong > 9) {
				this.lab.text = "" + Model_LingLong.lingLong + "/10"
				this.lab.color = Color.WHITEINT;

				let v = VoItem.create(Model_LingLong.lingLongId);
				ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.img);
			} else {
				this.lab.text = "" + this._cost10
				if (Model_player.voMine.yuanbao >= this._cost10) {
					this.lab.color = Color.GREENINT;
				} else {
					this.lab.color = Color.REDINT;
				}
				this.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);//元宝
			}
		} else {
			this.continuebt.text = "再来一次"

			if (Model_LingLong.lingLong > 0) {
				this.lab.text = "" + Model_LingLong.lingLong + "/1"
				this.lab.color = Color.WHITEINT;

				let v = VoItem.create(Model_LingLong.lingLongId);
				ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.img);
			} else {
				this.lab.text = "" + this._cost1
				if (Model_player.voMine.yuanbao >= this._cost1) {
					this.lab.color = Color.GREENINT;
				} else {
					this.lab.color = Color.REDINT;
				}
				this.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);//元宝
			}
		}
	}

	protected onHide(): void {
		ViewLingLongShow.isGuide = true;
		this.list.numItems = 0;
		Timer.instance.remove(this.timeHandler, this);
		GGlobal.layerMgr.close(UIConst.LING_LONG_SHOW);
	}

	public static isGuide: boolean = false;
	private OnSure() {
		this.doHideAnimation();
	}

	private OnContinue(): void {
		if (!GGlobal.layerMgr.isOpenView(UIConst.LING_LONG)) {
			GGlobal.layerMgr.open(UIConst.LING_LONG)
		}
		if (this.rewardArr.length > 1) {
			this.onBuy10()
		} else {
			this.onBuy1()
		}
		this.doHideAnimation();
	}

	private onBuy1(): void {
		if (Model_LingLong.lingLong > 0) {
			GGlobal.modelLingLong.CG_BUY(1, 0);
		} else {
			if (Model_player.voMine.yuanbao < this._cost1) {
				ModelChongZhi.guideToRecharge()
				return;
			}
			GGlobal.modelLingLong.CG_BUY(1, 1);
		}
	}

	private onBuy10(): void {
		if (Model_LingLong.lingLong > 9) {
			GGlobal.modelLingLong.CG_BUY(10, 0);
		} else {
			if (Model_player.voMine.yuanbao < this._cost10) {
				ModelChongZhi.guideToRecharge()
				return;
			}
			GGlobal.modelLingLong.CG_BUY(10, 1);
		}
	}
	public bigAward: any
	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as ViewGridRender;
		let v = this.rewardArr[index];
		grid.vo = v
		// ConfigHelp.addExtraCop(grid, "ui://1xperbsyq4gk6", -2, 2);
		// if (v.isBig) {
		// 	grid.extra.visible = true;
		// } else {
		// 	grid.extra.visible = false;
		// }
	}

	private rewardArr: IGridImpl[] = [];
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
}