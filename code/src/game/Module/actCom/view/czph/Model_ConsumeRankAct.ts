/**
 * Model_ConsumeRankAct
 * 充值排行(活动)
 */
class Model_ConsumeRankAct extends BaseModel {

	public czphData: Iczph_755[][] = [];
	public getCZPHData() {
		let self = this;
		for (let key in Config.czph_755) {
			let cfg = Config.czph_755[key];
			if (!self.czphData[cfg.qs - 1]) self.czphData[cfg.qs - 1] = [];
			self.czphData[cfg.qs - 1][parseInt(key) % 10 - 1] = cfg;
		}
	}
	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(8690, this.GC_ConsumeRankAct_openUI_8690, this);
	}

	public rankArr = [];
	public firstJob = 0;
	public firstGodWeapon = 0;
	public firstHorseId = 0;
	public myRank = 0;
	public myMoney = 0;
	public qishu = 0;
	/**8690 [I-U-I]-I-I-I 打开界面返回 [I:排名U:玩家名称I:充值元宝数]充值排行榜rechargeRankI:第一名职业时装（job*1000+时装id），
	 * 没有则为0firstModelI:我的排名myRankI:我的充值数myRechargeI:期数I:神兵*/
	public GC_ConsumeRankAct_openUI_8690(self: Model_ConsumeRankAct, data: BaseBytes): void {
		let len = data.readShort();
		for (let i = 0; i < 50; i++) {
			self.rankArr[i] = [i + 1, "", 0];
		}
		for (let i = 0; i < len; i++) {
			let rank = data.readInt();
			let roleName = data.readUTF();
			let money = data.readInt();
			self.rankArr[rank - 1] = [rank, roleName, money];
		}
		self.firstJob = data.readInt();
		self.firstGodWeapon = data.readInt();
		self.myRank = data.readInt();
		self.myMoney = data.readInt();
		self.qishu = data.readInt();
		self.firstHorseId = data.readInt();
		GGlobal.control.notify(UIConst.ACTCOM_CZPH)
	}

}