class Model_GCBZ extends BaseModel {
	public curID = 0;
	/**当前城池是否通关 0没有 1通关 */
	public state = 0;
	public times = 0;
	public rewardNum = 0;
	public cityData: { [pos: number]: Vo_GCBZ[][] };
	public numData: Igcbzcs[] = [];
	/** 难度(可选择<=该值)*/
	public diffState = 0;
	/**今天是否已选择难度 0没有 1已选 */
	public selDiff = 0;
	/**战斗结果 */
	public battleResult = 0;
	/**剩余重置次数 */
	public resetNum = 0;
	/**已购买重置次数 */
	public buyNum = 0;
	public difArr = ["", "普通", "困难"];
	public zhuShouID = 0;
	public numMax = 4;
	public shopData: { cfg: Igcbk_777, buyNum: number }[] = [];
	/**U:玩家名字B:状态 1战胜 2战败I:城池id */
	public battleReportData: { name: string, state: number, cityID: number }[] = []
	public isTimeIn() {
		const date = new Date(Model_GlobalMsg.getServerTime());
		const beginDate = new Date(Model_GlobalMsg.getServerTime());
		beginDate.setHours(23, 50, 0);
		const endDate = new Date(Model_GlobalMsg.getServerTime());
		endDate.setHours(24, 0, 0);
		const beginDate1 = new Date(Model_GlobalMsg.getServerTime());
		beginDate1.setHours(0, 0, 0);
		const endDate1 = new Date(Model_GlobalMsg.getServerTime());
		endDate1.setHours(0, 5, 0);
		if ((date.getTime() >= beginDate.getTime() && date.getTime() <= endDate.getTime()) ||
			(date.getTime() >= beginDate1.getTime() && date.getTime() <= endDate1.getTime())) {
			return true;
		} else {
			return false;
		}
	}

	public initData() {
		let self = this;
		self.cityData = {};
		for (let key in Config.gcbz_777) {
			let vo = Vo_GCBZ.create(Number(key));
			let index = vo.cfg.tgs % 1000 - 1;
			if (!self.cityData[vo.cfg.nd]) self.cityData[vo.cfg.nd] = [];
			if (!self.cityData[vo.cfg.nd][Math.floor(index / self.numMax)]) self.cityData[vo.cfg.nd][Math.floor(index / self.numMax)] = []
			self.cityData[vo.cfg.nd][Math.floor(index / self.numMax)][index % self.numMax] = vo;
		}

		if (self.numData.length <= 0) {
			self.numData = [];
			for (let key in Config.gcbzcs) {
				self.numData[Number(key) - 1] = Config.gcbzcs[key];
			}
		}
	}
	/** 注册 WEBSOCKET HANLDER 函数*/
	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		self.socket = mgr;
		//注册GC方法
		mgr.regHand(12052, self.GC_AttackCity_openUI_12052, self);
		mgr.regHand(12054, self.GC_AttackCity_dispatch_12054, self);
		mgr.regHand(12056, self.GC_AttackCity_getAward_12056, self);
		mgr.regHand(12058, self.GC_AttackCity_plunder_12058, self);
		mgr.regHand(12060, self.GC_AttackCity_battleResult_12060, self);
		mgr.regHand(12062, self.GC_AttackCity_attackNPC_12062, self);
		mgr.regHand(12066, self.GC_AttackCity_openShopUI_12066, self);
		mgr.regHand(12068, self.GC_AttackCity_buyItem_12068, self);
		mgr.regHand(12070, self.GC_AttackCity_openReportUI_12070, self);
		mgr.regHand(12072, self.GC_AttackCity_again_12072, self);
		mgr.regHand(12074, self.GC_AttackCity_buyTimes_12074, self);
		mgr.regHand(12076, self.GC_AttackCity_move_12076, self);
		mgr.regHand(12078, self.GC_AttackCity_choose_12078, self);
		mgr.regHand(12080, self.GC_GCBZ_STATE_PROMPT_12080, self);
		mgr.regHand(12082, self.GC_GCBZ_LOOKBOX_12082, self);
	}

	/**12082 查看宝箱奖励返回 I:宝箱累计奖励  */
	public GC_GCBZ_LOOKBOX_12082(self: Model_GCBZ, data: BaseBytes): void {
		self.rewardNum = data.readInt();
		GGlobal.control.notify(Enum_MsgType.GCBZ_REWARD_SHOW);
	}

	/**12081  查看宝箱奖励   */
	public CG_GCBZ_LOOKBOX() {
		var bates = this.getBytes();
		this.sendSocket(12081, bates);
	}

	/**12080 推送状态 B:状态 1物资已满 2被打提示B:提示 0没有 1有提示  */
	public GC_GCBZ_STATE_PROMPT_12080(self: Model_GCBZ, data: BaseBytes): void {
		let state = data.readByte();
		let arg2 = data.readByte();
		if (arg2 == 1) {
			GGlobal.mainUICtr.addReportBTN(state == 1 ? UIConst.GCBZ_CITYDATA : UIConst.GCBZ_SHOP);
		}
	}

	/**12051  打开界面 */
	public CG_AttackCity_openUI_12051(): void {
		var bates = this.getBytes();
		this.sendSocket(12051, bates);
	}

	/**12052 打开界面返回 I:当前所在城池idI:驻守的城池idI:剩余可领取奖励时间I:累积奖励B:当前城池是否通关 0没有 1通关
	 * [I:城池idL:玩家idU:玩家名字L:玩家战力I:头像idI:头像框idI:玩家占领城池的时间戳]城池信息I:难度(可选择<=该值)
	 * B:今天是否已选择难度 0没有 1已选I:剩余重置次数I:已购买次数*/
	public GC_AttackCity_openUI_12052(self: Model_GCBZ, data: BaseBytes): void {
		self.initData();
		self.curID = data.readInt();
		self.zhuShouID = data.readInt();
		self.times = data.readInt();
		self.rewardNum = data.readInt();
		self.state = data.readByte();
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let arg5 = data.readInt();
			let cfg = Config.gcbz_777[arg5];
			let index = cfg.tgs % 1000 - 1;
			let vo = self.cityData[cfg.nd][Math.floor(index / self.numMax)][index % self.numMax];
			vo.id = data.readLong();
			vo.name = data.readUTF();
			vo.power = data.readLong();
			vo.headID = data.readInt();
			vo.frameID = data.readInt();
			vo.times = data.readInt();
		}
		self.diffState = data.readInt();
		self.selDiff = data.readByte();
		self.resetNum = data.readInt();
		self.buyNum = data.readInt();
		GGlobal.control.notify(UIConst.GCBZ);
		GGlobal.control.notify(Enum_MsgType.GCBZ_OPEN);
	}

	/**12053 I 驻守 I:城池idcityId*/
	public CG_AttackCity_dispatch_12053(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(12053, bates);
	}

	/**12054 B 驻守返回 B:状态 0成功 1没到驻守时间 2先通关本关卡 3已被其他玩家抢先驻守 4城池不存在 5今日驻守时间已达上限state*/
	public GC_AttackCity_dispatch_12054(self: Model_GCBZ, data: BaseBytes): void {
		let result = data.readByte();
		let arr = ["驻守成功", "没到驻守时间", "先通关本关卡", "已被其他玩家抢先驻守", "城池不存在", "今日驻守时间已达上限", "驻守奖励已达上限，请及时领取"];
		ViewCommonWarn.text(arr[result]);
	}

	/**12055  领取奖励 */
	public CG_AttackCity_getAward_12055(): void {
		var bates = this.getBytes();
		this.sendSocket(12055, bates);
	}

	/**12056 B 领取奖励返回 B:状态 0成功 1数据不存在 2驻守时间不足领取奖励 3城池不存在state*/
	public GC_AttackCity_getAward_12056(self: Model_GCBZ, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			self.rewardNum = 0;
			GGlobal.control.notify(UIConst.GCBZ);
		}
	}

	/**12057 I 挑战城池(玩家) I:城池idcityId*/
	public CG_AttackCity_plunder_12057(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(12057, bates);
	}

	/**12058挑战城池(玩家)返回 B:状态 0成功 1数据不存在 2先通关本关卡 3城池没有人驻守L:挑战的玩家idI:城池id*/
	public GC_AttackCity_plunder_12058(self: Model_GCBZ, data: BaseBytes): void {
		let result = data.readByte();
		let arg2 = data.readLong();
		let arg3 = data.readInt();
		if (result == 0) {
			let battleVo = GGlobal.modelPlayer.playerDetailDic[arg2];
			if (battleVo) {
				let cfg = Config.gcbz_777[arg3];
				let vo = Vo_battle.create([Model_player.voMine], [battleVo]);
				vo.mapID = cfg.dt;
				vo.sysID = vo.backID = UIConst.GCBZ;
				Model_battle.battleVo = vo;
				GGlobal.control.notify(UIConst.GCBZ);
				GGlobal.mapscene.enterScene(SceneCtrl.CLIENT_BATTLE);
			}
		} else if (result == 3) {
			ViewCommonWarn.text("城池没有人驻守");
		}
	}

	/**12059 B 挑战玩家结果 B:战斗结果 0失败 1成功 2退出state*/
	public CG_AttackCity_battleResult_12059(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(12059, bates);
	}

	/**12060 B-I 挑战玩家结果返回 B:战斗结果 0失败 1成功 2退出stateI:城池idcityId*/
	public GC_AttackCity_battleResult_12060(self: Model_GCBZ, data: BaseBytes): void {
		let result = data.readByte();
		let cityID = data.readInt();
		if (result == 1) {
			let vomine = Model_player.voMine;
			let cfg = Config.gcbz_777[cityID];
			let index = cfg.tgs % 1000 - 1;
			let vo = self.cityData[cfg.nd][Math.floor(index / self.numMax)][index % self.numMax];
			vo.id = vomine.id;
			vo.name = vomine.name;
			vo.headID = Model_Setting.headId;
			vo.frameID = Model_Setting.frameId;
			vo.power = vomine.str;
			vo.times = Math.floor(Model_GlobalMsg.getServerTime() / 1000);
			GGlobal.control.notify(UIConst.GCBZ);
			ViewCommonWin.show(null);
		} else if (result == 3) {
			ViewCommonWin.show(null);
			ViewCommonWarn.text("该城池已被其他玩家抢先入驻");
		} else {
			GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);
			ViewCommonFail.show();
		}
	}

	private failHandler() {
		let self = this;
		GGlobal.modelScene.returnMainScene()
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);;
	}

	/**12061 I 挑战NPC I:城池idcityId*/
	public CG_AttackCity_attackNPC_12061(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(12061, bates);
	}

	/**12063  挑战NPC胜利申请奖励 */
	public CG_AttackCity_battleNPCResult_12063(): void {
		let self = this;
		let cfg = Config.gcbz_777;
		var bates = this.getBytes();
		self.state = 1;
		if (cfg[self.curID].xyg != 0 && cfg[self.curID].nd != cfg[cfg[self.curID].xyg].nd) {
			self.diffState = cfg[cfg[self.curID].xyg].nd;
		}
		self.sendSocket(12063, bates);
		GGlobal.control.notify(UIConst.GCBZ);
	}

	/**12062 B-I-B 挑战NPC返回 B:状态 0可以挑战 1不可以挑战stateI:城池idcityIdB:战力验证状态 0失败 1成功 2由前端结果决定result*/
	public GC_AttackCity_attackNPC_12062(self: Model_GCBZ, data: BaseBytes): void {
		let result = data.readByte();
		let cityID = data.readInt();
		self.battleResult = data.readByte();
		if (result == 0) {
			let cfg = Config.gcbz_777[cityID]
			let battleVo = Vo_battle.create([Model_player.voMine], null, cfg.boss);
			battleVo.mapID = cfg.dt;
			battleVo.backID = battleVo.sysID = UIConst.GCBZ;
			Model_battle.battleVo = battleVo;
			GGlobal.mapscene.enterScene(SceneCtrl.CLIENT_BATTLE);
		}
	}

	/**12065  打开商店 */
	public CG_AttackCity_openShopUI_12065(): void {
		var bates = this.getBytes();
		this.sendSocket(12065, bates);
	}

	/**12066 [I-I]-L 打开商店返回 [I:商品idI:已购买次数]商店信息shopInfoL:物资货币material*/
	public GC_AttackCity_openShopUI_12066(self: Model_GCBZ, data: BaseBytes): void {
		self.shopData = [];
		var len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id = data.readInt();
			let buyNum = data.readInt();
			let cfg = Config.gcbk_777[id];
			self.shopData.push({ cfg: cfg, buyNum: buyNum });
		}
		GGlobal.control.notify(UIConst.GCBZ_SHOP);
	}

	/**12067 I 购买商品 I:商品idid*/
	public CG_AttackCity_buyItem_12067(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(12067, bates);
	}

	/**12068 购买商品返回 B:状态 0成功 1商品配置不存在 2超过限购 3货币不足I:商品idI:物资个数*/
	public GC_AttackCity_buyItem_12068(self: Model_GCBZ, data: BaseBytes): void {
		let result = data.readByte();
		let arg2 = data.readInt();
		let arg3 = data.readInt();
		if (result == 0) {
			for (let i = 0; i < self.shopData.length; i++) {
				if (self.shopData[i].cfg.id == arg2) {
					self.shopData[i].buyNum++;
					break;
				}
			}
			GGlobal.control.notify(UIConst.GCBZ_SHOP);
		}
	}

	/**12069  打开战报 */
	public CG_AttackCity_openReportUI_12069(): void {
		var bates = this.getBytes();
		this.sendSocket(12069, bates);
	}

	/**12070 [U-B-I] 打开战报返回 [U:玩家名字B:状态 1战胜 2战败I:城池id]战报信息reportInfo*/
	public GC_AttackCity_openReportUI_12070(self: Model_GCBZ, data: BaseBytes): void {
		self.battleReportData = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let arg1 = data.readUTF();
			let arg2 = data.readByte();
			let arg3 = data.readInt();
			self.battleReportData.push({ name: arg1, state: arg2, cityID: arg3 });
		}
		GGlobal.control.notify(UIConst.GCBZ_BATTLEREPORT);
	}

	/**12071  重置挑战关卡 */
	public CG_AttackCity_again_12071(): void {
		var bates = this.getBytes();
		this.sendSocket(12071, bates);
	}

	/**12072 B-I 重置挑战关卡返回 B:状态 0成功 1重置次数不足stateI:城池idcityId*/
	public GC_AttackCity_again_12072(self: Model_GCBZ, data: BaseBytes): void {
		let result = data.readByte();
		let arg2 = data.readInt();
		if (result == 0) {
			self.curID = arg2;
			self.state = 0;
			GGlobal.control.notify(UIConst.GCBZ);
			GGlobal.control.notify(Enum_MsgType.GCBZ_RESET);
		}
	}

	/**12073 购买次数 I:购买次  */
	public CG_AttackCity_buyTimes_12073(num): void {
		var bates = this.getBytes();
		bates.writeInt(num);
		this.sendSocket(12073, bates);
	}

	/**12074 B-I-I 购买次数返回 B:状态 0成功 1已达到最大购买次数 2元宝不足stateI:已购买次数numI:可挑战次数times*/
	public GC_AttackCity_buyTimes_12074(self: Model_GCBZ, data: BaseBytes): void {
		let result = data.readByte();
		let arg2 = data.readInt();
		let arg3 = data.readInt();
		if (result == 0) {
			self.buyNum = arg2;
			self.resetNum = arg3;
			GGlobal.control.notify(UIConst.GCBZ);
		}
	}

	/**12075 I 移动到下一关 I:移动到的城池idcid*/
	public CG_AttackCity_move_12075(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(12075, bates);
	}

	/**12076 B-I 移动到下一关返回 B:状态 0成功 1没有通关之前的关卡 2第二天才可以移动stateI:城池idcityId*/
	public GC_AttackCity_move_12076(self: Model_GCBZ, data: BaseBytes): void {
		let result = data.readByte();
		let arg2 = data.readInt();
		if (result == 0) {
			self.curID = arg2;
			GGlobal.control.notify(Enum_MsgType.GCBZ_MOVE);
		} else if (result == 1) {
			ViewCommonWarn.text("没有通关之前的关卡");
		}
	}

	/**12077 I-I 每日选择的难度 I:选择的难度ndI:初始城池idcityId*/
	public CG_AttackCity_choose_12077(arg1, arg2): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		bates.writeInt(arg2);
		this.sendSocket(12077, bates);
	}

	/**12078 B-I-I 选择难度返回 B:状态 0成功 1未开启该难度stateI:难度ndI:城池idcityId*/
	public GC_AttackCity_choose_12078(self: Model_GCBZ, data: BaseBytes): void {
		let result = data.readByte();
		let arg2 = data.readInt();
		let arg3 = data.readInt();
		if (result == 0) {
			self.diffState = arg2;
			self.curID = arg3;
			GGlobal.control.notify(UIConst.GCBZ);
		}
	}
}