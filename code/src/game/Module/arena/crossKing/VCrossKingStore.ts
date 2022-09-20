class VCrossKingStore extends fairygui.GComponent {

	public grid:ViewGrid;
	public buyBt:fairygui.GButton;
	public typeImg0:fairygui.GLoader;
	public buyImg:fairygui.GImage;
	public nameLb:fairygui.GRichTextField;
	public dataLb:fairygui.GRichTextField;
	public promptLb:fairygui.GRichTextField;

	public static URL:string = "ui://me1skowlhfct43";

	public static createInstance():VCrossKingStore {
		return <VCrossKingStore><any>(fairygui.UIPackage.createObject("crossKing","VCrossKingStore"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.grid = <ViewGrid><any>(this.getChild("grid"));
		this.buyBt = <fairygui.GButton><any>(this.getChild("buyBt"));
		this.typeImg0 = <fairygui.GLoader><any>(this.getChild("typeImg0"));
		this.buyImg = <fairygui.GImage><any>(this.getChild("buyImg"));
		this.nameLb = <fairygui.GRichTextField><any>(this.getChild("nameLb"));
		this.dataLb = <fairygui.GRichTextField><any>(this.getChild("dataLb"));
		this.promptLb = <fairygui.GRichTextField><any>(this.getChild("promptLb"));

		this.buyBt.addClickListener(this.onBuyItem, this);
	}

	private _vo:any;
	private _curr:Vo_Currency;
	public set vo(v){
		this._vo = v;
		let cfg = Config.lsxxstore_232[v.id]
		
		let storeArr = ConfigHelp.SplitStr(cfg.store)
		let item = ConfigHelp.makeItem(storeArr[0]);
		this.grid.tipEnabled = true;
		this.grid.isShowEff = true;
		this.grid.vo = item;
		this.nameLb.text = item.name;
		this.nameLb.color = Color.getColorInt(item.quality);

		let priceArr = ConfigHelp.SplitStr(cfg.price)
		this._curr = Vo_Currency.create(priceArr[0][0]);
		this._curr.count = priceArr[0][2]
		this.dataLb.text = "价格：      " + priceArr[0][2];
		this.typeImg0.url = CommonManager.getMoneyUrl(Number(priceArr[0][0]));

		if(this._vo.status == 0){//不可购买
			this.buyBt.visible = this.buyBt.touchable = false
			this.promptLb.text = cfg.tips
			this.buyImg.visible = false;
		}else if(this._vo.status == 1){//可购买
			this.buyBt.visible = this.buyBt.touchable = true;
			this.promptLb.text = ""
			this.buyImg.visible = false;
		}else if(this._vo.status == 2){//已购买
			this.buyBt.visible = this.buyBt.touchable = false;
			this.promptLb.text = ""
			this.buyImg.visible = true;
		}
	}

	private onBuyItem(){
		if(this._vo.status == 0){
			ViewCommonWarn.text("条件不足");
			return;
		}
		if(Model_player.getCurrencyCount(this._curr.gType) < this._curr.count){
			ViewCommonWarn.text(this._curr.name + "不足");
			return;
		}
		GGlobal.modelCrossKing.CG_BUY_ITEM(this._vo.id);
	}
}