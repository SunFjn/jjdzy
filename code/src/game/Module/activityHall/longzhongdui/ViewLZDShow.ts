/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewLZDShow extends UIModalPanel {

	public frame: WindowFrame1;

	public static URL: string = "ui://1xydor24n7ie6";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("activityHall");
		this.view = fairygui.UIPackage.createObject("activityHall", "ViewLZDShow").asCom;
		this.contentPane = this.view;

		this.frame = <WindowFrame1><any>(this.view.getChild("frame"));
		super.resetPosition();
		super.childrenCreated();
		this.frame.text = "宝箱";
	}

	protected grids: ViewGridRender[] = [];
	protected onShown() {
		let id = this._args;
		let lib = Config.lzdreward_234;
		for (let i  in lib){
			let condition = JSON.parse(lib[i].rank)[0];
			if(id>=condition[0]&&id<=condition[1]){
				id = i;
				break;
			}
		}
		let ward = Config.lzdreward_234[id].reward;
		let vos = ConfigHelp.makeItemListArr(JSON.parse(ward));
		ConfigHelp.cleanGridview(this.grids);
		this.grids = ConfigHelp.addGridview(vos, this, 143, 90, true, true, 3);
		ConfigHelp.centerGrid(this.grids, 100, 90, 3, 120);
	}
 
	protected onHide() {
		ConfigHelp.cleanGridview(this.grids);
		GGlobal.layerMgr.close(UIConst.LZDBOX);
	}
}