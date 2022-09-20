/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemZZmiBao extends fairygui.GComponent {

	public grid: ViewGrid;
	public lbRemaind: fairygui.GRichTextField;
	public imgBig: fairygui.GImage;

	public static URL: string = "ui://swuqw468x9uy1";

	public static createInstance(): ItemZZmiBao {
		return <ItemZZmiBao><any>(fairygui.UIPackage.createObject("zhizhunmibao", "ItemZZmiBao"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	public clean() {
		this.grid.vo = null;
	}

	public setdata(data, showEffect?) {
		const self = this;
		self.grid.isShowEff = true;
		self.grid.vo = ConfigHelp.makeItem([data[1], data[2], data[3]]);
		self.grid.tipEnabled = true;
		self.lbRemaind.text = "剩余份数：" + data[4];
		self.lbRemaind.color = data[4] == 0 ? Color.REDINT : Color.GREENINT;
		self.imgBig.visible = data[5];


		if (showEffect) {
			let grid = self.grid;
			EffectMgr.addEff("uieff/10092", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
		}
	}
}