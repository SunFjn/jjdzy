/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class Child7MengHuo extends fairygui.GComponent implements IPanel {

	//>>>>start
	public btnFight: Button1;
	public btBuy: Button2;
	public lst: fairygui.GList;
	public btnRank: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public lbName: fairygui.GLabel;
	public lbAdd: fairygui.GRichTextField;
	public lbCount: fairygui.GRichTextField;
	public bgv: fairygui.GImage;
	public lbKiller: fairygui.GRichTextField;
	//>>>>end

	public static URL: string = "ui://47jfyc6erjjf13";

	public static createInstance(): Child7MengHuo {
		return <Child7MengHuo><any>(fairygui.UIPackage.createObject("Boss", "Child7MengHuo"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(MHTab.URL, MHTab);
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.open();
	}

	closePanel(pData?: any) {
		this.close();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		s.lst.callbackThisObj = s;
		s.lst.itemRenderer = s.itemRenderer;
		s.btnRank.text = "<u>查看上期排名</u>";
	}

	private _cur: number = 0;
	private itemRenderer(index, obj) {
		let t: MHTab = obj as MHTab;
		let v: Vo_7MH = this._lstDta[this.si + index];
		t.setVO(v);
		let sl = false;
		let z = (Model_player.voMine.zsID / 1000) >> 0;
		if (z == 0) {
			if (index == 0) {
				sl = true;
			}
		} else if (z >= v.sortIndex && z <= v.sortMxIndex) {
			sl = true;
		}
		if (sl) this._cur = this.si + index;
		t.setSel(sl);
	}

	private rankHander() {
		GGlobal.layerMgr.open(UIConst.MHRANK, { type: 0, id: this._vo.id });
	}

	private si = 0;
	private _vo: Vo_7MH;
	private _awards: any[] = [];
	private _awards1: any[] = [];
	private _lstDta: any[] = [];
	private setdate() {
		let s = this;
		let m = GGlobal.modelBoss;
		s.si = m.dtaIndex;
		s._lstDta = m.mhCFG;
		s.lst.numItems = 4;

		let vo: Vo_7MH = this._vo = s._lstDta[s._cur]
		GGlobal.modelBoss.mhid = vo.id;
		s.lbName.text = Config.NPC_200[vo.id].name;

		ConfigHelp.cleanGridview(s._awards);
		ConfigHelp.cleanGridview(s._awards1);
		s._awards = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(vo.showAward), this, 380, 336, true, false, 2, 110);
		s._awards1 = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(vo.killerAward), this, 440, 600, true, false, 2);

		s.lbAdd.text = "再起：BOSS生命提高<font color='" + Color.GREENSTR + "'>" + (m.hpMul * 100) + "%</font>";
		if (m.mhCount > 0)
			s.lbCount.text = "进入次数：<font color='" + Color.GREENSTR + "'>" + m.mhCount + "/5</font>";
		else
			s.lbCount.text = "进入次数：<font color='" + Color.REDSTR + "'>" + m.mhCount + "/5</font>";
		s.lbKiller.text = m.MHKiller;
	}

	private buyHandler() {
		let m = GGlobal.modelBoss;
		let mx = ConfigHelp.getSystemNum(1083);
		// if (m.mhCount >= 1) {
		// 	ViewCommonWarn.text("还有次数，无法购买");
		// } else 
		if (m.mhBuyCount >= mx) {
			ViewCommonWarn.text("没有剩余购买次数");
		} else {
			let n = ConfigHelp.getSystemNum(1082);
			ViewAlert.show("是否消耗<font color='" + Color.YELLOWSTR + "'>" + n + "元宝</font>购买次数？", Handler.create(this, this.send_buyHd));
		}
	}

	private send_buyHd() {
		let n = ConfigHelp.getSystemNum(1082);
		if (Model_player.voMine.yuanbao < n) {
			ModelChongZhi.guideToRecharge();
		} else {
			GGlobal.modelBoss.GC_MHCOUNT_1707();
		}
	}

	private fightHander() {
		let z = (Model_player.voMine.zsID / 1000) >> 0;
		if (z == 0) {
			ViewCommonWarn.text("等级不足");
			return;
		}
		// if(GGlobal.modelBoss.mhCount <= 0){
		// 	this.buyHandler();
		// 	return;
		// }
		if (GGlobal.sceneType == SceneCtrl.MENGHUO) return;
		if (TimeUitl.cool("Child7MengHuofightHander", 2000)) {
			GGlobal.layerMgr.close2(UIConst.MHBOSS);
			GGlobal.modelBoss.CG_MHENTER_1709();
		}
	}

	private update() {
		let m = GGlobal.modelBoss;
		let t = m.MHcd;
		let r = true;
		let vo = m.getCurrentMHVO();
		if (vo != undefined) {
			let arr = GGlobal.modelBoss.mhBossDeadList;
			r = arr.indexOf(vo.id) < 0;
		}
		if (m.mhState == 2 && r) {
			let c = ((m.MHcd - Model_GlobalMsg.getServerTime()) / 1000) >> 0;
			if (c > 0) {
				this.lbTime.visible = true;
				this.lbTime.text = "进入冷却倒计时：" + c + "s";
				m.MHcd--;
			} else {
				this.lbTime.visible = false;
			}
		} else {//未开启
			this.lbTime.visible = true;
			let st = Model_GlobalMsg.getServerTime();
			let nowd: Date = new Date(st);
			let nowH = nowd.getHours();
			let nowM = nowd.getMinutes();
			let nows = nowd.getSeconds();

			let h = 0;
			if (nowH < 8) {
				h = 8 - nowH;
			} else if (nowH >= 23) {
				h = 32 - nowH;
			}
			nows = 60 - nows;
			nowM = 59 - nowM;
			let d = nowM < 10 ? "0" + nowM : nowM;
			let s = nows < 10 ? "0" + nows : nows;
			this.lbTime.text = "孟获刷新倒计时：" + h + ":" + d + ":" + s;
		}
	}

	private awatar: UIRole;
	public open() {
		let s = this;
		let m = GGlobal.modelBoss;
		m.initMH();
		s.setdate();

		if (!s.awatar) {
			s.awatar = UIRole.create();
			s.awatar.uiparent = s.displayListContainer;
			s.awatar.setPos(178, 654);
			s.awatar.setScaleXY(1.5, 1.5);
		}
		let lb = Config.NPC_200[240001];
		s.awatar.setBody(lb.mod);
		if (lb.weapon) {
			s.awatar.setWeapon(lb.mod);
		}
		s.awatar.onAdd();

		Timer.instance.listen(s.update, s, 1000);
		s.btBuy.addClickListener(s.buyHandler, s);
		s.btnRank.addClickListener(s.rankHander, s);
		s.btnFight.addClickListener(s.fightHander, s);
		GGlobal.control.listen(Enum_MsgType.MH_OPEN, s.setdate, s);
		GGlobal.control.listen(Enum_MsgType.MH_ENTER_FAIL, s.buyHandler, s);
		GGlobal.modelBoss.CG_MHOPENUI_1701(this._vo.id);
	}

	public close() {
		let s = this;
		if (s.awatar) {
			s.awatar.onRemove();
			s.awatar = null;
		}
		ConfigHelp.cleanGridview(s._awards);
		ConfigHelp.cleanGridview(s._awards1);
		Timer.instance.remove(s.update, s);
		s.btBuy.removeClickListener(s.buyHandler, s);
		s.btnFight.removeClickListener(s.fightHander, s);
		s.btnRank.removeClickListener(s.rankHander, s);
		GGlobal.control.remove(Enum_MsgType.MH_OPEN, s.setdate, s);
		GGlobal.control.remove(Enum_MsgType.MH_ENTER_FAIL, s.buyHandler, s);
		GGlobal.layerMgr.close(UIConst.MHRANK);
		s.lst.numItems = 0;
	}
}