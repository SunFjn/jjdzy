/**
 * 六道套装查看界面
 */
class SixWayCheckView extends UIModalPanel{
	public list: fairygui.GList;
	private _listData:Array<Isixdaotz_505>;

	public static URL: string = "ui://ehelf5bhv97gw1x";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("lunhui", "SixWayCheckView").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		let type:number = self._args;
		self._listData = [];
		for(let key in Config.sixdaotz_505)
		{
			let cfg:Isixdaotz_505 = Config.sixdaotz_505[key];
			if(cfg.type == type)
			{
				self._listData.push(cfg);
			}
		}
		self.list.numItems = self._listData ? self._listData.length : 0;
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
	}

	private itemRender(idx, obj) {
		let item: SixWayCheckItem = obj as SixWayCheckItem;
		item.setdata(this._listData[idx]);
	}
}