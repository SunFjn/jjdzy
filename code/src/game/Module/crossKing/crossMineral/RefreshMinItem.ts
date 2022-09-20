/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class RefreshMinItem extends fairygui.GButton {

	public mineIcon: fairygui.GLoader;
	public list: fairygui.GList;
	public nameIcon: fairygui.GLoader;
	public chooseImg: fairygui.GImage;

	public static URL: string = "ui://yqpfulefnyv755";

	public static createInstance(): RefreshMinItem {
		return <RefreshMinItem><any>(fairygui.UIPackage.createObject("crossKing", "RefreshMinItem"));
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

	public setdata(data) {
		let self = this;
		let cfg = Config.kfkz_275[data + 1];
		self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.max1));
		self.list.numItems = this._awards.length;
		IconUtil.setImg(self.mineIcon, Enum_Path.PIC_URL + "k" + cfg.pz + ".png");
		self.nameIcon.url = CommonManager.getUrl("crossKing", "k" + cfg.pz);
	}

	public setChoose(value: boolean) {
		this.chooseImg.visible = value;
	}
}