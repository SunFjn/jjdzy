/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewHomeLog extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;

	public static URL: string = "ui://y0plc878g2m4h";

	public static createInstance(): ViewHomeLog {
		return <ViewHomeLog><any>(fairygui.UIPackage.createObject("home", "ViewHomeLog"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHomeLog").asCom;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
	}

	itemRender = (idx, obj) => {
		obj.setdata(idx);
	}

	update = () => {
		const self = this;
		self.list.numItems = GGlobal.homemodel.logdata.length;
	}

	onShown() {
		const self = this;
		let type = Number(self._args);
		self.frame.text = ["","金库记录","天工炉记录"][type];
		GGlobal.homemodel.CG_House_log_11133(type);
		self.update();
		GGlobal.control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
	}

	onHide() {
		const self = this;
		GGlobal.control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		GGlobal.layerMgr.close(UIConst.HOME_LOG_UI);
	}
}