class Model_LimitGift extends BaseModel {

	static OPENUI = 'openui'
	static GETAWARD = 'getaward'

	public constructor() {
		super();
	}

	/**领取奖励 I:表的id  */
	public CG_GETAWARD_10451(id) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(10451, ba);
	}

	giftArr: VoLimitGift[] = [];


	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let s = this;
		s.socket = wsm;
		wsm.regHand(10450, s.GC_OPENUI_10450, s);
		wsm.regHand(10452, s.GC_GETAWARD_10452, s);
	}

	//限时礼包返回 [I:礼包类型I:结束时间[I:表的idB:状态 0未领取 1可领取 2已领取]]礼包数据
	private GC_OPENUI_10450(s: Model_LimitGift, data: BaseBytes) {
		let len = data.readShort();
		s.giftArr = [];
		let servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		let openV = -1
		for (let i = 0; i < len; i++) {
			let v: VoLimitGift = new VoLimitGift();
			v.readMsg(data);
			if (v.endTime - servTime > 0) {
				s.giftArr.push(v);
			}
			if (openV == -1 && v.endTime - servTime > (2 * 60 * 60 - 60)) {//2小时内
				openV = v.type
			}
		}
		s.giftArr.sort(function (a, b) { return a.type - b.type });
		s.notify(Model_LimitGift.OPENUI);
		s.checkRed();
		if (s.giftArr.length > 0) {
			GGlobal.mainUICtr.addIcon(UIConst.LIMIT_GIFT, GGlobal.reddot.checkCondition(UIConst.LIMIT_GIFT, 0));
		} else {
			GGlobal.mainUICtr.removeIcon(UIConst.LIMIT_GIFT);
		}
		if (openV != -1 && GGlobal.sceneType == SceneCtrl.GUANQIA) {
			if (!DEBUG) GGlobal.layerMgr.open(UIConst.LIMIT_GIFT, openV)
		}
	}

	//领取奖励返回 B:状态 0成功 1配置表没有该id 2未达到条件 3未充值 4已领取I:表的id
	private GC_GETAWARD_10452(s: Model_LimitGift, data: BaseBytes) {
		let res = data.readByte();
		let id = data.readInt();
		if (res == 0) {
			for (let i = 0; i < s.giftArr.length; i++) {
				let v: VoLimitGift = s.giftArr[i];
				let has = false;
				for (let j = 0; j < v.awaArr.length; j++) {
					if (v.awaArr[j].id == id) {
						v.awaArr[j].st = 2;
						has = true;
						break;
					}
				}
				if (has) break;
			}
			s.notify(Model_LimitGift.GETAWARD);
			s.checkRed();
		} else {
			ViewCommonWarn.text(["配置表没有该id", "未达到条件", "未充值", "已领取"][res - 1])
		}
	}

	private checkRed() {
		let s = this;
		let red = s.isRed()
		GGlobal.reddot.setCondition(UIConst.LIMIT_GIFT, 0, red)
		let icon: MainMenuBtn = GGlobal.mainUICtr.getIcon(UIConst.LIMIT_GIFT);
		if (icon) icon.checkNotice = red
	}

	private isRed() {
		let s = this;
		for (let i = 0; i < s.giftArr.length; i++) {
			let arr = s.giftArr[i].awaArr;
			for (let j = 0; j < arr.length; j++) {
				if (arr[j].st == 1) {
					return true;
				}
			}
		}
		return false
	}
}