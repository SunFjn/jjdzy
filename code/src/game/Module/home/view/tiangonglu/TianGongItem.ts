class TianGongItem extends fairygui.GComponent {

	public grid: ViewGridRender;

	public static URL: string = "ui://y0plc878ye03a";

	public static createInstance(): TianGongItem {
		return <TianGongItem><any>(fairygui.UIPackage.createObject("home", "TianGongItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
	}

	type = 0;
	max = 0;
	vo: IGridImpl;
	isDown = 0;
	lastTime = 0;
	selectNum = 0;
	//type 0为背包内 1为已经选择
	public setdata(vo: IGridImpl, type) {
		const self = this;
		self.vo = vo;
		self.isDown = 0;
		self.grid.vo = vo;
		self.type = type;
		self.grid.grid.showEff(true);
		self.grid.grid.tipEnabled = false;
		self.max = vo.count;
		self.addClickListener(self.clickHd, self);
		// if (type == 1) {
		// 	self.addClickListener(self.cancelSelected, self);
		// } else {
		// 	self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.__mousedown, self);
		// }
		GGlobal.control.listen(HomeModel.BAG_UPDATE, self.resetNum, self);
	}

	private clickHd() {
		const self = this;
		if (self.type == 1) {
			GGlobal.homemodel.selectItemInTianGong(self.vo.id, 0, 0);
			GGlobal.control.notify(HomeModel.BAG_UPDATE, self.vo.id);
		} else {
			GGlobal.layerMgr.open(UIConst.HOME_TGL_ADD, self.vo);
		}
	}

	// private __mousedown(evt: egret.TouchEvent): void {
	// 	const self = this;
	// 	self.isDown = 1;
	// 	self.lastTime = egret.getTimer() + 4000;
	// 	fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_END, self.__mouseup, self);
	// 	Timer.listen(self.notifyCount, self, 100);
	// }

	// private cancelSelected() {
	// 	const self = this;
	// 	GGlobal.homemodel.selectItemInTianGong(self.vo.id, 0, 0);
	// 	GGlobal.control.notify(HomeModel.BAG_UPDATE, self.vo.id);
	// }

	// private notifyCount() {
	// 	const self = this;
	// 	if (egret.getTimer() > self.lastTime) {
	// 		self.selectNum = self.max;
	// 	} else {
	// 		self.selectNum++;
	// 	}

	// 	GGlobal.homemodel.selectItemInTianGong(self.vo.id, self.selectNum, 1);
	// }

	// private __mouseup() {
	// 	const self = this;
	// 	Timer.remove(self.notifyCount, self);
	// 	fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_END, self.__mouseup, self);
	// }

	private resetNum() {
		this.selectNum = 0;
	}

	clean() {
		const self = this;
		self.isDown = 0;
		self.selectNum = 0;
		self.grid.vo = null;
		// Timer.remove(self.notifyCount, self);
		self.removeClickListener(self.clickHd, self);
		GGlobal.control.remove(HomeModel.BAG_UPDATE, self.resetNum, self);
		// self.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.__mousedown, self);
		// fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_END, self.__mouseup, self);
	}
}