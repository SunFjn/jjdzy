class Model_VipDiscount extends BaseModel{
	public constructor() {
		super();
	}

	public static getVipDisData(vip):Vo_VipDisData
	{
		let disData:Vo_VipDisData;
		for(var i:number = 0;i < Model_VipDiscount.discountArr.length;i ++)
		{
			disData = Model_VipDiscount.discountArr[i];
			if(disData.vip == vip)
			{
				return disData;
			}
		}

		return null;
	}

	/**
	 * vip折扣红点
	 */
	public static checkVipDisNotice(vip:number):boolean
	{
		let bol:boolean = false;
		let data:Vo_VipDisData = Model_VipDiscount.getVipDisData(vip);
		if(data)
		{
			let cfg:Ixhdvip_402 = Config.xhdvip_402[vip];
			if(cfg && data.buyCount < cfg.time)
			{
				return true;
			}
		}else{
			if(Model_VipDiscount.curVip >= vip)
			{
				return true;
			}
		}
		return bol;
	}

	private checkNoticeVipDis() {
		let isNotice:boolean = false;
		for (let key in Config.xhdvip_402)
		{
			let cfg:Ixhdvip_402 = Config.xhdvip_402[key];
			if(Model_VipDiscount.checkVipDisNotice(cfg.ID))
			{
				isNotice = true;
				break;
			}
        }
		let r = GGlobal.reddot
		r.setCondition(UIConst.ACTCOM_VIPZK, 0, isNotice);
		r.notify(UIConst.ACTCOM);
	}

	/**8451	CG 打开vip折扣界面 */
	public CG_OPEN_UI() {
		this.sendSocket(8451, new BaseBytes());
	}

	/**8453	CG 抽取折扣 B:vip等级 */
	public CG_EXTRACT_DISCOUNT(vip:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(vip);
		this.sendSocket(8453, ba);
	}

	/**8455	CG 	购买 B:vip等级 */
	public CG_BUY(vip:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(vip);
		this.sendSocket(8455, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let self = this;
		self.socket = wsm;
		wsm.regHand(8452, self.GC_OPEN_UI, self);
		wsm.regHand(8454, self.GC_EXTRACT_DISCOUNT, self);
		wsm.regHand(8456, self.GC_BUY, self);
	}

	public static discountArr: Array<Vo_VipDisData> = [];//折扣信息数组
	public static curVip: number = 0;//当前vip等级
	/**8452	GC 	打开vip折扣界面返回 [B:vip等级I:现价B:购买次数]获得现价的vip折扣数组信息B:当前vip等级 */
	public GC_OPEN_UI(self: Model_VipDiscount, data: BaseBytes) {
		Model_VipDiscount.discountArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++)
		{
			let disData:Vo_VipDisData = new Vo_VipDisData();
			disData.initDate(data);
			Model_VipDiscount.discountArr.push(disData);
		}
		Model_VipDiscount.curVip = data.readByte();
		GGlobal.control.notify(UIConst.ACTCOM_VIPZK);
	}

	/**8454	GC 返回抽取折扣信息 B:状态：0.vip等级不足 1.成功 2.已抽取折扣 3.参数错误B:vip等级I:现价B:已购买次数 */
	public GC_EXTRACT_DISCOUNT(self: Model_VipDiscount, data: BaseBytes) {
		let ret = data.readByte();
		if(ret == 1)
		{
			let disData:Vo_VipDisData = new Vo_VipDisData();
			let vip:number = data.readByte();
			disData.vip = vip;
			disData.curPrice = data.readInt();
			disData.buyCount = data.readByte();
			Model_VipDiscount.discountArr.push(disData);
			// GGlobal.control.notify("GC_EXTRACT_DISCOUNT");
			self.checkNoticeVipDis();
			GGlobal.control.notify(UIConst.ACTCOM_VIPZK,vip);
		}else if(ret == 0)
		{
			ViewCommonWarn.text("vip等级不足");
		}else if(ret == 2)
		{
			ViewCommonWarn.text("已抽取折扣");
		}
	}

	/**8456	GC 购买返回 B:0.vip等级不足 1.成功 2.未获得现价 3.参数错误 4.货币不足 5.超过购买次数 B:vip ID(等级) */
	public GC_BUY(self: Model_VipDiscount, data: BaseBytes) {
		let ret = data.readByte();
		if(ret == 1)
		{
			let vip:number = data.readByte();
			if(!Model_VipDiscount.discountArr || Model_VipDiscount.discountArr.length <= 0)  return;

			let len:number = Model_VipDiscount.discountArr.length;
			for(var i:number = 0;i < len;i ++)
			{
				let disData:Vo_VipDisData = Model_VipDiscount.discountArr[i];
				if(disData.vip == vip)
				{
					disData.buyCount ++;
				}
			}
			self.checkNoticeVipDis();
			GGlobal.control.notify(UIConst.ACTCOM_VIPZK);
		}else if(ret == 0)
		{
			ViewCommonWarn.text("vip等级不足");
		}else if(ret == 4)
		{
			ViewCommonWarn.text("货币不足");
		}else if(ret == 5)
		{
			ViewCommonWarn.text("超过购买次数");
		}
	}
}