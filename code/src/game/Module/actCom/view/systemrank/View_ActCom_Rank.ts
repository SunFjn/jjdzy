class View_ActCom_Rank extends UIModalPanel {
	public list: fairygui.GList;
	public txtImg: fairygui.GLoader;
	public frame: WindowFrame1;
	public static URL: string = "ui://qz5r0meldsdy5";

	public static createInstance(): View_ActCom_Rank {
		return <View_ActCom_Rank><any>(fairygui.UIPackage.createObject("ActCom_SystemRank", "View_ActCom_Rank"));
	}
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated() {
		let self = this;
		const view = fairygui.UIPackage.createObject("ActCom_SystemRank", "View_ActCom_Rank").asCom;
		self.contentPane = view;
		CommonManager.parseChildren(view, self);
		self.list.itemRenderer = self.onListRender;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private onListRender(index: number, render: Item_ActCom_Rank) {
		let s = this;
		render.setData(s.datas[index], s.indexs[index]);
	}

	public onShown() {
		let s = this;
		s.txtImg.url = CommonManager.getUrl("ActCom_SystemRank", "" + Model_GlobalMsg.sysID);
		let cfg: Ipmhdsbdjcsb_326 = Config.pmhdsbdjcsb_326[Model_GlobalMsg.sysID];
		s.frame.text = cfg.name + "排名";
		s.onUpdate();
	}

	public onHide() {
		let s = this;
		s.list.numItems = 0;
	}

	private datas: Vo_SystemRank[] = [];
	private indexs = [];
	private onUpdate() {
		let self = this;
		self.datas = [];
		self.indexs = [];
		for (var i: number = 0; i < 20; i++) {
			let vo: Vo_SystemRank = Model_GlobalMsg.rankData[i];
			self.datas.push(vo);
			self.indexs.push(i);
		}
		self.list.numItems = self.datas.length;
	}
}