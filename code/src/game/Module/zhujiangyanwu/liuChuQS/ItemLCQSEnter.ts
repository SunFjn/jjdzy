class ItemLCQSEnter extends fairygui.GComponent {

	public imgPic: fairygui.GLoader;
	public imgBg: fairygui.GLoader;
	public btnEnter: fairygui.GButton;
	public imgName: fairygui.GLoader;
	public maskBg: fairygui.GImage;
	public imgNoOpen: fairygui.GImage;

	public static URL: string = "ui://7a366usasr401g";

	public static createInstance(): ItemLCQSEnter {
		return <ItemLCQSEnter><any>(fairygui.UIPackage.createObject("zjyw", "ItemLCQSEnter"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.btnEnter.addClickListener(s.onEnter, s);
	}

	private _vo: Isix_279;
	public set vo(v: Isix_279) {
		let s = this;
		s._vo = v;
		// ImageLoader.instance.loader(Enum_Path.GUAN_QIA_URL + "lcqs" + v.name + ".png", s.imgName);
		// ImageLoader.instance.loader(Enum_Path.GUAN_QIA_URL + "lcqs" + v.icon + ".jpg", s.imgPic);
		
		IconUtil.setImg(s.imgName, Enum_Path.GUAN_QIA_URL + "lcqs" + v.name + ".png");
		IconUtil.setImg(s.imgPic, Enum_Path.GUAN_QIA_URL + "lcqs" + v.icon + ".jpg");
		IconUtil.setImg(s.imgBg, Enum_Path.GUAN_QIA_URL + "lcqsTilBg.png");
		let curGuan = GGlobal.model_LiuChuQS.curGuan
		let tab = Math.floor(v.id / 1000)
		let curTab = Math.floor(curGuan / 1000)
		let isOpen = (curTab >= tab)
		s.maskBg.visible = !isOpen;
		s.btnEnter.visible = isOpen;
		s.imgNoOpen.visible = !isOpen
	}

	public clean() {
		let s = this;
		super.clean()
		IconUtil.setImg(s.imgPic, null);
		IconUtil.setImg(s.imgName, null);
		IconUtil.setImg(s.imgBg, null);
	}

	private onEnter(e:egret.TouchEvent) {
		let index = Math.floor(this._vo.id / 1000);
		GGlobal.layerMgr.open(UIConst.CHILD_LCQS_PANEL, index)
		e.stopImmediatePropagation();
		e.stopPropagation()
	}
}