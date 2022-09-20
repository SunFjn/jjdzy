class ViewActComDbZpAwards extends UIModalPanel {

	public n0: fairygui.GLoader;
	public n1: fairygui.GImage;
	public surebt: fairygui.GButton;
	public continuebt: fairygui.GButton;
	public lab: fairygui.GRichTextField;
	public img: fairygui.GLoader;
	public closeButton: fairygui.GButton;
	public lb: fairygui.GRichTextField;
	public n11: ViewGridRender;
	public lbAwards: fairygui.GRichTextField;

	public static URL:string = "ui://eh3eod8qve5s3";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("actComDBZP");
		self.view = fairygui.UIPackage.createObject("actComDBZP", "ViewActComDbZpAwards").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	private closeHD() {
		GGlobal.layerMgr.close2(UIConst.ACTCOM_DBZP_AWARDS);
	}

	protected onShown() {
		this.times = 11;
		let id = this._args.id;
		let cfgid = this._args.cfgid;
		let cfgzp = Config.dbflzp_281[cfgid];
		let beishu = cfgzp.cz / 100;

		let cfg = Config.dbfl_281[id];
		let voi = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
		let awards = JSON.parse(cfg.yb)[0][2];

		let vo = VoItem.create(4);
		vo.count = awards * beishu;
		this.n11.vo = vo;
		this.n11.grid.showEff(true);
		this.n11.grid.tipEnabled = true;
		this.closeButton.addClickListener(this.closeHD, this);
		this.surebt.addClickListener(this.closeHD, this);
		this.continuebt.addClickListener(this.oneceMore, this);
		Timer.instance.listen(this.timeHandler, this, 1000);
		let s = this;
		s.lab.text = GGlobal.model_actCom.single_key + "/1";
		this.lb.text = "本次钥匙：" + voi.name;
		this.lbAwards.text = BroadCastManager.reTxt("本次转盘：<font color='#ffc334'>{0}倍元宝</font>", beishu);
		IconUtil.setImg(this.n0, Enum_Path.BACK_URL + "awardsbg.png");
	}

	protected onHide(): void {
		IconUtil.setImg(this.n0, null);
		this.n11.grid.showEff(false);
		this.n11.grid.tipEnabled = false;
		this.closeButton.removeClickListener(this.closeHD, this);
		this.surebt.removeClickListener(this.closeHD, this);
		this.continuebt.removeClickListener(this.oneceMore, this);
		Timer.instance.remove(this.timeHandler, this);
	}

	private OnSure() {
		this.doHideAnimation();
	}

	public callBackHandler: Handler;
	private oneceMore() {
		this.doHideAnimation();
		if (GGlobal.layerMgr.isOpenView(UIConst.ACTCOM) == false) {
			ViewCommonWarn.text("请先打开活动界面");
			return;
		}
		let m = GGlobal.model_actCom;
		if (m.single_key > 0) {
			m.CG_TURN_SINGLE();
		} else {
			ViewCommonWarn.text("钥匙不足");
		}
		this.closeHD();
	}

	private times = 10;
	private timeHandler() {
		this.times--;
		this.surebt.text = "确定(" + this.times + ")";
		if (this.times <= 0) {
			this.doHideAnimation();
		}
	}
}