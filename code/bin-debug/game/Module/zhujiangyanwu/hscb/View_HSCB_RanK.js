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
var View_HSCB_RanK = (function (_super) {
    __extends(View_HSCB_RanK, _super);
    function View_HSCB_RanK() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_HSCB_RanK.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "View_HSCB_RanK"));
    };
    View_HSCB_RanK.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("zjyw", "View_HSCB_RanK").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_HSCB_RanK.prototype.onShown = function () {
        this.addListen();
        GGlobal.modelRank.CG_GET_RANK_LIST(14);
    };
    View_HSCB_RanK.prototype.onHide = function () {
        this.removeListen();
        this.list.numItems = 0;
    };
    View_HSCB_RanK.prototype.addListen = function () {
        GGlobal.control.listen(Enum_MsgType.RANK_UPDATE, this.update, this);
    };
    View_HSCB_RanK.prototype.removeListen = function () {
        GGlobal.control.remove(Enum_MsgType.RANK_UPDATE, this.update, this);
    };
    View_HSCB_RanK.prototype.update = function () {
        var myRank = "20+";
        var myPass = "";
        this._rankArr = Model_Rank.rankData[14];
        if (this._rankArr) {
            for (var i = 0; i < this._rankArr.length; i++) {
                var v = this._rankArr[i];
                if (v.plyId == Model_player.voMine.id) {
                    myRank = v.rank + "";
                    myPass = v.params + "";
                    break;
                }
            }
        }
        this.list.numItems = 20;
        this.lbMy.text = "我的排名：<font color='#26ED04'>" + myRank + "</font>";
        if (myPass) {
            this.lbPass.text = "通关数：<font color='#26ED04'>" + myPass + "</font>";
        }
        else {
            var curLayer = GGlobal.model_HSCB.curLayer;
            this.lbPass.text = "通关数：<font color='#26ED04'>" + curLayer + "</font>";
        }
    };
    View_HSCB_RanK.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.setVo(this._rankArr ? this._rankArr[index] : null, index + 1);
    };
    View_HSCB_RanK.URL = "ui://7a366usaql4nt";
    return View_HSCB_RanK;
}(UIModalPanel));
__reflect(View_HSCB_RanK.prototype, "View_HSCB_RanK");
