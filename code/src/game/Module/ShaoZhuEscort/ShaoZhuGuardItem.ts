/**
 * 护卫武将item
 */
class ShaoZhuGuardItem extends fairygui.GComponent{
	public chooseImg: fairygui.GImage;
	public list: fairygui.GList;
	public guardIcon: fairygui.GLoader;
	public nameTxt:fairygui.GRichTextField;

	public static URL: string = "ui://lnw94ki2lnit8";

	public static createInstance(): ShaoZhuGuardItem {
		return <ShaoZhuGuardItem><any>(fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuGuardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = this;
		self.list.itemRenderer = this.itemRender;
		self.chooseImg.visible = false;
	}

	private _awards = [];
	private itemRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._awards[idx];
	}

	public clean() {
		this.list.numItems = 0;
	}

	public setChoose(value: boolean) {
		this.chooseImg.visible = value;
	}

	public setdata(data) {
		let self = this;
		let cfg:Iszhs_401 = Config.szhs_401[data + 1];
		self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = this._awards.length;
		IconUtil.setImg(self.guardIcon, Enum_Path.PIC_URL + "guard" + cfg.id + ".png");
		self.nameTxt.text = HtmlUtil.fontNoSize(cfg.name,Color.getColorStr(cfg.pz));
	}

}