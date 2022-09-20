class Model_LoginYouJiang extends BaseModel {

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(9160, this.GC_OPENUI_9160, this);
		mgr.regHand(9162, this.GC_GETREWARD_9162, this);
	}

	public loginDay = 0;
	public rewardData: { [id: number]: number };
	/**9160 B-[I-B] 返回界面信息 B:已登录天数loginTimes[I:奖励项idB:领取状态（0：不可领取，1：可领取，2：已领取）]奖励领取状态rewardData*/
	public GC_OPENUI_9160(self: Model_LoginYouJiang, data: BaseBytes): void {
		self.rewardData = {};
		self.loginDay = data.readByte();
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id = data.readInt();
			let state = data.readByte();
			self.rewardData[id] = state;
		}
		GGlobal.control.notify(UIConst.ACTCOM_LOGINREWARD);
	}

	/**9161 I 领取奖励 I:奖励项idid*/
	public CG_GETREWARD_9161(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(9161, bates);
	}

	/**9162 B-I 领取奖励结果 B:结果：0：失败，1：成功rtnCodeI:失败：（1：未满足条件，2：已领取），成功：奖励项idid*/
	public GC_GETREWARD_9162(self: Model_LoginYouJiang, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id = data.readInt();
			self.rewardData[id] = 2;
			GGlobal.control.notify(UIConst.ACTCOM_LOGINREWARD);
		}
	}
}