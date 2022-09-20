class ChildHomeTask extends fairygui.GComponent {

	public lst: fairygui.GList;
	public box0: fairygui.GButton;
	public box1: fairygui.GButton;
	public box2: fairygui.GButton;
	public box3: fairygui.GButton;
	public progress: fairygui.GProgressBar;
	public lb0: fairygui.GRichTextField;
	public lb1: fairygui.GRichTextField;
	public lb2: fairygui.GRichTextField;
	public lb3: fairygui.GRichTextField;

	public static URL: string = "ui://oy62ymetd8t62";

	private boxs: ItemHomeTaskBao[];

	public static createInstance(): ChildHomeTask {
		return <ChildHomeTask><any>(fairygui.UIPackage.createObject("homeTask", "ChildHomeTask"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);

		s.lst.callbackThisObj = s;
		s.lst.itemRenderer = s.renderHandle;
		s.lst.setVirtual()

		s.boxs = [];
		let lib = Config.fdrcbx_019;
		for (let i = 0; i < 4; i++) {
			s.boxs.push(s["box" + i]);
			let hy = lib[i + 1].cs;
			s["lb" + i].text = "完成任务" + hy + "个";
			s.boxs[i].idx = i + 1;
			s.progress.max = hy;
		}
	}

	public show() {
		let s = this;
		let m = GGlobal.model_HomeTask
		m.CG_OPEN_DAYTASK_11407();
		s.registerEvent(true)
	}

	public hide(){
		let s = this;
		s.lst.numItems = 0;
		s.registerEvent(false)
	}

	/**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag 
     */
	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.model_HomeTask.register(pFlag, Model_HomeTask.OPEN_TASK, self.upView, self);
	}

	private upView(){
		let s = this;
		let m = GGlobal.model_HomeTask
		s._lstDat = m.data
		s.lst.numItems = s._lstDat.length;
		let huoyuedu = 0;
		for (let i = 0; i < s._lstDat.length; i++) {
			if (s._lstDat[i].state > 0) {
				huoyuedu++;
			}
		}
		var d = m.boxData;
		this.progress.value = huoyuedu;
		for (var i = 1; i < 5; i++) {
			var b: ItemHomeTaskBao = this.boxs[i - 1];
			b.update(d[i]);
		}
	}

	private _lstDat: Vo_HomeTask[]
	private renderHandle(index: number, obj: ItemHomeTask): void {
		let a = this;
		obj.vo = a._lstDat[index];
	}
}