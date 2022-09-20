/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
class MengHuoSceneInfo extends fairygui.GComponent {

	public lbTime: fairygui.GRichTextField;
	public lb1: fairygui.GRichTextField;
	public lb3: fairygui.GRichTextField;
	public lb2: fairygui.GRichTextField;
	public lbInfo: fairygui.GRichTextField;
	public lbDmgAdd: fairygui.GRichTextField;
	public lbBestInfo: fairygui.GRichTextField;
	public btnAdd: fairygui.GButton;
	public btnRank: fairygui.GButton;
	public btnTg: Button2;

	private n37: fairygui.GGroup;
	private n18: fairygui.GGroup;
	private n26: fairygui.GGroup;
	private n22: fairygui.GGroup;

	public static URL: string = "ui://47jfyc6ea19118";

	public static createInstance(): MengHuoSceneInfo {
		return <MengHuoSceneInfo><any>(fairygui.UIPackage.createObject("Boss", "MengHuoSceneInfo"));
	}

	public constructor() {
		super();
	}

	private lbs: any[];
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.lbTime = <fairygui.GRichTextField><any>(s.getChild("lbTime"));
		s.lbInfo = <fairygui.GRichTextField><any>(s.getChild("lbInfo"));
		s.lbBestInfo = <fairygui.GRichTextField><any>(s.getChild("lbBestInfo"));
		s.lb1 = <fairygui.GRichTextField><any>(s.getChild("lb1"));
		s.lb2 = <fairygui.GRichTextField><any>(s.getChild("lb2"));
		s.lbDmgAdd = <fairygui.GRichTextField><any>(s.getChild("lbDmgAdd"));
		s.lb3 = <fairygui.GRichTextField><any>(s.getChild("lb3"));
		s.btnAdd = <fairygui.GButton><any>(s.getChild("btnAdd"));
		s.btnRank = <fairygui.GButton><any>(s.getChild("btnRank"));
		s.btnTg = <Button2><any>(s.getChild("btnTg"));

		s.n37 = <fairygui.GGroup><any>(s.getChild("n37"));
		s.n22 = <fairygui.GGroup><any>(s.getChild("n22"));
		s.n26 = <fairygui.GGroup><any>(s.getChild("n26"));
		s.n18 = <fairygui.GGroup><any>(s.getChild("n18"));
		s.n37.x += GGlobal.layerMgr.offx;
		s.n22.x += GGlobal.layerMgr.offx;
		s.n26.x += GGlobal.layerMgr.offx;
		s.n18.x += GGlobal.layerMgr.offx;

		s.lbs = [s.lb1, s.lb2, s.lb3];
		s.setXY(0, 350);
	}

	private updateMyHurt() {
		let s1 = '';
		let s = this;
		let m = GGlobal.modelBoss;
		let d = m.mhRankdata[1];
		let obj: Object = {};
		for (let i = 0; i < d.length; i++) {
			obj["" + d[i][0]] = d[i][1];
		}
		for (let i: number = 1; i < 4; i++) {
			let lb = s.lbs[i - 1];
			if (!obj["" + i])
				lb.text = "0";
			else
				lb.text = "" + ConfigHelp.getYiWanText(obj["" + i])//0;
		}

		s1 += "自己：" + ConfigHelp.getYiWanText(m.myHurt);
		s.lbInfo.text = s1;
		s1 = "";
		if (m.toperName != '')
			s1 = "1st：" + m.toperName + "  " + ConfigHelp.getYiWanText(m.toperDmg);
		s.lbBestInfo.text = s1;
		s.lbDmgAdd.text = "伤害+" + (m.dmgAdd * 10) + "%";
		s.checkTar();
	}

	private timeUpdate() {
		let d: Date = new Date(Model_GlobalMsg.getServerTime());
		let m = 49 - d.getMinutes();
		let e = 60 - d.getSeconds();
		this.lbTime.text = m + "分" + (e < 10 ? "0" + e : e) + "秒";
	}

	private openRank() {
		GGlobal.layerMgr.open(UIConst.MHRANK, { type: 1, id: GGlobal.modelBoss.curEnterId });
	}

	private openTag() {
		GGlobal.layerMgr.open(UIConst.MHAWARDS);
	}

	private buyDmg() {
		if (GGlobal.modelBoss.dmgAdd < 10) {
			let moneyArr = JSON.parse(Config.xtcs_004[1087].other);
			let t = "是否花费<font color='" + Color.getColorStr(Color.GREEN) + "'>" + moneyArr[0][2] + Vo_attr.getAttrName(moneyArr[0][0]) + "</font>增加10%伤害？(" + GGlobal.modelBoss.dmgAdd + "/10)\n只在本次BOSS生效";
			ViewAlert.show(t, Handler.create(this, this.addDMG), ViewAlert.OKANDCANCEL);
		} else {
			ViewCommonWarn.text("增伤购买次数已用尽");
		}
	}

	private addDMG() {
		let moneyStr = Config.xtcs_004[1087].other;
		if (ConfigHelp.checkEnough(moneyStr, false)) {
			GGlobal.modelBoss.CG_MHADDDMG_1719();
		} else {
			ModelChongZhi.guideToRecharge();
		}
	}

	private checkTar() {
		let r = false;
		let h = GGlobal.modelBoss.myHurt;
		let t = GGlobal.modelBoss.tagDta;
		for (let i = 0; i < t.length; i++) {
			let st = t[i].state;
			if (st == 1) {
				r = true;
				break;
			} else if (st == 0 && h > t[i].condition) {
				r = true;
				break;
			}
		}
		this.btnTg.checkNotice = r;
	}

	public onopen() {
		let s = this;
		MainUIController.addChildToUI(MengHuoSceneInfo.instance, 1);
		s.updateMyHurt();
		GGlobal.control.listen(Enum_MsgType.MH_SCENE, s.updateMyHurt, s);
		GGlobal.control.listen(Enum_MsgType.MH_TAGERT, s.checkTar, s);
		Timer.instance.listen(s.timeUpdate, s, 1000);
		s.btnRank.addClickListener(s.openRank, s);
		s.btnTg.addClickListener(s.openTag, s);
		s.btnAdd.addClickListener(s.buyDmg, s);
	}

	public onclose() {
		let s = this;
		MainUIController.removeUI(MengHuoSceneInfo.instance);
		GGlobal.control.remove(Enum_MsgType.MH_TAGERT, s.checkTar, s);
		GGlobal.control.remove(Enum_MsgType.MH_SCENE, s.updateMyHurt, s);
		Timer.instance.remove(s.timeUpdate, s);
		s.btnRank.removeClickListener(s.openRank, s)
		s.btnTg.removeClickListener(s.openTag, s);
		s.btnAdd.removeClickListener(s.buyDmg, s);
	}

	private static _instance: MengHuoSceneInfo;
	public static get instance(): MengHuoSceneInfo {
		if (!MengHuoSceneInfo._instance) MengHuoSceneInfo._instance = MengHuoSceneInfo.createInstance();
		return MengHuoSceneInfo._instance;
	}
}