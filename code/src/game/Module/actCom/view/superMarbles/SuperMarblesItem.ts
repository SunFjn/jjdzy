/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class SuperMarblesItem extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public grid: ViewGrid;
	public buyBt: fairygui.GButton;
	public typeImg0: fairygui.GLoader;
	public buyImg: fairygui.GImage;
	public xianshiImg: fairygui.GImage;
	public lb: fairygui.GRichTextField;
	public lbGroup: fairygui.GGroup;
	public nameLb: fairygui.GRichTextField;
	public dataLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;

	public static URL: string = "ui://gf2tw9lzx9uy3";

	public static createInstance(): SuperMarblesItem {
		return <SuperMarblesItem><any>(fairygui.UIPackage.createObject("superMarbles", "SuperMarblesItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		const self = this;
		CommonManager.parseChildren(self, self);
		self.dataLb.leading = 25;
	}

	private onExchange() {
		const self = this;
		const model = GGlobal.modelSuperMarbles;
		let costArr = ConfigHelp.makeItemListArr(this._vo.consume);
		let count = model.score;
		if (count >= costArr[0].count) {
			model.CG_buy(self._vo.id, 1);
		}else{
			ViewCommonWarn.text("积分不足");
		}
	}

	public clean() {
		const self = this;
		self.grid.vo = null;
		self.buyBt.removeClickListener(self.onExchange, self);
	}

	_vo: Icjdzstore_502;
	update(idx) {
		const self = this;
		const model = GGlobal.modelSuperMarbles;
		self.typeImg0.url = "ui://gf2tw9lz77k97";

		self._vo = model.shopcfg[idx];
		if (self._vo) {
			let max = self._vo.xg;
			let count = model.shopdata[self._vo.id] ? model.shopdata[self._vo.id] : 0;
			let costArr = JSON.parse(self._vo.consume);
			let price = costArr[0][2];
			let color = Color.REDSTR;
			if (max > count) {
				color = Color.GREENSTR;
			}
			self.grid.vo = ConfigHelp.makeItemListArr(self._vo.item)[0];
			self.grid.isShowEff = true;
			self.grid.tipEnabled = true;
			self.nameLb.text = self.grid.vo.name;
			self.nameLb.color = self.grid.vo.qColor;

			self.buyBt.addClickListener(self.onExchange, self);
			self.dataLb.text = "限购：" + HtmlUtil.fontNoSize((max - count) + "/" + max, color) + "\n单价：      " + price;
		}
	}
}