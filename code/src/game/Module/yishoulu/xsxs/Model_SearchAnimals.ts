/**
 * Model_SearchAnimals
 * 仙山寻兽
 */
class Model_SearchAnimals extends BaseModel {


	public checkNotcie() {
		let self = this;
		let count = Model_Bag.getItemCount(self.itemID);
		let ret = count > 0;
		if (!ret) {
			for (let key in self.rewardData) {
				if (self.rewardData[key] > 0) {
					ret = true;
					break;
				}
			}
		}
		return ret;
	}
	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		self.socket = mgr;
		//注册GC方法
		mgr.regHand(8762, self.GC_SearchAnimals_openUI_8762, self);
		mgr.regHand(8764, self.GC_SearchAnimals_search_8764, self);
		mgr.regHand(8766, self.GC_SearchAnimals_getAward_8766, self);
		mgr.regHand(8768, self.GC_XIANSHAN_XUNSHOU_RESET, self);
	}

	public itemID = 410099;
	public xunShouData: { [id: number]: IGridImpl };
	public rewardData: { [id: number]: number } = {};
	public jifen = 0;
	public static hasData: boolean = false;
	/**8762 [I-I-I-I-B]-[I-B]-I 打开仙山寻兽界面信息返回 [I:寻兽ID  I:道具类型  I:道具ID  I:数量  B:状态：0.未开  1.已开启]
	 * 寻兽信息searchInfo[I:积分ID  B:状态：-1.已领取  0.未达到积分奖励  >0.数量红点]积分奖励信息rewardInfoI:积分score*/
	public GC_SearchAnimals_openUI_8762(self: Model_SearchAnimals, data: BaseBytes): void {
		Model_SearchAnimals.hasData = true;
		self.xunShouData = {};
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id = data.readInt();
			let vo = ConfigHelp.parseItemBa(data);
			self.xunShouData[id] = vo;
		}
		let len1 = data.readShort();
		for (let i = 0; i < len1; i++) {
			let jifenID = data.readInt();
			let state = data.readByte();
			self.rewardData[jifenID] = state;
		}
		self.jifen = data.readInt();
		GGlobal.control.notify(UIConst.XIANSHAN_XUNSHOU);
	}

	/**8763 I 寻兽 I:寻兽ID，0.为一键寻兽id*/
	public CG_SearchAnimals_search_8763(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(8763, bates);
	}

	/**8764 寻兽返回 B:状态：1.成功 2.元宝不足 3.参数错误 4.该位置已寻过 5.背包已满 [I:寻兽ID B:道具类型I:道具IDI:道具数量]
	 * [I:积分ID B:积分奖励状态：-1.已领取 0.未达到积分奖励 >0.数量红点]I:积分*/
	public GC_SearchAnimals_search_8764(self: Model_SearchAnimals, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			ViewCommonWarn.text("寻兽成功");
			let len = data.readShort();
			let arr = [];
			for (let i = 0; i < len; i++) {
				let id = data.readInt();
				let vo = ConfigHelp.parseItemBa(data);
				self.xunShouData[id] = vo;
				arr.push(id);
			}
			let len1 = data.readShort();
			for (let i = 0; i < len1; i++) {
				let jifenID = data.readInt();
				let state = data.readByte();
				self.rewardData[jifenID] = state;
			}
			self.jifen = data.readInt();
			GGlobal.control.notify(UIConst.XIANSHAN_XUNSHOU);
			GGlobal.control.notify(Enum_MsgType.XIANSHAN_XUNSHOU_SHOWEFF, arr);
		}
	}

	/**8765 I 领取积分奖励 I:积分IDid*/
	public CG_SearchAnimals_getAward_8765(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(8765, bates);
	}

	/**8766 领取积分奖励返回 B:状态：1.成功 2.积分未达成 3.参数错误 4.已领取 5.背包已满I:领取积分ID B:奖励倍数(数量红点)*/
	public GC_SearchAnimals_getAward_8766(self: Model_SearchAnimals, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let jifenID = data.readInt();
			let state = data.readByte();
			self.rewardData[jifenID] = state;
			GGlobal.control.notify(UIConst.XIANSHAN_XUNSHOU);
			GGlobal.control.notify(Enum_MsgType.XIANSHAN_XUNSHOU_REWARD);
		}
	}

	/**8761  打开仙山寻兽界面 */
	public CG_SearchAnimals_openUI_8761(): void {
		var bates = this.getBytes();
		this.sendSocket(8761, bates);
	}

	/**8767	重置 */
	public CG_XIANSHAN_XUNSHOU_RESET(): void {
		var bates = this.getBytes();
		this.sendSocket(8767, bates);
	}

	/**8768	重置返回 B:状态：1.成功 2.未全部寻完不能重置 */
	public GC_XIANSHAN_XUNSHOU_RESET(self: Model_SearchAnimals, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			self.xunShouData = {};
			GGlobal.control.notify(UIConst.XIANSHAN_XUNSHOU);
		}
	}
}