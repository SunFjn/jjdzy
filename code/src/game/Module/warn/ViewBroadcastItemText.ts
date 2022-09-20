class ViewBroadcastItemText extends fairygui.GComponent {

	public idelIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	public needSort: boolean;
	/**支持html */
	public static text(str, color = 0xed1414, pz:number = 0): void {
		GGlobal.layerMgr.open(UIConst.BROADCASTITEMTEXT);
		var v = GGlobal.layerMgr.getView(UIConst.BROADCASTITEMTEXT) as ViewBroadcastItemText;
		v.showText(str, color, pz);
	}

	public items = [];
	public showText(str, color, pz): void {
		var item: BroadcastItemText = BroadcastItemText.createInstance();
		item.showText(str, color, pz);
		item.y = 780;
		item.visible = false;
		item.x = (fairygui.GRoot.inst.width - item.width) / 2;
		this.addChild(item);
		this.items.unshift(item);
	}

	private _last: number;
	protected onframe(e: egret.Event): void {
		var self = this;
		var items = self.items;
		var now = egret.getTimer();
		var dt = now - self._last;
		self._last = now;
		var speedmul = dt / 33 * 5;
		for (var i = items.length - 1; i >= 0; i--) {
			var item: any = items[i];
			item.visible = true;
			var tarpos = 780 - i * 35;
			var vec = 2 + (2000 - item.lifeTime) / 1000 * speedmul;
			if (item.y - vec > tarpos) {
				item.y -= vec;
			} else {
				item.y = tarpos;
			}
			item.lifeTime += dt;
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
					items.pop();
					self.removeChild(item);
					item.disposePanel();
					if (self.items.length == 0 && this.parent) {
						GGlobal.layerMgr.close(UIConst.BROADCASTITEMTEXT);
					}
				}
			}
		}
	}

	public onOpen() {
		this._last = egret.getTimer();
		this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
	}

	public onClose() {
		var self = this;
		var items = self.items;
		for (var i = items.length - 1; i >= 0; i--) {
			let item = items.pop();
			self.removeChild(item);
			item.disposePanel();
		}
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
		GGlobal.layerMgr.close(UIConst.BROADCASTITEMTEXT);
	}

	public resetPosition(): void {
		this.setXY(0, 0);
	}
}

class BroadcastItemText extends fairygui.GComponent {

	public tarindex = 0;
	public state;
	public lifeTime: number;

	public static POOL = [];
	public label: fairygui.GRichTextField;
	public static URL: string = "ui://jvxpx9emomdtal";
	public static createInstance(): BroadcastItemText {
		var POOL = BroadcastItemText.POOL;
		if (POOL.length) {
			return POOL.pop();
		}
		return <BroadcastItemText><any>(GGlobal.commonpkg.createObject("BroadcastItemText"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.label = <fairygui.GRichTextField><any>(this.getChild("label"));
		this.touchable = false;
	}

	public showText(str, color, pz:number = 0) {
		this.lifeTime = this.state = 0;
		this.alpha = 1;
		this.label.color = color;
		if(pz > 7)
		{
			let names:string[] = str.split('');
			str = "";
			let colors = ["#ed1414", "#ffc344", '#da2bfa', "#66ccff"];
			for (let i = 0; i < names.length; i++) {
				let idx = i % colors.length;
				str += HtmlUtil.fontNoSize(names[i], colors[idx]);
			}
		}
		this.label.text = str;
	}

	public disposePanel() {
		BroadcastItemText.POOL.push(this);
	}
}
