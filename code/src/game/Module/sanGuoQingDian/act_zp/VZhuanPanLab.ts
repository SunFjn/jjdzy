class VZhuanPanLab extends fairygui.GComponent {

	public lab:fairygui.GRichTextField;

	public static URL:string = "ui://kdt501v2xx4116";

	public static createInstance():VZhuanPanLab {
		return <VZhuanPanLab><any>(fairygui.UIPackage.createObject("sanGuoQingDian","VZhuanPanLab"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lab = <fairygui.GRichTextField><any>(this.getChild("lab"));
	}

	public set vo(v: { na: string, id: number, ct: number }){
		let vc = Config.daoju_204[v.id];
		this.lab.text = v.na + "抽中了" + "[color=" + Color.getColorStr(vc.quality) + "]" + vc.name + "[/color]" + "*" + v.ct;
	}
}