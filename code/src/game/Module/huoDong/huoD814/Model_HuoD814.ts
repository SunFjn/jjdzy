class Model_HuoD814 extends BaseModel {

	/**登录豪礼 领取奖励 B:类型*/
	public CG_DAILYGIFT_GET(type: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(4631, ba);
	}

	/**单笔充值 领取奖励 I:奖励id*/
	public CG_DAILYONE_GET(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(4651, ba);
	}

	/**累计充值 领取奖励 I:奖励id*/
	public CG_ADDRECHARGE_GET(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(4671, ba);
	}

	/**单日累充 领取奖励 I:奖励id*/
	public CG_DAILYADDUP_GET(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(4691, ba);
	}

	/**连续累充 获取奖励 B:奖励序号*/
	public CG_SEVEN_GET(index) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(index);
		this.sendSocket(7051, ba);
	}

	/**连续累充 获取奖励 B:奖励序号*/
	public CG_SEVEN_GET_TODAY() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(7055, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		//登录豪礼
		wsm.regHand(4630, a.GC_DAILYGIFT_OPENUI, a);
		wsm.regHand(4632, a.GC_DAILYGIFT_GET, a);
		//单笔充值
		wsm.regHand(4650, a.GC_DAILYONE_OPENUI, a);
		wsm.regHand(4652, a.GC_DAILYONE_GET, a);
		//累计充值
		wsm.regHand(4670, a.GC_ADDRECHARGE_OPENUI, a);
		wsm.regHand(4672, a.GC_ADDRECHARGE_GET, a);
		wsm.regHand(4674, a.GC_ADDRECHARGE_CHARGE, a);
		//单日累充
		wsm.regHand(4690, a.GC_DAILYADDUP_OPENUI, a);
		wsm.regHand(4692, a.GC_DAILYADDUP_GET, a);

		//超级点将
		wsm.regHand(4810, a.GC_OPENUI_4810, a);
		wsm.regHand(4812, a.GC_LQ_4812, a);
		//连续累充
		wsm.regHand(7050, a.GC_SEVEN_UI, a);
		wsm.regHand(7052, a.GC_SEVEN_GET, a);
		wsm.regHand(7054, a.GC_SEVEN_CHANGE, a);
		wsm.regHand(7056, a.GC_SEVEN_TODAY, a);
	}

	//登录豪礼
	public static dailyGiftArr: Array<Vo_HuoDong> = [];
	public static dailyGiftQs: number;//期数
	private static _dailyGiftCfg: any
	//单笔充值
	public static dailyOneArr: Array<Vo_HuoDong> = [];
	public static dailyOneQs: number;//期数
	private static _dailyOneCfg: any
	//单日累冲
	public static dailyAddUp: number = 0;
	public static dailyAddUpArr: Array<Vo_HuoDong> = [];
	//累计充值
	public static addRecharge: number = 0;
	public static addRechargeArr: Array<Vo_HuoDong> = [];
	private static _addRechargeCfg: Array<any>
	//连续累充
	public static sevenCount = 0
	public static sevenStatus = 0
	//期数
	public static sevenQs = 0
	//今日充值数
	public static seven = 0
	public static sevenArr = []

	/**打开界面数据返回 [B:类型B:领取状态（0：不可领取，1：可领取，2：已领取）]奖励数据B:开服第几天*/
	private GC_DAILYGIFT_OPENUI(self: Model_HuoD814, data: BaseBytes) {
		Model_HuoD814.dailyGiftQs = data.readByte();
		let len = data.readShort();
		Model_HuoD814.dailyGiftArr = [];
		let day = Model_HuoD814.dailyGiftQs;
		for (let i = 0; i < len; i++) {
			let v: Vo_HuoDong = new Vo_HuoDong();
			v.readMsg(data);
			v.id = day*1000+v.id;
			Model_HuoD814.dailyGiftArr.push(v);
		}
		GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYGIFT_814);
	}

	/**登录豪礼 领取奖励结果 B:0：失败，1：成功B:失败：错误码（1:未满足条件,2:已领取），成功：领取类型*/
	private GC_DAILYGIFT_GET(self: Model_HuoD814, data: BaseBytes) {
		let result = data.readByte();
		let id = data.readByte();
		id = Model_HuoD814.dailyGiftQs*1000+id;
		if (result == 1) {
			for (let i = 0; i < Model_HuoD814.dailyGiftArr.length; i++) {
				if (id == Model_HuoD814.dailyGiftArr[i].id) {
					Model_HuoD814.dailyGiftArr[i].status = 2
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYGIFT_814);
			ViewCommonWarn.text("领取奖励成功")
		} else {
			if (id == 1) {
				ViewCommonWarn.text("未满足条件")
			} else if (id == 2) {
				ViewCommonWarn.text("已领取")
			} else {
				ViewCommonWarn.text("领取失败")
			}
		}
	}

	/**打开ui信息 B:周几[I:序号B:可领取次数B:已领取次数]领取数据*/
	private GC_DAILYONE_OPENUI(self: Model_HuoD814, data: BaseBytes) {
		Model_HuoD814.dailyOneQs = data.readByte();
		let len = data.readShort();
		Model_HuoD814.dailyOneArr = [];
		for (let i = 0; i < len; i++) {
			let v: Vo_HuoDong = new Vo_HuoDong();
			v.readMsgCt(data);
			Model_HuoD814.dailyOneArr.push(v);
		}
		GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYONE_814);
	}

	/**单笔充值 领取奖励 B:状态：1：成功，2：未达到，3：重复领取B:领取奖励id*/
	private GC_DAILYONE_GET(self: Model_HuoD814, data: BaseBytes) {
		let v: Vo_HuoDong = new Vo_HuoDong();
		v.readMsgCt(data);
		if (Model_HuoD814.dailyOneArr.length == 0) {
			Model_HuoD814.dailyOneArr.push(v);
		} else {
			for (let i = 0; i < Model_HuoD814.dailyOneArr.length; i++) {
				if (Model_HuoD814.dailyOneArr[i].id == v.id) {
					Model_HuoD814.dailyOneArr[i].canCt = v.canCt
					Model_HuoD814.dailyOneArr[i].hasCt = v.hasCt
					break;
				}
			}
		}
		GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYONE_814);
	}


	/**累计充值 I:充值金额[B:索引idB:奖励状态]*/
	private GC_ADDRECHARGE_OPENUI(self: Model_HuoD814, data: BaseBytes) {
		Model_HuoD814.addRecharge = data.readInt()
		let len = data.readShort();
		Model_HuoD814.addRechargeArr = [];
		for (let i = 0; i < len; i++) {
			let v: Vo_HuoDong = new Vo_HuoDong();
			v.readMsgInt(data);
			Model_HuoD814.addRechargeArr.push(v);
		}
		Model_HuoD814.addRechargeArr.sort(Model_HuoDong.sortFuc);
		GGlobal.control.notify(Enum_MsgType.HUODONG_ADDRECHARGE_814);
	}

	/**累计充值 奖励变化 B:序号B:奖励状态*/
	private GC_ADDRECHARGE_GET(self: Model_HuoD814, data: BaseBytes) {
		let v: Vo_HuoDong = new Vo_HuoDong();
		v.readMsgInt(data);
		if (v.id != 0) {
			if (Model_HuoD814.addRechargeArr.length == 0) {
				Model_HuoD814.addRechargeArr.push(v);
			} else {
				for (let i = 0; i < Model_HuoD814.addRechargeArr.length; i++) {
					if (Model_HuoD814.addRechargeArr[i].id == v.id) {
						Model_HuoD814.addRechargeArr[i].status = v.status
						break;
					}
				}
			}
			GGlobal.control.notify(Enum_MsgType.HUODONG_ADDRECHARGE_814);
		}
	}

	/**累计充值 充值金额变化 I:金额数量*/
	private GC_ADDRECHARGE_CHARGE(self: Model_HuoD814, data: BaseBytes) {
		Model_HuoD814.addRecharge = data.readInt()
		GGlobal.control.notify(Enum_MsgType.HUODONG_ADDRECHARGE_814);
	}

	/**单日累充 打开ui信息 I:充值数量[B:充值索引B:充值状态]*/
	private GC_DAILYADDUP_OPENUI(self: Model_HuoD814, data: BaseBytes) {
		Model_HuoD814.dailyAddUp = data.readInt();
		let len = data.readShort();
		Model_HuoD814.dailyAddUpArr = [];
		for (let i = 0; i < len; i++) {
			let v: Vo_HuoDong = new Vo_HuoDong();
			v.readMsgInt(data);
			Model_HuoD814.dailyAddUpArr.push(v);
		}
		Model_HuoD814.dailyAddUpArr.sort(Model_HuoDong.sortFuc);
		GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYADDUP_814);
	}

	/**单日累充 获取奖励  I:充值数据I:序号B:奖励状态*/
	private GC_DAILYADDUP_GET(self: Model_HuoD814, data: BaseBytes) {
		Model_HuoD814.dailyAddUp = data.readInt();
		let v: Vo_HuoDong = new Vo_HuoDong();
		v.readMsgInt(data);
		if (v.id != 0) {
			if (Model_HuoD814.dailyAddUpArr.length == 0) {
				Model_HuoD814.dailyAddUpArr.push(v);
			} else {
				for (let i = 0; i < Model_HuoD814.dailyAddUpArr.length; i++) {
					if (Model_HuoD814.dailyAddUpArr[i].id == v.id) {
						Model_HuoD814.dailyAddUpArr[i].status = v.status
						break;
					}
				}
			}
		}
		GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYADDUP_814);
	}

	public static getCfg814(hid): any {
		if (hid == UIConst.HUODONG_DAILY_GIFT814) {
			return Config.dlhl3_732
		} else if (hid == UIConst.HUODONG_DAILY_ONE814) {
			return Config.dbcz3_733
		} else if (hid == UIConst.HUODONG_ADD_RECHARGE814) {
			return Config.leichong3_725
		} else if (hid == UIConst.HUODONG_DAILY_ADDUP814) {
			return Config.drlc3_734
		}else if (hid == UIConst.HUODONG_SEVEN814) {
			return Config.lxlc3_745
		}
	}


	rechargeVal = 0;//当前充值金额
	CJDJ_index = 0;
	CJDJ_count = 0;
	CJDJ_data = [];
	CJDJ_qs = 0;//期数
	// CJDJ_qishu = 0;//当前期数
	CJDJ_hasGet = 0;//已经抽到了多少次
	/** I-B-B-[B-B-I-I]
	 打开界面返回 I:已经充值的元宝数B:下次抽奖次数,对应配置表抽奖次数B:剩余点将次数[B:状态，0：未领取，2：已领取B:奖品类型I:奖品idI:奖品数量]奖品列表*/
	private GC_OPENUI_4810(s: Model_HuoD814, data: BaseBytes) {
		s.rechargeVal = data.readInt();
		s.CJDJ_index = data.readInt();
		s.CJDJ_qs = Math.floor(s.CJDJ_index / 1000) + 1;
		s.CJDJ_count = data.readByte();
		GGlobal.reddot.setCondition(UIConst.HUODONG_DIANJIAN814, 0, s.CJDJ_count > 0);
		GGlobal.reddot.notify(ReddotEvent.CHECK_HUODONG);
		let i = data.readShort();
		s.CJDJ_data = [];
		s.CJDJ_hasGet = 0;
		for (let j = 0; j < i; j++) {
			let st = data.readByte();
			let type = data.readByte();
			let id = data.readInt();
			let count = data.readInt();
			if (type > 0) s.CJDJ_hasGet++;
			s.CJDJ_data.push([st, type, id, count]);
		}
		// s.CJDJ_qishu = data.readInt();
		GGlobal.control.notify(Enum_MsgType.HD_CJDJ);
	}


	public CG_LQ_4811(i) {
		let ba = this.getBytes();
		ba.writeByte(i);
		this.sendSocket(4811, ba);
	}

	/**B-B-B-I-I 领取奖励返回 B:状态，0：奖励不存在，1：成功，2：无抽奖次数，3：不可重复领取B:返回的奖励idB:奖励类型I:奖励idI:奖励数量*/
	private GC_LQ_4812(self: Model_HuoD814, data: BaseBytes) {
		let r = data.readByte();
		let id = data.readByte();
		if (r == 1) {
			self.CJDJ_hasGet++;
			self.CJDJ_count--;
			GGlobal.reddot.setCondition(UIConst.HUODONG_DIANJIAN814, 0, self.CJDJ_count > 0);
			GGlobal.reddot.notify(ReddotEvent.CHECK_HUODONG);
			let arr = [2, data.readByte(), data.readInt(), data.readInt()];
			self.CJDJ_data[id - 1] = arr;
			let awards = ConfigHelp.makeItemListArr([[arr[1], arr[2], arr[3]]]);
			GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, awards);
			GGlobal.control.notify(Enum_MsgType.HD_CJDJLQ);
		}
		else if (r == 2)
			ViewCommonWarn.text("无抽奖次数");
		else if (r == 3)
			ViewCommonWarn.text("不可重复领取");
	}



	/** 打开ui返回 I:今日充值x元B:期数B:达标次数B:今日奖励领取情况[I:大奖奖励序号B:大奖励状态]*/
	private GC_SEVEN_UI(self: Model_HuoD814, data: BaseBytes): void {
		Model_HuoD814.seven = data.readInt();
		Model_HuoD814.sevenQs = data.readByte();
		Model_HuoD814.sevenCount = data.readByte();
		Model_HuoD814.sevenStatus = data.readByte();
		var len = data.readShort();
		Model_HuoD814.sevenArr = [];
		for (let i = 0; i < len; i++) {
			let v: Vo_HuoDong = new Vo_HuoDong();
			v.readMsgInt(data);
			Model_HuoD814.sevenArr.push(v);
		}
		GGlobal.control.notify(Enum_MsgType.HUODONG_SEVEN_814);
	}

	/**连续累充 奖励发生变化（红点更新） B:奖励序号B:奖励状态*/
	private GC_SEVEN_GET(self: Model_HuoD814, data: BaseBytes): void {
		let $v: Vo_HuoDong = new Vo_HuoDong();
		$v.readMsgInt(data);
		if ($v.id != 0) {
			if (Model_HuoD814.sevenArr.length == 0) {
				Model_HuoD814.sevenArr.push($v);
			} else {
				for (let i = 0; i < Model_HuoD814.sevenArr.length; i++) {
					let v = Model_HuoD814.sevenArr[i]
					if (v.id == $v.id) {
						v.status = $v.status;
						break;
					}
				}
			}
		}
		GGlobal.control.notify(Enum_MsgType.HUODONG_SEVEN_814);
	}

	/**发生变化 B:累计次数变化B:奖励序号B:奖励状态*/
	private GC_SEVEN_CHANGE(self: Model_HuoD814, data: BaseBytes): void {
		Model_HuoD814.sevenCount = data.readByte();
		self.GC_SEVEN_GET(self,data)
	}

	/**今日奖励状态变化 B:奖励状态*/
	private GC_SEVEN_TODAY(self: Model_HuoD814, data: BaseBytes): void {
		Model_HuoD814.sevenStatus = data.readByte();
		Model_HuoD814.seven = data.readInt();
		GGlobal.control.notify(Enum_MsgType.HUODONG_SEVEN_814);
	}
}