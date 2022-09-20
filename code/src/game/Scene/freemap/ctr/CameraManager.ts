class CameraManager {
	public constructor() {
	}

	public static sightX: number;
	public static sightY: number;

	private static ngx: number;
	private static ngy: number;
	private static gx: number = -1;
	private static gy: number = -1;

	private static _x: number;
	private static _y: number;

	public static _focusx: number;
	public static _focusy: number;
	public static invalidate: boolean;

	public static lock: number;

	public static proxy: CameraProxy = new EasePortCameraProxy();

	public static wacth(global_x: number, global_y: number): void {
		//if(Global.isBattling) return;
		this.proxy.focusx = global_x;
		this.proxy.focusy = global_y;

		this._focusx = global_x;
		this._focusy = global_y;
	}

	public static wacthIm(x: number, y: number): void {
		this._x = x;
		this._y = y;

		ArpgMap.getInstance().setXY(x, y);
		var portProxy: PortProxy = ArpgMap.getInstance()._portProxy;
		var p: egret.Point = portProxy._pointRest;

		CameraManager.sightX = Math.floor(p.x);
		CameraManager.sightY = Math.floor(p.y);

		CameraManager.ngx = Math.floor(CameraManager.sightX / ModelArpgMap.MAPBLOCKW / portProxy.scaleX);
		CameraManager.ngy = Math.floor(CameraManager.sightY / ModelArpgMap.MAPBLOCKH / portProxy.scaleY);

		if (CameraManager.ngx != CameraManager.gx || CameraManager.ngy != CameraManager.gy || CameraManager.invalidate) {
			CameraManager.gx = CameraManager.ngx;
			CameraManager.gy = CameraManager.ngy;
			ArpgMap.getInstance().rebuild();
		}

		ArpgMap.getInstance().setSight(-CameraManager.sightX, -CameraManager.sightY);
	}

	public static reSize(w: number, h: number): void {
		CameraManager.wacthIm(CameraManager._x, CameraManager._y);
		ArpgMap.getInstance().rebuild();
	}

	//镜头移动
	public static cameraFromTo(sx: number,  //开始点X
		sy: number,  //开始点Y
		ex: number,  //结束点X
		ey: number,  //结束点Y
		time: number,  //消耗时间
		endCallBack: Function = null,
		fun: Function = null,
		easing: string = "bee_line"): void {
		var p: PP = PP.instance;
		p._sx = sx;
		p._sy = sy;
		p._ex = ex;
		p._ey = ey;
		// to(p, time, {percent:[0, 1]},endCallBack,fun,easing);
		p.percent = 0;
		egret.Tween.get(p).to({ percent: 1 }, time, egret.Ease.sineIn)
	}

	public static stopCameraMove(): void {
		egret.Tween.removeTweens(PP.instance);
	}

	public static dispose(): void {
		CameraManager.gx = -1;
		CameraManager.gy = -1;
	}

	public static watchFocus(): void {
		CameraManager.wacth(GameUnitManager.hero.x, GameUnitManager.hero.y);
	}

	public static watchFocusIm(): void {
		CameraManager.wacthIm(GameUnitManager.hero.x, GameUnitManager.hero.y);
	}

	public static update(delta: number): void {
		var matchCondition: boolean;
		if (!ModelArpgMap.sceneReady) return;
		CameraManager.proxy.update(delta);
		matchCondition = (CameraManager.invalidate || CameraManager.proxy.hasChange || ((CameraManager.proxy.currentx != CameraManager._x
			|| CameraManager.proxy.currenty != CameraManager._y)));
		if (matchCondition) {
			CameraManager.wacthIm(CameraManager.proxy.currentx, CameraManager.proxy.currenty);
			CameraManager.invalidate = false;
		}
	}
}

class PP {
	public _sx: number;
	public _sy: number;
	public _ex: number;
	public _ey: number;

	private static _instance: PP;
	public static get instance(): PP {
		if (!PP._instance)
			PP._instance = new PP();
		return PP._instance;
	}

	private _tickCallBack: any;
	public set percent(value: number) {
		var px: number = this._sx + (this._ex - this._sx) * value;
		var py: number = this._sy + (this._ey - this._sy) * value;

		CameraManager.wacth(px, py);
	}
}