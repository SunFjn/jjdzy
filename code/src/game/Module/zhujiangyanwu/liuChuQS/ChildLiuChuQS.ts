class ChildLiuChuQS extends fairygui.GComponent {

	public list: fairygui.GList;
	public vTitle: ItemLCQSTitle;
	public tabBtn0: fairygui.GButton;
	public tabBtn1: fairygui.GButton;
	public c1: fairygui.Controller;

	public static URL: string = "ui://7a366usasr4011";

	public static createInstance(): ChildLiuChuQS {
		return <ChildLiuChuQS><any>(fairygui.UIPackage.createObject("zjyw", "ChildLiuChuQS"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml) {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHide, this);
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHander;
		this.list.setVirtual();
	}

	public onShow() {
		let s = this;
		s.vTitle.addListen()
		let m = GGlobal.model_LiuChuQS
		m.fristLogin();
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selHandle, s)
		m.listen(Model_LiuChuQS.openui, this.onUpdate, this);
		m.CG_OPENUI_8201();
		this.onUpdate();

	}
	public onHide() {
		let s = this;
		let m = GGlobal.model_LiuChuQS
		s.vTitle.removeListen()
		s.list.numItems = 0;
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.selHandle, s)
		m.remove(Model_LiuChuQS.openui, this.onUpdate, this);
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.openui, this.onUpdate, this);
	}

	private onUpdate() {
		let s = this;
		let m = GGlobal.model_LiuChuQS;

		let hard = m.getHard(m.curGuan);
		s._tabArr = m.getTabArr(hard)
		s.c1.selectedIndex = hard;
		this.list.numItems = s._tabArr.length;
		//定位到一下关卡
		let cur = m.curGuan;
		let scrTo = 0
		if (cur != 0) {
			for (let i = 0; i < s._tabArr.length; i++) {
				let v = s._tabArr[i];
				if (Math.floor(cur / 1000) == Math.floor(v.id / 1000)) {
					scrTo = i;
				}
			}
		}
		if (scrTo < 0) {
			scrTo = 0;
		}
		if (scrTo > s._tabArr.length - 1) {
			scrTo = s._tabArr.length - 1;
		}
		this.list.scrollToView(scrTo)
	}

	private _tabArr: Isix_279[];
	private renderHander(index: number, obj) {
		let v: ItemLCQSEnter = obj as ItemLCQSEnter
		v.vo = this._tabArr[index];
	}

	private selHandle() {
		let s = this;
		let m = GGlobal.model_LiuChuQS;
		let hard = m.getHard(m.curGuan)
		if (s.c1.selectedIndex == 1) {
			if (hard == 0) {
				ViewCommonWarn.text("普通难度全部通关后开启")
				s.c1.selectedIndex = 0;
			}
		}
		else if (s.c1.selectedIndex == 0) {
			if (hard == 1) {
				ViewCommonWarn.text("普通难度已经全部通关")
				s.c1.selectedIndex = 1;
			}
		}
	}
}
