class EasyButton extends fairygui.GComponent {

	public btn: fairygui.GButton;
	public iconTip: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emhfx72m";

	public static createInstance(): EasyButton {
		return <EasyButton><any>(fairygui.UIPackage.createObject("common", "EasyButton"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.btn = <fairygui.GButton><any>(this.getChild("btn"));
		this.iconTip = <fairygui.GImage><any>(this.getChild("iconTip"));

		this.iconTip.visible = false;
	}

	public setNoticeVis(v:boolean):void {
		this.iconTip.visible = v;
	}

	protected _iconDisable:any;
	public set iconDisable(value:any) {
		if(value == this._iconDisable) {
			return;
		}
		this._iconDisable = value;
	}
	public get iconDisable() {
		return this._iconDisable;
	}

	/**按钮文字 */
	public set label(value: any) {
		this.btn.text = value;
	}

	public get label() {
		return this.btn.text;
	}

	protected _enabled:boolean = true;
	public set enabled(value:boolean) {
		if(this._enabled == value) {
			return;
		}
		this._enabled = value;
	}

	public get enabled() {
		return this._enabled;
	}
}