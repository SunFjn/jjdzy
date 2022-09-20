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
var Child_ActHolyBZhuanP = (function (_super) {
    __extends(Child_ActHolyBZhuanP, _super);
    function Child_ActHolyBZhuanP() {
        var _this = _super.call(this) || this;
        _this._rota = 0;
        return _this;
    }
    Child_ActHolyBZhuanP.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "Child_ActHolyBZhuanP"));
    };
    Child_ActHolyBZhuanP.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this._gridArr = [];
        this._imgArr = [];
        this._zpArr = [];
        for (var i = 0; i < 8; i++) {
            this._gridArr.push((this.getChild("grid" + i)));
            this._imgArr.push((this.getChild("img" + i)));
            this._zpArr.push((this.getChild("zp" + i)));
            this._imgArr[i].x = this._gridArr[i].x + 3;
            this._imgArr[i].y = this._gridArr[i].y + 3;
        }
        this.checkBox.visible = false;
    };
    Object.defineProperty(Child_ActHolyBZhuanP, "instance", {
        get: function () {
            if (Child_ActHolyBZhuanP._instance == null) {
                Child_ActHolyBZhuanP._instance = Child_ActHolyBZhuanP.createInstance();
            }
            return Child_ActHolyBZhuanP._instance;
        },
        enumerable: true,
        configurable: true
    });
    Child_ActHolyBZhuanP.prototype.show = function (p, id) {
        var s = this;
        s._hid = id;
        p.addChild(s);
        s.setXY(0, 257);
        Timer.instance.listen(this.upTimer, this, 1000);
        GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_ZHUANPAN, this.upUi, this);
        GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_ZHUANPAN_TURN, this.onTurn, this);
        GGlobal.modelEightLock.CG4571(id);
        s.btnZP.addClickListener(s.onZhuanP, s);
        s.upUi();
        s._rota = s.imgArrow.rotation = 0;
        IconUtil.setImg1(Enum_Path.PIC_URL + "actHolyBeast_zhuanBg.png", this.bgLoader);
        IconUtil.setImg1(Enum_Path.PIC_URL + "actHolyBeast_zhuanBg0.png", this.bgLoader0);
        IconUtil.setImg1(Enum_Path.PIC_URL + "actHolyBeast_zhuanBg1.png", this.bgLoader1);
    };
    Child_ActHolyBZhuanP.prototype.disposePanel = function () {
        var s = this;
        if (s.parent) {
            s.parent.removeChild(s);
        }
        Timer.instance.remove(this.upTimer, this);
        GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_ZHUANPAN, this.upUi, this);
        GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_ZHUANPAN_TURN, this.onTurn, this);
        s.btnZP.removeClickListener(s.onZhuanP, s);
        for (var i = 0; i < 8; i++) {
            this._gridArr[i].clean();
        }
        IconUtil.setImg1(null, this.bgLoader);
        IconUtil.setImg1(null, this.bgLoader0);
        IconUtil.setImg1(null, this.bgLoader1);
    };
    Child_ActHolyBZhuanP.prototype.dispose = function () {
        Child_ActHolyBZhuanP._instance = null;
        _super.prototype.dispose.call(this);
    };
    Child_ActHolyBZhuanP.prototype.upUi = function () {
        var s = this;
        this._act = null;
        var model = GGlobal.modelActHolyB;
        this._act = ModelEightLock.getActVo(this._hid);
        this.upTimer();
        var max = 0;
        var cur = model.zpCharge;
        var keys = 1;
        var isTop = false;
        while (true) {
            var v = Config.ssshzpcz_268[keys];
            if (v == null) {
                isTop = true;
                max = Config.ssshzpcz_268[keys - 1].cz;
                break;
            }
            if (cur < v.cz) {
                max = v.cz;
                break;
            }
            keys++;
        }
        if (isTop && cur >= max) {
            s.labTip.text = "已达到最高转盘次数";
            s.expBar.visible = false;
        }
        else {
            s.labTip.text = "再充值" + HtmlUtil.fontNoSize((max - cur) + "元", Color.YELLOWSTR) + "可增加转盘次数";
            s.expBar.value = cur;
            s.expBar.max = max;
            s.expBar.getChild("title").asTextField.text = cur + "/" + max;
            s.expBar.visible = true;
        }
        var color = model.zpHaveCt > 0 ? Color.GREENSTR : Color.REDSTR;
        s.labTip1.text = "还可转" + HtmlUtil.fontNoSize(model.zpHaveCt + "", color) + "次";
        s.noticeImg.visible = model.zpHaveCt > 0;
        for (var i = 0; i < 8; i++) {
            var v = Config.ssshzpcz_268[i + 1];
            var arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.show));
            this._gridArr[i].tipEnabled = true;
            this._gridArr[i].isShowEff = true;
            this._gridArr[i].vo = arr[0];
            this._imgArr[i].visible = v.big > 0;
        }
        for (var i = 0; i < 8; i++) {
            var v = model.zpArr[i];
            var boo = (v && v.status == 1);
            this._gridArr[i].grayed = boo;
            this._zpArr[i].grayed = boo;
            this._imgArr[i].grayed = boo;
        }
        s.imgArrow.visible = false;
    };
    Child_ActHolyBZhuanP.prototype.upTimer = function () {
        if (this._act) {
            var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
            if (d < 0) {
                this.labTime.text = "剩余时间：已结束";
            }
            else {
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d);
            }
        }
        else {
            this.labTime.text = "剩余时间：";
        }
    };
    Child_ActHolyBZhuanP.prototype.onZhuanP = function () {
        GGlobal.modelActHolyB.CG_ZHUANPAN_TURN();
    };
    Child_ActHolyBZhuanP.prototype.onTurn = function () {
        var s = this;
        var model = GGlobal.modelActHolyB;
        var scrTo = model.zpPos;
        s.imgArrow.visible = true;
        var endRot = Math.floor(this._rota / 360) * 360 + (scrTo - 1) * 45 + 360 * 2;
        this._tween = egret.Tween.get(this.imgArrow).to({ rotation: endRot }, 1000).call(this.closeHand, this, [endRot]);
    };
    Child_ActHolyBZhuanP.prototype.closeHand = function (endRot) {
        this._rota = endRot;
        this.upUi();
    };
    //>>>>end
    Child_ActHolyBZhuanP.URL = "ui://d5y9ngt6n2pm6";
    return Child_ActHolyBZhuanP;
}(fairygui.GComponent));
__reflect(Child_ActHolyBZhuanP.prototype, "Child_ActHolyBZhuanP", ["IActHolyBeast"]);
