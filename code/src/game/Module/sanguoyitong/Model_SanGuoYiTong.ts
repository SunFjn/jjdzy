class Model_SanGuoYiTong extends BaseModel {
	public constructor() {
		super();
	}

	public state = 0;
	public times = 0;
	/**活动时间 */
	public activityTime = 0;
	/**刷新CD */
	public resCD = 0;
	public roleData = { id: 0, fashion: 0, name: "", power: 0, shouhun: 0 };
	public jifenArr = [];
	public monsterID = 0;
	public serverMonsterID = 0;
	/**5819	打开三国一统界面 */
	public CG_OPENUI_5819() {
		let ba = new BaseBytes();
		this.sendSocket(5819, ba);
	}

	/**5801 CG 进入三国一统 */
	public CG_ENTER_SCENE_5801() {
		let ba = new BaseBytes();
		this.sendSocket(5801, ba);
	}

	/**5803 CG 退出三国一 */
	public CG_EXIT_SCENE_5803() {
		let ba = new BaseBytes();
		this.sendSocket(5803, ba);
	}

	/**5805	CG采集宝箱 L:宝箱唯一id */
	public CG_YITONG_COLLECT_5805(id: number) {
		let ba = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(5805, ba);
	}

	/**5807	CG 终止采集 L:宝箱唯一id */
	public CG_YITONG_STOP_COLLECT_5807(id: number) {
		let ba = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(5807, ba);
	}

	/**5809	CG 采集成功获取奖励 L:宝箱唯一id */
	public CG_YITONG_COLLECT_RESULT_5809(id: number) {
		let ba = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(5809, ba);
	}

	/**5811	请求挑战怪物 L:怪物唯一id */
	public CG_YITONG_BATTLE_MONEST_5811(id: number) {
		let ba = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(5811, ba);
	}
	/**5813	CG 通知后端pve战斗结果获取奖励与否 L:怪物idB:0输了 1赢了 */
	public CG_YITONG_BATTLE_RESULT_5813(id: number, result) {
		let ba = new BaseBytes();
		ba.writeLong(id);
		ba.writeByte(id);
		this.sendSocket(5813, ba);
	}

	/**5815	CG 怼某个玩家 L:玩家id */
	public CG_YITONG_BATTLEPLAYER_5815(id: number) {
		let ba = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(5815, ba);
	}
	/**5825	GC 获取个人积分排行 个人奖励领取情况 B:0:个人积分排行 1个人奖励领取情况 */
	public CG_YITONG_ROLE_JIEFENRANK(type) {
		let ba = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(5825, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let self = this;
		self.socket = wsm;
		wsm.regHand(5820, self.GC_OPENUI_5820, self);
		wsm.regHand(5800, self.GC_SANGUO_YITONG_STATE_5800, self);
		wsm.regHand(5802, self.GC_ENTER_SCENE_5802, self);
		wsm.regHand(5804, self.GC_ENTER_SCENE_5804, self);
		wsm.regHand(5806, self.GC_YITONG_COLLECT_5806, self);
		wsm.regHand(5808, self.GC_YITONG_STOP_COLLECT_5808, self);
		wsm.regHand(5810, self.GC_YITONG_COLLECT_RESULT_5810, self);
		wsm.regHand(5812, self.GC_YITONG_BATTLE_MONEST_5812, self);
		wsm.regHand(5814, self.GC_YITONG_BATTLE_RESULT_5814, self);
		wsm.regHand(5816, self.GC_YITONG_BATTLEPLAYER_5816, self);
		wsm.regHand(5818, self.GC_YITONG_JIFEN_CHANGE_5818, self);
		wsm.regHand(5822, self.GC_YITONG_SCENEROLESTATE_CHANGE_5822, self);
		wsm.regHand(5824, self.GC_YITONG_ROLEJIFEN_CHANGE_5824, self);
		wsm.regHand(5826, self.GC_YITONG_RANK_5826, self);
		wsm.regHand(5828, self.GC_YITONG_REWARDDRAW_5828, self);
	}

	/**5828	GC 个人积分领取情况 [I:奖励索引B:奖励状态] */
	public GC_YITONG_REWARDDRAW_5828(self: Model_SanGuoYiTong, data: BaseBytes) {

	}

	/**5826	GC 个人排行 I:我的积分B:我的名次[U:名字B:国家分类I:积分] */
	public GC_YITONG_RANK_5826(self: Model_SanGuoYiTong, data: BaseBytes) {

	}

	/**5824	GC 玩家积分和积分奖励变化 I:本人积分I:奖励索引I:奖励状态 */
	public GC_YITONG_ROLEJIFEN_CHANGE_5824(self: Model_SanGuoYiTong, data: BaseBytes) {

	}

	/**5822	GC 地图上参与者/宝箱/怪物状态变化 [B:0参与者 1宝箱 2怪物L:唯一idB:状态 0无状态 1采集中/被采集中 2pvp/中被两人抢夺中 3pve中 4pvp抢到宝箱中 5重生保护罩] */
	public GC_YITONG_SCENEROLESTATE_CHANGE_5822(self: Model_SanGuoYiTong, data: BaseBytes) {
		
	}

	/**5818	GC 三个国家积分变化 I:魏国I:蜀国I:吴国 */
	public GC_YITONG_JIFEN_CHANGE_5818(self: Model_SanGuoYiTong, data: BaseBytes) {
		self.jifenArr = [data.readInt(), data.readInt(), data.readInt()];
		GGlobal.control.notify(UIConst.SANGUO_YITONG);
	}

	/**5816	GC 怼某个玩家返回 B:0开打 1对方正在战斗 2对方重生保护罩中 */
	public GC_YITONG_BATTLEPLAYER_5816(self: Model_SanGuoYiTong, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {

		} else if (result == 1) {
			ViewCommonWarn.text("对方正在战斗");
		} else if (result == 2) {
			ViewCommonWarn.text("对方重生保护罩中");
		}
	}

	/**5814	GC pve返回战斗结束界面 L:怪物唯一idB:0输了 1赢了[I:奖励类型I:系统idI:数量] */
	public GC_YITONG_BATTLE_RESULT_5814(self: Model_SanGuoYiTong, data: BaseBytes) {
		let monestID = data.readLong();
		let result = data.readByte();
		let rewardArr = ConfigHelp.parseItemListBa(data);
		SanGuoYTManager.battleEnd(result, rewardArr);
		SanGuoYTManager.enter();
	}

	/**5812	GC 请求挑战怪物返回 B:0成功 1失败 2怪物战斗中L:怪物唯一的id */
	public GC_YITONG_BATTLE_MONEST_5812(self: Model_SanGuoYiTong, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			self.serverMonsterID = data.readLong();
			let npc = GameUnitManager.findUnitByID(self.serverMonsterID) as ARPGNpc;
			self.monsterID = npc.cfgID;
			GGlobal.mapscene.enterScene(SceneCtrl.SANGUO_YITONG);
		}
	}

	/**5810	GC 获取宝箱奖励 B:0成功1失败 2采集时间未到L:箱子唯一id */
	public GC_YITONG_COLLECT_RESULT_5810(self: Model_SanGuoYiTong, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			ViewCommonWarn.text("采集成功");
		}
	}

	/**5808	GC 终止采集返回 B:0终止成功 1终止失败L:宝箱唯一id */
	public GC_YITONG_STOP_COLLECT_5808(self: Model_SanGuoYiTong, data: BaseBytes) {
		let state = data.readByte();
		if (state == 0) {
			let npcID = data.readLong();
			CollectManager.end();
		}
	}

	/**5806	GC 采集宝箱返回 B:0可以采集 1有1人采集战斗 2有两个人正在抢夺中L:采集双方id 0没有L:采集双方id 0没有 */
	public GC_YITONG_COLLECT_5806(self: Model_SanGuoYiTong, data: BaseBytes) {
		let state = data.readByte();
		if (state == 0) {
			let npcID = data.readLong();
			let npc = GameUnitManager.findUnit(npcID, UnitType.NPC) as ARPGNpc;
			CollectManager.begin(npc, 10000, Handler.create(self, self.collectHandler, [[npcID]], true));
		}
	}

	private collectHandler(data) {
		this.CG_YITONG_COLLECT_RESULT_5809(data[0]);
	}

	/**5804	GC 退出场景返回 B:0成功 1失败 */
	public GC_ENTER_SCENE_5804(self: Model_SanGuoYiTong, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			SanGuoYTManager.exite();
		}
	}

	/**5802	GC 进入三国一统返回 B:0成功 1失败 2已经在副本内（重登试试)I:魏国积分I:蜀国积分I:吴国积分I:活动时间I:宝箱刷新cd */
	public GC_ENTER_SCENE_5802(self: Model_SanGuoYiTong, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			self.jifenArr = [data.readInt(), data.readInt(), data.readInt()];
			self.activityTime = data.readInt();
			self.resCD = data.readInt();
			SanGuoYTManager.enter();
		}
	}

	/**5800 GC 通知前段活动状态 B:0没开 1开了 */
	public GC_SANGUO_YITONG_STATE_5800(self: Model_SanGuoYiTong, data: BaseBytes) {
		self.state = data.readByte();
	}

	/**5820	GC界面数据返回 L:玩家IDI:职业时装U:名字L:战力I:兽魂 I:活动结束剩余时间*/
	public GC_OPENUI_5820(self: Model_SanGuoYiTong, data: BaseBytes) {
		self.roleData = { id: 0, fashion: 0, name: "", power: 0, shouhun: 0 };
		self.roleData.id = data.readLong();
		self.roleData.fashion = data.readInt();
		self.roleData.name = data.readUTF();
		self.roleData.power = data.readLong();
		self.roleData.shouhun = data.readInt();
		self.times = data.readInt();
		GGlobal.control.notify(UIConst.SANGUO_YITONG);
	}
}