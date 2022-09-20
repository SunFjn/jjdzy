class ARPGNpc extends ArpgRole {
	private lbName: fairygui.GRichTextField;
	public constructor() {
		super();
		let self = this;
		self.lbName = new fairygui.GRichTextField();
		self.lbName.align = fairygui.AlignType.Center;
		self.lbName.fontSize = 18;
		self.lbName.stroke = 1;
		self.lbName.color = 0xfe0000;

		self.headGroup.addChild(self.lbName.displayObject);
	}

	cfgID = 0;
	vo: Vo_Npc;
	static list = {};

	public init1(serverID: any, cfgID: number, GlobalX: number, GlobalY: number): void {
		var s = this;
		//构建外观
		s.id = serverID;
		s.cfgID = cfgID;

		s.vo = Vo_Npc.create(serverID, cfgID);
		s.setXY(GlobalX, GlobalY);
		let cfg = s.vo.cfg;
		s.lbName.text = cfg.name;
		s.name = cfg.name;
		s.lbName.color = Color.YELLOWINT;
		if (cfg.type == 12) {//家具不显示名字
			s.lbName.text = "";
		} else {
			if (cfg.type == Enum_NpcType.COLLECT_NPC) {
				s.lbName.color = 0xf1f1f1;
				let quility = ModelLiangCao.checkNpcQuility(cfgID);
				if (quility > -1) {
					s.lbName.color = Color.getColorInt(quility);
				}
			}else if (cfg.Gongji != 0) {
				s.lbName.color = Color.REDINT;
			} 
		}

		s.setBody(cfg.mod);
		if (cfg.weapon)
			s.setWeapon(cfg.mod);
		s.setMoveState(Enum_MoveState.STAND);
		s.setNameY();
	}

	public setWeapon(v) {
		let s = this;
		v = Config.sz_739[v] ? Config.sz_739[v].moxing : v
		if (s.weapon != v) {
			if (v) {
				s.weaponpic = v + "";
			} else {
				s.weaponpic = undefined;
			}
			s.weapon = v;
			s.invalid |= 1;
		} else {
		}
		if (!v) {
			s.parts.removePartByType(2);//移除PART
		}
	}

	public setName(val) {
		let s = this;
		s.lbName.text = val;
		s.setNameY();
	}

	public setNameY() {
		let s = this;
		var cfg = Config.mod_200[s.body];
		if (cfg && cfg.h) {
			if (s.namey != -cfg.h) {
				s.headGroup.y = -cfg.h;
				s.lbName.setXY(-(s.lbName.textWidth / 2) >> 0, -this.lbName.height);
			}
		}
	}

	private static _collectView: fairygui.GProgressBar;
	public set isCollect(value: boolean) {
		if (value) {
			if (!ARPGNpc._collectView) {
				ARPGNpc._collectView = fairygui.UIPackage.createObjectFromURL(CommonManager.getCommonUrl("HpBar")).asProgress;
			}
			GGlobal.layerMgr.UI_MainBottom.addChild(ARPGNpc._collectView);
			var _p: egret.Point = this.headGroup.localToGlobal(0, 0);
			ARPGNpc._collectView.y = _p.y - this.lbName.height - ARPGNpc._collectView.height;
			ARPGNpc._collectView.x = _p.x - (ARPGNpc._collectView.width / 2);
		} else {
			if (ARPGNpc._collectView) GGlobal.layerMgr.UI_MainBottom.removeChild(ARPGNpc._collectView);
		}
	}

	public static setCollectViewLabel(label: string): void {
		if (!ARPGNpc._collectView) {
			ARPGNpc._collectView = fairygui.UIPackage.createObjectFromURL(CommonManager.getCommonUrl("HpBar")).asProgress;
		}
		ARPGNpc._collectView.text = label;
	}

	public updateCollectPro(rate: number): void {
		ARPGNpc._collectView.value = rate;
	}

	public interaction(mode: number = 0): void {
		let self = this;
		if (!self.vo || !self.vo.cfg) {
			return;
		}
		const hero = GameUnitManager.hero;
		if (hero.lockTarget == self) {
			hero.lockTarget = null;
			hero.autoMoveID = -1;
			hero.autoMoveType = -1;
		}
		if (GGlobal.sceneType == SceneCtrl.ARPG) {
			let mapType = ModelArpgMap.getInstance().sceneType;
			switch (mapType) {
				case EnumMapType.WDTX:
					WenDingTXManager.enterPve(self.id);
					break;
				case EnumMapType.BOSSZC_LOCAL:
				case EnumMapType.BOSSZC_CROSS:
					GGlobal.modelBossZc.CGfightBoss4459();
					break;
				case EnumMapType.SANGUO_YT:
					if (self.vo.cfg.type == Enum_NpcType.COLLECT_NPC) {
						GGlobal.modelSanGuoYT.CG_YITONG_COLLECT_5805(self.id)
					} else {
						GGlobal.modelSanGuoYT.CG_YITONG_BATTLE_MONEST_5811(self.id);
					}
					break;
				case EnumMapType.LIANGCAO:
					if (self.vo.cfg.type == Enum_NpcType.COLLECT_NPC) {
						GGlobal.modelLiangCao.CG_BattleGoods_getBox_10109(this.id);
					} else {
						GGlobal.modelLiangCao.CG_BattleGoods_battleMonster_10105(this.id);
					}
					break;
				case EnumMapType.SYZLB:
					GGlobal.model_Syzlb.CG_CHA_BOSS();
					break;
				case EnumMapType.YANHUI:
					let model = GGlobal.modelYanHui;
					if (model.bossData1[self.id] == 1) {
						ViewCommonWarn.text("该BOSS已挑战");
					} else {
						model.CG_Yanhui_battleboss_11469(this.cfgID);
					}
					break;
				case EnumMapType.HOME:
					HomeManager.interaction(this);
					break;
				case EnumMapType.HOME_JD:
					if (GGlobal.homemodel.isSelfHome) {
						GGlobal.layerMgr.open(UIConst.HOME_JIADING_UI);
					}
					break;
			}
			self.hideFilter();
		}
	}

	public onAdd() {
		super.onAdd();
		let s = this;
		ARPGNpc.list[s.id] = this;
	}

	public onRemove() {
		let s = this;
		delete ARPGNpc.list[s.id];
		super.onRemove();
		if (s.vo) {
			s.vo.recover();
			s.vo = null;
		}
		Pool.recover("ARPGNpc", this);
	}

	public static getNPC(unitId) {
		let ret = ARPGNpc.list[unitId];
		if (!ret) {
			for (let i in ARPGNpc.list) {
				let temp: ARPGNpc = ARPGNpc.list[i];
				if (temp.cfgID == unitId) {
					ret = temp;
					break;
				}
			}
		}
		return ret;
	}

}