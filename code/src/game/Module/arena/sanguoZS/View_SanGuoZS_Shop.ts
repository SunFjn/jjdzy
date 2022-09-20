class View_SanGuoZS_Shop extends UIPanelBase {

	public frame: fairygui.GLabel;
	public titleImg: fairygui.GLoader;
	public moneyIcon: fairygui.GLoader;
	public moneyLb: fairygui.GRichTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://me1skowlm40k3e";

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(SanGuoZS_ShopItem.URL, SanGuoZS_ShopItem);
		this.setSkin("Arena", "Arena_atlas0", "View_SanGuoZS_Shop")
	}

	protected initView(): void {
		super.initView();
		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderHandle;
		s.list.setVirtual();
		GGlobal.modelsgzs.CG_SANGUO_ZHANSHEN_OPEN_BZ();
	}

	private renderHandle(index: number, obj: SanGuoZS_ShopItem) {
		obj.setVo(Model_SGZS.shopArr[index]);
	}

	public updateShow(): void {
		let s = this;
		s.moneyLb.text = ConfigHelp.numToStr(Model_player.voMine.yuanbao);
		s.list.numItems = Model_SGZS.shopArr.length;
	}

	protected onShown(): void {
		let s = this;
		IconUtil.setImg(s.titleImg, Enum_Path.BACK_URL + "zsbz.jpg");
		IconUtil.setImg(s.moneyIcon, Enum_Path.ICON70_URL + "4.png");
		s.updateShow();
		GGlobal.control.listen(Enum_MsgType.SANGUO_ZHANSHEN_SHOP, s.updateShow, s);
	}

	protected onHide(): void {
		let s = this;
		IconUtil.setImg(s.titleImg, null);
		IconUtil.setImg(s.moneyIcon, null);
		s.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.SANGUO_ZHANSHEN_BZ);
		GGlobal.control.remove(Enum_MsgType.SANGUO_ZHANSHEN_SHOP, s.updateShow, s);
	}
}