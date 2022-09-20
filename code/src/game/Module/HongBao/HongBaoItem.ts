class HongBaoItem extends fairygui.GComponent {

	public btnGet: fairygui.GButton;
	public hbNameLb: fairygui.GRichTextField;
	public iconYuanBao: fairygui.GLoader;
	public residueLab: fairygui.GRichTextField;
	public canGetGroup: fairygui.GGroup;
	public labCheck: fairygui.GRichTextField;
	public lbRob: fairygui.GRichTextField;
	public qiangdao: fairygui.GGroup;
	public qiangguang: fairygui.GRichTextField;
	public hasGetGroup: fairygui.GGroup;
	public lbName: fairygui.GRichTextField;
	public viewHead: ViewHead;

	public static URL: string = "ui://s01exr8xqz021";

	public static createInstance(): HongBaoItem {
		return <HongBaoItem><any>(fairygui.UIPackage.createObject("HongBao", "HongBaoItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public vo: Vo_HongBao;
	public setVo(vo: Vo_HongBao) {
		let self = this;
		self.vo = vo;
		self.canGetGroup.visible = vo.robNum == 0 && vo.drawNum < Model_HongBao.max;
		self.hasGetGroup.visible = vo.drawNum >= Model_HongBao.max || vo.robNum > 0;
		self.viewHead.setdata(vo.headId, -1, "", 0, false, vo.frameId, 0);
		self.lbName.text = vo.name;
		if (vo.robNum == 0 && vo.drawNum < Model_HongBao.max) {
			self.hbNameLb.text = vo.hbName;
			self.residueLab.text = ConfigHelp.reTxt("剩余个数：{0}/{1}", Model_HongBao.max - vo.drawNum, Model_HongBao.max);
		} else {
			self.qiangguang.visible = vo.drawNum >= Model_HongBao.max && vo.robNum <= 0;
			self.qiangdao.visible = vo.robNum > 0;
			self.lbRob.text = vo.robNum + "";
		}
		self.btnGet.addClickListener(self.OnGet, self);
		self.labCheck.addClickListener(self.OnLook, self);
	}

	private OnLook(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.HONGBAO_RECORD, this.vo);
	}

	private OnGet() {
		GGlobal.modelHB.CG_RedBoxAct_getBox_11765(this.vo.id);
	}

	public clean() {
		let self = this;
		self.btnGet.removeClickListener(self.OnGet, self);
		self.labCheck.removeClickListener(self.OnLook, self);
	}
}