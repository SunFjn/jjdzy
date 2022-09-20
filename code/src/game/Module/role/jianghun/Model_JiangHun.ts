class Model_JiangHun extends BaseModel {
	public static suitIdArr: Array<any> = [1000, 2000, 3000, 4000];
	/**开启将魂判断 */
	public static openIndex: number = 0;
	/**当前页将魂总等级 */
	public static level: number = 0;

	public static checkTabNotice(type: number): boolean {
		let arr = Model_JiangHun.jianghunArr[type];
		let level = 0;
		let ret: boolean = false;
		for (let i = 0; i < arr.length; i++) {
			let vo: Vo_JiangHun = arr[i];
			if (vo.level > 0) level += vo.level;
			if (vo.level > 0 && vo.next > 0) {
				if (vo.exp + Model_player.voMine.hunhuo >= vo.consumeArr[0][2] && vo.next > 0) {
					ret = true;
					break;
				}
			}
		}
		if (!ret) {
			let cfg = Config.genteam_006[Model_JiangHun.suitIdArr[type]];
			if (cfg.next > 0 && level >= Config.genteam_006[cfg.next].need) {
				ret = true;
			}
		}
		return ret;
	}

	public static jiangHunLvByType(type: number): number {
		let len = Model_JiangHun.jianghunArr[type].length;
		let level: number = 0;
		for (let i = 0; i < len; i++) {
			let vo: Vo_JiangHun = Model_JiangHun.jianghunArr[type - 1][i];
			if (vo.isJiHuo) {
				level += vo.level;
			}
		}
		return level;
	}

	private static _jiangHunArr: Array<Array<Vo_JiangHun>> = [];
	public static get jianghunArr(): Array<Array<Vo_JiangHun>> {
		if (Model_JiangHun._jiangHunArr.length <= 0) {
			for (let key in Config.general_006) {
				let vo: Vo_JiangHun = Vo_JiangHun.create(parseInt(key));
				if (!Model_JiangHun._jiangHunArr[vo.type - 1]) {
					Model_JiangHun._jiangHunArr[vo.type - 1] = [];
				}
				Model_JiangHun._jiangHunArr[vo.type - 1].push(vo);
			}
		}
		return Model_JiangHun._jiangHunArr;
	}

	public static sortJiangHun(a: Vo_JiangHun, b: Vo_JiangHun): number {
		return a.ID - b.ID;
	}

	/**1151  打开将魂   */
	public CG_OPEN_JIANGHUN(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1151, ba);
	}


	/**1153 升级将魂 I:将魂id    */
	public CG_JIANGHUN_UP(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(1153, ba);
	}
	/**1155 套装升阶 I:套装id     */
	public CG_JIANGHUN_SUIT(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(1155, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(1152, this.GC_OPEN_JIANGHUN, this);
		wsm.regHand(1154, this.GC_JIANGHUN_UP, this);
		wsm.regHand(1156, this.GC_JIANGHUN_SUIT, this);
		wsm.regHand(1158, this.GC_JIANGHUN_JIHUO_UPDATE, this);
	}

	/***1158 激活新将魂 I:将魂id  */
	public GC_JIANGHUN_JIHUO_UPDATE(self: Model_JiangHun, data: BaseBytes): void {
		let id = data.readInt();
		let cfg = Config.general_006[id];
		let len1 = Model_JiangHun.jianghunArr[cfg.type - 1].length;
		for (let j = 0; j < len1; j++) {
			let vo: Vo_JiangHun = Model_JiangHun.jianghunArr[cfg.type - 1][j];
			if (vo.ID == id) {
				vo.level = vo.type * 10000 + vo.quality * 1000 + 1;
				vo.exp = 0;
				break;
			}
		}
		GGlobal.control.notify(Enum_MsgType.JIANGHUN_DATA_UPDATE);
	}

	/**1156 套装升阶结果 B:0：失败，1：成功I:套装id  */
	public GC_JIANGHUN_SUIT(self: Model_JiangHun, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let suitID = data.readInt();
			let type = Math.floor(suitID / 1000);
			Model_JiangHun.suitIdArr[type - 1] = suitID;
			GGlobal.control.notify(Enum_MsgType.JIANGHUN_DATA_UPDATE);
		}
	}

	/**1154 将魂升级结果 B:0：失败，1：成功I:将魂idI:等级索引idI:经验  */
	public GC_JIANGHUN_UP(self: Model_JiangHun, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id = data.readInt();
			let level = data.readInt();
			let exp = data.readInt();
			let cfg = Config.general_006[id];
			let len1 = Model_JiangHun.jianghunArr[cfg.type - 1].length;
			for (let j = 0; j < len1; j++) {
				let vo: Vo_JiangHun = Model_JiangHun.jianghunArr[cfg.type - 1][j];
				if (vo.ID == id) {
					vo.level = level;
					vo.exp = exp;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.JIANGHUN_DATA_UPDATE);
		}
	}

	public static isFirstOpen: boolean = false;
	/**1152 返回将魂界面数据 [I:将魂idI:等级I:经验]将魂数据[I:套装id]套装数据  */
	public GC_OPEN_JIANGHUN(self: Model_JiangHun, data: BaseBytes): void {
		Model_JiangHun.isFirstOpen = true;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id = data.readInt();
			let level = data.readInt();
			let exp = data.readInt();
			let cfg = Config.general_006[id];
			let len1 = Model_JiangHun.jianghunArr[cfg.type - 1].length;
			for (let j = 0; j < len1; j++) {
				let vo: Vo_JiangHun = Model_JiangHun.jianghunArr[cfg.type - 1][j];
				if (vo.ID == id) {
					vo.level = level;
					vo.exp = exp;
					break;
				}
			}
		}
		let len2 = data.readShort();
		for (let i = 0; i < len2; i++) {
			let suitId = data.readInt();
			if (suitId <= 0) continue;
			let cfg = Config.genteam_006[suitId];
			Model_JiangHun.suitIdArr[cfg.type - 1] = suitId;
		}
		GGlobal.control.notify(Enum_MsgType.JIANGHUN_DATA_UPDATE);
	}
}