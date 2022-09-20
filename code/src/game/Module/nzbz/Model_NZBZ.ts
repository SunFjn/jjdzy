class Model_NZBZ extends BaseModel {

	/**个人排名 */
	public static myRank: number;
	/**国家排名 */
	public static countryRank: number;
	/**个人积分 */
	public static myJiFen: number;
	/**增加的积分 */
	public static addJiFen: number;
	/**剩余挑战次数 */
	public static battleNum: number;
	/**剩余购买次数 */
	public static buyNum: number;
	/**冷却时间 */
	public static coolTime: number;
	/**已领取积分项 */
	public static drawArr: Array<any> = [];
	/**对手信息 */
	public static enemyArr: Array<Vo_NZBZ> = [];
	/**个人排行 榜 */
	public static rankArr: Array<any> = [];
	/** 国家排名 */
	public static countryRankArr: Array<any> = [];
	/** 君主名称 */
	public static kingName: string;
	/** 战斗结果 */
	public static battleRet: number;
	/** 战斗人的ID */
	public static battleID: number;
	/** 是否robot */
	public static isRobot: number;

	public static checkNotice(): boolean {
		if (Model_NZBZ.isFirstOpen) {
			let isCheck = Model_NZBZ.battleNum > 0;
			if (!isCheck) {
				isCheck = Model_NZBZ.checkJiFenNotice();
			}
			return isCheck;
		}
		return false;
	}

	public static checkJiFenNotice(): boolean {
		let arr = Model_NZBZ.jifenArr;
		for (let i = 0; i < arr.length; i++) {
			let vo = arr[i];
			if (Model_NZBZ.drawArr.indexOf(vo.point) == -1 && Model_NZBZ.myJiFen >= vo.point) {
				return true;
			}
		}
		return false;
	}

	private static _jifenArr: Array<any> = [];
	public static get jifenArr(): Array<any> {
		if (Model_NZBZ._jifenArr.length <= 0) {
			for (let key in Config.nzbzpoint_226) {
				let cfg = Config.nzbzpoint_226[key];
				Model_NZBZ._jifenArr.push(cfg);
			}
			Model_NZBZ._jifenArr.sort(Model_NZBZ.sortJiFen);
		}
		return Model_NZBZ._jifenArr;
	}

	public static sortJiFen(a: any, b: any): number {
		if (Model_NZBZ.drawArr.indexOf(a.point) != -1 && Model_NZBZ.drawArr.indexOf(b.point) != -1) {
			return a.point - b.point;
		} else if (Model_NZBZ.drawArr.indexOf(a.point) == -1 && Model_NZBZ.drawArr.indexOf(b.point) == -1) {
			return a.point - b.point;
		} else {
			if (Model_NZBZ.drawArr.indexOf(a.point) == -1) {
				return -1;
			} else {
				return 1;
			}
		}

	}

	/**1571  打开南征北战界面   */
	public CG_OPEN_NZBZ(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1571, ba);
	}
	/**1573  获取个人排行榜     */
	public CG_GET_NZBZ_RANK(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1573, ba);
	}

	/**1575  获取国家排行       */
	public CG_GET_NZBZ_COUNTRYRANK(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1575, ba);
	}

	/**1577  购买挑战次数     */
	public CG_NZBZ_BUY_BATTLENUM(count): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(count);
		this.sendSocket(1577, ba);
	}

	/**1579 请求挑战 L:被挑战者id      */
	public CG_NZBZ_BATTLE(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(1579, ba);
	}

	/**1581 战斗结果 B:战斗结果，0：失败，1：胜利 */
	public CG_NZBZ_BATTLE_RESULT(type: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(1581, ba);
	}

	/**1583 领取积分奖励 I:奖励项积分  */
	public CG_NZBZ_DRAW_JIFENREWARD(jiefenId: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(jiefenId);
		this.sendSocket(1583, ba);
	}

	/**1585  刷新对手    */
	public CG_NZBZ_RES_ENEMY(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1585, ba);
	}

	/**1587 扫荡 L:被扫荡玩家id    */
	public CG_NZBZ_SAODANG(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(1587, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		wsm.regHand(1570, a.GC_NZNBZ_PROMPT, a);
		wsm.regHand(1572, a.GC_OPEN_NZBZ, a);
		wsm.regHand(1574, a.GC_GET_NZBZ_RANK, a);
		wsm.regHand(1576, a.GC_GET_NZBZ_COUNTRYRANK, a);
		wsm.regHand(1578, a.GC_NZBZ_BUY_BATTLENUM, a);
		wsm.regHand(1580, a.GC_NZBZ_BATTLE, a);
		wsm.regHand(1582, a.GC_NZBZ_BATTLE_RESULT, a);
		wsm.regHand(1584, a.GC_NZBZ_DRAW_JIFENREWARD, a);
		wsm.regHand(1586, a.GC_NZBZ_RES_ENEMY, a);
		wsm.regHand(1588, a.GC_NZBZ_SAODANG, a);
		wsm.regHand(1590, a.GC_NZBZ_UPDATE_BATTLENUM, a);
	}

	/**1570	提示 B:提示类型（1：周结算中不可操作） */
	public GC_NZNBZ_PROMPT(self: Model_NZBZ, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			ViewCommonWarn.text("周结算中不可操作");
		}
	}

	/**1590 更新剩余挑战次数 I:剩余挑战次数I:冷却时间  */
	public GC_NZBZ_UPDATE_BATTLENUM(self: Model_NZBZ, data: BaseBytes): void {
		let battleNum = data.readInt();
		let coolTime = data.readInt();
		Model_NZBZ.battleNum = battleNum;
		Model_NZBZ.coolTime = coolTime;
		GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
	}

	/**1588 扫荡结果 B:0：失败，1：成功I:失败：错误码， 成功：剩余挑战次数I:冷却时间I:积分B:个人排行[B:物品类型I:道具idI:数量]奖励数据  */
	public GC_NZBZ_SAODANG(self: Model_NZBZ, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let battleNum = data.readInt();
			let coolTime = data.readInt();
			let jifen = data.readInt();
			let myRank = data.readByte();
			Model_NZBZ.addJiFen = jifen - Model_NZBZ.myJiFen;
			Model_NZBZ.myJiFen = jifen;
			Model_NZBZ.myRank = myRank;
			Model_NZBZ.battleNum = battleNum;
			Model_NZBZ.coolTime = coolTime;
			let arr = [];
			for (let i = 0, len = data.readShort(); i < len; i++) {
				let vo = ConfigHelp.parseItemBa(data);
				arr.push(vo);
				// ConfigHelp.addSerGainText(vo.gType, vo.id, true, vo.count);
			}
			// GGlobal.layerMgr.open(UIConst.NANZHENG_BEIZHAN_SAODANG, arr);
			GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
		} else {
		}
	}

	/**1586 刷新对手 [L:玩家idU:玩家名称I:职业I:等级I:头像I:头像框B:国家I:官衔L:战力I:积分奖励常数idI:声望、功勋奖励常数id]对手数据 */
	public GC_NZBZ_RES_ENEMY(self: Model_NZBZ, data: BaseBytes): void {
		Model_NZBZ.enemyArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let id = data.readLong();
			let name = data.readUTF();
			let job = data.readInt();
			let level = data.readInt();
			let headId = data.readInt();
			let framePic = data.readInt();
			let country = data.readByte();
			let guanzhi0 = data.readInt();
			let power = data.readLong();
			let jifenId = data.readInt();
			let constId = data.readInt();
			let vo: Vo_NZBZ = new Vo_NZBZ();
			vo.id = id;
			vo.name = name;
			vo.job = job;
			vo.level = level;
			vo.headId = headId;
			vo.framePic = framePic;
			vo.country = country;
			vo.guanzhi = guanzhi0;
			vo.power = power;
			vo.jifenId = jifenId;
			vo.constId = constId;
			Model_NZBZ.enemyArr.push(vo);
		}
		GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
	}

	/**1584 领取结果 B:0：失败，1：成功I:失败：错误码，成功：积分奖励项  */
	public GC_NZBZ_DRAW_JIFENREWARD(self: Model_NZBZ, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			Model_NZBZ.drawArr.push(data.readInt());
			Model_NZBZ.jifenArr.sort(Model_NZBZ.sortJiFen);
			GGlobal.control.notify(Enum_MsgType.NZBZ_JIFENREWARD_UPDATE);
		}
	}

	/**1582战斗结果 B:结果：0：失败，1：胜利I:积分I:个人排行[I:物品类型I:道具idI:数量]奖励数据  */
	public GC_NZBZ_BATTLE_RESULT(self: Model_NZBZ, data: BaseBytes): void {
		let result = data.readByte();
		let jifen = data.readInt();
		let myRank = data.readInt();
		Model_NZBZ.myJiFen = jifen;
		Model_NZBZ.myRank = myRank;
		if (result == 1) {
			let arr = [];
			for (let i = 0, len = data.readShort(); i < len; i++) {
				let type = data.readInt();
				let itemId = data.readInt();
				let count = data.readInt();
				let vo: IGridImpl;
				if (type == Enum_Attr.ITEM) {
					vo = VoItem.create(itemId);
				} else {
					vo = Vo_Currency.create(type);
				}
				vo.count = count;
				arr.push(vo);
			}
			ViewCommonWin.show(arr, 10000);
		} else {
			if (GGlobal.sceneType == SceneCtrl.NANZHENG_BEIZHAN) {
				ViewBattleFault.show(10000);
			}
		}
		GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
	}

	/**1580 请求挑战结果 B:0：失败，1：成功L:被挑战者IdB:战斗结果：0：失败，1：成功，2：前端判断I:剩余挑战次数I:冷却时间 B:是否机器人 0：否，1：是 */
	public GC_NZBZ_BATTLE(self: Model_NZBZ, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id = data.readLong();
			let battleRet = data.readByte();
			let battleNum = data.readInt();
			let coolTime = data.readInt();
			let robot = data.readByte();
			Model_NZBZ.battleRet = battleRet + 1;
			if (Model_NZBZ.battleRet > 2) {
				Model_NZBZ.battleRet = 0;
			}
			Model_NZBZ.battleNum = battleNum;
			Model_NZBZ.coolTime = coolTime;
			Model_NZBZ.battleID = id;
			Model_NZBZ.isRobot = robot;
			if (robot > 0) {
				GGlobal.mapscene.enterScene(SceneCtrl.NANZHENG_BEIZHAN);
			} else {
				let battleVo = GGlobal.modelPlayer.playerDetailDic[id];
				if (battleVo) {
					GGlobal.mapscene.enterScene(SceneCtrl.NANZHENG_BEIZHAN);
				} else {
					GGlobal.control.listen(Enum_MsgType.MSG_ADDROLEDETAIL, self.enterBattle, self);
				}
			}
		}
	}

	public enterBattle(): void {
		let battleVo = GGlobal.modelPlayer.playerDetailDic[Model_NZBZ.battleID];
		if (battleVo) {
			GGlobal.mapscene.enterScene(SceneCtrl.NANZHENG_BEIZHAN);
			GGlobal.control.remove(Enum_MsgType.MSG_ADDROLEDETAIL, this.enterBattle, this);
		}
	}

	/**1578 购买结果返回 B:0：失败，1：成功I:失败：错误码，成功：剩余挑战次数I:剩余购买次数I:冷却时间  */
	public GC_NZBZ_BUY_BATTLENUM(self: Model_NZBZ, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			Model_NZBZ.battleNum = data.readInt();
			Model_NZBZ.buyNum = data.readInt();
			Model_NZBZ.coolTime = data.readInt();
			GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
		}
	}

	/**1576 返回国家排行 [B:排名B:国家I:积分]国家排行U:君主名称  */
	public GC_GET_NZBZ_COUNTRYRANK(self: Model_NZBZ, data: BaseBytes): void {
		Model_NZBZ.countryRankArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let rank = data.readByte();
			let country = data.readByte();
			let jifen = data.readInt();
			Model_NZBZ.countryRankArr[rank - 1] = [country, jifen];
		}
		let kingName = data.readUTF();
		Model_NZBZ.kingName = kingName;
		GGlobal.control.notify(Enum_MsgType.NZBZ_RANK_UPDATE);
	}

	/***1574 返回个人排行 I:自身排名I:积分[I:排名U:玩家名称B:国家I:积分]排行数据  */
	public GC_GET_NZBZ_RANK(self: Model_NZBZ, data: BaseBytes): void {
		let myRank = data.readInt();
		let myJiFen = data.readInt();
		Model_NZBZ.rankArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let rank = data.readInt();
			let roleName = data.readUTF();
			let country = data.readByte();
			let jifen = data.readInt();
			if (!Model_NZBZ.rankArr[rank - 1]) Model_NZBZ.rankArr[rank - 1] = [];
			Model_NZBZ.rankArr[rank - 1] = [rank, roleName, country, jifen];
		}
		Model_NZBZ.myRank = myRank;
		Model_NZBZ.myJiFen = myJiFen;
		GGlobal.control.notify(Enum_MsgType.NZBZ_RANK_UPDATE);
	}

	public static isFirstOpen: boolean = false;
	/**1572 南征北战界面信息 I:官衔I:个人排名B:国家排名I:个人积分I:剩余挑战次数I:剩余购买次数I:冷却时间
	 * [[L:玩家idU:玩家名称I:职业I:等级I:头像I:头像框B:国家I:官衔L:战力I:积分奖励常数idI:声望、功勋奖励常数id]挑战对手数据[I:已领奖励的积分项]已领取积分奖励数据  */
	public GC_OPEN_NZBZ(self: Model_NZBZ, data: BaseBytes): void {
		Model_NZBZ.isFirstOpen = true;
		let guanzhi = data.readInt();
		let myRank = data.readInt();
		let countryRank = data.readByte();
		let myJiFen = data.readInt();
		let battleNum = data.readInt();
		let buyNum = data.readInt();
		let coolTime = data.readInt();
		GGlobal.modelguanxian.guanzhi = guanzhi;
		Model_NZBZ.myRank = myRank;
		Model_NZBZ.countryRank = countryRank;
		Model_NZBZ.myJiFen = myJiFen;
		Model_NZBZ.battleNum = battleNum;
		Model_NZBZ.buyNum = buyNum;
		Model_NZBZ.coolTime = coolTime;
		Model_NZBZ.enemyArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let id = data.readLong();
			let name = data.readUTF();
			let job = data.readInt();
			let level = data.readInt();
			let headId = data.readInt();
			let framePic = data.readInt();
			let country = data.readByte();
			let guanzhi0 = data.readInt();
			let power = data.readLong();
			let jifenId = data.readInt();
			let constId = data.readInt();
			let vo: Vo_NZBZ = new Vo_NZBZ();
			vo.id = id;
			vo.name = name;
			vo.job = job;
			vo.level = level;
			vo.headId = headId;
			vo.framePic = framePic;
			vo.country = country;
			vo.guanzhi = guanzhi0;
			vo.power = power;
			vo.jifenId = jifenId;
			vo.constId = constId;
			Model_NZBZ.enemyArr.push(vo);
		}
		Model_NZBZ.drawArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			Model_NZBZ.drawArr.push(data.readInt());
		}
		Model_NZBZ.jifenArr.sort(Model_NZBZ.sortJiFen);
		GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
	}


	public static addHandler(): void {
		if (Model_NZBZ.buyNum <= 0) {
			ViewCommonWarn.text("已达购买上限");
			return;
		}
		var cost = 100
		ViewAlertBuy.show(cost, Model_NZBZ.buyNum, Model_NZBZ.buyNum, "", Handler.create(this, Model_NZBZ.okHandle));
	}

	public static okHandle(count): void {
		if (Model_player.voMine.yuanbao < 100 * count) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		GGlobal.modelnzbz.CG_NZBZ_BUY_BATTLENUM(count);
	}
}