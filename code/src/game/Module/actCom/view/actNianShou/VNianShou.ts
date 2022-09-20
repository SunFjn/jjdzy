class VNianShou extends fairygui.GButton {

	public img: fairygui.GLoader;
	public imgPz: fairygui.GLoader;

	public static URL: string = "ui://ht2966i4plkmg";

	public static createInstance(): VNianShou {
		return <VNianShou><any>(fairygui.UIPackage.createObject("actComNianShou", "VNianShou"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public setImg(pz) {
		let s = this;
		IconUtil.setImg(s.img, Enum_Path.IMAGE_URL + "actCom/nianshou/ns.png");
		IconUtil.setImg(s.imgPz, Enum_Path.IMAGE_URL + "actCom/nianshou/" + pz + ".png");
	}

	public clean() {
		super.clean();
		let s = this;
		IconUtil.setImg(s.img, null);
		IconUtil.setImg(s.imgPz, null);
	}
}