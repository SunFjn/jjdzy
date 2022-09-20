class Child_UpdateNotice extends fairygui.GComponent {

	public list: fairygui.GList;
	public backImg: fairygui.GLoader;
	public btnGonggao: Button2;
	public btnGongneng: Button2;
	public c1: fairygui.Controller;
	public list1: fairygui.GList;

	private _listData:Ignyg_336[];

	public static URL: string = "ui://ye1luhg3ffubg";

	public static createInstance(): Child_UpdateNotice {
		return <Child_UpdateNotice><any>(fairygui.UIPackage.createObject("Welfare", "Child_UpdateNotice"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		// this.list = <fairygui.GList><any>(this.getChild("list"));
		// this.backImg = <fairygui.GLoader><any>(this.getChild("backImg"));
		let s = this;
		CommonManager.parseChildren(s, s);

		this.list1.itemRenderer = this.renderHandle;
		this.list1.callbackThisObj = this;
		this.list1.setVirtual();

		GGlobal.modelwelfare.CG_GET_WELFARENOTICE();
		this.c1.selectedIndex = 0;
	}

	private show() {
		let self = this;
		GGlobal.control.listen(Enum_MsgType.WELFARE_NOTICE_UPDATE, self.show, self);
		// let item = this.list._children[0] as NoticeItem;
		// item.show();
		IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "gonggao.jpg");
		self.btnGonggao.addClickListener(self.onGonggao, self);
		self.btnGongneng.addClickListener(self.onGongneng, self);
		self._listData = self.getGongnengList();
		self.onGonggao();
		if(!self._listData || self._listData.length <= 0)
		{
			self.btnGongneng.visible = false;
		}else{
			self.btnGongneng.visible = true;
		}
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self.backImg, null);
		GGlobal.control.remove(Enum_MsgType.WELFARE_NOTICE_UPDATE, self.show, self);
		self.btnGonggao.removeClickListener(self.onGonggao, self);
		self.btnGongneng.removeClickListener(self.onGongneng, self);
		self.list.numItems = 0;
	}

	/**
	 * 更新公告
	 */
	private onGonggao() {
		this.c1.selectedIndex = 0;
		let item = this.list._children[0] as NoticeItem;
		item.show();
	}

	/**
	 * 功能预告
	 */
	private onGongneng() {
		let self = this;
		self.c1.selectedIndex = 1;
		self.list1.numItems = self._listData.length;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: NoticeItem1 = obj as NoticeItem1;
		v.show(this._listData[index]);
	}

	private getGongnengList():Ignyg_336[]
	{
		let self = this;
		let servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		let arr:Ignyg_336[] = [];
		for(let key in Config.gnyg_336)
		{
			let vo:Ignyg_336 = Config.gnyg_336[key];
			let beginTime:number = self.transformTime(vo.hstart);
			let endTime:number = self.transformTime(vo.hend);
			if(servTime >= beginTime && servTime <= endTime)
			{
				arr.push(vo);
			}
		}
		return arr;
	}

	/**
	 * 字符串准换成时间戳（秒）
	 */
	private transformTime(str:string):number
	{
		return Date.parse(str) / 1000;
	}
}