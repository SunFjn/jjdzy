class Model_SGZS extends BaseModel {
	public static myRank: number;
	/**历史最高排名 */
	public static lastRank: number;
	/**历史最高排名 元宝奖励*/
	public static lastMoney: number;
	/**挑战次数 */
	public static battleNum: number = 0;
	/**挑战次数恢复时间 */
	public static coolTime: number;
	/**剩余购买次数 */
	public static buyNum: number;
	/**角色数组 */
	public static roleVoArr: Array<Vo_SGZS> = [];
	/**角色ID */
	public static battleId: number;
	/**机器人id*/
	public static robotId: number;
	/**战斗结果 */
	public static battleRet: number;
	/**战斗胜利奖励 */
	public static battleRewardArr: Array<IGridImpl> = [];
	public static buyShopArr: Array<any> = [];
	private static _shopArr: Array<Iwarstore_222> = [];
	public static get shopArr() {
		if (Model_SGZS._shopArr.length <= 0) {
			for (let key in Config.warstore_222) {
				let cfg = Config.warstore_222[key];
				Model_SGZS._shopArr[parseInt(key) - 1] = cfg;
			}
		}
		return Model_SGZS._shopArr;
	}
	//三国战神挑战令
	public static ITEM_ID = 416017

	/**1401  打开三国战神界面  */
	public CG_OPEN_SANGUO_ZHANSHEN(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1401, ba);
	}

	/**1403 购买挑战次数    */
	public CG_BUYNUM_SANGUO_ZHANSHEN(count: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(count);
		this.sendSocket(1403, ba);
	}
	/**1405  刷新对手   */
	public CG_RESENEMY_SANGUO_ZHANSHEN(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1405, ba);
	}

	/**1407 挑战 L:被挑战玩家IdI:排名  */
	public CG_BATTLE_SANGUO_ZHANSHEN(id: number, rank: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		ba.writeInt(rank);
		this.sendSocket(1407, ba);
	}

	/**1409 挑战战斗结果 B:0：失败，1：胜利  2退出 */
	public CG_BATTLE_RESULT_SANGUO_ZHANSHEN(type: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(1409, ba);
	}

	/**1411 扫荡 L:被扫荡玩家  */
	public CG_SANGUO_ZHANSHEN_SAODANG(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(1411, ba);
	}

	/**1413	打开宝藏界面  */
	public CG_SANGUO_ZHANSHEN_OPEN_BZ(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1413, ba);
	}

	/**1415	购买商品 I:商品id  */
	public CG_SANGUO_ZHANSHEN_BUY_BZ(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(1415, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(1402, this.GC_OPEN_SANGUO_ZHANSHEN, this);
		wsm.regHand(1404, this.GC_BUYNUM_SANGUO_ZHANSHEN, this);
		wsm.regHand(1406, this.GC_RESENEMY_SANGUO_ZHANSHEN, this);
		wsm.regHand(1408, this.GC_BATTLE_SANGUO_ZHANSHEN, this);
		wsm.regHand(1410, this.GC_BATTLE_RESULT_SANGUO_ZHANSHEN, this);
		wsm.regHand(1412, this.GC_SANGUO_ZHANSHEN_SAODANG, this);
		wsm.regHand(1414, this.GC_SANGUO_ZHANSHEN_OPEN_BZ, this);
		wsm.regHand(1416, this.GC_SANGUO_ZHANSHEN_BUY_BZ, this);
	}

	/**1416	购买结果 B:结果：0：失败，1：成功I:失败：错误码，成功：商品id */
	public GC_SANGUO_ZHANSHEN_BUY_BZ(self: Model_SGZS, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			Model_SGZS.buyShopArr.push(data.readInt());
			Model_SGZS.shopArr.sort(self.sortShop);
			GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_SHOP);
		}
	}

	public static isFirstOpenBZ: boolean = false;
	/**1414	宝藏数据返回 [I:已购买的id]已购买商品数据 */
	public GC_SANGUO_ZHANSHEN_OPEN_BZ(self: Model_SGZS, data: BaseBytes): void {
		Model_SGZS.buyShopArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let goodsId = data.readInt();
			Model_SGZS.buyShopArr.push(goodsId);
		}
		Model_SGZS.isFirstOpenBZ = true;
		Model_SGZS.shopArr.sort(self.sortShop);
		GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_SHOP)
	}

	public sortShop(a: Iwarstore_222, b: Iwarstore_222) {
		if ((Model_SGZS.buyShopArr.indexOf(a.id) != -1 && Model_SGZS.buyShopArr.indexOf(b.id) != -1) ||
			(Model_SGZS.buyShopArr.indexOf(a.id) == -1 && Model_SGZS.buyShopArr.indexOf(b.id) == -1)) {
			return a.id - b.id;
		} else {
			if (Model_SGZS.buyShopArr.indexOf(a.id) != -1) {
				return 1;
			} else {
				return -1;
			}
		}
	}

	/**1412 扫荡结果 B:0：失败，1：成功I:失败：错误码（1:不能扫荡自己，2：没有挑战次数，3：只能扫荡排行低于自己的），成功：剩余挑战次数I:冷却时间  */
	public GC_SANGUO_ZHANSHEN_SAODANG(self: Model_SGZS, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			Model_SGZS.battleNum = data.readInt();
			Model_SGZS.coolTime = data.readInt();
			GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_UPDATE);
			GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_TIME);
		}
	}

	/**1410 挑战结算结果 B:0：失败，1：成功I:当前排名[B:类型I:道具idI:数量]排名晋级奖励  */
	public GC_BATTLE_RESULT_SANGUO_ZHANSHEN(self: Model_SGZS, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			Model_SGZS.battleRewardArr = [];
			let rank = data.readInt();
			for (let i = 0, len = data.readShort(); i < len; i++) {
				let type = data.readByte();
				let itemId = data.readInt();
				let count = data.readInt();
				Model_SGZS.lastMoney = count;
			}
			Model_SGZS.myRank = rank;
			let cfg;
			let rewardArr
			for (let key in Config.warreward_222) {
				cfg = Config.warreward_222[key];
				let arr = JSON.parse(cfg.rank);
				if (arr[0][0] <= rank && arr[0][1] >= rank) {
					rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward3));
					break;
				}
			}
			ViewCommonWin.show(rewardArr, 10000, self, "退出", self.exitSanGuo);
		} else {
			if (GGlobal.sceneType == SceneCtrl.SANGUO_ZHANSHEN) {
				ViewBattleFault.show(10000);
			}
		}
	}

	public exitSanGuo() {
		if (Model_SGZS.myRank < Model_SGZS.lastRank || Model_SGZS.lastRank == 0) {
			Model_SGZS.lastRank = Model_SGZS.myRank;
			GGlobal.layerMgr.open(UIConst.SANGUO_ZHANSHEN_RANK_REWARD);
		}
		GGlobal.modelScene.returnMainScene();
	}

	/**1408 请求挑战结果 B:0：失败， 1：成功L:失败：错误码（1：前10才能挑战前3，2：没有挑战次数，3：对方在战斗中暂时不可挑战，4：自身被挑战中不可挑战，5：排行变化刷新），
	 * 成功：被挑战玩家IDI:机器人idI:剩余挑战次数I:冷却时间B:战斗结果0：失败，1：成功，2：前端判定  */
	public GC_BATTLE_SANGUO_ZHANSHEN(self: Model_SGZS, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			Model_SGZS.battleId = data.readLong();
			Model_SGZS.robotId = data.readInt();
			Model_SGZS.battleNum = data.readInt();
			Model_SGZS.coolTime = data.readInt();
			let battleRet = data.readByte();
			Model_SGZS.battleRet = battleRet + 1;
			if (Model_SGZS.battleRet > 2) Model_SGZS.battleRet = 0;
			if (Model_SGZS.robotId > 0) {
				GGlobal.mapscene.enterScene(SceneCtrl.SANGUO_ZHANSHEN);
			} else {
				let battleVo = GGlobal.modelPlayer.playerDetailDic[Model_SGZS.battleId];
				if (battleVo) {
					GGlobal.mapscene.enterScene(SceneCtrl.SANGUO_ZHANSHEN);
				} else {
					GGlobal.control.listen(Enum_MsgType.MSG_ADDROLEDETAIL, self.enterBattle, self);
				}
			}
			GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_UPDATE);
			GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_TIME);
		} else if (result == 0) {
			let ret = data.readLong();
			let arr = ["", "前10才能挑战前3", "没有挑战次数", "对方正在战斗中", "正在被挑战", "对方排名变化"];
			ViewCommonWarn.text(arr[ret]);
		}
	}

	public enterBattle(): void {
		let battleVo = GGlobal.modelPlayer.playerDetailDic[Model_NZBZ.battleID];
		if (battleVo) {
			GGlobal.mapscene.enterScene(SceneCtrl.SANGUO_ZHANSHEN);
			GGlobal.control.remove(Enum_MsgType.MSG_ADDROLEDETAIL, this.enterBattle, this);
		}
	}

	/**1406 刷新对手 [I:排名L:玩家idU:玩家名字I:职业L:战力]对手数据 */
	public GC_RESENEMY_SANGUO_ZHANSHEN(self: Model_SGZS, data: BaseBytes): void {
		Model_SGZS.roleVoArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let rank = data.readInt();
			let roleId = data.readLong();
			let roleName = data.readUTF();
			let job = data.readInt();
			let godWeapon = data.readInt();
			let headId = data.readInt();
			let frameId = data.readInt();
			let power = data.readLong();
			let horseId = data.readInt();
			let vo: Vo_SGZS = new Vo_SGZS();
			vo.rank = rank;
			vo.roleId = roleId;
			vo.name = roleName;
			vo.job = job;
			vo.godWeapon = godWeapon;
			vo.headId = headId;
			vo.frameId = frameId;
			vo.power = power;
			vo.horseId = horseId;
			Model_SGZS.roleVoArr.push(vo);
		}
		Model_SGZS.roleVoArr.sort(self.sortByRank);
		GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_UPDATE);
	}

	/**1404 购买结果返回 B:0：失败，1：成功I:失败：错误码（1：积累挑战次数满，2：达今日购买上限，3：元宝不足），成功：剩余挑战次数I:剩余冷却时间I:剩余购买次数 */
	public GC_BUYNUM_SANGUO_ZHANSHEN(self: Model_SGZS, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			Model_SGZS.battleNum = data.readInt();
			Model_SGZS.coolTime = data.readInt();
			Model_SGZS.buyNum = data.readInt();
			GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_TIME);
		}
	}

	public static isFirstOpen: boolean = false;
	/**1402 界面数据返回 [I:排名I:robltIdL:玩家idU:玩家名字I:职业I:头像I:头像框L:战力]对手数据I:我的排名I:最高排名I:剩余挑战次数I:剩余冷却时间I:剩余购买挑战次数  */
	public GC_OPEN_SANGUO_ZHANSHEN(self: Model_SGZS, data: BaseBytes): void {
		Model_SGZS.roleVoArr = [];
		Model_SGZS.isFirstOpen = true;
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let rank = data.readInt();
			let robotID = data.readInt();
			let roleId = data.readLong();
			let roleName = data.readUTF();
			let job = data.readInt();
			let godWeapon = data.readInt();
			let headId = data.readInt();
			let frameId = data.readInt();
			let power = data.readLong();
			let horseId = data.readInt();
			let vo: Vo_SGZS = new Vo_SGZS();
			vo.rank = rank;
			vo.robotID = robotID;
			vo.roleId = roleId;
			vo.name = roleName;
			vo.job = job;
			vo.godWeapon = godWeapon;
			vo.headId = headId;
			vo.frameId = frameId;
			vo.power = power;
			vo.horseId = horseId;
			Model_SGZS.roleVoArr.push(vo);
		}
		Model_SGZS.roleVoArr.sort(self.sortByRank);
		Model_SGZS.myRank = data.readInt();
		Model_SGZS.lastRank = data.readInt();
		Model_SGZS.battleNum = data.readInt();
		Model_SGZS.coolTime = data.readInt();
		Model_SGZS.buyNum = data.readInt();
		GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_UPDATE);
		GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_TIME);
	}

	public sortByRank(a: Vo_SGZS, b: Vo_SGZS): number {
		return a.rank - b.rank;
	}
}