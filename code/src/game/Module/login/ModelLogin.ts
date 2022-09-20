class ModelLogin extends BaseModel {
	public constructor() {
		super();
	}

	public static LOGIN_CREATE_START = 1;//创角 开始创角阶段
	public static LOGIN_CREATE_END = 2;//创角 结束创角阶段
	public static LOGIN_LOADMAINUI = 3;//创角 加载公共资源
	public static LOGIN_LOADCFG = 4;//创角 加载配置
	public static LOGIN_PRELOAD = 5;//创角 预加载主角
	public static LOGIN_ANI = 6;//创角 过场动画·
	public static LOGIN_ENTER = 7;//创角 正式进入第一关关卡
	public static ENTER_GQ_1 = 8;//进入关卡1 BOSS战斗
	public static EXITE_GQ_1 = 9;//进入关卡1 BOSS战斗
	public static ENTER_GQ_2 = 10;//进入关卡2 BOSS战斗
	public static EXITE_GQ_2 = 11;//进入关卡2 BOSS战斗
	public static ENTER_GQ_3 = 12;//进入关卡3 BOSS战斗
	public static EXITE_GQ_3 = 13;//进入关卡3 BOSS战斗

	public static MSG_SOUND: string = "msg_s";

	/**是否开启声音*/
	public enableSound: boolean = true;
	public handList = [];//此处用于存贮后端强行在未进入游戏就一定要发的事件处理
	public cmdHDList = [];//登录请求数据
	public loginSendcmd(): void {
		let adder = this.addCmdHD;
		if (ModuleManager.isOpen(UIConst.DUANZAO_STRENG)) {
			adder(GGlobal.modelDuanZao.CG_GET_EQUIPMESSAGE, GGlobal.modelDuanZao);//锻造登陆请求
		}
		if (ModuleManager.isOpen(UIConst.BAOWU)) {
			adder(GGlobal.modelbw.CG_OPEN_BAOWU, GGlobal.modelbw);//宝物基础信息请求
			adder(function () {
				GGlobal.modelBySys.CGGetinfobysys(Model_BySys.BAO_WU)
			}, GGlobal.modelBySys);
			adder(function () {
				GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_BAOWU);//羁绊
			}, GGlobal.modelBySys);
		}
		if (ModuleManager.isOpen(UIConst.TIANSHU)) {
			adder(GGlobal.modeltianshu.CG_OPENUI_971, GGlobal.modeltianshu);//天书基础信息请求
			adder(function () {
				GGlobal.modelBySys.CGGetinfobysys(Model_BySys.TIAN_SHU)
			}, GGlobal.modelBySys);
			adder(function () {
				GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_TIANSHU);//羁绊
			}, GGlobal.modelBySys);
		}
		if (ModuleManager.isOpen(UIConst.TITLE)) adder(GGlobal.modeltitle.CG_INFO_501, GGlobal.modeltitle);
		if (ModuleManager.isOpen(UIConst.GUANXIAN)) adder(GGlobal.modelguanxian.csGuanxian, GGlobal.modelguanxian);
		if (ModuleManager.isOpen(UIConst.BINGFA)) {
			adder(GGlobal.modelBingFa.CG_INFO_901, GGlobal.modelBingFa);
			adder(function () {
				GGlobal.modelBySys.CGGetinfobysys(Model_BySys.BING_FA)
			}, GGlobal.modelBySys);
		}
		if (ModuleManager.isOpen(UIConst.VIP)) adder(GGlobal.modelvip.CG_OPENUI_2061, GGlobal.modelvip);
		if (ModuleManager.isOpen(UIConst.TEQUAN)) adder(GGlobal.modelvip.CG_TQ_2171, GGlobal.modelvip);
		if (ModuleManager.isOpen(UIConst.BOSS)) adder(GGlobal.modelBoss.CG_DATA_1251, GGlobal.modelBoss);
		if (ModuleManager.isOpen(UIConst.SHEN_JIAN)) {
			adder(GGlobal.modelsj.CG_OPEN_SHENJIAN, GGlobal.modelsj);
			adder(function () {
				GGlobal.modelBySys.CGGetinfobysys(Model_BySys.SHEN_JIAN)
			}, GGlobal.modelBySys);
			adder(function () {
				GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_SHENJIAN);//羁绊
			}, GGlobal.modelBySys);
		}
		if (ModuleManager.isOpen(UIConst.YIBAO)) {
			adder(GGlobal.modelYiBao.CG_OPEN_YIBAO, GGlobal.modelYiBao);
			adder(function () {
				GGlobal.modelBySys.CGGetinfobysys(Model_BySys.YI_BAO);
			}, GGlobal.modelBySys);
			adder(function () {
				GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_YIBAO);//羁绊
			}, GGlobal.modelBySys);
		}
		if (ModuleManager.isOpen(UIConst.GOD_EQUIP)) {
			adder(function () {
				GGlobal.modelEquip.CGGetEquips(2);//神装
			}, GGlobal.modelEquip);
			adder(GGlobal.modelGodEquip.CGGetJieOrange, GGlobal.modelGodEquip);
		}
		if (ModuleManager.isOpen(UIConst.ZHAN_JIA)) adder(GGlobal.modelZhanJia.CGGetZhanJiaUi, GGlobal.modelZhanJia);//战甲
		if (ModuleManager.isOpen(UIConst.WU_JIANG)) {
			adder(GGlobal.modelWuJiang.CGGetWuJiang, GGlobal.modelWuJiang);//武将
			adder(function () {
				GGlobal.modelEquip.CGGetEquips(3);//将印
			}, GGlobal.modelEquip);
			adder(function () {
				GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_WUJIANG);//羁绊
			}, GGlobal.modelBySys);
			adder(GGlobal.modelWuJiang.CG3509, GGlobal.modelWuJiang);//时装
		}
		if (ModuleManager.isOpen(UIConst.REBIRTH)) {
			adder(GGlobal.modelPeacock.CG_OPENUI, GGlobal.modelPeacock);//转生需要孔雀台层数
			adder(GGlobal.modelEquip.lHDaShiLv, GGlobal.modelEquip);//转生大师红点
		}
		if (ModuleManager.isOpen(UIConst.RUNMAN)) {
			adder(GGlobal.modelRunMan.CG_OPENUI, GGlobal.modelRunMan);//过关斩将可以扫荡
		}
		if (ModuleManager.isOpen(UIConst.TUJIAN)) {
			adder(GGlobal.modelTuJian.CG_OPEN_TUJIAN, GGlobal.modelTuJian)
		}
		if (ModuleManager.isOpen(UIConst.SHOULING)) {//兽灵  装备熔炼需要数据
			adder(GGlobal.modelsl.CG_OPEN_SHOULING, GGlobal.modelsl);
		}
		if (ModuleManager.isOpen(UIConst.SH_HUANX)) {
			adder(function () {
				for (let i = 0; i < 4; i++) {
					GGlobal.modelSHJX.CGHXUI_5695(i + 1);
				}
			}, GGlobal.modelSHJX);
		}
		if (ModuleManager.isOpen(UIConst.COUNTRY_SKILL)) {//兽灵  装备熔炼需要数据
			adder(GGlobal.modelCouSkill.CG_OPENUI, GGlobal.modelCouSkill);
		}
		if (ModuleManager.isOpen(UIConst.SHAOZHU)) {
			adder(GGlobal.modelShaoZhu.CG_OPEN_SHAOZHU_5101, GGlobal.modelShaoZhu);
		}
		if (ModuleManager.isOpen(UIConst.ZS_GODWEAPON)) {
			adder(GGlobal.modelGodWeapon.CG_OPENUI_7871, GGlobal.modelGodWeapon);
		}
		if (ModuleManager.isOpen(UIConst.YISHOULU)) {
			adder(GGlobal.modelYiShouLu.CG_OPEN_UI, GGlobal.modelYiShouLu);
		}
		if (ModuleManager.isOpen(UIConst.QICE_STAR)) {
			adder(GGlobal.modelQice.CG_QiCe_openQiCe_9701, GGlobal.modelQice);
		}
		if (ModuleManager.isOpen(UIConst.QICE_LOTTERY)) {
			adder(GGlobal.modelQice.CG_QiCeDraw_openUI_9751, GGlobal.modelQice);
		}
		if (ModuleManager.isOpen(UIConst.GOD_WUJIANG)) {
			adder(GGlobal.modelGodWuJiang.CG_WuJiang_getShenJiang_677, GGlobal.modelGodWuJiang);
		}
		if (ModuleManager.isOpen(UIConst.ZHENYAN)) {//阵眼的等级
			adder(GGlobal.modelZhenYan.CGOPENUI10251, GGlobal.modelZhenYan);
		}

		if (ModuleManager.isOpen(UIConst.JUEXING)) {
			adder(function () {
				for (let i = 1; i <= 8; i++) {
					if (ModuleManager.isOpen(Model_JueXing.panelIDArr[i])) {
						GGlobal.modeljx.CG_OPEN_JUEXING_819(i);
					}
				}
			}, GGlobal.modeljx);

		}
		if (ModuleManager.isOpen(UIConst.ZS_GODWEAPON)) {
			adder(GGlobal.modelGodWeapon.CG_OPENUI_7871, GGlobal.modelGodWeapon);
		}
		if (ModuleManager.isOpen(UIConst.HORSE)) {
			adder(GGlobal.model_Horse.CG_OPENUI_11021, GGlobal.model_Horse);
		}
		if (ModuleManager.isOpen(UIConst.HORSE_HH)) {
			adder(GGlobal.model_Horse.CG_Mount_openMountUnrealUI_11029, GGlobal.model_Horse);
		}
		if (ModuleManager.isOpen(UIConst.HOME_MAID)) {
			adder(GGlobal.model_HomeMaid.CG_OPENUI_11301, GGlobal.model_HomeMaid);
		}
		Timer.instance.listen(this.executeCMD, this, 100);
	}

	public addCmdHD(func: Function, thisObj) {
		let hd: Handler = Handler.create(thisObj, func);
		GGlobal.modelLogin.cmdHDList.push(hd);
	}

	private executeCMD() {
		let arr = this.cmdHDList;
		for (let i = 0; i < 5; i++) {
			if (arr.length) {
				let hd = arr.shift();
				hd.run();
			} else {
				Timer.instance.remove(this.executeCMD, this);
				break;
			}
		}
	}

	public doDelayEvent() {
		while (this.handList.length) {
			let hd: Handler = this.handList.shift();
			hd.run();
		}
	}

	public setSound(v: boolean) {
		if (v != this.enableSound) {
			this.enableSound = v;
			SoundManager.getInstance().setSoundEnable(v);
			this.notify(ModelLogin.MSG_SOUND, v);
		}
	}

	public cg_loginFlag(step) {
		if (!GGlobal.main.isNewRole) return;
		var ba = this.getBytes();
		ba.writeByte(step);
		this.sendSocket(171, ba);
	}

	/** 请求登陆*/
	public cs_loginInfo() {
		var self = this;
		self.requesLogin();
	}

	public requesLogin() {
		var ba = this.getBytes();

		var loginArg = GGlobal.loginArg;
		var info = {
			binVersion: loginArg.binVersion,
			account: loginArg.account,
			zoneid: loginArg.zoneid + "",
			pf: GameConfig.pf + "",
			openkey: loginArg.openkey,
			platform: loginArg.platform,
			os: loginArg.os,
			openid: loginArg.open_id + "",
			app_custom: loginArg.app_custom,
			pfcode: GameConfig.pf
		};
		GGlobal.zone = loginArg.zoneid;

		var str = JSON.stringify(info);
		ba.writeUTF(str);
		this.sendSocket(101, ba);
	}

	/** 请求进入游戏必须信息*/
	public cs_prepareInfo() {
		var ba = this.getBytes();
		this.sendSocket(103, ba);
	}

	/** 请求创建角色*/
	public requestCreateRole(job: number, name: string) {
		var ba = this.getBytes();
		ba.writeByte(job);
		ba.writeUTF(name);
		this.sendSocket(105, ba);
	}

	//CG 创建角色界面加载完毕 
	public CG_CreateEnter_Complete(): void {
		var ba = this.getBytes();
		this.sendSocket(133, ba);
	}

	/*135 I-I 请求充值 B:类型 1：元宝，2：月卡，3：终身卡I:金额 单位分**/
	public CG_Request_ChongZhi(type: number, value: number): void {
		var ba = this.getBytes();
		ba.writeInt(type);
		ba.writeInt(value);
		this.sendSocket(135, ba);
	}

	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;

		mgr.listen(egret.Event.CLOSE, this.onSocketClose, this);

		mgr.regHand(102, this.scLoginInfo, this);
		mgr.regHand(104, this.scHeroInfo, this);
		mgr.regHand(106, this.scCreateRole, this);
		mgr.regHand(140, this.GCOffLine, this);
		// mgr.regHand(136, this.scChongZhiInfo, this);
		// mgr.regHand(138, this.scChongZhiRet, this);
		mgr.regHand(142, this.GCFengHao, this);
		mgr.regHand(148, this.GCSetting, this);
	}

	protected onSocketClose() {
		if (GGlobal.isEnterGame) {
			this.openOffLine();
		} else {
			if (GGlobal.sdk) {
				GGlobal.sdk.offline();
			} else {
				// window.location.reload();
			}
		}
	}

	/**接收 CMD 102协议 */
	public scLoginInfo(self: ModelLogin, data: egret.ByteArray) {
		var ret = data.readByte();
		if (ret == 0) {//不存在角色
			//pop createRole
			// Main.showGame();
			//Main.setLoadingVis(false);
			// GGlobal.main.hideLoading();
			GGlobal.main.isNewRole = true;
			GGlobal.main.setloadVis(false);
			GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_CREATE_START);
			GGlobal.layerMgr.register(UIConst.CREATEROLE, ViewCreateRolePanel);
			GGlobal.layerMgr.register(UIConst.STORE_ANI, ViewNebieLoading);
			GGlobal.layerMgr.open(UIConst.CREATEROLE);
		} else if (ret == 1) {//已经存在角色，直接进入游戏
			GGlobal.control.notify(Enum_MsgType.ROLE_CREATE_COMPLETE);
		} else if (ret == 2) { //非法名字
			ViewCommonWarn.text("id中含有非法名字");
		} else if (ret == 3) {//版本不同步，刷新游戏
			window.location.reload();
		}
	}

	/**接收 CMD 104协议 */
	public scHeroInfo(self: ModelLogin, data: egret.ByteArray) {
		GGlobal.control.notify(Enum_MsgType.ENTER_GAME_READY);
		self.loginSendcmd();
	}

	public static job = 0;
	public static roleName: string = "";
	public static roleID;
	/**接收 CMD 106协议  创建角色返回 B:结果 1创建角色成功，2名字重复,3名字非法B:角色职业L:角色id I:开服天数I:登陆时候返回的当前时间*/
	public scCreateRole(self: ModelLogin, bytes: BaseBytes) {
		var ret = bytes.readByte();
		var job = bytes.readByte();
		let roleId = bytes.readLong();
		ModelLogin.roleID  = roleId;
		ModelLogin.kfDay = bytes.readInt();
		ModelLogin.nowTime = bytes.readInt();
		if (ret == 1) {//UI面板创建角色成功
			GGlobal.layerMgr.close(UIConst.CREATEROLE);
			GGlobal.main.showStoreAni();
			if (GGlobal.sdk) {//数据上报（创建角色）:
				GGlobal.sdk.ReportData({
					action: 'createRole',
					roleId: '' + roleId
				})
			} else if (HLSDK.whalePbSDK) {
				HLSDK.roleupdate(true);
			}
			ModelLogin.job = job;
			GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_CREATE_END);
			GGlobal.control.notify(Enum_MsgType.ROLE_CREATE_COMPLETE);
		} else if (ret == 2) {
			//名字重复
			self.notify("createRoleResult", -2);
		} else if (ret == 3) {
			//非法字符
			self.notify("createRoleResult", -3);
		}
	}

	public static kfDay
	public static nowTime
	public static initTSMsg() {
		//推送消息 初始化
		if (GGlobal.main.isNewRole) {
			ChildTuiSongMsg.initTSMsg(ModelLogin.kfDay, ModelLogin.nowTime);
		}
	}

	public isOffLine: boolean;
	//B:0被挤下线 1服务器关闭
	protected GCOffLine(self: ModelLogin, bytes: egret.ByteArray): void {
		var status = bytes.readByte();
		if (GGlobal.isEnterGame) {
			if (status == 0) {
				self.isOffLine = true;
				// self.openOffLine();
				ViewOffLine1.show("您已断线，请点击重新登录", 1);
			} else {
				if (GGlobal.sdk) {
					ViewOffLine.show("服务器正在维护");
				} else {
					ViewOffLine1.show("服务器正在维护", 1);
				}
			}
		} else {
			if (GGlobal.sdk) {
				GGlobal.sdk.offline();
			} else {
				window.location.reload();
			}
		}
	}

	/**帐号已封 */
	public isFengHao: number;
	public GCFengHao(self: ModelLogin, bytes: egret.ByteArray): void {
		var ret = bytes.readByte();
		self.isFengHao = ret;
	}

	public CGSetting(key: string, value: string) {
		var ba = this.getBytes();
		ba.writeUTF(key);
		ba.writeUTF(value);
		this.sendSocket(147, ba);
	}

	public GCSetting(self: ModelLogin, bytes: egret.ByteArray) {
		var sound = bytes.readByte();
		var skillauto = bytes.bytesAvailable ? bytes.readByte() : 0;//= bytes.readByte();

		self.setSound(sound != 0);
		// GGlobal.modelskill.sceneAuto = (skillauto != 0);
	}

	public offlineTime = 0;//离线时间。
	public openOffLine(): void {
		if (this.isFengHao > 0) {
			// GGlobal.layerMgr.open(UIConst.OFFLINE, 3);
		}
		// else if (!GGlobal.isEnterGame) {//未登录完成
		// 	GGlobal.layerMgr.open(UIConst.OFFLINE, 4);
		// } else if (this.isOffLine) {
		// 	GGlobal.layerMgr.open(UIConst.OFFLINE, 2);
		// } 
		else {
			this.offlineTime = egret.getTimer();
			if (GGlobal.sdk) {
				ViewOffLine.show("您掉线了，请按照以下方式进入游戏");
			} else {
				ViewOffLine1.show("您已断线，请点击重新登录");
			}
		}
	}
	private ctTime = 5;
	public isRelogin: boolean = false;
	/**重新登陆*/
	public async reLogin() {
		var self = this;
		self.ctTime = 5;
		let now = egret.getTimer();
		if (now - this.offlineTime > 180000) {
			self.exiteGame();
			return;
		}
		var connectSt = await self.reConnect();
		if (!connectSt) {
			self.exiteGame();
		} else {
			if (GGlobal.main.isLoginAwait) {
				GGlobal.main.mainResolve();
				GGlobal.main.isLoginAwait = false;
				GGlobal.main.mainResolve = null;
				GGlobal.layerMgr.close2(UIConst.OFFLINE);
			} else {
				self.reEnterGame();
			}
		}
	}
	private async reConnect() {
		var self = this;
		return new Promise(function (resolve) {
			const socketmgr = GGlobal.socketMgr;
			socketmgr.clear();
			if (socketmgr.webSocket.connected) {
				socketmgr.close();
			}
			socketmgr.connectCallBack = function () {
				resolve(1);
			};
			socketmgr.errorCallBack = function () {
				resolve(0);
			}
			socketmgr.connect(GGlobal.loginArg.ip, GGlobal.loginArg.port);
		})
	}
	public exiteGame() {
		if (GGlobal.sdk) {
			GGlobal.sdk.exitApp();
		} else if (HLSDK.whalePbSDK) {
			window.location.reload();
		} else {
			window.location.reload();
		}
	}
	private reEnterGame() {
		const self = this;
		GGlobal.layerMgr.close2(UIConst.OFFLINE);
		GGlobal.control.listenonce(Enum_MsgType.ROLE_CREATE_COMPLETE, self.reLoginCreateComplete, self);
		GGlobal.control.listenonce(Enum_MsgType.ENTER_GAME_READY, self.reLoginEnterGame, self);
		self.cs_loginInfo();
	}

	// /**136 B-U 申请充值返回 B:返回 1：成功，2：充值未开放U:订单信息*/
	// public scChongZhiInfo(self: ModelLogin, data: egret.ByteArray) {
	// 	var result = data.readByte();
	// 	var content = data.readUTF();

	// 	if (result == 1) {
	// 		Main.requestRecharge(content);
	// 	} else {
	// 		ViewCommonWarn.text("系统繁忙");
	// 	}
	// }

	// /**138 B 确认充值 B:1：充值成功，2：充值失败*/
	// public scChongZhiRet(self: ModelLogin, data: egret.ByteArray) {
	// 	var result = data.readByte();
	// 	if (result == 2) {
	// 		ViewCommonWarn.text("充值失败");
	// 	}
	// }

	protected reLoginCreateComplete(): void {
		this.cs_prepareInfo();
		GGlobal.mapscene.enterScene(-1);
		// if (Model_player.voMine) Model_player.voMine.clean();
	}

	protected reLoginEnterGame(): void {
		this.isRelogin = false;
		GGlobal.layerMgr.close2(UIConst.OFFLINE);
		GGlobal.modelScene.returnMainScene();
	}

	protected oldTime: number;
	protected reLoginTime(): void {
		var now = egret.getTimer();
		if (now - this.oldTime >= 15000) {
			this.isRelogin = false;
			Timer.instance.remove(this.reLoginTime, this);
		}
	}
}