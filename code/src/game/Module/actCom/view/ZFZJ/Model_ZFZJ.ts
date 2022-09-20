class Model_ZFZJ extends BaseModel {
	public state = 0;
	public bossLv = 1;
	public lifeTime = 0;
	public curHp = 0;
	public maxHp = 0;
	public times = 0;
	public zuiYi = 0;
	public myHp = 0;
	public myHurt = 0;
	public myRank = 0;
	public myWine = 0;
	public rankData = [];
	public rewardData: { [id: number]: number } = {};
	public wineRankData: { [rank: number]: { id: number, name: string, zuiyi: number } } = {};
	public activityVo: Vo_Activity;
	/**已敬酒次数 */
	public wineDic: { [id: number]: number } = {};
	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(9640, self.GC_HeFuZhangFeiBoss_openUi_9640, self);
		mgr.regHand(9642, self.GC_HeFuZhangFeiBoss_addjiu_9642, self);
		mgr.regHand(9644, self.GC_HeFuZhangFeiBoss_bossSate_9644, self);
		mgr.regHand(9646, self.GC_HeFuZhangFeiBoss_joinrest_9646, self);
		mgr.regHand(9648, self.GC_HeFuZhangFeiBoss_quit_9648, self);
		mgr.regHand(9650, self.GC_HeFuZhangFeiBoss_noticeDieLive_9650, self);
		mgr.regHand(9652, self.GC_HeFuZhangFeiBoss_bossBoolCharge_9652, self);
		mgr.regHand(9656, self.GC_HeFuZhangFeiBoss_buyLive_9656, self);
		mgr.regHand(9658, self.GC_HeFuZhangFeiBoss_isaotufuhuo_9658, self);
		mgr.regHand(9660, self.GC_HeFuZhangFeiBoss_autorest_9660, self);
		mgr.regHand(9662, self.GC_HeFuZhangFeiBoss_bossdie_9662, self);
		mgr.regHand(9664, self.GC_HeFuZhangFeiBoss_openrank_9664, self);
		mgr.regHand(9666, self.GC_HeFuZhangFeiBoss_rewardCharge_9666, self);
	}

	/**9640 B-B-L-L-I-I GC 打开ui返回 B:boss状态0未开启 1开启 2已经击杀stateB:boss序号bossindexL:当前血量curHpL:最大血量maxHp
	 * I:惩罚时间cdI:醉意zuiyi[I:boss序号B:boss被击杀奖励情况][I:酒序号I:元宝敬酒次数]各种酒元宝敬酒次数*/
	public GC_HeFuZhangFeiBoss_openUi_9640(self: Model_ZFZJ, data: BaseBytes): void {
		self.state = data.readByte();
		self.bossLv = data.readByte();
		self.curHp = data.readLong();
		self.maxHp = data.readLong();
		self.times = data.readInt();
		self.zuiYi = data.readInt();
		if (self.state == 2) {
			let cfg = Config.hfkhzfzj_286[self.bossLv];
			if (cfg.next > 0) {
				self.state = 0;
				self.bossLv = cfg.next;
			}
		}
		let red = false;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id = data.readInt();
			let state = data.readByte();
			self.rewardData[id] = state;
			if (state == 1) {
				red = true;
			}
		}

		let len1 = data.readShort();
		for (let i = 0; i < len1; i++) {
			let wineID = data.readInt();
			let wineNum = data.readInt();
			self.wineDic[wineID] = wineNum;
		}
		GGlobal.reddot.setCondition(UIConst.HFKH_ZFZJ_REWARD, 0, red);
		GGlobal.reddot.setCondition(UIConst.HFKH_ZFZJ, 0, red);
		GGlobal.reddot.notifyMsg(UIConst.HFKH_ZFZJ);
		GGlobal.control.notify(UIConst.HFKH_ZFZJ);
	}

	/**9641 B CG 敬酒 B:敬酒类型type*/
	public CG_HeFuZhangFeiBoss_addjiu_9641(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(9641, bates);
	}

	/**9642 B-B-I-B-L-L GC 敬酒返回 B:敬酒结果0成功 1失败B:敬酒类型I:张飞醉意B:boss状态I:元宝敬酒次数*/
	public GC_HeFuZhangFeiBoss_addjiu_9642(self: Model_ZFZJ, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			let type = data.readByte();
			self.zuiYi = data.readInt();
			self.state = data.readByte();
			let num = data.readInt();
			self.wineDic[type] = num;
			if (self.state == 2) self.state = 0;
			GGlobal.control.notify(UIConst.HFKH_ZFZJ);
		}
	}

	/**9644 I-B-I-L-L GC boss状态变化 I:当前boss序号bossidB:boss状态1开启 2被杀stateI:醉意zuiyiL:当前血量curHpL:最大血量maxHp*/
	public GC_HeFuZhangFeiBoss_bossSate_9644(self: Model_ZFZJ, data: BaseBytes): void {
		self.bossLv = data.readInt();
		self.state = data.readByte();
		self.zuiYi = data.readInt();
		self.curHp = data.readLong();
		self.maxHp = data.readLong();
		if (self.state == 2) {
			let cfg = Config.hfkhzfzj_286[self.bossLv];
			if (cfg.next > 0) {
				self.state = 0;
				self.bossLv = cfg.next;
			}
		}
		GGlobal.control.notify(UIConst.HFKH_ZFZJ);
	}

	/**9645  CG 进入张飞战斗 */
	public CG_HeFuZhangFeiBoss_join_9645(): void {
		var bates = this.getBytes();
		this.sendSocket(9645, bates);
	}

	/**9646 B-B GC 进入返回 B:成功 1失败 2活动还没开始 3活动已经结束 4惩罚30s时间内5在副本内restB:自动复活状态 1开启自动复活 0关闭自动state*/
	public GC_HeFuZhangFeiBoss_joinrest_9646(self: Model_ZFZJ, data: BaseBytes): void {
		let ret = data.readByte();
		let type = data.readByte();
		if (ret == 0) {
			GGlobal.layerMgr.close2(UIConst.ACTCOM);
			GGlobal.mapscene.enterScene(SceneCtrl.HFHD_ZFZJ);
			GGlobal.control.notify("revieauto", type);
		} else if (ret == 1) {
			ViewCommonWarn.text("进入失败");
		} else if (ret == 2) {
			ViewCommonWarn.text("活动尚未开始");
		} else if (ret == 3) {
			ViewCommonWarn.text("活动已结束");
		} else if (ret == 4) {
			ViewCommonWarn.text("正在冷却中");
		}
	}

	/**9647  CG退出 */
	public CG_HeFuZhangFeiBoss_quit_9647(): void {
		var bates = this.getBytes();
		this.sendSocket(9647, bates);
	}

	/**9648 B GC 退出返回 B:离开 B:0离开成功 1失败rest*/
	public GC_HeFuZhangFeiBoss_quit_9648(self: Model_ZFZJ, data: BaseBytes): void {
		let arg1 = data.readByte();
		if (arg1 == 0) {
			GGlobal.modelScene.returnMainScene();
			GGlobal.layerMgr.close2(UIConst.BATTLEWIN);
			GGlobal.layerMgr.open(UIConst.ACTCOM, UIConst.HFKH_ZFZJ);
		} else {
			ViewCommonWarn.text("退出场景失败");
		}
	}

	/**9650 [L]-B GC 人物死亡或者复活 [L:玩家id]heroidsB:0活着 1死亡dieLive*/
	public GC_HeFuZhangFeiBoss_noticeDieLive_9650(self: Model_ZFZJ, data: BaseBytes): void {
		let temp = [];
		let hasMine = false;
		let mine = Model_player.voMine.id;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id = data.readLong();
			temp.push(id);
			if (id == mine) {
				hasMine = true;
			}
		}
		let ret = data.readByte();
		if (hasMine) {
			if (ret == 1) {
				self.lifeTime = Model_GlobalMsg.getServerTime() + ConfigHelp.getSystemNum(1012) * 1000;
			}
			GGlobal.control.notify(Enum_MsgType.ZFZJ_ROLE_LIFE, ret);
		}
		GGlobal.control.notify(Enum_MsgType.CC_SCENE_PLAYER_STATE, { st: ret, list: temp });
	}

	/**9652 L-L-L-L-[U-L] GC 场景刷新个人以及boss数据 L:我的剩余血量myHpL:我的伤害myHurtL:boss气血上限bossHpMaxL:boss当前气血bossCurHp[U:名字L:伤害]伤害排行数据hurtList*/
	public GC_HeFuZhangFeiBoss_bossBoolCharge_9652(self: Model_ZFZJ, data: BaseBytes): void {
		self.myHp = data.readLong();
		self.myHurt = data.readLong();
		self.maxHp = data.readLong();
		self.curHp = data.readLong();
		self.rankData = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			self.rankData.push([i + 1, data.readUTF(), data.readLong()]);
		}
		GGlobal.control.notify(Enum_MsgType.ZFZJ_UPDATEHURT);
	}

	/**9653  CG 通知后端 我本人死亡了 */
	public CG_HeFuZhangFeiBoss_cgherodie_9653(): void {
		var bates = this.getBytes();
		this.sendSocket(9653, bates);
	}

	/**9655 B CG 买活 B:0买活 1申请复活type*/
	public CG_HeFuZhangFeiBoss_buyLive_9655(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(9655, bates);
	}

	/**9656 B GC 买活返回 B:0成功 1失败 rest*/
	public GC_HeFuZhangFeiBoss_buyLive_9656(self: Model_ZFZJ, data: BaseBytes): void {
		let ret = data.readByte();
		if (ret == 0) GGlobal.control.notify(Enum_MsgType.ZFZJ_ROLE_LIFE);
	}

	/**9657 B CG 自动复活状态 B:1开启自动复活 0关闭自动state*/
	public CG_HeFuZhangFeiBoss_isaotufuhuo_9657(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(9657, bates);
	}

	/**9658 B GC 自动复活状态 B:1开启自动复活 0关闭自动state*/
	public GC_HeFuZhangFeiBoss_isaotufuhuo_9658(self: Model_ZFZJ, data: BaseBytes): void {
		let type = data.readByte();
		GGlobal.control.notify("revieauto", type);
	}

	/**9660 B GC 自动复活结果 B:0成功 1失败rest*/
	public GC_HeFuZhangFeiBoss_autorest_9660(self: Model_ZFZJ, data: BaseBytes): void {
		let type = data.readByte();
		if (type == 0) {
			ViewCommonWarn.text("复活成功");
		} else {
			ViewCommonWarn.text("元宝不足,自动复活失败");
			self.CG_HeFuZhangFeiBoss_isaotufuhuo_9657(0);
		}
	}

	/**9662  GC 通知场景内玩家boss死亡 */
	public GC_HeFuZhangFeiBoss_bossdie_9662(self: Model_ZFZJ, data: BaseBytes): void {
		self.curHp = 0;
		GGlobal.control.notify(Enum_MsgType.ZFZJ_BOSS_DEAD);
	}

	/**9663  CG 打开敬酒排行榜 */
	public CG_HeFuZhangFeiBoss_openRank_9663(): void {
		var bates = this.getBytes();
		this.sendSocket(9663, bates);
	}

	/**9664 [B-L-U-I] GC 醉意排行榜 [B:名次L:玩家idU:玩家名字I:玩家醉意值]rankinfos- S:我的排名I:我的敬酒*/
	public GC_HeFuZhangFeiBoss_openrank_9664(self: Model_ZFZJ, data: BaseBytes): void {
		self.wineRankData = {};
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let rank = data.readByte();
			let roleID = data.readLong();
			let roleName = data.readUTF();
			let zuiyi = data.readInt();
			self.wineRankData[rank] = { id: roleID, name: roleName, zuiyi: zuiyi };
		}
		self.myRank = data.readShort();
		self.myWine = data.readInt();
		GGlobal.control.notify(UIConst.HFKH_ZFZJ_RANK);
	}

	/**9665 I CG 获取Boss被击杀奖励 I:boss序号index*/
	public CG_HeFuZhangFeiBoss_getBossReward_9665(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(9665, bates);
	}

	/**9666 I-B GC boss被击杀奖励情况 I:boss序号indexB:奖励情况0 1 2state*/
	public GC_HeFuZhangFeiBoss_rewardCharge_9666(self: Model_ZFZJ, data: BaseBytes): void {
		let bossLv = data.readInt();
		let state = data.readByte();
		self.rewardData[bossLv] = state;
		let red = false;
		for (let key in self.rewardData) {
			if (self.rewardData[key] == 1) {
				red = true;
				break;
			}
		}
		GGlobal.reddot.setCondition(UIConst.HFKH_ZFZJ_REWARD, 0, red);
		GGlobal.reddot.setCondition(UIConst.HFKH_ZFZJ, 0, red);
		GGlobal.reddot.notifyMsg(UIConst.HFKH_ZFZJ);
		GGlobal.control.notify(UIConst.HFKH_ZFZJ);
	}
}