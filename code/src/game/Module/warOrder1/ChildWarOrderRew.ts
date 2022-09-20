/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildWarOrderRew extends fairygui.GComponent {
	//注意：start和end之间的属性是脚本自动修改，在这之间插入的代码会被删除，不要在start和end之间添加代码
	//>>>>start
	public updateFlagCtrl: fairygui.Controller;
	public imgBg1: fairygui.GImage;
	public tfLevel: fairygui.GTextField;
	public tfDate: fairygui.GRichTextField;
	public btnGetAll: Button2;
	public pb: fairygui.GProgressBar;
	public list: fairygui.GList;
	public itemBig: WarOrderRewItem2;
	public btnBuyLv: fairygui.GButton;
	public btnLock: fairygui.GGraph;
	public imgLock: fairygui.GButton;
	public lock0: fairygui.GGroup;
	public listShow: fairygui.GList;
	public posImg: fairygui.GImage;
	public ldName: fairygui.GLabel;
	public pic: fairygui.GLoader;
	public t0: fairygui.Transition;
	//>>>>end
	public static URL: string = "ui://89er3bo3e7lcp";

	public static createInstance(): ChildWarOrderRew {
		return <ChildWarOrderRew><any>(fairygui.UIPackage.createObject("warOrder1", "ChildWarOrderRew"));
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let t = this;
		CommonManager.parseChildren(t, t);
		t.t0 = t.getTransition("t0");

		t.list.itemRenderer = t.onRewardItemRender;
		t.list.callbackThisObj = t;
		t.list.setVirtual();

		t.listShow.itemRenderer = t.onRewardShow;
		t.listShow.callbackThisObj = t;
	}

	_listDat: VoWarOrderReward[]
	_curActVo: Vo_Activity
	public updata(v: VoWarOrderReward[], actVo: Vo_Activity) {
		let t = this
		t._listDat = v
		t._curActVo = actVo
		t.list.numItems = v.length

		let m = GGlobal.modelWarOrder
		let voWarO = m.getWarOrder(t._curActVo.id)

		//奖励页的聚焦有特殊逻辑
		let t_listCom = this.list
		let t_voList = v
		let t_targetIndex = 0;
		let t_hasCanGet = false;
		for (let i = 0; i < t_voList.length; i++) {
			let t_vo = t_voList[i];
			if (t_vo.state0 == Model_WarOrderAct.STATE_CAN_GET || t_vo.state1 == Model_WarOrderAct.STATE_CAN_GET) {
				t_targetIndex = i;
				t_hasCanGet = true;
				break;
			}
		}
		if (t_hasCanGet) {
			t_listCom.scrollToView(t_targetIndex, true, true);
		}
		else {
			t_targetIndex = voWarO.levelId //- 2;
			t_targetIndex = t_targetIndex < 0 ? 0 : t_targetIndex;
			t_targetIndex = t_targetIndex < m.getLvMax(t._curActVo.qs) ? t_targetIndex : m.getLvMax(t._curActVo.qs) - 1;
			t_listCom.scrollToView(t_targetIndex, true, true);
		}

		t.showBig(t_targetIndex)

		let picCfg = Config.xsljh1_338[actVo.qs]
		let picItem: VoItem = ConfigHelp.makeItemListArr(picCfg.show)[0] as VoItem


		if (picItem.cfg.tips == 1) {//武将
			t.setUIWuJ(picItem);
			t.pic.visible = false
		} else if (picItem.cfg.tips == 2) {//7系统
			t.setUIRole(picItem);
			t.pic.visible = true
		}

		t.ldName.text = picItem.name
		// IconUtil.setImg(t.ldName, Enum_Path.PIC_URL + picItem.cfg.use + ".png");
		t._rewardArr = ConfigHelp.makeItemListArr(picCfg.reward)
		t.listShow.numItems = t._rewardArr.length

		t.refreshLevelInfo();
		t.registerEvent(true)
		if (t._curActVo) {
			if (!Timer.instance.has(t.onDateUpdate, t))
				Timer.instance.listen(t.onDateUpdate, t, 1000);
		}
	}
	private _rewardArr: IGridImpl[]

	private refreshLevelInfo() {
		let t = this;
		let m = GGlobal.modelWarOrder
		let voWarO = m.getWarOrder(t._curActVo.id)
		let t_levelId = voWarO.levelId;
		let t_curExp = voWarO.curExp;
		let t_vo = m.getRewardVoById(t_levelId, t._curActVo);
		if (t_vo) {
			if (t_vo.cfg.exp == 0) //已满级
			{
				this.pb.visible = false;
				this.pb.max = t_vo.cfg.exp;
				this.pb.value = t_vo.cfg.exp;
				this.pb._titleObject.text = "已满级"
			}
			else {
				this.pb.visible = true;
				this.pb.max = t_vo.cfg.exp;
				this.pb.value = t_curExp;
			}
		}
		else {
		}
		this.tfLevel.text = t_levelId + "";
		let t_upgradeFlag = voWarO.upgradeFlag;
		this.updateFlagCtrl.selectedIndex = t_upgradeFlag;
		egret.Tween.removeTweens(t.imgLock);
		if (t_upgradeFlag == 0) {
			t.scaling()
		}
	}


	//===================================== private method =====================================
	private onRewardItemRender(pIndex: number, pItem: WarOrderRewItem1) {
		pItem.setData(this._listDat[pIndex], this._curActVo);
	}
	private onRewardShow(pIndex: number, pItem: ViewGridRender) {
		pItem.vo = this._rewardArr[pIndex]
	}


	closePanel(pData?: any) {
		let t = this;
		t.registerEvent(false);
		t.list.numItems = 0
		t.itemBig.clean()
		Timer.instance.remove(t.onDateUpdate, t);
		if (t.awatar) {
			t.awatar.onRemove();
			t.awatar = null;
		}

		IconUtil.setImg(t.pic, null);
		if (t.godWeaponEff) {
			EffectMgr.instance.removeEff(t.godWeaponEff);
			t.godWeaponEff = null;
		}
		if (t.sysEff) {
			EffectMgr.instance.removeEff(t.sysEff);
			t.sysEff = null;
		}
		egret.Tween.removeTweens(t.imgLock);
	}

	private registerEvent(pFlag: boolean) {
		let t = this;
		EventUtil.register(pFlag, t.btnGetAll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnBuyLv, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnLock, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.list.scrollPane, fairygui.ScrollPane.SCROLL, t.scrollComp, t);

		ReddotMgr.ins().register(t._curActVo.groupId + "_1", t.btnGetAll.noticeImg)
	}
	private onBtnClick(e: egret.TouchEvent) {
		let t = this;
		switch (e.currentTarget) {
			case t.btnLock:
				GGlobal.layerMgr.open(UIConst.WAR_ORDER_UPGRADE1, t._curActVo);
				break;
			case t.btnGetAll:
				let canGet = false
				for (let i = 0; i < t._listDat.length; i++) {
					let v = t._listDat[i];
					if (v.state0 == 1 || v.state1 == 1) {
						canGet = true;
						break;
					}
				}
				if (!canGet) {
					ViewCommonWarn.text("暂无奖励可领")
					return;
				}
				GGlobal.modelWarOrder.CG12251(0, 0, 1, t._curActVo.groupId);
				break;
			case t.btnBuyLv:
				GGlobal.layerMgr.open(UIConst.WAR_ORDER_BUYCT1, t._curActVo);
				break;
		}
	}

	private scrollComp(): void {
		let t = this
		let curpage: number = this.list.getFirstChildInView();
		t.showBig(curpage + 4)
	}

	private showBig(curpage) {
		let t = this
		let big: VoWarOrderReward
		while (true) {
			big = t._listDat[curpage]
			if (big == null || big.id % 5 == 0) {
				break;
			} else {
				curpage++
			}
		}
		if (big == null) {
			big = t._listDat[t._listDat.length - 1]
		}
		t.itemBig.updata(big)
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

	/** 刷新时间 */
	private onDateUpdate() {
		let t_dateStr = "";
		if (this._curActVo) {
			let t_end = this._curActVo.end; //s
			const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s

			let t_remainS = t_end - servTime;
			if (t_remainS > 0) {
				if (t_remainS < 24 * 60 * 60) {
					//小于24小时
					// t_dateStr = DateUtil.formatUsedTime(t_remainS, "活动剩余时间：\nhh小时uu分ss秒");
					t_dateStr = "活动剩余时间：\n" + HtmlUtil.font(DateUtil.formatUsedTime(t_remainS, "hh小时uu分ss秒"), Color.GREENSTR);
				}
				else {
					// t_dateStr = DateUtil.formatUsedTime(t_remainS, "活动剩余时间：\ndd天hh小时");
					t_dateStr = "活动剩余时间：\n" + HtmlUtil.font(DateUtil.formatUsedTime(t_remainS, "dd天hh小时"), Color.GREENSTR);
				}
			}
			else {
				t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
			}
		}
		this.tfDate.text = t_dateStr;
	}


	//缩放
	private scaling() {
		let t = this;
		egret.Tween.get(t.imgLock).wait(500).call(t.fireEff, t).wait(500).call(t.fireEff, t).wait(1000).call(t.scaling, t)
	}
	private fireEff() {
		let t = this;
		egret.Tween.get(t.imgLock).to({ scaleX: 1.1, scaleY: 1.1 }, 100, egret.Ease.backInOut).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.backInOut)
	}

}