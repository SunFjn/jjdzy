class View_YJDQ_Prompt extends UIModalPanel {

	public lb: fairygui.GRichTextField;
	public static URL: string = "ui://pkuzcu87fzz83";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_Prompt").asCom;
		this.contentPane = this.view;
		this.lb = <fairygui.GRichTextField><any>(this.view.getChild("lb"));
		this.isShowOpenAnimation = false;
		this.isShowMask = false;
		super.childrenCreated();
	}

	private times: number;
	public updateShow(): void {
		this.times--;
		let cfg = Config.yiqi_007[Model_YJDQ.curPass];
		this.lb.setVar("time", "" + this.times).setVar("bo", "" + (cfg.bo + 5)).flushVars();
		if (this.times <= 0) {
			this.doHideAnimation();
		}
	}

	protected onShown(): void {
		this.times = Config.xtcs_004[1023].num + 1;
		Timer.instance.listen(this.updateShow, this, 1000);
	}

	protected onHide(): void {
		Timer.instance.remove(this.updateShow, this);
		GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_PROMPT);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, fairygui.GRoot.inst.height - 360 - this.height);
	}
}