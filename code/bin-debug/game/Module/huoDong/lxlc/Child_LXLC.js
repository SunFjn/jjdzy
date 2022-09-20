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
var Child_LXLC = (function (_super) {
    __extends(Child_LXLC, _super);
    function Child_LXLC() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    Object.defineProperty(Child_LXLC, "instance", {
        get: function () {
            if (Child_LXLC._instance == null) {
                var fac = fairygui.UIObjectFactory;
                fac.setPackageItemExtension(Child_LXLC.URL, Child_LXLC);
                fac.setPackageItemExtension(VLXLCItem.URL, VLXLCItem);
                Child_LXLC._instance = (fairygui.UIPackage.createObject("huoDong", "Child_LXLC"));
            }
            return Child_LXLC._instance;
        },
        enumerable: true,
        configurable: true
    });
    Child_LXLC.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        CommonManager.parseChildren(sf, sf);
        sf._itemArr = [sf.item0, sf.item1, sf.item2];
        sf.list.callbackThisObj = sf;
        sf.list.itemRenderer = sf.itenRender;
        var titleObject = (sf.expBar.getChild("title"));
        titleObject.visible = false;
    };
    Child_LXLC.prototype.disposePanel = function () {
        var s = this;
        if (s.parent) {
            s.parent.removeChild(s);
        }
        GGlobal.control.remove(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, s.update, s);
        GGlobal.control.remove(Enum_MsgType.ZERO_RESET, s.zeroRest, s);
        Timer.instance.remove(s.updateX, s);
        s.btnGet.removeClickListener(s.onGet, s);
        s.btnRec.removeClickListener(s.onRec, s);
        s.btnBigGet.removeClickListener(s.onBigGet, s);
        s.list.numItems = 0;
        if (this.awatar) {
            this.awatar.onRemove();
            this.awatar = null;
        }
        for (var i = 0; i < 3; i++) {
            this._itemArr[i].clean();
        }
        IconUtil.setImg(this.imgHeadbg, null);
        IconUtil.setImg(this.imgBig, null);
    };
    Child_LXLC.prototype.show = function (p, id) {
        var s = this;
        s._hid = id;
        p.addChild(s);
        s.setXY(0, 290);
        if (Model_GlobalMsg.kaifuDay > 7) {
            s._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, UIConst.HUODONG_SEVEN_ACT);
            GGlobal.modelHuoDong.CG_SEVEN_ACT_UI();
        }
        else {
            GGlobal.modelHuoDong.CG_SEVEN_KAIFU_UI();
        }
        GGlobal.control.listen(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, s.update, s);
        GGlobal.control.listen(Enum_MsgType.ZERO_RESET, s.zeroRest, s);
        Timer.instance.listen(s.updateX, s, 1000);
        IconUtil.setImg(this.imgHeadbg, Enum_Path.PIC_URL + "bar" + Config.jchd_723[id].icon + ".jpg");
        s.btnGet.addClickListener(s.onGet, s);
        s.btnRec.addClickListener(s.onRec, s);
        s.btnBigGet.addClickListener(s.onBigGet, s);
        s.updateX();
        s.update();
    };
    Child_LXLC.prototype.updateX = function () {
        if (Model_GlobalMsg.kaifuDay > 7) {
            if (this._act) {
                var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
                d = Math.max(d, 0);
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d);
            }
            else {
                this.labTime.text = "剩余时间：";
            }
        }
        else {
            var ax = Model_GlobalMsg.getkaiFuTime();
            if (ax < 0) {
                this.labTime.text = "剩余时间：已结束";
            }
            else {
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
            }
        }
    };
    Child_LXLC.prototype.update = function () {
        var s = this;
        var lib;
        var qs = 0;
        if (Model_GlobalMsg.kaifuDay <= 7) {
            lib = Config.lxlc1_745;
        }
        else {
            lib = Config.lxlc2_745;
            qs = Model_HuoDong.sevenQs;
        }
        var showStr;
        if (Model_GlobalMsg.kaifuDay <= 7) {
            showStr = ConfigHelp.getSystemDesc(5201);
        }
        else {
            if (qs == 4) {
                showStr = ConfigHelp.getSystemDesc(5208); //单独写死
            }
            else if (qs == 5) {
                showStr = ConfigHelp.getSystemDesc(5209); //单独写死
            }
            else {
                showStr = ConfigHelp.getSystemDesc(5201 + qs);
            }
        }
        s._showArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(showStr));
        s.list.numItems = s._showArr.length;
        //今日领取
        s.imgGet.visible = Model_HuoDong.sevenKfStatus == 2;
        s.btnGet.visible = Model_HuoDong.sevenKfStatus == 1;
        s.btnGet.checkNotice = true;
        s.btnRec.visible = Model_HuoDong.sevenKfStatus == 0;
        //大奖领取
        s._bigArr = [];
        for (var key in lib) {
            var v = lib[key];
            if (v.qishu && qs > 0) {
                if (v.qishu == qs) {
                    s._bigArr.push(v);
                }
            }
            else {
                s._bigArr.push(v);
            }
        }
        //大奖最大天数
        var tianMax = s._bigArr[s._bigArr.length - 1].tianshu;
        var hStatus = 0;
        //大奖当前天数
        var tianCur;
        var bigArr;
        s._hHuoD = null;
        for (var i = 0; i < 3; i++) {
            tianCur = s._bigArr[i].tianshu;
            bigArr = s._bigArr[i];
            var h = Model_HuoDong.sevenKfArr[i];
            if (!h) {
                break;
            }
            s._hHuoD = h;
            hStatus = h.status;
            if (Model_HuoDong.sevenKfCount < tianCur) {
                break;
            }
            if (h.status < 2) {
                break;
            }
        }
        for (var i = 0; i < 3; i++) {
            s._itemArr[i].vo = s._bigArr[i];
        }
        this.expBar.value = Model_HuoDong.sevenKfCount;
        this.expBar.max = tianMax;
        var zhanshiArr = ConfigHelp.SplitStr(bigArr.zhanshi);
        var zhanshiType = Number(zhanshiArr[0][0]);
        var zhanshiValue = Number(zhanshiArr[0][1]);
        if (this.awatar) {
            this.awatar.onRemove();
            this.awatar = null;
        }
        if (zhanshiType == 1) {
            IconUtil.setImg(s.imgBig, Enum_Path.PIC_URL + zhanshiValue + ".png");
            s.imgBig.visible = true;
        }
        else {
            s.imgBig.visible = false;
            if (!this.awatar) {
                this.awatar = UIRole.create();
                this.awatar.setPos(this.imgLabBig.x + this.imgLabBig.width / 2, this.imgLabBig.y - 30);
                this.awatar.setScaleXY(1.5, 1.5);
                this.awatar.uiparent = this.displayListContainer;
                this.awatar.setBody(zhanshiValue);
                this.awatar.setWeapon(zhanshiValue);
                this.awatar.onAdd();
            }
        }
        this.labBig.text = "大奖进度" + Model_HuoDong.sevenKfCount + "/" + tianCur;
        this.labCharge.text = "今日已充" + HtmlUtil.fontNoSize(Model_HuoDong.sevenKf + "", Color.TEXT_YELLOW) + "元";
        this.labDay.text = Model_HuoDong.sevenKfCount + "天";
        if (Model_HuoDong.sevenKfCount < tianCur) {
            s.imgBigGet.visible = false;
            s.btnBigGet.visible = false;
            s.labBig.visible = true;
            s.imgLabBig.visible = true;
        }
        else {
            s.imgBigGet.visible = hStatus == 2;
            s.btnBigGet.visible = hStatus < 2;
            s.btnBigGet.checkNotice = hStatus == 1;
            s.labBig.visible = false;
            s.imgLabBig.visible = false;
        }
    };
    Child_LXLC.prototype.itenRender = function (idx, obj) {
        var it = obj;
        it.tipEnabled = true;
        it.isShowEff = true;
        it.vo = this._showArr[idx];
    };
    Child_LXLC.prototype.onGet = function () {
        if (Model_GlobalMsg.kaifuDay <= 7) {
            GGlobal.modelHuoDong.CG_SEVEN_KAIFU_TODAY();
        }
        else {
            GGlobal.modelHuoDong.CG_SEVEN_ACT_TODAY();
        }
    };
    Child_LXLC.prototype.onRec = function () {
        ViewChongZhi.tryToOpenCZ();
    };
    Child_LXLC.prototype.onBigGet = function () {
        var s = this;
        if (s._hHuoD == null) {
            return;
        }
        if (Model_GlobalMsg.kaifuDay <= 7) {
            GGlobal.modelHuoDong.CG_SEVEN_KAIFU_GET(s._hHuoD.id);
        }
        else {
            GGlobal.modelHuoDong.CG_SEVEN_ACT_GET(s._hHuoD.id);
        }
    };
    Child_LXLC.prototype.zeroRest = function () {
        var s = this;
        if (Model_GlobalMsg.kaifuDay > 7) {
            s._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, UIConst.HUODONG_SEVEN_ACT);
            GGlobal.modelHuoDong.CG_SEVEN_ACT_UI();
        }
        else {
            GGlobal.modelHuoDong.CG_SEVEN_KAIFU_UI();
        }
    };
    Child_LXLC.URL = "ui://vrw7je9re7xr12";
    return Child_LXLC;
}(fairygui.GComponent));
__reflect(Child_LXLC.prototype, "Child_LXLC");
