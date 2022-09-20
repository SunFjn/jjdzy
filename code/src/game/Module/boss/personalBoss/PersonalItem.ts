/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class PersonalItem extends fairygui.GComponent {

	public lbCount: fairygui.GRichTextField;
	public btnFight: Button0;
	public head: ViewHead;
	public lbTime: fairygui.GRichTextField;
	public timeGroup: fairygui.GGroup;
	public g0: fairygui.GGroup;
	public imgDoub: fairygui.GGroup;
	public lbTip: fairygui.GLabel;
	public static URL: string = "ui://47jfyc6etujy1";

	public static createInstance(): PersonalItem {
		return <PersonalItem><any>(fairygui.UIPackage.createObject("Boss", "PersonalItem"));
	}

	public constructor() {
		super();
	}

	private com: fairygui.GComponent;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s)
		s.btnFight.addClickListener(s.fightHandler, s);

		s.com = new fairygui.GComponent();
		s.com.setScale(0.8, 0.8);
		this.addChildAt(s.com, this.numChildren - 6);
	}

	private _lastTime = 0;
	private fightHandler() {
		let now = egret.getTimer();
		if (now - this._lastTime < 1000) {
			return;
		}
		this._lastTime = now;
		let m = GGlobal.modelBoss;
		if (GGlobal.modelGuanQia.challBossWithCond()) {
			m.CG_FIGHT_1253(this._vo.id);
		}
	}

	public clean() {
		ConfigHelp.cleanGridview(this.grids);
	}

	private grids: any[] = [];
	public _vo: VoPersonalBoss;
	setData(vo: VoPersonalBoss) {
		let s = this;
		s._vo = vo;
		let lvs: string = vo.condition[0] > 0 ? vo.condition[0] + "级" : ((vo.condition[1] / 1000) >> 0) + "转";
		let npc = Config.NPC_200[vo.bossid];
		s.head.ng.visible = false;
		s.head.setdata(RoleUtil.getHeadImg(npc.head + ""), -1, lvs, 0, true);

		if (vo.count > 0) {
			s.btnFight.enabled = true;
			s.lbCount.text = "剩余次数：<font color='" + Color.GREENSTR + "'>" + vo.count;
		}
		else {
			s.btnFight.enabled = false;
			s.lbCount.text = "剩余次数：<font color='" + Color.REDSTR + "'>" + vo.count;
		}

		let gkcfg = Config.solo_220[vo.id];
		let awards = JSON.parse(gkcfg.reward);
		let vos = ConfigHelp.makeItemListArr(awards);
		ConfigHelp.cleanGridview(s.grids);
		s.grids = ConfigHelp.addGridview(vos, this.com, 200, 60, true, false);

		let hasActi = vo.isActi();
		let has = vo.isRefresh();
		s.btnFight.visible = true;
		s.btnFight.checkNotice = false;
		if (hasActi) {
			s.lbTip.visible = false;
			s.g0.visible = false;
			if (has) {
				s.lbTime.visible = false;
			} else {
				s.lbTime.visible = true;
				s.lbTime.text = "";
			}
			s.btnFight.checkNotice = vo.count > 0;
		} else {
			let tips;
			if (vo.condition[0] > 0)
				tips = vo.condition[0] + "级开启";
			else tips = ((vo.condition[1] / 1000) >> 0) + "转开启";
			s.g0.visible = true;
			s.lbTip.text = tips;
			s.lbTip.visible = true;
		}

		s.com.touchable = s.btnFight.enabled = !s.g0.visible;
		s.needRefresh = hasActi && !has;
		this.updateTime();


		let act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
		this.imgDoub.visible = (act != null)
	}

	public needRefresh: boolean = false;
	public updateTime() {
		let s = this;
		s.timeGroup.visible = false;
		s.btnFight.visible = true;
		if (!s.needRefresh) return;
		let te = s._vo.rebornTime - egret.getTimer();
		let b = te > 0;
		s.timeGroup.visible = b && s._vo.count > 0;
		s.btnFight.visible = !s.timeGroup.visible;
		if (b) {
			s.lbTime.color = Color.REDINT;
			s.lbTime.text = TimeUitl.getRemainingTime(te, 0, { minute: "分", second: "秒" });
		} else {
			s.lbTime.text = "";
			s.setData(s._vo);
		}
	}

}