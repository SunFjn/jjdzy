class Model_Equip extends BaseModel {
	public constructor() {
		super();
	}
	/**角色装备数量 */
	public static EQUIPMAX: number = 10;

	/**获取一件装备的总战力 包过宝石和强化图腾等*/
	public static getEquipPower(vo: VoEquip): number {
		var power = vo.getPower();
		return power;
	}

	//**********************************************//

	//*****************提示检测*********************//

	/**根据位置获取人物身上的装备 */
	public static getRoleEquipByPos(type: number): VoEquip {
		return Model_player.voMine.equipData[type];
	}

	/**获取背包该位置最合适装备 */
	public static getBagScoreMaxEquip(pos): VoEquip {
		let list = this.getBagEquipByType(pos);
		let vo: VoEquip;
		let score: number = 0;
		let myLev = Model_LunHui.realLv;
		let zs = Model_player.voMine.zsID;
		for (var key in list) {
			let vo1: VoEquip;
			if (!vo) {
				vo = list[key];
			} else {
				vo1 = list[key];
				if (myLev >= vo.level && zs >= vo.zs) {//装备所需等级和转生等级满足
					if (vo1.getPower() > vo.getPower()) {//评分大于身上的
						vo = vo1;
					}
				}
			}
		}
		return vo;
	}


	/**装备界面将领对应的位置装备是否可以替换 */
	public static checkNoticeReplace(pos: number): VoEquip {
		var bo: boolean = false;
		var role: Vo_Player = Model_player.voMine;
		let ret: VoEquip;
		if (role) {
			var vo: VoEquip = role.equipData[pos];
			var type = this.getPosType(pos);
			var myLev = Model_LunHui.realLv;
			var zs = Model_player.voMine.zsID;
			var score: number = 0;
			if (vo) {//有装备
				score = vo.getPower();
			}
			var list = this.getBagEquipByType(pos);
			for (var key in list) {
				vo = list[key];
				if (myLev >= vo.level && zs >= vo.zs) {//装备所需等级和转生等级满足
					if (ret) {
						if (vo.getPower() > ret.getPower()) {//评分大于身上的
							ret = vo;
						}
					} else {
						if (vo.getPower() > score) {//评分大于身上的
							bo = true;
							ret = vo;
						}
					}
				}
			}
		}
		return ret;
	}

	/**检测某个职业将领背包中是否有装备可以替换 */
	public static checkNoticeReplaceByJob(job: number): boolean {
		let bo: boolean = false;
		let role: Vo_Player = Model_player.voMine;
		if (role) {//有该将领或角色
			for (let i = 0; i < 9; i++) {//检测是否可以替换
				if (Model_Equip.checkNoticeReplace(i)) {
					bo = true;
					break;
				}
			}
		}
		return bo;
	}

	/**获取背包中的对应类型的装备 
	 * isNormal 是否加上通用的
	*/
	public static getBagEquipByType(type: number, isNormal: boolean = true): VoEquip[] {
		var list: VoEquip[] = [];
		var vo: VoEquip;
		for (var key in Model_Bag.equipList) {
			vo = Model_Bag.equipList[key];
			if (vo.type == type) {
				list.push(vo);
			}
		}
		return list;
	}

	public static posSaveArr = [1, 3, 5, 6, 2, 4, 5, 6, 7, 0, 0, 11, 12, 13, 14];
	/**装备位置对应存放的装备类型 
	 * pos装备位置
	*/
	public static getPosType(pos: number): number {
		var type = 0;
		var info = this.posSaveArr
		type = info[pos];
		return type;
	}

	public static isEquip(type: number): boolean {
		var bo: boolean = false;
		if (type >= 0 && type <= 9) {//角色界面的十件装备
			bo = true;
		}
		return bo;
	}

	/**装备部件类型对应的名称 
	 * type 装备部件类型
	 * 0：武器1：衣服2：护腕3：裤子4：鞋子5：帽子6：项链7：手镯8：戒指9：饰品
	 * 10：神装武器11：神装衣服12：神装护腕13：神装裤子14：神装鞋子15：神装帽子16：神装项链17：神装手镯18：神装戒指19：神装饰品
	 */
	public static getPartName(type: number): string {
		var str = "";
		switch (type) {
			case 0:
				str = "武器";
				break;
			case 1:
				str = "衣服";
				break;
			case 2:
				str = "护腕";
				break;
			case 3:
				str = "裤子";
				break;
			case 4:
				str = "鞋子";
				break;
			case 5:
				str = "帽子";
				break;
			case 6:
				str = "项链";
				break;
			case 7:
				str = "手镯";
				break;
			case 8:
				str = "戒指";
				break;
			case 9:
				str = "饰品";
				break;
			case 10:
				str = "神装武器";
				break;
			case 11:
				str = "神装衣服";
				break;
			case 12:
				str = "神装护腕";
				break;
			case 13:
				str = "神装裤子";
				break;
			case 14:
				str = "神装鞋子";
				break;
			case 15:
				str = "神装帽子";
				break;
			case 16:
				str = "神装项链";
				break;
			case 17:
				str = "神装手镯";
				break;
			case 18:
				str = "神装戒指";
				break;
			case 19:
				str = "神装饰品";
				break;
		}
		return str;
	}

	//*************************协议处理*******************************//
	/**协议*/
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(350, this.GCPutOnEquip, this);
		mgr.regHand(352, this.GCBagEquip, this);
		mgr.regHand(354, this.GCPutOnResult, this);
		mgr.regHand(372, this.GCWearEquipByid, this);
		//转生装备穿戴
		mgr.regHand(374, this.GCWearReBornEquip, this);
		//一键穿戴装备通过系统 B:1武将2战甲3神剑4异宝5兵法6宝物7天书
		mgr.regHand(376, this.GCWearbypart, this);
		//转生装备升阶
		mgr.regHand(584, this.GCLHDaShiLv, this);
		mgr.regHand(586, this.GCAddLHDaShiLv, this);
		mgr.regHand(588, this.GCAddLHLv, this);
	}

	/**375	
	CG 一键穿戴装备通过系统 B:1武将2战甲3神剑4异宝5兵法6宝物7天书[L:装备id]*/
	public CGWearbypart(type: number, arr: number[]): void {
		if (!arr || arr.length == 0) {
			return;
		}
		var ba = this.getBytes();
		ba.writeByte(type);
		ba.writeShort(arr.length);
		for (let i = 0; i < arr.length; i++) {
			ba.writeLong(arr[i]);
		}
		this.sendSocket(375, ba);
	}

	/**583	
	CG 获取转生装备炼魂大师等级经验*/
	public lHDaShiLv(): void {
		var ba = this.getBytes();
		this.sendSocket(583, ba);
	}

	public static lhLevel = 0;
	public static lhArr: Array<VoRebirthLH> = [];
	public static lhItemId = 411009;//炼魂石id
	public static lhAddExp = 10;//炼魂石 增加经验
	/**584		
	GC 炼魂大师等级 B:等级[B:位置I:等级I:经验]转生装备炼魂经验等级*/
	private GCLHDaShiLv(self: Model_Equip, data: BaseBytes): void {
		Model_Equip.lhLevel = data.readByte();
		Model_Equip.lhArr = []
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: VoRebirthLH = new VoRebirthLH();
			v.readMsg(data);
			Model_Equip.lhArr[v.pos - 30] = v;
		}
		GGlobal.control.notify(Enum_MsgType.REBIRTH_EQUIP_UPDATA);
	}

	/**585	
	CG 提升炼魂大师*/
	public addLHDaShiLv(): void {
		var ba = this.getBytes();
		this.sendSocket(585, ba);
	}

	/**586		
	GC 提升炼魂大师等级返回 B:0成功 1失败B:等级大师等级*/
	private GCAddLHDaShiLv(self: Model_Equip, data: BaseBytes): void {
		let result: number = data.readByte();
		if (result == 0) {
			Model_Equip.lhLevel = data.readByte();
			ViewCommonWarn.text("提升炼魂大师成功");
			GGlobal.control.notify(Enum_MsgType.REBIRTH_EQUIP_UPDATA);
		} else {
			ViewCommonWarn.text("提升炼魂大师失败");
		}
	}

	/**587	
	CG 增加某件转生装备炼魂等级 B:装备位置B:炼魂方式*/
	public addLHLv(pos: number, type: number): void {
		var ba = this.getBytes();
		ba.writeByte(pos);
		ba.writeByte(type);
		this.sendSocket(587, ba);
	}

	/**588		
	GC 炼魂返回 B:0成功1失败B:位置I:等级I:经验*/
	private GCAddLHLv(self: Model_Equip, data: BaseBytes): void {
		let result: number = data.readByte();
		if (result == 0) {
			let pos = data.readByte();
			let lv = data.readInt();
			let exp = data.readInt();
			let lh = Model_Equip.lhArr[pos - 30]
			if (lh) {
				lh.lv = lv
				lh.exp = exp
			}
			GGlobal.control.notify(Enum_MsgType.REBIRTH_EQUIP_UPDATA);
		}
	}

	/**373	
	一键穿戴转生装备 [L:装备唯一id]需要替换的装备数组*/
	public wearReBornEquip(arr: number[]): void {
		if (arr == null || arr.length == 0) return;
		var ba = this.getBytes();
		ba.writeShort(arr.length);
		for (let i = 0; i < arr.length; i++) {
			ba.writeLong(arr[i]);
		}
		this.sendSocket(373, ba);
	}

	/**374		
	一键穿戴装备返回 B:返回值，0成功，1不成功[L:装备唯一idI:装备系统idB:替换的位置]更换的装备信息*/
	private GCWearReBornEquip(self: Model_Equip, data: BaseBytes): void {
		let result: number = data.readByte();
		if (result == 0) {
			ViewCommonWarn.text("穿戴成功")
			let len = data.readShort();
			let role = Model_player.voMine;
			for (let i = 0; i < len; i++) {
				let sid = data.readLong();
				let id = data.readInt();
				let pos = data.readByte();
				let vo = VoEquip.create(id);
				vo.sid = sid;
				vo.ownPos = pos;
				if (role) {
					role.equipData[pos] = vo;
				}
			}
			GGlobal.control.notify(Enum_MsgType.REBIRTH_EQUIP_UPDATA);
		} else {
			ViewCommonWarn.text("穿戴失败")
		}
	}

	/**376		
	GC一键穿戴装备通过系统 B:0成功1失败B:系统[L:装备唯一idI:系统idB:替换位置]更换的装备信息*/
	private GCWearbypart(self: Model_Equip, data: BaseBytes): void {
		let result: number = data.readByte();
		if (result == 0) {
			// ViewCommonWarn.text("穿戴成功")
			let type = data.readByte();
			let len = data.readShort();
			let role = Model_player.voMine;
			var itemInitMap = {};
			for (let i = 0; i < len; i++) {
				let sid = data.readLong();
				let id = data.readInt();
				let pos = data.readByte();
				let vo = VoEquip.create(id);
				vo.sid = sid;
				vo.ownPos = pos;
				if (role) {
					role.equipData[pos] = vo;
				}
				GGlobal.modelBag.getItemInitMap(itemInitMap, vo);
			}
			GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
			GGlobal.control.notify(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, itemInitMap);//换低阶装备会有红点
		} else {
			// ViewCommonWarn.text("穿戴失败")
		}
	}


	/**350	
	[L-B-I] 
	GC 身上装备数据 [L:装备唯一idB:身上位置I:装备系统id]装备数据
	*/
	public GCPutOnEquip(self: Model_Equip, data: BaseBytes): void {
		let pos: number;
		let sid: number;
		let id: number;
		let role: Vo_Player = Model_player.voMine;;
		let vo: VoEquip;
		let equipArr = [910000, 910001, 910002, 910003, 910004, 910005, 910006, 910007, 910008, 910009];
		if (role && !role.equipData[0]) {
			for (let i = 0; i < 10; i++) {
				sid = i;
				pos = i;
				id = equipArr[i];
				vo = VoEquip.create(id);
				vo.sid = sid;
				vo.ownPos = pos;
				role.equipData[pos] = vo;
			}
		}
		// let voE: VoEquipEx;
		for (let i = 0, len = data.readShort(); i < len; i++) {
			sid = data.readLong();
			pos = data.readByte();
			id = data.readInt();
			vo = role.equipData[pos];
			if (vo) {
				vo.initLib(id);
			} else {
				vo = VoEquip.create(id);
			}
			vo.sid = sid;
			vo.ownPos = pos;
			role.equipData[pos] = vo;
		}
		GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
	}

	/**352	
	[L-I-B]
	GC 不在身上装备数据 [L:装备唯一idI:装备系统idB:附加属性系数]装备数据 */
	public GCBagEquip(self: Model_Equip, data: BaseBytes): void {
		let sid: number;
		let id: number;
		let ex: number;
		for (let i = 0, len = data.readShort(); i < len; i++) {
			sid = data.readLong();
			id = data.readInt();
		}
		//GGlobal.control.notify(Enum_MsgType.MSG_BAG_EQUIP_UPDATE);
		// self.notify("bagEquipUpdate");
	}

	/**354	
	B-B-[L-I-B]
	GC 一键穿戴装备返回 B:返回值，0成功，1不成功[L:装备唯一idI:装备系统idB:替换的位置]更换的装备信息*/
	public GCPutOnResult(self: Model_Equip, data: BaseBytes): void {
		let result: number = data.readByte();
		if (result == 0) {
			let role = Model_player.voMine;
			var posArr: number[] = [];
			let pos: number;
			let sid: number;
			let id: number;
			let vo: VoEquip;

			var len = data.readShort();
			for (let i = 0; i < len; i++) {
				sid = data.readLong();
				id = data.readInt();
				pos = data.readByte();
				let vo1: VoEquip = role.equipData[pos];
				vo = VoEquip.create(id);
				vo.sid = sid;
				vo.ownPos = pos;
				if (vo1) {
					vo.qh = vo1.qh;
					vo.bs = vo1.bs;
					vo.starLv = vo1.starLv;
					vo.zhuHunLv = vo1.zhuHunLv;
					vo.zhuHunExp = vo1.zhuHunExp;
				}
				if (pos < 8) {
				}
				role.equipData[pos] = vo;
				posArr.push(pos);
			}
			GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
			self.notify("putOnResult", posArr);
		}
	}


	private GCWearEquipByid(self: Model_Equip, data: BaseBytes): void {
		let result: number = data.readByte();
		if (result == 0) {
			ViewCommonWarn.text("穿戴成功")
		} else {
			ViewCommonWarn.text("穿戴失败")
		}
	}
	/**353	
	B
	CG 一键穿戴装备 B:职业 */
	public CGPutOnEquip(arr): void {
		if (GGlobal.loginArg.ip == "noServer" || arr.length == 0) {
			return;
		}
		var ba = this.getBytes();
		let len = arr.length;
		ba.writeShort(len);
		for (let i = 0; i < len; i++) {
			ba.writeLong(arr[i]);
		}
		this.sendSocket(353, ba);
	}


	/**351	
	B:装备状态 0不在身上1身上普通装备2神装3武将将印*/
	public CGGetEquips(type): void {
		var ba = this.getBytes();
		ba.writeByte(type);
		this.sendSocket(351, ba);
	}

	public static wearEquip(vo: VoEquip): boolean {
		let zs = Model_player.voMine.zsID
		if (zs < vo.zs) {
			ViewCommonWarn.text("转数不足");
			return false;
		}
		if (Model_LunHui.realLv < vo.level) {
			ViewCommonWarn.text("等级不足");
			return false;
		}
		if (vo.type >= 10 && vo.type < 20) {//神装
			if (!ModuleManager.isOpen(UIConst.GOD_EQUIP)) {
				var lib = Config.xitong_001[UIConst.GOD_EQUIP];
				if (lib["open"] != "0") {
					var condition = JSON.parse(lib["open"]);
					var val = condition[0][1];
					ViewCommonWarn.text("神装第" + val + "关开启");
				}
				return false;
			}
		}
		GGlobal.modelEquip.CGWearEquipByid(vo.sid);
		return true;
	}

	/**通过唯一id穿（装备神装将印） L:装备唯一id*/
	public CGWearEquipByid(id): void {
		var ba = this.getBytes();
		ba.writeLong(id);
		this.sendSocket(371, ba);
	}


	private static _eqiuplv: any;
	/**装备升级 获取装备升级下一级对象 pos 部位, sid 装备id 无0*/
	public static getNextEuipLv(pos: number, sid: number): any {
		if (Model_Equip._eqiuplv == null) {
			Model_Equip._eqiuplv = {};
			for (var key in Config.eqiuplv_204) {
				var $eqiuplv = Config.eqiuplv_204[key];
				if (Model_Equip._eqiuplv[$eqiuplv.buwei] == null) {
					Model_Equip._eqiuplv[$eqiuplv.buwei] = {};
				}
				Model_Equip._eqiuplv[$eqiuplv.buwei][$eqiuplv.up] = $eqiuplv
			}
		}
		return Model_Equip._eqiuplv[pos][sid];
	}

	//	获取可以穿的转生装备
	public static zSWearArr(): Array<VoEquip> {
		let arr: Array<VoEquip> = Model_Bag.filterEquips(Model_Bag.filterZsEquip, null);
		let d = Model_player.voMine.equipData
		let sendArr = [];
		for (let i = 0; i < arr.length; i++) {
			let equ = arr[i];
			if (Model_player.voMine.zsID < equ.zs) {//不可穿
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
		return sendArr
	}
	//	转生大师红点
	public static zSDaShiRed(): boolean {
		let lv: number = Model_Equip.lhLevel;
		var curCfg = Config.zhuanshenglhds_256[lv];
		var nextCfg = Config.zhuanshenglhds_256[lv + 1];
		var boo = true;
		if (!nextCfg || Model_Equip.lhArr.length == 0) {
			boo = false;
		} else {
			for (let i = 0; i < Model_Equip.lhArr.length; i++) {
				if (Model_Equip.lhArr[i].lv < nextCfg.lv) {
					boo = false;
					break;
				}
			}
		}
		return boo;
	}
	//	转生装备可以炼魂
	public static zSEquipLh(): boolean {
		let d = Model_player.voMine.equipData
		let has = Model_Bag.getItemCount(Model_Equip.lhItemId)
		for (let i = 30; i < 34; i++) {
			let lh: VoRebirthLH = Model_Equip.lhArr[i - 30];
			if (lh == null || d[i] == null) continue;
			let lhCfg = Config.zhuanshenglh_256[lh.lv]
			if ((has * 10 + lh.exp >= lhCfg.exp) && lhCfg.exp != 0) {
				return true;
			}
		}
		return false;
	}
}