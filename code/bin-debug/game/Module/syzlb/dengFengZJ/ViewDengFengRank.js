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
var ViewDengFengRank = (function (_super) {
    __extends(ViewDengFengRank, _super);
    function ViewDengFengRank() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewDengFengRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ViewDengFengRank"));
    };
    ViewDengFengRank.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("syzlb", "ViewDengFengRank").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderRew;
        s.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewDengFengRank.prototype.onShown = function () {
        var s = this;
        s.registerEvent(true);
        s._type = s._args;
        var m = GGlobal.modelDengFengZJ;
        m.CG_RANK_REWARD(s._type);
    };
    ViewDengFengRank.prototype.onHide = function () {
        var s = this;
        s.list.numItems = 0;
        s.registerEvent(false);
        s.lbRank.text = "";
        s.lbPoint.text = "";
    };
    ViewDengFengRank.prototype.registerEvent = function (pFlag) {
        var self = this;
        var m = GGlobal.modelDengFengZJ;
        m.register(pFlag, Model_DengFengZJ.RANK_DAT, self.update, self);
    };
    ViewDengFengRank.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelDengFengZJ;
        if (s._type == 0) {
            s.lbRank.text = "我的排名：" + (m.seaRank == 0 ? "未上榜" : HtmlUtil.fontNoSize(m.seaRank + "", Color.GREENSTR));
            s.lbPoint.text = "我的积分：" + HtmlUtil.fontNoSize(m.seaPoint + "", Color.GREENSTR);
            s._lstArr = m.getCfgRankSea();
        }
        else {
            s.lbRank.text = "我的排名：" + (m.finalRank == 0 ? "未上榜" : HtmlUtil.fontNoSize(m.finalRank + "", Color.GREENSTR));
            s.lbPoint.text = "我的积分：" + HtmlUtil.fontNoSize(m.finalPoint + "", Color.GREENSTR);
            s._lstArr = m.getCfgRankFinal();
        }
        s.list.numItems = s._lstArr.length;
    };
    ViewDengFengRank.prototype.renderRew = function (index, obj) {
        obj.setVo(this._lstArr[index], this._type, index + 1);
    };
    ViewDengFengRank.URL = "ui://3o8q23uua0u32a";
    return ViewDengFengRank;
}(UIModalPanel));
__reflect(ViewDengFengRank.prototype, "ViewDengFengRank");
