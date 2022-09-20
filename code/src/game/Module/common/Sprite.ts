class Sprite extends fairygui.GComponent {
	public constructor() {
		super();
	}

	public createObject(packageName: string, viewname: string) {
		return fairygui.UIPackage.createObject(packageName, viewname);
	}

	public setPackageItemExtension(url: string, clz: any) {
		fairygui.UIObjectFactory.setPackageItemExtension(url, clz);
	}

	public CLICK = egret.TouchEvent.TOUCH_TAP;
	public LINK = egret.TextEvent.LINK;
	public eventFunction(opt): void {
		const self = this;
		const excutor = self.registe;
		// excutor(opt,self.CLICK,self.hd,self);
	}

	registe(addOrRemove: Number, target: egret.EventDispatcher, type: string, listener: Function, thisObj?) {
		if (addOrRemove) {
			target.addEventListener(type, listener, thisObj);
		} else {
			target.removeEventListener(type, listener, thisObj);
		}
	}

	openLastTime = 0;
	openUI(uiid, delay?) {
		if (delay) {
			if (!TimeUitl.cool(this.hashCode, delay)) {
				return;
			}
		}
		GGlobal.layerMgr.open(uiid);
	}
}