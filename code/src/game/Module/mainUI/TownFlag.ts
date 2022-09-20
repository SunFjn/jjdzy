class TownFlag extends fairygui.GButton {

	public noticeImg:fairygui.GImage;

	public static URL:string = "ui://p8pwr887qt181c";

	public static createInstance():TownFlag {
		return <TownFlag><any>(fairygui.UIPackage.createObject("MainTown","TownFlag"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
	}

	private _checkNotice: boolean = false;
	public set checkNotice(value: boolean) {
		this.noticeImg.visible = value;
		this._checkNotice = value;
	}

	public get checkNotice(): boolean {
		return this._checkNotice;
	}
}