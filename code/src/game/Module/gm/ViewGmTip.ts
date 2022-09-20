class ViewGmTip extends fairygui.GComponent {

	public list:fairygui.GList;

	public static URL:string = "ui://vm9a8xq8qm4n4";

	public static createInstance():ViewGmTip {
		return <ViewGmTip><any>(fairygui.UIPackage.createObject("GM","ViewGmTip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.list = <fairygui.GList><any>(this.getChild("list"));

		this.list.itemRenderer = this.renderListItem;
		this.list.callbackThisObj = this;
		this.list.addEventListener(fairygui.ItemEvent.CLICK, this.OnGridTouchHandler, this);
	}

	private static _instance: ViewGmTip;

	static get instance(): ViewGmTip {
		if (ViewGmTip._instance == null) {
			ViewGmTip._instance = ViewGmTip.createInstance();
		}
		return ViewGmTip._instance;
	}
	

	public OnGridTouchHandler(event: fairygui.ItemEvent): void {
		var bt: ChildGmTip = event.itemObject as ChildGmTip
		if (bt != null) {
			if (this.callBack != null) {
				this.callBack.call(this.ctxP, bt.vo);
			}
		}

		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	private renderListItem(index: number, obj: fairygui.GObject): void {
		var item: ChildGmTip = obj as ChildGmTip;
		item.vo = this.dataCollect[index];
	}

	protected type: number;
	protected content: string;
	protected callBack: Function;
	protected ctxP: any;
	protected dataCollect: Array<any>;

	public show(ctx: any, itemTapCallBack: Function, p: fairygui.GComponent, type = 0): void {
		this.content = ctx;
		this.callBack = itemTapCallBack;
		this.type = type;
		this.update();
		this.ctxP = p;
		this.x = p.parent.x + 100;
		// var maxH = p.parent["contentHeight"];
		// var h = p.y + p.height + this.height;
		// if(h >= maxH) {
		// 	h = p.y - this.height;
		// }
		// if(h < 0) {
		// 	h = 0;
		// }
		this.y = p.parent.y + 50;
		p.parent.parent.addChild(this);
	}

	public hide(){
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	public update() {
		this.dataCollect = this.getList();
		this.list.numItems = this.dataCollect.length;
	}

	protected getList(): any[] {
		var fliterList = [];
		if (this.type == Model_GM.TYPE1_TOOP_EQUIP) {//道具和装备
			var itemLib = Config.daoju_204;
			var equipLib = Config.zhuangbei_204;

			for (var key in itemLib) {
				var itemInfo = itemLib[key];
				var itemName: string = itemInfo.name;
				var idContent: string = "" + itemInfo.id;
				if (itemName.indexOf(this.content) != -1 || idContent.indexOf(this.content) != -1) {
					fliterList.push({ text: itemName, id: idContent });
					if (fliterList.length >= 5) {
						break;
					}
				}
			}

			for (var key in equipLib) {
				var equipInfo = equipLib[key];
				var equipName: string = equipInfo.n;
				var idContent: string = "" + equipInfo.id;
				if (equipName.indexOf(this.content) != -1 || idContent.indexOf(this.content) != -1) {
					fliterList.push({ text: equipName, id: idContent });
					if (fliterList.length >= 5) {
						break;
					}
				}
			}
		} else if (this.type == Model_GM.TYPE5_WDTX) {//问鼎天下
			fliterList = Model_GM.WEN_DING_TIAN_XIA;
		} else if (this.type == Model_GM.TYPE6_HUO_BI) {//货币
			fliterList = Model_GM.HUO_BI_LIST;
		}
		return fliterList;
	}
	

}