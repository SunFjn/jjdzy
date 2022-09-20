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
var ViewNianShouReward = (function (_super) {
    __extends(ViewNianShouReward, _super);
    function ViewNianShouReward() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewNianShouReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComNianShou", "ViewNianShouReward"));
    };
    ViewNianShouReward.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("actComNianShou", "ViewNianShouReward").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
        s.list.setVirtual();
    };
    ViewNianShouReward.prototype.onShown = function () {
        var s = this;
        s.upView();
        GGlobal.model_ActNianShou.listen(Model_ActNianShou.get_goal_reward, s.upView, s);
    };
    ViewNianShouReward.prototype.onHide = function () {
        var s = this;
        GGlobal.model_ActNianShou.remove(Model_ActNianShou.get_goal_reward, s.upView, s);
    };
    ViewNianShouReward.prototype.upView = function () {
        var m = GGlobal.model_ActNianShou;
        var s = this;
        //排序
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < m.rewardArr.length; i++) {
            var v = m.rewardArr[i];
            var st = m.rewStObj[v.id];
            var point = m.point;
            if (st == 1) {
                arr3.push(v);
            }
            else if (point >= v.point) {
                arr1.push(v);
            }
            else {
                arr2.push(v);
            }
        }
        s._lisDat = arr1.concat(arr2).concat(arr3);
        s.list.numItems = s._lisDat.length;
        s.lbPoint.text = "已获得" + m.point + "积分";
    };
    ViewNianShouReward.prototype.itemRender = function (idx, g) {
        g.vo = this._lisDat[idx];
    };
    ViewNianShouReward.URL = "ui://ht2966i4dsuf8";
    return ViewNianShouReward;
}(UIModalPanel));
__reflect(ViewNianShouReward.prototype, "ViewNianShouReward");
