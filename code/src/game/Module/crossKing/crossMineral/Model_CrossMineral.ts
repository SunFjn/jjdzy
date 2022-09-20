class Model_CrossMineral extends BaseModel {
	static MAX_LEVEL = 5;

	/**7201 打开界面  */
	public CG_OPEN_UI() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(7201, ba);
	}

	/**7203 邀请挖矿  */
	public CG_INVITATION() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(7203, ba);
	}

	/**7205 加入挖矿 L:矿主id */
	public CG_JOIN_MINE(id) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(7205, ba);
	}

	/**7207 刷新矿藏 B:类型:0-普通,1-一键 */
	public CG_REFRESH_MINE(type) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(7207, ba);
	}

	/**7209 开始挖矿  */
	public CG_START_MINE() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(7209, ba);
	}

	/**7211 踢出矿工 L:踢出旷工id  */
	public CG_KICK_MINE(roleID: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(roleID);
		this.sendSocket(7211, ba);
	}

	/**7213 离开挖矿  */
	public CG_LEAVE_MINE() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(7213, ba);
	}

	/**7215 前往跨服矿区  */
	public CG_GOTO_MINE() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(7215, ba);
	}

	/**7217 搜索矿藏  */
	public CG_SEARCH_MINE() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(7217, ba);
	}

	/**7219 顺手牵羊 L:矿主id */
	public CG_STEAL_MINE(mineId: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(mineId);
		this.sendSocket(7219, ba);
	}

	/**7221 战斗抢夺 L:矿主id*/
	public CG_FIGHT_MINE(mineId: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(mineId);
		this.sendSocket(7221, ba);
	}

	/**7223 打开战报  */
	public CG_OPEN_REPORT() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(7223, ba);
	}

	/**7227 查看录像 B:战斗中的索引 */
	public CG_CHECK_RIDEO(id) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(id);
		this.sendSocket(7227, ba);
	}

	/**7233	领取采矿奖励 L:矿藏主id  */
	public CG_DRAW_REWARD_7233(mineID) {
		let ba: BaseBytes = new BaseBytes();
		Model_CrossMineral.drawMineID = mineID;
		ba.writeLong(mineID);
		this.sendSocket(7233, ba);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		let s = this;
		s.socket = mgr;
		mgr.regHand(7202, s.GC_OPEN_UI, s);
		mgr.regHand(7204, s.GC_INVITATION, s);
		mgr.regHand(7206, s.GC_JOIN_MINE, s);
		mgr.regHand(7208, s.GC_REFRESH_MINE, s);
		mgr.regHand(7210, s.GC_START_MINE, s);
		mgr.regHand(7212, s.GC_KICK_MINE, s);
		mgr.regHand(7214, s.GC_LEAVE_MINE, s);
		mgr.regHand(7216, s.GC_GOTO_MINE, s);
		mgr.regHand(7218, s.GC_SEARCH_MINE, s);
		mgr.regHand(7220, s.GC_STEAL_MINE, s);
		mgr.regHand(7222, s.GC_FIGHT_MINE, s);
		mgr.regHand(7224, s.GC_OPEN_REPORT, s);
		mgr.regHand(7226, s.GC_REPORT, s);
		mgr.regHand(7228, s.GC_CHECK_RIDEO, s);
		mgr.regHand(7230, s.GC_ASSISTBROCAST, s);
		mgr.regHand(7232, s.GC_JION, s);
		mgr.regHand(7234, s.GC_DRAW_REWARD_7234, s);
		mgr.regHand(7236, s.GC_MINE_DATA_SEND_7236, s);
		mgr.regHand(7238, s.GC_CROSSMINE_STATE_7238, s);
	}

	/**我的顺手次数 */
	public static mySteal: number = 0;//
	/**我的抢夺次数 */
	public static myLoot: number = 0;//
	/**我的矿的数据 */
	public static myMineVo: Vo_MineData;
	/**协助矿的数据 */
	public static otherMineVo: Vo_MineData;
	/**开服矿场数据 */
	public static kuafuMineArr: Vo_MineData[] = [];
	/**选中我的矿场还是协助 */
	public static _oldSelectId = 0;
	/**领取奖励的矿主ID */
	public static drawMineID = 0;
	/**剩余免费搜素次数 */
	public static surNum = 0;
	/**:0-正常,1-不在活动时间内 */
	public static state = 0;
	public static getMyMine(): Vo_MineData {
		return Model_CrossMineral.myMineVo;
	}

	/**7202  打开界面返回 B:状态:0-正常,1-不在活动时间内B:剩余顺手次数B:剩余抢夺次数[I:矿配置idL:矿主idI:已被顺次数I:已被抢次数I:剩余采集时间(-1为未开始开采)_[B:物品类型I:物品idI:物品数量I:已扣数量]资源信息[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框]矿工信息]矿信息*/
	public GC_OPEN_UI(self: Model_CrossMineral, data: BaseBytes) {
		Model_CrossMineral.myMineVo = null;
		Model_CrossMineral.otherMineVo = null;
		Model_CrossMineral.state = data.readByte();
		Model_CrossMineral.mySteal = data.readByte();
		Model_CrossMineral.myLoot = data.readByte();
		let len = data.readShort()
		for (let i = 0; i < len; i++) {
			let cfgId = data.readInt();
			let vo = Vo_MineData.create(cfgId);
			vo.mineID = data.readLong();
			vo.mySteal = data.readInt();
			vo.myLoot = data.readInt();
			vo.times = data.readInt();
			vo.roleArr = [];
			vo.itemArr = [];
			let size = data.readShort();
			for (let j = 0; j < size; j++) {
				let arr = [data.readByte(), data.readInt(), data.readInt(), data.readInt()];
				vo.itemArr.push(arr);
			}
			//[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框
			let size1 = data.readShort();
			for (let j = 0; j < size1; j++) {
				let roleVo = new Vo_MineRole();
				roleVo.initDate(data);
				vo.roleArr.push(roleVo);
			}
			if (vo.mineID == Model_player.voMine.id) {
				Model_CrossMineral.myMineVo = vo;
			} else {
				Model_CrossMineral.otherMineVo = vo;
			}
		}
		GGlobal.control.notify(UIConst.CROSS_MINERAL);
	}

	/**7204 邀请挖矿返回 B: 1成功 2你没在队伍中 3你不是队长 5队员已满 6操作太频繁  */
	public GC_INVITATION(self: Model_CrossMineral, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			ViewCommonWarn.text("邀请成功");
		}
	}

	/**7206 加入挖矿返回 队长和其他成员 B:0成功 1失败 2不存在 3已满[L:玩家idU:玩家姓名L:玩家战力B:玩家国家I:玩家头像idI:玩家头像框]  */
	public GC_JOIN_MINE(self: Model_CrossMineral, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			ViewCommonWarn.text("加入成功");
			Model_CrossMineral._oldSelectId = MieralType.ASSIST;
			GGlobal.layerMgr.open(UIConst.CROSS_MINERAL);
		} else if (result == 2) {
			ViewCommonWarn.text("矿不存在");
		} else if (result == 3) {
			ViewCommonWarn.text("该矿协助已满");
		}
	}

	/**7208 刷新矿藏返回 B:0成功 1失败 2钱不够I:我的矿等级  */
	public GC_REFRESH_MINE(self: Model_CrossMineral, data: BaseBytes) {
		let ret = data.readByte();

		let level = data.readInt();
		let vo = Model_CrossMineral.getMyMine();
		vo.initLib(level);
		if (ret != 0) {
			ViewCommonWarn.text("刷新失败");
			return;
		} else {
			if (level != Model_CrossMineral.myMineVo.cfgID) {
				ViewCommonWarn.text("刷新成功品质无提升")
			} else {
				ViewCommonWarn.text("刷新成功");
			}
		}
		GGlobal.control.notify(UIConst.CROSS_MINERAL);
		GGlobal.control.notify("GC_REFRESH_MINE");
	}

	/**7210 开始挖矿返回 B:0开始挖矿成功 1失败  */
	public GC_START_MINE(self: Model_CrossMineral, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 0) {
			let vo = Model_CrossMineral.myMineVo
			vo.times = vo.cfg.time;
		}
		GGlobal.control.notify(UIConst.CROSS_MINERAL);
	}

	/**7212 踢出矿工返回 B:0成功 1失败L:踢出旷工id  */
	public GC_KICK_MINE(self: Model_CrossMineral, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 0) {
			let roleId = data.readLong();
			let vo = Model_CrossMineral.myMineVo;
			if (vo.mineID == Model_player.voMine.id) {
				for (let j = 0; j < vo.roleArr.length; j++) {
					if (vo.roleArr[j].roleId == roleId) {
						vo.roleArr.splice(j, 1);
						break;
					}
				}
			}
			GGlobal.control.notify(UIConst.CROSS_MINERAL);
		}
	}

	/**7214 离开挖矿返回 B:0成功 1失败  */
	public GC_LEAVE_MINE(self: Model_CrossMineral, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 0) {
			Model_CrossMineral._oldSelectId = MieralType.OWNER;
			Model_CrossMineral.otherMineVo = null;
			GGlobal.control.notify(UIConst.CROSS_MINERAL);
		}
	}

	/**7216 前往跨服矿区返回 B:状态I:剩余免费搜索次数[I:矿配置idL:矿主idI:已被顺次数I:已被抢次数[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框]
	 * 矿工信息[B:物品类型I:物品idI:物品数量]顺手牵羊奖励[B:物品类型I:物品idI:物品数量]战斗掠夺奖励]矿信息  */
	public GC_GOTO_MINE(self: Model_CrossMineral, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			Model_CrossMineral.surNum = data.readInt();
			Model_CrossMineral.kuafuMineArr = [];
			let len = data.readShort()
			for (let i = 0; i < len; i++) {
				let cfgId = data.readInt();
				let vo = Vo_MineData.create(cfgId);
				vo.mineID = data.readLong();
				vo.mySteal = data.readInt();
				vo.myLoot = data.readInt();
				vo.roleArr = [];
				vo.itemArr = [];
				vo.stealItemArr = [];
				vo.lootItemArr = [];
				//[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框
				let size1 = data.readShort();
				for (let j = 0; j < size1; j++) {
					let roleVo = new Vo_MineRole();
					roleVo.initDate(data);
					vo.roleArr.push(roleVo);
				}

				let size = data.readShort();
				for (let j = 0; j < size; j++) {
					let arr = [data.readByte(), data.readInt(), data.readInt()];
					vo.stealItemArr.push(arr);
				}

				let size2 = data.readShort();
				for (let j = 0; j < size2; j++) {
					let arr = [data.readByte(), data.readInt(), data.readInt()];
					vo.lootItemArr.push(arr);
				}
				Model_CrossMineral.kuafuMineArr.push(vo);
			}
		}
		GGlobal.control.notify(UIConst.CROSS_MINERAL);
	}

	/**7218 搜索矿藏返回 B:状态[I:矿配置idL:矿主idI:已被顺次数I:已被抢次数[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框]矿工信息
	 * [B:物品类型I:物品idI:物品数量]顺手牵羊奖励[B:物品类型I:物品idI:物品数量]战斗掠夺奖励]矿信息  */
	public GC_SEARCH_MINE(self: Model_CrossMineral, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			Model_CrossMineral.surNum--;
			Model_CrossMineral.kuafuMineArr = [];
			let len = data.readShort()
			for (let i = 0; i < len; i++) {
				let cfgId = data.readInt();
				let vo = Vo_MineData.create(cfgId);
				vo.mineID = data.readLong();
				vo.mySteal = data.readInt();
				vo.myLoot = data.readInt();
				vo.roleArr = [];
				vo.itemArr = [];
				vo.stealItemArr = [];
				vo.lootItemArr = [];
				//[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框
				let size1 = data.readShort();
				for (let j = 0; j < size1; j++) {
					let roleVo = new Vo_MineRole();
					roleVo.initDate(data);
					vo.roleArr.push(roleVo);
				}

				let size = data.readShort();
				for (let j = 0; j < size; j++) {
					let arr = [data.readByte(), data.readInt(), data.readInt()];
					vo.stealItemArr.push(arr);
				}

				let size2 = data.readShort();
				for (let j = 0; j < size2; j++) {
					let arr = [data.readByte(), data.readInt(), data.readInt()];
					vo.lootItemArr.push(arr);
				}
				Model_CrossMineral.kuafuMineArr.push(vo);
			}
		} else if (result == 2) {
			ViewCommonWarn.text("暂无矿可搜索");
		}
		GGlobal.control.notify(UIConst.CROSS_MINERAL);
	}

	/**7220 顺手牵羊返回 B:状态  2-顺手牵羊次数不足3,矿藏已无资源*/
	public GC_STEAL_MINE(self: Model_CrossMineral, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			Model_CrossMineral.mySteal -= 1;
			ViewCommonWarn.text("顺手成功");
			GGlobal.control.notify(UIConst.CROSS_MINERAL);
		} else if (result == 2) {
			ViewCommonWarn.text("顺手牵羊次数不足");
		} else if (result == 3) {
			ViewCommonWarn.text("矿藏已无资源");
		}
	}

	/**7222 战斗抢夺返回 B:战斗结果0成功 1没有抢夺次数 2失败[B:物品类型I:物品idI:物品数量]抢夺奖励L:胜利者IDI:头像IDI:将衔IDL:胜利者战力U:胜利者名字L:左边玩家IDL:右边玩家ID*/
	public GC_FIGHT_MINE(self: Model_CrossMineral, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 0) {
			Model_CrossMineral.myLoot -= 1;
			self.enterBattle(data);
		} else {
			switch (ret) {
				case 1:
					ViewCommonWarn.text("采矿时间已结束,矿场关闭");
					break;
				case 2:
					ViewCommonWarn.text("今日抢夺次数已耗尽");
					break;
				case 3:
					let str = BroadCastManager.reTxt("该矿藏已被抢夺{0}次,给条活路吧", ConfigHelp.getSystemNum(6603));
					ViewCommonWarn.text(str);
					break;
			}
		}
	}

	/**7224 打开战报返回 [B:战斗结果 0 失败 1胜利 2顺手牵羊L:攻击者idU:攻击者名字nameB:抢夺的矿类型[B:道具类型I:道具idI:道具数量]奖励]战报数据*/
	public GC_OPEN_REPORT(self: Model_CrossMineral, data: BaseBytes) {
		let len = data.readShort();
		let dt = [];
		for (let i = 0; i < len; i++) {
			let arr: any = [data.readByte(), data.readLong(), data.readUTF(), data.readByte()];
			let arr1 = [];
			let len1 = data.readShort();
			for (let j = 0; j < len1; j++) {
				arr1.push([data.readByte(), data.readInt(), data.readInt()]);
			}
			arr.push(arr1)
			dt.push(arr);
		}
		GGlobal.control.notify(UIConst.CROSS_MINERAL_REPORT, dt);
	}

	/**7226 战报推送 B:状态*/
	public GC_REPORT(self: Model_CrossMineral, data: BaseBytes) {
		GGlobal.mainUICtr.addReportBTN(UIConst.CROSS_MINERAL);
	}

	/**7228 查看录像返回 [B:物品类型I:物品idI:物品数量]抢夺奖励L:胜利玩家IDI:头像IDI:将衔IDL:左边玩家IDL:右边玩家I*/
	public GC_CHECK_RIDEO(self: Model_CrossMineral, data: BaseBytes) {
		GGlobal.layerMgr.close2(UIConst.CROSS_MINERAL_REPORT);
		self.enterBattle(data);
	}

	public enterBattle(data: BaseBytes) {
		let awards = ConfigHelp.parseItemListBa(data);
		let winerid = data.readLong();
		let headid = data.readInt();
		let jiangxian = data.readInt();
		let power = data.readLong();
		let name = data.readUTF();
		let leftid = data.readLong();
		let rightid = data.readLong();
		let ctrl = SceneCtrl.getCtrl(SceneCtrl.WA_KUANG) as WaKuangCtrl;
		ctrl.power = power;
		ctrl.name = name;
		ctrl.winerid = winerid;
		ctrl.headid = headid;
		ctrl.jiangxian = jiangxian;
		ctrl.leftid = leftid;
		ctrl.rightid = rightid;
		GGlobal.mapscene.scenetype = SceneCtrl.WA_KUANG;
		GGlobal.mapscene.enterSceneCtrl(ctrl);
	}

	/**7230 邀请广播 L:矿主IDU:矿主名字I:矿类型*/
	public GC_ASSISTBROCAST(self: Model_CrossMineral, data: BaseBytes) {
		let id = data.readLong();
		let name = data.readUTF();
		let type = data.readInt();
		let mineName = HtmlUtil.fontNoSize(Config.kfkz_275[type].name, Color.getColorStr(Config.kfkz_275[type].pz));
		let str = Config.tishi_703[64].content;
		let link = HtmlUtil.createLink("[color=#15f234]【点击参与】[/color]", true, "wakuang");
		str = BroadCastManager.reTxt(str, name, mineName, link);
		GGlobal.modelchat.addChatByClient(Model_Chat.SYSTEM, 0, str, id + "");
	}

	/**7232 推送有新矿工加入 L:新矿工idU:新矿工名字L:矿主id[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框]矿工信息*/
	public GC_JION(self: Model_CrossMineral, data: BaseBytes) {
		let newID = data.readLong();
		let newName = data.readUTF();
		ViewCommonWarn.text("有玩家" + HtmlUtil.fontNoSize(newName, Color.getColorStr(2)) + "加入");
		let mineID = data.readLong();
		if (mineID != Model_player.voMine.id) {
			let len = data.readShort();
			Model_CrossMineral.otherMineVo.roleArr = [];
			for (let i = 0; i < len; i++) {
				let vo = new Vo_MineRole();
				vo.initDate(data);
				Model_CrossMineral.otherMineVo.roleArr.push(vo);
			}
		} else {
			let len = data.readShort();
			Model_CrossMineral.myMineVo.roleArr = [];
			for (let i = 0; i < len; i++) {
				let vo = new Vo_MineRole();
				vo.initDate(data);
				Model_CrossMineral.myMineVo.roleArr.push(vo);
			}
		}
		GGlobal.control.notify(UIConst.CROSS_MINERAL);
	}

	/**7234	领取采矿奖励返回 B:状态:0-成功,1-失败 I:矿配置id*/
	public GC_DRAW_REWARD_7234(self: Model_CrossMineral, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 0) {
			let cfgID = data.readInt();
			ViewCommonWarn.text("领取成功");
			if (Model_CrossMineral.drawMineID == Model_player.voMine.id) {
				let vo = Model_CrossMineral.myMineVo;
				vo.initLib(cfgID);
				vo.itemArr = [];
				for (let i = 0; i < vo.roleArr.length; i++) {
					if (vo.roleArr[i].roleId != Model_player.voMine.id) {
						vo.roleArr.splice(i, 1);
						i--;
					}
				}
				vo.times = -1;
			} else {
				Model_CrossMineral._oldSelectId = MieralType.OWNER;
				Model_CrossMineral.otherMineVo = null;
			}
			Model_CrossMineral.drawMineID = 0;
			GGlobal.control.notify(UIConst.CROSS_MINERAL);
		}
	}

	/**7236	推送矿藏信息 B:推送类型:1-开始采集,2-角色加入,3-队长踢人,4-队长刷新矿的品质,5-被抢夺,6-被顺手,7-矿工离开8采集完成9-发送奖励(后端用)10-通知改名
	 * U:对象名字I:矿配置idL:矿主idI:已被顺次数I:已被抢次数I:剩余采集时间(-1为未开始开采)
  	[B:物品类型I:物品idI:物品数量I:已扣数量]资源信息[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框]矿工信息 */
	public GC_MINE_DATA_SEND_7236(self: Model_CrossMineral, data: BaseBytes) {
		let ret = data.readByte();
		let name = data.readUTF();
		let cfgID = data.readInt();
		let mineID = data.readLong();
		let vo: Vo_MineData;
		if (Model_player.voMine.id == mineID) {
			vo = Model_CrossMineral.myMineVo;
			if (ret == 2) {
				ViewCommonWarn.text(HtmlUtil.fontNoSize(name, Color.getColorStr(2)) + "加入了你的采矿队伍");
			}
		} else if (Model_CrossMineral.otherMineVo && mineID == Model_CrossMineral.otherMineVo.mineID) {
			vo = Model_CrossMineral.otherMineVo;
			switch (ret) {
				case 3:
					ViewCommonWarn.text(HtmlUtil.fontNoSize(name, Color.getColorStr(2)) + "被踢出队伍");
					break;
			}
		}

		if (vo) {
			vo.mySteal = data.readInt();
			vo.myLoot = data.readInt();
			vo.times = data.readInt();
			vo.itemArr = [];
			vo.roleArr = [];
			let size = data.readShort();
			for (let j = 0; j < size; j++) {
				let arr = [data.readByte(), data.readInt(), data.readInt(), data.readInt()];
				vo.itemArr.push(arr);
			}

			let index = 0;
			let size1 = data.readShort();
			for (let j = 0; j < size1; j++) {
				let roleVo = new Vo_MineRole();
				roleVo.initDate(data);
				vo.roleArr.push(roleVo);
				if (roleVo.roleId == Model_player.voMine.id) {
					index++;
				}
			}
			if (index <= 0) {
				Model_CrossMineral._oldSelectId = MieralType.OWNER;
				Model_CrossMineral.otherMineVo = vo = null;
			}
		}
		if (ret == 9) {
			Model_CrossMineral._oldSelectId = MieralType.OWNER;
			Model_CrossMineral.otherMineVo = null;
		}
		GGlobal.control.notify(UIConst.CROSS_MINERAL);
	}

	/**7238	推送矿藏活动开启 B:状态:0-正常,1-不在活动时间内 */
	public GC_CROSSMINE_STATE_7238(self: Model_CrossMineral, data: BaseBytes) {
		Model_CrossMineral.state = data.readByte();
	}
}