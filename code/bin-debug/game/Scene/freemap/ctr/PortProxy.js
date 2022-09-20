var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PortProxy = (function () {
    function PortProxy() {
        this._matrix = new egret.Matrix();
        this._restritRect = new egret.Rectangle(0, 0, 1, 1);
        this._focusPoint = new egret.Point();
        this._portWid = 0;
        this._portHei = 0;
        this._pointRest = new egret.Point();
        this.scaleX = 1;
        this.scaleY = 1;
        this.tx = 0;
        this.ty = 0;
    }
    ;
    PortProxy.prototype.setTXY = function (ttx, tty) {
        this.tx = ttx;
        this.ty = tty;
        this.updateMatrix();
    };
    PortProxy.prototype.updateMatrix = function () {
        this._matrix.identity();
        this._matrix.scale(this.scaleX, this.scaleY);
        this._matrix.translate(this.tx, this.ty);
    };
    PortProxy.prototype.setRestrictWH = function (w, h) {
        this._restritRect.width = w;
        this._restritRect.height = h;
    };
    PortProxy.prototype.setPortWH = function (w, h) {
        this._portWid = w;
        this._portHei = h;
    };
    PortProxy.prototype.focusXY = function (x, y) {
        this._focusPoint.x = x;
        this._focusPoint.y = y;
    };
    PortProxy.prototype.setScale = function (scale) {
        this.scaleX = this.scaleY = scale;
        this.updateMatrix();
    };
    PortProxy.prototype.adjustRealPoint = function () {
        var dp = this._matrix.transformPoint(this._focusPoint.x, this._focusPoint.y);
        this._pointRest.x = dp.x;
        this._pointRest.y = dp.y;
        var portWid = Math.floor(this._portWid / this.scaleX);
        var portHei = Math.floor(this._portHei / this.scaleY);
        var rw = Math.floor(this._restritRect.width * this.scaleX);
        var rh = Math.floor(this._restritRect.height * this.scaleY);
        var rl = Math.floor(this._restritRect.left * this.scaleX);
        var rt = Math.floor(this._restritRect.top * this.scaleY);
        var rr = Math.floor(this._restritRect.right * this.scaleX);
        var rb = Math.floor(this._restritRect.bottom * this.scaleY);
        if (rw < this._portWid) {
            this._pointRest.x = (rr - this._portWid) / 2;
        }
        else if (dp.x < this._restritRect.left) {
            this._pointRest.x = this._restritRect.left;
        }
        else if (dp.x > rr - this._portWid) {
            this._pointRest.x = rr - this._portWid;
        }
        else {
            this._pointRest.x = dp.x;
        }
        if (rh < this._portHei) {
            this._pointRest.y = (rb - this._portHei) / 2;
        }
        else if (dp.y < this._restritRect.y) {
            this._pointRest.y = this._restritRect.y;
        }
        else if (dp.y > rb - this._portHei) {
            this._pointRest.y = rb - this._portHei;
        }
        else {
            this._pointRest.y = dp.y;
        }
    };
    return PortProxy;
}());
__reflect(PortProxy.prototype, "PortProxy");
