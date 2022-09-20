/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class WenDingTXNamePlug extends fairygui.GComponent {

	public hpbar: fairygui.GProgressBar;
	public nameLb: fairygui.GRichTextField;
	public imgYuXi: fairygui.GLoader;
	public jxLb: fairygui.GRichTextField;
	public imgFlag: fairygui.GLoader;

	public static URL: string = "ui://gxs8kn67fl2h3";
	private static POOL = [];
	public static create(): WenDingTXNamePlug {
		return WenDingTXNamePlug.POOL.length ? WenDingTXNamePlug.POOL.pop() : WenDingTXNamePlug.createInstance();
	}
	public autoRemove = true;
	public static createInstance(): WenDingTXNamePlug {
		return <WenDingTXNamePlug><any>(fairygui.UIPackage.createObject("wendingTX", "WenDingTXNamePlug"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.hpbar = <fairygui.GProgressBar><any>(this.getChild("hpbar"));
		this.nameLb = <fairygui.GRichTextField><any>(this.getChild("nameLb"));
		this.imgYuXi = <fairygui.GLoader><any>(this.getChild("imgYuXi"));
		this.jxLb = <fairygui.GRichTextField><any>(this.getChild("jxLb"));
		this.imgFlag = <fairygui.GLoader><any>(this.getChild("imgFlag"));

		this.hpbar.max = 100;
	}

	public setJiFen(val) {
		this.jxLb.text = "击杀积分：" + val;
	}

	public setHp(val) {
		this.hpbar.value = val;
	}

	public setYuxi(val) {
		this.imgYuXi.visible = val;
	}

	public setChaoShen(val) {
		let cfgs = Config.wdtxlz_260;
		let legendary = cfgs[2].reward;
		let doublkill = cfgs[1].reward;
		this.imgFlag.visible = val >= doublkill;
		this.imgFlag.url = val >= legendary?"ui://gxs8kn67cg2io":"ui://gxs8kn67cg2if";
		this.algin();
	}

	public setName(val) {
		this.nameLb.text = val;
	}

	public algin(){
		this.imgYuXi.y =this.imgFlag.visible? -94:-64
	}

	public update() {
	}

	public role: ArpgRole;
	public onAdd() {
		this.imgYuXi.visible = false;
		this.imgFlag.visible = false;
		this.jxLb.text = "击杀积分：0";
		this.nameLb.text = this.role.name;
		this.nameLb.color = Model_player.isMineID(this.role.id) ? Color.GREENINT : Color.REDINT;
		this.setHp(100);
		this.role.headGroup.addChild(this.displayObject);
	}
	public onRemove() {
		let a = this;
		a.role.headGroup.removeChild(a.displayObject);
		WenDingTXNamePlug.POOL.push(this);
	}

}