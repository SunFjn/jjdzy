/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewSuperMarblesShop extends UIModalPanel {

	public frame: fairygui.GLabel;
	public n1: fairygui.GImage;
	public n2: fairygui.GLoader;
	public headIcon: fairygui.GLoader;
	public list: fairygui.GList;
	public costLb: fairygui.GRichTextField;

	public static URL: string = "ui://gf2tw9lzx9uy2";

	public static createInstance(): ViewSuperMarblesShop {
		return <ViewSuperMarblesShop><any>(fairygui.UIPackage.createObject("superMarbles", "ViewSuperMarblesShop"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated() {
		let self = this;
		const view = fairygui.UIPackage.createObject("superMarbles", "ViewSuperMarblesShop").asCom;
		self.contentPane = view;
		CommonManager.parseChildren(view, self);
		self.list.itemRenderer = self.render;
		self.list.setVirtual();
		super.childrenCreated();
	}

	render(idx,obj) {
		obj.update(idx);
	}

	udpate() {
		const self = this;
		self.list.numItems = GGlobal.modelSuperMarbles.shopcfg.length;
		self.costLb.text = GGlobal.modelSuperMarbles.score+"";
		self.n2.url = "ui://gf2tw9lz77k97";
	}

	onShown() {
		const self = this;
		GGlobal.modelSuperMarbles.CG_shopdata();
		IconUtil.setImg(self.headIcon, Enum_Path.BACK_URL+"cjdzbg.jpg");
		GGlobal.control.listen(UIConst.ACTCOMCJDZ_SHOP, self.udpate, self);
	}

	onHide() {
		const self = this;
		IconUtil.setImg(self.headIcon, null);
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.ACTCOMCJDZ_SHOP, self.udpate, self);
		GGlobal.layerMgr.close(UIConst.ACTCOMCJDZ_SHOP);
	}
}