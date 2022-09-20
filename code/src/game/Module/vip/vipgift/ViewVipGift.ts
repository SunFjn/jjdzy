/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewVipGift extends UIPanelBase {

	public frame: fairygui.GComponent;
	public n2: fairygui.GImage;
	public n3: fairygui.GList;

	public static URL: string = "ui://w4xdcvn7fbywa";

	public static createInstance(): ViewVipGift {
		return <ViewVipGift><any>(fairygui.UIPackage.createObject("vip", "ViewVipGift"));
	}

	public constructor() {
		super();
		this.isShowOpenAnimation = false;
		this.setSkin("vip", "vip_atlas0", "ViewVipGift");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(ItemVipGift.URL, ItemVipGift);
	}

	private tts;
	private effContianer;
	protected initView(): void {
		super.initView();
		let s = this;
		s.n3.callbackThisObj = s;
		s.n3.itemRenderer = s.itemRender;
		s.n3.setVirtual();
	}

	private itemRender(idx, ovj) {
		let item: ItemVipGift = ovj as ItemVipGift;
		item.setdata(this._sortDta[idx]);
	}

	private _sortDta;
	private updateList() {
		let m = GGlobal.modelvip;
		let num = m.getMaxVip() + 1;
		let head = [];
		let tail = [];
		for (let i = 0; i < num; i++) {
			if (m.vipGiftData.indexOf(i + 1) != -1)
				tail.push(i);
			else
				head.push(i);
		}
		this._sortDta = head.concat(tail);
		this.n3.numItems = num;
	}

	protected onShown() {
		let s = this;
		s.updateList();
		GGlobal.control.listen(UIConst.VIP, s.updateList, s);
	}

	protected onHide() {
		let s = this;
		GGlobal.control.remove(UIConst.VIP, s.updateList, s);
		GGlobal.layerMgr.close2(UIConst.VIPGIFT);
		s.n3.numItems = 0;
	}
}