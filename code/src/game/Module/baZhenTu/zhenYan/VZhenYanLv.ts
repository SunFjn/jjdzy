class VZhenYanLv extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://xrzn9ppaihg124";

	public static createInstance(): VZhenYanLv {
		return <VZhenYanLv><any>(fairygui.UIPackage.createObject("baZhenTu", "VZhenYanLv"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgBg = <fairygui.GLoader><any>(this.getChild("imgBg"));
		this.lb = <fairygui.GRichTextField><any>(this.getChild("lb"));
	}

	public set vo(v) {
		this.lb.text = v + "级"
	}
}