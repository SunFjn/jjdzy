class ViewGMProtocolPanel extends UIPanelBase {

	public list0: fairygui.GList;
	public list1: fairygui.GList;

	public constructor() {
		super();
		this.setSkin("GM", "", "ViewGMProtocolPanel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(GMProtItem.URL, GMProtItem);
		fairygui.UIObjectFactory.setPackageItemExtension(GMProtInputItem.URL, GMProtInputItem);
	}

	protected initView(): void {
		super.initView();
		this.list0.callbackThisObj = this;
		this.list0.itemRenderer = this.renderHandker0;
		this.list0.addEventListener(fairygui.ItemEvent.CLICK, this.listHandler, this);
		this.list1.callbackThisObj = this;
		this.list1.itemRenderer = this.renderHandler1;
	}

	private listHandler(event: fairygui.ItemEvent) {
		let tab: TabButton = event.itemObject as TabButton;
		this.contentArr = this.titleArr[tab.data].items
		this.list1.numItems = this.contentArr.length;
		this.list1.scrollToView(0);
	}

	private renderHandler1(index: number, obj: fairygui.GObject) {
		let item = obj as GMProtItem;
		item.show(this.contentArr[index])
	}

	private renderHandker0(index: number, obj: fairygui.GObject) {
		let tab: TabButton = obj as TabButton;
		tab.data = index;
		tab.text = this.titleArr[index].label;
		if (index == 0) {
			tab.selected = true;
			this.contentArr = this.titleArr[index].items
			this.list1.numItems = this.contentArr.length;
		}
	}

	private contentArr = [];
	private titleArr = []
	public loadProtocol() {
		var self = this;
		var map = {};
		RES.getResByUrl(GGlobal.resHead + "resource/config/GMprotocol.proEx", function (buffer: ArrayBuffer) {
			if (!buffer) {
				return;
			}
			var bytes = new egret.ByteArray(buffer);
			var len = bytes.readShort();

			self.titleArr = [];
			for (var i = 0; i < len; i++) {
				var sysID = bytes.readShort();//系统分类的唯一主键id
				var sysName = bytes.readUTF();//系统分类描述
				var cmd = bytes.readShort();//协议号
				var typeCGorGC = bytes.readByte();//协议类型,1 CG前端到后端,2 GC后端到前端
				var title = bytes.readUTF();//协议描述  
				var decs = bytes.readUTF();//协议字段注释，不包含html元素
				var readTypes = bytes.readUTF();//协议内容   例如:U-B

				if (typeCGorGC != 1) {//只记录CG
					continue;
				}

				var ctx: any = {};
				ctx.pointer = 0;
				var typeList = Model_GM.parseProtocolObj(readTypes, ctx);

				var item = {
					sysID: sysID,
					sysName: sysName,
					typeCGorGC: typeCGorGC,
					cmd: cmd,
					types: typeList,
					typeStr: readTypes,
					decs: decs,
					label: "" + cmd + ":" + title
				};

				if (!map[sysID]) {
					map[sysID] = {
						label: sysID + "." + sysName,
						items: [],
						sysID: sysID
					};
				}
				map[sysID].items.push(item);
			}
			for (var k in map) {
				self.titleArr.push(map[k]);
			}
			self.titleArr.sort(function (a, b) {
				return a.sysID - b.sysID;
			});
			self.list0.numItems = self.titleArr.length;
		}, self, RES.ResourceItem.TYPE_BIN);
	}

	protected onShown(): void {
		this.loadProtocol();
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.GM_PROTOCOL);
	}
}