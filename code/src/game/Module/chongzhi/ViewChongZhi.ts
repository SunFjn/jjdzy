/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewChongZhi extends UIPanelBase {
	public frame: frame3;
	public czBg: fairygui.GLoader;
	public VipBar: fairygui.GProgressBar;
	public lbVip: fairygui.GRichTextField;
	public lbPro: fairygui.GRichTextField;
	public vip: fairygui.GButton;
	public lst: fairygui.GList;
	public static URL: string = "ui://42zxp7qjq5ux0";

	public constructor() {
		super();
		this.setSkin("chongzhi", "chongzhi_atlas0", "ViewChongZhi");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(ChongZhiItem.URL, ChongZhiItem);
		fairygui.UIObjectFactory.setPackageItemExtension(ItemChongZhi.URL, ItemChongZhi);
		// fairygui.UIObjectFactory.setPackageItemExtension(TeQuanCardIt.URL, TeQuanCardIt);
	}
	protected initView(): void {
		super.initView();
		const self = this;
		self.lst.callbackThisObj = self;
		self.lst.itemRenderer = self.render;
		self.frame.setTitle("ui://42zxp7qjr6t614");
		GGlobal.modelchongzhi.normalMul = Config.xtcs_004[3701].num;
	}
	private displayList() {
		if (!this.dta) {
			const lib = Config.chongzhi_716;
			var arr = [];
			for (let key in lib) {
				arr.push(lib[key]);
			}
			this.lst.numItems = (this.dta = arr).length;
		} else {
			this.lst.numItems = this.dta.length;
		}
	}
	private render(index, item: ItemChongZhi) {
		item.setdata(this.dta[index], index);
	}

	private dta: any[];
	private onUpdate() {
		this.displayList();
		this.update();
		// let m = GGlobal.modelchongzhi;
		// let d = m.data;
		// if (d) {
		// 	this.dta = d;
		// 	this.lst.numItems = d.length;
		// }
	}
	private update() {
		let v = GGlobal.modelvip;
		var vip = v.vip + 1;
		let lib = Config.VIP_710[vip];
		this.VipBar.max = lib.MONEY;
		this.VipBar.value = v.exp;
		this.lbVip.text = "VIP" + v.vip;
		if (Config.VIP_710[vip + 1]) {
			var lb = Config.VIP_710[vip + 1];
			var money = lb.MONEY - v.exp
			this.VipBar.max = lb.MONEY;
			this.lbPro.text = "再充值" + money + "元就可以升级到VIP" + (vip);
		} else {
			this.lbPro.text = "您已经是秒杀全服的顶级VIP大佬";
		}
	}

	private openVIP() {
		GGlobal.layerMgr.open(UIConst.VIP);
	}

	protected onShown() {
		let s = this;
		GGlobal.modelchongzhi.CG_OPENCHONGZHI_137();
		GGlobal.control.listen(Enum_MsgType.CHONGZHIOPEN, s.onUpdate, s);
		this.vip.addClickListener(this.openVIP, this);
		IconUtil.setImg(s.czBg, Enum_Path.BACK_URL + "czBg.jpg");
	}

	protected onHide() {
		let s = this;
		s.lst.numItems = 0;
		s.vip.removeClickListener(s.openVIP, s);
		GGlobal.control.remove(Enum_MsgType.CHONGZHIOPEN, s.onUpdate, s);
		IconUtil.setImg(s.czBg, null);
		GGlobal.layerMgr.close(UIConst.CHONGZHI);
	}
	public static tryToOpenCZ() {
		if(GGlobal.modelRecharge.getHasSC()){
			GGlobal.layerMgr.open(UIConst.CHONGZHI);
		}else{
			GGlobal.layerMgr.open(UIConst.SHOUCHONG);
		}
	}
}