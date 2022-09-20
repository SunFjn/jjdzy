/**
 * Model_CaoCaoCome
 * 曹操来袭
 */
class Model_CaoCaoCome extends BaseModel {

	public myHp: number = 0;
	public bossHp: number = 0;
	public bossMaxHp: number = 0;
	public myHurt: number = 0;
	public rankData: any[] = [];// rank name hurt
	public bossResult: number = 0;//当前这场战斗的胜负
	public bossAward: any[] = [];

	public roleCount: number = 0;//场景角色数量
	public CDEnter: number = 0;//进入冷却时间
	public ccSt: number = 0;//状态 0未开启 1开启
	public newBoss: number = 0;
	public lifeTime: number = 0;
	public qmHpMul = 0;
	public cc_extra_awards = [];
	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		let self = this;
		mgr.regHand(8510, self.GC_CaoCaoCome_openUi_8510, self);
		mgr.regHand(8512, self.GC_CaoCaoCome_openRank_8512, self);
		mgr.regHand(8514, self.GC_CaoCaoCome_join_8514, self);
		mgr.regHand(8516, self.GC_CaoCaoCome_quit_8516, self);
		mgr.regHand(8518, self.GC_CaoCaoCome_noticeDieLive_8518, self);
		mgr.regHand(8520, self.GC_CaoCaoCome_bossBoolCharge_8520, self);
		mgr.regHand(8524, self.GC_CaoCaoCome_buyLive_8524, self);
		mgr.regHand(8526, self.GC_CaoCaoCome_isaotufuhuo_8526, self);
		mgr.regHand(8528, self.GC_CAOCAO_AUTOFUHUO, self);
		mgr.regHand(8530, self.GC_CAOCAO_STATE_CHANGE, self);
		mgr.regHand(8532, self.GC_CAOCAO_DEAD, self);
	}

	/**8532	GC boss死亡 */
	public GC_CAOCAO_DEAD(self: Model_CaoCaoCome, data: BaseBytes): void {
		GGlobal.modelCaoCao.bossHp = 0;
		GGlobal.control.notify(Enum_MsgType.CC_CAOCAO_BOSS_DEAD);
	}

	/**8530	GC boss入口状态 B:0关闭了 1开启了 */
	public GC_CAOCAO_STATE_CHANGE(self: Model_CaoCaoCome, data: BaseBytes): void {
		let ccst = data.readByte();
		if (self.ccSt != ccst) {
			GGlobal.control.notify(Enum_MsgType.CC_CAOCAO_BOSS_DEAD);
			if (ccst == 1 && GGlobal.sceneType != SceneCtrl.CAOCAOLAIXI) {
				self.bossHp = self.bossMaxHp;
			}
		}
		self.ccSt = ccst;
		GGlobal.reddot.setCondition(UIConst.CAOCAO_LAIXI, 0, self.ccSt == 1);
		GGlobal.control.notify(UIConst.CAOCAO_LAIXI);
		GGlobal.reddot.notify(UIConst.CAOCAO_LAIXI);
	}

	/**8528	GC 自动复活结果 B:0成功 1失败 */
	public GC_CAOCAO_AUTOFUHUO(self: Model_CaoCaoCome, data: BaseBytes): void {
		let type = data.readByte();
		if (type == 0) {
			ViewCommonWarn.text("复活成功");
		} else {
			ViewCommonWarn.text("元宝不足,自动复活失败");
			self.CG_CaoCaoCome_isaotufuhuo_8525(0);
		}
	}

	/**8510 B-L-L-I-I GC 打开活动ui返回 B:boss入口 0关闭1开启stateL:当前血量nowBoolL:最大血量maxBoolI:下一个boss的血量加成addHpNumI:惩罚时间time*/
	public GC_CaoCaoCome_openUi_8510(self: Model_CaoCaoCome, data: BaseBytes): void {
		self.ccSt = data.readByte();
		self.bossHp = data.readLong();
		self.bossMaxHp = data.readLong();
		self.qmHpMul = data.readInt();
		self.CDEnter = data.readInt();
		GGlobal.reddot.setCondition(UIConst.CAOCAO_LAIXI, 0, self.ccSt == 1);
		GGlobal.control.notify(UIConst.CAOCAO_LAIXI);
		GGlobal.reddot.notify(UIConst.CAOCAO_LAIXI);
	}

	/**8511  CG 打开boss伤害排行榜 */
	public CG_CaoCaoCome_openRank_8511(): void {
		var bates = this.getBytes();
		this.sendSocket(8511, bates);
	}

	/**8512 [B-U-I] GC 打开排行榜返回 [B:名次U:姓名I:伤害值]rankers*/
	public GC_CaoCaoCome_openRank_8512(self: Model_CaoCaoCome, data: BaseBytes): void {
		self.rankData = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			self.rankData.push([data.readByte(), data.readUTF(), data.readLong()]);
		}
		for (let i = len; i < 10; i++) {
			self.rankData.push([i + 1, "虚位以待", 0]);
		}
		GGlobal.control.notify(UIConst.CAOCAO_LAIXI_RANK);
	}

	/**8513  进入曹操boss场景 */
	public CG_CaoCaoCome_join_8513(): void {
		var bates = this.getBytes();
		this.sendSocket(8513, bates);
	}

	/**8514 B-B GC 进入返回 B:成功 1失败 2活动还没开始 3活动已经结束 4惩罚30s时间内restB:自动复活状态 1开启自动复活 0关闭自动state*/
	public GC_CaoCaoCome_join_8514(self: Model_CaoCaoCome, data: BaseBytes): void {
		let ret = data.readByte();
		if (ret == 0) {
			GGlobal.layerMgr.close2(UIConst.ACTCOM);
			GGlobal.mapscene.enterScene(SceneCtrl.CAOCAOLAIXI);
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

	/**8515  CG 退出 */
	public CG_CaoCaoCome_quit_8515(): void {
		var bates = this.getBytes();
		this.sendSocket(8515, bates);
	}

	/**8516 B GC 退出返回 B:GC 离开 B:0离开成功 1失败rest*/
	public GC_CaoCaoCome_quit_8516(self: Model_CaoCaoCome, data: BaseBytes): void {
		let arg1 = data.readByte();
		if (arg1 == 0) {
			GGlobal.modelScene.returnMainScene();
			GGlobal.layerMgr.close2(UIConst.BATTLEWIN);
			GGlobal.layerMgr.open(UIConst.ACTCOM, UIConst.CAOCAO_LAIXI);
		} else {
			ViewCommonWarn.text("退出场景失败");
		}
	}

	/**8518 [L]-B GC 人物死亡或者复活 [L:玩家id]heroidsB:0活着 1死亡dieLive*/
	public GC_CaoCaoCome_noticeDieLive_8518(self: Model_CaoCaoCome, data: BaseBytes): void {
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
			GGlobal.control.notify(Enum_MsgType.CC_ROLE_LIFE, ret);
		}
		GGlobal.control.notify(Enum_MsgType.CC_SCENE_PLAYER_STATE, { st: ret, list: temp });
	}

	/**8520 L-L-L-L-[U-L] GC 场景刷新个人以及boss数据 L:我的剩余血量myHpL:我的伤害myHurtL:boss气血上限bossHpMaxL:boss当前气血bossCurHp[U:名字L:伤害]伤害排行数据hurtList*/
	public GC_CaoCaoCome_bossBoolCharge_8520(self: Model_CaoCaoCome, data: BaseBytes): void {
		self.myHp = data.readLong();
		self.myHurt = data.readLong();
		self.bossMaxHp = data.readLong();
		self.bossHp = data.readLong();
		self.rankData = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			self.rankData.push([i + 1, data.readUTF(), data.readLong()]);
		}
		for (let i = len; i < 10; i++) {
			self.rankData.push([i + 1, "虚位以待", 0]);
		}
		GGlobal.control.notify(UIConst.CAOCAO_LAIXI_RANK);
	}

	/**8521  CG 通知后端 我本人死亡了 */
	public CG_CaoCaoCome_cgherodie_8521(): void {
		var bates = this.getBytes();
		this.sendSocket(8521, bates);
	}

	/**8523 B CG 买活 B:0买活 1申请复活type*/
	public CG_CaoCaoCome_buyLive_8523(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(8523, bates);
	}

	/**8524 B GC 买活返回 B:0成功 1失败 rest*/
	public GC_CaoCaoCome_buyLive_8524(self: Model_CaoCaoCome, data: BaseBytes): void {
		let ret = data.readByte();
		if (ret == 0) GGlobal.control.notify(Enum_MsgType.CC_ROLE_LIFE);
	}

	/**8525 B CG 自动复活状态 B:1开启自动复活 0关闭自动state*/
	public CG_CaoCaoCome_isaotufuhuo_8525(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(8525, bates);
	}

	/**8526 B GC 自动复活状态 B:1开启自动复活 0关闭自动state*/
	public GC_CaoCaoCome_isaotufuhuo_8526(self: Model_CaoCaoCome, data: BaseBytes): void {
		let type = data.readByte();
		GGlobal.control.notify("revieauto", type);
	}

}