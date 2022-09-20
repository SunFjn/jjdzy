class Model_TuJian extends BaseModel {

	public static tabArr: Array<any> = ["", "猛将", "谋士", "佳人", "君主"];

	public static checkItemVo(v: VoItem): boolean {
		if(!Model_TuJian.isFirstOpen)return false;
		let tuJian = Model_TuJian.getItemTuJian(v.id)
		if(!tuJian)return false;
		let len = Model_TuJian.tuJianArr[tuJian.type - 1].length;
		let check: boolean = false;
		for (let i = 0; i < len; i++) {
			let vo: Vo_TuJian = Model_TuJian.tuJianArr[tuJian.type - 1][i];
			if(vo.ID == tuJian.ID){
				if (vo.isJiHuo) {
					if (vo.next_star > 0) {
						let costArr0: Array<any> = vo.consume_star;
						let costVo0: VoItem = VoItem.create(costArr0[0][1]);
						let count0 = Model_Bag.getItemCount(costArr0[0][1]);
						if (count0 >= costArr0[0][2]) {
							check = true;
							break;
						}
					}
				} else {
					let costArr0: Array<any> = vo.activation_jihuo;
					let costVo0: VoItem = VoItem.create(costArr0[0][1]);
					costVo0.count = costArr0[0][2];
					let count = Model_Bag.getItemCount(costArr0[0][1]);
					if (count >= costVo0.count) {
						check = true;
						break;
					}
				}
				break;
			}
			
		}
		return check
	}

	public static checkTabNotice(type): boolean {
		let len = Model_TuJian.tuJianArr[type].length;
		let check: boolean = false;
		for (let i = 0; i < len; i++) {
			let vo: Vo_TuJian = Model_TuJian.tuJianArr[type][i];
			if (vo.isJiHuo) {
				if (vo.next_star > 0) {
					let costArr0: Array<any> = vo.consume_star;
					let costVo0: VoItem = VoItem.create(costArr0[0][1]);
					let count0 = Model_Bag.getItemCount(costArr0[0][1]);
					if (count0 >= costArr0[0][2]) {
						check = true;
						break;
					}
				}
				if (!check && vo.level < vo.levelMax) {
					let costArr1: Array<any> = vo.consume_level;
					let costVo1: VoItem = VoItem.create(costArr1[0][1]);
					let count1 = Model_Bag.getItemCount(costArr1[0][1]);
					if (count1 >= costArr1[0][2]) {
						check = true;
						break;
					}
				}
			} else {
				let costArr0: Array<any> = vo.activation_jihuo;
				let costVo0: VoItem = VoItem.create(costArr0[0][1]);
				costVo0.count = costArr0[0][2];
				let count = Model_Bag.getItemCount(costArr0[0][1]);
				if (count >= costVo0.count) {
					check = true;
					break;
				}
			}
		}

		if (!check) {
			let vo: Vo_TuJianSuit = Model_TuJian.suitVoArr[type];
			vo.tujianLv = 0;
			for (let i = 0; i < len; i++) {
				let vo1: Vo_TuJian = Model_TuJian.tuJianArr[type][i];
				if (vo1.isJiHuo) {
					vo.tujianLv += vo1.level;
				}
			}
			if (vo.suitNext > 0) {
				let nextcfg = Config.picteam_005[vo.suitNext];
				if (vo.tujianLv >= nextcfg.need) {
					check = true;
				}
			}
		}
		return check;
	}


	public static getTuJianLv(type: number) {
		let vo: Vo_TuJianSuit = Model_TuJian.suitVoArr[type];
		let len = Model_TuJian.tuJianArr[type].length;
		vo.tujianLv = 0;
		for (let i = 0; i < len; i++) {
			let vo1: Vo_TuJian = Model_TuJian.tuJianArr[type][i];
			if (vo1.isJiHuo) {
				vo.tujianLv += vo1.level;
			}
		}
		return vo.tujianLv;
	}

	public static getTuJianPower(type: number) {
		let len = Model_TuJian.tuJianArr[type].length;
		let power: number = 0;
		for (let i = 0; i < len; i++) {
			let vo: Vo_TuJian = Model_TuJian.tuJianArr[type][i];
			if (vo.isJiHuo) {
				power += vo.power0 + vo.power1 + vo.power2;
			}
		}
		return power;
	}

	private static _suitVoArr: Array<Vo_TuJianSuit> = [];
	public static get suitVoArr(): Array<Vo_TuJianSuit> {
		if (Model_TuJian._suitVoArr.length <= 0) {
			let arr: Array<any> = [1000, 2000, 3000, 4000];
			for (let i = 0; i < arr.length; i++) {
				let vo: Vo_TuJianSuit = new Vo_TuJianSuit();
				vo.suitID = arr[i];
				Model_TuJian._suitVoArr[Math.floor(arr[i] / 1000) - 1] = vo;
			}
		}
		return Model_TuJian._suitVoArr;
	}

	private static _tuJianArr: Array<any> = [];
	public static get tuJianArr(): Array<any> {
		if (Model_TuJian._tuJianArr.length <= 0) {
			for (let key in Config.picture_005) {
				let vo: Vo_TuJian = Vo_TuJian.create(parseInt(key));
				if (!Model_TuJian._tuJianArr[vo.type - 1]) Model_TuJian._tuJianArr[vo.type - 1] = [];
				Model_TuJian._tuJianArr[vo.type - 1].push(vo);
			}
			for (let key in Model_TuJian._tuJianArr) {
				Model_TuJian._tuJianArr[key].sort(Model_TuJian.sortByID);
			}
		}
		return Model_TuJian._tuJianArr;
	}

	private static _itemTuJian: any;
	public static getItemTuJian(itemId: number): Ipicture_005 {
		if (Model_TuJian._itemTuJian == null) {
			Model_TuJian._itemTuJian = {};
			for (let key in Config.picture_005) {
				let cfg = Config.picture_005[key];
				let arr = ConfigHelp.SplitStr(cfg.activation)
				Model_TuJian._itemTuJian[Number(arr[0][1])] = cfg
			}
		}
		return Model_TuJian._itemTuJian[itemId];
	}

	public static sortByID(a: Vo_TuJian, b: Vo_TuJian): number {
		return a.ID - b.ID;
	}

	public static starObj: any;
	public static tuJianStarArr(): void {
		if (!Model_TuJian.starObj) {
			Model_TuJian.starObj = {};
			for (let key in Config.picstar_005) {
				let cfg = Config.picstar_005[key];
				if (!Model_TuJian.starObj[cfg.id]) Model_TuJian.starObj[cfg.id] = [];
				Model_TuJian.starObj[cfg.id].push(cfg);
			}

			for (let key in Model_TuJian.starObj) {
				Model_TuJian.starObj[key].sort(Model_TuJian.sortByLevel);
			}
		}
	}

	public static sortByLevel(a: any, b: any): number {
		return a.lv - b.lv;
	}


	/**871  打开图鉴   */
	public CG_OPEN_TUJIAN(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(871, ba);
	}

	/**873 激活图鉴 I:图鉴id    */
	public CG_TUJIAN_JIHUO(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(873, ba);
	}

	/**875 升级图鉴 I:图鉴id     */
	public CG_TUJIAN_UPGRADE(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(875, ba);
	}

	/**877 图鉴升星 I:图鉴id     */
	public CG_TUJIAN_UPSTAR(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(877, ba);
	}

	/**879 套装升级 I:套装id      */
	public CG_TUJIAN_UPSUIT(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(879, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(872, this.GC_OPEN_TUJIAN, this);
		wsm.regHand(874, this.GC_TUJIAN_JIHUO, this);
		wsm.regHand(876, this.GC_TUJIAN_UPGRADE, this);
		wsm.regHand(878, this.GC_TUJIAN_UPSTAR, this);
		wsm.regHand(880, this.GC_TUJIAN_UPSUIT, this);
	}

	/**880 套装升级结果 B:0：失败，1：成功I:失败：错误码（1：未达升级条件），成功：套装id  */
	public GC_TUJIAN_UPSUIT(self: Model_TuJian, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let suitId = data.readInt();
			let cfg = Config.picteam_005[suitId];
			Model_TuJian.suitVoArr[cfg.type - 1].suitID = suitId;
			GGlobal.control.notify(Enum_MsgType.TUJIAN_DATA_UPDATE);
		}
	}

	/**878 图鉴升星结果 B:0：失败，1：成功I:失败：错误码（1：未激活该图鉴，1：达到星级上限，2：材料不足），成功：图鉴idI:图鉴星级索引  */
	public GC_TUJIAN_UPSTAR(self: Model_TuJian, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id = data.readInt();
			let starID = data.readInt();
			let cfg = Config.picture_005[id];
			for (let i = 0; i < Model_TuJian.tuJianArr[cfg.type - 1].length; i++) {
				let vo: Vo_TuJian = Model_TuJian.tuJianArr[cfg.type - 1][i];
				if (vo.ID == id) {
					vo.starID = starID;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.TUJIAN_DATA_UPDATE);
		}
	}

	/**876 图鉴升级结果返回 B:0：失败，1：成功I:失败：错误码（1：未激活该图鉴，2：到达等级上限，3：材料不足），成功：图鉴idI:图鉴等级索引  */
	public GC_TUJIAN_UPGRADE(self: Model_TuJian, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id = data.readInt();
			let levelID = data.readInt();
			let cfg = Config.picture_005[id];
			for (let i = 0; i < Model_TuJian.tuJianArr[cfg.type - 1].length; i++) {
				let vo: Vo_TuJian = Model_TuJian.tuJianArr[cfg.type - 1][i];
				if (vo.ID == id) {
					vo.levelID = levelID;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.TUJIAN_DATA_UPDATE);
		}
	}

	/**874 激活结果 B:0:失败 ；1:成功I:失败：错误码（1：不可重复激活，2：材料不足），成功:图鉴idI:图鉴等级索引I:图鉴星级索引  */
	public GC_TUJIAN_JIHUO(self: Model_TuJian, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id = data.readInt();
			let levelID = data.readInt();
			let starID = data.readInt();
			let cfg = Config.picture_005[id];
			let arr = Model_TuJian.tuJianArr[cfg.type - 1]
			for (let i = 0; i < arr.length; i++) {
				let vo: Vo_TuJian = arr[i];
				if (vo.ID == id) {
					vo.isJiHuo = true;
					vo.levelID = levelID;
					vo.starID = starID;
					break;
				}
			}
			arr.sort(self.sortTuJian);
			GGlobal.control.notify(Enum_MsgType.TUJIAN_DATA_UPDATE);
		}
	}

	public static isFirstOpen: boolean = false;
	/**872 界面信息返回 [I:图鉴idS:图鉴等级索引S:图鉴星级索引]图鉴数据[I:套装id]套装信息  */
	public GC_OPEN_TUJIAN(self: Model_TuJian, data: BaseBytes): void {
		Model_TuJian.isFirstOpen = true;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id = data.readInt();
			let levelID = data.readShort();
			let starID = data.readShort();
			let cfg = Config.picture_005[id];
			for (let i = 0; i < Model_TuJian.tuJianArr[cfg.type - 1].length; i++) {
				let vo: Vo_TuJian = Model_TuJian.tuJianArr[cfg.type - 1][i];
				if (vo.ID == id) {
					vo.isJiHuo = true;
					vo.levelID = levelID;
					vo.starID = starID;
					break;
				}
			}
		}

		let len1 = data.readShort();
		for (let i = 0; i < len1; i++) {
			let suitId = data.readInt();
			let cfg = Config.picteam_005[suitId];
			Model_TuJian.suitVoArr[cfg.type - 1].suitID = suitId;
		}

		for (let i = 0; i < Model_TuJian.tuJianArr.length; i++) {
			Model_TuJian.tuJianArr[i].sort(self.sortTuJian);
		}
		GGlobal.control.notify(Enum_MsgType.TUJIAN_DATA_UPDATE);
	}

	public sortTuJian(a: Vo_TuJian, b: Vo_TuJian): number {
		if ((a.isJiHuo && b.isJiHuo) || (!a.isJiHuo && !b.isJiHuo)) {
			if (a.quality == b.quality) {
				return a.ID - b.ID;
			} else {
				return a.quality - b.quality;
			}
		} else {
			if (a.isJiHuo) {
				return -1;
			} else {
				return 1;
			}
		}
	}

}