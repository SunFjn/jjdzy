class Model_Skill extends BaseModel {
	/**1.普攻2.技能3.怒气技能 */
	public static TYPE1: number = 1;
	/**1.普攻2.技能3.怒气技能 */
	public static TYPE2: number = 2;
	/**1.普攻2.技能3.怒气技能 */
	public static TYPE3: number = 3;
	/**宝物技能 */
	public static TYPE4: number = 4;
	/**天书技能 */
	public static TYPE5: number = 5;
	/**冲刺技能 */
	public static TYPE6: number = 6;
	/**天书灭世 */
	public static TYPE7: number = 7;
	/**奇策曝气技能 */
	public static TYPE10: number = 10;
	/**奇策曝气技能ID */
	public static bqSkillID: number = 150001;

	public static getSkillByPos(pos): Vo_Skill {
		let skillList = Model_player.voMine.skillList;
		let len = skillList.length;
		let vo: Vo_Skill;
		for (let i = 0; i < len; i++) {
			vo = skillList[i]
			if (vo.type == Model_Skill.TYPE2 && (vo.id % 100) - 4 == pos) {
				return vo;
			}
		}
	}

	public static getSkillLv() {
		let level = 0;
		let skillList = Model_player.voMine.skillList;
		let len = skillList.length;
		let vo: Vo_Skill;
		for (let i = 0; i < len; i++) {
			vo = skillList[i]
			if (vo.type == Model_Skill.TYPE2) {
				level += vo.level;
			}
		}
		return level;
	}

	public static checkGodSkillTabNotice(): boolean {
		let len: number = Model_player.voMine.skillList.length;
		let isCheck: boolean = false;
		let vo: Vo_Skill;
		for (let i = 0; i < len; i++) {
			if (Model_player.voMine.skillList[i].type == Model_Skill.TYPE3) {
				vo = Model_player.voMine.skillList[i];
				break;
			}
		}
		if (!vo) return;
		for (let i = 0; i < 3; i++) {
			let skillId: number = vo.zhenYanArr[i];
			let cfg = Config.godskill_210[skillId];
			if (cfg.next > 0) {
				let costArr: Array<any> = JSON.parse(cfg.consume);
				let count = Model_Bag.getItemCount(costArr[0][1])
				if (count >= costArr[0][2]) {
					isCheck = true;
					break;
				}
			}
		}
		return isCheck;
	}

	public static checkSkillTabNotice(): boolean {
		let arr: Array<Vo_Skill> = Model_player.voMine.skillList;
		let len: number = arr.length;
		let ret: boolean = false;
		for (let i = 0; i < len; i++) {
			let vo: Vo_Skill = arr[i];
			if (vo.type == Model_Skill.TYPE2 && vo.level > 0 && vo.level < Model_LunHui.realLv) {
				var cost: number = Config.xiaohao_210[vo.level].xiaohao;
				if (cost <= 0) {
				} else {
					if (Model_player.voMine.tongbi >= cost) {//铜币足够
						ret = true;
						break;
					} else {
					}
				}
			}

		}
		return ret;
	}
	/**621 升级技能 I:技能id  */
	public CG_UPGRADE_SKILL(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(621, ba);
	}

	/**623 升级阵眼 I:阵眼id  */
	public CG_UPGRADE_GODSKILL_ZHENYAN(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(623, ba);
	}

	/**625  一键升级技能等级    */
	public CG_KEYUPGRADE_SKILL(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(625, ba);
	}

	/**627	CG 使用技能（宝物1宝物2天书怒气） B:使用技能I:系统id */
	public CG_USE_SKILL(type, id) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(id);
		this.sendSocket(627, ba, true);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(622, this.GC_UPGRADE_SKILL, this);
		wsm.regHand(624, this.GC_UPGRADE_GODSKILL_ZHENYAN, this);
		wsm.regHand(626, this.GC_KEYUPGRADE_SKILL, this);
		wsm.regHand(630, this.GC_SKILL_OPEN, this);
	}

	/**630 触发开启技能 B:技能位置I:技能idS:技能等级  */
	public GC_SKILL_OPEN(self: Model_Skill, data: BaseBytes): void {
		let pos = data.readByte();
		let skillId = data.readInt();
		let level = data.readShort();
		if (!Model_player.voMine) return;
		let skillList = Model_player.voMine.skillList;
		let len = skillList.length;
		let vo: Vo_Skill;
		for (let i = 0; i < len; i++) {
			if (skillList[i].id == skillId) {
				vo = skillList[i];
				break;
			}
		}
		vo.level = level;
		vo.updatePower();
		GGlobal.control.notify(Enum_MsgType.SKILL_UPDATE);
	}

	/**626 一键升级技能 B:升级结果 0失败，1成功[I:技能idS:技能等级]技能数据  */
	public GC_KEYUPGRADE_SKILL(self: Model_Skill, data: BaseBytes) {
		var result = data.readByte();
		if (result == 1) {
			let len: number = data.readShort();
			for (let i = 0; i < len; i++) {
				let skillID: number = data.readInt();
				let level: number = data.readShort();
				for (let j = 0; j < Model_player.voMine.skillList.length; j++) {
					if (Model_player.voMine.skillList[j].id == skillID) {
						Model_player.voMine.skillList[j].level = level;
						Model_player.voMine.skillList[j].updatePower();
						break;
					}
				}
			}
			GGlobal.control.notify(Enum_MsgType.SKILL_UPDATE);
		}
	}

	/**624 阵眼升级结果 B:0失败，1成功I:成功：新阵眼id，失败：错误码I:旧阵眼id  */
	public GC_UPGRADE_GODSKILL_ZHENYAN(self: Model_Skill, data: BaseBytes) {
		var result = data.readByte();
		if (result == 1) {
			let zhenyanId: number = data.readInt();
			let id: number = data.readInt();
			let arr: Array<Vo_Skill> = Model_player.voMine.skillList;
			let len = arr.length;
			let vo: Vo_Skill;
			for (let i = 0; i < len; i++) {
				if (arr[i].type == Model_Skill.TYPE3) {
					vo = arr[i];
					vo.zhenYanArr[Math.floor(zhenyanId / 1000) - 1] = zhenyanId;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.GODSKILL_UPDATE, zhenyanId);
		}
	}

	/**622 升级技能结果 B:0失败，1成功I:成功：技能id，失败：错误码  */
	public GC_UPGRADE_SKILL(self: Model_Skill, data: BaseBytes) {
		var result: number = data.readByte();
		if (result == 1) {
			let skillID: number = data.readInt();
			let len = Model_player.voMine.skillList.length;
			for (let i = 0; i < len; i++) {
				if (skillID == Model_player.voMine.skillList[i].id) {
					Model_player.voMine.skillList[i].level++;
					Model_player.voMine.skillList[i].updatePower();
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.SKILL_UPDATE);
		}
	}
}