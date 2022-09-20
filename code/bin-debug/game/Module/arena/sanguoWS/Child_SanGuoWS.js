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
var Child_SanGuoWS = (function (_super) {
    __extends(Child_SanGuoWS, _super);
    function Child_SanGuoWS() {
        var _this = _super.call(this) || this;
        _this.raceStr = ["", "16强", "8强", "4强", "决赛", ""];
        _this.stateStr = ["未开启", "准备中", "进行中"];
        _this.raceTime = ["",
            [[0, 0, 20, 30], [20, 30, 20, 35]],
            [[20, 35, 20, 45], [20, 45, 20, 50]],
            [[20, 50, 21, 0], [21, 0, 21, 5]],
            [[21, 5, 21, 15], [21, 15, 21, 20]] //开始时间 结束时间 呵呵
        ];
        _this.synchroCount = 0;
        return _this;
    }
    Child_SanGuoWS.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "Child_SanGuoWS"));
    };
    Child_SanGuoWS.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.b0 = (s.getChild("b0"));
        s.b1 = (s.getChild("b1"));
        s.b3 = (s.getChild("b3"));
        s.b4 = (s.getChild("b4"));
        s.b5 = (s.getChild("b5"));
        s.b6 = (s.getChild("b6"));
        s.b7 = (s.getChild("b7"));
        s.b8 = (s.getChild("b8"));
        s.b9 = (s.getChild("b9"));
        s.b10 = (s.getChild("b10"));
        s.b11 = (s.getChild("b11"));
        s.b12 = (s.getChild("b12"));
        s.b13 = (s.getChild("b13"));
        s.b14 = (s.getChild("b14"));
        s.b15 = (s.getChild("b15"));
        s.b16 = (s.getChild("b16"));
        s.b17 = (s.getChild("b17"));
        s.b18 = (s.getChild("b18"));
        s.b19 = (s.getChild("b19"));
        s.b20 = (s.getChild("b20"));
        s.b21 = (s.getChild("b21"));
        s.b22 = (s.getChild("b22"));
        s.b23 = (s.getChild("b23"));
        s.b24 = (s.getChild("b24"));
        s.b25 = (s.getChild("b25"));
        s.b26 = (s.getChild("b26"));
        s.b27 = (s.getChild("b27"));
        s.b28 = (s.getChild("b28"));
        s.b29 = (s.getChild("b29"));
        s.b2 = (s.getChild("b2"));
        s.nameLb0 = (s.getChild("nameLb0"));
        s.nameLb1 = (s.getChild("nameLb1"));
        s.nameLb2 = (s.getChild("nameLb2"));
        s.nameLb3 = (s.getChild("nameLb3"));
        s.nameLb4 = (s.getChild("nameLb4"));
        s.nameLb5 = (s.getChild("nameLb5"));
        s.nameLb6 = (s.getChild("nameLb6"));
        s.nameLb7 = (s.getChild("nameLb7"));
        s.nameLb10 = (s.getChild("nameLb10"));
        s.nameLb11 = (s.getChild("nameLb11"));
        s.nameLb12 = (s.getChild("nameLb12"));
        s.nameLb13 = (s.getChild("nameLb13"));
        s.nameLb14 = (s.getChild("nameLb14"));
        s.nameLb15 = (s.getChild("nameLb15"));
        s.nameLb8 = (s.getChild("nameLb8"));
        s.nameLb9 = (s.getChild("nameLb9"));
        s.l6 = (s.getChild("l6"));
        s.l4 = (s.getChild("l4"));
        s.l0 = (s.getChild("l0"));
        s.l1 = (s.getChild("l1"));
        s.l3 = (s.getChild("l3"));
        s.l2 = (s.getChild("l2"));
        s.l5 = (s.getChild("l5"));
        s.l10 = (s.getChild("l10"));
        s.l11 = (s.getChild("l11"));
        s.l8 = (s.getChild("l8"));
        s.l12 = (s.getChild("l12"));
        s.l13 = (s.getChild("l13"));
        s.l9 = (s.getChild("l9"));
        s.l7 = (s.getChild("l7"));
        s.l14 = (s.getChild("l14"));
        s.btnRank = (s.getChild("btnRank"));
        s.btnPool = (s.getChild("btnPool"));
        s.btnDesc = (s.getChild("btnDesc"));
        s.head = (s.getChild("head"));
        s.lbPro = (s.getChild("lbPro"));
        s.lbTitle = (s.getChild("lbTitle"));
        s.titleIcon = (s.getChild("titleIcon"));
        s.nodes = [];
        for (var i = 0; i < 15; i++) {
            s.nodes.push(s["l" + i]);
        }
        s.nameArr = [];
        for (var i = 0; i < 16; i++) {
            s.nameArr.push(s["nameLb" + i]);
            if (i > 7)
                s.nameArr[i].imgYaZhu.x = 154;
        }
        s.lineArr = [];
        for (var i = 0; i < 30; i++) {
            s.lineArr.push(s["b" + i]);
        }
        s.head.ng.visible = false;
        s.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, s.onAdd, s);
        s.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.onRemove, s);
    };
    Child_SanGuoWS.prototype.onAdd = function () {
        // ImageLoader.instance.loader(Enum_Path.TITLE_URL + Config.chenghao_702["44"].picture + ".png", s.titleIcon);
        IconUtil.setImg(this.titleIcon, Enum_Path.TITLE_URL + Config.chenghao_702["44"].picture + ".png");
    };
    Child_SanGuoWS.prototype.onRemove = function () {
        IconUtil.setImg(this.titleIcon, null);
    };
    Child_SanGuoWS.prototype.initDta = function () {
        var s = this;
        var m = GGlobal.modelsgws;
        var raceMembers = m.raceInfo;
        var c = m.champion;
        var lun = m.lun;
        var st = m.state;
        var v;
        //线条组合
        for (var i = 0; i < s.lineArr.length; i++) {
            //处理名字的灰暗
            if (i < s.nameArr.length) {
                var lb = s.nameArr[i];
                if (i < raceMembers.length) {
                    v = raceMembers[i];
                    lb.setVo(v);
                    lb.grayed = !v.isLife();
                }
                else {
                    lb.resetView();
                }
            }
            //====处理线条灰暗
            var img = s.lineArr[i];
            var data = JSON.parse(img.data);
            var lineLun = data[0];
            var child = data[1];
            // if (lun >= lineLun) {
            var showLine = false;
            for (var j = 0, k = child.length; j < k; j++) {
                var childIndex = child[j] - 1;
                var racedata = raceMembers[childIndex];
                if (racedata) {
                    showLine = racedata.lun > lineLun;
                    if (showLine) {
                        break;
                    }
                }
            }
            img.visible = showLine;
            // } else {
            // 	img.visible = false;
            // }
            //按钮状态
            if (s.nodes[i]) {
                var checkBtn = s.nodes[i];
                var btnDta = JSON.parse(checkBtn.data);
                var btnLun = btnDta[0];
                var btnZu = btnDta[1];
                var canYz = !m.checkYazhu(btnLun, btnZu); //没押注过并且本组是有玩家的
                checkBtn.icon = canYz ? "ui://me1skowlhfct5q" : "ui://me1skowlhfct55";
                checkBtn.grayed = btnLun > lun;
            }
        }
        //冠军数据
        if (lun != 4 && c.length && c[2] + 0) {
            s.head.setdata(c[2], null, c[1], -1, false, c[3]);
        }
        else {
            s.head.setdata(0, null, "", -1, false, 0);
        }
        if (!m.isOpen()) {
            s.lbTitle.text = "下轮赛事";
            s.lbPro.text = "<font color='#fe0000'>周日20：30</font>";
        }
        if (GGlobal.modelsgws.isOpen())
            Timer.instance.listen(s.updateTime, s, 1000);
    };
    Child_SanGuoWS.prototype.nodeHandler = function (e) {
        var data = JSON.parse(e.target.data);
        var lun = data[0];
        var zu = data[1];
        var nowLun = GGlobal.modelsgws.lun;
        var now = GGlobal.modelsgws.lun;
        var st = GGlobal.modelsgws.state;
        var racer = GGlobal.modelsgws.getGrouperByLun(lun, zu);
        if (now == 0) {
            ViewCommonWarn.text("赛事未开启");
        }
        else if (now > lun || (now == lun && st == 2)) {
            if (racer.length == 2) {
                GGlobal.modelsgws.CG_BATTLE_1841(lun, zu);
            }
            else if (racer.length == 1) {
                ViewCommonWarn.text("选手轮空直接晋级");
            }
        }
        else {
            if (lun <= nowLun) {
                if (racer.length > 0) {
                    GGlobal.layerMgr.open(UIConst.SGWS_YZ, data);
                    // } else {
                    // 	ViewCommonWarn.text("赛事轮空无法押注");
                }
            }
            else {
                ViewCommonWarn.text("赛事未开启");
            }
        }
    };
    Child_SanGuoWS.prototype.openDesc = function (e) {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SANGUO_WUSHUANG);
    };
    Child_SanGuoWS.prototype.openRank = function (e) {
        GGlobal.layerMgr.open(UIConst.SGWS_RANK);
    };
    Child_SanGuoWS.prototype.openPool = function (e) {
        GGlobal.layerMgr.open(UIConst.SGWS_POOL);
    };
    Child_SanGuoWS.prototype.checkPool = function () {
        this.btnPool.checkNotice = GGlobal.reddot.checkCondition(UIConst.SANGUO_WUSHUANG, 2);
    };
    Child_SanGuoWS.prototype.updateTime = function () {
        var s = this;
        var m = GGlobal.modelsgws;
        if (!m.isOpen()) {
            s.lbTitle.text = "下轮赛事";
            s.lbPro.text = "<font color='#fe0000'>周日20：30</font>";
            Timer.instance.remove(s.updateTime, s);
            return;
        }
        var date = new Date(Model_GlobalMsg.getServerTime());
        var nowHour = date.getHours();
        var nowMin = date.getMinutes();
        var nowSecen = date.getSeconds();
        var dateDta = this.raceTime[m.lun][m.state - 1];
        if (!dateDta)
            return;
        var endHour = dateDta[2];
        var endMin = dateDta[3];
        var timeLimit = (Number(endHour) - nowHour) * 3600 + (Number(endMin) - nowMin) * 60 - nowSecen;
        if (timeLimit < 0 && this.synchroCount < 5) {
            this.synchroCount++;
            GGlobal.modelsgws.CG_OPEN_SANGUOWS();
            return;
        }
        var timeStr = DateUtil.getMSBySecond4(timeLimit);
        s.lbTitle.text = s.raceStr[m.lun];
        s.lbPro.text = s.stateStr[m.state] + "\n" + timeStr;
    };
    Child_SanGuoWS.prototype.checkReddot = function () {
        var red = GGlobal.reddot.checkCondition(UIConst.SANGUO_WUSHUANG, 2);
        this.btnPool.checkNotice = red;
    };
    Child_SanGuoWS.prototype.show = function () {
        var a = this;
        var c = GGlobal.control;
        for (var i = 0; i < 15; i++) {
            a.nodes[i].addClickListener(a.nodeHandler, a);
        }
        a.checkReddot();
        c.listen(Enum_MsgType.SGWS_OPENUI, a.initDta, a);
        c.listen(Enum_MsgType.SGWS_YZ, a.initDta, a);
        a.btnDesc.addClickListener(a.openDesc, a);
        a.btnRank.addClickListener(a.openRank, a);
        a.btnPool.addClickListener(a.openPool, a);
        GGlobal.modelsgws.CG_OPEN_SANGUOWS();
        GGlobal.modelsgws.CG_POOL_1835(); //为了获取是否有红点
        GGlobal.control.listen(Enum_MsgType.SGWS_POOL, a.checkReddot, a);
    };
    Child_SanGuoWS.prototype.clean = function () {
        var a = this;
        a.synchroCount = 0;
        var c = GGlobal.control;
        for (var i = 0; i < 14; i++) {
            a.nodes[i].removeClickListener(a.nodeHandler, a);
        }
        Timer.instance.remove(a.updateTime, a);
        c.remove(Enum_MsgType.SGWS_OPENUI, a.initDta, a);
        c.remove(Enum_MsgType.SGWS_YZ, a.initDta, a);
        a.btnDesc.removeClickListener(a.openDesc, a);
        a.btnRank.removeClickListener(a.openRank, a);
        a.btnPool.removeClickListener(a.openPool, a);
        GGlobal.reddot.remove(UIConst.SANGUO_WUSHUANG, this.checkReddot, this);
    };
    Child_SanGuoWS.URL = "ui://me1skowlqt57s";
    return Child_SanGuoWS;
}(fairygui.GComponent));
__reflect(Child_SanGuoWS.prototype, "Child_SanGuoWS");
