/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildPersonalBoss extends fairygui.GComponent {

	//>>>>start
	public lst: fairygui.GList;
	public btnSweep: Button1;
	//>>>>end

	public static URL: string = "ui://47jfyc6etujy0";

	public static createInstance(): ChildPersonalBoss {
		return <ChildPersonalBoss><any>(fairygui.UIPackage.createObject("Boss", "ChildPersonalBoss"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.open();
	}

	closePanel(pData?: any) {
		this.close();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);

		this.lst.callbackThisObj = this;
		this.lst.itemRenderer = this.itemRender;
		this.lst.setVirtual();
	}

	private sweep() {
		var ret = false;
		var m = GGlobal.modelBoss;
		this.bossData = m.personalData;
		this.len = m.personalData.length;
		for (var i = 0; i < this.len; i++) {
			if (this.bossData[i].getClearSt()) {
				ret = true;
				break;
			}
		}
		if (ret) GGlobal.modelBoss.CG_SWEEP_1257();
		else ViewCommonWarn.text("没有可扫荡的副本");
	}

	private bossData: any[] = [];
	private itemRender(index, obj) {
		var item: PersonalItem = obj as PersonalItem;
		item.setData(this.bossData[index]);
	}

	private updateTime() {
		for (var i = 0; i < this.len; i++) {
			if (i < this.lst.numChildren) {
				(this.lst.getChildAt(i) as PersonalItem).updateTime();
			}
		}
	}

	private update() {
		var m = GGlobal.modelBoss;
		this.bossData = m.personalData;
		this.len = m.personalData.length;
		this.lst.numItems = this.len;
		if (this.guideHandler) {
			this.guideHandler.run();
			this.guideHandler = null;
		}
	}

	private time = 0;
	private len;
	public open() {
		if (!(Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
			this.lst.setVirtual();
		}
		GGlobal.modelBoss.CG_DATA_1251();
		this.updateTime();
		Timer.instance.listen(this.updateTime, this, 500, 0, false);
		this.btnSweep.addClickListener(this.sweep, this);
		GGlobal.control.listen(Enum_MsgType.MSG_PBOSS_UI_UPDATE, this.update, this);
	}

	public close() {
		this.lst.numItems = 0;
		Timer.instance.remove(this.updateTime, this);
		this.btnSweep.removeClickListener(this.sweep, this);
		GGlobal.control.remove(Enum_MsgType.MSG_PBOSS_UI_UPDATE, this.update, this);
	}

	public guideHandler: Handler;
	public setGuide(hd) {
		this.guideHandler = hd;
		if (this.lst.numItems > 0) {
			if (this.guideHandler) {
				this.guideHandler.run();
				this.guideHandler = null;
			}
		}
	}

	public guide_DRBOSS_battle(step) {
		let self = this;
		if (self.lst._children.length > 0) {
			let item: PersonalItem = self.lst._children[0] as PersonalItem;
			GuideStepManager.instance.showGuide(item.btnFight, item.btnFight.width / 2, item.btnFight.height / 2);
			GuideStepManager.instance.showGuide1(step.source.index, item.btnFight, 0, item.btnFight.height / 2, 180, -250, -35);
			if (item.btnFight.parent) item.btnFight.parent.setChildIndex(item.btnFight, item.btnFight.parent.numChildren - 1);
		}
	}
}