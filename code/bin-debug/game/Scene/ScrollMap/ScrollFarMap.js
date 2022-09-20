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
var ScrollFarMap = (function (_super) {
    __extends(ScrollFarMap, _super);
    function ScrollFarMap() {
        var _this = _super.call(this) || this;
        //固定的远景
        //滚动的一些装饰物
        _this.farbgs = [];
        _this.activating = false;
        _this._x = 0;
        _this.farLayer = new egret.Sprite();
        _this.addChild(_this.farLayer);
        _this.thingLayer = new egret.Sprite();
        _this.addChild(_this.thingLayer);
        _this.farbgs = [];
        _this.decorations = [];
        GGlobal.control.listen(Enum_MsgType.ONRESIZE, _this.redrawMap, _this);
        return _this;
    }
    ScrollFarMap.prototype.enterMap = function (id) {
        var cfg = Config.map_200[id];
        var s = this;
        s.mapid = id;
        s.decorationJSON = cfg.j;
        s.srcid = cfg.s;
        s.activating = s.visible = cfg.type == 3;
        s.testloadFarMapBg(s.activating);
        s.testloadmidMapBg(s.activating);
    };
    ScrollFarMap.prototype.redrawMap = function () {
        this.testloadFarMapBg(this.activating);
    };
    ScrollFarMap.prototype.testloadFarMapBg = function (v) {
        this.farLayer.visible = v;
        if (!v)
            return;
        if (!this.activating)
            return;
        var w = App.stageWidth;
        var len = this.farbgs.length;
        var max = Math.ceil(w / 1600);
        var farBg;
        for (var i = 0; i < len; i++) {
            farBg = this.farbgs[i];
            farBg.removeFromParent();
        }
        for (var j = 0; j < max; j++) {
            if (j < len) {
                farBg = this.farbgs[j];
            }
            else {
                farBg = new fairygui.GLoader();
                this.farbgs.push(farBg);
            }
            farBg.setXY(j * 1600, 0);
            this.farLayer.addChild(farBg.displayObject);
            ImageLoader.instance.loader("resource/map/" + this.srcid + "/clipmap/1_1.jpg", farBg);
        }
    };
    ScrollFarMap.prototype.testloadmidMapBg = function (v) {
        if (!v)
            return;
        var s = this;
        var data = [
            { "c": 1, "x": 134, "y": 163, "t": 30, "a": "a3" },
            { "c": 1, "x": 800, "y": 167, "t": 30, "a": "a5" },
            { "c": 1, "x": 1436, "y": 167, "t": 30, "a": "a5" }
        ];
        var nowLen = data.length;
        var lastLen = s.decorations.length;
        data = data.sort(function (a, b) {
            return a.y < b.y ? -1 : 1;
        });
        for (var i = 0; i < nowLen; i++) {
            var pic = void 0;
            if (i < lastLen) {
                pic = s.decorations[i];
            }
            else {
                pic = new MapDecoration();
                s.decorations.push(pic);
            }
            pic.add(data[i], s.thingLayer, i);
        }
        if (nowLen < lastLen) {
            for (var j = nowLen - 1; j < lastLen; j++) {
                var pic = s.decorations[j];
                pic.dispose();
            }
        }
    };
    ScrollFarMap.prototype.move = function () {
        var s = this;
        s._x += 3;
        if (!s.activating) {
            return;
        }
        var len = s.decorations.length - 1;
        for (var i = len; i >= 0; i--) {
            s.decorations[i].move(s._x);
        }
    };
    ScrollFarMap.prototype.dispose = function () {
        var s = this;
        s.visible = false;
        var nowLen = s.decorations.length;
        for (var i = 0; i < nowLen; i++) {
            var pic = void 0;
            pic = s.decorations[i];
            pic.dispose();
        }
    };
    return ScrollFarMap;
}(egret.Sprite));
__reflect(ScrollFarMap.prototype, "ScrollFarMap");
