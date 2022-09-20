class ViewCangBaoGeRank extends UIModalPanel {

	public c1: fairygui.Controller;
	public tab1: TabButton;
	public tab0: fairygui.GButton;
	public tab2: fairygui.GButton;
	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public lb1: fairygui.GTextField;
	public list1: fairygui.GList;
	public lbMy: fairygui.GRichTextField;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("cangbaoge");
		this.view = fairygui.UIPackage.createObject("cangbaoge", "ViewCangBaoGeRank").asCom;
		this.contentPane = this.view;

		this.c1 = this.view.getController("c1");
		this.tab1 = <TabButton><any>(this.view.getChild("tab1"));
		this.tab0 = <fairygui.GButton><any>(this.view.getChild("tab0"));
		this.tab2 = <fairygui.GButton><any>(this.view.getChild("tab2"));
		this.frame = <fairygui.GLabel><any>(this.view.getChild("frame"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list1 = <fairygui.GList><any>(this.view.getChild("list1"));
		this.lb1 = <fairygui.GTextField><any>(this.view.getChild("lb1"));
		this.lbMy = <fairygui.GRichTextField><any>(this.view.getChild("lbMy"));
		super.childrenCreated();

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();

		this.list1.itemRenderer = this.renderHandle1;
		this.list1.callbackThisObj = this;
		this.list1.setVirtual();
	}

	private _first0 = false;
	private _first1 = false;
	private _first2 = false;

	protected onShown(): void {
		if (Model_ActivityHall.cbgStatus == 3) {
			//已结束
			this.c1.selectedIndex = 2;
			this.tab0.visible = false;
			this.tab1.visible = false;
			this.tab2.visible = true;
			this.tab2.x = 17;
		} else {
			this.c1.selectedIndex = 0;
			if (Model_GlobalMsg.kaifuDay <= 3) {
				this.tab0.visible = true;
				this.tab1.visible = true;
				this.tab2.visible = false;
			} else {
				this.tab0.visible = true;
				this.tab1.visible = true;
				this.tab2.visible = true;
			}
			this.tab2.x = 249;
		}
		this.addListen();
		this.update();
		this.selectPage();

	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
		this.list1.numItems = 0;
		GGlobal.layerMgr.close(this.panelId);
		// GGlobal.layerMgr.close(UIConst.CANGBAOGE_RANK);
		// GGlobal.layerMgr.close(UIConst.CANGBAOGE_RANK2);
	}

	private addListen(): void {
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		GGlobal.control.listen(Enum_MsgType.CANGBAOGE_RANK, this.update, this)
		GGlobal.reddot.listen(UIConst.CANGBAOGE_RANK, this.checkRank, this);
		GGlobal.reddot.listen(UIConst.CANGBAOGE_RANK2, this.checkRank, this);
	}

	private removeListen(): void {
		this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		GGlobal.control.remove(Enum_MsgType.CANGBAOGE_RANK, this.update, this)
		GGlobal.reddot.remove(UIConst.CANGBAOGE_RANK, this.checkRank, this);
		GGlobal.reddot.listen(UIConst.CANGBAOGE_RANK2, this.checkRank, this);
		this._first0 = false;
		this._first1 = false;
		this._first2 = false;
	}

	private update() {
		let model = GGlobal.modelActivityHall
		let rk = ""
		let ct = ""
		if (this.c1.selectedIndex == 0) {
			this.dataArr = GGlobal.modelActivityHall.cbgRankArr;
			if (Model_ActivityHall.cbgIsKuaF()) {
				this.list.numItems = 20;
			} else {
				this.list.numItems = 10;
			}
			this.list.scrollToView(0);
			rk = model.cbgMyRank ? model.cbgMyRank + "" : "未上榜"
			ct = model.cbgMyCt ? model.cbgMyCt + "" : "0"
			this.frame.text = this.tab2.visible ? "本期排行奖励" : "排行奖励";
		} else if (this.c1.selectedIndex == 1) {
			this.dataArr1 = GGlobal.modelActivityHall.cbgMbArr
			this.dataArr1.sort(this.funcSort);
			this.list1.numItems = this.dataArr1.length;
			ct = model.cbgMyCt ? model.cbgMyCt + "" : "0"
			if (this.dataArr1.length > 0)
				this.list1.scrollToView(0);
			this.frame.text = "目标奖励"
		} else if (this.c1.selectedIndex == 2) {
			this.dataArr = GGlobal.modelActivityHall.cbgRankLastArr
			if (Model_ActivityHall.cbgIsKuaF()) {
				this.list.numItems = 20;
			} else {
				this.list.numItems = 10;
			}
			this.list.scrollToView(0);
			rk = model.cbgMyLastRank ? model.cbgMyLastRank + "" : "未上榜"
			ct = model.cbgMyLastCt ? model.cbgMyLastCt + "" : "0"
			this.frame.text = "上期排行奖励"
		}
		this.checkRank();
		this.lbMy.text = "我的排名：" + rk + "          我的抽奖次数：" + ct
		this.lb1.text = "我的抽奖次数：" + ct
	}

	private funcSort(a: { cfgId: number, status: number }, b: { cfgId: number, status: number }) {
		if (a.status == b.status) {
			return a.cfgId - b.cfgId;
		} else {
			if (a.status == 1) {
				return -1;
			}
			if (b.status == 1) {
				return 1;
			}
			if (a.status == 0) {
				return -1;
			}
			if (b.status == 0) {
				return 1;
			}
		}
		return 1;
	}
	private dataArr: { rank: number, pName: string, ct: number }[];
	private dataArr1: any[];

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: VCangBaoGeRank = obj as VCangBaoGeRank
		v.setVo(this.dataArr[index], index, this.c1.selectedIndex == 2);
	}

	private renderHandle1(index: number, obj: fairygui.GComponent): void {
		var v: VCangBaoGeRank1 = obj as VCangBaoGeRank1
		v.setVo(this.dataArr1[index], index);
	}

	private selectPage(): void {
		let i = this.c1.selectedIndex;
		if (i == 0) {
			if (!this._first0) {
				this._first0 = true;
				if (Model_ActivityHall.cbgIsKuaF()) {
					GGlobal.modelActivityHall.CG_CBG_RANK_4871();
				} else {
					GGlobal.modelActivityHall.CG_CBG_RANK_4851();
				}
			}
		} else if (i == 1) {
			if (!this._first1) {
				this._first1 = true;
				if (Model_ActivityHall.cbgIsKuaF()) {
					GGlobal.modelActivityHall.CG_CBG_TARGET_4873();
				} else {
					GGlobal.modelActivityHall.CG_CBG_TARGET_4853();
				}
			}
		} else if (i == 2) {
			if (!this._first2) {
				this._first2 = true;
				if (Model_ActivityHall.cbgIsKuaF()) {
					GGlobal.modelActivityHall.CG_CBG_LAST_4877();
				} else {
					GGlobal.modelActivityHall.CG_CBG_LAST_4857();
				}
			}
		}
		this.update();
	}
	private checkRank() {
		this.tab1.checkNotice = GGlobal.reddot.checkCondition(UIConst.CANGBAOGE_RANK) || GGlobal.reddot.checkCondition(UIConst.CANGBAOGE_RANK2)
	}
}