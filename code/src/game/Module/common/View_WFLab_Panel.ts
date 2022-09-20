class View_WFLab_Panel extends UIModalPanel {

	public labDesc: fairygui.GRichTextField;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "View_WFLab_Panel").asCom;
		this.contentPane = this.view;

		this.labDesc = <fairygui.GRichTextField><any>(this.view.getChild("labDesc"));
		super.childrenCreated();
	}

	protected onShown() {
		this.show(this._args);
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.WFLAB_PANEL);
	}

	public show(obj): void {
		if (obj) {
			this.labDesc.text = obj;
		} else {
			this.labDesc.text = "属性加成只针对本系统的\n[color=#FFC000]升星[/color]和[color=#FFC000]升阶[/color]属性进行百分比加成";
		}
	}

}