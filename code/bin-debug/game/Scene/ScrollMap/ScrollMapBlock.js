var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ScrollMapBlock = (function () {
    function ScrollMapBlock() {
        this.back = new fairygui.GLoader();
        this.back.setSize(100, 100);
        ScrollMapBlock.clientID++;
    }
    ScrollMapBlock.prototype.setRC = function (r, c) {
        this.row = r;
        this.col = c;
        var rckey = this.col + "_" + this.row;
        var src = Config.map_200[this.sceneid].s;
        if (src == 3102) {
            this.url = "resource/map/" + src + "/bgs512/" + rckey + ".png";
        }
        else {
            this.url = "resource/map/" + src + "/bgs512/" + rckey + ".jpg";
        }
        this.url = RESManager.getVersionUrl(this.url);
    };
    ScrollMapBlock.prototype.setXY = function (r, c, ax) {
        this.back.setXY(r * 512 - ax, c * 512);
    };
    ScrollMapBlock.prototype.onLoadComplete = function (img, url) {
        if (url && url != this.url)
            return;
        var bm = img;
        this.back.texture = bm;
        this.back.scaleX = this.back.scaleY = 1;
    };
    ScrollMapBlock.prototype.dispose = function () {
        RESManager.destoryRes(this.url);
        this.url = "";
        this.back.setXY(0, 0);
        if (this.back.texture) {
            this.back.texture = null;
        }
        Pool.recover("ScrollMapBlock", this);
    };
    ScrollMapBlock.clientID = 0;
    return ScrollMapBlock;
}());
__reflect(ScrollMapBlock.prototype, "ScrollMapBlock");
