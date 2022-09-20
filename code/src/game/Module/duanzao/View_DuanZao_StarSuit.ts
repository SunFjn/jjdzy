class View_DuanZao_StarSuit extends UIModalPanel {

	public c1: fairygui.Controller;
	public upgradeBt: Button1;
	public suitLb: fairygui.GTextField;
	public powerLb: fairygui.GTextField;
	public nextLb: fairygui.GTextField;
	public nextAttLb: fairygui.GTextField;
	public curLb: fairygui.GTextField;
	public curAttLb: fairygui.GTextField;

	public static URL: string = "ui://pofv8989sv0g2c";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("DuanZao", "View_DuanZao_StarSuit").asCom;
		a.contentPane = a.view;
		a.c1 = a.view.getController("c1");
		a.upgradeBt = <Button1><any>(a.view.getChild("upgradeBt"));
		a.suitLb = <fairygui.GTextField><any>(a.view.getChild("suitLb"));
		a.powerLb = <fairygui.GTextField><any>(a.view.getChild("powerLb"));
		a.curLb = <fairygui.GTextField><any>(a.view.getChild("curLb"));
		a.curAttLb = <fairygui.GTextField><any>(a.view.getChild("curAttLb"));
		a.curAttLb.leading = 6;
		a.nextLb = <fairygui.GTextField><any>(a.view.getChild("nextLb"));
		a.nextAttLb = <fairygui.GTextField><any>(a.view.getChild("nextAttLb"));
		a.nextAttLb.leading = 6;
		super.childrenCreated();
		a.upgradeBt.addClickListener(a.upHandle, a);
	}

	private upHandle(): void {
		let starLv: number = Model_DuanZao.suitArr[2];
		if (starLv > 0) {
			var nextCfg = Config.dzstarsuit_209[starLv + 1];
			if (nextCfg) {
				if (Model_DuanZao.starMinLv >= nextCfg.yaoqiu) {
					GGlobal.modelDuanZao.CG_DUANZAO_SUIT_UPGRADE(3);
				} else {
					ViewCommonWarn.text("未达到条件，不能进阶");
				}
			} else {
				ViewCommonWarn.text("已满级");
			}
		} else {
			if (Model_DuanZao.starMinLv >= this.cfg.yaoqiu) {
				GGlobal.modelDuanZao.CG_DUANZAO_SUIT_UPGRADE(3);
			} else {
				ViewCommonWarn.text("未达到条件，不能进阶");
			}
		}
	}

	private cfg: any;
	public updateShow(): void {
		let a = this;
		let suitLv: number = Model_DuanZao.suitArr[2];
		if (suitLv > 0) {
			a.cfg = Config.dzstarsuit_209[suitLv];
			a.suitLb.text = "升星大师" + suitLv + "阶";
			a.powerLb.text = "战力：" + a.cfg.power;
			a.curLb.setVar("des", "全身升星+" + a.cfg.yaoqiu).setVar("state", "[color=#00ff00](已激活)[/color]").flushVars();
			let attArr: Array<any> = JSON.parse(a.cfg.attr);
			let attStr: string = "";
			for (let i = 0; i < attArr.length; i++) {
				if (i == 0) {
					attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				} else {
					attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				}
			}
			a.curAttLb.text = attStr;
			var nextCfg = Config.dzstarsuit_209[suitLv + 1];
			if (nextCfg) {
				a.c1.selectedIndex = 1;
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
						if (vo.starLv >= nextCfg.yaoqiu) {
							index++;
						}
					}
				}
				if (index >= 10) {
					a.nextLb.setVar("des", "全身升星+" + nextCfg.yaoqiu).setVar("state", "[color=#00ff00](" + index + "/10)[/color]").flushVars();
				} else {
					a.nextLb.setVar("des", "全身升星+" + nextCfg.yaoqiu).setVar("state", "[color=#ff0000](" + index + "/10)[/color]").flushVars();
				}
				a.nextAttLb.text = attStr1;
				a.upgradeBt.enabled = a.upgradeBt.checkNotice = Model_DuanZao.starMinLv >= nextCfg.yaoqiu;
			} else {
				a.c1.selectedIndex = 2;
				a.upgradeBt.enabled = a.upgradeBt.checkNotice = false;
			}
		} else {
			a.c1.selectedIndex = 0;
			a.cfg = Config.dzstarsuit_209[1];
			a.suitLb.text = "升星大师" + suitLv + "阶";
			a.powerLb.text = "战力：0";
			let index: number = 0;
			let equipData = Model_player.voMine.equipData;
			for (let key in equipData) {
				if (Model_Equip.isEquip(parseInt(key))) {
					let vo: VoEquip = equipData[key];
					if (vo.starLv >= a.cfg.yaoqiu) {
						index++;
					}
				}
			}
			if (index >= 10) {
				a.nextLb.setVar("des", "全身升星+" + a.cfg.yaoqiu).setVar("state", "[color=#00ff00](" + index + "/10)[/color]").flushVars();
			} else {
				a.nextLb.setVar("des", "全身升星+" + a.cfg.yaoqiu).setVar("state", "[color=#ff0000](" + index + "/10)[/color]").flushVars();
			}
			let attArr: Array<any> = JSON.parse(a.cfg.attr);
			let attStr: string = "";
			for (let i = 0; i < attArr.length; i++) {
				if (i == 0) {
					attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				} else {
					attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				}
			}
			a.nextAttLb.text = attStr;
			a.upgradeBt.enabled = a.upgradeBt.checkNotice = Model_DuanZao.starMinLv >= a.cfg.yaoqiu;
		}
	}

	protected onShown(): void {
		GGlobal.reddot.listen(ReddotEvent.CHECK_DAUNZAO, this.updateShow, this);
		this.updateShow();
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.DUANZAO_STAR_SUIT);
		GGlobal.reddot.remove(ReddotEvent.CHECK_DAUNZAO, this.updateShow, this);
	}

	public resetPosition(): void {
		super.resetPosition();
	}
}