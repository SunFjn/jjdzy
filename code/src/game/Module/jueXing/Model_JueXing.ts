class Model_JueXing extends BaseModel {
	public static jueXingData: { [type: number]: Vo_JueXing[] } = {};
	public static sortJueXing(a: Vo_JueXing, b: Vo_JueXing) {
		if (a.quality == b.quality) {
			return a.id - b.id;
		} else {
			return b.quality - a.quality;
		}
	}
	/** 1武将2宝物3神剑4异宝5天书6兵法7战甲8神将*/
	public static checkIconNotice(type) {
		let ret = false;
		if (Model_JueXing.jueXingData[type]) {
			Model_JueXing.getJueXingData(Model_JueXing.panelIDArr[type]);
			let arr = Model_JueXing.jueXingData[type];
			for (let i = 0; i < arr.length; i++) {
				ret = Model_JueXing.checkGridNotice(arr[i]);
				if (ret) break;
			}
		} else {
			ret = GGlobal.reddot.checkCondition(UIConst.JUEXING, type - 1);
		}
		return ret;
	}

	public static checkGridNotice(vo: Vo_JueXing) {
		let ret = false;
		for (let i = 0; i < 3; i++) {
			ret = Model_JueXing.checkJueXingBtNotice(vo, i);
			if (ret) break;
		}
		if (!ret) {
			let index: number = 0;
			let suitcfg = Config.jxzl_271[vo.quality * 100 + vo.suitLv];
			if (suitcfg.lv != suitcfg.max) {
				if (vo.skilllv0 % 1000 >= suitcfg.max) {
					index++;
				}
				if (vo.skilllv1 % 1000 >= suitcfg.max) {
					index++;
				}
				if (vo.skilllv2 % 1000 >= suitcfg.max) {
					index++;
				}
			}
			ret = index >= 3;
		}
		return ret;
	}

	public static checkJueXingBtNotice(vo: Vo_JueXing, index: number) {
		let suitcfg = Config.jxzl_271[vo.quality * 100 + vo.suitLv];
		let cfg = Config.jx_271[vo["skilllv" + index]];
		if (cfg.next > 0) {
			let count = Model_Bag.getItemCount(vo.costId);
			return count >= cfg.consume && vo["skilllv" + index] % 1000 < suitcfg.max;
		}
		return false;
	}

	public static getJueXingData(panelID: number) {
		let arr = Model_JueXing.jueXingData[Model_JueXing.panelIDArr.indexOf(panelID)];
		if (!arr) {
			arr = [];
		}
		switch (panelID) {
			case UIConst.BAOWU:
				for (let i = 0; i < Model_BaoWu.baowuArr.length; i++) {
					let vo = Model_BaoWu.baowuArr[i];
					if (vo.starLv >= vo.starMax) {
						let index = 0;
						for (let j = 0; j < arr.length; j++) {
							if (arr[j].id == vo.id) {
								index++;
								break;
							}
						}
						if (index == 0) {
							let juexingVo = Vo_JueXing.create(vo.id, vo.quality, vo.icon, vo.name, vo.costArr[0][1], vo.starLv, vo.imageID, 0);
							juexingVo.skilllv0 = vo.quality * 10000 + 1000;
							juexingVo.skilllv1 = vo.quality * 10000 + 2000;
							juexingVo.skilllv2 = vo.quality * 10000 + 3000;
							juexingVo.suitLv = 0;
							juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
							arr.push(juexingVo);
						}
					}
				}
				break;
			case UIConst.TIANSHU:
				for (let i = 0; i < GGlobal.modeltianshu.data.length; i++) {
					let vo = GGlobal.modeltianshu.data[i];
					if (vo.star >= vo.starMax) {
						let index = 0;
						for (let j = 0; j < arr.length; j++) {
							if (arr[j].id == vo.id) {
								index++;
								break;
							}
						}
						if (index == 0) {
							let juexingVo = Vo_JueXing.create(vo.id, vo.pin, vo.icon, vo.name, JSON.parse(vo.item)[0][1], vo.star, vo.pic, 0);
							juexingVo.skilllv0 = vo.pin * 10000 + 1000;
							juexingVo.skilllv1 = vo.pin * 10000 + 2000;
							juexingVo.skilllv2 = vo.pin * 10000 + 3000;
							juexingVo.suitLv = 0;
							juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
							arr.push(juexingVo);
						}
					}
				}
				break;
			case UIConst.SHEN_JIAN:
				for (let i = 0; i < Model_ShenJian.shenjianArr.length; i++) {
					let vo = Model_ShenJian.shenjianArr[i];
					if (vo.starLv >= vo.starMax) {
						let index = 0;
						for (let j = 0; j < arr.length; j++) {
							if (arr[j].id == vo.id) {
								index++;
								break;
							}
						}
						if (index == 0) {
							let juexingVo = Vo_JueXing.create(vo.id, vo.quality, vo.icon, vo.name, vo.costArr[0][1], vo.starLv, vo.imageID, vo.cfg.tptx);
							juexingVo.skilllv0 = vo.quality * 10000 + 1000;
							juexingVo.skilllv1 = vo.quality * 10000 + 2000;
							juexingVo.skilllv2 = vo.quality * 10000 + 3000;
							juexingVo.suitLv = 0;
							juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
							arr.push(juexingVo);
						}
					}
				}
				break;
			case UIConst.YIBAO:
				for (let i = 0; i < Model_YiBao.YBArr.length; i++) {
					let vo = Model_YiBao.YBArr[i];
					if (vo.starLv >= vo.starMax) {
						let index = 0;
						for (let j = 0; j < arr.length; j++) {
							if (arr[j].id == vo.id) {
								index++;
								break;
							}
						}
						if (index == 0) {
							let juexingVo = Vo_JueXing.create(vo.id, vo.quality, vo.icon, vo.name, vo.costArr[0][1], vo.starLv, vo.imageID, vo.cfg.tptx);
							juexingVo.skilllv0 = vo.quality * 10000 + 1000;
							juexingVo.skilllv1 = vo.quality * 10000 + 2000;
							juexingVo.skilllv2 = vo.quality * 10000 + 3000;
							juexingVo.suitLv = 0;
							juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
							arr.push(juexingVo);
						}
					}
				}
				break;
			case UIConst.WU_JIANG:
				for (let i = 0; i < Model_WuJiang.wuJiangArr.length; i++) {
					let vo = Model_WuJiang.wuJiangArr[i];
					if (Model_WuJiang.wuJiangStar[vo.type] >= vo.star) {
						let index = 0;
						for (let j = 0; j < arr.length; j++) {
							if (arr[j].id == vo.type) {
								index++;
								break;
							}
						}
						if (index == 0) {
							let juexingVo = Vo_JueXing.create(vo.type, vo.pinzhi, vo.head, vo.name, JSON.parse(vo.activation)[0][1], vo.star, vo.pifu, 0);
							juexingVo.skilllv0 = vo.pinzhi * 10000 + 1000;
							juexingVo.skilllv1 = vo.pinzhi * 10000 + 2000;
							juexingVo.skilllv2 = vo.pinzhi * 10000 + 3000;
							juexingVo.suitLv = 0;
							juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
							juexingVo.skills = vo.skills;
							arr.push(juexingVo);
						}
					}
				}
				break;
			case UIConst.BINGFA:
				for (let i = 0; i < GGlobal.modelBingFa.data.length; i++) {
					let vo = GGlobal.modelBingFa.data[i];
					if (vo.star >= vo.starMax) {
						let index = 0;
						for (let j = 0; j < arr.length; j++) {
							if (arr[j].id == vo.id) {
								index++;
								break;
							}
						}
						if (index == 0) {
							let juexingVo = Vo_JueXing.create(vo.id, vo.pin, vo.icon, vo.name, vo.item[0][1], vo.star, vo.pic, vo.lib.tptx);
							juexingVo.skilllv0 = vo.pin * 10000 + 1000;
							juexingVo.skilllv1 = vo.pin * 10000 + 2000;
							juexingVo.skilllv2 = vo.pin * 10000 + 3000;
							juexingVo.suitLv = 0;
							juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
							arr.push(juexingVo);
						}
					}
				}
				break;
			case UIConst.ZHAN_JIA:
				for (let i = 0; i < Model_ZhanJia.zhanJiaArr.length; i++) {
					let vo = Model_ZhanJia.zhanJiaArr[i];
					if (Model_ZhanJia.zhanjiaStar[vo.id] >= vo.star) {
						let index = 0;
						for (let j = 0; j < arr.length; j++) {
							if (arr[j].id == vo.id) {
								index++;
								break;
							}
						}
						if (index == 0) {
							let juexingVo = Vo_JueXing.create(vo.id, vo.pinzhi, vo.icon, vo.name, JSON.parse(vo.item)[0][1], vo.star, vo.pic, vo.tptx);
							juexingVo.skilllv0 = vo.pinzhi * 10000 + 1000;
							juexingVo.skilllv1 = vo.pinzhi * 10000 + 2000;
							juexingVo.skilllv2 = vo.pinzhi * 10000 + 3000;
							juexingVo.suitLv = 0;
							juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
							arr.push(juexingVo);
						}
					}
				}
				break;
			case UIConst.GOD_WUJIANG:
				for (let i = 0; i < ModelGodWuJiang.wuJiangArr.length; i++) {
					let vo = ModelGodWuJiang.wuJiangArr[i];
					if (ModelGodWuJiang.getXiuLianLevel(vo.type) >= ModelGodWuJiang.maxXiulianLevel) {
						let index = 0;
						for (let j = 0; j < arr.length; j++) {
							if (arr[j].id == vo.type) {
								index++;
								break;
							}
						}
						if (index == 0) {
							let juexingVo = Vo_JueXing.create(vo.type, vo.pinzhi, vo.head, vo.name, JSON.parse(vo.activation)[0][1], vo.star, vo.pifu, 0);
							juexingVo.skilllv0 = vo.pinzhi * 10000 + 1000;
							juexingVo.skilllv1 = vo.pinzhi * 10000 + 2000;
							juexingVo.skilllv2 = vo.pinzhi * 10000 + 3000;
							juexingVo.suitLv = 0;
							juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
							juexingVo.skills = vo.skills;
							arr.push(juexingVo);
						}
					}
				}
				break;
		}
		Model_JueXing.jueXingData[Model_JueXing.panelIDArr.indexOf(panelID)] = arr;
	}

	public static checkOpenJuexing(panelID: number) {
		switch (panelID) {
			case UIConst.BAOWU:
				for (let i = 0; i < Model_BaoWu.baowuArr.length; i++) {
					let vo = Model_BaoWu.baowuArr[i];
					if (vo.starLv >= vo.starMax) return true;
				}
				break;
			case UIConst.TIANSHU:
				for (let i = 0; i < GGlobal.modeltianshu.data.length; i++) {
					let vo = GGlobal.modeltianshu.data[i];
					if (vo.star >= vo.starMax) return true;
				}
				break;
			case UIConst.SHEN_JIAN:
				for (let i = 0; i < Model_ShenJian.shenjianArr.length; i++) {
					let vo = Model_ShenJian.shenjianArr[i];
					if (vo.starLv >= vo.starMax) return true;
				}
				break;
			case UIConst.YIBAO:
				for (let i = 0; i < Model_YiBao.YBArr.length; i++) {
					let vo = Model_YiBao.YBArr[i];
					if (vo.starLv >= vo.starMax) return true;
				}
				break;
			case UIConst.WU_JIANG:
				for (let i = 0; i < Model_WuJiang.wuJiangArr.length; i++) {
					let vo = Model_WuJiang.wuJiangArr[i];
					if (Model_WuJiang.wuJiangStar[vo.type] >= vo.star) return true;

				}
				break;
			case UIConst.BINGFA:
				for (let i = 0; i < GGlobal.modelBingFa.data.length; i++) {
					let vo = GGlobal.modelBingFa.data[i];
					if (vo.star >= vo.starMax) return true;
				}
				break;
			case UIConst.ZHAN_JIA:
				for (let i = 0; i < Model_ZhanJia.zhanJiaArr.length; i++) {
					let vo = Model_ZhanJia.zhanJiaArr[i];
					if (Model_ZhanJia.zhanjiaStar[vo.id] >= vo.star) return true;
				}
				break;
			case UIConst.GOD_WUJIANG:
				return ModelGodWuJiang.isOpenJueXing();
		}
		return false;
	}

	/**819	CG获取7系统的觉醒情况1武将2宝物3神剑4异宝5天书6兵法7战甲 B:类型 */
	public CG_OPEN_JUEXING_819(type) {
		let ba = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(819, ba);
	}

	/**821	CG 升级某个系统的某个觉醒技能/或觉醒之力 B:1武将2宝物3神剑4异宝5天书6兵法7战甲I::对应武将/宝物/神剑序号I:1-4:4表示提升觉醒之力 */
	public CG_UPGRADE_JUEXING_821(type, id, index) {
		let ba = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(id);
		ba.writeInt(index);
		this.sendSocket(821, ba);
	}
	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let self = this;
		self.socket = wsm;
		wsm.regHand(820, self.GC_OPEN_JUEXING_820, self);
		wsm.regHand(822, self.GC_UPGRADE_JUEXING_822, self);
	}

	/**822	GC 升级觉醒返回 B:升级结果B:分类I:宝物/武将/战甲idI:技能id/ 觉醒之力（1-4）I:等级 */
	public GC_UPGRADE_JUEXING_822(self: Model_JueXing, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let type = data.readByte();
			let value = data.readInt();
			let key = data.readInt();
			let level = data.readInt();
			let vo: Vo_JueXing;
			if (!Model_JueXing.jueXingData[type]) {
				Model_JueXing.jueXingData[type] = [];
				vo = new Vo_JueXing();
				Model_JueXing.jueXingData[type].push(vo);
			} else {
				for (let i = 0; i < Model_JueXing.jueXingData[type].length; i++) {
					if (value == Model_JueXing.jueXingData[type][i].id) {
						vo = Model_JueXing.jueXingData[type][i]
						break;
					}
				}
			}
			if (key != 4) {
				vo["skilllv" + (key - 1)] = vo.quality * 10000 + 1000 * key + level;
			} else {
				vo.suitLv = level;
				GGlobal.control.notify(Enum_MsgType.JUEXING_SUIT_UPDATE, vo);
			}
			GGlobal.control.notify(UIConst.JUEXING);
		}
	}

	public static panelIDArr = [0, UIConst.WU_JIANG, UIConst.BAOWU, UIConst.SHEN_JIAN, UIConst.YIBAO, UIConst.TIANSHU, UIConst.BINGFA, UIConst.ZHAN_JIA, UIConst.GOD_WUJIANG]
	/**820	GC B:1武将2宝物3神剑4异宝5天书6兵法7战甲[I:对应武将/宝物/神剑序号I:觉醒技能1等级I:觉醒技能2等级I:觉醒技能3等级I:觉醒之力等阶]arr */
	public GC_OPEN_JUEXING_820(self: Model_JueXing, data: BaseBytes) {
		let type = data.readByte();
		Model_JueXing.getJueXingData(Model_JueXing.panelIDArr[type]);
		let arr = Model_JueXing.jueXingData[type];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let id = data.readInt();
			let skilllv0 = data.readInt();
			let skilllv1 = data.readInt();
			let skilllv2 = data.readInt();
			let suitLv = data.readInt();
			for (let j = 0; j < arr.length; j++) {
				if (id == arr[j].id) {
					arr[j].skilllv0 = skilllv0 + arr[j].quality * 10000 + 1000;
					arr[j].skilllv1 = skilllv1 + arr[j].quality * 10000 + 2000;
					arr[j].skilllv2 = skilllv2 + arr[j].quality * 10000 + 3000;
					arr[j].suitLv = suitLv;
				}
			}
		}
		GGlobal.control.notify(UIConst.JUEXING);
	}
}