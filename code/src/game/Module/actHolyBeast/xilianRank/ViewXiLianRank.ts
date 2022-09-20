/**
 * 洗练排名界面
 */
class ViewXiLianRank extends UIModalPanel{
	public list: fairygui.GList;

	public constructor() {
		 super();
		 this.loadRes("actHolyBeast", "actHolyBeast_atlas0");
	}

	protected childrenCreated() {
		GGlobal.createPack("actHolyBeast");
		this.view = fairygui.UIPackage.createObject("actHolyBeast", "ViewXiLianRank").asCom;
		this.contentPane = this.view;

		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.itemRenderer = this.onListRender;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		super.childrenCreated();
	}

	private onListRender(index: number, render: ItemXiLianRank) {
		render.setData(this.datas[index],this.indexs[index]);
	}

	protected onShown() {
		let s = this;
		s.onUpdate();
	}

	protected onHide() {
		this.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.ACTHB_XILIANRANK_VIEW);
	}

	private datas: XiLianRankVO[] = [];
	private indexs = [];
	private onUpdate() {
		this.datas = [];
		this.indexs = [];
		// let cfg:Ishxlpm_268 = this._args;
		// let arr = JSON.parse(cfg.rank);
		// let start:number = arr[0][0];
		// let end:number = arr[0][1];
		for(var i:number = 0;i < 20;i ++)
		{
			let vo:XiLianRankVO = Model_ActHolyBeast.rankData[i];
			this.datas.push(vo);
			this.indexs.push(i);
		}
		this.list.numItems = this.datas.length;
        this.list.scrollToView(0);
	}

}