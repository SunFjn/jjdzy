/**
 * 鉴定排名界面
 */
class ViewAuthenRank extends UIModalPanel{
	public list: fairygui.GList;

	public constructor() {
		 super();
		 fairygui.UIObjectFactory.setPackageItemExtension(ItemAuthenRank.URL, ItemAuthenRank);
		 this.loadRes("eightLock", "eightLock_atlas0");
	}

	protected childrenCreated() {
		GGlobal.createPack("eightLock");
		const view = fairygui.UIPackage.createObject("eightLock", "ViewAuthenRank").asCom;
		this.contentPane = view;
		CommonManager.parseChildren(view, this);
		
		this.list.itemRenderer = this.onListRender;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		super.childrenCreated();
	}

	private onListRender(index: number, render: ItemAuthenRank) {
		render.setData(this.datas[index],this.indexs[index]);
	}

	public onShown() {
		super.onShown();
		let s = this;
		s.onUpdate();
	}

	public onHide() {
		super.onHide();
		let s = this;
		s.list.numItems = 0;
		GGlobal.layerMgr.close(s.panelId);
	}

	private datas: AuthenRankVO[] = [];
	private indexs = [];
	private onUpdate() {
		this.datas = [];
		this.indexs = [];
		// let cfg:Ibmjsjdpm_262 = this._args;
		// let arr = JSON.parse(cfg.rank);
		// let start:number = arr[0][0];
		// let end:number = arr[0][1];
		for(var i:number = 0;i < 20;i ++)
		{
			let vo:AuthenRankVO = ModelEightLock.rankData[i];
			this.datas.push(vo);
			this.indexs.push(i);
		}
		this.list.numItems = this.datas.length;
        this.list.scrollToView(0);
	}

}