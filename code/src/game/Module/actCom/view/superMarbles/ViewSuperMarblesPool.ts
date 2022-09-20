class ViewSuperMarblesPool extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;

	public static URL: string = "ui://gf2tw9lzx9uy4";

	public static createInstance(): ViewSuperMarblesPool {
		return <ViewSuperMarblesPool><any>(fairygui.UIPackage.createObject("superMarbles", "ViewSuperMarblesPool"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated() {
		let self = this;
		const view = fairygui.UIPackage.createObject("superMarbles", "ViewSuperMarblesPool").asCom;
		self.contentPane = view;
		CommonManager.parseChildren(view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.render;
		self.list.setVirtual();
		super.childrenCreated();
	}

	render(idx,obj){
		obj.update(idx);
	}


	onShown() {
		const self = this;
		self.list.numItems = GGlobal.modelSuperMarbles.cfg.length;
	}

	onHide() {
		const self = this;
		GGlobal.layerMgr.close(UIConst.ACTCOMCJDZ_POOL);
	}
}