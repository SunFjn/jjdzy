class Model_ShaoZhu extends BaseModel {
	public constructor() {
		super();
	}

	public static upStarRewardVo: any;
	/**材料到兵法的映射 */
	private static matToShaoZhu: { [key: number]: Vo_ShaoZhu } = {};
	/**通过激活材料(升星材料)判断使用该材料的兵法是否已经满星 */
	public static isFullByMat(vo: VoItem) {
		if (Model_ShaoZhu.matToShaoZhu[vo.id]) {
			const data = Model_ShaoZhu.matToShaoZhu[vo.id];
			return data.starcfg.next == 0;
		} else {
			const datas = GGlobal.modelShaoZhu.shaoZhuArr;
			for (let i = 0; datas && i < datas.length; i++) {
				const data = datas[i];
				const id = Number(JSON.parse(data.starcfg.conmuse)[0][1]);
				Model_ShaoZhu.matToShaoZhu[id] = data;
				if (id == vo.id) {
					return data.starcfg.next == 0;
				}
			}
		}
		return false;
	}

	public checkSkillNotice() {
		let self = this;
		let ret = false;
		for (let i = 0; i < self.shaoZhuArr.length; i++) {
			let vo = self.shaoZhuArr[i];
			ret = self.checkOneSkillNotice(vo);
			if (ret) break;
		}
		return ret;
	}

	public checkOneSkillNotice(vo: Vo_ShaoZhu) {
		let ret = false;
		// if (vo.starLv > 0) {
		// 	let cfg = Config.sonskillup_267[vo.skillLv];
		// 	let arr = ["", "", "lv", "lan", "zi", "cheng", "hong"];
		// 	if (cfg.next > 0) {
		// 		let costArr = JSON.parse(cfg[arr[vo.cfg.pz]]);
		// 		ret = Model_Bag.getItemCount(costArr[0][1]) >= costArr[0][2] && vo.starLv >= Config.sonskillup_267[cfg.next].star
		// 	}

		// 	if (!ret) {
		// 		let costArr1 = JSON.parse(Config.xtcs_004[5801].other);
		// 		let costArr2 = JSON.parse(Config.xtcs_004[5802].other);
		// 		let itemVo1 = VoItem.create(costArr1[0][1]);
		// 		let itemVo2 = VoItem.create(costArr2[0][1]);
		// 		let count1 = Model_Bag.getItemCount(costArr1[0][1]);
		// 		let count2 = Model_Bag.getItemCount(costArr2[0][1]);

		// 		let skillArr: any[] = JSON.parse(Config.xtcs_004[5804].other);
		// 		for (let key in vo.skillData) {
		// 			let isMax: boolean = false;
		// 			if (skillArr[0].indexOf(vo.skillData[key].skillID) != -1) isMax = true;
		// 			ret = (count1 >= costArr1[0][2] || count2 >= costArr2[0][2]) && !isMax;
		// 			if (ret) break;
		// 		}
		// 	}
		// }
		return ret;
	}


	public checkQinMiNotice() {
		let self = this;
		let ret = false;
		for (let i = 0; i < self.shaoZhuArr.length; i++) {
			let vo = self.shaoZhuArr[i];
			ret = self.checkOneQinMiNotice(vo);
			if (ret) break;
		}
		return ret;
	}

	public checkOneQinMiNotice(vo: Vo_ShaoZhu) {
		let bagExp = 0;
		if (vo.starLv > 0 && vo.qinMiCfg.exp != 0) {
			let arr = JSON.parse(vo.cfg.qm);
			for (let i = 0; i < arr.length; i++) {
				bagExp += Model_Bag.getItemCount(arr[i][0]) * arr[i][1];
			}
			return bagExp >= vo.qinMiCfg.exp - vo.exp;
		}
		return false;
	}

	public checkStarNotice() {
		let self = this;
		let ret = false;
		for (let i = 0; i < self.shaoZhuArr.length; i++) {
			let vo = self.shaoZhuArr[i];
			ret = self.checkOneStarNotice(vo);
			if (!ret && vo.starLv > 0 && Model_player.voMine.shaozhuID <= 0) ret = true;
			if (ret) break;
		}
		return ret;
	}

	public checkOneStarNotice(vo: Vo_ShaoZhu) {
		let ret = false;
		if (vo.starcfg.conmuse != "0" && vo.starcfg.next > 0) {
			let costArr = JSON.parse(vo.starcfg.conmuse);
			let count = Model_Bag.getItemCount(costArr[0][1])
			ret = count >= costArr[0][2];
		}
		if (!ret) ret = this.checkFashionNotice(vo);
		return ret;
	}

	public checkFashionNotice(vo: Vo_ShaoZhu) {
		let ret = false;
		if (vo.starLv > 0) {
			for (let i = 0; i < vo.bodyArr.length; i++) {
				let fashionVo = vo.bodyArr[i];
				ret = fashionVo.starLv < fashionVo.max && Model_Bag.getItemCount(fashionVo.conmuse[0][1]) >= fashionVo.conmuse[0][2];
				if (ret) break;
			}
		}
		return ret;
	}

	public shaoZhuArr: Vo_ShaoZhu[] = [];
	public sortHandle(a: Vo_ShaoZhu, b: Vo_ShaoZhu) {
		return a.cfg.id - b.cfg.id;
	}

	/**5101	CG 打开少主ui 某分页 */
	public CG_OPEN_SHAOZHU_5101() {
		this.sendSocket(5101, new BaseBytes())
	}

	/**5103	CG 激活少主 I:少主index*/
	public CG_JIHUO_SHAOZHU_5103(shaozhuID) {
		let ba = new BaseBytes();
		ba.writeInt(shaozhuID);
		this.sendSocket(5103, ba);
	}

	/**5105	CG 升星少主 I:少主索引*/
	public CG_UPSTAR_SHAOZHU_5105(shaozhuID) {
		let ba = new BaseBytes();
		ba.writeInt(shaozhuID);
		this.sendSocket(5105, ba);
	}

	/**5107	CG 激活/升阶时装 I:时装id*/
	public CG_UPFASHION_SHAOZHU_5107(fahionID: number) {
		let ba = new BaseBytes();
		ba.writeInt(fahionID);
		this.sendSocket(5107, ba);
	}

	/**5109	CG 出站小主 I:0没小主出站 >1小主id*/
	public CG_BATTLE_SHAOZHU_5109(shaozhuID: number) {
		let ba = new BaseBytes();
		ba.writeInt(shaozhuID);
		this.sendSocket(5109, ba);
	}

	/**5111	CG 某个小主穿上时装 I:小主typeI:小主时装id*/
	public CG_EQUIP_FASHION_SHAOZHU_5111(shaozhuID: number, fashionID: number) {
		let ba = new BaseBytes();
		ba.writeInt(shaozhuID);
		ba.writeInt(fashionID);
		this.sendSocket(5111, ba);
	}

	/**5113	CG 增加亲密度 I:小主序号*/
	public CG_ADDQINMI_SHAOZHU_5113(shaozhuID: number) {
		let ba = new BaseBytes();
		ba.writeInt(shaozhuID);
		this.sendSocket(5113, ba);
	}

	/**5115	CG 升级小主的主动技能 I:小主id*/
	public CG_UPSKILL_SHAOZHU_5115(shaozhuID: number) {
		let ba = new BaseBytes();
		ba.writeInt(shaozhuID);
		this.sendSocket(5115, ba);
	}

	/**5117	CG洗练小主被动技能 I:小主序号B:技能孔B:洗练方式0 1*/
	public CG_XILIAN_SKILL_SHAOZHU_5117(shaozhuID: number, pos, type) {
		let ba = new BaseBytes();
		ba.writeInt(shaozhuID);
		ba.writeByte(pos);
		ba.writeByte(type);
		this.sendSocket(5117, ba);
	}

	/**5119	CG 替换被动技能 I:小主序号B:小主被动位置（0-4）B:小主被动替换位置*/
	public CG_TIHUAN_SKILL_SHAOZHU_5119(shaozhuID: number, pos0, pos1) {
		let ba = new BaseBytes();
		ba.writeInt(shaozhuID);
		ba.writeByte(pos0);
		ba.writeByte(pos1);
		this.sendSocket(5119, ba);
	}

	/**5121	CG 获取所有少主升星奖励领取情况 */
	public CG_GET_STAR_STATE() {
		let ba = new BaseBytes();
		this.sendSocket(5121, ba);
	}

	public CG_GET_STAR_REWARD(id) {
		let ba = new BaseBytes();
		ba.writeInt(id)
		this.sendSocket(5123, ba);
	}



	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let self = this;
		self.socket = wsm;
		wsm.regHand(5102, self.GC_OPEN_SHAOZHU_5102, self);
		wsm.regHand(5104, self.GC_JIHUO_SHAOZHU_5104, self);
		wsm.regHand(5106, self.GC_UPSTAR_SHAOZHU_5106, self);
		wsm.regHand(5108, self.GC_UPFASHION_SHAOZHU_5108, self);
		wsm.regHand(5110, self.GC_BATTLE_SHAOZHU_5110, self);
		wsm.regHand(5112, self.GC_EQUIP_FASHION_SHAOZHU_5112, self);
		wsm.regHand(5114, self.GC_ADDQINMI_SHAOZHU_5114, self);
		wsm.regHand(5116, self.GC_UPSKILL_SHAOZHU_5116, self);
		wsm.regHand(5118, self.GC_XILIAN_SKILL_SHAOZHU_5118, self);
		wsm.regHand(5120, self.GC_TIHUAN_SKILL_SHAOZHU_5120, self);
		wsm.regHand(5122, self.GC_GET_STAR_STATE, self);
		wsm.regHand(5124, self.GC_GET_STAR_REWARD, self);
	}

	/**5120	GC 替换技能 B:0成功 1失败I:小主序号B:小主被动技能位置I:被动位置上技能id */
	public GC_TIHUAN_SKILL_SHAOZHU_5120(self: Model_ShaoZhu, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let shaozhuID = data.readInt();
			let pos = data.readByte();
			let skillID = data.readInt();
			for (let i = 0; i < self.shaoZhuArr.length; i++) {
				if (self.shaoZhuArr[i].shaozhuID == shaozhuID) {
					self.shaoZhuArr[i].skillData[pos].initSkillCfg(skillID);
					self.shaoZhuArr[i].skillData[pos].alternativeSkillArr = [];
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.SHAOZHU);
		}
	}

	/**5118 GC 洗练技能返回 B:0成功1失败I:少主序号B:技能位置[I:技能id] */
	public GC_XILIAN_SKILL_SHAOZHU_5118(self: Model_ShaoZhu, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let shaozhuID = data.readInt();
			let pos = data.readByte();
			let arr = [];
			for (let i = 0, len = data.readShort(); i < len; i++) {
				let skillID = data.readInt();
				arr.push(skillID);
			}
			for (let i = 0; i < self.shaoZhuArr.length; i++) {
				if (self.shaoZhuArr[i].shaozhuID == shaozhuID) {
					const skillVo: ShaoZhuSkill = self.shaoZhuArr[i].skillData[pos] || (self.shaoZhuArr[i].skillData[pos] = new ShaoZhuSkill());
					skillVo.alternativeSkillArr = arr;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.SHAOZHU);
		}
	}

	/**5116	GC 升级某个小主的主动技能 B:0成功 1失败I:小主序号I:小主主动技能等级 */
	public GC_UPSKILL_SHAOZHU_5116(self: Model_ShaoZhu, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let shaozhuID = data.readInt();
			let level = data.readInt();
			for (let i = 0; i < self.shaoZhuArr.length; i++) {
				let vo = self.shaoZhuArr[i]
				if (vo.shaozhuID == shaozhuID) {
					vo.skillLv = level;
					break;
				}
			}
			let voMine = Model_player.voMine
			if (voMine.shaozhuID == shaozhuID) {
				voMine.shaozhuSkillLv = level;
				Model_player.voMine.setShaoZhuID(shaozhuID);
			}
			GGlobal.control.notify(Enum_MsgType.SHAOZHU);
		}
	}

	/**5114	GC 提升亲密度返回 B:0成功 1失败I:小主序号I:小主亲密度等级I:小主亲密度经验 */
	public GC_ADDQINMI_SHAOZHU_5114(self: Model_ShaoZhu, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let shaozhuID = data.readInt();
			let level = data.readInt();
			let exp = data.readInt();
			for (let i = 0; i < self.shaoZhuArr.length; i++) {
				let vo = self.shaoZhuArr[i]
				if (vo.shaozhuID == shaozhuID) {
					if (vo.level != level) {
						GGlobal.control.notify(Enum_MsgType.SHAOZHU_QINMI);
					}
					if (Math.floor(vo.qinMiCfg.jie / 100) != Math.floor(Config.sonqm_267[level].jie / 100)) {
						let num = vo.qinMiCfg.skill;
						vo.initQinMiCfg(level);
						vo.exp = exp;
						GGlobal.layerMgr.open(UIConst.SHAOZHU_QINMI_REWARD, { vo: vo, isShow: num != vo.qinMiCfg.skill });
					} else {
						vo.initQinMiCfg(level);
						vo.exp = exp;
					}
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.SHAOZHU);
		}
	}

	/**5112	GC 穿脱时装 B:0成功 1失败I:小主序号I:小主时装id */
	public GC_EQUIP_FASHION_SHAOZHU_5112(self: Model_ShaoZhu, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let shaozhuID = data.readInt();
			let fashionID = data.readInt();
			for (let i = 0; i < self.shaoZhuArr.length; i++) {
				let vo = self.shaoZhuArr[i]
				if (vo.cfg.id == shaozhuID) {
					vo.bodyID = fashionID;
					break;
				}
			}
			let voMine = Model_player.voMine
			if (voMine.shaozhuID == shaozhuID) {
				voMine.shaozhuFashion = fashionID;
				Model_player.voMine.setShaoZhuID(shaozhuID);
			}
			GGlobal.control.notify(Enum_MsgType.SHAOZHU);
		}
	}

	/**5110	GC 设置出站返回 B:0成功 1失败I:战场小主id */
	public GC_BATTLE_SHAOZHU_5110(self: Model_ShaoZhu, data: BaseBytes) {
		let result = data.readByte();
		let shaozhuID = data.readInt();
		if (result == 0) {
			let voMine = Model_player.voMine;
			for (let i = 0; i < self.shaoZhuArr.length; i++) {
				let vo = self.shaoZhuArr[i]
				if (vo.cfg.id == shaozhuID) {
					voMine.shaozhuSkillLv = vo.skillLv;
					voMine.shaozhuFashion = vo.bodyID;
					voMine.shaozhuStar = vo.starLv;
					break;
				}
			}
			voMine.setShaoZhuID(shaozhuID);
			GGlobal.control.notify(Enum_MsgType.SHAOZHU);
		}
	}

	/**5108	GC 激活时装返回 B:0成功 1失败I:小主时装idI:小主时装等级 */
	public GC_UPFASHION_SHAOZHU_5108(self: Model_ShaoZhu, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let fashionID = data.readInt();
			let level = data.readInt();
			for (let i = 0; i < self.shaoZhuArr.length; i++) {
				let vo = self.shaoZhuArr[i]
				if (vo.cfg.id == Config.sonshow_267[fashionID].son) {
					for (let j = 0; j < vo.bodyArr.length; j++) {
						if (vo.bodyArr[j].id == fashionID) {
							vo.bodyArr[j].starLv = level;
							break;
						}
					}
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.SHAOZHU);
		}
	}

	/**5106	GC 升星返回 B:0成功1失败I:少主索引I:少主星级 */
	public GC_UPSTAR_SHAOZHU_5106(self: Model_ShaoZhu, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let shaozhuID = data.readInt();
			let starID = data.readInt();
			for (let i = 0; i < self.shaoZhuArr.length; i++) {
				if (self.shaoZhuArr[i].cfg.id == shaozhuID) {
					self.shaoZhuArr[i].initStarCfg(starID);
					break;
				}
			}
			let voMine = Model_player.voMine
			if (voMine.shaozhuID == shaozhuID) {
				voMine.shaozhuStar = starID % 100;
				Model_player.voMine.setShaoZhuID(shaozhuID);
			}
			GGlobal.control.notify(Enum_MsgType.SHAOZHU);
		}
	}

	/**5104	GC 激活少主返回 B:0成功 1失败I:少主索引 */
	public GC_JIHUO_SHAOZHU_5104(self: Model_ShaoZhu, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let shaozhuID = data.readInt();
			for (let i = 0; i < self.shaoZhuArr.length; i++) {
				let vo = self.shaoZhuArr[i];
				if (vo.shaozhuID == shaozhuID) {
					vo.initStarCfg(vo.starcfg.next);
					vo.initQinMiCfg(1);
					vo.skillLv = 1;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.SHAOZHU);
		}
	}

	public static hasData: boolean = false;
	//public static shaozhuRewardData : any; 
	/**5102	GC 打开ui返回 I:当前出站少主[I:少主indexI:少主星级I:少主亲密度经验I:少主亲密度等级I:当前选择皮肤idI:主动技能等级[I:当前携带被动技能idB:技能位置
	 * [I:备选技能id]][I:皮肤idI:皮肤等级]]*/
	public GC_OPEN_SHAOZHU_5102(self: Model_ShaoZhu, data: BaseBytes) {
		Model_ShaoZhu.hasData = true;
		self.initShaoZhu();
		Model_player.voMine.setShaoZhuID(data.readInt());
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let shaozhuID = data.readInt();
			for (let n = 0; n < self.shaoZhuArr.length; n++) {
				let vo = self.shaoZhuArr[n];
				if (vo.shaozhuID == shaozhuID) {
					vo.initStarCfg(data.readInt());
					vo.exp = data.readInt();
					vo.initQinMiCfg(data.readInt());
					vo.bodyID = data.readInt();
					vo.skillLv = data.readInt();

					for (let j = 0, len1 = data.readShort(); j < len1; j++) {
						let skillID = data.readInt();
						let pos = data.readByte();
						let skillArr = [];
						for (let ii = 0, len2 = data.readShort(); ii < len2; ii++) {
							skillArr.push(data.readInt());
						}
						const skillVo: ShaoZhuSkill = vo.skillData[pos] || (vo.skillData[pos] = new ShaoZhuSkill());
						skillVo.initSkillCfg(skillID);
						skillVo.pos = pos;
						skillVo.alternativeSkillArr = skillArr;
					}

					for (let j = 0, len1 = data.readShort(); j < len1; j++) {
						let bodyID = data.readInt();
						let bodyStarLv = data.readInt();
						for (let ii = 0; ii < vo.bodyArr.length; ii++) {
							if (bodyID == vo.bodyArr[ii].id) {
								vo.bodyArr[ii].starLv = bodyStarLv;
								break;
							}
						}
					}
					break;
				}
			}
		}
		self.shaoZhuArr.sort(self.sortHandle);
		GGlobal.control.notify(Enum_MsgType.SHAOZHU);
	}

	/**5122	少主升星奖励领取情况 [I:序号idB:0不可领取 1可以领取 2已经领取]已经领取的少主升星奖励 */
	public GC_GET_STAR_STATE(self: Model_ShaoZhu, data: BaseBytes) {
		let length = data.readShort();
		let vo: any[] = [];
		for (let i = 0; i < length; i++) {
			let id = data.readInt();
			let state = data.readByte();
			vo.push({ id: id, state: state });
		}
		self.starRedState(vo);
		Model_ShaoZhu.upStarRewardVo = { vo };
		GGlobal.control.notify(Enum_MsgType.SHAOZHUSTAR, { vo });
	}

	public starRedState(vo) {
		vo.sort(function (a, b) { return a.id < b.id ? -1 : 1 });
		GGlobal.reddot.setCondition(UIConst.SHAOZHU, 123 + 1, false);
		GGlobal.reddot.setCondition(UIConst.SHAOZHU, 123 + 2, false);
		GGlobal.reddot.setCondition(UIConst.SHAOZHU, 123 + 3, false);
		for (let i = 0; i < vo.length; i++) {
			let tvo = vo[i];
			let type = (tvo.id / 1000) >> 0;
			let bool = tvo.state == 1;
			if (bool) GGlobal.reddot.setCondition(UIConst.SHAOZHU, 123 + type, true);
		}

		GGlobal.reddot.notify(Enum_MsgType.SHAOZHU);
	}

	/**5124	领取升星奖励返回 B:0领取成功 1领取失败I:升星序号B:奖励状态 */
	public GC_GET_STAR_REWARD(self: Model_ShaoZhu, data: BaseBytes) {
		let result = data.readByte();
		let index = data.readInt();
		let state = data.readByte();
		if (result == 0) {
			GGlobal.control.notify(Enum_MsgType.SHAOZHUSTARUPDATE, { index: index, state: state });
		} else {
			ViewCommonWarn.text("领取失败");
		}
	}
	public initShaoZhu() {
		if (this.shaoZhuArr.length <= 0) {
			for (let key in Config.son_267) {
				let vo = Vo_ShaoZhu.create(parseInt(key));
				this.shaoZhuArr.push(vo);
			}
		}
	}
}