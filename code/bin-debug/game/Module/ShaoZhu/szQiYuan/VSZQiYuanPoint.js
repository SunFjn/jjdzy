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
var VSZQiYuanPoint = (function (_super) {
    __extends(VSZQiYuanPoint, _super);
    function VSZQiYuanPoint() {
        return _super.call(this) || this;
    }
    VSZQiYuanPoint.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbPoint = (this.getChild("lbPoint"));
        this.btnPoint = (this.getChild("btnPoint"));
        this.noticeImg = (this.getChild("noticeImg"));
        this.lbCt = (this.getChild("lbCt"));
        this.imgGet = (this.getChild("imgGet"));
    };
    VSZQiYuanPoint.prototype.setVo = function (v, base) {
        if (base === void 0) { base = 0; }
        this._vo = v;
        if (v == null) {
            this.btnPoint.vo = null;
            this.noticeImg.visible = false;
            this.imgGet.visible = false;
            this.lbPoint.text = "";
            this.lbCt.text = "";
            return;
        }
        var model = GGlobal.modelSZQiYuan;
        var pointCfg = Config.sonpoint_267[v.id];
        var need = base + pointCfg.point;
        this.lbPoint.text = "积分:" + pointCfg.point;
        this.lbCt.text = "";
        if (v.ct > 0) {
            this.noticeImg.visible = true;
            this.imgGet.visible = false;
            if (v.ct > 1) {
                this.lbCt.text = "" + v.ct;
            }
        }
        else if (pointCfg == null || model.myPoint < need) {
            this.noticeImg.visible = false;
            this.imgGet.visible = false;
        }
        else if (v.ct == -1) {
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
    VSZQiYuanPoint.prototype.clean = function () {
        this.btnPoint.vo = null;
    };
    Object.defineProperty(VSZQiYuanPoint.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    VSZQiYuanPoint.URL = "ui://p83wyb2bsr6c17";
    return VSZQiYuanPoint;
}(fairygui.GComponent));
__reflect(VSZQiYuanPoint.prototype, "VSZQiYuanPoint");
