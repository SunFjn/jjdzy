class Model_DuanZao extends BaseModel {
	public static pkg: fairygui.UIPackage;
	public static isGetData: boolean = false;
	/***噬魂丹数量 */
	public static drugArr: Array<any> = [0, 0, 0];
	/***套装阶数 */
	public static suitArr: Array<any> = [0, 0, 0];
	/***强化最低数 */
	public static strengMinLV: number;
	/***宝石等级 */
	public static gemLv: number;
	/***最低星级数 */
	public static starMinLv: number;
	/**铸魂道具ID */
	public static itemIDArr: Array<any> = [410003, 410004, 410005];
	/**铸魂道具获得经验 */
	public static expArr: Array<any> = [10, 50, 100];
	/**升星总战力 */
	public static upstarPower: number = 0;
	public constructor() {
		super();
	}

	public static getDuanZaoPower() {
		let power = 0;
		let equipData = Model_player.voMine.equipData;
		for (let i = 0; i < Model_Equip.EQUIPMAX; i++) {
			let vo: VoEquip = equipData[i];
			if (vo) {
				power += Config.dzqianghua_209[vo.qh].power;
				let len = vo.bs.length;
				for (let i = 0; i < len; i++) {
					if (vo.bs[i] > 0) {
						power += Config.dzgem_209[vo.bs[i]].power;
					}
				}
				power += Math.floor(vo.basePower * Config.dzstar_209[vo.starLv].addition / 100000);
				power += Config.dzsoul_209[vo.zhuHunLv].power;
				for (let i = 0; i < Model_DuanZao.suitArr.length; i++) {
					let suitLv = Model_DuanZao.suitArr[i];
					if (suitLv > 0 && i == 0) {
						power += Config.dzqianghuasuit_209[suitLv].power;
					} else if (suitLv > 0 && i == 1) {
						power += Config.dzgemsuit_209[suitLv].power;
					} else if (suitLv > 0 && i == 2) {
						power += Config.dzstarsuit_209[suitLv].power;
					}
					let count = Model_DuanZao.drugArr[i];
					if (count > 0) {
						power += Config.dzinsoul_209[i + 1].power * count;
					}
				}
			}
		}
		return power;
	}

	/**获取升星总等级 */
	public static getStarLv(): number {
		let level: number = 0;
		let equipData = Model_player.voMine.equipData;
		for (let i = 0; i < Model_Equip.EQUIPMAX; i++) {
			let vo: VoEquip = equipData[i];
			if (vo) {
				level += vo.starLv;
			}
		}
		return level;
	}

	/**获取升星最低等级装备 */
	public static get checkStarMinLv(): number {
		let level: number = 0;
		let equipData = Model_player.voMine.equipData;
		for (let i = 0; i < Model_Equip.EQUIPMAX; i++) {
			let vo: VoEquip = equipData[i];
			if (i == 0) {
				if (vo) {
					level = vo.starLv;
				}
			} else {
				if (vo) {
					if (vo.starLv < level) level = vo.starLv;
				} else {
					level = 0;
				}
			}
		}
		return level;
	}

	/**获取强化最低等级 */
	public static get checkStrengMinLv(): number {
		let level: number = 0;
		let equipData = Model_player.voMine.equipData;
		for (let i = 0; i < Model_Equip.EQUIPMAX; i++) {
			let vo: VoEquip = equipData[i];
			if (i == 0) {
				if (vo) {
					level = vo.qh;
				}
			} else {
				if (vo) {
					if (vo.qh < level) level = vo.qh;
				} else {
					level = 0;
				}
			}
		}
		return level;
	}

	/**获取强化总等级 */
	public static get totStrengLv(): number {
		let level: number = 0;
		let equipData = Model_player.voMine.equipData;
		for (let key in equipData) {
			if (Model_Equip.isEquip(parseInt(key))) {
				let vo: VoEquip = equipData[key];
				level += vo.qh;
			}
		}
		return level;
	}

	/**获取宝石总等级 */
	public static get totGemLv(): number {
		let level: number = 0;
		let equipData = Model_player.voMine.equipData;
		for (let key in equipData) {
			if (Model_Equip.isEquip(parseInt(key))) {
				let vo: VoEquip = equipData[key];
				level += vo.gemLv;
			}
		}
		return level;
	}

	public static getZhuHunLv() {
		let equipData = Model_player.voMine.equipData;
		let zhuHunMinLV: number = 0;
		let index: number = 0;
		for (let key in equipData) {
			if (Model_Equip.isEquip(parseInt(key))) {
				let vo: VoEquip = equipData[key];
				if (index == 0) {
					zhuHunMinLV = vo.zhuHunLv
				} else if (vo.zhuHunLv < zhuHunMinLV) {
					zhuHunMinLV = vo.zhuHunLv;
				}
				index++;
			}
		}
		return zhuHunMinLV;
	}

	public static checkShiHunNotice(type: number): boolean {
		let cfg = Config.dzinsoul_209[type];
		let index = 0;
		let index1 = 0;
		let index2 = 0;
		let arr: Array<any> = JSON.parse(cfg.num);
		let itemArr: Array<any> = JSON.parse(cfg.consume);
		let itemID = itemArr[0][1];
		let num = Model_Bag.getItemCount(itemID);
		let zhuHunMinLV = Model_DuanZao.getZhuHunLv();
		if (zhuHunMinLV < arr[0][0]) {
			index1 = arr[0][0];
			index = arr[0][1];
		} else {
			index2++;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i][0] <= zhuHunMinLV) {
					index1 = arr[i][0];
					index = arr[i][1];
				}
			}
		}

		if (Model_DuanZao.drugArr[type - 1] >= index || index2 == 0) {
			return false;
		} else {
			return num > 0;
		}
	}

	public static checkZhuHunGridNotice(vo: VoEquip): boolean {
		let exp: number = 0;
		for (let i = 0; i < Model_DuanZao.itemIDArr.length; i++) {
			let num = Model_Bag.getItemCount(Model_DuanZao.itemIDArr[i]);
			if (num > 0) exp += Model_DuanZao.expArr[i] * num;
		}
		let cfg = Config.dzsoul_209[vo.zhuHunLv];
		if (cfg.exp > 0 && vo.zhuHunExp + exp >= cfg.exp) {
			return true;
		}
		return false;
	}

	public static checkUpStarTabNotice(): boolean {
		let equipData: Array<VoEquip> = Model_player.voMine.equipData;
		let isShow: boolean = false;
		for (let key in equipData) {
			if (Model_Equip.isEquip(parseInt(key))) isShow = Model_DuanZao.checkUpStarGridNotice(equipData[key]);
			if (isShow) return isShow;
		}
		if (!isShow) isShow = Model_DuanZao.checkStarSuitNotice();
		return isShow;
	}

	public static checkStarSuitNotice(): boolean {
		var suitLv: number = Model_DuanZao.suitArr[2];
		if (suitLv > 0) {
			var nextCfg = Config.dzstarsuit_209[suitLv + 1];
			if (nextCfg) {
				return Model_DuanZao.checkStarMinLv >= nextCfg.yaoqiu;
			} else {
				return false;
			}
		} else {
			let cfg = Config.dzstarsuit_209[1];
			return Model_DuanZao.checkStarMinLv >= cfg.yaoqiu;
		}
	}

	public static checkUpStarGridNotice(vo: VoEquip): boolean {
		let cfg = Config.dzstar_209[vo.starLv];
		if (cfg.consume != "0") {
			let costArr = JSON.parse(cfg.consume);
			let costArr1 = JSON.parse(cfg.consume1);
			let num = Model_Bag.getItemCount(costArr[0][1]);
			if (num >= costArr[0][2]) {
				return true;
			}
			let num1 = Model_Bag.getItemCount(costArr1[0][1]);
			if (num1 >= costArr1[0][2]) {
				return true;
			}
		}
		return false;
	}

	/**宝石标签页红点显示 */
	public static stoneTabShowNotices(): boolean {
		let equipData: Array<VoEquip> = Model_player.voMine.equipData;
		let isShow: boolean = false;
		for (let key in equipData) {
			if (Model_Equip.isEquip(parseInt(key))) {
				isShow = Model_DuanZao.gridShowNotice_Stone(equipData[key]);
				if (isShow) return isShow;
			}
		}
		if (!isShow) isShow = Model_DuanZao.checkGemSuitNotice();
		return isShow;
	}

	public static checkKeyBtNotice(): boolean {
		let equipData: Array<VoEquip> = Model_player.voMine.equipData;
		let ret: boolean = false;
		for (let key in equipData) {
			if (Model_Equip.isEquip(parseInt(key))) {
				let vo = equipData[key];
				for (let i = 0; i < vo.bs.length; i++) {
					let value = Model_DuanZao.gemShowNotice(vo.bs[i], i);
					if (value == 1) return ret = true;
				}
			}
		}
		return ret;
	}

	public static checkGemSuitNotice(): boolean {
		var suitLv: number = Model_DuanZao.suitArr[1];
		if (suitLv > 0) {
			var nextCfg = Config.dzgemsuit_209[suitLv + 1];
			if (nextCfg) {
				return Model_DuanZao.totGemLv >= nextCfg.lv;
			} else {
				return false;
			}
		} else {
			let cfg = Config.dzgemsuit_209[1];
			return Model_DuanZao.totGemLv >= cfg.lv;
		}
	}

	/**准备格子显示红点 --宝石标签页 */
	public static gridShowNotice_Stone(vo: VoEquip): boolean {
		for (let i = 0; i < vo.bs.length; i++) {
			let ret = Model_DuanZao.gemShowNotice(vo.bs[i], i);
			if (ret) return ret > 0;
		}
		return false;
	}

	/**宝石格子显示红点 */
	public static gemShowNotice(gemId: number, pos: number) {
		if (gemId > 0) {
			let arr: Array<VoItem> = Model_Bag.gemList;
			let len = arr.length;
			for (let i = 0; i < len; i++) {
				let vo: VoItem = arr[i];
				let cfg = Config.dzgem_209[gemId];
				let cfg1 = Config.dzgem_209[vo.id];
				if (cfg.next > 0 && cfg.position == cfg1.position) {
					if (cfg1.lv > cfg.lv) {
						return 1;
					} else if (cfg1.lv == cfg.lv && vo.count > 0) {
						return 2;
					}
				}
			}
		} else {
			let arr: Array<VoItem> = Model_Bag.gemList;
			let len = arr.length;
			for (let i = 0; i < len; i++) {
				let vo: VoItem = arr[i];
				let cfg = Config.dzgem_209[vo.id];
				if (cfg.position == pos + 1) {
					return 1;
				}
			}
		}
		return 0;
	}

	public static getStoneHandle(vo: VoItem, self: any): boolean {
		if (vo.type == 4 || vo.type == 5 || vo.type == 6 || vo.type == 7) {
			return true;
		}
		return false;
	}

	/**强化标签 */
	public static strengTabShowNotice(): boolean {
		let equipData: Array<VoEquip> = Model_player.voMine.equipData;
		let isShow: boolean = false;
		for (let key in equipData) {
			if (Model_Equip.isEquip(parseInt(key))) isShow = Model_DuanZao.gridShowNotice_Streng(equipData[key]);
			if (isShow) return isShow;
		}
		if (!isShow) isShow = Model_DuanZao.checkStrengSuitNotice();
		return isShow;
	}

	public static checkStrengSuitNotice(): boolean {
		var strengLv: number = Model_DuanZao.suitArr[0];
		if (strengLv > 0) {
			var nextCfg = Config.dzqianghuasuit_209[strengLv + 1];
			if (nextCfg) {
				return Model_DuanZao.checkStrengMinLv >= nextCfg.yaoqiu;
			} else {
				return false;
			}
		} else {
			let cfg = Config.dzqianghuasuit_209[1];
			return Model_DuanZao.checkStrengMinLv >= cfg.yaoqiu;
		}
	}

	public static checkKeyStrengNotice(): boolean {
		let equipData: Array<VoEquip> = Model_player.voMine.equipData;
		let isShow: boolean = false;
		for (let key in equipData) {
			if (Model_Equip.isEquip(parseInt(key))) isShow = Model_DuanZao.gridShowNotice_Streng(equipData[key]);
			if (isShow) return isShow;
		}
		return isShow;
	}

	/**强化格子 */
	public static gridShowNotice_Streng(vo: VoEquip): boolean {
		let cfg = Config.dzqianghua_209[vo.qh];
		if (cfg.consume != "0") {
			let gridArr: Array<any> = JSON.parse(cfg.consume);
			let num = Model_Bag.getItemCount(gridArr[1][1]);
			if (Model_player.voMine.tongbi >= gridArr[0][2] && num >= gridArr[1][2]) {
				return true;
			}
		}
		return false;
	}

	/**551  CG 获取装备锻造信息   */
	public CG_GET_EQUIPMESSAGE(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(551, ba);
	}

	/**553 CG 强化 B:要强化的位置   */
	public CG_DUANZAO_STRENG(type: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(553, ba);
	}

	/**555 CG 宝石镶嵌 B:装备部位B:宝石位置I:宝石id    */
	public CG_DUANZAO_STONE_EQUIP(type: number, part: number, stoneId: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeByte(part);
		ba.writeInt(stoneId);
		this.sendSocket(555, ba);
	}

	/**557 CG 拆除宝石 B:装备位置B:宝石位置I:宝石id    */
	public CG_DUANZAO_STONE_DEL(type: number, part: number, stoneId: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeByte(part);
		ba.writeInt(stoneId);
		this.sendSocket(557, ba);
	}

	/**559 CG 在背包内合成 I:目标宝石id     */
	public CG_DUANZAO_STONEID_HECHENG(stoneId: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(stoneId);
		this.sendSocket(559, ba);
	}

	/**561 CG 合成宝石在装备上 I:宝石idB:装备位置B:宝石类型     */
	public CG_DUANZAO_STONEID_HECHENG_BYEQUIP(stoneId: number, type: number, stonetype: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(stoneId);
		ba.writeByte(type);
		ba.writeByte(stonetype);
		this.sendSocket(561, ba);
	}

	/**563 CG 一键镶嵌    */
	public CG_DUANZAO_STONEID_KEYXQ(part): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(part);
		this.sendSocket(563, ba);
	}

	/**565 CG 升星 B:装备位置      */
	public CG_DUANZAO_UPGRADESTAR(type: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(565, ba);
	}

	/**567 CG 铸魂单次铸魂 B:铸魂类型0 1 2B:部位       */
	public CG_DUANZAO_ZHUHUN_ONE(type: number, part: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeByte(part);
		this.sendSocket(567, ba);
	}

	/**569 CG 噬魂 B:第几种噬魂B:1单次噬魂 2一键噬魂       */
	public CG_DUANZAO_SHIHUN(type: number, type1: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeByte(type1);
		this.sendSocket(569, ba);
	}

	/**571  CG 一键强化     */
	public CG_DUANZAO_KEYSTRENG(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(571, ba);
	}

	/**573 CG 一键铸魂 B:部位B:方式低 中 高   */
	public CG_DUANZAO_KEY_ZHUHUN(type: number, num: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeByte(num);
		this.sendSocket(573, ba);
	}

	/**575 CG 一键合成宝石 I:宝石系统id   */
	public CG_DUANZAO_KEY_HECHENG(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(575, ba);
	}

	/**577 套装升阶 B:1强化套装2宝石套装3升星套装    */
	public CG_DUANZAO_SUIT_UPGRADE(type: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(577, ba);
	}

	/**579 完美升星 B:装备部位     */
	public CG_DUANZAO_UPSTAR_PERFECT(type: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(579, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(552, this.GC_GET_EQUIPMESSAGE, this);
		wsm.regHand(554, this.GC_DUANZAO_STRENG, this);
		wsm.regHand(556, this.GC_DUANZAO_STONE_EQUIP, this);
		wsm.regHand(558, this.GC_DUANZAO_STONE_DEL, this);
		wsm.regHand(560, this.GC_DUANZAO_STONEID_HECHENG, this);
		wsm.regHand(562, this.GC_DUANZAO_STONEID_HECHENG_BYEQUIP, this);
		wsm.regHand(564, this.GC_DUANZAO_STONEID_KEYXQ, this);
		wsm.regHand(566, this.GC_DUANZAO_UPGRADESTAR, this);
		wsm.regHand(568, this.GC_DUANZAO_ZHUHUN_ONE, this);
		wsm.regHand(570, this.GC_DUANZAO_SHIHUN, this);
		wsm.regHand(572, this.GC_DUANZAO_KEYSTRENG, this);
		wsm.regHand(574, this.GC_DUANZAO_KEY_ZHUHUN, this);
		wsm.regHand(576, this.GC_DUANZAO_KEY_HECHENG, this);
		wsm.regHand(578, this.GC_DUANZAO_SUIT_UPGRADE, this);
		wsm.regHand(580, this.GC_DUANZAO_UPSTAR_PERFECT, this);
		wsm.regHand(582, this.GC_DUANZAO_UPSTARPOWER, this);
	}

	/**582	GC 玩家装备升星战力 I:装备升星总战力[B:装备部位I:升星战力] */
	public GC_DUANZAO_UPSTARPOWER(self: Model_DuanZao, data: BaseBytes): void {
		Model_DuanZao.upstarPower = data.readInt();
		// for (let i = 0, len = data.readShort(); i < len; i++) {
		// 	let pos = data.readByte();
		// 	let power = data.readInt();
		// 	let equipVo = Model_Equip.getRoleEquipByPos(pos);
		// 	equipVo.upstarPower = power;
		// }
		GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
	}

	/**580 完美升星返回 B:1成功0失败B:装备部位B:星级  */
	public GC_DUANZAO_UPSTAR_PERFECT(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let type = data.readByte();
			let starLv = data.readByte();
			let equip: VoEquip = Model_Equip.getRoleEquipByPos(type);
			if (equip) equip.starLv = starLv;
			GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
		}
	}

	/**578 套装升阶成功返回 B:1成功0失败B:类型B:阶数  */
	public GC_DUANZAO_SUIT_UPGRADE(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let type = data.readByte();
			let level = data.readByte();
			Model_DuanZao.suitArr[type - 1] = level;
			GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
		}
	}

	/**576 GC 一键合成宝石返回 B:0成功 1失败I:宝石id  */
	public GC_DUANZAO_KEY_HECHENG(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			GGlobal.control.notify(Enum_MsgType.DUANZAO_STONEBAG_UPDATE);
		}
	}

	/**574 GC 一键铸魂返回 B:1成功 0失败B:部位I:铸魂等级I:铸魂经验  */
	public GC_DUANZAO_KEY_ZHUHUN(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let pos: number = data.readByte();
			let zhuHunLv = data.readInt();
			let zhuHunExp = data.readInt();
			let vo: VoEquip = Model_player.voMine.equipData[pos];
			vo.zhuHunLv = zhuHunLv;
			vo.zhuHunExp = zhuHunExp;
			GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
		}
	}

	/**572 GC 一键强化结果影响部位 [B:部位I:等级]  */
	public GC_DUANZAO_KEYSTRENG(self: Model_DuanZao, data: BaseBytes): void {
		let arr: Array<any> = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let pos: number = data.readByte();
			let vo: VoEquip = Model_player.voMine.equipData[pos];
			let qh = data.readInt();
			if (vo) {
				if (qh > vo.qh) {
					arr.push(pos);
				}
				vo.qh = qh;
			}
		}
		GGlobal.control.notify(Enum_MsgType.DUANZAO_EFF_UPDATE, arr);
		GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
	}

	/**570 GC 噬魂结果 B:噬魂结果1成功 0失败B:位置I:数量  */
	public GC_DUANZAO_SHIHUN(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let pos = data.readByte();
			let num = data.readInt();
			Model_DuanZao.drugArr[pos - 1] = num;
			GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
		}
	}

	/**568 GC 铸魂返回 B:铸魂结果1成功 0失败B:部位I:铸魂等级I:铸魂经验  */
	public GC_DUANZAO_ZHUHUN_ONE(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let type = data.readByte();
			let zhuHunLv = data.readInt();
			let zhuHunExp = data.readInt();
			let equip: VoEquip = Model_Equip.getRoleEquipByPos(type);
			if (equip) {
				equip.zhuHunLv = zhuHunLv;
				equip.zhuHunExp = zhuHunExp;
			}
			GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
		}
	}

	/**566 GC 升星返回 B:升星 1成功 0失败 2满级 3材料不足B:部位I:星级  */
	public GC_DUANZAO_UPGRADESTAR(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let type = data.readByte();
			let starLv = data.readInt();
			let equip: VoEquip = Model_Equip.getRoleEquipByPos(type);
			if (equip) equip.starLv = starLv;
			GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
		} else if (result == 0) {
			ViewCommonWarn.text("升星失败");
		}
	}

	/**564 GC 一键装备宝石 [B:装备部位[I:宝石等级]]  */
	public GC_DUANZAO_STONEID_KEYXQ(self: Model_DuanZao, data: BaseBytes): void {
		for (let i = 0, len1 = data.readShort(); i < len1; i++) {
			let type = data.readByte();
			let equipVo: VoEquip = Model_Equip.getRoleEquipByPos(type);
			let len = data.readShort();
			for (let i = 0; i < len; i++) {
				let stoneId: number = data.readInt();
				if (stoneId <= 0) continue;
				let cfg = Config.dzgem_209[stoneId];
				equipVo.bs[cfg.position - 1] = stoneId;
			}
		}
		GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
	}

	/**562 GC 合成宝石到装备 B:1成功 0失败B:装备位置B:宝石位置I:宝石id  */
	public GC_DUANZAO_STONEID_HECHENG_BYEQUIP(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let type = data.readByte();
			let part = data.readByte();
			let stoneId = data.readInt();
			let equipVo: VoEquip = Model_Equip.getRoleEquipByPos(type);
			if (equipVo) equipVo.bs[part - 1] = stoneId;
			GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
			GGlobal.control.notify(Enum_MsgType.DUANZAO_STONEBAG_UPDATE, { equipVo: equipVo, stonePart: part - 1, stoneId: stoneId });
		}
	}

	/**560 GC 背包内合成返回 B:合成返回1成功 0失败I:宝石id  */
	public GC_DUANZAO_STONEID_HECHENG(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			GGlobal.control.notify(Enum_MsgType.DUANZAO_STONEBAG_UPDATE);
		}
	}

	/**558 GC 拆宝石返回 B:1成功 0失败B:部位B:宝石部位I:宝石id  */
	public GC_DUANZAO_STONE_DEL(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let type = data.readByte();
			let part = data.readByte();
			let stoneId = data.readInt();
			let equipVo: VoEquip = Model_Equip.getRoleEquipByPos(type);
			equipVo.bs[part - 1] = 0;
			GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
			GGlobal.control.notify(Enum_MsgType.DUANZAO_STONEBAG_UPDATE, { equipVo: equipVo, stonePart: part - 1, stoneId: 0 });
		}
	}

	/**556 GC 宝石镶嵌返回 B:成功失败标志 1成功、0失败B:装备位置B:宝石位置I:宝石id  */
	public GC_DUANZAO_STONE_EQUIP(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let type = data.readByte();
			let part = data.readByte();
			let stoneId = data.readInt();
			let equipVo: VoEquip = Model_Equip.getRoleEquipByPos(type);
			equipVo.bs[part - 1] = stoneId;
			GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
			GGlobal.control.notify(Enum_MsgType.DUANZAO_STONEBAG_UPDATE, { equipVo: equipVo, stonePart: part - 1, stoneId: stoneId });
		}
	}

	/**554 GC 1成功，2 位置不对，3、已经满级，4，消耗物品不够强化返回 B:成功失败标志B:位置I:当前级别  */
	public GC_DUANZAO_STRENG(self: Model_DuanZao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let arr = [];
			let pos: number = data.readByte();
			let vo: VoEquip = Model_player.voMine.equipData[pos];
			vo.qh = data.readInt();
			arr = [pos];
			GGlobal.control.notify(Enum_MsgType.DUANZAO_EFF_UPDATE, arr);
			GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
		}
	}

	/**552 GC 后端返回 [B:装备部位I:强化等级[I:宝石id]宝石I:升星I:铸魂等级I:铸魂经验]角色锻造数据[I:噬魂丹数量]B:强化套装阶数B:宝石套装阶数B:升星套装阶数 */
	public GC_GET_EQUIPMESSAGE(self: Model_DuanZao, data: BaseBytes): void {
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let pos = data.readByte();
			let vo: VoEquip = Model_player.voMine.equipData[pos];
			let qh = data.readInt();
			let len1 = data.readShort();
			for (let j = 0; j < len1; j++) {
				let stoneId: number = data.readInt();
				if (!vo || stoneId <= 0) continue;
				let itemCfg = Config.daoju_204[stoneId];
				vo.bs[itemCfg.leixing - 4] = stoneId;
			}
			let starLv = data.readInt();
			let zhuHunLv = data.readInt();
			let zhuHunExp = data.readInt();
			if (vo) {
				vo.qh = qh;
				vo.starLv = starLv;
				vo.zhuHunLv = zhuHunLv;
				vo.zhuHunExp = zhuHunExp;
			}
		}

		for (let i = 0, len = data.readShort(); i < len; i++) {
			Model_DuanZao.drugArr[i] = data.readInt();
		}
		Model_DuanZao.suitArr = [data.readByte(), data.readByte(), data.readByte()];
		GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
	}
}