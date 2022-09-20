/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class MRBox extends fairygui.GComponent {

	public grid: ViewGrid;
	public img: fairygui.GImage;
	public imgNotice: fairygui.GImage;

	public static URL: string = "ui://zzz8io3ro5122";

	public static createInstance(): MRBox {
		return <MRBox><any>(fairygui.UIPackage.createObject("shouchong", "MRBox"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.grid = <ViewGrid><any>(this.getChild("grid"));
		this.img = <fairygui.GImage><any>(this.getChild("img"));
		this.imgNotice = <fairygui.GImage><any>(this.getChild("imgNotice"));
		this.addClickListener(this.clickHandler, this);
	}

	private clickHandler() {
		GGlobal.layerMgr.open(UIConst.MRSCBOX, this.ids);
	}

	public ids: number = 0;
	private _st: number = 0;
	public setSt(st) {
		this._st = st;
		this.img.visible = this._st == 2;
		this.imgNotice.visible = this._st == 1;
		let count = 0;
		let lib = Config.mrbx_715[this.ids];
		let award = JSON.parse(lib.AWARD);
		let arr1 = ConfigHelp.makeItemListArr(award);
		let vo = arr1[0];
		this.grid.vo = vo;
	}
}