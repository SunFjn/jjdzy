class Model_YiShouLu extends BaseModel {
	public constructor() {
		super();
	}

	/**升品红点 */
	public static checkTFColorNotice() {
		let ret = false;
		for (let i = 0; i < Model_YiShouLu.dataArr.length; i++) {
			let vo = Model_YiShouLu.dataArr[i];
			if (vo.cfg.tianfu == 1 && vo.lvUpId % 1000 != 0) {
				ret = Model_YiShouLu.checkTFColorYiShouNotice(vo);
				if (ret) break;
			}
		}
		return ret;
	}

	/**升品异兽红点 */
	public static checkTFColorYiShouNotice(vo: Vo_YSLData) {
		let ret = false;
		for (let i = 0; i < vo.equipArr.length; i++) {
			ret = Model_YiShouLu.checkTFColorGridNotice(vo, vo.equipArr[i]);
			if (ret) break;
		}
		if (!ret) {
			let cfg = Config.ystf_752[vo.skillLv];
			if (cfg.xj > 0) {
				let index = 0;
				let tiaoJianArr = JSON.parse(cfg.tj);
				for (let i = 0; i < tiaoJianArr.length; i++) {
					let equipVo = vo.equipArr[Math.floor(tiaoJianArr[i][0] % 10) - 1];
					if (equipVo.level >= tiaoJianArr[i][1]) {
						index++;
					}
				}
				ret = index >= vo.equipArr.length;
			}
		}
		return ret;
	}

	/**升品装备红点 */
	public static checkTFColorGridNotice(vo: Vo_YSLData, equipVo: Vo_YiShouEquip) {
		let ret = false;
		let curcfg = equipVo.colorcfg;
		if (curcfg.xyp > 0 && equipVo.levelcfg.power != 0) {
			let costArr = ConfigHelp.makeItemListArr(JSON.parse(curcfg.xh));
			let count = Model_Bag.getItemCount(costArr[0].id);
			ret = count >= costArr[0].count;
		}
		return ret;
	}

	public static checkTFLevelNotice() {
		let ret = false;
		for (let i = 0; i < Model_YiShouLu.dataArr.length; i++) {
			let vo = Model_YiShouLu.dataArr[i];
			if (vo.cfg.tianfu == 1 && vo.lvUpId % 1000 != 0) {
				ret = Model_YiShouLu.checkTFLvYiShouNotice(vo);
				if (ret) break;
			}
		}
		return ret;
	}

	public static checkTFLvYiShouNotice(vo: Vo_YSLData) {
		let ret = false;
		for (let i = 0; i < vo.equipArr.length; i++) {
			ret = Model_YiShouLu.checkTFLvGridNotice(vo, vo.equipArr[i]);
			if (ret) break;
		}
		if (!ret) {
			let cfg = Config.ystf_752[vo.skillLv];
			if (cfg.xj > 0) {
				let index = 0;
				let tiaoJianArr = JSON.parse(cfg.tj);
				for (let i = 0; i < tiaoJianArr.length; i++) {
					let equipVo = vo.equipArr[Math.floor(tiaoJianArr[i][0] % 10) - 1];
					if (equipVo.level >= tiaoJianArr[i][1]) {
						index++;
					}
				}
				ret = index >= vo.equipArr.length;
			}
		}
		return ret;
	}

	public static checkTFLvGridNotice(vo: Vo_YSLData, equipVo: Vo_YiShouEquip) {
		let ret = false;
		let curcfg = equipVo.levelcfg;
		if (vo.lvUpId % 1000 != 0 && curcfg.xj > 0) {
			let nextcfg = Config.ystfsj_752[curcfg.xj];
			if (nextcfg.tj <= vo.skillLv % 1000) {
				let itemVo: IGridImpl;
				if (curcfg.jinjie) {
					itemVo = VoItem.create(equipVo.cfg.daoju);
					itemVo.count = JSON.parse(curcfg.xiaohao)[0][2];
				} else {
					itemVo = ConfigHelp.makeItemListArr(JSON.parse(curcfg.xiaohao))[0]
				}
				let count = Model_Bag.getItemCount(itemVo.id);
				ret = count >= itemVo.count;
			}
		}
		return ret;
	}

	/**
	 * 某个异兽的红点 
	 */
	public static checkYiShouNotice(index: number): boolean {
		let bol: boolean = false;
		let yslData: Vo_YSLData = Model_YiShouLu.dataArr[index];
		let costArr;
		let count: number;
		let curLvCfg: Iyssj_752 = Config.yssj_752[yslData.lvUpId];
		let nextLvCfg: Iyssj_752 = Config.yssj_752[curLvCfg.next];
		if (yslData.lvUpId == (100000 * (index + 1)))//未激活
		{
			costArr = JSON.parse(curLvCfg.jj);
			count = Model_Bag.getItemCount(costArr[0][1]);
			if (count >= costArr[0][2]) {
				return true;
			}
		} else if (nextLvCfg) {
			if (yslData.exp >= curLvCfg.exp && curLvCfg.jj != 0)//进阶
			{
				costArr = JSON.parse(curLvCfg.jj);
				count = Model_Bag.getItemCount(costArr[0][1]);
				if (count >= costArr[0][2]) {
					return true;
				}
			} else {//已激活
				count = Model_Bag.getItemCount(410092);
				let needCount: number = (curLvCfg.exp - yslData.exp) / 10;
				if (count >= needCount) {
					return true;
				}
			}
		}
		return bol;
	}


	/**8401	升品 I:异兽idI:天赋装备id */
	public CG_YISHOUTF_EQUIP_UPCOLOR(yishouID, equipID) {
		let ba = new BaseBytes();
		ba.writeInt(yishouID);
		ba.writeInt(equipID);
		this.sendSocket(8401, ba);
	}

	/**8402	升品结果返回 B:结果：0：失败，1：成功I:失败：（），成功：异兽idI:装备idI:品质id */
	public GC_YISHOUTF_EQUIP_UPCOLOR(self: Model_YiShouLu, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let yishouID = data.readInt();
			let equipID = data.readInt();
			let color = data.readInt();
			let tfData = Model_YiShouLu.dataArr;
			for (let i = 0; i < tfData.length; i++) {
				if (yishouID == tfData[i].ysId) {
					let equipArr = tfData[i].equipArr
					for (let j = 0; j < equipArr.length; j++) {
						if (equipArr[j].cfg.id == equipID) {
							equipArr[j].setColor(color);
							break;
						}
					}
					break;
				}
			}
			GGlobal.control.notify(UIConst.YISHOULU_TF);
		}
	}

	/**8399	升级天赋装备 I:异兽idI:装备id */
	public CG_YISHOUTF_EQUIP_UPLV(yishouID, equipID) {
		let ba = new BaseBytes();
		ba.writeInt(yishouID);
		ba.writeInt(equipID);
		this.sendSocket(8399, ba);
	}

	/**8400	升级天赋装备返回 B:结果：0：失败，1：成功I:失败：（1：道具不足，2：已达最大等级），成功：异兽idI:装备idI:装备等级 */
	public GC_YISHOUTF_EQUIP_UPLV(self: Model_YiShouLu, data: BaseBytes) {
		let result = data.readByte();
		let yishouID = data.readInt();
		if (result == 1) {
			let equipID = data.readInt();
			let level = data.readInt();
			let tfData = Model_YiShouLu.dataArr;
			for (let i = 0; i < tfData.length; i++) {
				if (yishouID == tfData[i].ysId) {
					let equipArr = tfData[i].equipArr
					for (let j = 0; j < equipArr.length; j++) {
						if (equipArr[j].cfg.id == equipID) {
							equipArr[j].setLevel(level);
							break;
						}
					}
					break;
				}
			}
			GGlobal.control.notify(UIConst.YISHOULU_TF);
		} else if (result == 0) {
			switch (yishouID) {
				case 1:
					ViewCommonWarn.text("道具不足");
					break;
				case 2:
					ViewCommonWarn.text("已达最大等级");
					break;
				case 3:
					ViewCommonWarn.text("天赋技能等级未满足条件");
					break;
			}
		}
	}

	/**8397	升级天赋技能 I:异兽id */
	public CG_YISHOUTF_UPSKILLLV(yishouID) {
		let ba = new BaseBytes();
		ba.writeInt(yishouID);
		this.sendSocket(8397, ba);
	}

	/**8398	升级结果返回 B:结果：0：失败，1：成功I:失败：（1：未满足条件），成功：异兽idI:天赋技能id */
	public GC_YISHOUTF_UPSKILLLV(self: Model_YiShouLu, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let ysID = data.readInt();
			let skillID = data.readInt();
			let tfData = Model_YiShouLu.dataArr;
			for (let i = 0; i < tfData.length; i++) {
				if (ysID == tfData[i].ysId) {
					tfData[i].skillLv = skillID;
					break;
				}
			}
			GGlobal.control.notify(UIConst.YISHOULU_TF);
		}
	}

	/**8395	请求异兽天赋信息 */
	public CG_OPENYISHOW_TF() {
		this.sendSocket(8395, new BaseBytes())
	}

	public static hasTFData = false;
	/**8396	返回异兽天赋界面信息 [I:异兽idI:天赋技能id[I:天赋装备idI:装备等级I:装备品质]]异兽天赋数据 */
	public GC_OPENYISHOW_TF(self: Model_YiShouLu, data: BaseBytes) {
		Model_YiShouLu.hasTFData = true;
		let tfData = Model_YiShouLu.dataArr;
		if (tfData.length <= 0) return;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let yiShouID = data.readInt();
			let skillID = data.readInt();
			let len1 = data.readShort();
			let vo: Vo_YSLData;
			for (let j = 0; j < tfData.length; j++) {
				if (yiShouID == tfData[j].ysId) {
					vo = tfData[j];
					break;
				}
			}
			vo.skillLv = skillID;
			for (let n = 0; n < len1; n++) {
				let equipID = data.readInt();
				let equipLv = data.readInt();
				let color = data.readInt();
				for (let m = 0; m < vo.equipArr.length; m++) {
					if (equipID == vo.equipArr[m].cfg.id) {
						vo.equipArr[m].setLevel(equipLv);
						vo.equipArr[m].setColor(color);
						break;
					}
				}
			}
		}
		GGlobal.control.notify(UIConst.YISHOULU_TF);
	}

	/**8391	CG 打开界面 */
	public CG_OPEN_UI() {
		this.sendSocket(8391, new BaseBytes())
	}

	public static id: number = 0;
	public static index: number = 0;
	/**8393	CG 激活或升级 B:异兽idB:type：0：激活，1：升级，2：一键升级，进阶 */
	public CG_ACTIVEORUPLV(id: number, type: number, index: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(id);
		ba.writeByte(type);
		this.sendSocket(8393, ba);
		Model_YiShouLu.id = id;
		Model_YiShouLu.index = index;
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let self = this;
		self.socket = wsm;
		wsm.regHand(8392, self.GC_OPEN_UI, self);
		wsm.regHand(8394, self.GC_ACTIVEORUPLV, self);

		//异兽天赋
		wsm.regHand(8396, self.GC_OPENYISHOW_TF, self);
		wsm.regHand(8398, self.GC_YISHOUTF_UPSKILLLV, self);
		wsm.regHand(8400, self.GC_YISHOUTF_EQUIP_UPLV, self);
		wsm.regHand(8402, self.GC_YISHOUTF_EQUIP_UPCOLOR, self);
	}

	public static dataArr: Array<Vo_YSLData> = [];//数据数组
	/**8392	GC 	打开界面返回 [B:异兽idI:异兽录升级表等级lvI:当前经验I:异兽录套装表等级lvI:阶数]异兽录列表 */
	public GC_OPEN_UI(self: Model_YiShouLu, data: BaseBytes) {
		Model_YiShouLu.dataArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let yslData: Vo_YSLData = new Vo_YSLData();
			yslData.initDate(data);
			Model_YiShouLu.dataArr.push(yslData);
		}
		self.redState();
		GGlobal.control.notify(UIConst.YISHOULU);
	}

	/**8394	GC 	激活或升级返回 B:状态：1：成功，2：已达最高级，3：道具不足I:异兽录升级表等级lvI:当前经验I:异兽录套装表等级lvI:阶数 */
	public GC_ACTIVEORUPLV(self: Model_YiShouLu, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 1) {
			let isSend = false;
			for (let i = 0; i < Model_YiShouLu.dataArr.length; i++) {
				let yslData = Model_YiShouLu.dataArr[i];
				if (yslData.ysId == Model_YiShouLu.id) {
					if (yslData.lvUpId % 1000 == 0) {
						isSend = true;
					}
					yslData.lvUpId = data.readInt();
					yslData.exp = data.readInt();
					yslData.suitId = data.readInt();
					yslData.jie = data.readInt();
					self.redState();
					GGlobal.control.notify(UIConst.YISHOULU, yslData);
					break;
				}
			}
			if (isSend) GGlobal.control.notify(UIConst.YISHOULU_TF);
		}
	}

	/**红点状态 */
	public redState() {
		let bol: boolean = false;
		for (var i = 0; i < 8; i++) {
			bol = Model_YiShouLu.checkYiShouNotice(i);
			if (bol) {
				break;
			}
		}
		GGlobal.reddot.setCondition(UIConst.YISHOULU, 0, bol);
	}
}