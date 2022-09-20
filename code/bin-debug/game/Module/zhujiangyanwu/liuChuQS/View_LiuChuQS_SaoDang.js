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
var View_LiuChuQS_SaoDang = (function (_super) {
    __extends(View_LiuChuQS_SaoDang, _super);
    function View_LiuChuQS_SaoDang() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_LiuChuQS_SaoDang.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "View_LiuChuQS_SaoDang"));
    };
    View_LiuChuQS_SaoDang.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("zjyw", "View_LiuChuQS_SaoDang").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.list.itemRenderer = this.rendHandler;
        this.list.callbackThisObj = this;
        _super.prototype.childrenCreated.call(this);
    };
    View_LiuChuQS_SaoDang.prototype.onShown = function () {
        this.addListen();
        this.update(this._args);
    };
    View_LiuChuQS_SaoDang.prototype.onHide = function () {
        this.removeListen();
    };
    View_LiuChuQS_SaoDang.prototype.addListen = function () {
        this.btnSure.addClickListener(this.closeEventHandler, this);
    };
    View_LiuChuQS_SaoDang.prototype.removeListen = function () {
        this.list.numItems = 0;
        this.btnSure.removeClickListener(this.closeEventHandler, this);
    };
    View_LiuChuQS_SaoDang.prototype.update = function (arr) {
        var guanTxt = "";
        this._dropArr = [];
        for (var i = 0; i < arr.length; i++) {
            var guan = arr[i].guan;
            var cfg = Config.six_279[guan];
            var k = guan % 1000;
            if (i == 0) {
                guanTxt += cfg.big + "第" + k + "关";
            }
            else if (i == arr.length - 1) {
                guanTxt += "-" + cfg.big + "第" + k + "关";
            }
            var dropArr = ConfigHelp.makeItemListArr(arr[i].drop);
            //合并奖励
            for (var m = 0; m < dropArr.length; m++) {
                var has = false;
                var mvo = dropArr[m];
                if (mvo.gType != Enum_Attr.EQUIP) {
                    for (var n = 0; n < this._dropArr.length; n++) {
                        var nvo = this._dropArr[n];
                        if (mvo.gType == nvo.gType && mvo.id == nvo.id) {
                            nvo.count += mvo.count;
                            has = true;
                            break;
                        }
                    }
                }
                if (!has) {
                    this._dropArr.push(mvo);
                }
            }
        }
        this.labGuan.text = guanTxt;
        this.list.numItems = this._dropArr.length;
    };
    View_LiuChuQS_SaoDang.prototype.rendHandler = function (index, grid) {
        grid.tipEnabled = true;
        grid.isShowEff = true;
        grid.vo = this._dropArr[index];
    };
    View_LiuChuQS_SaoDang.URL = "ui://7a366usasr401h";
    return View_LiuChuQS_SaoDang;
}(UIModalPanel));
__reflect(View_LiuChuQS_SaoDang.prototype, "View_LiuChuQS_SaoDang");
