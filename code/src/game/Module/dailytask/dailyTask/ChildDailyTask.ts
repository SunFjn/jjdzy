/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildDailyTask extends fairygui.GComponent {

	public lst: fairygui.GList;
	public box0: DailyBaoXiang;
	public box1: DailyBaoXiang;
	public box2: DailyBaoXiang;
	public box3: DailyBaoXiang;
	public progress: fairygui.GProgressBar;
	public lb0: fairygui.GRichTextField;
	public lb1: fairygui.GRichTextField;
	public lb2: fairygui.GRichTextField;
	public lb3: fairygui.GRichTextField;

	public static URL: string = "ui://b3p8szvvtw1l5";

	public static createInstance(): ChildDailyTask {
		return <ChildDailyTask><any>(fairygui.UIPackage.createObject("dailytask", "ChildDailyTask"));
	}

	public constructor() {
		super();
	}

	private boxs: DailyBaoXiang[];
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s =this;

		s.lst = <fairygui.GList><any>(s.getChild("lst"));
		s.box0 = <DailyBaoXiang><any>(s.getChild("box0"));
		s.box1 = <DailyBaoXiang><any>(s.getChild("box1"));
		s.box2 = <DailyBaoXiang><any>(s.getChild("box2"));
		s.box3 = <DailyBaoXiang><any>(s.getChild("box3"));
		s.progress = <fairygui.GProgressBar><any>(s.getChild("progress"));
		s.lb0 = <fairygui.GRichTextField><any>(s.getChild("lb0"));
		s.lb1 = <fairygui.GRichTextField><any>(s.getChild("lb1"));
		s.lb2 = <fairygui.GRichTextField><any>(s.getChild("lb2"));
		s.lb3 = <fairygui.GRichTextField><any>(s.getChild("lb3"));

		s.boxs = [];
		s.progress.max = 250;
		s.lst.callbackThisObj = s;
		s.lst.itemRenderer = s.listRender;

		let lib = Config.baoxiang_708;
		for(let i=0; i < 4; i++){
			s.boxs.push(s["box"+i]);
			let hy = lib[i+1].condition;
			s["lb"+i].text = "活跃度"+hy;
			s.boxs[i].idx = i+1;
			s.progress.max = hy;
		}
	}

	private listRender(index, obj) {
		var m = GGlobal.modeltask;
		var d = m.data;
		var bx: DailyItem = obj as DailyItem;
		bx.setVO(d[index]);
	}

	private onUpdate(arg) {
		if (arg == 0) {//init


		} else if (arg == 1) {//领取奖励成功

		} else if (arg == 2) {//宝箱成功

		}
		this.update();
	}

	private update() {
		var m = GGlobal.modeltask;
		this.lst.numItems = m.data.length;
		var d = m.boxData;
		this.progress.value = m.huoyuedu;
		for (var i = 1; i < 5; i++) {
			var b: DailyBaoXiang = this.boxs[i - 1];
			b.update(d[i]);
		}
	}

	open() {
		var m = GGlobal.modeltask;
		m.CG_INFO_1051();

		var c = GGlobal.control;
		c.listen(Enum_MsgType.MSG_TASK_UP, this.onUpdate, this);
	}

	hide() {
		var c = GGlobal.control;
		c.remove(Enum_MsgType.MSG_TASK_UP, this.onUpdate, this);
		this.lst.numItems = 0;
	}
}