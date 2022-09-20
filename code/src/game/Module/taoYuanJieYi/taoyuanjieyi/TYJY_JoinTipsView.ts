/**
 * 加入义盟弹窗tips
 */
class TYJY_JoinTipsView extends UIModalPanel{
	public btnGo: Button1;
	public tipsLb: fairygui.GTextField;

	public constructor() {
		super();
		this.loadRes("taoYuanJieYi", "taoYuanJieYi_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("taoYuanJieYi");
		this.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_JoinTipsView").asCom;
		this.contentPane = this.view;
		CommonManager.parseChildren(this.view, this);
		super.childrenCreated();
		// this.resetPosition();
	}
	
	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
	}

	public onShown() {
		this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.updateShow();
	}

	protected onHide() {
		if (this.btnGo) {
			this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
	}

	private onClick() {
		GGlobal.layerMgr.open(UIConst.TAOYUANJIEYI);
		this.closeEventHandler(null);
	}

	public static show() {
		if (GGlobal.sceneType != SceneCtrl.GUANQIA) return;//在副本中不弹窗

		if (GGlobal.layerMgr.isOpenView(UIConst.TYJY_JOINTIPS)) {
			let v = GGlobal.layerMgr.getView(UIConst.TYJY_JOINTIPS) as TYJY_JoinTipsView;
			v.updateShow();
		}else {
			GGlobal.layerMgr.open(UIConst.TYJY_JOINTIPS);
		}
	}

	private updateShow() {
		this.tipsLb.text = "海内存知己，天涯诺比邻。\n恭喜你加入了义盟<font color='" + Color.YELLOWSTR + "'>" + GGlobal.model_TYJY.joinGang + "</font>\n快和兄弟们一起闯荡吧";
	}
}