/**
 * /**
 * 桃园结义人员调动列表Item
 */
class TYJY_ChangeItem extends fairygui.GComponent {
	public c1: fairygui.Controller;
	public viewHead: ViewHead;
	public kickBtn: Button0;
	public transferBtn: Button1;
	public applyBtn: Button0;
	public nameLb: fairygui.GRichTextField;
	public timeLb: fairygui.GRichTextField;
	private _vo: TYJY_VO;

	public static URL: string = "ui://m2fm2aiyvfmx1b";

	public static createInstance(): TYJY_ChangeItem {
		return <TYJY_ChangeItem><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_ChangeItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public clean() {
		let s = this;
		s.kickBtn.removeClickListener(s.onKick, s);
		s.transferBtn.removeClickListener(s.onTransfer, s);
		s.applyBtn.removeClickListener(s.onApply, s);
	}

	public setdata(vo: TYJY_VO, isDage: boolean) {
		let s = this;
		if (!vo) {
			s.c1.selectedIndex = 2;
			s.viewHead.setdata(null);
			return;
		}

		s._vo = vo;
		if (isDage) {
			s.c1.selectedIndex = 0;
		} else {
			s.c1.selectedIndex = 1;
			s.applyBtn.visible = vo.position == 1 ? true : false;
		}
		s.nameLb.text = vo.playerName;
		if (vo.offLine > 0)//离线
		{
			s.timeLb.text = "<font color='#D8E2EB'>" + GGlobal.model_TYJY.getOffLineStr(vo.offLine) + "</font>";
		} else {
			s.timeLb.text = "在线";
			s.timeLb.color = Color.GREENINT;
		}
		s.viewHead.setdata(vo.headId, -1, "", -1, false, vo.frameId, 0);
		s.kickBtn.addClickListener(s.onKick, s);
		s.transferBtn.addClickListener(s.onTransfer, s);
		s.applyBtn.addClickListener(s.onApply, s);
	}

	/**
	 * 踢出成员
	 */
	private onKick(e: egret.TouchEvent): void {
		ViewAlert.show("是否将此玩家请离义盟？", null, 3, "取消", "请离", Handler.create(this, function () { GGlobal.model_TYJY.CG_EXPEL(this._vo.playerId) }));
	}

	/**
	 * 转让大哥
	 */
	private onTransfer(e: egret.TouchEvent): void {
		ViewAlert.show("是否将大哥转让给此玩家？", null, 3, "取消", "转让", Handler.create(this, function () { GGlobal.model_TYJY.CG_TRANSFER(this._vo.playerId) }));
	}

	/**
	 * 申请大哥
	 */
	private onApply(e: egret.TouchEvent): void {
		let self = this;
		let needLeave: number = 3 * 24 * 60 * 60;
		if (self._vo.offLine < needLeave) {
			ViewCommonWarn.text("大哥离线3天以上才可申请");
			return;
		}

		ViewAlert.show("是否申请大哥？", null, 3, "取消", "申请", Handler.create(self, function () { GGlobal.model_TYJY.CG_APPLY_BROTHER() }));
	}
}