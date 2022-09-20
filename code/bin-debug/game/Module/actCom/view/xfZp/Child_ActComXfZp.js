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
var Child_ActComXfZp = (function (_super) {
    __extends(Child_ActComXfZp, _super);
    function Child_ActComXfZp() {
        return _super.call(this) || this;
    }
    Child_ActComXfZp.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComXFZP", "Child_ActComXfZp"));
    };
    Child_ActComXfZp.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s._gridArr = [];
        s._zpArr = [];
        s._imgArr = [];
        for (var i = 0; i < 12; i++) {
            s._gridArr.push((s.getChild("grid" + i)));
            s._zpArr.push((s.getChild("zp" + i)));
            s._imgArr.push((s.getChild("img" + i)));
            s._imgArr[i].x = s._gridArr[i].x + 3;
            s._imgArr[i].y = s._gridArr[i].y + 3;
        }
        s.checkBox.visible = false;
    };
    Child_ActComXfZp.prototype.initView = function (pParent) {
    };
    Child_ActComXfZp.prototype.openPanel = function (pData) {
        this._act = pData;
        this.show();
        this.setXY(0, 257);
    };
    Child_ActComXfZp.prototype.closePanel = function (pData) {
        this.disposePanel();
    };
    Child_ActComXfZp.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    Child_ActComXfZp.prototype.show = function () {
        var s = this;
        Timer.instance.listen(this.upTimer, this, 1000);
        GGlobal.control.listen(Enum_MsgType.ACTCOM_XFZP, this.upUi, this);
        GGlobal.control.listen(Enum_MsgType.ACTCOM_XFZP_TURN, this.onTurn, this);
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_XFZP);
        s.btnZP.addClickListener(s.onZhuanP, s);
        s.linkLb.addClickListener(s.openGaiLV, s);
        s.upUi();
        // s._rota = 
        s.imgArrow.rotation = 0;
    };
    Child_ActComXfZp.prototype.openGaiLV = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.GAILV, 8);
    };
    Child_ActComXfZp.prototype.disposePanel = function () {
        var s = this;
        Timer.instance.remove(this.upTimer, this);
        GGlobal.control.remove(Enum_MsgType.ACTCOM_XFZP, this.upUi, this);
        GGlobal.control.remove(Enum_MsgType.ACTCOM_XFZP_TURN, this.onTurn, this);
        s.btnZP.removeClickListener(s.onZhuanP, s);
        s.linkLb.removeClickListener(s.openGaiLV, s);
        for (var i = 0; i < 8; i++) {
            this._gridArr[i].clean();
        }
    };
    Child_ActComXfZp.prototype.upUi = function () {
        var s = this;
        // this._act = null;
        var model = GGlobal.model_actCom;
        if (model.xfzpArr.length == 0) {
            return;
        }
        // this._act = GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.ACTCOM_XFZP);
        this.upTimer();
        var max = 0;
        var cur = model.xfzpCharge;
        var isTop = false;
        //找下个充值数
        var len = model.xfzpArr.length;
        for (var i = 0; i < len; i++) {
            var v = model.xfzpArr[i];
            var cfg = Config.xhdxfzpxf_316[v.id];
            var yb = Number(JSON.parse(cfg.yb)[0][2]);
            if (cur < yb) {
                max = yb;
                break;
            }
            if (i == len - 1) {
                max = yb;
                isTop = true;
                break;
            }
        }
        if (isTop && cur >= max) {
            s.labTip.text = "已达到最高转盘次数";
            s.expBar.visible = false;
        }
        else {
            s.labTip.text = "再消费" + HtmlUtil.fontNoSize((max - cur) + "元宝", Color.YELLOWSTR) + "可增加转盘次数";
            s.expBar.value = cur;
            s.expBar.max = max;
            s.expBar.getChild("title").asTextField.text = cur + "/" + max;
            s.expBar.visible = true;
        }
        var color = model.xfzpHaveCt > 0 ? Color.GREENSTR : Color.REDSTR;
        s.labTip1.text = "还可转" + HtmlUtil.fontNoSize(model.xfzpHaveCt + "", color) + "次";
        s.noticeImg.visible = model.xfzpHaveCt > 0;
        for (var i = 0; i < len; i++) {
            var v = model.xfzpArr[i];
            var cfg = Config.xhdxfzpxf_316[v.id];
            var arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.show));
            this._gridArr[i].tipEnabled = true;
            this._gridArr[i].isShowEff = true;
            this._gridArr[i].vo = arr[0];
            this._imgArr[i].visible = cfg.big > 0;
            //已经转到过了
            var boo = (v.status == 1);
            this._gridArr[i].grayed = boo;
            this._zpArr[i].grayed = boo;
            this._imgArr[i].grayed = boo;
        }
        s.imgArrow.visible = false;
    };
    Child_ActComXfZp.prototype.upTimer = function () {
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
    Child_ActComXfZp.prototype.onZhuanP = function () {
        if (TimeUitl.cool("Child_ActComXfZp", 1200)) {
            GGlobal.model_actCom.CG_XFZP_TURN();
        }
    };
    Child_ActComXfZp.prototype.onTurn = function () {
        var s = this;
        var model = GGlobal.model_actCom;
        var scrTo = model.xfzpPos % 1000;
        s.imgArrow.visible = true;
        // var endRot = Math.floor(s._rota / 360) * 360 + (scrTo - 1) * 30 + 360 * 2;
        var endRot = (scrTo - 1) * 30 + 360 * 2;
        s._tween = egret.Tween.get(s.imgArrow).to({ rotation: endRot }, 1000).call(s.closeHand, s, [endRot]);
    };
    Child_ActComXfZp.prototype.closeHand = function (endRot) {
        // this._rota = endRot
        // this._rota = 0
        this.imgArrow.rotation = 0;
        this.upUi();
    };
    Child_ActComXfZp.pkg = "actComXFZP";
    Child_ActComXfZp.URL = "ui://eo9jmf5wve5s0";
    return Child_ActComXfZp;
}(fairygui.GComponent));
__reflect(Child_ActComXfZp.prototype, "Child_ActComXfZp", ["IPanel"]);
