class View_DuanZao_StoneSuit extends UIModalPanel {
	public c1: fairygui.Controller;
	public upgradeBt: Button1;
	public suitLb: fairygui.GTextField;
	public powerLb: fairygui.GTextField;
	public nextLb: fairygui.GTextField;
	public nextAttLb: fairygui.GTextField;
	public curLb: fairygui.GTextField;
	public curAttLb: fairygui.GTextField;

	public static URL: string = "ui://pofv8989kn3r7";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("DuanZao", "View_DuanZao_StoneSuit").asCom;
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
		if (s.upgradeBt.checkNotice) {
			GGlobal.modelDuanZao.CG_DUANZAO_SUIT_UPGRADE(2);
		} else {
			var suitLv: number = Model_DuanZao.suitArr[1];
			var nextCfg = Config.dzgemsuit_209[suitLv + 1];
			if (nextCfg) {
				ViewCommonWarn.text("未达到条件，不能进阶");
			} else {
				ViewCommonWarn.text("已满阶");
			}
		}
	}

	private cfg: any;
	public updateShow(): void {
		let s = this;
		var suitLv: number = Model_DuanZao.suitArr[1];
		if (suitLv > 0) {
			s.cfg = Config.dzgemsuit_209[suitLv];
			s.suitLb.text = "宝石大师" + suitLv + "阶";
			s.powerLb.text = "战力：" + s.cfg.power;
			s.curLb.setVar("des", "宝石总等级达到" + s.cfg.lv).setVar("state", "[color=#00ff00](已激活)[/color]").flushVars();
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
			var nextCfg = Config.dzgemsuit_209[suitLv + 1];
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
						index += vo.gemLv;
					}
				}
				if (index >= nextCfg.lv) {
					s.nextLb.setVar("des", "宝石总等级达到" + nextCfg.lv).setVar("state", "[color=#15f234](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
				} else {
					s.nextLb.setVar("des", "宝石总等级达到" + nextCfg.lv).setVar("state", "[color=#ff0000](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
				}
				s.nextAttLb.text = attStr1;
				s.upgradeBt.enabled = s.upgradeBt.checkNotice = Model_DuanZao.gemLv >= nextCfg.lv;
			} else {
				s.c1.selectedIndex = 2;
				s.upgradeBt.enabled = s.upgradeBt.checkNotice = false;
			}
		} else {
			s.c1.selectedIndex = 0;
			s.cfg = Config.dzgemsuit_209[1];
			s.suitLb.text = "宝石大师" + suitLv + "阶";
			s.powerLb.text = "战力：0";
			let index: number = 0;
			let equipData = Model_player.voMine.equipData;
			for (let key in equipData) {
				if (Model_Equip.isEquip(parseInt(key))) {
					let vo: VoEquip = equipData[key];
					index += vo.gemLv;
				}
			}
			if (index >= s.cfg.lv) {
				s.nextLb.setVar("des", "宝石总等级达到" + s.cfg.lv).setVar("state", "[color=#15f234](" + index + "/" + s.cfg.lv + ")[/color]").flushVars();
			} else {
				s.nextLb.setVar("des", "宝石总等级达到" + s.cfg.lv).setVar("state", "[color=#ff0000](" + index + "/" + s.cfg.lv + ")[/color]").flushVars();
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
			s.upgradeBt.enabled = s.upgradeBt.checkNotice = Model_DuanZao.gemLv >= s.cfg.lv;
		}
	}

	protected onShown(): void {
		let s = this;
		s.updateShow();
		GGlobal.control.listen(Enum_MsgType.DUANZAO_DATA_UPDATE, s.updateShow, this);
	}

	protected onHide(): void {
		let s = this;
		GGlobal.layerMgr.close(UIConst.DUANZAO_STONE_SUIT);
		GGlobal.control.remove(Enum_MsgType.DUANZAO_DATA_UPDATE, s.updateShow, s);
	}
}