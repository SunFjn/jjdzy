/**
 * 桃园结义没加盟Item
 */
class TYJY_NoJoinItem extends fairygui.GComponent{
	public c1: fairygui.Controller;
	public gangName: fairygui.GRichTextField;
	public gangNum: fairygui.GRichTextField;
	public playerName: fairygui.GRichTextField;
	public powerLb: fairygui.GLabel;
	public applyBtn: Button1;
	public cancelBtn: Button0;
	private _vo:TYJY_VO;

	public static URL: string = "ui://m2fm2aiyihs7w";

	public static createInstance(): TYJY_NoJoinItem {
		return <TYJY_NoJoinItem><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_NoJoinItem"));
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
		s.applyBtn.removeClickListener(s.onApply, s);
		s.cancelBtn.removeClickListener(s.onCancel, s);
	}

	public setdata(vo:TYJY_VO) {
		if(!vo)  return;

		this._vo = vo;
		this.gangName.text = vo.gangName;
		this.gangNum.text = "(" + vo.gangNum + "/3)";
		this.playerName.text = vo.dage;
		this.powerLb.text = vo.power + "";
		if(vo.status == 4)//取消申请
		{
			this.c1.selectedIndex = 1;
		}else if(vo.status == 3)//申请加入
		{
			this.c1.selectedIndex = 0;
		}else if(vo.status == 2)//申请已满
		{
			this.c1.selectedIndex = 2;
		}else{//已满员
			this.c1.selectedIndex = 3;
		}

		this.applyBtn.addClickListener(this.onApply, this);
		this.cancelBtn.addClickListener(this.onCancel, this);
	}

	/**
	 * 申请加入事件
	 */
	private onApply(e: egret.TouchEvent): void {
		GGlobal.model_TYJY.CG_APPLY_JOIN(this._vo.gangId);
	}

	/**
	 * 取消申请事件
	 */
	private onCancel(e: egret.TouchEvent): void {
		GGlobal.model_TYJY.CG_CANCEL_APPLY(this._vo.gangId);
	}
}