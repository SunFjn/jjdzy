class ItemLeiTaiHead extends fairygui.GComponent {

	public lbTil: fairygui.GRichTextField;
	public lbCt: fairygui.GRichTextField;
	public vhead: ViewHead;
	public imgAdd: fairygui.GImage;
	public imgLei: fairygui.GImage;
	public closeBt: Button2;

	public static URL: string = "ui://rhfap29in0933";

	public static createInstance(): ItemLeiTaiHead {
		return <ItemLeiTaiHead><any>(fairygui.UIPackage.createObject("actComLeiTai", "ItemLeiTaiHead"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
		s.closeBt.addClickListener(s.onKitOut, s);
		s.vhead.addClickListener(s.onAssist, s);
	}

	private _vo: Vo_ActLeiTaiPly
	private _leiTai: Vo_ActLeiTai
	private _pos;
	public setVo(v: Vo_ActLeiTaiPly, leiTai: Vo_ActLeiTai, pos) {
		let s = this;
		s._vo = v;
		s._leiTai = leiTai;
		s._pos = pos
		if (s._vo == null) {
			s.vhead.setdata(null)
			s.lbTil.text = ""
			s.lbCt.text = ""
			s.closeBt.visible = false;
			s.imgAdd.visible = !leiTai.isNoPly
			s.imgLei.visible = false;
		} else {
			s.imgAdd.visible = false;
			if (v.npcId) {
				s.vhead.setdata(RoleUtil.getHeadImg(v.npcCfg.head + ""), -1, "", -1, true);
				s.lbCt.text = "战力：" + v.npcCfg.power
				s.lbTil.text = v.npcCfg.name
			} else {
				s.vhead.setdata(v.headId, -1, "", -1, false, v.frameId)
				s.lbCt.text = v.power > 0 ? "战力：" + v.power : ""
				s.lbTil.text = v.name
			}
			if (leiTai.isLeiZhu && v.pos > 0) {
				s.closeBt.visible = true;
			} else {
				s.closeBt.visible = false;
			}
			s.imgLei.visible = (pos == 0 && v.plyId > 0);
		}
	}


	private onKitOut() {
		let m = GGlobal.model_ActLeiTai
		let s = this;
		if (!s._leiTai || !s._vo) {
			return;
		}
		//擂台开启时间已过
		if (!m.isOpenTime()) {
			ViewCommonWarn.text("不在开启时间")
			return;
		}
		m.CG_KICKOUT_11607(s._leiTai.id, s._vo.pos);
	}

	private onAssist() {
		let s = this;
		if (!s._leiTai) {
			return;
		}
		if (s._leiTai.isNoPly) {
			return;
		}
		if (s._vo && s._vo.isLei) {
			return;
		}
		if (s._vo && s._vo.plyId > 0) {
			// ViewCommonWarn.text("该位置已有人");
			return;
		}
		//擂台开启时间已过
		let m = GGlobal.model_ActLeiTai
		if (!m.isOpenTime()) {
			ViewCommonWarn.text("不在开启时间")
			return;
		}

		if (s._leiTai.isLeiZhu) {
			ViewCommonWarn.text("是擂主不能协助")
			return;
		}

		if (m.hasMine()) {
			ViewAlert.show("同一时间只能守擂（协助）一个擂台\n是否确定挑战（协助）", new Handler(s, s.onAssistSure))
		} else {
			s.onAssistSure();
		}
	}

	private onAssistSure() {
		let m = GGlobal.model_ActLeiTai
		let s = this;
		m.CG_ASSIST_11605(s._leiTai.id, s._pos);
	}
}