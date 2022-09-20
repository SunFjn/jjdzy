class Child_ActCom_SGBZ extends fairygui.GComponent implements IPanel {

	public c1: fairygui.Controller;
	public sureBt: Button1;
	public chooseGroup: fairygui.GGroup;
	public moneyIcon: fairygui.GLoader;
	public moneyLb: fairygui.GRichTextField;
	public previewLb: fairygui.GRichTextField;
	public boxGroup: fairygui.GGroup;
	public timeLb: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;
	public linkLb: fairygui.GRichTextField;
	public linkLb0: fairygui.GRichTextField;
	public expbar: fairygui.GProgressBar;
	public list: fairygui.GList;
	public timeBt: fairygui.GButton;

	public boxGridArr: ActCom_SGBZGrid1[] = [];
	public gridArr: ViewGrid[] = [];
	public gridLbArr: fairygui.GRichTextField[] = [];
	public drawImgArr: fairygui.GImage[] = [];
	public static URL: string = "ui://y9683xrpzm7h9";
	public static pkg = "ActComSGBZ";
	public static createInstance(): Child_ActCom_SGBZ {
		return <Child_ActCom_SGBZ><any>(fairygui.UIPackage.createObject("ActComSGBZ", "Child_ActCom_SGBZ"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		for (let i = 0; i < 9; i++) {
			self.boxGridArr.push(self["boxGrid" + i]);
			if (i < 3) {
				self.gridArr.push(self["grid" + i]);
				self.gridLbArr.push(self["gridLb" + i]);
				self.drawImgArr.push(self["drawImg" + i]);
			}
		}
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ActCom_SGBZItem.URL, ActCom_SGBZItem);
		f(ActCom_SGBZGrid.URL, ActCom_SGBZGrid);
		f(ActCom_SGBZGrid1.URL, ActCom_SGBZGrid1);
		f(SGBZRewardGrid.URL, SGBZRewardGrid);
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	private renderHandler(index: number, item: ActCom_SGBZItem) {
		let model = GGlobal.modelsgbz;
		let index1 = model.qishu * 100 + model.lunshu * 10;
		item.setVo(Config.bzjc_753[index1 + (4 - index)]);
	}

	private timeChangeHandler() {
		let self = this;
		self.changeTime--;
		if (self.changeTime <= 0) {
			Timer.instance.remove(self.timeChangeHandler, self);
			self.update();
		} else {
			self.timeBt.text = "继续寻宝(" + self.changeTime + ")";
		}
	}

	private changeTime = 31;
	private update() {
		let self = this;
		let model = GGlobal.modelsgbz;
		if (self.c1.selectedIndex == 1 && model.state == 0 && self.changeTime > 0) {
			self.timeBt.visible = true;
			self.timeBt.text = "继续寻宝(30)";
			Timer.instance.listen(self.timeChangeHandler, self, 1000);
			return;
		}
		self.c1.selectedIndex = model.state;
		if (model.state == 0) {
			self.list.numItems = 3;
		} else {
			self.list.numItems = 0;
			self.changeTime = 31;
			self.timeBt.visible = false;
			for (let i = 0; i < self.boxGridArr.length; i++) {
				if (model.rewardData[i + 1]) {
					self.boxGridArr[i].setVo(i + 1, model.rewardData[i + 1]);
				} else {
					self.boxGridArr[i].setVo(i + 1);
				}

				if (i < self.gridArr.length) {
					let cfg;
					if (i < model.drawStateArr.length) {
						cfg = Config.ewjl_753[model.drawStateArr[i][0]];
					} else {
						cfg = Config.ewjl_753[model.qishu * 10000 + (model.lunshu - 1) * 3 + i + 1];
					}
					let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jl));
					self.gridArr[i].tipEnabled = false;
					self.gridArr[i].isShowEff = true;
					self.gridArr[i].vo = arr[0];
					self.gridArr[i].checkNotice = i < model.drawStateArr.length && model.drawStateArr[i][1] == 1;
					self.gridLbArr[i].text = "开启" + cfg.kqsl + "次";
					self.drawImgArr[i].visible = i < model.drawStateArr.length && model.drawStateArr[i][1] == 2;
				}
			}
			self.expbar.value = model.drawNum;
			self.expbar.max = self.boxGridArr.length;
			let moneyArr;
			if (Config.cjxh_753[model.drawNum + 1]) {
				moneyArr = JSON.parse(Config.cjxh_753[model.drawNum + 1].xh);
			} else {
				moneyArr = JSON.parse(Config.cjxh_753[model.drawNum].xh);
			}
			self.moneyLb.text = "当前开启宝箱消耗：       " + moneyArr[0][2];
		}
		self.numLb.text = "当前寻宝轮数：" + HtmlUtil.fontNoSize(model.lunshu + "/" + model.maxLun, Color.getColorStr(2));
	}

	private onLink(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_SGBZ);
	}

	private onSure() {
		let self = this;
		let index = 0;
		let arr = [];
		let model = GGlobal.modelsgbz;
		for (let key in model.selectData) {
			let cfg = Config.bzjc_753[key];
			if (model.selectData[key].length >= 5 - cfg.dc) {
				index++;
				arr[4 - cfg.dc] = [parseInt(key), model.selectData[key]];
			} else {
				return ViewCommonWarn.text("尚有宝藏未选择必出奖励");
			}
		}
		if (index >= self.list.numItems) {
			GGlobal.layerMgr.open(UIConst.ACTCOM_SGBZ_LIST, arr);
		} else {
			ViewCommonWarn.text("尚有宝藏未选择必出奖励");
		}
	}

	private onTime() {
		let self = this;
		if (self.vo.getSurTime() > 0) {
			self.timeLb.text = "活动剩余时间：" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(self.vo.getSurTime()), Color.getColorStr(2));
			Timer.instance.listen(self.onTime, self);
		} else {
			self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
			Timer.instance.remove(self.onTime, self);
		}
	}

	private onDraw(arr) {
		if (arr[1] == 1) {
			GGlobal.layerMgr.close2(UIConst.REWARD_SHOW);
			GGlobal.modelsgbz.CG_CountryTreasure_getExrReward_8655(arr[0]);
		} else {
			ViewCommonWarn.text("未达到领取条件")
		}
	}

	private onGrid(evt: egret.TouchEvent) {
		let self = this;
		let grid = evt.target as ViewGrid;
		View_Reward_Show.show([grid.vo], "", "", Handler.create(self, self.onDraw, [GGlobal.modelsgbz.drawStateArr[grid.data]]), GGlobal.modelsgbz.drawStateArr[grid.data][1]);
	}

	private openPreView(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.modelsgbz.CG_ACTCOM_SGBZ_SURREWARD();
	}

	private changeHandler() {
		let self = this;
		Timer.instance.remove(self.timeChangeHandler, self);
		self.changeTime = 0;
		self.update();
	}

	private vo: Vo_Activity
	openPanel(pData?: Vo_Activity) {
		let self = this;
		self.vo = pData;
		GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SGBZ);
		GGlobal.control.listen(UIConst.ACTCOM_SGBZ, self.update, self);
		if (pData.getSurTime() > 0) {
			self.timeLb.text = "活动剩余时间：" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(pData.getSurTime()), Color.getColorStr(2));
			Timer.instance.listen(self.onTime, self);
		} else {
			self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
		}
		for (let i = 0; i < self.gridArr.length; i++) {
			self.gridArr[i].data = i;
			self.gridArr[i].addClickListener(self.onGrid, self);
		}
		self.linkLb0.addClickListener(self.openGaiLV, self);
		self.linkLb.addClickListener(self.onLink, self);
		self.sureBt.addClickListener(self.onSure, self);
		self.previewLb.addClickListener(self.openPreView, self);
		self.timeBt.addClickListener(self.changeHandler, self);
	}

	private openGaiLV(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.GAILV, 9);
	}


	closePanel(pData?: any) {
		let self = this;
		GGlobal.control.remove(UIConst.ACTCOM_SGBZ, self.update, self);
		Timer.instance.remove(self.onTime, self);
		Timer.instance.remove(self.timeChangeHandler, self);
		self.linkLb0.removeClickListener(self.openGaiLV, self);
		self.linkLb.removeClickListener(self.onLink, self);
		self.sureBt.removeClickListener(self.onSure, self);
		self.timeBt.removeClickListener(self.changeHandler, self);
		for (let i = 0; i < self.gridArr.length; i++) {
			self.gridArr[i].removeClickListener(self.onGrid, self);
			self.gridArr[i].clean();
		}
		self.list.numItems = 0;
	}
}