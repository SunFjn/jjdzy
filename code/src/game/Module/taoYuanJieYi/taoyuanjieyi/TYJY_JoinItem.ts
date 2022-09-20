/**
 * 桃园结义已加盟Item
 */
class TYJY_JoinItem extends fairygui.GComponent {
	public c1: fairygui.Controller;
	public viewHead: ViewHead;
	public first: fairygui.GImage;
	public second: fairygui.GImage;
	public third: fairygui.GImage;
	public nameLb: fairygui.GRichTextField;
	public lvLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public timeLb: fairygui.GRichTextField;
	public inviteBtn: Button0;

	public static URL: string = "ui://m2fm2aiyvfmx11";

	public static createInstance(): TYJY_JoinItem {
		return <TYJY_JoinItem><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_JoinItem"));
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
		s.inviteBtn.removeClickListener(s.onInvite, s);
		GGlobal.model_TYJY.remove(Model_TYJY.msg_invite, s.onInviteCD, s);
	}

	public setdata(vo: TYJY_VO, index: number) {
		this.first.visible = index == 0 ? true : false;
		this.second.visible = index == 1 ? true : false;
		this.third.visible = index == 2 ? true : false;
		if (!vo) {
			this.c1.selectedIndex = 0;
			this.viewHead.setdata(null);
		} else {
			this.c1.selectedIndex = 1;
			this.viewHead.setdata(vo.headId, -1, "", -1, false, vo.frameId, 0);
			this.nameLb.text = vo.playerName;
			this.lvLb.text = "等级：" + vo.playerLv;
			this.powerLb.text = "战力：" + vo.playerPower;
			if (vo.offLine > 0)//离线
			{
				this.timeLb.text = "<font color='#D8E2EB'>" + GGlobal.model_TYJY.getOffLineStr(vo.offLine) + "</font>";
			} else {
				this.timeLb.text = "在线";
				this.timeLb.color = Color.GREENINT;
			}
		}
		this.inviteBtn.addClickListener(this.onInvite, this);
		GGlobal.model_TYJY.listen(Model_TYJY.msg_invite, this.onInviteCD, this);
	}

	/**
	 * 广播邀请
	 */
	private onInvite(e: egret.TouchEvent): void {
		if (this.inviteBtn.enabled == false) {
			ViewCommonWarn.text("请稍等!");
			return;
		}
		GGlobal.model_TYJY.CG_RECRUITING();
	}

	private lastTime: number = 0;
	private onInviteCD(time: number) {
		let self = this;
		self.lastTime = time;
		self.inviteBtn.enabled = false;
		Timer.instance.listen(function onT() {
			self.lastTime--;
			if (self.lastTime < 0) {
				self.inviteBtn.enabled = true;
				self.inviteBtn.text = "广播邀请";
				Timer.instance.remove(onT, self);
			} else {
				self.inviteBtn.text = `等待(${self.lastTime})`;
			}
		}, self, 1000);
	}
}