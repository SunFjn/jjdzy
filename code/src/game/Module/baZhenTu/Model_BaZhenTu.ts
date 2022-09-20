class Model_BaZhenTu extends BaseModel {
	public constructor() {
		super();
	}

	public static OPENUI = "openui";
	public static BUY = "buy";
	public static LOCK = "lock";
	public static JIESUO = "jiesuo";
	public static CHECKED = "checked";
	public static UP_STAR = "up_star";
	public static UP_LEVEL = "up_level";
	public static UP_FENJIE = "up_fenjie";
	public static DA_SHI = "da_shi";
	public static BUY_GOD = "buy_god";

	/**
	 * 打开八阵图
	*/
	public CGOPENUI4401() {
		let b = this.getBytes();
		this.socket.sendCMDBytes(4401, b);
	}

	/**
	 * 操作天命 B:1.装备 2.卸下I:天命idI:该天命在背包的位置B:要操作的装备位置(位置约定：顺时针1-8)
	*/
	public CGUseDestiny4403(type: number, id: number, posB: number, posE: number) {
		let b = this.getBytes();
		b.writeByte(type);
		b.writeInt(id);
		b.writeInt(posB);
		b.writeByte(posE);
		this.socket.sendCMDBytes(4403, b);
	}
	/**
	 * 升级符文 B:升级八阵图上符文位置id
	*/
	public CGUplevel4405(posE: number) {
		let b = this.getBytes();
		b.writeByte(posE);
		this.socket.sendCMDBytes(4405, b);
	}
	/**
	 * 升星八阵图上符文位置id B:升星位置
	*/
	public CGUpstar4407(posE: number) {
		let b = this.getBytes();
		b.writeByte(posE);
		this.socket.sendCMDBytes(4407, b);
	}

	/**
	 * 一键分解  [I:位置]位置
	*/
	public CGFenjie4409(posArr: number[]) {
		if (posArr == null || posArr.length == 0) return;
		let b = this.getBytes();
		let len = posArr.length
		b.writeShort(len);
		for (let i = 0; i < len; i++) {
			b.writeInt(posArr[i]);
		}
		this.socket.sendCMDBytes(4409, b);
	}

	/**
	 * 鉴定 B:类型（0铜钱1元宝）B:次数（0 1次 1十次）
	*/
	public CGBuydestiny4411(type: number, count: number) {
		let b = this.getBytes();
		b.writeByte(type);
		b.writeByte(count);
		this.socket.sendCMDBytes(4411, b);
	}

	/**
	 * 锁 I:位置B:加锁1解锁0
	*/
	public CGLocked4413(pos: number, lock) {
		let b = this.getBytes();
		b.writeInt(pos);
		b.writeByte(lock);
		this.socket.sendCMDBytes(4413, b);
	}

	/**
	 * 锁 I:位置B:加锁1解锁0
	*/
	public CGJieSuo4415(pos: number) {
		let b = this.getBytes();
		b.writeByte(pos);
		this.socket.sendCMDBytes(4415, b);
	}

	/**
	 * 打开符文大师界面
	*/
	public CGDaShi_UI4417() {
		let b = this.getBytes();
		this.socket.sendCMDBytes(4417, b);
	}

	/**
	 * 升级符文大师
	*/
	public CGDASHI_UPLV4419() {
		let b = this.getBytes();
		this.socket.sendCMDBytes(4419, b);
	}

	/**
	 * 按符文的类型分解 [B:符文类型]
	*/
	public CG_FENJIE_4421(arr: number[]) {
		let len = arr.length;
		if (len == 0) return;
		let b = this.getBytes();
		b.writeShort(len);
		for (let i = 0; i < len; i++) {
			b.writeByte(arr[i]);
		}
		this.socket.sendCMDBytes(4421, b);
	}

	/**
	 *兑换神符 I:表的id
	*/
	public CG_BUY_4425(id) {
		let b = this.getBytes();
		b.writeInt(id);
		this.sendSocket(4425, b)
	}

	public static equipArr: Array<VoBaZhenTu> = [];
	public static bagArr: Array<VoBaZhenTu> = [];
	public static bagMap: any = {};//位置key
	public static freeCt: number;
	public static tongCt: number;
	public static yuanCt: number;
	public static yuanTotalCount: number;
	//配置
	public static tong1
	public static tong10
	public static tongMax
	public static yuan1
	public static yuan10
	//鉴定锤id
	public static JDCid = 410046
	public static GODid = 411016

	public static initCost() {
		if (Model_BaZhenTu.tong1 == null) {
			let tongCfg = Config.bztjd_261[1]
			let arr = ConfigHelp.SplitStr(tongCfg.conmuse)
			Model_BaZhenTu.tong1 = Number(arr[0][2])
			arr = ConfigHelp.SplitStr(tongCfg.conmuse1)
			Model_BaZhenTu.tong10 = Number(arr[0][2])
			Model_BaZhenTu.tongMax = tongCfg.time;

			let yuanCfg = Config.bztjd_261[2]
			arr = ConfigHelp.SplitStr(yuanCfg.conmuse)
			Model_BaZhenTu.yuan1 = Number(arr[0][2])
			arr = ConfigHelp.SplitStr(yuanCfg.conmuse1)
			Model_BaZhenTu.yuan10 = Number(arr[0][2])
		}
	}

	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		self.socket = mgr;
		mgr.regHand(4402, self.GC_OPENUI_4402, self);
		mgr.regHand(4404, self.GC_UseDestiny_4404, self);
		mgr.regHand(4406, self.GC_Uplevel_4406, self);
		mgr.regHand(4408, self.GC_Upstar_4408, self);
		mgr.regHand(4410, self.GC_Onekeyfenjie_4410, self);
		mgr.regHand(4412, self.GC_Buydestiny_4412, self);
		mgr.regHand(4414, self.GC_LOCKED_4414, self);
		mgr.regHand(4416, self.GC_JIESUO_4416, self);
		mgr.regHand(4418, self.GC_DASHI_UI4418, self);
		mgr.regHand(4420, self.GC_DASHI_UPLV4420, self);
		mgr.regHand(4422, self.GC_FENJIE_4422, self);
		mgr.regHand(4424, self.GC_ADDDESTINY_4424, self);
		mgr.regHand(4426, self.GC_BUY_4426, self);
		mgr.regHand(4428, self.GC_GOD_FUWEN_EXCHANGENUM, self);
	}

	public godFuWenData: { [id: number]: number } = {};
	/**4428	GC 神符文已经兑换数量 [I:符文idI:已兑换数量] */
	public GC_GOD_FUWEN_EXCHANGENUM(self: Model_BaZhenTu, data: BaseBytes) {
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let fuwenId = data.readInt();
			let count = data.readInt();
			self.godFuWenData[fuwenId] = count;
		}
		self.notify(Model_BaZhenTu.BUY_GOD)
	}

	public static isFirstOpen: boolean = false;
	/**
	 *[B:位置I:符文idI:符文等级I:符文星级]装备在阵上符文[I:符文背包索引I:符文idI:符文等级I:符文星级]背包符文B:免费元宝鉴定次数I:今日铜钱次数I:元宝鉴定次数
	  [B:位置I:符文idI:符文等级I:符文星级]装备在阵上符文[I:符文背包索引I:符文idI:符文等级I:符文星级B:是否锁0未锁1锁]背包符文B:免费元宝鉴定次数I:今日铜钱次数I:元宝鉴定次数I:完美鉴定总次数
	*/
	private GC_OPENUI_4402(self: Model_BaZhenTu, data: BaseBytes) {
		Model_BaZhenTu.isFirstOpen = true;
		let l = data.readShort();
		Model_BaZhenTu.equipArr = [];
		for (var i = 0; i < l; i++) {
			let v: VoBaZhenTu = new VoBaZhenTu();
			v.readMsg(data);
			Model_BaZhenTu.equipArr[v.pos - 1] = v;
		}
		l = data.readShort();
		Model_BaZhenTu.bagArr = [];
		for (i = 0; i < l; i++) {
			let v: VoBaZhenTu = new VoBaZhenTu();
			v.readMsgBag(data);
			Model_BaZhenTu.pushBagEqu(v);
		}
		Model_BaZhenTu.freeCt = data.readByte();
		Model_BaZhenTu.tongCt = data.readInt();
		Model_BaZhenTu.yuanCt = data.readInt();
		Model_BaZhenTu.yuanTotalCount = data.readInt();
		self.notify(Model_BaZhenTu.OPENUI);
		GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
	}
	/**
	 *装备/卸下天命返回 B:装备/卸下结果0成功1不允许装备同类型天命2失败B:类型I:背包索引I:身上索引
	*/
	private GC_UseDestiny_4404(self: Model_BaZhenTu, data: BaseBytes) {
		let res = data.readByte();
		let type = data.readByte();
		let posB = data.readInt();
		let posE = data.readInt();
		if (res == 0) {
			if (type == 1) {//1.装备
				let vbag = Model_BaZhenTu.bagMap[posB]
				vbag.pos = posE
				let vEqu = Model_BaZhenTu.equipArr[posE - 1];
				if (vEqu && vEqu.id > 0) {
					vEqu.pos = posB;
				}
				Model_BaZhenTu.equipArr[posE - 1] = vbag;
				Model_BaZhenTu.delBagEqu(posB)
				if (vEqu && vEqu.id > 0) {//替换
					Model_BaZhenTu.pushBagEqu(vEqu);
				}
			} else {// 2.卸下
				let v = Model_BaZhenTu.equipArr[posE - 1]
				let copy = v.copy()
				copy.pos = posB;
				Model_BaZhenTu.pushBagEqu(copy);
				v.clear();
			}
			self.notify(Model_BaZhenTu.OPENUI);
			GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
		} else {
			let t = type == 1 ? "装备" : "卸下";
			ViewCommonWarn.text(t + "失败")
			if (type != 1) {
				self.freshData()
			}
		}
	}
	private freshData() {
		let self = this;
		if (!self._openUITime) {
			self._openUITime = true;
			GGlobal.modelBaZhenTu.CGOPENUI4401();
			Timer.instance.callLater(function () { this._openUITime = false }, 3000, self, 0, false, false, true);
		}
	}
	private _openUITime: boolean = false;

	/**
	 *升级结果 B:0成功1失败B:位置索引I:符文idI:等级
	*/
	private GC_Uplevel_4406(self: Model_BaZhenTu, data: BaseBytes) {
		let res = data.readByte();
		if (res == 0) {
			let pos = data.readByte();
			let id = data.readInt();
			let lv = data.readInt();
			let v = Model_BaZhenTu.equipArr[pos - 1]
			v.level = lv
			self.notify(Model_BaZhenTu.UP_LEVEL);
			GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
			ViewCommonWarn.text("升级成功")
		} else {
			ViewCommonWarn.text("升级失败")
		}
	}


	/**
	 *GC 升星返回 B:升星结果0成功1失败B:位置索引I:符文idI:星级I:背包被使用的符文位置
	*/
	private GC_Upstar_4408(self: Model_BaZhenTu, data: BaseBytes) {
		let res = data.readByte();
		if (res == 0) {
			let posE = data.readByte();
			let sid = data.readInt();
			let starLv = data.readInt();
			let v = Model_BaZhenTu.equipArr[posE - 1];
			v.starLv = starLv
			//删除背包物品
			let posB = data.readInt();
			Model_BaZhenTu.delBagEqu(posB)
			self.notify(Model_BaZhenTu.UP_STAR);
			GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
			ViewCommonWarn.text("升星成功")
		} else {
			ViewCommonWarn.text("升星失败")
		}
	}

	/**
	 * 分解结果 B:结果0成功1失败[I:被分解符文的背包索引]
	*/
	private GC_Onekeyfenjie_4410(self: Model_BaZhenTu, data: BaseBytes) {
		let res = data.readByte();
		if (res == 0) {
			let len = data.readShort();
			for (let i = 0; i < len; i++) {
				let posB = data.readInt();
				Model_BaZhenTu.delBagEqu(posB)
			}
			self.notify(Model_BaZhenTu.UP_FENJIE);
			GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
			ViewCommonWarn.text("分解成功")
		} else {
			ViewCommonWarn.text("分解失败")
			self.freshData();
		}
	}

	/**
	 *鉴定结果 [I:背包位置索引I:符文idI:符文星级I:符文等级]B:免费次数I:铜钱次数I:元宝次数:I:完美鉴定总次数
	 GC 鉴定结果 [I:背包位置索引I:符文idI:符文星级I:符文等级]B:免费次数I:铜钱次数I:元宝次数B:类型I:完美鉴定总次数
	*/
	private GC_Buydestiny_4412(self: Model_BaZhenTu, data: BaseBytes) {
		let len = data.readShort();
		let dropArr = [];
		for (let i = 0; i < len; i++) {
			let v: VoBaZhenTu = new VoBaZhenTu();
			v.readMsgBuy(data);
			Model_BaZhenTu.pushBagEqu(v);
			dropArr.push(v);
		}
		Model_BaZhenTu.freeCt = data.readByte();
		Model_BaZhenTu.tongCt = data.readInt();
		Model_BaZhenTu.yuanCt = data.readInt();
		let type = data.readByte();//类型
		Model_BaZhenTu.yuanTotalCount = data.readInt();
		if (type == 100) {
			for (let i = 0; i < dropArr.length; i++) {
				let v: VoBaZhenTu = dropArr[i];
				ViewBroadcastItemText.text("获得了" + v.name + "X1", Color.getColorInt(v.pz));
			}
		} else {
			if (GGlobal.layerMgr.isOpenView(UIConst.BAZHENTU_BUY)) {
				GGlobal.layerMgr.getView(UIConst.BAZHENTU_BUY).upOpen({ type: type, drop: dropArr });
			} else {
				GGlobal.layerMgr.open(UIConst.BAZHENTU_BUY, { type: type, drop: dropArr });
			}
			self.notify(Model_BaZhenTu.BUY);
		}
		GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
		let not = GGlobal.modelEightLock.getAuthenNot();
		GGlobal.reddot.setCondition(UIConst.AUTHEN_RANK, 0, not);
		GGlobal.modelEightLock.checkAndOpenIcon();
	}
	//锁 I:位置B:锁
	private GC_LOCKED_4414(self: Model_BaZhenTu, data: BaseBytes) {
		let pos = data.readInt();
		let locked = data.readByte();
		let v = Model_BaZhenTu.bagMap[pos];
		if (v) {
			v.locked = locked;
			self.notify(Model_BaZhenTu.LOCK);
			ViewCommonWarn.text((locked == 1 ? "锁定" : "解锁") + "成功")
		}
	}

	//GC 解说返回 B:0成功 1失败B:孔id
	private GC_JIESUO_4416(self: Model_BaZhenTu, data: BaseBytes) {
		let res = data.readByte();
		let pos = data.readByte();
		if (res == 0) {
			let v: VoBaZhenTu = new VoBaZhenTu();
			v.pos = pos;
			Model_BaZhenTu.equipArr[v.pos - 1] = v;
			self.notify(Model_BaZhenTu.JIESUO);
			GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
		} else {
			ViewCommonWarn.text("条件不满足")
		}
	}
	/*符文大师id*/
	dsId = 0
	/**状态:0：未激活，未达到条件，1：可激活，2：不可升级，3：可升级**/
	public dsSt = 0
	/*红色符文总星级*/
	dsLv = 0
	//打开符文大师界面返回 I:符文大师idB:状态:0：未激活，未达到条件，1：可激活，2：不可升级，3：可升级I:红色符文总星级
	private GC_DASHI_UI4418(self: Model_BaZhenTu, data: BaseBytes) {
		self.dsId = data.readInt();
		self.dsSt = data.readByte();
		self.dsLv = data.readInt();
		self.notify(Model_BaZhenTu.DA_SHI)
		GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
	}
	//激活或升级返回 B:状态：0：失败，1：成功，2：未满足条件，3：已满级I:符文大师idI:下一级符文大师id,已达满级则为0B:状态:0：不可升级，1：可升级
	private GC_DASHI_UPLV4420(self: Model_BaZhenTu, data: BaseBytes) {
		let st = data.readByte();
		if (st == 1) {
			self.dsId = data.readInt();
			let nextId = data.readByte();
			self.dsSt = data.readInt();
			self.notify(Model_BaZhenTu.DA_SHI)
			GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
		} else if (st == 2) {
			ViewCommonWarn.text("未满足条件")
		} else if (st == 3) {
			ViewCommonWarn.text("已满级")
		} else {
			ViewCommonWarn.text("升级失败")
		}
	}
	//GC 分解结果 B:0成功 1失败[B:类型]
	private GC_FENJIE_4422(self: Model_BaZhenTu, data: BaseBytes) {
		let st = data.readByte();
		if (st == 0) {
			let len = data.readShort();
			let fenTy = {};
			for (let i = 0; i < len; i++) {
				let type = data.readByte();
				fenTy[type] = 1;
			}
			let size = Model_BaZhenTu.bagArr.length;
			let newArr = [];
			for (let i = 0; i < size; i++) {
				let v = Model_BaZhenTu.bagArr[i];
				if (v.locked && v.type > 0) {
					newArr.push(v);
				} else if (!fenTy[v.pz]) {
					newArr.push(v);
				} else {
					delete Model_BaZhenTu.bagMap[v.pos];
				}
			}
			Model_BaZhenTu.bagArr = newArr;
			self.notify(Model_BaZhenTu.UP_FENJIE);
			GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
			ViewCommonWarn.text("分解成功")
		} else {
			ViewCommonWarn.text("分解失败")
			self.freshData();
		}
	}
	//GC 添加符文 [I:背包位置索引I:符文idI:符文星级I:符文等级]B:背包是否已满0没有 1有
	private GC_ADDDESTINY_4424(self: Model_BaZhenTu, data: BaseBytes) {
		let len = data.readShort();
		let dropArr: any = {};
		let arrGet = []
		for (let i = 0; i < len; i++) {
			let v: VoBaZhenTu = new VoBaZhenTu();
			v.readMsgBuy(data);
			Model_BaZhenTu.pushBagEqu(v);
			if (v.pz >= 8) {
				arrGet.push(v)
			} else {
				if (dropArr[v.id]) {
					dropArr[v.id].ct++
				} else {
					dropArr[v.id] = { v: v, ct: 1 };
				}
			}

		}
		let isFull = data.readByte();
		if (isFull) {
			ViewCommonWarn.text("符文背包空间不足，请前往分解")
			let sf = GGlobal.reddot
			sf.setCondition(UIConst.BAZHENTU, 1, true);
			sf.notifyMsg(UIConst.BAZHENTU);
		}
		// self.notify(Model_BaZhenTu.BUY);
		// GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
		for (let key in dropArr) {
			let v: VoBaZhenTu = dropArr[key].v;
			let ct = dropArr[key].ct;
			ViewBroadcastItemText.text("获得了" + v.name + "X" + ct, Color.getColorInt(v.pz));
		}

		if (arrGet) {
			ViewCommonPrompt.textItemList(arrGet);
		}

	}
	//兑换神符返回 B:状态 1成功 2神符碎片不足 3神符不存在 4背包已满 I:表的id
	private GC_BUY_4426(self: Model_BaZhenTu, data: BaseBytes) {
		let res = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			let cfg = Config.bztsf_261[id];
			if (!self.godFuWenData[cfg.sf]) self.godFuWenData[cfg.sf] = 0;
			self.godFuWenData[cfg.sf]++;
			// ViewCommonWarn.text("兑换神符成功");
			self.notify(Model_BaZhenTu.BUY_GOD)
		} else {
			ViewCommonWarn.text(["神符碎片不足", "神符不存在", "背包已满"][res - 2])
		}
	}
	private static delBagEqu(posB: number) {
		let v = Model_BaZhenTu.bagMap[posB];
		Model_BaZhenTu.bagArr.splice(Model_BaZhenTu.bagArr.indexOf(v), 1);
		delete Model_BaZhenTu.bagMap[posB];
	}

	private static pushBagEqu(v: VoBaZhenTu) {
		if (Model_BaZhenTu.bagMap[v.pos] == null) {
			Model_BaZhenTu.bagMap[v.pos] = v;
			Model_BaZhenTu.bagArr.push(v);
		} else {
			Model_BaZhenTu.bagMap[v.pos] = v;
			let has = false;
			for (let i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
				if (Model_BaZhenTu.bagArr[i].pos == v.pos) {
					Model_BaZhenTu.bagArr[i] = v;
					has = true;
					break;
				}
			}
			if (!has) {
				Model_BaZhenTu.bagArr.push(v);
			}
		}
	}

	//未解锁 true锁着 1-8  //9-10
	public static getIsLock(index: number): boolean {
		if (index > 8) {//9-10 需要元宝开
			let ve = Model_BaZhenTu.equipArr[index - 1]
			if (ve) return false;
		} else {
			let v = Config.bzt_261[index];
			if (v) {
				// if (Model_player.voMine.level >= v.lv) {
				if (Model_player.voMine.maxLv >= v.lv) {
					return false;
				}
				if (v.vip > 0 && Model_player.voMine.viplv >= v.vip) {
					return false;
				}
			}
		}
		return true;
	}

	public static getTotalLv() {
		let tot = 0;
		for (let i = 0; i < Model_BaZhenTu.equipArr.length; i++) {
			let ve = Model_BaZhenTu.equipArr[i]
			if (ve) tot += ve.level;
		}
		return tot
	}

	public static getItemCt(id) {
		let ct = 0;
		for (let i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
			let v = Model_BaZhenTu.bagArr[i];
			if (v.id == id) {
				ct++;
			}
		}
		return ct;
	}

	public static getBagMax() {
		return ConfigHelp.getSystemNum(6514)
	}

	public static onTong(ct) {
		if (Model_BaZhenTu.bagArr.length >= Model_BaZhenTu.getBagMax() - 20) {
			ViewCommonWarn.text("符文背包空间不足，请前往分解")
			return;
		}
		if (Model_BaZhenTu.tongCt >= Model_BaZhenTu.tongMax) {
			ViewCommonWarn.text("普通鉴定次数不足")
			return;
		}
		if (ct == 10 && Model_BaZhenTu.tongMax - Model_BaZhenTu.tongCt < 10) {
			ViewCommonWarn.text("剩余普通鉴定次数不足10次")
			return;
		}
		let cost = ct == 1 ? Model_BaZhenTu.tong1 : Model_BaZhenTu.tong10;
		if (Model_player.voMine.tongbi < cost) {
			ViewCommonWarn.text("铜币不足")
			return;
		}
		GGlobal.modelBaZhenTu.CGBuydestiny4411(0, ct == 1 ? 0 : 1)
	}

	public static onYuan(ct) {
		if (Model_BaZhenTu.bagArr.length >= Model_BaZhenTu.getBagMax() - 20) {
			ViewCommonWarn.text("符文背包空间不足，请前往分解")
			return;
		}
		let cost = ct == 1 ? Model_BaZhenTu.yuan1 : Model_BaZhenTu.yuan10;
		if (Model_BaZhenTu.freeCt > 0 && ct == 1) cost = 0;
		let JDCct = Model_Bag.getItemCount(Model_BaZhenTu.JDCid);
		if (ct == 1 && JDCct > 0) cost = 0;
		if (ct == 10 && JDCct > 9) cost = 0;
		if (Model_player.voMine.yuanbao < cost) {
			ModelChongZhi.guideToRecharge()
			return;
		}
		GGlobal.modelBaZhenTu.CGBuydestiny4411(1, ct == 1 ? 0 : 1)
	}
	//镶嵌
	public static checkEquip(): boolean {
		//已镶嵌符文可升星升级时要有红点
		for (let i = 0; i < Model_BaZhenTu.equipArr.length; i++) {
			let eq = Model_BaZhenTu.equipArr[i];
			if (Model_BaZhenTu.canUpLevel(eq)) {
				return true;
			}
			if (Model_BaZhenTu.canUpStar(eq)) {
				return true;
			}

		}
		let typeArr = {};
		for (let j = 0; j < Model_BaZhenTu.equipArr.length; j++) {
			let eq = Model_BaZhenTu.equipArr[j];
			if (!eq || eq.id == 0) continue;
			typeArr[eq.type] = true;
		}
		//有已开启但未镶嵌的阵眼,且背包有未镶嵌的符文时要有红点
		let empty = false
		for (let i = 0; i < 10; i++) {
			let eq = Model_BaZhenTu.equipArr[i];
			if (!Model_BaZhenTu.getIsLock(i + 1)) {
				if ((!eq || eq.id == 0)) {
					empty = true;
				} else {
					if (Model_BaZhenTu.canUpPower(i)) {
						return true;
					}
				}
			}
		}
		if (empty) {
			for (let k = 0; k < Model_BaZhenTu.bagArr.length; k++) {
				let ebag = Model_BaZhenTu.bagArr[k];
				if (!ebag || ebag.type == 0) continue;
				if (!typeArr[ebag.type]) return true;
			}
		}
		//9-10空位 可开孔
		for (let i = 9; i <= 10; i++) {
			if (Model_BaZhenTu.getIsLock(i)) {
				let v = Config.bzt_261[i];
				let cost = Number(JSON.parse(v.xh)[0][2]);
				if (Model_BaZhenTu.getTotalLv() >= v.fw && Model_player.voMine.yuanbao >= cost) {
					return true;
				}
			}
		}
		return false
	}
	///孔位置  0-7
	public static checkEquipVo(index: number): boolean {
		let eq = Model_BaZhenTu.equipArr[index];
		if (Model_BaZhenTu.canUpLevel(eq)) {
			return true;
		}
		if (Model_BaZhenTu.canUpStar(eq)) {
			return true;
		}
		if (Model_BaZhenTu.canWear(index)) {
			return true;
		}
		return false;
	}
	///孔位置  0-7
	public static canWear(index: number): boolean {
		let eq = Model_BaZhenTu.equipArr[index];
		if (eq && eq.id > 0) {
			return false;
		}
		if (Model_BaZhenTu.getIsLock(index + 1)) {
			return false;
		}
		let typeArr = {};
		for (let j = 0; j < Model_BaZhenTu.equipArr.length; j++) {
			let eq = Model_BaZhenTu.equipArr[j];
			if (!eq || eq.id == 0) continue;
			typeArr[eq.type] = true;
		}
		//有已开启但未镶嵌的阵眼,且背包有未镶嵌的符文时要有红点
		for (let k = 0; k < Model_BaZhenTu.bagArr.length; k++) {
			let ebag = Model_BaZhenTu.bagArr[k];
			if (!ebag || ebag.type == 0) continue;
			if (!typeArr[ebag.type]) return true;
		}
		return false;
	}
	//有同类型
	public static checkTypeSame(type) {
		let typeArr = {};
		for (let j = 0; j < Model_BaZhenTu.equipArr.length; j++) {
			let eq = Model_BaZhenTu.equipArr[j];
			if (!eq || eq.id == 0) continue;
			typeArr[eq.type] = true;
		}
		if (typeArr[type]) return true;
		return false;
	}

	public static canUpLevel(v: VoBaZhenTu, warn = false) {
		if (v == null) return false;
		if (v.id == 0) return false;
		let costUp = Config.bztlv_261[v.level]
		let cost = Number(costUp["exp" + v.pz])
		if (Model_player.voMine.fuwen < cost) {
			if (warn) ViewCommonWarn.text("符文经验不足");
			return false;
		}
		if (v.level >= v.maxmaxLv) {
			if (warn) ViewCommonWarn.text("已达满级")
			return false;
		}
		if (v.level >= v.maxLv) {
			if (warn) ViewCommonWarn.text("升星可提升等级上限")
			return false;
		}
		return true;
	}

	public static canUpStar(v: VoBaZhenTu, warn = false) {
		if (v == null) return false;
		if (v.id == 0) return false;
		if (Model_BaZhenTu.getItemCt(v.id) == 0) {
			if (warn) ViewCommonWarn.text("材料不足");
			return false;
		}
		if (v.starLv >= v.maxStar) {
			if (warn) ViewCommonWarn.text("已达满星");
			return false;
		}
		return true;
	}
	//有更高品质 0-7  可替换  xx
	public static canUpPower(index) {
		let eq = Model_BaZhenTu.equipArr[index];
		if (eq == null || eq.id == 0) return false;
		let typeArr = {};
		for (let j = 0; j < Model_BaZhenTu.equipArr.length; j++) {
			let eq = Model_BaZhenTu.equipArr[j];
			if (!eq || eq.id == 0) continue;
			typeArr[eq.type] = true;
		}
		//有已开启但未镶嵌的阵眼,且背包有未镶嵌的符文时要有红点
		for (let k = 0; k < Model_BaZhenTu.bagArr.length; k++) {
			let ebag = Model_BaZhenTu.bagArr[k];
			if (!ebag || ebag.type == 0) continue;
			if (eq.type == ebag.type && ebag.pz > eq.pz) return true;
			if (typeArr[ebag.type]) continue;
			if (ebag.pz > eq.pz) return true;
		}
		return false;
	}
	//分解
	public static checkFenJ(): boolean {
		//当符文背包符文数量＞100时要有红点
		if (Model_BaZhenTu.bagArr.length > (Model_BaZhenTu.getBagMax() - 100)) return true;
		for (let i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
			let v = Model_BaZhenTu.bagArr[i]
			if (v.pz <= 3) {
				return true;
			}
		}
		return false;
	}
	//鉴定
	public static checkJianD(): boolean {
		//免费次数
		if (Model_BaZhenTu.freeCt > 0) return true;
		let JDCct = Model_Bag.getItemCount(Model_BaZhenTu.JDCid);
		if (JDCct > 0) return true;
		return false;
	}

	public static checkDashi(): boolean {
		let m = GGlobal.modelBaZhenTu
		return m.dsSt == 1 || m.dsSt == 3;
	}

	public static checkGod() {
		let m = GGlobal.modelBaZhenTu
		// let arr = m.getbztsf();
		let ct = JSON.parse(Config.bztsf_261[1].consume)[0][2]
		let has = Model_Bag.getItemCount(Model_BaZhenTu.GODid)
		return has >= ct
	}

	private _bztsf: Ibztsf_261[]
	public getbztsf() {
		let s = this;
		if (!s._bztsf) {
			s._bztsf = []
			for (let key in Config.bztsf_261) {
				let v = Config.bztsf_261[key];
				s._bztsf.push(v)
			}
		}
		return s._bztsf;
	}
}