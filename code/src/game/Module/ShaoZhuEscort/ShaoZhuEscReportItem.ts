/**
 * /**
 * 少主护送战报item
 */
class ShaoZhuEscReportItem extends fairygui.GComponent {
	public win: fairygui.GImage;
	public lose: fairygui.GImage;
	public c1: fairygui.Controller;
	public roomBt: fairygui.GButton;
	public n3: fairygui.GRichTextField;
	public n13: fairygui.GRichTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://lnw94ki2lnitn";

	public static createInstance(): ShaoZhuEscReportItem {
		return <ShaoZhuEscReportItem><any>(fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscReportItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		this.roomBt.addClickListener(self.onRoom, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = this.itemRender;
		// self.list.setVirtual();
	}

	private _awards: IGridImpl[] = [];
	private itemRender(idx, obj) {
		let item: ShaoZhuEscReportInter = obj as ShaoZhuEscReportInter;
		item.setdata(this._awards[idx]);
	}

	private onRoom() {
		GGlobal.modelShaoZhuEscort.CG_LOOK_REPORT(this.order);
	}

	private order = 0;
	public setdata(data, index) {
		let s = this;
		s.order = index;
		let ret: number = data[0];
		let name: string = data[1];
		if (data[2]) {
			s._awards = ConfigHelp.makeItemListArr(data[2]);
		}
		s.win.visible = ret == 1;
		s.lose.visible = ret != 1;
		if (ret == 0) {
			s.c1.selectedIndex = 1;
			s.n13.text = BroadCastManager.reTxt("{0}拦截了你的少主，使你损失了", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
			if (s._awards) {
				s.list.numItems = s._awards.length;
			}
		} else {
			s.c1.selectedIndex = 0;
			if (ret == 1) {
				s.n3.text = BroadCastManager.reTxt("{0}来拦截你的少主，被你狠狠地教训了一顿", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
			} else {
				s.n3.text = BroadCastManager.reTxt("{0}拦截了你的少主，幸亏是吕布护送，没有造成损失", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
			}
		}
	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
	}
}