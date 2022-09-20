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
/**
 * @author: lujiahao
 * @date: 2020-02-20 13:55:29
 */
var GGLGridView = (function (_super) {
    __extends(GGLGridView, _super);
    function GGLGridView() {
        var _this = _super.call(this) || this;
        _this.itemList = [];
        return _this;
    }
    GGLGridView.createInstance = function () {
        return (fairygui.UIPackage.createObject("ggl", "GGLGridView"));
    };
    GGLGridView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        for (var i = 0; i < 9; i++) {
            t.itemList.push(t.getChild("item" + i));
        }
    };
    //========================================= 协议相关 ========================================
    //=========================================== API ==========================================
    GGLGridView.prototype.showData = function () {
        var t = this;
        var t_model = GGlobal.modelGGL;
        t._dataList = t_model.rewardList.concat();
        for (var i = 0; i < t.itemList.length; i++) {
            var t_item = t.itemList[i];
            t_item.setData(t._dataList[i]);
        }
    };
    GGLGridView.prototype.clear = function () {
        var t = this;
        for (var _i = 0, _a = t.itemList; _i < _a.length; _i++) {
            var v = _a[_i];
            v.clean();
        }
    };
    GGLGridView.prototype.showEffect = function (pFlag) {
        var t = this;
        var t_model = GGlobal.modelGGL;
        var t_rewardVo = t_model.rewardVo;
        for (var i = 0; i < t.itemList.length; i++) {
            var t_vo = t._dataList[i];
            var t_item = t.itemList[i];
            if (pFlag && t_vo && t_rewardVo
                && t_rewardVo.itemId == t_vo.itemId
                && t_rewardVo.itemType == t_vo.itemType
                && t_rewardVo.count == t_vo.count) {
                t_item.showEffect(true);
            }
            else {
                t_item.showEffect(false);
            }
            // //test
            // let t_item = t.itemList[i];
            // t_item.showEffect(false);
            // t_item.showEffect(true);
        }
    };
    //>>>>end
    GGLGridView.URL = "ui://wnqj5rwkloxze";
    return GGLGridView;
}(fairygui.GComponent));
__reflect(GGLGridView.prototype, "GGLGridView");
