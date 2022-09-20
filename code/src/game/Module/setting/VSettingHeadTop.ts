class VSettingHeadTop extends fairygui.GComponent {

	public viewHead:VSettingHead;
	public imgCountry:fairygui.GLoader;

	public static URL: string = "ui://dt6yws4jejx38";

	public static createInstance(): VSettingHeadTop {
		return <VSettingHeadTop><any>(fairygui.UIPackage.createObject("setting", "VSettingHeadTop"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.viewHead = <VSettingHead><any>(this.getChild("viewHead"));
		this.imgCountry = <fairygui.GLoader><any>(this.getChild("imgCountry"));
	}

	private _vo: any
	public set vo(v) {
		this._vo = v;
		ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.head + ".png", this.viewHead.headIcon);
		ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.frame + ".png", this.viewHead.frameIcon);
	}

	public get vo() {
		return this._vo;
	}

	public showCountry(boo: boolean): void {
		if (Model_player.voMine.country > 0) {
			this.imgCountry.url = CommonManager.getCommonUrl("country" + Model_player.voMine.country)
			this.imgCountry.visible = boo
		}else{
			this.imgCountry.visible = false
		}
	}
}