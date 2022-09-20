class Model_ActComPXSB extends BaseModel{
	public static rewardArr: Array<any> = [];
	public type:number = 0;//是否大奖，0不是，1是

	public constructor() {
		super();
	}

	/**12101 领取奖励 B:是否大奖，0不是，1是I:配置表id  */
	public CG_GET(type:number, id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(id);
		this.sendSocket(12101, ba);
		this.type = type;
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(12100, self.GC_OPEN_UI, self);
		mgr.regHand(12102, self.GC_GET, self);
	}

	public xfNum:number = 0;
	/**12100 打开界面返回 [I:大奖配置表idB:状态：0未达到，1可领取，2已领取I:达到天数[I:配置表idB:状态：0未达到，1可领取，2已领取]]奖励列表I:今日消费数 */
	private GC_OPEN_UI(s: Model_ActComPXSB, data: BaseBytes) {
		Model_ActComPXSB.rewardArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let vo:PXSBVO = new PXSBVO();
			vo.readMsg(data);
			Model_ActComPXSB.rewardArr.push(vo);
		}
		s.xfNum = data.readInt();
		s.reddotCheck();
		GGlobal.control.notify(UIConst.ACTCOM_PXSB);
	}

	/**12102 领取奖励返回 B:领取状态，0条件未达到，1成功，2已领取I:配置表id */
	private GC_GET(s: Model_ActComPXSB, data: BaseBytes) {
		let result = data.readByte();
		let id:number = data.readInt();
		if (result == 1) {
			let len:number = Model_ActComPXSB.rewardArr.length;
			if(s.type == 1)//是大奖
			{
				for(let i:number = 0;i < len;i ++)
				{
					let vo:PXSBVO = Model_ActComPXSB.rewardArr[i];
					if(vo.id == id)
					{
						vo.status = 2;
						break;
					}
				}
			}else{
				for(let i:number = 0;i < len;i ++)
				{
					let vo:PXSBVO = Model_ActComPXSB.rewardArr[i];
					let len1:number = vo.arr.length;
					for(let j:number = 0;j < len1;j ++)
					{
						if(vo.arr[j][0] == id)
						{
							vo.arr[j][1] = 2;
							break;
						}
					}
				}
			}
			s.reddotCheck();
			GGlobal.control.notify(UIConst.ACTCOM_PXSB);
		}
	}

	/**将超过1000000的数值转换成x.x万显示 */
	public getWanText1(v: number): string {
		if (v >= 10000) {
			return (v / 10000) + "万";
		} else {
			return String(v);
		}
	}

	public static getListData(arr): Array<any> {
		let len = arr ? arr.length : 0;
		if (arr) arr.sort(Model_ActComPXSB.sortFuc);
		let arr1 = [];//可领取
		let arr2 = [];//不能领取
		let arr3 = [];//已领取
		for (let i = 0; i < len; i++) {
			let status = arr ? arr[i][1] : 0
			if (status == 1) {
				arr1.push(arr[i]);
			} else if (status == 2) {
				arr3.push(arr[i]);
			} else {
				arr2.push(arr[i]);
			}
		}
		return arr1.concat(arr2).concat(arr3);
	}

	public static sortFuc(a, b): number {
		return a.id - b.id;
	}

	 /** 检查红点 */
    public reddotCheck() {
		let sf = GGlobal.reddot;
		let bol:boolean = false;
		if(!Model_ActComPXSB.rewardArr || Model_ActComPXSB.rewardArr.length < 0)  return bol;

		let len:number = Model_ActComPXSB.rewardArr.length;
		for(let i:number = 0;i < len;i ++)
		{
			bol = this.reddotCheckByIndex(i);
			if(bol)    break;
		}
		sf.setCondition(UIConst.ACTCOM_PXSB, 0, bol);
		sf.notifyMsg(UIConst.ACTCOM_PXSB);
	}

	public reddotCheckByIndex(index):boolean
	{
		let bol:boolean = false;
		let vo:PXSBVO = Model_ActComPXSB.rewardArr[index];
		if(!vo || vo.arr.length < 0)   return bol;

		let len:number = vo.arr.length;
		for(let i:number = 0;i < len;i ++)
		{
			let status:number = vo.arr[i][1];
			if(status == 1)
			{
				return true;
			}
		}

		return bol;
	}
}