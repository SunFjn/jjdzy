class View_NZBZ_Panel extends UIPanelBase {

	public item0: Child_NZBZ;
	public static URL: string = "ui://xzyn0qe3nb1u0";

	public constructor() {
		super();
		this.setSkin("nzbz", "nzbz_atlas0", "View_NZBZ_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(Child_NZBZ.URL, Child_NZBZ);
		fairygui.UIObjectFactory.setPackageItemExtension(NZBZ_Item.URL, NZBZ_Item);
		fairygui.UIObjectFactory.setPackageItemExtension(NZBZHead.URL, NZBZHead);
	}
	protected initView(): void {
		super.initView();
	}

	public controllerHandler(): void {
		this.updateShow();
	}

	public updateShow(): void {
		this.item0.show();
	}

	protected onShown(): void {
		GGlobal.modelnzbz.CG_OPEN_NZBZ();
		GGlobal.reddot.listen(ReddotEvent.CHECK_NZBZ, this.updateShow, this);
	}

	protected onHide(): void {
		this.item0.clean();
		GGlobal.layerMgr.close(UIConst.NANZHENG_BEIZHAN);
		GGlobal.reddot.remove(ReddotEvent.CHECK_NZBZ, this.updateShow, this);
	}

	public guide_NZBZ_battle(step) {
		this.item0.guide_NZBZ_battle(step);
	}

	public guideClosePanel(step) {
		let btn = this.closeButton.asButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}
}