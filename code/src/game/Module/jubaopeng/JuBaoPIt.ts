/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class JuBaoPIt extends fairygui.GComponent {
	public btn: Button1;
	public pic: fairygui.GImage;
	public lbCondition: fairygui.GRichTextField;
	public n9: fairygui.GList;

	public static URL: string = "ui://fr83a88vm8f81";

	public static createInstance(): JuBaoPIt {
		return <JuBaoPIt><any>(fairygui.UIPackage.createObject("jubaopeng", "JuBaoPIt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.btn = <Button1><any>(this.getChild("btn"));
		this.pic = <fairygui.GImage><any>(this.getChild("pic"));
		this.lbCondition = <fairygui.GRichTextField><any>(this.getChild("lbCondition"));
		this.btn.addClickListener(this.clickhd, this);
		this.n9 = <fairygui.GList><any>(this.getChild("n9"));
		this.n9.callbackThisObj = this;
		this.n9.itemRenderer = this.awardsRender;
	}

	private awards = [];
	private awardsRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.showEff(true);
	}


	private clickhd() {
		GGlobal.modelJBP.CG_GET(this.idx);
	}

	public clean() {
		this.n9.numItems = 0;
	}
	private idx;
	private grids = [];
	public setdata(dta, type, isBuy) {
		let s = this;
		let st = dta[0];
		let index = dta[2];
		s.idx = type * 1000 + index + 1;
		let lib = Config.jbp_718[s.idx];
		s.pic.visible = st == 2;
		s.btn.visible = st != 2;
		s.btn.enabled = st == 1 && isBuy;
		s.btn.checkNotice = st == 1 && isBuy;
		let str;
		let arr = JSON.parse(lib.NEED);
		switch (type) {
			case 1:
				str = GGlobal.modelJBP.day + "/" + arr[1] + "天"
				break;
			case 2:
				str = GGlobal.modelGuanQia.curGuanQiaLv + "/" + arr[1] + "关"
				break;
			case 3:
				// str = Model_player.voMine.level + "/" + arr[1] + "级"
				str = Model_LunHui.realLv + "/" + arr[1] + "级"
				break;
			case 4:
				str = Model_player.voMine.str + "/" + arr[1];
				break;
		}
		if (st == 1 || st == 2) {
			s.lbCondition.text = lib.SEC + "<font color='#15f234'>(" + str + ")</font>";
		} else {
			s.lbCondition.text = lib.SEC + "<font color='#ed1414'>(" + str + ")</font>";
		}
		s.awards = ConfigHelp.makeItemListArr(JSON.parse(lib.AWARD));
		s.n9.numItems = s.awards.length;
	}
}