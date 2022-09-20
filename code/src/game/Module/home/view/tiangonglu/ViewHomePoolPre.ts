class ViewHomePoolPre extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;

	public static URL: string = "ui://y0plc878ye037";

	public static createInstance(): ViewHomePoolPre {
		return <ViewHomePoolPre><any>(fairygui.UIPackage.createObject("home", "ViewHomePoolPre"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHomePoolPre").asCom;

		self.maxLen = 0;
		for(let i in Config.fddc_019){
			self.maxLen ++;
		}

		CommonManager.parseChildren(self.view, self);
		self.list.setVirtual();
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		super.childrenCreated();
	}

	itemRender = (idx, obj) => {
		const item:PoolPreItem = obj as PoolPreItem;
		item.setdata(idx, this.maxLen);
	}
	maxLen = 0;
	onShown(){
		const self = this;
		self.list.numItems = self.maxLen;
	}

	onHide(){
		const self = this;
		self.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.HOME_PRE);
	}
}