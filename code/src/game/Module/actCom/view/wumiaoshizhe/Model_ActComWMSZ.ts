class Model_ActComWMSZ extends BaseModel{
	public constructor() {
		super();
	}

	/**12201 打开目标奖励界面   */
	public CG_OPEN_TARGETAWARD_UI() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(12201, ba);
	}

	/**12203 领取目标奖励 I:要领取的奖励id   */
	public CG_GET_TARGETAWARD(id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(12203, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		wsm.regHand(12200, a.GC_OPEN_UI, a);
		wsm.regHand(12202, a.GC_OPEN_TARGETAWARD_UI, a);
		wsm.regHand(12204, a.GC_GET_TARGETAWARD, a);
	}

	public rankArr: WMSZVO[] = [];
	public myRank:number = 0;
	public myIntegral:number = 0;
	/**12200 打开界面 [S:排名U:玩家名I:抽奖次数]排行榜数据S:我的排名 0未进排行榜 I:我的抽奖次数*/
	private GC_OPEN_UI(s: Model_ActComWMSZ, data: BaseBytes) {
		s.rankArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: WMSZVO = new WMSZVO();
			v.readRankMsg(data);
			if(v.integral >= Config.xtcs_004[8423].num)
			{
				s.rankArr.push(v);
			}
		}
		s.myRank = data.readUnsignedShort();
		s.myIntegral = data.readInt();
		GGlobal.control.notify(UIConst.WMSZ);
	}

	public targetArr: WMSZVO[] = [];
	/**12202 打开目标奖励界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表*/
	private GC_OPEN_TARGETAWARD_UI(s: Model_ActComWMSZ, data: BaseBytes) {
		s.targetArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: WMSZVO = new WMSZVO();
			v.readMsg(data);
			s.targetArr.push(v);
		}
		GGlobal.control.notify(UIConst.WMSZ_INTEGRAL);
	}

	/**12204 领取目标奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励id*/
	private GC_GET_TARGETAWARD(s: Model_ActComWMSZ, data: BaseBytes) {
		let res = data.readByte();
		let id:number = data.readInt();
		if (res == 1) {
			let len:number = s.targetArr.length;
			for(var i:number = 0;i < len;i ++)
			{
				let v: WMSZVO = s.targetArr[i];
				if(v.id == id)
				{
					v.status = 2;
					break;
				}
			}
			s.reddotCheck();
			GGlobal.control.notify(UIConst.WMSZ_INTEGRAL);
		}
	}

	/**
	 * 检查红点
	 */
	public reddotCheck()
	{
		let bol:boolean = false;
		let sf = GGlobal.reddot;
		if(this.targetArr)
		{
			let len:number = this.targetArr.length;
			for(var i:number = 0;i < len;i ++)
			{
				let v: WMSZVO = this.targetArr[i];
				if(v.status == 1)
				{
					bol = true;
					break;
				}
			}
		}
		sf.setCondition(UIConst.WMSZ, 0, bol);
		sf.notifyMsg(UIConst.WMSZ);
	}
}