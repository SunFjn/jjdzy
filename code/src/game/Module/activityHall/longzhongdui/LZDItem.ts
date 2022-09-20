/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class LZDItem extends fairygui.GComponent {

	public n0: fairygui.GRichTextField;
	public n1: fairygui.GRichTextField;
	public n2: fairygui.GRichTextField;

	public static URL: string = "ui://1xydor24lwyd14";

	public static createInstance(): LZDItem {
		return <LZDItem><any>(fairygui.UIPackage.createObject("activityHall", "LZDItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.n0 = <fairygui.GRichTextField><any>(this.getChild("n0"));
		this.n1 = <fairygui.GRichTextField><any>(this.getChild("n1"));
		this.n2 = <fairygui.GRichTextField><any>(this.getChild("n2"));
	}

	public setdata(idx) {
		let data = GGlobal.modelActivityHall.lzd_rankDta;
			this.n0.text = (idx+1) +"";
		if (data && data.length) {
			let d = data[idx];
			this.n1.text = d[0] + "";
			this.n2.text = d[1] + "分";
		} else {
			this.n1.text = "虚位以待";
			this.n2.text = "0分";
		}
	}
}