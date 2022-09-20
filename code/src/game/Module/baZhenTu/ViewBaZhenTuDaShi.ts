class ViewBaZhenTuDaShi extends UIModalPanel {
	public c1: fairygui.Controller;
	public upgradeBt: Button1;
	public suitLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public nextLb: fairygui.GRichTextField;
	public nextAttLb: fairygui.GRichTextField;
	public curLb: fairygui.GRichTextField;
	public curAttLb: fairygui.GRichTextField;

	public static URL: string = "ui://xrzn9ppavrr61g";

	public constructor() {
		super();
		this.loadRes();
	}

	public static createInstance(): ViewBaZhenTuDaShi {
		return <ViewBaZhenTuDaShi><any>(fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuDaShi"));
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuDaShi").asCom;
		s.contentPane = s.view;
		s.c1 = s.view.getController("c1");
		s.upgradeBt = <Button1><any>(s.view.getChild("upgradeBt"));
		s.suitLb = <fairygui.GRichTextField><any>(s.view.getChild("suitLb"));
		s.powerLb = <fairygui.GRichTextField><any>(s.view.getChild("powerLb"));
		s.curLb = <fairygui.GRichTextField><any>(s.view.getChild("curLb"));
		s.curAttLb = <fairygui.GRichTextField><any>(s.view.getChild("curAttLb"));
		s.curAttLb.leading = 6;
		s.nextLb = <fairygui.GRichTextField><any>(s.view.getChild("nextLb"));
		s.nextAttLb = <fairygui.GRichTextField><any>(s.view.getChild("nextAttLb"));
		s.nextAttLb.leading = 6;
		super.childrenCreated();
		s.upgradeBt.addClickListener(s.upHandle, this);
	}

	private upHandle(): void {
		let s = this;
		if(s.cfgNext && GGlobal.modelBaZhenTu.dsLv >= s.cfgNext.lv){
			GGlobal.modelBaZhenTu.CGDASHI_UPLV4419();
		}
		else {
			ViewCommonWarn.text("未达到条件，不能进阶");
		}
	}

	private cfg: Ibztfwtz_261;
	private cfgNext: Ibztfwtz_261;
	public updateShow(): void {
		let s = this;
		let m = GGlobal.modelBaZhenTu
		let dsId: number = m.dsId;
		s.cfg = Config.bztfwtz_261[dsId];
		let index: number = m.dsLv;
		var nextCfg = s.cfgNext = Config.bztfwtz_261[dsId + 1];
		if (dsId > 0) {
			s.suitLb.text = "符文大师" + dsId + "阶";
			s.powerLb.text = "战力：" + s.cfg.power;
			s.curLb.setVar("des", "红色符文总星级+" + s.cfg.lv).setVar("state", "[color=#00ff00](已激活)[/color]").flushVars();
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
				if (index >= nextCfg.lv) {
					s.nextLb.setVar("des", "红色符文总星级+" + nextCfg.lv).setVar("state", "[color=#15f234](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
				} else {
					s.nextLb.setVar("des", "红色符文总星级+" + nextCfg.lv).setVar("state", "[color=#ed1414](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
				}
				s.nextAttLb.text = attStr1;
				s.upgradeBt.enabled = s.upgradeBt.checkNotice = index >= nextCfg.lv;
			} else {
				s.c1.selectedIndex = 2;
				s.upgradeBt.enabled = s.upgradeBt.checkNotice = false;
			}
		} else {
			s.c1.selectedIndex = 0;
			s.cfg = Config.bztfwtz_261[1];
			s.suitLb.text = "符文大师" + dsId + "阶";
			s.powerLb.text = "战力：0";
			if (index >= nextCfg.lv) {
				s.nextLb.setVar("des", "红色符文总星级+" + nextCfg.lv).setVar("state", "[color=#15f234](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
			} else {
				s.nextLb.setVar("des", "红色符文总星级+" + nextCfg.lv).setVar("state", "[color=#ed1414](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
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
			s.upgradeBt.enabled = s.upgradeBt.checkNotice = index >= nextCfg.lv;
		}
	}

	protected onShown(): void {
		let s = this;
		GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.DA_SHI, s.updateShow, this);
		s.updateShow();
	}

	protected onHide(): void {
		let s = this;
		GGlobal.layerMgr.close(UIConst.BAZHENTU_DASHI);
		GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.DA_SHI, s.updateShow, this);
	}
}