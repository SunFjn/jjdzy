/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewHomeRank extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public btnRight: fairygui.GButton;
	public btnLeft: fairygui.GButton;
	public n5: fairygui.GRichTextField;
	public lbMyRank: fairygui.GRichTextField;

	public static URL: string = "ui://y0plc878sbl7d";

	public static createInstance(): ViewHomeRank {
		return <ViewHomeRank><any>(fairygui.UIPackage.createObject("home", "ViewHomeRank"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHomeRank").asCom;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		self.list.setVirtual();
	}

	private itemRender(idx, obj) {
		let item: ItemHomeRank = obj as ItemHomeRank;
		item.setdata(idx);
	}

	leftHd = () => {
		const self = this;
		const model = GGlobal.homemodel;
		model.currentPage--;
		model.currentPage = model.currentPage < 1 ? 1 : model.currentPage;
		model.CG_House_rank_11121();
		self.list.scrollToView((model.currentPage-1)*5);
	}

	rightHd = () => {
		const self = this;
		const model = GGlobal.homemodel;
		model.currentPage++;
		model.currentPage = model.currentPage > model.maxPage ? model.maxPage : model.currentPage;
		self.list.scrollToView((model.currentPage-1)*5);
		model.CG_House_rank_11121();
	}

	private scrollComp(): void {
		let curpage: number = this.list.getFirstChildInView();
		const model = GGlobal.homemodel;
		model.currentPage = ((curpage/5)>>0) +1;
		this.n5.text = model.currentPage + "/" + model.maxPage;
	}


	update = () => {
		const self = this;
		const model = GGlobal.homemodel;
		self.n5.text = model.currentPage + "/" + model.maxPage;
		self.list.numItems = model.homeRank_data.length;
		if (model.myRank >= 1 && model.myRank <= 50) {
			self.lbMyRank.text = "我的排名：" + model.myRank;
		} else {
			self.lbMyRank.text = "我的排名：50+";
		}
	}

	public eventFunction(type) {
		const self = this;
		const model = GGlobal.homemodel;
		EventUtil.register(type, self.btnLeft, EventUtil.TOUCH, self.leftHd, self);
		EventUtil.register(type, self.btnRight, EventUtil.TOUCH, self.rightHd, self);
		EventUtil.register(type,self.list.scrollPane, fairygui.ScrollPane.SCROLL, self.scrollComp, self);
		// s.listPoint.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, s.scrollComp, s);
		// s.listPoint.addEventListener(fairygui.ItemEvent.CLICK, s.onGetPoint, s)
	}

	onShown() {
		const self = this;
		const model = GGlobal.homemodel;
		model.currentPage = 1;
		model.CG_House_rank_11121();
		GGlobal.control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
	}

	onHide() {
		const self = this;
		self.list.scrollToView(0, false, false);
		GGlobal.control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		GGlobal.layerMgr.close(UIConst.HOME_LIST_UI);
	}

}