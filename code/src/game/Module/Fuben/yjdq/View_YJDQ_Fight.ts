class View_YJDQ_Fight extends UIModalPanel {
	public bg1: ViewBg1;
	public typeIcon: fairygui.GLoader;
	public titleIcon: fairygui.GLoader;
	public passLb: fairygui.GRichTextField;
	public sureBt: fairygui.GButton;
	private list: fairygui.GList;
	public static URL: string = "ui://pkuzcu87b8ve9";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_Fight").asCom;
		a.contentPane = a.view;
		CommonManager.parseChildren(a.view, a);
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandler;
		a.isShowOpenAnimation = false;
		super.childrenCreated();
		a.sureBt.addClickListener(a.sureHandle, a);
	}

	private renderHandler(index: number, obj: fairygui.GObject): void {
		let grid: ViewGridRender = obj as ViewGridRender;
		let a = this;
		let vo: IGridImpl;
		if (a.rewardArr[index][0] == Enum_Attr.ITEM) {
			vo = VoItem.create(a.rewardArr[index][1]);
			vo.count = a.rewardArr[index][2];
		} else if (a.rewardArr[index][0] == Enum_Attr.EQUIP) {
			vo = VoEquip.create(a.rewardArr[index][1]);
			vo.count = a.rewardArr[index][2];
		} else {
			vo = Vo_Currency.create(a.rewardArr[index][0]);
			vo.count = a.rewardArr[index][2];
		}
		grid.vo = vo;
	}

	private sureHandle(): void {
		this.doHideAnimation();
		if (GGlobal.sceneType == SceneCtrl.YJDQ) {
			GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		}
	}

	private rewardArr = [];
	public updateShow(): void {
		let a = this;
		if (this._args == 1) {
			a.titleIcon.url = "ui://jvxpx9emi6im6i";
		} else {
			a.titleIcon.url = "ui://jvxpx9emi6im6j";
		}
		let cfg = Config.yiqi_007[Model_YJDQ.curPass];
		if (cfg) {
			a.typeIcon.url = CommonManager.getUrl("FuBen", "type" + cfg.type);
			a.passLb.text = cfg.bo + "波";
			a.rewardArr = JSON.parse(cfg.pile);
			a.list.numItems = a.rewardArr.length;
		} else {
			a.typeIcon.url = CommonManager.getUrl("FuBen", "type" + Math.floor(Model_YJDQ.curPass / 1000));
			a.passLb.text = "0波";
			a.list.numItems = 0;
		}
		a.sureBt.text = "确定(10)";
	}

	private timeRun(): void {
		let a = this;
		a.times--;
		a.sureBt.text = "确定(" + a.times + ")";
		if (a.times <= 0) {
			a.doHideAnimation();
		}
	}

	private times: number = 10;
	protected onShown(): void {
		let a = this;
		if (a._args) {
			a.times = 10;
			a.updateShow();
			if (!Timer.instance.has(a.timeRun, a)) {
				Timer.instance.listen(a.timeRun, a, 1000);
			}
		}
	}

	protected onHide(): void {
		let a = this;
		ConfigHelp.cleanGridview(a.list._children);
		GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_WIN);
		Timer.instance.remove(a.timeRun, a);
		GGlobal.modelScene.returnMainScene();
	}
}