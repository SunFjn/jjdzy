class ViewSettingPanel extends UIModalPanel {

	public c1: fairygui.Controller;
	public viewName: ChildSettingName;
	public viewHead: ChildSettingHead;
	public btnKefu: fairygui.GButton;
	public lbVersion: fairygui.GRichTextField;

	public static URL: string = "ui://dt6yws4jvaaj0";

	public static createInstance(): ViewSettingPanel {
		return <ViewSettingPanel><any>(fairygui.UIPackage.createObject("setting", "ViewSettingPanel"));
	}

	public constructor() {
		super();
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ChildSettingName.URL, ChildSettingName);
		f(ChildSettingHead.URL, ChildSettingHead);
		f(VSettingHead.URL, VSettingHead);
		f(VSettingFrame.URL, VSettingFrame);
		f(VSettingHeadTop.URL, VSettingHeadTop);
		this.loadRes("setting", "setting_atlas0");
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("setting");
		self.view = fairygui.UIPackage.createObject("setting", "ViewSettingPanel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	protected onShown(): void {
		this.c1.selectedIndex = 0
		this.addListen();
	}

	protected onHide(): void {
		this.removeListen();
	}

	private addListen(): void {
		let self = this;
		GGlobal.control.listen(Enum_MsgType.SETTING_CHANGE_HEAD, self.selectPage, self);
		self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
		self.btnKefu.addClickListener(self.onKeFu, self);
		self.viewName.addListen();
		self.viewHead.addListen();
		self.selectPage();
		// let clientVer = ResourceVersionConfig.version;
		let clientVer = "";
		if (GGlobal.loginArg && GGlobal.loginArg.clientversion) {
			clientVer = GGlobal.loginArg.clientversion;
		}
		self.lbVersion.text = "ver：" + clientVer + "  server:" + GGlobal.serverVer+" kfday："+Model_GlobalMsg.kaifuDay;
		if (GGlobal.loginArg.pf && GGlobal.loginArg.pf.indexOf("jysgzj04") != -1) {
			self.btnKefu.text = "刷新游戏";
		} else {
			self.btnKefu.text = "联系客服";
		}
		if (PlatformManager.is1377 || PlatformManager.is350 || PlatformManager.is915
			|| PlatformManager.isDuoYu || PlatformManager.isGaoRe
			|| PlatformManager.isTanWan || PlatformManager.isWanZi) {
			self.btnKefu.visible = false;
		}
	}

	private removeListen(): void {
		GGlobal.layerMgr.close(UIConst.SETTING);
		GGlobal.control.remove(Enum_MsgType.SETTING_CHANGE_HEAD, this.selectPage, this);
		this.btnKefu.removeClickListener(this.onKeFu, this);
		this.viewName.removeListen();
		this.viewHead.removeListen();
		this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
	}

	public selectPage() {
		if (this.c1.selectedIndex == 0) {
			this.viewName.update();
		} else if (this.c1.selectedIndex == 1) {
			this.viewHead.update();
		}
	}

	private onKeFu(): void {
		this.btnKefu.selected = false
		if (GGlobal.loginArg.pf && GGlobal.loginArg.pf.indexOf("jysgzj04") != -1) {
			window.location.reload()//刷新游戏
		} else {
			if (GGlobal.sdk) {
				GGlobal.sdk.Customer();
			} else {
				ViewCommonWarn.text("请点击左侧的悬浮框  【账户】-【在线客服】进行咨询");
			}
		}
		this.closeEventHandler(null);
	}
}