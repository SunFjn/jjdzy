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
var View_CrossShiLian_Buff = (function (_super) {
    __extends(View_CrossShiLian_Buff, _super);
    function View_CrossShiLian_Buff() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_CrossShiLian_Buff.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "View_CrossShiLian_Buff"));
    };
    View_CrossShiLian_Buff.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("crossKing", "View_CrossShiLian_Buff").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    View_CrossShiLian_Buff.prototype.onShown = function () {
        var self = this;
        var str = "";
        var buffData = GGlobal.modelkfsl.hasBuffData;
        for (var key in buffData) {
            str += Vo_attr.getShowStr(parseInt(key), Math.floor(buffData[key] * 100000), "+") + "\n";
        }
        self.contentLb.text = str;
    };
    View_CrossShiLian_Buff.prototype.onHide = function () {
    };
    View_CrossShiLian_Buff.URL = "ui://yqpfulefs37b6h";
    return View_CrossShiLian_Buff;
}(UIModalPanel));
__reflect(View_CrossShiLian_Buff.prototype, "View_CrossShiLian_Buff");
