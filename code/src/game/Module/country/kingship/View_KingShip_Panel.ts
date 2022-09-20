class View_KingShip_Panel extends UIPanelBase {

	public frame: fairygui.GLabel;
	public item: ChildKingShipResult;
	public static URL: string = "ui://uwzc58nj5vwc2p";

	public constructor() {
		super();
		this.setSkin("country", "country_atlas0", "View_KingShip_Panel");
	}

	protected setExtends() {
		let fc = fairygui.UIObjectFactory.setPackageItemExtension;
		fc(ChildKingShipResult.URL, ChildKingShipResult);
		fc(VKingShipPly.URL, VKingShipPly);
	}

	protected initView(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("country", "View_KingShip_Panel").asCom;
		self.contentPane = self.view;
		self.item = <ChildKingShipResult><any>(self.view.getChild("item"));
	}

	private updateShow() {
		this.item.addListen();
	}

	protected onShown(): void {
		GGlobal.modelKingship.CG_OPENUI_5201();
		this.updateShow();
	}

	protected onHide(): void {
		if (this.item) this.item.removeListen();
		GGlobal.layerMgr.close(UIConst.COUNTRY_KINGSHIP);
	}
}