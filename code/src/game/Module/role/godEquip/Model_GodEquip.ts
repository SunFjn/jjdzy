class Model_GodEquip extends BaseModel {

	public static GODCHIP = 410006;
	public static GOD_JIE: number = 0;
	public static hasData: boolean = false;

	public static checkEquipNotice_XL(vo: VoEquip) {
		let cfg: Iszxlsx_306;
		if (vo) {
			cfg = Config.szxlsx_306[vo.jie];
			if(cfg.xl == 0){
				return false;
			}
			let costArr = JSON.parse(cfg.cost);
			let costVo = VoItem.create(costArr[0][1]);
			costVo.count = costArr[0][2];
			let count = Model_Bag.getItemCount(costArr[0][1]);
			if (count >= costVo.count && !(vo.xlhp >= cfg.hp && vo.xlatk >= cfg.atk && vo.xldef >= cfg.def)) {
				return true;
			}
		}
		return false;
	}

	private static _xlJie = -1
	public static getXLJie(){
		if(Model_GodEquip._xlJie == -1){
			for(let keys in Config.szxlsx_306){
				let c = Config.szxlsx_306[keys]
				if(c.xl > 0){
					Model_GodEquip._xlJie = c.id
					break;
				}
				
			}
		}
		return Model_GodEquip._xlJie
	}

	public static checkEquipNotice(pos, id) {
		let next = Model_Equip.getNextEuipLv(pos, id);
		if (!next) {
			return false;
		}
		let composeArr: Array<any> = JSON.parse(next.compose);
		let needCount = composeArr[0][2];
		let count = Model_Bag.getItemCount(composeArr[0][1]);
		return count >= needCount;
	}
	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(356, this.GCWearShenEquip, this);
		mgr.regHand(362, this.GCUpgradeOrangeEquip, this);
		mgr.regHand(364, this.GCComposeOrange, this);
		mgr.regHand(366, this.GCDecomposeOrange, this);
		mgr.regHand(368, this.GCgetJieOrange, this);
		mgr.regHand(370, this.GCUpJieOrange, this);
		mgr.regHand(378, this.GC_GODEQUIP_XL, this);
		mgr.regHand(380, this.GC_GODEQUIP_380, this);
	}

	/**377	GC 洗练装备 I:洗练位置 */
	public CG_GODEQUIP_XL(pos): void {
		let byte = new BaseBytes();
		byte.writeInt(pos);
		this.sendSocket(377, byte);
	}

	/**378	GC 洗练返回 B:0成功 1失败I:装备位置索引I:属性类型I:属性值 */
	public GC_GODEQUIP_XL(self: Model_GodEquip, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			ViewCommonWarn.text("洗练成功");
			let pos = data.readInt();
			let type = data.readInt();
			let value = data.readInt();
			var role = Model_player.voMine;
			if (type == Enum_Attr.HP) {
				role.equipData[pos].xlhp = value;
			} else if (type == Enum_Attr.ATT) {
				role.equipData[pos].xlatk = value;
			} else if (type == Enum_Attr.DEF) {
				role.equipData[pos].xldef = value;
			}
			GGlobal.control.notify(Enum_MsgType.GODEQUIP_XILIAN);
		}
	}

	/**379	CG 查看神装部位洗练 */
	public CG_GODEQUIP_379() {
		let byte = new BaseBytes();
		this.sendSocket(379, byte);
	}

	/**380	GC某件神装洗练返回 [I:部位[I:属性类型I:属性值]] */
	public GC_GODEQUIP_380(self: Model_GodEquip, data: BaseBytes) {
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let pos = data.readInt();
			var role = Model_player.voMine;
			for (let j = 0, len1 = data.readShort(); j < len1; j++) {
				let type = data.readInt();
				let value = data.readInt();
				if (type == Enum_Attr.HP) {
					role.equipData[pos].xlhp = value;
				} else if (type == Enum_Attr.ATT) {
					role.equipData[pos].xlatk = value;
				} else if (type == Enum_Attr.DEF) {
					role.equipData[pos].xldef = value;
				}
			}
		}
		GGlobal.control.notify(Enum_MsgType.GODEQUIP_XILIAN);
	}

	/**356	 穿戴神装返回 B:返回值，0成功，1不成功[L:装备唯一idI:装备系统idB:替换的位置]更换的装备信息*/
	private GCWearShenEquip(self: Model_GodEquip, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			var len = data.readShort();
			for (let i = 0; i < len; i++) {
				var sid = data.readLong();
				var id = data.readInt();
				var pos = data.readByte();
				var role = Model_player.voMine;
				var vo: VoEquip = role.equipData[pos];
				if (!vo) {
					vo = VoEquip.create(id);
				} else {
					vo.initLib(id);
				}
				vo.sid = sid;
				vo.ownPos = pos;
				role.equipData[pos] = vo;
			}
			GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
		} else {
			ViewCommonWarn.text("穿戴失败");
		}
	}
	/**362	
	B-B-B-L-I
	GC 神装升级返回 B:0成功，1等级不足，2材料不足，3已到最高级B:身上位置L:装备唯一idI:装备系统id */
	public GCUpgradeOrangeEquip(self: Model_GodEquip, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			var pos = data.readByte();
			var sid = data.readLong();
			var id = data.readInt();
			var role = Model_player.voMine;
			var vo: VoEquip = role.equipData[pos];
			if (!vo) {
				vo = VoEquip.create(id);
			} else {
				vo.initLib(id)
			}
			vo.sid = sid;
			vo.ownPos = pos;
			role.equipData[pos] = vo;
			GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
		} else if (result == 1) {
			ViewCommonWarn.text("等级不足");
		} else if (result == 2) {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_GodEquip.GODCHIP));
		} else if (result == 3) {
			ViewCommonWarn.text("已升级到最高等级");
		}
	}

	/**364	
	B-B-B-L-I
	GC 橙装合成返回 B:0成功，1等级不足，2材料不足，3合成评分低，4装备不能脱下B:职业B:身上位置L:装备唯一idI:装备系统id */
	public GCComposeOrange(self: Model_GodEquip, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			var pos = data.readByte();
			var sid = data.readLong();
			var id = data.readInt();
			var role = Model_player.voMine;
			var vo = VoEquip.create(id);
			vo.sid = sid;
			vo.ownPos = pos;
			role.equipData[pos] = vo;
			GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
		} else if (result == 1) {
			ViewCommonWarn.text("等级不足");
		} else if (result == 2) {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_GodEquip.GODCHIP));
		} else if (result == 3) {
			ViewCommonWarn.text("合成评分低于当前装备");
		} else if (result == 4) {
			ViewCommonWarn.text("背包空间不足，请前往熔炼");
		}
	}

	/**366 GC 橙装分解返回 B:0成功，1不成功L:装备唯一id */
	public GCDecomposeOrange(self: Model_GodEquip, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			var sid = data.readLong();
			Model_RongLian.fenjiePrompt(sid)
			GGlobal.control.notify(Enum_MsgType.GOD_EQUIP_DECOMPOSE);
			GGlobal.control.notify(Enum_MsgType.MSG_BAG_DECOMPOSE_RED);
		}
	}

	public GCgetJieOrange(self: Model_GodEquip, data: BaseBytes): void {
		Model_GodEquip.GOD_JIE = data.readByte();
		Model_GodEquip.hasData = true;
		GGlobal.control.notify(Enum_MsgType.GOD_EQUIP_SUIT_JIE);
	}

	public GCUpJieOrange(self: Model_GodEquip, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			Model_GodEquip.GOD_JIE = data.readByte();
			GGlobal.control.notify(Enum_MsgType.GOD_EQUIP_SUIT_JIE);
		}
	}

	/**361	
	B-B
	CG 身上橙装升级 B:职业B:身上位置 */
	public CGUpgradeOrangeEquip(pos: number): void {
		var ba = this.getBytes();
		ba.writeByte(pos);
		this.sendSocket(361, ba);
	}

	/**合成神装 B:身上位置I:装备系统id*/
	public CGComposeOrange(pos: number, id: number): void {
		var ba = this.getBytes();
		ba.writeByte(pos);
		ba.writeInt(id);
		this.sendSocket(363, ba);
	}

	/**橙装分解 L:装备唯一id */
	public CGDeComposeOrange(sid: number): void {
		var ba = this.getBytes();
		ba.writeLong(sid);
		this.sendSocket(365, ba);
	}

	/**367	CG 获取神装阶数 */
	public CGGetJieOrange(): void {
		var ba = this.getBytes();
		this.sendSocket(367, ba);
	}

	/**369	CG 获取神装阶数 */
	public CGUpJieOrange(): void {
		var ba = this.getBytes();
		this.sendSocket(369, ba);
	}
}