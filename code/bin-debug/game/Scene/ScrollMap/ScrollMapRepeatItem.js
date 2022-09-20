var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ScrollMapRepeatItem = (function () {
    function ScrollMapRepeatItem() {
        this.imgTileFar = new fairygui.GLoader();
        this.imgTileFar.fill = fairygui.LoaderFillType.ScaleFree;
        this.imgTileFar.setSize(1.5625 * 1024, 1.5625 * 727);
        this.imgTileNear = new fairygui.GLoader();
        this.imgTileNear.fill = fairygui.LoaderFillType.ScaleFree;
        this.imgTileNear.setSize(1.5625 * 1024, 1.5625 * 727);
    }
    ScrollMapRepeatItem.CREATEFUNC = function (scrollmap, k, r, c) {
        var ret = ScrollMapRepeatItem.pool.length ? ScrollMapRepeatItem.pool.shift() : new ScrollMapRepeatItem();
        ret.scrollmap = scrollmap;
        ret.k = k;
        ret.r = r;
        ret.c = c;
        ret.mapEffect = [];
        return ret;
    };
    ScrollMapRepeatItem.prototype.onAdd = function () {
        var self = this;
        self.head = self.scrollmap.head;
        var imgType = "jpg";
        if (!self.head)
            return;
        var mid = self.scrollmap.mid;
        var lib = Config.map_200[mid];
        if (lib.type != 0)
            imgType = "png";
        var imgIndexR = self.r % self.scrollmap.va.numRow; //循环索引 row
        var imgIndexC = self.r % self.scrollmap.va.numCol; //循环索引 col
        if (self.head) {
            var imgUrlNear = self.imgUrlNear = "resource/map/" + self.scrollmap.head + "/clipmap/0_0." + imgType;
            ImageLoader.instance.loader(imgUrlNear, self.imgTileNear, Handler.create(self, self.onImgLoaded));
        }
        var parent = self.scrollmap.tileLayer;
        self.imgTileNear.x = self.c * self.scrollmap.blockSizeW;
        self.imgTileNear.y = self.r * self.scrollmap.blockSizeH;
        if (lib.type == 1) {
            var imgUrlFar = self.imgUrlFar = "resource/map/" + self.scrollmap.head + "/clipmap/1_1." + imgType;
            ImageLoader.instance.loader(imgUrlFar, self.imgTileFar, Handler.create(self, self.onFarImgLoaded));
            parent.addChild(self.imgTileFar.displayObject);
            self.imgTileFar.x = self.imgTileNear.x;
            self.imgTileFar.y = self.imgTileNear.y;
        }
        parent.addChild(self.imgTileNear.displayObject);
    };
    ScrollMapRepeatItem.prototype.onFarImgLoaded = function (bmd) {
        // if (this.imgTileFar) {
        // 	this.imgTileFar.texture = bmd;
        // }
        // if (bmd == null) {
        // 	GGlobal.resMgr.onLoaded();
        // }
    };
    ScrollMapRepeatItem.prototype.onImgLoaded = function (bmd) {
        // if (this.imgTileNear) {
        // 	this.imgTileNear.texture = bmd;
        // }
        // if (bmd == null) {
        // 	GGlobal.resMgr.onLoaded();
        // }
    };
    ScrollMapRepeatItem.prototype.onRemove = function () {
        var self = this;
        self.mapEffect = {};
        this.shakeVal = 0;
        ScrollMapRepeatItem.pool.push(this);
    };
    Object.defineProperty(ScrollMapRepeatItem.prototype, "shakeVal", {
        set: function (v) {
            this.imgTileFar.y = 15 * v;
        },
        enumerable: true,
        configurable: true
    });
    ScrollMapRepeatItem.prototype.dispose = function () {
    };
    ScrollMapRepeatItem.prototype.onEvent = function (evt, arg) {
    };
    ScrollMapRepeatItem.pool = [];
    return ScrollMapRepeatItem;
}());
__reflect(ScrollMapRepeatItem.prototype, "ScrollMapRepeatItem");
