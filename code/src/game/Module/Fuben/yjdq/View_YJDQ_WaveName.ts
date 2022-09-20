class View_YJDQ_WaveName extends UIModalPanel {

	public lb: fairygui.GRichTextField;
	public static URL: string = "ui://pkuzcu87rvdr1i";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_WaveName").asCom;
		this.contentPane = this.view;
		this.lb = <fairygui.GRichTextField><any>(this.view.getChild("lb"));
		this.isShowOpenAnimation = false;
		this.isShowMask = false;
		super.childrenCreated();
	}

	public updateShow(): void {
		let cfg = Config.yiqi_007[Model_YJDQ.curPass]
		this.lb.text = "第" + cfg.bo + "波  " + cfg.name;
	}

	protected onShown(): void {
		this.updateShow();
	}

	protected onHide(): void {
		Timer.instance.remove(this.updateShow, this);
		GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_WAVE);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, 300);
	}
}