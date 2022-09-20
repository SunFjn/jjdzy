var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoaderManager = (function () {
    function LoaderManager() {
        //public loadingCtx:LoaderCtx;
        this.idleLoaders = [];
        this.queue = new Array();
        this.ctxMap = {};
        for (var i = 0; i < 2; i++) {
            var loader = new egret.URLLoader();
            loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            loader.addEventListener(egret.Event.COMPLETE, this.onImgComp, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onImgError, this);
            this.idleLoaders.push(loader);
        }
    }
    LoaderManager.prototype.addLoad = function (url, complete, self, restype, arg, tick, error) {
        if (restype === void 0) { restype = 0; }
        if (arg === void 0) { arg = null; }
        if (tick === void 0) { tick = null; }
        if (error === void 0) { error = null; }
        var item = LoaderItem.create();
        item.arg = arg;
        item.complete = complete;
        item.tick = tick;
        item.error = error;
        item.url = url;
        item.self = self;
        item.restype = restype;
        this.addLoadItem(item);
        //console.log("starLoad:"+url);
    };
    LoaderManager.prototype.addLoadItem = function (item) {
        var ctx = this.ctxMap[item.url];
        if (ctx == null) {
            ctx = this.ctxMap[item.url] = LoaderCtx.create();
            ctx.url = item.url;
            ctx.restype = item.restype;
            this.insertCtx(ctx);
        }
        ctx.items.push(item);
        item.ctx = ctx;
        if (ctx.removed) {
            ctx.removed = null;
        }
        this.checkLoad();
    };
    LoaderManager.prototype.insertCtx = function (ctx) {
        this.queue.push(ctx);
    };
    LoaderManager.prototype.checkLoad = function () {
        if (this.idleLoaders.length > 0 && this.queue.length > 0) {
            var ctx = this.queue.pop();
            var loader = this.idleLoaders.shift();
            loader.ctx = ctx;
            ctx.loader = loader;
            if (true) {
                if (ctx.restype == LoaderManager.RES_T_TEXTURE) {
                    loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
                }
                else {
                    loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                }
                var request = new egret.URLRequest(GGlobal.resHead + ctx.url);
                loader.load(request);
            }
        }
    };
    LoaderManager.prototype.onImgComp = function (e) {
        var loader = e.target;
        var ctx = loader.ctx;
        if (ctx.removed) {
            loader.loadingCtx = null;
            this.idleLoaders.push(loader);
            delete this.ctxMap[ctx.url];
            return;
        }
        //console.log("loadComp:"+curCtx.url);
        ctx.items.forEach(function (element) {
            if (element.complete) {
                element.complete(element);
            }
        });
        loader.ctx = null;
        ctx.loader = null;
        this.idleLoaders.push(loader);
        delete this.ctxMap[ctx.url];
        this.checkLoad();
    };
    LoaderManager.prototype.onImgError = function (e) {
        var loader = e.target;
        var ctx = loader.ctx;
        console.log("loadError:" + ctx.url);
        if (ctx.removed) {
            loader.loadingCtx = null;
            this.idleLoaders.push(loader);
            delete this.ctxMap[ctx.url];
            return;
        }
        ctx.items.forEach(function (element) {
            if (element.error) {
                element.error(element);
            }
        });
        loader.loadingCtx = null;
        ctx.loader = null;
        this.idleLoaders.push(loader);
        delete this.ctxMap[ctx.url];
        this.checkLoad();
    };
    LoaderManager.prototype.removeLoad = function (url) {
        var ctx = this.ctxMap[url];
        if (ctx) {
            delete this.ctxMap[url];
            ctx.removed = true;
            if (ctx.loader) {
            }
            else {
                this.queue.splice(this.queue.indexOf(ctx), 1);
            }
        }
    };
    LoaderManager.RES_T_TEXTURE = 0;
    LoaderManager.RES_T_TEXT = 1;
    return LoaderManager;
}());
__reflect(LoaderManager.prototype, "LoaderManager");
