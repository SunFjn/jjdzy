class Child_YJDQ extends fairygui.GComponent implements IPanel{

	//>>>>start
	public c1: fairygui.Controller;
	public backImg: fairygui.GLoader;
	public drawImg: fairygui.GImage;
	public tabBg: fairygui.GImage;
	public rankBt: Button2;
	public addBt: Button2;
	public grid: ViewGridRender;
	public passLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public curPassLb: fairygui.GRichTextField;
	public battleLb: fairygui.GRichTextField;
	public drawBt: Button0;
	public battleBt: Button1;
	public tab0: YJDQ_Tab;
	public tab1: YJDQ_Tab;
	public tab2: YJDQ_Tab;
	public tab3: YJDQ_Tab;
	public lab: fairygui.GRichTextField;
	public labMax: fairygui.GRichTextField;
	//>>>>end
	
	public tabArr: Array<YJDQ_Tab> = [];

	public static URL: string = "ui://pkuzcu87jie02";

	public static createInstance(): Child_YJDQ {
		return <Child_YJDQ><any>(fairygui.UIPackage.createObject("FuBen", "Child_YJDQ"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		let self = this;
		self._viewParent = pParent;
		self.addRelation(self._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.show();
	}
	
	closePanel(pData?: any) {
		this.disposePanel();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;

		CommonManager.parseChildren(self, self);

		for (let i = 0; i < 4; i++) {
			let tab: YJDQ_Tab = <YJDQ_Tab><any>(self.getChild("tab" + i));
			tab.data = i;
			self.tabArr.push(tab);
			tab.addClickListener(self.tabHandler, self);
		}

		self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
		self.battleBt.addClickListener(self.battleHandle, self);
		self.drawBt.addClickListener(self.drawHandle, self);
		self.addBt.addClickListener(self.addHandler, self);
		self.rankBt.addClickListener(self.rankHandler, self);
		self.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAdd, self);
		self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemove, self);
	}
	private onAdd() {
		IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "yjdq.jpg");
	}
	private onRemove() {
		IconUtil.setImg(this.backImg, null);
		GGlobal.control.remove(Enum_MsgType.YJDQ_INIT_UPDATE, this.show, this);
	}

	private rankHandler(): void {
		GGlobal.layerMgr.open(UIConst.FUBEN_YJDQ_RANK);
	}

	private addHandler(): void {
		let self = this;
		let maxNum: number = Config.xtcs_004[1021].num;
		let costMoney: number = Config.xtcs_004[1022].num;
		if (Model_YJDQ.buyNum >= maxNum) {
			ViewCommonWarn.text("购买次数不足");
			return;
		}

		const buyMax = 999;
		ViewAlertBuy.show(costMoney, maxNum - Model_YJDQ.buyNum, buyMax, "", Handler.create(null, self.okHandle));
	}

	public okHandle(ct): void {
		let costMoney: number = Config.xtcs_004[1022].num;
		if (Model_player.voMine.yuanbao <= costMoney) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		GGlobal.modelyjdq.CG_YJDQ_BUY_BATTLENUM(ct);
	}

	private drawHandle(): void {
		let self = this;
		if (self.drawBt.checkNotice) {
			GGlobal.modelyjdq.CG_YJDQ_DRAWREWARD(self.c1.selectedIndex + 1);
		} else {
			let max = Model_YJDQ.rewardMax
			let cfg = Config.yiqi_007[Math.floor(Model_YJDQ.dataArr[self.c1.selectedIndex][1] / max + 1) * max];
			if (!cfg) {
				ViewCommonWarn.text("奖励已领取");
			} else {
				ViewCommonWarn.text("未首通目标关卡")
			}
		}
	}

	private battleHandle(): void {
		let self = this;
		if (Model_YJDQ.battleNum >= 1) {
			GGlobal.modelyjdq.CG_YJDQ_BATTLEBYTYPE(self.c1.selectedIndex + 1);
		} else {
			self.addHandler();
		}
	}

	private tabHandler(event: egret.TouchEvent): void {
		let self = this;
		let index: number = event.target.data;
		if (self.c1.selectedIndex == index) return;
		if (index + 1 > Model_YJDQ.type) {
			self.tabArr[index].selected = false;
			let arr1 = ["普通", "困难", "噩梦", "传说"];
			ViewCommonWarn.text("通关" + arr1[index - 1] + "难度100关开启");
			return;
		}
		self.tabArr[self.c1.selectedIndex].selected = false;
		self.tabArr[index].selected = true;
		self.c1.selectedIndex = index;
	}

	private setMaxPass() {
		let self = this;
		let arr1 = ["", "普通", "困难", "噩梦", "传说"];
		let cfg = Config.yiqi_007[Model_YJDQ.passMax];
		if (!cfg) {
			self.labMax.text = "历史最高通关：" + arr1[Model_YJDQ.type] + "0波";
		} else {
			self.labMax.text = "历史最高通关：" + arr1[cfg.type] + cfg.bo + "波";
		}
	}

	public updateShow(): void {
		if (Model_YJDQ.dataArr.length <= 0) return;
		let self = this;
		let max = Model_YJDQ.rewardMax;
		for (let i = 0; i < self.tabArr.length; i++) {
			self.tabArr[i].checkNotice(Model_YJDQ.checkNoticeByType(i));
		}
		let cfg = Config.yiqi_007[Math.floor(Model_YJDQ.dataArr[self.c1.selectedIndex][1] / max + 1) * max];
		let cfg1 = Config.yiqi_007[Model_YJDQ.dataArr[self.c1.selectedIndex][0]];
		if (!cfg) {
			self.drawImg.visible = true;
			self.drawBt.visible = false;
			cfg = Config.yiqi_007[Model_YJDQ.dataArr[self.c1.selectedIndex][1]];
			self.drawBt.checkNotice = false;
		} else {
			self.drawImg.visible = false;
			self.drawBt.visible = true;
			self.drawBt.enabled = self.drawBt.checkNotice = cfg.index <= Model_YJDQ.passMax;
		}
		let arr: Array<any> = JSON.parse(cfg.award);
		let itemVo: VoItem = VoItem.create(arr[0][1]);
		itemVo.count = arr[0][2];
		self.grid.vo = itemVo;
		self.passLb.setVar("pass", "" + cfg.bo).flushVars();
		if (cfg.power <= 0) {
			self.powerLb.text = "战力飙升";
		} else {
			self.powerLb.text = "战力+" + cfg.power;
		}
		if (cfg1) {
			self.curPassLb.text = cfg1.bo + "";
		} else {
			self.curPassLb.text = "0";
		}

		if (Model_YJDQ.battleNum < 1) {
			self.battleLb.setVar("str", HtmlUtil.fontNoSize(Model_YJDQ.battleNum + "/1", Color.getColorStr(6))).flushVars();
		} else {
			self.battleLb.setVar("str", HtmlUtil.fontNoSize(Model_YJDQ.battleNum + "/1", Color.getColorStr(0))).flushVars();
		}
		if (Model_YJDQ.type <= 1) {//没有通关
			for (let i = 0; i < self.tabArr.length; i++) {
				self.tabArr[i].visible = false;
			}
			self.tabBg.visible = false;
		} else {
			self.tabBg.visible = true;
			for (let i = 0; i < self.tabArr.length; i++) {
				if (i < Model_YJDQ.type) {
					self.tabArr[i].visible = true;
				} else {
					self.tabArr[i].visible = false;
				}
			}
			if (Model_YJDQ.type == 2) {//通关普通
				self.tabArr[0].x = 186
				self.tabArr[1].x = 329
			} else if (Model_YJDQ.type == 3) {//通关困难
				// let ge = 128; let xpot = (623-159)/2-ge=104
				self.tabArr[0].x = 117
				self.tabArr[1].x = 255
				self.tabArr[2].x = 398
			} else {//通关噩梦
				self.tabArr[0].x = 48
				self.tabArr[1].x = 186
				self.tabArr[2].x = 329
				self.tabArr[3].x = 475
			}
		}
		self.setMaxPass();
	}

	public show(): void {
		let self = this;
		if (!Model_YJDQ.isFirstOpen) {
			GGlobal.modelyjdq.CG_OPEN_YJDQ();
			GGlobal.control.listen(Enum_MsgType.YJDQ_INIT_UPDATE, self.show, self);
			return;
		}
		if (self.c1.selectedIndex == Model_YJDQ.type - 1) {
			self.updateShow();
		} else {
			self.tabArr[self.c1.selectedIndex].selected = false;
			self.c1.selectedIndex = Model_YJDQ.type - 1;
		}
		self.tabArr[self.c1.selectedIndex].selected = true;
		GGlobal.reddot.listen(ReddotEvent.CHECK_YJDQ, self.updateShow, self);
	}

	public disposePanel(): void {
		let self = this;
		GGlobal.reddot.remove(ReddotEvent.CHECK_YJDQ, self.updateShow, self);
	}
}