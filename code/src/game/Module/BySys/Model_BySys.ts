class Model_BySys extends BaseModel {
	public constructor() {
		super();
	}

	/**909		
	CG 获取某系统的培养等阶经验技能等级 B:1神剑2异宝3兵法4宝物5天书*/
	public CGGetinfobysys(sys): void {
		var ba = this.getBytes();
		ba.writeByte(sys);
		this.sendSocket(909, ba);
	}

	/**911		
	CG 升阶 B:系统分类1神剑2异宝3兵法4宝物5天书B:升阶方式0普通 1一键*/
	public CGUpjiebysys(sys, type): void {
		var ba = this.getBytes();
		ba.writeByte(sys);
		ba.writeByte(type);
		this.sendSocket(911, ba);
	}

	/**913		
	CG 激活/升级技能 B:1-5B:位置id 12345*/
	public CGUpskills(sys, pos): void {
		var ba = this.getBytes();
		ba.writeByte(sys);
		ba.writeByte(pos);
		this.sendSocket(913, ba);
	}

	/**815		
	CG 获取5系统激活套装 B:（1武将2宝物）*/
	public CGJiBan(type): void {
		var ba = this.getBytes();
		ba.writeByte(type);
		this.sendSocket(815, ba);
	}

	/**817		
	系统激活升级套装 B:系统idB:激活/升阶套装*/
	public CGJiBanUp(sys, index): void {
		var ba = this.getBytes();
		ba.writeByte(sys);
		ba.writeByte(index);
		this.sendSocket(817, ba);
	}

	//*************************协议处理*******************************//
	/**协议*/
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(910, this.GCGetinfobysys910, this);
		mgr.regHand(912, this.GCUpjiebysys912, this);
		mgr.regHand(914, this.GCUpskills914, this);
		mgr.regHand(816, this.GCJiBan816, this);
		mgr.regHand(818, this.GCJiBanUp818, this);
	}

	/**910	 B-I-I-[I]	
	GC B:系统type 1神剑2异宝3兵法4宝物5天书I:等阶I:经验[I:技能等级0表示未激活]*/
	private GCGetinfobysys910(self: Model_BySys, data: BaseBytes): void {
		let sys = data.readByte();
		Model_BySys._jie[sys] = data.readInt();
		Model_BySys._exp[sys] = data.readInt();
		Model_BySys._skill[sys] = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			Model_BySys._skill[sys].push(data.readInt())
		}
		GGlobal.control.notify(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sys);
	}

	/**912	B-B-I-I	 
	GC 升阶返回 B:1-5B:0成功1失败I:阶数I:经验*/
	private GCUpjiebysys912(self: Model_BySys, data: BaseBytes): void {
		let sys = data.readByte();
		let result: number = data.readByte();
		VZhiShengDan.invalNum = 2;
		if (result == 0) {
			Model_BySys._jie[sys] = data.readInt();
			Model_BySys._exp[sys] = data.readInt();
			ViewCommonWarn.text("升阶成功")
			GGlobal.control.notify(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sys);
		} else {
			ViewCommonWarn.text("升阶失败")
		}
	}

	/**914		B-B-B-I
	GC 升级技能返回 B:1-5B:0成功1失败B:位置1-5I:技能id*/
	private GCUpskills914(self: Model_BySys, data: BaseBytes): void {
		let sys = data.readByte();
		let result: number = data.readByte();
		if (result == 0) {

			if (Model_BySys._skill[sys] == null) {
				Model_BySys._skill[sys] = []
			}
			let pos = data.readByte();
			let id = data.readInt();
			Model_BySys._skill[sys][pos - 1] = id
			GGlobal.control.notify(Enum_MsgType.BY_SYS_UP_SKILL, [sys, id]);
			GGlobal.control.notify(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sys);
			ViewCommonWarn.text("升级技能成功")
		} else {
			ViewCommonWarn.text("升级技能失败")
		}
	}




	/**神剑*/
	public static SHEN_JIAN = 1
	/**异宝*/
	public static YI_BAO = 2
	/**兵法*/
	public static BING_FA = 3
	/**宝物*/
	public static BAO_WU = 4
	/**天书*/
	public static TIAN_SHU = 5
	/**战甲*/
	public static ZHAN_JIA = 6
	/**武将*/
	public static WU_JIANG = 7

	public static _jie: any = {}
	public static sysJie(sys: number): number {
		if (Model_BySys._jie[sys])
			return Model_BySys._jie[sys];
		else
			return 0
	}

	public static _exp: any = {}
	public static sysExp(sys: number): number {
		if (Model_BySys._exp[sys])
			return Model_BySys._exp[sys];
		else
			return 0;
	}

	public static _skill: any = {}
	public static sysSkillArr(sys: number): number[] {
		if (Model_BySys._skill[sys])
			return Model_BySys._skill[sys];
		else
			return [];
	}

	public static sysSkillId(sys: number, pos): number {
		if (Model_BySys._skill[sys] && Model_BySys._skill[sys][pos])
			return Model_BySys._skill[sys][pos];
		else
			0;
	}


	public static canWear(type, jieType): boolean {
		let arr: Array<VoEquip> = Model_Bag.filterEquips(Model_Bag.filterEquipType, type);
		if (arr.length == 0) return false;
		let jie = 1;
		if (jieType == Model_BySys.WU_JIANG) {
			jie = Model_WuJiang.jieShu
		} else if (jieType == Model_BySys.ZHAN_JIA) {
			jie = Model_ZhanJia.jieShu
		} else if (jieType == Model_BySys.TIAN_SHU) {
			jie = GGlobal.modeltianshu.level;
		} else if (jieType == Model_BySys.BAO_WU) {
			jie = Model_BaoWu.level;
		} else {
			jie = Model_BySys.sysJie(jieType);
		}
		let d = Model_player.voMine.equipData
		let ownE = d[type];
		for (let i = 0; i < arr.length; i++) {
			let equ = arr[i];
			if (jie < equ.jie) {//不可穿 武将
				continue;
			}
			if (ownE == null) {
				return true
			} else if (equ.basePower > ownE.basePower) {
				return true
			}
		}
		return false
	}
	//40-103装备是否满足穿戴条件
	public static canWearEqVo(equ:VoEquip): boolean {
		let type = equ.type
		let jie = equ.jie
		let jieType;
		if (type < 40) {
			jieType = 0
		} else if (type < 50) {
			jieType = Model_BySys.WU_JIANG
		} else if (type < 60) {
			jieType = Model_BySys.ZHAN_JIA
		} else if (type < 70) {
			jieType = Model_BySys.SHEN_JIAN
		} else if (type < 80) {
			jieType = Model_BySys.YI_BAO
		} else if (type < 90) {
			jieType = Model_BySys.BING_FA
		} else if (type < 100) {
			jieType = Model_BySys.BAO_WU
		} else if (type < 110) {
			jieType = Model_BySys.TIAN_SHU
		} else {
			jieType = 0;
		}
		if(jieType == 0){
			return false;
		}

		let jiePly = 0;
		if (jieType == Model_BySys.WU_JIANG) {
			jiePly = Model_WuJiang.jieShu
		} else if (jieType == Model_BySys.ZHAN_JIA) {
			jiePly = Model_ZhanJia.jieShu
		} else if (jieType == Model_BySys.TIAN_SHU) {
			jiePly = GGlobal.modeltianshu.level;
		} else if (jieType == Model_BySys.BAO_WU) {
			jiePly = Model_BaoWu.level;
		} else {
			jiePly = Model_BySys.sysJie(jieType);
		}
		if (jiePly >= jie) {
			return true;
		}
		return false
	}

	private static _jiBan: { [sys: number]: number[] } = {};
	public static getJiBan(sys): number[] {
		return Model_BySys._jiBan[sys] ? Model_BySys._jiBan[sys] : [];
	}
	/**816	
	GC套装激活情况 B:（1武将2宝物）[I:已经激活套装id]*/
	private GCJiBan816(self: Model_BySys, data: BaseBytes): void {
		let sys = data.readByte();
		let len = data.readShort();
		Model_BySys._jiBan[sys] = [];
		for (let i = 0; i < len; i++) {
			let ids = data.readInt();
			Model_BySys._jiBan[sys].push(ids)
		}
		GGlobal.control.notify(Enum_MsgType.BY_SYS_JI_BAN_UP, sys);
		// if(sys == Model_BySys.JIB_WUJIANG){
		// 	GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
		// }else if(sys == Model_BySys.JIB_BAOWU){
		// 	GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
		// }
	}
	/**818	
	系统激活升级套装 B:系统idB:套装序号I:套装id*/
	private GCJiBanUp818(self: Model_BySys, data: BaseBytes): void {
		let res = data.readByte();
		if (res == 0) {
			let sys = data.readByte();
			let index = data.readByte();
			let sid = data.readInt();
			if (Model_BySys._jiBan[sys] == null) {
				return;
			}
			Model_BySys._jiBan[sys][index - 1] = sid
			GGlobal.control.notify(Enum_MsgType.BY_SYS_JI_BAN, [sys, index, sid]);
			GGlobal.control.notify(Enum_MsgType.BY_SYS_JI_BAN_UP, sys);
			// if(sys == Model_BySys.JIB_WUJIANG){
			// 	GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
			// }else if(sys == Model_BySys.JIB_BAOWU){
			// 	GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
			// }
		} else {
			ViewCommonWarn.text("条件不满足")
		}

	}

	//武将
	public static JIB_WUJIANG = 1
	//宝物
	public static JIB_BAOWU = 2
	//神剑
	public static JIB_SHENJIAN = 3
	//异宝
	public static JIB_YIBAO = 4
	//天书
	public static JIB_TIANSHU = 5
	//战甲
	public static JIB_ZHANJIA = 6
	//兵法
	public static JIB_BINGFA = 7

	public static checkSuit(sys) {
		let suit = Model_BySys.getJiBan(sys)
		for (let i = 0; i < suit.length; i++) {
			if (Model_BySys.checkSuitVo(suit[i], sys)) {
				return true;
			}
		}
		return false;
	}

	public static checkSuitVo(suitId, sys): boolean {
		let cfg = Model_BySys.getJiBCfg(sys)
		let suit = cfg[suitId];
		if (!suit) {
			return false;
		}
		if (suit.condition == "0") {//已满级
			return false;
		}
		//条件
		let reachBoo = true;
		let conditionArr = ConfigHelp.SplitStr(suit.condition)
		for (let j = 0; j < conditionArr.length; j++) {
			let $id = Number(conditionArr[j][0])
			let $star = Number(conditionArr[j][1])
			let reachStar = null;
			if (sys == Model_BySys.JIB_BAOWU) {
				for (let k = 0; k < Model_BaoWu.baowuArr.length; k++) {
					let vo: Vo_BaoWu = Model_BaoWu.baowuArr[k];
					if (vo.id == $id) {
						reachStar = vo.starLv;
						break;
					}
				}
			} if (sys == Model_BySys.JIB_SHENJIAN) {
				for (let k = 0; k < Model_ShenJian.shenjianArr.length; k++) {
					let vo: Vo_ShenJian = Model_ShenJian.shenjianArr[k];
					if (vo.id == $id) {
						reachStar = vo.starLv;
						break;
					}
				}
			} if (sys == Model_BySys.JIB_YIBAO) {
				for (let k = 0; k < Model_YiBao.YBArr.length; k++) {
					let vo: Vo_YiBao = Model_YiBao.YBArr[k];
					if (vo.id == $id) {
						reachStar = vo.starLv;
						break;
					}
				}
			} else if (sys == Model_BySys.JIB_BINGFA) {
				let vo: VoBingFa = GGlobal.modelBingFa.mapObj[$id]
				reachStar = vo.star
			} else if (sys == Model_BySys.JIB_WUJIANG) {
				reachStar = Model_WuJiang.wuJiangStar[$id]
			} else if (sys == Model_BySys.JIB_ZHANJIA) {
				reachStar = Model_ZhanJia.zhanjiaStar[$id]
			} else if (sys == Model_BySys.JIB_TIANSHU) {
				for (let k = 0; k < GGlobal.modeltianshu.data.length; k++) {
					let vo: VoTianShu = GGlobal.modeltianshu.data[k];
					if (vo.id == $id) {
						reachStar = vo.star;
						break;
					}
				}
			}
			if (reachStar == null || reachStar < $star) {
				return false;
			}
		}
		return true;
	}

	public static getJiBCfg(sys) {
		if (sys == Model_BySys.JIB_BAOWU) {
			return Config.baosuit_214
		} else if (sys == Model_BySys.JIB_WUJIANG) {
			return Config.herosuit_211
		} else if (sys == Model_BySys.JIB_BINGFA) {
			return Config.booksuit_212
		} else if (sys == Model_BySys.JIB_YIBAO) {
			return Config.ybsuit_217
		} else if (sys == Model_BySys.JIB_SHENJIAN) {
			return Config.swordsuit_216
		} else if (sys == Model_BySys.JIB_ZHANJIA) {
			return Config.clothessuit_212
		} else if (sys == Model_BySys.JIB_TIANSHU) {
			return Config.booksuit_215
		}
	}
}