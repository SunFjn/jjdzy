/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
class QMBossInfo extends fairygui.GComponent {

	public lbMyhurt: fairygui.GRichTextField;
	public btn: fairygui.GButton;
	public lbBest: fairygui.GRichTextField;
	public grid: ViewGrid;
	public n12: fairygui.GGroup;
	public static URL: string = "ui://47jfyc6egs0ds";

	public static createInstance(): QMBossInfo {
		return <QMBossInfo><any>(fairygui.UIPackage.createObject("Boss", "QMBossInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.lbMyhurt = <fairygui.GRichTextField><any>(s.getChild("lbMyhurt"));
		s.btn = <fairygui.GButton><any>(s.getChild("btn"));
		s.lbBest = <fairygui.GRichTextField><any>(s.getChild("lbBest"));
		s.grid = <ViewGrid><any>(s.getChild("grid"));
		s.n12 = <fairygui.GGroup><any>(s.getChild("n12"));
		s.n12X = s.n12.x;
	}
	private n12X = 0;
	private click() {
		var m = GGlobal.modelBoss;
		if (Config.all_221[m.curEnterId].single == 1) {

		} else {
			GGlobal.modelBoss.CG_RANKUI_1361();
		}
		GGlobal.layerMgr.open(UIConst.QMBOSSRANK);
	}

	public listen() {
		let s = this;
		let id = GGlobal.modelBoss.curEnterId;
		let list = JSON.parse(Config.all_221[id].mvp);
		s.grid.vo = ConfigHelp.makeItemListArr(list)[0];
		s.grid.showEff(true);
		s.grid.tipEnabled = true;
		s.btn.addClickListener(s.click, s);
		GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, s.setdata, s);
		GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_DANJI_BOSSXUE, s.setdata, s);
		s.resetPosition();
	}

	public removeList() {
		let s = this;
		s.grid.showEff(false);
		s.btn.removeClickListener(s.click, s);
		GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, s.setdata, s);
		GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_DANJI_BOSSXUE, s.setdata, s);
	}

	private static instance: QMBossInfo;
	public static show() {
		let s = this;
		if (!s.instance) s.instance = s.createInstance();
		s.instance.listen();
		GGlobal.layerMgr.UI_floorUI_1.addChild(s.instance);
	}

	public static hide() {
		let s = this;
		s.instance.removeList();
		s.instance.clearDatta();
		if (s.instance.parent) GGlobal.layerMgr.UI_floorUI_1.removeChild(s.instance);
	}

	public setdata() {
		let s = this;
		var m = GGlobal.modelBoss;
		if (!Config.all_221[m.curEnterId]) {
			return;
		}
		if (Config.all_221[m.curEnterId].single == 1) {
			let name = Model_player.voMine.name
			s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(m.myHurt) + "               " + name + "：" + ConfigHelp.getYiWanText(m.myHurt);
			s.lbBest.text = "<font color='" + Color.TEXT_YELLOW + "'>当前归属：\n" + "</font><font color='" + Color.WHITESTR + "'>" + name + "</font>";
		} else {
			var d = m.rankData;
			if (d.length) {
				s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(m.myHurt) + "               " + d[0][1] + "：" + ConfigHelp.getYiWanText(d[0][2]);
				s.lbBest.text = "<font color='" + Color.TEXT_YELLOW + "'>当前归属：\n" + "</font><font color='" + Color.WHITESTR + "'>" + d[0][1] + "</font>";
			} else {
				s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(m.myHurt);
				s.lbBest.text = "<font color='" + Color.TEXT_YELLOW + "'>当前归属：</font>";
			}
		}
	}

	private clearDatta() {
		let s = this;
		s.lbMyhurt.text = "";
		s.lbBest.text = "";
	}

	public resetPosition(): void {
		let s = this;
		s.n12.x = GGlobal.layerMgr.offx + s.n12X;
		s.setXY((fairygui.GRoot.inst.width - s.width) >> 1, 380);
	}
}