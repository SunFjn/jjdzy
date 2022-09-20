class VHorseGrid extends fairygui.GButton {

	//>>>>start
	public selectImg: fairygui.GImage;
	public labName: fairygui.GRichTextField;
	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public starLb: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;
	public maskBg: fairygui.GImage;
	public boxBattle: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	//>>>>end

	public static URL: string = "ui://7shc3kzdwa9jc";

	public static createInstance(): VHorseGrid {
		return <VHorseGrid><any>(fairygui.UIPackage.createObject("horse", "VHorseGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s)
	}


	private _vo:Vo_Horse;
	public setVo(v: Vo_Horse, c1) {
		let s = this;
		s._vo = v;

		s.labName.text = HtmlUtil.fontNoSize(v.cfg.name, Color.getColorStr(v.quality));
		IconUtil.setImg(s.imgIcon, Enum_Path.ICON70_URL + v.cfg.icon + ".png");
		IconUtil.setImg(s.bg, Enum_Path.ICON70_URL + "BmG_" + v.quality + ".png");
		s.starLb.text = v.star + "";
		s.starGroup.visible = v.star > 0;
		s.maskBg.visible = !v.isAct;
		s.boxBattle.visible = (v.id == GGlobal.model_Horse.rideId);
		//红点
		s.checkNotice = GGlobal.reddot.checkCondition(UIConst.HORSE, v.id * 10 + c1);
	}

	public get vo() {
		return this._vo;
	}

	public clean() {
		super.clean();
		IconUtil.setImg(this.imgIcon, null);
		IconUtil.setImg(this.bg, null);
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