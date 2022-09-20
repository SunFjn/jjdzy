class Model_DengFengZJ extends BaseModel {
	public constructor() {
		super();
	}

	public static STATUS = "status"
	public static SEA_UI = "sea_ui"
	public static FINAL_UI = "final_ui"

	public static RANK_DAT = "rank_dat"//排行
	public static POINT_DAT = "point_dat"//积分
	public static BET_DAT = "bet_dat"//冠军预测
	public static BET_SUC = "bet_suc"//冠军预测

	public static ITEM_BATCT = 416081;//登峰造极挑战令

	//获取登峰造极数据 B:0.海选 1.决赛
	public CG_OPENUI(type: 0 | 1): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		this.sendSocket(11951, bates);
	}

	//购买挑战次数 B:0.海选 1.决赛I:次数
	public CG_BUY_TIME(type: 0 | 1, ct: number): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		bates.writeInt(ct)
		this.sendSocket(11953, bates);
	}

	//获取排名奖励 B:0.海选 1.决赛
	public CG_RANK_REWARD(type: 0 | 1): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		this.sendSocket(11955, bates);
	}

	//获取积分奖励数据
	public CG_POINT_DAT(): void {
		var bates = this.getBytes();
		this.sendSocket(11957, bates);
	}

	//换一批 B:0.海选 1.决赛
	public CG_REPLACE(type: 0 | 1): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		this.sendSocket(11959, bates);
	}

	//获取冠军预测数据
	public CG_GET_PREDICT(): void {
		var bates = this.getBytes();
		this.sendSocket(11961, bates);
	}

	//下注
	public CG_BET(id): void {
		var bates = this.getBytes();
		bates.writeLong(id);
		this.sendSocket(11963, bates);
	}

	//挑战 B:0.海选 1.决赛L:角色id
	public CG_BATTLE(type: 0 | 1, plyId: number): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		bates.writeLong(plyId)
		this.sendSocket(11965, bates);
	}

	//战斗结果 B:1.胜利 2.失败 3.活动结束L:被挑战玩家id
	public CG_BATTLE_RES(res: number): void {
		var bates = this.getBytes();
		bates.writeByte(res)
		this.sendSocket(11967, bates);
	}

	//领取积分奖励 I:积分id
	public CG_POINT_GET(id: number): void {
		var bates = this.getBytes();
		bates.writeInt(id)
		this.sendSocket(11969, bates);
	}
	status = 0
	//海选数据
	seaData: Vo_DengFengZJ[] = null
	seaPower = 0//我的战力
	seaRank = 0//我的排名
	seaPoint = 0//我的积分
	seaBatCt = 0//今日挑战次数
	seaFreEff = false

	hasSeaBuy = 0;// 海选已购买次数
	// private _maxSeaBuy = -1;
	// public get maxSeaBuy() {
	// 	let s = this;
	// 	if (s._maxSeaBuy == -1) {
	// 		let cfg = null
	// 		for (let key in Config.dfzjhx3_261) {
	// 			cfg = Config.dfzjhx3_261[key]
	// 		}
	// 		this._maxSeaBuy = cfg ? cfg.id : 0
	// 	}
	// 	return this._maxSeaBuy
	// }

	//决赛数据
	finalData: Vo_DengFengZJ[] = null
	finalPower = 0//我的战力
	finalRank = 0//我的排名
	finalPoint = 0//我的积分
	finalBatCt = 0//今日挑战次数
	//决赛购买挑战次数
	hasFinalBuy = 0;
	// private _maxFinalBuy = -1;
	// public get maxFinalBuy() {
	// 	let s = this;
	// 	if (s._maxFinalBuy == -1) {
	// 		let cfg = null
	// 		for (let key in Config.dfzjjs3_261) {
	// 			cfg = Config.dfzjjs3_261[key]
	// 		}
	// 		this._maxFinalBuy = cfg ? cfg.id : 0
	// 	}
	// 	return this._maxFinalBuy
	// }

	//决赛预测
	finalBetArr: Vo_DengFengZJ[] = []
	finalBetId = 0
	finalChaiID = 0;
	//战斗数据
	batPlyId: number = 0
	batType: number// 0海选  1决赛

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(11952, this.GC_OPENUI11952, this);
		mgr.regHand(11954, this.GC_BUY_TIME11954, this);
		mgr.regHand(11956, this.GC_RANK_DAT11956, this);
		mgr.regHand(11958, this.GC_POINT_DAT11958, this);
		mgr.regHand(11960, this.GC_REPLACE11960, this);
		mgr.regHand(11962, this.GC_GET_PREDICT11962, this);
		mgr.regHand(11964, this.GC_BET11964, this);
		mgr.regHand(11966, this.GC_BATTLE11966, this);
		mgr.regHand(11968, this.GC_BATTLE_RES11968, this);
		mgr.regHand(11970, this.GC_POINT_GET11970, this);
		mgr.regHand(11972, this.GC_STATUS11972, this);
	}

	//登峰造极数据返回 B:0.海选 1.决赛[B:排名L: 玩家IDU:玩家名称L: 战力I:时装I: 专属神兵I:坐骑B: 0.未挑战 1.已挑战]排名数据L: 我的战力B:我的排名：0.未上榜I:我的积分I: 今日挑战次数
	private GC_OPENUI11952(self: Model_DengFengZJ, data: BaseBytes): void {
		let type = data.readByte();
		if (type == 0) {//海选
			let len = data.readShort();
			self.seaData = [];
			for (let i = 0; i < len; i++) {
				let v = new Vo_DengFengZJ();
				v.readMsg(data);
				self.seaData.push(v);
			}
			self.seaData.sort(function (a, b) { return a.rank - b.rank });
			self.seaPower = data.readLong();
			self.seaRank = data.readByte();
			self.seaPoint = data.readInt();
			self.seaBatCt = data.readInt();
			self.hasSeaBuy = data.readInt();

			self.checkRedSea()
			self.notify(Model_DengFengZJ.SEA_UI)
		} else {
			let len = data.readShort();
			self.finalData = [];
			for (let i = 0; i < len; i++) {
				let v = new Vo_DengFengZJ();
				v.readMsg(data);
				self.finalData.push(v);
			}
			self.finalData.sort(function (a, b) { return a.rank - b.rank });
			self.finalPower = data.readLong();
			self.finalRank = data.readByte();
			self.finalPoint = data.readInt();
			self.finalBatCt = data.readInt();
			self.hasFinalBuy = data.readInt();

			self.checkRedFinal()
			self.notify(Model_DengFengZJ.FINAL_UI)
		}

	}

	//购买次数返回 B:1.成功 2.元宝不足 3.该阶段已结束 4.本周赛事已结束I:挑战次数
	private GC_BUY_TIME11954(self: Model_DengFengZJ, data: BaseBytes): void {
		let res = data.readByte();
		let ct = data.readInt();
		let type = data.readByte();
		let hasBuy = data.readInt();
		if (res == 1) {
			if (type == 0) {
				self.seaBatCt = ct
				self.hasSeaBuy = hasBuy
				self.checkRedSea()
				self.notify(Model_DengFengZJ.SEA_UI)
			} else {
				self.finalBatCt = ct;
				self.hasFinalBuy = hasBuy
				self.checkRedFinal()
				self.notify(Model_DengFengZJ.FINAL_UI)
			}
		} else {
			ViewCommonWarn.text(["元宝不足", "该阶段已结束", "本周赛事已结束"][res - 2])
		}
	}

	public rankDat: { rank: number, name: string, point: number }[] = []
	//排名奖励返回 [B:排名U:玩家名称I:积分]排名数据
	private GC_RANK_DAT11956(self: Model_DengFengZJ, data: BaseBytes): void {
		let len = data.readShort();
		self.rankDat = []
		for (let i = 0; i < len; i++) {
			let rank = data.readByte();
			let name = data.readUTF();
			let point = data.readInt();
			self.rankDat[rank - 1] = { rank: rank, name: name, point: point };
		}
		self.notify(Model_DengFengZJ.RANK_DAT)
	}

	public pointDat = {}
	//积分奖励数据返回 [I:已领积分id]
	private GC_POINT_DAT11958(self: Model_DengFengZJ, data: BaseBytes): void {
		let len = data.readShort();
		self.pointDat = {}
		for (let i = 0; i < len; i++) {
			self.pointDat[data.readInt()] = 1;
		}
		self.checkRedSea()
		self.notify(Model_DengFengZJ.POINT_DAT)
	}

	//换一批数据返回 B:1.成功 2.元宝不足 3.本周赛事已结束[B:排名L: 玩家idU:玩家名称L: 战力I:时装I: 专属神兵I:坐骑]
	private GC_REPLACE11960(self: Model_DengFengZJ, data: BaseBytes): void {
		let type = data.readByte();
		let res = data.readByte();
		if (res == 1) {
			let len = data.readShort();
			if (type == 0) {
				self.seaData = [];
				for (let i = 0; i < len; i++) {
					let v = new Vo_DengFengZJ();
					v.readMsgRp(data);
					self.seaData.push(v);
				}
				self.seaData.sort(function (a, b) { return a.rank - b.rank });
				self.notify(Model_DengFengZJ.SEA_UI)
			} else {
				self.finalData = [];
				for (let i = 0; i < len; i++) {
					let v = new Vo_DengFengZJ();
					v.readMsgRp(data);
					self.finalData.push(v);
				}
				self.finalData.sort(function (a, b) { return a.rank - b.rank });
				self.notify(Model_DengFengZJ.FINAL_UI)
			}
		} else {
			ViewCommonWarn.text(["元宝不足", "本周赛事已结束"][res - 2])
		}
	}

	//冠军预测数据返回 [L:玩家idU:玩家名称L:战力]预测数据L: 0.未下注 - 1.已超时
	private GC_GET_PREDICT11962(self: Model_DengFengZJ, data: BaseBytes): void {
		let len = data.readShort();
		self.finalBetArr = [];
		for (let i = 0; i < len; i++) {
			let v = new Vo_DengFengZJ();
			v.readMsgPre(data);
			self.finalBetArr.push(v);
		}
		self.finalBetArr.sort(function (a, b) { return b.power - a.power })
		self.finalBetId = data.readLong();
		self.notify(Model_DengFengZJ.BET_DAT)
	}

	//下注返回 B:1.成功 2.元宝不足 3.已超时
	private GC_BET11964(self: Model_DengFengZJ, data: BaseBytes): void {
		let res = data.readByte();
		if (res == 1) {
			self.finalBetId = data.readLong();
			self.checkRedFinal();
			self.notify(Model_DengFengZJ.BET_SUC)
		}
		ViewCommonWarn.text(["下注成功", "元宝不足", "已超时"][res - 1])
	}
	//挑战返回  B:1.成功 2.没有挑战次数 3.不可越级挑战 4.已挑战 5.不在活动期间时不可挑战 6.第一名需要前5名才可挑战 7.不能挑战自己 8.参数错误 9.未进入决赛不能挑战 10.排名已变更
	private GC_BATTLE11966(self: Model_DengFengZJ, data: BaseBytes): void {
		let res = data.readByte();
		if (res == 1) {

			let scenetype = GGlobal.mapscene.scenetype
			if (scenetype == SceneCtrl.DENG_FENG) {
				return;//按键精灵 会触发多次进入
			}

			self.batType = data.readByte()
			self.batPlyId = data.readLong();
			GGlobal.mapscene.enterScene(SceneCtrl.DENG_FENG);
		} else {
			ViewCommonWarn.text(["没有挑战次数", "不可越级挑战", "已挑战", "不在活动期间时不可挑战",
				"第一名需要前5名才可挑战", "不能挑战自己", "参数错误", "未进入决赛不能挑战", "排名已变更", "比赛尚未开始", "本周赛事已结束"][res - 2])
		}
	}
	//战斗结果返回 B:1.胜利 0.失败 2.活动结束B:0.海选 1.决赛L:被挑战玩家id
	private GC_BATTLE_RES11968(self: Model_DengFengZJ, data: BaseBytes): void {
		var result = data.readByte();
		let type = data.readByte();
		let plyId = data.readLong();
		let isAll = data.readByte();
		let val;
		if (result == 1) {//胜利
			let rew
			if (type == 0) {
				self.seaFreEff = isAll == 1;
				//积分奖励
				let idx = 0
				for (let i = 0; i < self.seaData.length; i++) {
					if (self.seaData[i].plyId == plyId) {
						idx = i;
						break;
					}
				}
				val = self.getAddPointSea(idx)
				if (isAll == 1) {
					val += ConfigHelp.getSystemNum(8309);
				}
				//奖励
				rew = JSON.parse(Config.xtcs_004[8310].other);
			} else {//决赛
				let rank = 0
				for (let i = 0; i < self.finalData.length; i++) {
					if (self.finalData[i].plyId == plyId) {
						rank = self.finalData[i].rank;
						break;
					}
				}
				val = self.getAddPointFinal(rank);
				rew = JSON.parse(Config.xtcs_004[8311].other);
			}
			ViewBroadcastItemText.text("积分+" + val, Color.GREENINT);
			ViewCommonWin.show(ConfigHelp.makeItemListArr(rew), 5000)
		} else if (result == 0 || result == 2) {//失败
			ViewCommonFail.show(5000, self, "离开", self.failHandler, null);
			if (type == 0) {
				val = JSON.parse(Config.xtcs_004[8303].num);
			} else {
				val = JSON.parse(Config.xtcs_004[8307].num);
			}
			ViewBroadcastItemText.text("积分+" + val, Color.GREENINT);
		} else {
			self.failHandler();
		}
	}

	private _addPointSea;
	//ABC档次挑战成功积分奖励
	public getAddPointSea(idx) {
		let s = this;
		if (!s._addPointSea) {
			s._addPointSea = JSON.parse(Config.xtcs_004[8302].other)[0];
		}
		if (idx < 2) {
			idx = idx;
		} else if (idx == 2) {
			idx = 1
		} else if (idx > 2) {
			idx = 2
		}
		return s._addPointSea[idx]
	}
	public getAddPointFinal(rank) {
		let s = this;
		let rankArr = s.getCfgRankFinal()
		let v = rankArr[rank - 1]
		return v ? v.point : 0;
	}

	//领取积分奖励返回 B:1.成功 2.已领 3.积分不足 4.参数错误 5.背包已满I:积分id
	private GC_POINT_GET11970(self: Model_DengFengZJ, data: BaseBytes): void {
		var res = data.readByte();
		if (res == 1) {
			self.pointDat[data.readInt()] = 1;
			self.checkRedSea()
			self.notify(Model_DengFengZJ.POINT_DAT)
		} else {
			ViewCommonWarn.text(["已领取", "积分不足", "参数错误", "背包已满"][res - 2])
		}
	}
	//活动开启与结束 B:1.海选开启 2.决赛开启 0.结束
	private GC_STATUS11972(self: Model_DengFengZJ, data: BaseBytes) {
		self.status = data.readByte();
		self.checkRedSea()
		self.checkRedFinal()
		self.notify(Model_DengFengZJ.STATUS)
	}

	private failHandler(): void {
		GGlobal.modelScene.returnMainScene();
	}

	private checkRedSea() {
		let s = this;
		let r = GGlobal.reddot
		if (s.status == 1) {
			if (!s.seaData) {
				return;
			}
			let arr = s.getCfgPointSea()
			let red = false
			for (let i = 0; i < arr.length; i++) {
				let v = arr[i];
				if (s.seaPoint < v.point) {
					break;
				}
				let st = s.pointDat[v.id];
				if (!st && s.seaPoint >= v.point) {
					red = true;
					break;
				}
			}
			r.setCondition(UIConst.DENG_FENG_SEA, 1, red);
			r.setCondition(UIConst.DENG_FENG_SEA, 0, s.seaBatCt > 0 || red);
		} else {
			r.setCondition(UIConst.DENG_FENG_SEA, 1, false);
			r.setCondition(UIConst.DENG_FENG_SEA, 0, false);
		}
		r.notify(UIConst.DENG_FENG_SEA);
	}

	private checkRedFinal() {
		let s = this;
		if (s.status == 2) {
			if (!s.finalData) {
				return;
			}
			let betRed = (s.finalBetId == 0 && s.getBetStatus());
			let red = (s.finalBatCt > 0 && s.finalRank > 0) || betRed;
			GGlobal.reddot.setCondition(UIConst.DENG_FENG_FINAL, 1, betRed);
			GGlobal.reddot.setCondition(UIConst.DENG_FENG_FINAL, 0, red);
		} else {
			GGlobal.reddot.setCondition(UIConst.DENG_FENG_FINAL, 1, false);
			GGlobal.reddot.setCondition(UIConst.DENG_FENG_FINAL, 0, false);
		}
		GGlobal.reddot.notify(UIConst.DENG_FENG_FINAL);
	}

	private _cfgRankSea: Idfzjhx1_261[];
	public getCfgRankSea() {
		let s = this;
		if (!s._cfgRankSea) {
			s._cfgRankSea = [];
			for (let key in Config.dfzjhx1_261) {
				let v = Config.dfzjhx1_261[key];
				let rankArr = JSON.parse(v.rank);
				let r1 = Number(rankArr[0][0])
				let r2 = Number(rankArr[0][1])
				for (let i = r1; i <= r2; i++) {
					s._cfgRankSea[i - 1] = v;
				}
			}
		}
		return s._cfgRankSea
	}

	private _cfgRankFinal: Idfzjjs1_261[];
	public getCfgRankFinal(): Idfzjjs1_261[] {
		let s = this;
		if (!s._cfgRankFinal) {
			s._cfgRankFinal = [];
			for (let key in Config.dfzjjs1_261) {
				let v = Config.dfzjjs1_261[key];
				let rankArr = JSON.parse(v.rank);
				let r1 = Number(rankArr[0][0])
				let r2 = Number(rankArr[0][1])
				for (let i = r1; i <= r2; i++) {
					s._cfgRankFinal[i - 1] = v;
				}
			}
		}
		return s._cfgRankFinal
	}

	private cfgPointSea: Idfzjhx2_261[]
	public getCfgPointSea() {
		let s = this;
		if (!s.cfgPointSea) {
			s.cfgPointSea = []
			for (let key in Config.dfzjhx2_261) {
				let val = Config.dfzjhx2_261[key]
				s.cfgPointSea.push(val)
			}
		}
		return s.cfgPointSea
	}
	// 周6 可预测
	public getBetStatus() {
		const servTime = Model_GlobalMsg.getServerTime();
		let date = new Date(servTime);
		let day = date.getDay()
		if (day == 6) {
			return true
		} else {
			return false
		}
	}
}