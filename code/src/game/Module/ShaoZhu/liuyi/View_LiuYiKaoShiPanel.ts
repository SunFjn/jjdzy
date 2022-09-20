class View_LiuYiKaoShiPanel extends UIModalPanel {

	public frame: fairygui.GLabel;
	public btn: Button1;
	public list: fairygui.GList;
	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://p83wyb2bad1l1z";

	public static createInstance(): View_LiuYiKaoShiPanel {
		return <View_LiuYiKaoShiPanel><any>(fairygui.UIPackage.createObject("ShaoZhu", "View_LiuYiKaoShiPanel"));
	}

	public constructor() {
		super();
		this.loadRes("ShaoZhu", "ShaoZhu_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("ShaoZhu");
		let s = this
		s.view = fairygui.UIPackage.createObject("ShaoZhu", "View_LiuYiKaoShiPanel").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		s.list.itemRenderer = s.renderHander;
		s.list.callbackThisObj = s;
		super.childrenCreated();
	}

	private _xtVo: Vo_LiuYi//学堂
	public onShown() {
		let s = this;
		s._xtVo = s._args as Vo_LiuYi
		s.updateShow();
		s.registerEvent(true);
	}

	protected onHide() {
		let s = this;
		s.registerEvent(false);
		s.list.numItems = 0;
	}

	private registerEvent(pFlag: boolean): void {
		let m = GGlobal.model_LiuYi
		let self = this;
		EventUtil.register(pFlag, self.btn, egret.TouchEvent.TOUCH_TAP, self.onClick, self);
		m.register(pFlag, Model_LiuYi.KAOSHI, self.upKaoShi, self);
	}

	private onClick() {
		let s = this;
		for (let i = 0; i < s._lyArr.length; i++) {
			if (s._lyArr[i].st == 0) {
				ViewCommonWarn.text("全部合格后可进修下一学堂");
				return;
			}
		}
		GGlobal.model_LiuYi.CG_EDUCAT_5129(s._xtVo.szId)
		s.closeEventHandler(null);
	}
	private _openSix
	private _lyArr: Vo_LiuYi_LY[]
	private updateShow() {
		let s = this;
		s._lyArr = []
		let school = s._xtVo.cfg
		s._openSix = s._xtVo.openSix
		//能进修
		let educat = true;
		//概率
		let ks: number[][] = null
		if (school.ks != "0") {
			ks = JSON.parse(school.ks);
		}
		for (let i = 0; i < s._xtVo.lyArr.length; i++) {
			let ly = s._xtVo.lyArr[i];
			if (s._openSix[ly.lyId]) {
				s._lyArr.push(ly);
				ly.ks = ks ? ks[i][1] : 0
				if (ly.st == 0) {
					educat = false
				}
			}
		}
		s.list.numItems = s._lyArr.length;
		s.btn.checkNotice = educat
	}

	private upKaoShi(ly: Vo_LiuYi_LY) {
		let s = this;
		let educat = true;
		for (let i = 0; i < s._lyArr.length; i++) {
			if (s._lyArr[i].lyId == ly.lyId) {
				s._lyArr[i].st = ly.st
			}
			if (s._lyArr[i].st == 0) {
				educat = false
			}
		}
		s.list.numItems = s._lyArr.length;
		s.btn.checkNotice = educat
	}

	private renderHander(idx, obj: ItemLiuYiKaoShi) {
		let s = this;
		obj.setVo(s._lyArr[idx], s._xtVo);
	}
}