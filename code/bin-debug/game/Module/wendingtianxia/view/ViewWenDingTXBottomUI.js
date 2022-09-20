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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewWenDingTXBottomUI = (function (_super) {
    __extends(ViewWenDingTXBottomUI, _super);
    function ViewWenDingTXBottomUI() {
        var _this = _super.call(this) || this;
        _this._canCrossNext = false;
        return _this;
    }
    ViewWenDingTXBottomUI.createInstance = function () {
        if (!this._inst) {
            this._inst = (fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXBottomUI"));
        }
        return this._inst;
    };
    ViewWenDingTXBottomUI.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n14 = (this.getChild("n14"));
        this.n7 = (this.getChild("n7"));
        this.n15 = (this.getChild("n15"));
        this.n1 = (this.getChild("n1"));
        this.n2 = (this.getChild("n2"));
        this.n3 = (this.getChild("n3"));
        this.n4 = (this.getChild("n4"));
        this.lbCondition = (this.getChild("lbCondition"));
        this.n11 = (this.getChild("n11"));
        this.groupNext = (this.getChild("groupNext"));
        this.n19 = (this.getChild("n19"));
    };
    ViewWenDingTXBottomUI.prototype.openRank = function () {
        if (TimeUitl.cool("ViewWenDingTXBottomUI", 1000)) {
            GGlobal.layerMgr.open(UIConst.WENDINGTX_RANK);
        }
    };
    ViewWenDingTXBottomUI.prototype.update = function () {
        var m = GGlobal.modelWenDingTX;
        var s = this;
        if (m.rank > 10)
            this.n3.text = "我的排名：<font color='#15f234'>10+</font>";
        else
            this.n3.text = "我的排名：<font color='#15f234'>" + m.rank + "</font>";
        s.n4.text = "我的积分：<font color='#15f234'>" + m.score + "</font>";
        var cfg = Config.wdtx_260[m.layer];
        var score = cfg.next;
        if (m.kill >= score) {
            s._canCrossNext = true;
            s.lbCondition.text = BroadCastManager.reTxt("击杀<font color='#15f234'>({0}/{1})</font>人后进入下一层", m.kill, score);
        }
        else {
            s._canCrossNext = false;
            s.lbCondition.text = BroadCastManager.reTxt("击杀<font color='#fe0000'>({0}/{1})</font>人后进入下一层", m.kill, score);
        }
        s.n11.text = m.buff + "";
    };
    ViewWenDingTXBottomUI.prototype.exiteHD = function () {
        var layar = GGlobal.modelWenDingTX.layer;
        var score;
        if (layar > 0) {
            score = Config.wdtx_260[layar].lose;
        }
        var str;
        if (score > 0) {
            str = "退出后30秒不可进入,是否退出\n本层退出扣除" + score + "积分";
        }
        else {
            str = "退出后30秒不可进入,是否退出";
        }
        ViewAlert.show(str, Handler.create(this, WenDingTXManager.getInstance().exite), ViewAlert.OKANDCANCEL);
    };
    ViewWenDingTXBottomUI.prototype.checkNotice = function () {
        this.n1.checkNotice = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 1) || GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 2) || GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 3);
        ;
    };
    ViewWenDingTXBottomUI.prototype.showNextBtn = function () {
        var ret = GGlobal.modelWenDingTX.layer + 1;
        this.groupNext.visible = Config.wdtx_260[ret] ? true : false;
    };
    ViewWenDingTXBottomUI.prototype.toShow = function () {
        var s = this;
        var pat = GGlobal.layerMgr.UI_MainBottom;
        pat.addChild(s);
        s.resetPostion();
        s.showNextBtn();
        s.n1.addClickListener(s.openRank, s);
        s.n2.addClickListener(s.exiteHD, s);
        GGlobal.control.listen(Enum_MsgType.WDTX_LAYER_UPDATE, s.showNextBtn, s);
        GGlobal.reddot.listen(UIConst.WENDINGTX, s.checkNotice, s);
        GGlobal.control.listen(Enum_MsgType.WDTX_MINE_UPDATE, s.update, s);
    };
    ViewWenDingTXBottomUI.prototype.toHide = function () {
        var s = this;
        GGlobal.control.remove(Enum_MsgType.WDTX_LAYER_UPDATE, s.showNextBtn, s);
        GGlobal.control.remove(Enum_MsgType.WDTX_MINE_UPDATE, s.update, s);
        GGlobal.reddot.remove(UIConst.WENDINGTX, s.checkNotice, s);
        s.n2.removeClickListener(s.exiteHD, s);
        s.n1.removeClickListener(s.openRank, s);
        s._canCrossNext = false;
        s.removeFromParent();
    };
    ViewWenDingTXBottomUI.prototype.resetPostion = function () {
        var a = this;
        a.setXY((fairygui.GRoot.inst.width - a.width) >> 1, fairygui.GRoot.inst.height - 270);
    };
    ViewWenDingTXBottomUI.URL = "ui://gxs8kn67fl2h1";
    return ViewWenDingTXBottomUI;
}(fairygui.GComponent));
__reflect(ViewWenDingTXBottomUI.prototype, "ViewWenDingTXBottomUI");
