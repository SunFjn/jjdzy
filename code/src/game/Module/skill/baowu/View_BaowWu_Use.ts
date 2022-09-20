class View_BaowWu_Use extends UIModalPanel {

	public grid0: ViewBWGrid;
	public grid1: ViewBWGrid;
	public useBt0: Button1;
	public useBt1: Button1;
	public image0: fairygui.GImage;
	public image1: fairygui.GImage;

	public static URL: string = "ui://3tzqotadqqvu27";

	public constructor() {
		super();
		let a = this;
		a.isShowOpenAnimation = false;
		a.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("role", "View_BaowWu_Use").asCom;
		a.contentPane = a.view;
		CommonManager.parseChildren(a.view, a);
		a.grid0.isShow = false;
		a.grid1.isShow = false;
		a.useBt0.data = 1;
		a.useBt1.data = 2;
		super.childrenCreated();
		a.useBt0.addClickListener(a.useHandle, this);
		a.useBt1.addClickListener(a.useHandle, this);
	}

	private useHandle(event: egret.TouchEvent) {
		let a = this;
		let index = event.target.data;
		let vo: Vo_BaoWu = a._args;
		if (vo.id != Model_BaoWu.equipBWIDArr[index - 1]) {
			GGlobal.modelbw.CG_CHANGE_BAOWU(index, vo.id);
			a.doHideAnimation();
		} else {
			ViewCommonWarn.text("当前宝物已装备");
		}
	}

	private updateShow(): void {
		let a = this;
		a.image0.visible = true;
		a.image1.visible = true;
		if (Model_BaoWu.equipBWIDArr[0] > 0) {
			a.useBt0.checkNotice = false;
			let vo = Model_BaoWu.baowuArr[0];
			a.grid0.vo = vo;
			a.image0.visible = false;
			if (Model_BaoWu.equipBWIDArr[1] > 0) {
				let vo = Model_BaoWu.baowuArr[1];
				a.grid1.vo = vo;
				a.image1.visible = false;
				a.useBt1.checkNotice = false;
			} else {
				a.grid1.vo = null;
				a.useBt1.checkNotice = Model_BaoWu.checkChangeBtNotice(1);
			}
		} else {
			a.grid0.vo = null;
			a.useBt0.checkNotice = Model_BaoWu.checkChangeBtNotice(0);
			if (Model_BaoWu.equipBWIDArr[1] > 0) {
				let vo = Model_BaoWu.baowuArr[0];
				a.grid1.vo = vo;
				a.image1.visible = false;
				a.useBt1.checkNotice = false;
			} else {
				a.grid1.vo = null;
				a.useBt1.checkNotice = Model_BaoWu.checkChangeBtNotice(1);
			}
		}
	}

	protected onShown(): void {
		let a = this;
		a.updateShow();
		GGlobal.control.listen(Enum_MsgType.BAOWU_DATA_UPDATE, a.updateShow, a);
	}

	protected onHide(): void {
		let a = this;
		GGlobal.layerMgr.close(UIConst.BAOWU_EQUIP);
		GGlobal.control.remove(Enum_MsgType.BAOWU_DATA_UPDATE, a.updateShow, a);
	}

	public guide_equip_baowu(step) {
		let a = this;
		if (!a.grid0.vo) {
			GuideStepManager.instance.showGuide(a.useBt0, a.useBt0.width / 2, a.useBt0.height / 2);
			GuideStepManager.instance.showGuide1(step.source.index, a.useBt0, a.useBt0.width / 2, a.useBt0.height, 90, -106, 35);
		} else {
			GuideStepManager.instance.showGuide(a.useBt1, a.useBt1.width / 2, a.useBt1.height / 2);
			GuideStepManager.instance.showGuide1(step.source.index, a.useBt1, a.useBt1.width / 2, a.useBt1.height, 90, -106, 35);
		}
	}
}