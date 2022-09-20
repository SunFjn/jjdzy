class Model_Syzlb extends BaseModel {

	public constructor() {
		super();
	}

	public static openui = "openui"
	public static room_data = "room_data"
	public static teamui = "teamui"//我的队伍
	public static leaderCge = "leaderCge"//队长改变
	public static msg_invite = "msg_invite"
	//三英战吕布 挑战令
	public static ITEM_BATCT = 410410
	//战斗
	public static readonly msg_datas_hurt = "msg_datas_hurt";
	public static readonly msg_datas_hp = "msg_datas_hp";
	public static readonly msg_datas_dead = "msg_datas_dead";
	public static readonly msg_relive = "msg_relive"//复活
	// public static readonly msg_relive_fail = "msg_relive_fail"//复活

	// public static bossMaxHP: number;
	public static bossHP: number;
	// public static myHurt: number;
	public static hpArr = [];
	public static batIng = false;//战斗中
	// public static arpgIng = false;//场景中
	public batId = 0//战斗地图
	public batResult

	public batCt: number = 0;//可挑战次数
	public batBuy: number = 0;//已购买挑战次数
	public hard: number = 0;//已开启的难度 普通2困难 3地狱 4恶魔
	public get batBuyCost() {
		let v = Config.sycs_762[this.batBuy + 1]
		if (v) {
			return Number(JSON.parse(v.xh)[0][2]);
		}
		return 0;
	}
	public get batBuyMaxCt() {
		let maxCt = 0;
		for (let k in Config.sycs_762) {
			maxCt++;
		}
		return maxCt
	}
	public teamMyArr: Vo_Syzlb[] = []//我的队伍
	public teamHard: number = 0//我的队伍难度
	public teamJoinArr: Vo_Syzlb[] = []//可加入队伍

	//打开界面
	public CG_OPENUI(): void {
		var bates = this.getBytes();
		this.sendSocket(9771, bates);
	}
	//创建队伍
	public CG_CREATE_TEAM(hard): void {
		var bates = this.getBytes();
		bates.writeByte(hard)
		this.sendSocket(9773, bates);
	}

	//踢出队伍 L: 被踢玩家id
	public CG_KICK_OUT(plyId): void {
		var bates = this.getBytes();
		bates.writeLong(plyId)
		this.sendSocket(9775, bates);
	}

	//邀请组队
	public CG_BROADCAST_INVITE(): void {
		var bates = this.getBytes();
		this.sendSocket(9777, bates);
	}

	//离开队伍
	public CG_LEAVE_TEAM(): void {
		var bates = this.getBytes();
		this.sendSocket(9779, bates);
		this.CG_OPENUI()
	}

	//加入队伍 I: 队伍id
	public CG_JOIN_BY_TEAMID(id): void {
		var bates = this.getBytes();
		bates.writeInt(id)
		this.sendSocket(9781, bates);
	}

	//开始挑战（进第一个地图）
	public CG_CHALLENGE(): void {
		var bates = this.getBytes();
		this.sendSocket(9783, bates);
	}

	//进入下一关（跳转地图）
	public CG_ENTER_NEXT(): void {
		var bates = this.getBytes();
		this.sendSocket(9785, bates);
	}

	//复活
	public CG_RELIVE(): void {
		var bates = this.getBytes();
		this.sendSocket(9787, bates);
	}

	//退出挑战（副本）
	public CG_EXIT_CHA(): void {
		var bates = this.getBytes();
		this.sendSocket(9789, bates);
	}

	//点击boss挑战
	public CG_CHA_BOSS(): void {
		var bates = this.getBytes();
		this.sendSocket(9791, bates);
	}
	//转让队长 L:队员id
	public CG_CGE_LEADER(pId): void {
		var bates = this.getBytes();
		bates.writeLong(pId);
		this.sendSocket(9803, bates);
	}

	//购买挑战次数 B:购买次数
	public CG_BUY_CHA_NUM(num): void {
		var bates = this.getBytes();
		bates.writeByte(num);
		this.sendSocket(9805, bates);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(9772, this.GC_OPENUI9772, this);
		mgr.regHand(9774, this.GC_CREATE_TEAM9774, this);
		mgr.regHand(9776, this.GC_KICK_OUT9776, this);
		mgr.regHand(9778, this.GC_BROADCAST_INVITE9778, this);
		mgr.regHand(9780, this.GC_LEAVE_TEAM9780, this);
		mgr.regHand(9782, this.GC_JOIN_BY_TEAMID9782, this);
		mgr.regHand(9784, this.GC_CHALLENGE9784, this);
		mgr.regHand(9786, this.GC_ENTER_NEXT9786, this);
		mgr.regHand(9788, this.GC_RELIVE9788, this);
		mgr.regHand(9790, this.GC_EXIT_CHA9790, this);
		mgr.regHand(9792, this.GC_CHA_BOSS9792, this);
		mgr.regHand(9794, this.GC_FIGHT_RESULT9794, this);
		mgr.regHand(9796, this.GC_DEAD9796, this);
		mgr.regHand(9798, this.GC_NOTICE_RELIVE9798, this);
		mgr.regHand(9800, this.GC_REFLASH_TEAM_HP_9800, this);
		mgr.regHand(9802, this.GC_REFLASH_SCENE_9802, this);
		mgr.regHand(9804, this.GC_CGE_LEADER9804, this);
		mgr.regHand(9806, this.GC_BUY_CHA_NUM9806, this);
	}

	//返回界面信息 I:挑战次数[U:队长名I:队伍idI:头像idI:头像框idB:队伍人数]队伍数据
	private GC_OPENUI9772(self: Model_Syzlb, data: BaseBytes): void {
		self.batCt = data.readInt();
		self.batBuy = data.readInt();
		self.hard = data.readByte();
		let len = data.readShort();
		self.teamJoinArr = []
		for (let i = 0; i < len; i++) {
			let ply: Vo_Syzlb = new Vo_Syzlb();
			ply.readMsgJoin(data);
			self.teamJoinArr.push(ply);
		}
		self.notify(Model_Syzlb.openui)

		self.checkRed()
	}

	private checkRed() {
		let s = this
		let itemCt = Model_Bag.getItemCount(Model_Syzlb.ITEM_BATCT)
		GGlobal.reddot.setCondition(UIConst.SYZLB, 0, s.batCt > 0 || itemCt > 0);
		GGlobal.reddot.notify(UIConst.SYZLB);
	}

	//创建队伍结果 B:结果：0：失败，1：成功，2：刷新队伍数据I: 失败：1：已经有队伍，2：已无挑战次数，(成功, 刷新) ：队伍id[B:类型 1队长 2队员U: 队员名字 L: 队员idI: 队员头像 I: 队员头像框 I: 队员等级L: 队员战力]队伍数据
	private GC_CREATE_TEAM9774(self: Model_Syzlb, data: BaseBytes): void {
		let res = data.readByte();
		let resTy = data.readInt();
		self.teamHard = data.readByte();
		if (res == 1 || res == 2) {
			let leaderPre = 0;
			let leaderNow = 0;
			for (let i = 0; i < self.teamMyArr.length; i++) {
				let v = self.teamMyArr[i]
				if (v.type == 1) {
					leaderPre = v.pId;
					break;
				}
			}
			let len = data.readShort();
			self.teamMyArr = []
			for (let i = 0; i < len; i++) {
				let ply: Vo_Syzlb = new Vo_Syzlb();
				ply.readMsgTeam(data);
				self.teamMyArr.push(ply);
				if (ply.type == 1) {
					leaderNow = ply.pId;
				}
			}
			self.notify(Model_Syzlb.teamui)
			//队长改变
			if (leaderPre > 0 && leaderNow > 0 && leaderPre != leaderNow) {
				self.notify(Model_Syzlb.leaderCge)
			}
		}
		else {
			ViewCommonWarn.text(["已经有队伍", "已无挑战次数", "未开启该难度"][resTy - 1])
		}
	}

	//踢出结果 B:0：失败，1：成功B:失败：（1：没在队伍中, 2：队伍缓存异常，3：你不是队长，4：该队员不存在），成功（1：踢出成功，2：你被踢出队伍）
	private GC_KICK_OUT9776(self: Model_Syzlb, data: BaseBytes): void {
		const res = data.readByte();
		let resTy = data.readByte();
		if (res == 1) {
			if (resTy == 1) {
				ViewCommonWarn.text("踢出成功")
			} else if (resTy == 2) {
				ViewCommonWarn.text("你被踢出队伍")
				self.teamMyArr = []
				self.notify(Model_LiuChuQS.teamui);
			}
		} else {
			ViewCommonWarn.text(["没在队伍中", "队伍缓存异常", "你不是队长", "该队员不存在"][resTy - 1]);
		}
	}

	//邀请组队结果 B:结果：0：失败，1：成功B:失败（1:你没在队伍中,2:队伍数据异常,3:你不是队长,4:队员已满）
	private GC_BROADCAST_INVITE9778(self: Model_Syzlb, data: BaseBytes): void {
		let res = data.readByte();
		let resTy = data.readByte();
		if (res == 1) {
			self.notify(Model_Syzlb.msg_invite, 10);
		} else {
			ViewCommonWarn.text(["你没在队伍中", "队伍数据异常", "你不是队长", "队员已满"][resTy - 1])
		}
	}

	//离开结果返回 B:结果：0：失败，1：成功B:失败：（1：你没在队伍中，2：队伍数据异常，3：你在其他队伍）
	private GC_LEAVE_TEAM9780(self: Model_Syzlb, data: BaseBytes): void {
		let res = data.readByte();
		let resTy = data.readByte();
		self.teamMyArr = []
		self.notify(Model_Syzlb.teamui);
		if (res == 1) {

		} else {
			ViewCommonWarn.text(["你没在队伍中", "队伍数据异常", "你在其他队伍"][resTy - 1])
		}
	}

	//加入队伍结果 B: 结果：0：失败，1：成功B: 失败（1：今日已无挑战次数，2：你已经有队伍，不能重复加入，3：队伍不存在，4：队伍已满，5：队伍已进入战斗，无法加入）
	private GC_JOIN_BY_TEAMID9782(self: Model_Syzlb, data: BaseBytes): void {
		let res = data.readByte();
		let resTy = data.readByte();
		if (res == 1) {
			if (GGlobal.layerMgr.isOpenView(UIConst.CHAT)) {
				GGlobal.layerMgr.close2(UIConst.CHAT);
			}
			if (Number(self.joinTeamId) > 0 && !GGlobal.layerMgr.isOpenView(UIConst.SYZLB)) {
				GGlobal.layerMgr.open(UIConst.SYZLB)
			}
		} else {
			ViewCommonWarn.text(["今日已无挑战次数", "你已经有队伍", "队伍不存在", "队伍已满", "队伍已进入战斗，无法加入", "未解锁该难度"][resTy - 1])
			if (resTy == 3) {//刷新队伍
				self.CG_OPENUI();
			}
		}
		self.joinTeamId = 0
	}

	//请求挑战结果 B:结果：0：失败，1：成功I:失败（1：没有队伍，2：不是队长），成功：关卡id
	private GC_CHALLENGE9784(self: Model_Syzlb, data: BaseBytes): void {
		let res = data.readByte();
		let resTy = data.readInt();
		if (res == 1) {
			if (self.teamMyArr.length == 0) {
				ViewCommonWarn.text("没有队伍信息")
				return;//已经退出
			}
			self.enter()//放最前面
			self.batId = resTy;
			let cfg = Config.syzlb_762[resTy]
			let isLeader = self.isLeader();
			ModelArpgMap.getInstance().isServerControlMap = false;
			ARPGMapManager.enter(cfg.dt2, UIConst.SYZLB, false, false, isLeader);
			GGlobal.layerMgr.open(UIConst.SYZLB_REW)
			GGlobal.layerMgr.open(UIConst.SYZLB_INFO)

		} else {
			ModelArpgMap.getInstance().isServerControlMap = true;
			ViewCommonWarn.text(["没有队伍", "不是队长"][resTy - 1])
		}
	}

	enter() {
		let s = this;
		Model_Syzlb.batIng = true
		ModelArpgMap.registerMoveBack(UIConst.SYZLB, new Handler(s, s.autoRun));
		GGlobal.model_Syzlb.listen(Model_Syzlb.leaderCge, s.upLeader, s);
		ModelArpgMap.getInstance().listen(Enum_MsgType.ARPG_SCENE_ADD_PLAYER, s.updatePlayer, s);
		GGlobal.socketMgr.registerReconnectHD("Model_Syzlb", Handler.create(this, this.onSocketClose));
	}

	exite() {
		let s = this;
		Model_Syzlb.hpArr.length = 0
		Model_Syzlb.batIng = false
		ModelArpgMap.getInstance().isAutoExite = true;
		ModelArpgMap.moveEnable = true;
		Model_Syzlb.hpCur = {}
		ModelArpgMap.removeMoveBack(UIConst.SYZLB);
		GGlobal.model_Syzlb.remove(Model_Syzlb.leaderCge, s.upLeader, s);
		ModelArpgMap.getInstance().remove(Enum_MsgType.ARPG_SCENE_ADD_PLAYER, s.updatePlayer, s);
		GGlobal.socketMgr.removeReconnectHD("Model_Syzlb");
		ArpgMap.getInstance().clearIgnoreId()
		//
		let vomine = Model_player.voMine;
		let role: SceneCharRole = vomine.sceneChar;
		if (role) {
			role.curhp = role.maxhp;
		}
	}

	private onSocketClose() {
		let s = this
		s.exite();
		s.teamMyArr = []
		GGlobal.layerMgr.close2(UIConst.SYZLB_REW);
		GGlobal.layerMgr.close2(UIConst.SYZLB_INFO);
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		console.log("掉线 三英战吕布离开");
	}

	private upLeader() {
		let m = this
		if (m.isLeader()) {
			ModelArpgMap.moveEnable = true;
		} else {
			ModelArpgMap.moveEnable = false;
		}
		for (let i = 0; i < this.teamMyArr.length; i++) {
			let v = this.teamMyArr[i];
			if (v.type == 1) {
				ViewCommonWarn.text(v.name + "成为新队长");
				break;
			}
		}
	}

	private isLeader(): boolean {
		let isLeader = false;
		for (let i = 0; i < this.teamMyArr.length; i++) {
			let v = this.teamMyArr[i];
			if (v.type == 1 && v.pId == Model_player.voMine.id) {
				isLeader = true;
				break;
			}
		}
		return isLeader
	}
	public static hpCur = {}//记录当前血量  
	//问鼎天下有特殊的外显需求。
	private updatePlayer(id) {
		let role: ArpgRole = GameUnitManager.findUnitByID(id) as ArpgRole;
		if (role) {
			let max = 1
			let ply: Vo_Player
			if (id == Model_player.voMine.id) {
				ply = Model_player.voMine
				GameUnitManager.hero.setName(Model_player.voMine.name + ".S" + GGlobal.zone);
			} else {
				ply = GGlobal.modelPlayer.playerDetailDic[id]
			}
			max = ply.hp
			let hp = 0
			if (Model_Syzlb.hpCur[id] != undefined) {
				hp = Model_Syzlb.hpCur[id]
			} else {//找不到  初始化最大
				hp = max
			}
			role.vo.maxHp = max
			role.vo.hp = hp
			ply.currentHp = hp

			ArpgMap.getInstance().addIgnoreId(id)
		}
	}

	private autoRun(obj) {
		let arpg: ArpgRole = obj.role
		let route: Array<any> = obj.r
		let s = this
		if (route.length == 0) return;
		for (let i = 0; i < s.teamMyArr.length; i++) {
			let v = s.teamMyArr[i];
			// let t = v.type == 1 ? 0 : 1000;
			//复制数组
			let r = [];
			for (let m = 0; m < route.length; m++) {
				r[m] = []
				for (let n = 0; n < route[m].length; n++) {
					r[m][n] = route[m][n];
				}
			}
			// let r = route
			if (Model_player.voMine.id == v.pId) {
				if (v.type == 1) continue;//是自己是队长
				var hero: ARPGHero = GameUnitManager.hero;

				//随机范围在周边
				let rndX = 30 + Math.floor(Math.random() * 100)
				let rndY = 30 + Math.floor(Math.random() * 100)
				r[r.length - 1][0] += rndX;
				r[r.length - 1][1] += rndY;
				//自己随机一个范围
				hero.go(r[r.length - 1][0], r[r.length - 1][1]);
			} else {
				let role: ArpgRole = GameUnitManager.findUnit(v.pId, UnitType.PLAYER) as ArpgRole;
				if (role && role.id == arpg.id) {
					role.setRoute(r);
				}
			}
		}
	}

	private GC_ENTER_NEXT9786(self: Model_Syzlb, data: BaseBytes) {
		self.GC_CHALLENGE9784(self, data);
	}

	//复活结果返回 B: 结果：0：失败，1：成功B: 失败（1：已经复活，2：元宝不足，3：没有队伍）U: 玩家名
	private GC_RELIVE9788(self: Model_Syzlb, data: BaseBytes): void {
		let res = data.readByte();
		let resTy = data.readByte();
		let name = data.readUTF();
		if (res == 1) {
			self.notify(Model_Syzlb.msg_relive)
		} else {
			ViewCommonWarn.text([name + "已经复活队伍", "元宝不足", "没有队伍"][resTy - 1])
			if (resTy == 1) {
				self.notify(Model_Syzlb.msg_relive)
			} else {
				// self.notify(Model_Syzlb.msg_relive_fail)
			}
		}
	}

	//退出结果返回 B:结果：0：失败，1：成功B:失败（1：没有队伍）
	private GC_EXIT_CHA9790(self: Model_Syzlb, data: BaseBytes): void {
		let res = data.readByte();
		let resTy = data.readByte();
		if (res == 1) {

		} else {
			ViewCommonWarn.text(["没有队伍"][resTy - 1])
		}
		self.teamMyArr = []
		self.notify(Model_Syzlb.teamui);
		GGlobal.layerMgr.close2(UIConst.SYZLB_REW);
		GGlobal.layerMgr.close2(UIConst.SYZLB_INFO);
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		GGlobal.layerMgr.open(UIConst.SYZLB);
		self.exite();
		ModelArpgMap.getInstance().isServerControlMap = true;
	}

	//请求挑战boss结果 B: 结果：0：失败，1：成功B: 失败（1：队伍不存在，2：不是队长）
	private GC_CHA_BOSS9792(self: Model_Syzlb, data: BaseBytes): void {
		let res = data.readByte();
		let resTy = data.readByte();
		if (res == 1) {
			GGlobal.mapscene.enterScene(SceneCtrl.SYZLB);
		} else {
			ViewCommonWarn.text(["队伍不存在", "不是队长", ""][resTy - 1])
		}
	}

	//战斗结果 B: 结果：0：失败，1：成功[B:类型I: 道具idI: 道具数量]通关奖励
	private GC_FIGHT_RESULT9794(self: Model_Syzlb, data: BaseBytes): void {
		self.batResult = data.readByte();
		if (self.batResult == 1) {
			let len = data.readShort();
			let batDrop = []
			for (let i = 0; i < len; i++) {
				batDrop.push([data.readByte(), data.readInt(), data.readInt()])
			}
			batDrop = ConfigHelp.makeItemListArr(batDrop)
			let cfg = Config.syzlb_762[self.batId + 1];
			if (cfg) {
				let isLeader = self.isLeader();
				if (isLeader) {
					setTimeout(function () {
						ViewCommonWin.show(batDrop, 5000, self, "下一关", self.nextBattle);
					}, 1000);
				} else {
					setTimeout(function () {
						ViewCommonWin.show(batDrop, 5000, self, "确定", self.nextBattle);
					}, 1000);
				}
			} else {
				setTimeout(function () {
					ViewCommonWin.show(batDrop, 5000, self, "已通关", self.overBattle);
				}, 1000);
			}
		} else {
			setTimeout(function () {
				ViewBattleFault.show(5000, self, "退出", null, self.endBattle);
			}, 1000);
		}
	}

	private nextBattle() {
		let m = this
		if (m.isLeader()) {//队长发
			m.CG_ENTER_NEXT();
		}
	}

	private nextNoLeader() {//不是 队长 什么都不做
	}

	private overBattle() {//最后一关  结束
		let m = this;
		// m.endBattle(m);
		m.teamMyArr = []
		GGlobal.layerMgr.close2(UIConst.SYZLB_REW);
		GGlobal.layerMgr.close2(UIConst.SYZLB_INFO);
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		GGlobal.layerMgr.open(UIConst.SYZLB);
		m.exite()
	}

	public endBattle(m: Model_Syzlb = null, ui: ViewBattleFault = null) {
		m.CG_EXIT_CHA();
		m.teamMyArr = []
		GGlobal.layerMgr.open(UIConst.SYZLB);
	}

	//玩家死亡通知 L: 玩家idB: 是否最后一个（1：是，0：不是）
	private GC_DEAD9796(self: Model_Syzlb, data: BaseBytes): void {
		let plyId = data.readLong();
		Model_Syzlb.hpCur[plyId] = 0
		self.notify(Model_Syzlb.msg_datas_dead, plyId);
	}

	//通知提示复活
	private GC_NOTICE_RELIVE9798(self: Model_Syzlb, data: BaseBytes): void {
		let ct = data.readByte();
		if (ct > 0) {
			GGlobal.layerMgr.open(UIConst.SYZLB_RELIVE, ct)
		} else {
			setTimeout(function () {
				ViewBattleFault.show(5000, self, "退出", null, self.endBattle);
			}, 1000);
		}

	}

	/**刷新队员气血 [L:玩家idL:玩家气血]队伍气血数据 */
	private GC_REFLASH_TEAM_HP_9800(self: Model_Syzlb, bytes: BaseBytes) {
		let len = bytes.readShort();
		Model_Syzlb.hpArr.length = 0;
		for (let i = 0; i < len; i++) {
			let id = bytes.readLong()
			let hp = bytes.readLong()
			Model_Syzlb.hpArr.push([id, hp]);
			Model_Syzlb.hpCur[id] = hp
		}
		self.notify(Model_Syzlb.msg_datas_hp);
	}

	/**场景刷新数据 L:boss气血上限*/
	private GC_REFLASH_SCENE_9802(self: Model_Syzlb, bytes: BaseBytes) {
		Model_Syzlb.bossHP = bytes.readLong()
		self.notify(Model_Syzlb.msg_datas_hurt);
	}

	//转让队长结果 B:结果：0：失败，1：成功B: 失败（1：没有队伍，2：队伍异常，3：不能转让给自己，4：不是队长，5：不是队员）
	private GC_CGE_LEADER9804(self: Model_Syzlb, bytes: BaseBytes) {
		let res = bytes.readByte()
		let resTy = bytes.readByte()
		if (res == 1) {

		} else {
			ViewCommonWarn.text(["没有队伍", "队伍异常", "不能转让给自己", "不是队长", "不是队员"][resTy - 1]);
		}
	}
	//购买结果返回 B:结果：0：失败，1：成功I:失败：（1：超过购买上限，2：元宝不足），成功：已购买次数I:可挑战次数
	private GC_BUY_CHA_NUM9806(self: Model_Syzlb, bytes: BaseBytes) {
		let res = bytes.readByte();
		let resTy = bytes.readInt();
		let batCt = bytes.readInt();
		if (res == 1) {
			self.batBuy = resTy
			self.batCt = batCt
			self.notify(Model_Syzlb.openui)

			self.checkRed()
		} else {
			ViewCommonWarn.text(["超过购买上限", "元宝不足"][resTy - 1]);
		}
	}

	public joinTeamId = 0
	public linkToOpen(teamId) {
		this.joinTeamId = teamId
		this.CG_JOIN_BY_TEAMID(teamId);
	}
}