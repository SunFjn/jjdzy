class ChildCrossWars extends fairygui.GComponent {

	public c1:fairygui.Controller;
	public tab0:fairygui.GButton;
	public tab1:fairygui.GButton;
	public tab2:fairygui.GButton;
	public tab3:fairygui.GButton;
	public list16:fairygui.GList;
	public list8:fairygui.GList;
	public list4:fairygui.GList;
	public list1:VCrossWars4;
	public btnWin:Button2;
	public btnReward:Button2;
	public btnShop:fairygui.GButton;
	public btnTips:fairygui.GButton;
	public view1:VCrossWars2;
	public lbTitle:fairygui.GTextField;
	public lbTime:fairygui.GTextField;
	public lbOver:fairygui.GTextField;
	public gStatus:fairygui.GGroup;

	public static URL:string = "ui://me1skowlhfct44";

	private _tabBtnArr: Array<fairygui.GButton>

	public static createInstance(): ChildCrossWars {
		return <ChildCrossWars><any>(fairygui.UIPackage.createObject("crossKing", "ChildCrossWars"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this,this);
		this.c1 = this.getController("c1");

		this.list16.itemRenderer = this.renderListItem16;
		this.list16.callbackThisObj = this;
		this.list8.itemRenderer = this.renderListItem8;
		this.list8.callbackThisObj = this;
		this.list4.itemRenderer = this.renderListItem4;
		this.list4.callbackThisObj = this;
		this._tabBtnArr = [this.tab0, this.tab1, this.tab2, this.tab3];
	}

	public update(): void {
		if(Model_CrossWars.battleTurn > 0){
			this.ctrlHander(Model_CrossWars.battleTurn - 1);
		}else{
			this.ctrlHander(Model_CrossWars.actTurn > 0 ? Math.min(Model_CrossWars.actTurn - 1, 3) : 0)
		}
		
	}

	public addListen(): void {
		for (let i = 0; i < this._tabBtnArr.length; i++) {
			this._tabBtnArr[i].addClickListener(this.onTabHander, this)
			this._tabBtnArr[i].name = i + "";
		}
		this.btnReward.addClickListener(this.onReward, this);
		this.btnWin.addClickListener(this.onWin, this);
		this.btnTips.addClickListener(this.onTips, this);
		this.btnShop.addClickListener(this.onShop, this);
		GGlobal.control.listen(Enum_MsgType.CROSSWARS_OPEN_UI, this.updatePage, this)
		GGlobal.control.listen(Enum_MsgType.CROSSWARS_BUY_WIN, this.updatePage, this)
		GGlobal.control.listen(Enum_MsgType.CROSSWARS_OPEN_WINERS, this.upCheck, this)
		GGlobal.control.listen(Enum_MsgType.CROSSWARS_STATUS_CHANGE, this.upStatus, this)
		Timer.instance.listen(this.upTimer, this, 1000);
	}

	public removeListen(): void {
		for (let i = 0; i < this._tabBtnArr.length; i++) {
			this._tabBtnArr[i].removeClickListener(this.onTabHander, this)
		}
		this.btnReward.removeClickListener(this.onReward, this);
		this.btnWin.removeClickListener(this.onWin, this);
		this.btnTips.removeClickListener(this.onTips, this);
		this.btnShop.removeClickListener(this.onShop, this);
		GGlobal.control.remove(Enum_MsgType.CROSSWARS_OPEN_UI, this.updatePage, this)
		GGlobal.control.remove(Enum_MsgType.CROSSWARS_BUY_WIN, this.updatePage, this)
		GGlobal.control.remove(Enum_MsgType.CROSSWARS_OPEN_WINERS, this.upCheck, this)
		GGlobal.control.remove(Enum_MsgType.CROSSWARS_STATUS_CHANGE, this.upStatus, this)
		Timer.instance.remove(this.upTimer, this);
		this.list16.numItems = 0
		this.list8.numItems = 0
		this.list4.numItems = 0
		Model_CrossWars.battleTurn = 0;
	}

	private updatePage(): void {
		if (this._curPage == 0) {
			this.list16.numItems = Model_CrossWars.matchPlyArr[0] ? Math.ceil(Model_CrossWars.matchPlyArr[0].length / 2) : 0
		} else if (this._curPage == 1) {
			this.list8.numItems = Model_CrossWars.matchPlyArr[1] ? Model_CrossWars.matchPlyArr[1].length : 0
		} else if (this._curPage == 2) {
			this.list4.numItems = Model_CrossWars.matchPlyArr[2] ? Model_CrossWars.matchPlyArr[2].length : 0
		} else {
			this.list1.first = Model_CrossWars.matchPlyArr[3] ? Model_CrossWars.matchPlyArr[3][0] : null
		}
		if (Model_CrossWars.actStatus == 0) {
			this.lbTimeTxt = ""
			this.view1.vo = this.lbOver.text = "赛事已结束"
		} else {
			var period = Model_CrossWars.actPeriod == 1 ? "准备阶段" : "战斗阶段"
			this.lbTimeTxt = period;
			this.lbTitle.text = Model_CrossWars.getTurnName(Model_CrossWars.actTurn)
			this.lbOver.text = ""
		}
		this.upCheck()
		this.upTimer()
	}

	private upCheck(){
		if(Model_CrossWars.actStatus == 0)
			this.btnWin.checkNotice = Model_CrossWars.winReward > 0 || (Model_CrossWars.winMobai == 0 && Model_CrossWars.winPlyArr.length > 0);
		else
			this.btnWin.checkNotice = false;		
	}	

	private lbTimeTxt = ""
	private upTimer(): void {
		if (Model_CrossWars.actStatus == 0) {
			this.lbTitle.text = this.lbTime.text = this.lbTimeTxt
		} else {
			var period = Model_CrossWars.actPeriod
			var actTurn = Model_CrossWars.actTurn
			var endHours = 0
			var endMins = 0
			if (actTurn == 1 && period == 1) {//16强
				endHours = 19
				endMins = 30
			} else if (actTurn == 1 && period == 2) {
				endHours = 19
				endMins = 35
			} else if (actTurn == 2 && period == 1) {//8强
				endHours = 19
				endMins = 45
			} else if (actTurn == 2 && period == 2) {
				endHours = 19
				endMins = 50
			} else if (actTurn == 3 && period == 1) {//4强
				endHours = 20
				endMins = 0
			} else if (actTurn == 3 && period == 2) {
				endHours = 20
				endMins = 5
			} else if (actTurn == 4 && period == 1) {//2强
				endHours = 20
				endMins = 15
			} else if (actTurn == 4 && period == 2) {
				endHours = 20
				endMins = 20
			}
			var date: Date = new Date(Model_GlobalMsg.getServerTime());
			date.setHours(endHours)
			date.setMinutes(endMins)
			date.setSeconds(0);
			var d = date.getTime() - Model_GlobalMsg.getServerTime()
			d = Math.floor(Math.max(d, 0) / 1000)
			this.view1.vo = this.lbTime.text = this.lbTimeTxt + "  " + DateUtil.getHMSBySecond2(d)
		}
	}


	private renderListItem16(index: number, obj: fairygui.GObject): void {
		var item: VCrossWars16 = obj as VCrossWars16;
		item.vo = [Model_CrossWars.matchPlyArr[0][2 * index], Model_CrossWars.matchPlyArr[0][2 * index + 1]];
	}

	private renderListItem8(index: number, obj: fairygui.GObject): void {
		var item: VCrossWars8 = obj as VCrossWars8;
		item.vo = Model_CrossWars.matchPlyArr[1][index];
	}

	private renderListItem4(index: number, obj: fairygui.GObject): void {
		var item: VCrossWars4 = obj as VCrossWars4;
		item.vo = Model_CrossWars.matchPlyArr[2][index];
	}

	private onReward() {
		GGlobal.layerMgr.open(UIConst.CROSS_WARS_REWARD)
	}

	private onWin() {
		if(Model_CrossWars.actStatus == 1){
			ViewCommonWarn.text("本届比赛尚未结束")
			return;
		}
		GGlobal.layerMgr.open(UIConst.CROSS_WARS_WIN)
	}

	private onTips() {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.CROSS_WARS)
	}

	private onShop() {
		// GGlobal.layerMgr.open(UIConst.BAOKU_LZ, 2)
		GGlobal.layerMgr.open(UIConst.BAOKU_XX)
	}

	private _curPage: number = 0;
	public ctrlHander(index: number): void {
		if (Model_CrossWars.actStatus == 1 && index + 1 > Model_CrossWars.actTurn) {
			ViewCommonWarn.text("赛事未开始");
			this["tab" + index].selected = false;
			return;
		}
		this.c1.selectedIndex = index;
		this._curPage = index
		this.tab0.selected = (index == 0);
		this.tab1.selected = (index == 1);
		this.tab2.selected = (index == 2);
		this.tab3.selected = (index == 3);

		this.upStatus();
		this.updatePage();
	}

	private upStatus():void{
		GGlobal.modelCrossWars.CG_OPENUI(this._curPage);
	}

	private onTabHander(e: egret.TouchEvent): void {
		var curTarget: fairygui.GComponent = e.currentTarget;
		this.ctrlHander(Number(curTarget.name));
	}
}