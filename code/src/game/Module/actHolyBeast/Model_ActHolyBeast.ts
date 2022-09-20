class Model_ActHolyBeast extends BaseModel {

	/**洗练 领取奖励 I:奖励id*/
	public CG_XILIAN_GET(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(4951, ba);
	}

	/**目标 领取奖励  B:任务类型I:任务id*/
	public CG_MUBIAO_GET(type: number, id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(id);
		this.sendSocket(4971, ba);
	}

	/**活跃 领取奖励 B:任务类型I:任务id*/
	public CG_HUOYUE_GET(type: number,id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(id);
		this.sendSocket(4991, ba);
	}

	/**转盘 目标奖励*/
	public CG_ZHUANPAN_TURN() {
		let model = GGlobal.modelActHolyB
		if (model.zpHaveCt <= 0) {
			ViewCommonWarn.text("没有抽奖次数");
			return;
		}

		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(5031, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		//洗练
		wsm.regHand(4950, a.GC_XILIAN_OPENUI, a);
		wsm.regHand(4952, a.GC_XILIAN_GET, a);
		//目标
		wsm.regHand(4970, a.GC_MUBIAO_OPENUI, a);
		wsm.regHand(4972, a.GC_MUBIAO_GET, a);
		//活跃
		wsm.regHand(4990, a.GC_HUOYUE_OPENUI, a);
		wsm.regHand(4992, a.GC_HUOYUE_GET, a);
		//转盘
		wsm.regHand(5030, a.GC_ZHUANPAN_OPENUI, a);
		wsm.regHand(5032, a.GC_ZHUANPAN_TURN, a);

		wsm.regHand(7352, a.GC_OPENUI, a);
	}
	//洗练
	xlCt: number;
	xlArr: Vo_HuoDong[];
	//目标
	muBObj: { [tp: number]: Vo_HuoDong[] } = {};
	//活跃
	huoYObj: { [tp: number]: Vo_HuoDong[] } = {};
	//转盘
	zpCharge: number;
	zpNoCt: number;//已转次数
	zpHaveCt: number;//可抽次数
	zpArr: Vo_HuoDong[] = [];
	zpPos: number = 0;

	/**返回界面信息 I:已洗练次数[I:奖励idB:领取状态]奖励领取状态数据*/
	private GC_XILIAN_OPENUI(s: Model_ActHolyBeast, data: BaseBytes) {
		s.xlCt = data.readInt();
		let len = data.readShort();
		s.xlArr = [];
		for (let i = 0; i < len; i++) {
			let hd: Vo_HuoDong = new Vo_HuoDong();
			hd.readMsgInt(data)
			s.xlArr.push(hd);
		}
		GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XILIAN);
	}
	/**领取奖励结果 B:结果：0：失败，1：成功I:失败（1：未达条件，2：已领取），成功：奖励id*/
	private GC_XILIAN_GET(s: Model_ActHolyBeast, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			let id = data.readInt();
			for (let i = 0; i < s.xlArr.length; i++) {
				if (s.xlArr[i].id == id) {
					s.xlArr[i].status = 2;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XILIAN);
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}

	/**返回界面信息 [B:任务类型[I:任务idB:任务状态（0：未完成，1：可领取，2：已领取）L:对应条件数值]]任务数据*/
	private GC_MUBIAO_OPENUI(s: Model_ActHolyBeast, data: BaseBytes) {
		s.muBObj = {}
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let type = data.readByte();
			s.muBObj[type] = [];
			let size = data.readShort();
			for (let j = 0; j < size; j++) {
				let hd: Vo_HuoDong = new Vo_HuoDong();
				hd.readMsgInt(data);
				hd.canCt = data.readLong();
				hd.hasCt = type;
				s.muBObj[type].push(hd);
			}
		}
		GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_MUBIAO);
	}
	/**领取奖励结果 B:结果：0：失败，1：成功I:失败（1：未达条件，2：已领取），成功：奖励id*/
	private GC_MUBIAO_GET(s: Model_ActHolyBeast, data: BaseBytes) {
		let res = data.readByte();
		let type = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			let arr: Vo_HuoDong[] = s.muBObj[type]
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].id == id) {
					arr[i].status = 2;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_MUBIAO);
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}

	/**返回界面信息 [B:任务类型I:当前数值[I:任务idB:任务状态]]任务数据*/
	private GC_HUOYUE_OPENUI(s: Model_ActHolyBeast, data: BaseBytes) {
		s.huoYObj = {}
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let type = data.readByte();
			let val = data.readInt();
			s.huoYObj[type] = [];
			let size = data.readShort();
			for (let j = 0; j < size; j++) {
				let hd: Vo_HuoDong = new Vo_HuoDong();
				hd.readMsgInt(data);
				hd.canCt = val;
				hd.hasCt = type;
				s.huoYObj[type].push(hd);
			}
		}
		GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_HUOYUE);
	}
	/**领取奖励结果 B:结果：0：失败，1：成功B:失败：（1：未完成任务，2：已领取），成功：任务类型I:任务id*/
	private GC_HUOYUE_GET(s: Model_ActHolyBeast, data: BaseBytes) {
		let res = data.readByte();
		let type = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			let arr: Vo_HuoDong[] = s.huoYObj[type]
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].id == id) {
					arr[i].status = 2;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_HUOYUE);
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}

	/**返回界面信息 I:当前充值数I:已转次数I:可抽次数[B:转盘位置idB:领取状态（0：未抽中，1：已抽中）]转盘数据*/
	private GC_ZHUANPAN_OPENUI(s: Model_ActHolyBeast, data: BaseBytes) {
		s.zpCharge = data.readInt();
		s.zpNoCt = data.readInt();
		s.zpHaveCt = data.readInt();
		s.zpArr = []
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: Vo_HuoDong = new Vo_HuoDong();
			v.readMsg(data);
			s.zpArr.push(v);
		}
		GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_ZHUANPAN);
		GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_ZHUANPAN_RED);
	}

	/**抽奖结果 B:结果：0：失败，1：成功I:失败：（1:没次数，2：全部抽完），成功：抽中位置id*/
	private GC_ZHUANPAN_TURN(s: Model_ActHolyBeast, data: BaseBytes) {
		let res = data.readByte();
		let pos = data.readInt();
		if (res == 1) {
			s.zpHaveCt--;
			s.zpPos = pos;
			for (let i = 0; i < s.zpArr.length; i++) {
				let v: Vo_HuoDong = s.zpArr[i];
				if(v.id == pos){
					v.status = 1;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_ZHUANPAN_TURN);
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_ZHUANPAN_RED);

			setTimeout(function () {
				GGlobal.layerMgr.open(UIConst.ACT_HOLYB_ZPSHOW, pos);
			}, 1200);

		} else {
			ViewCommonWarn.text("抽奖失败")
		}

	}

	public static rankData = [];
    public static modId:number = 0;
    public static myjdCount:number = 0;
    public static myRank:number = 0;
    public static endTime:number = 0;
    public static headData = [];
	/**打开界面 [U:名字I:洗练次数]排行I:第一名的职业时装[I:头像id，没有则为0I:国家id，没有则为0I:vip等级，没有则为0I:头像框id，没有则为0]第2、3名的信息I:我的洗练次数I:我的排行I:结束时间*/
	private GC_OPENUI(s: Model_ActHolyBeast, data: BaseBytes) {
		Model_ActHolyBeast.rankData = [];
        Model_ActHolyBeast.headData = [];
        let len = data.readShort();
        for (let i = 0; i < len; i++)
        {
            let rank: XiLianRankVO = new XiLianRankVO();
            rank.readMsg(data);
			if(rank.jdCount >= Config.xtcs_004[5703].num)
			{
           		Model_ActHolyBeast.rankData.push(rank);
			}
        }
        Model_ActHolyBeast.modId = data.readInt();
        len = data.readShort();
        for (let j = 0; j < len; j++)
        {
			let headVO: XiLianHeadVO = new XiLianHeadVO();
			headVO.readMsg(data);
			let rank: XiLianRankVO = Model_ActHolyBeast.rankData[j + 1];
			if(rank && rank.jdCount >= Config.xtcs_004[5703].num)
			{
				Model_ActHolyBeast.headData.push(headVO);
			}
        }
        Model_ActHolyBeast.myjdCount = data.readInt();
        Model_ActHolyBeast.myRank = data.readInt();
        Model_ActHolyBeast.endTime = data.readInt();
        GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XILIAN_RANK);
	}
}
