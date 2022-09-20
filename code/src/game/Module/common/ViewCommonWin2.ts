class ViewCommonWin2 extends UIModalPanel {
	public bg1: ViewBg1;
	public btnClose: fairygui.GButton;
	public lbName: fairygui.GTextField;
	public lbGuanxian: fairygui.GTextField;
	public lbPower: fairygui.GTextField;
	public viewHead: ViewHead;

	public constructor() {
		super();
		this.isClosePanel = false;
		this.childrenCreated();
	}
	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "ViewFightWin2").asCom;
		this.contentPane = this.view;
		this.btnClose = <fairygui.GButton><any>(this.view.getChild("btnClose"));
		this.bg1 = <ViewBg1><any>(this.view.getChild("bg1"));
		this.lbName = <fairygui.GTextField><any>(this.view.getChild("lbName"));
		this.lbGuanxian = <fairygui.GTextField><any>(this.view.getChild("lbGuanxian"));
		this.lbPower = <fairygui.GTextField><any>(this.view.getChild("lbPower"));
		this.viewHead = <ViewHead><any>(this.view.getChild("viewHead"));

		super.childrenCreated();
		this.resetPosition();
	}

	/**
	 * 打开胜利面板
	 * @v 玩家数据 
	 * @remainTime 倒计时间 (毫秒)
	 * @thisObj this引用
	 * @exitText 退出按钮LABEL 默认 退出 会显示 退出(X秒)
	 * @exitClickCB 退出按钮点击回调
	 * @arg 自定义参数
	 */
	public static show(v: any, remainTime = 5000, thisObj = null, exitText: String = "退出", exitClickCB: Function = null, arg = null) {
		GGlobal.layerMgr.open(UIConst.COMMON_WIN2, { v: v, caller: thisObj, eCb: exitClickCB, exitText: exitText, t: remainTime, arg: arg });
	}

	public vo: any;
	public exitClickCB: Function;
	public caller: any;
	public exitText: string;
	public arg: any;

	public onOpen(arg) {
		super.onOpen(arg)
		this.vo = arg.v;
		this.timeremain = arg.t;
		this.exitText = arg.exitText;
		this.arg = arg.arg;
		this.exitClickCB = arg.eCb;
		this.caller = arg.caller;

		this.showWin();
		this.updateBtnRemain();
		this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitT, this);
	}

	protected onHide() {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
		this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitT, this);
		GGlobal.layerMgr.close(UIConst.COMMON_WIN2);
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
		this.lbName.text = this.vo.name;
		this.lbPower.text = "战力：" + this.vo.str;
		this.lbGuanxian.text = Model_GuanXian.getJiangXianStr1(this.vo.jiangXian);
		this.viewHead.setdata(this.vo.head, -1, null, -1, false, this.vo.frame)
		this.btnClose.text = this.exitText;
	}

	protected updateBtnRemain() {
		this.btnClose.text = this.exitText + "(" + Math.ceil(this.timeremain / 1000) + ")";
	}

	protected finish() {
		GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
		if (this.exitClickCB) {
			this.exitClickCB.apply(this.caller, this.arg);
		} else {
			GGlobal.modelScene.returnMainScene();
		}
		GGlobal.layerMgr.close2(UIConst.COMMON_WIN2);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}
}