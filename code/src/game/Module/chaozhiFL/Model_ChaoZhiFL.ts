class Model_ChaoZhiFL extends BaseModel {
	public constructor() {
		super();
	}

	public shopArr = [];
	public shengjieShop = [];

	// public iconArr;
	// public filterArr(): void {
	// 	let a = this;
	// 	a.iconArr = [];
	// let t = Model_Activity.activityObj[UIConst.CHAOZHIFL];
	// 	if (t) {
	// 		t.forEach(element => {
	// 			a.iconArr.push(element);
	// 		});
	// 	}
	// 	this.add(UIConst.DISCOUNT_SHOP);
	// 	var bool = GGlobal.modelWarToDead.isIn7Days();
	// 	if (bool) {
	// 		this.add(UIConst.WARTODEAD_7IN);
	// 		this.add(UIConst.GROUP_BUY);
	// 		this.add(UIConst.CAILIAOFL_KF);
	// 		this.add(UIConst.YUANBAOFL_KF);
	// 	} else {
	// 		// this.add(UIConst.WARTODEAD_7OUT);
	// 	}
	// 	GGlobal.control.listenonce(Enum_MsgType.KAIFUDAY_UPDATE, this.filterArr, this);
	// }
	// private add(actId) {
	// 	var vo = new Vo_Activity();
	// 	vo.id = actId;
	// 	this.iconArr.push(vo);
	// }

	private checkActivity(id) {
		// let ret = false;
		// if (this.iconArr) {
		// 	for (let i = 0; i < this.iconArr.length; i++) {
		// 		if (this.iconArr[i].id == id) {
		// 			ret = true;
		// 			break;
		// 		}
		// 	}
		// }
		// return ret;
		return !!GGlobal.modelActivity.get(UIConst.CHAOZHIFL, id);
	}

	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		wsm.regHand(2430, a.GC_OPENUI_2430, a);
		wsm.regHand(2432, a.GC_LQ_2432, a);
		wsm.regHand(2952, a.GC_OPENUI_2952, a);
		wsm.regHand(2954, a.GC_LQ_2954, a);

		wsm.regHand(2450, a.GC_OPENUI_2450, a);
		wsm.regHand(2452, a.GC_LQ_2452, a);
		wsm.regHand(3032, a.GC_OPENUI_3032, a);
		wsm.regHand(3034, a.GC_LQ_3034, a);

		wsm.regHand(2500, a.GC_OPEN_CHAOZHI_ZHUANPAN, a);
		wsm.regHand(2502, a.GC_DRAW_CHAOZHI_ZHUANPAN, a);
		wsm.regHand(2504, a.GC_DRAW_CHAOZHI_ZHUANPAN_BOX, a);
		wsm.regHand(2506, a.GC_CHAOZHI_ZHUANPAN_NOTE, a);
		wsm.regHand(2508, a.GC_CHAOZHI_ZHUANPAN_BROADCAST, a);

		wsm.regHand(2632, a.GC_OPEN_DISCOUNTSHOP, a);
		wsm.regHand(2634, a.GC_DISCOUNTSHOP_BUY, a);

		wsm.regHand(4502, a.GC_OPEN_SHENGJIESHOP, a);
		wsm.regHand(4504, a.GC_SHENGJIESHOP_BUY, a);

		//8-28天
		wsm.regHand(4790, a.GC_OPENUI_2450, a);
		wsm.regHand(4792, a.GC_LQ_2452, a);
		wsm.regHand(4770, a.GC_OPEN_DISCOUNTSHOP, a);
		wsm.regHand(4772, a.GC_DISCOUNTSHOP_BUY, a);
	}

	//=============折扣商店
	/**2631	打开界面 */
	public CG_OPEN_DISCOUNTSHOP() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(2631, ba);
	}

	/**2633	购买 I:商品id */
	public CG_DISCOUNTSHOP_BUY(itemId) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(itemId);
		if (ModelEightLock.originalDatas[UIConst.DISCOUNT_SHOP1]) {
			this.sendSocket(4771, ba);
		} else {
			this.sendSocket(2633, ba);
		}
	}

	/**2634	购买返回 B:状态，0：商品不存在，1：成功，2：元宝不足，3：商品已售罄，4：vip等级不足I:商品id */
	public GC_DISCOUNTSHOP_BUY(self: Model_ChaoZhiFL, data: BaseBytes) {
		let result = data.readByte();
		let itemId = data.readInt();
		if (result == 1) {
			ViewCommonWarn.text("购买成功");
			for (let i = 0; i < self.shopArr.length; i++) {
				if (self.shopArr[i].id == itemId) {
					self.shopArr[i].buyNum--;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.DISCOUNT_SHOP);
		}
	}

	/**2632	打开界面返回 [I:商品idI:已购买数量]商品列表 */
	public GC_OPEN_DISCOUNTSHOP(self: Model_ChaoZhiFL, data: BaseBytes) {
		self.shopArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let itemId = data.readInt();
			let buyNum = data.readInt();
			let cfg;
			if (ModelEightLock.originalDatas[UIConst.DISCOUNT_SHOP1]) {
				cfg = Config.offstore3_244[itemId];
			} else {
				if (Model_GlobalMsg.kaifuDay <= 7) {
					cfg = Config.offstore1_244[itemId];
				} else {
					cfg = Config.offstore2_244[itemId];
				}
			}
			cfg.buyNum = buyNum;
			self.shopArr.push(cfg);
		}
		self.shopArr.sort(self.shopSort);
		GGlobal.control.notify(Enum_MsgType.DISCOUNT_SHOP);
	}

	public shopSort(a: any, b: any) {
		return a.wz - b.wz;
	}
	//============

	//=============升阶商店
	/**4501	打开界面 */
	public CG_OPEN_SHENGJIESHOP() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(4501, ba);
	}

	/**4503	购买 I:购买的配置表id */
	public CG_SHENGJIESHOP_BUY(itemId) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(itemId);
		this.sendSocket(4503, ba);
	}

	/**4504	购买返回 B:状态，0：商品不存在，1：成功，2：元宝不足，3：商品已售罄，4：条件未达到I:购买的配置表id */
	public GC_SHENGJIESHOP_BUY(self: Model_ChaoZhiFL, data: BaseBytes) {
		let result = data.readByte();
		let itemId = data.readInt();
		if (result == 1) {
			ViewCommonWarn.text("购买成功");
			for (let i = 0; i < self.shengjieShop.length; i++) {
				if (self.shengjieShop[i].id == itemId) {
					self.shengjieShop[i].buyNum--;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.SHENGJIE_SHOP);
		}
	}

	/**4502	打开界面返回 [I:配置表idI:剩余购买数量,无限等于-1]商店列表 */
	public GC_OPEN_SHENGJIESHOP(self: Model_ChaoZhiFL, data: BaseBytes) {
		self.shengjieShop = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let itemId = data.readInt();
			let buyNum = data.readInt();
			let cfg: any = Config.shengjiestore_301[itemId];
			cfg.buyNum = buyNum;
			self.shengjieShop.push(cfg);
		}
		self.shengjieShop.sort(self.shopSort);
		GGlobal.control.notify(Enum_MsgType.SHENGJIE_SHOP);
	}
	//============

	//==============元宝返利 start
	public sortFun(a, b) {
		return getSort(a) < getSort(b) ? -1 : 1;
		function getSort(arr) {
			let st = arr[1];
			let id = arr[0];
			if (st == 1) {
				return id - 10000;
			} else if (st == 0) {
				return id - 1000;
			} else if (st == 2) {
				return id;
			}
		}
	}
	public yb;//材料数量
	yuanbaoDta = [];
	getYuanBaoCFG() {
		if (ModelEightLock.originalDatas[UIConst.YUANBAOFANLI1]) return Config.ybfl3_735
		if (this.checkActivity(UIConst.YUANBAOFL_KF))
			return Config.ybfl1_735;
		return Config.ybfl2_735;
	}

	//打开界面
	public CG_OPEN_3031() {
		if (this.checkActivity(UIConst.YUANBAOFL_KF)) {
			let ba = this.getBytes();
			this.sendSocket(3031, ba);
		} else {
			GGlobal.modelActivity.CG_OPENACT(UIConst.YUANBAOFANLI);
		}
	}
	/**
	 *  2450 [I-B]-I
	 * 打开界面数据返回 [I:索引idB:奖励状态，0：不可领取，1：可领取，2：已领取]奖励状态列表I:消耗元宝数量
	*/
	private GC_OPENUI_2450(s: Model_ChaoZhiFL, d: BaseBytes) {
		let len = d.readShort();
		s.yuanbaoDta = [];
		for (let a = 0; a < len; a++) {
			s.yuanbaoDta.push([d.readInt(), d.readByte()]);
		}
		s.yuanbaoDta.sort(s.sortFun);
		s.yb = d.readInt();
		GGlobal.control.notify(Enum_MsgType.YUANBAOFANLI);
	}
	/**
	 *  3032 [I-B]-I
	 * 打开界面数据返回 [I:索引idB:奖励状态，0：不可领取，1：可领取，2：已领取]奖励状态列表I:消耗元宝数量
	*/
	private GC_OPENUI_3032(s: Model_ChaoZhiFL, d: BaseBytes) {
		let len = d.readShort();
		s.yuanbaoDta = [];
		for (let a = 0; a < len; a++) {
			s.yuanbaoDta.push([d.readInt(), d.readByte()]);
		}
		s.yuanbaoDta.sort(s.sortFun);
		s.yb = d.readInt();
		GGlobal.control.notify(Enum_MsgType.YUANBAOFL_KF);
	}

	//领取奖励
	public CG_LQ_2451(b) {
		let ba = this.getBytes();
		ba.writeInt(b);
		if (this.checkActivity(UIConst.YUANBAOFL_KF)) {
			this.sendSocket(3033, ba);
		} else {
			this.sendSocket(2451, ba);
		}
	}

	//领取奖励
	public CG_LQ_4791(b) {
		let ba = this.getBytes();
		ba.writeInt(b);
		this.sendSocket(4791, ba);
	}

	/**
	 *  2452  B-I
	 * 领取奖励返回 B:奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取B:奖励id
	*/
	private GC_LQ_2452(s: Model_ChaoZhiFL, d: BaseBytes) {
		let st = d.readByte();
		let id = d.readInt();
		if (st == 1) {
			let arr = s.yuanbaoDta;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i][0] == id) {
					arr[i][1] = 2;
					break;
				}
			}
			s.yuanbaoDta.sort(s.sortFun);
			GGlobal.control.notify(Enum_MsgType.YUANBAOFANLI);
		} else {
			if (st == 0) {
				ViewCommonWarn.text("奖励不存在");
			} else if (st == 2) {
				ViewCommonWarn.text("不可领取");
			} else if (st == 3) {
				ViewCommonWarn.text("不可重复领取");
			}
		}
	}
	/**
	 *  3034  B-I
	 * 领取奖励返回 B:奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取B:奖励id
	*/
	private GC_LQ_3034(s: Model_ChaoZhiFL, d: BaseBytes) {
		let st = d.readByte();
		let id = d.readInt();
		if (st == 1) {
			let arr = s.yuanbaoDta;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i][0] == id) {
					arr[i][1] = 2;
					break;
				}
			}
			s.yuanbaoDta.sort(s.sortFun);
			GGlobal.control.notify(Enum_MsgType.YUANBAOFL_KF);
		} else {
			if (st == 0) {
				ViewCommonWarn.text("奖励不存在");
			} else if (st == 2) {
				ViewCommonWarn.text("不可领取");
			} else if (st == 3) {
				ViewCommonWarn.text("不可重复领取");
			}
		}
	}

	//==============元宝返利 end
	//==============材料返利 start
	public cl;//材料数量
	public cailiaoACID;
	cailiaoDta = [];
	getCailiaoCFG() {
		if (this.checkActivity(UIConst.CAILIAOFL_KF))
			return Config.clfl1_736;
		return Config.clfl2_736;
	}
	//打开界面
	public CG_OPEN_2951() {
		if (this.checkActivity(UIConst.CAILIAOFL_KF)) {
			let ba = this.getBytes();
			this.sendSocket(2951, ba);
		} else {
			GGlobal.modelActivity.CG_OPENACT(UIConst.CAILIAOFANLI);
		}
	}
	/**
	 *  2430 [I-B]-I
	 * 打开界面返回 [I:索引idB:奖励状态，1：可领取，2：已领取]奖励状态列表I:消耗材料个数
	*/
	private GC_OPENUI_2430(s: Model_ChaoZhiFL, d: BaseBytes) {
		let len = d.readShort();
		s.cailiaoDta = [];
		for (let a = 0; a < len; a++) {
			s.cailiaoDta.push([d.readInt(), d.readByte()]);
		}
		s.cailiaoDta = s.cailiaoDta.sort(s.sortFun);
		s.cl = d.readInt();
		GGlobal.control.notify(Enum_MsgType.CAILIAOFANLI);
	}
	/**
	 *  2952 [I-B]-I
	 * 打开界面返回 [I:索引idB:奖励状态，1：可领取，2：已领取]奖励状态列表I:消耗材料个数
	*/
	private GC_OPENUI_2952(s: Model_ChaoZhiFL, d: BaseBytes) {
		let len = d.readShort();
		s.cailiaoDta = [];
		for (let a = 0; a < len; a++) {
			s.cailiaoDta.push([d.readInt(), d.readByte()]);
		}
		s.cailiaoDta = s.cailiaoDta.sort(s.sortFun);
		s.cl = d.readInt();
		GGlobal.control.notify(Enum_MsgType.CAILIAOFL_KF);
	}

	//领取奖励
	public CG_LQ_2431(b) {
		let ba = this.getBytes();
		ba.writeInt(b);
		if (this.checkActivity(UIConst.CAILIAOFL_KF)) {
			this.sendSocket(2953, ba);
		} else {
			this.sendSocket(2431, ba);
		}
	}
	/**
	 *  2432  B-I
	 * 领取奖励返回 B:奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取B:奖励id
	*/
	private GC_LQ_2432(s: Model_ChaoZhiFL, d: BaseBytes) {
		let st = d.readByte();
		let id = d.readInt();
		if (st == 1) {
			let arr = s.cailiaoDta;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i][0] == id) {
					arr[i][1] = 2;
					break;
				}
			}
			s.cailiaoDta.sort(s.sortFun);
			GGlobal.control.notify(Enum_MsgType.CAILIAOFANLI);
		} else {
			if (st == 0) {
				ViewCommonWarn.text("奖励不存在");
			} else if (st == 2) {
				ViewCommonWarn.text("不可领取");
			} else if (st == 3) {
				ViewCommonWarn.text("不可重复领取");
			}
		}
	}
	/**
	 *  2954  B-I
	 * 领取奖励返回 B:奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取B:奖励id
	*/
	private GC_LQ_2954(s: Model_ChaoZhiFL, d: BaseBytes) {
		let st = d.readByte();
		let id = d.readInt();
		if (st == 1) {
			let arr = s.cailiaoDta;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i][0] == id) {
					arr[i][1] = 2;
					break;
				}
			}
			s.cailiaoDta.sort(s.sortFun);
			GGlobal.control.notify(Enum_MsgType.CAILIAOFL_KF);
		} else {
			if (st == 0) {
				ViewCommonWarn.text("奖励不存在");
			} else if (st == 2) {
				ViewCommonWarn.text("不可领取");
			} else if (st == 3) {
				ViewCommonWarn.text("不可重复领取");
			}
		}
	}

	//==============材料返利

	public static drawNum = 0;
	public static costNum = 0;
	/**0：不可领取，1：可领取，2：已领取 */
	public static boxArr = [];
	public static noteArr = [];
	public static broadcastArr = [];
	public static zpRewardArr = [];
	public static zpSkipTween = false;
	
	/**2500 打开界面返回 I:剩余抽奖次数I:消费值[B:宝箱状态，0：不可领取，1：可领取，2：已领取]宝箱状态列表[U:玩家姓名I:道具id]获奖公告列表  */
	public GC_OPEN_CHAOZHI_ZHUANPAN(self: Model_ChaoZhiFL, data: BaseBytes) {
		Model_ChaoZhiFL.drawNum = data.readInt();
		Model_ChaoZhiFL.costNum = data.readInt();
		Model_ChaoZhiFL.boxArr = [];
		Model_ChaoZhiFL.broadcastArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			Model_ChaoZhiFL.boxArr.push(data.readByte());
		}
		for (let i = 0, len = data.readShort(); i < len; i++) {
			Model_ChaoZhiFL.broadcastArr.push(data.readFmt(["U", "I"]));
		}
		GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN);
	}

	/**2501 抽奖 B:抽奖类型，1:1次，10:10次  */
	public CG_DRAW_CHAOZHI_ZHUANPAN(type) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(2501, ba);
	}
	/**2502 抽奖返回 B:状态：1：成功，2：抽奖次数不足[B:奖品类型I:奖品idI:奖品数量B:是否大奖，0：不是，1：是]抽取的奖品列表B:抽奖类型返回  */
	public GC_DRAW_CHAOZHI_ZHUANPAN(self: Model_ChaoZhiFL, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let arr = [];
			for (let i = 0, len = data.readShort(); i < len; i++) {
				let vo = ConfigHelp.parseItemBa(data);
				let isReward = data.readByte();
				arr.push(vo);
				if (Model_ChaoZhiFL.noteArr.length >= 10) Model_ChaoZhiFL.noteArr.pop();
				Model_ChaoZhiFL.noteArr.unshift(vo);
			}
			Model_ChaoZhiFL.zpRewardArr = arr;
			let drawIndex = data.readByte();
			Model_ChaoZhiFL.drawNum -= drawIndex;
			GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN);
			GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN_SHOWEFF);
		}
	}

	/**2503 领取宝箱奖励 I:宝箱id，从1开始  */
	public CG_DRAW_CHAOZHI_ZHUANPAN_BOX(boxId) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(boxId);
		this.sendSocket(2503, ba);
	}

	/**2504 领取宝箱奖励返回 B:状态，0：奖励不存在，1：成功，2：未达到条件，3：不可重复领取I:宝箱id返回  */
	public GC_DRAW_CHAOZHI_ZHUANPAN_BOX(self: Model_ChaoZhiFL, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let boxId = data.readInt();
			Model_ChaoZhiFL.boxArr[boxId - 1] = 2;
			GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN);
		}
	}

	/**2505  抽奖记录   */
	public CG_CHAOZHI_ZHUANPAN_NOTE() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(2505, ba);
	}

	/**2506 抽奖记录返回 [I:抽奖获得的道具idI:数量]抽奖记录列表  */
	public GC_CHAOZHI_ZHUANPAN_NOTE(self: Model_ChaoZhiFL, data: BaseBytes) {
		for (let i = 0, len = data.readShort(); i < len; i++) {
			Model_ChaoZhiFL.noteArr.push(data.readFmt(["I", "I"]));
		}
		GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN);
	}

	/**2508 在线推送获奖公告 [U:玩家姓名I:道具id]获奖公告列表  */
	public GC_CHAOZHI_ZHUANPAN_BROADCAST(self: Model_ChaoZhiFL, data: BaseBytes) {
		for (let i = 0, len = data.readShort(); i < len; i++) {
			if (Model_ChaoZhiFL.broadcastArr.length >= 3) Model_ChaoZhiFL.broadcastArr.shift();
			Model_ChaoZhiFL.broadcastArr.push(data.readFmt(["U", "I"]));
		}
		GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN);
	}
	//==============材料返利
}