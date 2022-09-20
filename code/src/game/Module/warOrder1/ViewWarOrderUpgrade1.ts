/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewWarOrderUpgrade1 extends UIModalPanel {
	//注意：start和end之间的属性是脚本自动修改，在这之间插入的代码会被删除，不要在start和end之间添加代码
	//>>>>start
	public stateCtrl: fairygui.Controller;
	public frame: fairygui.GLabel;
	public btnGo: fairygui.GButton;
	public tf0: fairygui.GRichTextField;
	public list: fairygui.GList;
	public posImg: fairygui.GImage;
	public tf2: fairygui.GRichTextField;
	public tfDes: fairygui.GImage;
	public pic: fairygui.GLoader;
	public t0: fairygui.Transition;
	public ldName: fairygui.GLabel;
	//>>>>end
	public static URL: string = "ui://89er3bo3e7lc1";

	public static createInstance(): ViewWarOrderUpgrade1 {
		return <ViewWarOrderUpgrade1><any>(fairygui.UIPackage.createObject("warOrder1", "ViewWarOrderUpgrade1"));
	}


	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("warOrder1", "ViewWarOrderUpgrade1").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.t0 = self.view.getTransition("t0");
		super.childrenCreated();
		self.list.itemRenderer = self.onItemRender0;
		self.list.callbackThisObj = self;
	}


	protected onShown() {
		let self = this;
		self._cfgID = self._args
		self.registerEvent(true);
		self.refreshData();
	}

	protected onHide(): void {
		let self = this;
		self.registerEvent(false);
		GGlobal.modelActivity.CG_OPENACT(self._cfgID.groupId); //重新请求更新奖励列表数据
	}

	//=========================================== API ==========================================
	private _cfgID: Vo_Activity;
	//===================================== private method =====================================
	private _rewardArr: IGridImpl[]
	private refreshData() {
		let t = this
		let m = GGlobal.modelWarOrder
		let voWarO = m.getWarOrder(t._cfgID.id)
		t.stateCtrl.selectedIndex = voWarO.upgradeFlag;

		let cfg = Config.xsljh1_338[t._cfgID.qs]
		t._rewardArr = ConfigHelp.makeItemListArr(cfg.show1)
		t.list.numItems = t._rewardArr.length
		let t_charCfg = Config.shop_011[cfg.cz];

		t.btnGo.text = t_charCfg.RMB + "元"


		// t.tf2.text = HtmlUtil.fontNoSize(64800 + "", Color.GREENSTR) + "  超值奖励等你来拿"

		let picItem: VoItem = ConfigHelp.makeItemListArr(cfg.show)[0] as VoItem
		if (picItem.cfg.tips == 1) {//武将
			t.setUIWuJ(picItem);
			t.pic.visible = false
		} else if (picItem.cfg.tips == 2) {//7系统
			t.setUIRole(picItem);
			t.pic.visible = true
		}
		t.ldName.text = picItem.name
	}

	private registerEvent(pFlag: boolean) {
		GGlobal.control.register(pFlag, Enum_MsgType.WarOrder_REWARD_UPDATE, this.onUpdate, this);

		EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
	}
	//======================================== handler =========================================
	private onUpdate() {
		this.refreshData();
	}

	private onBtnClick(e: egret.TouchEvent) {
		let m = GGlobal.modelWarOrder
		switch (e.currentTarget) {
			case this.btnGo:
				let t_qs = this._cfgID.qs;
				for (let key in Config.xsljh1_338) {
					let cfg = Config.xsljh1_338[key];
					if (cfg.qs == t_qs) {
						GGlobal.modelchongzhi.CG_CHONGZHI_135(cfg.cz, null, false);
						break;
					}
				}
				break;
		}
		GGlobal.layerMgr.close(UIConst.WAR_ORDER_UPGRADE)
	}

	private onItemRender0(pIndex: number, pItem: ViewGrid) {
		pItem.isShowEff = true;
		pItem.tipEnabled = true;
		pItem.vo = this._rewardArr[pIndex];
	}




	private awatar: UIRole = null;
	private sysEff: Part;
	private godWeaponEff: Part;
	public setUIRole(v: VoItem) {
		let self = this;
		let sys = (v as VoItem).cfg.sys
		let tz = v.tzPas;
		if (self.godWeaponEff) {
			EffectMgr.instance.removeEff(self.godWeaponEff);
			self.godWeaponEff = null;
		}
		self.t0.setPaused(false);
		let cfg1: Ibao_214 | Ibook_215 | Iyb_217 | Iclothes_212 | Ibook_213 | Isword_216;
		let effID = 0;
		switch (sys) {
			case UIConst.BAOWU:
				cfg1 = Config.bao_214[tz];
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
				break;
			case UIConst.TIANSHU:
				cfg1 = Config.book_215[tz]
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
				break;
			case UIConst.SHEN_JIAN:
				cfg1 = Config.sword_216[tz];
				effID = cfg1.tptx;
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
				break;
			case UIConst.YIBAO:
				cfg1 = Config.yb_217[tz];
				effID = cfg1.tptx;
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
				break;
			case UIConst.ZHAN_JIA:
				cfg1 = Config.clothes_212[tz];
				effID = cfg1.tptx;
				IconUtil.setImg(self.pic, Enum_Path.ZHANJIA_URL + cfg1.pic + ".png");
				break;
			case UIConst.BINGFA:
				cfg1 = Config.book_213[tz];
				effID = cfg1.tptx;
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
				break;
			case UIConst.ZS_GODWEAPON:
				IconUtil.setImg(self.pic, null);
				let cfg7 = Config.sb_750[tz];
				self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg7.picture, self.pic.displayObject as fairygui.UIContainer, self.pic.width / 2, self.pic.height / 2, 1000);
				break;
			case UIConst.SHAOZHU:
				IconUtil.setImg(self.pic, null);
				let cfg8 = Config.son_267[tz];
				self.t0.setPaused(true);
				self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg8.zs, self.pic.displayObject as fairygui.UIContainer, self.pic.width / 2, self.pic.height, 1000);
				break;
			case UIConst.SHAOZHU_FASHION:
				IconUtil.setImg(self.pic, null);
				let cfg9 = Config.sonshow_267[tz];
				self.t0.setPaused(true);
				self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg9.zs, self.pic.displayObject as fairygui.UIContainer, self.pic.width / 2, self.pic.height, 1000);
				break;
			case UIConst.QICE_STAR:
				let cfg10 = Config.qc_760[tz];
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg10.pic + ".png");
				break;
			case UIConst.HORSE:
			case UIConst.HORSE_HH:
				IconUtil.setImg(self.pic, null);
				self.t0.setPaused(true);
				let cfgHorse = Config.zq_773[tz];
				self.godWeaponEff = EffectMgr.addEff("body/" + cfgHorse.model + "/ride_st/ani", self.pic.displayObject as fairygui.UIContainer, self.pic.width / 2, self.pic.height, 1000);
				break;
		}
		if (self.sysEff) {
			EffectMgr.instance.removeEff(self.sysEff);
			self.sysEff = null;
		}
		if (effID > 0) {
			self.sysEff = EffectMgr.addEff("uieff/" + effID, self.pic.displayObject as fairygui.UIContainer, self.pic.width / 2, self.pic.height / 2, 1000, -1, true);
		}
	}

	public setUIWuJ(v: VoItem) {
		let self = this
		let tzPas = v.tzPas
		var mx
		let weapon
		let hero
		let hasSkill = true;
		if (v.tz == UIConst.WU_JIANG_SZ) {
			mx = Config.sz_739[tzPas].moxing;
			weapon = tzPas
			hero = Config.hero_211[Math.floor(tzPas / 1000)]
		} else {
			hero = Config.hero_211[tzPas]
			weapon = mx = hero.type
		}
		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(self.posImg.x, self.posImg.y);
			self.awatar.uiparent = self.displayListContainer;
			self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
		}
		self.awatar.setBody(mx);
		self.awatar.setWeapon(weapon);
		self.awatar.onAdd();
		self.awatar.setScaleXY(1.5, 1.5);
	}
}