class View_WFSM_Panel extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;

	public static URL: string = "ui://jvxpx9emah3c3ap";

	public static createInstance(): View_WFSM_Panel {
		return <View_WFSM_Panel><any>(fairygui.UIPackage.createObject("common", "View_WFSM_Panel"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "View_WFSM_Panel").asCom;
		this.contentPane = this.view;
		let t = this;
		CommonManager.parseChildren(t.view, t);

		this.list.itemRenderer = this.renderHander;
		this.list.callbackThisObj = this;
		super.childrenCreated();
	}

	protected onShown() {
		let t = this;
		let t_arg = t._args;
		t._vo = null;
		if (typeof t_arg === "number") {
			t.frame.title = "玩法说明";
			this.show(t_arg);
		}
		else {
			if ("title" in t_arg) {
				t.frame.title = t_arg.title;
			}
			if ("content" in t_arg) {
				t._vo = { id: 0, tips: t_arg.content };
				t.list.numItems = 1;
				t.list.scrollToView(0);
			}
		}
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.WFSM_PANEL);
	}

	private _vo: any;
	public show(obj: number): void {
		this._vo = Config.wfsm_200[obj]
		this.list.numItems = 1;
		this.list.scrollToView(0);
	}

	private renderHander(index: number, obj: View_WFSM): void {
		let t = this;
		if (t._vo)
			obj.vo = this._vo.tips;
	}

}