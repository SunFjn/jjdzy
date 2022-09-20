/**
 * 桃园结义申请列表Item
 */
class TYJY_ApplyItem extends fairygui.GComponent{
	public viewHead: ViewHead;
	public nameLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public okBtn: Button1;
	public cancelBtn: Button0;
	private _vo:TYJY_VO;

	public static URL: string = "ui://m2fm2aiyvfmx19";

	public static createInstance(): TYJY_ApplyItem {
		return <TYJY_ApplyItem><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_ApplyItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	public clean() {
		let s = this;
		s.okBtn.removeClickListener(s.onOk, s);
		s.cancelBtn.removeClickListener(s.onCancel, s);
	}

	public setdata(vo:TYJY_VO) {
		if(!vo)  return;

		let s = this;
		s._vo = vo;
		s.viewHead.setdata(vo.headId, -1, "", -1, false, vo.frameId, 0);
		s.nameLb.text = vo.playerName;
		s.powerLb.text = vo.playerPower + "";
		s.okBtn.addClickListener(s.onOk, s);
		s.cancelBtn.addClickListener(s.onCancel, s);
	}

	/**
	 * 申请加入
	 */
	private onOk(e: egret.TouchEvent): void {
		GGlobal.model_TYJY.CG_APPROVAL_APPLY(1, this._vo.playerId);
	}

	/**
	 * 拒绝
	 */
	private onCancel(e: egret.TouchEvent): void {
		GGlobal.model_TYJY.CG_APPROVAL_APPLY(2, this._vo.playerId);
	}
}