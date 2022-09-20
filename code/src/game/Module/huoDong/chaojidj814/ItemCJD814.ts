/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemCJD814 extends fairygui.GComponent {

	public n0: ViewGrid;
	public ylq: fairygui.GImage;

	public static URL: string = "ui://vrw7je9rs56p11";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <ViewGrid><any>(this.getChild("n0"));
		this.ylq = <fairygui.GImage><any>(this.getChild("ylq"));
	}

	public clean() {
		this.n0.tipEnabled = false;
		this.n0.showEff(false);
	}

	public setdata(dta) {
		let idx = dta[0];
		let vo = dta[1];
		let showYLQ = false;
		let arr = GGlobal.modelHuoD814.CJDJ_data;
		if (arr) {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i][2] == vo.id) {
					showYLQ = true;
					break;
				}
			}
		}
		let maxNum = GGlobal.modelHuoD814.CJDJ_hasGet;
		this.n0.vo = vo;
		this.n0.tipEnabled = true;
		this.n0.showEff(true);
		this.ylq.visible = showYLQ;
	}
}