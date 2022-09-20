class Model_ActNianShou extends BaseModel {
	public constructor() {
		super();
	}

	static openui = "openui"
	static get_goal_reward = "get_goal_reward"
	static get_ns_reward = "get_ns_reward"
	static uptime_ns_rew = "uptime_ns_rew"
	static attack = "attack"//打年兽
	static attack_fail = "attack_fail"//打年兽
	static ns_die = "ns_die"//年兽死亡


	//刷新召唤年兽
	public CG_SUMMON_11551(): void {
		var bates = this.getBytes();
		this.sendSocket(11551, bates);
	}

	//召唤年兽王
	public CG_SUMMON_KING_11553(): void {
		var bates = this.getBytes();
		this.sendSocket(11553, bates);
	}

	//攻击年兽
	public CG_ATTACT_11555(): void {
		var bates = this.getBytes();
		this.sendSocket(11555, bates);
	}
	//领取目标奖励 I:目标奖励id
	public CG_GET_GOAL_REWARD_11557(id): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		this.sendSocket(11557, bates);
	}
	//领取奖池奖励 B:奖励序号B: 是否使用元宝开启：（0：否，1：是）
	public CG_GET_REWARD_11559(id, isYB): void {
		var bates = this.getBytes();
		bates.writeByte(id);
		bates.writeByte(isYB);
		this.sendSocket(11559, bates);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(11550, this.GC_OPENUI_11550, this);
		mgr.regHand(11552, this.GC_SUMMON_11552, this);
		mgr.regHand(11554, this.GC_SUMMON_KING_11554, this);
		mgr.regHand(11556, this.GC_ATTACT_11556, this);
		mgr.regHand(11558, this.GC_GET_GOAL_REWARD_11558, this);
		mgr.regHand(11560, this.GC_GET_REWARD_11560, this);
		mgr.regHand(11562, this.GC_ADD_BIAN_PAO_11562, this);
	}
	nsId = 0//当前年兽id
	lastHp = 0//剩余血量
	kingSt = 0//年兽王状态（0：未召唤，1：召唤，2：已击退）
	bianpaoCt = 0//鞭炮数
	lastTime = 0//剩余恢复时间
	point = 0// 积分

	nsArr: { idx: number, id: number, time: number }[] = [];
	rewStObj = {}
	//返回界面信息 I:当前年兽idI: 剩余血量B:年兽王状态（0：未召唤，1：召唤，2：已击退）I: 鞭炮数I:剩余恢复时间I: 积分[I:奖励的年兽idI: 剩余开启倒计时间]奖池数据[I:已领目标奖励id]已领目标奖励数据
	private GC_OPENUI_11550(self: Model_ActNianShou, data: BaseBytes): void {
		self.nsId = data.readInt();
		self.lastHp = data.readInt();
		self.kingSt = data.readByte();
		self.bianpaoCt = data.readInt();
		self.lastTime = data.readInt();
		self.point = data.readInt();
		let len = data.readShort();
		self.nsArr = [];
		for (let i = 0; i < len; i++) {
			let id = data.readInt()
			let time = data.readInt()
			self.nsArr.push({ idx: i + 1, id: id, time: time });
		}
		len = data.readShort();
		self.rewStObj = {}
		for (let i = 0; i < len; i++) {
			let id = data.readInt()
			self.rewStObj[id] = 1;
		}
		self.nsReward()
		self.checkNotice();
		self.notify(Model_ActNianShou.openui)
	}
	//刷新结果返回 B:结果：0：失败，1：成功I: 失败：（1：年兽还没击退不能刷新，2：奖池满不能刷新），成功：年兽idI: 剩余血量
	private GC_SUMMON_11552(self: Model_ActNianShou, data: BaseBytes) {
		let res = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			self.nsId = id;
			self.lastHp = data.readInt();
			self.notify(Model_ActNianShou.openui);
		} else {
			ViewCommonWarn.text(["年兽还没击退不能刷新", "奖池满不能刷新"][id - 1])
		}
	}

	//召唤年兽王 B:结果：0：失败，1：成功I: 失败：（1：年兽王还没击退不能刷新，2：奖池满不能属性），成功：年兽王idI: 剩余血量
	private GC_SUMMON_KING_11554(self: Model_ActNianShou, data: BaseBytes) {
		let res = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			self.nsId = id
			self.kingSt = 1;
			self.lastHp = data.readInt();
			self.notify(Model_ActNianShou.openui);
		} else {
			ViewCommonWarn.text(["年兽还没击退不能刷新", "奖池满不能刷新", "今天已召唤过", "不在可召唤时段内"][id - 1])
		}
	}
	//攻击结果 B:结果：0：失败，1：成功I: 失败：（1：未刷出年兽，2：已经击退），成功：年兽idI: 剩余血量I:鞭炮数I: 剩余恢复时间I:积分[I:奖励对应的年兽idI:剩余开启倒计时间]奖励池数据
	private GC_ATTACT_11556(self: Model_ActNianShou, data: BaseBytes) {
		let res = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			self.nsId = id
			let lastHp = data.readInt();
			let attact = self.lastHp - lastHp
			self.lastHp = lastHp
			self.bianpaoCt = data.readInt();
			self.lastTime = data.readInt();
			self.point = data.readInt();
			self.kingSt = data.readByte();;
			let len = data.readShort();
			let newArr = []
			for (let i = 0; i < len; i++) {
				let id = data.readInt()
				let time = data.readInt()
				newArr.push({ idx: i + 1, id: id, time: time });
			}
			self.notify(Model_ActNianShou.attack, attact);
			if (lastHp <= 0) {
				if (newArr.length > self.nsArr.length) {
					self.nsArr.push(newArr[newArr.length - 1]);
				}
				self.nsReward()
				self.notify(Model_ActNianShou.ns_die);
				ViewCommonWarn.text("已击杀")
			} else {
				self.notify(Model_ActNianShou.openui);
			}
		} else {
			self.notify(Model_ActNianShou.attack_fail);
			ViewCommonWarn.text(["未刷出年兽", "已经击退", "鞭炮不足"][id - 1])
		}
	}


	//领取目标奖励结果 B:结果：0：失败，1：成功I: 失败：（1：已领取，2：积分未达目标），成功：目标奖励id
	private GC_GET_GOAL_REWARD_11558(self: Model_ActNianShou, data: BaseBytes) {
		let res = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			if (self.rewStObj) {
				self.rewStObj[id] = 1;
			}
			self.notify(Model_ActNianShou.get_goal_reward);
			self.notify(Model_ActNianShou.openui);
		} else {
			ViewCommonWarn.text(["已领取", "积分未达目标"][id - 1])
		}
	}


	//领取奖励结果 B:结果：（1：成功，2：奖励不存在，3：元宝不足，4：倒计时未结束）[I: 奖励对应的年兽idI:剩余开启倒计时间]奖池数据
	private GC_GET_REWARD_11560(self: Model_ActNianShou, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			let len = data.readShort();
			self.nsArr = [];
			for (let i = 0; i < len; i++) {
				let id = data.readInt()
				let time = data.readInt()
				self.nsArr.push({ idx: i + 1, id: id, time: time });
			}
			self.nsReward()
			self.notify(Model_ActNianShou.openui);
			self.notify(Model_ActNianShou.get_ns_reward);
		} else {
			ViewCommonWarn.text(["奖励不存在", "元宝不足", "倒计时未结束"][res - 2])
		}
	}

	private GC_ADD_BIAN_PAO_11562(self: Model_ActNianShou, data: BaseBytes) {
		let ct = data.readInt();
		ViewBroadcastItemText.text("获得" + "【鞭炮】 X" + ct, Color.getColorInt(Color.ORANGE));
	}

	private _rewardArr: Inianpoint_299[];
	public get rewardArr() {
		let s = this;
		if (!s._rewardArr) {
			s._rewardArr = []
			for (let k in Config.nianpoint_299) {
				s._rewardArr.push(Config.nianpoint_299[k]);
			}
		}
		return s._rewardArr
	}

	private checkNotice() {
		let s = this;
		let reddot = GGlobal.reddot
		let red = s.checkRed();
		reddot.setCondition(UIConst.ACTCOM_NIANSHOU, 0, red);
		reddot.notifyMsg(UIConst.ACTCOM_NIANSHOU);
	}

	nsReward() {
		let s = this;
		//年兽奖励
		let hasTime = false;
		for (let i = 0; i < s.nsArr.length; i++) {
			let v = s.nsArr[i];
			if (v.time > 0) {
				Timer.instance.listen(s.upTime, s, 1000);
				hasTime = true;
				return;
			}
		}
		if (!hasTime) {
			Timer.instance.remove(s.upTime, s);
		}
	}

	private upTime() {
		let s = this;
		let hasTi = false
		for (let i = 0; i < s.nsArr.length; i++) {
			let v = s.nsArr[i];
			if (v.time > 0) {
				v.time--;
				hasTi = true;
			}
		}
		if (!hasTi) {
			Timer.instance.remove(s.upTime, s);
		}
		s.notify(Model_ActNianShou.uptime_ns_rew)
	}

	private checkRed() {
		let s = this;
		//鞭炮数
		if (s.bianpaoCt > 0) {
			return true;
		}
		//可打
		if (s.nsId > 0 && s.lastHp > 0) {
			return true;
		}
		if (s.checkReward()) {
			return true;
		}
		//年兽奖励
		for (let i = 0; i < s.nsArr.length; i++) {
			let v = s.nsArr[i];
			if (v.time <= 0) {
				return true;
			}
		}
		return false;
	}

	public checkReward() {
		let s = this;
		//积分奖励
		for (let i = 0; i < s.rewardArr.length; i++) {
			let v = s.rewardArr[i];
			if (s.point >= v.point && !s.rewStObj[v.id]) {
				return true;
			}
		}
	}

	public static getState($start, $end) {
		const begin = $start.split(":");
		const end = $end.split(":");
		let nowT = Model_GlobalMsg.getServerTime()
		// const date = new Date(nowT);
		const beginDate = new Date(nowT);
		beginDate.setHours(begin[0]);
		beginDate.setMinutes(0);
		beginDate.setSeconds(0);
		const endDate = new Date(nowT);
		endDate.setHours(end[0]);
		endDate.setMinutes(0);
		endDate.setSeconds(0);
		if (nowT < endDate.getTime() && nowT > beginDate.getTime()) {
			return true;
		}
		return false;
	}

}