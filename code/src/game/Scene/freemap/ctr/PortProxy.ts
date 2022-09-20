class PortProxy {
	public constructor() {
	}

	public _matrix: egret.Matrix = new egret.Matrix();;
	public _restritRect: egret.Rectangle = new egret.Rectangle(0, 0, 1, 1);
	public _focusPoint: egret.Point = new egret.Point();

	public _portWid: number = 0;
	public _portHei: number = 0;

	public _pointRest: egret.Point = new egret.Point();

	public scaleX: number = 1;
	public scaleY: number = 1;

	public tx: number = 0;
	public ty: number = 0;

	public setTXY(ttx: number, tty: number): void {
		this.tx = ttx;
		this.ty = tty;
		this.updateMatrix();
	}

	public updateMatrix(): void {
		this._matrix.identity();
		this._matrix.scale(this.scaleX, this.scaleY);
		this._matrix.translate(this.tx, this.ty);
	}

	public setRestrictWH(w: number, h: number): void {
		this._restritRect.width = w;
		this._restritRect.height = h;
	}

	public setPortWH(w: number, h: number): void {
		this._portWid = w;
		this._portHei = h;
	}

	public focusXY(x: number, y: number): void {
		this._focusPoint.x = x;
		this._focusPoint.y = y;
	}

	public setScale(scale: number): void {
		this.scaleX = this.scaleY = scale;
		this.updateMatrix();
	}

	public adjustRealPoint(): void {
		var dp: egret.Point = this._matrix.transformPoint(this._focusPoint.x, this._focusPoint.y);

		this._pointRest.x = dp.x;
		this._pointRest.y = dp.y;

		var portWid: number = Math.floor(this._portWid / this.scaleX);
		var portHei: number = Math.floor(this._portHei / this.scaleY);

		var rw: number = Math.floor(this._restritRect.width * this.scaleX);
		var rh: number = Math.floor(this._restritRect.height * this.scaleY);
		var rl: number = Math.floor(this._restritRect.left * this.scaleX);
		var rt: number = Math.floor(this._restritRect.top * this.scaleY);
		var rr: number = Math.floor(this._restritRect.right * this.scaleX);
		var rb: number = Math.floor(this._restritRect.bottom * this.scaleY);

		if (rw < this._portWid) {
			this._pointRest.x = (rr - this._portWid) / 2;
		} else if (dp.x < this._restritRect.left) {
			this._pointRest.x = this._restritRect.left;
		} else if (dp.x > rr - this._portWid) {
			this._pointRest.x = rr - this._portWid;
		} else {
			this._pointRest.x = dp.x;
		}

		if (rh < this._portHei) {
			this._pointRest.y = (rb - this._portHei) / 2;
		} else if (dp.y < this._restritRect.y) {
			this._pointRest.y = this._restritRect.y;
		} else if (dp.y > rb - this._portHei) {
			this._pointRest.y = rb - this._portHei;
		} else {
			this._pointRest.y = dp.y;
		}

	}
}