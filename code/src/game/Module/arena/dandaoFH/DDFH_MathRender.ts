class DDFH_MathRender extends fairygui.GComponent {

	public headIcon: fairygui.GLoader;
	public nameLb: fairygui.GRichTextField;

	public static URL: string = "ui://me1skowlr4ogh";

	public static createInstance(): DDFH_MathRender {
		return <DDFH_MathRender><any>(fairygui.UIPackage.createObject("Arena", "DDFH_MathRender"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.headIcon = <fairygui.GLoader><any>(this.getChild("headIcon"));
		this.nameLb = <fairygui.GRichTextField><any>(this.getChild("nameLb"));
		this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}
	private onRemove() {
		IconUtil.setImg(this.headIcon, null);
	}

	public show(headId: number, frameId: number, namestr?: string): void {
		let a = this;
		var headPic = Config.shezhi_707[headId];
		var framePic = Config.shezhi_707[frameId];
		// ImageLoader.instance.loader(Enum_Path.HEAD_URL + headPic.picture + ".png", a.headIcon);
		IconUtil.setImg(a.headIcon, Enum_Path.HEAD_URL + headPic.picture + ".png");
		if (namestr) {
			this.nameLb.visible = true;
			this.nameLb.text = namestr;
		} else {
			this.nameLb.visible = false;
		}
	}
}