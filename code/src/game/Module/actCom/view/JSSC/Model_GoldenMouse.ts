/**
 * Model_GoldenMouse
 * 金鼠送财
 */
class Model_GoldenMouse extends BaseModel {

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		self.socket = mgr;
		//注册GC方法
		mgr.regHand(11580, self.GC_GoldenMouse_openUi_11580, self);
		mgr.regHand(11582, self.GC_GoldenMouse_buy_11582, self);
	}

	public chongzhiNum = 0;
	public buyNum = 0;
	public numMax = 0;
	/**11580 I-I-I GC 金鼠送财ui I:充值数量rechargeNumI:已经购买次数hasBuyNumI:当前总购买次数buyNumMaxI:以获取总元宝数*/
	public GC_GoldenMouse_openUi_11580(self: Model_GoldenMouse, data: BaseBytes): void {
		self.chongzhiNum = data.readInt();
		self.buyNum = data.readInt();
		self.numMax = data.readInt();
		let arg1 = data.readInt();
		GGlobal.control.notify(UIConst.ACTCOM_JSSC);
	}

	/**11581  CG购买投资 */
	public CG_GoldenMouse_buy_11581(): void {
		var bates = this.getBytes();
		this.sendSocket(11581, bates);
	}

	/**11582 B-I GC 购买投资返回 B:0成功 1元宝不足 2次数不够restI:已经购买次数hasBuyNum:获取元宝数*/
	public GC_GoldenMouse_buy_11582(self: Model_GoldenMouse, data: BaseBytes): void {
		let arg1 = data.readByte();
		if (arg1 == 0) {
			self.buyNum = data.readInt();
			let money = data.readInt();
			let cfg1 = Config.jssc_774[self.buyNum + 1];
			if (!cfg1) {
				cfg1 = Config.jssc_774[self.buyNum];
			}
			let costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg1.xh))[0];
			GGlobal.reddot.setCondition(UIConst.ACTCOM_JSSC, 0, self.numMax - self.buyNum > 0 && Model_player.voMine.yuanbao >= costItem.count);
			GGlobal.reddot.notifyMsg(UIConst.ACTCOM_JSSC);
			GGlobal.control.notify(UIConst.ACTCOM_JSSC_EFF, money);
			GGlobal.control.notify(UIConst.ACTCOM_JSSC);
		}
	}

}