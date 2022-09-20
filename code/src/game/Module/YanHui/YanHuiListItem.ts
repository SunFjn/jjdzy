class YanHuiListItem extends fairygui.GComponent {

	public head: ViewHead;
	public goBt: Button1;
	public numLb: fairygui.GRichTextField;
	public stateLb: fairygui.GRichTextField;
	public stateImg: fairygui.GImage;
	public applyImg: fairygui.GImage;
	public backImg: fairygui.GLoader;

	public static URL: string = "ui://4x7dk3lhh7qe1";

	public static createInstance(): YanHuiListItem {
		return <YanHuiListItem><any>(fairygui.UIPackage.createObject("YanHui", "YanHuiListItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public vo: Vo_YanHui;
	public setVo(vo: Vo_YanHui) {
		let self = this;
		self.vo = vo;
		let cfg = Config.party_298[vo.type];
		self.numLb.text = ConfigHelp.reTxt("参与人数：{0}", vo.num + "/" + cfg.num);
		self.stateImg.visible = self.stateLb.visible = true;
		if (vo.id == GGlobal.modelYanHui.yanHuiID) {
			self.stateLb.text = "参与中";
			self.goBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.YANHUI);
		} else if (vo.num >= cfg.num) {
			self.stateLb.text = "已满员";
		} else {
			self.stateImg.visible = self.stateLb.visible = false;
		}
		IconUtil.setImg(self.backImg, Enum_Path.YANHUI_URL + "type" + vo.type + ".png");
		self.head.setdata(vo.head, 0, vo.roleName, 0, false, vo.framePic);
		if (vo.id == GGlobal.modelYanHui.yanHuiID) {
			self.goBt.visible = true;
			self.applyImg.visible = false;
			self.goBt.text = "前往";
		} else {
			self.applyImg.visible = vo.isApply == 1;
			self.goBt.visible = vo.isApply != 1;
			self.goBt.text = vo.isApply == 0 ? "申请" : "前往";
		}
		self.goBt.addClickListener(self.OnGo, self);
	}

	private OnGo() {
		let self = this;
		let model = GGlobal.modelYanHui;
		let cfg = Config.party_298[self.vo.type];
		if (model.yanHuiID > 0 && self.vo.id != model.yanHuiID) {
			return ViewCommonWarn.text("同一时间只能参加一场宴会");
		} else if (self.vo.id != model.yanHuiID && self.vo.num >= cfg.num) {
			ViewCommonWarn.text("已满员");
			return;
		}
		if (self.vo.isApply == 0 && self.vo.id != model.yanHuiID) {
			model.CG11479(self.vo.id, 1);
		} else {
			if (self.vo.id == model.yanHuiID) {
				YanHuiManager.getInstance().enter();
				model.CG_House_openHouseUI_11453();
				return;
			}
			GGlobal.layerMgr.open(UIConst.YANHUI_FUYAN, self.vo);
		}
	}

	public clean() {
		let self = this;
		self.goBt.removeClickListener(self.OnGo, self);
		IconUtil.setImg(self.backImg, null);
	}
}