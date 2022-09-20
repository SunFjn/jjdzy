class View_XuTian_Panel extends UIPanelBase {

	public xuT:Child_XuTian

	public constructor() {
		super();
		this.setSkin("xuTian", "xuTian_atlas0", "View_XuTian_Panel");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory
		f.setPackageItemExtension(Child_XuTian.URL, Child_XuTian);
		f.setPackageItemExtension(VXuTianHunt.URL, VXuTianHunt);
	}

	public onShown() {
		let s = this;
		s.xuT.openPanel()
	}

	public onHide() {
		let s = this;
		s.xuT.closePanel()
	}
}



