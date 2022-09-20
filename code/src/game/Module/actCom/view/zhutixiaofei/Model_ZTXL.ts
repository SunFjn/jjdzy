/**
 * 主题消费数据管理
 */
class Model_ZTXL extends BaseModel{
	public qs:number = 0;
	public constructor() {
		super();
	}

	/**10301 CG 激活 B:主题类型 */
	public CG_ACTIVATION(type:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(10301, ba);
	}

	/**10303 CG 领取主题奖励 I:编号ID */
	public CG_GET_AWARD(id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(10303, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let self = this;
		self.socket = wsm;
		wsm.regHand(10300, self.GC_OPEN_UI, self);
		wsm.regHand(10302, self.GC_ACTIVATION, self);
		wsm.regHand(10304, self.GC_GET_AWARD, self);
	}

	public rechargeNum: number = 0;//充值元宝
	public type: number = 0;//主题类型
	public expenditure: number = 0;//消费元宝
	public obj: { [id: number]: { id: number, status: number } } = {};
	/**10300 GC	打开主题消费返回 I:充值元宝B:主题类型I:消费元宝[I:IDB:状态：0.条件不符 1.可领 2.已领] */
	public GC_OPEN_UI(s: Model_ZTXL, data: BaseBytes) {
		s.obj = {};
		s.rechargeNum = data.readInt();
		s.type = data.readByte();
		s.expenditure = data.readInt();
		let len = data.readShort();
		for (let i = 0; i < len; i++)
		{
			let id:number = data.readInt();
			let status:number = data.readByte();
			s.obj[id] = { id: id, status: status };
		}
		GGlobal.control.notify(UIConst.ZTXF);
	}

	/**10302 GC	激活返回 B:状态：1.成功 2.参数错误 3.激活条件不足 4.已激活B:主题类型 */
	public GC_ACTIVATION(s: Model_ZTXL, data: BaseBytes) {
		let res = data.readByte();
		if(res == 1)
		{
			s.type = data.readByte();
			s.checkNoticeZTXF();
			GGlobal.control.notify(UIConst.ZTXF);
		}
	}

	/**10304 GC	领取主题奖励返回 B:状态：1.成功 2.背包已满 3.参数错误 4.该奖励已领 5.领取条件不足I:编号ID */
	public GC_GET_AWARD(s: Model_ZTXL, data: BaseBytes) {
		let res = data.readByte();
		if(res == 1)
		{
			let id:number = data.readInt();
			s.obj[id] = { id: id, status: 2 };
			s.checkNoticeZTXF();
			GGlobal.control.notify(UIConst.ZTXF);
		}
	}

	/**
	 * 根据期数获取tabList数据
	 */
	public getTabVOs(qs:number):Iztxfb_329[]
	{
		let arr:Array<Iztxfb_329> = [];
		for (let key in Config.ztxfb_329) {
            let cfg:Iztxfb_329 = Config.ztxfb_329[key];
            if(cfg.qs == qs && cfg.yb <= 0)
            {
                arr.push(cfg);
            }
        }
		return arr;
	}

	/**
	 * 根据期数和类型获取List数据
	 */
	public getVosByLx(qs:number, lx:number)
	{
		var arr = [];
		for (let key in Config.ztxfb_329) {
            let cfg:Iztxfb_329 = Config.ztxfb_329[key];
            if(cfg.qs == qs && cfg.lx == lx)
            {
				let obj = this.obj[cfg.id];
                if(obj)
				{
					arr.push(obj);
				}else{
					let id:number = cfg.id;
					let status:number = 0;
					if(cfg.yb <= 0 && cfg.lx == this.type)
					{
						status = 1;
					}else if(cfg.yb > 0 && cfg.lx == this.type && this.expenditure >= cfg.yb)
					{
						status = 1;
					}
					obj = { id: id, status: status };
					arr.push(obj);
				}
            }
        }
		return arr;
	}

	/**
	 * 主题消费每个类型红点
	 */
	public checkZTXFNoticeByType(qs:number, lx:number):boolean
	{
		let bol:boolean = false;
		if(this.type > 0 && this.type != lx)  return false;

		let needCharge:number = Config.xtcs_004[7630].num;
		if(this.type <= 0 && this.rechargeNum >= needCharge)  return true;

		let arr = this.getVosByLx(qs, lx);
		let len:number = arr.length;
		let obj;
		for(var i:number = 0;i < len;i ++)
		{
			obj = arr[i];
			if(obj.status == 1){
				return true;
			}
		}
		return bol;
	}

	/**
	 * 主题消费大图标红点红点
	 */
	private checkNoticeZTXF() {
		let isNotice:boolean = false;
		let arr = this.getTabVOs(this.qs);
		let len:number = arr.length;
		let cfg:Iztxfb_329;
		for (var i:number = 0;i < len;i ++)
		{
			cfg = arr[i];
			if(this.checkZTXFNoticeByType(this.qs, cfg.lx))
			{
				isNotice = true;
				break;
			}
        }
		let r = GGlobal.reddot
		r.setCondition(UIConst.ZTXF, 0, isNotice);
		r.notify(UIConst.ACTCOM);
	}
}