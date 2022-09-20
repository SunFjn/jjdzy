/**
 * 刷新矿藏界面
 */
class ViewCrossMineralRefresh extends UIModalPanel {
	public btnOnekey: fairygui.GButton;
	public btnRefresh: fairygui.GButton;
	public startBt: fairygui.GButton;
	public n4: fairygui.GImage;
	public n5: fairygui.GImage;
	public moneyLb0: fairygui.GRichTextField;
	public moneyLb1: fairygui.GRichTextField;
	public refreshGroup: fairygui.GGroup;
	public list: fairygui.GList;

	public static URL: string = "ui://yqpfulefnyv754";


	public static createInstance(): ViewCrossMineralRefresh {
		return <ViewCrossMineralRefresh><any>(fairygui.UIPackage.createObject("crossKing", "ViewCrossMineralRefresh"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(RefreshMinItem.URL, RefreshMinItem);
		this.loadRes();
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("crossKing");
		self.view = fairygui.UIPackage.createObject("crossKing", "ViewCrossMineralRefresh").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		self.moneyLb0.text = JSON.parse(Config.xtcs_004[6608].other)[0][2] + "";
		self.moneyLb1.text = JSON.parse(Config.xtcs_004[6609].other)[0][2] + "";
		super.childrenCreated();
	}

	private itemRender(idx, obj) {
		let item: RefreshMinItem = obj as RefreshMinItem;
		item.setdata(idx);
		item.setChoose(idx == this._selectedIndx);
	}

	private showBtnState() {
		let self = this;
		if (Model_CrossMineral.myMineVo.cfgID >= Model_CrossMineral.MAX_LEVEL) {
			self.refreshGroup.visible = false;
			self.startBt.visible = true;
		} else {
			self.refreshGroup.visible = true;
			self.startBt.visible = false;
		}
		self.checkMoney();
	}

	private checkMoney() {
		let s = this;
		let color = Color.REDINT;
		let condition = Config.xtcs_004[6608];
		if (ConfigHelp.checkEnough(condition.other, false)) {
			color = Color.WHITEINT;
		}
		s.moneyLb0.color = color;
		condition = Config.xtcs_004[6609];
		if (ConfigHelp.checkEnough(condition.other, false)) {
			color = Color.WHITEINT;
		}
		s.moneyLb1.color = color;
	}

	private _selectedIndx = 0;
	protected onShown(): void {
		let self = this;
		self.addListen();
		self._selectedIndx = Model_CrossMineral.myMineVo.cfgID - 1;
		self.list.numItems = Model_CrossMineral.MAX_LEVEL;
		self.showBtnState();
	}

	protected onHide(): void {
		this.removeListen();
		GGlobal.layerMgr.close(UIConst.CROSS_MINERAL_REFRESH);
	}

	private dengdengdeng() {
		let self = this;
		self._inAni--;
		let tx = 0;
		(self.list._children[self._selectedIndx] as RefreshMinItem).setChoose(false);
		if (self._inAni <= 0) {
			self._inAni = 0;
			tx = Model_CrossMineral.myMineVo.cfgID-1;
			Timer.instance.remove(self.dengdengdeng, self);
		} else {
			tx = self._selectedIndx + 1;
			tx = tx < Model_CrossMineral.MAX_LEVEL ? tx : self.nowDengdengdeng;
		}
		(self.list._children[tx] as RefreshMinItem).setChoose(true);
		self._selectedIndx = tx;
	}

	private _inAni = 0;
	private nowDengdengdeng = 0;
	private listUpdate() {
		let self = this;
		if (Model_CrossMineral.myMineVo.cfgID-1 >= Model_CrossMineral.MAX_LEVEL - 1) {
			self._inAni = 0;
			(self.list._children[self._selectedIndx] as RefreshMinItem).setChoose(false);
			self._selectedIndx = Model_CrossMineral.myMineVo.cfgID-1;
			(self.list._children[self._selectedIndx] as RefreshMinItem).setChoose(true);
			self.showBtnState();
			return;
		} 
		self._inAni = 10;
		self.nowDengdengdeng = self._selectedIndx;
		Timer.instance.listen(self.dengdengdeng, self, 50);
		self.showBtnState();
	}

	private oneKeyHD() {
		let self = this;
		if (self.list.selectedIndex >= Model_CrossMineral.MAX_LEVEL - 1) {
			ViewCommonWarn.text("当前矿藏已满级");
			return;
		}
		let condition = Config.xtcs_004[6608];
		if (ConfigHelp.checkEnough(condition.other, false)) {
			if (self._inAni) {
				return;
			}
			if (TimeUitl.cool("ViewCrossMineralRefresh0", 500)) {
				GGlobal.modelCrossMineral.CG_REFRESH_MINE(1);
			}
		} else {
			ModelChongZhi.guideToRecharge(Handler.create(self, function () {
				self.doHideAnimation();
			}));
		}
	}

	private refreshHD() {
		let self = this;
		if (self.list.selectedIndex >= Model_CrossMineral.MAX_LEVEL - 1) {
			ViewCommonWarn.text("当前矿藏已满级");
			return;
		}
		let condition = Config.xtcs_004[6609];
		if (ConfigHelp.checkEnough(condition.other, false)) {
			if (self._inAni) {
				return;
			}
			if (TimeUitl.cool("ViewCrossMineralRefresh1", 500)) {
				GGlobal.modelCrossMineral.CG_REFRESH_MINE(0);
			}
		} else {
			ModelChongZhi.guideToRecharge(Handler.create(self, function () {
				self.doHideAnimation();
			}));
		}
	}

	private OnStartBt() {
		this.doHideAnimation();
		GGlobal.modelCrossMineral.CG_START_MINE();
	}

	private addListen(): void {
		let s = this;
		s.btnOnekey.addClickListener(s.oneKeyHD, s);
		s.btnRefresh.addClickListener(s.refreshHD, s);
		s.startBt.addClickListener(s.OnStartBt, s)
		GGlobal.control.listen("GC_REFRESH_MINE", s.listUpdate, s);
	}

	private removeListen(): void {
		let s = this;
		Timer.instance.remove(s.dengdengdeng, s);
		s.list.numItems = 0;
		s._inAni = 0;
		s.btnOnekey.removeClickListener(s.oneKeyHD, s);
		s.btnRefresh.removeClickListener(s.refreshHD, s);
		s.startBt.removeClickListener(s.OnStartBt, s)
		GGlobal.control.remove("GC_REFRESH_MINE", s.listUpdate, s);
		GGlobal.layerMgr.close(UIConst.CROSS_MINERAL_REFRESH);
	}
}