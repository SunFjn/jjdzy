class Model_Bag extends BaseModel {

	public static CONST_INIT_GRID_NUM: number = 150; //初始格子容量
	public static CONST_MAX_GRID_NUM: number = 1000; //最大格子容量
	public static CONST_MULGRID_NUM: number = 5; //5
	public static CONST_OPEN_MULGRID_MONEY: number = 10; //打开多个格子的金钱数量
	public static CONST_MAX_MUL_USE_NUM: number = 99999; //最大使用数量 & 最大格子存储数量
	public static CONST_TIPS_RL_GRID_NUM: number = 160; //X件装备提示熔练

	public static CONST_VIP_GRID_NUM: number = 280; //VIP可以开启最多多少格子
	public static CONST_MONTHCARD_GRID_NUM: number = 100; //月卡可以开启多少格子
	public static CONST_ZZCARD_GRID_NUM: number = 200; //至尊卡可以开启多少格子

	public static itemList: VoItem[] = [];//道具
	public static gemList: VoItem[] = [];//宝石
	public static itemMap = {};//道具和宝石
	public static equipList: VoEquip[] = [];
	public static equipMap = {};
	public static bagBuyNum: number = 0; //当前已经购买的格子数量

	public static checkBagCapacity(): boolean {
		let self = this;
		if (!Model_Bag.checkResGridNum(20, false)) {
			let equipList = Model_RongLian.onekeyRongLianArr();
			if (equipList.length == 0) {
				ViewCommonWarn.text("装备背包空间不足，请手动分解");
				return false;
			}
			Model_RongLian.ALERT_ONEKEY();
			return false;
		}
		return true;
	}

	/**获取背包内某种属性丹的数量*/
	public static getDrugCountWithCfg(id): number {
		var lib = Config.drug_200[id];
		var ret = Model_Bag.getItemCount(lib["id"]);
		return ret;
	}

	/**计算当前开启数量所需金钱数量 */
	//当前元宝开启价格=（次数-1）/2+3  向下取整 多次就循环计算
	public static calculateNeedMoney(openNum: number): number {
		var startCount: number = Model_Bag.getCurrentBuyCount();
		var money: number = 0;
		for (var i: number = 0; i < openNum; i++) {
			var loc_count: number = startCount + i;
			money += Math.floor(loc_count / 2 + 3);
		}
		return money;
	}

	//当前已经购买到多少次
	public static getCurrentBuyCount(): number {
		var count: number = Model_Bag.bagBuyNum / Model_Bag.CONST_MULGRID_NUM;
		return count;
	}

	//当前背包容量
	public static getCurBagNum(): number {
		var girdNum: number = Model_Bag.CONST_INIT_GRID_NUM;
		girdNum += Model_Bag.bagBuyNum;
		// //是否vip
		girdNum += Config.VIP_710[Model_player.voMine.viplv + 1].BAG;
		// //是否尊卡, 2017.6.13修改需求，尊卡与月卡功能不叠加
		// if (GGlobal.model_welfare.advanceCardState == 1) {
		// 	girdNum += Model_Bag.CONST_ZZCARD_GRID_NUM;
		// 	return girdNum;
		// }
		// //是否月卡
		// if (GGlobal.model_welfare.moonCardState == 1) {
		// 	girdNum += Model_Bag.CONST_MONTHCARD_GRID_NUM;
		// }
		return girdNum;
	}

	/**装备背包空间剩余个数 */
	public static getResNum(): number {
		var equipNum: number = Model_Bag.equipList.length;
		var resGridNum: number = Model_Bag.getCurBagNum() - equipNum;
		return resGridNum;
	}

	// /**道具背包空间剩余个数 */
	// public static getResItemNum(): number {
	// 	var itemNum: number = 0;
	// 	var itemlist = Model_Bag.itemList;
	// 	for (var i: number = 0, len = itemlist.length; i < len; i++) {
	// 		var vo: VoItem = itemlist[i];
	// 		if (vo) {
	// 			var count: number = Math.ceil(vo.count / Model_Bag.CONST_MAX_MUL_USE_NUM);
	// 			itemNum += count;
	// 		}
	// 	}
	// 	var resGridNum: number = Model_Bag.getCurBagNum() - itemNum;
	// 	return resGridNum;
	// }

	/**检测装备背包是否足够
	 * count 
	 * isMsg 是否提示
	 */
	public static checkResGridNum(count: number, isMsg: boolean): boolean {
		var bo = true;
		var num = Model_Bag.getResNum();
		if (count > num) {
			bo = false;
			if (isMsg) {
				ViewCommonWarn.text("背包空间不足，请前往熔炼");
			}
		}
		return bo;
	}

	/**获取剩余最大开启次数 */
	public static getResMaxOpenCount(): number {
		var resGridNum: number = Model_Bag.CONST_MAX_GRID_NUM - Model_Bag.CONST_INIT_GRID_NUM; //减去初始值
		//减去已购买的格子
		resGridNum -= Model_Bag.bagBuyNum;
		//减去是否vip
		// resGridNum -= Model_Bag.CONST_VIP_GRID_NUM;
		//减去是否月卡 开至尊卡不会叠加
		//resGridNum -= Model_Bag.CONST_MONTHCARD_GRID_NUM;
		//减去是否至尊卡
		// resGridNum -= Model_Bag.CONST_ZZCARD_GRID_NUM;

		var count: number = resGridNum / Model_Bag.CONST_MULGRID_NUM;
		return count;
	}

	/**检测背包按钮是否有红色提示 */
	public static checkNotice(): boolean {
		if (Model_Bag.checkEquipNotice()) {
			return true;
		}
		if (Model_Bag.checkItemBagNotice()) {
			return true;
		}
		if (Model_RongLian.checkHeCheng()) {
			return true;
		}
		return false;
	}

	public static checkItemBagNotice(): boolean {
		var list = Model_Bag.itemList;
		var len = list.length;
		for (var i: number = 0; i < len; i++) {
			var vo: VoItem = list[i];
			let red = false
			if (vo.canUse && Model_LunHui.realLv >= vo.level) {
				if (vo.tz == UIConst.TUJIAN) {//图鉴处理
					if (Model_TuJian.checkItemVo(vo)) {
						red = true;
					}
				} else {
					red = true && this.secCheckBag(vo);
				}
			}
			if (red) return true;
		}
		return false;
	}
	//熔炼
	public static checkRongLing(): boolean {
		var equipNum: number = Model_Bag.equipList.length;
		var resGridNum: number = Model_Bag.getCurBagNum() - equipNum;
		if (resGridNum <= 20) {
			return true;
		}
		return false
	}

	public static checkEquipNotice(): boolean {
		//熔炼
		if (Model_Bag.checkRongLing()) {
			return true;
		}
		//分解
		if (Model_RongLian.checkFenJie()) {
			return true;
		}
		return false;
	}


	// public static checkItemNeedEnough(items: any, msgType: number = 0): boolean {
	// 	return true;
	// }

	public static getItemCount(id: number): number {
		var voi: VoItem = Model_Bag.itemMap[id];
		if (voi) {
			return voi.count;
		}
		return 0;
	}
	public static getEQCntByPart(part: number) {
		const equipMap = Model_Bag.equipMap;
		let ret = 0;
		for (let key in equipMap) {
			const voe: VoEquip = equipMap[key];
			const cfg = Config.zhuangbei_204[voe.id];
			if (cfg.part == part) {
				ret++;
			}
		}
		return ret;
	}

	public static filterItems(filterFun: Function, self: any = null): any {
		var ret = [];
		var list = Model_Bag.itemList;
		var len = Model_Bag.itemList.length;
		for (var i: number = 0; i < len; i++) {
			var vo: VoItem = list[i];
			if (filterFun(vo, self) == true) {
				ret.push(vo);
			}
		}
		return ret;
	}

	public static filterGems(filterFun: Function, self: any = null): any {
		var ret = [];
		var list = Model_Bag.gemList;
		var len = Model_Bag.gemList.length;
		for (var i: number = 0; i < len; i++) {
			var vo: VoItem = list[i];
			if (filterFun(vo, self) == true) {
				ret.push(vo);
			}
		}
		return ret;
	}

	public static filterEquips(filterFun: Function, self: any): any {
		var ret = [];
		var list = Model_Bag.equipList;
		var len = Model_Bag.equipList.length;
		for (var i: number = 0; i < len; i++) {
			var voe: VoEquip = list[i];
			if (filterFun(voe, self) == true) {
				ret.push(voe);
			}
		}
		return ret;
	}
	//匹配转生装备
	public static filterZsEquip(eq: VoEquip, s): boolean {
		if (eq.type >= 30 && eq.type <= 33) {
			return true;
		}
		return false;
	}

	//匹配武将装备
	public static filterWuJEquip(eq: VoEquip, s): boolean {
		if (eq.type >= 40 && eq.type <= 43) {
			return true;
		}
		return false;
	}

	//匹配战甲装备
	public static filterZhanJEquip(eq: VoEquip, s): boolean {
		if (eq.type >= 50 && eq.type <= 53) {
			return true;
		}
		return false;
	}
	//匹配神剑装备
	public static filterShenJianEquip(eq: VoEquip, s): boolean {
		if (eq.type >= 60 && eq.type <= 63) {
			return true;
		}
		return false;
	}
	//匹配异宝装备
	public static filterYiBaoEquip(eq: VoEquip, s): boolean {
		if (eq.type >= 70 && eq.type <= 73) {
			return true;
		}
		return false;
	}
	//匹配兵法装备
	public static filterBingFaEquip(eq: VoEquip, s): boolean {
		if (eq.type >= 80 && eq.type <= 83) {
			return true;
		}
		return false;
	}

	//匹配宝物装备
	public static filterBaoWuEquip(eq: VoEquip, s): boolean {
		if (eq.type >= 90 && eq.type <= 93) {
			return true;
		}
		return false;
	}

	//匹配天书装备
	public static filterTianShuEquip(eq: VoEquip, s): boolean {
		if (eq.type >= 100 && eq.type <= 103) {
			return true;
		}
		return false;
	}

	//匹配武将装备
	public static filterEquipType(eq: VoEquip, type): boolean {
		if (eq.type == type) {
			return true;
		}
		return false;
	}

	// public static itemUseProgresser(vo: VoItem): void {
	// 	var useType: number = vo.useType;
	// 	if (useType != 0) {
	// 		if (Model_player.voMine.level < vo.level) {
	// 			ViewCommonWarn.text("等级不足，无法使用");
	// 			return;
	// 		}
	// 	}
	// }

	/**该装备是否可穿戴 */
	public static isCanTakeOff(vo: VoEquip): boolean {
		if (vo.level > Model_LunHui.realLv) return false;
		return true;
	}


	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(200, this.GC_BAG_DATA, this);
		mgr.regHand(202, this.GC_BAG_OPEN_GRID, this);
		mgr.regHand(204, this.GC_BAG_EQUIP_UPDATE, this);
		mgr.regHand(206, this.GC_BAG_ITEM_UPDATE, this);
		mgr.regHand(208, this.GC_BAG_ITEM_USE, this);
		mgr.regHand(210, this.GC_BAG_VO_NOTICE, this);
		mgr.regHand(234, this.GC_BAG_DROPDATA, this);
		mgr.regHand(2682, this.GC_BAG_FENJIE, this);
		mgr.regHand(2684, this.GC_BAG_FENJIE_ONEKEY, this);
	}

	//分解道具 I:分解目标idI:分解数量
	public CG_BAG_FEJIE(id: number, count): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		bates.writeInt(count);
		this.sendSocket(2681, bates);
	}

	//一键分解 [L:装备id][I:道具idI:道具数量]
	public CG_BAG_FEJIE_ONEKEY(arr1: number[], arr2: { id: number, ct: number }[]): void {
		var bates = this.getBytes();
		let len = arr1.length;
		bates.writeShort(len);
		for (let i = 0; i < len; i++) {
			bates.writeLong(arr1[i]);
		}
		len = arr2.length;
		bates.writeShort(len);
		for (let i = 0; i < len; i++) {
			bates.writeInt(arr2[i].id);
			bates.writeInt(arr2[i].ct);
		}
		this.sendSocket(2683, bates);
	}

	//分解返回 B:0成功 1失败I:分解idI:分解数量
	public GC_BAG_FENJIE(self: Model_Bag, data: BaseBytes): void {
		var res = data.readByte();
		if (res == 0) {
			var id = data.readInt();
			var count = data.readInt();
			// Model_RongLian.fenjiePrompt(id, count)
			GGlobal.control.notify(Enum_MsgType.MSG_BAG_DECOMPOSE);
			GGlobal.control.notify(Enum_MsgType.MSG_BAG_DECOMPOSE_RED);
		} else {
			ViewCommonWarn.text("分解失败");
		}
	}

	// 一键分解返回 B:0成功 1失败[L:装备id][I:道具idI:数量][B:类型I:道具I:数量]
	private GC_BAG_FENJIE_ONEKEY(self: Model_Bag, data: BaseBytes) {
		let res = data.readByte();
		if (res == 0) {
			let len = data.readShort();
			for (let i = 0; i < len; i++) {
				let id = data.readLong();
				// Model_RongLian.fenjiePrompt(id)
			}
			len = data.readShort();
			for (let i = 0; i < len; i++) {
				let id = data.readInt();
				let ct = data.readInt();
			}
			len = data.readShort();
			for (let i = 0; i < len; i++) {
				let ty = data.readByte();
				let id = data.readInt();
				let ct = data.readInt();
				// ConfigHelp.addSerGainText(ty, id, true, ct);
			}
			GGlobal.control.notify(Enum_MsgType.MSG_BAG_DECOMPOSE_ONEKEY);
			GGlobal.control.notify(Enum_MsgType.MSG_BAG_DECOMPOSE_RED);
		} else {
			ViewCommonWarn.text("一键分解失败");
		}
	}

	//200 [L-I]-[I-I]-S GC上线发送背包数据 [L:装备唯一idI:装备系统id]装备数据[I:道具系统idI:道具总数量]道具数量S:已开启格子
	public GC_BAG_DATA(self: Model_Bag, data: BaseBytes): void {
		Model_Bag.equipMap = {};
		Model_Bag.equipList = [];
		Model_Bag.itemMap = {};
		Model_Bag.itemList = [];
		Model_Bag.gemList = [];
		let d = new BaseBytes();
		var itemInitMap: any = {};
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let ss = data.readLong();
			let ss1 = data.readInt();
			if (Model_Bag.equipMap[ss] == null) {
				var voe: VoEquip = VoEquip.create(ss1);
				voe.sid = ss;
				voe.count = 1;
				Model_Bag.equipMap[ss] = voe;
				Model_Bag.equipList.push(voe);

				self.getItemInitMap(itemInitMap, voe);
			}
		}
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let itemID = data.readInt();
			let count = data.readInt();
			let sysArr = JSON.parse(Config.daoju_204[itemID].sys2);
			for (let j = 0; j < sysArr.length; j++) {
				itemInitMap[sysArr[j][0]] = true;
			}
			itemInitMap[Config.daoju_204[itemID].sys] = true;
			if (Model_Bag.itemMap[itemID] == null) {
				var voi: VoItem = VoItem.create(itemID);
				voi.count = count;
				Model_Bag.itemMap[itemID] = voi;
				if (voi.isGem) {
					Model_Bag.gemList.push(voi);
				} else {
					Model_Bag.itemList.push(voi);
				}
			}
		}

		let arg1 = data.readShort();
		Model_Bag.bagBuyNum = arg1;

		GGlobal.control.notify(Enum_MsgType.MSG_BAG_ITME_UPDATE, itemInitMap);
		GGlobal.control.notify(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, itemInitMap);
		GGlobal.control.notify(Enum_MsgType.MSG_BAG_SIZE_UPDATE);
		GGlobal.control.notify(Enum_MsgType.MSG_BAG_VO_UPDATE);
	}

	//201 S CG开启背包格子 S:要开启的格子数
	public CG_BAG_OPEN_GRID(openNum): void {
		var bates = this.getBytes();
		bates.writeShort(openNum);
		this.sendSocket(201, bates);
	}

	//GC开启格子返回 B:0失败1成功开启2更新格子数3已达最大格子4元宝不足S:正确格子数
	public GC_BAG_OPEN_GRID(self: Model_Bag, data: BaseBytes): void {
		let arg1 = data.readByte();
		let arg2 = data.readShort();

		if (arg1 == 0) {
			ViewCommonWarn.text("开启格子返回 失败");
		} else if (arg1 == 1) {
			ViewCommonWarn.text("开启格子成功");
			Model_Bag.bagBuyNum = arg2;
			GGlobal.control.notify(Enum_MsgType.MSG_BAG_SIZE_UPDATE);
		} else if (arg1 == 2) {
			Model_Bag.bagBuyNum = arg2;
			GGlobal.control.notify(Enum_MsgType.MSG_BAG_SIZE_UPDATE);
		} else if (arg1 == 3) {
			ViewCommonWarn.text("已达最大格子");
		} else if (arg1 == 4) {
			ModelChongZhi.guideToRecharge();
		} else {
			ViewCommonWarn.text("202 开启格子返回: " + arg1);
		}
	}

	//204 [L-I-B] GC背包装备操作 [L:装备唯一idI:装备系统id B:剩余总数量（0为删除）]装备数组
	public GC_BAG_EQUIP_UPDATE(self: Model_Bag, data: BaseBytes): void {
		var equipMap = Model_Bag.equipMap;
		var equipList = Model_Bag.equipList;
		var itemInitMap = {};
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let arg1 = data.readLong();
			let arg2 = data.readInt();
			let arg3 = data.readByte();

			let voe: VoEquip;
			if (equipMap[arg1] == null) {
				voe = VoEquip.create(arg2);
				voe.sid = arg1;
				voe.count = 1;
				equipMap[arg1] = voe;
				equipList.push(voe);
			} else {
				voe = equipMap[arg1];
				voe.count = arg3;
				if (voe.count == 0) {
					equipList.splice(equipList.indexOf(voe), 1);
					delete equipMap[voe.sid];
				}
			}
			self.getItemInitMap(itemInitMap, voe);
		}
		GGlobal.control.notify(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, itemInitMap);
		GGlobal.control.notify(Enum_MsgType.MSG_BAG_VO_UPDATE);
	}

	public getItemInitMap(itemInitMap: any, voe: VoEquip) {
		if (voe.type < 10) {
			itemInitMap["equip"] = true;
		} else if (voe.type < 20) {
			itemInitMap["equip2"] = true;//神装
		} else if (voe.type < 30) {
			itemInitMap["equip3"] = true;//将印
		} else if (voe.type < 34) {
			itemInitMap["equip4"] = true;//转生装备
		} else if (voe.type < 44) {
			itemInitMap["equip5"] = true;
		} else if (voe.type < 54) {
			itemInitMap["equip6"] = true;
		} else if (voe.type < 64) {
			itemInitMap["equip7"] = true;
		} else if (voe.type < 74) {
			itemInitMap["equip8"] = true;
		} else if (voe.type < 84) {
			itemInitMap["equip9"] = true;
		} else if (voe.type < 94) {
			itemInitMap["equip10"] = true;
		} else if (voe.type < 104) {
			itemInitMap["equip11"] = true;
		} else if (Config.shjx_266[voe.type]) {
			itemInitMap["equip12"] = true;
		}
	}

	//206 [I-I] GC背包道具处理 [I:道具idI:道具数量]道具数量
	public GC_BAG_ITEM_UPDATE(self: Model_Bag, data: BaseBytes): void {

		var itemMap = Model_Bag.itemMap;
		var itemList = Model_Bag.itemList;
		var gemList = Model_Bag.gemList;

		var itemChangeMap = {};
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let itemid = data.readInt();
			let itemcount = data.readInt();
			let sysArr = JSON.parse(Config.daoju_204[itemid].sys2);
			for (let j = 0; j < sysArr.length; j++) {
				itemChangeMap[sysArr[j][0]] = true;
			}
			let sys = Config.daoju_204[itemid].sys
			itemChangeMap[sys] = true;
			let voi: VoItem;
			if (itemMap[itemid] == null) {
				voi = VoItem.create(itemid);
				voi.count = itemcount;
				itemMap[itemid] = voi;
				if (voi.isGem) {
					gemList.push(voi);
				} else {
					itemList.push(voi);
				}
			} else {
				voi = itemMap[itemid];
				voi.count = itemcount;
				if (voi.count == 0) {
					if (voi.isGem) {
						gemList.splice(gemList.indexOf(voi), 1);
					} else {
						itemList.splice(itemList.indexOf(voi), 1);
					}
					delete itemMap[voi.id];
				}
			}
		}

		GGlobal.control.notify(Enum_MsgType.MSG_BAG_ITME_UPDATE, itemChangeMap);
		GGlobal.control.notify(Enum_MsgType.MSG_BAG_VO_UPDATE);
	}

	//207 I-S CG使用物品 I:道具idI:使用数量
	public CG_BAG_ITEM_USE(itemID: number, num: number): void {
		var bates = this.getBytes();
		bates.writeInt(itemID);
		bates.writeInt(num);
		this.sendSocket(207, bates);
	}

	//208 B GC使用道具返回 B:0失败1成功2 物品使用数量已达日限制 3 使用后大于了体力上限4等级不符5 物品不可直接使用6 职业不符 7：已有更高级的称号8背包已满9符文背包已满10印记背包已满
	public GC_BAG_ITEM_USE(self: Model_Bag, data: BaseBytes): void {
		let arg1 = data.readByte();

		if (arg1 == 0) {
			ViewCommonWarn.text("失败");
		} else if (arg1 == 1) {
			GGlobal.control.notify(Enum_MsgType.MSG_BAG_ITEM_USE)
		} else if (arg1 == 2) {
			ViewCommonWarn.text("物品使用数量已达日限制");
		} else if (arg1 == 3) {
			ViewCommonWarn.text("使用后大于了体力上限");
		} else if (arg1 == 4) {
			ViewCommonWarn.text("等级不足，无法使用");
		} else if (arg1 == 5) {
			ViewCommonWarn.text("物品不可直接使用");
		} else if (arg1 == 6) {
			ViewCommonWarn.text("职业不符");
		} else if (arg1 == 7) {
			ViewCommonWarn.text("已有更高级的称号");
		} else if (arg1 == 8) {
			ViewCommonWarn.text("背包空间不足, 请清理背包");
		} else if (arg1 == 9) {
			ViewCommonWarn.text("符文背包空间不足, 请清理符文背包");
		} else if (arg1 == 10) {
			ViewCommonWarn.text("印记背包空间不足, 请清理印记背包");
		} else {
			ViewCommonWarn.text("208 GC使用道具返回: " + arg1);
		}
	}

	//209 I-I-B CG使用界面道具 I:道具idI:使用数量B:选择索引
	public CG_BAG_ITEM_SELECT_USE(itemID: number, num: number, index: number): void {
		var bates = this.getBytes();
		bates.writeInt(itemID);
		bates.writeInt(num);
		bates.writeByte(index);
		this.sendSocket(209, bates);
	}

	//210 [I-I-B] GC提示物品流水 [I:物品idI:操作数量B:0使用1获得2飘获取道具]物品信息
	public GC_BAG_VO_NOTICE(self: Model_Bag, data: BaseBytes): void {
		var itemLib = Config.daoju_204;
		var arrGet = null;
		var getNewItem = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let arg1 = data.readInt();
			let arg2 = data.readInt();
			let arg3 = data.readByte();

			let itemName: string;
			let color: number;
			let voGrid: IGridImpl;
			if (itemLib[arg1] != null) {
				voGrid = VoItem.create(arg1);
				voGrid.count = arg2;
				itemName = voGrid.name;
				color = voGrid.qColor;
			} else if (Config.zhuangbei_204[arg1] != null) {
				voGrid = VoEquip.create(arg1);
				voGrid.count = arg2;
				itemName = voGrid.name;
				color = voGrid.qColor;
			} else {
				console.log("no item id" + arg1)
			}

			if (arg3 == 1 && voGrid.quality > 5) {
				if (!arrGet) arrGet = [];
				arrGet.push(voGrid)
			} else {
				let oper: string = arg3 == 0 ? "使用" : "获得";
				ViewBroadcastItemText.text(oper + "【" + itemName + "】 X" + arg2, color);
			}
			if ((arg3 == 1 || arg3 == 2) && voGrid.gType == Enum_Attr.ITEM) {
				if (Model_BaoWu.isBaoWuJHItem(arg1)) {
					Model_BaoWu.checkAndShow(arg1);
				}
				else if (Model_ShenJian.isShenJianJHItem(arg1)) {
					Model_ShenJian.checkAndShow(arg1);
				}
				else if (GGlobal.modeltianshu.isTianShuJHItem(arg1)) {
					GGlobal.modeltianshu.checkAndShow(arg1);
				}
				else if (self.isJHItem(arg1, UIConst.ZHAN_JIA)) {//战甲
					Model_ZhanJia.checkAndShow(arg1);
				}
				else if (self.isJHItem(arg1, UIConst.BINGFA)) {// 兵法
					GGlobal.modelBingFa.checkAndShow(arg1);
				}
				else if (self.isJHItem(arg1, UIConst.YIBAO)) {// 异宝
					Model_YiBao.checkAndShow(arg1);
				}
				else if (self.isJHItem(arg1, UIConst.WU_JIANG)) {//武将
					getNewItem.push(voGrid)
				} else if (self.isJHItem(arg1, UIConst.ZS_GODWEAPON)) {
					Model_ZSGodWeapon.checkAndShow(arg1);
				}
			}

		}
		if (arrGet) {
			ViewCommonPrompt.textItemList(arrGet);
		}
		if (getNewItem.length > 0) {
			egret.callLater(Model_WuJiang.addNewItem, null, getNewItem);
		}
	}

	public isJHItem(id: number, sys: number) {
		return Config.daoju_204[id] && Config.daoju_204[id].sys == sys;
	}


	/**234	
	[B-I-S]-I
	通用掉落数据 [B:类型I:idS:数量]掉落数据I:掉落的怪物ID */
	public GC_BAG_DROPDATA(self: Model_Bag, data: BaseBytes): void {
		var len = data.readShort();
		var info: number[][] = [];
		for (var i = 0; i < len; i++) {
			var type = data.readByte();
			var id = data.readInt();
			var count = data.readShort();
			info.push([type, id, count]);
		}
		var npcId = data.readInt();
		// SceneDropCtrl.instance.notify(SceneDropCtrl.MSG_SCENE_DROP, { "id": npcId, "drop": info });
	}

	public static sortFunc(a: IGridImpl, b: IGridImpl): number {
		return a.paixu - b.paixu;
	}
	public static secCheckBag(vo: VoItem) {
		let ret = false;
		const linkSysID = vo.tz;
		switch (linkSysID) {
			case UIConst.WU_JIANG:
				ret = !Model_WuJiang.isFullByMat(vo);
				break;
			case UIConst.BAOWU:
				ret = !Model_BaoWu.isFullByMat(vo);
				break;
			case UIConst.TIANSHU:
				ret = !Model_TianShu.isFullByMat(vo);
				break;
			case UIConst.SHEN_JIAN:
				ret = !Model_ShenJian.isFullByMat(vo);
				break;
			case UIConst.YIBAO:
				ret = !Model_YiBao.isFullByMat(vo);
				break;
			case UIConst.ZHAN_JIA:
				ret = !Model_ZhanJia.isFullByMat(vo);
				break;
			case UIConst.BINGFA:
				ret = !Model_BingFa.isFullByMat(vo);
				break;
			case UIConst.SHAOZHU:
				ret = !Model_ShaoZhu.isFullByMat(vo);
				break;
			case UIConst.TUJIAN:
				//图鉴已处理
				ret = true;
				break;
			case UIConst.ZS_GODWEAPON:
				ret = !Model_ZSGodWeapon.isFullByMat(vo);
				break;
			default:
				ret = true;
				break;
		}

		switch (vo.cfg.leixing) {
			case 21://时装
				ret = GGlobal.modelWuJiang.isMaxLevelSZ(vo.cfg.id);
				break;
		}
		return ret;
	}
}