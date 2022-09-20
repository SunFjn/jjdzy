class Model_SHXunBao extends BaseModel {
	public constructor() {
		super();
	}

	/**寻宝 打开界面*/
	public CG_XUNBAO_OPENUI() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(5331, ba);
	}

	/**寻宝 抽奖*/
	public CG_XUNBAO_ROLL() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(5333, ba);
	}
	/**获取排行榜数据 B:类型：1：本期排行，2：上期排行*/
	public CG_XUNBAO_RANK(type = 1) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(5335, ba);
	}
	/**寻宝 目标奖励*/
	public CG_XUNBAO_GOAL(id) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(5337, ba);
	}

	//寻宝
	public static XB_ITEM = 410053;
	xbQuan: number = 0;
	xbCurGe: number = 0;
	xbArr: number[][] = []
	xbRewArr: number[][] = []
	xbMuBiaoArr: Vo_HuoDong[] = []
	xbRankTp = 0
	xbRankMy = 0
	xbQuanMy = 0
	xbRankArr: { rank: number, pId: number, pName: string, quan: number }[] = []

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		//寻宝
		wsm.regHand(5332, a.GC_XUNBAO_OPENUI, a);
		wsm.regHand(5334, a.GC_XUNBAO_ROLL, a);
		wsm.regHand(5336, a.GC_XUNBAO_RANK, a);
		wsm.regHand(5338, a.GC_XUNBAO_GOAL, a);
	}

	/**返回界面信息 I:当前圈数I:当前所在格子[B:类型I:道具idI:道具数量]奖励数据[I:奖励idI:目标奖励领取数量，-1已领完，0未达到，2剩余领取次数]目标奖励数据*/
	private GC_XUNBAO_OPENUI(s: Model_SHXunBao, data: BaseBytes) {
		s.xbQuan = data.readInt();
		s.xbCurGe = data.readInt() - 1;
		s.xbRankMy = data.readInt();
		s.xbArr = []
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let type = data.readByte();
			let id = data.readInt();
			let ct = data.readInt();
			let arr = [type, id, ct]
			s.xbArr.push(arr);
		}
		len = data.readShort();
		s.xbMuBiaoArr = []
		for (let i = 0; i < len; i++) {
			let v: Vo_HuoDong = new Vo_HuoDong();
			v.id = data.readInt();
			v.status = data.readInt();
			s.xbMuBiaoArr.push(v);
		}
		GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO);
		GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_RED);
	}

	/**掷骰子结果 B:结果：0：失败，1：成功I:当前圈数I:当前所在格子[B:类型I:道具idI:道具数量]获得的奖励[B:类型I:道具idI:道具数量]新一轮的奖励数据
	 * I:目标奖励领取数量，-1已领完，0未达到，2剩余领取次数I:奖励id*/
	private GC_XUNBAO_ROLL(s: Model_SHXunBao, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			s.xbQuan = data.readInt();
			s.xbCurGe = data.readInt() - 1;
			s.xbRankMy = data.readInt();
			let len = data.readShort();
			s.xbRewArr = []
			for (let i = 0; i < len; i++) {
				let type = data.readByte();
				let id = data.readInt();
				let ct = data.readInt();
				s.xbRewArr.push([type, id, ct]);
			}
			len = data.readShort();
			s.xbArr = []
			for (let i = 0; i < len; i++) {
				let type = data.readByte();
				let id = data.readInt();
				let ct = data.readInt();
				s.xbArr.push([type, id, ct]);
			}

			let state = data.readInt();
			let id = data.readInt();
			for (let i = 0; i < s.xbMuBiaoArr.length; i++) {
				if (s.xbMuBiaoArr[i].id == id) {
					s.xbMuBiaoArr[i].status = state;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_ROLL);
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_RED);
		} else {
			ViewCommonWarn.text("寻宝失败")
		}
	}

	/**返回排行数据 I:个人排名I:个人圈数[I:排名L:角色idU:角色名I:圈数]排行数据*/
	private GC_XUNBAO_RANK(s: Model_SHXunBao, data: BaseBytes) {
		s.xbRankTp = data.readByte();
		s.xbRankMy = data.readInt();
		s.xbQuanMy = data.readInt();
		s.xbRankArr = []
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let rank = data.readInt();
			let pId = data.readLong();
			let pName = data.readUTF();
			let quan = data.readInt();
			s.xbRankArr.push({ rank: rank, pId: pId, pName: pName, quan: quan })
		}
		GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_RANK);
		if (s.xbRankTp == 1) {
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_RED);
		}
	}

	/*领取奖励结果 B:0：失败，1：成功I:失败（1:未达条件，2：已领取），成功：奖励idI:目标奖励领取数量，-1已领完，0未达到，2剩余领取次数*/
	private GC_XUNBAO_GOAL(s: Model_SHXunBao, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			let id = data.readInt();
			let state = data.readInt();
			for (let i = 0; i < s.xbMuBiaoArr.length; i++) {
				if (s.xbMuBiaoArr[i].id == id) {
					s.xbMuBiaoArr[i].status = state;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_MUBIAO);
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_RED);
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}

	private static _xbRankCfg: Issshxbrank_268[];
	public static xbRankCfgArr(): Issshxbrank_268[] {
		if (Model_SHXunBao._xbRankCfg == null) {
			Model_SHXunBao._xbRankCfg = [];
			for (let keys in Config.ssshxbrank_268) {
				let cfg = Config.ssshxbrank_268[keys]
				let rankArr = ConfigHelp.SplitStr(cfg.rank)
				let rank1 = Number(rankArr[0][0])
				let rank2 = Number(rankArr[0][1])
				for (let i = rank1; i <= rank2; i++) {
					Model_SHXunBao._xbRankCfg[i - 1] = cfg;
				}
			}
		}
		return Model_SHXunBao._xbRankCfg

	}

	public isMuBiaoNotice(arr: Array<Vo_HuoDong>) {
		if (!arr) {
			return false;
		}
		for (let i = 0; i < arr.length; i++) {
			let v = arr[i];
			if (v.status > 0) {
				return true;
			}
		}
		return false;
	}
}