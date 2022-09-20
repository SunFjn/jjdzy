/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class QunYingBIt extends fairygui.GComponent {

	public lbName: fairygui.GRichTextField;
	public imgRank: fairygui.GLoader;
	public lbRank: fairygui.GRichTextField;
	public n8: fairygui.GList;

	public static URL: string = "ui://pxel4rmbwzou1";

	public static createInstance(): QunYingBIt {
		return <QunYingBIt><any>(fairygui.UIPackage.createObject("qunyingbang", "QunYingBIt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.lbName = <fairygui.GRichTextField><any>(s.getChild("lbName"));
		s.imgRank = <fairygui.GLoader><any>(s.getChild("imgRank"));
		s.lbRank = <fairygui.GRichTextField><any>(s.getChild("lbRank"));
		s.n8 = <fairygui.GList><any>(s.getChild("n8"));
		s.n8.callbackThisObj = s;
		s.n8.itemRenderer = s.awardsRender;
	}

	private awards = [];
	private awardsRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.showEff(true);
	}

	public clean() {
		this.n8.numItems = 0;
	}

	public setdata(dta) {
		let s = this;
		s.lbName.text = dta[2] + "\n积分：" + dta[3];

		if (dta[0] < 4) {
			s.imgRank.visible = true;
			s.lbRank.visible = false;
			s.imgRank.url = CommonManager.getCommonUrl("rank_" + dta[0]);
		} else {
			s.lbRank.visible = true;
			s.lbRank.text = "第" + dta[0] + "名";
			s.imgRank.visible = false;
		}

		let d = GGlobal.model_QunYingBang.day;
		let award = Model_QunYingBang.getLibByID(dta[0]);
		award = JSON.parse(award["reward" + d]);
		s.awards = ConfigHelp.makeItemListArr(award);
		s.n8.numItems = s.awards.length;
	}
}