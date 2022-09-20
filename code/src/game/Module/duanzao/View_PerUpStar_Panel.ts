class View_PerUpStar_Panel extends UIModalPanel {
	public closeBt: fairygui.GButton;
	public upStar: Button0;
	public countLb: ViewResource;

	public static URL: string = "ui://pofv8989tlm32e";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("DuanZao", "View_PerUpStar_Panel").asCom;
		a.contentPane = a.view;
		a.upStar = <Button0><any>(a.view.getChild("upStar"));
		a.countLb = <ViewResource><any>(a.view.getChild("countLb"));
		super.childrenCreated();
		a.upStar.addClickListener(a.upHandle, this);
	}

	private upHandle(): void {
		if (this.upStar.checkNotice) {
			GGlobal.modelDuanZao.CG_DUANZAO_UPSTAR_PERFECT(this.vo.type);
		} else {
			let cfg = Config.dzstar_209[this.vo.starLv];
			if (cfg.consume1 != "0") {
				View_CaiLiao_GetPanel.show(this._costItem);
			} else {
				ViewCommonWarn.text("已满星");
			}
		}
	}

	private vo: VoEquip;
	private _costItem: VoItem
	public updateShow(): void {
		let a = this;
		a.vo = a._args;
		let cfg = Config.dzstar_209[a.vo.starLv];
		if (cfg.consume1 == "0") {
			a.countLb.setCount("已满星");
			a.countLb.setImgUrl();
			a.upStar.checkNotice = false;
			a.upStar.enabled = false;
		} else {
			let costArr = JSON.parse(cfg.consume1);
			this._costItem = VoItem.create(costArr[0][1]);
			let count = Model_Bag.getItemCount(costArr[0][1])
			a.countLb.setLb(count, costArr[0][2]);
			a.countLb.setImgUrl(this._costItem.icon);
			a.upStar.checkNotice = count >= costArr[0][2];
			a.upStar.enabled = true;
		}
	}

	protected onShown(): void {
		let a = this;
		a.updateShow();
		GGlobal.reddot.listen(ReddotEvent.CHECK_DAUNZAO, a.updateShow, a);
	}

	protected onHide(): void {
		let a = this;
		GGlobal.layerMgr.close(UIConst.DUANZAO_STAR_PERFECT);
		GGlobal.reddot.remove(ReddotEvent.CHECK_DAUNZAO, a.updateShow, a);
	}
}