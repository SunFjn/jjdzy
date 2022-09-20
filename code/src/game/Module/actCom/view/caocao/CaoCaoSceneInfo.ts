class CaoCaoSceneInfo extends fairygui.GComponent {
	public lbMyhurt: fairygui.GRichTextField;
	public lbBest: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public btn: fairygui.GButton;
	private n15: fairygui.GGroup;
	private n13: fairygui.GGroup;

	public static URL: string = "ui://n6fub9ddeq411";

	public static createInstance(): CaoCaoSceneInfo {
		return <CaoCaoSceneInfo><any>(fairygui.UIPackage.createObject("CaoCaoLaiXi", "CaoCaoSceneInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.n15.x += GGlobal.layerMgr.offx;
		self.n13.x += GGlobal.layerMgr.offx;
		self.setXY(fairygui.GRoot.inst.width - self.width, 350);
	}

	public timeUpdate() {
		let self = this;
		var data = JSON.parse(ConfigHelp.getSystemDesc(7020));
		var t = Model_GlobalMsg.getServerTime();
		var nowData = new Date(t);
		var hour = nowData.getHours();
		var min = nowData.getMinutes();
		var sec = nowData.getSeconds();
		var nextIndex: number = -1;
		for (var i = 0; i < 3; i++) {
			if (hour == data[i][0]) {
				nextIndex = i;
				break;
			}
		}
		if (nextIndex == -1) {
			var time = 0;
		} else {
			time = (data[nextIndex][1] - min + 30) * 60 - sec;
		}
		self.lbTime.text = TimeUitl.getRemainingTime(time * 1000, 0, { minute: "分", second: "秒" });
	}

	private openRank() {
		GGlobal.layerMgr.open(UIConst.CAOCAO_LAIXI_RANK, 1);
	}

	private updateMyHurt() {
		let self = this;
		var m = GGlobal.modelCaoCao;
		var d = m.rankData;
		if (d.length) {
			self.lbMyhurt.text = "<font color='#ffc334'>自己：</font>" + ConfigHelp.getYiWanText(m.myHurt) +
				"       <font color='#ffc334'>1st:</font>" + d[0][1] + "   " + ConfigHelp.getYiWanText(d[0][2]);
		} else {
			self.lbMyhurt.text = "<font color='#ffc334'>自己：</font>" + ConfigHelp.getYiWanText(m.myHurt);
		}
	}

	public onopen() {
		let self = this;
		MainUIController.addChildToUI(CaoCaoSceneInfo.instance, 1);
		self.updateMyHurt();
		GGlobal.control.listen(UIConst.CAOCAO_LAIXI_RANK, self.updateMyHurt, self);
		Timer.instance.listen(self.timeUpdate, self, 1000);
		self.btn.addClickListener(self.openRank, self)
	}

	public onclose() {
		let self = this;
		MainUIController.removeUI(CaoCaoSceneInfo.instance);
		GGlobal.control.remove(UIConst.CAOCAO_LAIXI_RANK, self.updateMyHurt, self);
		Timer.instance.remove(self.timeUpdate, self);
		self.btn.removeClickListener(self.openRank, self)
	}

	private static _instance: CaoCaoSceneInfo;
	public static get instance(): CaoCaoSceneInfo {
		if (!CaoCaoSceneInfo._instance) CaoCaoSceneInfo._instance = CaoCaoSceneInfo.createInstance();
		return CaoCaoSceneInfo._instance;
	}
}