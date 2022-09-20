class ChildCrossKing extends fairygui.GComponent {

	public lbBattleCount: fairygui.GRichTextField;
	public btnAdd: fairygui.GButton;
	public lbChangeCost: fairygui.GRichTextField;
	public lbZsLevel: fairygui.GRichTextField;
	public lbGrade: fairygui.GRichTextField;
	public lbRank: fairygui.GRichTextField;
	public lbPower: fairygui.GRichTextField;
	public ply0: VCrossKingPly;
	public ply1: VCrossKingPly;
	public ply2: VCrossKingPly;
	public ply3: VCrossKingPly;
	public lbTips: fairygui.GRichTextField;
	public btnTips: Button2;
	public btnShop: Button2;
	public btnReport: Button2;
	public btnReward: Button2;
	public btnRank: Button2;
	public btnChange: Button2;
	public btnStore: Button2;
	public btnPromotion: fairygui.GLoader;
	public qzImg: fairygui.GLoader;
	public gClick: fairygui.GGroup;
	//挑战令
	public lbItemCount: fairygui.GRichTextField;
	public lbRemaindTime: fairygui.GRichTextField;
	public groupItem: fairygui.GGroup;
	public iconItem: fairygui.GLoader

	public static URL: string = "ui://me1skowlhfct3p";

	public static createInstance(): ChildCrossKing {
		return <ChildCrossKing><any>(fairygui.UIPackage.createObject("crossKing", "ChildCrossKing"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.groupItem.visible = false;
	}

	public addListen(): void {
		let s = this;
		s.gClick.visible = false;
		s.btnChange.addClickListener(s.onChange, s);
		s.btnAdd.addClickListener(s.onAdd, s);
		s.btnReport.addClickListener(s.onReport, s);
		s.btnShop.addClickListener(s.onShop, s);
		s.btnReward.addClickListener(s.onReward, s);
		s.btnRank.addClickListener(s.onRank, s);
		s.btnPromotion.addClickListener(s.onPromotion, s);
		s.btnTips.addClickListener(s.onOpenTips, s);
		s.btnStore.addClickListener(s.onOpenStore, s);
		GGlobal.control.listen(Enum_MsgType.CROSSKING_BUY_NUM, s.update, s);
		GGlobal.control.listen(Enum_MsgType.CROSSKING_POINT_REWARD, s.checkNotice, s);
		GGlobal.control.listen(Enum_MsgType.CROSSKING_OPEN_STORE, s.checkStore, s);
		IconUtil.setImg(s.qzImg, Enum_Path.IMAGE_MODULES_URL + "area/qz.png");
	}

	public removeListen(): void {
		let s = this;
		s.ply0.removeListen();
		s.ply1.removeListen();
		s.ply2.removeListen();
		s.ply3.removeListen();
		s.btnChange.removeClickListener(s.onChange, s);
		s.btnAdd.removeClickListener(s.onAdd, s);
		s.btnReport.removeClickListener(s.onReport, s);
		s.btnShop.removeClickListener(s.onShop, s);
		s.btnReward.removeClickListener(s.onReward, s);
		s.btnRank.removeClickListener(s.onRank, s);
		s.btnPromotion.removeClickListener(s.onPromotion, s);
		s.btnTips.removeClickListener(s.onOpenTips, s);
		s.btnStore.removeClickListener(s.onOpenStore, s);
		GGlobal.control.remove(Enum_MsgType.CROSSKING_BUY_NUM, s.update, s);
		GGlobal.control.remove(Enum_MsgType.CROSSKING_POINT_REWARD, s.checkNotice, s);
		GGlobal.control.remove(Enum_MsgType.CROSSKING_OPEN_STORE, s.checkStore, s);
		IconUtil.setImg(s.qzImg, null);
	}

	public update(): void {
		let s = this
		s.ply0.vo = Model_CrossKing.uiPlyArr[0];
		s.ply1.vo = Model_CrossKing.uiPlyArr[1];
		s.ply2.vo = Model_CrossKing.uiPlyArr[2];
		s.ply3.vo = Model_CrossKing.uiPlyArr[3];
		var BATTLE_MAX = ConfigHelp.getSystemNum(2205)
		var colorStr;
		if (Model_CrossKing.battleCount > 0) {
			colorStr = Color.GREENSTR;
		} else {
			colorStr = Color.REDSTR;
		}
		this.lbBattleCount.text = "挑战次数：" + "<font color='" + colorStr + "'>" + Model_CrossKing.battleCount + "/" + BATTLE_MAX + "</font>"
		s.btnAdd.visible = true;
		s.lbBattleCount.visible = true;
		s.groupItem.visible = false;
		if (Model_CrossKing.battleCount <= 0) {
			let itemvo = VoItem.create(Model_CrossKing.ITEM_ID)
			let itemCount = Model_Bag.getItemCount(Model_CrossKing.ITEM_ID);
			if (itemCount > 0) {
				s.groupItem.visible = true;
				s.lbBattleCount.visible = false;
				s.btnAdd.visible = false;
				ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemvo.icon + ".png", s.iconItem);
				s.lbItemCount.text = itemvo.name + "：      <font color='#15f234'>" + itemCount + "/1</font>";
			}
		}

		var zsLevel = Config.lsxxkf_232[Model_CrossKing.zsLevel]
		if (zsLevel) {
			var zsLevelArr = ConfigHelp.SplitStr(zsLevel.zs)
			var zsMin = Math.floor(Number(zsLevelArr[0][0]) / 1000)
			var zsMax = Math.floor(Number(zsLevelArr[0][1]) / 1000)
			this.lbZsLevel.text = "乱世枭雄(" + zsMin + "-" + zsMax + "转)"
		} else {
			this.lbZsLevel.text = ""
		}
		var grade = Model_CrossKing.myGrade;
		var cfgGrade = Config.lsxx_232[grade]
		if (cfgGrade) {
			this.lbGrade.text = "我的段位：<font color='" + Color.getColorStr(cfgGrade.color) + "'>" + cfgGrade.name + "</font>"
		} else {
			this.lbGrade.text = "我的段位："
		}
		this.lbRank.text = "我的排名：" + (Model_CrossKing.myRank ? Model_CrossKing.myRank : "")
		this.lbPower.text = "战力：" + (Model_CrossKing.myPower ? ConfigHelp.numToStr(Model_CrossKing.myPower) : "")

		if (Config.lsxx_232[grade + 1] == null) {
			this.lbTips.text = "已达最高段位"
		} else {
			this.lbTips.text = cfgGrade ? "前" + cfgGrade.up + "名可挑战晋级" : ""
		}
		if (Model_CrossKing.status == 1 && cfgGrade && Model_CrossKing.myRank <= cfgGrade.up) {
			this.gClick.visible = true;
		} else {
			this.gClick.visible = false;
		}

		var cost = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2206))[0][2]
		this.lbChangeCost.text = "" + cost
		if (Model_player.voMine.tongbi < Number(cost)) {
			this.lbChangeCost.color = Color.REDINT;
		} else {
			this.lbChangeCost.color = Color.GREENINT;
		}
		var grade = Model_CrossKing.myGrade;
		if (grade != 0) {
			this.btnPromotion.url = fairygui.UIPackage.getItemURL("Arena", "g" + Math.ceil(grade / 3));
		}
		this.checkNotice();
		this.checkStore();
	}

	private checkNotice(): void {
		this.btnReward.checkNotice = Model_CrossKing.checkReward();
	}

	private checkStore(): void {
		this.btnStore.checkNotice = Model_CrossKing.checkStore();
	}

	private onChange(): void {
		var cost = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2206))[0][2]
		if (Model_player.voMine.tongbi < Number(cost)) {
			ViewCommonWarn.text("铜钱不足")
			return;
		}
		GGlobal.modelCrossKing.CG_CHANGE_RANKS(0);
	}

	private onAdd(): void {
		Model_CrossKing.onAdd();
	}

	private onReport(): void {
		GGlobal.layerMgr.open(UIConst.CROSS_KING_REPORT)
	}

	private onShop(): void {
		GGlobal.layerMgr.open(UIConst.BAOKU_XX)
	}

	private onReward(): void {
		GGlobal.layerMgr.open(UIConst.CROSS_KING_REWARD)
	}
	private onRank(): void {
		GGlobal.layerMgr.open(UIConst.CROSS_KING_RANK)
	}
	private onPromotion(): void {
		var grade = Model_CrossKing.myGrade;
		if (grade == 0) {
			return;
		}
		if (Config.lsxx_232[grade + 1] == null) {
			ViewCommonWarn.text("已达最高段位")
			return;
		}
		var cfgGrade = Config.lsxx_232[grade]
		if (Model_CrossKing.myRank > cfgGrade.up) {
			ViewCommonWarn.text("前" + cfgGrade.up + "名可挑战晋升赛")
			return;
		}
		GGlobal.layerMgr.open(UIConst.CROSS_KING_PROMOTE)
	}

	private onOpenTips(): void {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.CROSS_KING)
	}

	private onOpenStore(): void {
		GGlobal.layerMgr.open(UIConst.CROSS_KING_STORE);
	}

}