class Model_ActComDDL extends BaseModel{
	public constructor() {
		super();
	}

	/**11321 下联提交 [B:位置，从1开始]下联列表  */
	public CG_COMMIT(arr) {
		var bates = this.getBytes();
		var len = arr.length;
		bates.writeShort(len);
        for (let i = 0; i < len; i++) {
            bates.writeByte(arr[i]);
        }
		this.sendSocket(11321, bates);
	}

	/**11323 打开排行榜  */
	public CG_OPEN_RANKUI() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(11323, ba);
	}

	/**11325 领取目标奖励 I:要领取的奖励id   */
	public CG_GET_TARGETAWARD(id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(11325, ba);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(11320, self.GC_OPEN_UI, self);
		mgr.regHand(11322, self.GC_COMMIT, self);
		mgr.regHand(11324, self.GC_OPEN_RANKUI, self);
		mgr.regHand(11326, self.GC_GET_TARGETAWARD, self);
		mgr.regHand(11328, self.GC_SEND_TIMES, self);
	}

	public id:number = 0;
	public xiaLians = [];
	public duilianCount:number = 0;
	public remainTime:number = 0;
	public correctCount:number = 0;
	public rewardArr:DDLVO[] = [];
	/**11320  打开界面返回 I:对联id[B:下联id]下联列表I:剩余对联次数I:恢复时间I:正确次数[I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]目标奖励状态列表 */
	private GC_OPEN_UI(s: Model_ActComDDL, data: BaseBytes) {
		s.id = data.readInt();
		s.xiaLians = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id:number = data.readByte();
			s.xiaLians.push(id);
		}
		s.duilianCount = data.readInt();
		s.remainTime = data.readInt();
		s.correctCount = data.readInt();
		s.rewardArr = [];
		len = data.readShort();
		for (let i = 0; i < len; i++) {
			let vo: DDLVO = new DDLVO();
			vo.readAwardMsg(data);
			s.rewardArr.push(vo);
		}
		s.reddotCheck();
		GGlobal.control.notify(UIConst.ACTCOM_DDL, true);
	}

	/**11322 下联提交返回 B:状态:1：对，2：错，3：提交对联字数错误，4：没次数*/
	private GC_COMMIT(s: Model_ActComDDL, data: BaseBytes) {
		let res = data.readByte();
		if(res == 1)
		{
			ViewCommonWarn.text("回答正确");
			// s.duilianCount --;
			GGlobal.control.notify(UIConst.ACTCOM_DDL, true);
			// s.reddotCheck();
		}else if(res == 2){
			// s.duilianCount --;
			ViewCommonWarn.text("回答错误");
			GGlobal.control.notify(UIConst.ACTCOM_DDL, true);
			// s.reddotCheck();
		}else if(res == 3){
			ViewCommonWarn.text("提交对联字数错误");
		}else if(res == 4){
			ViewCommonWarn.text("对联次数已耗尽");
		}
	}

	public rankArr: DDLVO[] = [];
	public myRank:number = 0;
	public myCount:number = 0;
	/**11324 打开排行榜返回 [B:排名U:玩家名I:对联正确次数]排行榜数据B:我的排名 0未进排行榜 I:我的次数*/
	private GC_OPEN_RANKUI(s: Model_ActComDDL, data: BaseBytes) {
		s.rankArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let vo: DDLVO = new DDLVO();
			vo.readRankMsg(data);
			s.rankArr.push(vo);
		}
		s.myRank = data.readByte();
		s.myCount = data.readInt();
		GGlobal.control.notify(UIConst.DDL_RANK);
	}

	/**11326 领取目标奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励id*/
	private GC_GET_TARGETAWARD(s: Model_ActComDDL, data: BaseBytes) {
		let res = data.readByte();
		if(res == 1)
		{
			let len:number = s.rewardArr.length;
			let id:number = data.readInt();
			for(let i:number = 0;i < len;i ++)
			{
				let vo:DDLVO = s.rewardArr[i];
				if(vo.id == id)
				{
					vo.status = 2;
				}
			}
			GGlobal.control.notify(UIConst.ACTCOM_DDL);
			s.reddotCheck();
		}else if(res == 2){
			ViewCommonWarn.text("未达到条件");
		}
	}

	/**11328   推送次数 I:次数I:恢复时间  */
	private GC_SEND_TIMES(s: Model_ActComDDL, data: BaseBytes) {
		s.duilianCount = data.readInt();
		s.remainTime = data.readInt();
		s.reddotCheck();
		GGlobal.control.notify(UIConst.ACTCOM_DDL);
	}

	private static _ddlpmCfg: any;
	public static getddlpmCfg(qs: number, rank: number): any {
		if (Model_ActComDDL._ddlpmCfg == null) {
			Model_ActComDDL._ddlpmCfg = {};
			for (let keys in Config.ddlrank_297) {
				let cfg = Config.ddlrank_297[keys];
				if (Model_ActComDDL._ddlpmCfg[cfg.qs] == null) {
					Model_ActComDDL._ddlpmCfg[cfg.qs] = {};
				}

				let arr = ConfigHelp.SplitStr(cfg.rank)
				for (let j = Number(arr[0][0]); j <= Number(arr[0][1]); j++) {
					Model_ActComDDL._ddlpmCfg[cfg.qs][j] = cfg;
				}
			}
		}
		return Model_ActComDDL._ddlpmCfg[qs] ? Model_ActComDDL._ddlpmCfg[qs][rank] : null;
	}

	 /** 检查红点 */
    public reddotCheck() {
		let bol:boolean = false;
		let model = GGlobal.model_DDL;
		let count:number = Model_Bag.getItemCount(410429);
		let sf = GGlobal.reddot;
		if(model.duilianCount > 0 || count > 0)
		{
			bol = true;
		}
		let len:number = model.rewardArr.length;
		for(let i:number = 0;i < len; i++)
		{
			let vo: DDLVO = model.rewardArr[i];
			if(vo.status == 1)
			{
				bol = true;
				break;
			}
		}
		sf.setCondition(UIConst.ACTCOM_DDL, 0, bol);
		sf.notifyMsg(UIConst.ACTCOM_DDL);
	}
}