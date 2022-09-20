class ModelVip extends BaseModel {
	public constructor() {
		super();
	}

	vip = 0;
	exp = 0;
	headState = 0;
	dta: any[];
	setVip(lv) {
		var v = Model_player.voMine;
		v.viplv = lv;
		this.vip = lv;
		GGlobal.control.notify(Enum_MsgType.VIP_CHANGE);
	}

	hasBuyTotalTq() {
		let i = 0;
		let s = this;
		for (i; i < 3; i++) {
			if (s.tq_dta[i] && s.tq_dta[i][0]) {
				continue;
			} else {
				return false;
			}
		}
		return true;
	}

	private _maxVip = 0;
	getMaxVip() {
		if (this._maxVip < 1) {
			let cfg = Config.VIP_710;
			for (let i in cfg) {
				this._maxVip++;
			}
		}
		return this._maxVip - 1;
	}

	_icons = [4205,500401, 500402, 500403];
	//特权卡
	tq_dta: any[] = [];
	/**
	 * 当前是否是某种卡的用户
	 * 1 黄金 2铂金 3至尊
	*/
	getTeQuan(t): boolean {
		let i = 0;
		let s = this;
		for (i; i < s.tq_dta.length; i++) {
			if (s.tq_dta[i][0] == t) {
				return true;
			}
		}
		return false;
	}

	setNotice() {
		let sf = this;
		let d = GGlobal.modelvip.tq_dta;
		for (var i = 0; i < 3; i++) {
			let idx = i + 1;
			let arr = [idx, -1, 0];
			if (d) {
				let j = 0;
				for (j; j < d.length; j++) {
					if (d[j][0] == idx) {
						arr = d[j];
						break;
					}
				}
			}
			GGlobal.reddot.setCondition(this._icons[idx], 0, arr[1] == 0);
		}
	}

	//============特权卡 END


	//==================vip礼包
	vipGiftData: any[] = [];
	checkGift() {
		let red = GGlobal.reddot;
		let ret = this.vipGiftData.length < this.vip + 1;
		red.setCondition(UIConst.VIPGIFT, 0, ret);
		red.notifyMsg(UIConst.VIP);
	}
	//==================vip礼包 END

	//传入VIP等级获取配置
	getCfgByVip(lv) {
		let idx = lv + 1;
		if (Config.VIP_710[idx])
			return Config.VIP_710[idx];
		return null;
	}

	public listenServ(s: WebSocketMgr) {
		let a = this;
		this.socket = s;
		s.regHand(2062, a.GC_OPENUI_2062, a);
		s.regHand(2064, a.GC_LINGQU_2064, a);

		s.regHand(2172, a.GC_TQ_2172, a);
		s.regHand(2174, a.GC_LTQ_2174, a);
		s.regHand(2176, a.GC_LTQ_2176, a);

		s.regHand(2066, a.GC_VIPGIFT_2066, a);
	}

	public CG_OPENUI_2061() {
		this.sendSocket(2061, this.getBytes());
	}

	/**
	 * 2062 B-I-[B]-[B]
	 *vip界面数据 B:vip等级vipLevelI:vip经验vipExp[B:已领取奖励的vip等级]已领取vip奖励的数据getAwardData[B:已购买的vip礼包]礼包数据giftData
	*/
	private GC_OPENUI_2062(s: ModelVip, b: BaseBytes) {
		s.setVip(b.readByte());
		s.exp = b.readInt();
		let len = b.readShort();
		s.dta = [];
		for (let i = 0; i < len; i++)
			s.dta.push(b.readByte());
		let len1 = b.readShort();
		s.vipGiftData = [];
		for (let i = 0; i < len1; i++)
			s.vipGiftData.push(b.readByte());
		s.checkGift();
		GGlobal.control.notify(Enum_MsgType.VIP_OPEN);
	}
	/**
	 * 2063 B
	 * 领取vip奖励 B:vip等级
	*/
	public CG_LINGQU_2063(i) {
		let b = this.getBytes();
		b.writeByte(i);
		this.sendSocket(2063, b);
	}
	/**
	 * 2064 	B-B
	 * 领取vip奖励结果 B:0：失败，1：成功B:失败：错误码（1:已领取），成功：对应奖励的vipLevel
	*/
	private GC_LINGQU_2064(s: ModelVip, b: BaseBytes) {
		var r = b.readByte();
		if (r == 1) {
			var lv = b.readByte();
			s.dta.push(lv);
			GGlobal.control.notify(Enum_MsgType.VIP_LQ);
		} else {
			ViewCommonWarn.text("领取失败");
		}
	}

	/**
	 * 打开特权卡界面
	*/
	public CG_TQ_2171() {
		this.sendSocket(2171, this.getBytes());
	}
	/**2172 [B-B-I]-B
	 * 权卡信息返回 [B:特权卡idB:每日领取状态（0：未领取，1：已领取）I:剩余时间]特权卡每日奖励状态数据 （0未领取 1可领取 2已领取）
	*/
	private GC_TQ_2172(s: ModelVip, b: BaseBytes) {
		s.tq_dta = [];
		let len = b.readShort();
		for (let i = 0; i < len; i++) {
			s.tq_dta.push([b.readByte(), b.readByte(), b.readInt() * 1000 + egret.getTimer()]);
		}
		s.headState = b.readByte();
		s.setNotice();
		GGlobal.control.notify(Enum_MsgType.TQ_INFO);
	}
	/**
	 * 领取每日奖励 B:特权卡id
	*/
	public CG_LTQ_2173(i) {
		let b = this.getBytes();
		b.writeByte(i);
		this.sendSocket(2173, b);
	}

	/**2174 	B-B
	 *领取每日奖励结果 B:0：失败，1：成功B:特权卡id
	*/
	private GC_LTQ_2174(s: ModelVip, b: BaseBytes) {
		let r = b.readByte();
		if (r == 1) {
			let id = b.readByte();
			let i = 0;
			for (i; i < s.tq_dta.length; i++) {
				if (s.tq_dta[i][0] == id) {
					s.tq_dta[i][1] = 1;
					break;
				}
			}
			s.setNotice();
			GGlobal.control.notify(Enum_MsgType.TQ_LQ);
		} else {
			ViewCommonWarn.text("领取失败");
		}
	}

	/**
	 * 领取吕布头像
	*/
	public CG_LTQ_2175() {
		let b = this.getBytes();
		this.sendSocket(2175, b);
	}

	/**特权卡 领取吕布头像*/
	private GC_LTQ_2176(s: ModelVip, b: BaseBytes) {
		let ret = b.readByte();
		if (ret == 1) {
			s.headState = 2;
			GGlobal.control.notify(Enum_MsgType.TQ_LQ);
			ViewCommonWarn.text("领取成功");
		} else {
			ViewCommonWarn.text("领取失败");
		}
	}

	public CG_VIPGIFT_2065(i) {
		let b = this.getBytes();
		b.writeInt(i);
		this.sendSocket(2065, b);
	}

	/**领取VIP礼包*/
	private GC_VIPGIFT_2066(s: ModelVip, b: BaseBytes) {
		let ret = b.readByte();
		let idx = b.readInt();
		if (ret == 0) {
			if (idx == 1) {
				ViewCommonWarn.text("VIP等级不足");
			} else if (idx == 2) {
				ModelChongZhi.guideToRecharge();
			}
		} else if (ret == 1) {
			s.vipGiftData.push(idx);
			s.checkGift();
			GGlobal.control.notify(UIConst.VIP);
			ViewCommonWarn.text("领取成功");
		}
	}
}