class VLingLongItem extends fairygui.GComponent {

	public item: ViewGrid;
	public img: fairygui.GImage;

	public static URL: string = "ui://1xperbsykaqa1";

	public static createInstance(): VLingLongItem {
		return <VLingLongItem><any>(fairygui.UIPackage.createObject("lingLong", "VLingLongItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.item = <ViewGrid><any>(this.getChild("item"));
		this.img = <fairygui.GImage><any>(this.getChild("img"));
		this.item.isShowEff = true;
		this.item.tipEnabled = true;
	}

	public set vo(v: IGridImpl) {
		this.item.vo = v;
	}

	public set index(i) {
		this.img.visible = (i % 2 == 0)
	}
}