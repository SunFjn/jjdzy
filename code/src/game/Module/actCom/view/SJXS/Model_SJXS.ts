class Model_SJXS extends BaseModel {
	public endTime: number = 0;
	public drawNum: number = 0;
	public myRank: number = 0;
	public targertData: { id: number, state: number }[];
	public rankDic: { [rank: number]: { name: string, num: number } };
	public rankData: { [qs: number]: Igodrank_288[] };
	public getRankData() {
		let self = this;
		if (!self.rankData) {
			self.rankData = {}
			for (let key in Config.godrank_288) {
				let cfg = Config.godrank_288[key];
				if (!self.rankData[cfg.qs]) self.rankData[cfg.qs] = [];
				self.rankData[cfg.qs].push(cfg);
			}

			for (let key in self.rankData) {
				self.rankData[key].sort(function (a, b) {
					return a.id - b.id;
				})
			}
		}
	}

	public checkNotice() {
		let self = this;
		if (self.targertData) {
			for (let i = 0; i < self.targertData.length; i++) {
				if (self.targertData[i].state == 1) {
					return true;
				}
			}
		}
		return false;
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(9550, this.GC_GodGenThisLife_inform_9550, this);
		mgr.regHand(9552, this.GC_GodGenThisLife_turn_9552, this);
		mgr.regHand(9554, this.GC_GodGenThisLife_openRankUI_9554, this);
		mgr.regHand(9556, this.GC_GodGenThisLife_openTargetAwardUI_9556, this);
		mgr.regHand(9558, this.GC_GodGenThisLife_getTargetAward_9558, this);
	}

	/**9550 I 通知 I:结束时间endTimeI:抽奖次数*/
	public GC_GodGenThisLife_inform_9550(self: Model_SJXS, data: BaseBytes): void {
		self.endTime = data.readInt();
		self.drawNum = data.readInt();
		GGlobal.control.notify(UIConst.SHENJIANG_XIANSHI);
	}

	/**9551 B 抽奖 B:次数1：1次，2：10次type*/
	public CG_GodGenThisLife_turn_9551(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(9551, bates);
	}

	/**9552 B-[B-I-I-B] 抽奖返回 B:状态：1：成功，2：元宝不足state[B:道具类型I:道具IdI:道具数量B:是否大奖，0：不是，1：是]抽奖结果resultListI:抽奖次数*/
	public GC_GodGenThisLife_turn_9552(self: Model_SJXS, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let rewardArr: IGridImpl[] = [];
			let len = data.readShort();
			for (let i = 0; i < len; i++) {
				let vo = ConfigHelp.parseItemBa(data);
				let isBig = data.readByte();
				vo.extra = isBig == 1 ? 5 : 0;
				rewardArr.push(vo);
			}
			self.drawNum = data.readInt();
			if (self.targertData) {
				for (let i = 0; i < self.targertData.length; i++) {
					let cfg = Config.godmb_288[self.targertData[i].id];
					if (self.targertData[i].state == 0 && self.drawNum >= cfg.time) {
						self.targertData[i].state = 1;
					}
				}
			}
			GGlobal.reddot.setCondition(UIConst.SHENJIANG_XIANSHI, 0, self.checkNotice());
			GGlobal.reddot.notifyMsg(UIConst.SHENJIANG_XIANSHI);
			GGlobal.control.notify(Enum_MsgType.SJXS_REWARD, rewardArr);
		}
	}

	/**9553  打开排行榜 */
	public CG_GodGenThisLife_openRankUI_9553(): void {
		var bates = this.getBytes();
		this.sendSocket(9553, bates);
	}

	/**9554 [S-U-I]-S-I 打开排行榜返回 [S:排名U:玩家名I:抽奖次数]排行榜数据rankListS:我的排名  0未进排行榜 myRankI:我的抽奖次数myTimes*/
	public GC_GodGenThisLife_openRankUI_9554(self: Model_SJXS, data: BaseBytes): void {
		self.rankDic = {};
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let rank = data.readShort();
			let name = data.readUTF();
			let num = data.readInt();
			self.rankDic[rank] = { name: name, num: num };
		}
		self.myRank = data.readShort();
		self.drawNum = data.readInt();
		GGlobal.control.notify(UIConst.SHENJIANG_XIANSHI_RANK);
	}

	/**9555  打开目标奖励界面 */
	public CG_GodGenThisLife_openTargetAwardUI_9555(): void {
		var bates = this.getBytes();
		this.sendSocket(9555, bates);
	}

	/**9556 [I-B] 打开目标奖励界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表awardList*/
	public GC_GodGenThisLife_openTargetAwardUI_9556(self: Model_SJXS, data: BaseBytes): void {
		self.targertData = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let cfgID = data.readInt();
			let state = data.readByte();
			self.targertData.push({ id: cfgID, state: state });
		}
		self.targertData.sort(self.sortReward);
		GGlobal.reddot.setCondition(UIConst.SHENJIANG_XIANSHI, 0, self.checkNotice());
		GGlobal.reddot.notifyMsg(UIConst.SHENJIANG_XIANSHI);
		GGlobal.control.notify(UIConst.SHENJIANG_XIANSHI);
	}

	public sortReward(a: { id: number, state: number }, b: { id: number, state: number }) {
		let idA = a.id;
		let idB = b.id;
		if (a.state == 1) idA = a.id - 1000;
		if (b.state == 1) idB = b.id - 1000;
		if (a.state == 0) idA = a.id - 100;
		if (b.state == 0) idB = b.id - 100;
		return idA - idB;
	}

	/**9557 I 领取目标奖励 I:要领取的奖励idawardId*/
	public CG_GodGenThisLife_getTargetAward_9557(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(9557, bates);
	}

	/**9558 B-I 领取目标奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取stateI:领取的奖励idawardId*/
	public GC_GodGenThisLife_getTargetAward_9558(self: Model_SJXS, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let cfgID = data.readInt();
			for (let i = 0; i < self.targertData.length; i++) {
				if (self.targertData[i].id == cfgID) {
					self.targertData[i].state = 2;
					break;
				}
			}
			self.targertData.sort(self.sortReward);
			GGlobal.control.notify(UIConst.SHENJIANG_XIANSHI);
		}
	}
}