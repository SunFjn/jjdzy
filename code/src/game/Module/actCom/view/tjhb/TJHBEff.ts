/**
 * 红包飘落特效
 */
class TJHBEff extends UIModalPanel {
	public eff0: fairygui.GImage;
	public eff1: fairygui.GImage;
	public eff2: fairygui.GImage;
	private _speed: number = 10;

	public static URL: string = "ui://fm0lrzcteodnv";

	public constructor() {
		super();
		this.loadRes("ActCom_TJHB", "ActCom_TJHB_atlas0");
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("ActCom_TJHB");
		self.isShowMask = false;
		self.view = fairygui.UIPackage.createObject("ActCom_TJHB", "TJHBEff").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		self.eff0.x = 70;
		self.eff0.y = -104;
		self.eff1.x = 275;
		self.eff1.y = -32;
		self.eff2.x = 479;
		self.eff2.y = -69;
		Timer.instance.listen(self.onUpdate, self);
	}

	protected onHide(): void {
		let self = this;
		// self.doHideAnimation();
		Timer.instance.remove(self.onUpdate, self);
		GGlobal.layerMgr.close(UIConst.TJHB_EFF);
	}

	public static show()
	{
		if (GGlobal.layerMgr.isOpenView(UIConst.TJHB_EFF)) return;

		GGlobal.layerMgr.open(UIConst.TJHB_EFF);
	}

	private onUpdate() {
		let self = this;
		self.eff0.y += self._speed;
		self.eff1.y += self._speed;
		self.eff2.y += self._speed;
		if (self.eff0.y >= 1388) {
			// this.onHide();
			self.doHideAnimation();
		}
	}
}