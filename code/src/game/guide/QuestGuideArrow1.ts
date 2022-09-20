class QuestGuideArrow1 extends fairygui.GComponent {
	private static _instance: QuestGuideArrow1;
	public auto: Function;
	public passRestrict: boolean;

	public static CONFIG_MOUSECLICK_INTEVAL: number = 8000;
	public static CONFIG_MOUSEMOVE_INTEVAL: number = 5000;

	public static CONFIG_INTERVALMAX: number = 8000;
	public static CONFIG_INTERVELDEF: number = 3000;

	public static hideRestrict: any = {};
	public static _hideRestrictCount: number = 0;

	public static notShow: number = 0;

	public constructor() {
		super();
	}

	public guideLb: fairygui.GRichTextField;
	public guideGroup: fairygui.GGroup;
	public arrowImg: fairygui.GComponent;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.touchable = false;
		self.visible = false;
		self.x = fairygui.GRoot.inst.width / 2;
		self.y = fairygui.GRoot.inst.height / 2;
	}

	public static URL: string = "ui://jvxpx9em8xhz3g8";
	public static get instance(): QuestGuideArrow1 {
		if (QuestGuideArrow1._instance == null) {
			QuestGuideArrow1._instance = <QuestGuideArrow1><any>(fairygui.UIPackage.createObject("common", "QuestGuideArrow"));
		}
		return QuestGuideArrow1._instance;
	}

	public _isTop: boolean;
	public _target: fairygui.GComponent;
	public _ax: number;
	public _ay: number;
	public lastGlobalx: number = 0;
	public lastGlobaly: number = 0;

	public tween: egret.Tween;
	public _tweenObj: any = { x: 0, y: 0 };
	public _effTweenObj: any = { rotation: 0 };
	public specialToHide: boolean = false;
	public focuseTo(target: fairygui.GComponent, ax: number, ay: number, rotate: number = 0, bgx: number = -100, bgy: number = 50, isTop: boolean = true): void {
		let self = this;
		self._isTop = isTop;
		if (target == null) {
			egret.Tween.removeTweens(self);
			self.tween = null;
			self.visible = false;
			self._target = target;
		} else {
			if (self._target && target && target.hashCode == self._target.hashCode && ax == self._ax && ay == self._ay) {
				if (!self.tween) {
					target.addChild(self);
				}
				return;
			}
			self.arrowImg.setXY(0, 0);
			egret.Tween.get(self.guideGroup).to({ x: bgx, y: bgy }, 300);
			self._effTweenObj.rotation = rotate;
			egret.Tween.get(self.arrowImg).to(self._effTweenObj, 300);

			var tp: egret.Point = target.localToRoot(ax - GGlobal.layerMgr.offx, ay);
			self._ax = ax;
			self._ay = ay;
			var sp: egret.Point = self.localToRoot(0 - GGlobal.layerMgr.offx, 0);
			self.x = sp.x;
			self.y = sp.y;
			self._tweenObj.x = self.lastGlobalx = tp.x;
			self._tweenObj.y = self.lastGlobaly = tp.y;
			// let num = Math.sqrt(ConfigHelp.dist(tp.x, tp.y, sp.x, sp.y));
			// if (num < 200) num = 200;
			// if (num > 400) num = 400;
			// self.tween = egret.Tween.get(self);
			// self.tween.to(self._tweenObj, num).call(self.onTweenComplete, self).play();
			self._target = target;
			self.onTweenComplete();
			self.visible = true;
			// GGlobal.layerMgr.UI_Message.addChild(self);
		}
		self._guideInterval = 3000;
	}

	private onTweenComplete(): void {
		let self = this;
		if (self._target) {
			if (self._isTop) {
				var p: egret.Point = self.globalPoint();
				self.x = p.x;
				self.y = p.y;
				GGlobal.layerMgr.UI_Message.addChild(self);
				return;
			}
			self.x = self._ax;
			self.y = self._ay;
			self._target.addChild(self);
		}
	}

	public setText(v: string): void {
		this.guideLb.text = v;
	}

	private _guideInterval: number = 3000;
	public release(): void {
		let self = this;
		self.hide();
		self.passRestrict = false;
		self.auto = null;
	}

	public globalPoint(): egret.Point {
		let self = this;
		var tp: egret.Point = self._target.localToRoot(self._ax - GGlobal.layerMgr.offx, self._ay);
		return tp;
	}

	public hide(): void {
		let self = this;
		self.removeFromParent();
		self._target = null;
		self.setXY(fairygui.GRoot.inst.width / 2, fairygui.GRoot.inst.height / 2);
	}
}