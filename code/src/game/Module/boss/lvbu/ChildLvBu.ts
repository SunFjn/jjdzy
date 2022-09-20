/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildLvBu extends fairygui.GComponent {

	public iconBody: fairygui.GLoader;
	public lbName: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public btnFight: fairygui.GButton;
	public lbRank: fairygui.GRichTextField;
	public n32: fairygui.GRichTextField;
	public lbJieduan: fairygui.GRichTextField;
	public progress: fairygui.GProgressBar;
	public hpGroup: fairygui.GGroup;
	public g2: fairygui.GGroup;
	public lbTimelimit: fairygui.GRichTextField;

	public static URL: string = "ui://47jfyc6edx12v";

	public static createInstance(): ChildLvBu {
		return <ChildLvBu><any>(fairygui.UIPackage.createObject("Boss", "ChildLvBu"));
	}

	public constructor() {
		super();
	}
	private com: fairygui.GComponent;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.iconBody = <fairygui.GLoader><any>(s.getChild("iconBody"));
		s.lbName = <fairygui.GRichTextField><any>(s.getChild("lbName"));
		s.lbTime = <fairygui.GRichTextField><any>(s.getChild("lbTime"));
		s.btnFight = <fairygui.GButton><any>(s.getChild("btnFight"));
		s.lbRank = <fairygui.GRichTextField><any>(s.getChild("lbRank"));
		s.lbJieduan = <fairygui.GRichTextField><any>(s.getChild("lbJieduan"));
		s.progress = <fairygui.GProgressBar><any>(s.getChild("progress"));
		s.hpGroup = <fairygui.GGroup><any>(s.getChild("hpGroup"));
		s.g2 = <fairygui.GGroup><any>(s.getChild("g2"));
		s.n32 = <fairygui.GRichTextField><any>(s.getChild("n32"));
		s.lbTimelimit = <fairygui.GRichTextField><any>(s.getChild("lbTimelimit"));

		s.com = new fairygui.GComponent;
		this.addChild(s.com);
		s.com.setScale(0.8, 0.8);
	}

	private onTxTClick(e: egret.TouchEvent) {
		GGlobal.layerMgr.open(UIConst.LVBURANK, 0);
		e.stopImmediatePropagation();
	}

	private onFight() {
		if(TimeUitl.cool("ChildLvBuonFight", 1000)){
			GGlobal.modelBoss.CG_LB_ENTER_1517();
		}
	}

	private updateTime() {
		let s = this;
		let m = GGlobal.modelBoss;
		let t = Model_GlobalMsg.getServerTime();
		if (m.lvbuSt == 1 || m.lvbuSt == 2 || m.lvbuSt == 3) {
			if (m.CDEnter < Model_GlobalMsg.getServerTime()) {
				s.lbTime.text = "";
			} else {
				let al = ((m.CDEnter - t) / 1000) >> 0;
				s.lbTime.text = "进入冷却时间：" + al + "秒";
			}
			s.lbTimelimit.visible = false;
		} else {
			s.lbTimelimit.visible = true;
			let data = JSON.parse(ConfigHelp.getSystemDesc(1091))
			let nowData = new Date(t);
			let hour = nowData.getHours();
			let min = nowData.getMinutes();
			let sec = nowData.getSeconds();
			let nextIndex: number = -1;
			for (let i = 0; i < 3; i++) {
				if(hour == data[i][0]){//优先检查是否被击杀
					if(min >= data[i][1]){
						s.lbTimelimit.text = "<font color='#ffc334'>吕布已被击败</font>";
						return;
					}
				}
				if (hour < data[i][0] || (hour == data[i][0] && min < data[i][1])) {
					nextIndex = i;
					break;
				}
			}
			let time;
			if (nextIndex == -1) {
				time = (23 - hour + data[0][0]) * 3600 + (59 - min + data[0][1]) * 60 + 59 - sec;
			} else {
				time = (data[nextIndex][0] - hour) * 3600 + (data[nextIndex][1] - min) * 60 - sec;
			}
			s.lbTimelimit.text = "<font color='#fe0000'>吕布降临倒计时：</font>\n" + TimeUitl.getRemainingTime(time * 1000, 0, { hour: ":", minute: ":", second: " " });
			let now = egret.getTimer();
			if (time < 2 && now - s.requstTime > 2000) {
				s.requstTime = now;
				GGlobal.modelBoss.CG_LBENTER_1503();
			}
		}
	}

	private requstTime: number = 0;
	private yulanWards: any[] = [];
	private lastWards: any[] = [];
	private setdata() {
		let s = this;
		let m = GGlobal.modelBoss;
		let bid = m.curEnterId;
		if (bid == 0) bid = 241001;
		let bossname = Config.NPC_200[bid]["name"];
		s.lbName.text = bossname.replace("·","\n·\n");;

		if (m.lvbuSt == 1 || m.lvbuSt == 2 || m.lvbuSt == 3) {
			s.hpGroup.visible = true;
			s.g2.visible = false;
			s.lbJieduan.text = BroadCastManager.reTxt("第{0}阶段", m.lvbuSt);
			s.progress.max = m.bossMaxHp;
			s.progress.value = m.bossHp;
		} else {
			s.hpGroup.visible = false;
			s.g2.visible = true;
		}

		s.clearGrid();
		let lib = Config.lvbu_224[361001];
		let join = lib.reward;
		let kill = lib.reward5;
		join = JSON.parse(join);
		kill = JSON.parse(kill);
		s.yulanWards = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(join), s.com, 55, 855, true, true, 5, 113);
		s.lastWards = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(kill), s.com, 430, 855, true, true, 5, 113);
		s.n32.text = "不灭魔神：BOSS生命提高<font color='#15f234'>"+m.qmHpMul*100+"%</font>";
	}

	private clearGrid() {
		let s = this;
		ConfigHelp.cleanGridview(s.yulanWards);
		ConfigHelp.cleanGridview(s.lastWards);
	}

	private reqData() {
		GGlobal.modelBoss.CG_LBENTER_1503();
	}

	private listen() {
		let s = this;
		Timer.instance.listen(s.updateTime, s, 1000);
		s.lbRank.addClickListener(s.onTxTClick, s);
		s.btnFight.addClickListener(s.onFight, s);
		GGlobal.control.listen(Enum_MsgType.LB_OPENUI, s.setdata, s);
		GGlobal.control.listen(Enum_MsgType.LB_BOSS_STATE, s.reqData, s);
		GGlobal.control.listen(Enum_MsgType.LB_NOTICE, s.reqData, s);
	}

	private removelis() {
		let s = this;
		s.btnFight.removeClickListener(s.onFight, s);
		s.lbRank.removeClickListener(s.onTxTClick, s);
		Timer.instance.remove(s.updateTime, s);
		GGlobal.control.remove(Enum_MsgType.LB_BOSS_STATE, s.reqData, s);
		GGlobal.control.remove(Enum_MsgType.LB_NOTICE, s.setdata, s);
		GGlobal.control.remove(Enum_MsgType.LB_OPENUI, s.reqData, s);
	}

	private awatar: UIRole;
	public open() {
		let s = this;
		s.setdata();
		s.listen();

		if (!s.awatar) {
			s.awatar = UIRole.create();
			s.awatar.uiparent = s.displayListContainer;
			s.awatar.setPos(315, 500);
			s.awatar.setScaleXY(1.5, 1.5);
		}
		let lb = Config.NPC_200[241001];
		s.awatar.setBody(lb.mod);
		if (lb.weapon) {
			s.awatar.setWeapon(lb.mod);
		}
		s.awatar.onAdd();
		GGlobal.modelBoss.CG_LBENTER_1503();
	}

	public close() {
		let s = this;
		if (s.awatar) {
			s.awatar.onRemove();
			s.awatar = null;
		}
		s.removelis();
		s.clearGrid();
		GGlobal.layerMgr.close(UIConst.LVBURANK);
	}
}