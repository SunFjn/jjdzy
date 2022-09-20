class ViewBaZhenTuBuy extends UIModalPanel {

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
		this.list.defaultItem = VBaZTGridFenJ.URL;
		this.surebt.addClickListener(this.OnSure, this);
		this.continuebt.addClickListener(this.OnContinue, this);
		this.isShowOpenAnimation = false;
		this.closeButton = this.view.getChild("closeButton");
		super.childrenCreated();
	}
	private type;
	private rewardArr: VoBaZhenTu[] = [];
	private times = 11;

	public onOpen(arg) {
		this.rewardArr = arg.drop;
		this.type = arg.type;
		super.onOpen(arg);
	}

	public upOpen(arg) {
		this.rewardArr = arg.drop;
		this.type = arg.type;
		this.onShown();
	}

	protected onShown() {
		let s = this;
		s.list.numItems = s.rewardArr.length;
		s.showEff();
		s.times = 11;
		Timer.instance.listen(s.timeHandler, s, 1000);

		if (s.rewardArr.length > 1) {
			s.continuebt.text = "再来10次"
			if (s.type == 0) {
				if (Model_player.voMine.tongbi >= Model_BaZhenTu.tong10) {
					s.lab.color = Color.GREENINT;
				} else {
					s.lab.color = Color.REDINT;
				}
				s.lab.text = ConfigHelp.numToStr(Model_BaZhenTu.tong10)
				s.img.url = CommonManager.getMoneyUrl(Enum_Attr.TONGBI);
			} else {
				let JDCct = Model_Bag.getItemCount(Model_BaZhenTu.JDCid);
				if (JDCct > 9) {
					s.lab.color = Color.GREENINT;
					s.lab.text = JDCct + "/10"
					let itemCfg = Config.daoju_204[Model_BaZhenTu.JDCid];
					ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemCfg.icon + ".png", s.img);
				} else {
					if (Model_player.voMine.yuanbao >= Model_BaZhenTu.yuan10) {
						s.lab.color = Color.GREENINT;
					} else {
						s.lab.color = Color.REDINT;
					}
					s.lab.text = "" + Model_BaZhenTu.yuan10
					s.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);//元宝
				}
			}
		} else {
			s.continuebt.text = "再来1次"
			if (s.type == 0) {
				if (Model_player.voMine.tongbi >= Model_BaZhenTu.tong1) {
					s.lab.color = Color.GREENINT;
				} else {
					s.lab.color = Color.REDINT;
				}
				s.lab.text = ConfigHelp.numToStr(Model_BaZhenTu.tong1)
				s.img.url = CommonManager.getMoneyUrl(Enum_Attr.TONGBI);
			} else {
				let JDCct = Model_Bag.getItemCount(Model_BaZhenTu.JDCid);
				if (JDCct > 0) {
					s.lab.color = Color.GREENINT;
					s.lab.text = JDCct + "/1"
					let itemCfg = Config.daoju_204[Model_BaZhenTu.JDCid];
					ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemCfg.icon + ".png", s.img);
				} else {
					if (Model_player.voMine.yuanbao >= Model_BaZhenTu.yuan1) {
						s.lab.color = Color.GREENINT;
					} else {
						s.lab.color = Color.REDINT;
					}
					s.lab.text = "" + Model_BaZhenTu.yuan1
					s.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);//元宝
				}
			}
		}
	}

	protected onHide(): void {
		this.list.numItems = 0;
		Timer.instance.remove(this.timeHandler, this);
		GGlobal.layerMgr.close(UIConst.BAZHENTU_BUY);
	}

	private OnSure() {
		this.doHideAnimation();
	}

	private OnContinue(): void {
		if (this.rewardArr.length > 1) {
			this.onBuy10()
		} else {
			this.onBuy1()
		}
		// this.doHideAnimation();
	}

	private onBuy1(): void {
		if (this.type == 0) {
			Model_BaZhenTu.onTong(1)
		} else {
			Model_BaZhenTu.onYuan(1)
		}
	}

	private onBuy10(): void {
		if (this.type == 0) {
			Model_BaZhenTu.onTong(10)
		} else {
			Model_BaZhenTu.onYuan(10)
		}
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as VBaZTGridFenJ;
		let v = this.rewardArr[index];
		grid.grid.isShowEff = true;
		grid.vo = v
	}

	private timeHandler() {
		this.times--;
		this.surebt.text = "确定(" + this.times + ")";
		if (this.times <= 0) {
			this.doHideAnimation();
		}
	}
	// private _timeOut;
	// private upReFlash1(): void {
	// 	//动画
	// 	this.showEff();
	// 	var self = this;
	// 	this._timeOut = setTimeout(function () {
	// 		self.showEffEnd();
	// 	}, 600);
	// }

	// private showEffEnd(): void {}


	public showEff(): void {
		for (let i = 0; i < this.list.numItems; i++) {
			let gridRender: VBaZTGridFenJ = this.list.getChildAt(i) as VBaZTGridFenJ;
			if (gridRender.vo) {
				let grid = gridRender.grid;
				EffectMgr.addEff("uieff/10007", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
			}
		}
	}
}