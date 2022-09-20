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
var IScene = (function (_super) {
    __extends(IScene, _super);
    function IScene() {
        return _super.call(this) || this;
    }
    IScene.prototype.show = function () {
    };
    IScene.prototype.reSize = function () {
    };
    IScene.prototype.sortChild = function () { };
    IScene.prototype.disposeScene = function () {
        while (this.numChildren) {
            var child = this.getChildAt(0);
            if (child instanceof fairygui.GImage)
                child.texture.dispose();
            this.removeChild(child);
        }
    };
    IScene.prototype.reSizeNow = function () {
        this.reSize();
    };
    return IScene;
}(fairygui.GComponent));
__reflect(IScene.prototype, "IScene");
