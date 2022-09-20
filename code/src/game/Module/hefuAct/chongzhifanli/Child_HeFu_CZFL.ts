/**
 * 合服活动-充值返利
 */
class Child_HeFu_CZFL extends fairygui.GComponent implements IPanel{
	public bgImg: fairygui.GLoader;
	public labTime: fairygui.GRichTextField;
	public tipsTxt: fairygui.GRichTextField;
	public list: fairygui.GList;
	public c1:fairygui.Controller;
	private _tabArr: fairygui.GButton[];
	private _act: Vo_Activity;
	private _listData;

	public static pkg = "hefuAct";

	public static URL:string = "ui://07jsdu7hqftx2";

	public static createInstance():Child_HeFu_CZFL {
		return <Child_HeFu_CZFL><any>(fairygui.UIPackage.createObject("hefuAct","Child_HeFu_CZFL"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(HeFu_CZFL_Item.URL, HeFu_CZFL_Item);
	}

	initView(pParent:fairygui.GObject){
		let self = this;
		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;

		this._tabArr = [];
		for (let i = 0; i < 4; i++) {
			this._tabArr.push(<fairygui.GButton><any>(this.getChild("tab" + i)))
		}
	}

	openPanel(pData?:Vo_Activity){
		this.y = 264;
		this._act = pData;
		this.show();
		GGlobal.modelActivity.CG_OPENACT(UIConst.HFKH_CZFL);
		GGlobal.reddot.listen(UIConst.HFKH_CZFL, this.checkTab, this);
	}

	closePanel(pData?:any){
		this.disposePanel();
	}

	dispose(){
		this.disposePanel();
		super.dispose()
	}

	/**注销事件 */
	private disposePanel() {
		let self = this;
		Timer.instance.remove(self.upTimer, self);
		self.c1.removeEventListener(fairygui.StateChangeEvent.CHANGE, self.upList, self);
		self.list.numItems = 0;
		IconUtil.setImg(self.bgImg, null);
		GGlobal.control.remove(UIConst.HFKH_CZFL, self.upList, self);
		GGlobal.reddot.remove(UIConst.HFKH_CZFL, self.checkTab, self);
	}

	private show(): void {
		let self = this;
		Timer.instance.listen(self.upTimer, self, 1000);
		IconUtil.setImg(self.bgImg, Enum_Path.PIC_URL + "chongzhifanli.jpg");
		self.c1.selectedIndex = 0;
		self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.upList, self);
		GGlobal.control.listen(UIConst.HFKH_CZFL, self.upList, self);
	}

	/**
	 * 活动时间
	 */
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

	private upList(): void {
		let model = GGlobal.model_actCom;
		let index = this.c1.selectedIndex;

		let cfg:Ihfkhczfl_286 = Config.hfkhczfl_286[index + 1];
		if(cfg && model.rechargeNum < cfg.cz)
		{
			this.tipsTxt.text = "活动期间充值（" + model.rechargeNum + "/" + cfg.cz + "）元可激活此返利";
		}else{
			this.tipsTxt.text = "已激活";
		}

		this.checkTab();

		this._listData = Model_ActCom.getListData(this.getList(index + 1));
		this.list.numItems = this._listData ? this._listData.length : 0;
		if (this.list.numItems > 0) {
			this.list.scrollToView(0);
		}
	}

	/**
	 * 根据索引获取list数据
	 */
	private getList(index:number)
	{
		var arr = [];
		let m = GGlobal.model_actCom;
		for(var key in m.taskObj)
		{
			if(Math.floor(Number(key) / 1000) == index)
			{
				let obj = m.taskObj[key];
				arr.push(obj);
			}
		}
		return arr;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: HeFu_CZFL_Item = obj as HeFu_CZFL_Item;
		item.setVo(this._listData[index]);
	}

	/**
	 * 检查每项的红点
	 */
	private checkTab() {
		for (let i = 0; i < this._tabArr.length; i++) {
			let btn: fairygui.GButton = this._tabArr[i];
			let arr = this.getList(i + 1);
			let red:boolean = false;
			for(let j = 0;j < arr.length;j ++)
			{
				let obj = arr[j];
				if(obj.status == 1)
				{
					red = true;
					break;
				}
			}
			if (btn) btn.getChild("noticeImg").visible = red;
		}
	}
}