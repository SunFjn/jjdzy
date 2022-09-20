class Model_battle extends BaseModel {

	public static battleId: number = 0;
	public static leftPlayerArr: Array<any> = [];
	public static rightPlayerArr: Array<any> = [];
	public static systemID: number = 0;
	public static hurtArr: Array<any> = [];
	public static hurtRoleArr = [];
	/**少主攻击受伤列表 */
	public static hurtRoleArr1 = [];
	public static battleVo: Vo_battle;
	public static battleTimeDic: { [id: number]: number } = {};
	public enterScene(sysID: number): void {
		let sceneType = 0;
		switch (sysID) {
			case UIConst.FHLY:
				FengHuoLYCtr.enterBattle();
				break;
			case UIConst.WENDINGTX:
				WenDingTXManager.enterBattle();
				break;
			case UIConst.KFWZ:
				//跨服王者不走公共的SERVERBATTLE
				GGlobal.mapscene.enterScene(SceneCtrl.KFWZ);
				return;
			default:
				break;
		}
		GGlobal.mapscene.enterScene(SceneCtrl.SERVERBATTLE);
	}

	/**3861	使用技能 I:技能id */
	public CG_PLAYER_USESKILL(skillID) {
		let ba = new BaseBytes();
		ba.writeInt(skillID);
		this.sendSocket(3861, ba, true);
	}

	/**3865	技能击中 I:技能id[L:玩家id]技能攻击范围内玩家集合 */
	public CG_BATTLE_BEATENEMY(skillID, roles: Array<SceneCharRole>) {
		let ba = new BaseBytes();
		ba.writeInt(skillID);
		ba.writeShort(roles.length);
		for (let i = 0; i < roles.length; i++) {
			ba.writeLong(roles[i].id);
		}
		this.sendSocket(3865, ba, true);
	}

	/**3871 退出 */
	public CG_EXIT_BATTLE() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(3871, ba, true);
	}

	public listenServ(wsm: WebSocketMgr) {
		const s = this;
		s.socket = wsm;
		wsm.regHand(3860, s.GC_BATTLE_DATA, s);
		wsm.regHand(3862, s.GC_BATTLE_USESKILL, s);
		wsm.regHand(3864, s.GC_BATTLE_UPDATEROLE_STATE, s);
		wsm.regHand(3866, s.GC_UPDATE_BATTLE_BUFFSTATE, s);
		wsm.regHand(3868, s.GC_BATTLE_OVER, s);
		wsm.regHand(3870, s.GC_UPDATE_ROLEHP, s);
		wsm.regHand(3872, s.GC_EXIT_BATTLE, s);
		wsm.regHand(3874, s.GC_BATTLE_NEXT_ROUND, s);
	}

	/**3872	玩家离开战斗 L:离开的玩家id */
	public GC_EXIT_BATTLE(self: Model_battle, data: BaseBytes) {
		let roleID = data.readLong();
		let role = GGlobal.mapscene.getUnit(roleID) as SceneCharRole;
		if (role) {
			role.takeMaxHurt();
			ViewCommonWarn.text(role.name + "退出了战斗");
		}
	}

	/**3870	更新玩家血量 [L:玩家idL:当前血量]玩家血量 */
	public GC_UPDATE_ROLEHP(self: Model_battle, data: BaseBytes) {
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let roleID = data.readLong();
			let curHp = data.readLong();
			let role = GGlobal.mapscene.getUnit(roleID) as SceneCharRole;
			if (role) {
				console.log("玩家名称" + role.name + "玩家当前气血+" + curHp);
				role.curhp = curHp;
				if (role.curhp <= 0) {
					role.takeMaxHurt();
				}
			}
		}
	}

	/**3868	战斗结束 L:战斗唯一idB:战斗结果：0：失败，1：胜利[B:类型I:道具idI:数量B:是否额外]奖励数据 */
	public GC_BATTLE_OVER(self: Model_battle, data: BaseBytes) {
		let battleId = data.readLong();
		let result = data.readByte();
		let moduleId = data.readInt();
		let len = data.readShort();
		let arr = [];
		if (result == 1) {
			for (let i = 0; i < len; i++) {
				var type = data.readByte();
				var id = data.readInt();
				var count = data.readInt();
				let extra = data.readByte();
				var vo: IGridImpl;
				if (type == Enum_Attr.EQUIP) {
					vo = VoEquip.create(id);
				} else if (type == Enum_Attr.ITEM) {
					vo = VoItem.create(id);
				} else {//货币
					vo = Vo_Currency.create(type);
				}
				vo.count = count;
				vo.extra = extra;
				arr.push(vo);
			}
		}

		switch (moduleId) {
			case UIConst.WENDINGTX:
				WenDingTXManager.leavelBattleScene();
				break;
			case UIConst.BOSS_BATTLEFIELD_CROSS:
			case UIConst.BOSS_BATTLEFIELD_LOCAL:
				BossZCManager.battleEnd(result, arr);
				break;
			case UIConst.LIANGCAO://do nothing
				if (result == 1) {
					ViewCommonWin.show(arr, 5000, self, "确定", null, null, true);
				} else {
					ViewBattleFault.show(5000, self, "退出", function () { }, function () { }, function () { });
				}
				break;
			case UIConst.KFWZ:
				if (result == 1) {
					//胜利
					GGlobal.modelKfwz.showResultPanel(0);
				}
				else {
					GGlobal.modelKfwz.showResultPanel(1);
				}
				break;
			// case UIConst.LHFB:
			// 	GGlobal.modelLhfb.showResultPanel(result, arr);
			// 	break;
			default:
				if (result == 1) {
					ViewCommonWin.show(arr, 5000);
				} else {
					ViewCommonFail.show(5000);
				}
				break;

		}
		Model_battle.battleId = 0;
	}

	public static buffDic: { [id: number]: { buffID: number, state: number }[] } = {};
	/**3866	刷新buff状态 [L:玩家id[I:buffIdB:状态（1：生效，2：失效）]]玩家buff数据 */
	public GC_UPDATE_BATTLE_BUFFSTATE(self: Model_battle, data: BaseBytes) {
		let roleArr: { [id: number]: { buffID: number, state: number }[] } = {};
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let roleID = data.readLong();
			if (!roleArr[roleID]) roleArr[roleID] = [];
			for (let j = 0, len1 = data.readShort(); j < len1; j++) {
				let buffid = data.readInt();
				let state = data.readByte();
				roleArr[roleID].push({ buffID: buffid, state: state });
			}
		}
		Model_battle.buffDic = roleArr;
		self.updateBuff(roleArr)
	}

	public updateBuff(roleData: { [id: number]: { buffID: number, state: number }[] }) {
		let self = this;
		for (let key in roleData) {
			let role: SceneCharRole = GGlobal.mapscene.getUnit(key);
			if (role) {
				for (let i = 0; i < roleData[key].length; i++) {
					if (roleData[key][i].state == 1) {
						role.addServerBuff(roleData[key][i].buffID);
					} else {
						role.clearServerBuff(roleData[key][i].buffID);
					}
				}
				delete Model_battle.buffDic[Number(key)];
			}
		}
	}

	/**3862	同步技能释放 L:玩家idI:技能id */
	public GC_BATTLE_USESKILL(self: Model_battle, data: BaseBytes): void {
		let roleID = data.readLong();
		let skillID = data.readInt();
		let role = GGlobal.mapscene.getUnit(roleID) as SceneCharRole;
		if (role) {
			role.waitSkillID = skillID;
		}
	}

	/**3864	同步技能释放 L:放技能的玩家I:技能id[L:玩家idL:变化血量（负的为扣除，正的为增加）B:是否暴击，1：是，0：否[I:buffid]]玩家信息*/
	public GC_BATTLE_UPDATEROLE_STATE(self: Model_battle, data: BaseBytes): void {
		let roleID = data.readLong();
		let skillID = data.readInt();
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let playerID = data.readLong();
			let hp = data.readLong();
			let isCrit = data.readByte();
			let buffArr: Array<any> = [];
			for (let j = 0, len1 = data.readShort(); j < len1; j++) {
				let buffID = data.readInt();
			}
			Model_battle.hurtArr.push([playerID, hp, isCrit, buffArr]);
		}
		if (Model_player.voMine.id != roleID) {
			let role = GGlobal.mapscene.getUnit(roleID) as SceneCharRole;
			if (role) {
				role.endSkill();
				role.waitSkillID = skillID;
			}
		}
	}

	/**3860	通知前端战斗信息战斗开始 L:战斗唯一id[L:阵营1玩家idL:当前气血L:最大气血I:宝物1I:宝物1星级I:宝物2I:宝物2星级I:天书I:天书星级I:神剑]阵营1玩家集合
	 * [L:阵营2玩家idL:当前气血L:最大气血I:宝物1I:宝物1星级I:宝物2I:宝物2星级I:天书I:天书星级I:神剑]阵营2玩家集合I:功能系统id */
	public GC_BATTLE_DATA(self: Model_battle, data: BaseBytes): void {
		Model_battle.battleId = data.readLong();
		Model_battle.leftPlayerArr = [];
		Model_battle.rightPlayerArr = [];
		let arr1 = [];
		let arr2 = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let playerID: number = data.readLong();
			let playerVo: Vo_Player;
			if (playerID == Model_player.voMine.id) {
				playerVo = Model_player.voMine;
			} else {
				playerVo = GGlobal.modelPlayer.playerDetailDic[playerID];
			}
			if (playerVo) {
				playerVo.currentHp = data.readLong();
				playerVo.hp = data.readLong();
				console.log("round1================1", playerVo.currentHp, playerVo.hp);
				console.log(playerVo.name, playerVo.id);

				playerVo.bwID1 = data.readInt();
				playerVo.bwStar1 = data.readInt();
				playerVo.bwID2 = data.readInt();
				playerVo.bwStar2 = data.readInt();
				playerVo.tsID = data.readInt();
				playerVo.tsStar = data.readInt();
				playerVo.shenJianID = data.readInt();
			}
			arr1.push(playerVo);
		}
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let playerID: number = data.readLong();
			let playerVo: Vo_Player
			if (playerID == Model_player.voMine.id) {
				playerVo = Model_player.voMine;
			} else {
				playerVo = GGlobal.modelPlayer.playerDetailDic[playerID];
			}
			if (playerVo) {
				playerVo.currentHp = data.readLong();
				playerVo.hp = data.readLong();
				console.log("round1================2", playerVo.currentHp, playerVo.hp);
				console.log(playerVo.name, playerVo.id);
				playerVo.bwID1 = data.readInt();
				playerVo.bwStar1 = data.readInt();
				playerVo.bwID2 = data.readInt();
				playerVo.bwStar2 = data.readInt();
				playerVo.tsID = data.readInt();
				playerVo.tsStar = data.readInt();
				playerVo.shenJianID = data.readInt();
			}
			arr2.push(playerVo);
		}
		Model_battle.leftPlayerArr = arr1;
		Model_battle.rightPlayerArr = arr2;
		Model_battle.systemID = data.readInt();
		self.enterScene(Model_battle.systemID);

		CollectManager.serverEnd();
	}

	/**3874 L-[L-L-L-I-I-I-I-I-I-I]-[L-L-L-I-I-I-I-I-I-I]-I 开始下一轮战斗 L:战斗唯一idbattleUid[L:阵营1玩家idL:当前气血L:最大气血I:宝物1I:宝物1星级I:宝物2I:宝物2星级I:天书I:天书星级I:神剑]阵营1玩家集合camp1[L:阵营2玩家idL:当前气血L:最大气血I:宝物1I:宝物1星级I:宝物2I:宝物2星级I:天书I:天书星级I:神剑]阵营2玩家集合camp2I:功能系统idsysId*/
	public GC_BATTLE_NEXT_ROUND(self: Model_battle, data: BaseBytes): void {
		let arg1 = data.readLong();
		Model_battle.battleId = arg1;
		let t_list1 = [];
		let t_list2 = [];
		{
			let len = data.readShort();
			for (let i = 0; i < len; i++) {
				let arg2 = data.readLong();
				let arg3 = data.readLong();
				let arg4 = data.readLong();
				let arg5 = data.readInt();
				let arg6 = data.readInt();
				let arg7 = data.readInt();
				let arg8 = data.readInt();
				let arg9 = data.readInt();
				let arg10 = data.readInt();
				let arg11 = data.readInt();

				let playerID = arg2;
				let playerVo: Vo_Player;
				if (playerID == Model_player.voMine.id) {
					playerVo = Model_player.voMine;
				}
				else {
					playerVo = GGlobal.modelPlayer.playerDetailDic[playerID];
				}
				if (playerVo) {
					playerVo.currentHp = arg3;
					playerVo.hp = arg4;
					console.log("round2================1", playerVo.currentHp, playerVo.hp);
					console.log(playerVo.name, playerVo.id);
					playerVo.bwID1 = arg5;
					playerVo.bwStar1 = arg6;
					playerVo.bwID2 = arg7;
					playerVo.bwStar2 = arg8;
					playerVo.tsID = arg9;
					playerVo.tsStar = arg10;
					playerVo.shenJianID = arg11;

					t_list1.push(playerVo);
				}
			}
		}
		{
			let len = data.readShort();
			for (let i = 0; i < len; i++) {
				let arg12 = data.readLong();
				let arg13 = data.readLong();
				let arg14 = data.readLong();
				let arg15 = data.readInt();
				let arg16 = data.readInt();
				let arg17 = data.readInt();
				let arg18 = data.readInt();
				let arg19 = data.readInt();
				let arg20 = data.readInt();
				let arg21 = data.readInt();

				let playerID = arg12;
				let playerVo: Vo_Player;
				if (playerID == Model_player.voMine.id) {
					playerVo = Model_player.voMine;
				}
				else {
					playerVo = GGlobal.modelPlayer.playerDetailDic[playerID];
				}
				if (playerVo) {
					playerVo.currentHp = arg13;
					playerVo.hp = arg14;
					console.log("round2================2", playerVo.currentHp, playerVo.hp);
					console.log(playerVo.name, playerVo.id);
					playerVo.bwID1 = arg15;
					playerVo.bwStar1 = arg16;
					playerVo.bwID2 = arg17;
					playerVo.bwStar2 = arg18;
					playerVo.tsID = arg19;
					playerVo.tsStar = arg20;
					playerVo.shenJianID = arg21;

					t_list2.push(playerVo);
				}
			}
		}
		Model_battle.leftPlayerArr = t_list1;
		Model_battle.rightPlayerArr = t_list2;
		let arg22 = data.readInt();
		Model_battle.systemID = arg22;
		self.enterScene(Model_battle.systemID);
	}

}