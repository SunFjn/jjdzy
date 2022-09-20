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
var View_WuShengRank_Panel = (function (_super) {
    __extends(View_WuShengRank_Panel, _super);
    function View_WuShengRank_Panel() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        fairygui.UIObjectFactory.setPackageItemExtension(WuShengRankItem.URL, WuShengRankItem);
        _this.childrenCreated();
        return _this;
    }
    View_WuShengRank_Panel.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("wushengList", "View_WuShengRank_Panel").asCom;
        this.contentPane = this.view;
        this.powerImg = (this.view.getChild("powerImg"));
        this.passImg = (this.view.getChild("passImg"));
        for (var i = 0; i < 10; i++) {
            var item = (this.view.getChild("item" + i));
            this.itemArr.push(item);
        }
        _super.prototype.childrenCreated.call(this);
    };
    View_WuShengRank_Panel.prototype.updateShow = function () {
        var cfg = Config.ws_238[this._args];
        this.frame.asLabel.text = cfg.name;
        this.powerImg.visible = this._args != 6;
        this.passImg.visible = this._args == 6;
        for (var i = 0; i < this.itemArr.length; i++) {
            this.itemArr[i].show(Model_WuShengList.rankArr[i], i + 1);
        }
    };
    View_WuShengRank_Panel.prototype.onShown = function () {
        this.updateShow();
    };
    View_WuShengRank_Panel.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.WUSHENGLIST_RANK);
    };
    View_WuShengRank_Panel.URL = "ui://a8l39nm9rkjpb";
    return View_WuShengRank_Panel;
}(UIModalPanel));
__reflect(View_WuShengRank_Panel.prototype, "View_WuShengRank_Panel");
