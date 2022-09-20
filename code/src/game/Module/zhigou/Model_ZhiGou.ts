class Model_ZhiGou extends BaseModel {

	public static curDay: number = 0;
	public static rewardArr: Array<any> = [];
	public static rewarStatedArr: Array<any> = [];//奖励状态
	public static count: number = 0;//目标次数
	public static endTime: number = 0;//活动结束时间
	public static checkNotice() {
		for (let i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
			for (let j = 0; j < Model_ZhiGou.rewardArr[i].length; j++) {
				if (Model_ZhiGou.rewardArr[i][j][1] == 1) {
					return true;
				}
			}
		}
		for (let j = 0; j < Model_ZhiGou.rewarStatedArr.length; j++)
		{
			let vo:ZhiGouVO = Model_ZhiGou.rewarStatedArr[j];
			if(vo.state == 1)
			{
				return true;
			}
		}
		return false;
	}

	/**3701	打开界面 */
	public CG_ZHIGOU_OPEN_UI() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(3701, ba);
	}

	/**3703	领取奖励 B:领取的天数id，第一天就为1B:领取的档次，为每日直购表id */
	public CG_ZHIGOU_DRAWREWARD(day: number, type: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(day);
		ba.writeByte(type);
		this.sendSocket(3703, ba);
	}

	/**3707	领取目标奖励 I:目标表id */
	public CG_3707(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(3707, ba);
	}

	/**3721	领取奖励 B:领取的天数id，第一天就为1B:领取的档次，为每日直购表id */
	public CG_ZHIGOU_DRAWREWARD_ACTIVITY(day: number, type: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(day);
		ba.writeByte(type);
		this.sendSocket(3721, ba);
	}

	/**3725 领取目标奖励 I:目标表id */
	public CG_3725(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(3725, ba);
	}

	/**7001	领取奖励 I:每日直购表id */
	public CG_ZHIGOU_DRAWREWARD_828(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(7001, ba);
	}

	/**7005	领取目标奖励 I:目标表id */
	public CG_7005(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(7005, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let s = this;
		s.socket = wsm;
		wsm.regHand(3702, s.GC_ZHIGOU_OPEN_UI, s);
		wsm.regHand(3704, s.GC_ZHIGOU_DRAWREWARD, s);
		wsm.regHand(3722, s.GC_ZHIGOU_DRAWREWARD, s);
		wsm.regHand(3720, s.GC_ZHIGOU_OPEN_UI, s);
		wsm.regHand(3706, s.GC_ZHIGOU_DATA_CHANGE, s);
		wsm.regHand(3724, s.GC_ZHIGOU_DATA_CHANGE, s);
		wsm.regHand(7000, s.GC_ZHIGOU_OPEN_UI_828, s);
		wsm.regHand(7002, s.GC_ZHIGOU_DRAWREWARD_828, s);
		wsm.regHand(7004, s.GC_ZHIGOU_DATA_CHANGE_828, s);
		wsm.regHand(3708, s.GC_TARGET_AWARD, s);
		wsm.regHand(3726, s.GC_TARGET_AWARD, s);
		wsm.regHand(7006, s.GC_TARGET_AWARD, s);
	}

	/**3706	通知前端奖励可领取 B:每日直购表id */
	public GC_ZHIGOU_DATA_CHANGE(self: Model_ZhiGou, data: BaseBytes) {
		let order = data.readByte();
		let index = 0;
		for (let i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
			for (let j = 0; j < Model_ZhiGou.rewardArr[i].length; j++) {
				if (Model_ZhiGou.rewardArr[i][j][0] == order) {
					Model_ZhiGou.rewardArr[i][j][1] = 1;
					index++;
					break;
				}
			}
			if (index > 0) break;
		}
		GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
	}


	/**3704	领取奖励返回 B:领取状态，1:领取成功，2:未购买无法领取，3，重复领取，4:参数错误B:领取的档次，为每日直购表id */
	public GC_ZHIGOU_DRAWREWARD(self: Model_ZhiGou, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let order = data.readByte();
			let index = 0;
			for (let i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
				for (let j = 0; j < Model_ZhiGou.rewardArr[i].length; j++) {
					if (Model_ZhiGou.rewardArr[i][j][0] == order) {
						Model_ZhiGou.rewardArr[i][j][1] = 2;
						index++;
						break;
					}
				}
				if (index > 0) break;
			}
			GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
		}
	}

	/**3702	打开界面返回 [[B:每日直购表idB:0:未购买，1:已购买但未领取，2:已领取]奖励档次列表，第一层为天数，第二层为奖励状态]奖励列表I:开服第几天 [I:每日直购表idI:奖励状态，0:未达到，1:可领取，2:已领取]目标奖励列表I:目标次数I:结束时间*/
	public GC_ZHIGOU_OPEN_UI(self: Model_ZhiGou, data: BaseBytes) {
		Model_ZhiGou.rewardArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let arr = [];
			for (let j = 0, len1 = data.readShort(); j < len1; j++) {
				let order = data.readByte();
				let state = data.readByte();
				arr.push([order, state]);
			}
			Model_ZhiGou.rewardArr.push(arr);
		}
		Model_ZhiGou.curDay = data.readInt();
		Model_ZhiGou.rewarStatedArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++)
		{
			let vo:ZhiGouVO = new ZhiGouVO();
			vo.readMsg(data);
            Model_ZhiGou.rewarStatedArr.push(vo);
		}
		Model_ZhiGou.count = data.readInt();
		Model_ZhiGou.endTime = data.readInt();
		GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
	}

	/**7000	打开ui返回 [[I:每日直购表idB:0:未购买，1:已购买但未领取，2:已领取]奖励档次列表，第一层为天数，第二层为奖励状态]奖励列表I:开服第几天 */
	public GC_ZHIGOU_OPEN_UI_828(self: Model_ZhiGou, data: BaseBytes) {
		Model_ZhiGou.rewardArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let arr = [];
			for (let j = 0, len1 = data.readShort(); j < len1; j++) {
				let order = data.readInt();
				let state = data.readByte();
				arr.push([order, state]);
			}
			Model_ZhiGou.rewardArr.push(arr);
		}
		Model_ZhiGou.curDay = data.readInt();
		Model_ZhiGou.rewarStatedArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++)
		{
			let vo:ZhiGouVO = new ZhiGouVO();
			vo.readMsg(data);
            Model_ZhiGou.rewarStatedArr.push(vo);
		}
		Model_ZhiGou.count = data.readInt();
		Model_ZhiGou.endTime = data.readInt();
		GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
	}

	/**7002	领取奖励返回 B:领取状态，1:领取成功，2:未购买无法领取，3，重复领取，4:参数错误I:领取的档次，为每日直购表id */
	public GC_ZHIGOU_DRAWREWARD_828(self: Model_ZhiGou, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let order = data.readInt();
			let index = 0;
			for (let i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
				for (let j = 0; j < Model_ZhiGou.rewardArr[i].length; j++) {
					if (Model_ZhiGou.rewardArr[i][j][0] == order) {
						Model_ZhiGou.rewardArr[i][j][1] = 2;
						index++;
						break;
					}
				}
				if (index > 0) break;
			}
			GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
		}
	}

	/**7004	通知前端奖励可领取 I:每日直购id */
	public GC_ZHIGOU_DATA_CHANGE_828(self: Model_ZhiGou, data: BaseBytes) {
		let order = data.readInt();
		let index = 0;
		for (let i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
			for (let j = 0; j < Model_ZhiGou.rewardArr[i].length; j++) {
				if (Model_ZhiGou.rewardArr[i][j][0] == order) {
					Model_ZhiGou.rewardArr[i][j][1] = 1;
					index++;
					break;
				}
			}
			if (index > 0) break;
		}
		GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
	}

	/**3708 领取目标奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:目标表id */
	public GC_TARGET_AWARD(self: Model_ZhiGou, data: BaseBytes)
	{
		let result = data.readByte();
		if (result == 1)
		{
			let id:number = data.readInt();
			let len:number = Model_ZhiGou.rewarStatedArr.length;
			for(var i:number = 0;i < len;i ++)
			{
				let vo:ZhiGouVO = Model_ZhiGou.rewarStatedArr[i];
				if(vo.id == id)
				{
					vo.state = 2;
				}
			}
			GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
		}
	}

	/**直购8-28系统为等级以及开服天数共同控制开启
    ** 开服第8天开启,持续7天(配置系统开启表)
    */
    public checkAndOpenIcon() {
        const bool = ModelEightLock.hasActInZhiGou();
        const zhigouRedDot = GGlobal.reddot.checkCondition(UIConst.ZHI_GOU828, 0);
        if(bool){
            if (!GGlobal.mainUICtr.getIcon(UIConst.ZHI_GOU828)) { //每日直购8-28
                GGlobal.mainUICtr.addIcon(UIConst.ZHI_GOU828, zhigouRedDot);
            } else {
                GGlobal.mainUICtr.setIconNotice(UIConst.ZHI_GOU828, zhigouRedDot);
            }
        }else{
            if (GGlobal.mainUICtr.getIcon(UIConst.ZHI_GOU828)) {
                GGlobal.mainUICtr.removeIcon(UIConst.ZHI_GOU828);
            }
        }
    }
}