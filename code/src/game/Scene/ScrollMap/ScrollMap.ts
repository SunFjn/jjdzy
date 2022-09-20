class ScrollMap extends egret.Sprite {
	public constructor() {
		super();
		this.tileLayer = new egret.Sprite();
		this.addChild(this.tileLayer);
	}

	/**用户数据a*/
	public va;

	public head: string = "";
	public mid: number = 0;

	public setHead1(v, id) {
		var h = String(v);
		var self = this;
		// if (self.head == h) {
		// 	return;
		// }
		self.mid = id;
		self.head = h;
		self._invalid |= 1;
	}

	public viewPort: egret.Rectangle;

	public mapPort: egret.Rectangle;

	public blockDict: Object = {};

	public itemCreateFunc: Function;

	public limitLeft;
	public limitRight;
	public limitTop;
	public limitBottom;

	public focusLimitLeft;
	public focusLimitRight;
	public focusLimitTop;
	public focusLimitBottom;

	public blockSizeW = 256;
	public blockSizeH = 256;

	public left;
	public top;

	public focusx;
	public focusy;

	public tileLayer: egret.Sprite;

	public _invalid = 0;

	public invalid() {
		this._invalid |= 1;
	}

	public initCustom(vpwidth, vpheight, mapSizeWid, mapSizeHei): void {
		this.viewPort = new egret.Rectangle(0, 0, vpwidth, vpheight);
		this.mapPort = new egret.Rectangle(0, 0, mapSizeWid, mapSizeHei);
	}

	private _lastMapID: number = -1;
	public updateViewLimit(): void {
		var self = this;
		var mapPort = self.mapPort;
		var viewPort = self.viewPort;
		self.limitLeft = mapPort.x;
		self.limitRight = mapPort.width - viewPort.width;
		self.limitTop = mapPort.y;
		self.limitBottom = mapPort.height - viewPort.height;

		self.focusLimitLeft = mapPort.x + viewPort.width / 2;
		self.focusLimitRight = mapPort.right - viewPort.width / 2;
		self.focusLimitTop = mapPort.y + viewPort.height / 2;
		self.focusLimitBottom = mapPort.bottom - viewPort.height / 2;

		//changge checkSceneEffect
		// var mid = self.mid;
		// if (mid != 0 && self._lastMapID != mid) {
		// 	self.clearEffect();
		// 	self._lastMapID = mid;
		// 	var lib = Config.map_200[mid];
		// 	if (lib && lib.j != "0") {
		// 		self.mapEffectData = JSON.parse(lib.j).eff;
		// 	}
		// }
	}

	public watchFocus(nx: number, ny: number): void {
		var self = this;
		var focusLimitLeft = self.focusLimitLeft;
		var focusLimitRight = self.focusLimitRight;
		var focusLimitTop = self.focusLimitTop;
		var focusLimitBottom = self.focusLimitBottom;
		var viewPort = self.viewPort;
		if (nx < focusLimitLeft) {
			nx = focusLimitLeft;
		}
		if (nx > focusLimitRight) {
			nx = focusLimitRight;
		}
		if (ny < focusLimitTop) {
			ny = focusLimitTop;
		}
		if (ny > focusLimitBottom) {
			ny = focusLimitBottom;
		}
		self.focusx = nx;
		self.focusy = ny;

		var vpx = nx - (viewPort.width / 2);
		var vpy = ny - (viewPort.height / 2);
		if (vpx < self.limitLeft) {
			vpx = self.limitLeft;
		} else if (vpx > self.limitRight) {
			vpx = self.limitRight;
		}

		if (vpy < self.limitTop) {
			vpy = self.limitTop;
		} else if (vpy > self.limitBottom) {
			vpy = self.limitBottom;
		}
		self.left = vpx;
		self.top = vpy;

		self.x = -(vpx >> 0);
		self.y = -(vpy >> 0);

		self.checkRebuild();
		//self.checkSceneEffect();
	}

	private _tween: egret.Tween = null
	public watchFocusTween(nx: number, ny: number, kill = false, t = 600): void {
		var self = this;
		if(kill){
			if (self._tween) {
				egret.Tween.removeTweens(self)
				self._tween = null;
			}
		}else{
			if(self._tween){
				return;
			}
		}
		

		var focusLimitLeft = self.focusLimitLeft;
		var focusLimitRight = self.focusLimitRight;
		var focusLimitTop = self.focusLimitTop;
		var focusLimitBottom = self.focusLimitBottom;
		var viewPort = self.viewPort;
		if (nx < focusLimitLeft) {
			nx = focusLimitLeft;
		}
		if (nx > focusLimitRight) {
			nx = focusLimitRight;
		}
		if (ny < focusLimitTop) {
			ny = focusLimitTop;
		}
		if (ny > focusLimitBottom) {
			ny = focusLimitBottom;
		}
		self.focusx = nx;
		self.focusy = ny;

		var vpx = nx - (viewPort.width / 2);
		var vpy = ny - (viewPort.height / 2);
		if (vpx < self.limitLeft) {
			vpx = self.limitLeft;
		} else if (vpx > self.limitRight) {
			vpx = self.limitRight;
		}

		if (vpy < self.limitTop) {
			vpy = self.limitTop;
		} else if (vpy > self.limitBottom) {
			vpy = self.limitBottom;
		}
		self.left = vpx;
		self.top = vpy;

		let tox = -(vpx >> 0);
		let toy = -(vpy >> 0);
		self._tween = egret.Tween.get(self).to({ x: tox, y: toy }, t).call(function () { self._tween = null; })

		self.checkRebuild();
		// self.checkSceneEffect();
	}

	private _lastRow0 = -1;
	private _lastCol0 = -1;
	private _lastNumCol = -1;
	private _lastNumRow = -1;
	private checkRebuild(): void {
		var self = this;
		var blockSizeH = self.blockSizeH;
		var blockSizeW = self.blockSizeW;
		var newRow0 = (self.top / self.blockSizeH) >> 0;
		var newCol0 = (self.left / self.blockSizeW) >> 0;
		var viewPort = self.viewPort;

		var numCol: number = Math.ceil(viewPort.width / blockSizeW);
		var numRow: number = Math.ceil(viewPort.height / blockSizeH);

		if (self._invalid || newRow0 != self._lastRow0 || newCol0 != self._lastCol0 || numRow != self._lastNumRow || numCol != self._lastNumCol) {
			self._invalid = 0;
			self.rebuild(newRow0, newCol0, numRow, numCol);
		}
	}

	public rebuild(row0, col0, numRow, numCol): void {
		var self = this;
		var blockDict = self.blockDict;
		var mapPort = self.mapPort;
		var endCol = col0 + numCol;
		var endRow = row0 + numRow;

		var maxCol = Math.ceil(mapPort.width / self.blockSizeW) - 1;
		var maxRow = Math.ceil(mapPort.height / self.blockSizeH) - 1;

		if (endRow > maxRow) {
			endRow = maxRow;
		}
		if (endCol > maxCol) {
			endCol = maxCol;
		}

		//console.log("R0:" + row0 + " RE:" + endRow);
		//console.log("C0:" + col0 + " CE:" + endCol);

		var head = self.head;
		//检测移除
		for (var k in blockDict) {
			var item = blockDict[k];
			if (item.head != head || item.r < row0 || item.r > endRow || item.c < col0 || item.c > endCol) {
				delete blockDict[item.k];
				item.onRemove();
			}
		}

		//检测添加
		for (var r = row0; r <= endRow; r++) {
			for (var c = col0; c <= endCol; c++) {
				var k: string = head + "_" + r.toString() + "_" + c;
				var nowitem = blockDict[k];
				if (!nowitem) {
					nowitem = self.itemCreateFunc(self, k, r, c);
					nowitem.onAdd();
					blockDict[k] = nowitem;
				}
			}
		}

		self._lastRow0 = row0;
		self._lastCol0 = col0;
		self._lastNumRow = numRow;
		self._lastNumCol = numCol;
	}

	public sendItemEvent(evt, arg): void {
		for (var k in this.blockDict) {
			var term = this.blockDict[k];
			term.onEvent(evt, arg);
		}
	}

	public mapEffect: Part[] = [];
	private mapEffectData: any[] = [];
	private _flag: number = 0;
	public checkSceneEffect(): void {
		var self = this;
		var main = GGlobal.main;
		if (main.isLowFPS && self._flag == 0 || self.mid == 0) {
			self._flag = 1;
			return;
		}
		self._flag = 0;
		var ix: number = self.x * -1 % self.blockSizeW;
		var nextX: number = ix + this.viewPort.width;
		nextX = nextX > self.blockSizeW ? nextX % self.blockSizeW : 0;
		var bx = (self.x * -1 / self.blockSizeW) >> 0;
		var m = self.mapEffectData;
		for (var i: number = 0; i < m.length; i++) {
			var t = m[i];
			var _x = t.x
			var _y = t.y;
			if (_x > ix && _x < this.viewPort.width + ix) {
				if (!self.mapEffect[i]) {
					var url = String(t.id).replace("_", "/");
					var eff = EffectMgr.addEff(url, self, bx * self.blockSizeW + _x, _y, 400, -1, true);
					self.mapEffect[i] = eff;
				} else {
					self.mapEffect[i].getMC().x = bx * self.blockSizeW + _x;
				}
			} else if (_x < nextX && nextX > 0) {
				if (!self.mapEffect[i]) {
					var url = String(t.id).replace("_", "/");
					var eff = EffectMgr.addEff(url, self, bx * self.blockSizeW + _x, _y, 400, -1, true);
					self.mapEffect[i] = eff;
				} else {
					self.mapEffect[i].getMC().x = (bx + 1) * self.blockSizeW + _x;
				}
			} else {
				if (self.mapEffect[i]) {
					var ef = self.mapEffect[i];
					EffectMgr.instance.removeEff(ef);
					self.mapEffect[i] = undefined;
				}
			}
		}
	}

	public clearEffect(): void {
		var self = this;
		self.mapEffectData = [];
		while (self.mapEffect.length) {
			var eff = self.mapEffect.shift();
			if (eff)
				EffectMgr.instance.removeEff(eff);
			eff = null;
		}
	}
}