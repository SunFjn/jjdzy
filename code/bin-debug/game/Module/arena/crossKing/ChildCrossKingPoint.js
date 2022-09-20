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
var ChildCrossKingPoint = (function (_super) {
    __extends(ChildCrossKingPoint, _super);
    function ChildCrossKingPoint() {
        return _super.call(this) || this;
    }
    ChildCrossKingPoint.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ChildCrossKingPoint"));
    };
    ChildCrossKingPoint.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getController("c1");
        this.lbRank = (this.getChild("lbRank"));
        this.lbReward = (this.getChild("lbReward"));
        this.list = (this.getChild("list"));
        this.lbMyPoint = (this.getChild("lbMyPoint"));
        this.lbTips = (this.getChild("lbTips"));
        this.lbget = (this.getChild("lbget"));
        this.list.itemRenderer = this.renderListItem;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    ChildCrossKingPoint.prototype.update = function () {
        this.lbMyPoint.text = "我的积分：<font color='#ffc334'>" + Model_CrossKing.myPoint + "</font>";
        var len = Model_CrossKing.pointRewardArr.length;
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < len; i++) {
            var v = Model_CrossKing.pointRewardArr[i];
            var status = Model_CrossKing.pointRwd[v.id];
            if (status == 0) {
                arr2.push(v);
            }
            else if (status == 1) {
                arr1.push(v);
            }
            else {
                arr3.push(v);
            }
        }
        this._listData = arr1.concat(arr2).concat(arr3);
        this.list.numItems = len;
    };
    ChildCrossKingPoint.prototype.renderListItem = function (index, obj) {
        var item = obj;
        item.vo = this._listData[index];
    };
    ChildCrossKingPoint.prototype.closeHD = function () {
        this.list.numItems = 0;
    };
    ChildCrossKingPoint.URL = "ui://me1skowlhfct3y";
    return ChildCrossKingPoint;
}(fairygui.GComponent));
__reflect(ChildCrossKingPoint.prototype, "ChildCrossKingPoint");
