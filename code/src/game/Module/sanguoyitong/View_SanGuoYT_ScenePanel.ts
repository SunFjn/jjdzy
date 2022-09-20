class View_SanGuoYT_ScenePanel extends UIModalPanel {

	public bar0: fairygui.GLoader;
	public numlb0: fairygui.GRichTextField;
	public bar1: fairygui.GLoader;
	public numlb1: fairygui.GRichTextField;
	public bar2: fairygui.GLoader;
	public numlb2: fairygui.GRichTextField;
	public countryImg: fairygui.GLoader;
	public resTimeLb: fairygui.GRichTextField;
	public activityTime: fairygui.GRichTextField;
	public smLb: fairygui.GRichTextField;
	public static URL: string = "ui://z4ijxlqklyu5u";
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.isClosePanel = self.isShowMask = false;
		self.view = fairygui.UIPackage.createObject("sanGuoYiTong", "View_SanGuoYT_ScenePanel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.smLb.text = HtmlUtil.createLink("玩法说明", true);
		super.childrenCreated();
		self.smLb.addEventListener(egret.TextEvent.LINK, self.linkHandler, self);
	}

	private linkHandler(event: egret.TextEvent) {
		event.stopPropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SANGUO_YITONG);
	}

	public updateShow() {
		let self = this;
		let model = GGlobal.modelSanGuoYT;
		let max = 0;
		for (let i = 0; i < model.jifenArr.length; i++) {
			if (model.jifenArr[i] > max) max = model.jifenArr[i];
		}
		let barArr = [4, 1, 5]
		for (let i = 0; i < model.jifenArr.length; i++) {
			self["bar" + i].width = max == 0 ? 0 : 257 * (model.jifenArr[i] / max);
			self["numlb" + i].text = Model_Country.getCountryName(i + 1) + ":" + model.jifenArr[i];
			IconUtil.setImg(self["bar" + i], Enum_Path.PIC_URL + "BM_BOXT" + barArr[i] + ".png");
		}
	}

	protected onShown(): void {
		let self = this;
		self.updateShow();
		GGlobal.reddot.listen(UIConst.SANGUO_YITONG, self.updateShow, self);
	}

	protected onHide(): void {
		let self = this;
		GGlobal.layerMgr.close(UIConst.SANGUO_YITONG_SCENE)
		GGlobal.reddot.remove(UIConst.SANGUO_YITONG, self.updateShow, self);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, GGlobal.layerMgr.uiAlign + ViewMainTopUI.instance.height - 20);
	}
}