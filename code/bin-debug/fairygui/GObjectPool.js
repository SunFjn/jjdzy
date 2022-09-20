var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var GObjectPool = (function () {
        function GObjectPool() {
            this._count = 0;
            this._pool = {};
        }
        GObjectPool.prototype.clear = function () {
            for (var i1 in this._pool) {
                var arr = this._pool[i1];
                var cnt = arr.length;
                for (var i = 0; i < cnt; i++)
                    arr[i].dispose();
            }
            this._pool = {};
            this._count = 0;
        };
        Object.defineProperty(GObjectPool.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        GObjectPool.prototype.getObject = function (url) {
            url = fairygui.UIPackage.normalizeURL(url);
            if (url == null)
                return null;
            var arr = this._pool[url];
            if (arr != null && arr.length) {
                this._count--;
                return arr.shift();
            }
            var child = fairygui.UIPackage.createObjectFromURL(url);
            return child;
        };
        GObjectPool.prototype.returnObject = function (obj) {
            var url = obj.resourceURL;
            if (!url)
                return;
            var arr = this._pool[url];
            if (arr == null) {
                arr = new Array();
                this._pool[url] = arr;
            }
            this._count++;
            arr.push(obj);
        };
        return GObjectPool;
    }());
    fairygui.GObjectPool = GObjectPool;
    __reflect(GObjectPool.prototype, "fairygui.GObjectPool");
})(fairygui || (fairygui = {}));
