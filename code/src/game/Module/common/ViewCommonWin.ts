class ViewCommonWin extends UIModalPanel {
	//>>>>start
	public bg1: ViewBg1;
	public list: fairygui.GList;
	public lbTip: fairygui.GRichTextField;
	public txtXieZhu: fairygui.GRichTextField;
	public btnClose: Button1;
	//>>>>end

	public static URL: string = "ui://jvxpx9emnn9876";

	public constructor() {
		super();
		this.isClosePanel = false;
		this.loadRes();
	}
	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "ViewFightWin").asCom;
		this.contentPane = this.view;
		CommonManager.parseChildren(this.view, this);

		this.txtXieZhu.visible = false;
		this.list.itemRenderer = this.renderHander
		this.list.callbackThisObj = this;
		super.childrenCreated();
		this.resetPosition();
	}

	/**
	 * 打开胜利面板
	 * @remainTime 倒计时间 (毫秒)
	 * @thisObj this引用
	 * @exitText 退出按钮LABEL 默认 退出 会显示 退出(X秒)
	 * @exitClickCB 退出按钮点击回调
	 * @arg 自定义参数
	 */
	public static show(award, remainTime = 5000, thisObj = null, exitText: String = "退出", exitClickCB: Function = null, arg = null, doNothing = false) {
		GGlobal.layerMgr.open(UIConst.COMMON_WIN, { award: award, caller: thisObj, eCb: exitClickCB, exitText: exitText, t: remainTime, arg: arg, doNothing: doNothing });
	}

	public static hide() {
		if (GGlobal.layerMgr.isOpenView(UIConst.COMMON_WIN)) {
			GGlobal.layerMgr.close2(UIConst.COMMON_WIN);
		}
	}

	public award: any;
	public exitClickCB: Function;
	public caller: any;
	public exitText: string;
	public arg: any;
	public doNothing: any;

	public onOpen(arg) {
		let t = this;
		super.onOpen(arg)
		t.award = arg.award;
		t.timeremain = arg.t;
		t.exitText = arg.exitText;
		t.arg = arg.arg;
		t.exitClickCB = arg.eCb;
		t.caller = arg.caller;
		t.doNothing = arg.doNothing;

		t.txtXieZhu.visible = false;
		t.txtXieZhu.text = "";
		t.lbTip.visible = false;
		if (GGlobal.sceneType == SceneCtrl.CROSS_SJMJ && t.award.length == 0) { //升阶秘境
			t.txtXieZhu.visible = true;
			t.txtXieZhu.text = "今日协助次数已用完";
		}
		else if (GGlobal.sceneType == SceneCtrl.QXZL) { //群雄逐鹿特殊处理
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
				t_str = ConfigHelp.reTxt("您击败了驻守{0}的{1}", t_cityName, t_pname);
				t_str += ConfigHelp.reTxt("\n您的体力 -{0}", t_model.battleWinStamina);
				t_str += ConfigHelp.reTxt("\n敌方体力 -{0}", t_model.battleFailStamin);
			}
			else //NPC
			{
				t_str = ConfigHelp.reTxt("您击败了驻守{0}的守卫", t_cityName);
				t_str += ConfigHelp.reTxt("\n您的体力 -{0}", t_model.battleWinStamina);
			}
			t.txtXieZhu.text = t_str;
		}
		t.showWin();
		t.updateBtnRemain();
		t.addEventListener(egret.Event.ENTER_FRAME, t.onFrame, t);
		t.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, t.onExitT, t);
		t.btnClose.text = t.exitText
	}

	protected onHide() {
		this.list.numItems = 0;
		this.txtXieZhu.visible = false;
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
		this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitT, this);
		GGlobal.layerMgr.close(UIConst.COMMON_WIN);
	}

	public timeremain: number;
	protected timer = 0;
	protected onFrame(e: egret.Event) {
		this.timer += GGlobal.mapscene.dt;
		this.timeremain -= GGlobal.mapscene.dt;
		if (this.timer >= 500) {
			this.updateBtnRemain();
			this.timer = 0;
		}
		if (this.timeremain <= 0) {
			this.timeremain = 0;
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
			this.finish();
		}
	}

	protected onExitT() {
		this.finish();
	}

	protected showWin() {
		var self = this;
		this.list.numItems = this.award ? this.award.length : 0;
	}

	protected updateBtnRemain() {
		let t = this
		t.btnClose.text = t.exitText + "(" + Math.ceil(t.timeremain / 1000) + ")";
	}

	protected finish() {
		if (this.doNothing) {
			GGlobal.layerMgr.close2(UIConst.COMMON_WIN);
			return;
		}
		GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
		if (this.exitClickCB) {
			this.exitClickCB.apply(this.caller, this.arg);
		} else {
			GGlobal.modelScene.returnMainScene();//自己在回调里写
		}
		GGlobal.layerMgr.close2(UIConst.COMMON_WIN);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}

	private renderHander(index: number, obj: fairygui.GComponent): void {
		var item = obj as ViewGridRender;
		item.vo = this.award[index];
	}
}