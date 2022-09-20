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
var ChildCrossKingReward = (function (_super) {
    __extends(ChildCrossKingReward, _super);
    function ChildCrossKingReward() {
        return _super.call(this) || this;
    }
    ChildCrossKingReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ChildCrossKingReward"));
    };
    ChildCrossKingReward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getController("c1");
        this.lbRank = (this.getChild("lbRank"));
        this.lbReward = (this.getChild("lbReward"));
        this.list = (this.getChild("list"));
        this.lbMyGrade = (this.getChild("lbMyGrade"));
        this.lbTips = (this.getChild("lbTips"));
        this.list.itemRenderer = this.renderListItem;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    ChildCrossKingReward.prototype.update = function (type) {
        this._type = type;
        var grade = Model_CrossKing.myGrade;
        var cfgGrade = Config.lsxx_232[grade];
        if (cfgGrade) {
            this.lbMyGrade.text = "我的段位：<font color='" + Color.getColorStr(cfgGrade.color) + "'>" + cfgGrade.name + "</font>";
        }
        else {
            this.lbMyGrade.text = "我的段位：";
        }
        if (type == 0) {
            this.list.numItems = Model_CrossKing.rewardArr.length;
            this.lbTips.text = "段位奖励赛季结束邮件发送";
        }
        else {
            this.list.numItems = Model_CrossKing.rewardArr.length - 1;
            this.lbTips.text = "晋升段位时邮件发放，每个奖励每赛季只可领取一次";
        }
        this.list.scrollToView(0);
    };
    ChildCrossKingReward.prototype.renderListItem = function (index, obj) {
        var item = obj;
        if (this._type == 0) {
            item.gradeVo = Model_CrossKing.rewardArr[index];
        }
        else {
            item.upVo = Model_CrossKing.rewardArr[index + 1];
        }
    };
    ChildCrossKingReward.prototype.closeHD = function () {
        this.list.numItems = 0;
    };
    ChildCrossKingReward.URL = "ui://me1skowlhfct3x";
    return ChildCrossKingReward;
}(fairygui.GComponent));
__reflect(ChildCrossKingReward.prototype, "ChildCrossKingReward");
