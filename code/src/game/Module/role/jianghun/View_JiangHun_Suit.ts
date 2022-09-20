class View_JiangHun_Suit extends UIModalPanel {

	public nameLb: fairygui.GRichTextField;
	public levelLb: fairygui.GRichTextField;
	public curAttLb: fairygui.GRichTextField;
	public nextAttLb: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;
	public upBt: Button0;

	public static URL: string = "ui://3tzqotadk8ozq";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("role", "View_JiangHun_Suit").asCom;
		a.contentPane = a.view;
		a.nameLb = <fairygui.GRichTextField><any>(a.view.getChild("nameLb"));
		a.levelLb = <fairygui.GRichTextField><any>(a.view.getChild("levelLb"));
		a.curAttLb = <fairygui.GRichTextField><any>(a.view.getChild("curAttLb"));
		a.nextAttLb = <fairygui.GRichTextField><any>(a.view.getChild("nextAttLb"));
		a.numLb = <fairygui.GRichTextField><any>(a.view.getChild("numLb"));
		a.upBt = <Button0><any>(a.view.getChild("upBt"));
		super.childrenCreated();
		a.upBt.addClickListener(a.upHandle, a);
	}

	private upHandle(): void {
		let a = this;
		if (a.upBt.checkNotice) {
			GGlobal.modeljh.CG_JIANGHUN_SUIT(a.suitID);
		} else {
			a.suitID = Model_JiangHun.suitIdArr[a.type - 1];
			let cfg = Config.genteam_006[a.suitID];
			if (cfg.next) {
				ViewCommonWarn.text("将魂等级不足");
			} else {
				ViewCommonWarn.text("已满阶");
			}
		}
	}

	private suitID: number;
	private type: number;
	private updateShow(): void {
		let a = this;
		a.type = a._args;
		if (!a.type) return;
		a.suitID = Model_JiangHun.suitIdArr[a.type - 1];
		let cfg = Config.genteam_006[a.suitID];
		a.nameLb.text = cfg.name;
		a.levelLb.text = cfg.name + "总等级：" + cfg.lv;
		let attstr: string = "";
		let attstr1: string = "";
		let nextcfg = Config.genteam_006[cfg.next];
		if (nextcfg) {
			let attArr: Array<any> = JSON.parse(cfg.attr);
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
			a.numLb.text = "(" + Model_JiangHun.level + "/" + nextcfg.need + ")";
			a.numLb.color = Model_JiangHun.level >= nextcfg.need ? Color.getColorInt(2) : Color.getColorInt(6);
			a.upBt.checkNotice = Model_JiangHun.level >= nextcfg.need;
		} else {
			let attArr: Array<any> = JSON.parse(cfg.attr);
			let len: number = attArr.length;
			for (let i = 0; i < len; i++) {
				if (i == 0) {
					attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
					attstr1 += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				} else {
					attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
					attstr1 += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				}
			}
			a.numLb.text = "已满阶";
			a.numLb.color = Color.getColorInt(6);
			a.upBt.checkNotice = false;
		}
		a.curAttLb.text = attstr;
		a.nextAttLb.text = attstr1;
	}

	protected onShown(): void {
		let a = this;
		a.updateShow();
		GGlobal.reddot.listen(ReddotEvent.CHECK_JIANGHUN, a.updateShow, a);
	}

	protected onHide(): void {
		let a = this;
		GGlobal.layerMgr.close(UIConst.JIANGHUN_SUIT);
		GGlobal.reddot.remove(ReddotEvent.CHECK_JIANGHUN, a.updateShow, a);
	}
}