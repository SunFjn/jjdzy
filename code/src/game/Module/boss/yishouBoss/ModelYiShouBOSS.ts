/**
 * ModelYiShouBOSS
 * 异兽BOSS
 */
class ModelYiShouBOSS extends BaseModel {
	currentlayer = 0;
	/*已通关最高关卡*/crossLayer = 0;
	completeLayer = 0;
	remaindCount = 0;
	nextAddTime = 0;
	FirstKiller;
	rankdata;
	myRank = -1;
	revivewTime = 0;
	firstKiler_head = 0;
	firstKiler_Grid = 0;
	hasBuyCount = 0;

	checkNotice = () => {
		let count = this.remaindCount;
		let itemcount = Model_Bag.getItemCount(410403);
		GGlobal.reddot.setCondition(UIConst.YSBOSS, 0, Boolean(count || itemcount));
		GGlobal.reddot.notifyMsg(UIConst.BOSS);
	}

	private static _max = 0;
	static geMax_buy = () => {
		if (ModelYiShouBOSS._max == 0) {
			let cfg = Config.yscs_759;
			for (let i in cfg) {
				ModelYiShouBOSS._max++;
			}
		}
		return ModelYiShouBOSS._max;
	}

	//协议处理
	listenServ(mgr: WebSocketMgr) {
		let self = this;
		self.socket = mgr;
		mgr.regHand(9432, self.GC_SpecialAnimalBoss_openUI_9432, self);
		mgr.regHand(9434, self.GC_SpecialAnimalBoss_challengeBoss_9434, self);
		mgr.regHand(9436, self.GC_SpecialAnimalBoss_fightEnd_9436, self);
		mgr.regHand(9438, self.GC_SpecialAnimalBoss_relive_9438, self);
		mgr.regHand(9440, self.GC_SpecialAnimalBoss_getReward_9440, self);
		mgr.regHand(9442, self.GC_SpecialAnimalBoss_getRank_9442, self);
		mgr.regHand(9444, self.GC_SpecialAnimalBoss_update_9444, self);
		mgr.regHand(9446, self.GC_SpecialAnimalBoss_BUY_9446, self);
	}

	/**9431  返回界面信息 */
	CG_SpecialAnimalBoss_openUI_9431 = () => {
		var bates = this.getBytes();
		this.sendSocket(9431, bates);
	}

	/**9432 I-I-I-I-I-U 返回界面信息 I:当前关卡nowGqI:已通关最高关卡passGqI:已领取奖励关卡rewardGqI:剩余挑战次数chaNumI:剩余恢复时间leftTimeU:首通玩家名称name*/
	GC_SpecialAnimalBoss_openUI_9432 = (self: ModelYiShouBOSS, data: BaseBytes) => {
		self.currentlayer = data.readInt();
		self.crossLayer = data.readInt();
		self.completeLayer = data.readInt();
		self.remaindCount = data.readInt();
		self.nextAddTime = data.readInt() * 1000 + Model_GlobalMsg.getServerTime();
		self.FirstKiller = data.readUTF();
		self.firstKiler_head = data.readInt();
		self.firstKiler_Grid = data.readInt();
		self.hasBuyCount = data.readInt();
		self.checkNotice();
		GGlobal.control.notify(UIConst.YSBOSS);
	}

	/**9433  挑战异兽Boss */
	CG_SpecialAnimalBoss_challengeBoss_9433 = () => {
		var bates = this.getBytes();
		this.sendSocket(9433, bates);
	}

	//判断成功I:失败：（1：没有挑战次数，2：未领取通关奖励，3：已通过最高关卡，4：已进入战斗），成功：挑战关卡I:剩余挑战次数I:剩余挑战时间
	/**9434 B-I-I-I 挑战判定返回 B:判断结果：0:判断失败，1判断成功resultI:失败：（1：），成功：挑战关卡nowGqI:剩余挑战次数chaNumI:剩余挑战时间leftTime*/
	GC_SpecialAnimalBoss_challengeBoss_9434 = (self: ModelYiShouBOSS, data: BaseBytes) => {
		let ret = data.readByte();
		let retType = data.readInt();
		if (ret) {
			self.remaindCount = data.readInt();
			self.nextAddTime = data.readInt() * 1000 + Model_GlobalMsg.getServerTime();
			GGlobal.layerMgr.close2(UIConst.BOSS);
			GGlobal.mapscene.enterScene(SceneCtrl.YISHOUBOSS);
		} else {
			if(retType==1){
				self.warn("没有挑战次数");
			}else if(retType==2){
				self.warn("未领取通关奖励");
			}else if(retType==3){
				self.warn("已通过最高关卡");
			}else if(retType==4){
				self.warn("已进入战斗");
			}
		}
	}

	/**9435 B 发送战斗结果请求结算 B:0:失败，1:成功result*/
	CG_SpecialAnimalBoss_fightEnd_9435 = (arg1) => {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(9435, bates);
	}

	/**9436 B-[B-I-I] 结算返回 B:0：失败，1：成功rtnCode[B:道具类型I:道具idI:道具数量]奖励reward*/
	GC_SpecialAnimalBoss_fightEnd_9436 = (self: ModelYiShouBOSS, data: BaseBytes) => {
		let battleRet = data.readByte();
		let awards = ConfigHelp.parseItemListBa(data);
		GGlobal.control.notify(Enum_MsgType.YSBOSS_RESULT, { ret: battleRet, awards: awards });
	}

	/**9437  复活 */
	CG_SpecialAnimalBoss_relive_9437 = () => {
		var bates = this.getBytes();
		this.sendSocket(9437, bates);
	}

	/**9438 B-B 复活结果返回 B:0：失败，1：成功rtnCodeB:失败：（1：元宝不足）type*/
	GC_SpecialAnimalBoss_relive_9438 = (self: ModelYiShouBOSS, data: BaseBytes) => {
		let result = data.readByte();
		let type = data.readByte();
		if (result == 1) {
			GGlobal.control.notify(Enum_MsgType.YSBOSS_REVIVE);
		} else {
			let warnStr = ["复活失败", "元宝不足"][type];
			DEBUGWARING.log("复活失败");
			ViewCommonWarn.text(warnStr);
		}
	}

	/**9439  领取奖励 */
	CG_SpecialAnimalBoss_getReward_9439 = () => {
		var bates = this.getBytes();
		this.sendSocket(9439, bates);
	}

	/**9440 B-I 领取奖励结果 B:0：失败，1：成功rtnCodeI:失败：（1：），成功：当前关卡nowGq*/
	GC_SpecialAnimalBoss_getReward_9440 = (self: ModelYiShouBOSS, data: BaseBytes) => {
		let result = data.readByte();
		let newLayer = data.readInt();
		if (result == 1) {
			self.completeLayer = self.currentlayer;
			self.currentlayer = newLayer;
			ViewCommonWarn.text("领取成功");
			self.CG_SpecialAnimalBoss_openUI_9431();
			GGlobal.control.notify(UIConst.YSBOSS);
		} else {
			ViewCommonWarn.text("领取失败");
		}
	}

	CG_SpecialAnimalBoss_getRank_9441 = () => {
		var bates = this.getBytes();
		this.sendSocket(9441, bates);
	}

	GC_SpecialAnimalBoss_getRank_9442 = (self: ModelYiShouBOSS, data: BaseBytes) => {
		let len = data.readShort();
		self.rankdata = [];
		self.myRank = -1;
		for (let i = 0; i < 10; i++) {
			let name;
			let layer;
			if (i < len) {
				name = data.readUTF();
				layer = data.readInt();
				if (Model_player.isMine(name)) {
					self.myRank = i + 1;
				}
			} else {
				name = null;
				layer = 0;
			}
			self.rankdata[i] = [i + 1, name, layer];
		}
		GGlobal.control.notify(UIConst.YSBOSS);
	}

	GC_SpecialAnimalBoss_update_9444 = (self: ModelYiShouBOSS, data: BaseBytes) => {
		let updateLayer = data.readInt();
		if (updateLayer == self.currentlayer) {
			self.FirstKiller = data.readUTF();
			self.firstKiler_head = data.readInt();
			self.firstKiler_Grid = data.readInt();
			GGlobal.control.notify(UIConst.YSBOSS);
		}
	}

	CG_SpecialAnimalBoss_BUY_9445 = (arg) => {
		var bates = this.getBytes();
		bates.writeInt(arg);
		this.sendSocket(9445, bates);
	}

	GC_SpecialAnimalBoss_BUY_9446 = (self: ModelYiShouBOSS, data: BaseBytes) => {
		let ret = data.readByte();
		if (ret == 1) {
			self.remaindCount = data.readInt();
			self.hasBuyCount = data.readInt();
			GGlobal.control.notify(UIConst.YSBOSS);
		} else {
			ViewCommonWarn.text("购买失败");
		}
	}
}