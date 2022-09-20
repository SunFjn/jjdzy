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
var fairygui;
(function (fairygui) {
    var UIContainer = (function (_super) {
        __extends(UIContainer, _super);
        function UIContainer() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = true;
            _this.touchChildren = true;
            return _this;
        }
        Object.defineProperty(UIContainer.prototype, "invertedMatrix", {
            set: function (matrix) {
                this._invertedMatrix = matrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIContainer.prototype, "hitArea", {
            get: function () {
                return this._hitArea;
            },
            set: function (value) {
                if (this._hitArea && value) {
                    this._hitArea.x = value.x;
                    this._hitArea.y = value.y;
                    this._hitArea.width = value.width;
                    this._hitArea.height = value.height;
                }
                else
                    this._hitArea = (value ? value.clone() : null);
            },
            enumerable: true,
            configurable: true
        });
        UIContainer.prototype.$hitTest = function (stageX, stageY) {
            var ret = _super.prototype.$hitTest.call(this, stageX, stageY);
            if (ret == this) {
                if (!this.touchEnabled || this._hitArea == null)
                    return null;
            }
            else if (ret == null && this.touchEnabled && this.visible && this._hitArea != null) {
                var m = this._invertedMatrix;
                if (m == null) {
                    m = this.$getInvertedConcatenatedMatrix();
                }
                var localX = m.a * stageX + m.c * stageY + m.tx;
                var localY = m.b * stageX + m.d * stageY + m.ty;
                if (this._hitArea.contains(localX, localY))
                    ret = this;
            }
            return ret;
        };
        return UIContainer;
    }(egret.DisplayObjectContainer));
    fairygui.UIContainer = UIContainer;
    __reflect(UIContainer.prototype, "fairygui.UIContainer");
})(fairygui || (fairygui = {}));
