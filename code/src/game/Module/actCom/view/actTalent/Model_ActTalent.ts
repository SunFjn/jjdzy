class Model_ActTalent extends BaseModel{
	public constructor() {
		super();
	}

	/**运筹帷幄-锦囊妙计 领取奖励 I:配置表id*/
	public CG_YCWW_JLMJ_GET(id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(9901, ba);
	}

	//目标
	muBObj: { [tp: number]: Vo_HuoDong[] } = {};

	//洗练
	xlCt: number;
	xlArr: Vo_HuoDong[];

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let s = this;
		s.socket = wsm;
		wsm.regHand(9350, s.GC_TALENT_OPENUI9350, s);
		wsm.regHand(9352, s.GC_TALENT_GET_REWARD9352, s);

		wsm.regHand(9400, s.GC_GOAL_OPENUI9400, s);
		wsm.regHand(9402, s.GC_GOAL_GET_REWARD9402, s);

		//运筹帷幄-锦囊妙计
		wsm.regHand(9900, s.GC_YCWW_JLMJ_OPENUI, s);
		wsm.regHand(9902, s.GC_YCWW_JLMJ_GET_REWARD, s);
	}
	//打开界面返回 I:抽奖次数[I:表的序号B:领取状态0未领取 1可领取 2已领取]目标列表
	private GC_TALENT_OPENUI9350(s:Model_ActTalent, data: BaseBytes) {
		s.xlCt = data.readInt();
		let len = data.readShort();
		s.xlArr = [];
		for (let i = 0; i < len; i++) {
			let hd: Vo_HuoDong = new Vo_HuoDong();
			hd.readMsgInt(data)
			s.xlArr.push(hd);
		}
		GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XILIAN);
		s.checkHolyBXiLian();
	}

	/**领取奖励I:表的序号   */
	public CG_TALENT_GET9351(id) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(9351, ba);
	}

	//领取奖励返回 B:状态1未完成任务 2已领取 3成功I:失败返回0，成功返回表的序号
	private GC_TALENT_GET_REWARD9352(s:Model_ActTalent, data: BaseBytes) {
		let res = data.readByte();
		if (res == 3) {
			let id = data.readInt();
			for (let i = 0; i < s.xlArr.length; i++) {
				if (s.xlArr[i].id == id) {
					s.xlArr[i].status = 2;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XILIAN);
			s.checkHolyBXiLian();
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}


	private checkHolyBXiLian() {
		let sf = GGlobal.reddot;
		sf.setCondition(UIConst.ACTCOM_TALENT, 0, Model_HuoDong.isVoNotice(this.xlArr));
		sf.notifyMsg(UIConst.ACTCOM_TAL);
	}

	//打开界面返回 [B:任务类型[I:任务idB:任务状态0未完成 1可领取 2已完成L:对应的完成值]]任务数据
	private GC_GOAL_OPENUI9400(s:Model_ActTalent, data: BaseBytes) {
		s.muBObj = {}
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let type = data.readByte();
			s.muBObj[type] = [];
			let size = data.readShort();
			for (let j = 0; j < size; j++) {
				let hd: Vo_HuoDong = new Vo_HuoDong();
				hd.readMsgInt(data);
				hd.canCt = data.readLong();
				hd.hasCt = type;
				s.muBObj[type].push(hd);
			}
		}
		GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_MUBIAO);
		s.checkHolyBMuBiao()
	}

	/**目标 领取奖励  B:任务类型I:任务id*/
	public CG_GOAL_GET9401(type: number, id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(id);
		this.sendSocket(9401, ba);
	}

	//领取奖励返回 B:状态0失败 1成功B:失败（1未完成 2已领取），成功返回任务类型I:任务id
	private GC_GOAL_GET_REWARD9402(s:Model_ActTalent, data: BaseBytes) {
		let res = data.readByte();
		let type = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			let arr: Vo_HuoDong[] = s.muBObj[type]
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].id == id) {
					arr[i].status = 2;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_MUBIAO);
			s.checkHolyBMuBiao()
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}

	private checkHolyBMuBiao() {
		let sf = GGlobal.reddot;
		let obj = this.muBObj
		sf.setCondition(UIConst.ACTCOM_TALENT_GOAL, 0, false);
		for (let keys in obj) {
			let arr = obj[keys]
			let red = Model_HuoDong.isVoNotice(arr)
			sf.setCondition(UIConst.ACTCOM_TALENT_GOAL, Number(keys), red);
			if (red) sf.setCondition(UIConst.ACTCOM_TALENT_GOAL, 0, true);
		}
		sf.notifyMsg(UIConst.ACTCOM_TAL);
	}

	private checkJLMJ() {
		let sf = GGlobal.reddot;
		sf.setCondition(UIConst.YUNCHOUWEIWO_JLMJ, 0, Model_HuoDong.isVoNotice(this.jlmjArr));
		sf.notifyMsg(UIConst.YUNCHOUWEIWO_JLMJ);
	}

	public jlmjArr: Vo_HuoDong[];
	public jlmjCount: number;
	/**运筹帷幄-锦囊妙计 打开界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表I:次数*/
	private GC_YCWW_JLMJ_OPENUI(s: Model_ActTalent, data: BaseBytes) {
		let len = data.readShort();
		s.jlmjArr = [];
		for (let i = 0; i < len; i++) {
			let hd: Vo_HuoDong = new Vo_HuoDong();
			hd.readMsgInt(data)
			s.jlmjArr.push(hd);
		}
		s.jlmjCount = data.readInt();
		GGlobal.control.notify(UIConst.YUNCHOUWEIWO_JLMJ);
		s.checkJLMJ();
	}

	//领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:配置表id
	private GC_YCWW_JLMJ_GET_REWARD(s:Model_ActTalent, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			let id = data.readInt();
			for (let i = 0; i < s.jlmjArr.length; i++) {
				if (s.jlmjArr[i].id == id) {
					s.jlmjArr[i].status = 2;
					break;
				}
			}
			GGlobal.control.notify(UIConst.YUNCHOUWEIWO_JLMJ);
			s.checkJLMJ();
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}
}