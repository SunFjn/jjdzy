/**
 * Model_ConsumeSmashEgg
 * 消费砸蛋
 */
class Model_ConsumeSmashEgg extends BaseModel {

	public checkNotice() {
		let self = this;
		let index = 0;
		let ret = false;
		for (let i = 0; i < 3; i++) {
			if (self.eggData[i][0] > 0) {
				index++;
			}
		}

		if (index >= 3 || self.surNum > 0) {
			ret = true;
		}
		return ret;
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(9502, this.GC_ConsumeSmashEgg_openUI_9502, this);
		mgr.regHand(9504, this.GC_ConsumeSmashEgg_smashEgg_9504, this);
	}

	public itemIDArr = [];
	public eggData: number[][] = [];
	public surNum = 0;
	public costMoney = 0;
	public drawNum = 0;
	public playIndex = -1;
	/**9502 打开消费砸蛋返回 [I:已领取大奖id][B:道具类型 I:道具Id I:数量]S:剩余次数S:已砸次数I:当前消费元宝*/
	public GC_ConsumeSmashEgg_openUI_9502(self: Model_ConsumeSmashEgg, data: BaseBytes): void {
		self.itemIDArr = [];
		self.eggData = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let itemID = data.readInt();
			self.itemIDArr.push(itemID);
		}
		let len1 = data.readShort();
		for (let i = 0; i < len1; i++) {
			let itemArr = [data.readByte(), data.readInt(), data.readInt()];
			self.eggData.push(itemArr);
		}
		self.surNum = data.readShort();
		self.drawNum = data.readShort();
		self.costMoney = data.readInt();
		GGlobal.reddot.setCondition(UIConst.ACTCOM_XFZD, 0, self.checkNotice());
		GGlobal.control.notify(UIConst.ACTCOM_XFZD);
		GGlobal.reddot.notifyMsg(UIConst.ACTCOM_XFZD);
	}

	/**9503 B 砸蛋 B:砸蛋索引(0、1、2)index*/
	public CG_ConsumeSmashEgg_smashEgg_9503(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(9503, bates);
	}

	/**9504 砸蛋返回 B:状态：1.成功 2.该蛋已砸 3.没有剩余次数 4.参数错误 5.背包已满[I:已领取大奖id][B:0.未砸 1.已砸 B:道具类型 I:道具Id I:数量]S:剩余次数S:已砸次数I:当前消费元宝*/
	public GC_ConsumeSmashEgg_smashEgg_9504(self: Model_ConsumeSmashEgg, data: BaseBytes): void {
		let result = data.readByte();
		switch (result) {
			case 1:
				self.itemIDArr = [];
				self.eggData = [];
				let len = data.readShort();
				for (let i = 0; i < len; i++) {
					let itemID = data.readInt();
					self.itemIDArr.push(itemID);
				}
				let len1 = data.readShort();
				for (let i = 0; i < len1; i++) {
					let itemArr = [data.readByte(), data.readInt(), data.readInt()];
					self.eggData.push(itemArr);
				}
				self.surNum = data.readShort();
				self.drawNum = data.readShort();
				self.costMoney = data.readInt();
				GGlobal.reddot.setCondition(UIConst.ACTCOM_XFZD, 0, self.checkNotice());
				GGlobal.control.notify(Enum_MsgType.ACTCOM_XFZD_SHOWEFF);
				GGlobal.control.notify(UIConst.ACTCOM_XFZD);
				GGlobal.reddot.notifyMsg(UIConst.ACTCOM_XFZD);
				break;
		}
	}
}