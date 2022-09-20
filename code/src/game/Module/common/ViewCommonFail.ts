class ViewCommonFail extends UIModalPanel {

	//>>>>start
	public bg1: ViewBg1;
	public btnClose: Button1;
	public btn0: fairygui.GLoader;
	public btn1: fairygui.GLoader;
	public btn2: fairygui.GLoader;
	public btn4: fairygui.GLoader;
	public txtXieZhu: fairygui.GRichTextField;
	//>>>>end

	public static URL: string = "ui://jvxpx9emnn9875";


	public constructor() {
		super();
		this.isClosePanel = false;
		this.loadRes();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "ViewBattleFault").asCom;
		this.contentPane = this.view;

		CommonManager.parseChildren(this.view, this);

		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.WU_JIANG + ".png", this.btn0)
		this.btn0.addClickListener(this.openWJ, this);
		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.SHEN_JIAN + ".png", this.btn1)
		this.btn1.addClickListener(this.openSJ, this);
		this.btn2.addClickListener(this.openBW, this);
		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.BAOWU + ".png", this.btn2)
		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.TIANSHU + ".png", this.btn4)
		this.btn4.addClickListener(this.openTS, this);

		super.childrenCreated();
	}

	private openWJ() {
		this.onExitT();
		GGlobal.layerMgr.open(UIConst.WU_JIANG);
	}
	private openBW() {
		this.onExitT();
		GGlobal.layerMgr.open(UIConst.BAOWU);
	}
	private openSJ() {
		this.onExitT();
		GGlobal.layerMgr.open(UIConst.SHEN_JIAN);
	}
	private openTS() {
		this.onExitT();
		GGlobal.layerMgr.open(UIConst.TIANSHU);
	}
	public award: any;//失败奖励
	public exitClickCB: Function;
	public caller: any;
	public exitText: string;
	public arg: any;
	public remainTime = 1;
	public doNothing;

	public onOpen(arg) {
		let t = this;
		super.onOpen(arg)
		t.addEventListener(egret.Event.ENTER_FRAME, t.onframe, t);
		t.btnClose.addClickListener(t.onExitT, t);
		t.award = arg.award;
		t.remainTime = arg.t;
		t.exitText = arg.exitText;
		t.arg = arg.arg;
		t.exitClickCB = arg.eCb;
		t.caller = arg.caller;
		t.doNothing = arg.doNothing;

		t.txtXieZhu.visible = false;
		t.txtXieZhu.text = "";
		if (GGlobal.sceneType == SceneCtrl.QXZL) {
			//群雄逐鹿
			t.txtXieZhu.visible = true;
			let t_model = GGlobal.modelQxzl;
			let t_cityVo = t_model.getCityVoById(t_model.curCityId);
			let t_cityName = HtmlUtil.font("【" + t_cityVo.cfg.name + "】", Color.YELLOWSTR);
			let t_str = ""
			if (t_model.battleType == 0 && t_model.battleTempVo) //玩家
			{
				let t_color = FastAPI.getColorByCountry(t_model.battleTempVo.country);
				let t_country = FastAPI.getCountryName(t_model.battleTempVo.country);
				let t_pname = HtmlUtil.font(t_country + "·" + t_model.battleTempVo.name, t_color);
				t_str = ConfigHelp.reTxt("您被驻守{0}的{1}击败了", t_cityName, t_pname);
				t_str += ConfigHelp.reTxt("\n您的体力 -{0}", t_model.battleFailStamin);
				t_str += ConfigHelp.reTxt("\n敌方体力 -{0}", t_model.battleWinStamina);
			}
			else //NPC
			{
				t_str = ConfigHelp.reTxt("您被驻守{0}的守卫击败了", t_cityName);
				t_str += ConfigHelp.reTxt("\n您的体力 -{0}", t_model.battleFailStamin);
			}
			t.txtXieZhu.text = t_str;
		}

		t.showWin();
		t.udTimeView();
	}

	protected onHide(): void {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
		this.btnClose.removeClickListener(this.onExitT, this);
		GGlobal.layerMgr.close(UIConst.COMMON_FAIL);
	}

	/**
	 * 打开失败面板
	 * @remainTime 倒计时间 (毫秒)
	 * @thisObj this引用
	 * @exitText 退出按钮Lable 默认 退出 会显示 退出(X秒)
	 * @exitClickCB 退出按钮点击回调
	 * @arg 自定义参数
	 */
	public static show(remainTime = 5000, thisObj = null, exitText: String = "退出", exitClickCB: Function = null, arg = null, award = null, doNothing = false) {
		GGlobal.layerMgr.open(UIConst.COMMON_FAIL, { award: award, caller: thisObj, eCb: exitClickCB, arg: arg, exitText: exitText, t: remainTime, doNothing: doNothing });
	}

	protected interv = 0;
	protected onframe(e: egret.Event) {
		var newt = this.remainTime - GGlobal.mapscene.dt;
		if (newt < 0) {
			newt = 0;
			this.onExitT();
		}
		if (newt <= 0 && this.remainTime > 0) {
			this.remainTime = 0;
		}
		this.remainTime = newt;

		this.interv += GGlobal.mapscene.dt;
		if (this.interv >= 500) {
			this.interv = 0;
			this.udTimeView();
		}
	}

	protected udTimeView() {
		var remainSec = Math.ceil(this.remainTime / 1000);
		this.btnClose.text = this.exitText + "(" + remainSec + ")";
	}

	protected onExitT() {
		if (this.doNothing) {
			GGlobal.layerMgr.close2(UIConst.COMMON_FAIL);
			return;
		}
		if (this.exitClickCB) {
			this.exitClickCB.call(this.caller, this);
		}
		GGlobal.layerMgr.close2(UIConst.COMMON_FAIL);
		GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
	}

	protected grids: ViewGridRender[] = [];
	protected showWin() {
		var self = this;
		var awards = this.award;

		ConfigHelp.cleanGridview(self.grids);
		if (awards == null || awards.length == 0) {
			return;
		}
		this.grids = ConfigHelp.addGridview(awards, self, 150, 300, false, true, 4, 100);
		var len = self.grids.length;
		for (var i = 0; i < len; i++) {
			if (len < 4) {
				self.grids[i].x = 92 + i * 118 + (456 - len * 118) / 2;
			} else {
				self.grids[i].x = 92 + (i % 4) * 118;
			}
			self.grids[i].y = 580 + ((i / 4) >> 0) * 145;
		}
	}
}