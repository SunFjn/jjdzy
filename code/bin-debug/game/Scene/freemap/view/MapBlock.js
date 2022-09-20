var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapBlock = (function () {
    function MapBlock() {
        this.back = new fairygui.GLoader();
        this.back.setSize(100, 100);
        this.front = new fairygui.GLoader();
        this.front.setSize(100, 100);
    }
    MapBlock.prototype.setRC = function (r, c) {
        var self = this;
        self.row = r;
        self.col = c;
        self.back.y = self.front.y = r * ModelArpgMap.MAPBLOCKH;
        self.back.x = self.front.x = c * ModelArpgMap.MAPBLOCKW;
        var rckey = self.row + "_" + self.col;
        var src = ModelArpgMap.getInstance().sceneMapSRC;
        self.url = "resource/map/" + src + "/clipmap/" + rckey + ".jpg";
        self.url = RESManager.getVersionUrl(self.url);
        RESManager.addMapBlockURL(self.url, src);
        this.alphainfo = MapManager.alphamapinfo[rckey];
        if (this.alphainfo != null) {
            try {
                this.alphamask = this.alphainfo;
            }
            catch (e) {
                this.alphamask = null;
                this.alphainfo = null;
            }
        }
    };
    MapBlock.prototype.onLoadComplete = function (img, url) {
        if (url && url != this.url)
            return;
        IconUtil.addUrlCounter(url);
        var bm = img;
        this.back.texture = bm;
        this.back.scaleX = this.back.scaleY = 1;
        if (this.alphamask != null && this.back.texture != null) {
            this.front.texture = this.alphamask;
            MapBlock.RECTHELPER1.x = this.alphainfo.x;
            MapBlock.RECTHELPER1.y = this.alphainfo.y;
            MapBlock.RECTHELPER1.width = this.alphainfo.width;
            MapBlock.RECTHELPER1.height = this.alphainfo.height;
            this.alphamask = this.back.texture;
            this.front.x = this.col * ModelArpgMap.MAPBLOCKW + this.alphainfo.x;
            this.front.y = this.row * ModelArpgMap.MAPBLOCKH + this.alphainfo.y;
        }
    };
    MapBlock.prototype.dispose = function () {
        IconUtil.reduceUrlCounter(this.url);
        this.url = "";
        this.back.x = this.back.y = 0;
        this.front.x = this.front.y = 0;
        this._version = -1;
        if (this.front.texture != null) {
            this.front.texture = null;
            this.alphamask = null;
        }
        if (this.back.texture) {
            this.back.texture = null;
        }
        Pool.recover("MapBlock", this);
    };
    //辅助
    MapBlock.RECTHELPER1 = new egret.Rectangle();
    return MapBlock;
}());
__reflect(MapBlock.prototype, "MapBlock");
