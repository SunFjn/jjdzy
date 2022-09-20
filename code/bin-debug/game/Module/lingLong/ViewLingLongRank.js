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
var ViewLingLongRank = (function (_super) {
    __extends(ViewLingLongRank, _super);
    function ViewLingLongRank() {
        var _this = _super.call(this) || this;
        _this._first0 = false;
        _this._first1 = false;
        _this._first2 = false;
        _this._isLast = false;
        _this.childrenCreated();
        return _this;
    }
    ViewLingLongRank.prototype.childrenCreated = function () {
        GGlobal.createPack("lingLong");
        this.view = fairygui.UIPackage.createObject("lingLong", "ViewLingLongRank").asCom;
        this.contentPane = this.view;
        this.c1 = this.view.getController("c1");
        this.tab2 = (this.view.getChild("tab2"));
        this.tab1 = (this.view.getChild("tab1"));
        this.tab0 = (this.view.getChild("tab0"));
        this.list = (this.view.getChild("list"));
        this.list1 = (this.view.getChild("list1"));
        this.lb = (this.view.getChild("lb"));
        this.lbMy = (this.view.getChild("lbMy"));
        this.lb1 = (this.view.getChild("lb1"));
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.list1.itemRenderer = this.renderHandle1;
        this.list1.callbackThisObj = this;
        this.list1.setVirtual();
    };
    ViewLingLongRank.prototype.onShown = function () {
        this._isLast = false;
        var point = ConfigHelp.getSystemNum(2606);
        this.lb.text = "个人积分达到" + point + "分可领取区服排行奖励";
        if (Model_GlobalMsg.kaifuDay <= 1) {
            this.tab0.visible = false;
            this.tab1.visible = false;
            this.tab2.visible = false;
        }
        else if (Model_GlobalMsg.kaifuDay <= 7) {
            this.tab0.visible = true;
            this.tab1.visible = false;
            this.tab2.visible = true;
            this.tab2.x = 133;
        }
        else {
            this.tab0.visible = true;
            this.tab1.visible = true;
            this.tab2.visible = true;
            this.tab2.x = 249;
        }
        this.c1.selectedIndex = 0;
        this.addListen();
        this.selectPage();
    };
    ViewLingLongRank.prototype.onHide = function () {
        this.removeListen();
        this.list.numItems = 0;
    };
    ViewLingLongRank.prototype.addListen = function () {
        this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        GGlobal.control.listen(Enum_MsgType.LINGLONG_OPEN_RANK, this.update, this);
    };
    ViewLingLongRank.prototype.removeListen = function () {
        this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        GGlobal.control.remove(Enum_MsgType.LINGLONG_OPEN_RANK, this.update, this);
        GGlobal.layerMgr.close(UIConst.LING_LONG_RANK);
        this._first0 = false;
        this._first1 = false;
        this._first2 = false;
    };
    ViewLingLongRank.prototype.update = function () {
        switch (this.c1.selectedIndex) {
            case 0:
                this.list.numItems = 10;
                this.list.scrollToView(0);
                this.frame.text = this.tab0.visible ? "本期排行奖励" : "排行奖励";
                break;
            case 2:
                this.list.numItems = 10;
                this.list.scrollToView(0);
                this.frame.text = "上期排行奖励";
                break;
            case 1:
                this.list1.numItems = 10;
                this.list1.scrollToView(0);
                this.frame.text = "区服奖励";
                break;
        }
        var myRank = "10+";
        var myPoint;
        if (this._isLast) {
            for (var i = 0; i < Model_LingLong.rankLastArr.length; i++) {
                var v = Model_LingLong.rankLastArr[i];
                if (v.plyId == Model_player.voMine.id) {
                    myRank = "" + (i + 1);
                    break;
                }
            }
            myPoint = Model_LingLong.myLastPoint;
        }
        else {
            for (var i = 0; i < Model_LingLong.rankArr.length; i++) {
                var v = Model_LingLong.rankArr[i];
                if (v.plyId == Model_player.voMine.id) {
                    myRank = "" + (i + 1);
                    break;
                }
            }
            myPoint = Model_LingLong.myPoint;
        }
        this.lbMy.text = "我的排名：" + myRank + "          我的积分：" + myPoint;
    };
    ViewLingLongRank.prototype.renderHandle = function (index, obj) {
        var v = obj;
        if (this._isLast) {
            v.setVo(Model_LingLong.rankLastArr[index], index, true);
        }
        else {
            v.setVo(Model_LingLong.rankArr[index], index);
        }
    };
    ViewLingLongRank.prototype.renderHandle1 = function (index, obj) {
        var v = obj;
        if (this._isLast) {
            v.setVo(Model_LingLong.rankLast1Arr[index], index, true);
        }
        else {
            v.setVo(Model_LingLong.rank1Arr[index], index);
        }
    };
    ViewLingLongRank.prototype.selectPage = function () {
        var i = this.c1.selectedIndex;
        this._isLast = false;
        if (i == 0) {
            if (!this._first0) {
                GGlobal.modelLingLong.CG_RANKUI(0);
                this._first0 = true;
            }
        }
        else if (i == 1) {
            if (!this._first1) {
                GGlobal.modelLingLong.CG_RANKUI(1);
                this._first1 = true;
            }
        }
        else if (i == 2) {
            this._isLast = true;
            if (!this._first2) {
                GGlobal.modelLingLong.CG_OPEN_LAST_RANK();
                this._first2 = true;
            }
        }
        this.update();
    };
    return ViewLingLongRank;
}(UIModalPanel));
__reflect(ViewLingLongRank.prototype, "ViewLingLongRank");
