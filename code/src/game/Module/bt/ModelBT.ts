class ModelBT extends BaseModel {
	public constructor() {
		super();
	}
	//超值礼包数据
	czhb_data = {};
	czhb_lib_week = [];
	czhb_lib_mouth = [];
	//万元红包数据
	wyhb_data_lvl = [];
	wyhb_lib_lvl = [];
	totalLvReMoney = 0;//总等级返利
	hasGetLvMoney = 0;//当前领取的等级返利
	wyhb_data_yb = [];
	wyhb_lib_yb = [];
	totalReMoney = 0;//总充值返利
	hasGetMoney = 0;//当前领取的充值返利

	//真实充值金额
	static realRechargeValue = 0;

	initCZHBLib(qs, type) {
		const self = this;
		let temp = [];
		let lib = Config.czlb_781;
		for (let i in lib) {
			let item = lib[i];
			if (item.qs == qs) {
				if (item.type == type) {
					temp.push(item);
				}
			}
		}
		if (type == 1) {
			self.czhb_lib_week = temp;
		} else {
			self.czhb_lib_mouth = temp;
		}
	}

	initHB() {
		const self = this;
		if (self.wyhb_lib_lvl.length) {
			return;
		}
		self.wyhb_lib_lvl = [];
		self.wyhb_lib_yb = [];
		self.totalReMoney = 0;
		self.totalLvReMoney = 0;
		let lib = Config.wyhb_780;
		for (let i in lib) {
			let item = lib[i];
			if (item.type == 1) {
				self.totalLvReMoney += item.show;
				self.wyhb_lib_lvl.push(item);
			} else {
				self.totalReMoney += item.show;
				self.wyhb_lib_yb.push(item);
			}
		}
	}

	checkWYNotice() {
		const self = this;
		let notice0 = false;
		let data = self.wyhb_lib_lvl;
		let mylvl = Model_player.voMine.level;
		let vipexp = ModelBT.realRechargeValue;
		for (let i = 0; i < data.length; i++) {
			let item: Iwyhb_780 = data[i];
			if (self.wyhb_data_lvl.indexOf(item.id) == -1) {
				if (item.limit <= mylvl) {
					notice0 = true;
					break;
				}
			}
		}

		let notice1 = false;
		data = self.wyhb_lib_yb;
		for (let i = 0; i < data.length; i++) {
			let item: Iwyhb_780 = data[i];
			if (self.wyhb_data_yb.indexOf(item.id) == -1) {
				if (item.limit <= vipexp) {
					notice1 = true;
					break;
				}
			}
		}

		GGlobal.reddot.setCondition(UIConst.WYHB_BT, 0, notice1 || notice0);
		GGlobal.reddot.setCondition(UIConst.WYHB_BT, 1, notice0);
		GGlobal.reddot.setCondition(UIConst.WYHB_BT, 2, notice1);
		GGlobal.reddot.notifyMsg(UIConst.WYHB_BT);
	}

	private cacualWYHB() {
		const self = this;
		self.hasGetMoney = 0;
		self.hasGetLvMoney = 0;
		for (let i = 0; i < self.wyhb_data_lvl.length; i++) {
			let item: Iwyhb_780 = Config.wyhb_780[self.wyhb_data_lvl[i]];
			self.hasGetLvMoney += item.show;
		}

		for (let i = 0; i < self.wyhb_data_yb.length; i++) {
			let item: Iwyhb_780 = Config.wyhb_780[self.wyhb_data_yb[i]];
			self.hasGetMoney += item.show;
		}
	}

	private sortWYHB() {
		const self = this;
		self.wyhb_lib_lvl.sort(function (a: Iwyhb_780, b: Iwyhb_780) {
			let aweight = a.id;
			let bweight = b.id;
			if (self.wyhb_data_lvl.indexOf(a.id) != -1) {
				aweight += 100000;
			}
			if (self.wyhb_data_lvl.indexOf(b.id) != -1) {
				bweight += 100000;
			}
			return aweight < bweight ? -1 : 1;
		});
		self.wyhb_lib_yb.sort(function (a: Iwyhb_780, b: Iwyhb_780) {
			let aweight = a.id;
			let bweight = b.id;
			if (self.wyhb_data_yb.indexOf(a.id) != -1) {
				aweight += 100000;
			}
			if (self.wyhb_data_yb.indexOf(b.id) != -1) {
				bweight += 100000;
			}
			return aweight < bweight ? -1 : 1;
		});
	}

	listenServ(sc: WebSocketMgr) {
		let self = this;
		self.socket = sc;
		sc.regHand(20100, self.GC_open_20100, self);
		//超值礼包-BT
		sc.regHand(20002, self.GC_open_20002, self);
		sc.regHand(20004, self.GC_get_20004, self);
		//万元红包-BT
		sc.regHand(20012, self.GC_open_20012, self);
		sc.regHand(20014, self.GC_get_20014, self);
	}

	/**增加活动图标  1开启 2关闭*/
	private GC_open_20100(s: ModelBT, d: BaseBytes) {
		let id = d.readInt();
		let state = d.readByte();
		if (state == 2) {
			GGlobal.mainUICtr.addIcon(id, true);
		} else {
			GGlobal.mainUICtr.removeIcon(id);
		}
	}

	lastTypeCZLB = 1;
	/**打开超值礼包 B:(类型1=周礼包 2=月礼包)*/
	public CG_open_20001(type = 1) {
		let ba = this.getBytes();
		this.lastTypeCZLB = type;
		ba.writeByte(type);
		this.sendSocket(20001, ba);
	}
	/**打开界面返回 [I(id),I(剩余购买次数)]*/
	private GC_open_20002(s: ModelBT, d: BaseBytes) {
		let qs = d.readByte();
		let type = d.readByte();
		let len = d.readShort();
		for (let i = 0; i < len; i++) {
			s.czhb_data[d.readInt()] = d.readInt();
		}
		s.initCZHBLib(qs, type);
		DEBUGWARING.log("超值红包打开数据：" + s.czhb_data);
		s.notifyGlobal(UIConst.CZLB_BT);
	}
	/**购买成功返回*/
	private GC_get_20004(s: ModelBT, d: BaseBytes) {
		let id = d.readInt();
		let lib = Config.czlb_781[id];
		let rewardList = ConfigHelp.makeItemListArr(lib.reward);
		View_BoxReward_Show.show(rewardList, "恭喜您购买" + lib.name + "成功");
		s.CG_open_20001(s.lastTypeCZLB);
	}

	/**打开万元红包 B:(类型1=等级红包 2=充值红包)*/
	public CG_open_20011(type = 1) {
		let ba = this.getBytes();
		ba.writeByte(type);
		this.sendSocket(20011, ba);
	}
	/**打开万元红包 B(类型1=等级红包 2=充值红包)-[S(当前已经领取过的ID)] */
	private GC_open_20012(s: ModelBT, d: BaseBytes) {
		let type = d.readByte();
		ModelBT.realRechargeValue = d.readInt();
		let len = d.readShort();
		let temp = [];
		let isLv = type == 1;
		for (let i = 0; i < len; i++) {
			temp.push(d.readShort());
		}
		if (isLv) {
			s.wyhb_data_lvl = temp;
		} else {
			s.wyhb_data_yb = temp;
		}

		s.sortWYHB();
		s.cacualWYHB();
		s.checkWYNotice();
		DEBUGWARING.log("万元等级红包数据：" + s.wyhb_data_lvl);
		DEBUGWARING.log("万元充值红包打开数据：" + s.wyhb_data_yb);
		s.notifyGlobal(UIConst.WYHB_BT);
	}
	lastid;
	/**领取万元红包 B:(类型1=等级红包 2=充值红包)*/
	public CG_get_20013(id = 1) {
		let ba = this.getBytes();
		ba.writeShort(id);
		this.lastid = id;
		this.sendSocket(20013, ba);
	}
	/**领取奖励 B:领取结果：1成功 2未达条件 3已领取*/
	private GC_get_20014(s: ModelBT, d: BaseBytes) {
		let ret = d.readByte();
		if (ret == 1) {
			s.warn("领取成功");
			let item: Iwyhb_780 = Config.wyhb_780[s.lastid];
			if (item.type == 1){
				s.wyhb_data_lvl.push(s.lastid);
			} else {
				s.wyhb_data_yb.push(s.lastid);
			}
			let lib: Iwyhb_780 = Config.wyhb_780[s.lastid];
			let vogrid = ConfigHelp.makeItemListArr(lib.reward);
			GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, vogrid);
			s.sortWYHB();
			s.cacualWYHB();
			s.checkWYNotice();
			s.notifyGlobal(UIConst.WYHB_BT);
		} else if (ret == 0) {
			s.warn("奖励不存在");
		} else if (ret == 1) {
			s.warn("未达条件");
		} else if (ret == 3) {
			s.warn("不能重复领取");
		}
	}
}