class XingTuTab extends fairygui.GButton {

	public selectImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public maskImg: fairygui.GImage;
	public levelLb: fairygui.GRichTextField;

	public static URL: string = "ui://c7onhgk8t2re11";

	public static createInstance(): XingTuTab {
		return <XingTuTab><any>(fairygui.UIPackage.createObject("Skill", "XingTuTab"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		CommonManager.parseChildren(a, a);
	}

	public vo: any;
	public setVo(value: any) {
		let a = this;
		a.vo = value;
		if (value) {
			let xingtuID = Model_XingTu.xingtuIDArr[value.type - 1];
			let level: number = Math.floor(xingtuID % 100000 / 100);
			a.levelLb.text = level + "阶";
			IconUtil.setImg(a._iconObject.asLoader, Enum_Path.IMAGE_URL + "xingtu/icon" + value.type + ".png");
			a.icon = CommonManager.getUrl("Skill", "icon" + value.type);
			a.maskImg.visible = xingtuID % 100 == 0 && level == 0;
		}
	}

	private check: boolean = false;
	public set checkNotice(value: boolean) {
		this.noticeImg.visible = value;
		this.check = value;
	}

	public get checkNotice(): boolean {
		return this.check;
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self._iconObject.asLoader, null);
	}
}