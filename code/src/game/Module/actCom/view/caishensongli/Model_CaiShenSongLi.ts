class Model_CaiShenSongLi extends BaseModel{
	public constructor() {
		super();
	}

	/**10771 抽奖  */
	public CG_TURN() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(10771, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		wsm.regHand(10770, a.GC_OPEN_UI, a);
		wsm.regHand(10772, a.GC_TURN, a);
	}

	public lottery:number = 0;
	public recharge:number = 0;
	/**10770 打开界面返回 I:抽奖次数I:再充值元宝数(可再获得抽奖次数)*/
	private GC_OPEN_UI(s: Model_CaiShenSongLi, data: BaseBytes) {
		s.lottery = data.readInt();
		s.recharge = data.readInt();
		GGlobal.control.notify(UIConst.ACTCOM_CSSL);
	}

	public resultList: IGridImpl[] = [];
	/**10772 抽奖返回 B:状态：1：成功，2：抽奖次数不足[B:类型I:数量I:数量B:是否大奖（1：是，0：否）]获得奖励 */
	private GC_TURN(s: Model_CaiShenSongLi, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			s.lottery --;
			s.resultList.length = 0;
			let len = data.readShort();
			for (let i = 0; i < len; i++) {
				let t_itemVO = ConfigHelp.parseItemBa(data);
				let arg5 = data.readByte();
				t_itemVO.extra = arg5 == 1 ? 5 : 0;
				s.resultList.push(t_itemVO);
			}
			s.reddotCheckCSSL();
			GGlobal.control.notify(UIConst.ACTCOM_CSSL, s.resultList);
		}else{
			ViewCommonWarn.text("抽奖次数不足");
		}
	}

	/** 检查财神送礼红点 */
    public reddotCheckCSSL() {
		let sf = GGlobal.reddot;
		let bol:boolean = false;
		if(this.lottery > 0)
		{
			bol = true;
		}
		sf.setCondition(UIConst.ACTCOM_CSSL, 0, bol);
		sf.notifyMsg(UIConst.ACTCOM_CSSL);
	}
}