/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewChuangGuanYL extends UIPanelBase {
	public frame: fairygui.GComponent;
	public n23: fairygui.GImage;
	public imgBody: fairygui.GLoader;
	public lbProgress: fairygui.GRichTextField;
	public n5: Button1;
	public item0: CGYLItem;
	public item1: CGYLItem;
	public item2: CGYLItem;
	public item3: CGYLItem;
	public labPower: fairygui.GLabel;
	public n20: fairygui.GImage;
	public n21: fairygui.GImage;
	public imgYlq: fairygui.GImage;
	public n22: fairygui.GLoader;

	public static URL: string = "ui://nf66suj6lkx81";

	public static createInstance(): ViewChuangGuanYL {
		return <ViewChuangGuanYL><any>(fairygui.UIPackage.createObject("chuangguanYL", "ViewChuangGuanYL"));
	}

	public constructor() {
		super();
		this.setSkin("chuangguanYL", "chuangguanYL_atlas0", "ViewChuangGuanYL");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(CGYLItem.URL, CGYLItem);
	}

	private itemVec: CGYLItem[];
	protected initView(): void {
		super.initView();
		let sf = this;
		sf.itemVec = [];
		for (let i = 0; i < 4; i++) {
			sf.itemVec.push(sf["item" + i]);
		}
		sf.n5.checkNotice = true;
	}

	private initDta() {
		let sf = this;
		let m = GGlobal.modelChuangGuanYL;
		let dta = m.currentDta;
		if (m.currentId == 0 || !dta.length) return;
		let cut = 0;
		let getNum = 0;
		for (let i = 0; i < 4; i++) {
			let item = sf.itemVec[i];
			let itemDta = dta[i];
			item.setdta(itemDta);
			if (itemDta[1] != 0) cut++;
			if (itemDta[1] == 2) getNum++;
		}

		let cfg = Config.cgyl_262[m.currentId];
		if (!cfg) return;
		cfg.pic && sf.drawPic(cfg.pic);
		cfg.mod && sf.drawBody(cfg.mod);
		IconUtil.setImg(sf.n22, Enum_Path.PIC_URL + cfg.name + ".png");

		sf.lbProgress.visible = m.currentTargetST != 1;

		sf.n5.visible = m.currentTargetST == 1 && getNum >= 4;
		sf.imgYlq.visible = m.currentTargetST == 2;
		sf.lbProgress.visible = cut != 4;
		sf.lbProgress.text = "完成以下任务可领\n<font color='#fe0000'>(" + cut + "/4)</font>";
		sf.labPower.text = cfg.power + "";
		if (ViewChuangGuanYL.isGuide) {
			sf.guideDraw(ViewChuangGuanYL.step);
		}
	}

	private drawPic(pic) {
		let sf = this;
		sf.imgBody.setXY(220, 230);
		sf.imgBody.setScale(1, 1);
		IconUtil.setImg(sf.imgBody, Enum_Path.PIC_URL + pic + ".png");
	}

	private drawBody(pic) {
		let sf = this;
		sf.imgBody.setXY(202, 217);
		sf.imgBody.setScale(0.4, 0.4);
		IconUtil.setImg(sf.imgBody, Enum_Path.JUESE_URL + pic + ".png");
	}


	private getCallBack1() {
		GGlobal.modelChuangGuanYL.CG_OPEN_4151();
	}

	private getCallBack() {
		GGlobal.modelChuangGuanYL.CG_OPEN_4151();
	}

	private getAwardsHD() {
		GGlobal.modelChuangGuanYL.CG_LQMB_4155();
	}

	private effPart: Part;
	protected onShown() {
		let sf = this;
		GGlobal.modelChuangGuanYL.CG_OPEN_4151();
		sf.initDta();
		let cr = GGlobal.control;
		cr.listen(Enum_MsgType.CGYL_OPEN, sf.initDta, sf);
		cr.listen(Enum_MsgType.CGYL_LQ, sf.getCallBack, sf);
		cr.listen(Enum_MsgType.CGYL_LQ1, sf.getCallBack1, sf);
		sf.n5.addClickListener(sf.getAwardsHD, sf);
		if (!this.effPart) {
			this.effPart = EffectMgr.addEff("uieff/10011", this.view.displayListContainer, 320, 360, 800, -1);
			this.effPart.mc.scaleX = this.effPart.mc.scaleY = 3;
			this.effPart.mc.parent.setChildIndex(this.effPart.mc, 2);
		}
	}

	protected onHide() {
		let sf = this;
		let cr = GGlobal.control;
		cr.remove(Enum_MsgType.CGYL_OPEN, sf.initDta, sf);
		cr.remove(Enum_MsgType.CGYL_LQ, sf.getCallBack, sf);
		cr.remove(Enum_MsgType.CGYL_LQ1, sf.getCallBack1, sf);
		sf.n5.removeClickListener(sf.getAwardsHD, sf);
		GGlobal.layerMgr.close(UIConst.CHUANGGUANYOULI);

		// IconUtil.setImg(sf.imgBody, null);
		// IconUtil.setImg(sf.n22, null);
		for (let i = 0; i < 4; i++) {
			let item = sf.itemVec[i];
			item.clean();
		}
		if (this.effPart) {
			this.effPart.mc.scaleX = this.effPart.mc.scaleY = 1;
			EffectMgr.instance.removeEff(this.effPart);
			this.effPart = null;
		}
	}

	public static isGuide: boolean = false;
	public static step: any;
	public guideDraw(step) {
		let m = GGlobal.modelChuangGuanYL;
		let sf = this;
		let index: number = 0;
		for (let i = 0; i < 4; i++) {
			let item = sf.itemVec[i];
			if (item.btnGet.visible) {
				index++;
				GuideStepManager.instance.showGuide(item.btnGet, item.btnGet.width / 2, item.btnGet.height / 2);
				GuideStepManager.instance.showGuide1(step.source.index, item.btnGet, item.btnGet.width / 2, 0, -90, -106, -100);
				break;
			}
		}
		if (m.currentTargetST == 1 && index == 0) {
			GuideStepManager.instance.showGuide(sf.n5, sf.n5.width / 2, sf.n5.height / 2);
			GuideStepManager.instance.showGuide1(step.source.index, sf.n5, sf.n5.width / 2, sf.n5.height, 90, -106, 35);
			sf.n5.parent.setChildIndex(sf.n5, sf.n5.parent.numChildren - 1);
		}
	}

	public guideClosePanel(step) {
		let btn = this.closeButton.asButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}
}