/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildYiShouBoss extends fairygui.GComponent implements IPanel {
	public n20: fairygui.GImage;
	public n10: fairygui.GLoader;
	public n21: fairygui.GImage;
	public n16: fairygui.GImage;
	public n8: fairygui.GImage;
	public n1: fairygui.GRichTextField;
	public lbDesc: fairygui.GRichTextField;
	public n5: fairygui.GImage;
	public lbDebuff: fairygui.GRichTextField;
	public groupDebuff: fairygui.GGroup;
	public lbBossName: fairygui.GRichTextField;
	public btnRank: fairygui.GButton;
	public n17: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public grid: ViewGrid;
	public lbTime: fairygui.GRichTextField;
	public lbCount: fairygui.GRichTextField;
	public n26: fairygui.GRichTextField;
	public n27: fairygui.GLoader;
	public n29: fairygui.GRichTextField;
	public lbComplete: fairygui.GRichTextField;
	public groupItem: fairygui.GGroup;
	public n30: fairygui.GList;
	public btnGet: fairygui.GButton;
	public btnFght: fairygui.GButton;
	public btnAdd: fairygui.GButton;
	public n33: fairygui.GImage;
	public n32: fairygui.GImage;
	public imgNULL: fairygui.GImage;
	public imgYlq: fairygui.GImage;

	public static URL: string = "ui://47jfyc6ehul73h";
	public static createInstance(): ChildYiShouBoss {
		return <ChildYiShouBoss><any>(fairygui.UIPackage.createObject("Boss", "ChildYiShouBoss"));
	}
	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
		this.lbDesc.text = HtmlUtil.createLink("玩法说明", true, "");
		this.n30.callbackThisObj = this;
		this.n30.itemRenderer = this.itemRender;
	}

	itemRender = (idx, obj) => {
		let item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this.awards[idx];
	}

	fightHD = () => {
		let itemcount = Model_Bag.getItemCount(410403);
		if (itemcount <= 0 && GGlobal.modelYiShouBOSS.remaindCount <= 0) {
			ViewCommonWarn.text("挑战次数不足");
			return;
		}
		GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_challengeBoss_9433();
	}

	getHD = () => {
		GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_getReward_9439();
	}

	addCountHD = () => {
		if (ModelYiShouBOSS.geMax_buy() > GGlobal.modelYiShouBOSS.hasBuyCount) {
			GGlobal.layerMgr.open(UIConst.YSBOSSBUY);
		} else {
			ViewCommonWarn.text("今日购买次数已满");
		}
	}

	openRankHD = () => {
		GGlobal.layerMgr.open(UIConst.YSBOSSRANK);
	}

	openDescHD = () => {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.YSBOSS);
	}

	private awatar;
	private awards;
	update = () => {
		let self = this;
		let m = GGlobal.modelYiShouBOSS;
		if (m.currentlayer == 0) {
			return;
		}
		let cfg = Config.ysboss_759[m.currentlayer];
		let bossid = JSON.parse(cfg.boss)[0][1];
		let npcCFG = Config.NPC_200[bossid];

		self.awards = ConfigHelp.makeItemListArr(cfg.tgjl);
		self.n30.numItems = self.awards.length;

		self.lbName.text = m.FirstKiller;
		self.lbBossName.text = "第" + m.currentlayer + "关·" + npcCFG.name;

		let hasKiller = m.FirstKiller != '';
		self.groupDebuff.visible = hasKiller;
		self.imgNULL.visible = !hasKiller;
		self.lbName.visible = hasKiller;
		let debuf = ConfigHelp.getSystemNum(7301);
		self.lbDebuff.text = BroadCastManager.reTxt("<font color='#f1f1f1'>boss已被<font color='#15f234'>{0}</font>率先击杀，属性降低{1}%</font>", m.FirstKiller, debuf);

		self.grid.tipEnabled = true;
		self.grid.isShowEff = true;
		self.grid.vo = ConfigHelp.makeItemListArr(cfg.ssjl)[0];

		self.lbCount.text = "挑战次数：<font color='#15f234'>" + m.remaindCount + "/5<font>";
		self.lbCount.visible = true;
		self.btnAdd.visible = true;
		self.groupItem.visible = false;
		if (m.remaindCount > 0) {
			self.groupItem.visible = false;
			self.btnAdd.visible = true;
		} else {
			let itemcount = Model_Bag.getItemCount(410403);
			if (itemcount > 0) {
				self.btnAdd.visible = false;
				self.groupItem.visible = true;
				self.lbCount.visible = false;
			}
			self.n29.text = itemcount + "";
		}

		self.btnGet.visible = m.crossLayer > m.completeLayer;
		self.btnFght.visible = m.currentlayer > m.crossLayer;
		self.lbComplete.visible = self.imgYlq.visible = m.currentlayer == m.crossLayer && m.crossLayer == m.completeLayer;

		self.drawAwatar(bossid);
	}

	drawAwatar = (bossid) => {
		let self = this;
		let bossCFG = Config.NPC_200[bossid];
		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.uiparent = self.displayListContainer;
		}
		self.awatar.setPos(310, 530);
		self.awatar.setScaleXY(1.5, 1.5);
		if (bossCFG.weapon) {
			self.awatar.setWeapon(bossCFG.mod);
		} else {
			self.awatar.setWeapon(0);
		}
		self.awatar.setBody(bossCFG.mod);
		self.awatar.onAdd();
	}

	updateTime = () => {
		let self = this;
		let now = Model_GlobalMsg.getServerTime();
		let m = GGlobal.modelYiShouBOSS;
		if (m.nextAddTime <= 0) return;
		if (m.remaindCount < 5) {
			if (now < m.nextAddTime) {
				self.lbTime.text = "恢复时间：" + TimeUitl.getRemainingTime(m.nextAddTime, now, { minute: "分", second: "秒" });
			} else {
				m.remaindCount++;
				self.groupItem.visible = false;
				self.lbCount.text = "挑战次数：<font color='#15f234'>" + m.remaindCount + "/5<font>";
				self.lbCount.visible = true;
				if (m.remaindCount < 5) {
					m.nextAddTime += 3600 * 1000;
					self.lbTime.text = "恢复时间：" + TimeUitl.getRemainingTime(m.nextAddTime, now, { minute: "分", second: "秒" });
				} else {
					self.lbTime.text = "";
				}
			}
		} else {
			self.lbTime.text = "";
		}
	}

	eventFun = (v) => {
		let self = this;
		let register = EventUtil.register;
		register(v, self.btnFght, egret.TouchEvent.TOUCH_TAP, self.fightHD, self);
		register(v, self.btnRank, egret.TouchEvent.TOUCH_TAP, self.openRankHD, self);
		register(v, self.btnGet, egret.TouchEvent.TOUCH_TAP, self.getHD, self);
		register(v, self.btnAdd, egret.TouchEvent.TOUCH_TAP, self.addCountHD, self);
		register(v, self.lbDesc, egret.TextEvent.LINK, self.openDescHD, self);
	}

	protected _viewParent: fairygui.GObject;
	initView = (pParent: fairygui.GObject) => {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	public openPanel = (pData?: any) => {
		let s = this;
		let m = GGlobal.modelYiShouBOSS;
		m.nextAddTime = 0;
		s.eventFun(1);
		m.CG_SpecialAnimalBoss_openUI_9431();
		GGlobal.control.listen(UIConst.YSBOSS, s.update, s);
		s.lbTime.text = "";
		Timer.instance.listen(s.updateTime, s, 1000);
		IconUtil.setImg(s.n10, Enum_Path.BACK_URL + "ysbossbg.jpg");
		IconUtil.setImg(s.n27, Enum_Path.ICON70_URL + "410403.png");
	}

	public closePanel = (pData?: any) => {
		let s = this;
		s.eventFun(0);
		s.n30.numItems = 0;
		s.grid.clean();
		if (s.awatar) {
			s.awatar.onRemove();
			s.awatar = null;
		}
		Timer.instance.remove(s.updateTime, s);
		GGlobal.control.remove(UIConst.YSBOSS, s.update, s);
		IconUtil.setImg(s.n10, null);
		IconUtil.setImg(s.n27, null);
	}
}