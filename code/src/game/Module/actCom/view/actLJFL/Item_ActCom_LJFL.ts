class Item_ActCom_LJFL extends fairygui.GComponent {

	public lbLi: fairygui.GRichTextField;
	public lbFan: fairygui.GRichTextField;
	public grid: ViewGrid;
	public lbTitle: fairygui.GRichTextField;
	public btnGet: Button1;
	public btnGo: fairygui.GButton;
	public imgHas: fairygui.GImage;

	public static URL: string = "ui://y35rlqhydufs6";

	public static createInstance(): Item_ActCom_LJFL {
		return <Item_ActCom_LJFL><any>(fairygui.UIPackage.createObject("actCom_LJFL", "Item_ActCom_LJFL"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
		s.btnGo.addClickListener(s.onGo, s);
		s.btnGet.addClickListener(s.onGet, s);
	}

	private _vo: { id: number, lj: number, st: number, cfg: Iljfl_772 }
	private _flag
	public setVo(v: { id: number, lj: number, st: number, cfg: Iljfl_772 }, flag: boolean) {
		let s = this;
		s._vo = v
		s._flag = flag
		let rmb = Config.shop_011[v.id].RMB
		s.lbTitle.text = "单笔充值<font color='#F5CA0C'>" + rmb + "</font>元"
		// let lj = v.lj > v.cfg.sx ? v.cfg.sx : v.lj
		// s.lbLi.text = lj + "% / " + v.cfg.sx + "%"
		s.lbLi.text = v.lj + "%"
		// s.lb.text = v.lj + "天后充值可激活"
		s.grid.tipEnabled = s.grid.isShowEff = true;
		let cy = Vo_Currency.create(Enum_Attr.yuanBao)
		cy.count = rmb * v.lj
		s.grid.vo = cy
		s.grid.showText = cy.count + ""
		v.st = 0
		if (v.st == 2) {
			s.imgHas.visible = true;
			s.btnGo.visible = false;
			s.btnGet.visible = false;
		} else if (v.st == 1) {
			s.imgHas.visible = false;
			s.btnGo.visible = false;
			s.btnGet.visible = s.btnGet.checkNotice = true;
		} else {
			s.imgHas.visible = false;
			s.btnGo.visible = true;
			s.btnGet.visible = false;
		}
	}

	private onGo() {
		let s = this;
		if (!s._flag) {
			ViewCommonWarn.text("未到充值时间")
			return;
		}
		if (!s._vo) {
			return;
		}
		// ViewChongZhi.tryToOpenCZ();
		GGlobal.modelchongzhi.CG_CHONGZHI_135(s._vo.id, null, false);
	}

	private onGet() {
		let s = this;
		if (!s._vo) return;
		GGlobal.model_ActLJFL.CG_GET_10751(s._vo.id)
	}

	public clean() {
		let s = this;
		s.grid.clean()
	}
}