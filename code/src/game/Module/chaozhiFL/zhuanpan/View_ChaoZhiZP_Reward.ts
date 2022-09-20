class View_ChaoZhiZP_Reward extends UIModalPanel {

	public list: fairygui.GList;
	public surebt: fairygui.GButton;
	public alginbt: fairygui.GButton;
	public lab: fairygui.GRichTextField;
	public img: fairygui.GLoader;

	public static URL: string = "ui://qzsojhcrhn3o4";

	public constructor() {
		super();
		this.loadRes("bossTiShi", "bossTiShi_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("bossTiShi");
		let a = this;
		a.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
		a.contentPane = a.view;
		a.list = <fairygui.GList><any>(a.view.getChild("list"));
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandler;
		a.surebt = <fairygui.GButton><any>(a.view.getChild("surebt"));
		a.surebt.addClickListener(a.OnSure, a);
		a.alginbt = <fairygui.GButton><any>(a.view.getChild("continuebt"));
		a.alginbt.addClickListener(a.alginHandler, a);
		a.isShowMask = true;
		a.isShowOpenAnimation = false;
		a.closeButton = a.view.getChild("closeButton");

		a.lab = <fairygui.GRichTextField><any>(a.view.getChild("lab"));
		a.img = <fairygui.GLoader><any>(a.view.getChild("img"));
		a.lab.text = ""
		a.img.visible = false;
		a.surebt.y = 389 + 20
		a.alginbt.y = 389 + 20
		super.childrenCreated();
	}

	public handler: Handler;
	private alginHandler() {
		if (this.handler) this.handler.run();
		this.doHideAnimation();
	}

	private OnSure() {
		this.doHideAnimation();
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as ViewGridRender;
		grid.vo = this.rewardArr[index];
	}

	private rewardArr = [];
	private times = 10;
	private updateShow() {
		this.times = 11;
		this.rewardArr = Model_ChaoZhiFL.zpRewardArr;
		this.list.numItems = this.rewardArr.length;
		if (this.rewardArr.length > 1) {
			this.alginbt.text = "再来10次";
		} else {
			this.alginbt.text = "再来1次";
		}
		Timer.instance.listen(this.timeHandler, this, 1000);
	}

	private timeHandler() {
		this.times--;
		this.surebt.text = "确定(" + this.times + "s)";
		if (this.times <= 0) {
			this.doHideAnimation();
		}
	}

	protected onShown(): void {
		let s = this;
		s.handler = s._args;
		s.updateShow();
		for (let i = 0; i < s.rewardArr.length; i++) {
			let gridVo: IGridImpl = s.rewardArr[i]
			ViewBroadcastItemText.text("获得了【" + gridVo.name + "】 X" + gridVo.count, gridVo.qColor);
		}
	}

	protected onHide(): void {
		let s = this;
		s.list.numItems = 0;
		Timer.instance.remove(s.timeHandler, s);
		GGlobal.layerMgr.close(UIConst.CHAOZHI_ZHUANPAN_REWARD);
	}
}