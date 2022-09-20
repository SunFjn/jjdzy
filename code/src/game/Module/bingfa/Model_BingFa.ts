class Model_BingFa extends BaseModel {
	public constructor() {
		super();
	}
	public static OPENUI = "pu";
	public static LVLUP = "lv";//升级/激活
	public static SUIT_ACTIVE = "sv";//激活套装
	public static DRUG_UP = "drug";//属性丹更细

	public static DAN_LEVELUP = 411004;//兵法培养丹


	drugCount: number = 0;
	/**套装*/
	_suitData: any[];
	get suitData() {
		if (!this._suitData) {
			this._suitData = [];
			let vo: VoBingFaSuit;
			let lib = Config.booksuit_212;
			for (var i = 1; i < 4; i++) {
				vo = new VoBingFaSuit();
				vo.id = i * 1000;
				vo.initLib();
				this._suitData.push(vo);
			}
		}
		return this._suitData;
	}

	getSuitDataByID(id) {
		let type = (id / 1000) >> 0;
		let vo: VoBingFaSuit;
		let data = this.suitData;
		for (var i in data) {
			vo = data[i];
			if (vo.type == type) {
				return vo;
			}
		}
		return null;
	}


	/***兵法数据*/
	data: Array<VoBingFa>;
	mapObj;
	initData() {
		if (!this.data) {
			this.mapObj = {};
			this.data = [];
			let vo: VoBingFa;
			let lib = Config.book_213;
			for (var i in lib) {
				vo = new VoBingFa();
				vo.lib = lib[i];
				vo.initLib();
				this.mapObj[i + ""] = vo;
				this.data.push(vo);
			}
		}
		return this.data;
	}

	private _drugID: number = 0;
	get drugID() {
		if (this._drugID == 0) {
			var lib = Config.drug_200[6];
			this._drugID = lib['id'];
		}
		return this._drugID;
	}

	getDrugCount() {
		var ret = 0;
		let vo: VoBingFa;
		for (var i in this.data) {
			vo = this.data[i];
			ret += vo.drugCount;
		}
		return ret;
	}

	sortVO() {
		let vo: VoBingFa;
		for (var i in this.data) {
			vo = this.data[i];
			if (vo.star > 0) {
				vo.sortIndex = vo.id + 1000000;
			} else if (vo.canActivate()) {
				vo.sortIndex = vo.id + 10000000;
			} else {
				vo.sortIndex = vo.id;
			}
		}
		this.data = this.data.sort(function (a, b) {
			if ((a.star > 0 && b.star > 0) || (a.canActivate() && a.star <= 0 && b.canActivate() && b.star <= 0)) {
				if (a.pin == b.pin) {
					return b.sortIndex - a.sortIndex;
				} else {
					return b.pin - a.pin;
				}
			} else if ((!a.canActivate() && a.star <= 0 && !b.canActivate() && b.star <= 0)) {
				if (a.pin == b.pin) {
					return b.sortIndex - a.sortIndex;
				} else {
					return a.pin - b.pin;
				}
			} else {
				return b.sortIndex - a.sortIndex;
			}
		});
	}

	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(900, this.GC_INFO_900, this);
		mgr.regHand(904, this.GC_ACTIVE_904, this);
		mgr.regHand(906, this.GC_ACTIVESUIT_906, this);
		mgr.regHand(908, this.GC_DRUG_908, this);
	}

	/**
	 * 900
	 * [I-I]-[I]-I
	 * GC 获取兵法返回 [I:兵法idI:兵法星级]已经激活兵法[I:已经激活套装id]I:兵法属性丹数量
	*/
	private GC_INFO_900(self: Model_BingFa, data: BaseBytes) {
		self.initData();
		let l = data.readShort();
		let id: number;
		let star: number;
		let vo: VoBingFa;
		for (var i = 0; i < l; i++) {
			id = data.readInt();
			star = data.readInt();
			vo = self.mapObj[id + ""];
			vo.star = star;
			vo.update();
		}
		let items = [];
		l = data.readShort();
		for (i = 0; i < l; i++) {
			id = data.readInt();
			var suit = self.getSuitDataByID(id);
			suit.id = id;
			suit.update();
		}
		self.sortVO();
		self.drugCount = data.readInt();
		self.notify(Model_BingFa.OPENUI);
	}
	/**
	 * 901
	 * 获取兵法返回 
	*/
	public CG_INFO_901() {
		let b = this.getBytes();
		this.socket.sendCMDBytes(901, b);
	}

	/**
	 * 903
	 * i
	 * CG 激活/升阶兵法 I:兵法id
	*/
	public CG_ACTIVE_903(id) {
		let b = this.getBytes();
		b.writeInt(id);
		this.socket.sendCMDBytes(903, b);
	}

	/**
	 * 904
	 * B-I-I
	 * GC 激活/升级兵法返回 B:0成功 1失败I:兵法idI:兵法星级
	*/
	private GC_ACTIVE_904(self: Model_BingFa, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 0) {
			let id = data.readInt();
			let star = data.readInt();
			let vo = self.mapObj[id + ""];
			vo.star = star;
			vo.update();
			self.sortVO();
			if (star >= vo.starMax) {
				GGlobal.control.notify(UIConst.JUEXING);
			}
			self.notify(Model_BingFa.LVLUP, star);
		} else {
			ViewCommonWarn.text("缺少道具");
		}
	}

	/**
	 * 905
	 * B
	 * CG 激活/升阶兵法套装 B:套装索引 1/2/3
	*/
	public CG_ACTIVESUIT_905(id) {
		var b = this.getBytes();
		b.writeByte(id);
		this.socket.sendCMDBytes(905, b);
	}
	/**
	 * 906
	 * B-B-I
	 * GC 激活/升阶某个兵法套装返回 B:0成功 1失败B:兵法套装 1/2/3I:兵法套装id
	*/
	private GC_ACTIVESUIT_906(self: Model_BingFa, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 0) {
			let index = data.readByte();
			let id = data.readInt();
			var suit = self.getSuitDataByID(id);
			suit.id = id;
			suit.update();
			self.notify(Model_BingFa.SUIT_ACTIVE);
		} else {
			ViewCommonWarn.text("缺少道具");
		}
	}

	/**
 	* 907
	 * B
	 * CG 使用丹药 B:使用方式 0 1颗 1一键
	*/
	public CG_DRUG_907(type) {
		let b = this.getBytes();
		b.writeByte(type);
		this.socket.sendCMDBytes(907, b);
	}
	/**
	 * 908
	 * B-I
	 * GC 使用丹药返回 B:0使用成功 1失败I:兵法属性丹数量
	*/
	private GC_DRUG_908(self: Model_BingFa, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 0) {
			self.drugCount = data.readInt();
			self.notify(Model_BingFa.DRUG_UP);
		} else {
			ViewCommonWarn.text("使用失败");
		}
	}

	//	获取可以穿的武将装备
	public static bingFaWearArr(): Array<VoEquip> {
		let arr: Array<VoEquip> = Model_Bag.filterEquips(Model_Bag.filterBingFaEquip, null);
		let d = Model_player.voMine.equipData
		let sendArr = {};
		for (let i = 0; i < arr.length; i++) {
			let equ = arr[i];
			let jieShu = Model_BySys.sysJie(Model_BySys.BING_FA);
			if (jieShu < equ.jie) {//不可穿 武将
				continue;
			}
			let ownE = d[equ.type];
			if (ownE == null && sendArr[equ.type] == null) {
				sendArr[equ.type] = equ
			} else {
				let boo = true;
				if (ownE && equ.basePower <= ownE.basePower) {
					boo = false;
				}
				if (sendArr[equ.type] && equ.basePower <= sendArr[equ.type].basePower) {
					boo = false;
				}
				if (boo) {
					sendArr[equ.type] = equ
				}
			}
		}
		let a = []
		for (let i = 80; i < 84; i++) {
			if (sendArr[i]) {
				a.push(sendArr[i])
			}
		}
		return a;
	}

	//战甲一键升阶
	public static checkOneKeyUp(): boolean {
		let count = Model_Bag.getItemCount(Model_BingFa.DAN_LEVELUP)
		let exp = count * Model_ZhanJia.DAN_EXP
		let jieShu = Model_BySys.sysJie(Model_BySys.BING_FA)
		let jieExp = Model_BySys.sysExp(Model_BySys.BING_FA)
		let clotheslv = Config.booklv_213[jieShu]
		if (clotheslv && clotheslv.exp > 0) {
			if (exp + jieExp >= clotheslv.exp) {
				return true;
			}
		}
		return false;
	}

	//战甲技能升级
	public static checkSkill(id): boolean {
		let obj = Config.booklvskill_213[id];
		let jieShu = Model_BySys.sysJie(Model_BySys.BING_FA);
		if (obj.next == 0) {//已满级
			return false;
		} else {
			var consumeArr = ConfigHelp.SplitStr(obj.consume);
			var hasCont = Model_Bag.getItemCount(Number(consumeArr[0][1]));
			if (jieShu >= obj.lv && hasCont >= Number(consumeArr[0][2])) {
				return true;
			}
		}
		return false;
	}

	//升阶
	public static checkUpJie(): boolean {
		if (Model_BingFa.checkOneKeyUp()) {
			return true;
		}
		//技能升级
		let skillArr = Model_BySys.sysSkillArr(Model_BySys.BING_FA);
		let len = skillArr.length
		for (let i = 0; i < len; i++) {
			let id = skillArr[i]
			if (Model_BingFa.checkSkill(id)) {
				return true;
			}
		}
		if (Model_BingFa.bingFaWearArr().length > 0) {
			return true;
		}
		return false;
	}

	public checkAndShow(id: number) {
		var arr = this.data;
		if (arr == null || arr.length == 0) return;
		for (let i = 0, len = arr.length; i < len; i++) {
			var vo: VoBingFa = arr[i];
			if (!vo.star) {
				var costArr = vo.item;
				if (costArr[0][1] == id) {
					VTipBWJiHuo.add(vo);
					break;
				}
			}
		}
	}
	/**材料到兵法的映射 */
	private static matToBingFa: { [key: number]: VoBingFa } = {};
	/**通过激活材料(升星材料)判断使用该材料的兵法是否已经满星 */
	public static isFullByMat(vo: VoItem) {
		if (this.matToBingFa[vo.id]) {
			const data = this.matToBingFa[vo.id];
			return data.star >= data.starMax;
		} else {
			const datas = GGlobal.modelBingFa.data;
			for (let i = 0; datas && i < datas.length; i++) {
				const data = datas[i];
				const id = Number(data.item[0][1]);
				this.matToBingFa[id] = data;
				if (id == vo.id) {
					return data.star >= data.starMax;
				}
			}
		}
		return false;
	}
}