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
var ViewMainTownBottom = (function (_super) {
    __extends(ViewMainTownBottom, _super);
    function ViewMainTownBottom() {
        return _super.call(this) || this;
    }
    ViewMainTownBottom.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.btnContainer.setXY(4, 8);
        this.btnContainer.setScale(0.9, 0.9);
        this.LayoutType = fairygui.GroupLayoutType.Horizontal;
        this.resetPosition();
    };
    ViewMainTownBottom.prototype.resetPosition = function () {
        // this.setXY(30, fairygui.GRoot.inst.height - 90 - ViewMainBottomUI.instance.height);
        this.setXY(10, fairygui.GRoot.inst.height - 90 - 121);
    };
    Object.defineProperty(ViewMainTownBottom, "instance", {
        get: function () {
            if (!ViewMainTownBottom._instance)
                ViewMainTownBottom._instance = new ViewMainTownBottom();
            return ViewMainTownBottom._instance;
        },
        enumerable: true,
        configurable: true
    });
    //特殊的系统没开放需要显示的不做处理，所以仅仅检查时限的活动
    ViewMainTownBottom.prototype.kaifuDayUpdate = function () {
    };
    /**外部加载完成再进行排序*/
    ViewMainTownBottom.prototype.aglin = function () {
        // super.aglin();
        var s = this;
        s.icons.sort(function (a, b) { return a.sortIndex > b.sortIndex ? 1 : -1; });
        var l = s.icons.length;
        var isH = s.LayoutType == fairygui.GroupLayoutType.Horizontal;
        var _x = 0;
        var _y = 0;
        for (var i = 0; i < l; i++) {
            s.icons[i].setXY(_x, _y);
            var mapcfg = Config.map_200[GGlobal.sceneID];
            if (mapcfg && String(mapcfg.icon).indexOf(s.icons[i].panelId + "") != -1) {
                if (s.icons[i].parent) {
                    this.btnContainer.removeChild(s.icons[i]);
                }
            }
            else {
                _x += s.icons[i].width;
                if (i == 7) {
                    _x = 0;
                    _y = -100;
                }
                this.btnContainer.addChild(s.icons[i]);
            }
        }
        this._yy = _y;
        this._xx = _x;
    };
    return ViewMainTownBottom;
}(BaseSceneUI));
__reflect(ViewMainTownBottom.prototype, "ViewMainTownBottom");
