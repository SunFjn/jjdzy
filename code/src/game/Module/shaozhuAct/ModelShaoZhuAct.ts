class ModelShaoZhuAct extends BaseModel {

	public checkAndOpenIcon() {
		const bool = ModelShaoZhuAct.hasAct();
		if (bool) {
			GGlobal.mainUICtr.addIconWithListener(UIConst.SHAOZHU_ACT);
		} else {
			if (GGlobal.mainUICtr.getIcon(UIConst.SHAOZHU_ACT)) {
				GGlobal.mainUICtr.removeIcon(UIConst.SHAOZHU_ACT);
			}
		}
	}
	public static hasAct() {
		const datas = ModelEightLock.originalDatas;
		for (let key in datas) {
			const info: IEightAct = datas[key];
			if (info.sysID == UIConst.SHAOZHU_PIG || info.sysID == UIConst.SHAOZHU_HONGBAO || info.sysID == UIConst.SHAOZHU_RECHARGE || info.sysID == UIConst.SHAOZHU_SINGLE || info.sysID == UIConst.SHAOZHU_TARGET || info.sysID == UIConst.SHAOZHU_QY_RANK) {
				return info.state == 1;
			}
		}
		return false;
	}

	//少主七日充值。==========================
	target_data = [];
	checkNoticeTagrget(type) {
		type = (type / 1000) >> 0;
		let data = this.target_data;
		let len = data.length;
		let red = false;
		for (let i = 0; i < len; i++) {
			if (data[i].st == 1) {
				red = true;
				break;
			}
		}
		GGlobal.reddot.setCondition(UIConst.SHAOZHU_TARGET, type - 1, red);
		GGlobal.reddot.notify(UIConst.SHAOZHU_ACT);
	}

	//累计充值=========================
	ljcz_data = [];
	rechargeVal = 0;
	checkNoticeLJCZ() {
		let red = false;
		let m = this;
		let data = this.ljcz_data;
		let len = data.length;
		for (let i = 0; i < len; i++) {
			let obj = data[i];
			if (obj["st"] == 1) {
				red = true;
				break
			}
		}
		GGlobal.reddot.setCondition(UIConst.SHAOZHU_RECHARGE, 0, red);
		GGlobal.reddot.notify(UIConst.SHAOZHU_ACT);
	}

	//单笔 =======================
	single_data = [];
	single_logData = [];
	single_key = 0;
	zpPos = 2;
	_hasRun = 0;
	checkNoticeSingle() {
		let m = this;
		let data = m.single_data;
		let len = data.length;
		let isNotice = false;
		for (let i = 0; i < len; i++) {
			if (data[i].st == 1) {
				isNotice = true;
				break;
			}
		}
		if (!isNotice) isNotice = this.single_key > 0;
		GGlobal.reddot.setCondition(UIConst.SHAOZHU_SINGLE, 0, isNotice);
		GGlobal.reddot.notify(UIConst.SHAOZHU_ACT);
	}

	//红包===================
	hongbao_data = [];
	hongbao_log = [];
	hongbaoDay = 1;
	checkNoticeHongBao() {
		let m = this;
		let data = m.hongbao_data;
		let len = data.length;
		let isNotice = false;
		for (let i = 1; i < len; i++) {
			if (data[i].st == 1) {
				isNotice = true;
				break;
			}
		}
		GGlobal.reddot.setCondition(UIConst.SHAOZHU_HONGBAO, 0, isNotice);
		GGlobal.reddot.notify(UIConst.SHAOZHU_ACT);
	}

	//jujujuju=======================
	static GOLD = 1;
	static SILVER = 2;
	silverst = 0;
	goldst = 0;
	headst = 0;
	yuanbaoAddGod = 0;
	yuanbaoAddsilver = 0;
	GodPigtask_data = [];
	silverPigtask_data = [];
	silverCompleteCount = 0;
	goldompleteCount = 0;
	_maxTask = 0;
	get maxTask() {
		if (this._maxTask == 0) {
			let cfg = Config.pigrw_272;
			for (let i in cfg) {
				this._maxTask++;
			}
		}
		return this._maxTask;
	}

	public sortBySt(a, b) {
		let st1 = a.st == 1 ? -1 : a.st;
		let st2 = b.st == 1 ? -1 : b.st;
		if (st1 == st2) {
			return a.id < b.id ? -1 : 1;
		}
		return st1 > st2 ? 1 : -1;
	}

	checkNoticePig() {
		let m = this;
		let isNotice = m.headst == 1;
		if (!isNotice && m.silverst != 0) {
			let data = m.silverPigtask_data;
			let len = data.length;
			for (let i = 0; i < len; i++) {
				if (data[i].st == 1) {
					isNotice = true;
					break;
				}
			}
		}
		if (!isNotice && m.goldst != 0) {
			let data = m.GodPigtask_data;
			let len = data.length;
			for (let i = 0; i < len; i++) {
				if (data[i].st == 1) {
					isNotice = true;
					break;
				}
			}
		}
		GGlobal.reddot.setCondition(UIConst.SHAOZHU_PIG, 0, isNotice);
		GGlobal.reddot.notify(UIConst.SHAOZHU_ACT);
	}

	//===============↓↓↓↓↓↓↓↓↓ CMD ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
	public listenServ(s: WebSocketMgr) {
		let a = this;
		this.socket = s;
		s.regHand(5412, a.GC_OPEN_5412, a);
		s.regHand(5414, a.GC_GET_5114, a);

		s.regHand(5472, a.GC_OPEN_HONGBAO, a);
		s.regHand(5474, a.GC_GET_HONGBAO, a);

		s.regHand(5592, a.GC_OPEN_LJCZ, a);
		s.regHand(5594, a.GC_GET_LJCZ, a);

		s.regHand(5492, a.GC_open_PIG, a);
		s.regHand(5494, a.GC_GETHEAD_PIG, a);
		s.regHand(5496, a.GC_GET_PIG, a);

		s.regHand(5642, a.GC_OPEN_SINGLE, a);
		s.regHand(5644, a.GC_GET_SINGLE, a);
		s.regHand(5646, a.GC_TURN_SINGLE, a);
		s.regHand(5648, a.GC_LOG_SINGLE, a);

		s.regHand(7402, a.GC_OPEN_UI, a);
	}

	public CG_OPEN_TARGET(i) {
		let b = this.getBytes();
		b.writeInt(i);
		this.sendSocket(5411, b);
	}

	public CG_GET_TAGERT(i) {
		let b = this.getBytes();
		b.writeInt(i);
		this.sendSocket(5413, b);
	}

	/**7401 打开界面 */
	public CG_OPEN_UI() {
		let b = this.getBytes();
		this.sendSocket(7401, b);
	}

	/**
	 * 5412 	[I-B-I]
	 * 打开界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取I:完成度]奖励状态列表
	*/
	private GC_OPEN_5412(s: ModelShaoZhuAct, b: BaseBytes) {
		let data = [];
		let len = b.readShort();
		for (let i = 0; i < len; i++) {
			data.push({ "id": b.readInt(), "st": b.readByte(), "pro": b.readInt() });
		}
		s.target_data = data.sort(s.sortBySt);
		s.checkNoticeTagrget(s.target_data[0].id);
		GGlobal.control.notify(UIConst.SHAOZHU_TARGET);
	}

	/**
	 * 5414 	B-I
	 *领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励
	*/
	private GC_GET_5114(s: ModelShaoZhuAct, b: BaseBytes) {
		let ret = b.readByte();
		let id = b.readInt();
		if (ret == 1) {
			let data = s.target_data;
			let len = data.length;
			let type = 1;
			for (let i = 0; i < len; i++) {
				if (data[i].id == id) {
					data[i].st = 2;
					type = data[i].id;
					break;
				}
			}
			s.target_data.sort(s.sortBySt);
			s.checkNoticeTagrget(type);
			GGlobal.control.notify(UIConst.SHAOZHU_TARGET);
		} else {
			ViewCommonWarn.text(["没有该奖励", "领取成功", "未达到领取条件", "已领取"][ret]);
		}
	}
	//===============七日目标

	//===============红包
	public CG_OPEN_HONGBAO() {
		let b = this.getBytes();
		this.sendSocket(5471, b);
	}

	public CG_GET_HONGBAO(day) {
		let b = this.getBytes();
		b.writeByte(day);
		this.sendSocket(5473, b);
	}

	/**
	 * 5472 [B-B-[B-I-I-B]][U-B-I-I]-B
	 * 打开页面 [B:天数B:奖励 0未领取 1可领取 2已领取[B:道具类型I:道具idI:道具数量B:大奖 0普通奖励 1大奖]道具奖励]所有数据[U:玩家名字B:道具类型I:道具IDI:道具数量]公告列表B:当前活动天数
	*/
	public GC_OPEN_HONGBAO(m: ModelShaoZhuAct, ba: BaseBytes) {
		m.hongbao_data = [];
		let len = ba.readShort();
		for (let i = 0; i < len; i++) {
			let data: any = {};
			data.day = ba.readByte();
			data.st = ba.readByte();
			data.items = [];
			let len1 = ba.readShort();
			for (let j = 0; j < len1; j++) {
				data.items.push([ba.readByte(), ba.readInt(), ba.readInt(), ba.readByte()]);
			}
			m.hongbao_data[data.day] = data;
		}
		let len2 = ba.readShort();
		m.hongbao_log = [];
		for (let k = 0; k < len2; k++) {
			m.hongbao_log.push([ba.readUTF(), ba.readByte(), ba.readInt(), ba.readInt()]);
		}
		m.hongbaoDay = ba.readByte();
		m.checkNoticeHongBao();
		GGlobal.control.notify(UIConst.SHAOZHU_HONGBAO);
	}

	/**
	 * 5714 B-[B-I-I-B]-B
	 * 领取奖励 B:1成功 2异常 3开服天数不足 4配置表不存在 5奖励已领取 6背包已满[B:道具类型I:道具idI:道具数量B:大奖 0普通奖励 1大奖]领取物品B:天数
	*/
	public GC_GET_HONGBAO(m: ModelShaoZhuAct, ba: BaseBytes) {
		let ret = ba.readByte();
		if (ret == 1) {
			let temp = [];
			let name = Model_player.voMine.name;
			let len = ba.readShort();
			for (let i = 0; i < len; i++) {
				temp.push([ba.readByte(), ba.readInt(), ba.readInt(), ba.readByte()]);
				if (temp[i][3] == 1) {
					if (m.hongbao_log.length > 2) {
						m.hongbao_log.shift();
					}
					m.hongbao_log.push([name].concat(temp[i]));
				}
			}
			let day = ba.readByte();
			let data: any = {};
			data.day = day;
			data.st = 2;
			data.items = temp;
			m.hongbao_data[day] = data;
			m.checkNoticeHongBao();
			GGlobal.control.notify(UIConst.SHAOZHU_HONGBAO_AWARDS, temp);
		} else {
			ViewCommonWarn.text(["异常", "开服天数不足", "不存在此奖励", "已领取", "背包已满"][ret]);
		}
	}
	//===============红包

	//===============累计充值
	public CG_GET_LJCZ(id) {
		let ba = this.getBytes();
		ba.writeInt(id);
		this.sendSocket(5593, ba);
	}
	/**
	 * 5592  [I-B]-I 
	 * 打开界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表I:充值金额
	*/
	private GC_OPEN_LJCZ(m: ModelShaoZhuAct, ba: BaseBytes) {
		m.ljcz_data = [];
		let len = ba.readShort();
		for (let i = 0; i < len; i++) {
			let obj = {};
			obj["id"] = ba.readInt();
			obj["st"] = ba.readByte();
			m.ljcz_data.push(obj);
		}
		m.rechargeVal = ba.readInt();
		m.ljcz_data.sort(m.sortBySt);
		m.checkNoticeLJCZ();
		GGlobal.control.notify(UIConst.SHAOZHU_RECHARGE);
	}

	/**
	 * 5594 B-I
	 * 领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励id
	*/
	private GC_GET_LJCZ(m: ModelShaoZhuAct, ba: BaseBytes) {
		let ret = ba.readByte();
		if (ret == 1) {
			let data = m.ljcz_data;
			let id = ba.readInt();
			let len = data.length;
			for (let i = 0; i < len; i++) {
				let obj = data[i];
				if (obj["id"] == id) {
					obj["st"] = 2;
					break;
				}
			}
			m.ljcz_data.sort(m.sortBySt);
			m.checkNoticeLJCZ();
			GGlobal.control.notify(UIConst.SHAOZHU_RECHARGE);
		} else {
			ViewCommonWarn.text(["没有该奖励", "领取成功", "未达到条件", "已领取"][ret]);
		}
	}
	//===============累计充值

	//===============居居居居老板
	public CG_OPEN_PIG() {
		this.sendSocket(5491, this.getBytes());
	}
	public CG_GETHEAD_PIG() {
		this.sendSocket(5493, this.getBytes());
	}
	public Cg_GET_PIG(id, type) {
		let ba = this.getBytes();
		ba.writeInt(id);
		ba.writeByte(type);
		this.sendSocket(5495, ba);
	}
	/**5492 B-B-B-B-B-[I-B-L-I-I]
	 * 打开界面返回 B:金猪状态-0:未购买,1:已购买B:银猪状态-0:未购买,1:已购买B:头像奖励状态-0:未领取,1:可领取 2已领取B:元宝增幅数值
	 * [I:任务idB:任务状态（0：未完成，1:已全部完成）L:对应条件数值I:金猪当前任务idI:银猪当前任务id]任务数据
	*/
	private GC_open_PIG(m: ModelShaoZhuAct, ba: BaseBytes) {
		m.goldst = ba.readByte();
		m.silverst = ba.readByte();
		m.headst = ba.readByte();
		m.yuanbaoAddGod = ba.readInt();
		m.yuanbaoAddsilver = ba.readInt();
		m.GodPigtask_data = [];
		m.silverPigtask_data = [];
		m.silverCompleteCount = 0;
		m.goldompleteCount = 0;

		let len = ba.readShort();
		for (let i = 0; i < len; i++) {
			let id = ba.readInt();
			let st = ba.readByte();
			let count = ba.readLong();
			let gid = ba.readInt();
			let sid = ba.readInt();

			let god: any = {};
			god.id = (gid == 0 || gid == -1) ? id : gid;
			god.st = getRealSt(id, gid, st);
			god.count = count;
			god.type = ModelShaoZhuAct.GOLD;
			m.GodPigtask_data.push(god);
			let num = god.id % 1000;
			m.goldompleteCount += num;
			if (god.st != 2) {
				m.goldompleteCount--;
			}

			let silver: any = {};
			silver.id = (sid == 0 || sid == -1) ? id : sid;
			silver.st = getRealSt(id, sid, st);
			silver.count = count;
			silver.type = ModelShaoZhuAct.SILVER;
			m.silverPigtask_data.push(silver);
			num = silver.id % 1000;
			m.silverCompleteCount += num;
			if (silver.st != 2) {
				m.silverCompleteCount--;
			}
		}
		function getRealSt(baseid, id, st) {
			if (id == -1) return 2;
			if (baseid > id) {
				return 1;
			} else if (baseid == id) {
				return st;
			}
			return 2;
		}
		m.GodPigtask_data.sort(m.sortBySt);
		m.silverPigtask_data.sort(m.sortBySt);
		m.checkNoticePig();

		GGlobal.control.notify(UIConst.SHAOZHU_PIG);
	}
	/**5494 B
	 * 领取头像奖励返回 B:领取状态-0:成功,1:已领取,2:未达成
	*/
	private GC_GETHEAD_PIG(m: ModelShaoZhuAct, ba: BaseBytes) {
		let ret = ba.readByte()
		if (ret == 0) m.headst = 2;
		ViewCommonWarn.text(["领取成功", "已领取", "未达到条件"][ret]);
		GGlobal.control.notify(UIConst.SHAOZHU_PIG);
	}
	/**5496 B-B-I-B-S
	 * 领取元宝增幅返回 B:领取状态-0:成功,1:已领取,2:未达成B:任务类型：1金猪2银猪I:领取idB:下一个任务的状态
	*/
	private GC_GET_PIG(m: ModelShaoZhuAct, ba: BaseBytes) {
		let ret = ba.readByte();
		let type = ba.readByte();
		let id = ba.readInt();
		let st = ba.readByte();
		let add = ba.readInt();
		if (ret == 0) {
			let data;
			if (type == ModelShaoZhuAct.GOLD) {
				data = m.GodPigtask_data;
				m.yuanbaoAddGod = add;
				m.goldompleteCount++;
			} else {
				data = m.silverPigtask_data;
				m.yuanbaoAddsilver = add;
				m.silverCompleteCount++;
			}
			let cfg = Config.pigrw_272;
			let len = data.length;
			for (let i = 0; i < len; i++) {
				let obj = data[i];
				if (obj["id"] == id) {
					let nextTask = cfg[id + 1];
					if (nextTask) {
						obj["id"] = id + 1;//判断下一个任务是否存在， 存在就覆盖
						obj["st"] = nextTask.cs > obj["count"] ? 0 : 1;
					} else {
						obj["st"] = 2;
					}
					break;
				}
			}
			m.checkNoticePig();
			m.GodPigtask_data.sort(m.sortBySt);
			m.silverPigtask_data.sort(m.sortBySt);
			GGlobal.control.notify(UIConst.SHAOZHU_PIG);
		} else {
			ViewCommonWarn.text(["领取成功", "已领取", "未达到条件"][ret]);
		}
	}
	/**金猪======================================*/


	/**单笔充值======================================*/
	public CG_GET_SINGLE(id) {
		let ba = this.getBytes();
		ba.writeInt(id);
		this.sendSocket(5643, ba);
	}
	public CG_TURN_SINGLE() {
		let ba = this.getBytes();
		this.sendSocket(5645, ba);
		GGlobal.modelShaoZhuAct._hasRun = 1;
	}
	public CG_LOG_SINGLE() {
		let ba = this.getBytes();
		this.sendSocket(5647, ba);
	}

	/**5642   [I-B-I-I]-I  
	 *打开界面返回 [I:索引idB:奖励状态，0:未达到，1:可领取，2:已领完I:背包中该钥匙数量I:玩家累计获得该钥匙数量]钥匙列表I:背包中钥匙总数
	*/
	private GC_OPEN_SINGLE(m: ModelShaoZhuAct, ba: BaseBytes) {
		m.single_data = [];
		let len = ba.readShort();
		for (let i = 0; i < len; i++) {
			let opt: any = {};
			opt.id = ba.readInt();
			opt.st = ba.readByte();
			opt.count = ba.readInt();
			opt.maxCount = ba.readInt();
			m.single_data.push(opt);
		}
		m.single_key = ba.readInt();
		m.single_data.sort(m.sortBySt);
		m.checkNoticeSingle();
		GGlobal.control.notify(UIConst.SHAOZHU_SINGLE);
	}
	/**5644   B-I-I-B 
	 *领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领完I:领取的奖励idI:背包中该钥匙数量B:对应的奖励是否可领取，0:不可领，2:可领
	*/
	private GC_GET_SINGLE(m: ModelShaoZhuAct, ba: BaseBytes) {
		let data = m.single_data;
		let len = data.length;
		let ret = ba.readByte();
		let id = ba.readInt();
		let count = ba.readInt();
		let st = ba.readByte();
		if (ret == 1) {
			m.single_key++;
			for (let i = 0; i < len; i++) {
				let opt = data[i];
				if (opt.id == id) {
					opt.st = st;
					opt.count = count;
					opt.maxCount++;
					break;
				}
			}
			m.single_data.sort(m.sortBySt);
			m.checkNoticeSingle();
			GGlobal.control.notify(UIConst.SHAOZHU_SINGLE);
		}
		ViewCommonWarn.text(["没有该奖励", "领取成功", "未达到条件", "已领取"][ret]);
	}
	/**5646  B-I-I-I-I 
	 *转盘返回 B:状态，1：成功，2：钥匙不足I:抽奖抽到的倍数I:剩余钥匙总数量I:消耗的对应索引idI:背包中该钥匙数量
	*/
	private GC_TURN_SINGLE(m: ModelShaoZhuAct, ba: BaseBytes) {
		let ret = ba.readByte();
		if (ret == 2) ViewCommonWarn.text("钥匙不足");
		let cfgid = ba.readInt();
		m.single_key = ba.readInt();
		let id = ba.readInt();
		let count = ba.readInt();
		m.zpPos = cfgid;

		let obj: any = {};
		obj.cfgid = cfgid;
		obj.ret = ret;
		obj.id = id;
		let data = m.single_data;
		let len = data.length;
		for (let i = 0; i < len; i++) {
			let opt = data[i];
			if (opt.id == id) {
				opt.count = count;
				break;
			}
		}
		GGlobal.control.notify(Enum_MsgType.SHAOZHU_SINGLE_TURN, obj);
	}
	/**5648  [I-I] 
	 *打开记录界面返回 [I:消耗奖励索引idI:倍数]记录列表
	*/
	private GC_LOG_SINGLE(m: ModelShaoZhuAct, ba: BaseBytes) {
		let data = [];
		let len = ba.readShort();
		for (let i = 0; i < len; i++) {
			data.push([ba.readInt(), ba.readInt()]);
		}
		m.single_logData = data;
		GGlobal.control.notify(UIConst.SHAOZHU_SINGLE_LOG);
	}

	public static rankData = [];
	public static modId: number = 0;
	public static myjdCount: number = 0;
	public static myRank: number = 0;
	public static endTime: number = 0;
	public static headData = [];
	/**7402 打开界面返回 [U:名字I:祈愿]排行I:第一名职业时装（job*1000+时装id），没有则为0[I:头像id，没有则为0I:头像框I:国家I:vip等级]第二，第三名头像id，头像框，国家，vip等级I:我的祈愿I:我的排名I:结束时间*/
	private GC_OPEN_UI(m: ModelShaoZhuAct, ba: BaseBytes) {
		ModelShaoZhuAct.rankData = [];
		ModelShaoZhuAct.headData = [];
		let len = ba.readShort();
		for (let i = 0; i < len; i++) {
			let rank: QiYuanRankVO = new QiYuanRankVO();
			rank.readMsg(ba);
			if (rank.jdCount >= Config.xtcs_004[6203].num) {
				ModelShaoZhuAct.rankData.push(rank);
			}
		}
		ModelShaoZhuAct.modId = ba.readInt();
		len = ba.readShort();
		for (let j = 0; j < len; j++) {
			let headVO: QiYuanHeadVO = new QiYuanHeadVO();
			headVO.readMsg(ba);
			let rank: QiYuanRankVO = ModelShaoZhuAct.rankData[j + 1];
			if (rank && rank.jdCount >= Config.xtcs_004[6203].num) {
				ModelShaoZhuAct.headData.push(headVO);
			}
		}
		ModelShaoZhuAct.myjdCount = ba.readInt();
		ModelShaoZhuAct.myRank = ba.readInt();
		ModelShaoZhuAct.endTime = ba.readInt();
		GGlobal.control.notify(UIConst.SHAOZHU_QY_RANK);
	}
}