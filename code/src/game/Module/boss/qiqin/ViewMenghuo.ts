class ViewMenghuo extends UIPanelBase {
	public frame: fairygui.GLabel;
	public n4: Child7MengHuo;

	public static URL: string = "ui://47jfyc6ehul73c";
	public constructor() {
		super();
		this.setSkin("Boss", "Boss_atlas0", "ViewMenghuo");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Child7MengHuo.URL, Child7MengHuo);
		f(MHTargetItem.URL, MHTargetItem);
		f(MengHuoSceneInfo.URL, MengHuoSceneInfo);
		f(MengHuoItem.URL, MengHuoItem);
	}
	protected initView(): void {
		super.initView();

	}

	public onShown() {
		let s = this;
		let r = GGlobal.reddot;
		s.n4.open();
	}

	public onHide() {
		let s = this;
		s.n4.close();
		let r = GGlobal.reddot;
		GGlobal.layerMgr.close(UIConst.MHBOSS);
	}

}