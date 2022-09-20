class ViewResource extends fairygui.GLabel {

	//>>>>start
	public bg: fairygui.GImage;
	//>>>>end

	public static URL: string = "ui://jvxpx9emn7sj6d";

	public static createInstance(): ViewResource {
		return <ViewResource><any>(fairygui.UIPackage.createObject("common", "ViewResource"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	public setCount(v: any) {
		this.text = v + "";
	}

	public setLb(hascount: any, needCount: any) {
		let ownCnt: number = hascount;
		let needCnt: number = needCount;
		if (typeof hascount == "string") {
			ownCnt = Number(hascount);
		}
		if (typeof needCnt == "string") {
			needCnt = Number(needCnt);
		}
		this.color = ownCnt >= needCnt ? Color.GREENINT : Color.REDINT;
		this.text = ConfigHelp.numToStr(hascount) + "/" + ConfigHelp.numToStr(needCount);
	}

	public showBg(pFlag: boolean) {
		let t = this;
		t.bg.visible = pFlag;
	}

	private _imgUrl
	public setImgUrl(v = null): void {
		if (v) {
			this._iconObject.visible = true;
			if (this._imgUrl != v) {
				this._imgUrl = v;
				IconUtil.setImg(this._iconObject.asLoader, Enum_Path.ICON70_URL + this._imgUrl + ".png");
			}
		} else {
			this._imgUrl = null;
			this._iconObject.visible = false;
			IconUtil.setImg(this._iconObject.asLoader, null);
		}
	}

	public setImgUrl1(v = null) {
		let self = this;
		if (v) {
			self._iconObject.visible = true;
			if (self._imgUrl != v) {
				self._imgUrl = v;
				IconUtil.setImg(self._iconObject.asLoader, v);
			}
		} else {
			self._imgUrl = null;
			self._iconObject.visible = false;
			IconUtil.setImg(self._iconObject.asLoader, null);
		}
	}

	private _itemId: number;
	public setItemId(pItemId: number) {
		let t = this;
		let t_cfg = Config.daoju_204[pItemId];
		t._itemId = pItemId;
		if (t_cfg) {
			t.setImgUrl(t_cfg.icon);
			EventUtil.register(true, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
		}
		else {
			EventUtil.register(false, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
		}
	}

	private onClick(e: egret.TouchEvent) {
		FastAPI.showItemTips(this._itemId);
	}

	public setType(type) {
		if (type == 1) {//文字左对齐
			let t = this.getTextField()
			t.align = fairygui.AlignType.Left;
			let ic = this.getChild("icon")
		} else if (type == 0) { //文字居中显示
			let t = this.getTextField()
			t.align = fairygui.AlignType.Center;
		}
	}

	public dispose() {
		this.setItemId(0);
		super.dispose();
	}
}