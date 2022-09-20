class Child_ActHolyBXiLian extends fairygui.GComponent implements IActHolyBeast {

	public imgHeadbg: fairygui.GLoader;
	public list: fairygui.GList;
	public labTime: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;

	public static URL: string = "ui://d5y9ngt6ccyk0";

	public static createInstance(): Child_ActHolyBXiLian {
		return <Child_ActHolyBXiLian><any>(fairygui.UIPackage.createObject("actHolyBeast", "Child_ActHolyBXiLian"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgHeadbg = <fairygui.GLoader><any>(this.getChild("imgHeadbg"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.labTime = <fairygui.GRichTextField><any>(this.getChild("labTime"));
		this.labTips = <fairygui.GRichTextField><any>(this.getChild("labTips"));

		this.list.itemRenderer = this.renderHandle
		this.list.callbackThisObj = this;
	}

	private static _instance: Child_ActHolyBXiLian
	public static get instance(): Child_ActHolyBXiLian {
		if (Child_ActHolyBXiLian._instance == null) {
			Child_ActHolyBXiLian._instance = Child_ActHolyBXiLian.createInstance();
		}
		return Child_ActHolyBXiLian._instance
	}

	public show(p: fairygui.GComponent, id): void {
		let s = this;
		s._hid = id;
		Timer.instance.listen(this.upTimer, this, 1000);
		p.addChild(s);
		s.setXY(0, 257);
		GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XILIAN, this.upList, this);
		GGlobal.modelEightLock.CG4571(id);
		this.upList();
		IconUtil.setImg1(Enum_Path.PIC_URL + "bar" + Config.xitong_001[id].icon + ".jpg", this.imgHeadbg);
	}

	private _listData: Array<Vo_HuoDong>
	private _hid: number
	private _act: Vo_Activity
	private upList(): void {
		let model = GGlobal.modelActHolyB
		this._listData = Model_HuoDong.getListData(model.xlArr);
		this._act = ModelEightLock.getActVo(this._hid);
		this.list.numItems = this._listData ? this._listData.length : 0;
		if (this.list.numItems > 0) {
			this.list.scrollToView(0);
		}
		this.upTimer();
	}

	public disposePanel(): void {
		let s = this;
		if (s.parent) {
			s.parent.removeChild(s);
		}
		Timer.instance.remove(s.upTimer, s);
		GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XILIAN, s.upList, s);
		s.list.numItems = 0;
		IconUtil.setImg1(null, this.imgHeadbg);
	}

	public dispose() {
		Child_ActHolyBXiLian._instance = null;
		super.dispose();
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
}