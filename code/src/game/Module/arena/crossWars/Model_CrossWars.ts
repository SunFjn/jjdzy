class Model_CrossWars extends BaseModel {
	/**2101 CG 打开ui B:比赛进程（0-4）第几轮 */
	public CG_OPENUI(type: number): void {
		var bates = this.getBytes();
		bates.writeByte(type);
		this.sendSocket(2101, bates);
	}
	/**2103 CG 买比赛输赢 B:第几轮B:第几场B:1为ID1赢, 2为ID2赢 */
	public CG_BUY_WIN(turn: number, index: number, sides: number): void {
		var bates = this.getBytes();
		bates.writeByte(turn);
		bates.writeByte(index);
		bates.writeByte(sides);
		this.sendSocket(2103, bates);
	}
	/**2105 CG 观看比赛 B: 第几轮B:第几场 */
	public CG_LOOK_BATTLE(ply: Vo_CrossWarsPly): void {
		var bates = this.getBytes();
		bates.writeByte(ply.turn);
		bates.writeByte(ply.index);
		this.sendSocket(2105, bates);
		Model_CrossWars.battleTurn = ply.turn + 1;
		Model_CrossWars.battleRes = ply.battleRes == 1 ? 2 : 1;
	}
	/**2109 CG 打开名人堂 */
	public CG_OPEN_WINERS(): void {
		var bates = this.getBytes();
		this.sendSocket(2109, bates);
	}
	/**2111 CG 膜拜 */
	public CG_MOBAI(): void {
		var bates = this.getBytes();
		this.sendSocket(2111, bates);
	}
	/**2113 CG 获取冠军奖励 */
	public CG_GET_FRIST(): void {
		var bates = this.getBytes();
		this.sendSocket(2113, bates);
	}
	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(2100, this.GC_NOTICE, this);
		mgr.regHand(2102, this.GC_BATTLE_INFOS, this);
		mgr.regHand(2104, this.GC_BUY_WIN, this);
		mgr.regHand(2106, this.GC_LOOK_BATTLE, this);
		mgr.regHand(2110, this.GC_OPEN_WINERS, this);
		mgr.regHand(2112, this.GC_MOBAI, this);
		mgr.regHand(2114, this.GC_GET_FRIST, this);
	}
	public static actStatus = 0;//活动状态
	public static actTurn = 0;//进场进度
	public static actPeriod = 0;// 1：准备阶段 2：战斗阶段
	public static matchPlyArr: Array<Array<Vo_CrossWarsPly>> = [];
	public static matchPlyObj: any = {};
	public static battleOpp1: Vo_Player
	public static battleRes1: any
	public static battleOpp2: Vo_Player
	public static battleRes2: any
	public static battleRes: number;
	public static battleTurn: number = 0;

	public static winMobai: number = 1;//名人堂膜拜
	public static winReward: number = 0;////名人堂 奖励领取
	public static winPlyArr: Vo_CrossWarsPly[] = [];//名人堂

	public static hasData = false;//开打过一次界面有红点数据

	//GC 活动状态通知 B: 0未开始1开始中B:进场进度 1十六强2八强3四强4决赛 B: 1：准备阶段 2：战斗阶段
	private GC_NOTICE(self: Model_CrossWars, data: BaseBytes): void {
		Model_CrossWars.actStatus = data.readByte();
		Model_CrossWars.actTurn = data.readByte();
		Model_CrossWars.actPeriod = data.readByte();
		Model_CrossWars.battleTurn = 0;
		GGlobal.control.notify(Enum_MsgType.CROSSWARS_OPEN_UI)
		GGlobal.control.notify(Enum_MsgType.CROSSWARS_CHECK_NOTICE)
		GGlobal.control.notify(Enum_MsgType.CROSSWARS_STATUS_CHANGE)
	}

	//GC 比赛战况 [B:轮数0-4B: 场数0-8L: 对手hid1L:对手hid2U: 对手姓名name1U:对手姓名name2I: job1I:job2I: weap1I:weap2L: str1L:str2B: win战斗结果0未有结果, 1为ID1赢, 2为ID2赢B:buywin买输赢情况0没有买, 1为ID1赢, 2为ID2赢]
	private GC_BATTLE_INFOS(self: Model_CrossWars, data: BaseBytes): void {
		var len = data.readShort();
		for (let i = 0; i < len; i++) {
			var ply = new Vo_CrossWarsPly();
			ply.readMsg(data);
			if (Model_CrossWars.matchPlyArr[ply.turn] == null) {
				Model_CrossWars.matchPlyArr[ply.turn] = [];
			}
			Model_CrossWars.matchPlyArr[ply.turn][ply.index] = ply;
			Model_CrossWars.matchPlyObj[ply.hid1] = ply
			Model_CrossWars.matchPlyObj[ply.hid2] = ply
		}
		GGlobal.control.notify(Enum_MsgType.CROSSWARS_OPEN_UI)
	}

	//GC 购买输赢返回 B: 0成功 1失败 2已结购买了 3不能购买B:第几轮B: 第几场B:1为ID1赢, 2为ID2赢
	private GC_BUY_WIN(self: Model_CrossWars, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			var turn = data.readByte();
			var index = data.readByte();
			var sides = data.readByte();
			var ply: Vo_CrossWarsPly = null;
			if (Model_CrossWars.matchPlyArr[turn - 1]) {
				ply = Model_CrossWars.matchPlyArr[turn - 1][index];
			}
			if (ply) {
				ply.buywin = sides
				GGlobal.control.notify(Enum_MsgType.CROSSWARS_BUY_WIN)
			}
		} else if (result == 1) {
			ViewCommonWarn.text("押注失败")
		} else if (result == 2) {
			ViewCommonWarn.text("已押注了")
		} else if (result == 3) {
			ViewCommonWarn.text("不能押注")
		} else {
			ViewCommonWarn.text("押注失败")
		}
	}

	//GC 战斗情况 [L:选手id[I:属性keyL:属性数值][B:技能位置I: 技能idI:技能等级]]
	private GC_LOOK_BATTLE(self: Model_CrossWars, data: BaseBytes): void {
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id = data.readLong();
			let batPly: Vo_Player = GGlobal.modelPlayer.playerDetailDic[id]
			// let batPly = new Vo_Player();
			// batPly.id = data.readLong();
			let ply: Vo_CrossWarsPly = Model_CrossWars.matchPlyObj[batPly.id]
			if (ply) {
				if (ply.hid1 == batPly.id) {
					batPly.job = ply.job1;
					batPly.weapon = ply.job1;
					batPly.name = ply.name1;
				} else {
					batPly.job = ply.job2;
					batPly.weapon = ply.job2;
					batPly.name = ply.name2;
				}
				batPly.setShiZhuang(batPly.job);
				// batPly.readBattleProperty(data);
				// batPly.parseOtherSkill(data);
				//解析无用消息
				let l1 = data.readShort();
				for (let j = 0; j < l1; j++) {
					data.readInt();
					data.readLong();
				}
				l1 = data.readShort();
				for (let j = 0; j < l1; j++) {
					data.readByte();
					data.readInt();
					data.readShort();
				}
				if (i == 0) {
					Model_CrossWars.battleOpp1 = batPly
					Model_CrossWars.battleRes1 = { head: ply.head1, frame: ply.frame1, jiangXian: ply.guanxian1, name: ply.name1, str: ply.power1 }
				} else {
					Model_CrossWars.battleOpp2 = batPly
					Model_CrossWars.battleRes2 = { head: ply.head2, frame: ply.frame2, jiangXian: ply.guanxian2, name: ply.name2, str: ply.power2 }
				}
			}
		}
		//找战斗结果
		for (let i = 0; i < Model_CrossWars.matchPlyArr.length; i++) {
			let plyArr = Model_CrossWars.matchPlyArr[i];
			let size = plyArr ? plyArr.length : 0;
			for (let j = 0; j < size; j++) {
				let macthPly: Vo_CrossWarsPly = plyArr[j];
				if (macthPly.hid1 == Model_CrossWars.battleOpp1.id && macthPly.hid2 == Model_CrossWars.battleOpp2.id) {
					Model_CrossWars.battleRes = macthPly.battleRes == 1 ? 2 : 1;
					break;
				}
				if (macthPly.hid1 == Model_CrossWars.battleOpp2.id && macthPly.hid2 == Model_CrossWars.battleOpp1.id) {
					Model_CrossWars.battleRes = macthPly.battleRes == 1 ? 2 : 1;
					break;
				}
			}
		}
		GGlobal.mapscene.enterScene(SceneCtrl.CROSS_WARS);
	}

	//GC 打开名人堂返回 [B:榜段位区间U: 名字L:战力I: jobI:weap武器id]B: 0没有膜拜1膜拜过了B:可以领取冠军数量
	private GC_OPEN_WINERS(self: Model_CrossWars, data: BaseBytes): void {
		var len = data.readShort();
		Model_CrossWars.winPlyArr = [];
		for (let i = 0; i < len; i++) {
			var ply = new Vo_CrossWarsPly();
			ply.readWinMsg(data);
			Model_CrossWars.winPlyArr.push(ply)
		}
		Model_CrossWars.winMobai = data.readByte();
		Model_CrossWars.winReward = data.readByte();
		GGlobal.control.notify(Enum_MsgType.CROSSWARS_OPEN_WINERS)
		GGlobal.control.notify(Enum_MsgType.CROSSWARS_CHECK_NOTICE)
	}

	//GC 膜拜返回 B: 0成功 1失败B:膜拜状态
	private GC_MOBAI(self: Model_CrossWars, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			Model_CrossWars.winMobai = data.readByte();
			GGlobal.control.notify(Enum_MsgType.CROSSWARS_OPEN_WINERS)
			GGlobal.control.notify(Enum_MsgType.CROSSWARS_CHECK_NOTICE)
		} else {
			ViewCommonWarn.text("膜拜失败")
		}
	}

	//GC 获取冠军奖励 B: 0成功 1失败B:剩余次数
	private GC_GET_FRIST(self: Model_CrossWars, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			Model_CrossWars.winReward = data.readByte();
			GGlobal.control.notify(Enum_MsgType.CROSSWARS_OPEN_WINERS)
			GGlobal.control.notify(Enum_MsgType.CROSSWARS_CHECK_NOTICE)
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}

	private static _rewardArr: Array<Array<any>>
	public static getRewardArr($zs: number): Array<any> {
		if (Model_CrossWars._rewardArr == null) {
			Model_CrossWars._rewardArr = [];
			for (let keys in Config.xxzb_233) {
				let id = Number(keys);
				let zs = Math.floor(id / 10) - 1
				let rew = id % 10 - 1
				if (Model_CrossWars._rewardArr[zs] == null) {
					Model_CrossWars._rewardArr[zs] = []
				}
				Model_CrossWars._rewardArr[zs][rew] = Config.xxzb_233[keys]
			}
		}
		return Model_CrossWars._rewardArr[$zs - 1];
	}


	// 1十六强2八强3四强4半决赛5决赛
	public static getTurnName(v): string {
		if (v == 1) {
			return "16强赛"
		} else if (v == 2) {
			return "8强赛"
		} else if (v == 3) {
			return "4强赛"
		} else if (v == 4) {
			return "决赛"
		} else {
			return "已结束";
		}
	}

	// 1十六强2八强3四强4半决赛5决赛
	public static getGroupName(v): string {
		if (v == 1) {
			return "A组"
		} else if (v == 2) {
			return "B组"
		} else if (v == 3) {
			return "C组"
		} else if (v == 4) {
			return "D组"
		} else {
			return "";
		}
	}

	public static checkNotice(): boolean {
		if (Model_CrossWars.actStatus == 1) {
			return true
		}
		if (Model_CrossWars.actStatus == 0) {
			if (Model_CrossWars.winReward > 0) {
				return true;
			}
			if (Model_CrossWars.winMobai == 0 && Model_CrossWars.winPlyArr.length > 0) {
				return true;
			}
		}
		return false;
	}

}