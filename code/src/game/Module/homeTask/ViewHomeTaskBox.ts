/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewHomeTaskBox extends UIModalPanel {

	public frame: fairygui.GComponent;
	public n6: fairygui.GButton;
	public n7: fairygui.GImage;
	public n8: fairygui.GRichTextField;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("homeTask", "ViewHomeTaskBox").asCom;
		this.contentPane = this.view;
		this.n6 = <fairygui.GButton><any>(this.view.getChild("n6"));
		this.n7 = <fairygui.GImage><any>(this.view.getChild("n7"));
		this.n8 = <fairygui.GRichTextField><any>(this.view.getChild("n8"));

		this.frame = <fairygui.GComponent><any>(this.view.getChild("frame"));
		super.childrenCreated();
	}

	private getAwards() {
		GGlobal.model_HomeTask.CG_GET_BOX_REWARD_11411(this._idx);
		this.doHideAnimation();
	}

	private updateView() {
		this._st = GGlobal.model_HomeTask.boxData[this._idx];
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

		GGlobal.model_HomeTask.listen(Model_HomeTask.UP_TASK, this.updateView, this);

		this.updateView();
	}

	protected onHide(): void {
		if (this.arr) ConfigHelp.cleanGridview(this.arr);
		this.n6.removeClickListener(this.getAwards, this);
		GGlobal.model_HomeTask.remove(Model_HomeTask.UP_TASK, this.updateView, this);

	}

}