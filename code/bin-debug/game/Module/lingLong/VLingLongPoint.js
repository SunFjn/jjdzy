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
var VLingLongPoint = (function (_super) {
    __extends(VLingLongPoint, _super);
    function VLingLongPoint() {
        return _super.call(this) || this;
    }
    VLingLongPoint.createInstance = function () {
        return (fairygui.UIPackage.createObject("lingLong", "VLingLongPoint"));
    };
    VLingLongPoint.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbPoint = (this.getChild("lbPoint"));
        this.btnPoint = (this.getChild("btnPoint"));
        this.noticeImg = (this.getChild("noticeImg"));
        this.lbCt = (this.getChild("lbCt"));
        this.imgGet = (this.getChild("imgGet"));
    };
    VLingLongPoint.prototype.setVo = function (v, base) {
        if (base === void 0) { base = 0; }
        this._vo = v;
        var pointCfg = Config.llgpoint_239[v.point];
        var need = base + pointCfg.point;
        this.lbPoint.text = "积分:" + pointCfg.point;
        this.lbCt.text = "";
        if (v.status > 0) {
            this.noticeImg.visible = true;
            this.imgGet.visible = false;
            if (v.status > 1) {
                this.lbCt.text = "" + v.status;
            }
        }
        else if (pointCfg == null || Model_LingLong.myPoint < need) {
            this.noticeImg.visible = false;
            this.imgGet.visible = false;
        }
        else if (v.status == -1) {
            this.noticeImg.visible = false;
            this.imgGet.visible = true;
        }
        else {
            this.noticeImg.visible = false;
            this.imgGet.visible = false;
        }
        var rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(pointCfg.reward));
        this.btnPoint.isShowEff = true;
        this.btnPoint.tipEnabled = false;
        this.btnPoint.vo = rewardArr[0];
    };
    Object.defineProperty(VLingLongPoint.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    VLingLongPoint.prototype.clean = function () {
        this.btnPoint.vo = null;
    };
    VLingLongPoint.URL = "ui://1xperbsypk53l";
    return VLingLongPoint;
}(fairygui.GComponent));
__reflect(VLingLongPoint.prototype, "VLingLongPoint");
