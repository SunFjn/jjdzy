class View_YanHuiScene_TopPanel extends fairygui.GComponent {

	public nameLb: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;
	public lookLb: fairygui.GRichTextField;
	public smLb: fairygui.GRichTextField;
	public fwLb0: fairygui.GRichTextField;
	public fwLb1: fairygui.GRichTextField;
	public fwLb2: fairygui.GRichTextField;
	public fwLb3: fairygui.GRichTextField;
	public fwLb4: fairygui.GRichTextField;
	public timeLb: fairygui.GRichTextField;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	public grid2: ViewGrid;
	public grid3: ViewGrid;
	public grid4: ViewGrid;
	public expBar: fairygui.GProgressBar;
	public gridArr: ViewGrid[];
	public fwLbArr: fairygui.GRichTextField[];

	public static URL: string = "ui://4x7dk3lhgz25h";
	private static _instance: View_YanHuiScene_TopPanel;
	public static createInstance(): View_YanHuiScene_TopPanel {
		if (!View_YanHuiScene_TopPanel._instance)
			View_YanHuiScene_TopPanel._instance = <View_YanHuiScene_TopPanel><any>(fairygui.UIPackage.createObject("YanHui", "View_YanHuiScene_TopPanel"));
		return View_YanHuiScene_TopPanel._instance;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.gridArr = [self.grid0, self.grid1, self.grid2, self.grid3, self.grid4];
		self.fwLbArr = [self.fwLb0, self.fwLb1, self.fwLb2, self.fwLb3, self.fwLb4];
	}

	public updateShow() {
		let self = this;
		let model = GGlobal.modelYanHui;
		let max = 0;
		if (model.fwArr.length <= 0) return;
		self.nameLb.text = HtmlUtil.fontNoSize(model.roleName, Color.getColorStr(2)) + "的" + Config.party_298[model.yanHuiType].name;
		self.numLb.text = ConfigHelp.reTxt("参与人数：{0}/{1}", model.num, Config.party_298[model.yanHuiType].num);
		let fwArr = model.fwArr[model.yanHuiType - 1];
		for (let i = 0; i < self.gridArr.length; i++) {
			let cfg: Ipartyfw_298 = fwArr[i][0];
			self.fwLbArr[i].text = "" + cfg.fw;
			self.gridArr[i].isShowEff = true;
			self.gridArr[i].tipEnabled = false;
			self.gridArr[i].data = i;
			self.gridArr[i].vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
			if (i == self.gridArr.length - 1) {
				max = cfg.fw;
			}
		}
		self.expBar.value = model.fwNum;
		self.expBar.max = max;
		let times = ConfigHelp.getSurTime(model.times);
		if (times > 0) {
			self.timeLb.text = "剩余时间：" + DateUtil2.formatUsedTime(times, "hh:uu:ss");
			if (!Timer.instance.has(self.timeHandler, self)) {
				Timer.instance.listen(self.timeHandler, self, 1000);
			}
		} else {
			Timer.instance.remove(self.timeHandler, self);
		}
	}

	private timeHandler() {
		let self = this;
		let model = GGlobal.modelYanHui;
		let times = ConfigHelp.getSurTime(model.times);
		if (times > 0) {
			self.timeLb.text = "剩余时间：" + DateUtil2.formatUsedTime(times, "hh:uu:ss");
		} else {
			Timer.instance.remove(self.timeHandler, self);
		}
	}

	public onShown() {
		let self = this;
		self.updateShow();
		self.register(true);
	}

	public onHide() {
		let self = this;
		ConfigHelp.cleanGridEff(self.gridArr);
		Timer.instance.remove(self.timeHandler, self);
		self.register(false);
	}

	private register(pFlag: boolean) {
		let self = this;
		EventUtil.register(pFlag, self.lookLb, egret.TouchEvent.TOUCH_TAP, self.onLook, self);
		EventUtil.register(pFlag, self.smLb, egret.TouchEvent.TOUCH_TAP, self.onSM, self);
		GGlobal.control.register(pFlag, UIConst.YANHUI, self.updateShow, self);
		for (let i = 0; i < self.gridArr.length; i++) {
			EventUtil.register(pFlag, self.gridArr[i], egret.TouchEvent.TOUCH_TAP, self.onGrid, self);
		}
	}

	private onGrid(evt: egret.TouchEvent) {
		let model = GGlobal.modelYanHui;
		GGlobal.layerMgr.open(UIConst.YANHUI_FWREWARD, model.fwArr[model.yanHuiType - 1][evt.target.data])
	}

	private onSM(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.YANHUI);
	}

	private onLook(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.YANHUI_BKLIST);
	}
}