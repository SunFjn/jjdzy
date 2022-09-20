class Item_XiuLianTF extends fairygui.GComponent implements IPanel {

	public bg0: fairygui.GLoader;
	public bg1: fairygui.GLoader;
	public vres1: ViewResource;
	public vres10: ViewResource;
	public checkBox: fairygui.GButton;
	public expBar: fairygui.GProgressBar;
	public labPoint: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	private gridArr: ViewGrid[] = [];
	private gridArr0: XSXS_JiFenGrid[] = [];
	private btnBuy1: Button0;
	private btnBuy10: Button1;
	public static URL: string = "ui://7y83phvnvxva11";

	public static createInstance(): Item_XiuLianTF {
		return <Item_XiuLianTF><any>(fairygui.UIPackage.createObject("YiShouLu", "Item_XiuLianTF"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		for (let i = 0; i < 8; i++) {
			self.gridArr.push(self["grid_" + i]);
			if (i < 4) {
				self.gridArr0.push(self["grid" + i]);
			}
		}
	}

	public initView(pParent: fairygui.GObject) {

	}

	public updateShow() {
		let self = this;
		let model = GGlobal.modelTalent;
		let expArr = [0, 170, 440, 710, 1000];
		let jifenArr = [0];
		self.promptLb.text = ConfigHelp.reTxt("修炼次数满后重置进度\n再修炼{0}必出高级道具", HtmlUtil.fontNoSize("" + (10 - model.xiulianNum % 10),
			Color.getColorStr(2)));
		for (let i = 0; i < self.gridArr.length; i++) {
			self.gridArr[i].isShowEff = true;
			self.gridArr[i].tipEnabled = true;
			self.gridArr[i].vo = model.showData[i];
			if (i < self.gridArr0.length) {
				self.gridArr0[i].setTfVo(Config.xltfmb_758[i + 1]);
				jifenArr.push(Config.xltfmb_758[i + 1].cs);
			}
		}

		let cfg = Config.xltf_758[1];
		let count = Model_Bag.getItemCount(model.itemID);
		if (count > 0) {
			let itemVo = VoItem.create(model.itemID);
			self.vres1.setImgUrl(itemVo.icon);
			self.vres1.setCount(count);
			self.btnBuy1.checkNotice = true;
		} else {
			let itemVo = ConfigHelp.makeItemListArr(JSON.parse(cfg.cj1))[0];
			let color = 0;
			self.vres1.setImgUrl(itemVo.icon);
			if (ConfigHelp.checkEnough(cfg.cj1, false)) {
				color = 1;
			} else {
				color = 6;
			}
			self.vres1.setCount(HtmlUtil.fontNoSize(itemVo.count + "", Color.getColorStr(color)));
			self.btnBuy1.checkNotice = false;
		}

		if (count >= 10) {
			let itemVo = VoItem.create(model.itemID);
			self.vres10.setImgUrl(itemVo.icon);
			self.vres10.setCount(count);
			self.btnBuy10.checkNotice = true;
		} else {
			let itemVo = ConfigHelp.makeItemListArr(JSON.parse(cfg.cj2))[0];
			let color1 = 0;
			self.vres10.setImgUrl(itemVo.icon);
			if (ConfigHelp.checkEnough(cfg.cj2, false)) {
				color1 = 1;
			} else {
				color1 = 6;
			}
			self.vres10.setCount(HtmlUtil.fontNoSize(itemVo.count + "", Color.getColorStr(color1)));
			self.btnBuy10.checkNotice = false;
		}

		let curExp = 0;
		if (model.xiulianNum >= jifenArr[jifenArr.length - 1]) {
			curExp = expArr[expArr.length - 1];
		} else {
			for (let i = 0; i < jifenArr.length; i++) {
				if (model.xiulianNum < jifenArr[i]) {
					curExp = expArr[i - 1] + (expArr[i] - expArr[i - 1]) / (jifenArr[i] - jifenArr[i - 1]) * (model.xiulianNum - jifenArr[i - 1]);
					break;
				}
			}
		}
		self.expBar.value = curExp;
		self.expBar.max = expArr[expArr.length - 1];
		self.expBar._titleObject.text = "";
		self.labPoint.text = "修炼次数\n" + model.xiulianNum + "/" + jifenArr[jifenArr.length - 1];
	}

	private onBtnBuy1() {
		let self = this;
		let model = GGlobal.modelTalent;
		let count = Model_Bag.getItemCount(model.itemID);
		if (count > 0 || ConfigHelp.checkEnough(Config.xltf_758[1].cj1, false)) {
			self.btnBuy1.touchable = self.btnBuy10.touchable = false;
			model.CG_Talent_xiuLian_9373(1);
		} else {
			ModelChongZhi.guideToRecharge();
		}
	}
	private onBtnBuy10() {
		let self = this;
		let model = GGlobal.modelTalent;
		let count = Model_Bag.getItemCount(model.itemID);
		if (count >= 10 || ConfigHelp.checkEnough(Config.xltf_758[1].cj2, false)) {
			self.btnBuy1.touchable = self.btnBuy10.touchable = false;
			model.CG_Talent_xiuLian_9373(10);
		} else {
			ModelChongZhi.guideToRecharge();
		}
	}

	private rewardID = 0;
	private onDraw(evt: egret.TouchEvent) {
		let self = this;
		let model = GGlobal.modelTalent;
		let grid = evt.target as XSXS_JiFenGrid;
		let cfg = grid.vo1;
		let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jl));
		self.rewardID = cfg.id;
		View_Reward_Show3.show(arr, model.targetData[cfg.id], model.targetData[cfg.id], Handler.create(self, self.drawCallFun));
	}

	private drawCallFun() {
		GGlobal.modelTalent.CG_Talent_getAward_9375(this.rewardID);
	}

	public updateReward() {
		let self = this;
		let model = GGlobal.modelTalent;
		let cfg: Ixltfmb_758 = self.gridArr0[self.rewardID - 1].vo1;
		let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jl));
		View_Reward_Show3.show(arr, model.targetData[cfg.id], model.targetData[cfg.id], Handler.create(self, self.drawCallFun));
	}

	private onCheck() {
		let self = this;
		GGlobal.modelTalent.skipTween = self.checkBox.selected;
		let key = "xiulian_TF"
		let val = GGlobal.modelTalent.skipTween ? "1" : "0";
		LocalStorageUtil.setItem(key, val);
	}

	private eff: Part;
	private showEff(dropArr) {
		let self = this;
		let cfg = Config.xltf_758[1];
		let model = GGlobal.modelTalent;
		if (model.skipTween) {
			View_Reward_Show2.show(UIConst.XIULIAN_TF, dropArr.length, Handler.create(self, self.drawCall, [dropArr]), dropArr,
				JSON.parse(cfg.cj1)[0][2], JSON.parse(cfg.cj2)[0][2], model.itemID);
			self.btnBuy1.touchable = self.btnBuy10.touchable = true;
		} else {
			EffectMgr.addEff("uieff/10052", self.bg1.displayObject as fairygui.UIContainer, self.bg1.width / 2, self.bg1.height / 2, 1000, 1000, false);
			let times = setTimeout(function () {
				View_Reward_Show2.show(UIConst.XIULIAN_TF, dropArr.length, Handler.create(self, self.drawCall, [dropArr]), dropArr,
					JSON.parse(cfg.cj1)[0][2], JSON.parse(cfg.cj2)[0][2], model.itemID);
				self.btnBuy1.touchable = self.btnBuy10.touchable = true;
			}, 1000);
		}
	}

	private drawCall(arr) {
		let self = this;
		if (arr.length > 1) {
			self.onBtnBuy10();
		} else {
			self.onBtnBuy1();
		}
	}

	public openPanel(pData?: any) {
		let self = this;
		let model = GGlobal.modelTalent;
		IconUtil.setImg(self.bg0, Enum_Path.YISHOULU_URL + "xiulianTF0.png");
		IconUtil.setImg(self.bg1, Enum_Path.YISHOULU_URL + "xiulianTF1.png");
		self.btnBuy1.touchable = self.btnBuy10.touchable = true;
		self.btnBuy1.addClickListener(self.onBtnBuy1, self);
		self.btnBuy10.addClickListener(self.onBtnBuy10, self);
		for (let i = 0; i < self.gridArr0.length; i++) {
			self.gridArr0[i].addClickListener(self.onDraw, self);
		}
		let val = LocalStorageUtil.getItem("xiulian_TF");
		model.skipTween = val == "1" ? true : false;
		self.checkBox.selected = model.skipTween;
		self.checkBox.addClickListener(self.onCheck, self);
		GGlobal.reddot.listen(UIConst.YISHOULU_TF, self.updateShow, self);
		GGlobal.control.listen(Enum_MsgType.XIULIAN_TF_REWARD, self.updateReward, self);
		GGlobal.control.listen(Enum_MsgType.XIULIAN_TF_SHOWEFF, self.showEff, self);
		if (model.showData.length <= 0) {
			model.CG_Talent_openUI_9371();
		} else {
			self.updateShow();
		}
	}

	public closePanel(pData?: any) {
		let self = this;
		IconUtil.setImg(self.bg0, null);
		IconUtil.setImg(self.bg1, null);
		GGlobal.reddot.remove(UIConst.YISHOULU_TF, self.updateShow, self);
		GGlobal.control.remove(Enum_MsgType.XIULIAN_TF_REWARD, self.updateReward, self);
		GGlobal.control.remove(Enum_MsgType.XIULIAN_TF_SHOWEFF, self.showEff, self);
		self.btnBuy1.removeClickListener(self.onBtnBuy1, self);
		self.btnBuy10.removeClickListener(self.onBtnBuy10, self);
		for (let i = 0; i < self.gridArr.length; i++) {
			self.gridArr[i].clean();
			if (i < self.gridArr0.length) {
				self.gridArr0[i].clean();
				self.gridArr0[i].removeClickListener(self.onDraw, self);
			}
		}
	}
}