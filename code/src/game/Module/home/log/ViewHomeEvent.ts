/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewHomeEvent extends UIModalPanel {

	public frame: fairygui.GLabel;
	public lbInfo: fairygui.GRichTextField;
	public lbCount: fairygui.GRichTextField;
	public n2: fairygui.GLabel;
	public n3: fairygui.GList;
	public n4: fairygui.GButton;

	public static URL: string = "ui://y0plc878g2m4f";

	public static createInstance(): ViewHomeEvent {
		return <ViewHomeEvent><any>(fairygui.UIPackage.createObject("home", "ViewHomeEvent"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHomeEvent").asCom;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	public eventFunction(type) {
		const self = this;
		EventUtil.register(type, self.n4, EventUtil.TOUCH, self.clickHD, self);
	}

	clickHD = () => {
		let model = GGlobal.homemodel;
		if (model.isSelfHome) {
			if(model.remaindEventAward== 0){
				ViewCommonWarn.text("没有次数啦");
			}
		} else {
			if(model.helpTime==0){
				ViewCommonWarn.text("没有帮助次数啦");
			}
		}
		GGlobal.homemodel.CG_House_event_11123(this._eventid);
	}

	private _eventid = 0;
	onShown() {
		const self = this;
		self._eventid = Number(self._args);
		let cfg = Config.fdsjsj_019[self._eventid];
		if (!cfg) {
			ViewCommonWarn.text("无法查找到事件的配置" + self._eventid);
			return;
		}

		let model = GGlobal.homemodel;
		if (model.isSelfHome) {
			self.lbCount.text = "剩余次数：" + model.remaindEventAward + "/" + ConfigHelp.getSystemNum(7112);
		} else {
			self.lbCount.text = "剩余帮助次数：" + model.helpTime + "/" + ConfigHelp.getSystemNum(7120);
		}
		self.lbInfo.text = cfg.wenzi;
		ConfigHelp.createViewGridList(self.n3, cfg.jiangli, self);
	}

	onHide() {
		const self = this;
		GGlobal.layerMgr.close(UIConst.HOME_EVENT_UI);
	}
}