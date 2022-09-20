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
var ViewLZD = (function (_super) {
    __extends(ViewLZD, _super);
    function ViewLZD() {
        var _this = _super.call(this) || this;
        _this.last = 0;
        _this.setSkin("activityHall", "activityHall_atlas0", "ViewLZD");
        return _this;
    }
    ViewLZD.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(LongZDIt.URL, LongZDIt);
        fairygui.UIObjectFactory.setPackageItemExtension(LZDRankIt.URL, LZDRankIt);
        fairygui.UIObjectFactory.setPackageItemExtension(ViewLZDRet.URL, ViewLZDRet);
        fairygui.UIObjectFactory.setPackageItemExtension(LZDItem.URL, LZDItem);
    };
    ViewLZD.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.i0.idx = 1;
        s.i1.idx = 2;
        s.i2.idx = 3;
        s.i3.idx = 4;
        s.itemArr = [s.i0, s.i1, s.i2, s.i3];
        s.n27.callbackThisObj = s;
        s.n27.itemRenderer = s.listRender;
        s.frame.getChild("icon").asLoader.url = "ui://1xydor24oc0jx";
    };
    ViewLZD.prototype.listRender = function (idx, obj) {
        var item = obj;
        item.setdata(idx);
    };
    ViewLZD.prototype.rankHD = function () {
        GGlobal.layerMgr.open(UIConst.LZDRANK);
    };
    ViewLZD.prototype.dhHd = function () {
        GGlobal.layerMgr.open(UIConst.BAOKU_LZ);
    };
    ViewLZD.prototype.updateX = function () {
        var s = this;
        var now = Model_GlobalMsg.getServerTime();
        var m = GGlobal.modelActivityHall;
        var t = ((m.lzd_remain - now) / 1000) >> 0;
        if (s.st == 1) {
            if (t > 0) {
                s.lbRemain.text = t + "s后开始答题";
            }
            else {
                if (now - s.last > 1000) {
                    m.CG_OPEN_1981();
                    s.last = now;
                }
            }
        }
        else if (s.st == 2) {
            if (t > 0) {
                s.lbTime.text = "剩余答题时间：" + t + "秒";
            }
            else {
                m.CG_ANSWER_1983(0);
                m.CG_OPEN_1981();
            }
        }
        else if (s.st == 3) {
            if (t > 0) {
                s.lbTime.text = "等待时间" + t + "秒";
            }
            else {
                m.CG_OPEN_1981();
            }
        }
        if (this.c1.selectedIndex != 2) {
            GGlobal.modelActivityHall.CG_RANK_1985();
        }
    };
    ViewLZD.prototype.setQuestion = function () {
        var s = this;
        var m = GGlobal.modelActivityHall;
        var lib = Config.lzd_234[m.lzd_id];
        s.lbTopic.text = "题目：" + m.lzd_pro + "/20\n" + lib.q;
        s.lbScore.text = "我的积分：" + m.lzd_score + "";
        if (m.lzd_rank == 0 || m.lzd_rank > 10) {
            s.lbRank.text = "我的排名:10+";
        }
        else {
            s.lbRank.text = "我的排名:" + m.lzd_rank;
        }
        var it = m.lzd_data;
        var txt = ["", lib.a, lib.error1, lib.error2, lib.error3];
        for (var i = 0; i < s.itemArr.length; i++) {
            var idx = it[i];
            s.itemArr[i].setdata(txt[idx], idx == 1);
        }
    };
    ViewLZD.prototype.setdata = function () {
        var s = this;
        var m = GGlobal.modelActivityHall;
        s.st = m.lzd_st;
        this.c1.selectedIndex = 0;
        switch (s.st) {
            case 0:
                s.g0.visible = false;
                s.lbRemain.visible = true;
                s.lbRemain.text = "活动未开始";
                s.lbTopic.text = "每天12：00\n等你来答";
                this.c1.selectedIndex = 1;
                break;
            case 1:
                s.g0.visible = false;
                this.c1.selectedIndex = 1;
                s.lbRemain.visible = true;
                break;
            case 2:
                s.g0.visible = true;
                s.lbRemain.visible = false;
                s.setQuestion();
                break;
            case 3://中场休息5秒
                s.g0.visible = true;
                s.lbRemain.visible = false;
                break;
            case 4:
                s.g0.visible = false;
                s.lbRemain.visible = true;
                s.lbRemain.text = "活动结束";
                s.lbTopic.text = "每天14：00\n等你来答";
                this.c1.selectedIndex = 1;
                break;
            case 5:
                this.c1.selectedIndex = 2;
                break;
            case 6:
                this.c1.selectedIndex = 3;
                break;
        }
    };
    ViewLZD.prototype.answerHd = function () {
        var s = this;
        for (var i = 0; i < s.itemArr.length; i++) {
            s.itemArr[i].check();
        }
    };
    ViewLZD.prototype.setRealRank = function () {
        this.n27.numItems = 5;
        var s = this;
        var m = GGlobal.modelActivityHall;
        s.lbScore.text = "我的积分：" + m.lzd_score + "";
        if (m.lzd_rank == 0 || m.lzd_rank > 10) {
            s.lbRank.text = "我的排名:10+";
        }
        else {
            s.lbRank.text = "我的排名:" + m.lzd_rank;
        }
    };
    ViewLZD.prototype.startAnswerHD = function () {
        if (TimeUitl.cool("lzd", 1000)) {
            GGlobal.modelActivityHall.CG_Answer_1987();
        }
    };
    ViewLZD.prototype.onShown = function () {
        var s = this;
        var m = GGlobal.modelActivityHall;
        m.CG_OPEN_1981();
        s.setRealRank();
        var c = GGlobal.control;
        c.listen(Enum_MsgType.LZD_OPEN, s.setdata, s);
        c.listen(Enum_MsgType.LZD_RET, s.answerHd, s);
        c.listen(Enum_MsgType.LZD_OPENRANK, s.setRealRank, s);
        Timer.instance.listen(s.updateX, s, 1000);
        s.btnDH.addClickListener(s.dhHd, s);
        s.btnRank.addClickListener(s.rankHD, s);
        s.n28.addClickListener(s.startAnswerHD, s);
    };
    ViewLZD.prototype.onHide = function () {
        var s = this;
        var c = GGlobal.control;
        c.remove(Enum_MsgType.LZD_OPEN, s.setdata, s);
        c.remove(Enum_MsgType.LZD_RET, s.answerHd, s);
        c.remove(Enum_MsgType.LZD_OPENRANK, s.setRealRank, s);
        Timer.instance.remove(s.updateX, s);
        s.btnDH.removeClickListener(s.dhHd, s);
        s.btnRank.removeClickListener(s.rankHD, s);
        s.n28.removeClickListener(s.startAnswerHD, s);
        GGlobal.layerMgr.close(UIConst.LONGZHONGDUI);
        s.n27.numItems = 0;
    };
    ViewLZD.URL = "ui://1xydor24n7ie1";
    return ViewLZD;
}(UIPanelBase));
__reflect(ViewLZD.prototype, "ViewLZD");
