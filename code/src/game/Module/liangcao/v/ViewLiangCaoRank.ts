class ViewLiangCaoRank extends UIModalPanel {

	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public tab0: fairygui.GButton;
	public tab1: fairygui.GButton;
	public tab2: TabButton;
	public lbRank: fairygui.GRichTextField;
	public lbScore: fairygui.GRichTextField;
	public personList: fairygui.GList;
	public serverList: fairygui.GList;
	public scoreList: fairygui.GList;
	public n12: fairygui.GImage;
	public imgTitle: fairygui.GLoader;
	public n13: fairygui.GImage;
	public headIcon: fairygui.GLoader;
	public frameIcon: fairygui.GLoader;
	public lbMvp: fairygui.GRichTextField;
	public list: fairygui.GList;
	public groupMVP: fairygui.GGroup;
	public n21: fairygui.GImage;

	public static URL: string = "ui://mbcu0qc0hd208";

	public static createInstance(): ViewLiangCaoRank {
		return <ViewLiangCaoRank><any>(fairygui.UIPackage.createObject("liangcao", "ViewLiangCaoRank"));
	}

	public constructor() {
		super();
		this.loadRes("liangcao", "liangcao_atlas0");
	}

	protected childrenCreated(): void {
		var self = this;
		GGlobal.createPack("liangcao");
		self.view = fairygui.UIPackage.createObject("liangcao", "ViewLiangCaoRank").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.personList.callbackThisObj = self;
		self.personList.itemRenderer = self.itemRenderPersonal;

		self.serverList.callbackThisObj = self;
		self.serverList.itemRenderer = self.itemRenderServer;

		self.scoreList.callbackThisObj = self;
		self.scoreList.itemRenderer = self.itemRenderScore;

		super.childrenCreated();
	}

	itemRenderPersonal = (idx, obj) => {
		let item: LiangCaoPersonItem = obj as LiangCaoPersonItem;
		item.setdata(idx);
	}

	itemRenderServer = (idx, obj) => {
		let item: LiangCaoServerItem = obj as LiangCaoServerItem;
		item.setdata(idx);
	}

	itemRenderScore = (idx, obj) => {
		let item: LiangCaoScoreItem = obj as LiangCaoScoreItem;
		item.setdata(idx);
	}

	update = () => {
		let self = this;
		let model = GGlobal.modelLiangCao;
		let idx = self.c1.selectedIndex;

		switch (idx) {
			case 0:
				self.personList.numItems = 10// model.rankdata_person.length;
				break;

			case 1:
				self.serverList.numItems = 3//model.server_data.length;
				if (model.mvp_name) {
					self.lbMvp.text = model.mvp_name + "\n积分：" + model.mvp_score;
					ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(model.mvp_frame), self.frameIcon);
					ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(model.mvp_head), self.headIcon);
				} else {
					self.lbMvp.text = "";
				}
				ConfigHelp.createViewGridList(self.list, ConfigHelp.getSystemDesc(7601), self);
				break;

			case 2:
				self.scoreList.numItems = model.rankdata_score.length;
				break;
		}
		let rank = model.myRank;
		self.lbRank.text = "我的排名：" + ((rank == 0 || rank > 20) ? "未上榜" : rank);
		self.lbScore.text = "我的积分：" + model.myScore;
		self.tab2.checkNotice = GGlobal.reddot.checkCondition(UIConst.LIANGCAO_RANK);
	}

	onChangeController = () => {
		let idx = this.c1.selectedIndex;
		if (idx == 0) {
			GGlobal.modelLiangCao.CG_BattleGoods_personalRank_10129(0);
		} else if (idx == 1) {
			GGlobal.modelLiangCao.CG_BattleGoods_personalRank_10129(1);
		} else {
			GGlobal.modelLiangCao.CG_BattleGoods_ui_10123();
		}
		this.update();
	}

	eventFun = (v) => {
		let self = this;
		let event = EventUtil.register;
		event(v, self.c1, fairygui.StateChangeEvent.CHANGED, self.onChangeController, self);
	}

	onShown() {
		let self = this;
		self.eventFun(1);
		self.update();
		GGlobal.modelLiangCao.CG_BattleGoods_personalRank_10129(0);
		GGlobal.control.listen(UIConst.LIANGCAO_RANK, self.update, self);
	}

	onHide() {
		let self = this;
		self.eventFun(0);
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.LIANGCAO_RANK, self.update, self);
		GGlobal.layerMgr.close(UIConst.LIANGCAO_RANK);
	}
}