class LockStageMgr {
	public constructor() {
	}

	private static _w: number = 100;
	private static _h: number = 100;
	private static _x: number = 400;
	private static _y: number = 400;
	private static _tar: fairygui.GComponent;
	private static container: fairygui.GComponent;
	private static rects: Array<any> = [];
	public static startLockRect(tar: fairygui.GComponent, w: number = 100, h: number = 100): void {
		LockStageMgr._w = w;
		LockStageMgr._h = h;
		LockStageMgr._tar = tar;
		var p: egret.Point = tar.parent.localToGlobal(tar.x, tar.y);
		LockStageMgr._x = p.x;
		LockStageMgr._y = p.y;
		if (LockStageMgr.rects.length) {
			LockStageMgr.onResze();
			return;
		}
		var sw: number = App.stage.stageWidth;
		var sh: number = App.stage.stageHeight;
		var iw: Array<any> = [1, sw, 1, sw];
		var ih: Array<any> = [sh, 1, sh, 1];
		var ix: Array<any> = [0, 0, sw, 0];
		var iy: Array<any> = [0, 0, 0, sh];

		var ew: Array<any> = LockStageMgr._ew;
		var eh: Array<any> = LockStageMgr._eh;
		var ex: Array<any> = LockStageMgr._ex;
		var ey: Array<any> = LockStageMgr._ey;

		if (LockStageMgr.container == null) {
			LockStageMgr.container = new fairygui.GComponent();
			LockStageMgr.container.x = -GGlobal.layerMgr.offx;
			let sc = 1 / LayerManager.getFullScreenSc();
			this.container.setScale(sc, sc);
			GGlobal.layerMgr.UI_Popup.addChild(LockStageMgr.container);
		} else {
			GGlobal.layerMgr.UI_Popup.setChildIndex(LockStageMgr.container, GGlobal.layerMgr.UI_Popup.numChildren - 1);
		}
		for (var i: number = 0; i < 4; i++) {
			let shape = LockStageMgr.drawrR(ix[i], iy[i], iw[i], ih[i]);
			LockStageMgr.rects.push(shape);
			egret.Tween.get(shape).to({ x: ex[i], y: ey[i], width: ew[i], height: eh[i] }, 300, egret.Ease.sineOut);
			LockStageMgr.container.addChild(shape);
		}

		// GGlobal.control.listen(Enum_MsgType.MSG_ENTERFRAME, LockStageMgr.onResze);
	}

	public static endLockRect(): void {
		if (LockStageMgr.rects.length == 0) {
			return;
		}
		while (LockStageMgr.rects.length) {
			var d: any = LockStageMgr.rects.shift();
			d.parent.removeChild(d);
		}
		if (LockStageMgr.container) {
			LockStageMgr.container.removeFromParent();
			LockStageMgr.container = null;
		}
		// GGlobal.control.remove(Enum_MsgType.MSG_ENTERFRAME, LockStageMgr.onResze);
	}

	private static drawrR(x: number, y: number, w: number, h: number): fairygui.GGraph {
		var shap: fairygui.GGraph = new fairygui.GGraph();
		shap.setSize(w, h);
		shap.drawRect(0, 0, 0, 0x0, .7);
		// shap.touchable = false;
		shap.x = x;
		shap.y = y;
		return shap;
	}

	// private static lastTime: number = 0;
	private static onResze(): void {
		// var now: number = egret.getTimer();
		// if (now - LockStageMgr.lastTime < 100) {
		// 	return;
		// }
		// now = LockStageMgr.lastTime;
		if (LockStageMgr.rects.length) {
			var p: egret.Point = LockStageMgr._tar.parent.localToGlobal(LockStageMgr._tar.x, LockStageMgr._tar.y);
			LockStageMgr._x = p.x;
			LockStageMgr._y = p.y;
			for (var i: number = 0; i < LockStageMgr.rects.length; i++) {
				var spr: fairygui.GGraph = LockStageMgr.rects[i];
				egret.Tween.removeTweens(spr);
				spr.setSize(LockStageMgr._ew[i], LockStageMgr._eh[i]);
				spr.setXY(LockStageMgr._ex[i], LockStageMgr._ey[i]);
			}
		}
	}

	private static get sh(): number {
		return App.stage.stageHeight;
	}

	private static get sw(): number {
		return App.stage.stageWidth;
	}

	private static get _ew(): Array<any> {
		return [LockStageMgr._x, LockStageMgr._w, LockStageMgr.sw - LockStageMgr._x - LockStageMgr._w, LockStageMgr._w];
	}

	private static get _eh(): Array<any> {
		return [LockStageMgr.sh, LockStageMgr._y, LockStageMgr.sh, LockStageMgr.sh - LockStageMgr._y - LockStageMgr._h];
	}

	private static get _ex(): Array<any> {
		return [0, LockStageMgr._x, LockStageMgr._x + LockStageMgr._w, LockStageMgr._x];
	}

	private static get _ey(): Array<any> {
		return [0, 0, 0, LockStageMgr._y + LockStageMgr._h];
	}
}