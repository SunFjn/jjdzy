class ViewZhuanPanReward extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public lbMyRank: fairygui.GRichTextField;
	public lbMyCount: fairygui.GRichTextField;
	public lbTips: fairygui.GRichTextField;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("sanGuoQingDian", "ViewZhuanPanReward").asCom;
		this.contentPane = this.view;

		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.lbMyRank = <fairygui.GRichTextField><any>(this.view.getChild("lbMyRank"));
		this.lbMyCount = <fairygui.GRichTextField><any>(this.view.getChild("lbMyCount"));
		this.lbTips = <fairygui.GRichTextField><any>(this.view.getChild("lbTips"));

		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandler;
		this.list.setVirtual()
		this.isShowOpenAnimation = false;
		super.childrenCreated();
	}

	protected onShown() {
		GGlobal.modelSGQD.CGOpenRank4125()
		GGlobal.modelSGQD.listen(ModelSGQD.msg_rank_zhuanpan, this.upView, this);
		this.upView()
	}

	private upView() {
		this.list.numItems = 50;
		this.lbMyRank.text = ModelSGQD.zpRankMy == 0 ? "我的排名：未上榜" : "我的排名：" + ModelSGQD.zpRankMy
		this.lbMyCount.text = "转盘次数：" + ModelSGQD.zpCtMy;
		this.lbTips.text = "上榜条件\n转盘" + ConfigHelp.getSystemNum(4605) + "次";
	}

	protected onHide(): void {
		this.list.numItems = 0;
		GGlobal.modelSGQD.remove(ModelSGQD.msg_rank_zhuanpan, this.upView, this);
		GGlobal.layerMgr.close(UIConst.SG_ZHUANPAN_REWARD);
	}


	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as VZhuanPanReward;
		let v = ModelSGQD.zpRankArr[index];
		grid.setVo(v, index);
	}



}