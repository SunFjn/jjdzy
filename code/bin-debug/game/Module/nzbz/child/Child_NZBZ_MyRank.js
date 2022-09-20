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
var Child_NZBZ_MyRank = (function (_super) {
    __extends(Child_NZBZ_MyRank, _super);
    function Child_NZBZ_MyRank() {
        return _super.call(this) || this;
    }
    Child_NZBZ_MyRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("nzbz", "Child_NZBZ_MyRank"));
    };
    Child_NZBZ_MyRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.list = (this.getChild("list"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
        this.list.setVirtual();
        this.rankLb = (this.getChild("rankLb"));
        this.jifenLb = (this.getChild("jifenLb"));
    };
    Child_NZBZ_MyRank.prototype.renderHandler = function (index, obj) {
        var item = obj;
        //I:排名U:玩家名称B:国家I:积分
        if (index < Model_NZBZ.rankArr.length) {
            item.show(Model_NZBZ.rankArr[index]);
        }
        else {
            item.show([index + 1, "虚位以待", 0, 0]);
        }
    };
    Child_NZBZ_MyRank.prototype.updateShow = function () {
        if (Model_NZBZ.myRank == 0) {
            this.rankLb.text = "我的排名：10+";
        }
        else {
            this.rankLb.text = "我的排名：" + Model_NZBZ.myRank;
        }
        this.jifenLb.text = "我的积分：" + Model_NZBZ.myJiFen;
        this.list.numItems = Config.xtcs_004[1049].num;
    };
    Child_NZBZ_MyRank.prototype.show = function () {
        this.updateShow();
    };
    Child_NZBZ_MyRank.prototype.hide = function () {
        this.list.numItems = 0;
    };
    Child_NZBZ_MyRank.URL = "ui://xzyn0qe3l3h3b";
    return Child_NZBZ_MyRank;
}(fairygui.GComponent));
__reflect(Child_NZBZ_MyRank.prototype, "Child_NZBZ_MyRank");
