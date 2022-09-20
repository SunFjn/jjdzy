var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ImageLoader = (function () {
    function ImageLoader() {
        this.map = {};
        this.loaderVoMap = {};
    }
    Object.defineProperty(ImageLoader, "instance", {
        get: function () {
            if (!this._ins) {
                this._ins = new ImageLoader();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    ImageLoader.loader = function (url, img, loadCom) {
        ImageLoader.instance.loader(url, img, loadCom);
    };
    /**url是不加head的，统一在这里加上 */
    ImageLoader.prototype.loader = function (url, img, loadCom) {
        this.removeLoader(img);
        img.texture = null;
        var u = RESManager.getVersionUrl(url);
        IconUtil.addUrlCounter(u);
        var item = this.map[u];
        if (!item) {
            this.map[u] = item = ImgLoaderItem.getObjFromPool();
            item.url = u;
        }
        var t_loaderVo = LoaderVo.getObjFromPool();
        t_loaderVo.url = u;
        t_loaderVo.handler = loadCom;
        this.loaderVoMap[img.hashCode] = t_loaderVo;
        item.list.push(img);
        if (!item.isLoader) {
            item.isLoader = true;
            RES.getResByUrl(u, this.loadComplete, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    ImageLoader.prototype.removeLoader = function (img) {
        var code = img.hashCode;
        var t_loaderVo = this.loaderVoMap[code];
        if (!t_loaderVo)
            return;
        var item = this.map[t_loaderVo.url];
        var index = item.list.indexOf(img);
        if (index >= 0) {
            item.list.splice(index, 1);
            if (item.list.length <= 0) {
                delete this.map[t_loaderVo.url];
                ImgLoaderItem.recycleToPool(item);
            }
        }
        delete this.loaderVoMap[code];
        LoaderVo.recycleToPool(t_loaderVo);
    };
    ImageLoader.prototype.loadComplete = function (texture, url) {
        var item = this.map[url];
        if (item) {
            delete this.map[url];
            for (var i = 0, len = item.list.length; i < len; i++) {
                var t_loader = item.list[i];
                t_loader.texture = texture;
                var t_loaderVo = this.loaderVoMap[t_loader.hashCode];
                if (t_loaderVo) {
                    var t_handler = t_loaderVo.handler;
                    if (t_handler)
                        t_handler.run();
                    delete this.loaderVoMap[t_loader.hashCode];
                    LoaderVo.recycleToPool(t_loaderVo);
                }
            }
            ImgLoaderItem.recycleToPool(item);
        }
    };
    return ImageLoader;
}());
__reflect(ImageLoader.prototype, "ImageLoader");
var ImgLoaderItem = (function () {
    function ImgLoaderItem() {
        this.list = [];
    }
    //============== 静态管理 ===================
    ImgLoaderItem.getObjFromPool = function () {
        var t_vo = Pool.getItemByClass("ImgLoaderItem", ImgLoaderItem);
        return t_vo;
    };
    ImgLoaderItem.recycleToPool = function (pVo) {
        pVo.recycle();
        Pool.recover("ImgLoaderItem", pVo);
    };
    ImgLoaderItem.prototype.recycle = function () {
        this.url = "";
        this.list.length = 0;
        this.isLoader = false;
    };
    return ImgLoaderItem;
}());
__reflect(ImgLoaderItem.prototype, "ImgLoaderItem");
var LoaderVo = (function () {
    function LoaderVo() {
    }
    LoaderVo.getObjFromPool = function () {
        var t_vo = Pool.getItemByClass("LoaderVo", LoaderVo);
        return t_vo;
    };
    LoaderVo.recycleToPool = function (pVo) {
        pVo.recycle();
        Pool.recover("LoaderVo", pVo);
    };
    LoaderVo.prototype.recycle = function () {
        this.url = "";
        this.handler = null;
    };
    //============== 静态管理 ===================
    LoaderVo._pool = [];
    return LoaderVo;
}());
__reflect(LoaderVo.prototype, "LoaderVo");
