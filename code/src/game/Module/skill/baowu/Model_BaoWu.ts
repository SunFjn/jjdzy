class Model_BaoWu extends BaseModel {

	public static equipBWIDArr: Array<any> = [0, 0];
	public static level: number = 1;
	public static exp: number = 0;
	public static drugNum: number = 0;
	/**宝物培养丹ID */
	public static itemId: number = 411003;
	/**宝物属性丹ID */
	public static drugId: number = 412005;
	/**宝物属性丹索引 */
	public static drugIndex: number = 5;
	/**属性丹吞噬上限 */
	public static drugMax: number = 0;
	/**宝物培养丹 */
	public static DAN_LEVELUP: number = 411003;
	public static DAN_EXP: number = 10;
	public static checkUpStarNotice(): boolean {
		let len = Model_BaoWu.baowuArr.length;
		for (let i = 0; i < len; i++) {
			let vo: Vo_BaoWu = Model_BaoWu.baowuArr[i];
			if (Model_BaoWu.checkUpStarGridNotice(vo)) return true;
		}
		return false;
	}

	public static checkUpStarGridNotice(vo: Vo_BaoWu): boolean {
		let itemVo: VoItem = VoItem.create(vo.costArr[0][1]);
		let count = Model_Bag.getItemCount(itemVo.id);
		if (count >= vo.costArr[0][2] && vo.starLv < vo.starMax) {
			return true;
		}
		return false;
	}

	// public static checkUpLevelNotice(): boolean {
	// 	let cfg = Config.baolv_214[Model_BaoWu.level];
	// 	if (cfg) {
	// 		let count = Model_Bag.getItemCount(Model_BaoWu.itemId);
	// 		if (count * 10 + Model_BaoWu.exp >= cfg.exp && cfg.exp > 0) {
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// }

	/**更换按钮红点 */
	public static checkChangeBtNotice(type: number): boolean {
		if (Model_BaoWu.equipBWIDArr[type] <= 0) {
			for (let i = 0; i < Model_BaoWu.baowuArr.length; i++) {
				let vo: Vo_BaoWu = Model_BaoWu.baowuArr[i];
				if (vo.state == 2) {
					return true;
				}
			}
		}
		return false;
	}

	public static checkDrugNotice(): boolean {
		let len = Model_BaoWu.baowuArr.length;
		Model_BaoWu.drugMax = 0;
		for (let i = 0; i < len; i++) {
			let vo: Vo_BaoWu = Model_BaoWu.baowuArr[i];
			if (vo.starLv > 0) {
				Model_BaoWu.drugMax += vo.drugMax * vo.starLv;
			}
		}
		if (Model_BaoWu.drugNum < Model_BaoWu.drugMax) {
			let count = Model_Bag.getItemCount(Model_BaoWu.drugId);
			if (count > 0) return true;
		}
		return false;
	}

	public static skillVo(type: number): Vo_Skill {
		let len: number = Model_BaoWu.baowuArr.length;
		let vo: Vo_Skill;
		if (Model_BaoWu.equipBWIDArr[type] > 0) {
			for (let i = 0; i < len; i++) {
				if (Model_BaoWu.baowuArr[i].id == Model_BaoWu.equipBWIDArr[type]) {
					return Model_BaoWu.baowuArr[i].skillVo;
				}
			}
		}
		return null;
	}

	public static get BWPower(): number {
		let power: number = 0;
		Model_BaoWu.drugMax = 0;
		let len = Model_BaoWu.baowuArr.length;
		//宝物星级战力
		for (let i = 0; i < len; i++) {
			let vo: Vo_BaoWu = Model_BaoWu.baowuArr[i];
			if (vo.starLv > 0) {
				power += vo.power + vo.starPower * (vo.starLv - 1);
				Model_BaoWu.drugMax += vo.drugMax * vo.starLv;
			}
		}
		/**宝物等级战力 */
		let cfg = Config.baolv_214[Model_BaoWu.level];
		if (cfg) {
			power += cfg.power;
		}
		/**宝物属性丹战力 */
		power += Config.drug_200[Model_BaoWu.drugIndex].power * Model_BaoWu.drugNum;
		return power;
	}

	private static _baowuArr: Array<Vo_BaoWu> = [];
	public static get baowuArr(): Array<Vo_BaoWu> {
		if (Model_BaoWu._baowuArr.length <= 0) {
			for (let key in Config.bao_214) {
				let vo: Vo_BaoWu = Vo_BaoWu.create(parseInt(key));
				vo.state = 4;
				Model_BaoWu._baowuArr.push(vo);
			}
		}
		return Model_BaoWu._baowuArr;
	}

	public static sortBaoWu(a: Vo_BaoWu, b: Vo_BaoWu): number {
		if (a.state == b.state) {
			if (a.quality == b.quality) {
				return a.id - b.id;
			} else {
				if (a.state == 4) {
					return a.quality - b.quality;
				} else {
					return b.quality - a.quality;
				}
			}
		} else {
			return a.state - b.state;
		}
	}

	public static isBaoWuJHItem(id: number) {
		return Config.daoju_204[id] && Config.daoju_204[id].sys == UIConst.BAOWU;
	}
	public static checkAndShow(id: number) {
		var arr = this.baowuArr;
		for (let i = 0, len = arr.length; i < len; i++) {
			var vo: Vo_BaoWu = arr[i];
			if (vo.state == 4) {
				var costArr = vo.costArr;
				if (costArr[0][1] == id) {
					// GGlobal.layerMgr.open(UIConst.BAOWU_GETTIPS, vo);
					VTipBWJiHuo.add(vo);
					break;
				}
			}
		}
	}

	public static mustAndShow(id: number) {
		var arr = this.baowuArr;
		for (let i = 0, len = arr.length; i < len; i++) {
			var vo: Vo_BaoWu = arr[i];
			var costArr = vo.costArr;
			if (costArr[0][1] == id) {
				VTipBWJiHuo.add(vo);
				break;
			}
		}
	}

	/**941  打开宝物界面   */
	public CG_OPEN_BAOWU(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(941, ba);
	}

	/**943 切换宝物 B:位置I:要切换的宝物id    */
	public CG_CHANGE_BAOWU(pos: number, id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(pos);
		ba.writeInt(id);
		this.sendSocket(943, ba);
	}

	/**945  升级等级  */
	public CG_BAOWU_UPGRADE(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(945, ba);
	}

	/**947  一键升级    */
	public CG_BAOWU_KEYUPGRADE(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(947, ba);
	}

	/**949 激活宝物 I:宝物id     */
	public CG_BAOWU_JIHUO(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(949, ba);
	}

	/**951 宝物升星 I:宝物id     */
	public CG_BAOWU_UPSTAR(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(951, ba);
	}

	/**953 吞噬宝物属性丹 B:吞噬类型：0：吞噬，1：一键吞噬    */
	public CG_BAOWU_TUNSHI(type: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(953, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(942, this.GC_OPEN_BAOWU, this);
		wsm.regHand(944, this.GC_CHANGE_BAOWU, this);
		wsm.regHand(946, this.GC_BAOWU_UPGRADE, this);
		wsm.regHand(950, this.GC_BAOWU_JIHUO, this);
		wsm.regHand(952, this.GC_BAOWU_UPSTAR, this);
		wsm.regHand(954, this.GC_BAOWU_TUNSHI, this);
	}

	/**954 吞噬结果 B:吞噬结果：0：失败，1成功I:失败：错误码（1：材料不足，2：达可使用数量上限），成功：已使用宝物属性丹数量   */
	public GC_BAOWU_TUNSHI(self: Model_BaoWu, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let drugNum = data.readInt();
			Model_BaoWu.drugNum = drugNum;
			GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
		}
	}

	/**952 升星结果 B:0：失败，1：成功I:失败：错误码（1：宝物不存在，2：已到达最高星级，3：材料不足），成功：宝物idI:宝物星级  */
	public GC_BAOWU_UPSTAR(self: Model_BaoWu, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id: number = data.readInt();
			let starLv: number = data.readInt();
			let len = Model_BaoWu.baowuArr.length;
			for (let i = 0; i < len; i++) {
				if (Model_BaoWu.baowuArr[i].id == id) {
					Model_BaoWu.baowuArr[i].starLv = starLv;
					if (starLv >= Model_BaoWu.baowuArr[i].starMax) {
						GGlobal.control.notify(UIConst.JUEXING);
					}
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
		}
	}

	/**950 激活宝物结果 B:0：失败，1：成功I:失败：错误码（1：宝物不存在，2：材料不足），成功：宝物idI:星级  */
	public GC_BAOWU_JIHUO(self: Model_BaoWu, data: BaseBytes): void {
		let result = data.readByte();
		let id: number = data.readInt();
		if (result == 1) {
			let starLv: number = data.readInt();
			let len = Model_BaoWu.baowuArr.length;
			for (let i = 0; i < len; i++) {
				if (Model_BaoWu.baowuArr[i].id == id) {
					Model_BaoWu.baowuArr[i].starLv = starLv;
					Model_BaoWu.baowuArr[i].state = 3;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
		}
	}

	/**946 升级结果返回 B:0：失败，1：成功I:失败：错误码（1：材料不足），成功：等级I:经  */
	public GC_BAOWU_UPGRADE(self: Model_BaoWu, data: BaseBytes): void {
		let result = data.readByte();
		VZhiShengDan.invalNum = 2;
		if (result == 1) {
			let level = data.readInt();
			let exp = data.readInt();
			Model_BaoWu.level = level;
			Model_BaoWu.exp = exp;
			GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
		}
	}

	/*944 切换宝物结果 B:0：失败，1:成功B:失败：错误码（1：未激活宝物），成功：位置I:宝物id */
	public GC_CHANGE_BAOWU(self: Model_BaoWu, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let pos: number = data.readByte();
			let id: number = data.readInt();
			if (Model_BaoWu.equipBWIDArr[0] == id) {
				Model_BaoWu.equipBWIDArr[0] = 0;
			}
			if (Model_BaoWu.equipBWIDArr[1] == id) {
				Model_BaoWu.equipBWIDArr[1] = 0;
			}

			Model_BaoWu.equipBWIDArr[pos - 1] = id;
			for (let j = 0; j < Model_BaoWu.baowuArr.length; j++) {
				let vo: Vo_BaoWu = Model_BaoWu.baowuArr[j];
				if (vo.id == Model_BaoWu.equipBWIDArr[0]) {
					vo.state = 0;
				} else if (vo.id == Model_BaoWu.equipBWIDArr[1]) {
					vo.state = 1;
				} else if (vo.starLv > 0) {
					vo.state = 3;
				} else {
					if (Model_BaoWu.checkUpStarGridNotice(vo)) {
						vo.state = 2;
					} else {
						vo.state = 4;
					}
				}
			}
			GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
			GGlobal.control.notify(Enum_MsgType.BAOWU_SKILL_UPDATE);
		}
	}

	/**942 宝物信息返回 I:装备宝物id（位置1）I:装备宝物id（位置2）I:等级I:经验I:已使用宝物属性丹个数[I:宝物idI:星级]拥有的宝物信息  */
	public GC_OPEN_BAOWU(self: Model_BaoWu, data: BaseBytes): void {
		let bwId0 = data.readInt();
		let bwId1 = data.readInt();
		let level: number = data.readInt();
		let exp: number = data.readInt();
		let drugCount: number = data.readInt();
		Model_BaoWu.level = level;
		Model_BaoWu.exp = exp;
		Model_BaoWu.drugNum = drugCount;
		Model_BaoWu.equipBWIDArr = [bwId0, bwId1];

		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let bwID = data.readInt();
			let starLv = data.readInt();
			for (let j = 0; j < Model_BaoWu.baowuArr.length; j++) {
				let vo: Vo_BaoWu = Model_BaoWu.baowuArr[j];
				if (vo.id == bwID) {
					if (bwID == bwId0) {
						vo.state = 0;
					} else if (bwID == bwId1) {
						vo.state = 1;
					} else if (starLv > 0) {
						vo.state = 3;
					} else {
						if (Model_BaoWu.checkUpStarGridNotice(vo)) {
							vo.state = 2;
						} else {
							vo.state = 4;
						}
					}
					vo.starLv = starLv;
					break;
				}
			}
		}
		GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
		GGlobal.control.notify(Enum_MsgType.BAOWU_SKILL_UPDATE);
	}

	//一键升阶
	public static checkOneKeyUp(): boolean {
		let jieShu = Model_BaoWu.level;
		let jieExp = Model_BaoWu.exp;
		let count = Model_Bag.getItemCount(Model_BaoWu.DAN_LEVELUP)
		let exp = count * Model_BaoWu.DAN_EXP
		let clotheslv = Config.baolv_214[jieShu]
		if (clotheslv.exp > 0) {
			if (exp + jieExp >= clotheslv.exp) {
				return true;
			}
		}
		return false;
	}

	//	获取可以穿的武将装备
	public static baoWuWearArr(): Array<VoEquip> {
		let arr: Array<VoEquip> = Model_Bag.filterEquips(Model_Bag.filterBaoWuEquip, null);
		let d = Model_player.voMine.equipData
		let sendArr = {};
		for (let i = 0; i < arr.length; i++) {
			let equ = arr[i];
			let jieShu = Model_BaoWu.level;
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
		for (let i = 90; i < 94; i++) {
			if (sendArr[i]) {
				a.push(sendArr[i])
			}
		}
		return a;
	}

	//技能升级
	public static checkSkill(id): boolean {
		let obj = Config.baolvskill_214[id];
		let jieShu = Model_BaoWu.level;
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
		if (Model_BaoWu.checkOneKeyUp()) {
			return true;
		}
		//技能升级
		let skillArr = Model_BySys.sysSkillArr(Model_BySys.BAO_WU);
		let len = skillArr.length
		for (let i = 0; i < len; i++) {
			let id = skillArr[i]
			if (Model_BaoWu.checkSkill(id)) {
				return true;
			}
		}
		if (Model_BaoWu.baoWuWearArr().length > 0) {
			return true;
		}
		return false;
	}
	/**材料到宝物的映射 */
	private static matToBaoWu: { [key: number]: Vo_BaoWu } = {};
	/**通过激活材料(升星材料)判断使用该材料的宝物是否已经满星 */
	public static isFullByMat(vo: VoItem) {
		if (this.matToBaoWu[vo.id]) {
			const data = this.matToBaoWu[vo.id];
			return data.starLv >= data.starMax;
		} else {
			const datas = this.baowuArr;
			for (let i = 0; i < datas.length; i++) {
				const data = datas[i];
				const id = Number(data.costArr[0][1]);
				this.matToBaoWu[id] = data;
				if (id == vo.id) {
					return data.starLv >= data.starMax;
				}
			}
		}
		return false;
	}
}