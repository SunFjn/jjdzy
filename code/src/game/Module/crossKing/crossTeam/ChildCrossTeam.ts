class ChildCrossTeam extends fairygui.GComponent implements IPanel {

	public list0: fairygui.GList;
	public pageRight: fairygui.GButton;
	public pageLeft: fairygui.GButton;
	public nameIcon: fairygui.GLoader;
	public roomBt: fairygui.GButton;
	public joinBt: fairygui.GButton;
	public check0: fairygui.GButton;
	public list1: fairygui.GList;
	public promptBt: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;
	public teamDataGroup: fairygui.GGroup;
	public roleItem0: TeamRoleItem;
	public roleItem1: TeamRoleItem;
	public roleItem2: TeamRoleItem;
	public check00: fairygui.GButton;
	public check01: fairygui.GButton;
	public check02: fairygui.GButton;
	public battleBt: fairygui.GButton;
	public teamRoleGroup: fairygui.GGroup;
	public roleItemArr: Array<TeamRoleItem> = [];
	public chatBt: Button2;
	public backImg: fairygui.GLoader;

	public static URL: string = "ui://yqpfulefoiih30";

	public static createInstance(): ChildCrossTeam {
		return <ChildCrossTeam><any>(fairygui.UIPackage.createObject("crossKing", "ChildCrossTeam"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.list0.callbackThisObj = s;
		s.list0.itemRenderer = s.fubenRenderFun;
		s.check0.selected = true;
		s.list1.callbackThisObj = s;
		s.list1.itemRenderer = s.teamRenderFun;
		s.roleItemArr = [s.roleItem0, s.roleItem1, s.roleItem2];

		GGlobal.modelCrossTeam.CG_TEAM_USE_SHOUYI(0);
		CommonManager.listPageChange("ChildCrossTeam", s.list0, s.pageLeft, s.pageRight, 3, Handler.create(s, s.setPageNotice));
	}

	public initView() {

	}

	private chatHandler() {
		let date: Date = new Date(Model_GlobalMsg.getServerTime());
		let key = UIConst.CROSS_TEAM + "_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
		egret.localStorage.setItem(key, "crossTeam_Chat_Notice");
		this.chatBt.checkNotice = false;
		if (Model_GlobalMsg.kaifuDay > 7) {
			GGlobal.layerMgr.open(UIConst.CHAT);
		} else {
			GGlobal.layerMgr.open(UIConst.CHAT, 1);
		}
	}

	private setPageNotice(_curpage): void {
	}

	private checkHandler(event: fairygui.StateChangeEvent) {
		let s = this;
		let check: fairygui.GButton = event.target;
		switch (check.id) {
			case s.check0.id:
				if (s.check0.selected) {
					s.checkTime0 = 11;
					if (!Timer.instance.has(s.checkTimeHandler0, s)) {
						Timer.instance.listen(s.checkTimeHandler0, s, 1000);
					}
				} else {
					if (Timer.instance.has(s.checkTimeHandler0, s)) {
						Timer.instance.remove(s.checkTimeHandler0, s);
					}
				}
				break;
			case s.check00.id:
				if (s.check00.selected && Model_CrossTeam.myTeamArr.length >= 3) {
					s.checkTime00 = 6;
					if (!Timer.instance.has(s.checkTimeHandler00, s)) {
						Timer.instance.listen(s.checkTimeHandler00, s, 1000);
					}
				} else {
					if (Timer.instance.has(s.checkTimeHandler00, s)) {
						Timer.instance.remove(s.checkTimeHandler00, s);
					}
				}
				break;
			case s.check01.id:
				if (s.check01.selected) {
					s.checkTime01 = 51;
					if (!Timer.instance.has(s.checkTimeHandler01, s)) {
						Timer.instance.listen(s.checkTimeHandler01, s, 1000);
					}
				} else {
					if (Timer.instance.has(s.checkTimeHandler01, s)) {
						Timer.instance.remove(s.checkTimeHandler01, s);
					}
				}
				break;
			case s.check02.id:
				if (s.check02.selected) {
					GGlobal.modelCrossTeam.CG_TEAM_USE_SHOUYI(0);
				} else {
					GGlobal.modelCrossTeam.CG_TEAM_USE_SHOUYI(1);
				}
				break;
		}
	}

	private checkTime01 = 51;
	private checkTimeHandler01() {
		let s = this;
		s.checkTime01--;
		s.check01.text = s.checkTime01 + "秒后开始挑战";
		if (s.checkTime01 <= 0) {
			GGlobal.modelCrossTeam.CG_TEAM_START_BATTLE();
			Timer.instance.remove(s.checkTimeHandler00, s);
			Timer.instance.remove(s.checkTimeHandler01, s);
		}
	}

	private robotTime: number = -1;
	private sendJoinRobot() {
		if (GGlobal.sceneType == SceneCtrl.GUANQIA) {
			this.robotTime++;
			if (this.robotTime % 5 == 0 && this.robotTime != 0) {
				GGlobal.modelCrossTeam.CG_TEAM_JOINROBOT();
			}
		}
	}

	private checkTime00 = 6;
	private checkTimeHandler00() {
		let s = this;
		s.checkTime00--;
		s.check00.text = "满员自动开始(" + s.checkTime00 + "s)";
		if (s.checkTime00 <= 0) {
			GGlobal.modelCrossTeam.CG_TEAM_START_BATTLE();
			Timer.instance.remove(s.checkTimeHandler00, s);
			Timer.instance.remove(s.checkTimeHandler01, s);
		}
	}

	private checkTime0 = 11;
	private checkTimeHandler0() {
		let s = this;
		s.checkTime0--;
		s.check0.text = s.checkTime0 + "秒后自动加入";
		if (s.checkTime0 <= 0 && Model_CrossTeam.teamId <= 0) {
			Timer.instance.remove(s.checkTimeHandler0, s);
			GGlobal.modelCrossTeam.CG_TEAM_JOINORCREATE(2, s.curSelFB.vo.id);
		}
	}

	private battleHandler() {
		let s = this;
		Timer.instance.remove(s.checkTimeHandler00, s);
		Timer.instance.remove(s.checkTimeHandler01, s);
		Timer.instance.remove(s.sendJoinRobot, s);
		GGlobal.modelCrossTeam.CG_TEAM_START_BATTLE();
	}

	private isFirst: boolean = true;
	public isInit: boolean = false;
	public openPanel() {
		let s = this;
		s.registerEvent(true);
		s.isInit = true;
		if (Model_CrossTeam.surNum <= 0) {
			s.check0.selected = false;
		}
		if (Model_CrossTeam.surNum <= 0) {
			s.check02.selected = false;
			GGlobal.modelCrossTeam.CG_TEAM_USE_SHOUYI(1);
		}
		if (Model_CrossTeam.surNum > 0 /**&& Model_CrossTeam.isZero*/) {
			s.check02.selected = true;
			GGlobal.modelCrossTeam.CG_TEAM_USE_SHOUYI(0);
			Model_CrossTeam.isZero = false;
		}
		s.checkTime0 = 11;
		s.checkTime01 = 51;
		s.checkTime00 = 6;
		s.check00.text = "满员自动开始";
		IconUtil.setImg(s.backImg, Enum_Path.BACK_URL + "crossTeam.png");
		if (Model_CrossTeam.teamId <= 0) {
			let value = Math.floor(Model_player.voMine.zsID / 1000);
			Model_CrossTeam.fubenID = value;
			if (s.isFirst) {
				s.isFirst = false;
				GGlobal.modelCrossTeam.CG_TEAM_LOGINCROSSSEVER(value, 0);
			} else {
				GGlobal.modelCrossTeam.CG_LOOK_TEAM_DATA(value);
			}
		}
		s.updateFubenData();

		let date: Date = new Date(Model_GlobalMsg.getServerTime());
		let key = UIConst.CROSS_TEAM + "_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
		let value = egret.localStorage.getItem(key);
		s.chatBt.checkNotice = !value;
	}

	private enterScene() {
		let s = this;
		s.checkTime01 = 51;
		s.checkTime00 = 6;
		s.checkTime0 = 11;
	}

	public closePanel() {
		let s = this;
		s.registerEvent(false);
		s.isFirst = true;
		if (s.curSelFB) s.curSelFB.selected = false;
		s.curSelFB = null;
		s.list0.numItems = 0;
		Timer.instance.remove(s.checkTimeHandler0, s);
		Timer.instance.remove(s.checkTimeHandler00, s);
		Timer.instance.remove(s.checkTimeHandler01, s);
		Timer.instance.remove(s.sendJoinRobot, s);
		s.isInit = false;
		IconUtil.setImg(s.backImg, null);
		if (GGlobal.sceneType != SceneCtrl.CROSS_TEAM && GGlobal.sceneType != SceneCtrl.CROSS_SJMJ) {
			ChildCrossTeam.hide();
		}
	}

	public static hide() {
		Model_CrossTeam.teamId = 0;
		Model_CrossTeam.myTeamArr.length = 0;
		Model_CrossTeam.teamArr.length = 0;
		GGlobal.modelCrossTeam.CG_TEAM_LEAVETEAM();
		WorldSocketMgr.instance.close();
	}

	/**快速加入 */
	private joinHandler() {
		let s = this;
		if (Timer.instance.has(s.checkTimeHandler0, s)) {
			Timer.instance.remove(s.checkTimeHandler0, s);
		}
		GGlobal.modelCrossTeam.CG_TEAM_JOINORCREATE(2, s.curSelFB.vo.id);
	}

	/**创建房间 */
	private roomHandler() {
		let s = this;
		if (Timer.instance.has(s.checkTimeHandler0, s)) {
			Timer.instance.remove(s.checkTimeHandler0, s);
		}
		GGlobal.modelCrossTeam.CG_TEAM_JOINORCREATE(1, s.curSelFB.vo.id);
	}

	private teamRenderFun(index: number, obj: TeamDataItem) {
		let arr = Model_CrossTeam.teamArr[index];
		obj.setVo(arr[0], arr[1], arr[2], arr[3], arr[4]);
	}

	private curSelFB: TeamFuBenItem;
	private listHandle(event: fairygui.ItemEvent) {
		let item: TeamFuBenItem = event.itemObject as TeamFuBenItem;
		if (item.vo.id == Model_CrossTeam.fubenID) return;
		if (Math.floor(Model_player.voMine.zsID / 1000) < item.vo.id) {
			this.curSelFB.selected = true;
			item.selected = false;
			ViewCommonWarn.text("副本尚未开启");
			return;
		} else if (Model_CrossTeam.teamId > 0) {
			this.curSelFB.selected = true;
			item.selected = false;
			ViewCommonWarn.text("退出组队才能更换副本");
			return;
		}
		item.selected = true;
		this.curSelFB = item;
		Model_CrossTeam.fubenID = item.vo.id;
		GGlobal.modelCrossTeam.CG_LOOK_TEAM_DATA(item.vo.id);
	}

	private pageHandle(event: egret.TouchEvent) {

	}

	private fubenRenderFun(index: number, obj: TeamFuBenItem) {
		let s = this;
		let cfg: Izdfb_255 = Model_CrossTeam.fuBenData[index];
		obj.setVo(cfg);
		if (cfg.id == Model_CrossTeam.fubenID) {
			if (s.curSelFB) s.curSelFB.selected = false;
			obj.selected = true;
			s.curSelFB = obj;
		}
	}

	public updateFubenData() {
		let s = this;
		s.list0.numItems = Model_CrossTeam.fuBenData.length;
		s.list0.scrollToView(Model_CrossTeam.fubenID - 1, false)
		s.updateCurFuBen();
	}

	private updateCurFuBen() {
		let s = this;
		if (GGlobal.sceneType == SceneCtrl.CROSS_TEAM) return;
		if (!s.curSelFB) return;
		let vo: Izdfb_255 = s.curSelFB.vo;
		s.nameIcon.url = CommonManager.getUrl("crossKing", "fuben" + vo.id);
		s.teamRoleGroup.visible = true;
		s.teamDataGroup.visible = true;
		if (Model_CrossTeam.teamId > 0) {
			s.teamDataGroup.visible = false;
			Model_CrossTeam.isLeader = 0;
			s.checkTime0 = 11;
			for (let i = 0; i < s.roleItemArr.length; i++) {
				let roleItem = s.roleItemArr[i];
				if (i < Model_CrossTeam.myTeamArr.length) {
					if (i == 0 && Model_CrossTeam.myTeamArr[i][2] == Model_player.voMine.id) {
						Model_CrossTeam.isLeader = 1;
					}
					roleItem.visible = true;
					roleItem.setVo(Model_CrossTeam.myTeamArr[i]);
				} else {
					roleItem.visible = false;
				}
			}
			s.battleBt.visible = Model_CrossTeam.isLeader == 1;
			s.check00.visible = s.check01.visible = Model_CrossTeam.isLeader == 1;
			if (Model_CrossTeam.isLeader == 1) {
				s.check02.setXY(256, 878);
			} else {
				s.check02.setXY(203, 855);
			}
			if (s.check00.selected && Model_CrossTeam.myTeamArr.length >= 3) {
				if (!Timer.instance.has(s.checkTimeHandler00, s)) {
					Timer.instance.listen(s.checkTimeHandler00, s, 1000);
				}
			} else {
				s.checkTime00 = 6;
				if (Timer.instance.has(s.checkTimeHandler00, s)) {
					Timer.instance.remove(s.checkTimeHandler00, s);
				}
			}

			if (s.check01.selected) {
				if (!Timer.instance.has(s.checkTimeHandler01, s)) {
					Timer.instance.listen(s.checkTimeHandler01, s, 1000);
				}
			} else {
				if (Timer.instance.has(s.checkTimeHandler01, s)) {
					Timer.instance.remove(s.checkTimeHandler01, s);
				}
			}

			if (Model_CrossTeam.myTeamArr.length < 3) {
				s.robotTime = -1;
				if (!Timer.instance.has(s.sendJoinRobot, s)) {
					Timer.instance.listen(s.sendJoinRobot, s, 1000);
				}
			} else {
				if (Timer.instance.has(s.sendJoinRobot, s)) {
					Timer.instance.remove(s.sendJoinRobot, s);
				}
			}
			s.check02.text = "使用收益次数" + Model_CrossTeam.surNum + "/" + Config.xtcs_004[4001].num;
		} else {
			s.teamRoleGroup.visible = false;
			if (Model_CrossTeam.teamArr.length > 0) {
				s.list1.numItems = Model_CrossTeam.teamArr.length;
				s.list1.visible = true;
				s.promptBt.visible = false;
			} else {
				s.promptBt.visible = true;
				s.list1.visible = false;
			}
			if (s.check0.selected) {
				if (!Timer.instance.has(s.checkTimeHandler0, s)) {
					Timer.instance.listen(s.checkTimeHandler0, s, 1000);
				}
			} else {
				if (Timer.instance.has(s.checkTimeHandler0, s)) {
					Timer.instance.remove(s.checkTimeHandler0, s);
				}
			}
			s.numLb.text = "剩余收益次数" + Model_CrossTeam.surNum + "/" + Config.xtcs_004[4001].num;
			if (Timer.instance.has(s.sendJoinRobot, s)) {
				Timer.instance.remove(s.sendJoinRobot, s);
			}
		}
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		EventUtil.register(pFlag, self.list0, fairygui.ItemEvent.CLICK, self.listHandle, self);
		EventUtil.register(pFlag, self.pageLeft, egret.TouchEvent.TOUCH_TAP, self.pageHandle, self);
		EventUtil.register(pFlag, self.pageRight, egret.TouchEvent.TOUCH_TAP, self.pageHandle, self);
		EventUtil.register(pFlag, self.roomBt, egret.TouchEvent.TOUCH_TAP, self.roomHandler, self);
		EventUtil.register(pFlag, self.joinBt, egret.TouchEvent.TOUCH_TAP, self.joinHandler, self);
		EventUtil.register(pFlag, self.battleBt, egret.TouchEvent.TOUCH_TAP, self.battleHandler, self);
		EventUtil.register(pFlag, self.chatBt, egret.TouchEvent.TOUCH_TAP, self.chatHandler, self);
		EventUtil.register(pFlag, self.check0, fairygui.StateChangeEvent.CHANGED, self.checkHandler, self);
		EventUtil.register(pFlag, self.check00, fairygui.StateChangeEvent.CHANGED, self.checkHandler, self);
		EventUtil.register(pFlag, self.check01, fairygui.StateChangeEvent.CHANGED, self.checkHandler, self);
		EventUtil.register(pFlag, self.check02, fairygui.StateChangeEvent.CHANGED, self.checkHandler, self);
		GGlobal.control.register(pFlag, Enum_MsgType.CROSS_TEAM_UPDATE, self.updateFubenData, self);
		GGlobal.control.register(pFlag, Enum_MsgType.CROSS_TEAM_ENTER_SCENE, self.enterScene, self);
	}
}