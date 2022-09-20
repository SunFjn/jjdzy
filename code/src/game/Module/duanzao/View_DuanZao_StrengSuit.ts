class View_DuanZao_StrengSuit extends UIModalPanel {
	public c1: fairygui.Controller;
	public upgradeBt: Button1;
	public suitLb: fairygui.GTextField;
	public powerLb: fairygui.GTextField;
	public nextLb: fairygui.GTextField;
	public nextAttLb: fairygui.GTextField;
	public curLb: fairygui.GTextField;
	public curAttLb: fairygui.GTextField;

	public static URL: string = "ui://pofv8989pzg75";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("DuanZao", "View_DuanZao_StrengSuit").asCom;
		s.contentPane = s.view;
		s.c1 = s.view.getController("c1");
		s.upgradeBt = <Button1><any>(s.view.getChild("upgradeBt"));
		s.suitLb = <fairygui.GTextField><any>(s.view.getChild("suitLb"));
		s.powerLb = <fairygui.GTextField><any>(s.view.getChild("powerLb"));
		s.curLb = <fairygui.GTextField><any>(s.view.getChild("curLb"));
		s.curAttLb = <fairygui.GTextField><any>(s.view.getChild("curAttLb"));
		s.curAttLb.leading = 6;
		s.nextLb = <fairygui.GTextField><any>(s.view.getChild("nextLb"));
		s.nextAttLb = <fairygui.GTextField><any>(s.view.getChild("nextAttLb"));
		s.nextAttLb.leading = 6;
		super.childrenCreated();
		s.upgradeBt.addClickListener(s.upHandle, this);
	}

	private upHandle(): void {
		let s = this;
		var strengLv: number = Model_DuanZao.suitArr[0];
		if (strengLv > 0) {
			var nextCfg = Config.dzqianghuasuit_209[strengLv + 1];
			if (nextCfg) {
				if (Model_DuanZao.strengMinLV >= nextCfg.yaoqiu) {
					GGlobal.modelDuanZao.CG_DUANZAO_SUIT_UPGRADE(1);
				} else {
					ViewCommonWarn.text("未达到条件，不能进阶");
				}
			} else {
				ViewCommonWarn.text("已满级");
			}
		} else {
			if (Model_DuanZao.strengMinLV >= s.cfg.yaoqiu) {
				GGlobal.modelDuanZao.CG_DUANZAO_SUIT_UPGRADE(1);
			} else {
				ViewCommonWarn.text("未达到条件，不能进阶");
			}
		}
	}

	private cfg: any;
	public updateShow(): void {
		let s = this;
		var strengLv: number = Model_DuanZao.suitArr[0];
		if (strengLv > 0) {
			s.cfg = Config.dzqianghuasuit_209[strengLv];
			s.suitLb.text = "强化大师" + strengLv + "阶";
			s.powerLb.text = "战力：" + s.cfg.power;
			s.curLb.setVar("des", "全身强化+" + s.cfg.yaoqiu).setVar("state", "[color=#00ff00](已激活)[/color]").flushVars();
			let attArr: Array<any> = JSON.parse(s.cfg.attr);
			let attStr: string = "";
			for (let i = 0; i < attArr.length; i++) {
				if (i == 0) {
					attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				} else {
					attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				}
			}
			s.curAttLb.text = attStr;
			var nextCfg = Config.dzqianghuasuit_209[strengLv + 1];
			if (nextCfg) {
				s.c1.selectedIndex = 1;
				let attArr1: Array<any> = JSON.parse(nextCfg.attr);
				let attStr1: string = "";
				for (let i = 0; i < attArr1.length; i++) {
					if (i == 0) {
						attStr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
					} else {
						attStr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
					}
				}
				let index: number = 0;
				let equipData = Model_player.voMine.equipData;
				for (let key in equipData) {
					if (Model_Equip.isEquip(parseInt(key))) {
						let vo: VoEquip = equipData[key];
						if (vo.qh >= nextCfg.yaoqiu) {
							index++;
						}
					}
				}
				if (index >= 10) {
					s.nextLb.setVar("des", "全身强化+" + nextCfg.yaoqiu).setVar("state", "[color=#15f234](" + index + "/10)[/color]").flushVars();
				} else {
					s.nextLb.setVar("des", "全身强化+" + nextCfg.yaoqiu).setVar("state", "[color=#ed1414](" + index + "/10)[/color]").flushVars();
				}
				s.nextAttLb.text = attStr1;
				s.upgradeBt.enabled = s.upgradeBt.checkNotice = Model_DuanZao.strengMinLV >= nextCfg.yaoqiu;
			} else {
				s.c1.selectedIndex = 2;
				s.upgradeBt.enabled = s.upgradeBt.checkNotice = false;
			}
		} else {
			s.c1.selectedIndex = 0;
			s.cfg = Config.dzqianghuasuit_209[1];
			s.suitLb.text = "强化大师" + strengLv + "阶";
			s.powerLb.text = "战力：0";
			let index: number = 0;
			let equipData = Model_player.voMine.equipData;
			for (let key in equipData) {
				if (Model_Equip.isEquip(parseInt(key))) {
					let vo: VoEquip = equipData[key];
					if (vo.qh >= s.cfg.yaoqiu) {
						index++;
					}
				}
			}
			if (index >= 10) {
				s.nextLb.setVar("des", "全身强化+" + s.cfg.yaoqiu).setVar("state", "[color=#15f234](" + index + "/10)[/color]").flushVars();
			} else {
				s.nextLb.setVar("des", "全身强化+" + s.cfg.yaoqiu).setVar("state", "[color=#ed1414](" + index + "/10)[/color]").flushVars();
			}
			let attArr: Array<any> = JSON.parse(s.cfg.attr);
			let attStr: string = "";
			for (let i = 0; i < attArr.length; i++) {
				if (i == 0) {
					attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				} else {
					attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				}
			}
			s.nextAttLb.text = attStr;
			s.upgradeBt.enabled = s.upgradeBt.checkNotice = Model_DuanZao.strengMinLV >= s.cfg.yaoqiu;
		}
	}

	protected onShown(): void {
		let s = this;
		GGlobal.control.listen(Enum_MsgType.DUANZAO_DATA_UPDATE, s.updateShow, this);
		s.updateShow();
	}

	protected onHide(): void {
		let s = this;
		GGlobal.layerMgr.close(UIConst.DUANZAO_STRENG_SUIT);
		GGlobal.control.remove(Enum_MsgType.DUANZAO_DATA_UPDATE, s.updateShow, this);
	}
}