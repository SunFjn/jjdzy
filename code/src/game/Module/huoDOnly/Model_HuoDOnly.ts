class Model_HuoDOnly extends BaseModel {

	public static skipShow = false;//ture 不打开
	public static ON_OFF = false;//true开启，false关闭
	public static add_del_hd = "add_del_hd";//true开启，false关闭

	/**请求某活动数据 I:唯一id*/
	public CG_OPEN_UI(hid) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(hid);
		this.sendSocket(7901, ba);
	}

	public static originalDatas: { [id: number]: Vo_Activity } = {};
	/**返回专属活动数据 [I:唯一idI:开始时间I:结束时间]专属活动数据*/
	private GC_OPEN_UI7900(self: Model_HuoDOnly, bytes: BaseBytes) {
		const len = bytes.readShort();
		const servTime = Model_GlobalMsg.getServerTime() / 1000;
		for (let i = 0; i < len; i++) {
			const sysID = bytes.readInt();
			const start = bytes.readInt();
			const end = bytes.readInt();
			const state = servTime > start && servTime < end ? 1 : 0;
			let cfg = Config.zshdb_315[sysID]
			if (cfg == null) {
				console.error("专属活动id配置缺失" + sysID)
				continue;
			}
			let act: Vo_Activity = Vo_Activity.create();
			act.setData(cfg.type, cfg.hdid, sysID, cfg.qs, start, end)
			act.status = state; //更新活动状态
			if (state == 1) {
				Model_HuoDOnly.originalDatas[sysID] = act;
				console.info("专属活动id开启" + sysID + cfg.name)
			} else {
				if (Model_HuoDOnly.originalDatas[sysID]) {
					delete Model_HuoDOnly.originalDatas[sysID];
				}
				console.info("专属活动id关闭" + sysID + cfg.name)
			}
		}
		Model_HuoDOnly.ON_OFF = (bytes.readByte() == 1 ? true : false);
		GGlobal.control.notify(Enum_MsgType.SEND_HUOD_ONLY_SYSTEM);
		console.info("专属活动开关" + (Model_HuoDOnly.ON_OFF ? "true" : "false"))
		let actlen = Model_HuoDOnly.getActivity().length
		console.info("专属活动长度" + actlen)
	}
	//更新活动状态 B:更新类型：0：结束，1：开启I:分类表唯一idI:系统idI:期数I:开始时间I:结束时间
	private GC_UP_STATUS7902(self: Model_HuoDOnly, bytes: BaseBytes) {
		const sysID = bytes.readInt();
		const start = bytes.readInt();
		const end = bytes.readInt();
		const state = bytes.readByte();
		let cfg = Config.zshdb_315[sysID]
		if (cfg == null) {
			console.error("专属活动id配置缺失" + sysID)
			return;
		}
		let act: Vo_Activity = Vo_Activity.create();
		act.setData(cfg.type, cfg.hdid, sysID, cfg.qs, start, end);
		act.status = state; //更新活动状态
		if (state == 1) {
			Model_HuoDOnly.originalDatas[sysID] = act;
			console.info("更新专属活动id开启" + sysID + cfg.name)
		} else {
			if (Model_HuoDOnly.originalDatas[sysID]) {
				delete Model_HuoDOnly.originalDatas[sysID];
			}
			console.info("更新活动id关闭" + sysID + cfg.name)
		}
		let actlen = Model_HuoDOnly.getActivity().length
		console.info("更新专属活动长度" + actlen)
		self.notify(Model_HuoDOnly.add_del_hd);//活动更新删除
		GGlobal.control.notify(Enum_MsgType.SEND_HUOD_ONLY_SYSTEM);
	}

	private GC_ON_OFF7904(self: Model_HuoDOnly, bytes: BaseBytes) {
		Model_HuoDOnly.ON_OFF = (bytes.readByte() == 1 ? true : false);
		GGlobal.control.notify(Enum_MsgType.SEND_HUOD_ONLY_SYSTEM);
		console.info("更新专属活动开关" + (Model_HuoDOnly.ON_OFF ? "true" : "false"))
	}
	//更新专属活动配置数据 [I:唯一idI:大活动类型I:活动idI:期数U:活动名称U:活动内容U:开始时间U:结束时间]专属活动配置数据
	private GC_ALL_CFG7906(self: Model_HuoDOnly, bytes: BaseBytes) {
		let len = bytes.readShort();
		for (let i = 0; i < len; i++) {
			let v: Izshdb_315 = {
				id: bytes.readInt(),
				type: bytes.readInt(),
				hdid: bytes.readInt(),
				qs: bytes.readInt(),
				name: bytes.readUTF(),
				nr: bytes.readUTF(),
				hstart: bytes.readUTF(),
				hend: bytes.readUTF(),
				wdid: 0,
				vip: 0,
				fwq: 0
			};
			Config.zshdb_315[v.id] = v;
		}
	}

	public static getActivity(): Vo_Activity[] {
		let arr = [];
		for (let keys in Model_HuoDOnly.originalDatas) {
			let v = Model_HuoDOnly.originalDatas[keys];
			arr.push(v);
		}
		return arr;
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		//专属活动数据
		wsm.regHand(7900, a.GC_OPEN_UI7900, a);
		wsm.regHand(7902, a.GC_UP_STATUS7902, a);
		wsm.regHand(7904, a.GC_ON_OFF7904, a);
		wsm.regHand(7906, a.GC_ALL_CFG7906, a);
		//单笔充值
		wsm.regHand(8100, a.GC_DAIONE_OPENUI8100, a);
		wsm.regHand(8102, a.GC_DAIONE_GET8102, a);
		wsm.regHand(8104, a.GC_DAIONE_CFG8104, a);
		//专属商店
		wsm.regHand(8160, a.GC_SHOP_OPENUI8160, a);
		wsm.regHand(8162, a.GC_SHOP_BUY8162, a);
		wsm.regHand(8164, a.GC_SHOP_CFG8164, a);
		//累计充值
		wsm.regHand(8300, a.GC_ADDRECHARGE_OPENUI8300, a);
		wsm.regHand(8302, a.GC_ADDRECHARGE_GET8302, a);
		wsm.regHand(8304, a.GC_ADDRECHARGE_CHARGE8304, a);
		wsm.regHand(8306, a.GC_ADDRECHARGE_CFG8306, a);
		//元宝返利
		wsm.regHand(8330, a.GC_YBFL_UI_8330, a);
		wsm.regHand(8332, a.GC_YBFL_LQ_8332, a);
		wsm.regHand(8334, a.GC_YBFL_CFG_8334, a);
		//单笔返利
		wsm.regHand(8360, a.GCDBFanLi_UI8360, a);
		wsm.regHand(8362, a.GCDBFanLi_Get8362, a);
		wsm.regHand(8364, a.GCDBFanLi_CFG8364, a);
	}

	//单笔充值
	private static _daiOneArr: { [sys: number]: Array<Vo_HuoDong> } = {};
	public static getDaiOneArr(sys): Array<Vo_HuoDong> {
		return Model_HuoDOnly._daiOneArr[sys]
	}

	/**单笔充值 领取奖励 I:活动唯一idI:奖励编号*/
	public CG_DAILYONE_GET(hid, id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(hid);
		ba.writeInt(id);
		this.sendSocket(8101, ba);
	}

	/**单笔充值 打开界面返回 [B:奖励状态，0：未达到，1：可领取，2：已领取]奖励状态列表*/
	private GC_DAIONE_OPENUI8100(self: Model_HuoDOnly, data: BaseBytes) {
		let sys = data.readInt()
		let len = data.readShort();
		Model_HuoDOnly._daiOneArr[sys] = [];
		for (let i = 0; i < len; i++) {
			let v: Vo_HuoDong = new Vo_HuoDong();
			v.readMsgCt(data);
			Model_HuoDOnly._daiOneArr[sys].push(v);
		}
		Model_HuoDOnly._daiOneArr[sys].sort(Model_HuoDong.sortFuc);
		GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_DAIONEA_UI, sys);
	}

	/**单笔充值 领取奖励 B:状态：1：成功，2：未达到，3：重复领取B:领取奖励id*/
	private GC_DAIONE_GET8102(self: Model_HuoDOnly, data: BaseBytes) {
		let sys = data.readInt()
		let v: Vo_HuoDong = new Vo_HuoDong();
		v.readMsgCt(data);
		if (v.id != 0) {
			let arr = Model_HuoDOnly._daiOneArr[sys]
			if (arr == null) {
				Model_HuoDOnly._daiOneArr[sys] = []
				Model_HuoDOnly._daiOneArr[sys].push(v);
			} else {
				for (let i = 0; i < arr.length; i++) {
					let vday = arr[i]
					if (vday.id == v.id) {
						vday.hasCt = v.hasCt
						vday.canCt = v.canCt
						break;
					}
				}
			}
			GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_DAIONEA_UI, sys);
		}
	}
	//更新单笔充值配置表 [I:序号I:期数I:je[B:道具类型I:道具idI:道具数量]I:领取次数]单笔充值配置数据
	private GC_DAIONE_CFG8104(self: Model_HuoDOnly, data: BaseBytes) {
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: Izshddbcz_315 = {
				xh: data.readInt(),
				qs: data.readInt(),
				je: data.readInt(),
				jl: [],
				cs: 0
			};
			let size = data.readShort();
			for (let j = 0; j < size; j++) {
				let itm = [data.readByte(), data.readInt(), data.readInt()];
				v.jl.push(itm);
			}
			v.cs = data.readInt()
			Config.zshddbcz_315[v.xh] = v;
		}
	}

	public static setSkipShow(selected) {
		Model_HuoDOnly.skipShow = selected
		let date: Date = new Date(Model_GlobalMsg.getServerTime());
		let key = "huodonly_" + Model_player.voMine.id + "_" + date.getDay() + "" + date.getMonth() + "" + date.getFullYear();
		let val = Model_HuoDOnly.skipShow ? "1" : "0";
		egret.localStorage.setItem(key, val);
	}

	public static getSkipShow() {
		let date: Date = new Date(Model_GlobalMsg.getServerTime());
		let key = "huodonly_" + Model_player.voMine.id + "_" + date.getDay() + "" + date.getMonth() + "" + date.getFullYear();
		let val = egret.localStorage.getItem(key);
		Model_HuoDOnly.skipShow = val == "1" ? true : false;
		return Model_HuoDOnly.skipShow
	}


	private static _shopArr: { [sys: number]: Array<Vo_Shop> } = {};
	public static getshopArr(sys): Array<Vo_Shop> {
		return Model_HuoDOnly._shopArr[sys]
	}

	/**购买商品 I:活动唯一idI:商品编号*/
	public CG_SHOP_BUY_8161(hid, id) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(hid);
		ba.writeInt(id);
		this.sendSocket(8161, ba);
	}

	/**返回界面信息 I:活动唯一id[I:商品编号I:已购买数量]已购商品数据*/
	private GC_SHOP_OPENUI8160(self: Model_HuoDOnly, data: BaseBytes) {
		let sys = data.readInt()
		let len = data.readShort();
		Model_HuoDOnly._shopArr[sys] = [];
		for (let i = 0; i < len; i++) {
			let v = Vo_Shop.createOnly(data.readInt())
			v.buyNum = data.readInt()
			Model_HuoDOnly._shopArr[sys].push(v);
		}
		GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_Shop_UI);
	}

	/**购买结果返回 I:活动唯一idB:购买结果：0：失败，1：成功I:失败：（1:已达限购次数，2：元宝不足），成功：商品编号I:已购买数量*/
	private GC_SHOP_BUY8162(self: Model_HuoDOnly, data: BaseBytes) {
		let sys = data.readInt()
		let res = data.readByte();
		let id = data.readInt();
		let ct = data.readInt();
		if (res == 1) {
			let arr = Model_HuoDOnly._shopArr[sys];
			if (arr == null) return;
			for (let i = 0; i < arr.length; i++) {
				if (id == arr[i].id) {
					arr[i].buyNum = ct;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_Shop_UI);
		} else {
			ViewCommonWarn.text("购买失败")
		}

	}

	//更新专属商店配置表 [I:商品idI:期数I:位置[B:道具类型I:道具idI:道具数量][B:道具类型I:道具idI:道具数量]I:购买次数]专属商店配置数据
	private GC_SHOP_CFG8164(self: Model_HuoDOnly, data: BaseBytes) {
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: Izshdzssd_315 = {
				id: data.readInt(),
				qs: data.readInt(),
				wz: data.readInt(),
				name: "",
				item: [],
				money: [],
				time: 0,
			};
			let size = data.readShort();
			for (let j = 0; j < size; j++) {
				let itm = [data.readByte(), data.readInt(), data.readInt()];
				v.item.push(itm);
			}
			size = data.readShort();
			for (let j = 0; j < size; j++) {
				let itm = [data.readByte(), data.readInt(), data.readInt()];
				v.money.push(itm);
			}
			v.time = data.readInt()
			Config.zshdzssd_315[v.id] = v;
		}
	}

	//=================累计充值
	//累计充值
	private static _addRecharge: { [sys: number]: number } = {};
	public static getAddRecharge(sys) {
		return Model_HuoDOnly._addRecharge[sys] ? Model_HuoDOnly._addRecharge[sys] : 0;
	}

	private static _addRechargeArr: { [sys: number]: Array<Vo_HuoDong> } = {};
	public static getAddRechargeArr(sys): Array<Vo_HuoDong> {
		return Model_HuoDOnly._addRechargeArr[sys] ? Model_HuoDOnly._addRechargeArr[sys] : [];
	}


	/**累计充值 领取奖励 I:活动唯一idI:奖励序号*/
	public CG_ADDRECHARGE_GET(hid, index) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(hid);
		ba.writeInt(index);
		this.sendSocket(8301, ba);
	}

	/**累计充值 返回界面信息 I:活动唯一idI:充值金额[I:索引idB:奖励状态]奖励状态数据]*/
	private GC_ADDRECHARGE_OPENUI8300(self: Model_HuoDOnly, data: BaseBytes) {
		let sys = data.readInt();
		Model_HuoDOnly._addRecharge[sys] = data.readInt()
		let len = data.readShort();
		Model_HuoDOnly._addRechargeArr[sys] = [];
		for (let i = 0; i < len; i++) {
			let v: Vo_HuoDong = new Vo_HuoDong();
			v.readMsgInt(data);
			Model_HuoDOnly._addRechargeArr[sys].push(v);
		}
		Model_HuoDOnly._addRechargeArr[sys].sort(Model_HuoDong.sortFuc);
		GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_ADDRECHARGE_OPENUI);

		GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_ADD_RECHARGE, sys - 1, Model_HuoDong.isVoNotice(Model_HuoDOnly._addRechargeArr[sys]));
		GGlobal.reddot.notify(UIConst.HUOD_ONLY)
	}

	/**累计充值 领取奖励结果 I:活动唯一idI: 序号B:奖励状态*/
	private GC_ADDRECHARGE_GET8302(self: Model_HuoDOnly, data: BaseBytes) {
		let sys = data.readInt();
		let v: Vo_HuoDong = new Vo_HuoDong();
		v.readMsgInt(data);
		if (v.id != 0) {
			let arr = Model_HuoDOnly._addRechargeArr[sys]
			if (arr == null) {
				Model_HuoDOnly._addRechargeArr[sys] = []
				Model_HuoDOnly._addRechargeArr[sys].push(v);
			} else {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].id == v.id) {
						arr[i].status = v.status
						break;
					}
				}
			}
			GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_ADDRECHARGE_OPENUI);

			GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_ADD_RECHARGE, sys - 1, Model_HuoDong.isVoNotice(Model_HuoDOnly._addRechargeArr[sys]));
			GGlobal.reddot.notify(UIConst.HUOD_ONLY)
		}
	}

	/**充值金额变化 I:活动唯一idI: 充值金额数量*/
	private GC_ADDRECHARGE_CHARGE8304(self: Model_HuoDOnly, data: BaseBytes) {
		let sys = data.readInt();
		Model_HuoDOnly._addRecharge[sys] = data.readInt()
		GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_ADDRECHARGE_OPENUI);
	}

	//更新累计充值配置表 I:序号I:期数I:额度[B:道具类型I:道具idI:道具数量]
	private GC_ADDRECHARGE_CFG8306(self: Model_HuoDOnly, data: BaseBytes) {
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: Izshdljcz_315 = {
				id: data.readInt(),
				qs: data.readInt(),
				coin: data.readInt(),
				reward: []
			};
			let size = data.readShort();
			for (let j = 0; j < size; j++) {
				let itm = [data.readByte(), data.readInt(), data.readInt()];
				v.reward.push(itm);
			}
			Config.zshdljcz_315[v.id] = v;
		}
	}

	//=================元宝返利

	private _ybao: { [sys: number]: number } = {};//材料数量
	public getYbao(sys): number {
		return this._ybao[sys] ? this._ybao[sys] : 0;
	}
	private _ybaoDta: { [sys: number]: Vo_HuoDong[] } = {};
	public getYbaoDta(sys): Vo_HuoDong[] {
		return this._ybaoDta[sys] ? this._ybaoDta[sys] : [];
	}
	/**
	 *  2450 [I-B]-I
	 * 返回界面信息 I:活动唯一idI: 消耗元宝数量[I:索引idB: 奖励状态，0：不可领取，1：可领取，2：已领取]奖励状态列表
	*/
	private GC_YBFL_UI_8330(s: Model_HuoDOnly, d: BaseBytes) {
		let sys = d.readInt();
		s._ybao[sys] = d.readInt();
		let len = d.readShort();
		s._ybaoDta[sys] = [];
		for (let a = 0; a < len; a++) {
			let v: Vo_HuoDong = new Vo_HuoDong();
			v.readMsgInt(d)
			s._ybaoDta[sys].push(v);
		}
		s._ybaoDta[sys].sort(Model_HuoDong.sortFuc);
		GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_YBFL);

		GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_YBFL, sys - 1, Model_HuoDong.isVoNotice(s._ybaoDta[sys]));
		GGlobal.reddot.notify(UIConst.HUOD_ONLY)
	}

	//领取奖励 I:活动唯一idI: 索引id
	public CG_YBFL_LQ_8331(sys, id) {
		let ba = this.getBytes();
		ba.writeInt(sys);
		ba.writeInt(id);
		this.sendSocket(8331, ba);
	}
	/**
	 * 领取奖励结果 I:活动唯一idI: 索引idB:奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取
	*/
	private GC_YBFL_LQ_8332(s: Model_HuoDOnly, d: BaseBytes) {
		let sys = d.readInt();
		let id = d.readInt();
		let st = d.readByte();
		if (st == 1) {
			let arr = s._ybaoDta[sys];
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].id == id) {
					arr[i].status = 2;
					break;
				}
			}
			s._ybaoDta[sys].sort(Model_HuoDong.sortFuc);
			GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_YBFL);

			GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_YBFL, sys - 1, Model_HuoDong.isVoNotice(s._ybaoDta[sys]));
			GGlobal.reddot.notify(UIConst.HUOD_ONLY)
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

	//更新元宝返利配置表 [I:索引idI:期数[B:道具类型I:道具idI:道具数量][B:道具类型I:道具idI:道具数量]]元宝返利数据
	private GC_YBFL_CFG_8334(self: Model_HuoDOnly, data: BaseBytes) {
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: Izshdybfl_315 = {
				id: data.readInt(),
				qs: data.readInt(),
				xh: [],
				reward: []
			};
			let size = data.readShort();
			for (let j = 0; j < size; j++) {
				let itm = [data.readByte(), data.readInt(), data.readInt()];
				v.xh.push(itm);
			}
			size = data.readShort();
			for (let j = 0; j < size; j++) {
				let itm = [data.readByte(), data.readInt(), data.readInt()];
				v.reward.push(itm);
			}
			Config.zshdybfl_315[v.id] = v;
		}
	}

	//=================单笔返利

	/**单笔返利数据 */
	private static _dBFanLiDt: { [sys: number]: Vo_HuoDong[] } = {};
	public static getDBFanLi(sys) {
		return Model_HuoDOnly._dBFanLiDt[sys] ? Model_HuoDOnly._dBFanLiDt[sys] : []
	}

	/**返回界面信息 I:获得唯一id[I:奖励项B:可领取次数B:剩余次数]奖励状态数据 */
	private GCDBFanLi_UI8360(self: Model_HuoDOnly, bytes: BaseBytes) {
		let sys = bytes.readInt();
		let length = bytes.readShort();
		let arr = [];
		for (let i = 0; i < length; i++) {
			let vo: Vo_HuoDong = new Vo_HuoDong();
			vo.readMsgCt(bytes)
			arr.push(vo);
		}
		Model_HuoDOnly._dBFanLiDt[sys] = arr;
		GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_DBFANLI);
		GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_DBFanLi, sys - 1, self.noticeDBFL(sys));
		GGlobal.reddot.notify(UIConst.HUOD_ONLY)
	}

	/**领取奖励 I:活动唯一idI:奖励项id */
	public CGDBFanLi_Get8361(sys, type) {
		let bytes = this.getBytes();
		bytes.writeInt(sys);
		bytes.writeInt(type);
		this.sendSocket(8361, bytes);
	}

	/**领取奖励结果 I:活动唯一idB:结果：0：失败，1：成功I:失败：（1：没领取次数），成功：奖励项idB:可领取次数B:剩余次数 */
	private GCDBFanLi_Get8362(self: Model_HuoDOnly, bytes: BaseBytes) {
		let sys = bytes.readInt()
		//领取奖励结果 B:结果：0：失败，1：成功I:失败：（1：没领取次数），成功：奖励项idB:可领取次数B:剩余次数
		let result = bytes.readByte();//领取结果
		let v: Vo_HuoDong = new Vo_HuoDong();
		v.readMsgCt(bytes)
		if (result == 0) {
			ViewCommonWarn.text("领取失败");
			return;
		}
		if (v.id != 0) {
			let arr = Model_HuoDOnly._dBFanLiDt[sys]
			if (arr == null) {
				Model_HuoDOnly._dBFanLiDt[sys] = []
				Model_HuoDOnly._dBFanLiDt[sys].push(v);
			} else {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].id == v.id) {
						arr[i].canCt = v.canCt
						arr[i].hasCt = v.hasCt
						break;
					}
				}
			}
			GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_DBFANLI);
			GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_DBFanLi, sys - 1, self.noticeDBFL(sys));
			GGlobal.reddot.notify(UIConst.HUOD_ONLY)
		}
	}

	//更新单笔返利配置表 [I:序号I:期数I:金额[B:道具类型I:道具idI:道具数量]I:领取次数]单笔返利数据
	private GCDBFanLi_CFG8364(self: Model_HuoDOnly, data: BaseBytes) {
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: Izshddbfl_315 = {
				xh: data.readInt(),
				qs: data.readInt(),
				je: data.readInt(),
				jl: [],
				cs: 0
			};
			let size = data.readShort();
			for (let j = 0; j < size; j++) {
				let itm = [data.readByte(), data.readInt(), data.readInt()];
				v.jl.push(itm);
			}
			v.cs = data.readInt()
			Config.zshddbfl_315[v.xh] = v;
		}
	}

	/**获取单笔返利红点状态 */
	private noticeDBFL(sys) {
		let temp = Model_HuoDOnly._dBFanLiDt[sys];
		if (temp) {
			for (let i = 0; i < temp.length; i++) {
				if (temp[i].canCt > 0) {
					return true;
				}
			}
		}
		return false;
	}
}