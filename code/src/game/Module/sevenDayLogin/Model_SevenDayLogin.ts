class Model_SevenDayLogin extends BaseModel {
	public static curDay = 1;
	public static drawArr = [];
	/**1901 打开界面   */
	public CG_OPEN_SEVENDAY_LOGIN() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1901, ba);
	}

	/**1903 领取奖励 B:领取天数   */
	public CG_SEVENDAY_LOGIN_DRAW(day) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(day);
		this.sendSocket(1903, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		wsm.regHand(1902, a.GC_OPEN_SEVENDAY_LOGIN, a);
		wsm.regHand(1904, a.GC_SEVENDAY_LOGIN_DRAW, a);
	}

	/**1904 领取奖励 B:领取状态，1：成功，2：领取天数不合法，3：重复领取B:当领取状态为成功时返回领取的天数  */
	public GC_SEVENDAY_LOGIN_DRAW(self: Model_SevenDayLogin, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 1) {
			let day = data.readByte();
			Model_SevenDayLogin.drawArr[day - 1] = day;
			GGlobal.control.notify(Enum_MsgType.SEVENDAY_LOGIN);
		} else {

		}
	}

	public static isFirstOpen: boolean = false;
	/**1902 打开界面 [B:已领取天数]领取天数列表B:登录天数  */
	public GC_OPEN_SEVENDAY_LOGIN(self: Model_SevenDayLogin, data: BaseBytes) {
		Model_SevenDayLogin.isFirstOpen = true;
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let day = data.readByte();
			Model_SevenDayLogin.drawArr[day - 1] = day;
		}
		Model_SevenDayLogin.curDay = data.readByte();
		GGlobal.control.notify(Enum_MsgType.SEVENDAY_LOGIN);
	}
}