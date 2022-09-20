class VMaidGrid extends fairygui.GButton {

	public selectImg: fairygui.GImage;
	public labName: fairygui.GRichTextField;
	public imgIcon: fairygui.GLoader;
	public maskBg: fairygui.GImage;
	public bg: fairygui.GLoader;
	public starLb: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;
	public noticeImg: fairygui.GImage;
	public imgUse: fairygui.GImage;

	public static URL: string = "ui://qqn3a7vx137v6c";

	public static createInstance(): VMaidGrid {
		return <VMaidGrid><any>(fairygui.UIPackage.createObject("homeMaid", "VMaidGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	private _vo: Vo_HomeMaid;
	public setVo(v: Vo_HomeMaid, c1) {
		let s = this;
		s._vo = v;
		s.labName.text = HtmlUtil.fontNoSize(v.name, Color.getColorStr(v.quality));
		IconUtil.setImg(s.imgIcon, Enum_Path.ICON70_URL + v.cfg.touxiang + ".png");
		IconUtil.setImg(s.bg, Enum_Path.ICON70_URL + "BmG_" + v.quality + ".png"); 
		s.starLb.text = v.star + "";
		s.starGroup.visible = v.star > 0;
		s.maskBg.visible = !v.isAct;
		s.imgUse.visible = (v.id == GGlobal.model_HomeMaid.useId);
		//红点
		s.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_MAID, v.id * 10 + c1);
	}

	public get vo() {
		return this._vo;
	}

	public clean() {
		let s = this;
		IconUtil.setImg(s.bg, null);
		IconUtil.setImg(s.imgIcon, null);
	}

	private _checkNotice: boolean = false;
	public set checkNotice(value: boolean) {
		this._checkNotice = value;
		this.noticeImg.visible = value;
	}

	public get checkNotice(): boolean {
		return this._checkNotice;
	}
}