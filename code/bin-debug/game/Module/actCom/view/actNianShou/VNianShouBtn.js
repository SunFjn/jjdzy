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
var VNianShouBtn = (function (_super) {
    __extends(VNianShouBtn, _super);
    function VNianShouBtn() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    VNianShouBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComNianShou", "VNianShouBtn"));
    };
    VNianShouBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Object.defineProperty(VNianShouBtn.prototype, "checkNotice", {
        get: function () {
            return this._checkNotice;
        },
        set: function (value) {
            this._checkNotice = value;
            this.noticeImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    VNianShouBtn.prototype.setSt = function (st) {
        var s = this;
        s.checkNotice = false;
        if (s.iconEff) {
            EffectMgr.instance.removeEff(s.iconEff);
            s.iconEff = null;
        }
        Timer.instance.remove(s.upTime, s);
        if (st == 0) {
            Timer.instance.listen(s.upTime, s, 1000);
            s.upTime();
        }
        else if (st == 1) {
            s.lb.text = "已召唤";
        }
        else {
            s.lb.text = "已击退";
        }
    };
    VNianShouBtn.prototype.upTime = function () {
        var s = this;
        var cfg = Config.nian_299[5];
        if (Model_ActNianShou.getState(cfg.open, cfg.end)) {
            s.lb.text = "可召唤";
            if (!s.iconEff) {
                s.iconEff = EffectMgr.addEff("uieff/10021", s.displayListContainer, s.img.x + s.img.width / 2 - 7, s.img.y + s.img.height / 2 + 4, 1000, -1, true);
            }
        }
        else {
            var open_1 = cfg.open.split(":");
            var end = cfg.end.split(":");
            s.lb.text = open_1[0] + ":" + open_1[1] + "-" + end[0] + ":" + end[1];
            if (s.iconEff) {
                EffectMgr.instance.removeEff(s.iconEff);
                s.iconEff = null;
            }
        }
    };
    VNianShouBtn.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var s = this;
        if (s.iconEff) {
            EffectMgr.instance.removeEff(s.iconEff);
            s.iconEff = null;
        }
        Timer.instance.remove(s.upTime, s);
    };
    VNianShouBtn.URL = "ui://ht2966i4qdrxh";
    return VNianShouBtn;
}(fairygui.GButton));
__reflect(VNianShouBtn.prototype, "VNianShouBtn");
