class ModelGuanQia extends BaseModel {
	public static readonly msg_gqGetRed = "msg_gqGetRed";
	public static readonly msg_moveTween = "msg_moveTween";
	public static readonly msg_addEffect = "msg_addEffect";
	public constructor() {
		super();
	}
	static MAX_HP = 999999999999;
	public static autoWave: number = 12;
	/**当前关卡 */
	public curGuanQiaLv = 1;
	/**连胜次数 0~n */
	public curWave: number = 0;
	/**自动调整BOSS*/
	public auto: boolean = false;
	/**登陆发送关卡和离线数据 S:关数B:小怪第几波I:铜币I:经验I:装备数量[I:道具idI:道具数量]道具数据I:离线时间*/
	public offlinedata: any[];

	//千人斩数据更新

	public rank_3 = [];
	/**当前击杀的小怪数量*/
	public killCount: number = 0;
	/**已领取击杀奖励编号*/
	public killAwardsIndex: number = 0;
	/**已扫荡次数I*/
	public SDCount: number = 0;
	/**总扫荡*/
	public totalSD: number = 0;

	public myRank: number = 0;
	/** 0:排名 1:hid 2:名字 3:战力 4:关数*/
	public rank = [];

	/**item like [[1,1344,10]] */
	public bossAwardSrc: any[];
	goldBossAward = [];

	/**boss剩余时间 */
	public bossTime: number = 300000;

	/**是否有金甲兵*/
	public hasSurprise = false;

	/**求助次数*/public help = 0;
	/**帮助次数*/public helpCount = 0;
	public helpRed = 1;
	public setBossTime(v: number) {
		this.bossTime = v;
	}

	public setAuto(v: boolean) {
		this.auto = v;
		GGlobal.control.notify(Enum_MsgType.MSG_AUTO_C);
	}

	public isMaxGuanQia() {
		return !Config.BOSS_205[this.curGuanQiaLv + 1];
	}

	//是否在关卡BOSS
	public inGuanQiaBoss() {
		return GGlobal.mapscene.scenetype == SceneCtrl.GUANQIABOSS || GGlobal.mapscene.scenetype == SceneCtrl.GUANQIABOSS_HELP;
	}

	/**获取当前波次可以领取的千人斩奖励的最大次数*/
	public QRZLib: any[];
	public getQRZMax(): number {
		let self = this;
		let temp = [];
		if (!self.QRZLib) {
			self.QRZLib = [];
			let lib = Config.kill_205;
			for (let i in lib) {
				temp.push(lib[i]);
			}
			temp.sort(function (a, b) {
				return a.bh > b.bh ? 1 : -1;
			});
			self.QRZLib = temp;
		}
		let wave = self.curGuanQiaLv;
		let t = self.QRZLib;
		let ret;
		for (let j = 0; j < t.length; j++) {
			if (t[j].tj <= wave) ret = t[j].bh;
		}
		return ret;
	}

	public listenServ(wsm: WebSocketMgr) {
		let s = this;
		s.socket = wsm;
		wsm.regHand(1100, s.GC_LOGININFO_1100, s);
		wsm.regHand(1102, s.SC_WAVE_1102, s);
		wsm.regHand(1104, s.SC_BOSSINFO_1104, s);
		wsm.regHand(1106, s.SC_BOSSREST_1106, s);
		wsm.regHand(1108, s.SC_GETRANK_1108, s);
		wsm.regHand(1110, s.SC_SWEEP_1110, s);
		wsm.regHand(1112, s.GC_ZHANSHA_1112, s);
		wsm.regHand(1114, s.GC_FIGHTBOSS_1114, s);
		wsm.regHand(1116, s.GC_GQGETREWARD_1116, s);
		wsm.regHand(1118, s.GC1118, s);
	}

	//S-B-I-I-I-I-[I-I]-I
	//登陆发送关卡和离线数据 S:关数B:小怪第几波I:铜币I:经验I:装备数量[I:道具idI:道具数量]道具数据I:离线时间
	protected GC_LOGININFO_1100(self: ModelGuanQia, ba: BaseBytes) {
		self.offlinedata = ba.readFmt(["S", "B", "I", "I", "I", "I"]);
		let items = [];
		for (let i = 0, length = ba.readShort(); i < length; i++) {
			items.push([Enum_Attr.ITEM, ba.readInt(), ba.readInt()]);
		}
		self.offlinedata.push(items);
		self.offlinedata.push(ba.readInt());
		self.curGuanQiaLv = self.offlinedata[0];
		self.curWave = self.offlinedata[1];
		if (ba.bytesAvailable > 0) {
			ModelGuanQia.curGQID = ba.readInt();
			for (let i = 0, len = ba.readShort(); i < len; i++) {
				ModelGuanQia.rewardGetDic[ba.readInt()] = 1;
			}
		}
		ModelGuanQia.autoWave = Config.xtcs_004[4422].num;
		if (self.offlinedata[7] >= 60) {//打开离线界面
			GGlobal.layerMgr.open(UIConst.GUANQIAOFFLINEINCOM);
		}
		GGlobal.control.notify(Enum_MsgType.MSG_GQ_UPDATE);
	}

	/** 打完第X波小怪 B:第X波小怪 */
	public CS_WAVE_1101(curwave: number) {
		let ba = this.getBytes();
		ba.writeByte(curwave);
		this.socket.sendCMDBytes(1101, ba);
	}
	/**小怪掉落 [B:类型I:idI:数量]掉落数据B:波数*/
	protected SC_WAVE_1102(self: ModelGuanQia, ba: BaseBytes) {
		for (let i = 0, length = ba.readShort(); i < length; i++) {
			let type = ba.readByte(), id = ba.readInt(), count = ba.readInt();
			if (GGlobal.modelFengHuoLY.inActivity || GGlobal.layerMgr.isOpenView(UIConst.LONGZHONGDUI)||ViewMainTopUI.instance.visible) {
				continue;
			}
			ConfigHelp.addSerGainText(type, id, true, count);
		}
		self.curWave = ba.readByte();
		GGlobal.control.notify(Enum_MsgType.MSG_WAVEUPDATE);
	}

	/**打开挑战boss界面 */
	public CS_BOSSINFO_1103() {
		let ba = this.getBytes();
		this.socket.sendCMDBytes(1103, ba);
	}
	/**前3名排行榜 [L:hidU:名字S:关数]前3名排行榜I:当前击杀小怪数量B:已领取击杀奖励编号I:已扫荡次数I:总扫荡次数*/
	public SC_BOSSINFO_1104(self: ModelGuanQia, ba: BaseBytes) {
		self.rank_3.length = 0;
		for (let i = 0, len = ba.readShort(); i < len; i++) {
			self.rank_3.push([ba.readLong(), ba.readUTF(), ba.readShort()])
		}
		self.killCount = ba.readInt();
		self.killAwardsIndex = ba.readByte();
		self.SDCount = ba.readInt();
		self.totalSD = ba.readInt();
		self.help = ba.readByte();
		self.helpCount = ba.readByte();
		GGlobal.reddot.setCondition(UIConst.GUANQIABOSSUI, 4, false);
		GGlobal.reddot.notify(UIConst.GUANQIABOSSUI);
		GGlobal.control.notify(Enum_MsgType.MSG_GQ_SWEEP);
		GGlobal.control.notify(Enum_MsgType.MSG_BOSSINFO);
		GGlobal.control.notify(Enum_MsgType.MSG_GQ_UPDATE);
		GGlobal.control.notify(Enum_MsgType.MSG_QIANRENZHAN);
	}

	/** 战斗胜利，请求掉落 B:结果 1：胜利，0：失败 */
	public CS_BOSSREST_1105(rest: number) {
		let ba = this.getBytes();
		ba.writeByte(rest);
		this.socket.sendCMDBytes(1105, ba);
	}
	/**1106 
	 * 掉落和最新关卡数据 S:关卡数[B:类型I:idI:数量]掉落数据
	 * */
	protected SC_BOSSREST_1106(self: ModelGuanQia, ba: BaseBytes) {
		let reseult = ba.readShort();
		if (reseult == self.curGuanQiaLv) {
			GGlobal.control.notify(Enum_MsgType.MSG_BOSS_RET, 1);
			return;
		}
		let gq = self.curGuanQiaLv;
		switch (gq) {
			case 1:
				GGlobal.modelLogin.cg_loginFlag(ModelLogin.EXITE_GQ_1);
				break;
			case 2:
				GGlobal.modelLogin.cg_loginFlag(ModelLogin.EXITE_GQ_2);
				break;
			case 3:
				GGlobal.modelLogin.cg_loginFlag(ModelLogin.EXITE_GQ_3);
				break;
		}
		self.curGuanQiaLv = reseult;
		self.curWave = 0;
		self.bossAwardSrc = []
		for (let i = 0, len = ba.readShort(); i < len; i++) {
			self.bossAwardSrc.push([
				ba.readByte(),
				ba.readInt(),
				ba.readInt()
			]);
		}
		self.goldBossAward = []
		for (let i = 0, len = ba.readShort(); i < len; i++) {
			self.goldBossAward.push([
				ba.readByte(),
				ba.readInt(),
				ba.readInt()
			]);
		}
		let temp1 = ConfigHelp.makeItemListArr(self.goldBossAward);
		let temp = ConfigHelp.makeItemListArr(self.bossAwardSrc);
		GGlobal.modelBoss.bossAward = temp1.concat(temp);

		GGlobal.control.notify(Enum_MsgType.MSG_BOSS_RET, 2);
		GGlobal.control.notify(Enum_MsgType.MSG_GQ_UPDATE);
		GGlobal.control.notify(Enum_MsgType.MSG_WAVEUPDATE);

		if (reseult < 30) {
			if (reseult == Config.skillstart_210[2].start) {
				GGlobal.layerMgr.open(UIConst.NEWSKILL, Model_Skill.getSkillByPos(2));
			} else if (reseult == Config.skillstart_210[3].start) {
				GGlobal.layerMgr.open(UIConst.NEWSKILL, Model_Skill.getSkillByPos(3));
			}
		}
	}

	/**排行榜*/
	public CS_GETRANK_1107() {
		let ba = this.getBytes();
		this.socket.sendCMDBytes(1107, ba);
	}

	/**1108
	 * 排行榜 B:我的排名0为未上榜[B:排名L:hidU:名字S:关数]排行数据
	 * */
	protected SC_GETRANK_1108(self: ModelGuanQia, ba: BaseBytes) {
		self.myRank = ba.readByte();
		//UI读取数据
		self.rank = [];
		for (let i = 0, len = ba.readShort(); i < len; i++) {
			let item = [ba.readByte(), ba.readLong(), ba.readUTF(), ba.readShort()];
			self.rank.push(item);
		}
		GGlobal.control.notify(Enum_MsgType.MSG_GQ_RNK);
	}

	/**请求扫荡 */
	public CG_SWEEP_1109() {
		let ba = this.getBytes();
		this.socket.sendCMDBytes(1109, ba);
	}

	/**扫荡结果 B:扫荡结果0：失败；1成功I:失败：错误码；成功：关卡id*/
	public SC_SWEEP_1110(self: ModelGuanQia, ba: BaseBytes) {
		let ret = ba.readByte();
		if (ret == 1) {
			ViewCommonWarn.text("扫荡成功");
			self.SDCount++;
			let awards: any[] = [];
			ba.readInt();
			awards = self.showHighQuality(ba);
			GGlobal.control.notify(Enum_MsgType.MSG_GQ_SWEEP);
			GGlobal.control.notify(Enum_MsgType.MSG_GQ_SWEEP_01, awards);
		}
		else console.log("cmd 1110,code:" + ret);
	}

	public showHighQuality(ba: BaseBytes, isMsg: boolean = true) {
		let temp = [];
		let len = ba.readShort();
		let total = [];
		let total1 = [];
		for (let i = 0; i < len; i++) {
			var vo: IGridImpl = ConfigHelp.parseItemBa(ba);
			total.push(vo);
			if (vo.count > 0) {
				if (vo.quality > 5) {
					temp.push(vo);
				}
				if (isMsg) ConfigHelp.addSerGainText(vo.gType, vo.id, true, vo.count);
			}
		}
		if (temp.length > 0) {
			ViewCommonPrompt.textItemList(temp);
		}
		return total;
	}

	/**领取斩杀奖励 */
	public CG_ZHANSHA_1111() {
		let ba = this.getBytes();
		this.socket.sendCMDBytes(1111, ba);
	}

	/**领取斩杀奖励结果 B:结果：0：失败；1：成功I:失败：错误码(1:数量未达标无法领取)；成功：领取的奖励编号I:剩余斩杀数*/
	public GC_ZHANSHA_1112(self: ModelGuanQia, ba: BaseBytes) {
		let ret = ba.readByte();
		self.killAwardsIndex = ba.readInt();
		self.killCount = ba.readInt();
		if (ret == 1) {
			GGlobal.control.notify(Enum_MsgType.MSG_QIANRENZHAN);
			GGlobal.control.notify(Enum_MsgType.MSG_GQ_UPDATE);
		}
		else console.log("cmd 1112,code:" + ret);
	}

	/**请求挑战关卡Boss  */
	public CG_FIGHTBOSS_1113() {
		if (!this.challBossWithCond()) return;
		let gq = this.curGuanQiaLv;
		switch (gq) {
			case 1:
				GGlobal.modelLogin.cg_loginFlag(ModelLogin.ENTER_GQ_1);
				break;
			case 2:
				GGlobal.modelLogin.cg_loginFlag(ModelLogin.ENTER_GQ_2);
				break;
			case 3:
				GGlobal.modelLogin.cg_loginFlag(ModelLogin.ENTER_GQ_3);
				break;
		}
		let ba = this.getBytes();
		this.socket.sendCMDBytes(1113, ba);
	}

	/**请求挑战关卡Boss B:0:请求失败；1：请求成功I:失败：错误码；成功：关卡id 
	 * B:服务端战斗结果：0：失败；1：胜利*/
	public GC_FIGHTBOSS_1114(self: ModelGuanQia, ba: BaseBytes) {
		let ret = ba.readByte();
		let waveid = ba.readInt();
		let bt = ba.readByte();
		self.hasSurprise = ba.readByte() == 1;
		if (ret == 1) {
			self.challBoss();
			GGlobal.control.notify(Enum_MsgType.SCENE_CHANGE);
		} else {
			//1:波数未达标，2:背包格子不足，3：请先前往下一关
			console.log(["", "波数未达标", "背包格子不足", "请先前往下一关"][waveid]);
		}
	}
	/**当前大关卡id */
	public static curGQID: number;
	public static rewardGetDic: any = {};
	/**领取关卡奖励 */
	public CG1115(id: number) {
		const bytes = this.getBytes();
		bytes.writeInt(id);
		this.sendSocket(1115, bytes);
	}

	private GC_GQGETREWARD_1116(self: ModelGuanQia, bytes: BaseBytes) {
		const state = bytes.readByte();
		const id = bytes.readInt();
		if (state == 1) {
			ModelGuanQia.rewardGetDic[id] = 1;
			self.notify(ModelGuanQia.msg_gqGetRed, id);
		} else {
			//1:未通关，2：已领取，3:背包满
			const idAsSt = id;
			ViewCommonWarn.text(["", "未通关", "已领取", "背包已满"][idAsSt]);
			if (idAsSt == 3) {
				Model_RongLian.ALERT_ONEKEY();
			}
		}
	}
	/**前往下一层关卡 */
	public CG1117() { this.sendSocket(1117, this.getBytes()) }
	private GC1118(self: ModelGuanQia, bytes: BaseBytes) {
		const state = bytes.readByte();
		const id = bytes.readInt();
		if (state == 1) {
			ModelGuanQia.curGQID = id;
			ViewGQDetail.inst.moveTo(id);
			self.notify(ModelGuanQia.msg_gqGetRed, id);
		} else {
			const idAsIdx = id;
			ViewCommonWarn.text(["", "未通关", "已达最高关卡"][idAsIdx]);
		}
	}
	/**大关卡CFG */
	public curGQNotice(cfg: Idgq_205) {
		if (cfg.ID < ModelGuanQia.curGQID) {
			return !ModelGuanQia.rewardGetDic[cfg.ID];
		} else if (cfg.ID == ModelGuanQia.curGQID) {
			const infoArr = JSON.parse(cfg.guanqia);
			const low = infoArr[0][0],
				max = infoArr[0][1];
			if (GGlobal.modelGuanQia.curGuanQiaLv > max && !ModelGuanQia.rewardGetDic[cfg.ID]) {
				return true;
			} else {
				return false;
			}
		}
	}
	public guanQiaNot() {
		for (let key in Config.dgq_205) {
			const cfg = Config.dgq_205[key];
			if (this.curGQNotice(cfg)) {
				return true;
			}
		}
		return false;
	}
	public challBossWithCond(): boolean {
		let self = this;
		if (!Model_Bag.checkResGridNum(20, false)) {
			let equipList = Model_RongLian.onekeyRongLianArr()
			if (equipList.length == 0) {
				ViewCommonWarn.text("装备背包空间不足，请手动分解");
				return false;
			}
			if (self.auto) {
				Model_RongLian.onekeyRongLian();
			} else {
				Model_RongLian.ALERT_ONEKEY();
				return false;
			}
		}
		return true;
	}

	//小怪打腻了？进去打BOSS
	public challBoss() {
		let lib = Config.BOSS_205;
		let maxWave = lib[this.curGuanQiaLv].BS;
		if (GGlobal.mapscene.scenetype == SceneCtrl.MAINTOWN) {//在主城挑战BOSS
			GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
			if (this.curWave >= maxWave) {
				(GGlobal.mapscene.sceneCtrl as GuanQiaSceneCtrl).challBoss();
				return true;
			} else {
				return false;
			}
		} else if (GGlobal.mapscene.scenetype == SceneCtrl.GUANQIA) {
			if (this.curWave >= maxWave) {
				(GGlobal.mapscene.sceneCtrl as GuanQiaSceneCtrl).challBoss();
				return true;
			}
		} else {
			ViewCommonWarn.text("请退出副本再进行挑战");
		}
		return false;
	}

	//关卡每个小时的收益
	public static getExpGP(lv: number) {
		lv = lv == 0 ? 1 : lv;
		let lb = Config.BOSS_205[lv];
		let arr = JSON.parse(lb["auto"]);
		let len = arr.length;
		for (let i: number = 0; i < len; i++) {
			if (arr[i][0] == Enum_Attr.EXP) {
				return arr[i][2];
			}
		}
		return 1000;
	}

	public static getTBGP(lv: number) {
		lv = lv == 0 ? 1 : lv;
		let lb = Config.BOSS_205[lv];
		let arr = JSON.parse(lb["auto"]);
		let len = arr.length;
		for (let i: number = 0; i < len; i++) {
			if (arr[i][0] == Enum_Attr.TONGBI) {
				return arr[i][2];
			}
		}
		return 1000;
	}
	public static hasPassed() {
		var m = GGlobal.modelGuanQia;
		const cfg = Config.dgq_205[ModelGuanQia.curGQID];
		if (cfg) {
			const infoArr = JSON.parse(cfg.guanqia);
			const low = infoArr[0][0],
				max = infoArr[0][1];
			if (m.curGuanQiaLv > max) {
				return true;
			}
		}
		return false;
	}
}