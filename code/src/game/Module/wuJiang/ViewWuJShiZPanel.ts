class ViewWuJShiZPanel extends UIPanelBase {

	public viewSZ: ChildShiZhuang;

	public constructor() {
		super();
		this.setSkin("wuJiang", "wuJiang_atlas0", "ViewWuJShiZPanel");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory
		f.setPackageItemExtension(ChildShiZhuang.URL, ChildShiZhuang);
		f.setPackageItemExtension(ItemSZ.URL, ItemSZ);
		f.setPackageItemExtension(VWuJiangGrid.URL, VWuJiangGrid);
	}

	protected initView(): void {
		super.initView();
		this.frame.getChild("icon").asLoader.url = "ui://zyx92gzwl0xe7";
	}
	private _tab2CanOpen: boolean = false;
	private onChange(evt: fairygui.StateChangeEvent) {
		if (!this._tab2CanOpen) {
			ModuleManager.isOpen(3108, true);
		}
	}
	protected onShown(): void {
		this.addListen();
		this.viewSZ.show(this._args);
	}
	protected onHide(): void {
		this.removeListen();
		this.viewSZ.hide();
	}
	private addListen(): void {
		ViewWuJiangPanel._selPage = 1;
		this.viewSZ.addEvent();
	}
	private removeListen(): void {
		GGlobal.layerMgr.close(UIConst.WU_JIANG_SZ);
		this.viewSZ.removeEvent();
	}
}