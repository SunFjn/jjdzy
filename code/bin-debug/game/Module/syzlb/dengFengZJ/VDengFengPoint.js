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
var VDengFengPoint = (function (_super) {
    __extends(VDengFengPoint, _super);
    function VDengFengPoint() {
        return _super.call(this) || this;
    }
    VDengFengPoint.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "VDengFengPoint"));
    };
    VDengFengPoint.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderRew;
        s.btnGet.addClickListener(s.onGet, s);
    };
    Object.defineProperty(VDengFengPoint.prototype, "vo", {
        set: function (v) {
            var s = this;
            var m = GGlobal.modelDengFengZJ;
            s._vo = v;
            s.lb.text = v.point + "";
            s._lisDat = ConfigHelp.makeItemListArr(JSON.parse(v.reward));
            s.list.numItems = s._lisDat.length;
            var st = m.pointDat[v.id];
            var point = m.seaPoint;
            if (st) {
                s.imgHas.visible = true;
                s.lbNO.visible = false;
                s.btnGet.visible = false;
            }
            else {
                s.imgHas.visible = false;
                if (point >= v.point) {
                    s.btnGet.visible = true;
                    s.btnGet.checkNotice = true;
                    s.lbNO.visible = false;
                }
                else {
                    s.btnGet.visible = false;
                    s.lbNO.visible = true;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    VDengFengPoint.prototype.onGet = function () {
        var s = this;
        if (!s._vo) {
            return;
        }
        GGlobal.modelDengFengZJ.CG_POINT_GET(s._vo.id);
    };
    VDengFengPoint.prototype.renderRew = function (index, obj) {
        obj.isShowEff = obj.tipEnabled = true;
        obj.vo = this._lisDat[index];
    };
    VDengFengPoint.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var s = this;
        s.list.numItems = 0;
        s._vo = null;
    };
    VDengFengPoint.URL = "ui://3o8q23uua0u32d";
    return VDengFengPoint;
}(fairygui.GComponent));
__reflect(VDengFengPoint.prototype, "VDengFengPoint");
