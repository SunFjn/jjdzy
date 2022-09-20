class GemBt extends fairygui.GButton {

	public grid: ViewGridRender;
	public addImg: fairygui.GLoader;

	public static URL: string = "ui://pofv8989sv0ga";

	public static createInstance(): GemBt {
		return <GemBt><any>(fairygui.UIPackage.createObject("DuanZao", "GemBt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		a.grid = <ViewGridRender><any>(a.getChild("grid"));
		a.grid.tipEnabled = false;
		a.addImg = <fairygui.GLoader><any>(a.getChild("addImg"));
	}

	public updateShow(stoneId: number): void {
		let a = this;
		if (stoneId > 0) {
			let vo: VoItem = VoItem.create(stoneId);
			a.grid.grid.isShowEff = true;
			a.grid.vo = vo;
			a.addImg.visible = false;
		} else {
			a.addImg.visible = true;
			a.grid.vo = null;
			a.grid.lbNum.visible = false;
		}
	}

	public showText(str) {
		this.grid.lbName.text = str;
		this.grid.lbName.color = Color.getColorInt(1);
	}

	public checkNotice;
	public setCheckNotice(value) {
		this.grid.showNotice = value > 0;
		this.checkNotice = value;
	}
}