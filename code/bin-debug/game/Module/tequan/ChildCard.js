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
var ChildCard = (function (_super) {
    __extends(ChildCard, _super);
    function ChildCard() {
        var _this = _super.call(this) || this;
        _this.idx = 0;
        _this.time = 0;
        _this.st = -1;
        return _this;
    }
    ChildCard.createInstance = function () {
        if (!this._ins)
            this._ins = (fairygui.UIPackage.createObject("tequan", "ChildCard"));
        return this._ins;
    };
    ChildCard.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        this.bg = (this.getChild("bg"));
        this.btn = (this.getChild("btn"));
        this.ylq = (this.getChild("ylq"));
        this.lbTime = (this.getChild("lbTime"));
        this.n25 = (this.getChild("n25"));
        this.btn.checkNotice = false;
    };
    ChildCard.prototype.onClick = function () {
        if (this.st == -1) {
            var cfg = Config.tqk_719[this.idx];
            GGlobal.modelchongzhi.CG_CHONGZHI_135(cfg.shop);
        }
        else {
            GGlobal.modelvip.CG_LTQ_2173(this.idx);
        }
    };
    ChildCard.prototype.renewHD = function () {
        var cfg = Config.tqk_719[this.idx];
        var cfg1 = Config.shop_011[cfg.shop];
        var t = cfg.QIXIAN / 86400;
        var tips = "续费成功可立即获得<font color='#15f234'>" + cfg1.num + "元宝</font>\n" + cfg1.name + "有效期延长" + t + "天";
        GGlobal.modelchongzhi.CG_CHONGZHI_135(cfg.shop, tips);
    };
    ChildCard.prototype.open = function () {
        var s = this;
        s.btn.addClickListener(s.onClick, s);
        s.n25.addClickListener(s.renewHD, s);
        GGlobal.control.listen(Enum_MsgType.TQ_LQ, s.update, s);
        GGlobal.control.listen(Enum_MsgType.TQ_INFO, s.update, s);
        s.initCFG();
        s.update();
        Timer.instance.listen(this.updateX, this, 1000);
    };
    ChildCard.prototype.close = function () {
        var s = this;
        s.btn.removeClickListener(s.onClick, s);
        s.n25.removeClickListener(s.renewHD, s);
        GGlobal.control.remove(Enum_MsgType.TQ_LQ, s.update, s);
        GGlobal.control.remove(Enum_MsgType.TQ_INFO, s.update, s);
        Timer.instance.remove(this.updateX, this);
        IconUtil.setImg(s.bg, null);
    };
    ChildCard.prototype.initCFG = function () {
        var a = this;
        var cfg = Config.tqk_719[a.idx];
        a.cfg = cfg;
        IconUtil.setImg(a.bg, Enum_Path.PIC_URL + "card" + a.idx + ".png");
        a.btn.text = "领取";
    };
    ChildCard.prototype.update = function () {
        var idx = this.idx;
        var index = [500401, 500402, 500403].indexOf(idx);
        var d = GGlobal.modelvip.tq_dta;
        for (var i = 0; i < 3; i++) {
            var arr = [index + 1, -1, 0];
            if (d) {
                var j = 0;
                for (j; j < d.length; j++) {
                    if (d[j][0] == idx) {
                        arr = d[j];
                        break;
                    }
                }
            }
        }
        var s = this;
        s.st = arr[1];
        s.btn.checkNotice = s.st == 0;
        s.btn.visible = s.st != 1;
        s.ylq.visible = s.st == 1;
        var time = s.cfg.QIXIAN;
        s.time = arr[2];
        if (time == 0) {
            s.n25.visible = false;
            s.lbTime.text = "有效期：永久有效";
        }
        else {
            s.n25.visible = s.time > egret.getTimer();
            s.lbTime.text = "有效期：" + (time / 3600 / 24) + "天";
        }
        s.updateX();
        s.btn.text = s.st == -1 ? s.cfg.COIN + "元" : "领取";
    };
    ChildCard.prototype.updateX = function () {
        if (this.time > egret.getTimer()) {
            this.lbTime.text = TimeUitl.getRemainingTime(this.time, egret.getTimer());
        }
    };
    ChildCard.URL = "ui://k82cjspug8eo4";
    return ChildCard;
}(fairygui.GComponent));
__reflect(ChildCard.prototype, "ChildCard");
