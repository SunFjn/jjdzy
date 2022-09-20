/**
 * 许愿树排行奖励
 */
class WishTreeRankView extends UIModalPanel{
	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public lbMy: fairygui.GRichTextField;

	public static URL: string = "ui://zyevj37nlwy26";

	private dataArr: WishTreeVO[] = [];
	private _qs:number = 0;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("ActCom_WishTree", "WishTreeRankView").asCom;
		this.contentPane = this.view;
		CommonManager.parseChildren(this.view, this);

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		super.childrenCreated();
	}

	protected onShown(): void {
		this.dataArr = [];
		this._qs = this._args.qs;
		this.addListen();
		GGlobal.modelWishTree.CG_OPEN_RANKUI();
	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
		GGlobal.layerMgr.close(this.panelId);
	}

	private addListen(): void {
		GGlobal.control.listen(UIConst.WISHTREE_RANK, this.update, this)
	}

	private removeListen(): void {
		GGlobal.control.remove(UIConst.WISHTREE_RANK, this.update, this)
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: WishTreeRankItem = obj as WishTreeRankItem;
		v.setVo(this.dataArr[index], index, this._qs);
	}

	private update() {
		let model = GGlobal.modelWishTree;
		let rk = "";
		let ct = "";
		this.dataArr = model.rankArr;
		// this.list.numItems = this.dataArr.length;
		this.list.numItems = 10;
		this.list.scrollToView(0);
		rk = model.myRank? model.myRank + "" : "未上榜"
		ct = model.myWish ? model.myWish + "" : "0";
		this.lbMy.text = "我的排名：" + rk + "          我的许愿次数：" + ct;
	}
}