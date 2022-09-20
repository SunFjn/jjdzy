class Child_ActHolyBMuBiao extends fairygui.GComponent implements IActHolyBeast {

	public c1: fairygui.Controller;
	public imgHeadbg: fairygui.GLoader;
	public list: fairygui.GList;
	public labTime: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;

	public static URL: string = "ui://d5y9ngt6v10mm";

	public static createInstance(): Child_ActHolyBMuBiao {
		return <Child_ActHolyBMuBiao><any>(fairygui.UIPackage.createObject("actHolyBeast", "Child_ActHolyBMuBiao"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getController("c1");
		this.imgHeadbg = <fairygui.GLoader><any>(this.getChild("imgHeadbg"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.labTime = <fairygui.GRichTextField><any>(this.getChild("labTime"));
		this.labTips = <fairygui.GRichTextField><any>(this.getChild("labTips"));
		this._tabArr = []
		for (let i = 0; i < 4; i++) {
			this._tabArr.push(<fairygui.GButton><any>(this.getChild("tab" + i)))
		}
		this.list.itemRenderer = this.renderHandle
		this.list.callbackThisObj = this;
	}

	private static _instance: Child_ActHolyBMuBiao
	public static get instance(): Child_ActHolyBMuBiao {
		if (Child_ActHolyBMuBiao._instance == null) {
			Child_ActHolyBMuBiao._instance = Child_ActHolyBMuBiao.createInstance();
		}
		return Child_ActHolyBMuBiao._instance
	}

	private _listData: Array<Vo_HuoDong>
	private _hid: number
	private _act: Vo_Activity
	private _tabArr: fairygui.GButton[]

	public show(p: fairygui.GComponent, id) {
		let s = this;
		s.visible = true;
		s._hid = id;
		Timer.instance.listen(s.upTimer, s, 1000);
		s.c1.selectedIndex = 0;
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selHandle, s)
		p.addChild(s);
		s.setXY(0, 257);
		s.upView();
		s.checkTab();
		GGlobal.reddot.listen(UIConst.ACTHB_MUBIAO, s.checkTab, s);
		GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_MUBIAO, s.upView, s);
		GGlobal.modelEightLock.CG4571(id);
		IconUtil.setImg1(Enum_Path.PIC_URL + "bar" + Config.xitong_001[id].icon + ".jpg", s.imgHeadbg);
	}

	public disposePanel() {
		let s = this;
		if (s.parent) {
			s.parent.removeChild(s);
		}
		Timer.instance.remove(s.upTimer, s);
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGE, s.selHandle, s)
		GGlobal.reddot.remove(UIConst.ACTHB_MUBIAO, s.checkTab, s);
		GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_MUBIAO, s.upView, s);
		s.list.numItems = 0;
		IconUtil.setImg1(null, s.imgHeadbg);
	}

	public dispose() {
		Child_ActHolyBMuBiao._instance = null;
		super.dispose();
	}

	private upView() {
		this._act = ModelEightLock.getActVo(this._hid);
		this.upTimer();
		this.upList();
	}

	private selHandle() {
		this.upList();
	}

	private upList(): void {
		let model = GGlobal.modelActHolyB;
		let index = this.c1.selectedIndex
		this._listData = Model_HuoDong.getListData(model.muBObj[index + 1]);
		this.list.numItems = this._listData ? this._listData.length : 0;
		if (this.list.numItems > 0) {
			this.list.scrollToView(0);
		}
	}


	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: VActHolyBeastItem = obj as VActHolyBeastItem;
		item.setVo(this._listData[index], this._hid);
	}

	private upTimer(): void {
		if (this._act) {
			var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d)
			}
		}
		else {
			this.labTime.text = "剩余时间："
		}
	}

	private checkTab() {
		for (let i = 0; i < this._tabArr.length; i++) {
			let btn: fairygui.GButton = this._tabArr[i];
			let red = GGlobal.reddot.checkCondition(UIConst.ACTHB_MUBIAO, i + 1);
			if (btn) btn.getChild("noticeImg").visible = red;
		}
	}
}