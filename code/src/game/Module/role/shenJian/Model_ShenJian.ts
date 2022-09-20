class Model_ShenJian extends BaseModel {
	public static shenJianId: number = 0;
	public static drugCount: number = 0;
	/**神剑属性丹 */
	public static drugId: number = 412009;
	public static drugIndex: number = 7;
	public static drugMax: number;
	public static DAN_LEVELUP: number = 411007;
	public static DAN_EXP: number = 10;

	public static checkUpStarNotice(): boolean {
		let len = Model_ShenJian.shenjianArr.length;
		for (let i = 0; i < len; i++) {
			let vo: Vo_ShenJian = Model_ShenJian.shenjianArr[i];
			if (Model_ShenJian.checkUpStarGridNotice(vo)) return true;
		}
		return false;
	}

	public static checkUpStarGridNotice(vo: Vo_ShenJian): boolean {
		let itemVo: VoItem = VoItem.create(vo.costArr[0][1]);
		let count = Model_Bag.getItemCount(itemVo.id);
		if (count >= vo.costArr[0][2] && vo.starLv < vo.starMax) {
			return true;
		}
		return false;
	}

	public static checkDrugNotice(): boolean {
		Model_ShenJian.drugMax = 0;
		let len = Model_ShenJian.shenjianArr.length;
		for (let i = 0; i < len; i++) {
			let vo: Vo_ShenJian = Model_ShenJian.shenjianArr[i];
			if (vo.starLv > 0) {
				Model_ShenJian.drugMax += vo.drugMax * vo.starLv;
			}
		}
		if (Model_ShenJian.drugCount < Model_ShenJian.drugMax) {
			let count = Model_Bag.getItemCount(Model_ShenJian.drugId);
			if (count > 0) return true;
		}
		return false;
	}

	private static _shenjianArr: Array<Vo_ShenJian> = [];
	public static get shenjianArr(): Array<Vo_ShenJian> {
		if (Model_ShenJian._shenjianArr.length <= 0) {
			for (let key in Config.sword_216) {
				let vo: Vo_ShenJian = Vo_ShenJian.create(parseInt(key));
				Model_ShenJian._shenjianArr.push(vo);
			}
			Model_ShenJian._shenjianArr.sort(Model_ShenJian.sortShenJian);
		}
		return Model_ShenJian._shenjianArr;
	}

	public static sortShenJian(a: Vo_ShenJian, b: Vo_ShenJian): number {
		if (a.state == b.state) {
			if (a.quality == b.quality) {
				return a.id - b.id;
			} else {
				if (a.state == 3) {
					return a.quality - b.quality;
				} else {
					return b.quality - a.quality;
				}
			}
		} else {
			return a.state - b.state;
		}
	}

	public static isShenJianJHItem(id: number) {
		return Config.daoju_204[id] && Config.daoju_204[id].sys == UIConst.SHEN_JIAN;
	}
	public static checkAndShow(id: number) {
		var arr = this.shenjianArr;
		for (let i = 0, len = arr.length; i < len; i++) {
			var vo: Vo_ShenJian = arr[i];
			if (vo.starLv == 0) {
				var costArr = vo.costArr;
				if (costArr[0][1] == id) {
					// GGlobal.layerMgr.open(UIConst.BAOWU_GETTIPS, vo);
					VTipBWJiHuo.add(vo);
					break;
				}
			}
		}
	}

	/***1001 打开神剑界面   */
	public CG_OPEN_SHENJIAN(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1001, ba);
	}

	/**1003 激活神剑 I:神剑id    */
	public CG_SHENJIAN_JIHUO(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(1003, ba);
	}

	/**1005 神剑升星 I:神剑id     */
	public CG_SHENJIAN_UPSTAR(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(1005, ba);
	}

	/**1007 吞噬神剑属性丹 B:0：吞噬，1：一键吞噬     */
	public CG_SHENJIAN_TUNSHI(type: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(1007, ba);
	}

	/**1009 神剑操作 B:操作类型: 1：装备上，2：卸下I:神剑id      */
	public CG_SHENJIAN_EQUIP(type: number, id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(id);
		this.sendSocket(1009, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(1002, this.GC_OPEN_SHENJIAN, this);
		wsm.regHand(1004, this.GC_SHENJIAN_JIHUO, this);
		wsm.regHand(1006, this.GC_SHENJIAN_UPSTAR, this);
		wsm.regHand(1008, this.GC_SHENJIAN_TUNSHI, this);
		wsm.regHand(1010, this.GC_SHENJIAN_EQUIP, this);
	}

	/**1010 神剑操作结果 B:0：失败，1：成功B:失败：错误码（1：未激活，2：已装备，3：未装备），成功：操作类型I:神剑id  */
	public GC_SHENJIAN_EQUIP(self: Model_ShenJian, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let type: number = data.readByte();
			let shenJianID: number = data.readInt();
			if (type == 1) {
				Model_player.voMine.setShenJian(shenJianID);
				Model_ShenJian.shenJianId = shenJianID;
			} else {
				Model_ShenJian.shenJianId = 0;
				Model_player.voMine.setShenJian(0);
			}
			GGlobal.control.notify(Enum_MsgType.SHENJIAN_DATA_UPDATE);
		}
	}

	/**1008 吞噬结果 B:0：失败，1：成功I:失败：错误码（1：材料不足，2：达使用上限），成功：已使用剑神属性丹数    */
	public GC_SHENJIAN_TUNSHI(self: Model_ShenJian, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let drugNum = data.readInt();
			Model_ShenJian.drugCount = drugNum;
			GGlobal.control.notify(Enum_MsgType.SHENJIAN_DATA_UPDATE);
		}
	}

	/**1006 升星结果 B:0：失败，1：成功I:失败：错误码（1：未激活，2：神剑不存在，3：材料不足），成功：神剑idI:星级   */
	public GC_SHENJIAN_UPSTAR(self: Model_ShenJian, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id: number = data.readInt();
			let starLv: number = data.readInt();
			let len = Model_ShenJian.shenjianArr.length;
			for (let i = 0; i < len; i++) {
				if (Model_ShenJian.shenjianArr[i].id == id) {
					Model_ShenJian.shenjianArr[i].starLv = starLv;
					if (starLv >= Model_ShenJian.shenjianArr[i].starMax) {
						GGlobal.control.notify(UIConst.JUEXING);
					}
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.SHENJIAN_DATA_UPDATE);
		}
	}

	/**1004 激活神剑结果 B:0：失败，1：成功I:失败：错误码（1：神剑不存在，2：材料不足），成功：神剑idI:星级  */
	public GC_SHENJIAN_JIHUO(self: Model_ShenJian, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id: number = data.readInt();
			let starLv: number = data.readInt();
			let len = Model_ShenJian.shenjianArr.length;
			for (let i = 0; i < len; i++) {
				if (Model_ShenJian.shenjianArr[i].id == id) {
					Model_ShenJian.shenjianArr[i].starLv = starLv;
					break;
				}
			}
			self.CG_SHENJIAN_EQUIP(1, id);
			GGlobal.control.notify(Enum_MsgType.SHENJIAN_DATA_UPDATE);
		}
	}

	public static isFirstOpen = false;
	/***1002 神剑信息返回 I:装备的神剑idI:已使用的神剑属性丹数量[I:神剑idI:星级]拥有的神剑信息  */
	public GC_OPEN_SHENJIAN(self: Model_ShenJian, data: BaseBytes): void {
		Model_ShenJian.isFirstOpen = true;
		Model_ShenJian.shenJianId = data.readInt();
		Model_player.voMine.setShenJian(Model_ShenJian.shenJianId);
		Model_ShenJian.drugCount = data.readInt();
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let shenJianId = data.readInt();
			let starLv = data.readInt();
			for (let j = 0; j < Model_ShenJian.shenjianArr.length; j++) {
				let vo: Vo_ShenJian = Model_ShenJian.shenjianArr[j];
				if (vo.id == shenJianId) {
					vo.starLv = starLv;
					break;
				}
			}
		}
		GGlobal.control.notify(Enum_MsgType.SHENJIAN_DATA_UPDATE);
	}

	//一键升阶
	public static checkOneKeyUp(): boolean {
		let jieShu = Model_BySys.sysJie(Model_BySys.SHEN_JIAN);
		let jieExp = Model_BySys.sysExp(Model_BySys.SHEN_JIAN);
		let count = Model_Bag.getItemCount(Model_ShenJian.DAN_LEVELUP)
		let exp = count * Model_ShenJian.DAN_EXP
		let clotheslv = Config.swordlv_216[jieShu]
		if (clotheslv && clotheslv.exp > 0) {
			if (exp + jieExp >= clotheslv.exp) {
				return true;
			}
		}
		return false;
	}

	//	获取可以穿的武将装备
	public static shenJianWearArr(): Array<VoEquip> {
		let arr: Array<VoEquip> = Model_Bag.filterEquips(Model_Bag.filterShenJianEquip, null);
		let d = Model_player.voMine.equipData
		let sendArr = {};
		for (let i = 0; i < arr.length; i++) {
			let equ = arr[i];
			let jieShu = Model_BySys.sysJie(Model_BySys.SHEN_JIAN);
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
		for (let i = 60; i < 64; i++) {
			if (sendArr[i]) {
				a.push(sendArr[i])
			}
		}
		return a;
	}

	//技能升级
	public static checkSkill(id): boolean {
		let obj = Config.swordlvskill_216[id];
		let jieShu = Model_BySys.sysJie(Model_BySys.SHEN_JIAN);
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
		if (Model_ShenJian.checkOneKeyUp()) {
			return true;
		}
		//技能升级
		let skillArr = Model_BySys.sysSkillArr(Model_BySys.SHEN_JIAN);
		let len = skillArr.length
		for (let i = 0; i < len; i++) {
			let id = skillArr[i]
			if (Model_ShenJian.checkSkill(id)) {
				return true;
			}
		}
		if (Model_ShenJian.shenJianWearArr().length > 0) {
			return true;
		}
		return false;
	}
	/**材料到神剑的映射 */
	private static matToShenJian: { [key: number]: Vo_ShenJian } = {};
	/**通过激活材料(升星材料)判断使用该材料的神剑是否已经满星 */
	public static isFullByMat(vo: VoItem) {
		if (this.matToShenJian[vo.id]) {
			const data = this.matToShenJian[vo.id];
			return data.starLv >= data.starMax;
		} else {
			const datas = Model_ShenJian.shenjianArr;
			for (let i = 0; i < datas.length; i++) {
				const data = datas[i];
				const costArr = data.costArr;
				if (costArr) {
					const id = Number(costArr[0][1]);
					this.matToShenJian[id] = data;
					if (id == vo.id) {
						return data.starLv >= data.starMax;
					}
				}
			}
		}
		return false;
	}
}