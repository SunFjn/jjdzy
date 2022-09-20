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
var Child_ActComCzZp = (function (_super) {
    __extends(Child_ActComCzZp, _super);
    function Child_ActComCzZp() {
        var _this = _super.call(this) || this;
        _this._rota = 0;
        return _this;
    }
    Child_ActComCzZp.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComCzZp", "Child_ActComCzZp"));
    };
    Child_ActComCzZp.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActComCzZp.prototype.initView = function (pParent) {
        var s = this;
        s._gridArr = [];
        s._imgArr = [];
        s._zpArr = [];
        for (var i = 0; i < 8; i++) {
            s._gridArr.push((s.getChild("grid" + i)));
            s._imgArr.push((s.getChild("img" + i)));
            s._zpArr.push((s.getChild("zp" + i)));
            s._imgArr[i].x = s._gridArr[i].x + 3;
            s._imgArr[i].y = s._gridArr[i].y + 3;
        }
        s.checkBox.visible = false;
    };
    Child_ActComCzZp.prototype.openPanel = function (pData) {
        var self = this;
        self._act = pData;
        self.show();
        self.setXY(0, 257);
    };
    Child_ActComCzZp.prototype.closePanel = function (pData) {
        this.disposePanel();
    };
    Child_ActComCzZp.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    Child_ActComCzZp.prototype.show = function () {
        var s = this;
        Timer.instance.listen(this.upTimer, this, 1000);
        GGlobal.control.listen(Enum_MsgType.ACTCOM_CZZP, this.upUi, this);
        GGlobal.control.listen(Enum_MsgType.ACTCOM_CZZP_TURN, this.onTurn, this);
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_CZZP);
        s.btnZP.addClickListener(s.onZhuanP, s);
        s.linkLb.addClickListener(s.openGaiLV, s);
        s.upUi();
        s._rota = s.imgArrow.rotation = 0;
    };
    Child_ActComCzZp.prototype.openGaiLV = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.GAILV, 6);
    };
    Child_ActComCzZp.prototype.disposePanel = function () {
        var s = this;
        Timer.instance.remove(this.upTimer, this);
        GGlobal.control.remove(Enum_MsgType.ACTCOM_CZZP, this.upUi, this);
        GGlobal.control.remove(Enum_MsgType.ACTCOM_CZZP_TURN, this.onTurn, this);
        s.btnZP.removeClickListener(s.onZhuanP, s);
        s.linkLb.removeClickListener(s.openGaiLV, s);
        for (var i = 0; i < 8; i++) {
            this._gridArr[i].clean();
        }
    };
    Child_ActComCzZp.prototype.upUi = function () {
        var s = this;
        var model = GGlobal.model_actCom;
        if (model.zpArr.length == 0) {
            return;
        }
        s.upTimer();
        var max = 0;
        var cur = model.zpCharge;
        var isTop = false;
        //找下个充值数
        var len = model.zpArr.length;
        for (var i = 0; i < len; i++) {
            var v = model.zpArr[i];
            var cfg = Config.czzpreward_281[v.id];
            if (cur < cfg.cz) {
                max = cfg.cz;
                break;
            }
            if (i == len - 1) {
                max = cfg.cz;
                isTop = true;
                break;
            }
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
        for (var i = 0; i < len; i++) {
            var v = model.zpArr[i];
            var cfg = Config.czzpreward_281[v.id];
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
    Child_ActComCzZp.prototype.upTimer = function () {
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
    Child_ActComCzZp.prototype.onZhuanP = function () {
        GGlobal.model_actCom.CG_CHONG_ZHI_ZP_TURN();
    };
    Child_ActComCzZp.prototype.onTurn = function () {
        var s = this;
        var model = GGlobal.model_actCom;
        var scrTo = model.zpPos % 1000;
        s.imgArrow.visible = true;
        var endRot = Math.floor(this._rota / 360) * 360 + (scrTo - 1) * 45 + 360 * 2;
        this._tween = egret.Tween.get(this.imgArrow).to({ rotation: endRot }, 1000).call(this.closeHand, this, [endRot]);
    };
    Child_ActComCzZp.prototype.closeHand = function (endRot) {
        this._rota = endRot;
        this.upUi();
    };
    Child_ActComCzZp.pkg = "actComCzZp";
    Child_ActComCzZp.URL = "ui://5omp3d64ve5s0";
    return Child_ActComCzZp;
}(fairygui.GComponent));
__reflect(Child_ActComCzZp.prototype, "Child_ActComCzZp", ["IPanel"]);
