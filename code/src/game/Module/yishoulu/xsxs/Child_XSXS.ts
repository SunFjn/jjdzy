class Child_XSXS extends fairygui.GComponent implements IPanel {

	public resourceLb: ViewResource;
	public keyBt: Button1;
	public costLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public costGrid: ViewGrid2;
	public backImg: fairygui.GLoader;
	public expBar: fairygui.GProgressBar;
	public randomGroup: fairygui.GGroup;
	public resetBt: Button0;
	public gridArr: XunShouGrid[] = [];
	public gridArr1: XSXS_JiFenGrid[] = [];
	public static URL: string = "ui://7y83phvndsdyo";

	public static createInstance(): Child_XSXS {
		return <Child_XSXS><any>(fairygui.UIPackage.createObject("YiShouLu", "Child_XSXS"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		for (let i = 0; i < 10; i++) {
			let grid: XunShouGrid = self["grid" + i];
			grid.data = i + 1;
			grid.text = Config.xsxs_283[i + 1].name;
			self.gridArr.push(grid);
			if (i < 3) {
				self.gridArr1.push(self["grid0" + i]);
			}
		}
		let costArr = JSON.parse(Config.xsxsreward_283[1].conmuse);
		self.promptLb.setVar("money", costArr[0][2] + "元宝").flushVars();
	}

	private surNum = 0;
	public updateShow() {
		let self = this;
		let model = GGlobal.modelxsxs;
		self.surNum = 0;
		let expArr = [0, 300, 700, 1000];
		let jifenArr = [0];
		for (let i = 0; i < self.gridArr.length; i++) {
			if (model.xunShouData[i + 1]) {
				self.gridArr[i].setVo(model.xunShouData[i + 1]);
				self.gridArr[i].removeClickListener(self.onGrid, self);
			} else {
				self.surNum++;
				self.gridArr[i].setVo(null);
				self.gridArr[i].addClickListener(self.onGrid, self);
			}
			if (i < self.gridArr1.length) {
				let cfg = Config.xsxspoint_283[i + 1];
				jifenArr.push(cfg.point);
				self.gridArr1[i].setVo(cfg);
				self.gridArr1[i].addClickListener(self.onDraw, self);
			}
		}
		let count = Model_Bag.getItemCount(model.itemID);
		let itemVo = VoItem.create(model.itemID);
		self.resourceLb.setImgUrl(itemVo.icon);
		self.resourceLb.setCount(count);
		self.resourceLb.setType(1);
		if (self.surNum <= 0) {
			self.resetBt.visible = true;
			self.costLb.visible = self.costGrid.visible = self.keyBt.visible = false;
		} else {
			self.resetBt.visible = false;
			self.costLb.visible = self.costGrid.visible = self.keyBt.visible = true;
			if (count >= self.surNum) {
				self.costLb.text = count + "";
				self.costGrid.vo = itemVo;
				self.keyBt.checkNotice = true;
				self.costLb.color = Color.getColorInt(1);
			} else {
				self.keyBt.checkNotice = false;
				let costArr = ConfigHelp.makeItemListArr(JSON.parse(Config.xsxsreward_283[1].conmuse))
				self.costGrid.vo = costArr[0];
				self.costLb.text = (costArr[0].count * self.surNum) + "";
				if (Model_player.voMine.yuanbao >= costArr[0].count * self.surNum) {
					self.costLb.color = Color.getColorInt(1);
				} else {
					self.costLb.color = Color.getColorInt(6);
				}
			}
		}

		let curExp = 0;
		if (model.jifen >= jifenArr[jifenArr.length - 1]) {
			curExp = expArr[expArr.length - 1];
		} else {
			for (let i = 0; i < jifenArr.length; i++) {
				if (model.jifen < jifenArr[i]) {
					curExp = expArr[i - 1] + (expArr[i] - expArr[i - 1]) / (jifenArr[i] - jifenArr[i - 1]) * (model.jifen - jifenArr[i - 1]);
					break;
				}
			}
		}
		self.expBar.value = curExp;
		self.expBar.max = expArr[expArr.length - 1];
		self.expBar._titleObject.text = model.jifen + "/" + jifenArr[jifenArr.length - 1];
	}

	private drawCallFun() {
		GGlobal.modelxsxs.CG_SearchAnimals_getAward_8765(this.rewardID);
	}

	private rewardID = 0;
	private onDraw(evt: egret.TouchEvent) {
		let self = this;
		let model = GGlobal.modelxsxs;
		let grid = evt.target as XSXS_JiFenGrid;
		let cfg = grid.vo;
		let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.rewardID = cfg.id;
		View_Reward_Show3.show(arr, model.rewardData[cfg.id], model.rewardData[cfg.id], Handler.create(self, self.drawCallFun));
	}

	private onGrid(evt: egret.TouchEvent) {
		let model = GGlobal.modelxsxs;
		let grid: XunShouGrid = evt.target as XunShouGrid;
		let count = Model_Bag.getItemCount(model.itemID);
		if (count > 0 || ConfigHelp.checkEnough(Config.xsxsreward_283[1].conmuse, false)) {
			model.CG_SearchAnimals_search_8763(grid.data);
		} else {
			ModelChongZhi.guideToRecharge();
		}
	}

	public showEff(idArr: any[]) {
		let self = this;
		let arr = [];
		for (let i = 0; i < idArr.length; i++) {
			arr.push(self.gridArr[idArr[i] - 1].grid);
		}
		AnimationUtil.gridToBag(arr, null, 1000);
	}

	public updateReward() {
		let self = this;
		let model = GGlobal.modelxsxs;
		let cfg: Ixsxspoint_283 = self.gridArr1[self.rewardID - 1].vo;
		let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		View_Reward_Show3.show(arr, model.rewardData[cfg.id], model.rewardData[cfg.id], Handler.create(self, self.drawCallFun));
	}

	private keyHandler() {
		let self = this;
		let model = GGlobal.modelxsxs;
		let count = Model_Bag.getItemCount(model.itemID);
		if (count >= self.surNum) {
			model.CG_SearchAnimals_search_8763(0);
		} else {
			let costArr = ConfigHelp.makeItemListArr(JSON.parse(Config.xsxsreward_283[1].conmuse))
			if (Model_player.voMine.yuanbao >= costArr[0].count * self.surNum) {
				model.CG_SearchAnimals_search_8763(0);
			} else {
				ModelChongZhi.guideToRecharge();
			}
		}
	}

	private onReset() {
		GGlobal.modelxsxs.CG_XIANSHAN_XUNSHOU_RESET();
	}

	private _st = 0;
	private _lastTime = 0;
	private randomEff() {
		let self = this;
		let st = 0;
		let now = egret.getTimer();
		if (self.surNum > 0) {
			if (this._st == 0) {
				if (now - 2000 > self._lastTime) {
					st = 1;
					self._lastTime = now;
				} else {
					st = 0;
				}
			} else {
				if (now - 3000 > self._lastTime) {
					st = 0;
					self._lastTime = now;
				} else {
					st = 1;
				}
			}
		} else {
			st = 0;
		}
		self.setTip(st);
	}

	private setTip(val) {
		let self = this;
		if (self._st == val) return;
		self._st = val;
		if (val == 0) {
			self.randomGroup.visible = false;
		} else if (val == 1) {
			self.findNewPos();
		}
	}

	private findNewPos() {
		let self = this;
		let model = GGlobal.modelxsxs;
		let countArr: XunShouGrid[] = [];
		for (let i = 0; i < self.gridArr.length; i++) {
			if (!model.xunShouData[i + 1]) {
				countArr.push(self.gridArr[i]);
			}
		}
		if (countArr.length <= 0) {
			self.randomGroup.visible = false;
		} else {
			self.randomGroup.visible = true;
			let count = Math.floor(Math.random() * countArr.length);
			self.randomGroup.visible = true;
			self.randomGroup.setXY(countArr[count].x + 47, countArr[count].y - 45);
		}
	}

	openPanel(pData?: any) {
		let self = this;
		if (Model_SearchAnimals.hasData) {
			self.updateShow();
		} else {
			GGlobal.modelxsxs.CG_SearchAnimals_openUI_8761();
		}
		self.randomGroup.visible = false;
		self.keyBt.addClickListener(self.keyHandler, self);
		self.resetBt.addClickListener(self.onReset, self);
		IconUtil.setImg(self.backImg, Enum_Path.YISHOULU_URL + "back_7121.jpg");
		Timer.instance.listen(self.randomEff, self, 1000);
		let c = GGlobal.control;
		GGlobal.reddot.listen(UIConst.XIANSHAN_XUNSHOU, self.updateShow, self);
		c.listen(Enum_MsgType.XIANSHAN_XUNSHOU_SHOWEFF, self.showEff, self);
		c.listen(Enum_MsgType.XIANSHAN_XUNSHOU_REWARD, self.updateReward, self);
	}

	closePanel(pData?: any) {
		let self = this;
		IconUtil.setImg(self.backImg, null);
		for (let i = 0; i < self.gridArr.length; i++) {
			self.gridArr[i].clean();
			self.gridArr[i].removeClickListener(self.onGrid, self);
			if (i < self.gridArr1.length) {
				self.gridArr1[i].clean();
				self.gridArr1[i].removeClickListener(self.onDraw, self);
			}
		}
		Timer.instance.remove(self.randomEff, self)
		self.resetBt.removeClickListener(self.onReset, self);
		self.keyBt.removeClickListener(self.keyHandler, self);
		let c = GGlobal.control;
		GGlobal.reddot.remove(UIConst.XIANSHAN_XUNSHOU, self.updateShow, self);
		c.remove(Enum_MsgType.XIANSHAN_XUNSHOU_SHOWEFF, self.showEff, self);
		c.remove(Enum_MsgType.XIANSHAN_XUNSHOU_REWARD, self.updateReward, self);
	}
}