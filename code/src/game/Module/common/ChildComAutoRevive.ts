class ChildComAutoRevive extends fairygui.GComponent {
	public n0: fairygui.GButton;

	public static URL: string = "ui://jvxpx9emzm7h3gb";

	private static _inst: ChildComAutoRevive;
	public static createInstance(): ChildComAutoRevive {
		if (!this._inst) {
			this._inst = <ChildComAutoRevive><any>(fairygui.UIPackage.createObject("common", "ChildComAutoRevive"));
		}
		return this._inst
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.n0 = <fairygui.GButton><any>(this.getChild("n0"));
	}

	private clickHD() {
		let sceneType = GGlobal.sceneType;
		let type = this.n0.selected ? 1 : 0;
		switch (sceneType) {
			case SceneCtrl.CAOCAOLAIXI:
				GGlobal.modelCaoCao.CG_CaoCaoCome_isaotufuhuo_8525(type);
				break;
			case SceneCtrl.HFHD_ZFZJ:
				GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_isaotufuhuo_9657(type);
				break;
			case SceneCtrl.LVBU:
				GGlobal.modelBoss.CG_OPEN_AUTO_REVIVE_LVBU(type);
				break;
			case SceneCtrl.MENGHUO:
				GGlobal.modelBoss.CG_OPEN_AUTO_REVIVE_MH(type);
				break;
		}
	}

	private updateCB(ret) {
		this.n0.selected = ret == 1;
	}

	public show1() {
		let self = this;
		if (!self.parent) {
			GGlobal.layerMgr.UI_MainBottom.addChildAt(self, 0);
		}
		self.setXY((fairygui.GRoot.inst.width - self.width - 20) >> 1, fairygui.GRoot.inst.height - 270);
		self.n0.selected = false;
		self.n0.addClickListener(self.clickHD, self);
		GGlobal.control.listen("revieauto", self.updateCB, self);
	}

	public hide1() {
		let self = this;
		self.removeFromParent();
		self.n0.removeClickListener(self.clickHD, self);
		GGlobal.control.remove("revieauto", self.updateCB, self);
	}
}