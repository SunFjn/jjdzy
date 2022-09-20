class View_SanGuoYT_ButtomUI extends fairygui.GComponent {
	public rewardBt: Button2;
	public exitBt: Button1;
	public static URL: string = "ui://z4ijxlqkmo6gx";


	private static _inst: ViewWenDingTXBottomUI;
	public static createInstance(): ViewWenDingTXBottomUI {
		if (!this._inst) {
			this._inst = <ViewWenDingTXBottomUI><any>(fairygui.UIPackage.createObject("sanGuoYiTong", "View_SanGuoYT_ButtomUI"));
		}
		return this._inst;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		self.rewardBt = <Button2><any>(self.getChild("rewardBt"));
		self.exitBt = <Button1><any>(self.getChild("exitBt"));
	}

	private onExit() {
		GGlobal.modelSanGuoYT.CG_EXIT_SCENE_5803();
	}

	private onReward() {
		GGlobal.layerMgr.open(UIConst.SANGUO_YITONG_SCENE_REWARD);
	}

	private openRank() {
		if (TimeUitl.cool("ViewWenDingTXBottomUI", 1000)) {
			GGlobal.layerMgr.open(UIConst.WENDINGTX_RANK);
		}
	}

	private checkNotice() {
		this.rewardBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 1) || GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 2) || GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 3);;
	}

	public toShow() {
		let self = this;
		let pat = GGlobal.layerMgr.UI_MainBottom;
		pat.addChild(self);
		self.resetPostion();
		self.rewardBt.addClickListener(self.onReward, self);
		self.exitBt.addClickListener(self.onExit, self);
		GGlobal.reddot.listen(UIConst.WENDINGTX, self.checkNotice, self);
	}

	public toHide() {
		let self = this;
		GGlobal.reddot.remove(UIConst.WENDINGTX, self.checkNotice, self);
		self.rewardBt.removeClickListener(self.onReward, self);
		self.exitBt.addClickListener(self.onExit, self);
		self.removeFromParent();
	}

	public resetPostion() {
		let a = this;
		a.setXY((fairygui.GRoot.inst.width - a.width) >> 1, fairygui.GRoot.inst.height - 290);
	}
}