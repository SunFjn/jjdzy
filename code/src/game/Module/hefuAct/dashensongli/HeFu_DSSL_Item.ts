class HeFu_DSSL_Item extends fairygui.GComponent{
	public lab: fairygui.GRichTextField;
	public numGroup: fairygui.GGroup;
	public vipNum: fairygui.GRichTextField;
	public list: fairygui.GList;
	private _listData;

	public static URL: string = "ui://07jsdu7hhilo7";

	public static createInstance(): HeFu_CZFL_Item {
		return <HeFu_CZFL_Item><any>(fairygui.UIPackage.createObject("hefuActCZFL", "HeFu_CZFL_Item"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
	}

	public setType(obj)
	{
		let self = this;
		let cfg:Ihfkhgod_286;
		let m = GGlobal.model_actCom;
		let type:number = Math.floor(obj.id / 10);
		if(type == 1)
		{
			let key:number = obj.id * 10 + 1;
			cfg = Config.hfkhgod_286[key];
			var colorStr = obj.num >= cfg.cs2 ? Color.GREENSTR : Color.REDSTR;
			self.lab.text = "本服<font color='" + colorStr + "'>(" + obj.num + "/" + cfg.cs2 + ")</font>名玩家达到VIP" + cfg.cs1 + "可解锁";
			self.numGroup.visible = false;
			this._listData = self.getIhfkhgod_286(obj.id);
			this.list.numItems = this._listData ? this._listData.length : 0;
		}else{
			let key:number = obj.id * 10 + 1;
			cfg = Config.hfkhgod_286[key];
			self.lab.text = "本服每有1名玩家达到VIP" + cfg.cs1 + "可领取";
			self.numGroup.visible = true;
			self.vipNum.text = "当前VIP" + cfg.cs1 + "人数：" + obj.num;
			this._listData = self.getIhfkhgod_286(obj.id);
			this.list.numItems = this._listData ? this._listData.length : 0;
		}
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: HeFu_DSSL_Item1 = obj as HeFu_DSSL_Item1;
		item.setVo(this._listData[index]);
	}

	/**
	 * 根据类型获取表数组
	 */
	private getIhfkhgod_286(type:number):Array<Ihfkhgod_286>
	{
		let arr:Array<Ihfkhgod_286> = [];
		for(var key in Config.hfkhgod_286)
		{
			let cfg:Ihfkhgod_286 = Config.hfkhgod_286[key];
			if(Math.floor(cfg.id / 10) == type)
			{
				arr.push(cfg);
			}
		}
		return arr;
	}
}