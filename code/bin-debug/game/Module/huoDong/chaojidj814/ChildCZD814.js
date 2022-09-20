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
var ChildCZD814 = (function (_super) {
    __extends(ChildCZD814, _super);
    function ChildCZD814() {
        var _this = _super.call(this) || this;
        _this.dta = [];
        _this._st = 0;
        _this._lastTime = 0;
        return _this;
    }
    Object.defineProperty(ChildCZD814, "instance", {
        get: function () {
            if (ChildCZD814._instance == null) {
                var fac = fairygui.UIObjectFactory;
                fac.setPackageItemExtension(ChildCZD814.URL, ChildCZD814);
                fac.setPackageItemExtension(ItemCJD814.URL, ItemCJD814);
                fac.setPackageItemExtension(ChildD814.URL, ChildD814);
                ChildCZD814._instance = (fairygui.UIPackage.createObject("huoDong", "ChildCZDJ"));
            }
            return ChildCZD814._instance;
        },
        enumerable: true,
        configurable: true
    });
    ChildCZD814.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        var sf = this;
        CommonManager.parseChildren(sf, sf);
        s.lst.setVirtual();
        s.lst.callbackThisObj = s;
        s.lst.itemRenderer = s.itenRender;
        s.n17 = (s.getChild("n17"));
        s.n17.callbackThisObj = s;
        s.n17.itemRenderer = s.itenTitleRender;
    };
    ChildCZD814.prototype.itenRender = function (idx, obj) {
        var it = obj;
        it.setdata(this.dta[idx], idx);
    };
    ChildCZD814.prototype.itenTitleRender = function (idx, obj) {
        var it = obj;
        it.setdata(this._showDta[idx]);
    };
    //needQs 是否需要判断期数
    ChildCZD814.prototype.getShowDta = function (lib, day) {
        if (this._day != day || !this._showDta) {
            var temp = [];
            var shunxu = JSON.parse(ConfigHelp.getSystemDesc(2701))[0];
            // let shunxu = [8, 6, 4, 2, 7, 5, 3, 1]
            for (var i in lib) {
                var cfg = lib[i];
                if (cfg.qs != day)
                    continue;
                var vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
                var xunhao = shunxu.indexOf(Number(cfg.cishu));
                temp[xunhao] = [cfg.cishu, vo];
            }
            this._showDta = temp;
            this._day = day;
        }
    };
    ChildCZD814.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelHuoD814;
        var lib = Config.cjdj3_010[m.CJDJ_index];
        s.getShowDta(Config.cjdj3_010, m.CJDJ_qs);
        var yb = lib.yuanbao;
        if (Model_GlobalMsg.kaifuDay > 7) {
            this.lbTime.text = "剩余时间：";
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
    ChildCZD814.prototype.lqCallBack = function () {
        this.update();
    };
    ChildCZD814.prototype.randomEff = function () {
        var s = this;
        var st = 0;
        var now = egret.getTimer();
        var m = GGlobal.modelHuoD814;
        if (m.CJDJ_count > 0 || Config.cjdj3_010[m.CJDJ_index + 1]) {
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
    ChildCZD814.prototype.setTip = function (val) {
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
    ChildCZD814.prototype.findNewPos = function () {
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
    ChildCZD814.prototype.updateX = function () {
        if (this._act) {
            var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
            d = Math.max(d, 0);
            this.lbTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d);
        }
        else {
            this.lbTime.text = "剩余时间：";
        }
        this.randomEff();
    };
    ChildCZD814.prototype.disposePanel = function () {
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
    ChildCZD814.prototype.show = function (p, id) {
        var s = this;
        s._hid = id;
        p.addChild(s);
        s.setXY(0, 290);
        GGlobal.control.listen(Enum_MsgType.HD_CJDJ, s.update, s);
        GGlobal.control.listen(Enum_MsgType.HD_CJDJLQ, s.lqCallBack, s);
        s._act = ModelEightLock.getActVo(UIConst.HUODONG_DIANJIAN814);
        GGlobal.modelEightLock.CG4571(UIConst.HUODONG_DIANJIAN814);
        Timer.instance.listen(s.updateX, s, 1000);
        this.setTip(0);
        IconUtil.setImg(s.imgHeadbg, Enum_Path.PIC_URL + "bar4506.jpg");
    };
    ChildCZD814.URL = "ui://vrw7je9rhfv1f";
    return ChildCZD814;
}(fairygui.GComponent));
__reflect(ChildCZD814.prototype, "ChildCZD814", ["IChildHuoDong"]);
