class ChatLabelItem extends fairygui.GLabel {

	public static URL: string = "ui://fx4pr5qetv5m2s";
	public static createInstance(): ChatItem {
		return <ChatItem><any>(fairygui.UIPackage.createObject("chat", "ChatLabelItem"));
	}
	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		self._titleObject.addEventListener(egret.TextEvent.LINK, self.linkHandler, self)
	}

	private linkHandler(event: egret.TextEvent) {
		let s = this;
		event.stopPropagation();
		event.stopImmediatePropagation();
		var arr;
		switch (event.text) {
			case "my"://cross team
				if (!ModuleManager.isOpen(UIConst.CROSS_TEAM, true)) return;
				if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelFengHuoLY.inActivity || GGlobal.layerMgr.isOpenView(UIConst.QXZL)) {
					ViewCommonWarn.text("副本中不可加入");
					return;
				}
				if (this.isAtTeam()) {
					return;
				}
				arr = this.vo.paramCall.split("_");
				let cfg = Config.zdfb_255[parseInt(arr[1])];
				let nowTime: number = egret.getTimer();
				if (Model_player.voMine.zsID < cfg.zs) {
					ViewCommonWarn.text("该副本" + Math.floor(cfg.zs / 1000) + "转开启");
					return;
				}
				if (!TimeUitl.cool("linkHandler_my", 1000)) {
					ViewCommonWarn.text("操作太频繁");
					return;
				}
				GGlobal.modelCrossTeam.CG_TEAM_LOGINCROSSSEVER(parseInt(arr[1]), parseInt(arr[2]));
				break;

			case "sjmj":
				if (!ModuleManager.isOpen(UIConst.SJMJ1, true)) return;
				if (!HeroStateManager.isCanDO(UIConst.SJMJ1)) return;
				if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelFengHuoLY.inActivity) {
					ViewCommonWarn.text("副本中不可加入");
					return;
				}
				if (this.isAtTeam()) {
					return;
				}
				GGlobal.layerMgr.backPanelId = UIConst.CHAT;
				arr = this.vo.paramCall.split("_");
				GGlobal.modelSJMJ.linkToOpen(Config.sjmjfb_258[arr[1]].id, arr[2]);
				break;
			case "lcqs":
				if (!ModuleManager.isOpen(UIConst.CHILD_LCQS, true)) return;
				if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelFengHuoLY.inActivity) {
					ViewCommonWarn.text("副本中不可加入");
					return;
				}
				if (this.isAtTeam()) {
					return;
				}
				GGlobal.layerMgr.backPanelId = UIConst.CHAT;
				arr = this.vo.paramCall.split("_");
				GGlobal.model_LiuChuQS.linkToOpen(arr[1], arr[2]);
				break;
			case "syzlb":
				if (!ModuleManager.isOpen(UIConst.SYZLB, true)) return;
				if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelFengHuoLY.inActivity) {
					ViewCommonWarn.text("副本中不可加入");
					return;
				}
				if (this.isAtTeam()) {
					return;
				}
				GGlobal.layerMgr.backPanelId = UIConst.CHAT;
				arr = this.vo.paramCall.split("_");
				GGlobal.model_Syzlb.linkToOpen(arr[2]);
				break;
			case "guanqia":
				arr = this.vo.paramCall.split("_");
				let pid = arr[0];
				let gid = arr[1];
				if (GGlobal.sceneType != SceneCtrl.GUANQIA) {
					ViewCommonWarn.text("副本中不可加入");
					return;
				}
				if (Model_player.isMineID(pid)) {
					ViewCommonWarn.text("不可加入自己的求助邀请");
					return;
				}
				if (GGlobal.modelGuanQia.curGuanQiaLv <= Number(gid)) {
					ViewCommonWarn.text("请先通关" + gid + "关");
					return;
				}
				if (!HeroStateManager.isCanDO(UIConst.GUANQIABOSSUI)) return;
				GGlobal.modelGuanQiaHelp.CG_5905_READY(pid, gid);
				break;
			case "wakuang":
				if (!ModuleManager.isOpen(UIConst.CROSS_MINERAL, true)) return;
				if (!HeroStateManager.isCanDO(UIConst.CROSS_MINERAL)) return;
				if (Model_player.voMine.id == Number(this.vo.paramCall)) {
					ViewCommonWarn.text("不能加入自己的矿");
					return;
				} else if (Model_CrossMineral.otherMineVo && Number(this.vo.paramCall) == Model_CrossMineral.otherMineVo.mineID) {
					ViewCommonWarn.text("不可重复协助同一座矿藏")
					return;
				} else if (Model_CrossMineral.otherMineVo) {
					ViewCommonWarn.text("同时只可协助一座矿藏");
					return;
				}
				if (!TimeUitl.cool("linkHandler_wakuang", 1000)) {
					ViewCommonWarn.text("操作太频繁");
					return;
				}
				GGlobal.modelCrossMineral.CG_JOIN_MINE(Number(this.vo.paramCall));
				break;
			case "tyjy":
				if (!ModuleManager.isOpen(UIConst.TAOYUANJIEYI, true)) return;
				if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelFengHuoLY.inActivity) {
					ViewCommonWarn.text("副本中不可加入");
					return;
				}
				if (this.isAtTeam()) {
					return;
				}
				GGlobal.layerMgr.backPanelId = UIConst.CHAT;
				GGlobal.layerMgr.open(UIConst.TAOYUANJIEYI);
				break;
			case "kfwz":
				{
					//名字_转生区间_队伍id
					if (this.isAtTeam())
						return;
					let t_list = this.vo.paramCall.split("_");
					let t_teamId = ~~t_list[2];
					GGlobal.layerMgr.backPanelId = UIConst.CHAT;
					GGlobal.modelKfwz.cmdSendJoinTeam(t_teamId);
				}
				break;
			case "lhfb":
				{
					if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelFengHuoLY.inActivity) {
						ViewCommonWarn.text("副本中不可加入");
						return;
					}
					if (!HeroStateManager.isCanDO(UIConst.LHFB))
						return;
					//名字_副本id_队伍id
					if (this.isAtTeam())
						return;
					let t_list = this.vo.paramCall.split("_");
					let t_teamId = ~~t_list[2];
					GGlobal.layerMgr.backPanelId = UIConst.CHAT;
					GGlobal.modelLhfb.cmdSendJoinTeam(t_teamId);
				}
				break;
			case "tjhb":
				if (!ModuleManager.isOpen(UIConst.ACTCOM_TJHB, true)) return;
				if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelFengHuoLY.inActivity) {
					ViewCommonWarn.text("副本中不可加入");
					return;
				}
				if (this.isAtTeam()) {
					return;
				}
				GGlobal.layerMgr.backPanelId = UIConst.CHAT;
				let activityVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_TJHB);
				if (activityVo) {
					let sysID = activityVo.groupId;
					GGlobal.layerMgr.open(sysID, UIConst.ACTCOM_TJHB);
				} else {
					ViewCommonWarn.text("活动已结束");
				}
				break;
			case "yanhui":
				if (!ModuleManager.isOpen(UIConst.YANHUI, true)) return;
				if (YanHuiManager.getInstance().isEnterYanHui) {
					return ViewCommonWarn.text("已在宴会中");
				}
				if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelFengHuoLY.inActivity) {
					ViewCommonWarn.text("副本中不可加入");
					return;
				}
				if (this.isAtTeam()) {
					return;
				}
				GGlobal.layerMgr.backPanelId = UIConst.CHAT;
				GGlobal.layerMgr.open(UIConst.YANHUI);
				break;
			case "hongbao":
				if (!ModuleManager.isOpen(UIConst.HONGBAO, true)) return;
				if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelFengHuoLY.inActivity) {
					ViewCommonWarn.text("副本中不可加入");
					return;
				}
				if (this.isAtTeam()) {
					return;
				}
				GGlobal.layerMgr.backPanelId = UIConst.CHAT;
				GGlobal.layerMgr.open(UIConst.HONGBAO);
				break;
		}
	}
	//是否在队伍中
	private isAtTeam(): boolean {
		if (GGlobal.modelKfwz.isInTeam) {
			ViewCommonWarn.text("请先退出跨服王者组队");
			return true;
		}
		if (GGlobal.modelLhfb.isInTeam) {
			ViewCommonWarn.text("请先退出轮回副本组队");
			return true;
		}
		if (Model_CrossTeam.teamId > 0) {
			ViewCommonWarn.text("请先退出跨服组队");
			return true;
		}
		if (GGlobal.model_LiuChuQS.teamMyArr.length > 0) {
			ViewCommonWarn.text("请先退出组队");
			return true;
		}
		if (GGlobal.model_Syzlb.teamMyArr.length > 0) {
			ViewCommonWarn.text("请先退出三英战吕布组队");
			return true;
		}
		if (GGlobal.layerMgr.isOpenView(UIConst.SJMJ2)) {
			ViewCommonWarn.text("请先退出升阶秘境");
			return true;
		}
		return false;
	}

	private vo: Vo_Chat;
	//GC广播聊天频道内容 
	public show(vo: Vo_Chat) {
		let s = this;
		s.vo = vo;
		s.title = "" + vo.content;
	}
}