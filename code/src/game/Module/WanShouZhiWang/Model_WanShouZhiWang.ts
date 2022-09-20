class Model_WanShouZhiWang extends BaseModel{
	public static rewardArr: Array<any> = [];
	public static curDay: number = 0;
	public static topUpNum: number = 0;
	public static days: Array<number> = [];
	private static id:number = 0;
	private static index:number = 0;

	/**8801 领取奖励 I:配置表id*/
	public CG_LIANCHONG_GETAWARD(id: number, index:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(8801, ba);
		Model_WanShouZhiWang.id = id;
		Model_WanShouZhiWang.index = index;
	}

	/**9131 领取奖励 B:任务类型I:任务id*/
	public CG_HUOYUE_GETAWARD(type: number,id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(id);
		this.sendSocket(9131, ba);
	}

	/**9101 领取奖励 I:要领取的奖励id*/
	public CG_LEICHONG_GET(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(9101, ba);
	}

	/**10201 领取奖励 I:配置表id*/
	public CG_GETAWARD10201(id: number, index:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(10201, ba);
		Model_WanShouZhiWang.id = id;
		Model_WanShouZhiWang.index = index;
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		wsm.regHand(8800, a.GC_LIANCHONG_OPENUI, a);
		wsm.regHand(8802, a.GC_GET_AWARD, a);
		wsm.regHand(9130, a.GC_HUOYUE_OPENUI, a);
		wsm.regHand(9132, a.GC_HUOYUE_GET, a);
		wsm.regHand(9100, a.GC_DAILYADDUP_OPENUI, a);
		wsm.regHand(9102, a.GC_DAILYADDUP_GET, a);
		//新活动-连续充值
		wsm.regHand(10200, a.GC_LIANCHONG_OPENUI, a);
		wsm.regHand(10202, a.GC_GET_AWARD, a);
	}

	/**8800 打开界面返回 [[I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]I:达到天数]奖励列表I:今日充值金额*/
	private GC_LIANCHONG_OPENUI(s: Model_WanShouZhiWang, data: BaseBytes) {
		Model_WanShouZhiWang.rewardArr = [];
		Model_WanShouZhiWang.days = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let arr = [];
			for (let j = 0, len1 = data.readShort(); j < len1; j++) {
				let vo: Vo_HuoDong = new Vo_HuoDong();
				vo.readMsgInt(data);
				arr.push(vo);
			}
			Model_WanShouZhiWang.rewardArr.push(arr);
			Model_WanShouZhiWang.days.push(data.readInt());
		}
		Model_WanShouZhiWang.topUpNum = data.readInt();
		s.checkNoticeLCHL();
		GGlobal.control.notify(UIConst.WSZW_LIANCHONGHAOLI);
	}

	/**8802 领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:配置表id*/
	private GC_GET_AWARD(s: Model_WanShouZhiWang, data: BaseBytes) {
		let result = data.readByte();
		let id = data.readInt();
		if (result == 1) {
			let arr = Model_WanShouZhiWang.rewardArr[Model_WanShouZhiWang.index];
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].id == Model_WanShouZhiWang.id) {
					arr[i].status = 2;
					break;
				}
			}
			s.checkNoticeLCHL();
			GGlobal.control.notify(UIConst.WSZW_LIANCHONGHAOLI);
		}else {
			if (result == 0) {
				ViewCommonWarn.text("奖励不存在");
			} else if (result == 2) {
				ViewCommonWarn.text("不可领取");
			} else if (result == 3) {
				ViewCommonWarn.text("不可重复领取");
			}
		}
	}

	//活跃
	huoYObj: { [tp: number]: Vo_HuoDong[] } = {};
	/**9130 返回界面信息 [B:任务类型I:当前数值[I:任务idB:任务状态]]任务数据*/
	private GC_HUOYUE_OPENUI(s: Model_WanShouZhiWang, data: BaseBytes) {
		s.huoYObj = {}
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let type = data.readByte();
			let val = data.readInt();
			s.huoYObj[type] = [];
			let size = data.readShort();
			for (let j = 0; j < size; j++) {
				let hd: Vo_HuoDong = new Vo_HuoDong();
				hd.readMsgInt(data);
				hd.canCt = val;
				hd.hasCt = type;
				s.huoYObj[type].push(hd);
			}
		}
		GGlobal.control.notify(UIConst.WSZW_HUOYUE);
	}

	/**9132 领取奖励结果 B:结果：0：失败，1：成功B:失败：（1：未完成任务，2：已领取），成功：任务类型I:任务id*/
	private GC_HUOYUE_GET(s: Model_WanShouZhiWang, data: BaseBytes) {
		let res = data.readByte();
		let type = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			let arr: Vo_HuoDong[] = s.huoYObj[type]
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].id == id) {
					arr[i].status = 2;
					break;
				}
			}
			GGlobal.control.notify(UIConst.WSZW_HUOYUE);
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}

	//累冲
	public ljcz_data = [];
	public rechargeVal = 0;
	/**9100 打开界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表I:充值金额*/
	private GC_DAILYADDUP_OPENUI(self: Model_WanShouZhiWang, data: BaseBytes) {
		self.ljcz_data = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let obj = {};
			obj["id"] = data.readInt();
			obj["st"] = data.readByte();
			self.ljcz_data.push(obj);
		}
		self.rechargeVal = data.readInt();
		self.ljcz_data.sort(self.sortBySt);
		GGlobal.control.notify(UIConst.WSZW_LEICHONG);
	}

	/**9102 领取奖励结果 B:领取状态，0:没有该奖励，1:成功，2:未达到条件I:领取的奖励id*/
	private GC_DAILYADDUP_GET(self: Model_WanShouZhiWang, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 1) {
			let ba = self.ljcz_data;
			let id:number = data.readInt();
			let len = ba.length;
			for (let i = 0; i < len; i++) {
				let obj = ba[i];
				if (obj["id"] == id) {
					obj["st"] = 2;
					break;
				}
			}
			self.ljcz_data.sort(self.sortBySt);
			self.checkNoticeLJCZ();
			GGlobal.control.notify(UIConst.WSZW_LEICHONG);
		} else {
			ViewCommonWarn.text(["没有该奖励", "领取成功", "未达到条件", "已领取"][ret]);
		}
	}

	public static sortFuc(a: Vo_HuoDong, b: Vo_HuoDong): number {
		return a.id - b.id;
	}

	public static getListData(arr: Array<Vo_HuoDong>): Array<any> {
		let len = arr ? arr.length : 0;
		if(arr)arr.sort(Model_WanShouZhiWang.sortFuc);
		let arr1 = [];//可领取
		let arr2 = [];//不能领取
		let arr3 = [];//已领取
		for (let i = 0; i < len; i++) {
			let $status = arr ? arr[i].status : 0
			if ($status == 1) {
				arr1.push(arr[i]);
			} else if ($status == 2) {
				arr3.push(arr[i]);
			} else {
				arr2.push(arr[i]);
			}
		}
		return arr1.concat(arr2).concat(arr3);
	}

	/**
	 * 根据期数和金额获取连充豪礼大奖表的数据
	 */
	public static getIlchlzs_756(qishu:number,money:number):Ilchlzs_756
	{
		let cfg:Ilchlzs_756;
		for (let key in Config.lchlzs_756) {
            cfg = Config.lchlzs_756[key];
            if(cfg.qs == qishu && cfg.rmb == money)
			{
				return cfg;
			}
        }
		return null;
	}

	/**
	 * 根据期数和金额获取连充豪礼大奖表的数据
	 */
	public static getIIlxczzs_764(qishu:number,money:number):Ilxczzs_764
	{
		let cfg:Ilxczzs_764;
		for (let key in Config.lxczzs_764) {
            cfg = Config.lxczzs_764[key];
            if(cfg.qs == qishu && cfg.rmb == money)
			{
				return cfg;
			}
        }
		return null;
	}

	/**
	 * 根据期数获取连充豪礼大奖表的数据
	 */
	public static getIlchlzs_756s(qishu:number):Ilchlzs_756[]
	{
		let arr:Ilchlzs_756[] = [];
		for (let key in Config.lchlzs_756) {
            let cfg:Ilchlzs_756 = Config.lchlzs_756[key];
            if(cfg.qs == qishu)
			{
				arr.push(cfg);
			}
        }
		return arr;
	}

	/**
	 * 根据期数获取连充豪礼大奖表的数据
	 */
	public static getIlxczzs_764(qishu:number):Ilxczzs_764[]
	{
		let arr:Ilxczzs_764[] = [];
		for (let key in Config.lxczzs_764) {
            let cfg:Ilxczzs_764 = Config.lxczzs_764[key];
            if(cfg.qs == qishu)
			{
				arr.push(cfg);
			}
        }
		return arr;
	}

	/**
	 * 检查某个tab红点
	 */
	public static checkNoticeLCHLByTab(index:number):boolean
	{
		let bol:boolean = false;
		let arr:Vo_HuoDong[] = Model_WanShouZhiWang.rewardArr[index];
		if(!arr)   return false;

		let len:number = arr.length;
		let vo: Vo_HuoDong;
		for(var i:number = 0;i < len;i ++)
		{
			vo = arr[i];
			if(vo.status == 1)
			{
				return true;
			}
		}
		return bol;
	}

	/**检查连冲豪礼的红点 */
	private checkNoticeLCHL() {
		let isNotice:boolean = false;
		if(!Model_WanShouZhiWang.rewardArr)   return;
		
		let len:number = Model_WanShouZhiWang.rewardArr.length;
		for (var i:number = 0;i < len;i ++)
		{
			if(Model_WanShouZhiWang.checkNoticeLCHLByTab(i))
			{
				isNotice = true;
				break;
			}
        }
		let r = GGlobal.reddot;
		r.setCondition(UIConst.WSZW_LIANCHONGHAOLI, 0, isNotice);
		r.setCondition(UIConst.XINHD_LXCZ, 0, isNotice);
		r.notify(UIConst.ACTCOM);
	}

	public sortBySt(a, b) {
		let st1 = a.st == 1 ? -1 : a.st;
		let st2 = b.st == 1 ? -1 : b.st;
		if (st1 == st2) {
			return a.id < b.id ? -1 : 1;
		}
		return st1 > st2 ? 1 : -1;
	}

	/**检查累计充值红点 */
	private checkNoticeLJCZ() {
		let red = false;
		let m = this;
		let data = this.ljcz_data;
		let len = data.length;
		for (let i = 0; i < len; i++) {
			let obj = data[i];
			if (obj["st"] == 1) {
				red = true;
				break
			}
		}
		GGlobal.reddot.setCondition(UIConst.WSZW_LEICHONG, 0, red);
		GGlobal.reddot.notify(UIConst.ACTCOM);
	}

	/**检查每日活跃红点 */
	public checkNoticeMRHY(type:number):boolean {
		let red = false;
		let m = this;
		let data:Array<Vo_HuoDong> = GGlobal.modelWanShouZhiWang.huoYObj[type];
		if(!data || data.length <= 0)   return red;
		let len = data.length;
		for (let i = 0; i < len; i++) {
			let vo:Vo_HuoDong = data[i];
			if (vo.status == 1) {
				red = true;
				break
			}
		}
		return red;
	}

}