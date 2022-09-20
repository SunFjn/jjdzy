class VCrossMineralReport extends fairygui.GComponent {
	public n1: fairygui.GImage;
	public n2: fairygui.GTextField;
	public n3: fairygui.GTextField;
	public roomBt: fairygui.GButton;
	public n9: fairygui.GImage;
	public n10: fairygui.GImage;

	public static URL: string = "ui://yqpfulefnyv75c";

	public static createInstance(): VCrossMineralReport {
		return <VCrossMineralReport><any>(fairygui.UIPackage.createObject("crossKing", "VCrossMineralReport"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.n1 = <fairygui.GImage><any>(this.getChild("n1"));
		this.n2 = <fairygui.GTextField><any>(this.getChild("n2"));
		this.n3 = <fairygui.GTextField><any>(this.getChild("n3"));
		this.roomBt = <fairygui.GButton><any>(this.getChild("roomBt"));
		this.n9 = <fairygui.GImage><any>(this.getChild("n9"));
		this.n10 = <fairygui.GImage><any>(this.getChild("n10"));
		this.roomBt.addClickListener(this.onRoom, this);
	}

	private onRoom() {
		GGlobal.modelCrossMineral.CG_CHECK_RIDEO(this.order);
	}

	private order = 0;
	public setdata(data, index) {
		let ret = data[0];
		let id = data[1];
		let name = data[2];
		let isMax = data[3] >= Model_CrossMineral.MAX_LEVEL;
		let awards: IGridImpl[];
		if (data[4]) {
			awards = ConfigHelp.makeItemListArr(data[4]);
		}
		let s = this;
		s.order = index;
		s.n10.visible = ret == 1;
		s.n9.visible = ret == 0;
		s.n2.text = ret == 2 ? "顺手牵羊" : "战斗抢夺";
		s.roomBt.visible = ret != 2;
		switch (ret) {
			case 0:
				if (isMax) {
					s.n3.text = BroadCastManager.reTxt("{0}抢夺了你的矿藏，好在开采顶级矿藏，没有造成损失", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
				} else {
					if (awards) {
						s.n3.text = BroadCastManager.reTxt("{0}抢夺了你的矿藏，损失了{1}", HtmlUtil.fontNoSize(name, Color.getColorStr(2)),
							HtmlUtil.fontNoSize(awards[0].name, Color.getColorStr(awards[0].quality)) + "x" + awards[0].count +
							"、" + HtmlUtil.fontNoSize(awards[1].name, Color.getColorStr(awards[1].quality)) + "x" + awards[1].count);
					}
				}
				break;
			case 1:
				s.n3.text = BroadCastManager.reTxt("{0}不自量力，前来抢夺你的矿藏，被你狠狠的教训了一顿", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
				break;
			case 2:
				if (isMax) {
					s.n3.text = BroadCastManager.reTxt("{0}在你的矿藏上顺手牵羊，好在开采顶级矿藏，没有造成损失", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
				} else {
					if (awards) {
						s.n3.text = BroadCastManager.reTxt("{0}在你的矿藏上顺手牵羊，损失了{1}", HtmlUtil.fontNoSize(name, Color.getColorStr(2)),
							HtmlUtil.fontNoSize(awards[0].name, Color.getColorStr(awards[0].quality)) + "x" + awards[0].count +
							"、" + HtmlUtil.fontNoSize(awards[1].name, Color.getColorStr(awards[1].quality)) + "x" + awards[1].count);
					}
				}
				break;
		}
	}
}