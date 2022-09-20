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
var ChildCZDJ = (function (_super) {
    __extends(ChildCZDJ, _super);
    function ChildCZDJ() {
        var _this = _super.call(this) || this;
        _this.dta = [];
        _this._st = 0;
        _this._lastTime = 0;
        return _this;
    }
    Object.defineProperty(ChildCZDJ, "instance", {
        get: function () {
            if (ChildCZDJ._instance == null) {
                ChildCZDJ._instance = (fairygui.UIPackage.createObject("huoDong", "ChildCZDJ"));
            }
            return ChildCZDJ._instance;
        },
        enumerable: true,
        configurable: true
    });
    ChildCZDJ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.lst.setVirtual();
        s.lst.callbackThisObj = s;
        s.lst.itemRenderer = s.itenRender;
        s.n17.callbackThisObj = s;
        s.n17.itemRenderer = s.itenTitleRender;
    };
    ChildCZDJ.prototype.itenRender = function (idx, obj) {
        var it = obj;
        it.setdata(this.dta[idx], idx);
    };
    ChildCZDJ.prototype.itenTitleRender = function (idx, obj) {
        var it = obj;
        it.setdata(this._showDta[idx]);
    };
    //needQs 是否需要判断期数
    ChildCZDJ.prototype.getShowDta = function (lib, day, needQs) {
        if (needQs === void 0) { needQs = false; }
        if (this._day != day || !this._showDta) {
            var qs = GGlobal.modelHuoDong.CJDJ_qishu;
            var temp = [];
            var shunxu = JSON.parse(ConfigHelp.getSystemDesc(2701))[0];
            // let shunxu = [8,6,4,2,7,5,3,1]
            for (var i in lib) {
                var cfg = lib[i];
                if (needQs) {
                    if (qs != cfg.qishu) {
                        continue;
                    }
                }
                var vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
                var xunhao = shunxu.indexOf(Number(cfg.cishu));
                temp[xunhao] = [cfg.cishu, vo];
            }
            this._showDta = temp;
            this._day = day;
        }
    };
    ChildCZDJ.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelHuoDong;
        var lib;
        if (Model_GlobalMsg.kaifuDay > 7) {
            lib = Config.cjdj1_010[m.CJDJ_index];
            s.getShowDta(Config.cjdj1_010, 7, true);
        }
        else {
            lib = Config.cjdj_010[m.CJDJ_index];
            s.getShowDta(Config.cjdj_010, 1);
        }
        var yb = lib.yuanbao;
        if (Model_GlobalMsg.kaifuDay > 7) {
            this.lbTime.text = "剩余时间：";
        }
        else {
            var ax = Model_GlobalMsg.getkaiFuTime();
            if (ax < 0) {
                this.lbTime.text = "剩余时间：已结束";
            }
            else {
                this.lbTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
            }
        }
        s.lbYuanBao.visible = yb > m.rechargeVal;
        s.bar.max = yb;
        s.bar.value = m.rechargeVal;
        s.lbYuanBao.text = "再充值<font color='#15f234'>" + (yb - m.rechargeVal) + "元</font>可获得1次点将次数";
        s.lbCount.text = "剩余点将次数：" + m.CJDJ_count;
        s.dta = m.CJDJ_data;
        s.lst.numItems = s.dta.length;
        s.n17.numItems = s._showDta.length;
    };
    ChildCZDJ.prototype.lqCallBack = function () {
        this.update();
    };
    ChildCZDJ.prototype.randomEff = function () {
        var s = this;
        var st = 0;
        var now = egret.getTimer();
        var m = GGlobal.modelHuoDong;
        if (m.CJDJ_count > 0 || Config.cjdj_010[m.CJDJ_index + 1] || Config.cjdj1_010[m.CJDJ_index + 1]) {
            if (this._st == 0) {
                if (now - 2000 > s._lastTime) {
                    st = 1;
                    s._lastTime = now;
                }
                else {
                    st = 0;
                }
            }
            else {
                if (now - 3000 > s._lastTime) {
                    st = 0;
                    s._lastTime = now;
                }
                else {
                    st = 1;
                }
            }
        }
        else {
            st = 0;
        }
        this.setTip(st);
    };
    ChildCZDJ.prototype.setTip = function (val) {
        if (this._st == val)
            return;
        this._st = val;
        if (val == 0) {
            this.tip.visible = false;
        }
        else if (val == 1) {
            this.findNewPos();
        }
    };
    ChildCZDJ.prototype.findNewPos = function () {
        var countArr = [];
        for (var i = 0; i < this.dta.length; i++) {
            var st = this.dta[i][0];
            if (st != 2) {
                countArr.push(i);
            }
        }
        var count = Math.floor(Math.random() * countArr.length);
        count = countArr[count];
        if (count == 3 || count == 7) {
            this.tip.visible = false;
        }
        else {
            this.tip.visible = true;
            this.tip.setXY(this.lst.x + (count % 4) * 154 + 100, this.lst.y + Math.floor(count / 4) * 143 - 4);
        }
    };
    ChildCZDJ.prototype.updateX = function () {
        if (Model_GlobalMsg.kaifuDay > 7) {
            if (this._act) {
                var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
                d = Math.max(d, 0);
                this.lbTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d);
            }
            else {
                this.lbTime.text = "剩余时间：";
            }
        }
        else {
            var ax = Model_GlobalMsg.getkaiFuTime();
            if (ax < 0) {
                this.lbTime.text = "剩余时间：已结束";
            }
            else {
                this.lbTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
            }
        }
        this.randomEff();
    };
    ChildCZDJ.prototype.disposePanel = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var s = this;
        GGlobal.control.remove(Enum_MsgType.HD_CJDJ, s.update, s);
        GGlobal.control.remove(Enum_MsgType.HD_CJDJLQ, s.lqCallBack, s);
        Timer.instance.remove(s.updateX, s);
        s.tip.visible = false;
        s.lst.numItems = 0;
        s.n17.numItems = 0;
        IconUtil.setImg(s.imgHeadbg, null);
    };
    ChildCZDJ.prototype.show = function (p, id) {
        var s = this;
        s._hid = id;
        p.addChild(s);
        s.setXY(0, 290);
        // s._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, UIConst.HUODONG_DIANJIANG)
        GGlobal.control.listen(Enum_MsgType.HD_CJDJ, s.update, s);
        GGlobal.control.listen(Enum_MsgType.HD_CJDJLQ, s.lqCallBack, s);
        if (Model_GlobalMsg.kaifuDay > 7) {
            s._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, UIConst.HUODONG_DIANJIANG);
            GGlobal.modelActivity.CG_OPENACT(UIConst.HUODONG_DIANJIANG);
        }
        else {
            GGlobal.modelHuoDong.CG_OPENUI_4371();
        }
        Timer.instance.listen(s.updateX, s, 1000);
        this.setTip(0);
        IconUtil.setImg(s.imgHeadbg, Enum_Path.PIC_URL + "bar4506.jpg");
    };
    ChildCZDJ.URL = "ui://vrw7je9rhfv1f";
    return ChildCZDJ;
}(fairygui.GComponent));
__reflect(ChildCZDJ.prototype, "ChildCZDJ", ["IChildHuoDong"]);
