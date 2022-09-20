class VHeChengTab extends fairygui.GButton {

	public selectImg: fairygui.GImage;
	public grid: ViewGrid;
	public maskBg: fairygui.GImage;
	public labName: fairygui.GRichTextField;

	public static URL: string = "ui://ny9kb4yznflug";

	public static createInstance(): VHeChengTab {
		return <VHeChengTab><any>(fairygui.UIPackage.createObject("rongLian", "VHeChengTab"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.selectImg = <fairygui.GImage><any>(this.getChild("selectImg"));
		this.grid = <ViewGrid><any>(this.getChild("grid"));
		this.maskBg = <fairygui.GImage><any>(this.getChild("maskBg"));
		this.labName = <fairygui.GRichTextField><any>(this.getChild("labName"));
		this.maskBg.visible = false;
	}

	private _vo
	public set vo(v) {
		this._vo = v;

		this.grid.tipEnabled = false;
		this.grid.isShowEff = true;
		let item = Model_RongLian.getHCItem(v);
		this.grid.vo = item
		this.labName.text = item.name;
		this.labName.color = Color.getColorInt(item.quality);
		this.grid.checkNotice = Model_RongLian.checkHeChengVo(v)
	}

	public get vo() {
		return this._vo;
	}
}