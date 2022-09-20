class ZFZJSceneInfo extends fairygui.GComponent {
	public lbMyhurt: fairygui.GRichTextField;
	public lbBest: fairygui.GRichTextField;

	public static URL: string = "ui://4h4iwgjrr3jen";
	public static createInstance(): ZFZJSceneInfo {
		return <ZFZJSceneInfo><any>(fairygui.UIPackage.createObject("ActCom_ZFZJ", "ZFZJSceneInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.setXY(fairygui.GRoot.inst.width - self.width, 350);
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
		MainUIController.addChildToUI(ZFZJSceneInfo.instance, 1);
		self.updateMyHurt();
		GGlobal.control.listen(Enum_MsgType.ZFZJ_UPDATEHURT, self.updateMyHurt, self);
	}

	public onclose() {
		let self = this;
		MainUIController.removeUI(ZFZJSceneInfo.instance);
		GGlobal.control.remove(Enum_MsgType.ZFZJ_UPDATEHURT, self.updateMyHurt, self);
	}

	private static _instance: ZFZJSceneInfo;
	public static get instance(): ZFZJSceneInfo {
		if (!ZFZJSceneInfo._instance) ZFZJSceneInfo._instance = ZFZJSceneInfo.createInstance();
		return ZFZJSceneInfo._instance;
	}
}