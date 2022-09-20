class YiShowBossScenePanel extends fairygui.GComponent {
	public n0: fairygui.GImage;
	public lbTime: fairygui.GRichTextField;
	public n2: fairygui.GImage;
	public imgHead: fairygui.GLoader;
	public imgGrid: fairygui.GLoader;
	public n7: fairygui.GRichTextField;
	public imgNull: fairygui.GImage;
	public lbName: fairygui.GRichTextField;

	public static URL: string = "ui://47jfyc6el44i3p";

	private static _inst;
	public static createInstance(): YiShowBossScenePanel {
		return YiShowBossScenePanel._inst || (YiShowBossScenePanel._inst = <YiShowBossScenePanel><any>(fairygui.UIPackage.createObject("Boss", "YiShowBossScenePanel")));
	}
	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	resetTime=()=>{
		this._time = 120000 + Model_GlobalMsg.getServerTime();
	}

	timeUpdate = () => {
		let self = this;
		let remaindSec = ((self._time - Model_GlobalMsg.getServerTime()) / 1000) >> 0;
		if (remaindSec <= 0) {
			YiShouBossCtrl.getInst().startResult();
		} else {
			self.lbTime.text ="剩余时间：\n"+ DateUtil.getMSBySec3(remaindSec);
		}
	}

	_time = 120;
	public showOrHide(v) {
		let self = this;
		let m = GGlobal.modelYiShouBOSS;
		if (v) {
			self.setXY(440, 400);
			GGlobal.layerMgr.UI_MainLowBottom.addChild(self);
			self._time = 120000 + Model_GlobalMsg.getServerTime();
			Timer.instance.listen(self.timeUpdate, self, 1000);
			if (m.firstKiler_Grid == 0) {
				ImageLoader.instance.loader(RoleUtil.getHeadRole("2001"), self.imgGrid);
			} else {
				var framePic = Config.shezhi_707[m.firstKiler_Grid];
				ImageLoader.instance.loader(RoleUtil.getHeadRole(framePic.picture + ""), self.imgGrid);
			}

			if (m.firstKiler_head == 0) {
				ImageLoader.instance.loader(RoleUtil.getHeadRole("tx_00"), self.imgHead);
				self.lbName.text = "";
				self.imgNull.visible = true;
			} else {
				var headPic = Config.shezhi_707[m.firstKiler_head];
				ImageLoader.instance.loader(RoleUtil.getHeadRole(headPic.picture + ""), self.imgHead);
				self.lbName.text = m.FirstKiller;
				self.imgNull.visible = false;
			}

		} else {
			Timer.instance.remove(self.timeUpdate, self);
			this.removeFromParent();
		}
	}
}