class Child_ActCom_YuanXiao extends fairygui.GComponent implements IPanel {

	public c1: fairygui.Controller;
	public timeLb: fairygui.GRichTextField;
	public smLb: fairygui.GRichTextField;
	public backImg: fairygui.GLoader;
	public maskImg: fairygui.GImage;
	public drawTime: fairygui.GRichTextField;
	public timeGroup: fairygui.GGroup;
	public costLb0: YuanXiaoGrid;
	public costLb1: YuanXiaoGrid;
	public costLb2: YuanXiaoGrid;
	public rewardGrid: ViewGrid2;
	public rewardBt: Button2;
	public reportBt: fairygui.GButton;
	public drawBt: fairygui.GButton;
	public role1: YuanXiaoRole;
	public role0: YuanXiaoRole;
	public role2: YuanXiaoRole;
	public resTime: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;
	public resBt: fairygui.GButton;
	public costLb: ViewResource2;
	public grid0: ViewGridRender;
	public grid1: ViewGridRender;
	public grid2: ViewGridRender;
	public goBt: Button2;
	public backBt: Button0;
	public randomImg: fairygui.GImage;
	private costLbArr: YuanXiaoGrid[] = [];
	private gridArr: ViewGridRender[] = [];
	private roleArr: YuanXiaoRole[] = [];

	public static URL: string = "ui://ajaichn8wtx2i";
	public static pkg: string = "ActCom_YuanXiao";

	public static createInstance(): Child_ActCom_YuanXiao {
		return <Child_ActCom_YuanXiao><any>(fairygui.UIPackage.createObject("ActCom_YuanXiao", "Child_ActCom_YuanXiao"));
	}

	public constructor() {
		super();
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(YuanXiaoGrid.URL, YuanXiaoGrid);
		f(YuanXiaoRole.URL, YuanXiaoRole);
		f(YuanXiaoBattleReportItem.URL, YuanXiaoBattleReportItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.costLbArr = [self.costLb0, self.costLb1, self.costLb2];
		self.gridArr = [self.grid0, self.grid1, self.grid2];
		self.roleArr = [self.role0, self.role1, self.role2];
	}

	public initView(pParent: fairygui.GObject) {

	}

	private moneyType = 24;
	private curGrid: ViewGridRender;
	public updateShow() {
		let self = this;
		let model = GGlobal.modelyuanxiao;
		let costArr = ConfigHelp.makeItemListArr(JSON.parse(Config.zyx_775[self.vo.qs].cl));
		if (self.c1.selectedIndex == 0) {
			let max = ConfigHelp.getSystemNum(7932);
			self.drawBt.visible = model.drawNum >= max;
			self.timeGroup.visible = model.drawNum <= 0;
			self.maskImg.fillAmount = model.drawNum / max;
			self.rewardGrid.visible = false;
			self.randomImg.visible = true;
			let index = 0;
			for (let i = 0; i < self.costLbArr.length; i++) {
				if (model.numArr[i] >= costArr[i].count) {
					index++;
				}
				self.costLbArr[i].setVo(costArr[i], model.numArr[i]);
			}
			self.rewardBt.checkNotice = index >= costArr.length;
			if (model.drawNum < max) {
				if (!Timer.instance.has(self.OnDrawTime, self)) {
					Timer.instance.listen(self.OnDrawTime, self, 1000);
				}
			} else {
				Timer.instance.remove(self.OnDrawTime, self);
			}
		} else {
			Timer.instance.remove(self.OnDrawTime, self);
			for (let i = 0; i < self.roleArr.length; i++) {
				if (model.roleDic[self.curGrid.data + 1] && i < model.roleDic[self.curGrid.data + self.moneyType].length) {
					self.roleArr[i].setVo(self.curGrid.data + 1, model.roleDic[self.curGrid.data + self.moneyType][i]);
				} else {
					self.roleArr[i].setVo(self.curGrid.data + 1, null);
				}
			}
			if (model.resTime <= 0) {
				self.resBt.text = "免费刷新";
				Timer.instance.remove(self.OnResTime, self);
			} else {
				self.resBt.text = "刷新";
				if (Timer.instance.has(self.OnResTime, self)) {
					Timer.instance.listen(self.OnResTime, self, 1000);
				}
			}
			let costMoney = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[7931].other))[0];
			self.costLb.setImgUrl(costMoney.icon);
			self.costLb.setCount(costMoney.count);
			self.numLb.text = "掠夺次数(" + model.ldNum + "/" + ConfigHelp.getSystemNum(7930) + ")";
			for (let i = 0; i < costArr.length; i++) {
				self.gridArr[i].vo = costArr[i];
			}
		}
	}

	private OnResTime() {
		let self = this;
		let model = GGlobal.modelyuanxiao;
		model.resTime--;
		if (model.resTime <= 0) {
			self.resTime.text = "";
			self.resBt.text = "免费刷新";
			Timer.instance.remove(self.OnResTime, self);
		} else {
			self.resTime.text = DateUtil2.formatUsedTime(model.resTime, "uu分ss秒后可免费刷新");
		}
	}

	private OnDrawTime() {
		let self = this;
		let model = GGlobal.modelyuanxiao;
		let max = ConfigHelp.getSystemNum(7932);
		model.drawTime--;
		if (model.drawTime > 0) {
			if (self.timeGroup.visible) {
				self.drawTime.text = DateUtil2.formatUsedTime(model.drawTime, "uu分ss秒后可领取");
			}
		} else {
			self.timeGroup.visible = model.drawNum <= 0;
			if (model.drawNum < max) {
				model.drawTime = 3600;
			} else {
				Timer.instance.remove(self.OnDrawTime, self);
			}
		}
	}

	private vo: Vo_Activity;
	public openPanel(pData?: any) {
		let self = this;
		self.vo = pData;
		self.register(true);
		Model_GlobalMsg.CG_ACTTIVITY_OR_SYSTEM_DATA(pData.id);
		Timer.instance.listen(self.timeHandler, self, 1000);
	}

	closePanel(pData?: any) {
		let self = this;
		Timer.instance.remove(self.timeHandler, self);
		Timer.instance.remove(self.OnDrawTime, self);
		Timer.instance.remove(self.OnResTime, self);
		ConfigHelp.cleanGridEff(self.gridArr);
		for (let i = 0; i < self.costLbArr.length; i++) {
			self.costLbArr[i].clean();
			self.roleArr[i].clean();
		}
		self.register(false);
	}

	private register(pFlag: boolean) {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.ACTCOM_YUANXIAO, self.updateShow, self);
		EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
		EventUtil.register(pFlag, self.smLb, egret.TouchEvent.TOUCH_TAP, self.OnSM, self);
		EventUtil.register(pFlag, self.goBt, egret.TouchEvent.TOUCH_TAP, self.OnGo, self);
		EventUtil.register(pFlag, self.backBt, egret.TouchEvent.TOUCH_TAP, self.OnBack, self);
		EventUtil.register(pFlag, self.rewardBt, egret.TouchEvent.TOUCH_TAP, self.OnReward, self);
		EventUtil.register(pFlag, self.resBt, egret.TouchEvent.TOUCH_TAP, self.OnRes, self);
		EventUtil.register(pFlag, self.drawBt, egret.TouchEvent.TOUCH_TAP, self.OnDraw, self);
		for (let i = 0; i < self.gridArr.length; i++) {
			self.gridArr[i].data = i;
			EventUtil.register(pFlag, self.gridArr[i], egret.TouchEvent.TOUCH_TAP, self.OnGrid, self);
		}
	}

	private OnDraw() {
		GGlobal.modelyuanxiao.CG_GET_YUANXIAO_CAILIAO();
	}

	private OnRes() {
		let self = this;
		let model = GGlobal.modelyuanxiao;
		if (model.resTime <= 0 || ConfigHelp.checkEnough(Config.xtcs_004[7931].other, false)) {
			model.CG_YuanXiaoLocal_refresh_11635(self.curGrid.data + self.moneyType)
		} else {
			ModelChongZhi.guideToRecharge();
		}
	}

	private OnGrid(evt: egret.TouchEvent) {
		let self = this;
		let grid = evt.target as ViewGridRender;
		if (self.curGrid && self.curGrid.hashCode == grid.hashCode) return;
		if (self.curGrid) self.curGrid.choose = false;
		grid.choose = true;
		self.curGrid = grid;
		GGlobal.modelyuanxiao.CG_YuanXiaoLocal_openBattle_11631(grid.data + self.moneyType);
	}

	private OnReward() {
		let self = this;
		if (self.rewardBt.checkNotice) {
			GGlobal.modelyuanxiao.CG_YuanXiaoLocal_make_11637();
		} else {
			ViewCommonWarn.text("制作材料不足");
		}
	}

	private OnBack() {
		Model_GlobalMsg.CG_ACTTIVITY_OR_SYSTEM_DATA(this.vo.id);
	}

	private OnGo() {
		let self = this;
		if (self.curGrid) self.curGrid.choose = false;
		self.curGrid = self.gridArr[0];
		self.curGrid.choose = true;
		GGlobal.modelyuanxiao.CG_YuanXiaoLocal_openBattle_11631(self.moneyType);
	}


	private OnSM(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_YUANXIAO);
	}


	private timeHandler() {
		let self = this;
		let surTime = self.vo.getSurTime();
		if (surTime > 0) {
			self.timeLb.text = "剩余时间：" + DateUtil.getMSBySecond4(surTime);
		} else {
			self.timeLb.text = "活动已结束";
			Timer.instance.remove(self.timeHandler, self);
		}
	}
}