class Model_ZSSF extends BaseModel {

	public static rewardTime = 600;
	public ldNum = 0;
	/**派遣将领ID */
	public goGeneralID = 0;
	/**当前操作的城池ID */
	public cityID = 0;
	public cityData: { [id: number]: { id: number, state: number, times: number, generalID: number, bldNum: number, per: number } } = {};
	public shopData: { [id: number]: number };
	public resTime = 0;
	public shopArr: Izssfstore_294[] = [];
	public getShop() {
		let self = this;
		if (self.shopArr.length <= 0) {
			for (let key in Config.zssfstore_294) {
				let cfg = Config.zssfstore_294[key];
				self.shopArr.push(cfg);
			}
			self.shopArr.sort(function (a, b) {
				return a.id - b.id;
			});
		}
	}

	public getHasWujiang(cityID): Ihero_211[] {
		let arr: Ihero_211[] = [];
		let self = this;
		for (let key in Config.hero_211) {
			let cfg = Config.hero_211[key];
			if (cityID == 5) {
				if (Model_WuJiang.getWuJiangStarByJob(parseInt(key)) > 0 && cfg.pinzhi >= 8) {
					let index = 0;
					for (let key1 in self.cityData) {
						if (self.cityData[key1].generalID == cfg.type) {
							index++;
							break;
						}
					}
					if (index <= 0) {
						arr.push(cfg);
					}
				}
			} else {
				if (Model_WuJiang.getWuJiangStarByJob(parseInt(key)) > 0) {
					let index = 0;
					for (let key1 in self.cityData) {
						if (self.cityData[key1].state != 0 && self.cityData[key1].generalID == cfg.type) {
							index++;
							break;
						}
					}
					if (index <= 0) {
						arr.push(cfg);
					}
				}
			}
		}
		arr.sort(function (a, b) {
			let perValueA = 0;
			let perValueB = 0;
			switch (a.pinzhi) {
				case 3:
					perValueA = 8003;
					break;
				case 4:
					perValueA = 8008;
					break;
				case 5:
					perValueA = 8009;
					break;
				case 6:
				case 7:
					perValueA = 8010;
					break;
				default:
					perValueA = 8011;
					break;
			}
			switch (b.pinzhi) {
				case 3:
					perValueB = 8003;
					break;
				case 4:
					perValueB = 8008;
					break;
				case 5:
					perValueB = 8009;
					break;
				case 6:
				case 7:
					perValueB = 8010;
					break;
				default:
					perValueB = 8011;
					break;
			}
			let perA = a.pinzhi * Config.xtcs_004[8002].num + Model_WuJiang.getWuJiangStarByJob(a.type) * Config.xtcs_004[perValueA].num;
			let perB = b.pinzhi * Config.xtcs_004[8002].num + Model_WuJiang.getWuJiangStarByJob(b.type) * Config.xtcs_004[perValueB].num;
			if (perA == perB) {
				return a.type - b.type;
			} else {
				return perB - perA;
			}
		})
		return arr;
	}
	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(10902, self.GC_GuardArea_openUI_10902, self);
		mgr.regHand(10904, self.GC_GuardArea_dispatch_10904, self);
		mgr.regHand(10906, self.GC_GuardArea_getAward_10906, self);
		mgr.regHand(10908, self.GC_GuardArea_recall_10908, self);
		mgr.regHand(10910, self.GC_GuardArea_openPlunderUI_10910, self);
		mgr.regHand(10912, self.GC_GuardArea_plunder_10912, self);
		mgr.regHand(10914, self.GC_GuardArea_refresh_10914, self);
		mgr.regHand(10916, self.GC_GuardArea_openReportUI_10916, self);
		mgr.regHand(10918, self.GC_GuardArea_openShopUI_10918, self);
		mgr.regHand(10920, self.GC_GuardArea_buyItem_10920, self);
		mgr.regHand(10922, self.GC_ZSSF_BATTLE_RESULT, self);
	}

	/**10922  B:战斗结果1胜利2失败I:城池ID  */
	public GC_ZSSF_BATTLE_RESULT(self: Model_ZSSF, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let cityID = data.readInt();
			let cfg = Config.zssf_294[cityID];
			self.ldData[cityID].state = 1;
			self.ldData[cityID].ldNum -= 1;
			GGlobal.control.notify(UIConst.ZSSF);
			let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1))
			ViewCommonWin.show(rewardArr, 5000);
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

	/**10921 前端发送战斗结果 B:战斗结果0失败1成功2退出  */
	public CG_ZSSF_BATTLE_RESULT(type) {
		var bates = this.getBytes();
		bates.writeByte(type);
		this.sendSocket(10921, bates);
	}

	/**10901  打开界面 */
	public CG_GuardArea_openUI_10901(): void {
		var bates = this.getBytes();
		this.sendSocket(10901, bates);
	}

	/**10902 I-I-[I-B-I-L-I-[B-I-I]] 打开界面返回 I:今日掠夺次数plunderTimes
	 * [I:城池idB:城池状态0-未开启,1-正在镇守,2-镇守完毕I:城池武将idL:城池时间I:城池被掠夺次数I:加成值(十万)]]城池信息cityInfo*/
	public GC_GuardArea_openUI_10902(self: Model_ZSSF, data: BaseBytes): void {
		self.ldNum = data.readInt();
		self.cityData = {};
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let cityID = data.readInt();
			let state = data.readByte();
			let generalID = data.readInt();
			let cityTime = data.readLong();
			let bldNum = data.readInt();
			let per = data.readInt();
			self.cityData[cityID] = { id: cityID, state: state, times: cityTime, generalID: generalID, bldNum: bldNum, per: per };
		}
		GGlobal.control.notify(UIConst.ZSSF);
	}

	/**10903 派遣 I:城池idI:武将id  */
	public CG_GuardArea_dispatch_10903(cityID: number, generalID: number): void {
		var bates = this.getBytes();
		bates.writeInt(cityID);
		bates.writeInt(generalID);
		this.sendSocket(10903, bates);
	}

	/**10904 B 派遣返回 B:状态:0-成功,1-失败state*/
	public GC_GuardArea_dispatch_10904(self: Model_ZSSF, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			let cfg = Config.hero_211[self.goGeneralID];
			GGlobal.layerMgr.close2(UIConst.ZSSF_GO);
			ViewCommonWarn.text("派遣成功");
			self.cityData[self.cityID].state = 1;
			self.cityData[self.cityID].generalID = self.goGeneralID;
			let perValue = 0;
			switch (cfg.pinzhi) {
				case 3:
					perValue = 8003;
					break;
				case 4:
					perValue = 8008;
					break;
				case 5:
					perValue = 8009;
					break;
				case 6:
				case 7:
					perValue = 8010;
					break;
				default:
					perValue = 8011;
					break;
			}
			self.cityData[self.cityID].per = cfg.pinzhi * Config.xtcs_004[8002].num + Model_WuJiang.getWuJiangStarByJob(cfg.type) * Config.xtcs_004[perValue].num;
			self.cityData[self.cityID].times = Config.zssf_294[self.cityID].time + Math.floor(Model_GlobalMsg.getServerTime() / 1000);
			GGlobal.control.notify(UIConst.ZSSF);
		}
	}

	/**10905 领取奖励 I:城池id */
	public CG_GuardArea_getAward_10905(cityID: number): void {
		var bates = this.getBytes();
		bates.writeInt(cityID);
		this.sendSocket(10905, bates);
	}

	/**10906 B 领取奖励返回 B:状态:0-成功,1-失败state*/
	public GC_GuardArea_getAward_10906(self: Model_ZSSF, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			self.cityData[self.cityID].state = 0;
			self.cityData[self.cityID].generalID = 0;
			GGlobal.control.notify(UIConst.ZSSF);
		}
	}

	/**10907 提前召回 I:城池id  */
	public CG_GuardArea_recall_10907(cityID: number): void {
		var bates = this.getBytes();
		bates.writeInt(cityID);
		this.sendSocket(10907, bates);
	}

	/**10908 B 提前召回返回 B:状态:0-成功,1-失败state*/
	public GC_GuardArea_recall_10908(self: Model_ZSSF, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			self.cityData[self.cityID].state = 0;
			self.cityData[self.cityID].generalID = 0;
			GGlobal.control.notify(UIConst.ZSSF);
		}
	}

	/**10909  打开掠夺界面 */
	public CG_GuardArea_openPlunderUI_10909(): void {
		var bates = this.getBytes();
		this.sendSocket(10909, bates);
	}

	public ldData: { [id: number]: { name: string, job: number, power: number, cityID: number, ldNum: number, state: number } }
	/**10910 打开掠夺界面返回 [U:玩家名称I:玩家武将L:玩家战力I:城池idI:可掠夺次数B:掠夺状态:0-可掠夺,1-已掠夺]掠夺信息L:免费刷新时间*/
	public GC_GuardArea_openPlunderUI_10910(self: Model_ZSSF, data: BaseBytes): void {
		self.ldData = {};
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let roleName = data.readUTF();
			let job = data.readInt();
			let power = data.readLong();
			let cityID = data.readInt();
			let ldNum = data.readInt();
			let state = data.readByte();
			self.ldData[cityID] = { name: roleName, job: job, power: power, cityID: cityID, ldNum: ldNum, state: state };
		}
		self.resTime = data.readLong();
		GGlobal.control.notify(UIConst.ZSSF);
	}

	/**10911 掠夺 I:城池id  */
	public CG_GuardArea_plunder_10911(cityID: number): void {
		var bates = this.getBytes();
		bates.writeInt(cityID);
		this.sendSocket(10911, bates);
	}

	public battleRoleId = 0;
	/**10912 掠夺返回 B:状态:0-成功,1-数据异常,2-玩家不存在,3-城池还未开始镇守,4-没有资源,5-城池可掠夺次数不足,6-个人掠夺次数不足,7-已掠夺L:被掠夺的id*/
	public GC_GuardArea_plunder_10912(self: Model_ZSSF, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			self.battleRoleId = data.readLong();
			self.ldNum -= 1;
			let battleVo = GGlobal.modelPlayer.playerDetailDic[self.battleRoleId];
			if (battleVo) {
				self.enterBattle();
			} else {
				GGlobal.control.listen(Enum_MsgType.MSG_ADDROLEDETAIL, self.enterBattle, self);
			}
		} else {
			switch (result) {
				case 2:
					ViewCommonWarn.text("玩家不存在");
					break;
				case 3:
					ViewCommonWarn.text("城池还未开始镇守");
					break;
				case 5:
					ViewCommonWarn.text("城池可掠夺次数不足");
					break;
				case 6:
					ViewCommonWarn.text("个人掠夺次数不足");
					break;
			}
		}
	}

	public enterBattle(): void {
		let self = this;
		let battleVo = GGlobal.modelPlayer.playerDetailDic[self.battleRoleId];
		if (battleVo) {
			let vo = Vo_battle.create([Model_player.voMine], [battleVo]);
			vo.mapID = 402001;
			vo.sysID = vo.backID = UIConst.ZSSF;
			Model_battle.battleVo = vo;
			GGlobal.control.notify(UIConst.ZSSF);
			GGlobal.mapscene.enterScene(SceneCtrl.CLIENT_BATTLE);
			GGlobal.control.remove(Enum_MsgType.MSG_ADDROLEDETAIL, self.enterBattle, self);
		}
	}

	/**10913 刷新掠夺界面 I:是否免费:0-免费,1-元宝刷新  */
	public CG_GuardArea_refresh_10913(type: number): void {
		var bates = this.getBytes();
		bates.writeInt(type);
		this.sendSocket(10913, bates);
	}

	/**10914 刷新掠夺界面返回 [U:玩家名字I:玩家武将L:玩家战力I:城池idI:可掠夺次数]掠夺信息L:免费刷新时间B:状态:0-成功,1-时间未到,2-货币不足*/
	public GC_GuardArea_refresh_10914(self: Model_ZSSF, data: BaseBytes): void {
		self.ldData = {};
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let roleName = data.readUTF();
			let job = data.readInt();
			let power = data.readLong();
			let cityID = data.readInt();
			let ldNum = data.readInt();
			self.ldData[cityID] = { name: roleName, job: job, power: power, cityID: cityID, ldNum: ldNum, state: 0 };
		}
		self.resTime = data.readLong();
		let result = data.readByte();
		switch (result) {
			case 0:
				ViewCommonWarn.text("刷新成功");
				GGlobal.control.notify(UIConst.ZSSF);
				GGlobal.control.notify(Enum_MsgType.ZSSF_PLAYEFF);
				break;
			case 1:
				ViewCommonWarn.text("时间未到");
				break;
			case 2:
				ViewCommonWarn.text("货币不足");
				break;
		}
	}

	/**10915  打开战报 */
	public CG_GuardArea_openReportUI_10915(): void {
		var bates = this.getBytes();
		this.sendSocket(10915, bates);
	}

	public battleReportArr: { name: string, state: number, cityID: number }[] = [];
	/**10916 打开战报返回 [U:玩家名字B:状态:1-战胜,2-战败I:城池id]战报信息*/
	public GC_GuardArea_openReportUI_10916(self: Model_ZSSF, data: BaseBytes): void {
		self.battleReportArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let arg1 = data.readUTF();
			let arg2 = data.readByte();
			let arg3 = data.readInt();
			self.battleReportArr.push({ name: arg1, state: arg2, cityID: arg3 })
		}
		GGlobal.control.notify(UIConst.ZSSF_BATTLEREPORT);
	}

	/**10917  打开商城界面 */
	public CG_GuardArea_openShopUI_10917(): void {
		var bates = this.getBytes();
		this.sendSocket(10917, bates);
	}

	public rongyu = 0;
	/**10918 [I-I] 打开商城界面返回 [I:商品idI:已购次数]商品信息L:荣誉*/
	public GC_GuardArea_openShopUI_10918(self: Model_ZSSF, data: BaseBytes): void {
		self.shopData = {};
		self.getShop();
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let arg1 = data.readInt();
			let arg2 = data.readInt();
			self.shopData[arg1] = arg2;
		}
		self.rongyu = data.readLong();
		GGlobal.control.notify(UIConst.ZSSF_SHOP);
	}

	/**10919  购买商品 I:商品id */
	public CG_GuardArea_buyItem_10919(itemID): void {
		var bates = this.getBytes();
		bates.writeInt(itemID);
		this.sendSocket(10919, bates);
	}

	/**10920 B 购买商品返回 B:状态:0-成功,1-失败I:商品idL:荣耀*/
	public GC_GuardArea_buyItem_10920(self: Model_ZSSF, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			let goodsId = data.readInt();
			self.rongyu = data.readLong();
			self.shopData[goodsId]++;
			ViewCommonWarn.text("购买成功");
			GGlobal.control.notify(UIConst.ZSSF_SHOP);
		}
	}
}