/**
 * 对对联排行榜界面
 */
class ViewRankDDL extends UIModalPanel{
	public list: fairygui.GList;
	public lbMyRank: fairygui.GTextField;
	public lbMyCount: fairygui.GTextField;
	private _qs:number = 0;

	public static URL: string = "ui://ke8qv0ckxn887";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActCom_DDL", "ViewRankDDL").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		super.childrenCreated();
	}

	protected onShown(): void {
		this.addListen();
		this._qs = this._args.qs;
		GGlobal.model_DDL.CG_OPEN_RANKUI();
	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.DDL_RANK);
	}

	private addListen(): void {
		GGlobal.control.listen(UIConst.DDL_RANK, this.updateView, this);
	}

	private removeListen(): void {
		GGlobal.control.remove(UIConst.DDL_RANK, this.updateView, this);
	}

	/**
	 * 更新界面数据
	 */
	private updateView() {
		let model = GGlobal.model_DDL;
		let self = this;
		self.lbMyRank.text = model.myRank > 0 ? "我的排名：" + model.myRank : "我的排名：未上榜";
		self.lbMyCount.text = "我对出" + model.myCount + "联";
		let max:number = 0;
		for (let keys in Config.ddlrank_297) {
			let cfg = Config.ddlrank_297[keys];
			let arr = ConfigHelp.SplitStr(cfg.rank);
			max = arr[0][1];
		}
		self.list.numItems = max;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ItemRankDDL = obj as ItemRankDDL;
		v.setVo(GGlobal.model_DDL.rankArr[index], index, this._qs);
	}

}