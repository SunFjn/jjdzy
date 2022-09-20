class ModelLiangCao extends BaseModel {
	public constructor() {
		super();
	}

	//阵营
	static CAMP_1 = 1;
	static CAMP_2 = 2;
	static CAMP_3 = 3;

	//1开启中state
	act_sate = 0;
	isInScene = 0;

	mvp_name;
	mvp_head;
	mvp_frame;
	mvp_score = 0;

	winZone = "0";

	myScore = 0;
	myRank = 0;

	//活动结束时间
	remaindTime = 0;
	//小怪刷新时间 这个是计算出来的后端第一次刷新时间，后面的时间前端 %60
	monsterFreshTime = 0;

	//BOSS状态 st:0刷新 1击杀
	bossData: { id: number, st: number, time: number, taskst: number }[] = [];

	//区服数据，按照积分排序
	server_data: { camp: number, zoneid: string, score: number }[] = [];

	//排行榜数据集 个人
	rankdata_person: { rank: number, name: string, score: number }[] = [];

	//排行榜数据集 积分
	rankdata_score: { id: number, st: number }[] = [];

	getMaxScore() {
		let maxScore = 0;
		let data = this.server_data;
		for (let i = 0; i < data.length; i++) {
			maxScore = Math.max(maxScore, data[i].score);
		}
		return maxScore;
	}

	_maxScoreCFGLength = 0;
	get maxScoreCFGLength() {
		if (this._maxScoreCFGLength == 0) {
			let lib = Config.ricemb_290;
			for (let i in lib) {
				this._maxScoreCFGLength++;
			}
		}
		return this._maxScoreCFGLength;
	}

	static _personCFG;
	static getPersonalCFG(idx): Iricerank2_290 {
		if (!ModelLiangCao._personCFG) {
			ModelLiangCao._personCFG = [];
			let cfg = Config.ricerank2_290;
			for (let i in cfg) {
				let ranks = JSON.parse(cfg[i].rank)[0];
				for (let j = ranks[0]; j <= ranks[1]; j++) {
					ModelLiangCao._personCFG.push(cfg[i]);
				}
			}
		}
		return ModelLiangCao._personCFG[idx];
	}

	checkRedot = () => {
		let self = this;
		let ret = false;
		let score = self.myScore;
		let data = self.rankdata_score;
		for (let i in data) {
			let item = data[i];
			let id = item.id;
			if (item.st == 1) {
				ret = true;
				break;
			}
			let cfg = Config.ricemb_290[id];
			if (item.st == 0) {
				if (score >= cfg.point) {
					ret = true;
					break;
				}
			}
		}
		GGlobal.reddot.setCondition(UIConst.LIANGCAO_RANK, 0, ret);
		GGlobal.reddot.notify(UIConst.LIANGCAO_RANK);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		self.socket = mgr;
		//注册GC方法
		mgr.regHand(10100, self.GC_BattleGoods_sysState_10100, self);
		mgr.regHand(10102, self.GC_BattleGoods_inscene_10102, self);
		mgr.regHand(10104, self.GC_BattleGoods_initinfo_10104, self);
		mgr.regHand(10106, self.GC_BattleGoods_battleMonster_10106, self);
		mgr.regHand(10108, self.GC_BattleGoods_getBatMonReward_10108, self);
		mgr.regHand(10110, self.GC_BattleGoods_getBox_10110, self);
		mgr.regHand(10112, self.GC_BattleGoods_stopgetbox_10112, self);
		mgr.regHand(10114, self.GC_BattleGoods_getBoxReward_10114, self);
		mgr.regHand(10116, self.GC_BattleGoods_battlePvp_10116, self);
		mgr.regHand(10118, self.GC_BattleGoods_pvprest_10118, self);
		mgr.regHand(10120, self.GC_BattleGoods_stateInfo_10120, self);
		mgr.regHand(10122, self.GC_BattleGoods_sourceChange_10122, self);
		mgr.regHand(10124, self.GC_BattleGoods_rewardUi_10124, self);
		mgr.regHand(10126, self.GC_BattleGoods_rewardcharge_10126, self);
		mgr.regHand(10128, self.GC_BattleGoods_outscene_10128, self);
		mgr.regHand(10130, self.GC_BattleGoods_personalRank_10130, self);
		mgr.regHand(10132, self.GC_BattleGoods_zoneRank_10132, self);
		mgr.regHand(10134, self.relife_10134, self);
		mgr.regHand(10136, self.scoreUpdate_10136, self);
		mgr.regHand(10138, self.acitivity_end, self);
		mgr.regHand(10140, self.monster_update, self);
	}

	/**10100 B GC 粮草抢夺活动状态 B:2开启中state*/
	public GC_BattleGoods_sysState_10100(self: ModelLiangCao, data: BaseBytes): void {
		self.act_sate = data.readByte();
		GGlobal.reddot.setCondition(UIConst.LIANGCAO, 0, self.act_sate == 2);
		GGlobal.reddot.notify(UIConst.LIANGCAO);
		self.notifyGlobal(UIConst.LIANGCAO);
	}

	private hasSend = 0;
	/**10101  CG参加活动请求进入场景（跨服） */
	public CG_BattleGoods_inscene_10101(): void {
		if (this.hasSend) {
			return;
		}
		if (this.act_sate != 2) {
			this.warn("活动尚未开启");
			return;
		}
		this.hasSend = 1;
		var bates = this.getBytes();
		this.sendSocket(10101, bates, true);
	}

	/**10102 B-I GC进入返回 B:0成功1失败 2活动结束 3进入cd中restI:cd时间cdtime*/
	public GC_BattleGoods_inscene_10102(self: ModelLiangCao, data: BaseBytes): void {
		self.hasSend = 0;
		let ret = data.readByte();
		let cd = data.readInt();
		if (ret == 3) {
			ViewCommonWarn.text("请等待" + cd + "秒");
		} else if (ret == 2) {
			ViewCommonWarn.text("活动已结束");
		} else if (ret == 0) {
			self.isInScene = 1;
		} else {
			ViewCommonWarn.text("活动未开启");
		}
	}

	/**10104 [B-I-I]-I-[I-B-I-B]-I-I  [B:阵营1 2 3I:区号I:区积分]sourceinfosI:我的积分mysource[I:boss系统idB:boss状态0死亡1活着I:复活时间B:是否被击杀过0没有1有]bossinfosI:下一波强盗刷新时间freshTimeI:活动结束时间overTime*/
	public GC_BattleGoods_initinfo_10104(self: ModelLiangCao, data: BaseBytes): void {
		self.hasSend = 0;
		let len = data.readShort();
		self.server_data = [];
		for (let i = 0; i < len; i++) {
			let camp = data.readByte();
			let zoneid = data.readInt();
			let score = data.readInt();
			let temp: any = {};
			temp.camp = camp;
			temp.zoneid = "s." + zoneid;
			temp.score = score;
			self.server_data.push(temp);
		}
		self.server_data.sort(function (a, b) {
			return a.score > b.score ? -1 : 1;
		});

		self.myScore = data.readInt();

		self.bossData = [];
		let now = Model_GlobalMsg.getServerTime();
		let len1 = data.readShort();
		for (let i = 0; i < len1; i++) {
			let bossid = data.readInt();
			let st = data.readByte();
			let time = data.readInt();
			let haskill = data.readByte();
			let temp: any = {};
			temp.id = bossid;
			temp.st = st;
			temp.time = time * 1000 + now;
			temp.taskst = haskill;
			self.bossData.push(temp);
		}


		self.monsterFreshTime = now - (ConfigHelp.getSystemNum(7605) - data.readInt()) * 1000;
		self.remaindTime = data.readInt() * 1000 + now;
		ModelArpgMap.myCamp = data.readByte();
		self.notifyGlobal(UIConst.LIANGCAO);
	}

	/**10105 L CG请求挑战怪物 L:请求挑战怪物mid*/
	public CG_BattleGoods_battleMonster_10105(arg1): void {
		var bates = this.getBytes();
		bates.writeLong(arg1);
		this.sendSocket(10105, bates);
	}

	/**10106 B-L-B GC 请求挑战怪物返回 B:0成功1你的状态不对 2怪物正在战斗3怪不存在restL:怪物唯一的idmonsterid*/
	public GC_BattleGoods_battleMonster_10106(self: ModelLiangCao, data: BaseBytes): void {
		let result = data.readByte();
		let bossid = data.readLong();
		let npcid = bossid;
		let npc = GameUnitManager.findUnitByID(bossid);
		if (npc) {
			bossid = (npc as ARPGNpc).cfgID;
		} else {
			ViewCommonWarn.text("场景上无法寻找到这个怪物");
			return;
		}
		LiangCaoPveCtr.instance.serverid = npcid;
		LiangCaoPveCtr.instance.bossid = bossid;
		if (result == 0) {
			GGlobal.mapscene.enterScene(SceneCtrl.LIANGCAO);
		} else if (result == 1) {
			self.warn("状态异常");
		} else if (result == 2) {
			self.warn("怪物正在战斗");
		} else if (result == 3) {
			self.warn("怪物已经被击杀");
		}
	}

	/**10107 L-B CG 通知后端pve战斗结果获取奖励与否 L:怪物idmonsteridB:0输了 1赢了 rest*/
	public CG_BattleGoods_getBatMonReward_10107(arg1, arg2): void {
		var bates = this.getBytes();
		bates.writeLong(arg1);
		bates.writeByte(arg2);
		this.sendSocket(10107, bates);
	}

	/**10108 L-B-I-[I-I-I] GC pve返回战斗结束界面 L:怪物唯一idmonsteridB:0输了 1赢了restI:我的积分source[I:奖励类型I:系统idI:数量]reward*/
	public GC_BattleGoods_getBatMonReward_10108(self: ModelLiangCao, data: BaseBytes): void {
		let booid = data.readLong();
		let battleResult = data.readByte();
		self.myScore = data.readInt();

		let awards = [];
		for (var i = 0, len = data.readShort(); i < len; i++) {
			var type = data.readInt();
			var id = data.readInt();
			var count = data.readInt();
			var vo: IGridImpl;
			if (type == Enum_Attr.EQUIP) {
				vo = VoEquip.create(id);
			} else if (type == Enum_Attr.ITEM) {
				vo = VoItem.create(id);
			} else {//货币
				vo = Vo_Currency.create(type);
			}
			vo.count = count;
			awards.push(vo);
		}
		self.notifyGlobal(UIConst.LIANGCAO_BATTLEEND, { "battleResult": battleResult, "awards": awards });
	}

	/**10109 L CG采集宝箱 L:宝箱唯一idboxid*/
	public CG_BattleGoods_getBox_10109(arg1): void {
		var bates = this.getBytes();
		bates.writeLong(arg1);
		this.sendSocket(10109, bates);
	}

	/**10110 B-L GC 采集宝箱返回 B:0可以采集 1有1人采集战斗 2有两个人正在抢夺中3复活cd中stateL:采集NPCIDnpcID*/
	public GC_BattleGoods_getBox_10110(self: ModelLiangCao, data: BaseBytes): void {
		let result = data.readByte();
		let npcid = data.readLong();
		if (result == 0) {
			let npc = GameUnitManager.findUnit(npcid, UnitType.NPC) as ARPGNpc;
			CollectManager.begin(npc, 10000, Handler.create(self, self.collectHandler, [[npcid]], true));
		} else {
			self.warn(['', "他人正在采集", "正在被抢夺", "复活CD"][result]);
		}
	}

	collectHandler(data) {
		this.CG_BattleGoods_getBoxReward_10113(data[0]);
	}

	/**10111 L CG 终止采集 L:宝箱唯一idboxid*/
	public CG_BattleGoods_stopgetbox_10111(arg1): void {
		var bates = this.getBytes();
		bates.writeLong(arg1);
		this.sendSocket(10111, bates);
	}

	/**10112 B-L GC 终止采集返回 B:0终止成功 1终止失败restL:宝箱唯一idboxid*/
	public GC_BattleGoods_stopgetbox_10112(self: ModelLiangCao, data: BaseBytes): void {
		let result = data.readByte();
		let npcid = data.readLong();
		CollectManager.serverEnd();
	}

	/**10113 L CG 采集成功获取奖励 L:宝箱唯一idboxid*/
	public CG_BattleGoods_getBoxReward_10113(arg1): void {
		var bates = this.getBytes();
		bates.writeLong(arg1);
		this.sendSocket(10113, bates);
	}

	/**10114 B-L GC 获取宝箱奖励 B:0成功1失败 2采集时间未到restL:箱子唯一idboxid*/
	public GC_BattleGoods_getBoxReward_10114(self: ModelLiangCao, data: BaseBytes): void {
		let result = data.readByte();
		let boxid = data.readLong();
		if (result == 0) {
			self.warn("采集成功");
		} else {
			self.warn(["", "采集失败", "采集时间未到", ""][result]);
		}
	}

	/**10115 L CG 怼某个玩家 L:玩家idbattlehid*/
	public CG_BattleGoods_battlePvp_10115(arg1): void {
		var bates = this.getBytes();
		bates.writeLong(arg1);
		this.sendSocket(10115, bates);
	}

	/**10116 B GC 怼某个玩家返回 B:0开打 1对方正在战斗 2复活cd中state*/
	public GC_BattleGoods_battlePvp_10116(self: ModelLiangCao, data: BaseBytes): void {
		let result = data.readByte();
		if (result > 0) {
			self.warn(["", "对方正在战斗", "复活cd", ""][result]);
		}
	}

	/**10118 B-I GC pvp通知玩家战斗结果 B:0胜利 1失败restI:我的积分source*/
	public GC_BattleGoods_pvprest_10118(self: ModelLiangCao, data: BaseBytes): void {
		let result = data.readByte();
		self.myScore = data.readInt();
		self.notifyGlobal(UIConst.LIANGCAO);
	}

	/**10120 [B-L-B-I] GC 地图上参与者/宝箱/怪物状态变化 [B:0参与者 1宝箱 2怪物L:唯一idB:状态 0自由 1采集中/被采集中 2pvp/中被两人抢夺中 3pve中 4pvp抢到宝箱中  5复活cd中I:复活cd时间]stateinfos*/
	public GC_BattleGoods_stateInfo_10120(self: ModelLiangCao, data: BaseBytes): void {
		let len = data.readShort();
		LiangCaoManager.playerStateDic = {};
		for (let i = 0; i < len; i++) {
			let type = data.readByte();
			let id = data.readLong();
			let state = data.readByte();
			let cd = data.readInt();
			LiangCaoManager.playerStateDic[id] = { "state": state, "cd": cd };
		}
		self.notifyGlobal(LiangCaoManager.UPDATE_SCENE_DATA);
	}

	/**10122 I GC 我的积分变化 I:我的积分mysource*/
	public GC_BattleGoods_sourceChange_10122(self: ModelLiangCao, data: BaseBytes): void {
		let temp = data.readInt();
		ViewCommonWarn.text("积分 +" + (temp - self.myScore));
		self.myScore = temp;
		self.checkRedot();
		self.notifyGlobal(UIConst.LIANGCAO);
	}

	/**10123  CG 奖励目标ui */
	public CG_BattleGoods_ui_10123(): void {
		var bates = this.getBytes();
		this.sendSocket(10123, bates);
	}

	/**10124 [B-B] GC 打奖励目标ui [B:奖励序号B:奖励状态0不可领取 1可以领取 2领取]rewardinfos*/
	public GC_BattleGoods_rewardUi_10124(self: ModelLiangCao, data: BaseBytes): void {
		self.rankdata_score = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let idx = data.readByte();
			let state = data.readByte();
			self.rankdata_score.push({ id: idx, st: state });
		}
		self.rankdata_score.sort(function (a, b) {
			return self.getRankWright(a) < self.getRankWright(b) ? -1 : 1;
		});
		self.checkRedot();
		self.notifyGlobal(UIConst.LIANGCAO_RANK);
	}

	getRankWright(a) {
		let g = 0;
		if (a.st == 1) {
			g = a.id - 10000;
		} else if (a.st == 2) {
			g = 10000 + a.id;
		} else {
			g = a.id;
		}
		return g;
	}

	/**10125 B CG 获取奖励 B:奖励序号index*/
	public CG_BattleGoods_getreward_10125(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(10125, bates);
	}

	/**10126 B-B GC 奖励发生变化 B:奖励序号indexB:奖励状态state*/
	public GC_BattleGoods_rewardcharge_10126(self: ModelLiangCao, data: BaseBytes): void {
		let idx = data.readByte();
		let state = data.readByte();
		let len = self.rankdata_score.length;
		for (let i = 0; i < len; i++) {
			if (self.rankdata_score[i].id == idx) {
				self.rankdata_score[i].st = state;
				break;
			}
		}
		self.rankdata_score.sort(function (a, b) {
			return self.getRankWright(a) < self.getRankWright(b) ? -1 : 1;
		});
		self.checkRedot();
		self.notifyGlobal(UIConst.LIANGCAO_RANK);
	}

	/**10127 B CG 退出场景*/
	public CG_BattleGoods_getreward_10127(): void {
		var bates = this.getBytes();
		this.sendSocket(10127, bates);
	}

	/**10128 GC 退出场景返回 B:0成功 1失败*/
	public GC_BattleGoods_outscene_10128(self: ModelLiangCao, data: BaseBytes): void {
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		self.isInScene = 0;
	}


	/**10129	
B
CG 获取排行榜 B:0个人排行 1区服排名*/
	public CG_BattleGoods_personalRank_10129(TYPE): void {
		var bates = this.getBytes();
		bates.writeByte(TYPE);
		this.sendSocket(10129, bates);
	}

	/**10130	
[B-L-U-I]-I-B
GC 个人积分排行榜 [B:名次L:玩家idU:我的名字I:积分]I:我的积分B:我的排名*/
	public GC_BattleGoods_personalRank_10130(self: ModelLiangCao, data: BaseBytes): void {
		self.rankdata_person = [];
		let len = data.readShort();
		for (let i = len - 1; i >= 0; i--) {
			let temp: any = {};
			temp.rank = data.readByte();
			temp.name = data.readUTF();
			temp.score = data.readInt();
			self.rankdata_person.push(temp);
		}
		self.myScore = data.readInt();
		self.myRank = data.readByte();
		self.checkRedot();
		self.notifyGlobal(UIConst.LIANGCAO_RANK);
	}
	/**10132 [B-B-I-I]
GC 区服积分排名 [B:排名B:阵营（1 2 3）I:区服idI:积分]*/
	public GC_BattleGoods_zoneRank_10132(self: ModelLiangCao, data: BaseBytes): void {
		self.server_data = [];
		let len = data.readShort();
		for (let i = len - 1; i >= 0; i--) {
			let temp: any = {};
			temp.rank = data.readByte();
			temp.camp = data.readByte();
			temp.zoneid = "s." + data.readInt();
			temp.score = data.readInt();
			self.server_data.push(temp);
		}
		self.mvp_name = data.readUTF();
		self.mvp_head = data.readInt();
		self.mvp_frame = data.readInt();
		self.mvp_score = data.readInt();
		self.notifyGlobal(UIConst.LIANGCAO_RANK);
	}

	public CG_relife_10133(): void {
		var bates = this.getBytes();
		this.sendSocket(10133, bates);
	}

	/**复活 GC 买活返回 B:0成功 1失败 2钱不够*/
	public relife_10134(self: ModelLiangCao, data: BaseBytes): void {
		let ret = data.readByte();
		if (ret == 0) {
			self.notifyGlobal(LiangCaoManager.UPDATE_SCENE_DATA, Model_player.voMine.id);
			RevivePanel.hideView();
			GameUnitManager.hero.removePlugBytype(ArpgRoleStatePlug);
		} else if (ret == 1) {
			self.warn("复活失败");
		} else if (ret == 1) {
			self.warn("元宝不足");
		}
	}

	/**GC 某个区服阵营积分变化 I:阵营1-3I:区服I:积分*/
	public scoreUpdate_10136(self: ModelLiangCao, data: BaseBytes): void {
		let camp = data.readInt();
		let zone = data.readInt();
		let score = data.readInt();
		let arr = self.server_data;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].camp == camp) {
				arr[i].zoneid = "s." + zone;
				arr[i].score = score;
				break;
			}
		}
		self.server_data.sort(function (a, b) {
			return a.score > b.score ? -1 : 1;
		});
		self.notifyGlobal(UIConst.LIANGCAO);
	}

	/**acitivity_end*/
	public acitivity_end(self: ModelLiangCao, data: BaseBytes): void {
		let arr = self.server_data;
		let long = data.readShort();
		for (let i = 0; i < long; i++) {
			let zone = "s." + data.readInt();
			let score = data.readInt();
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].zoneid == zone) {
					arr[i].score = score;
					break;
				}
			}
		}
		self.mvp_name = data.readUTF();
		self.mvp_head = data.readInt();
		self.mvp_frame = data.readInt();
		GGlobal.layerMgr.open(UIConst.LIANGCAO_RESULT);
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		self.isInScene = 0;
	}

	public monster_update(self: ModelLiangCao, data: BaseBytes): void {
		let now = Model_GlobalMsg.getServerTime();
		let bossdata = self.bossData;
		let len1 = bossdata.length;
		let bossid = data.readInt();
		let camp = data.readByte();
		let time = data.readInt();
		let haskill = camp == ModelArpgMap.myCamp ? 1 : 0;
		for (let i = 0; i < len1; i++) {
			let temp: any = self.bossData[i];
			if (temp.id == bossid) {
				temp.st = 0;
				temp.time = time * 1000 + now;
				temp.taskst = haskill;
			}
		}
		self.notifyGlobal(UIConst.LIANGCAO);
	}

	public sendSocket(cmd, ba: BaseBytes, isCross?: boolean) {
		if (!this.socket.webSocket.connect) {
			return;
		}
		this.socket.sendCMDBytes(cmd, ba, true);
	}

	static _dic: {};
	public static checkNpcQuility(npcid) {
		if (!this._dic) {
			this._dic = {};
			let cfg = Config.rice_290;
			for (let i in cfg) {
				let id = cfg[i].npc;
				this._dic[id] = cfg[i];
			}
		}
		if (this._dic[npcid]) {
			return this._dic[npcid].pz;
		} else {
			return -1;
		}
	}
}