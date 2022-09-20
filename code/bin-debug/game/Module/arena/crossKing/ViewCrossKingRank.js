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
var ViewCrossKingRank = (function (_super) {
    __extends(ViewCrossKingRank, _super);
    function ViewCrossKingRank() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewCrossKingRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewCrossKingRank"));
    };
    ViewCrossKingRank.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewCrossKingRank").asCom;
        this.contentPane = this.view;
        this.c1 = this.view.getController("c1");
        this.frame = (this.view.getChild("frame"));
        this.lbTitle = (this.view.getChild("lbTitle"));
        this.tab0 = (this.view.getChild("tab0"));
        this.tab1 = (this.view.getChild("tab1"));
        this.tab2 = (this.view.getChild("tab2"));
        this.tab3 = (this.view.getChild("tab3"));
        this.lbRank = (this.view.getChild("lbRank"));
        this.lbName = (this.view.getChild("lbName"));
        this.list = (this.view.getChild("list"));
        this.lbMyGrade = (this.view.getChild("lbMyGrade"));
        this.lbTips = (this.view.getChild("lbTips"));
        this.lbMyRank = (this.view.getChild("lbMyRank"));
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = this.renderListItem;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    ViewCrossKingRank.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewCrossKingRank.prototype.onShown = function () {
        this.addListen();
        this.update();
        this.selectPage();
    };
    ViewCrossKingRank.prototype.onHide = function () {
        this.removeListen();
        this.c1.selectedIndex = 0;
    };
    ViewCrossKingRank.prototype.addListen = function () {
        this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        GGlobal.control.listen(Enum_MsgType.CROSSKING_RANK_ARR, this.update, this);
    };
    ViewCrossKingRank.prototype.removeListen = function () {
        this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        GGlobal.control.remove(Enum_MsgType.CROSSKING_RANK_ARR, this.update, this);
        GGlobal.layerMgr.close(UIConst.CROSS_KING_RANK);
        this.list.numItems = 0;
    };
    ViewCrossKingRank.prototype.update = function () {
        this.list.numItems = Model_CrossKing.rankPlyArr.length;
        this.list.scrollToView(0);
        var cfgGrade = Config.lsxx_232[Model_CrossKing.myGrade];
        if (cfgGrade) {
            this.lbMyGrade.text = "我的段位：<font color='" + Color.getColorStr(cfgGrade.color) + "'>" + cfgGrade.name + "</font>";
        }
        else {
            this.lbMyGrade.text = "我的段位：";
        }
        this.lbMyRank.text = "我的排名：<font color='#ffc334'>" + Model_CrossKing.myRank + "</font>";
    };
    ViewCrossKingRank.prototype.selectPage = function () {
        GGlobal.modelCrossKing.CG_OPEN_RANKS(13 - this.c1.selectedIndex);
    };
    ViewCrossKingRank.prototype.renderListItem = function (index, obj) {
        var item = obj;
        item.vo = Model_CrossKing.rankPlyArr[index];
    };
    ViewCrossKingRank.URL = "ui://yqpfulefj9wfc";
    return ViewCrossKingRank;
}(UIModalPanel));
__reflect(ViewCrossKingRank.prototype, "ViewCrossKingRank");
