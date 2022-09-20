/**
 * 少主祈愿排名界面
 */
class ViewShaoZhuQYRank extends UIModalPanel {
	public list: fairygui.GList;

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(ItemShaoZhuQyRank.URL, ItemShaoZhuQyRank);
		this.loadRes("shaozhuAct", "shaozhuAct_atlas0");
	}

	protected childrenCreated() {
		let self = this;
		fairygui.UIPackage.addPackage("shaozhuAct");
		const view = fairygui.UIPackage.createObject("shaozhuAct", "ViewShaoZhuQYRank").asCom;
		self.contentPane = view;
		CommonManager.parseChildren(view, self);
		self.list.itemRenderer = self.onListRender;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private onListRender(index: number, render: ItemAuthenRank) {
		render.setData(this.datas[index], this.indexs[index]);
	}

	public onShown() {
		super.onShown();
		let s = this;
		s.onUpdate();
	}

	public onHide() {
		super.onHide();
		this.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.SHAOZHU_QY_RANK_VIEW);
	}

	private datas: QiYuanRankVO[] = [];
	private indexs = [];
	private onUpdate() {
		this.datas = [];
		this.indexs = [];
		// let cfg:Iszqypm_272 = this._args;
		// let arr = JSON.parse(cfg.rank);
		// let start:number = arr[0][0];
		// let end:number = arr[0][1];
		for (var i: number = 0; i < 20; i++) {
			let vo: QiYuanRankVO = ModelShaoZhuAct.rankData[i];
			this.datas.push(vo);
			this.indexs.push(i);
		}
		this.list.numItems = this.datas.length;
		this.list.scrollToView(0);
	}

}