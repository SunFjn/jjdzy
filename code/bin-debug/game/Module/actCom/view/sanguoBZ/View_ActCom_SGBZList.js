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
var View_ActCom_SGBZList = (function (_super) {
    __extends(View_ActCom_SGBZList, _super);
    function View_ActCom_SGBZList() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_ActCom_SGBZList.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActComSGBZ", "View_ActCom_SGBZList").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    View_ActCom_SGBZList.prototype.onSure = function () {
        this.doHideAnimation();
        GGlobal.modelsgbz.CG_CountryTreasure_chooseItem_8651(this._args);
    };
    View_ActCom_SGBZList.prototype.onEsc = function () {
        this.doHideAnimation();
    };
    View_ActCom_SGBZList.prototype.onShown = function () {
        var self = this;
        var showStr0 = "至尊宝藏清单：";
        var showStr1 = "豪华宝藏清单：";
        var showStr2 = "高级宝藏清单：";
        var listArr = self._args;
        for (var j = 0; j < listArr.length; j++) {
            var cfg = Config.bzjc_753[listArr[j][0]];
            var arr = listArr[j][1];
            var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.bzjc));
            var showStr = "";
            for (var i = 0; i < arr.length; i++) {
                var vo = rewardArr[arr[i]];
                showStr += (i == 0 ? "" : ",") + HtmlUtil.fontNoSize(vo.name + "x" + vo.count, Color.getColorStr(vo.quality));
            }
            if (cfg.dc == 4) {
                showStr0 += showStr;
            }
            else if (cfg.dc == 3) {
                showStr1 += showStr;
            }
            else {
                showStr2 += showStr;
            }
        }
        self.listLb.text = showStr0 + "\n" + showStr1 + "\n" + showStr2;
        self.sureBt.addClickListener(self.onSure, self);
        self.escBt.addClickListener(self.onEsc, self);
    };
    View_ActCom_SGBZList.prototype.onHide = function () {
        var self = this;
        self.sureBt.removeClickListener(self.onSure, self);
        self.escBt.removeClickListener(self.onEsc, self);
    };
    View_ActCom_SGBZList.URL = "ui://y9683xrpj158c";
    return View_ActCom_SGBZList;
}(UIModalPanel));
__reflect(View_ActCom_SGBZList.prototype, "View_ActCom_SGBZList");
