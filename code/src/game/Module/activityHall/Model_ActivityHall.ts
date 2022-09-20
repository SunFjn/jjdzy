class Model_ActivityHall extends BaseModel {
	public constructor() {
		super();
	}

	mvpDic: Object = {};
	public getMVp(id) {
		let ret = '';
		if (this.mvpDic[id]) {
			ret = this.mvpDic[id];
		}
		return ret;
	}


	public checkNotice(val) {
		let sf = this;
		let red = GGlobal.reddot;
		let ret;
		switch (val) {
			case UIConst.FHLY:
				ret = red.checkCondition(val, 1);
				break;
			case UIConst.SHAOZHU_ESCORT:
				let bol0 = red.checkCondition(val, 0);
				let bol1 = red.checkCondition(val, 1);
				let bol2 = red.checkCondition(val, 2);
				if (bol0 || bol1 || bol2) {
					ret = true;
				} else {
					ret = false;
				}
				break;
			case UIConst.GCBZ:
				if (red.checkCondition(val, 0) || red.checkCondition(val, 1)) {
					ret = true;
				} else {
					ret = false;
				}
				break;
			default:
				ret = red.checkCondition(val);
				break;
		}
		return ret;
	}

	public listenServ(mgr: WebSocketMgr) {
		let s = this;
		s.socket = mgr;
		mgr.regHand(1980, s.GC_LZD_END_1980, s);
		mgr.regHand(1982, s.GC_OPEN_1982, s);
		mgr.regHand(1984, s.GC_ANSWER_1984, s);
		mgr.regHand(1986, s.GC_RANK_1986, s);
		//藏宝阁
		mgr.regHand(2732, s.GC_CBG_INFO_2732, s);
		mgr.regHand(2734, s.GC_CBG_CJ_2734, s);
		//藏宝阁 排行榜 系统
		mgr.regHand(4852, s.GC_CBG_RANK_4852, s);
		mgr.regHand(4854, s.GC_CBG_TARGET_4854, s);
		mgr.regHand(4856, s.GC_CBG_GET_4856, s);
		mgr.regHand(4858, s.GC_CBG_LAST_4858, s);
		//藏宝阁 排行榜 活动
		mgr.regHand(4872, s.GC_CBG_RANK_4852, s);
		mgr.regHand(4874, s.GC_CBG_TARGET_4854, s);
		mgr.regHand(4876, s.GC_CBG_GET_4856, s);
		mgr.regHand(4878, s.GC_CBG_LAST_4858, s);

		mgr.regHand(3752, s.GC_OPEN_ACTIVITYHALL, s);
	}

	public CG_OPEN_ACTIVITYHALL() {
		this.sendSocket(3751, this.getBytes());
	}

	/**
	 * 3752[I-U]
	 * 返回活动大厅数据 [I:系统idU:上届MVP]活动大厅数据
	*/
	public GC_OPEN_ACTIVITYHALL(m: Model_ActivityHall, ba: BaseBytes) {
		m.mvpDic = {};
		for (let i = 0, j = ba.readShort(); i < j; i++) {
			m.mvpDic[ba.readInt()] = ba.readUTF();
		}
		GGlobal.control.notify(UIConst.ACTIVITYHALL);
	}

	//=================隆中对
	public lzd_st = 0;//0：活动未开始，1：开始答题，2：答题中，3：答题超时，4：答题结束
	public lzd_remain = 0;
	public lzd_pro = 0;
	public lzd_id = 0;
	public lzd_lastId = 0;
	public lzd_X = 0;
	public lzd_rank = 0;
	public lzd_score = 0;
	public lzd_rankDta;
	public lzd_data = [1, 2, 3, 4];
	public CG_OPEN_1981() {
		this.sendSocket(1981, this.getBytes());
	}

	/**1982 B-I-I-I-I-I-I-I-I-I
	 * 打开答题界面返回 B:状态，0：活动未开始，1：开始答题，2：答题中，3：答题超时，4：答题结束
	 * I:答题倒计时I:答题进度I:题目idI:答案1I:答案2I:答案3I:答案4I:我的得分I:我的排名，0：未上榜
	*/
	private GC_OPEN_1982(s: Model_ActivityHall, d: BaseBytes) {
		s.lzd_st = d.readByte();
		let t = d.readInt();
		s.lzd_pro = d.readInt();
		s.lzd_id = d.readInt();
		s.lzd_data = [d.readInt(), d.readInt(), d.readInt(), d.readInt()];
		s.lzd_score = d.readInt();
		s.lzd_rank = d.readInt();
		s.lzd_remain = t * 1000 + Model_GlobalMsg.getServerTime();
		GGlobal.control.notify(Enum_MsgType.LZD_OPEN);
	}

	/**1983
	 * 答题 B:答案id，0：答题超时
	*/
	public curAnswerID = -1;
	public CG_ANSWER_1983(i) {
		if (this.lzd_id == this.lzd_lastId) return;
		this.lzd_lastId = this.lzd_id;
		this.curAnswerID = i;
		let ba = this.getBytes();
		ba.writeByte(i);
		this.sendSocket(1983, ba);
	}
	/**1984 B-I
	 * 答题返回 B:题目判断，0：错误，1：正确I:增加积分
	*/
	private GC_ANSWER_1984(s: Model_ActivityHall, d: BaseBytes) {
		GGlobal.control.notify(Enum_MsgType.LZD_RET);
		let r = d.readByte();
		let sc = d.readInt();
		s.lzd_score += sc;
		// s.CG_OPEN_1981();
		ViewLZDRet.showView([r, sc]);
	}

	public CG_RANK_1985() {
		this.sendSocket(1985, this.getBytes());
	}
	/**1986 	[U-I]
	 * 答题排行返回 [U:玩家名字I:积分]排行
	*/
	private GC_RANK_1986(s: Model_ActivityHall, d: BaseBytes) {
		s.lzd_rankDta = [];
		let len = d.readShort();
		for (let i = 0; i < 10; i++) {
			if (i >= len) {
				s.lzd_rankDta.push(["虚位以待", 0]);
			} else {
				let name = d.readUTF();
				if (Model_player.isMine(name)) s.lzd_rank = i + 1;
				s.lzd_rankDta.push([name, d.readInt()]);
			}
		}
		GGlobal.control.notify(Enum_MsgType.LZD_OPENRANK);
	}

	//活动结束打开排行榜界面
	private GC_LZD_END_1980(s: Model_ActivityHall, d: BaseBytes) {
		if (GGlobal.layerMgr.isOpenView(UIConst.LONGZHONGDUI)) {
			GGlobal.layerMgr.open(UIConst.LZDRANK);
		}
	}

	public CG_Answer_1987() {
		this.sendSocket(1987, this.getBytes());
	}

	//==================藏宝阁
	cbg_luckVal;//幸运值
	cbg_log = [];
	freeCount;
	isfirst;//是否是第一次十连抽
	cbg_qs = 0;//藏宝阁期数
	cbgEndT = 0;//藏宝阁倒计时
	public static skipTween = false;//跳过动画

	private static _cbg2Arr: Icbg2_729[][];
	public static getCbg2Arr(qs): Icbg2_729[] {
		if (Model_ActivityHall._cbg2Arr == null) {
			Model_ActivityHall._cbg2Arr = [];
			for (let keys in Config.cbg2_729) {
				let v = Config.cbg2_729[keys];
				if (Model_ActivityHall._cbg2Arr[v.qs - 1] == null) {
					Model_ActivityHall._cbg2Arr[v.qs - 1] = [];
				}
				Model_ActivityHall._cbg2Arr[v.qs - 1].push(v);
			}
		}
		return Model_ActivityHall._cbg2Arr[qs - 1]
	}
	public CG_CBG_INFO_2731() {
		this.sendSocket(2731, this.getBytes());
	}
	/**
	 * 2732 	I-B-B-[U-B-I-I]
	 * 返回界面信息 I:幸运值B:免费抽奖次数B:首次十连抽（0：是，1：否）[U:玩家名B:类型I:道具idI:数量]抽奖公告列表
	*/
	public GC_CBG_INFO_2732(s: Model_ActivityHall, d: BaseBytes) {
		s.cbg_luckVal = d.readInt();
		s.freeCount = d.readByte();
		s.isfirst = d.readByte() == 0;
		s.cbg_qs = d.readByte();
		s.cbg_log = [];
		let len = d.readShort();
		let startIndex = len > 7 ? len - 8 : 0;
		for (let i = 0, j = len; i < j; i++) {
			let arr = [d.readUTF(), ConfigHelp.parseItemBa(d)];
			if (i >= startIndex) {
				s.cbg_log.push(arr);
			}
		}
		s.cbgEndT = d.readInt();
		let count = Model_Bag.getItemCount(410029);
		let r = s.freeCount > 0 || count > 0;
		GGlobal.reddot.setCondition(UIConst.CANGBAOGE, 0, r);
		GGlobal.reddot.notify(UIConst.CANGBAOGE);
		GGlobal.control.notify(UIConst.CANGBAOGE, { type: 1 });
	}

	public static type: number = 0;
	/**
	 * 2733 B
	 * 抽奖 B:0：抽一次，1：抽10次
	*/
	public CG_CBG_CJ_2733(tp) {
		let ba = this.getBytes();
		ba.writeByte(tp);
		this.sendSocket(2733, ba);
		Model_ActivityHall.type = tp;
	}
	/**2734
	 * 	I-B-B-[B-I-I-B]
	 *抽奖结果返回 I:幸运值B:免费次数B:首次十连抽（0：是，1：否）B:当前期数[B:类型I:道具idI:数量B:是否大奖（1：是，0：否）]获得物品
	*/
	public GC_CBG_CJ_2734(s: Model_ActivityHall, d: BaseBytes) {
		s.cbg_luckVal = d.readInt();
		s.freeCount = d.readByte();
		s.isfirst = d.readByte() == 0;
		s.cbg_qs = d.readByte();
		GGlobal.reddot.setCondition(UIConst.CANGBAOGE, 0, s.freeCount > 0);
		GGlobal.reddot.notify(UIConst.CANGBAOGE);
		let awards = [];
		for (let i = 0, j = d.readShort(); i < j; i++) {
			awards.push([d.readByte(), d.readInt(), d.readInt(), d.readByte()]);
		}
		GGlobal.control.notify(UIConst.CANGBAOGE, { type: 2, awards: awards });
		let vo: Vo_Activity = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SJZK);
		if (vo) {
			if (Model_ActivityHall.type == 0) {
				GGlobal.model_actCom.treasure++;
			} else {
				GGlobal.model_actCom.treasure += 10;
			}
			GGlobal.control.notify(UIConst.ACTCOM_SJZK);
		}
	}
	cbgRankArr: { rank: number, pName: string, ct: number }[] = []
	cbgMyRank: number;
	cbgMyCt: number;
	cbgMbArr: { cfgId: number, status: number }[] = []
	cbgRankQs = 0;//藏宝阁 排行榜期数

	cbgRankLastArr: { rank: number, pName: string, ct: number }[] = []
	cbgMyLastRank: number = 0;
	cbgMyLastCt: number = 0;
	cbgRankLastQs = 0;//藏宝阁 排行榜期数

	//打开排名奖励界面
	public CG_CBG_RANK_4851() {
		let ba = this.getBytes();
		this.sendSocket(4851, ba);
	}

	//打开排名奖励界面
	public CG_CBG_RANK_4871() {
		let ba = this.getBytes();
		this.sendSocket(4871, ba);
	}

	//打开排名奖励返回 [I:排名U:玩家名称I:抽奖次数]排名奖励列表I:我的排名I:抽奖次数
	private GC_CBG_RANK_4852(s: Model_ActivityHall, d: BaseBytes) {
		let len = d.readShort();
		s.cbgRankArr = [];
		for (let i = 0; i < len; i++) {
			let rank = d.readInt();
			let pName = d.readUTF();
			let ct = d.readInt();
			let v = { rank: rank, pName: pName, ct: ct }
			s.cbgRankArr.push(v)
		}
		s.cbgMyRank = d.readInt();
		s.cbgMyCt = d.readInt();
		s.cbgRankQs = d.readInt();
		GGlobal.control.notify(Enum_MsgType.CANGBAOGE_RANK);
	}

	public CG_CBG_TARGET_4853() {
		let ba = this.getBytes();
		this.sendSocket(4853, ba);
	}
	public CG_CBG_TARGET_4873() {
		let ba = this.getBytes();
		this.sendSocket(4873, ba);
	}
	//打开目标奖励界面返回 I:奖励配置表idB:奖励状态，1：可领取，2：已领取
	private GC_CBG_TARGET_4854(s: Model_ActivityHall, d: BaseBytes) {
		let len = d.readShort();
		s.cbgMbArr = [];
		for (let i = 0; i < len; i++) {
			let v = { cfgId: d.readInt(), status: d.readByte() }
			s.cbgMbArr.push(v);
		}
		GGlobal.control.notify(Enum_MsgType.CANGBAOGE_RANK);
		let red = Model_ActivityHall.checkCbgRank()
		GGlobal.reddot.setCondition(UIConst.CANGBAOGE_RANK, 0, red);
		GGlobal.reddot.setCondition(UIConst.CANGBAOGE_RANK2, 0, red);
		GGlobal.reddot.notify(UIConst.CANGBAOGE_RANK);
	}
	//领取奖励 I:要领取的配置表奖励id
	public CG_CBG_GET_4855(id) {
		let ba = this.getBytes();
		ba.writeInt(id);
		this.sendSocket(4855, ba);
	}
	//领取奖励 I:要领取的配置表奖励id
	public CG_CBG_GET_4875(id) {
		let ba = this.getBytes();
		ba.writeInt(id);
		this.sendSocket(4875, ba);
	}
	//领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励id
	private GC_CBG_GET_4856(s: Model_ActivityHall, d: BaseBytes) {
		let res = d.readByte();
		let id = d.readInt();
		if (res == 1) {
			for (let i = 0; i < s.cbgMbArr.length; i++) {
				if (s.cbgMbArr[i].cfgId == id) {
					s.cbgMbArr[i].status = 2;
					GGlobal.control.notify(Enum_MsgType.CANGBAOGE_RANK);
					break;
				}
			}
			let red = Model_ActivityHall.checkCbgRank()
			GGlobal.reddot.setCondition(UIConst.CANGBAOGE_RANK, 0, red);
			GGlobal.reddot.setCondition(UIConst.CANGBAOGE_RANK2, 0, red);
			GGlobal.reddot.notify(UIConst.CANGBAOGE_RANK);
		} else {
			if (res == 0) {
				ViewCommonWarn.text("没有该奖励")
			} else if (res == 2) {
				ViewCommonWarn.text("未达到条件")
			} else if (res == 3) {
				ViewCommonWarn.text("已领取")
			} else {
				ViewCommonWarn.text("领取失败")
			}
		}
	}

	//打开上期排名界面
	public CG_CBG_LAST_4857() {
		let ba = this.getBytes();
		this.sendSocket(4857, ba);
	}

	//打开上期排名界面
	public CG_CBG_LAST_4877() {
		let ba = this.getBytes();
		this.sendSocket(4877, ba);
	}

	//打开上期排名界面返回 [I:排名U:玩家名称I:抽奖次数]上期排名奖励列表I:我的上期排名,没上排名则为0I:我的上期抽奖次数
	private GC_CBG_LAST_4858(s: Model_ActivityHall, d: BaseBytes) {
		let len = d.readShort();
		s.cbgRankLastArr = [];
		for (let i = 0; i < len; i++) {
			let rank = d.readInt();
			let pName = d.readUTF();
			let ct = d.readInt();
			let v = { rank: rank, pName: pName, ct: ct }
			s.cbgRankLastArr.push(v)
		}
		s.cbgMyLastRank = d.readInt();
		s.cbgMyLastCt = d.readInt();
		s.cbgRankLastQs = d.readInt();
		GGlobal.control.notify(Enum_MsgType.CANGBAOGE_RANK);
	}


	private static _cbgCfg1: any;
	public static getCbgCfg1(qs: number, rank: number): any {
		if (Model_ActivityHall._cbgCfg1 == null) {
			Model_ActivityHall._cbgCfg1 = {};
			for (let keys in Config.cbgrank1_729) {
				let cbgCfg = Config.cbgrank1_729[keys];
				if (Model_ActivityHall._cbgCfg1[cbgCfg.qs] == null) {
					Model_ActivityHall._cbgCfg1[cbgCfg.qs] = {};
				}

				let arr = ConfigHelp.SplitStr(cbgCfg.rank)
				for (let j = Number(arr[0][0]); j <= Number(arr[0][1]); j++) {
					Model_ActivityHall._cbgCfg1[cbgCfg.qs][j] = cbgCfg
				}
			}
		}
		return Model_ActivityHall._cbgCfg1[qs] ? Model_ActivityHall._cbgCfg1[qs][rank] : null;
	}

	private static _cbgCfg2: any;
	public static getCbgCfg2(qs: number, rank: number): any {
		if (Model_ActivityHall._cbgCfg2 == null) {
			Model_ActivityHall._cbgCfg2 = {};
			for (let keys in Config.cbgrank2_729) {
				let cbgCfg = Config.cbgrank2_729[keys];
				if (Model_ActivityHall._cbgCfg2[cbgCfg.qs] == null) {
					Model_ActivityHall._cbgCfg2[cbgCfg.qs] = {};
				}

				let arr = ConfigHelp.SplitStr(cbgCfg.rank)
				for (let j = Number(arr[0][0]); j <= Number(arr[0][1]); j++) {
					Model_ActivityHall._cbgCfg2[cbgCfg.qs][j] = cbgCfg
				}
			}
		}
		return Model_ActivityHall._cbgCfg2[qs] ? Model_ActivityHall._cbgCfg2[qs][rank] : null;
	}

	// private static _cbgmbCfg1: any;
	// public static getCbgMbCfg1(qs: number): Icbgmb1_729[] {
	// 	if (Model_ActivityHall._cbgmbCfg1 == null) {
	// 		Model_ActivityHall._cbgmbCfg1 = {};
	// 		for (let keys in Config.cbgmb1_729) {
	// 			let llCfg = Config.cbgmb1_729[keys];
	// 			if (Model_ActivityHall._cbgmbCfg1[llCfg.qs] == null) {
	// 				Model_ActivityHall._cbgmbCfg1[llCfg.qs] = [];
	// 			}
	// 			Model_ActivityHall._cbgmbCfg1[llCfg.qs].push(llCfg);
	// 		}
	// 	}
	// 	return Model_ActivityHall._cbgmbCfg1[qs];
	// }

	// private static _cbgmbCfg2: any;
	// public static getCbgMbCfg2(qs: number): Icbgmb1_729[] {
	// 	if (Model_ActivityHall._cbgmbCfg2 == null) {
	// 		Model_ActivityHall._cbgmbCfg2 = {};
	// 		for (let keys in Config.cbgmb2_729) {
	// 			let llCfg = Config.cbgmb2_729[keys];
	// 			if (Model_ActivityHall._cbgmbCfg2[llCfg.qs] == null) {
	// 				Model_ActivityHall._cbgmbCfg2[llCfg.qs] = [];
	// 			}
	// 			Model_ActivityHall._cbgmbCfg2[llCfg.qs].push(llCfg);
	// 		}
	// 	}
	// 	return Model_ActivityHall._cbgmbCfg2[qs];
	// }

	public static cbgIsKuaF(): boolean {
		if (Model_ActivityHall.isOlderServ()) {
			return Model_ActivityHall.odercbgIsKuaF();
		} else {
			return Model_ActivityHall.newcbgIsKuaF();
		}
	}

	public static odercbgIsKuaF(): boolean {
		return Model_GlobalMsg.kaifuDay > 30
	}

	public static newcbgIsKuaF(): boolean {
		let day = Config.xitong_001[UIConst.CANGBAOGE_RANK2]
		return Model_GlobalMsg.kaifuDay >= day.day
	}

	public static newCbgnoKuaF(): boolean {
		let day = Config.xitong_001[UIConst.CANGBAOGE_RANK]
		return Model_GlobalMsg.kaifuDay <= day.day && Model_GlobalMsg.kaifuDay >= 8
	}

	//老服 兼容   新服 8-28天开
	public static isOlderServ() {
		// return Model_GlobalMsg.kaiFuTime < 1561392000//2019-06-25 00:00:00
		return Model_GlobalMsg.kaiFuTime < 1561132800//2019-06-22 00:00:00
	}

	public static checkCbgRank() {
		let a = GGlobal.modelActivityHall.cbgMbArr
		for (let i = 0; i < a.length; i++) {
			if (a[i].status == 1) {
				return true;
			}
		}
		return false;
	}

	public isOpenCbgRank2(): boolean {
		let actArr = GGlobal.modelActivity.getGroup(UIConst.CANGBAOGE);
		actArr = actArr ? actArr : [];
		const servTime = (Model_GlobalMsg.getServerTime() / 1000) >> 0;
		for (let i = 0; i < actArr.length; i++) {
			let ac = actArr[i];
			if (ac.id == UIConst.CANGBAOGE_RANK2) {
				if ((ac.end - servTime > 0) && (servTime - ac.start > 0)) {
					return true;
				}
			}
		}
		return false;
	}

	public static cbgStatus;

	/**
	 * 根据次数获取神将折扣表数据
	 */
	public static getIherooff_287(count: number): Iherooff_287 {
		let cfg1: Iherooff_287;
		let cfg: Iherooff_287;
		for (let key in Config.herooff_287) {
			cfg = Config.herooff_287[key];
			let arr = JSON.parse(cfg.time);
			if (count >= arr[0][0]) {
				cfg1 = cfg;
			}
		}
		return cfg1;
	}
}