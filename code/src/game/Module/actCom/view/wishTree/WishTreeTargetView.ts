/**
 * 许愿树目标排行
 */
class WishTreeTargetView extends UIModalPanel{
	public frame: fairygui.GLabel;
	public lb: fairygui.GTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://zyevj37nlonvd";

	private dataArr: any[];
	private _systemId:number = 0;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("ActCom_WishTree", "WishTreeTargetView").asCom;
		this.contentPane = this.view;
		CommonManager.parseChildren(this.view, this);

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		super.childrenCreated();
	}

	protected onShown(): void {
		this._systemId = this._args.id;
		this.addListen();
		// GGlobal.modelWishTree.CG_OPEN_TARGETUI(this._systemId);
		this.update();
	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
		GGlobal.layerMgr.close(this.panelId);
	}

	private addListen(): void {
		// GGlobal.control.listen(UIConst.WISHTREE_TARGET, this.update, this);
		GGlobal.control.listen(UIConst.WISHTREE_ACT, this.update, this);
		GGlobal.control.listen(UIConst.WISHTREE_SYSTEM, this.update, this);
		GGlobal.control.listen(Enum_MsgType.WISHTREE_PRAY_MOVIE, this.update, this);
	}

	private removeListen(): void {
		// GGlobal.control.remove(UIConst.WISHTREE_TARGET, this.update, this);
		GGlobal.control.remove(UIConst.WISHTREE_ACT, this.update, this);
		GGlobal.control.remove(UIConst.WISHTREE_SYSTEM, this.update, this);
		GGlobal.control.remove(Enum_MsgType.WISHTREE_PRAY_MOVIE, this.update, this);
	}

	private update() {
		let model = GGlobal.modelWishTree;
		this.dataArr = model.targetArr;
		this.dataArr.sort(this.funcSort);
		this.list.numItems = this.dataArr.length;
		let ct = model.targetCount ? model.targetCount + "" : "0";
		if (this.dataArr.length > 0)
			this.list.scrollToView(0);
		this.lb.text = "我的许愿次数：" + ct;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: WishTreeTargetItem = obj as WishTreeTargetItem
		v.setVo(this.dataArr[index], index, this._systemId);
	}

	private funcSort(a: WishTreeVO, b: WishTreeVO) {
		if (a.status == b.status) {
			return a.id - b.id;
		} else {
			if (a.status == 1) {
				return -1;
			}
			if (b.status == 1) {
				return 1;
			}
			if (a.status == 0) {
				return -1;
			}
			if (b.status == 0) {
				return 1;
			}
		}
		return 1;
	}
}