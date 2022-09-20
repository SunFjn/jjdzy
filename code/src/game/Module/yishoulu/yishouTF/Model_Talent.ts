/**
 * Model_Talent
 * 修炼天赋
 */
class Model_Talent extends BaseModel {

	public checkNotice() {
		let self = this;
		let ret = false;
		let count = Model_Bag.getItemCount(self.itemID);
		ret = count > 0;
		if (!ret) {
			for (let key in self.targetData) {
				if (self.targetData[key] > 0) {
					ret = true;
					break;
				}
			}
		}
		return ret;
	}

	public itemID = 410401;
	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(9372, this.GC_Talent_openUI_9372, this);
		mgr.regHand(9374, this.GC_Talent_xiuLian_9374, this);
		mgr.regHand(9376, this.GC_Talent_getAward_9376, this);
	}

	/**9371  打开修炼天赋界面 */
	public CG_Talent_openUI_9371(): void {
		var bates = this.getBytes();
		this.sendSocket(9371, bates);
	}

	public showData: IGridImpl[] = [];
	public targetData: { [id: number]: number } = {};
	public xiulianNum = 0;
	public skipTween: boolean = false;
	/**9372 [B-I-I]-[I-I]-I 打开修炼天赋界面返回 [B:道具类型I:道具IDI:数量]展示道具showItemList[I:目标奖励IDI:奖励状态：-1.已领取 0.条件不符 >0.次数]targetRewardListI:修炼次数num*/
	public GC_Talent_openUI_9372(self: Model_Talent, data: BaseBytes): void {
		self.showData = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let vo = ConfigHelp.parseItemBa(data);
			self.showData.push(vo);
		}
		let len1 = data.readShort();
		for (let i = 0; i < len1; i++) {
			let id = data.readInt();
			let state = data.readInt();
			self.targetData[id] = state;
		}
		self.xiulianNum = data.readInt();
		GGlobal.control.notify(UIConst.XIULIAN_TF);
	}

	/**9373 B 修炼 B:修炼类型：1.修炼1次  2.修炼10次type*/
	public CG_Talent_xiuLian_9373(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(9373, bates);
	}

	/**9374 B-[B-I-I]-[I-I]-I-[B-I-I] 修炼返回 B:状态：1.成功 2.元宝不足  3.背包已满state[B:道具类型I:道具IDI:数量B:是否是大奖]awardList
	 * [I:目标奖励IDI:状态：-1.已领取  0.条件不符  >0.次数]targetRewardListI:修炼次数num[B:道具类型I:道具IDI:数量]展示道具：
	 * 有重置时返回数据，否则无数据showItemList*/
	public GC_Talent_xiuLian_9374(self: Model_Talent, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let len = data.readShort();
			let dropArr = [];
			for (let i = 0; i < len; i++) {
				let item = ConfigHelp.parseItemBa(data);
				let isBig = data.readByte();
				item.extra = isBig ? 5 : 0;
				dropArr.push(item);
			}
			let len1 = data.readShort();
			for (let i = 0; i < len1; i++) {
				let id = data.readInt();
				let state = data.readInt();
				self.targetData[id] = state;
			}
			self.xiulianNum = data.readInt();
			let len2 = data.readShort();
			if (len2 > 0) {
				self.showData = [];
			}
			for (let i = 0; i < len2; i++) {
				let vo = ConfigHelp.parseItemBa(data);
				self.showData.push(vo);
			}
			GGlobal.control.notify(Enum_MsgType.XIULIAN_TF_SHOWEFF, dropArr);
			GGlobal.control.notify(UIConst.XIULIAN_TF);
		}
	}


	/**9375 I 领取目标奖励 I:目标奖励IDid*/
	public CG_Talent_getAward_9375(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(9375, bates);
	}

	/**9376 B-I-I 领取目标奖励返回 B:状态：1.成功 2.条件不符 3.背包已满 4.参数错误 5.已领取stateI:目标奖励ID idI:目标奖励状态：-1.已领取 0.条件不符 >0.奖励次数flag*/
	public GC_Talent_getAward_9376(self: Model_Talent, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id = data.readInt();
			let state = data.readInt();
			self.targetData[id] = state;
			GGlobal.control.notify(Enum_MsgType.XIULIAN_TF_REWARD);
			GGlobal.control.notify(UIConst.XIULIAN_TF);
		}
	}

}