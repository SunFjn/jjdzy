class Model_GroupBuy extends BaseModel {
	public constructor() {
		super();
	}

	public buyArr:Vo_HuoDong[] = [];
	public buyNum:number = 0;
	public charge:number = 0;

	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		wsm.regHand(2850, a.GC_INIT, a);
		wsm.regHand(2852, a.GC_REWARD_CHARGE, a);
		wsm.regHand(2854, a.GC_FRIST_RENUM, a);
	}

	/**获取奖励 */
	public CG_GET_REWARD(index) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(index);
		this.sendSocket(2851, ba);
	}

	/**
	 * 初始化系统数据 I:今日充值I:今日全服首冲数[I:选号B:奖励领取状态]
	*/
	private GC_INIT(s: Model_GroupBuy, d: BaseBytes) {
		s.charge = d.readInt();
		s.buyNum = d.readInt();
		let len = d.readShort();
		s.buyArr = [];
		for (let a = 0; a < len; a++) {
			let v:Vo_HuoDong = new Vo_HuoDong();
			v.readMsgInt(d);
			s.buyArr.push(v);
		}
		s.buyArr.sort(function(a,b){return a.id - b.id});
		GGlobal.control.notify(Enum_MsgType.GROUP_BUY_UI);
	}

	/**
	 * 奖励发生变化 I:奖励序号B:奖励状态
	*/
	private GC_REWARD_CHARGE(s: Model_GroupBuy, d: BaseBytes) {
		let id = d.readInt();
		let status = d.readByte();
		s.charge = d.readInt();
		let len = s.buyArr.length;
		let change = false;
		if(id > 0){
			for (let a = 0; a < len; a++) {
				let v = s.buyArr[a];
				if(v.id == id){
					v.status = status;
					change = true;
					break;
				}
			}
		}
		for (let a = 0; a < len; a++) {
			let v = s.buyArr[a];
			let cfg = Config.sctg_730[v.id]
			if(v.status == 0 && s.buyNum >= cfg.renshu && s.charge >= cfg.jine){
				v.status = 1;
				change = true;
			}
		}
		if(change){
			GGlobal.control.notify(Enum_MsgType.GROUP_BUY_UI);
		}else{
			GGlobal.control.notify(Enum_MsgType.GROUP_BUY_CHARGE);
		}
	}

	/**
	 * 今日首冲人数 I:今日首冲人数变化
	*/
	private GC_FRIST_RENUM(s: Model_GroupBuy, d: BaseBytes) {
		s.buyNum = d.readInt();
		let len = s.buyArr.length;
		let change = false;
		for (let a = 0; a < len; a++) {
			let v = s.buyArr[a];
			let cfg = Config.sctg_730[v.id]
			if(v.status == 0 && s.buyNum >= cfg.renshu && s.charge >= cfg.jine){
				v.status = 1;
				change = true;
			}
		}
		if(change){//红点提示
			GGlobal.control.notify(Enum_MsgType.GROUP_BUY_UI);
		}else{
			GGlobal.control.notify(Enum_MsgType.GROUP_BUY_NUM);
		}
	}

}