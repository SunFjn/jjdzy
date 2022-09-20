/**
 * 护卫武将界面
 */
class ShaoZhuGuardView extends UIModalPanel {

	//>>>>start
	public frame: fairygui.GLabel;
	public btnOnekey: Button1;
	public btnRefresh: Button0;
	public btnStart: Button1;
	public moneyLb0: fairygui.GRichTextField;
	public moneyLb1: fairygui.GRichTextField;
	public list: fairygui.GList;
	//>>>>end

	public static URL: string = "ui://lnw94ki2lnit7";

	public static createInstance(): ShaoZhuGuardView {
		return <ShaoZhuGuardView><any>(fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuGuardView"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(ShaoZhuGuardItem.URL, ShaoZhuGuardItem);
		this.loadRes();
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("ShaoZhuEscort");
		self.view = fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuGuardView").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		self.moneyLb0.text = JSON.parse(Config.xtcs_004[7007].other)[0][2] + "";
		self.moneyLb1.text = JSON.parse(Config.xtcs_004[7006].other)[0][2] + "";
		super.childrenCreated();
	}

	private itemRender(idx, obj) {
		let item: ShaoZhuGuardItem = obj as ShaoZhuGuardItem;
		item.setdata(idx);
		item.setChoose(idx == this._selectedIndx);
	}

	private _selectedIndx = 0;
	protected onShown(): void {
		let self = this;
		self.addListen();
		self._selectedIndx = Model_ShaoZhuEscort.id - 1;
		self.list.numItems = Model_ShaoZhuEscort.MAX_LEVEL;
		self.checkMoney();
	}

	protected onHide(): void {
		this.removeListen();
		GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_GUARD);
		this.list.numItems = 0
	}

	private addListen(): void {
		let self = this;
		GGlobal.control.listen("GC_REFRESH_SHAOZHUESCORT", self.updatePage, self);
		self.btnOnekey.addClickListener(self.oneKeyHD, self);
		self.btnRefresh.addClickListener(self.refreshHD, self);
		self.btnStart.addClickListener(self.OnStartBt, self);
	}

	private removeListen(): void {
		let self = this;
		GGlobal.control.remove("GC_REFRESH_SHAOZHUESCORT", self.updatePage, self);
		self.btnOnekey.removeClickListener(self.oneKeyHD, self);
		self.btnRefresh.removeClickListener(self.refreshHD, self);
		self.btnStart.removeClickListener(self.OnStartBt, self);
	}

	private checkMoney() {
		let s = this;
		let color = Color.REDINT;
		let condition = Config.xtcs_004[7007];
		if (ConfigHelp.checkEnough(condition.other, false)) {
			color = Color.WHITEINT;
		}
		s.moneyLb0.color = color;
		condition = Config.xtcs_004[7006];
		if (ConfigHelp.checkEnough(condition.other, false)) {
			color = Color.WHITEINT;
		}
		s.moneyLb1.color = color;
	}

	private _inAni = 0;
	private nowDengdengdeng = 0;
	/**
	 * 更新数据
	 */
	public updatePage() {
		let self = this;
		if (Model_ShaoZhuEscort.id >= Model_ShaoZhuEscort.MAX_LEVEL) {
			self._inAni = 0;
			(self.list._children[self._selectedIndx] as ShaoZhuGuardItem).setChoose(false);
			self._selectedIndx = Model_ShaoZhuEscort.id - 1;
			(self.list._children[self._selectedIndx] as ShaoZhuGuardItem).setChoose(true);
			self.checkMoney();
			return;
		}
		self._inAni = 10;
		self.nowDengdengdeng = self._selectedIndx;
		Timer.instance.listen(self.dengdengdeng, self, 50);
		self.checkMoney();
	}

	private dengdengdeng() {
		let self = this;
		self._inAni--;
		let tx = 0;
		(self.list._children[self._selectedIndx] as ShaoZhuGuardItem).setChoose(false);
		if (self._inAni <= 0) {
			self._inAni = 0;
			tx = Model_ShaoZhuEscort.id - 1;
			Timer.instance.remove(self.dengdengdeng, self);
		} else {
			tx = self._selectedIndx + 1;
			tx = tx < Model_ShaoZhuEscort.MAX_LEVEL ? tx : self.nowDengdengdeng;
		}
		(self.list._children[tx] as ShaoZhuGuardItem).setChoose(true);
		self._selectedIndx = tx;
	}

	/**
	 * 一键刷红
	 */
	private oneKeyHD(): void {
		let self = this;
		if (self.list.selectedIndex >= Model_ShaoZhuEscort.MAX_LEVEL - 1) {
			ViewCommonWarn.text("已刷到最高层");
			return;
		}
		let condition = Config.xtcs_004[7007];
		if (ConfigHelp.checkEnough(condition.other, false)) {
			if (self._inAni) {
				return;
			}
			if (TimeUitl.cool("ViewShaoZhuGuardRefresh0", 500)) {
				GGlobal.modelShaoZhuEscort.CG_REFRESH(2);
			}
		} else {
			ModelChongZhi.guideToRecharge(Handler.create(self, function () {
				self.doHideAnimation();
			}));
		}
	}

	/**
	 * 刷新
	 */
	private refreshHD() {
		let self = this;
		if (self.list.selectedIndex >= Model_ShaoZhuEscort.MAX_LEVEL - 1) {
			ViewCommonWarn.text("已刷到最高层");
			return;
		}
		let condition = Config.xtcs_004[7006];
		if (ConfigHelp.checkEnough(condition.other, false)) {
			if (self._inAni) {
				return;
			}
			if (TimeUitl.cool("ViewShaoZhuGuardRefresh1", 500)) {
				GGlobal.modelShaoZhuEscort.CG_REFRESH(1);
			}
		} else {
			ModelChongZhi.guideToRecharge(Handler.create(self, function () {
				self.doHideAnimation();
			}));
		}
	}

	/**
	 * 护送按钮点击事件
	 */
	private OnStartBt() {
		if (this._selectedIndx + 1 != Model_ShaoZhuEscort.MAX_LEVEL)//如果不是刷到吕布弹提示
		{
			ViewAlert.show("选择<font color='#ed1414'>吕布</font>护送奖励不会损失", Handler.create(this, this.startHd), ViewAlert.OKANDCANCEL, "仍然出发", "再去选选");
			return;
		}
		this.startHd();
	}

	/**
	 * 开始护送
	 */
	private startHd(): void {
		let self = this;
		if (Model_ShaoZhuEscort.escort <= 0) {
			ViewCommonWarn.text("今日护送次数已耗尽");
			return;
		}
		this.doHideAnimation();
		GGlobal.modelShaoZhuEscort.CG_ESCORT();
	}

}