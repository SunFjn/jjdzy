class HomeModel extends BaseModel {
	public constructor() {
		super();
	}
	//更新场景NPC数据模型
	static HOME_SCENE_UPDATE = "HOME_SCENE_UPDATE";
	//家园内系统UI数据变更统一派发
	static HOME_UI_DATA_UPDATE = "HOME_UI_DATA_UPDATE";
	//家园内系统UI数据变更统一派发 UI操作返回
	static HOME_UI_DATA_RE = "HOME_UI_DATA_RE";
	//献祭数据
	static BAG_UPDATE = "BAG_UPDATE";
	//抽奖返回
	static CHOUJIANG_RE = "CHOUJIANG_RE";

	//侍女welcom
	static HOME_UI_MAID_SHOW = "home_ui_maid_show";

	//家园内 装饰 类型 默认为初始ID
	static MONEY_TREE = 100001;//摇钱树
	static TIANGONGLU = 101001;//天工炉
	static GOD_HOUSE = 102001;//金库

	static NPC_MONEYTREE = 350004;
	static NPC_TGL = 350005;
	static NPC_JINKU = 350006;//金库
	static NPC_PF = 350103;//屏风
	static NPC_PF2 = 350106;//屏风2
	static NPC_DESK = 350101;//桌子1
	static NPC_DESK2 = 350104;//桌子2
	static NPC_BAD = 350102;//床
	static NPC_BAD2 = 350105;//床2

	static HOME_YARD_MAP = 500001;//院子
	static HOME_HAIL_MAP = 500002;//客厅

	static JIADING = 350301;//家丁

	//0不在家园 1在院子 2在客厅
	static inHome = 0;

	home_masterID = 0;//家园主人id
	home_masterName = "";//家园主人名字
	home_masterHead = 0;//家园主人头像
	home_masterheadGrid = 0;//家园主人头像框
	home_masterLevel = 0;//家园主人等级
	home_level = 0;//家园等级
	home_type = 0;//家园类型档次
	home_maid = 0;//家园侍女
	home_exp = 0;//家园繁荣度
	god_awards = 0;//金库存贮的府邸比
	nextGetMoneyTime = 0;//下次领取府邸币的时间

	remaindEventAward = 0;//剩余的随机事件次数
	helpTime = 0;//可帮助事件次数

	public static isTimeIn() {
		const date = new Date(Model_GlobalMsg.getServerTime());
		const beginDate = new Date(Model_GlobalMsg.getServerTime());
		beginDate.setHours(23, 55, 0);
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

	//天工炉积分
	score = 0;
	//天工炉次数
	lucky_count = 0;

	/**商店表数据  已购买次数 */
	shopData: { cfg: Ifdshop_019, buyNum: number }[] = [];//商店数据

	//摇钱树时间
	nextHitTreeTime = 0;
	//天工炉已抽奖次数drawAwardTimesL
	//家具等级数据
	furnitureData = {}
	//家园排行榜
	homeRank_data: { rank: number, id: number, name: string, head: number, headGrid: number, level: number, homeLv: number, homeType: number, event: number }[] = [];
	maxPage = 1;
	currentPage = 1;
	myRank = 0;
	/**建筑数据*/
	builddata: { id: number, state: number }[] = [];
	logdata: any[] = [];

	get getHomeType() {
		let cfg = Config.fddc_019[this.home_type];
		return cfg ? cfg.name : "";
	}

	get isCanCollect() {
		let self = this;
		let per = ConfigHelp.getSystemNum(7114);
		return self.god_awards > per / 100 * self.getGodMoneyMax();
	}

	//通过家具ID获取对应NPCID
	getNpcIDbyJiaJU(id) {
		let realid = id - (id % 100) + 1;
		return Config.zsfl_019[realid].npc;
	}

	//通过NPC表的ID找到家具应该显示的数据 模型和名字
	static getFurnitureLevelByNpcId(id) {
		let ret;
		const model = GGlobal.homemodel;
		let buildType = HomeModel.getBuildType(id);
		if (buildType) {
			ret = model.getBuildCfgIDByType(buildType)
		}
		return ret;
	}

	static getBuildType(id) {
		let ret;
		const model = GGlobal.homemodel;
		let buildType = 0;
		for (let i in Config.zsfl_019) {
			if (Config.zsfl_019[i].npc == id + "") {
				buildType = Config.zsfl_019[i].zslx;
				break;
			}
		}
		return buildType;
	}

	//获取当前金库可以获得最大时间的家园币的数量
	getGodMoneyMax() {
		let id = this.getBuildCfgIDByType(HomeModel.NPC_JINKU);
		if (!id) {
			return 0;
		}
		let a = Config.fdjk_019[id];
		let homelib = Config.fddc_019[this.home_type];
		return a.cishu * (JSON.parse(homelib.zengjia)[0][2]) / 600;
	}


	get isSelfHome() {
		return Model_player.voMine.id == this.home_masterID;
	}

	//获取玩家身上的事件
	getRoleEventState(id) {
		let ret = 0;
		for (let i = 0; i < this.builddata.length; i++) {
			let data = this.builddata[i];
			let cfg = Config.fdsjsj_019[data.id];
			let npcid = this.getNpcIDbyJiaJU(cfg.guanlian);
			if (id == npcid) {
				ret = data.state;
				break;
			}
		}
		return ret;
	}

	public pushLog() {

	}

	public isHomeMonster(id) {
		let cfg = Config.fdqd_019;
		for (let i in cfg) {
			if (cfg[i].id == id) {
				return true;
			}
		}
		return false;
	}

	//通过NPCID获取此NPC身上的随机事件的状态
	getEventByNpcID(id) {
		let ret = 0;
		for (let i = 0; i < this.builddata.length; i++) {
			let data = this.builddata[i];
			let cfg = Config.fdsjsj_019[data.id];
			let npcid = this.getNpcIDbyJiaJU(cfg.guanlian);
			if (id == npcid) {
				ret = data.state ? data.id : 0;
				break;
			}
		}
		return ret;
	}

	//府邸是否已经达到最高级
	public get isTopLevel() {
		let ret = Config.fdsj_019[this.home_level + 1]
		return !ret;
	}
	//府邸是否已经达到最高档次
	public get isTopStar() {
		let ret = Config.fddc_019[this.home_type + 1]
		return !ret;
	}

	//当前府邸 装饰可升级的最高等级
	public get buildTopLvel() {
		let cfg = Config.fdsj_019[this.home_level];
		return cfg.zhuangshi;
	}

	//当前模型是不是这类家具的最高模型
	public static getModelID(id) {
		let cfg = Config.fdzssj_019;
		let lib = cfg[id];
		let currentMD = lib.moxing;
		let currenttype = lib.zslx;
		for (let i = 0; i < 40; i++) {
			if (cfg[id + i]) {
				if (cfg[id + i].zslx == currenttype) {
					if (cfg[id + i].moxing != currentMD) {
						return cfg[id + i].moxing;
					}
				}
			} else {
				return 0;
			}
		}
		return 0;
	}

	//销毁上个房子的数据
	destory() {
		const self = this;
		self.home_masterID = 0;//家园主人id
		self.home_masterName = "";//家园主人名字
		self.home_masterHead = 0;//家园主人头像
		self.home_masterheadGrid = 0;//家园主人头像框
		self.home_masterLevel = 0;//家园主人等级
		self.home_level = 0;//家园等级
		self.home_type = 0;//家园类型档次
		self.home_exp = 0;//家园繁荣度
		//摇钱树时间
		self.nextHitTreeTime = 0;
		//天工炉已抽奖次数drawAwardTimesL
		self.lucky_count = 0;
		self.furnitureData = [];
	}

	public test(sceneId) {
		let self = ModelArpgMap.getInstance();
		let posX: number = 500;
		let posY: number = 500;
		self.sceneMap = sceneId;
		let cfg = self.mapCfg();
		var map: Imap_200 = cfg[sceneId];
		self.sceneMapSRC = map.s;
		self.sceneType = map.severtype;
		ARPGSceneController.enter();
		GameUnitManager.hero.setXY(posX, posY);
		GameUnitManager.hero.isOnJumpPoint = false;
		let url = "";
		GameUnitManager.removePlayerNpc();
		ArpgMap.getInstance().disposeByChangeScene();
		self.sceneMap = sceneId;
		let mapDes = map.name;
		GGlobal.layerMgr.open(UIConst.ARPG_SCENEVIEW, mapDes);
		url = RESManager.getVersionUrl("resource/map/" + map.s + "/clientSceneFile.bin");
		RES.getResByUrl(url, self.onMapLoadComplete, self, RES.ResourceItem.TYPE_BIN);
		SoundManager.getInstance().playBGM(map.b);
	}

	public static getFurnitureLevel(id) {
		if (Config.fdzssj_019[id]) {
			return Config.fdzssj_019[id].zsdj;
		}
		return 0;
	}

	//天工炉 物品选择
	//type 0 取消 1选择
	optArr = [];
	bagdata = [];
	public selectItemInTianGong(id, count, type) {
		const self = this;
		if (type == 0) {
			for (let i = 0; i < self.optArr.length; i++) {
				let item = self.optArr[i];
				if (item[0] == id) {
					self.optArr.splice(i, 1);
					break;
				}
			}
		} else {
			let hasOpt = 0;
			for (let i = 0; i < self.optArr.length; i++) {
				let item = self.optArr[i];
				if (item[0] == id) {
					hasOpt = 1;
					item[1] = count;
					break;
				}
			}
			if (!hasOpt) {
				self.optArr.push([id, count]);
			}
		}
		GGlobal.control.notify(HomeModel.HOME_UI_DATA_UPDATE);
	}

	public allIn() {
		const self = this;
		self.optArr = [];
		let list = self.bagdata;
		for (let i = 0; i < list.length; i++) {
			let item: VoItem = list[i];
			self.optArr.push([item.id, item.count]);
		}
		GGlobal.control.notify(HomeModel.HOME_UI_DATA_UPDATE);
	}

	public buildTianGongBagData() {
		this.bagdata = Model_Bag.filterItems(function (vo: IGridImpl) {
			return vo.cfg.tgjf > 0;
		});
		this.bagdata = this.bagdata.concat(Model_Bag.filterGems(function (vo: IGridImpl) {
			return vo.cfg.tgjf > 0;
		}));
	}

	//根据类型获取家园建筑等级
	public getBuildCfgIDByType(t) {
		return this.furnitureData[t];
	}

	public checkHomeLevelUp_Condition() {
		let ret = false;
		let self = this;
		ret = self.checkHomeLevel();
		if (!ret) {
			ret = self.checkHomeType();
		}
		return ret;
	}

	public checkHomeLevel() {
		let ret = false;
		let self = this;
		let isfull = self.isTopLevel;
		if (!isfull) {
			let level = self.home_level;
			level = level ? level : 1;
			let levelLib = Config.fdsj_019[level];
			let items = JSON.parse(levelLib.xiaohao);
			let itemID = items[0][1];
			let itemCount = Model_Bag.getItemCount(itemID);
			ret = itemCount >= items[0][2] ? true : false;
		}
		return ret;
	}

	public checkHomeType() {
		const self = this;
		let ret = false;
		if (!self.isTopStar) {
			let star = self.home_type;
			star = star ? star : 1;
			let lib = Config.fddc_019[star];
			let levelUpCost = JSON.parse(lib.xiaohao);
			ret = Model_player.voMine.yuanbao >= levelUpCost[0][2];
		}
		return ret;
	}

	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		self.socket = mgr;
		//注册GC方法
		mgr.regHand(11102, self.GC_House_gotoYard_11102, self);
		mgr.regHand(11104, self.GC_House_outHouse_11104, self);
		mgr.regHand(11106, self.GC_House_upHouseLv_11106, self);
		mgr.regHand(11108, self.GC_House_upHouseDc_11108, self);
		mgr.regHand(11110, self.GC_House_upDecorateLv_11110, self);
		mgr.regHand(11112, self.GC_House_shakeTree_11112, self);
		mgr.regHand(11114, self.GC_House_harvestMoney_11114, self);
		mgr.regHand(11116, self.GC_House_drawAward_11116, self);
		mgr.regHand(11118, self.GC_House_sacrifice_11118, self);
		mgr.regHand(11120, self.GC_House_gotoRoom_11120, self);
		mgr.regHand(11122, self.GC_House_rank_11122, self);
		mgr.regHand(11124, self.GC_House_event_11124, self);
		mgr.regHand(11126, self.GC_House_changEvent_11126, self);
		mgr.regHand(11128, self.GC_House_fight_11128, self);
		mgr.regHand(11130, self.GC_House_fightResult_11130, self);
		mgr.regHand(11132, self.GC_House_god_11132, self);
		mgr.regHand(11134, self.GC_House_log_11134, self);
		mgr.regHand(11402, self.GC_OPEN_SHOP_11402, self);
		mgr.regHand(11406, self.GC_SHOP_BUY_11406, self);
		mgr.regHand(11136, self.GC_DATA_11136, self);
	}

	/**11401  CG打开商店ui  */
	public CG_OPEN_SHOP_11401() {
		let ba = new BaseBytes();
		this.sendSocket(11401, ba);
	}

	/**11402 GC 打开商店返回 I:府邸货币[B:商品位置索引序号（0-5）I:商品idI:已经购买次数]  */
	public GC_OPEN_SHOP_11402(self: HomeModel, data: BaseBytes) {
		Model_player.voMine.homeMoney = data.readInt();
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let index = data.readByte();
			let shopID = data.readInt();
			let buyNum = data.readInt();
			let cfg = Config.fdshop_019[shopID];
			self.shopData[index] = { cfg: cfg, buyNum: buyNum };
		}
		GGlobal.control.notify(UIConst.HOME_SHOP);
	}

	/**11403  CG 重置商店商品   */
	public CG_SHOP_RESET_11403() {
		let ba = new BaseBytes();
		this.sendSocket(11403, ba);
	}

	/**11405 CG购买商店商品 B:商品序号（0-5）  */
	public CG_SHOP_BUY_11405(index) {
		let ba = new BaseBytes();
		ba.writeByte(index);
		this.sendSocket(11405, ba);
	}

	/**11406 GC 购买返回 B:0成功 1货币不足 2次数不足B:商品序号I: 府邸货币  */
	public GC_SHOP_BUY_11406(self: HomeModel, data: BaseBytes) {
		let result = data.readByte();
		let index = data.readByte();
		if (result == 0) {
			Model_player.voMine.homeMoney = data.readInt();
			self.shopData[index].buyNum++;
			GGlobal.control.notify(UIConst.HOME_SHOP);
		}
	}
	/**11101 L 进入院子 L:角色idheroId*/
	public CG_House_gotoYard_11101(arg1): void {
		if (!ModuleManager.isOpen(UIConst.HOME, true)) {
			return;
		}
		var bates = this.getBytes();
		bates.writeLong(arg1);
		this.sendSocket(11101, bates, false);
	}

	private isFirst = 0;
	private showHomeTip = 1;
	/**11102 B-L-U-I-I-L-I-I-[I-I]-I-I-L-L 进入院子返回 B:状态:0-成功,1-失败L:角色idU:角色名字I:角色头像I:角色头像框I:角色等级L:繁荣度I:府邸等级I:府邸档次[I:装饰idI:装饰等级(对应升级表id)]装饰信息
	 * I:上一次摇树时间I:天工炉已抽奖次数L:天工炉积分L:金库储存府邸币[I:事件idI:事件状态]事件信息*/
	public GC_House_gotoYard_11102(self: HomeModel, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			if (!self.isFirst) {
				self.isFirst = 1;
				GGlobal.modelHouseKeeper.CG_HouseKeeper_openUI_11351();
			}

			HomeModel.inHome = 1;
			self.home_masterID = data.readLong();
			self.home_masterName = data.readUTF();
			self.home_masterHead = data.readInt();
			self.home_masterheadGrid = data.readInt();
			self.home_masterLevel = data.readInt();
			self.home_exp = data.readLong();
			self.home_level = data.readInt();
			self.home_type = data.readInt();
			let len = data.readShort();
			self.furnitureData = {};
			for (let i = 0; i < len; i++) {
				let id = data.readInt();
				self.furnitureData[id] = data.readInt();
			}
			self.nextHitTreeTime = data.readInt() * 1000;
			self.lucky_count = data.readInt();
			self.score = data.readLong();
			self.god_awards = data.readLong();

			len = data.readShort();
			self.builddata = [];
			for (let i = 0; i < len; i++) {
				let obj: any = {};
				obj.id = data.readInt();
				obj.state = data.readInt();
				self.builddata.push(obj);
			}
			self.nextGetMoneyTime = data.readInt() * 1000;
			self.remaindEventAward = data.readInt();
			self.helpTime = data.readInt();
			Model_player.voMine.homeMoney = data.readLong();
			GGlobal.modelHouseKeeper.jdID = data.readInt();
			self.home_maid = data.readInt();
			// let showHomeTip = data.readByte();
			if (self.showHomeTip) {
				if (Model_player.isMineID(self.home_masterID)) {
					self.warn("欢迎来到府邸");
				} else {
					let CFG = Config.fddc_019[self.home_type];
					GGlobal.layerMgr.open(UIConst.MAP, { "mapName": "<font color='#0bf442'>" + self.home_masterName + "</font><font color='#ffffff'>的" + CFG.name + "</font>", "stroke": 1 });
					self.warn("欢迎来到<font color='#0bf442'>" + self.home_masterName + "</font>的府邸");
				}
			}
			self.showHomeTip = 1;
			self.lucky_count;
			self.notifyGlobal(HomeModel.HOME_UI_MAID_SHOW);
			self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
			GGlobal.layerMgr.open(UIConst.SCENELOADING);
		} else {
			self.warn("进入家园失败");
		}
	}

	/**11103  退出府邸 */
	public CG_House_outHouse_11103(): void {
		var bates = this.getBytes();
		this.sendSocket(11103, bates);
		HomeModel.inHome = 0;
		GGlobal.layerMgr.close2(UIConst.MAP);
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
	}

	/**11104 B 退出府邸返回 B:状态:0-成功,1-失败state*/
	public GC_House_outHouse_11104(self: HomeModel, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			self.destory();
		} else {
			self.warn("退出家园失败");
		}
	}

	/**11105  升级府邸等级 */
	public CG_House_upHouseLv_11105(): void {
		var bates = this.getBytes();
		this.sendSocket(11105, bates);
	}

	/**11106 B 升级府邸等级返回 B:状态:0-成功,1-失败state*/
	public GC_House_upHouseLv_11106(self: HomeModel, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			self.home_level = data.readInt();
			self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
		} else {
			if (result == 1) {
				self.warn("配置不存在");
			} else if (result == 2) {
				self.warn("已达最高等级");
			} else if (result == 3) {
				self.warn("繁荣度不足");
			} else if (result == 4) {
				self.warn("货币不足");
			} else if (result == 5) {
				self.warn("府邸档次不足");
			}
		}
	}

	/**11107  升级府邸档次 */
	public CG_House_upHouseDc_11107(): void {
		var bates = this.getBytes();
		this.sendSocket(11107, bates);
	}

	/**11108 B 升级府邸档次返回 B:状态:0-成功,1-失败state*/
	public GC_House_upHouseDc_11108(self: HomeModel, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			self.warn("府邸提升档次完毕，请重新进入");
			HomeManager.leavelHome();
		} else {
			if (result == 1) {
				self.warn("配置不存在");
			} else if (result == 2) {
				self.warn("已达最高档次");
			} else if (result == 3) {
				self.warn("府邸等级不足");
			} else if (result == 4) {
				self.warn("货币不足");
			}
		}
	}

	/**11109 I 升级装饰等级 I:装饰类型type*/
	public CG_House_upDecorateLv_11109(arg1): void {
		let cfgid = this.getBuildCfgIDByType(arg1)
		let level = this.buildTopLvel;
		if (Config.fdzssj_019[cfgid].zsdj >= level) {
			this.warn("府邸等级不足");
			return;
		}

		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(11109, bates);
	}

	/**11110 B 升级装饰等级返回 B:状态:0-成功,1-失败state*/
	public GC_House_upDecorateLv_11110(self: HomeModel, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			let type = data.readInt();
			self.furnitureData[type] = data.readInt();
			self.lucky_count;
			self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
			self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
		} else if (result == 1) {
			self.warn("参数错误");
		} else if (result == 2) {
			self.warn("配置不存在");
		} else if (result == 3) {
			self.warn("已达最高等级");
		} else if (result == 4) {
			self.warn("府邸配置不存在");
		} else if (result == 5) {
			self.warn("府邸等级不足");
		} else if (result == 6) {
			self.warn("材料不足");
		}
	}

	/**11111  摇钱行为 */
	public CG_House_shakeTree_11111(): void {
		var bates = this.getBytes();
		this.sendSocket(11111, bates);
	}

	/**11112 B 摇钱行为返回 B:状态:0-成功,1-冷却中,2-数据异常,3-配置不存在,4-府邸配置不存在,5-府邸等级不足*/
	public GC_House_shakeTree_11112(self: HomeModel, data: BaseBytes): void {
		let result = data.readByte();
		switch (result) {
			case 0:
				self.nextHitTreeTime = data.readInt() * 1000;
				self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
				break;
			case 1:
				self.warn("CD冷却中");
				break;
			case 2:
				self.warn("数据异常");
				break;
			case 3:
				self.warn("配置不存在");
				break;
			case 4:
				self.warn("府邸配置不存在");
				break;
			case 5:
				self.warn("府邸档次不足");
				break;
		}
	}

	/**11113  收获府邸币 */
	public CG_House_harvestMoney_11113(): void {
		var bates = this.getBytes();
		bates.writeLong(this.home_masterID);
		this.sendSocket(11113, bates);
	}

	/**11114 收获府邸币返回 B:状态:0-成功,1-金库为空I:下次可领府邸币时间I:顺走数量I:减免数量*/
	public GC_House_harvestMoney_11114(self: HomeModel, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			self.nextGetMoneyTime = data.readInt() * 1000;
			let add = data.readInt();
			let def = data.readInt();
			self.god_awards = self.god_awards - add + def;
			if (def) {
				GGlobal.layerMgr.open(UIConst.HOME_JIADING_UI, [add, def])
			}
			self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
			self.warn("收获成功");
		} else if (result == 1) {
			self.warn("金库为空");
		} else if (result == 2) {
			self.warn("金库偷窃冷却中");
		} else if (result == 3) {
			self.warn("府邸币太少了，下不了手");
		}
	}

	/**11115  天工炉抽奖 */
	public CG_House_drawAward_11115(): void {
		var bates = this.getBytes();
		bates.writeLong(this.home_masterID);
		this.sendSocket(11115, bates);
	}

	/**11116 B-B-I-I 天工炉抽奖返回 B:状态:0-成功,1-失败stateB:物品类型iTypeI:物品idiIdI:物品数量iCount*/
	public GC_House_drawAward_11116(self: HomeModel, data: BaseBytes): void {
		let ret = data.readByte();
		if (ret == 0) {
			let type = data.readByte();
			let id = data.readInt();
			let count = data.readInt();
			self.score = data.readLong();
			self.lucky_count = data.readInt();
			self.notifyGlobal(HomeModel.CHOUJIANG_RE, [type, id, count]);
		} else {
			if (ret == 1) {
				self.warn("配置不存在");
			} else if (ret == 2) {
				self.warn("积分不足");
			} else if (ret == 3) {
				self.warn("数据异常");
			} else if (ret == 4) {
				self.warn("天工炉配置不存在");
			} else if (ret == 5) {
				self.warn("今日已无抽取次数");
			}
		}
	}

	/**11117 [B-I-I] 天工炉献祭 [B:物品类型I:物品idI:物品数量]献祭物品信息itemInfo*/
	public CG_House_sacrifice_11117(): void {
		var len = this.optArr.length;
		if (len == 0) {
			this.warn("请添加物品");
			return;
		}
		var bates = this.getBytes();
		bates.writeShort(len);
		for (let i = 0; i < len; i++) {
			let items = this.optArr[i];
			bates.writeByte(1);
			bates.writeInt(items[0]);
			bates.writeInt(items[1]);
		}
		this.sendSocket(11117, bates);
	}

	/**11118 B 天工炉献祭返回 B:状态:0-成功,1-配置不存在,2-物品不能献祭,3-物品不足*/
	public GC_House_sacrifice_11118(self: HomeModel, data: BaseBytes): void {
		let result = data.readByte();
		switch (result) {
			case 0:
				self.warn("献祭成功");
				self.bagdata = [];
				self.optArr = [];
				self.score = data.readLong();
				self.buildTianGongBagData();
				self.notifyGlobal(HomeModel.HOME_UI_DATA_RE);
				break;
			case 1:
				self.warn("配置不存在");
				break;
			case 2:
				self.warn("物品不能献祭");
				break;
			case 3:
				self.warn("物品不足");
				break;
		}
	}

	/**11119 L 进入客厅 L:角色idheroId*/
	public CG_House_gotoRoom_11119(home_masterID): void {
		var bates = this.getBytes();
		bates.writeLong(home_masterID);
		this.sendSocket(11119, bates);
	}

	/**11120 B 进入客厅返回 B:状态:0-成功,1-失败*/
	public GC_House_gotoRoom_11120(self: HomeModel, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			HomeModel.inHome = 2;
		} else {
			self.warn("进入失败");
		}
	}

	public CG_House_rank_11121(): void {
		var bates = this.getBytes();
		this.sendSocket(11121, bates, false);
	}

	//打开排名榜返回 B:状态:0-成功,1-失败I:当前页数I:总页数[I:排名L:玩家idU:玩家名字I:玩家头像I:玩家头像框I:玩家等级I:府邸等级I:府邸档次B:府邸随机事件状态:0-没有,1-叹号]府邸排名
	public GC_House_rank_11122(self: HomeModel, data: BaseBytes): void {
		let ret = data.readByte();
		if (ret == 0) {
			self.homeRank_data = [];
			self.myRank = data.readInt();
			let len = data.readShort();
			self.maxPage = Math.ceil(len / 5);
			for (let i = 0; i < len; i++) {
				let temp: any = {};
				temp.rank = data.readInt();
				temp.id = data.readLong();
				temp.name = data.readUTF();
				temp.head = data.readInt();
				temp.headGrid = data.readInt();
				temp.level = data.readInt();
				temp.homeLv = data.readInt();
				temp.homeType = data.readInt();
				temp.event = data.readByte();
				self.homeRank_data.push(temp);
			}
			self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
		} else {
			self.warn("排行榜数据异常");
		}
	}

	public CG_House_event_11123(id) {
		const self = this;
		if (self.isSelfHome) {
			if (!self.remaindEventAward) {
				self.warn("今日次数已用完");
				return;
			}
		} else {
			if (!self.helpTime) {
				self.warn("今日次数已用完");
				return;
			}
		}

		var bates = this.getBytes();
		bates.writeLong(this.home_masterID);
		bates.writeInt(id);
		this.sendSocket(11123, bates);
	}

	//获取事件奖励返回
	private GC_House_event_11124(self: HomeModel, data: BaseBytes) {
		let ret = data.readByte();
		let id = data.readInt();
		if (ret == 0) {
			let len1 = self.builddata.length;
			let nodata = 1;
			for (let j = 0; j < len1; j++) {
				let item = self.builddata[j];
				if (item.id == id) {
					item.state = 0;
					break;
				}
			}
			if (self.isSelfHome) {
				self.remaindEventAward--;
			} else {
				self.helpTime--;
			}
			self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
			GGlobal.layerMgr.close(UIConst.HOME_EVENT_UI);
			self.warn("领取成功");
		} else {
			if (ret == 1) {
				self.warn("事件不存在");
			} else if (ret == 2) {
				self.warn("配置不存在");
			} else if (ret == 3) {
				self.warn("事件已处理");
			}
		}
	}


	//推送事件变化 L:角色id[I:事件idI:事件状态]事件信息
	private GC_House_changEvent_11126(self: HomeModel, data: BaseBytes) {
		let masterid = data.readLong();
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let len1 = self.builddata.length;
			let id = data.readInt();
			let state = data.readInt();
			let nodata = 1;
			for (let j = 0; j < len1; j++) {
				let item = self.builddata[j];
				if (item.id == id) {
					item.state = state;
					nodata = 0;
					break;
				}
			}

			if (nodata == 1) {
				let opt: any = {};
				opt.id = id;
				opt.state = state;
				self.builddata.push(opt);
			}
		}

		self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
	}

	public CG_House_fight_11127(id) {
		var bates = this.getBytes();
		bates.writeLong(this.home_masterID);
		bates.writeLong(id);
		this.sendSocket(11127, bates);
	}

	//请求挑战强盗返回 B:状态:0-成功,1-失败L:怪物唯一的id
	private GC_House_fight_11128(self: HomeModel, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 0) {
			let serverid = data.readLong();
			HomeBattleCtrl.instance.bossid = serverid;
			let npc: ARPGNpc = GameUnitManager.findUnitByID(serverid);
			HomeBattleCtrl.instance.npcid = npc.cfgID;
			GGlobal.mapscene.enterScene(SceneCtrl.HOME_QD);
			self.showHomeTip = 0;
		} else if (ret == 2) {
			self.warn("强盗正在战斗");
		} else if (ret == 3) {
			self.warn("没有挑战次数");
		} else if (ret == 4) {
			self.warn("已无处理次数");
		}
	}

	public CG_House_fightResult_11129(id, RET = 0) {
		var bates = this.getBytes();
		bates.writeLong(this.home_masterID);
		bates.writeLong(id);
		bates.writeByte(RET);
		this.sendSocket(11129, bates);
	}

	//通知后端挑战强盗结果返回 L:怪物唯一idB:0输了 1赢了[B:物品类型I:物品idI:物品数量]奖励信息
	private GC_House_fightResult_11130(self: HomeModel, data: BaseBytes) {
		let mid = data.readLong();
		let battleResult = data.readByte();
		let awards = [];
		for (var i = 0, len = data.readShort(); i < len; i++) {
			var type = data.readByte();
			var id = data.readInt();
			var count = data.readInt();
			var vo: IGridImpl;
			if (type == Enum_Attr.EQUIP) {
				vo = VoEquip.create(id);
			} else if (type == Enum_Attr.ITEM) {
				vo = VoItem.create(id);
			} else {//货币
				vo = Vo_Currency.create(type);
			}
			vo.count = count;
			awards.push(vo);
		}
		self.notifyGlobal(UIConst.HOME, { "battleResult": battleResult, "awards": awards });
	}

	public CG_House_god_11131() {
		var bates = this.getBytes();
		this.sendSocket(11131, bates);
	}
	//金库数据更新
	private GC_House_god_11132(self: HomeModel, data: BaseBytes) {
		self.god_awards = data.readLong();
		self.nextGetMoneyTime = data.readInt() * 1000;
		self.notifyGlobal(HomeModel.HOME_UI_DATA_RE);
	}

	//打开记录
	public CG_House_log_11133(t) {
		var bates = this.getBytes();
		bates.writeByte(t);
		this.sendSocket(11133, bates);
	}

	//打开记录
	private GC_House_log_11134(self: HomeModel, data: BaseBytes) {
		let len = data.readShort();
		self.logdata = [];
		for (let i = 0; i < len; i++) {
			self.logdata.push([data.readByte(), data.readUTF(), data.readInt(), data.readInt()]);
		}
		self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
	}
	//推送次数变化 I:类型:1-抽奖次数,2-事件次数,3-帮助次数I:次数
	public GC_DATA_11136(self: HomeModel, data: BaseBytes) {
		let type = data.readInt();
		let count = data.readInt();
		switch (type) {
			case 1:
				self.lucky_count = count;
				break;
			case 2:
				self.remaindEventAward = count;
				break;
			case 3:
				self.helpTime = count;
				break;
		}
		self.notifyGlobal(HomeModel.HOME_UI_MAID_SHOW);
	}

	public sendSocket(cmd, ba: BaseBytes, isCross: boolean = true) {
		if (!this.socket.webSocket.connect) {
			this.warn("中央服未连接成功，请退出后重进府邸");
			return;
		}
		this.socket.sendCMDBytes(cmd, ba, isCross);
	}
}