class Model_YiBao extends BaseModel {
	public static drugCount: number = 0;
	/**异宝属性丹 */
	public static drugId: number = 412011;
	public static drugIndex: number = 9;
	public static drugMax: number;
	/**	异宝培养丹 */
	public static DAN_LEVELUP: number = 411005;
	public static DAN_EXP: number = 10;

	public static checkYB(): boolean {
		let len = Model_YiBao.YBArr.length;
		for (let i = 0; i < len; i++) {
			let vo: Vo_YiBao = Model_YiBao.YBArr[i];
			if (Model_YiBao.checkUpStarGridNotice(vo)) return true;
		}
		return false;
	}

	public static checkUpStarGridNotice(vo: Vo_YiBao): boolean {
		let itemVo: VoItem = VoItem.create(vo.costArr[0][1]);
		let count = Model_Bag.getItemCount(itemVo.id);
		if (count >= vo.costArr[0][2] && vo.starLv < vo.starMax) {
			return true;
		}
		return false;
	}

	public static checkDrugNotice(): boolean {
		Model_YiBao.drugMax = 0;
		let len = Model_YiBao.YBArr.length;
		for (let i = 0; i < len; i++) {
			let vo: Vo_YiBao = Model_YiBao.YBArr[i];
			if (vo.starLv > 0) {
				Model_YiBao.drugMax += vo.drugMax * vo.starLv;
			}
		}
		if (Model_YiBao.drugCount < Model_YiBao.drugMax) {
			let count = Model_Bag.getItemCount(Model_YiBao.drugId);
			if (count > 0) return true;
		}
		return false;
	}

	private static _YBArr: Array<Vo_YiBao> = [];
	public static get YBArr(): Array<Vo_YiBao> {
		if (Model_YiBao._YBArr.length <= 0) {
			for (let key in Config.yb_217) {
				let vo: Vo_YiBao = Vo_YiBao.create(parseInt(key));
				Model_YiBao._YBArr.push(vo);
			}
			Model_YiBao._YBArr.sort(Model_YiBao.sortYiBao);
		}
		return Model_YiBao._YBArr;
	}

	public static sortYiBao(a: Vo_YiBao, b: Vo_YiBao): number {
		if (a.state == b.state) {
			if (a.quality == b.quality) {
				return a.id - b.id;
			} else {
				if (a.state == 2) {
					return a.quality - b.quality;
				} else {
					return b.quality - a.quality;
				}
			}
		} else {
			return a.state - b.state;
		}
	}

	/***1041 CG 打开异宝ui    */
	public CG_OPEN_YIBAO(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1041, ba);
	}

	/**1043 CG 激活/升星异宝 I:异宝id     */
	public CG_YIBAO_JIHUO(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(1043, ba);
	}


	/**1045 CG 使用属性丹 B:使用方式0:1颗 1:一键      */
	public CG_YIBAO_TUNSHI(type: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(1045, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(1042, this.GC_OPEN_YIBAO, this);
		wsm.regHand(1044, this.GC_YIBAO_JIHUO, this);
		wsm.regHand(1046, this.GC_YIBAO_TUNSHI, this);
	}


	/**1046 GC 使用属性丹返回 B:0成功 1失败B:使用方式I:使用丹药数量    */
	public GC_YIBAO_TUNSHI(self: Model_YiBao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			let type = data.readByte();
			let drugNum = data.readInt();
			Model_YiBao.drugCount = drugNum;
			GGlobal.control.notify(Enum_MsgType.YIBAO_UPDATE);
		}
	}

	/**1044 GC 升星返回 B:0成功 1失败I:异宝idI:星级   */
	public GC_YIBAO_JIHUO(self: Model_YiBao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			let id: number = data.readInt();
			let starLv: number = data.readInt();
			let len = Model_YiBao.YBArr.length;
			for (let i = 0; i < len; i++) {
				if (Model_YiBao.YBArr[i].id == id) {
					Model_YiBao.YBArr[i].starLv = starLv;
					if (starLv >= Model_YiBao.YBArr[i].starMax) {
						GGlobal.control.notify(UIConst.JUEXING);
					}
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.YIBAO_UPDATE);
		}
	}

	public static isFirstOpen: boolean = false;
	/***1042 GC 打开异宝 [I:异宝idI:星级]I:属性丹   */
	public GC_OPEN_YIBAO(self: Model_YiBao, data: BaseBytes): void {
		Model_YiBao.isFirstOpen = true;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let ybId = data.readInt();
			let starLv = data.readInt();
			for (let j = 0; j < Model_YiBao.YBArr.length; j++) {
				let vo: Vo_YiBao = Model_YiBao.YBArr[j];
				if (vo.id == ybId) {
					vo.starLv = starLv;
					break;
				}
			}
		}
		Model_YiBao.drugCount = data.readInt();
		GGlobal.control.notify(Enum_MsgType.YIBAO_UPDATE);
	}

	//战甲一键升阶
	public static checkOneKeyUp(): boolean {
		let jieShu = Model_BySys.sysJie(Model_BySys.YI_BAO);
		let jieExp = Model_BySys.sysExp(Model_BySys.YI_BAO);
		let count = Model_Bag.getItemCount(Model_YiBao.DAN_LEVELUP)
		let exp = count * Model_YiBao.DAN_EXP
		let clotheslv = Config.yblv_217[jieShu]
		if (clotheslv && clotheslv.exp > 0) {
			if (exp + jieExp >= clotheslv.exp) {
				return true;
			}
		}
		return false;
	}

	//	获取可以穿的武将装备
	public static yiBaoWearArr(): Array<VoEquip> {
		let arr: Array<VoEquip> = Model_Bag.filterEquips(Model_Bag.filterYiBaoEquip, null);
		let d = Model_player.voMine.equipData
		let sendArr = {};
		for (let i = 0; i < arr.length; i++) {
			let equ = arr[i];
			let jieShu = Model_BySys.sysJie(Model_BySys.YI_BAO);
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
		for (let i = 70; i < 74; i++) {
			if (sendArr[i]) {
				a.push(sendArr[i])
			}
		}
		return a;
	}

	//技能升级
	public static checkSkill(id): boolean {
		let obj = Config.yblvskill_217[id];
		let jieShu = Model_BySys.sysJie(Model_BySys.YI_BAO);
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
		if (Model_YiBao.checkOneKeyUp()) {
			return true;
		}
		//技能升级
		let skillArr = Model_BySys.sysSkillArr(Model_BySys.YI_BAO);
		let len = skillArr.length
		for (let i = 0; i < len; i++) {
			let id = skillArr[i]
			if (Model_YiBao.checkSkill(id)) {
				return true;
			}
		}
		if (Model_YiBao.yiBaoWearArr().length > 0) {
			return true;
		}
		return false;
	}

	public static checkAndShow(id: number) {
		var arr = Model_YiBao.YBArr;
		if (arr == null || arr.length == 0) return;
		for (let i = 0, len = arr.length; i < len; i++) {
			var vo: Vo_YiBao = arr[i];
			if (!vo.starLv) {
				var costArr = vo.costArr;
				if (costArr[0][1] == id) {
					VTipBWJiHuo.add(vo);
					break;
				}
			}
		}
	}
	/**材料到异宝的映射 */
	private static matToYiBao: { [key: number]: Vo_YiBao } = {};
	/**通过激活材料(升星材料)判断使用该材料的异宝是否已经满星 */
	public static isFullByMat(vo: VoItem) {
		if (this.matToYiBao[vo.id]) {
			const data = this.matToYiBao[vo.id];
			return data.starLv >= data.starMax;
		} else {
			const datas = Model_YiBao.YBArr;
			for (let i = 0; i < datas.length; i++) {
				const data = datas[i];
				const costArr = data.costArr;
				if (costArr) {
					const id = Number(costArr[0][1]);
					this.matToYiBao[id] = data;
					if (id == vo.id) {
						return data.starLv >= data.starMax;
					}
				}
			}
		}
		return false;
	}
}