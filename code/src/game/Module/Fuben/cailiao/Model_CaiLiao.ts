class Model_CaiLiao extends BaseModel {
	public static curFuBenId: number = 0;
	public static battleRet: number;
	public static curSelIndex: number;
	private static _clArr: Array<Vo_CaiLiaoFB> = [];
	public static get caiLiaoArr(): Array<Vo_CaiLiaoFB> {
		if (Model_CaiLiao._clArr.length <= 0) {
			for (let key in Config.cailiaofuben_709) {
				let vo: Vo_CaiLiaoFB = Vo_CaiLiaoFB.create(parseInt(key));
				Model_CaiLiao._clArr[Math.floor(vo.id / 1000) - 1] = vo;
			}
		}
		return Model_CaiLiao._clArr;
	}

	public static checkNotice(): boolean {
		for (let i = 0; i < Model_CaiLiao.caiLiaoArr.length; i++) {
			let vo = Model_CaiLiao.caiLiaoArr[i];
			if (vo.battleNum > 0 && (vo.startcondition == "0" || Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(vo.startcondition), vo.id))) {
				return true;
			}
		}
		return false;
	}

	/**特殊处理 [[1,x],[2,y],[3,z]]
	1:达到关卡
	2:转生
	3:等级
	y=转生ID*/
	public static checkCoditionOpenHandler(condition: any[], id: number): boolean {
		var ret: boolean = true;
		if (!Model_player.voMine) return false;
		var cl = condition.length;
		var b;
		var msg;
		var m = GGlobal.modelGuanQia;
		for (var i: number = 0; i < cl; i++) {
			var tp = condition[i][0];
			var val = condition[i][1];
			switch (tp) {
				case 1:
					b = m.curGuanQiaLv >= val;
					break;//关卡
				case 2:
					b = Model_player.voMine.zsID >= val;
					break;//转生等级
				case 3:
					b =  Model_player.voMine.maxLv >= val;
					break;
			}

			var bo: boolean = true;
			var lib = Config.cailiaofuben_709;
			if (lib) {
				var info = lib[id];
				if (info && info.day) {
					let d = info.day;
					let d1 = 0;
					if (Model_GlobalMsg.kaifuDay == 0) {
						bo = false;
					} else {
						if (d <= Model_GlobalMsg.kaifuDay) {//第几天开启某个系统
							bo = true;
						} else {
							bo = false;
						}
					}
				}
			}

			if (!b || !bo) {
				ret = false;
				break;
			}
		}
		return ret;
	}

	/**1431 CG 请求材料副本信息   */
	public CG_OPEN_CAILIAOFUBEN(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1431, ba);
	}

	/**1433 CG 请求进入某个材料副本 I:副本id    */
	public CG_ENTER_CAILIAOFUBEN(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(1433, ba);
	}

	/**1435 CG 请求材料副本奖励 I:副本id    */
	public CG_REAWARD_CAILIAOFUBEN(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(1435, ba);
	}

	/**1437  CG 扫荡副本      */
	public CG_CAILIAOFUBEN_SAODANG(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1437, ba);
	}

	/**1439 CG 购买材料副本的次数 I:副本id       */
	public CG_CAILIAOFUBEN_BUYNUM(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(1439, ba);
	}

	/**1441  CG 一键购买材料副本   */
	public CG_CAILIAOFUBEN_BUYKEY(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1441, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(1432, this.GC_OPEN_CAILIAOFUBEN, this);
		wsm.regHand(1434, this.GC_ENTER_CAILIAOFUBEN, this);
		wsm.regHand(1436, this.GC_REAWARD_CAILIAOFUBEN, this);
		wsm.regHand(1438, this.GC_CAILIAOFUBEN_SAODANG, this);
		wsm.regHand(1440, this.GC_CAILIAOFUBEN_BUYNUM, this);
		wsm.regHand(1442, this.GC_CAILIAOFUBEN_BUYKEY, this);
	}

	/**1442 GC 购买材料副本返回 B:0成功 1失败  */
	public GC_CAILIAOFUBEN_BUYKEY(self: Model_CaiLiao, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			ViewCommonWarn.text("购买成功");
		}
	}

	/**1440 GC 购买次数 B:0成功 1失败 I:副本idI:已经购买次数   */
	public GC_CAILIAOFUBEN_BUYNUM(self: Model_CaiLiao, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let fubenID = data.readInt();
			let buyNum = data.readInt();
			for (let i = 0; i < Model_CaiLiao.caiLiaoArr.length; i++) {
				if (fubenID == Model_CaiLiao.caiLiaoArr[i].id) {
					Model_CaiLiao.caiLiaoArr[i].battleNum++;
					Model_CaiLiao.caiLiaoArr[i].buyNum = buyNum;
					break;
				}
			}
			Model_CaiLiao.caiLiaoArr.sort(Model_CaiLiao.sortList);
			for (let i = 0; i < Model_CaiLiao.caiLiaoArr.length; i++) {
				if (fubenID == Model_CaiLiao.caiLiaoArr[i].id) {
					Model_CaiLiao.curSelIndex = i;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.FUBEN_CAILIAO_BATTLENUM_UPDATE);
			GGlobal.control.notify(Enum_MsgType.FUBEN_CAILIAO_UPDATE);
		}
	}

	/**1438 GC 扫荡返回 B:0成功 1失败  */
	public GC_CAILIAOFUBEN_SAODANG(self: Model_CaiLiao, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			ViewCommonWarn.text("扫荡成功");
			for (let i = 0; i < Model_CaiLiao.caiLiaoArr.length; i++) {
				let vo = Model_CaiLiao.caiLiaoArr[i];
				if (vo.pass == 1 && (vo.startcondition == "0" || Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(vo.startcondition), vo.id))) {
					vo.battleNum = 0;
				}
			}
			Model_CaiLiao.caiLiaoArr.sort(Model_CaiLiao.sortList);
			GGlobal.control.notify(Enum_MsgType.FUBEN_CAILIAO_UPDATE);
		}
	}

	/**1436 GC 请求材料副本奖励 B:0成功 1失败 2背包不足I:副本id[B:类型I:idI:数量]  */
	public GC_REAWARD_CAILIAOFUBEN(self: Model_CaiLiao, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let fubenID = data.readInt();
			for (let i = 0; i < Model_CaiLiao.caiLiaoArr.length; i++) {
				if (fubenID == Model_CaiLiao.caiLiaoArr[i].id) {
					Model_CaiLiao.caiLiaoArr[i].battleNum--;
					Model_CaiLiao.caiLiaoArr[i].pass = 1;
					break;
				}
			}
			let arr = [];
			let len = data.readShort();
			for (let i = 0; i < len; i++) {
				let type = data.readByte();
				let id = data.readInt();
				let count = data.readInt();
				let vo: IGridImpl;
				if (type == Enum_Attr.ITEM) {
					vo = VoItem.create(id);
				} else if (type == Enum_Attr.EQUIP) {
					vo = VoEquip.create(id);
				} else {
					vo = Vo_Currency.create(type);
				}
				vo.count = count;
				arr.push(vo);
			}
			ViewCommonWin.show(arr, 10000);
			Model_CaiLiao.caiLiaoArr.sort(Model_CaiLiao.sortList);
			GGlobal.control.notify(Enum_MsgType.FUBEN_CAILIAO_UPDATE);
		}
	}

	/**1434 GC 请求进入某个材料副本 B:0成功 1失败 2背包不足 3没有次数B:战斗结果0:失败，1：成功，2：以前端结果为准I:副本id  */
	public GC_ENTER_CAILIAOFUBEN(self: Model_CaiLiao, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let battleRet = data.readByte();
			let fubenId = data.readInt();
			Model_CaiLiao.curFuBenId = fubenId;
			if (battleRet == 2) {
				Model_CaiLiao.battleRet = 0;
			} else {
				Model_CaiLiao.battleRet = battleRet == 1 ? 2 : 1;
			}
			GGlobal.mapscene.enterScene(SceneCtrl.CAILIAO_FUBEN);
		}
	}

	public static isFirstOpen: boolean = false;
	/***1432 GC 剩余材料副本次数 [I:副本索引B:剩余次数B:已经购买次数B:是否已通过 0没有1有]  */
	public GC_OPEN_CAILIAOFUBEN(self: Model_CaiLiao, data: BaseBytes) {
		Model_CaiLiao.isFirstOpen = true;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let fubenId = data.readInt();
			let num = data.readByte();
			let buyNum = data.readByte();
			let pass = data.readByte();
			for (let j = 0; j < Model_CaiLiao.caiLiaoArr.length; j++) {
				if (fubenId == Model_CaiLiao.caiLiaoArr[j].id) {
					Model_CaiLiao.caiLiaoArr[j].battleNum = num;
					Model_CaiLiao.caiLiaoArr[j].buyNum = buyNum;
					Model_CaiLiao.caiLiaoArr[j].pass = pass;
					break;
				}
			}
		}
		Model_CaiLiao.caiLiaoArr.sort(Model_CaiLiao.sortList);
		GGlobal.control.notify(Enum_MsgType.FUBEN_CAILIAO_UPDATE);
	}

	public static sortList(a: Vo_CaiLiaoFB, b: Vo_CaiLiaoFB): number {
		if ((a.startcondition == "0" || Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(a.startcondition), a.id)) &&
			(b.startcondition == "0" || Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(b.startcondition), b.id))) {
			if (a.battleNum <= 0 && b.battleNum <= 0) {
				return a.paixu - b.paixu;
			} else if (a.battleNum > 0 && b.battleNum > 0) {
				return a.paixu - b.paixu;
			} else {
				return b.battleNum - a.battleNum;
			}
		} else if (a.startcondition != "0" && !Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(a.startcondition), a.id) && b.startcondition != "0" && !Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(b.startcondition), b.id)) {
			return a.paixu - b.paixu;
		} else {
			if (a.startcondition != "0" && !Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(a.startcondition), a.id)) {
				return 1;
			} else {
				return -1;
			}
		}
	}

}