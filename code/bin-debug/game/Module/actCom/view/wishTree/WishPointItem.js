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
var WishPointItem = (function (_super) {
    __extends(WishPointItem, _super);
    function WishPointItem() {
        var _this = _super.call(this) || this;
        _this.status = 0;
        return _this;
    }
    WishPointItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    WishPointItem.prototype.setVo = function (v) {
        // this._vo = v;
        this.cfg = v;
        if (v == null) {
            this.btnPoint.vo = null;
            this.noticeImg.visible = false;
            this.imgGet.visible = false;
            this.lbPoint.text = "";
            this.lbCt.text = "";
            return;
        }
        var model = GGlobal.modelWishTree;
        // let pointCfg:Ixysmbb_328 = Config.xysmbb_328[v.id];
        var need = v.cs;
        this.lbPoint.text = v.cs + "次";
        this.lbCt.text = "";
        this.status = model.targetMap[v.id];
        this.btnPoint.tipEnabled = true;
        if (this.status > 0) {
            this.noticeImg.visible = true;
            this.imgGet.visible = false;
            this.lbCt.text = "" + this.status;
            this.btnPoint.tipEnabled = false;
        }
        else if (v == null || model.wish < need) {
            this.noticeImg.visible = false;
            this.imgGet.visible = false;
        }
        else if (this.status == -1) {
            this.noticeImg.visible = false;
            this.imgGet.visible = true;
        }
        else {
            this.noticeImg.visible = false;
            this.imgGet.visible = false;
        }
        var rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward));
        this.btnPoint.isShowEff = true;
        this.btnPoint.vo = rewardArr[0];
    };
    // public get vo(): WishTreeVO {
    // 	return this._vo;
    // }
    WishPointItem.prototype.clean = function () {
    };
    WishPointItem.URL = "ui://zyevj37nlwy25";
    return WishPointItem;
}(fairygui.GComponent));
__reflect(WishPointItem.prototype, "WishPointItem");
