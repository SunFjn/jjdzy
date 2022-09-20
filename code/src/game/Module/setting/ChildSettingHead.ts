class ChildSettingHead extends fairygui.GComponent {

	public listHead: fairygui.GList;
	public lab1: fairygui.GTextField;
	public listFrame: fairygui.GList;
	public lab2: fairygui.GTextField;
	public labHead: fairygui.GTextField;
	public labFrame: fairygui.GTextField;
	public labOperate: fairygui.GTextField;
	public checkBox: fairygui.GButton;
	public btnChange: fairygui.GButton;
	public vhead: VSettingHeadTop;

	public static URL: string = "ui://dt6yws4jg30n2";

	public static createInstance(): ChildSettingHead {
		return <ChildSettingHead><any>(fairygui.UIPackage.createObject("setting", "ChildSettingHead"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.listHead = <fairygui.GList><any>(this.getChild("listHead"));
		this.lab1 = <fairygui.GTextField><any>(this.getChild("lab1"));
		this.listFrame = <fairygui.GList><any>(this.getChild("listFrame"));
		this.lab2 = <fairygui.GTextField><any>(this.getChild("lab2"));
		this.labHead = <fairygui.GTextField><any>(this.getChild("labHead"));
		this.labFrame = <fairygui.GTextField><any>(this.getChild("labFrame"));
		this.labOperate = <fairygui.GTextField><any>(this.getChild("labOperate"));
		this.checkBox = <fairygui.GButton><any>(this.getChild("checkBox"));
		this.btnChange = <fairygui.GButton><any>(this.getChild("btnChange"));
		this.vhead = <VSettingHeadTop><any>(this.getChild("vhead"));

		this.listHead.itemRenderer = this.renderHead;
		this.listHead.callbackThisObj = this;
		this.listHead.setVirtual();
		this.listFrame.itemRenderer = this.renderFrame;
		this.listFrame.callbackThisObj = this;
		this.listFrame.setVirtual();
		this.vhead.touchable = false;
	}

	public addListen(): void {
		this.checkBox.addEventListener(fairygui.StateChangeEvent.CHANGED, this.onChanged, this);
		this.listHead.addEventListener(fairygui.ItemEvent.CLICK, this.onClickHead, this);
		this.listFrame.addEventListener(fairygui.ItemEvent.CLICK, this.onClickFrame, this);
		GGlobal.control.listen(Enum_MsgType.SETTING_HIDE_COUNTRY, this.upCountry, this)
		this.btnChange.addClickListener(this.onChange, this);
	}

	public removeListen(): void {
		this.checkBox.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.onChanged, this);
		this.listHead.removeEventListener(fairygui.ItemEvent.CLICK, this.onClickHead, this);
		this.listFrame.removeEventListener(fairygui.ItemEvent.CLICK, this.onClickFrame, this);
		GGlobal.control.remove(Enum_MsgType.SETTING_HIDE_COUNTRY, this.upCountry, this)
		this.btnChange.removeClickListener(this.onChange, this);
	}

	private _headVo = null
	private _frameVo = null
	public update(): void {
		this.checkBox.selected = Model_Setting.showCamp == 1;
		this._headVo = Config.shezhi_707[Model_Setting.headId]
		this._frameVo = Config.shezhi_707[Model_Setting.frameId]
		this.listFrame.numItems = Model_Setting.frameList.length;
		var frameSelected = 0
		for (let i = 0; i < Model_Setting.frameList.length; i++) {
			if (Model_Setting.frameList[i].id == Model_Setting.frameId) {
				frameSelected = i;
				break;
			}
		}
		this.listFrame.selectedIndex = frameSelected;
		this.listFrame.scrollToView(Math.floor(frameSelected / 4) * 4);
		this.frameId = Model_Setting.frameList[frameSelected];

		this.listHead.numItems = Model_Setting.headList.length;
		var headSelected = 0
		for (let i = 0; i < Model_Setting.headList.length; i++) {
			if (Model_Setting.headList[i].id == Model_Setting.headId) {
				headSelected = i;
				break;
			}
		}
		this.listHead.selectedIndex = headSelected;
		this.listHead.scrollToView(Math.floor(headSelected / 4) * 4);
		this.headId = Model_Setting.headList[headSelected]
		this.upCountry()
	}

	private renderHead(index: number, obj: fairygui.GObject): void {
		var item: VSettingHead = obj as VSettingHead;
		item.vo = Model_Setting.headList[index];
	}

	private renderFrame(index: number, obj: fairygui.GObject): void {
		var item: VSettingHead = obj as VSettingHead;
		item.vo = Model_Setting.frameList[index];
	}

	private onClickHead(e: fairygui.ItemEvent): void {
		var selectHead = e.itemObject as VSettingHead
		if (selectHead.isLocked) {
			this.lockedCondition(selectHead.vo)
			this.headId = selectHead.vo
		} else {
			this.headId = selectHead.vo
		}
	}

	private onClickFrame(e: fairygui.ItemEvent): void {
		var selectFrame = e.itemObject as VSettingHead
		if (selectFrame.isLocked) {
			this.lockedCondition(selectFrame.vo)
			this.frameId = selectFrame.vo
		} else {
			this.frameId = selectFrame.vo
		}
	}

	private lockedCondition(vo): void {
		let conditionArr = ConfigHelp.SplitStr(vo.condition)
		let condition0 = Number(conditionArr[0][0])
		let condition1 = Number(conditionArr[0][1])
		if (condition0 == 1) {
			ViewCommonWarn.text("VIP" + condition1 + "激活")
		} else if (condition0 == 2) {
			let item: VoItem = VoItem.create(condition1)
			ViewCommonWarn.text("获取道具" + item.name + "激活")
		} else if (condition0 == 3) {
			ViewCommonWarn.text(vo.need)
		}else if (condition0 == 4) {//侍女
			ViewCommonWarn.text(vo.need)
		}
	}

	private onChange(): void {
		if (Model_Setting.frameIdArr.indexOf(Number(this._frameVo.id)) == -1) {
			ViewCommonWarn.text("未激活")
			return;
		}
		if (Model_Setting.headIdArr.indexOf(Number(this._headVo.id)) == -1) {
			ViewCommonWarn.text("未激活")
			return;
		}
		if (this._frameVo.id != Model_Setting.frameId || this._headVo.id != Model_Setting.headId) {
			GGlobal.modelSetting.CGChangeIcon(this._headVo.id, this._frameVo.id)
		}
	}

	public set frameId(v) {
		this._frameVo = v
		this.vhead.vo = { head: this._headVo ? this._headVo.picture : "", frame: v.picture };
		var actStr = ""
		if (Model_Setting.frameIdArr.indexOf(Number(v.id)) == -1) {
			actStr = "[color=#ff0000](未激活)[/color]"
		} else {
			actStr = "[color=#12F60D](已激活)[/color]"
		}
		this.labFrame.text = "头像框:[color=#EEC315]【" + v.name + "】[/color]" + actStr
	}

	public set headId(v) {
		this._headVo = v
		this.vhead.vo = { head: v.picture, frame: this._frameVo ? this._frameVo.picture : "" };
		var actStr = ""
		if (Model_Setting.headIdArr.indexOf(Number(v.id)) == -1) {
			actStr = "[color=#ff0000](未激活)[/color]"
		} else {
			actStr = "[color=#12F60D](已激活)[/color]"
		}
		this.labHead.text = "头像:[color=#EEC315]【" + v.name + "】[/color]" + actStr
	}

	private onChanged(e): void {
		Model_Setting.showCamp = this.checkBox.selected ? 1 : 0
		GGlobal.modelSetting.CGOperateCountry(Model_Setting.showCamp);
		GGlobal.control.notify(Enum_MsgType.SETTING_HIDE_COUNTRY)
		ViewCommonWarn.text("更改成功");
	}

	private upCountry(): void {
		this.vhead.showCountry(Model_Setting.showCamp ? false : true)
	}
}