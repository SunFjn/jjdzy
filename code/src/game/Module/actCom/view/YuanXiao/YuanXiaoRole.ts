class YuanXiaoRole extends fairygui.GComponent {
	public ldImg: fairygui.GImage;
	public container: EmptyComp;
	public nameLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public ldBt: fairygui.GButton;
	public promptGroup: fairygui.GGroup;
	public dataGroup: fairygui.GGroup;

	public static URL: string = "ui://ajaichn8wtx2q";

	public static createInstance(): YuanXiaoRole {
		return <YuanXiaoRole><any>(fairygui.UIPackage.createObject("ActCom_YuanXiao", "YuanXiaoRole"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public type = 0;
	public vo: { id: number, name: string, power: number, weapon: number, job: number, ride: number, surNum: number, state: number };
	public setVo(type: number, vo: { id: number, name: string, power: number, weapon: number, job: number, ride: number, surNum: number, state: number }) {
		let self = this;
		if (vo) {
			self.promptGroup.visible = false;
			self.dataGroup.visible = true;
			self.ldImg.visible = vo.state == 1;
			self.container.setUIRole(vo.job, vo.weapon, vo.ride);
			self.powerLb.text = vo.power + "";
			self.nameLb.text = vo.name;
			self.ldBt.visible = vo.state == 0;
			self.ldBt.addClickListener(self.OnLD, self);
		} else {
			self.promptGroup.visible = true;
			self.dataGroup.visible = false;
			self.container.setUIRole(1, 0, 0, 100001);
		}
	}

	private OnLD() {
		let self = this;
		GGlobal.modelyuanxiao.CG_YuanXiaoLocal_battleHid_11633(self.type, self.vo.id);
	}

	public clean() {
		let self = this;
		self.container.setUIRole(null);
	}
}