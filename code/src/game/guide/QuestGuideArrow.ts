class QuestGuideArrow extends fairygui.GComponent {

	private static _instance: QuestGuideArrow;

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
		this.childrenCreated();
	}

	public eff: Part;

	protected childrenCreated(): void {
		this.touchable = false;
		this.visible = false;
		this.x = fairygui.GRoot.inst.width / 2;
		this.y = fairygui.GRoot.inst.height / 2;
	}


	public static get instance(): QuestGuideArrow {
		if (QuestGuideArrow._instance == null) {
			QuestGuideArrow._instance = new QuestGuideArrow();
		}
		return QuestGuideArrow._instance;
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
	public focuseTo(target: fairygui.GComponent, ax: number, ay: number, isTop: boolean = false): void {
		let self = this;
		self._isTop = isTop;
		if (target == null) {
			egret.Tween.removeTweens(self);
			self.tween = null;
			self.visible = false;
		} else {
			if (self._target && target && target.hashCode == self._target.hashCode && ax == self._ax && ay == self._ay) {
				if (!self.tween) {
					target.addChild(self);
				}
				return;
			}
			if (!self.specialToHide) {
				if (!self.eff) {
					self.eff = EffectMgr.addEff("eff/200007/ani", self.displayListContainer, 0, 0, 1000, -1, true,1,Main.skill_part_type);
				}
			}
			self.specialToHide = false;

			var tp: egret.Point = target.localToRoot(ax - GGlobal.layerMgr.offx, ay);
			self._ax = ax;
			self._ay = ay;
			var sp: egret.Point = self.localToRoot(0 - GGlobal.layerMgr.offx, 0);
			self.x = sp.x;
			self.y = sp.y;
			self._tweenObj.x = self.lastGlobalx = tp.x;
			self._tweenObj.y = self.lastGlobaly = tp.y;
			let num = Math.sqrt(MathUtil.dist(tp.x, tp.y, sp.x, sp.y));
			if (num < 200) num = 200;
			if (num > 400) num = 400;
			self.tween = egret.Tween.get(self);
			self.tween.to(self._tweenObj, num).call(self.onTweenComplete, self).play();
			self.visible = true;
			GGlobal.layerMgr.UI_Message.addChild(self);
		}
		self._target = target;
	}


	private onTweenComplete(): void {
		let self = this;
		if (self._target) {
			if (self._isTop) {
				var p: egret.Point = self._target.localToRoot(self._ax - GGlobal.layerMgr.offx, self._ay);
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

	public release(): void {
		let self = this;
		self.hide();
		self.passRestrict = false;
		self.auto = null;
	}

	public get globalPoint(): egret.Point {
		var tp: egret.Point = this._target.localToGlobal(this._ax, this._ay);
		return tp;
	}

	public hide(): void {
		let self = this;
		self.visible = false;
		self._target = null;
		if (self.eff) {
			EffectMgr.instance.removeEff(self.eff);
			self.eff = null;
		}
	}
}