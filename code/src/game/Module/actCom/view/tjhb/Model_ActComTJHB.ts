class Model_ActComTJHB extends BaseModel{
	public constructor() {
		super();
	}

	/**11371 发红包界面  */
	public CG_SEND_UI() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(11371, ba);
	}

	public static type:number = 0;
	/**11373 发红包 I:红包类型，配置表id  */
	public CG_SEND(type:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(type);
		Model_ActComTJHB.type = type;
		this.sendSocket(11373, ba);
	}

	public static id:number = 0;
	/**11375 领红包 L:红包id  */
	public CG_GET(id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		Model_ActComTJHB.id = id;
		this.sendSocket(11375, ba);
	}

	/**11377 打开记录界面 L:红包id  */
	public CG_OPENRECORD_UI(id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(11377, ba);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(11370, self.GC_OPEN_UI, self);
		mgr.regHand(11372, self.GC_SEND_UI, self);
		mgr.regHand(11374, self.GC_SEND, self);
		mgr.regHand(11376, self.GC_GET, self);
		mgr.regHand(11378, self.GC_OPENRECORD_UI, self);
		mgr.regHand(11380, self.GC_INFORM, self);
	}

	public hbArr:HBVo[] = [];
	public nextId:number = 0;
	public residue:number = 0;
	/**11370 打开界面返回 [B:是否系统红包，0不是，1是B:红包状态：0已抢光，1可抢，2已经抢过L:红包idI:红包类型，配置表idU:姓名I:头像I:头像框I:红包个数I:抢到的红包金额]红包列表I:下一个系统红包id，配置表idI:今日剩余可抢红包数*/
	private GC_OPEN_UI(s: Model_ActComTJHB, data: BaseBytes) {
		s.hbArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let vo:HBVo = new HBVo();
			vo.readMsg(data);
			s.hbArr.push(vo);
		}
		s.nextId = data.readInt();
		s.residue = data.readInt();
		s.reddotCheckByQiang();
		GGlobal.control.notify(UIConst.ACTCOM_TJHB);
	}

	public fhbArr:HBVo[] = [];
	/**11372 发红包界面返回 [I:idI:参数B:发送状态：0未发，1可发，2已发]红包状态列表*/
	private GC_SEND_UI(s: Model_ActComTJHB, data: BaseBytes) {
		s.fhbArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let vo:HBVo = new HBVo();
			vo.readFhbMsg(data);
			s.fhbArr.push(vo);
		}
		s.reddotCheckByFa();
		GGlobal.control.notify(UIConst.TJHB_FHB);
	}

	/**11374 发红包返回 B:状态：0没有该类型红包，1成功，2未达到条件，3不可重复发*/
	private GC_SEND(s: Model_ActComTJHB, data: BaseBytes) {
		let res = data.readByte();
		if(res == 1)
		{
			let len:number = s.fhbArr.length;
			for(let i:number = 0;i < len;i ++)
			{
				let vo:HBVo = s.fhbArr[i];
				if(vo.id == Model_ActComTJHB.type)
				{
					vo.sendStatus = 2;
					break;
				}
			}
			s.reddotCheckByFa();
			GGlobal.control.notify(UIConst.TJHB_FHB);
		}
	}

	/**领红包返回 B:状态：0领取失败，1成功，2已抢完，3不能重复抢, 4今日抢红包次数已达上限I:抢到的红包金额I:今日剩余可抢红包数 */
	private GC_GET(s: Model_ActComTJHB, data: BaseBytes) {
		let res = data.readByte();
		let money:number = data.readInt();
		if(res == 1)
		{
			let len:number = s.hbArr.length;
			for(let i:number = 0;i < len;i ++)
			{
				let vo:HBVo = s.hbArr[i];
				if(vo.hbId == Model_ActComTJHB.id)
				{
					vo.hbStatus = 2;
					vo.robNum = money;
					ViewCommonWarn.text("元宝+" + money);
					break;
				}
			}
			s.reddotCheckByQiang();
			s.residue  = data.readInt();
			GGlobal.control.notify(UIConst.ACTCOM_TJHB);
		}else if(res == 2){
			ViewCommonWarn.text("手慢了，红包已抢完");
			// GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_TJHB);
			let len:number = s.hbArr.length;
			for(let i:number = 0;i < len;i ++)
			{
				let vo:HBVo = s.hbArr[i];
				if(vo.hbId == Model_ActComTJHB.id)
				{
					vo.hbStatus = 0;
					vo.robNum = money;
					break;
				}
			}
			s.reddotCheckByQiang();
			GGlobal.control.notify(UIConst.ACTCOM_TJHB);
		}else if(res == 3){
			ViewCommonWarn.text("不能重复抢");
			let len:number = s.hbArr.length;
			for(let i:number = 0;i < len;i ++)
			{
				let vo:HBVo = s.hbArr[i];
				if(vo.hbId == Model_ActComTJHB.id)
				{
					vo.hbStatus = 0;
					vo.robNum = money;
					break;
				}
			}
			s.reddotCheckByQiang();
			GGlobal.control.notify(UIConst.ACTCOM_TJHB);
		}else{
			ViewCommonWarn.text("今日抢红包次数已达上限");
		}
	}

	public recordArr:HBVo[] = [];
	/**11378  打开记录界面返回 [U:名字I:红包金额B:是否玩家本人,1是,0不是]红包记录列表 */
	private GC_OPENRECORD_UI(s: Model_ActComTJHB, data: BaseBytes) {
		s.recordArr = [];
		let len = data.readShort();
		if(len > 0)
		{
			for (let i = 0; i < len; i++) {
				let vo:HBVo = new HBVo();
				vo.readRecordMsg(data);
				if(vo.isMyself == 1)
				{
					s.recordArr.unshift(vo);
				}else{
					s.recordArr.push(vo);
				}
			}
			GGlobal.control.notify(UIConst.TJHB_RECORD);
		}else{
			if(GGlobal.layerMgr.isOpenView(UIConst.TJHB_RECORD))
			{
				GGlobal.layerMgr.close(UIConst.TJHB_RECORD);
			}
			GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_TJHB);
			ViewCommonWarn.text("红包已刷新");
		}
	}

	/**11380  有红包 */
	private GC_INFORM(s: Model_ActComTJHB, data: BaseBytes) {
		GGlobal.mainUICtr.addReportBTN(UIConst.ACTCOM_TJHB);
		TJHBEff.show();
	}

	public static getListData(arr): Array<any> {
		let len = arr ? arr.length : 0;
		if(arr)arr.sort(Model_ActComTJHB.sortFuc);
		let arr1 = [];//可发
		let arr2 = [];//不可发
		let arr3 = [];//已发
		for (let i = 0; i < len; i++) {
			let status = arr ? arr[i].sendStatus : 0;
			if (status == 1) {
				arr1.push(arr[i]);
			} else if(status == 0){
				arr2.push(arr[i]);
			}else if(status == 2){
				arr3.push(arr[i]);
			}
		}
		return arr1.concat(arr2).concat(arr3);

	}

	public static sortFuc(a, b): number {
		return a.id - b.id;
	}

	/** 检查抢红包红点 */
    public reddotCheckByQiang() {
		let bol:boolean = false;
		let sf = GGlobal.reddot;
		let len:number = this.hbArr.length;
		for(let i:number = 0;i < len;i ++)
		{
			let vo:HBVo = this.hbArr[i];
			if(vo.hbStatus == 1)
			{
				bol = true;
				break;
			}
		}
		sf.setCondition(UIConst.ACTCOM_TJHB, 0, bol);
		sf.notifyMsg(UIConst.ACTCOM_TJHB);
	}

	/** 检查发红包红点 */
    public reddotCheckByFa() {
		let bol:boolean = false;
		let sf = GGlobal.reddot;
		let len:number = this.fhbArr.length;
		for(let i:number = 0;i < len;i ++)
		{
			let vo:HBVo = this.fhbArr[i];
			if(vo.sendStatus == 1)
			{
				bol = true;
				break;
			}
		}
		sf.setCondition(UIConst.ACTCOM_TJHB, 1, bol);
		sf.notifyMsg(UIConst.ACTCOM_TJHB);
	}

}