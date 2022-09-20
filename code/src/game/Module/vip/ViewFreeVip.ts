/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewFreeVip extends UIModalPanel {
	public icon0: ViewGrid2;
	public icon1: ViewGrid2;
	public icon2: ViewGrid2;
	public n11: fairygui.GImage;
	public n13: fairygui.GImage;
	public n14: fairygui.GImage;
	public lb0: fairygui.GRichTextField;
	public lb1: fairygui.GRichTextField;
	public lb2: fairygui.GRichTextField;
	public n23: fairygui.GButton;
	public n15: fairygui.GImage;

	public static URL: string = "ui://ghovj25xucgg0";

	public static createInstance(): ViewFreeVip {
		return <ViewFreeVip><any>(fairygui.UIPackage.createObject("LoginVip", "ViewFreeVip"));
	}

	public constructor() {
		super();
		this.loadRes("LoginVip", "LoginVip_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("LoginVip");
		let s = this;
		s.view = fairygui.UIPackage.createObject("LoginVip", "ViewFreeVip").asCom;
		s.contentPane = s.view;

		this.icon0 = <ViewGrid2><any>(s.view.getChild("icon0"));
		this.icon1 = <ViewGrid2><any>(s.view.getChild("icon1"));
		this.icon2 = <ViewGrid2><any>(s.view.getChild("icon2"));
		this.n11 = <fairygui.GImage><any>(s.view.getChild("n11"));
		this.n13 = <fairygui.GImage><any>(s.view.getChild("n13"));
		this.n14 = <fairygui.GImage><any>(s.view.getChild("n14"));
		this.lb0 = <fairygui.GRichTextField><any>(s.view.getChild("lb0"));
		this.lb1 = <fairygui.GRichTextField><any>(s.view.getChild("lb1"));
		this.lb2 = <fairygui.GRichTextField><any>(s.view.getChild("lb2"));
		this.n23 = <fairygui.GButton><any>(s.view.getChild("n23"));
		this.n15 = <fairygui.GImage><any>(s.view.getChild("n15"));
		this.grids = [this['icon0'], this['icon1'], this['icon2']];
		super.childrenCreated();
	}

	private texts = [];
	private grids: ViewGrid2[];
	protected onShown(): void {
		let arr = JSON.parse(ConfigHelp.getSystemDesc(3814));
		arr = ConfigHelp.makeItemListArr(arr);
		for (let i = 0; i < 3; i++) {
			let itemVo = arr[i];
			this['lb' + i].text = ConfigHelp.getYiWanText(itemVo.count);
			this['icon' + i].vo = itemVo;
			this['icon' + i].tipEnabled = true;
			this.texts.push(itemVo);
		}
		this.n23.addClickListener(this.doHideAnimation, this);
	}

	private hasClick;
	public doHideAnimation() {
		if (this.hasClick) return;
		this.hasClick = true;
		AnimationUtil.grid2ToBag(this.grids, 1000);
		while (this.texts.length > 0) {
			let itemVo: IGridImpl = this.texts.shift();
			ViewBroadcastItemText.text("获得【" + itemVo.name + "】X" + itemVo.count, itemVo.qColor);
		}
		Timer.instance.callLater(super.doHideAnimation, 1000, this);
	}

	protected onHide(): void {
		this.n23.removeClickListener(this.doHideAnimation, this);
		let titleID = 460109;
		if (Model_Bag.getItemCount(titleID) > 0) {
			GGlobal.modelBag.CG_BAG_ITEM_USE(titleID, 1);
		}
		GGlobal.layerMgr.close(UIConst.LOGINVIP);
		this.texts = null;
		Model_TrueName.openTureName();
	}
}