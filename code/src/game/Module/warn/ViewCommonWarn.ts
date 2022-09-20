class ViewCommonWarn extends egret.Sprite{

	public constructor() {
		super();
		this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
	}
	/**支持html */
	public static text(str, color = 0xffffff): void {
		if (str) {
			var v = ViewCommonWarn.getInstance();
			v.showText(str, color);
		}
	}

	private static _instance: ViewCommonWarn;
	public static getInstance(): ViewCommonWarn {
		if (!ViewCommonWarn._instance) ViewCommonWarn._instance = new ViewCommonWarn();
		return ViewCommonWarn._instance;
	}

	public items = [];
	public showText(str, color): void {
		var item: WarnItem = WarnItem.createInstance();
		item.showText(str, color);

		item.y = 680;
		item.visible = false;
		item.x = (fairygui.GRoot.inst.width - item.width) / 2;
		GGlobal.layerMgr.UI_Message.addChild(item);
		this.items.unshift(item);
	}

	private _cleanTime = 0;
	private _last: number=0;
	protected onframe(): void {
		var self = this;
		var items = self.items;
		var now = egret.getTimer();
		this._cleanTime += 30;
		// var dt = now - self._last;
		self._last = now;
		var speedmul =2// dt / 33 * 5;
		for (var i = items.length - 1; i >= 0; i--) {
			var item: WarnItem = items[i];
			if(!item)continue;
			item.visible = true;
			var tarpos = 680 - i * 56;
			var vec = 2 + (2000 - item.lifeTime) / 1000 * speedmul;
			if (item.y - vec > tarpos) {
				item.y -= vec;
			} else {
				item.y = tarpos;
			}
			item.lifeTime = now-item.rebornTime;
			if (item.state == 0) {
				if (item.lifeTime >= 1000) {//move1
					item.state = 1;
				}
			} else if (item.state == 1) {//stand 1500ms
				if (item.lifeTime >= 1500) {
					item.state = 2;
				}
			} else if (item.state == 2) {//alpha remove
				item.alpha -= 0.05;
				if (item.lifeTime >= 2000) {
					items[i] = null;
					item.removeFromParent();
					item.disposePanel();
				}
			}
		}
		if(this._cleanTime%600==0){
			ArrayUitl.cleannull(items);
		}
	}
}

class WarnItem extends fairygui.GComponent {

	public tarindex = 0;
	public state;
	public lifeTime: number=0;
	public rebornTime: number=0;

	public label: fairygui.GRichTextField;
	public static URL: string = "ui://jvxpx9emlqbq1a";
	public static createInstance(): WarnItem {
		return Pool.getItemByCreateFun("WarnItem", WarnItem.create) as WarnItem;
	}

	public static create() {
		return <WarnItem><any>(GGlobal.commonpkg.createObject("commonWarn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.label = <fairygui.GRichTextField><any>(this.getChild("label"));
		this.touchable = false;
	}

	public showText(str, color) {
		this.lifeTime = 0;
		this.rebornTime = egret.getTimer();
		this.state = 0;
		this.alpha = 1;
		this.label.color = color;
		this.label.text = str;
	}

	public disposePanel() {
		this.lifeTime=0;
		Pool.recover("WarnItem", this);
	}
}
