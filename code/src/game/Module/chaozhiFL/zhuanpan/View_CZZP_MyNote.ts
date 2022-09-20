class View_CZZP_MyNote extends UIModalPanel {

	public noteLb: fairygui.GRichTextField;

	public static URL: string = "ui://qzsojhcrtznx7";
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("chaozhifanli", "View_CZZP_MyNote").asCom;
		this.contentPane = this.view;
		this.noteLb = <fairygui.GRichTextField><any>(this.view.getChild("noteLb"));
		super.childrenCreated();
	}

	protected onShown(): void {
		let arr = Model_ChaoZhiFL.noteArr;
		let noteStr: string = "";
		arr.forEach(element => {
			noteStr += "获得了" + HtmlUtil.fontNoSize(element.name + "x" + element.count, Color.getColorStr(element.quality)) + "\n";
		});
		this.noteLb.text = noteStr;
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.CHAOZHI_ZHUANPAN_NOTE);
	}
}