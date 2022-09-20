class ViewActComDbZpLog extends UIModalPanel {

	public frame: fairygui.GLabel;
	public n2: fairygui.GImage;
	public n3: fairygui.GButton;
	public n6: DBLabel;

	public static URL:string = "ui://eh3eod8qve5s4";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("actComDBZP");
		self.view = fairygui.UIPackage.createObject("actComDBZP", "ViewActComDbZpLog").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}


	private updateLog() {
		let str = "";
		let data = GGlobal.model_actCom.single_logData;
		let cfg = Config.scdnfl_272;
		for (let i = 0; i < data.length; i++) {
			let item = data[i];
			let itemname = ConfigHelp.getItemColorName(JSON.parse(cfg[item[0]].reward)[0][1]);
			str += BroadCastManager.reTxt("消耗{0}，抽中了<font color='#ffc334'>{1}倍</font>返利", itemname, item[1] / 100) + "\n";
		}
		this.n6.setText(str);
		this.n6.reScroll();
	}

	private closeHd() {
		GGlobal.layerMgr.close2(UIConst.ACTCOM_DBZP_LOG);
	}
	protected onShown() {
		this.updateLog();
		GGlobal.model_actCom.CG_LOG_SINGLE();
		this.n3.addClickListener(this.closeHd, this);
		GGlobal.control.listen(Enum_MsgType.ACTCOM_SINGLE_LOG, this.updateLog, this);
	}

	protected onHide() {
		this.n3.removeClickListener(this.closeHd, this);
		GGlobal.control.remove(Enum_MsgType.ACTCOM_SINGLE_LOG, this.updateLog, this);
	}
}