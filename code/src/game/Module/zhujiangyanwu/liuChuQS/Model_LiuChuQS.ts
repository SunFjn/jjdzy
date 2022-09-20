class Model_LiuChuQS extends BaseModel {

	public static readonly tsmsg_red = "tsmsg_red";
	public static readonly openui = "openui";
	public static readonly room_data = "room_data";
	public static readonly guan_sel = "guan_sel";
	public static readonly guan_sel_msg = "guan_sel_msg";
	public static readonly msg_invite = "msg_invite";
	public static readonly teamui = "teamui";
	//战斗
	public static readonly msg_datas_hurt = "msg_datas_hurt";
	public static readonly msg_datas_hp = "msg_datas_hp";
	public static readonly msg_datas_dead = "msg_datas_dead";
	public static readonly msg_datas_over = "msg_datas_over";

	//今日可求助次数
	public helpMeCt: number = 0;
	//今日可帮助次数
	public helpOthCt: number = 0;
	public curGuan: number = 1001;//当前正在挑战的关卡
	public saoDCt: number = 0;//可扫荡次数
	public firPass: number = 0;//首通关卡数

	public teamJoinArr: { guan: number, name: string, teamId: number, headId: number, frameId: number, total: number }[] = []
	public teamMyArr: Vo_LiuChuQS[] = [];

	public batId = 0//战斗地图
	// public batBossHpMax = 0
	// public batBossHpCur = 0
	// public batMyHurt = 0
	// public batRank = []

	public static bossMaxHP: number;
	public static bossHP: number;
	public static myHurt: number;
	public static hpArr = [];
	public static batIng = false;//战斗中
	// public static leaveMsg = true;//战斗结束离开队伍不需弹提示

	public listenServ(wsm: WebSocketMgr) {
		super.listenServ(wsm);
		const self = this;
		wsm.regHand(8202, self.GC_OPENUI_8202, self);
		wsm.regHand(8204, self.GC_TEAM_DATA_8204, self);
		wsm.regHand(8206, self.GC_BUILD_TEAM_8206, self);
		wsm.regHand(8208, self.GC_REMOVE_MEMBER_8208, self);
		wsm.regHand(8210, self.GC_BROAD_CAST_8210, self);
		wsm.regHand(8212, self.GC_BROAD_CAST_8212, self);
		wsm.regHand(8214, self.GC_JOIN_TEAM_8214, self);
		wsm.regHand(8216, self.GC_BATTLE_8216, self);
		wsm.regHand(8218, self.GC_REFLASH_SCENE_8218, self);
		wsm.regHand(8220, self.GC_DEATH_8220, self);
		wsm.regHand(8222, self.GC_REFLASH_TEAM_HP_8222, self);
		wsm.regHand(8226, self.GC_SAO_DANG_8226, self);
		wsm.regHand(8228, self.GC_REFLASH_HELP_NUM_8228, self);
	}

	/**openUI */
	public CG_OPENUI_8201() {
		this.sendSocket(8201, this.getBytes())
	}
	/**队伍数据 */
	public CG_TEAM_DATA_8203(gua) {
		let bytes = this.getBytes();
		bytes.writeInt(gua)
		this.sendSocket(8203, bytes)
	}
	/**创建队伍 I:关卡id */
	public CG_BUILD_TEAM_8205(gua: number) {
		let bytes = this.getBytes();
		bytes.writeInt(gua)
		this.sendSocket(8205, bytes)
	}
	/**踢人 L:玩家id */
	public CG_REMOVE_MEMBER_8207(id: number) {
		let bytes = this.getBytes();
		bytes.writeLong(id)
		this.sendSocket(8207, bytes)
	}
	/**广播邀请协助 */
	public CG_BROAD_CAST_8209() {
		let bytes = this.getBytes();
		this.sendSocket(8209, bytes)
	}
	/**离开队伍 I:关卡id */
	public CG_LEAVE_8211(teamId) {
		let bytes = this.getBytes();
		bytes.writeInt(teamId)
		this.sendSocket(8211, bytes)
	}
	/**加入队伍 I:队伍idI: 关卡id*/
	public CG_JOIN_TEAM_8213(teamId, guanId) {
		let bytes = this.getBytes();
		bytes.writeInt(teamId)
		bytes.writeInt(guanId)
		this.sendSocket(8213, bytes)
	}
	/**开始战斗*/
	public CG_BATTLE_8215() {
		this.sendSocket(8215, this.getBytes())
	}
	/**退出副本*/
	public CG_LEAVE_BATTLE_8223() {
		this.sendSocket(8223, this.getBytes())
	}

	/**扫荡*/
	public CG_SAO_DANG_8225() {
		this.sendSocket(8225, this.getBytes())
	}
	//=========================================

	/**打开界面 I:今日可求助次数I:今日可帮助次数I:当前关卡（未通关），该id之前的全部关卡则为通关 */
	private GC_OPENUI_8202(self: Model_LiuChuQS, bytes: BaseBytes) {
		self.helpMeCt = bytes.readInt();
		self.helpOthCt = bytes.readInt();
		self.curGuan = bytes.readInt();
		self.saoDCt = bytes.readInt();
		self.firPass = bytes.readInt();//首通关卡关卡数 可扫荡
		self.notify(Model_LiuChuQS.openui);
		self.notify(Model_LiuChuQS.tsmsg_red);
	}

	/**队伍信息 B:结果 1成功 2副本不存在I:关卡id[U:队长名字I:队伍idI:头像idI:头像框idB:总人数]队伍信息 */
	private GC_TEAM_DATA_8204(self: Model_LiuChuQS, bytes: BaseBytes) {
		let res = bytes.readByte();
		if (res == 1) {
			let guan = bytes.readInt();
			let len = bytes.readShort();
			self.teamJoinArr = []
			for (let i = 0; i < len; i++) {
				self.teamJoinArr.push({ guan: guan, name: bytes.readUTF(), teamId: bytes.readInt(), headId: bytes.readInt(), frameId: bytes.readInt(), total: bytes.readByte() })
			}
			self.notify(Model_LiuChuQS.room_data);
		} else {
			// ViewCommonWarn.text("查看队伍信息失败")
		}
	}

	/**创建队伍 B:结果 1成功 2刷新数据 3副本不存在 4需要通关前面的副本才能打这个副本I:队伍idI:关卡id[B:类型 1队长 2队员U:队员名字 L:队员idI:队员头像 I:队员头像框 I:队员等级L:队员战力]队伍数据 */
	private GC_BUILD_TEAM_8206(self: Model_LiuChuQS, bytes: BaseBytes) {
		const res = bytes.readByte();
		if (res == 1 || res == 2) {
			let teamId = bytes.readInt();
			let guan = bytes.readInt();
			let len = bytes.readShort();
			self.teamMyArr = []
			for (let i = 0; i < len; i++) {
				let v = new Vo_LiuChuQS();
				v.readMsg(bytes)
				v.teamId = teamId
				v.guan = guan
				self.teamMyArr.push(v);
			}
			self.notify(Model_LiuChuQS.teamui);
			//战斗id
			self.batId = guan
			Model_LiuChuQS.batIng = false;
		} else {
			let arr = ["", "", "", "关卡不存在", "需要通关前一关卡", "已通关不可创建房间"]
			ViewCommonWarn.text(arr[res]);
		}
	}

	/**踢人 B:结果 1成功（刷新队伍数据） 2没在队伍中 3队伍缓存异常 4你不是队长 5该队员不存在 6你被踢出队伍 */
	private GC_REMOVE_MEMBER_8208(self: Model_LiuChuQS, bytes: BaseBytes) {
		const res = bytes.readByte();
		if (res == 1) {
			ViewCommonWarn.text("踢人成功")
		} else if (res == 2) {
			ViewCommonWarn.text("没在队伍中")
		} else if (res == 3) {
			ViewCommonWarn.text("队伍缓存异常")
		} else if (res == 4) {
			ViewCommonWarn.text("你不是队长")
		} else if (res == 5) {
			ViewCommonWarn.text("该队员不存在")
		} else if (res == 6) {
			self.teamMyArr = []
			self.notify(Model_LiuChuQS.teamui);
			ViewCommonWarn.text("你被踢出队伍")
		} else {
			ViewCommonWarn.text("踢人失败")
		}
	}

	/**广播邀请协助 B:结果 1成功 2你没在队伍中 3队伍缓存异常 4你不是队长 5队员已满 6操作太频繁 7求助次数已用完 */
	private GC_BROAD_CAST_8210(self: Model_LiuChuQS, bytes: BaseBytes) {
		const state = bytes.readByte();
		if (state != 1) {
			//B:结果 1成功 2你没在队伍中 3队伍缓存异常 4你不是队长 5队员已满 6操作太频繁
			ViewCommonWarn.text(["", "已发出协助邀请", "你没在队伍中", "队伍缓存异常", "你不是队长", "队员已满", "操作太频繁", "求助次数已用完"][state]);
		} else {
			self.notify(Model_LiuChuQS.msg_invite, 10);
		}
	}

	/**离开队伍 B:结果 1成功 2队伍已解散 战斗则结束*/
	private GC_BROAD_CAST_8212(self: Model_LiuChuQS, bytes: BaseBytes) {
		const res = bytes.readByte();
		self.teamMyArr = []
		self.notify(Model_LiuChuQS.teamui);

		if (res == 1) {
			// ViewCommonWarn.text("解散队伍成功")
		} else if (res == 2) {
			ViewCommonWarn.text("队伍已解散");
			if (Model_LiuChuQS.bossHP > 0) {//队长退出 这个时候没打完也退出
				self.notify(Model_LiuChuQS.msg_datas_over);
			}
		} else {
			ViewCommonWarn.text("队伍已解散");
		}
		// Model_LiuChuQS.leaveMsg = true;
	}

	/**加入队伍 B:结果 1成功 2已有队伍 3队伍不存在 4队伍已满 5队伍已进入战斗，无法加入 6需要通关前面的副本才能打这个副本 7今日帮助次数已用尽 8该玩家已经没有求助次数，不能加入*/
	private GC_JOIN_TEAM_8214(self: Model_LiuChuQS, bytes: BaseBytes) {
		const res = bytes.readByte();
		let arr = ["", "加入成功", "已有队伍", "队伍不存在", "队伍已满", "队伍已进入战斗", "需要通关前一关卡", "今日帮助次数已用尽", "该玩家已经没有求助次数"]
		ViewCommonWarn.text(arr[res])
		if (res == 1) {
			if (GGlobal.layerMgr.isOpenView(UIConst.CHAT)) {
				GGlobal.layerMgr.close2(UIConst.CHAT);
			}
			if (Number(self.joinTeamId) > 0 && !GGlobal.layerMgr.isOpenView(UIConst.CHILD_LCQS_PANEL)) {
				GGlobal.layerMgr.open(UIConst.CHILD_LCQS_PANEL, Math.floor(Number(self.joinTeamId) / 1000))
			}

		}
		self.joinTeamId = 0
	}

	/**开始战斗 B:结果 1成功 2没有队伍 3两个缓存不同步，没有队伍缓存 4队长才能开始战斗 5队伍还在战斗中 */
	private GC_BATTLE_8216(self: Model_LiuChuQS, bytes: BaseBytes) {
		const res = bytes.readByte();
		if (res == 1) {
			GGlobal.mapscene.enterScene(SceneCtrl.LIU_CHU_QS);
		} else {
			let arr = ["", "", "队伍不存在", "队伍不同步", "队长才能开始战斗", "队伍还在战斗中"]
			ViewCommonWarn.text(arr[res]);
		}
	}

	/**场景刷新数据 L:boss气血上限L: boss当前气血L:我的伤害[U:名字 L:伤害]伤害排行 */
	private GC_REFLASH_SCENE_8218(self: Model_LiuChuQS, bytes: BaseBytes) {
		Model_LiuChuQS.bossMaxHP = bytes.readLong()
		Model_LiuChuQS.bossHP = bytes.readLong()
		Model_LiuChuQS.myHurt = bytes.readLong()
		let len = bytes.readShort();
		// self.batRank = []
		for (let i = 0; i > len; i++) {
			let name = bytes.readUTF()
			let hurt = bytes.readLong()
			// self.batRank.push({ name: name, hurt: hurt })
		}
		self.notify(Model_LiuChuQS.msg_datas_hurt);
	}

	/**死亡通知广播其他人 L:玩家id */
	private GC_DEATH_8220(self: Model_LiuChuQS, bytes: BaseBytes) {
		let playerId = bytes.readLong()
		self.notify(Model_LiuChuQS.msg_datas_dead, playerId);
	}

	/**刷新队员气血 [L:玩家idL:玩家气血]队伍气血数据 */
	private GC_REFLASH_TEAM_HP_8222(self: Model_LiuChuQS, bytes: BaseBytes) {
		let len = bytes.readShort();
		Model_LiuChuQS.hpArr.length = 0;
		for (let i = 0; i < len; i++) {
			Model_LiuChuQS.hpArr.push([bytes.readLong(), bytes.readLong()]);
		}
		self.notify(Model_LiuChuQS.msg_datas_hp);
	}

	/**扫荡 B:结果 1成功 2没扫荡次数 3首关都未通关，不能扫荡 4无可扫荡副本[I:关卡id[B:道具类型I:道具idI:道具数量]]所有数据 */
	private GC_SAO_DANG_8226(self: Model_LiuChuQS, bytes: BaseBytes) {
		let res = bytes.readByte();
		if (res == 1) {
			let len = bytes.readShort();
			let saoDrop = []
			for (let i = 0; i < len; i++) {
				let guan = bytes.readInt()
				let drop = [];
				let size = bytes.readShort();
				for (let j = 0; j < size; j++) {
					drop.push([bytes.readByte(), bytes.readInt(), bytes.readInt()])
				}
				saoDrop.push({ guan: guan, drop: drop })
			}
			self.saoDCt = 0
			self.notify(Model_LiuChuQS.tsmsg_red);
			GGlobal.layerMgr.open(UIConst.CHILD_LCQS_SAODANG, saoDrop)
		} else if (res == 2) {
			ViewCommonWarn.text("没有扫荡次数")
		} else if (res == 3) {
			ViewCommonWarn.text("未通关，不能扫荡")
		} else if (res == 4) {
			ViewCommonWarn.text("无可扫荡关卡")
		} else {
			ViewCommonWarn.text("扫荡失败")
		}

	}
	/**刷新协助次数 B:已协助次数B: 协助总次数 */
	private GC_REFLASH_HELP_NUM_8228(self: Model_LiuChuQS, bytes: BaseBytes) {
		self.helpMeCt = bytes.readByte();
		self.helpOthCt = bytes.readByte();
		self.notify(Model_LiuChuQS.openui);
	}

	private _tabObj: { [index: number]: Isix_279[] };
	private _tabArr: { [index: number]: Isix_279[] };
	public getTabArr(hard) {
		if (!this._tabObj) {
			this.initCfg();
		}
		return this._tabArr[hard]
	}

	public getHard(cur) {
		let v = Config.six_279[cur]
		return v ? v.hard : 1//没有是最后一关
	}

	public getGuanArr(gua): Isix_279[] {
		if (!this._tabObj) {
			this.initCfg();
		}
		return this._tabObj[gua]
	}

	private initCfg() {
		if (this._tabObj) return;
		this._tabObj = {}
		this._tabArr = {};
		for (let keys in Config.six_279) {
			let v = Config.six_279[keys];
			let index = Math.floor(v.id / 1000)
			let hard = v.hard
			if (this._tabArr[hard] == null) {
				this._tabArr[hard] = []
			}
			if (this._tabObj[index] == null) {
				this._tabArr[hard].push(v);
				this._tabObj[index] = []
				this._tabObj[index].push(v);
			} else {
				this._tabObj[index].push(v);
			}
		}
	}

	// private _frist = false;
	public fristLogin() {
		// this._frist = true;
	}
	public checkRed() {
		//第一次登陆
		// if (!this._frist) {
		// 	this._frist = true;
		// 	return true;
		// }
		if (this.checkSaiDan()) {
			return true;
		}
		return false;
	}

	public checkSaiDan() {
		//可扫荡
		if (this.firPass > 0 && this.saoDCt > 0 && this.curGuan > 1001) {
			return true;
		}
		return false;
	}
	public joinTeamId = 0
	public linkToOpen(id: number, teamId) {
		this.joinTeamId = id
		// GGlobal.layerMgr.open(UIConst.CHILD_LCQS_PANEL, Math.floor(id / 1000))
		this.CG_JOIN_TEAM_8213(teamId, id);
	}
}