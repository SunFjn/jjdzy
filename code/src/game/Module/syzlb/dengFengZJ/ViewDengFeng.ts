class ViewDengFeng extends fairygui.GComponent implements IPanel {

	public c1: fairygui.Controller;
	public vFinal: Child_DFZJ_Final;
	public vSea: Child_DFZJ_SeaSel;
	public btn0: Button2;
	public btn1: Button2;

	public static URL: string = "ui://3o8q23uujo891w";

	public static createInstance(): ViewDengFeng {
		return <ViewDengFeng><any>(fairygui.UIPackage.createObject("syzlb", "ViewDengFeng"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public initView(pParent: fairygui.GObject) {

	}

	public openPanel(pData?: any) {
		let s = this;
		s.registerEvent(true);
		let m = GGlobal.modelDengFengZJ;
		if (m.status == 2) {
			s.c1.selectedIndex = 1;
		} else {
			s.c1.selectedIndex = 0;
		}
		s.updateShow()
		s.updateNotice()
	}

	public closePanel(pData?: any) {
		let self = this;
		self.registerEvent(false);
		self.vFinal.hide();
		self.vSea.hide();
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
		GGlobal.reddot.register(pFlag, UIConst.DENG_FENG_SEA, self.updateNotice, self);
		GGlobal.reddot.register(pFlag, UIConst.DENG_FENG_FINAL, self.updateNotice, self);
	}

	private updateShow() {
		let s = this;
		if (s.c1.selectedIndex == 0) {
			s.vSea.show();
			s.vFinal.hide();
		} else {
			s.vSea.hide();
			s.vFinal.show();
		}
	}
	public updateNotice() {
		let self = this;
		self.btn0.checkNotice = GGlobal.reddot.checkCondition(UIConst.DENG_FENG_SEA, 0);
		self.btn1.checkNotice = GGlobal.reddot.checkCondition(UIConst.DENG_FENG_FINAL, 0);
	}
}