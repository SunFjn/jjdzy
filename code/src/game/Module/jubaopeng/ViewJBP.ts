/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewJBP extends UIPanelBase {
	public frame: frame4;
	public pic: fairygui.GLoader;
	public lst: fairygui.GList;
	public lbCondition: fairygui.GRichTextField;
	public btn: Button1;
	public g0: fairygui.GGroup;
	public lbDesc: fairygui.GRichTextField;
	public timegroup: fairygui.GGroup;
	public t0: ComActivityTab;
	public t1: ComActivityTab;
	public t2: ComActivityTab;
	public t3: ComActivityTab;
	public c1: fairygui.Controller;

	public static URL: string = "ui://fr83a88vs8ql0";

	public constructor() {
		super();
		this.setSkin("jubaopeng", "jubaopeng_atlas0", "ViewJBP");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(JuBaoPIt.URL, JuBaoPIt);
	}
	tabArr;
	protected initView(): void {
		super.initView();
		let s = this;
		s.tabArr = [s.t0, s.t1, s.t3, s.t2];
		s.lst.callbackThisObj = s;
		s.lst.itemRenderer = s.itemRender;
		s.lst.setVirtual();
		s.frame.icon = "ui://fr83a88vcct45";
	}

	private itemRender(i, obj) {
		let item: JuBaoPIt = obj as JuBaoPIt;
		let type = this.c1.selectedIndex + 1;
		item.setdata(this.lstDta[i], type, this.isBuy);
	}

	private buyHandler() {
		let type = this.c1.selectedIndex + 1;
		let lib = Config.jbpbuy_718[type];
		let money = lib.COIN;
		let vip = lib.VIP;
		if (GGlobal.modelvip.vip < vip) {
			ViewCommonWarn.text("VIP等级不足");
			return;
		}
		const self = this;
		let na = "<font color='#FF00FF'>" + lib.name + "</font>";
		if (self.c1.selectedIndex >= 2) {
			let cfg1 = Config.shop_011[lib.cz];
			let rmb = cfg1.rmb;
			na = "是否花费<font color='#ffc334'>" + rmb/100 + "元</font>购买" + na + "？";
			GGlobal.modelchongzhi.CG_CHONGZHI_135(lib.cz, na);
			return;
		}
		na = "是否花费<font color='#ffc334'>" + money + "元宝</font>购买" + na + "？";
		ViewAlert.show(na, Handler.create(this, this.buyHd), ViewAlert.OKANDCANCEL);
	}

	private buyHd() {
		let type = this.c1.selectedIndex + 1;
		let lib = Config.jbpbuy_718[type];
		let money = lib.COIN;
		if (Model_player.voMine.yuanbao < money) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		GGlobal.modelJBP.CG_BUY(type);
	}

	private isBuy;
	private lstDta; s
	private update() {
		let s = this;
		let type = s.c1.selectedIndex + 1;
		let m = GGlobal.modelJBP;
		if (!m.actDta) return;
		s.isBuy = m.packDta.indexOf(type) >= 0;

		s.g0.visible = !s.isBuy;
		let lib = Config.jbpbuy_718[type];
		s.lbCondition.text = "VIP" + lib.VIP + "可购买";
		s.lbCondition.color = GGlobal.modelvip.vip < lib.VIP ? Color.REDINT : Color.GREENINT;

		let myvip = Model_player.voMine.viplv;
		let cfg = Config.jbpbuy_718[type];
		let vip = cfg.VIP;
		s.btn.checkNotice = myvip >= vip;

		s.lstDta = m.actDta[type - 1];
		s.lst.numItems = s.lstDta.length;
		IconUtil.setImg(s.pic, Enum_Path.BACK_URL + lib.PICTURE + ".jpg");
		s.check();
	}

	private check() {
		const self = this;
		let s = GGlobal.modelJBP;
		if (!s.red) return;
		for (let i in s.red) {
			if (s.red[i] == true) {
				self.tabArr[i].checkNotice = true;
			} else {
				self.tabArr[i].checkNotice = false;
			}
		}
	}

	private onTabHandler() {
		const self = this;
		self.btn.text = ["购买", "购买", "648元", "198元"][self.c1.selectedIndex];
		self.lst.scrollToView(0);
		self.update();
	}

	protected onShown() {
		let s = this;
		const self = this;
		s.c1.selectedIndex = 0;
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.onTabHandler, s)

		self.btn.text = ["购买", "购买", "198元", "648元"][s.c1.selectedIndex];
		GGlobal.modelJBP.CG_OPEN();
		GGlobal.control.listen(Enum_MsgType.JUBAOPENG, s.update, s);
		s.btn.addClickListener(s.buyHandler, s);
	}

	protected onHide() {
		let s = this;
		s.lst.numItems = 0;
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGE, s.onTabHandler, s)
		IconUtil.setImg(s.pic, null);
		s.btn.removeClickListener(s.buyHandler, s);
		GGlobal.control.remove(Enum_MsgType.JUBAOPENG, s.update, s);
		GGlobal.layerMgr.close(UIConst.JUBAOPENG);
	}
}