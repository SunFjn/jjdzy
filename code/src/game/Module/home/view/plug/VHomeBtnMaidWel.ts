class VHomeBtnMaidWel extends fairygui.GLabel {

	public imgBg: fairygui.GImage;

	public static URL: string = "ui://y0plc878q29p25";

	public static createInstance(): VHomeBtnMaidWel {
		return <VHomeBtnMaidWel><any>(fairygui.UIPackage.createObject("home", "VHomeBtnMaidWel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgBg = <fairygui.GImage><any>(this.getChild("imgBg"));

		this.getTextField().addEventListener(fairygui.GObject.SIZE_CHANGED, this.cgeTxt, this);
	}

	// public setText(v) {
	// 	this.text = v;
	// }

	private cgeTxt() {
		let t = this.getTextField()
		this.imgBg.height = t.y + t.height + 20;
	}
}