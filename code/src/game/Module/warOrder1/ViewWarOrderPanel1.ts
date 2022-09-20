/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewWarOrderPanel1 extends UIPanelBase {
	//注意：start和end之间的属性是脚本自动修改，在这之间插入的代码会被删除，不要在start和end之间添加代码
	//>>>>start
	public tabCtrl: fairygui.Controller;
	public updateFlagCtrl: fairygui.Controller;
	public frame: fairygui.GLabel;
	public list1: fairygui.GList;
	public tab0: Button2;
	public tab1: Button2;
	public tab2: Button2;
	public tfLevel: fairygui.GTextField;
	public tfDate: fairygui.GRichTextField;
	public btnBuyLv: fairygui.GButton;
	public btnUpgrade: fairygui.GButton;
	public btnGetAll: Button2;
	public pb: fairygui.GProgressBar;
	public lbSM: fairygui.GRichTextField;
	public itemRew: ChildWarOrderRew;
	//>>>>end
	public static URL: string = "ui://89er3bo3e7lc0";

	public static createInstance(): ViewWarOrderPanel1 {
		return <ViewWarOrderPanel1><any>(fairygui.UIPackage.createObject("warOrder1", "ViewWarOrderPanel1"));
	}

	public constructor() {
		super();
		this.setSkin("warOrder1", "warOrder1_atlas0", "ViewWarOrderPanel1");

		let m = GGlobal.modelWarOrder;
		m.setup();
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(WarOrderRewItem1.URL, WarOrderRewItem1);
		f(WarOrderTaskItem1.URL, WarOrderTaskItem1);
		f(WarOrderRewItem2.URL, WarOrderRewItem2);
		f(ChildWarOrderRew.URL, ChildWarOrderRew);
	}

	protected initView(): void {
		super.initView();
		let t = this;
		t._listMap = [t.itemRew, t.list1, t.list1];

		t.list1.itemRenderer = t.onTaskItemRender;
		t.list1.callbackThisObj = t;
		t.list1.setVirtual();
	}


	private _listMap: any[];
	private _voListMap: any[][] = [];
	private _curActVo: Vo_Activity;
	private _consumeIdMap = [412020, 412021];
	private _initCmd = false;


	protected onShown(): void {
		let t = this;
		let m = GGlobal.modelWarOrder;
		let pData = t._args


		let cfgXT: Ixitong_001 = Config.xitong_001[pData];
		let actArr
		if (cfgXT.or == 1) {
			actArr = GGlobal.modelActivity.getGroup(pData)
		} else {
			actArr = ModelEightLock.getActivity(pData);
		}
		if (!actArr) {
			return;
		}
		t._curActVo = actArr[0]
		m.setActVo(t._curActVo)

		if (cfgXT.or == 1) {
			GGlobal.modelActivity.CG_OPENACT(pData);
		} else {
			GGlobal.modelEightLock.CG4571(pData);
		}
		t.onSendMsg()
		t.registerEvent(true);
		t.refreshDataList(0);
		t.refreshLevelInfo();
		t.tfDate.text = "";
		if (t._curActVo) {
			if (!Timer.instance.has(t.onDateUpdate, t))
				Timer.instance.listen(t.onDateUpdate, t, 1000);
		}
		t.tabCtrl.selectedIndex = -1;
		t.tabCtrl.selectedIndex = 0;

		// let cfg: Ihuodong_009 = Config.huodong_009[t._curActVo.index];
		// let imgTil = t.frame.getChild("icon").asLoader;
		// if (cfg) {
		// 	IconUtil.setImg(imgTil, Enum_Path.ACTCOM_URL + cfg.dicon + "_title.png");
		// } else {
		// 	IconUtil.setImg(imgTil, Enum_Path.ACTCOM_URL + t._curActVo.id + "_title.png");
		// }

	}

	protected onHide(): void {
		let t = this;
		t.registerEvent(false);
		Timer.instance.remove(t.onDateUpdate, t);
		for (let i = 0; i < t._listMap.length; i++) {
			t._listMap[i].numItems = 0
		}
		t.itemRew.closePanel()
	}

	//=========================================== API ==========================================

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
					// t_dateStr = DateUtil.formatUsedTime(t_remainS, "活动剩余时间：hh小时uu分ss秒");
					t_dateStr = "活动剩余时间：" + HtmlUtil.font(DateUtil.formatUsedTime(t_remainS, "hh小时uu分ss秒"), Color.GREENSTR);
				}
				else {
					// t_dateStr = DateUtil.formatUsedTime(t_remainS, "活动剩余时间：dd天hh小时");
					t_dateStr = "活动剩余时间：" + HtmlUtil.font(DateUtil.formatUsedTime(t_remainS, "dd天hh小时"), Color.GREENSTR);
				}
			}
			else {
				t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
			}
		}
		this.tfDate.text = t_dateStr;
	}

	//===================================== private method =====================================
	private onRewardItemRender(pIndex: number, pItem: WarOrderRewItem) {
		let t_list = this._voListMap[0];
		if (t_list) {
			pItem.setData(t_list[pIndex], this._curActVo);
		}
	}

	private onTaskItemRender(pIndex: number, pItem: WarOrderTaskItem) {
		let t = this;
		let idx = t.tabCtrl.selectedIndex == 1 ? 1 : 2;
		let t_list = t._voListMap[idx];
		if (t_list) {
			pItem.setData(t_list[pIndex], t._curActVo, idx);
		}
	}

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
				t.pb.visible = false;
				t.pb.max = t_vo.cfg.exp;
				t.pb.value = t_vo.cfg.exp;
				t.pb._titleObject.text = "已满级"
			}
			else {
				t.pb.visible = true;
				t.pb.max = t_vo.cfg.exp;
				t.pb.value = t_curExp;
			}
		}
		else {
		}
		this.tfLevel.text = t_levelId + "";
		let t_upgradeFlag = voWarO.upgradeFlag;
		this.updateFlagCtrl.selectedIndex = t_upgradeFlag;
	}

	private refreshDataList(pTabIndex: number) {
		let t = this;
		let m = GGlobal.modelWarOrder
		switch (pTabIndex) {
			case 0:
				{
					let t_sourceList = m.getRewardVoList(t._curActVo);
					let t_showList = t_sourceList.concat();
					this._voListMap[pTabIndex] = t_showList;
				}
				break;
			case 1:
				{
					let t_map = m.getTypeDayListMap(t._curActVo);
					let t_showList: VoWarOrderTask[] = [];
					for (let k in t_map) {
						let t_voList = t_map[k];
						let t_showVo = t_voList[t_voList.length - 1];
						for (let i = t_voList.length - 1; i >= 0; i--) {
							let t_vo = t_voList[i];
							if (t_vo.state == Model_WarOrderAct.SATTE_DONE)
								continue;
							t_showVo = t_vo;
						}
						t_showList.push(t_showVo);
					}
					t_showList.sort((pA: VoWarOrderTask, pB: VoWarOrderTask) => {
						if (pA.sortValue > pB.sortValue)
							return -1;
						else if (pA.sortValue < pB.sortValue)
							return 1;
						else
							return pA.taskId - pB.taskId;
					});
					this._voListMap[pTabIndex] = t_showList;
				}
				break;
			case 2:
				{
					let t_map = m.getTypeWeekListMap(t._curActVo);
					let t_showList: VoWarOrderTask[] = [];
					for (let k in t_map) {
						let t_voList = t_map[k];
						let t_showVo = t_voList[t_voList.length - 1];
						for (let i = t_voList.length - 1; i >= 0; i--) {
							let t_vo = t_voList[i];
							if (t_vo.state == Model_WarOrderAct.SATTE_DONE)
								continue;
							t_showVo = t_vo;
						}
						t_showList.push(t_showVo);
					}
					t_showList.sort((pA: VoWarOrderTask, pB: VoWarOrderTask) => {
						if (pA.sortValue > pB.sortValue)
							return -1;
						else if (pA.sortValue < pB.sortValue)
							return 1;
						else
							return pA.taskId - pB.taskId;
					});
					this._voListMap[pTabIndex] = t_showList;
				}
				break;
		}

		if (pTabIndex == 0) {
			(this._listMap[pTabIndex] as ChildWarOrderRew).updata(this._voListMap[pTabIndex], this._curActVo);
		} else {
			this._listMap[pTabIndex].numItems = this._voListMap[pTabIndex].length;
		}

		this._listMap[pTabIndex].numItems = this._voListMap[pTabIndex].length;
	}


	private registerEvent(pFlag: boolean) {
		let t = this;
		GGlobal.control.register(pFlag, Enum_MsgType.WarOrder_REWARD_UPDATE, t.onRewardUpdate, t);
		GGlobal.control.register(pFlag, Enum_MsgType.WarOrder_TASK_UPDATE, t.onTaskUpdate, t);
		GGlobal.control.register(pFlag, Enum_MsgType.WARORDERL_OPENUI, t.refreshUI, t);
		//更新任务
		// GGlobal.control.register(pFlag, Enum_MsgType.DUANZAO_DATA_UPDATE, t.onSendMsg, t);//强化升星
		// GGlobal.control.register(pFlag, Enum_MsgType.YUANBAO_UPDATE, t.onSendMsg, t);//消耗钻石
		// GGlobal.control.register(pFlag, Enum_MsgType.ARMY_INFO_UPDATE, t.onSendMsg, t);//公会捐献
		// GGlobal.control.register(pFlag, UIConst.PERSONAL_BOSS, t.onSendMsg, t);//个人boss
		// GGlobal.control.register(pFlag, UIConst.QM_BOSS, t.onSendMsg, t);//全民boss
		// GGlobal.control.register(pFlag, UIConst.ARENA, t.onSendMsg, t);//竞技场
		// GGlobal.control.register(pFlag, UIConst.GOODS_ESCORT, t.onSendMsg, t);//物资押运
		// GGlobal.control.register(pFlag, Enum_MsgType.FUBEN_CAILIAO_OPENUI, t.onSendMsg, t);//材料副本
		// GGlobal.control.register(pFlag, Model_CrossSJMiJing.msg_datas_sjmj, t.onSendMsg, t);//机械工厂

		EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabCtrlChangeHandler, t);
		EventUtil.register(pFlag, t.btnUpgrade, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnGetAll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnBuyLv, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		//更新红点
		if (t._curActVo) {
			ReddotMgr.registerEvent(pFlag, t._curActVo.groupId + "_1", t.tab0.noticeImg)
			ReddotMgr.registerEvent(pFlag, t._curActVo.groupId + "_2", t.tab1.noticeImg)
			ReddotMgr.registerEvent(pFlag, t._curActVo.groupId + "_3", t.tab2.noticeImg)
			ReddotMgr.registerEvent(pFlag, t._curActVo.groupId + "_1", t.btnGetAll.noticeImg)
		}
	}
	//======================================== handler =========================================

	private onSendMsg() {
		let t = this;
		let m = GGlobal.modelWarOrder
		m.CG12253(t._curActVo.groupId);
		m.CG12257(t._curActVo.groupId);
	}

	// private onReddotUp() {
	//     let t_value1 = false//GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL, 1);
	//     this.btnGetAll.noticeImg.visible = t_value1;
	//     this.tab0.noticeImg.visible = t_value1;

	//     let t_value2 = false//GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL, 2);
	//     this.tab1.noticeImg.visible = t_value2;
	// }

	private onRewardUpdate() {
		this.refreshDataList(0);
		this.refreshLevelInfo();
		if (!this._initCmd) {
			this.onTabCtrlChangeHandler(null);
			this._initCmd = true;
		}
	}

	private onTaskUpdate() {
		this.refreshDataList(this.tabCtrl.selectedIndex);
		this.refreshLevelInfo()
	}

	private refreshUI() {
		this.refreshDataList(this.tabCtrl.selectedIndex);
		this.refreshLevelInfo()
	}

	private onTabCtrlChangeHandler(e: fairygui.StateChangeEvent) {
		let t = this;
		let m = GGlobal.modelWarOrder
		let t_tabIndex = t.tabCtrl.selectedIndex;
		if (t_tabIndex < 0)
			return;
		let t_listCom = t._listMap[t_tabIndex];
		if (t_tabIndex == 0) {
			t.refreshDataList(0)
		}
		else if (t_tabIndex == 1) {
			t.refreshDataList(1)
		} else if (t_tabIndex == 2) {
			t.refreshDataList(2)
		}

		ReddotMgr.ins().unregister(t.btnGetAll.noticeImg)
		ReddotMgr.ins().register(t._curActVo.groupId + "_" + (t_tabIndex + 1), t.btnGetAll.noticeImg)
	}

	private onBtnClick(e: egret.TouchEvent) {
		switch (e.currentTarget) {
			case this.btnUpgrade:
				GGlobal.layerMgr.open(UIConst.WAR_ORDER_UPGRADE1, this._curActVo);
				break;
			case this.btnGetAll:
				if (this.tabCtrl.selectedIndex == 0) {
					GGlobal.modelWarOrder.CG12251(0, 0, 1, this._curActVo.groupId);
				} else if (this.tabCtrl.selectedIndex == 1) {//每日
					GGlobal.modelWarOrder.CG12259(0, 0, 1, this._curActVo.groupId);
				} else {
					GGlobal.modelWarOrder.CG12255(0, 0, 1, this._curActVo.groupId);
				}
				break;
			case this.btnBuyLv:
				GGlobal.layerMgr.open(UIConst.WAR_ORDER_BUYCT1, this._curActVo);
				break;
		}
	}
}