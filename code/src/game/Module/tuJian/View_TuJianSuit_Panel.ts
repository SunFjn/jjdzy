class View_TuJianSuit_Panel extends UIModalPanel {

	public backImg: fairygui.GImage;
	public nameLb: fairygui.GRichTextField;
	public levelLb: fairygui.GRichTextField;
	public curAttLb: fairygui.GRichTextField;
	public nextAttLb: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;
	public upBt: Button1;
	public maxGroup: fairygui.GGroup;

	public static URL: string = "ui://m0rbmsgsrkgc2l";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("TuJian", "View_TuJianSuit_Panel").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
		s.upBt.addClickListener(s.upHandle, s);
	}

	private upHandle(): void {
		let s = this;
		if (s.upBt.checkNotice) {
			GGlobal.modelTuJian.CG_TUJIAN_UPSUIT(s.vo.suitID);
		} else {
			if (s.vo.suitNext <= 0) {
				ViewCommonWarn.text("已提升到满级");
			} else {
				ViewCommonWarn.text("图鉴等级不足");
			}
		}
	}

	private vo: Vo_TuJianSuit;
	private updateShow(): void {
		let s = this;
		s.vo = s._args;
		if (!s.vo) return;
		s.nameLb.text = s.vo.suitName;
		s.levelLb.text = Model_TuJian.tabArr[s.vo.type] + "图鉴总等级：" + s.vo.tujianLv;
		let nextcfg = Config.picteam_005[s.vo.suitNext];
		let attstr: string = "";
		let attArr: Array<any> = s.vo.suitAttArr;
		let attstr1: string = "";
		let len: number = attArr.length;
		if (nextcfg) {
			if (attArr.length > 0) {
				let attArr1: Array<any> = JSON.parse(nextcfg.attr);
				let len: number = attArr.length;
				for (let i = 0; i < len; i++) {
					if (i == 0) {
						attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
						attstr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
					} else {
						attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
						attstr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
					}
				}
			} else {
				let attArr: Array<any> = JSON.parse(nextcfg.attr);
				let len: number = attArr.length;
				for (let i = 0; i < len; i++) {
					if (i == 0) {
						attstr += Vo_attr.getShowStr(attArr[i][0], 0);
						attstr1 += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
					} else {
						attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], 0);
						attstr1 += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
					}
				}
			}
			s.numLb.text = "(" + s.vo.tujianLv + "/" + nextcfg.need + ")";
			s.numLb.color = s.vo.tujianLv >= nextcfg.need ? Color.getColorInt(2) : Color.getColorInt(6);
			s.upBt.enabled = s.upBt.checkNotice = s.vo.tujianLv >= nextcfg.need;
			s.upBt.visible = true;
			s.maxGroup.visible = false;
		} else {
			let len: number = attArr.length;
			for (let i = 0; i < len; i++) {
				if (i == 0) {
					attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				} else {
					attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				}
			}
			attstr1 = "";
			s.upBt.visible = false;
			s.numLb.text = "已满级";
			s.numLb.color = Color.getColorInt(6);
			s.maxGroup.visible = true;
		}
		s.curAttLb.text = attstr;
		s.nextAttLb.text = attstr1;
	}

	protected onShown(): void {
		let s = this;
		s.updateShow();
		GGlobal.control.listen(Enum_MsgType.TUJIAN_DATA_UPDATE, s.updateShow, s);
	}

	protected onHide(): void {
		let s = this;
		GGlobal.layerMgr.close(UIConst.TUJIAN_SUIT);
		GGlobal.control.remove(Enum_MsgType.TUJIAN_DATA_UPDATE, s.updateShow, s);
	}
}