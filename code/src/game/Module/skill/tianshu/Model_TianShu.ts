class Model_TianShu extends BaseModel {
	public constructor() {
		super();
	}
	public static peiyangdan = 411008;//资质丹
	private _drugID: number = 0;//属性丹
	get drugID() {
		if (this._drugID == 0) {
			var lib = Config.drug_200[8];
			this._drugID = lib['id'];
		}
		return this._drugID;
	}

	/**当前的装备天书ID*/
	public currentID: number = 0;
	/**当前天书的等级*/
	public level: number = 0;
	/**当前天书的经验*/
	public exp: number = 0;
	/**天书属性丹数量*/
	public shuxingdan: number = 0;
	/**天书培养丹*/
	public static DAN_LEVELUP: number = 411008;
	public static DAN_EXP: number = 10;

	getVoByID(id) {
		let vo: VoTianShu;
		var data = this.data;
		let l = data.length;
		for (var i = 0; i < l; i++) {
			vo = data[i];
			if (vo.id == id)
				return vo;
		}
		return null;
	}

	private _data: VoTianShu[];
	public get data() {
		if (!this._data) {
			this._data = [];
			var lib = Config.book_215;
			var vo: VoTianShu;
			for (var i in lib) {
				vo = new VoTianShu();
				vo.id = Number(i);
				vo.initLib();
				this._data.push(vo);
			}
		}
		return this._data;
	}

	private maxLevel: number = 0;
	getBookLvMax() {
		if (this.maxLevel != 0) return this.maxLevel;
		var l = Config.booklv_215;
		for (var i in l) {
			this.maxLevel++;
		}
		return this.maxLevel;
	}

	getDrugCount(): number {
		var data = this.data;
		var ret = 0;
		var vo;
		var l = data.length;
		for (var i = 0; i < l; i++) {
			vo = data[i];
			ret += vo.dragCount;
		}
		return ret;
	}

	sortData() {
		var vo;
		var d = this.data;
		var l = d.length;
		let s = this;
		for (var i = 0; i < l; i++) {
			vo = d[i];
			if (vo.id == s.currentID) {
				vo.sortIndex = vo.id + 900000000;
			} else if (vo.star > 0) {
				vo.sortIndex = vo.id + 1000000;
			} else if (vo.canAcitvate()) {
				vo.sortIndex = vo.id + 100000000;
			} else {
				vo.sortIndex = vo.id;
			}
		}
		s._data = s._data.sort(function (a, b) {
			if (s.currentID == a.id) {
				return -1;
			} else if (s.currentID == b.id) {
				return 1;
			} else if ((a.star > 0 && b.star > 0) || (a.canAcitvate() && a.star <= 0 && b.canAcitvate() && b.star <= 0)) {
				if (a.pin == b.pin) {
					return b.sortIndex - a.sortIndex;
				} else {
					return b.pin - a.pin;
				}
			} else if (!a.canAcitvate() && a.star <= 0 && !b.canAcitvate() && b.star <= 0) {
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

	getTianShuSkill() {
		if (this.currentID == 0) return null;
		var vo = this.getVoByID(this.currentID);
		var svo = Vo_Skill.create(vo.skillID, vo.star, vo.star);
		return svo;
	}

	getTotalStar() {
		let vo: VoTianShu;
		let s = 0;
		var data = this.data;
		let l = data.length;
		for (var i = 0; i < l; i++) {
			vo = data[i];
			s += vo.star;
		}
		return s;
	}

	public isTianShuJHItem(id: number) {
		return Config.daoju_204[id] && Config.daoju_204[id].sys == UIConst.TIANSHU;
	}
	public checkAndShow(id: number) {
		var arr = this.data;
		for (let i = 0, len = arr.length; i < len; i++) {
			var vo: VoTianShu = arr[i];
			if (!vo.star) {
				var costArr = JSON.parse(vo.item);
				if (costArr[0][1] == id) {
					// GGlobal.layerMgr.open(UIConst.BAOWU_GETTIPS, vo);
					VTipBWJiHuo.add(vo);
					break;
				}
			}
		}
	}

	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(972, this.GC_OPENUI_972, this);
		mgr.regHand(974, this.GC_CHANGETIANSHU_974, this);
		mgr.regHand(976, this.GC_LEVELUP_976, this);
		mgr.regHand(978, this.GC_STARUP_978, this);
		mgr.regHand(980, this.GC_TUNSHI_980, this);
	}

	/**
	 * 971
	 * CG 打开天书UI
	*/
	public CG_OPENUI_971() {
		var ba = this.getBytes();
		this.sendSocket(971, ba);
	}
	/**
	 * 972
	 * GC 打开天书Ui返回 I:当前携带天书id 0没有I:天书等级I:天书经验[I:天书idI:天书星级]I:天书属性丹数量
	*/
	private GC_OPENUI_972(self: Model_TianShu, data: BaseBytes) {
		self.currentID = data.readInt();
		self.level = data.readInt();
		self.exp = data.readInt();
		var l = data.readShort();
		let vo: VoTianShu;
		for (var i = 0; i < l; i++) {
			vo = self.getVoByID(data.readInt());
			vo.star = data.readInt();
			vo.initLib();
		}
		self.sortData();
		self.shuxingdan = data.readInt();
		GGlobal.control.notify(Enum_MsgType.MSG_TS_UPDATE);
		GGlobal.control.notify(Enum_MsgType.MSG_TS_WAEAR);
	}

	/**
 	* 973
 	* CG 切换携带天书 I:天书id
	*/
	public CG_CHANGETIANSHU_973(id) {
		var ba = this.getBytes();
		ba.writeInt(id);
		this.sendSocket(973, ba);
	}
	/**
	 * 974
	 * 	GC 切换携带天书 I:当前携带天书id
	*/
	private GC_CHANGETIANSHU_974(self: Model_TianShu, data: BaseBytes) {
		self.currentID = data.readInt();
		self.sortData();
		GGlobal.control.notify(Enum_MsgType.MSG_TS_WAEAR);
	}


	/**
	 * 975
	 * CG 升级天书 B:升级方式 0 1颗 1一键
	*/
	public CG_LEVELUP_975(type) {
		var ba = this.getBytes();
		ba.writeByte(type);
		this.sendSocket(975, ba);
	}
	/**
	 * 976
	 * GC 升级返回 B:0成功 1失败I:经验I:等级
	*/
	private GC_LEVELUP_976(self: Model_TianShu, data: BaseBytes) {
		let ret = data.readByte();
		VZhiShengDan.invalNum = 2;
		if (ret == 1) ViewCommonWarn.text("升级失败");
		else {
			let exp = data.readInt();
			let lv = data.readInt();
			self.exp = exp;
			self.level = lv;
			GGlobal.control.notify(Enum_MsgType.MSG_TS_LEVELUP);
		}
	}

	/**
	 * 977
	 * CG 激活/升阶天书星级 I:天书id
	*/
	public CG_STARUP_977(id) {
		var ba = this.getBytes();
		ba.writeInt(id);
		this.sendSocket(977, ba);
	}
	/**
	 * 978
	 * 	GC 升星返回 B:0成功1失败I:天书idI:星级
	*/
	private GC_STARUP_978(self: Model_TianShu, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 1) ViewCommonWarn.text("升星失败");
		else {
			let id = data.readInt();
			let star = data.readInt();
			let vo = self.getVoByID(id);
			vo.star = star;
			vo.updatePower();
			self.sortData();
			if (vo.star >= vo.starMax) {
				GGlobal.control.notify(UIConst.JUEXING);
			}
			GGlobal.control.notify(Enum_MsgType.MSG_TS_STAR);
		}
	}

	/**
	 * 979
	 * CG 使用丹药 B:0 1颗 1一键
	*/
	public CG_TUNSHI_979(type) {
		var ba = this.getBytes();
		ba.writeByte(type);
		this.sendSocket(979, ba);
	}
	/**
	 * 980
	 * 	GC 使用天书属性丹返回 B:0成功 1失败I:属性丹数量
	*/
	private GC_TUNSHI_980(self: Model_TianShu, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 1) ViewCommonWarn.text("使用失败");
		else {
			self.shuxingdan = data.readInt();
			GGlobal.control.notify(Enum_MsgType.MSG_TS_DRUG);
		}
	}

	//一键升阶
	public static checkOneKeyUp(): boolean {
		let jieShu = GGlobal.modeltianshu.level;
		let jieExp = GGlobal.modeltianshu.exp;
		let count = Model_Bag.getItemCount(Model_TianShu.DAN_LEVELUP)
		let exp = count * Model_TianShu.DAN_EXP
		let clotheslv = Config.booklv_215[jieShu]
		if (clotheslv && clotheslv.exp > 0) {
			if (exp + jieExp >= clotheslv.exp) {
				return true;
			}
		}
		return false;
	}

	//	获取可以穿的武将装备
	public static tianShuWearArr(): Array<VoEquip> {
		let arr: Array<VoEquip> = Model_Bag.filterEquips(Model_Bag.filterTianShuEquip, null);
		let d = Model_player.voMine.equipData
		let sendArr = {};
		for (let i = 0; i < arr.length; i++) {
			let equ = arr[i];
			let jieShu = GGlobal.modeltianshu.level;
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
		for (let i = 100; i < 104; i++) {
			if (sendArr[i]) {
				a.push(sendArr[i])
			}
		}
		return a;
	}

	//技能升级
	public static checkSkill(id): boolean {
		let obj = Config.booklvskill_215[id];
		let jieShu = GGlobal.modeltianshu.level;
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
		if (Model_TianShu.checkOneKeyUp()) {
			return true;
		}
		//技能升级
		let skillArr = Model_BySys.sysSkillArr(Model_BySys.TIAN_SHU);
		let len = skillArr.length
		for (let i = 0; i < len; i++) {
			let id = skillArr[i]
			if (Model_TianShu.checkSkill(id)) {
				return true;
			}
		}
		if (Model_TianShu.tianShuWearArr().length > 0) {
			return true;
		}
		return false;
	}
	/**材料到天书的映射 */
	private static matToTianShu: { [key: number]: VoTianShu } = {};
	/**通过激活材料(升星材料)判断使用该材料的天书是否已经满星 */
	public static isFullByMat(vo: VoItem) {
		if (this.matToTianShu[vo.id]) {
			const data = this.matToTianShu[vo.id];
			return data.star >= data.starMax;
		} else {
			const datas = GGlobal.modeltianshu.data;
			for (let i = 0; i < datas.length; i++) {
				const data = datas[i];
				const costArr = JSON.parse(data.item);
				if (costArr) {
					const id = Number(costArr[0][1]);
					this.matToTianShu[id] = data;
					if (id == vo.id) {
						return data.star >= data.starMax;
					}
				}
			}
		}
		return false;
	}
}