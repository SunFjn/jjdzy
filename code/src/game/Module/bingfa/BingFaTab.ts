/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class BingFaTab extends fairygui.GComponent {

	public btn: Button3;

	public static URL: string = "ui://n52wd4d0fgxb6";

	public static createInstance(): BingFaTab {
		return <BingFaTab><any>(fairygui.UIPackage.createObject("bingfa", "BingFaTab"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.btn = <Button3><any>(this.getChild("btn"));
	}

	private _sf: boolean = false;
	setChose(val) {
		this._sf = val;
		this.btn.selected = val;
	}

	_suit: VoBingFaSuit;
	setSuit(val: VoBingFaSuit, idx) {
		this._suit = val;
		var m = GGlobal.modelBingFa;
		this.btn.text = val.name;
		this.btn.checkNotice = val.isNotice();
		this.setChose(idx==this.sindex);
	}

	get suit() {
		return this._suit;
	}

	public sindex:number = 0;
}