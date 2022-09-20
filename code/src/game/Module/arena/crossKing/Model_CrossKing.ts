class Model_CrossKing extends BaseModel {

	/**1861 CG申请面板数据（可以用于实时同步 1870返回） */
	public CG_OPENUI(): void {
		var bates = this.getBytes();
		this.sendSocket(1861, bates);
	}
	/**1863 购买挑战次数 */
	public CG_BUY_TIMES(count): void {
		var bates = this.getBytes();
		bates.writeByte(count)
		this.sendSocket(1863, bates);
	}
	/**1865 挑战对手 B:挑战类型1普通2晋级I:对手索引（1-4）L:对手id */
	public CG_CHALLENGE(type, index, id): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		bates.writeInt(index)
		bates.writeLong(id)
		this.sendSocket(1865, bates);
	}
	/**1869 CG 战斗结束通知后端 B:0失败 1胜利 */
	public CG_GET_BATTLE_REWARD(res): void {
		var bates = this.getBytes();
		bates.writeByte(res)
		this.sendSocket(1869, bates);
	}
	/**1871 CG 获取晋级对手信息 */
	public CG_GET_JING_JI(): void {
		var bates = this.getBytes();
		this.sendSocket(1871, bates);
	}
	/**1873 CG 换一批 返回（1862，1872） B:0普通换一批1晋级挑战换一批 */
	public CG_CHANGE_RANKS(type): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		this.sendSocket(1873, bates);
	}
	/**1875 CG 打开排行榜 B:段位 */
	public CG_OPEN_RANKS(type): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		this.sendSocket(1875, bates);
	}
	/**1877 CG 打开战报 */
	public CG_OPEN_HIS(): void {
		var bates = this.getBytes();
		this.sendSocket(1877, bates);
	}
	/**1879 打开积分奖励 */
	public CG_OPEN_REWARDS(): void {
		var bates = this.getBytes();
		this.sendSocket(1879, bates);
	}
	/**1881 CG 领取积分奖励 B:领取奖励 */
	public CG_GET_JF_REWARD(type): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		this.sendSocket(1881, bates);
	}
	/**1883  打开枭雄商店 */
	public CG_OPEN_STORE(): void {
		var bates = this.getBytes();
		this.sendSocket(1883, bates);
	}
	/**1885 购买乱世商城商品 B:商品id */
	public CG_BUY_ITEM(id): void {
		var bates = this.getBytes();
		bates.writeByte(id)
		this.sendSocket(1885, bates);
	}

	/**扫荡 L:扫荡玩家的id */
	public CG_SAO_DAN(id): void {
		var bates = this.getBytes();
		bates.writeLong(id)
		this.sendSocket(1893, bates);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(1860, this.GC_STATE, this);
		mgr.regHand(1862, this.GC_OPENUI, this);
		mgr.regHand(1864, this.GC_BUY_NUM, this);
		mgr.regHand(1866, this.GC_NOTICE, this);
		mgr.regHand(1868, this.GC_CHALLENGE, this);
		mgr.regHand(1870, this.GC_SEND_OWN_DATA, this);
		mgr.regHand(1872, this.GC_GET_JING_JI, this);
		mgr.regHand(1874, this.GC_CHANGE_RANKS, this);
		mgr.regHand(1876, this.GC_OPEN_RANKS, this);
		mgr.regHand(1878, this.GC_OPEN_HIS, this);
		mgr.regHand(1880, this.GC_OPEN_REWARDS, this);
		mgr.regHand(1882, this.GC_GET_JF_REWARD, this);
		mgr.regHand(1884, this.GC_OPEN_STORE, this);
		mgr.regHand(1886, this.GC_BUY_ITEM, this);
		mgr.regHand(1888, this.GC_NUM_CHARGE, this);
		mgr.regHand(1892, this.GC_REPORTTIP, this);
		mgr.regHand(1890, this.GC_REPORT_CONTENT, this);
		mgr.regHand(1894, this.GC_SAO_DAN_1894, this);
	}

	public static hasData: boolean = false;//登录屏蔽红点
	public static status: number = 0;//跨服王者状态 B:0未开启1开启2结束
	public static uiPlyArr: Array<Vo_CrossKingPly> = [];
	public static upPlyArr: Array<Vo_CrossKingPly> = [];//晋升挑战对手
	public static battleCount: number = 0;//挑战次数
	public static batBuyCount: number = 0;//购买挑战次数
	public static zsLevel: number = 0;//我的转生区间
	public static myGrade: number = 0;//我的段位
	public static myRank: number = 0;//我的排行
	public static myPower: number = 0;//我的战斗力
	public static myPoint: number = 0;//我的积分
	public static maxGrade: number = 0;//最高段位

	public static battleRes: number = 0;//战斗结果  1失败2成功0客户端判断
	public static battleType: number = 0;//战斗类型  1普通 2晋级
	public static battleIsNpc: boolean = false;//战斗对手是npc
	public static battleGrade: number = 0;//我的段位 战斗前
	public static battleOpp: Vo_Player;//战斗对手
	public static rankPlyArr: Array<Vo_CrossKingPly> = [];//排行榜
	public static reportArr: Array<Vo_CrossKingRep> = [];//战报
	public static pointRwd: Array<number> = [];

	public static storeArr: Array<any> = [];//商店
	public static storeCount: number = 0;//挑战次数

	public static ITEM_ID = 416016;

	//跨服王者状态 B:0未开启1开启2结束
	private GC_STATE(self: Model_CrossKing, data: BaseBytes): void {
		Model_CrossKing.status = data.readByte();
		if (Model_CrossKing.status == 1 && !Model_CrossKing.hasData) {
			GGlobal.modelCrossKing.CG_OPENUI();//开启了 没有数据
		}
		// GGlobal.control.notify(Enum_MsgType.CROSSKING_STATE_UPDATE)
		GGlobal.control.notify(Enum_MsgType.CROSSKING_CHECK_NOTICE)
	}

	//GC 打开ui信息 B:0成功 1失败[I:排名L:idU:名字L:战力B:是不是机器人0人物1npcI:武器模型I:人物模型（job）]rankers
	private GC_OPENUI(self: Model_CrossKing, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			var len = data.readShort();
			Model_CrossKing.uiPlyArr = [];
			for (let i = 0; i < len; i++) {
				var ply = new Vo_CrossKingPly();
				ply.index = i + 1;
				ply.readMsg(data);
				Model_CrossKing.uiPlyArr.push(ply)
			}
			GGlobal.control.notify(Enum_MsgType.CROSSKING_OPEN_UI)
		}
	}

	//GC 购买次数返回 B:0成功1货币不足2无购买次数B:剩余挑战次数B:已购买次数
	private GC_BUY_NUM(self: Model_CrossKing, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			Model_CrossKing.battleCount = data.readByte();
			Model_CrossKing.batBuyCount = data.readByte();
			GGlobal.control.notify(Enum_MsgType.CROSSKING_BUY_NUM)
			GGlobal.control.notify(Enum_MsgType.CROSSKING_CHECK_NOTICE)
			ViewCommonWarn.text("购买成功")
		} else if (result == 1) {
			ViewCommonWarn.text("货币不足")
		} else if (result == 2) {
			ViewCommonWarn.text("无购买次数")
		} else {
			ViewCommonWarn.text("购买失败")
		}
	}

	//GC 通知前段 B:0可以申请面板1赛季未开启2赛季已结束3未到可晋级排名4不在段位5对手不存在6对手已经改变7对方正在战斗8你正被人挑战9不能挑战自己10没挑战次数11晋级对手改变
	private GC_NOTICE(self: Model_CrossKing, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {

		} else if (result == 1) {
			ViewCommonWarn.text("赛季未开启")
		} else if (result == 2) {
			ViewCommonWarn.text("赛季已结束")
		} else if (result == 3) {
			ViewCommonWarn.text("未到可晋级排名")
		} else if (result == 4) {
			ViewCommonWarn.text("不在本段位")
		} else if (result == 5) {
			ViewCommonWarn.text("对手不存在")
		} else if (result == 6) {
			ViewCommonWarn.text("对手已经改变")
		} else if (result == 7) {
			ViewCommonWarn.text("对方正在战斗")
		} else if (result == 8) {
			ViewCommonWarn.text("你正被人挑战")
		} else if (result == 9) {
			ViewCommonWarn.text("不能挑战自己")
		} else if (result == 10) {
			ViewCommonWarn.text("没挑战次数")
		} else if (result == 11) {
			ViewCommonWarn.text("晋级对手改变")
		}
	}

	//GC 挑战返回 B:0开始挑战B:战斗后端结果0:失败1成功2以前端结果为准L:对手id[I:属性keyL:属性数值][B:技能位置I:技能idI:技能等级]
	private GC_CHALLENGE(self: Model_CrossKing, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			var battleRes = data.readByte();
			if (battleRes == 2) {
				Model_CrossKing.battleRes = 0;
			} else {
				Model_CrossKing.battleRes = battleRes == 0 ? 1 : 2;
			}
			let id = data.readLong();
			var batPly = GGlobal.modelPlayer.playerDetailDic[id]

			// var batPly = new Vo_Player();
			// batPly.id = data.readLong();
			// batPly.shouHun = data.readInt();
			var ply = self.findBattlePly(batPly.id, Model_CrossKing.uiPlyArr)
			if (ply) {
				Model_CrossKing.battleType = 1;
			} else {
				ply = self.findBattlePly(batPly.id, Model_CrossKing.upPlyArr)
				Model_CrossKing.battleType = 2;
			}
			if (ply) {
				// batPly.job = ply.job
				// batPly.weapon = ply.job
				// var herocfg = Config.hero_211[ply.job];
				// batPly.chongId = herocfg.chong;
				// batPly.pd = herocfg.pd;
				// batPly.heroName = herocfg.name;
				// batPly.body = ply.job;
				// batPly.setBody(ply.job);
				// batPly.name = ply.name;
				// batPly.readBattleProperty(data);
				// batPly.parseOtherSkill(data);
				Model_CrossKing.battleIsNpc = Boolean(ply.isNpc);
				Model_CrossKing.battleGrade = Model_CrossKing.myGrade;
				if (ply.isNpc) {
					batPly.id = ply.npcId
				}
				Model_CrossKing.battleOpp = batPly
				GGlobal.mapscene.enterScene(SceneCtrl.CROSS_KING);
			} else {
				ViewCommonWarn.text("没找到对手数据");
			}
		} else {
			ViewCommonWarn.text("挑战失败");
		}
	}

	private findBattlePly(sid: number, battlePlyArr: Array<Vo_CrossKingPly>): Vo_CrossKingPly {
		for (let i = 0; i < battlePlyArr.length; i++) {
			var ply = battlePlyArr[i];
			if (ply.sid == sid) {
				return ply;
			}
		}
		return null
	}

	//GC 个人信息 B:我的转生区间B:我的段位B:本届最高段位I:我的排名B:剩余挑战次数B:已经购买次数I:积分L:战力[B:indexB:state 012]积分奖励情况
	private GC_SEND_OWN_DATA(self: Model_CrossKing, data: BaseBytes): void {
		Model_CrossKing.zsLevel = data.readByte()
		Model_CrossKing.myGrade = data.readByte()
		Model_CrossKing.maxGrade = data.readByte()
		Model_CrossKing.myRank = data.readInt()
		Model_CrossKing.battleCount = data.readByte()
		Model_CrossKing.batBuyCount = data.readByte()
		Model_CrossKing.myPoint = data.readInt()
		Model_CrossKing.myPower = data.readLong()
		var len = data.readShort();
		for (let i = 0; i < len; i++) {
			var index = data.readByte();
			var status = data.readByte();
			Model_CrossKing.pointRwd[index] = status;
		}
		Model_CrossKing.hasData = true;
		GGlobal.control.notify(Enum_MsgType.CROSSKING_OPEN_UI)
		GGlobal.control.notify(Enum_MsgType.CROSSKING_CHECK_NOTICE)
	}

	//GC 获取晋级对手信息返回 B:0获取成功1失败[I:排名L:玩家idU:名字L:战力B:是不是机器人0人物1npcI:武器模型I:人物模型]晋级对手信息
	private GC_GET_JING_JI(self: Model_CrossKing, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			var len = data.readShort();
			Model_CrossKing.upPlyArr = [];
			for (let i = 0; i < len; i++) {
				var ply = new Vo_CrossKingPly();
				ply.readMsg(data);
				ply.index = i + 1;
				Model_CrossKing.upPlyArr.push(ply);
			}
			GGlobal.control.notify(Enum_MsgType.CROSSKING_UP_PLY)
		} else {
			ViewCommonWarn.text("获取晋级对手信息失败")
		}
	}

	//GC 换一批返回 B:0成功1失败
	private GC_CHANGE_RANKS(self: Model_CrossKing, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
		} else {
			ViewCommonWarn.text("换一批失败")
		}
	}

	//GC 排行榜 B:段位[L:玩家idU:玩家名字]玩家信息
	private GC_OPEN_RANKS(self: Model_CrossKing, data: BaseBytes): void {
		var rank = data.readByte();
		var len = data.readShort();
		Model_CrossKing.rankPlyArr = []
		for (let i = 0; i < len; i++) {
			var rankPly = new Vo_CrossKingPly();
			rankPly.readMsgRank(data);
			rankPly.rank = i + 1;
			Model_CrossKing.rankPlyArr.push(rankPly);
		}
		GGlobal.control.notify(Enum_MsgType.CROSSKING_RANK_ARR)
	}

	//GC 历史记录 [B:战斗结果0失败1成功U:对手名字B:排名 0不变1上升下降B:是否晋级 1晋级2掉级]
	private GC_OPEN_HIS(self: Model_CrossKing, data: BaseBytes): void {
		var len = data.readShort();
		Model_CrossKing.reportArr = []
		for (let i = 0; i < len; i++) {
			var repVo = new Vo_CrossKingRep();
			repVo.readMsg(data);
			Model_CrossKing.reportArr.push(repVo)
		}
		GGlobal.control.notify(Enum_MsgType.CROSSKING_REPORT_ARR)
	}

	//GC 奖励领取情况 [B:indexB:0没有领取 1可领取2已领取]
	private GC_OPEN_REWARDS(self: Model_CrossKing, data: BaseBytes): void {
		var len = data.readShort();
		for (let i = 0; i < len; i++) {
			var index = data.readByte();
			var status = data.readByte();
			Model_CrossKing.pointRwd[index] = status;
		}
		GGlobal.control.notify(Enum_MsgType.CROSSKING_POINT_REWARD)
	}

	//GC 宝箱状态变化 B:宝箱序号B:宝箱状态
	private GC_GET_JF_REWARD(self: Model_CrossKing, data: BaseBytes): void {
		var index = data.readByte();
		var status = data.readByte();
		Model_CrossKing.pointRwd[index] = status;
		GGlobal.control.notify(Enum_MsgType.CROSSKING_POINT_REWARD)
		GGlobal.control.notify(Enum_MsgType.CROSSKING_CHECK_NOTICE)
	}
	//打开乱世商城 I:挑战次数[B:商品idB:购买状态 0没有购买 1可购买 2不可购买]
	private GC_OPEN_STORE(self: Model_CrossKing, data: BaseBytes): void {
		Model_CrossKing.storeCount = data.readInt();
		let len = data.readShort();
		Model_CrossKing.storeArr = [];
		for (let i = 0; i < len; i++) {
			let id = data.readByte();
			let status = data.readByte();
			let v = { id: id, status: status };
			Model_CrossKing.storeArr.push(v);
		}
		GGlobal.control.notify(Enum_MsgType.CROSSKING_OPEN_STORE)
		GGlobal.control.notify(Enum_MsgType.CROSSKING_CHECK_NOTICE)
	}

	//购买返回 B:商品idB:购买成功与否0成功 1失败
	private GC_BUY_ITEM(self: Model_CrossKing, data: BaseBytes): void {
		var id = data.readByte();
		var res = data.readByte();
		if (res == 0) {
			let a = Model_CrossKing.storeArr
			for (let i = 0; i < a.length; i++) {
				if (a[i].id == id) {
					a[i].status = 2;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.CROSSKING_OPEN_STORE)
			GGlobal.control.notify(Enum_MsgType.CROSSKING_CHECK_NOTICE)
		} else {
			ViewCommonWarn.text("购买失败")
		}
	}

	private GC_NUM_CHARGE(self: Model_CrossKing, data: BaseBytes): void {
		Model_CrossKing.storeCount = data.readInt();
		GGlobal.control.notify(Enum_MsgType.CROSSKING_OPEN_STORE)
		GGlobal.control.notify(Enum_MsgType.CROSSKING_CHECK_NOTICE)
	}

	private GC_REPORTTIP(self: Model_CrossKing, data: BaseBytes): void {
		GGlobal.mainUICtr.addReportBTN(UIConst.CROSS_KING);
	}

	public CG_REPORT_CONTENT() {
		this.sendSocket(1889, this.getBytes());
	}

	private GC_REPORT_CONTENT(self: Model_CrossKing, data: BaseBytes): void {
		let name = data.readUTF();
		ViewAlert.show("<font color='#33dd33'>" + name + "</font>战胜了您，段位下降", null, ViewAlert.OK);
	}
	//扫荡 B:0未达乱世枭雄段位 1不能扫荡自己 2没有挑战次数 3只能扫荡排行低于自己的 4成功I: 成功发送剩余次数 失败则为0
	private GC_SAO_DAN_1894(self: Model_CrossKing, data: BaseBytes): void {
		let res = data.readByte();
		if (res == 4) {
			Model_CrossKing.battleCount = data.readInt();
			GGlobal.control.notify(Enum_MsgType.CROSSKING_BUY_NUM)
		} else if (res == 0) {
			ViewCommonWarn.text("未达乱世枭雄段位")
		} else if (res == 1) {
			ViewCommonWarn.text("不能扫荡自己")
		} else if (res == 2) {
			ViewCommonWarn.text("没有挑战次数")
		} else if (res == 3) {
			ViewCommonWarn.text("只能扫荡排行低于自己的")
		}
	}



	private static _pointRewardArr: Array<any>
	public static get pointRewardArr(): Array<any> {
		if (Model_CrossKing._pointRewardArr == null) {
			Model_CrossKing._pointRewardArr = [];
			for (let keys in Config.lsxxbp_232) {
				Model_CrossKing._pointRewardArr.push(Config.lsxxbp_232[keys])
			}
		}
		return Model_CrossKing._pointRewardArr;
	}

	private static _rewardArr: Array<any>
	public static get rewardArr(): Array<any> {
		if (Model_CrossKing._rewardArr == null) {
			Model_CrossKing._rewardArr = [];
			for (let keys in Config.lsxx_232) {
				Model_CrossKing._rewardArr.push(Config.lsxx_232[keys]);
			}
		}
		return Model_CrossKing._rewardArr;
	}

	public static checkStore(): boolean {
		let a = Model_CrossKing.storeArr
		for (let i = 0; i < a.length; i++) {
			let v = a[i];
			if (v.status == 1) {
				return true;
			}
			if (v.status == 0) {
				let cfg = Config.lsxxstore_232[v.id]
				if (Model_CrossKing.storeCount >= cfg.time) {
					return true;
				}
			}
		}
		return false;
	}

	public static checkReward(): boolean {
		for (let i = 0; i < Model_CrossKing.pointRwd.length; i++) {
			if (Model_CrossKing.pointRwd[i] && Model_CrossKing.pointRwd[i] == 1) {
				return true;
			}
		}
		return false;
	}

	public static checkNotice(): boolean {
		if (Model_CrossKing.checkReward()) {
			return true;
		}
		if (Model_CrossKing.status == 1 && Model_CrossKing.battleCount > 0) {
			return true;
		}
		if (Model_CrossKing.checkStore()) {
			return true;
		}
		return false;
	}

	public static onAdd(): void {
		// var BATTLE_MAX = ConfigHelp.getSystemNum(2205)
		// if (Model_CrossKing.battleCount > BATTLE_MAX) {
		// 	ViewCommonWarn.text("挑战次数已达上限")
		// 	return;
		// }
		const cfg = GGlobal.modelvip.getCfgByVip(Model_player.voMine.viplv);
		const vipAddCnt = cfg.LSXX;
		const lastBuy = ConfigHelp.getSystemNum(2203) + vipAddCnt - Model_CrossKing.batBuyCount;
		if (lastBuy <= 0) {
			ViewCommonWarn.text("已达购买上限");
			return;
		}
		var cost = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2204))[0][2];
		// const battleMax = BATTLE_MAX - Model_CrossKing.battleCount
		ViewAlertBuy.show(cost, lastBuy, lastBuy, "", Handler.create(null, Model_CrossKing.okHandle));
	}

	private static okHandle(count): void {
		var cost = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2204))[0][2]
		if (Model_player.voMine.yuanbao < Number(cost) * count) {
			ModelChongZhi.guideToRecharge()
			return;
		}
		// var BATTLE_MAX = ConfigHelp.getSystemNum(2205)
		// if (Model_CrossKing.battleCount + count > BATTLE_MAX) {
		// 	ViewCommonWarn.text("挑战次数已达上限")
		// 	return;
		// }
		const cfg = GGlobal.modelvip.getCfgByVip(Model_player.voMine.viplv);
		const vipAddCnt = cfg.LSXX;
		var lastBuy = ConfigHelp.getSystemNum(2203) + vipAddCnt - Model_CrossKing.batBuyCount;
		if (count > lastBuy) {
			ViewCommonWarn.text("购买次数不足")
			return;
		}
		GGlobal.modelCrossKing.CG_BUY_TIMES(count);
	}
}