class View_YJDQ_Reward extends UIModalPanel {

	public rewardBt: fairygui.GButton;

	public static URL: string = "ui://pkuzcu87fzz85";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_Reward").asCom;
		this.contentPane = this.view;
		this.rewardBt = <fairygui.GButton><any>(this.view.getChild("rewardBt"));
		this.rewardBt.addClickListener(this.rewardHandle, this);
		this.isShowOpenAnimation = false;
		this.isShowMask = false;
		super.childrenCreated();
	}

	private rewardHandle(): void {
		GGlobal.layerMgr.open(UIConst.FUBEN_YJDQ_REWARDSHOW);
	}

	protected onShown(): void {

	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_REWARD);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, fairygui.GRoot.inst.height - 350);
	}
}