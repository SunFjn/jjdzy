class VBaZTChip extends fairygui.GLabel {

	public imgDi: fairygui.GImage;

	public static URL: string = "ui://xrzn9ppab5l216";

	public static createInstance(): VBaZTChip {
		return <VBaZTChip><any>(fairygui.UIPackage.createObject("baZhenTu", "VBaZTChip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s)
		this.getTextField().addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize1, this);
	}

	private resize1(): void {
		this.imgDi.width = Math.max(140, this.getTextField().x + this.getTextField().width - 10)
	}
}