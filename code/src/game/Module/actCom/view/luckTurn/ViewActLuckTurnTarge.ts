class ViewActLuckTurnTarge extends UIModalPanel {

	public frame: fairygui.GLabel;
	public lb1: fairygui.GTextField;
	public list1: fairygui.GList;

	public static URL: string = "ui://px5jiht9fvskf";

	public static createInstance(): ViewActLuckTurnTarge {
		return <ViewActLuckTurnTarge><any>(fairygui.UIPackage.createObject("actLuckTurn", "ViewActLuckTurnTarge"));
	}


	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("actLuckTurn");
		let s = this;
		s.view = fairygui.UIPackage.createObject("actLuckTurn", "ViewActLuckTurnTarge").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
		s.list1.itemRenderer = s.renderHandle1;
		s.list1.callbackThisObj = s;
		s.list1.setVirtual();
	}


	protected onShown(): void {
		let m = GGlobal.model_LuckTurn
		m.listen(Model_LuckTurn.TARGET, this.update, this)
		m.CG_TARGET_OPEN_10343();
		this.update();

	}

	protected onHide(): void {
		GGlobal.model_LuckTurn.remove(Model_LuckTurn.TARGET, this.update, this)
		this.list1.numItems = 0;
	}

	private update() {
		let m = GGlobal.model_LuckTurn
		let rk = ""
		let ct = ""
		this.dataArr1 = m.targetArr
		this.dataArr1.sort(this.funcSort);
		this.list1.numItems = this.dataArr1.length;
		this.lb1.text = "我的获胜次数：" + m.winCt
	}

	private funcSort(a: { id: number, st: number }, b: { id: number, st: number }) {
		if (a.st == b.st) {
			return a.id - b.id;
		} else {
			if (a.st == 1) {
				return -1;
			}
			if (b.st == 1) {
				return 1;
			}
			if (a.st == 0) {
				return -1;
			}
			if (b.st == 0) {
				return 1;
			}
		}
		return 1;
	}
	private dataArr1: { id: number, st: number }[];

	private renderHandle1(index: number, obj: fairygui.GComponent): void {
		var v: ItemActLuckTurnTarge = obj as ItemActLuckTurnTarge
		v.setVo(this.dataArr1[index]);
	}
}