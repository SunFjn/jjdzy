class ItemLiuYiKaoShi extends fairygui.GComponent {

	public img: fairygui.GLoader;
	public lbPass: fairygui.GRichTextField;
	public btn: Button1;
	public lbLv: fairygui.GRichTextField;
	public lbGai: fairygui.GRichTextField;
	public lbIt: fairygui.GRichTextField;
	public view0: fairygui.GGroup;

	public static URL: string = "ui://p83wyb2bad1l20";

	public static createInstance(): ItemLiuYiKaoShi {
		return <ItemLiuYiKaoShi><any>(fairygui.UIPackage.createObject("ShaoZhu", "ItemLiuYiKaoShi"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.btn.addClickListener(s.onClick, s);
	}

	private _lyVo: Vo_LiuYi_LY
	private _xtVo: Vo_LiuYi
	public setVo(lyVo: Vo_LiuYi_LY, xtVo: Vo_LiuYi) {
		let s = this;
		s._lyVo = lyVo
		s._xtVo = xtVo
		s.lbLv.text = "Lv." + lyVo.lyLv
		s.lbGai.text = "合格概率：" + lyVo.ks / 1000 + "%"
		IconUtil.setImg(s.img, Enum_Path.SHAOZHU_URL + lyVo.lyId + "s.png");
		let xtCfg = xtVo.cfg
		s.itRes = ConfigHelp.makeItemListArr(JSON.parse(xtCfg.consume))[0] as VoItem;
		let ct = Model_Bag.getItemCount(s.itRes.id);
		
		s.lbIt.text = HtmlUtil.fontNoSize(s.itRes.name + "：", Color.getColorStr(s.itRes.quality)) + HtmlUtil.fontNoSize(ConfigHelp.numToStr(ct) + "/" + s.itRes.count, ct >= s.itRes.count ? Color.GREENSTR : Color.REDSTR);
		s.view0.visible = lyVo.st == 0
		s.lbPass.visible = lyVo.st == 1
		s.btn.checkNotice = (ct >= s.itRes.count)
	}
	private itRes: VoItem
	private onClick() {
		let s = this;
		if (!s.btn.checkNotice) {
			View_CaiLiao_GetPanel.show(s.itRes)
			return;
		}
		GGlobal.model_LiuYi.CG_KAOSHI_5131(s._xtVo.szId, s._lyVo.lyId)
	}

	public clean() {
		super.clean();
		IconUtil.setImg(this.img, null);
	}
}