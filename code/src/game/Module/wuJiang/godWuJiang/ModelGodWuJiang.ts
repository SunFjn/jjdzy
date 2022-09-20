class ModelGodWuJiang extends BaseModel {

	data: { id: { tfLv: number, xiulianLv: number } } | any = {};

	static getGodDataByID = (id): { tfLv: number, xiulianLv: number } => {
		if (!GGlobal.modelGodWuJiang.data[id]) {
			return { tfLv: 1, xiulianLv: 8000 }
		}
		return GGlobal.modelGodWuJiang.data[id];
	}

	/**传入职业获取天赋等级*/
	static getTianFuLevel(job) {
		if (!GGlobal.modelGodWuJiang.data[job]) {
			return 1;
		}
		return GGlobal.modelGodWuJiang.data[job].tfLv;
	}

	/**传入职业获取天赋等级*/
	static getXiuLianLevel(job) {
		if (!GGlobal.modelGodWuJiang.data[job]) {
			return 8000;
		}
		return GGlobal.modelGodWuJiang.data[job].xiulianLv;
	}

	/**传入职业 获取神将星级*/
	static wuJiangStar(job) {
		if (!GGlobal.modelGodWuJiang.data[job]) {
			return 0;
		}
		return (((GGlobal.modelGodWuJiang.data[job].xiulianLv % 1000) / 10) >> 0) + 1;
	}

	static getXiuLianStr(id) {
		id = id % 1000;
		return ((id / 10) >> 0) + "重" + id % 10 + "阶";
	}

	//将修炼重数转为武将星级
	static conversionToStar(id) {
		id = id % 1000;
		return ((id / 10) + 1) >> 0;
	}

	//是否已激活
	static getWuJiangIsActivation(type) {
		if (GGlobal.modelGodWuJiang.data[type])
			return 1;
		return 0;
	}

	//检测是否可激活
	static checkJiHuoNotice = (type): boolean => {
		if (GGlobal.modelGodWuJiang.data[type]) {
			return false;
		}
		let vo = Config.hero_211[type];
		let totalStar = Model_WuJiang.getQuilityTotalStar(7) + Model_WuJiang.getQuilityTotalStar(6);
		let _star_OK = totalStar >= vo.jh;
		let itemCFG = JSON.parse(vo.activation);
		let itemId = itemCFG[0][1];
		let itemName = ConfigHelp.getItemColorName(itemId);
		let itemNum = Model_Bag.getItemCount(itemId);
		let _item_OK = itemNum >= itemCFG[0][2];
		return _star_OK && _item_OK;
	}

	//检测是否可修炼
	static checkXiulianNotice = (type): boolean => {
		let data = GGlobal.modelGodWuJiang.data;
		if (!data || !data[type]) {
			return false;
		}
		let lv = data[type].xiulianLv;
		let cfg = Config.godheroxl_289[lv];
		if (cfg.next == 0) {
			return false;
		}
		let item;
		let needCount;
		let hero = Config.hero_211[type];
		if (cfg.conmuse == "0") {//正在突破
			item = JSON.parse(hero.activation);
			needCount = cfg.tp;
		} else {
			item = JSON.parse(cfg.conmuse);
			needCount = item[0][2];
		}
		let itemid = item[0][1];
		let hasCount = Model_Bag.getItemCount(itemid);
		return hasCount >= needCount;
	}

	private static _wuJiangArr: any;
	public static get wuJiangArr() {
		if (ModelGodWuJiang._wuJiangArr == null) {
			ModelGodWuJiang.initWuJiang();
		}
		return ModelGodWuJiang._wuJiangArr
	}

	//是否已经开放觉醒功能
	public static isOpenJueXing() {
		let data = ModelGodWuJiang.wuJiangArr;
		for (let i = 0; i < data.length; i++) {
			let level = ModelGodWuJiang.getXiuLianLevel(data[i].type);
			if (level == ModelGodWuJiang.maxXiulianLevel) {
				return true;
			}
		}
		return false;
	}

	public static initWuJiang(): void {
		ModelGodWuJiang._wuJiangArr = [];
		for (let keys in Config.hero_211) {
			let v = Config.hero_211[keys]
			if (v.pinzhi < 8) {
				continue;//不显示普通武将
			}
			ModelGodWuJiang._wuJiangArr.push(v)
		}
	}


	//最高修炼等级
	static _maxXiulianLevel = 0;
	static get maxXiulianLevel() {
		if (ModelGodWuJiang._maxXiulianLevel == 0) {
			let cfg = Config.godheroxl_289;
			for (let i in cfg) {
				if(cfg[i].lv>ModelGodWuJiang._maxXiulianLevel){
					ModelGodWuJiang._maxXiulianLevel=cfg[i].lv;
				}
			}
		}
		return ModelGodWuJiang._maxXiulianLevel;
	}

	checkMainBtnNotice() {
		let r = GGlobal.reddot;
		let self = this;
		let data = self.data;
		let wujiangarr = ModelGodWuJiang.wuJiangArr;

		//是否有可激活的
		let ret = false;
		for (let i in wujiangarr) {
			ret = ModelGodWuJiang.checkJiHuoNotice(wujiangarr[i].type);
			if (ret) {
				break;
			}
		}
		r.setCondition(UIConst.GOD_WUJIANG, 0, ret);

		//是否有可修炼的
		ret = false;
		for (let i in data) {
			ret = ModelGodWuJiang.checkXiulianNotice(i);
			if (ret) {
				break;
			}
		}
		r.setCondition(UIConst.GOD_WUJIANG, 1, ret);

		//是否有可升级天赋的
		ret = false;
		for (let i in data) {
			let id = i;
			let xiulian = data[i].xiulianLv;
			let xiuliancfg = Config.godheroxl_289[xiulian];
			let tianfu = data[i].tfLv;
			let max = xiuliancfg.max;
			if (tianfu >= max) {
				continue;
			}
			let item = Config.godherotf_289[tianfu];
			ret = ConfigHelp.checkEnough(item.conmuse, false);
			if (ret) {
				break;
			}
		}
		r.setCondition(UIConst.GOD_WUJIANG, 2, ret);
		r.notify(UIConst.GOD_WUJIANG);
	}

	listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(678, this.GC_WuJiang_getShenJiang_678, this);
		mgr.regHand(680, this.GC_WuJiang_shenJiangJiHuo_680, this);
		mgr.regHand(682, this.GC_WuJiang_upShenJiangLv_682, this);
		mgr.regHand(684, this.GC_WuJiang_upShenJiangTf_684, this);
	}

	/**677  获取神将信息 */
	CG_WuJiang_getShenJiang_677 = () => {
		var bates = this.getBytes();
		this.sendSocket(677, bates);
	}

	/**678 [I-I-I] 神将信息返回 [I:神将类型I:神将修炼等级I:神将天赋等级]shenjiangs*/
	GC_WuJiang_getShenJiang_678 = (self: ModelGodWuJiang, data: BaseBytes) => {
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let arg1 = data.readInt();
			let arg2 = data.readInt();
			let arg3 = data.readInt();
			self.data[arg1] = { tfLv: arg3, xiulianLv: arg2 };
		}
		self.checkMainBtnNotice();
		GGlobal.control.notify(UIConst.WU_JIANG);
	}

	/**679 B 神将激活 B:神将编号type*/
	CG_WuJiang_shenJiangJiHuo_679 = (arg1) => {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(679, bates);
	}

	/**680 B-B 神将激活返回 B:0.失败 1.成功stateB:神将编号type*/
	GC_WuJiang_shenJiangJiHuo_680 = (self: ModelGodWuJiang, data: BaseBytes) => {
		let arg1 = data.readByte();
		if (arg1 == 1) {
			ViewCommonWarn.text("激活成功");
			let arg2 = data.readByte();
			self.data[arg2] = { tfLv: 1, xiulianLv: 8000 };
			if (arg2 == Model_player.voMine.job) {
				for (let i = 0; i < Model_player.voMine.skillList.length; i++) {
					Model_player.voMine.skillList[i].starLv = ModelGodWuJiang.wuJiangStar(arg2);
					Model_player.voMine.skillList[i].updatePower();
				}
			}
			self.checkMainBtnNotice();
			GGlobal.control.notify(UIConst.WU_JIANG);
		} else {
			ViewCommonWarn.text("激活失败");
		}
	}

	/**681 B 突破/升级神将等级 B:神将编号type*/
	CG_WuJiang_upShenJiangLv_681 = (arg1) => {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(681, bates);
	}

	/**682 B-B-I 突破/升级神将等级返回 B:1.成功 0.失败stateB:神将编号typeI:修炼等级level*/
	GC_WuJiang_upShenJiangLv_682 = (self: ModelGodWuJiang, data: BaseBytes) => {
		let ret = data.readByte();
		if (ret == 1) {
			let arg2 = data.readByte();
			let level = data.readInt();
			self.data[arg2].xiulianLv = level;
			if (arg2 == Model_player.voMine.job) {
				for (let i = 0; i < Model_player.voMine.skillList.length; i++) {
					Model_player.voMine.skillList[i].starLv = ModelGodWuJiang.wuJiangStar(arg2);
					Model_player.voMine.skillList[i].updatePower();
				}
			}
			self.checkMainBtnNotice();
			GGlobal.control.notify(UIConst.WU_JIANG);
		} else {
			ViewCommonWarn.text("升级失败");
		}
	}

	/**683 B 升级神将天赋 B:神将编号type*/
	CG_WuJiang_upShenJiangTf_683 = (arg1) => {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(683, bates);
	}

	/**684 B-B-I 升级神将天赋返回 B:1.成功 0.失败stateB:神将编号typeI:天赋等级tfLevel*/
	GC_WuJiang_upShenJiangTf_684 = (self: ModelGodWuJiang, data: BaseBytes) => {
		let arg1 = data.readByte();
		let arg2 = data.readByte();
		let level = data.readInt();
		if (arg1 == 1) {
			self.data[arg2].tfLv = level;
			self.checkMainBtnNotice();
			GGlobal.control.notify(UIConst.WU_JIANG);
			ViewCommonWarn.text("升级成功");
		} else {
			ViewCommonWarn.text("升级失败");
		}
	}
}