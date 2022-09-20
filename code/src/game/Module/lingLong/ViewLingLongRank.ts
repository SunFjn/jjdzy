class ViewLingLongRank extends UIModalPanel {

	public c1: fairygui.Controller;
	public tab2: fairygui.GButton;
	public tab1: fairygui.GButton;
	public tab0: fairygui.GButton;
	public list: fairygui.GList;
	public lb: fairygui.GTextField;
	public lbMy: fairygui.GTextField;
	public lb1: fairygui.GTextField;
	public list1: fairygui.GList;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("lingLong");
		this.view = fairygui.UIPackage.createObject("lingLong", "ViewLingLongRank").asCom;
		this.contentPane = this.view;

		this.c1 = this.view.getController("c1");
		this.tab2 = <fairygui.GButton><any>(this.view.getChild("tab2"));
		this.tab1 = <fairygui.GButton><any>(this.view.getChild("tab1"));
		this.tab0 = <fairygui.GButton><any>(this.view.getChild("tab0"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list1 = <fairygui.GList><any>(this.view.getChild("list1"));
		this.lb = <fairygui.GTextField><any>(this.view.getChild("lb"));
		this.lbMy = <fairygui.GTextField><any>(this.view.getChild("lbMy"));
		this.lb1 = <fairygui.GTextField><any>(this.view.getChild("lb1"));
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
	private _isLast = false;

	protected onShown(): void {
		this._isLast = false
		let point = ConfigHelp.getSystemNum(2606)
		this.lb.text = "个人积分达到" + point + "分可领取区服排行奖励"
		if(Model_GlobalMsg.kaifuDay <= 1){
			this.tab0.visible = false;
			this.tab1.visible = false;
			this.tab2.visible = false;
		}else if(Model_GlobalMsg.kaifuDay <= 7){
			this.tab0.visible = true;
			this.tab1.visible = false;
			this.tab2.visible = true;
			this.tab2.x = 133;
		}else{
			this.tab0.visible = true;
			this.tab1.visible = true;
			this.tab2.visible = true;
			this.tab2.x = 249;
		}
		this.c1.selectedIndex = 0;
		this.addListen();
		this.selectPage();
	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
	}

	private addListen(): void {
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		GGlobal.control.listen(Enum_MsgType.LINGLONG_OPEN_RANK, this.update, this)
	}

	private removeListen(): void {
		this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		GGlobal.control.remove(Enum_MsgType.LINGLONG_OPEN_RANK, this.update, this)
		GGlobal.layerMgr.close(UIConst.LING_LONG_RANK);
		this._first0 = false;
		this._first1 = false;
		this._first2 = false;
	}

	private update() {
		switch(this.c1.selectedIndex){
			case 0:
				this.list.numItems = 10;
				this.list.scrollToView(0);
				this.frame.text = this.tab0.visible ? "本期排行奖励" : "排行奖励";
				break;
			case 2:
				this.list.numItems = 10;
				this.list.scrollToView(0);
				this.frame.text = "上期排行奖励"
				break;
			case 1:	
				this.list1.numItems = 10;
				this.list1.scrollToView(0);
				this.frame.text = "区服奖励"
				break;
		}
		let myRank = "10+"
		let myPoint
		if(this._isLast){
			for (let i = 0; i < Model_LingLong.rankLastArr.length; i++) {
				let v = Model_LingLong.rankLastArr[i];
				if (v.plyId == Model_player.voMine.id) {
					myRank = "" + (i + 1);
					break;
				}
			}
			myPoint = Model_LingLong.myLastPoint
		}else{
			for (let i = 0; i < Model_LingLong.rankArr.length; i++) {
				let v = Model_LingLong.rankArr[i];
				if (v.plyId == Model_player.voMine.id) {
					myRank = "" + (i + 1);
					break;
				}
			}
			myPoint = Model_LingLong.myPoint
		}
		this.lbMy.text = "我的排名：" + myRank + "          我的积分：" + myPoint
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: VLingLongRank = obj as VLingLongRank
		if(this._isLast){
			v.setVo(Model_LingLong.rankLastArr[index], index, true);
		}else{
			v.setVo(Model_LingLong.rankArr[index], index);
		}
	}

	private renderHandle1(index: number, obj: fairygui.GComponent): void {
		var v: VLingLongRank1 = obj as VLingLongRank1
		if(this._isLast){
			v.setVo(Model_LingLong.rankLast1Arr[index], index, true);
		}else{
			v.setVo(Model_LingLong.rank1Arr[index], index);
		}
	}

	private selectPage(): void {
		let i = this.c1.selectedIndex;
		this._isLast = false;
		if (i == 0) {
			if (!this._first0) {
				GGlobal.modelLingLong.CG_RANKUI(0);
				this._first0 = true;
			}
		} else if(i == 1){
			if (!this._first1) {
				GGlobal.modelLingLong.CG_RANKUI(1);
				this._first1 = true;
			}
		} else if( i == 2){
			this._isLast = true;
			if(!this._first2){
				GGlobal.modelLingLong.CG_OPEN_LAST_RANK();
				this._first2 = true;
			}
		}
		this.update();
	}
}