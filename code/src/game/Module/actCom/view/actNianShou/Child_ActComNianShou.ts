class Child_ActComNianShou extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public btnZhao: fairygui.GButton;
	public imgTime: fairygui.GImage;
	public imgNo: fairygui.GImage;
	public labTime: fairygui.GRichTextField;
	public lbFresh: fairygui.GRichTextField;
	public lbNameBP: fairygui.GRichTextField;
	public lbBPCt: fairygui.GRichTextField;
	public imgBP: fairygui.GLoader;
	public btnRward: Button2;
	public lbTip1: fairygui.GRichTextField;
	public vNianShou: VNianShou;
	public hpBg: fairygui.GImage;
	public lbName: fairygui.GRichTextField;
	public list: fairygui.GList;
	public lbTip0: fairygui.GRichTextField;
	public lbDes: fairygui.GRichTextField;
	public hpBar: fairygui.GProgressBar;
	public vReward: ViewGrid;
	public lbReward: fairygui.GRichTextField;
	public gReward: fairygui.GGroup;
	public gHp: fairygui.GGroup;
	public btnKing: VNianShouBtn;

	public static URL: string = "ui://ht2966i4dsuf0";

	public static pkg = "actComNianShou";

	public static createInstance(): Child_ActComNianShou {
		return <Child_ActComNianShou><any>(fairygui.UIPackage.createObject("actComNianShou", "Child_ActComNianShou"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
		s.lbDes.text = HtmlUtil.createLink("玩法说明", true);
		s.hpBar.titleType = fairygui.ProgressTitleType.ValueAndMax;
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ItemNianShouReward.URL, ItemNianShouReward);
		f(ItemNianShouGrid.URL, ItemNianShouGrid);
		f(VNianShou.URL, VNianShou);
		f(VNianShouHp.URL, VNianShouHp);
		f(VNianShouBtn.URL, VNianShouBtn);
	}

	initView(pParent: fairygui.GObject) {
		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
	}

	openPanel(pData?: any) {
		let s = this;
		s.y = 0;
		s._act = pData as Vo_Activity;
		GGlobal.modelActivity.CG_OPENACT(s._act.id)
		IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "nianshou.jpg");
		Timer.instance.listen(s.upTimer, s, 1000);
		s.registerEvent(true);

		//大于则是暴击
		s.isCrit = Number(JSON.parse(ConfigHelp.getSystemDesc(7904))[0][0])
		s._BPCfgTime = ConfigHelp.getSystemNum(7907)
		s._BPCfgCt = ConfigHelp.getSystemNum(7906)
		s.lbNameBP.text = HtmlUtil.fontNoSize("鞭炮", Color.getColorStr(Color.ORANGE))
	}

	closePanel(pData?: any) {
		let s = this;
		s.list.numItems = 0
		IconUtil.setImg(s.imgBg, null);
		s.vNianShou.clean();
		Timer.instance.remove(s.upTimer, s);
		Timer.instance.remove(s.upTimeBP, s);
		s.registerEvent(false);
		s.vReward.clean();
		s.btnKing.clean();
	}

	private registerEvent(pFlag: boolean): void {
		let s = this;
		let m = GGlobal.model_ActNianShou;
		// let red = GGlobal.reddot;
		m.register(pFlag, Model_ActNianShou.openui, s.upView, s);
		m.register(pFlag, Model_ActNianShou.attack, s.takeDmg, s);
		m.register(pFlag, Model_ActNianShou.ns_die, s.nsDie, s);
		m.register(pFlag, Model_ActNianShou.attack_fail, s.attackFail, s);
		GGlobal.control.register(pFlag, Enum_MsgType.ZERO_RESET, s.zeroReset, s);
		// red.register(pFlag, UIConst.ACTCOM_NIANSHOU, s.upRed, s);
		EventUtil.register(pFlag, s.btnZhao, egret.TouchEvent.TOUCH_TAP, s.onZhao, s);
		EventUtil.register(pFlag, s.btnRward, egret.TouchEvent.TOUCH_TAP, s.onRward, s);
		EventUtil.register(pFlag, s.btnKing, egret.TouchEvent.TOUCH_TAP, s.onKing, s);
		EventUtil.register(pFlag, s.vNianShou, egret.TouchEvent.TOUCH_TAP, s.onBat, s);
		EventUtil.register(pFlag, s.lbDes, egret.TextEvent.LINK, s.onTFClick, s);
	}

	dispose() {
		super.dispose()
		this.closePanel()
	}

	private itemRender(index, item: ItemNianShouGrid) {
		let s = this;
		item.vo = s._listData[index];
	}

	private _listData: { idx: number, id: number, time: number }[]
	private _act: Vo_Activity
	// private lastTime: number = 0
	private isCrit = 100
	private _BPCfgTime;
	private _BPCfgCt;

	private upTimer() {
		let s = this;
		const end = s._act ? s._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			s.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			s.labTime.text = "00:00:00";
		}
	}

	private upTimeBP() {
		let s = this;
		let m = GGlobal.model_ActNianShou;
		if (m.lastTime > 0) {
			s.lbFresh.text = DateUtil.getMSBySecond4(m.lastTime) + "后恢复1个鞭炮"
			m.lastTime--;
		} else {
			if (m.bianpaoCt < s._BPCfgCt) {
				m.lastTime = s._BPCfgTime;
				m.bianpaoCt++;
			}
			s.upBianPao();
		}
	}

	private upBianPao() {
		let s = this;
		let m = GGlobal.model_ActNianShou;
		s.lbBPCt.text = m.bianpaoCt + "/" + s._BPCfgCt;
		if (m.bianpaoCt < s._BPCfgCt) {
			Timer.instance.listen(s.upTimeBP, s, 1000);
		} else {
			s.lbFresh.text = ""
			Timer.instance.remove(s.upTimeBP, s);
		}
	}
	private upView() {
		let s = this;
		let m = GGlobal.model_ActNianShou;

		s._listData = m.nsArr
		s.list.numItems = 5;

		//鞭炮
		// s.lastTime = m.lastTime
		s.upBianPao();

		if (m.nsId > 0 && m.lastHp > 0) {
			s.imgNo.visible = false;
			let nsCfg = Config.nian_299[m.nsId];
			s.lbName.text = HtmlUtil.fontNoSize(nsCfg.name, Color.getColorStr(nsCfg.pz))
			s.hpBar.max = nsCfg.hp;
			s.hpBar.value = m.lastHp;
			s.gHp.visible = true;

			s.vNianShou.setImg(nsCfg.pz)
			s.vNianShou.visible = true;
			//奖励
			s.gReward.visible = true;
			s.vReward.tipEnabled = s.vReward.isShowEff = true;
			let itRew = ConfigHelp.makeItemListArr(JSON.parse(nsCfg.reward))[0]
			s.vReward.vo = itRew
			s.lbReward.text = itRew.name;
			s.lbReward.color = itRew.qColor;
			s.vNianShou.touchable = true;
		} else {
			s.imgNo.visible = true;
			s.vNianShou.visible = false;
			s.lbName.text = ""
			s.gHp.visible = false;
			s.gReward.visible = false;
		}
		s.lbTip1.visible = (m.nsId == 0 || m.lastHp == 0)
		s.btnZhao.visible = (m.nsId == 0 || m.lastHp == 0)
		// s.btnKing.visible = true
		s.btnKing.setSt(m.kingSt);
		this.btnRward.checkNotice = m.checkReward();
	}


	private onZhao() {
		GGlobal.model_ActNianShou.CG_SUMMON_11551();
	}

	private onRward() {
		GGlobal.layerMgr.open(UIConst.ACTCOM_NIANSHOU_REWARD)
	}

	private onKing() {
		let m = GGlobal.model_ActNianShou;
		if (m.kingSt > 0) {
			ViewCommonWarn.text("已召唤过年兽王");
			return;
		}
		let cfg = Config.nian_299[5]
		if (!Model_ActNianShou.getState(cfg.open, cfg.end)) {
			ViewCommonWarn.text("不在挑战时间");
			return;
		}
		GGlobal.model_ActNianShou.CG_SUMMON_KING_11553();
	}

	private onTFClick(evt: egret.TextEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_NIANSHOU);
	}

	private onBat() {
		let s = this;
		s.vNianShou.touchable = false;
		GGlobal.model_ActNianShou.CG_ATTACT_11555();
	}

	private takeDmg(val) {
		let s = this;
		let hp = VNianShouHp.create();
		let iscrit = val > s.isCrit
		hp.init(s.vNianShou.x, s.vNianShou.y, val, iscrit, true, false, false);
		hp.onAdd(this);
	}

	private nsDie() {
		let s = this;
		let m = GGlobal.model_ActNianShou;
		s.hpBar.value = m.lastHp;
		let v: ViewGrid = ViewGrid.create()
		v.tipEnabled = v.isShowEff = false;
		v.vo = s.vReward.vo;
		v.setScale(0.7, 0.7);
		s.gReward.visible = false;

		this.addChild(v);
		v.x = s.vReward.x
		v.y = s.vReward.y
		//飘入
		egret.Tween.get(v).to({ x: s.list.x + s.list.width / 2, y: s.list.y }, 400, egret.Ease.sineIn).call(s.nsDieEnd, s, [v]);
	}

	private nsDieEnd(v: ViewGrid) {
		let s = this;
		v.clean();
		v.removeFromParent();
		s.upView();
	}

	private attackFail() {
		let s = this;
		s.vNianShou.touchable = true;
	}

	private zeroReset() {
		if (GGlobal.model_ActNianShou.kingSt == 2) {
			GGlobal.model_ActNianShou.kingSt = 0;
			this.upView();
		}
	}

}