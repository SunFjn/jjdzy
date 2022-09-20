class Model_RongLian extends BaseModel {

	public static rl_level: number = 0;
	public static rl_progress: number = 0;
	// public static rlEquipArr: Array<VoEquip>;

	public static fenjieObj: any = {}
	public static fenjiePrompt(sid, cout = 1): void {
		let g: IGridImpl = Model_RongLian.fenjieObj[sid]
		let decompose = Config.decompose_204[g.id]
		var arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(decompose.reward))
		for (let i = 0; i < arr.length; i++) {
			arr[i].count = cout * arr[i].count
			ConfigHelp.addSerGainText(arr[i].gType, arr[i].id, true, arr[i].count);
		}
		// ViewCommonPrompt.textItemList(arr);
	}

	/**普通熔练*/
	public static MATCH_RONGLIAN_PUTONG_EQUIP(voe: VoEquip, slef: any = null): boolean {
		if (voe.cfg.reward == "0") { //过滤特殊装备
			return false;
		}
		return true;
	}

	/**熔炉*/
	public static MATCH_RONGLU_EQUIP(voe: VoEquip, slef: any = null): boolean {
		var type: number = voe.type;
		if (type != 7 && type != 11 && type != 12 && type != 13 && type != 14) {
			return false;
		}
		return true;
	}

	/**神兵装备 */
	public static MATCH_RONGLU_SHENBING(voe: VoEquip): boolean {
		var type: number = voe.type;
		if (type != 11 && type != 12 && type != 13 && type != 14) {
			return false;
		}
		return true;
	}

	/**601 CG申请熔炼数据 */
	public CG_RL_INFO(): void {
		var bates = this.getBytes();
		this.sendSocket(601, bates);
	}

	/**603 B-[L] CG熔炼装备 B:1普通2特殊[L:装备唯一id]装备集合 */
	public CG_RL_EQUIP_LIST(type: number, equipList: Array<VoEquip>): void {
		var bates = this.getBytes();
		bates.writeByte(type);
		var len: number = equipList.length;
		bates.writeShort(len);
		for (var i: number = 0; i < len; i++) {
			var voe: VoEquip = equipList[i];
			bates.writeLong(voe.sid);
		}
		this.sendSocket(603, bates);
	}

	/**2651 CG 合成道具 I:目标idI:合成数量 */
	public CG_HE_CHENG(id: number, count: number): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		bates.writeInt(count);
		this.sendSocket(2651, bates);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(602, this.GC_RL_INFO, this);
		mgr.regHand(604, this.GC_RL_EQUIP_RESULT, this);
		mgr.regHand(606, this.GC_RL_ONEKEY, this);
		mgr.regHand(2652, this.GC_HE_CHENG, this);
	}

	//602 S-S GC返回熔炼信息 S:熔炼等级 S:熔炼进度
	public GC_RL_INFO(self: Model_RongLian, data: BaseBytes): void {
		Model_RongLian.rl_level = data.readShort();
		Model_RongLian.rl_progress = data.readInt();
		GGlobal.control.notify(Enum_MsgType.MSG_RL_INOF);
	}
	public static FULL_EXP: boolean;
	/**604 B-B GC熔炼返回 B:1普通2特殊B:0失败1成功2背包已满*/
	public GC_RL_EQUIP_RESULT(self: Model_RongLian, data: BaseBytes): void {
		let type = data.readByte();
		let result = data.readByte();
		if (result == 0) {
			ViewCommonWarn.text("Error失败");
		} else if (result == 1) {
			Model_RongLian.FULL_EXP = data.readByte() == 1;//B:1今天经验已满 0没有满
			if (type == 1) {
				GGlobal.control.notify(Enum_MsgType.MSG_RL_REFLASH1);
			} else if (type == 2) {
				// GGlobal.control.notify(Enum_MsgType.MSG_RL_REFLASH2);
			}

		} else if (result == 2) {
			ViewCommonWarn.text("背包空间不足");
		} else if (result == 3) {
			ViewCommonWarn.text("熔炼已达最大等级");
		} else if (result == 4) {
			ViewCommonWarn.text("没有装备可熔炼");
		}
	}
	//背包已满  提示
	private GC_RL_ONEKEY(self: Model_RongLian, data: BaseBytes): void {
		Model_RongLian.ALERT_ONEKEY();
	}

	//GC 合成道具返回 B:0成功 1失败I:目标idI:合成数量
	private GC_HE_CHENG(self: Model_RongLian, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			let id = data.readInt();
			let count = data.readInt();
			GGlobal.control.notify(Enum_MsgType.HE_CHENG_SUCCESS)
			ViewCommonWarn.text("合成成功")
		} else {
			if(result == 2) {
				ViewCommonWarn.text("VIP等级不足");
			}else if(result == 1) {
				ViewCommonWarn.text("材料不足");
			}
			
		}
	}

	public static ALERT_ONEKEY(): void {
		ViewAlert.show("背包空间已满，是否一键熔炼", Handler.create(this, function func() {
			Model_RongLian.onekeyRongLian();
		}, null, true), ViewAlert.OKANDCANCEL, "确定", "取消");
	}

	//一键熔炼
	public static onekeyRongLian(): void {
		var ret = Model_RongLian.onekeyRongLianArr();
		if (ret.length == 0) {
			ViewCommonWarn.text("没有装备可熔炼");
			return;
		}
		GGlobal.modelRL.CG_RL_EQUIP_LIST(1, ret)
		setTimeout(function () {
			ViewCommonWarn.text("熔炼成功");
		}, 500);
	}

	public static autoFilter(voe: VoEquip, self: any): boolean {
		var ret: boolean = Model_RongLian.MATCH_RONGLIAN_PUTONG_EQUIP(voe);//是装备
		if (ret) {
			//评分小
			var plyEq: VoEquip = Model_player.voMine.equipData[voe.type]
			if (plyEq && plyEq.getPower() >= voe.getPower()) {
				return true;
			}
			return false;
		} else {
			return false;
		}
	}

	public static equipBest;
	public static onekeyRongLianArr(): any {
		var ret = [];
		var list = Model_Bag.equipList;
		var len = Model_Bag.equipList.length;
		Model_RongLian.equipBest = {};
		for (let i: number = 0; i < len; i++) {
			let voe: VoEquip = list[i];
			let isEqu: boolean = Model_RongLian.MATCH_RONGLIAN_PUTONG_EQUIP(voe);//是装备
			if (isEqu) {
				//评分小
				let plyEq: VoEquip = null//身上装备 或要保留的装备
				let shPower = 0;
				if(voe.type >= 110 && voe.type < 150){//兽灵的装备
					shPower = ModelSH.canRongLian(voe.type)//穿在身上的战力
				}else{
					plyEq = Model_player.voMine.equipData[voe.type];
				}
				if(shPower > 0 && shPower >= voe.basePower){//兽灵装备
					ret.push(voe);
				}
				else if (plyEq && plyEq.basePower >= voe.basePower) {
					ret.push(voe);
				} else {
					let plyEqStore = Model_RongLian.equipBest[voe.type];
					if(plyEqStore == null){
						plyEqStore = {};
						Model_RongLian.equipBest[voe.type] = plyEqStore
					}
					//取最强的装备
					if(voe.jie > 0){
						if(!Model_BySys.canWearEqVo(voe)){//不可穿戴
							plyEq = plyEqStore[voe.jie]
						}else{
							plyEq = plyEqStore[0]
						}
					}
					else if(voe.zs > 0){
						if(voe.zs > Model_player.voMine.zsID){
							plyEq = plyEqStore[voe.zs]
						}else{
							plyEq = plyEqStore[0]
						}
					}else if(voe.level > 1){
						if(voe.level > Model_LunHui.realLv){
							plyEq = plyEqStore[voe.level]
						}else{
							plyEq = plyEqStore[0]
						}
					}else{
						plyEq = plyEqStore[0]
					}
					//存最强的装备
					if (plyEq == null || plyEq.basePower < voe.basePower) {
						if(plyEq){
							ret.push(plyEq)
						}
						if(voe.jie > 0){
							if(!Model_BySys.canWearEqVo(voe)){
								plyEqStore[voe.jie] = voe
							}else{
								plyEqStore[0] = voe
							}
						}
						else if(voe.zs > 0){
							if(voe.zs > Model_player.voMine.zsID){
								plyEqStore[voe.zs] = voe
							}else{
								plyEqStore[0] = voe
							}
						}else if(voe.level > 1){
							if(voe.level > Model_LunHui.realLv){
								plyEqStore[voe.level] = voe
							}else{
								plyEqStore[0] = voe
							}
						}else{
							plyEqStore[0] = voe
						}
					}else{
						ret.push(voe);
					}
				}
			}
		}
		return ret;
	}

	public static checkFJEqu(voEquip: VoEquip): boolean {
		var equ: VoEquip = Model_player.voMine.equipData[voEquip.type]
		if (equ == null || equ.basePower < voEquip.basePower) {
			return false;
		}
		return true;
	}

	public static checkFenJie(): boolean {
		//装备  神装 将印
		var arr0 = [];
		for (let i = 0; i < Model_Bag.equipList.length; i++) {
			var voEquip: VoEquip = Model_Bag.equipList[i]
			if (voEquip && Config.decompose_204[voEquip.id]) {
				if (Model_RongLian.checkFJEqu(voEquip)) {
					return true;
				}
			}
		}
		var arr1 = []
		//道具  
		for (let i = 0; i < Model_Bag.itemList.length; i++) {
			var voItem = Model_Bag.itemList[i]
			if (voItem && Config.decompose_204[voItem.id]) {
				return true;
			}
		}
		return false;
	}
	private static dataDic: any = {};
	public static getHeCheng(type: number = 1): Array<any> {
		var ret = this.dataDic[type];
		if (ret == null) {
			ret = this.dataDic[type] = [];
			for (let key in Config.compose_245) {
				const cfg = Config.compose_245[key];
				if (cfg.type == type) {
					ret.push(cfg);
				}
			}
		}
		return ret;
	}
	public static getNotByType(type: number) {
		const arr = this.getHeCheng(type);
		for(let i = 0; i < arr.length; i++) {
			const bool = Model_RongLian.checkHeChengVo(arr[i]);
			if(bool) {
				return true;
			}
		}
		return false;
	}

	public static getHCItem(vo): VoItem {
		if (vo.hcItem == null) {
			vo.hcItem = VoItem.create(vo.id)
		}
		return vo.hcItem
	}


	public static checkHeCheng(): boolean {
		const bool1 = this.getNotByType(1);
		const bool2 = this.getNotByType(2);
		return bool1 || bool2;
	}

	public static checkHeChengVo(v): boolean {
		const vip = v.vip;
		if(Model_player.voMine.viplv < vip) {
			return false;
		}
		let iArr = ConfigHelp.SplitStr(v.item)
		for (let j = 0; j < iArr.length; j++) {
			if (Number(iArr[j][0]) == Enum_Attr.ITEM) {//道具
				if (Model_Bag.getItemCount(Number(iArr[j][1])) < Number(iArr[j][2])) {
					return false;
				}
			} else {//货币
				if (Model_player.getCurrencyCount(Number(iArr[j][0])) < Number(iArr[j][2])) {
					return false;
				}
			}
		}
		return true;
	}
}