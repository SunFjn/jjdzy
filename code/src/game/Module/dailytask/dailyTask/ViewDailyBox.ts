/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewDailyBox extends UIModalPanel {

	public frame: fairygui.GComponent;
	public n6: fairygui.GButton;
	public n7: fairygui.GImage;
	public n8: fairygui.GRichTextField;

	public static URL: string = "ui://b3p8szvvftjg1e";

	public static createInstance(): ViewDailyBox {
		return <ViewDailyBox><any>(fairygui.UIPackage.createObject("dailytask", "ViewDailyBox"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("dailytask", "ViewDailyBox").asCom;
		this.contentPane = this.view;
		this.n6 = <fairygui.GButton><any>(this.view.getChild("n6"));
		this.n7 = <fairygui.GImage><any>(this.view.getChild("n7"));
		this.n8 = <fairygui.GRichTextField><any>(this.view.getChild("n8"));

		this.frame = <fairygui.GComponent><any>(this.view.getChild("frame"));
		super.childrenCreated();
	}

	private getAwards() {
		GGlobal.modeltask.CG_BX_1055(this._idx);
		this.doHideAnimation();
	}

	private updateView() {
		this._st = GGlobal.modeltask.boxData[this._idx];
		this.n6.visible = this._st == 1;
		this.n7.visible = this._st == 2;
		this.n8.visible = this._st == 0;
	}

	private arr;
	private _idx;
	private _st;
	protected onShown(): void {
		let awards = this._args.awards;
		this._idx = this._args.idx;

		awards = JSON.parse(awards);
		if (this.arr) ConfigHelp.cleanGridview(this.arr);
		awards = ConfigHelp.makeItemListArr(awards);
		this.arr = ConfigHelp.addGridview(awards, this, 100, 100);
		ConfigHelp.centerGrid(this.arr, 70, 110, 3, 130);
		this.n6.addClickListener(this.getAwards, this);

		GGlobal.control.listen(Enum_MsgType.MSG_TASK_UP, this.updateView, this);

		this.updateView();
	}

	protected onHide(): void {
		if (this.arr) ConfigHelp.cleanGridview(this.arr);
		GGlobal.layerMgr.close(UIConst.DAILYTASKBOX);
		this.n6.removeClickListener(this.getAwards, this);
		GGlobal.control.remove(Enum_MsgType.MSG_TASK_UP, this.updateView, this);

	}

}