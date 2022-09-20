class ChaoZhiFLTab extends fairygui.GButton {

	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://qzsojhcru5imc";

	public static createInstance(): ChaoZhiFLTab {
		return <ChaoZhiFLTab><any>(fairygui.UIPackage.createObject("chaozhifanli", "ChaoZhiFLTab"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
	}
	private _data: Vo_Activity;
	public set data(value: Vo_Activity) {
		this._data = value;
		this.setIcon();
		this.checkNotice();
	}
	public get data() {
		return this._data;
	}
	public setIcon() {
		const id = this._data.id;
		let icon = Config.xitong_001[id].icon;
		if (id == UIConst.DISCOUNT_SHOP || id == UIConst.DISCOUNT_SHOP1) {
			icon = "4605_1";
		}
		IconUtil.setImg(this._iconObject.asLoader, Enum_Path.MAINUI_URL + icon + ".png");
	}

	public checkNotice(value: boolean | undefined = undefined) {
		const self = this;
		if (value === undefined) {
			var notice = GGlobal.reddot.checkCondition(self._data.id);
			this.noticeImg.visible = notice;
		} else {
			this.noticeImg.visible = value;
		}
	}
}