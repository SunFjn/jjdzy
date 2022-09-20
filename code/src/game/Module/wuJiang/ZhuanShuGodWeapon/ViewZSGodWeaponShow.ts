class ViewZSGodWeaponShow extends UIModalPanel {

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
		self.continuebt.addClickListener(self.OnContinue, self);
		self.isShowOpenAnimation = false;
		self.closeButton = self.view.getChild("closeButton");
		super.childrenCreated();
	}

	private _cost1;
	private _cost10;
	protected onShown() {
		let self = this;
		let $arg = self._args.dropArr;
		let type = self._args.type;
		let arr1 = []
		let arr2 = []
		for (let i = 0; i < $arg.length; i++) {
			if ($arg[i].isBig > 0) {
				arr1.push($arg[i])
			} else {
				arr2.push($arg[i])
			}
		}
		self.rewardArr = arr1.concat(arr2);;
		self.list.numItems = self.rewardArr.length;
		self.times = 11;
		Timer.instance.listen(self.timeHandler, self, 1000);
		self.vresG10.visible = false;
		if (type == 0) {
			if (!self._cost1) {
				self._cost1 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6730))[0][2])
			}
			if (!self._cost10) {
				self._cost10 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6731))[0][2])
			}
			let count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
			if (self.rewardArr.length > 9) {
				self.continuebt.text = "再来十次"
				if (count > 9) {
					self.lab.text = count + "/10"
					self.lab.color = Color.WHITEINT;
					let v = VoItem.create(Model_ZSGodWeapon.duanzaoC);
					ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", self.img);
				} else {
					self.lab.text = "" + self._cost10
					if (Model_player.voMine.yuanbao >= self._cost10) {
						self.lab.color = Color.GREENINT;
					} else {
						self.lab.color = Color.REDINT;
					}
					self.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);//元宝
				}
			} else {
				self.continuebt.text = "再来一次"
				if (count > 0) {
					self.lab.text = count + "/1"
					self.lab.color = Color.WHITEINT;

					let v = VoItem.create(Model_ZSGodWeapon.duanzaoC);
					ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.img);
				} else {
					self.lab.text = "" + this._cost1
					if (Model_player.voMine.yuanbao >= this._cost1) {
						self.lab.color = Color.GREENINT;
					} else {
						self.lab.color = Color.REDINT;
					}
					self.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);//元宝
				}
			}
			if(GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK))
			{
				let itemNum:number = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
				let curCfg:Isbzk_281 = Model_ZSGodWeapon.getIsbzk_281(GGlobal.model_actCom.forgeNum);
				let nextCfg:Isbzk_281;
				let disCost:number = 0;
				if (self.rewardArr.length > 9) {
					if(itemNum <= 9)
					{
						self.vresG10.visible = true;
					}
					if(curCfg)
					{
						nextCfg = Config.sbzk_281[curCfg.id + 1];
					}
					if(nextCfg)
					{
						let arr = JSON.parse(curCfg.time);
						let count:number = arr[0][1] - GGlobal.model_actCom.forgeNum;
						if(count >= 10)
						{
							disCost = Math.ceil(self._cost10 * (curCfg.off / 100));
						}else{
							let one:number = self._cost10 / 10;
							let total:number = one * count * (curCfg.off / 100) + one * (10 - count) * (nextCfg.off / 100);
							disCost = Math.ceil(total);
						}
					}else{//满级
						disCost = Math.ceil(this._cost10 * (curCfg.off / 100));
					}
				}else{
					if(itemNum <= 0)
					{
						self.vresG10.visible = true;
					}
					disCost = Math.ceil(this._cost1 * (curCfg.off / 100));
				}
				this.discount.text = "(" + disCost + ")";
			}
		} else {
			self.continuebt.text = "再来一次"
			let count = Model_Bag.getItemCount(Model_ZSGodWeapon.shenjiangC);
			self.lab.text = count + "/1"
			self.lab.color = Color.WHITEINT;
			let v = VoItem.create(Model_ZSGodWeapon.shenjiangC);
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.img);
		}
	}

	protected onHide(): void {
		this.list.numItems = 0;
		Timer.instance.remove(this.timeHandler, this);
		GGlobal.layerMgr.close(UIConst.SHAOZHU_QIYUAN_SHOW);
		GGlobal.control.notify(UIConst.ZS_GODWEAPON_REWARD);
	}

	private OnSure() {
		this.doHideAnimation();
	}

	private OnContinue(): void {
		if (!GGlobal.layerMgr.isOpenView(UIConst.ZS_GODWEAPON)) {
			ViewCommonWarn.text("请先进入专属神兵");
		} else {
			if (this.rewardArr.length > 9) {
				this.onBuy10()
			} else {
				this.onBuy1()
			}
		}
		this.doHideAnimation();
	}

	private onBuy1(): void {
		if (this._args.type != 0) {
			let count = Model_Bag.getItemCount(Model_ZSGodWeapon.shenjiangC);
			if (count > 0) {
				GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 1);
			} else {
				View_CaiLiao_GetPanel.show(VoItem.create(Model_ZSGodWeapon.shenjiangC));
			}
		} else {
			let count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
			if (count > 0) {
				GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 0);
			} else {
				if (Model_player.voMine.yuanbao < this._cost1) {
					ModelChongZhi.guideToRecharge()
					return;
				}
				GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 0);
			}
		}
	}

	private onBuy10(): void {
		let count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
		if (count > 9) {
			GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(1, 0);
		} else {
			if (Model_player.voMine.yuanbao < this._cost10) {
				ModelChongZhi.guideToRecharge()
				return;
			}
			GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(1, 0);
		}

	}
	public bigAward: any
	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as ViewGridRender;
		let v = this.rewardArr[index];
		grid.vo = v.item
		grid.isShowExtra(v.isBig >= 1 ? 5 : v.isBig);
	}

	private rewardArr: { item: IGridImpl, isBig: number }[] = [];
	private times = 10;
	private timeHandler() {
		let self = this;
		self.times--;
		self.surebt.text = "确定(" + self.times + ")";
		if (self.times <= 0) {
			self.doHideAnimation();
		}
	}
}