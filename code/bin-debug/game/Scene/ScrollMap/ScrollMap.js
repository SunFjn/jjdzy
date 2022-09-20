var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ScrollMap = (function (_super) {
    __extends(ScrollMap, _super);
    function ScrollMap() {
        var _this = _super.call(this) || this;
        _this.head = "";
        _this.mid = 0;
        _this.blockDict = {};
        _this.blockSizeW = 256;
        _this.blockSizeH = 256;
        _this._invalid = 0;
        _this._lastMapID = -1;
        _this._tween = null;
        _this._lastRow0 = -1;
        _this._lastCol0 = -1;
        _this._lastNumCol = -1;
        _this._lastNumRow = -1;
        _this.mapEffect = [];
        _this.mapEffectData = [];
        _this._flag = 0;
        _this.tileLayer = new egret.Sprite();
        _this.addChild(_this.tileLayer);
        return _this;
    }
    ScrollMap.prototype.setHead1 = function (v, id) {
        var h = String(v);
        var self = this;
        // if (self.head == h) {
        // 	return;
        // }
        self.mid = id;
        self.head = h;
        self._invalid |= 1;
    };
    ScrollMap.prototype.invalid = function () {
        this._invalid |= 1;
    };
    ScrollMap.prototype.initCustom = function (vpwidth, vpheight, mapSizeWid, mapSizeHei) {
        this.viewPort = new egret.Rectangle(0, 0, vpwidth, vpheight);
        this.mapPort = new egret.Rectangle(0, 0, mapSizeWid, mapSizeHei);
    };
    ScrollMap.prototype.updateViewLimit = function () {
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
    };
    ScrollMap.prototype.watchFocus = function (nx, ny) {
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
        }
        else if (vpx > self.limitRight) {
            vpx = self.limitRight;
        }
        if (vpy < self.limitTop) {
            vpy = self.limitTop;
        }
        else if (vpy > self.limitBottom) {
            vpy = self.limitBottom;
        }
        self.left = vpx;
        self.top = vpy;
        self.x = -(vpx >> 0);
        self.y = -(vpy >> 0);
        self.checkRebuild();
        //self.checkSceneEffect();
    };
    ScrollMap.prototype.watchFocusTween = function (nx, ny, kill, t) {
        if (kill === void 0) { kill = false; }
        if (t === void 0) { t = 600; }
        var self = this;
        if (kill) {
            if (self._tween) {
                egret.Tween.removeTweens(self);
                self._tween = null;
            }
        }
        else {
            if (self._tween) {
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
        }
        else if (vpx > self.limitRight) {
            vpx = self.limitRight;
        }
        if (vpy < self.limitTop) {
            vpy = self.limitTop;
        }
        else if (vpy > self.limitBottom) {
            vpy = self.limitBottom;
        }
        self.left = vpx;
        self.top = vpy;
        var tox = -(vpx >> 0);
        var toy = -(vpy >> 0);
        self._tween = egret.Tween.get(self).to({ x: tox, y: toy }, t).call(function () { self._tween = null; });
        self.checkRebuild();
        // self.checkSceneEffect();
    };
    ScrollMap.prototype.checkRebuild = function () {
        var self = this;
        var blockSizeH = self.blockSizeH;
        var blockSizeW = self.blockSizeW;
        var newRow0 = (self.top / self.blockSizeH) >> 0;
        var newCol0 = (self.left / self.blockSizeW) >> 0;
        var viewPort = self.viewPort;
        var numCol = Math.ceil(viewPort.width / blockSizeW);
        var numRow = Math.ceil(viewPort.height / blockSizeH);
        if (self._invalid || newRow0 != self._lastRow0 || newCol0 != self._lastCol0 || numRow != self._lastNumRow || numCol != self._lastNumCol) {
            self._invalid = 0;
            self.rebuild(newRow0, newCol0, numRow, numCol);
        }
    };
    ScrollMap.prototype.rebuild = function (row0, col0, numRow, numCol) {
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
                var k = head + "_" + r.toString() + "_" + c;
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
    };
    ScrollMap.prototype.sendItemEvent = function (evt, arg) {
        for (var k in this.blockDict) {
            var term = this.blockDict[k];
            term.onEvent(evt, arg);
        }
    };
    ScrollMap.prototype.checkSceneEffect = function () {
        var self = this;
        var main = GGlobal.main;
        if (main.isLowFPS && self._flag == 0 || self.mid == 0) {
            self._flag = 1;
            return;
        }
        self._flag = 0;
        var ix = self.x * -1 % self.blockSizeW;
        var nextX = ix + this.viewPort.width;
        nextX = nextX > self.blockSizeW ? nextX % self.blockSizeW : 0;
        var bx = (self.x * -1 / self.blockSizeW) >> 0;
        var m = self.mapEffectData;
        for (var i = 0; i < m.length; i++) {
            var t = m[i];
            var _x = t.x;
            var _y = t.y;
            if (_x > ix && _x < this.viewPort.width + ix) {
                if (!self.mapEffect[i]) {
                    var url = String(t.id).replace("_", "/");
                    var eff = EffectMgr.addEff(url, self, bx * self.blockSizeW + _x, _y, 400, -1, true);
                    self.mapEffect[i] = eff;
                }
                else {
                    self.mapEffect[i].getMC().x = bx * self.blockSizeW + _x;
                }
            }
            else if (_x < nextX && nextX > 0) {
                if (!self.mapEffect[i]) {
                    var url = String(t.id).replace("_", "/");
                    var eff = EffectMgr.addEff(url, self, bx * self.blockSizeW + _x, _y, 400, -1, true);
                    self.mapEffect[i] = eff;
                }
                else {
                    self.mapEffect[i].getMC().x = (bx + 1) * self.blockSizeW + _x;
                }
            }
            else {
                if (self.mapEffect[i]) {
                    var ef = self.mapEffect[i];
                    EffectMgr.instance.removeEff(ef);
                    self.mapEffect[i] = undefined;
                }
            }
        }
    };
    ScrollMap.prototype.clearEffect = function () {
        var self = this;
        self.mapEffectData = [];
        while (self.mapEffect.length) {
            var eff = self.mapEffect.shift();
            if (eff)
                EffectMgr.instance.removeEff(eff);
            eff = null;
        }
    };
    return ScrollMap;
}(egret.Sprite));
__reflect(ScrollMap.prototype, "ScrollMap");
