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
/**关卡界面右边容器  放置活动预告 功能开放*/
var ViewMainUIRightTipContainer = (function (_super) {
    __extends(ViewMainUIRightTipContainer, _super);
    function ViewMainUIRightTipContainer() {
        var _this = _super.call(this) || this;
        _this.maxWidth = 150;
        _this.itemVec = [];
        GGlobal.control.listen(Enum_MsgType.ONRESIZE, _this.setPosition, _this);
        return _this;
    }
    ViewMainUIRightTipContainer.getInstance = function () {
        if (!this.inst)
            this.inst = new ViewMainUIRightTipContainer();
        return this.inst;
    };
    ViewMainUIRightTipContainer.prototype.setPosition = function () {
        this.setXY(fairygui.GRoot.inst.width + GGlobal.layerMgr.offx - this.maxWidth, ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + ViewMainTopUI2.instance.height + 20);
    };
    ViewMainUIRightTipContainer.prototype.addCompnent = function (item, inHead) {
        if (this.itemVec.indexOf(item) >= 0)
            return;
        if (inHead) {
            this.itemVec.unshift(item);
        }
        else {
            this.itemVec.push(item);
        }
        this.addChild(item);
        this.adjust();
    };
    ViewMainUIRightTipContainer.prototype.removeCompnent = function (item) {
        var idx = this.itemVec.indexOf(item);
        if (idx < 0)
            return;
        this.itemVec.splice(idx, 1);
        item.removeFromParent();
        this.adjust();
    };
    ViewMainUIRightTipContainer.prototype.adjust = function () {
        var vec = this.itemVec;
        var j = vec.length;
        var startY = 0;
        this.maxWidth = 0;
        for (var i = 0; i < j; i++) {
            var itrem = vec[i];
            var itemWidth = itrem.initWidth;
            this.maxWidth = itemWidth > this.maxWidth ? itemWidth : this.maxWidth;
            var itemx = (this.maxWidth - itemWidth) >> 1;
            itrem.setXY(itemx, startY);
            startY += itrem.height;
            startY += 5;
        }
        this.setPosition();
    };
    return ViewMainUIRightTipContainer;
}(fairygui.GComponent));
__reflect(ViewMainUIRightTipContainer.prototype, "ViewMainUIRightTipContainer");
