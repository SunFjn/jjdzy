class ViewShaoZhuActHongBao extends UIModalPanel {

	public list: fairygui.GList;
	public surebt: Button0;
	public continuebt: Button1;
	public lab: fairygui.GRichTextField;
	public img: fairygui.GLoader;

	public constructor() {
		super();
		this.loadRes("bossTiShi", "bossTiShi_atlas0");
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("bossTiShi");
		self.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.surebt.addClickListener(self.OnSure, self);
		self.isShowOpenAnimation = false;
		self.closeButton = self.view.getChild("closeButton");
		super.childrenCreated();
	}

	public onOpen(arg) {
		this.rewardArr = arg;
		super.onOpen(arg);
	}

	protected onShown() {
		let _bigAwards = [];
		let _defaultAwards = [];
		let ii = 0;
		let len = this.rewardArr.length;
		for (ii = 0; ii < len; ii++) {
			let item = this.rewardArr[ii]
			if (item.isBig) {
				_bigAwards.push(item);
			} else {
				_defaultAwards.push(item);
			}
		}
		this.rewardArr = _bigAwards.concat(_defaultAwards);
		this.list.numItems = this.rewardArr.length;
		this.times = 11;
		Timer.instance.listen(this.timeHandler, this, 1000);
		this.continuebt.visible = false;
		this.img.visible = false;
		this.lab.visible = false;
		this.surebt.setXY(255, 389);
	}

	protected onHide(): void {
		this.list.numItems = 0;
		Timer.instance.remove(this.timeHandler, this);
		GGlobal.layerMgr.close(UIConst.SHAOZHU_HONGBAO_AWARDS);
	}

	public static isGuide: boolean = false;
	private OnSure() {
		this.doHideAnimation();
	}

	public bigAward: any
	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as ViewGridRender;
		let v = this.rewardArr[index];
		if (v.isBig) {
			v.item.extra = 5;
		} else {
			v.item.extra = 0;
		}
		grid.vo = v.item;
	}

	private rewardArr = [];
	private times = 10;

	private timeHandler() {
		this.times--;
		this.surebt.text = "确定(" + this.times + ")";
		if (this.times <= 0) {
			this.doHideAnimation();
		}
	}
}