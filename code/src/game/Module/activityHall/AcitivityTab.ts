/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class AcitivityTab extends fairygui.GComponent {

	public n10: fairygui.GImage;
	public imgBg: fairygui.GLoader;
	public n11: fairygui.GImage;
	public n17: fairygui.GImage;
	public n15: fairygui.GImage;
	public n19: fairygui.GImage;
	public imgTitle: fairygui.GLoader;
	public lbName: fairygui.GTextField;
	public lbTime: fairygui.GTextField;
	public lbDesc: fairygui.GRichTextField;
	public btnGo: fairygui.GButton;
	public g0: ViewGrid;
	public g1: ViewGrid;
	public g2: ViewGrid;
	public g3: ViewGrid;
	public i0: fairygui.GLoader;
	public i1: fairygui.GLoader;
	public i2: fairygui.GLoader;
	public imgNotice: fairygui.GImage;
	public groupMvp: fairygui.GGroup;

	public static URL: string = "ui://1xydor24oc0js";

	public static createInstance(): AcitivityTab {
		return <AcitivityTab><any>(fairygui.UIPackage.createObject("activityHall", "AcitivityTab"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.lbDesc.text = HtmlUtil.createLink("玩法说明", true);
		s.lbDesc.addEventListener(egret.TextEvent.LINK, s.onTFClick, s);
		s.btnGo.addClickListener(s.onGO, s);
		s.grids = [s.g0, s.g1, s.g2, s.g3];
		s._flagArr = [s.i0, s.i1, s.i2]
	}
	private onRemove() {
		IconUtil.setImg(this.imgBg, null);
		IconUtil.setImg(this.imgTitle, null);
	}

	private onTFClick(evt: egret.TextEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, this.idx);
	}

	private onGO() {
		if (this.idx != UIConst.WENDINGTX) {
			if (ModuleManager.isOpen(this.idx, true) == false) {
				return;
			}
		}
		switch (this.idx) {
			case UIConst.FHLY:
				if (TimeUitl.cool("AcitivityTabFHLY", 3000)) {
					GGlobal.modelFengHuoLY.enter();
				}
				break;
			case UIConst.WENDINGTX:
				if (TimeUitl.cool("AcitivityTabwdtx", 3000)) {
					GGlobal.modelWenDingTX.enterAct4223();
				}
				break;
			case UIConst.QXZL:
				GGlobal.layerMgr.open(UIConst.QXZL, { from: UIConst.ACTIVITYHALL });
				break;
			case UIConst.LIANGCAO:
				GGlobal.modelLiangCao.CG_BattleGoods_inscene_10101();
				break;
			default:
				GGlobal.layerMgr.open(this.idx);
				break;
		}
	}

	public idx;
	public grids: ViewGrid[];
	private _flagArr: fairygui.GLoader[];
	public setIdx(val, pos) {
		let sf = this;
		sf.idx = val;
		sf.listen();
		IconUtil.setImg(sf.imgTitle, Enum_Path.PIC_URL + val + "a.png");
		IconUtil.setImg(sf.imgBg, "resource/image/actpreview/" + val + ".png");
		let cfg = Config.hddt_200[val];

		sf.lbTime.text = cfg.time;

		sf.drawFlag(cfg.kf);
		sf.setMvp(val);
		sf.checkNotice(val);
		sf.showAwards(cfg);
	}

	private drawFlag(kf) {
		let flags = [];
		if (kf != '0') {
			flags = JSON.parse(kf)[0];
		}
		let len = flags.length;
		for (let i = 0; i < this._flagArr.length; i++) {
			if (i < len) {
				let url;
				switch (flags[i]) {
					case 1: url = "ui://1xydor24vuo012"; break;//跨服
					case 2: url = "ui://1xydor24ljbu15"; break;//测试
					case 3: url = "ui://1xydor24vuo012"; break;//重要
				}
				this._flagArr[i].url = url;
				this._flagArr[i].visible = true;
			} else {
				this._flagArr[i].visible = false;
			}
		}
	}

	private setMvp(val) {
		let sf = this;
		if (val == UIConst.SHAOZHU_ESCORT || val == UIConst.MHBOSS || val == UIConst.KFWZ || val == UIConst.XU_TIAN || val == UIConst.GCBZ) {
			sf.n15.visible = false;
			sf.lbName.text = "";
			return;
		}
		let mvp = GGlobal.modelActivityHall.getMVp(val);
		sf.n15.visible = true;
		if (mvp == '') {
			if (val == UIConst.LONGZHONGDUI) {
				sf.lbName.text = '上届第一：暂无';
			} else {
				sf.lbName.text = '上届MVP：暂无';
			}
		} else {
			if (val == UIConst.LONGZHONGDUI) {
				sf.lbName.text = '上届状元：' + mvp;
			} else if (val == UIConst.WENDINGTX) {
				sf.lbName.text = '真龙天子：' + mvp;
			} else {
				sf.lbName.text = '上届MVP：' + mvp;
			}
		}
	}

	private showAwards(cfg) {
		let sf = this;
		let mvpcfg = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		for (let i = 0; i < 4; i++) {
			if (i < mvpcfg.length) {
				sf.grids[i].visible = true;
				sf.grids[i].vo = mvpcfg[i];
				sf.grids[i].tipEnabled = true;
				sf.grids[i].showEff(true);
				sf.grids[i].tipEnabled = true;
			} else {
				sf.grids[i].visible = false;
			}
		}
	}

	private checkNotice(val) {
		this.imgNotice.visible = GGlobal.modelActivityHall.checkNotice(val);
	}

	public listen() {
		let s = this;
		s.lbDesc.addEventListener(egret.TextEvent.LINK, s.onTFClick, s);
		s.btnGo.addClickListener(s.onGO, s);
		s.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.onRemove, s);
	}

	public clean() {
		let s = this;
		s.lbDesc.removeEventListener(egret.TextEvent.LINK, s.onTFClick, s);
		s.btnGo.removeClickListener(s.onGO, s);
		s.displayObject.removeEventListener(egret.Event.REMOVED_FROM_STAGE, s.onRemove, s);
		for (let i = 0; i < 4; i++) {
			s.grids[i].showEff(false);
			s.grids[i].visible = false;
		}
	}

}