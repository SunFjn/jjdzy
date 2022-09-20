class ModelYSSL extends BaseModel {
	constructor() {
		super();
	}
	static OPEN = "open_yssl";

	/**激活数据*/
	act_data: any = {};
	/**taskdata*/
	task_data: any = {};
	qs = 1;
	today_recharge_val = 0;

	//根据 配置去获取
	private _lastqs = 1;
	private _typeConfigData;
	public getCFGByIndex(type) {
		let s = this;
		let lib = Config.ysslrw_018;
		let nowQS = s.qs;
		if (!s._typeConfigData || nowQS != s._lastqs) {
			s._lastqs = nowQS;
			let temp = [];
			for (let i in lib) {
				let item = lib[i];
				if (item.qishu != nowQS) continue;
				let lx = item.leixing;
				if (!temp[lx]) {
					temp[lx] = [];
					s.act_data[lx] = 0;
				}
				temp[lx].push(item);
				s.task_data[item.id] = { st: 4, count: 0 };
			}
			temp.forEach((val, idx, array) => {
				if (val) {
					Array(val).sort((a, b) => {
						return a.id > b.id ? 1 : -1;
					});
				}
			}
			);
			s._typeConfigData = temp;
		}
		return s._typeConfigData[type];
	}

	//根据 配置去获取
	private _lastQcylQs = 1;
	private _typeConfigDataByQcyl;
	public getCFGByIndex1(type:number, qs:number) {
		let s = this;
		let lib = Config.qcylrw_327;
		let nowQS = qs;
		if (!s._typeConfigDataByQcyl || nowQS != s._lastQcylQs) {
			s._lastQcylQs = nowQS;
			let temp = [];
			for (let i in lib) {
				let item = lib[i];
				if (item.qishu != nowQS) continue;
				let lx = item.leixing;
				if (!temp[lx]) {
					temp[lx] = [];
					s.qcyl_act_data[lx] = 0;
				}
				temp[lx].push(item);
				s.qcyl_task_data[item.id] = { st: 4, count: 0 };
			}
			temp.forEach((val, idx, array) => {
				if (val) {
					Array(val).sort((a, b) => {
						return a.id > b.id ? 1 : -1;
					});
				}
			}
			);
			s._typeConfigDataByQcyl = temp;
		}
		return s._typeConfigDataByQcyl[type];
	}

	private _qs1;
	private _priceConfigData;
	public getPriceByType(type) {
		let s = this;
		let nowQS = s.qs;
		if (!s._priceConfigData || nowQS != s._qs1) {
			s._qs1 = nowQS;
			let lib = Config.yssljh_018;
			s._priceConfigData = [];
			for (let i in lib) {
				let item = lib[i];
				if (item.qishu == nowQS) {
					s._priceConfigData[item.dengji] = item;
				}
			}
		}
		return s._priceConfigData[type];
	}

	private _qcyl_qs1;
	private _qcyl_priceConfigData;
	public getPriceByType1(type:number) {
		let s = this;
		let nowQS = s.qcyl_qs;
		if (!s._qcyl_priceConfigData || nowQS != s._qcyl_qs1) {
			s._qcyl_qs1 = nowQS;
			let lib = Config.qcyljh_327;
			s._qcyl_priceConfigData = [];
			for (let i in lib) {
				let item = lib[i];
				if (item.qishu == nowQS) {
					s._qcyl_priceConfigData[item.dengji] = item;
				}
			}
		}
		return s._qcyl_priceConfigData[type];
	}

	public checkNotice(actId:number) {
		// let task = this.task_data;
		// let act = this.act_data;
		let task;
		let act;
		let recharge:number = 0;
		if(actId == UIConst.YSSL)
		{
			task = this.task_data;
			act = this.act_data;
			recharge = this.today_recharge_val;
		}else if(actId == UIConst.YUNCHOUWEIWO_QCYL)
		{
			task = this.qcyl_task_data;
			act = this.qcyl_act_data;
			recharge = this.qcyl_recharge_val;
		}
		let reddot = {};//type:value
		for (let i in task) {
			let item = task[i];
			let id = Number(i);
			// let cfg = Config.ysslrw_018[id];
			let cfg;
			if(actId == UIConst.YSSL)
			{
				cfg = Config.ysslrw_018[id];
			}else if(actId == UIConst.YUNCHOUWEIWO_QCYL){
				cfg = Config.qcylrw_327[id];
			}
			if (reddot[cfg.leixing]) {
				continue;
			}
			// if (!act[cfg.leixing]) {
			// 	DEBUGWARING.log("not active id：" + id);
			// 	continue;
			// }
			if (!reddot[cfg.leixing]) {
				reddot[cfg.leixing] = 0;
			}
			if (item.st == 1) {
				reddot[cfg.leixing] = 1;
			}
		}

		let priceCFG;
		let main_reddot = 0;
		for (let i in reddot) {
			if(reddot[i] == 0)
			{
				if(actId == UIConst.YSSL)
				{
					priceCFG = this.getPriceByType(Number(i));
				}else if(actId == UIConst.YUNCHOUWEIWO_QCYL){
					priceCFG = this.getPriceByType1(Number(i));
				}
				if(act[Number(i)] == 0 && recharge >= priceCFG.rmb)
				{
					reddot[i] = 1;
				}
			}
			if (!main_reddot) main_reddot = reddot[i];
			// GGlobal.reddot.setCondition(UIConst.YSSL, Number(i), reddot[i]);
			GGlobal.reddot.setCondition(actId, Number(i), reddot[i]);
		}
		// GGlobal.reddot.setCondition(UIConst.YSSL, 0, main_reddot == 1);
		// GGlobal.reddot.notify(UIConst.YSSL);
		GGlobal.reddot.setCondition(actId, 0, main_reddot == 1);
		// GGlobal.reddot.notify(actId);
		GGlobal.reddot.notifyMsg(actId);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(9220, this.GC_SpecialAnimalSendGift_openUI_9220, this);
		mgr.regHand(9222, this.GC_SpecialAnimalSendGift_active_9222, this);
		mgr.regHand(9224, this.GC_SpecialAnimalSendGift_getAward_9224, this);

		//运筹帷幄-奇策有礼
		mgr.regHand(9950, this.GC_YCWW_QCYL_openUI, this);
		mgr.regHand(9952, this.GC_YCWW_QCYL_active, this);
		mgr.regHand(9954, this.GC_YCWW_QCYL_getAward, this);
	}

	/**9220 [I-B-I-[I-B]]-I-B 打开界面返回 [I:任务类型B:是否激活 0未激活，1激活I:参数[I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]]奖励列表awardListI:累计充值数totalRechargeB:期数qishu*/
	public GC_SpecialAnimalSendGift_openUI_9220(self: ModelYSSL, data: BaseBytes): void {
		self.act_data = {};
		self.task_data = {};
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let type = data.readInt();
			let act_st = data.readByte();
			let pro = data.readInt();
			let len1 = data.readShort();
			self.act_data[type] = act_st;
			for (let i = 0; i < len1; i++) {
				let ids = data.readInt();
				let state = data.readByte();
				state = act_st == 0 ? 4 : state;//未开放默认为4的状态未激活
				self.task_data[ids] = { st: state, count: pro };
			}
		}
		self.today_recharge_val = data.readInt();
		self.qs = data.readByte();
		self.checkNotice(UIConst.YSSL);
		GGlobal.control.notify(ModelYSSL.OPEN);
	}

	/**9221 B 激活 B:任务类型type*/
	public CG_SpecialAnimalSendGift_active_9221(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(9221, bates);
	}

	/**9222 B-B 激活返回 B:领取状态，1:成功，2:未达到条件，3:已激活stateB:任务类型type*/
	public GC_SpecialAnimalSendGift_active_9222(self: ModelYSSL, data: BaseBytes): void {
		let st = data.readByte();
		let type = data.readByte();
		if(st==1)self.act_data[type] = st;
		GGlobal.control.notify(ModelYSSL.OPEN);
	}

	/**9223 I 领取奖励 I:配置表idid*/
	public CG_SpecialAnimalSendGift_getAward_9223(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(9223, bates);
	}

	/**9224 B-I 领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取stateI:配置表idid*/
	public GC_SpecialAnimalSendGift_getAward_9224(self: ModelYSSL, data: BaseBytes): void {
		let st = data.readByte();
		if (st == 1) {
			let id = data.readInt();
			self.task_data[id].st = 2;
			self.checkNotice(UIConst.YSSL);
			GGlobal.control.notify(ModelYSSL.OPEN);
		} else {
			ViewCommonWarn.text("领取失败");
		}
	}

	public static QCYL_OPEN = "open_qcyl";
	/**激活数据*/
	public qcyl_act_data: any = {};
	/**taskdata*/
	public qcyl_task_data: any = {};
	public qcyl_qs:number = 1;
	public qcyl_recharge_val:number = 0;
	/**9950 打开界面返回 [B:任务类型B:是否激活 0未激活，1激活I:参数[I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]]奖励列表I:累计充值数*/
	public GC_YCWW_QCYL_openUI(self: ModelYSSL, data: BaseBytes): void {
		self.qcyl_act_data = {};
		self.qcyl_task_data = {};
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let type = data.readByte();
			let act_st = data.readByte();
			let pro = data.readInt();
			let len1 = data.readShort();
			self.qcyl_act_data[type] = act_st;
			for (let i = 0; i < len1; i++) {
				let ids = data.readInt();
				let state = data.readByte();
				state = act_st == 0 ? 4 : state;//未开放默认为4的状态未激活
				self.qcyl_task_data[ids] = { st: state, count: pro };
			}
		}
		self.qcyl_recharge_val = data.readInt();
		self.checkNotice(UIConst.YUNCHOUWEIWO_QCYL);
		GGlobal.control.notify(ModelYSSL.QCYL_OPEN);
	}

	/**9951 B 激活 B:任务类型type*/
	public CG_YCWW_QCYL_active(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(9951, bates);
	}

	/**9952 激活返回 B:领取状态，1:成功，2:未达到条件，3:已激活B:任务类型*/
	public GC_YCWW_QCYL_active(self: ModelYSSL, data: BaseBytes): void {
		let st = data.readByte();
		let type = data.readByte();
		if(st==1)self.qcyl_act_data[type] = st;
		GGlobal.control.notify(ModelYSSL.QCYL_OPEN);
	}

	/**9953 领取奖励 I:配置表id*/
	public CG_YCWW_QCYL_getAward(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(9953, bates);
	}

	/**9954  领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:配置表id */
	public GC_YCWW_QCYL_getAward(self: ModelYSSL, data: BaseBytes): void {
		let st = data.readByte();
		if (st == 1) {
			let id = data.readInt();
			self.qcyl_task_data[id].st = 2;
			self.checkNotice(UIConst.YUNCHOUWEIWO_QCYL);
			GGlobal.control.notify(ModelYSSL.QCYL_OPEN);
		} else {
			ViewCommonWarn.text("领取失败");
		}
	}
}