class SignGrid extends fairygui.GComponent {

	public drawImg: fairygui.GImage;
	public signImg: fairygui.GImage;
	public grid: ViewGrid;

	public static URL: string = "ui://ye1luhg3r6x41";

	public static createInstance(): SignGrid {
		return <SignGrid><any>(fairygui.UIPackage.createObject("Welfare", "SignGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.drawImg = <fairygui.GImage><any>(this.getChild("drawImg"));
		this.signImg = <fairygui.GImage><any>(this.getChild("signImg"));
		this.grid = <ViewGrid><any>(this.getChild("grid"));
		this.grid.isShowEff = true;
	}

	/**0：签到状态未达到，1：可签到，2：已签到，3：可补签  */
	public state;
	public day;
	public show(vo: IGridImpl, state: number, day) {
		let a = this;
		a.state = state;
		a.day = day;
		a.grid.vo = vo;
		a.signImg.visible = false;
		a.drawImg.visible = false;
		a.grid.checkNotice = false;
		a.grid.tipEnabled = false;
		switch (state) {
			case 0:
				a.grid.tipEnabled = true;
				break;
			case 1:
				a.grid.checkNotice = true;

				break;
			case 2:
				a.drawImg.visible = true;
				a.grid.tipEnabled = true;
				break;
			case 3:
				a.signImg.visible = true;
				break;
		}
	}

	public clean() {
		let self = this;
		ConfigHelp.cleanGridEff(self.grid);
	}
}