class ViewBossAppear extends UIPanelBase {
	public imgText: fairygui.GImage;

	public static URL: string = "ui://47jfyc6etujy9";

	public static createInstance(): ViewBossAppear {
		return <ViewBossAppear><any>(fairygui.UIPackage.createObject("Boss", "ViewBossAppear"));
	}

	public constructor() {
		super();
		this.setSkin("Boss", "Boss_atlas0", "ViewBossAppear");
	}

	protected initView(): void {
		super.initView();
		this.imgText.y = 3;
		this.resetPosition();
	}

	protected onShown() {
		this.setTitle(this._args);
		this.resetPosition();
	}

	protected setTitle(arg): void {
		if (arg == 1) {
			this.imgText.texture = fairygui.UIPackage.getItemByURL("ui://47jfyc6ejb04b").texture;
		} else {
			this.imgText.texture = fairygui.UIPackage.getItemByURL("ui://47jfyc6ejb04c").texture;
		}
		this.alpha = 0.7;
		egret.Tween.get(this).to({ alpha: 1 }, 2000, this.EASE).to({ alpha: 0 }, 200).call(this.closeHandler1, this);
	}

	private closeHandler1() {
		egret.Tween.removeTweens(this);
		GGlobal.layerMgr.close(UIConst.BOSSAPPEAR);
	}

	public EASE(perc: number) {
		return Math.sin(perc * Math.PI * 6);
	}

	public resetPosition() {
		this.x = (App.stage.stageWidth - 450) / 2 >> 0;
		this.y = 176;
	}
}