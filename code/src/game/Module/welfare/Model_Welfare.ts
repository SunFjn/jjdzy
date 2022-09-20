class Model_Welfare extends BaseModel {

	public static WEEKVIP_ID = 5;

	/**0：签到状态未达到，1：可签到，2：已签到，3：可补签 */
	public static signArr = [];
	/**B:累签宝箱状态，0：未达到，1：可领取，2：已领取 */
	public static signBoxArr = [];
	/**签到天数 */
	public static signNum = 0;
	/**重置天数 */
	public static resetDay = 0;
	/**期数 */
	public static qishu = 0;

	public static weekVip_remainTime = 0;//周卡时间 》0 为激活
	public static weekVip_Awards = 0;//领取状态

	//private static rewardBackData : any[];
	public static RewardBackDate(id: number) {
		let lib = Config.rewardback_270;
		let vo: RewardBackItemVO;
		vo = new RewardBackItemVO();
		vo.init(lib[id])
		return vo;
	}

	public static checSignkNotice() {
		let arr = [3, 5, 7, 15, 30];
		for (let i = 0; i < Model_Welfare.signBoxArr.length; i++) {
			if (Model_Welfare.signBoxArr[i] == 1 || (Model_Welfare.signNum >= arr[i] && Model_Welfare.signBoxArr[i] == 0)) {
				return true;
			}
		}

		for (let i = 0; i < Model_Welfare.signArr.length; i++) {
			if (Model_Welfare.signArr[i] == 1) {
				return true;
			}
		}
		return false;
	}

	public static iconArr: any[] = [];
	public static showIconHandle(): void {
		if (Model_Welfare.iconArr.length <= 0) {
			for (let key in Config.fulidating_720) {
				let cfg = Config.fulidating_720[key];
				Model_Welfare.iconArr.push(cfg);
			}
		}
		Model_Welfare.iconArr.sort(Model_Welfare.sortIcon);
	}

	private static sortIcon(a, b) {
		return a.px - b.px;
	}

	/**169	获取福利大厅公告   */
	public CG_GET_WELFARENOTICE() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(169, ba);
	}

	/**2151 打开界面   */
	public CG_OPEN_SIGN() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(2151, ba);
	}

	/**2153 签到 I:签到天数   */
	public CG_SIGN_BYDAY(day: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(day);
		this.sendSocket(2153, ba);
	}

	/**2155 补签 I:补签天数   */
	public CG_REPAIRSIGN_BYDAY(day: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(day);
		this.sendSocket(2155, ba);
	}
	/**领取找回奖励 */
	public CG_APPLY_GETREWARD(type: number, id) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(id);
		this.sendSocket(5273, ba);
	}
	/**打开奖励找回界面 */
	public CG_OPEN_REWARDBACK() {
		let ba = new BaseBytes();
		this.sendSocket(5271, ba);
	}


	/**2157 领取累签宝箱奖励 I:累签宝箱id    */
	public CG_SIGN_DRAW_BOXREWARD(boxId: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(boxId);
		this.sendSocket(2157, ba);
	}

	/**领取激活码奖励 U:激活码*/
	public CG_ACTIVATION_GET(key: string) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeUTF(key);
		this.sendSocket(2211, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		wsm.regHand(2152, a.GC_OPEN_SIGN, a);
		wsm.regHand(2154, a.GC_SIGN_BYDAY, a);
		wsm.regHand(2156, a.GC_REPAIRSIGN_BYDAY, a);
		wsm.regHand(2158, a.GC_SIGN_DRAW_BOXREWARD, a);
		wsm.regHand(2212, a.GC_ACTCODE_GET, a);
		wsm.regHand(170, a.GC_GET_WELFARENOTICE, a);
		wsm.regHand(4552, a.GC_OPEN_WEEKVIP, a);
		wsm.regHand(4554, a.GC_WEEK_VIP_LQ, a);
		wsm.regHand(5272, a.GC_OPEN_ERWARDBACK, a);
		wsm.regHand(5274, a.GC_OPEN_GETBACK, a);
	}
	/**奖励找回 */
	private GC_OPEN_ERWARDBACK(self: Model_Welfare, bytes: BaseBytes) {
		let length = bytes.readShort();
		let rewardVO = [];
		for (let i = 0; i < length; i++) {
			let Id = bytes.readInt();
			let tongqian = bytes.readInt();
			let yuanbao = bytes.readInt();
			let state = bytes.readByte();
			let rewardLength = bytes.readShort();
			let reward: any[] = [];
			for (let j = 0; j < rewardLength; j++) {
				let type = bytes.readByte();
				let id = bytes.readInt();
				let num = bytes.readInt();
				reward.push([type, id, num]);
			}
			let vo: RewardBackItemVO = Model_Welfare.RewardBackDate(Id);
			vo.id = Id;
			vo.conmuse = tongqian;
			vo.conmuse1 = yuanbao;
			vo.state = state;
			vo.reward = reward;
			rewardVO.push(vo);
		}
		let all = bytes.readInt();//全部找回的元宝消耗
		GGlobal.control.notify(Enum_MsgType.REWARDBACK, { rewardVO: rewardVO, all: all });
	}
	/**接受奖励找回数据 */
	private GC_OPEN_GETBACK(self: Model_Welfare, bytes: BaseBytes) {
		//console.log("领取奖励~~~~~~~~~~~~~~~~~~~");
		let state = bytes.readByte();
		let type = bytes.readByte();
		let id = bytes.readInt();
		if (state == 0) {
			ViewCommonWarn.text("没有该奖项");
			return;
		}
		GGlobal.control.notify(Enum_MsgType.REWARDBACKITEM, { state: state, type: type, id: id });
	}

	public static welfareNotice: string = "";
	/**170	返回福利大厅公告 U:公告信息 */
	private GC_GET_WELFARENOTICE(self: Model_Welfare, data: BaseBytes): void {
		Model_Welfare.welfareNotice = data.readUTF();
		GGlobal.control.notify(Enum_MsgType.WELFARE_NOTICE_UPDATE);
	}

	/**领取激活码奖励返回 B:状态，0：激活码有误，1：成功，2：激活码为空，3：激活码已被使用，4：激活码已过期，5：同类型激活码领取达到上限U:领取的激活码 */
	private GC_ACTCODE_GET(self: Model_Welfare, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let key = data.readUTF();
			ViewCommonWarn.text("激活码领取成功")
		} else if (result == 0) {
			ViewCommonWarn.text("激活码有误")
		} else if (result == 2) {
			ViewCommonWarn.text("激活码为空")
		} else if (result == 3) {
			ViewCommonWarn.text("激活码已被使用")
		} else if (result == 4) {
			ViewCommonWarn.text("激活码已过期")
		} else if (result == 5) {
			ViewCommonWarn.text("同类型激活码领取达到上限")
		} else if (result == 6) {
			ViewCommonWarn.text("已使用过该激活码");
		} else {
			ViewCommonWarn.text("激活码领取失败")
		}
	}

	/**2158 领取累签宝箱奖励返回 B:状态，0：奖励不存在，1：成功，2：未达到条件，3：不可重复领取I:领取的宝箱id  */
	private GC_SIGN_DRAW_BOXREWARD(self: Model_Welfare, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let boxId = data.readInt();
			let arr = [3, 5, 7, 15, 30];
			let index = arr.indexOf(boxId);
			Model_Welfare.signBoxArr[index] = 2;
			GGlobal.control.notify(Enum_MsgType.WELFARE_SIGN_UPDATE);
		}
	}

	/**2156 补签返回 B:补签状态，0：补签不合法，1：成功，2：元宝不足I:成功补签的天数  */
	private GC_REPAIRSIGN_BYDAY(self: Model_Welfare, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let day = data.readInt();
			Model_Welfare.signArr[day - 1] = 2;
			Model_Welfare.signNum++;
			let arr = [3, 5, 7, 15, 30];
			for (let i = 0; i < Model_Welfare.signBoxArr.length; i++) {
				if (Model_Welfare.signBoxArr[i] == 0 && Model_Welfare.signNum >= arr[i]) Model_Welfare.signBoxArr[i] = 1;
			}
			GGlobal.control.notify(Enum_MsgType.WELFARE_SIGN_UPDATE);
		}
	}

	/**2154 签到返回 B:签到状态，0：签到失败，1：成功I:成功签到天数  */
	private GC_SIGN_BYDAY(self: Model_Welfare, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let day = data.readInt();
			Model_Welfare.signArr[day - 1] = 2;
			Model_Welfare.signNum++;
			let arr = [3, 5, 7, 15, 30];
			for (let i = 0; i < Model_Welfare.signBoxArr.length; i++) {
				if (Model_Welfare.signBoxArr[i] == 0 && Model_Welfare.signNum >= arr[i]) Model_Welfare.signBoxArr[i] = 1;
			}
			GGlobal.control.notify(Enum_MsgType.WELFARE_SIGN_UPDATE);
		}
	}

	public static isFirstOpen: boolean = false;
	/**2152 打开界面返回 [B:签到状态，0：签到状态未达到，1：可签到，2：已签到，3：可补签]签到状态列表[B:累签宝箱状态，0：未达到，1：可领取，2：已领取]累签宝箱状态列表
	 * I:签到天数I:重置剩余天数I:期数  */
	private GC_OPEN_SIGN(self: Model_Welfare, data: BaseBytes) {
		Model_Welfare.signArr = [];
		Model_Welfare.signBoxArr = [];
		Model_Welfare.isFirstOpen = true;
		for (let i = 0, len = data.readShort(); i < len; i++) {
			Model_Welfare.signArr.push(data.readByte());
		}
		for (let i = 0, len = data.readShort(); i < len; i++) {
			Model_Welfare.signBoxArr.push(data.readByte());
		}
		Model_Welfare.signNum = data.readInt();
		Model_Welfare.resetDay = data.readInt();
		Model_Welfare.qishu = data.readInt();
		GGlobal.control.notify(Enum_MsgType.WELFARE_SIGN_UPDATE);
	}

	public CG_OPEN_WEEKVIP() {
		this.sendSocket(4551, this.getBytes());
	}

	/**
	 * 4552 界面数据返回 I:剩余时间B:每日奖励领取状态
	*/
	private GC_OPEN_WEEKVIP(self: Model_Welfare, data: BaseBytes) {
		let t = data.readInt();
		if (t == 0) {
			Model_Welfare.weekVip_remainTime = -1;
		} else {
			Model_Welfare.weekVip_remainTime = t * 1000 + Model_GlobalMsg.getServerTime();
		}
		Model_Welfare.weekVip_Awards = data.readByte();
		GGlobal.reddot.setCondition(UIConst.WEEK_VIP, 0, Model_Welfare.weekVip_Awards == 1);
		GGlobal.reddot.notify(UIConst.TEQUAN);
		GGlobal.control.notify(Enum_MsgType.WELFARE_WEEKVIP_OPEN);
	}

	public CG_WEEK_VIP_LQ() {
		this.sendSocket(4553, this.getBytes());
	}

	/**
	 * 4554
	 * 领取每日奖励结果返回 B:0：失败，1：成功，
	*/
	private GC_WEEK_VIP_LQ(self: Model_Welfare, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 1) {
			Model_Welfare.weekVip_Awards = 2;
			GGlobal.reddot.setCondition(UIConst.WEEK_VIP, 0, false);
			GGlobal.reddot.notify(UIConst.TEQUAN);
			GGlobal.control.notify(Enum_MsgType.WELFARE_WEEKVIP_LQ);
		}
	}
}