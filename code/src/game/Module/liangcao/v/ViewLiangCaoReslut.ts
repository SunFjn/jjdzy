class ViewLiangCaoReslut extends UIModalPanel {

	public frame: fairygui.GLabel;
	public n3: fairygui.GImage;
	public n4: fairygui.GLoader;
	public n5: fairygui.GButton;
	public n6: fairygui.GImage;
	public n7: fairygui.GList;
	public n15: fairygui.GImage;
	public n16: fairygui.GImage;
	public lbMvpName: fairygui.GTextField;
	public n10: fairygui.GTextField;
	public imgHead: fairygui.GLoader;
	public imgHeadGrid: fairygui.GLoader;
	public groupHead: fairygui.GGroup;

	public static URL: string = "ui://mbcu0qc0hd20g";

	public static createInstance(): ViewLiangCaoReslut {
		return <ViewLiangCaoReslut><any>(fairygui.UIPackage.createObject("liangcao", "ViewLiangCaoReslut"));
	}

	public constructor() {
		super();
		this.loadRes("liangcao", "liangcao_atlas0");
	}

	protected childrenCreated(): void {
		var self = this;
		GGlobal.createPack("liangcao");
		self.view = fairygui.UIPackage.createObject("liangcao", "ViewLiangCaoReslut").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);


		self.n7.callbackThisObj = self;
		self.n7.itemRenderer = self.itemRender;
		super.childrenCreated();
	}

	maxScore = 0;
	itemRender = (idx, obj) => {
		let item: LiangCaoScoreBar = obj as LiangCaoScoreBar;
		item.setdata(idx, 1, this.maxScore);
	}


	onSure = () => {
		GGlobal.layerMgr.close2(UIConst.LIANGCAO_RESULT);
	}

	update = () => {
		let self = this;
		let model = GGlobal.modelLiangCao;
		if (model.mvp_name) {
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(model.mvp_frame), self.imgHeadGrid);
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(model.mvp_head), self.imgHead);
			self.lbMvpName.text = model.mvp_name;
		} else {
			self.lbMvpName.text = "";
		}

		self.maxScore = model.getMaxScore();
		self.n7.numItems = 3;
	}

	eventFun = (v) => {
		let self = this;
		let event = EventUtil.register;
		event(v, self.n5, EventUtil.TOUCH, self.onSure, self);
	}

	onShown() {
		let self = this;
		self.update();
		self.eventFun(1);
	}

	onHide() {
		let self = this;
		self.eventFun(0);
		GGlobal.layerMgr.close(UIConst.LIANGCAO_RESULT);
		self.n7.numItems = 0;
	}
}