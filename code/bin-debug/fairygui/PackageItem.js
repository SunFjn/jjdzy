var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var PackageItem = (function () {
        function PackageItem() {
            this.width = 0;
            this.height = 0;
            this.tileGridIndice = 0;
            //public pixelHitTestData: PixelHitTestData;
            //movieclip
            this.interval = 0;
            this.repeatDelay = 0;
        }
        PackageItem.prototype.load = function () {
            return this.owner.getItemAsset(this);
        };
        PackageItem.prototype.toString = function () {
            return this.name;
        };
        return PackageItem;
    }());
    fairygui.PackageItem = PackageItem;
    __reflect(PackageItem.prototype, "fairygui.PackageItem");
})(fairygui || (fairygui = {}));
