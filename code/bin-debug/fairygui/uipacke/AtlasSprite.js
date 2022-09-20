var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var AtlasSprite = (function () {
        function AtlasSprite() {
            this.rect = new egret.Rectangle();
        }
        return AtlasSprite;
    }());
    fairygui.AtlasSprite = AtlasSprite;
    __reflect(AtlasSprite.prototype, "fairygui.AtlasSprite");
})(fairygui || (fairygui = {}));
