class Model_HFSC extends BaseModel {
	public scData: number[] = [];
	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(9630, this.GC_HeFuFristRecharge_openUi_9630, this);
		mgr.regHand(9632, this.GC_HeFuFristRecharge_getreward_9632, this);
	}

	/**9630 [I-B] GC 打开ui返回 [I:奖励状态B:0不可以领取1可以领取2已经领取了]rewardstate*/
	public GC_HeFuFristRecharge_openUi_9630(self: Model_HFSC, data: BaseBytes): void {
		let red = false;
		self.scData = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let rewardID = data.readInt();
			let state = data.readByte();
			self.scData[rewardID - 1] = state;
			if (state == 1) {
				red = true;
			}
		}
		GGlobal.reddot.setCondition(UIConst.HFKH_HFSC, 0, red);
		GGlobal.reddot.notifyMsg(UIConst.HFKH_HFSC);
		GGlobal.control.notify(UIConst.HFKH_HFSC);
	}

	/**9631 I CG 获取奖励 I:奖励序号index*/
	public CG_HeFuFristRecharge_getreward_9631(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(9631, bates);
	}

	/**9632 I-B GC 奖励状态变化 I:奖励序号indexB:奖励状态state*/
	public GC_HeFuFristRecharge_getreward_9632(self: Model_HFSC, data: BaseBytes): void {
		let red = false;
		let rewardID = data.readInt();
		let state = data.readByte();
		self.scData[rewardID - 1] = state;
		for (let i = 0; i < self.scData.length; i++) {
			if (self.scData[rewardID - 1] == 1) {
				red = true;
				break;
			}
		}
		GGlobal.reddot.setCondition(UIConst.HFKH_HFSC, 0, red);
		GGlobal.reddot.notifyMsg(UIConst.HFKH_HFSC);
		GGlobal.control.notify(UIConst.HFKH_HFSC);
	}
}