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
var WardItem = (function (_super) {
    __extends(WardItem, _super);
    function WardItem() {
        var _this = _super.call(this) || this;
        _this.arr = ["", "16强", "8强", "4强", "决赛"];
        _this.libIndex = 0;
        return _this;
    }
    WardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "WardItem"));
    };
    WardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.lbTitle = (s.getChild("lbTitle"));
        s.box = (s.getChild("box"));
        s.lbRemain = (s.getChild("lbRemain"));
        s.lbMyYuanBao = (s.getChild("lbMyYuanBao"));
        s.g0 = (s.getChild("g0"));
        s.yqw = (s.getChild("yqw"));
        s.btn = (s.getChild("btn"));
        s.g1 = (s.getChild("g1"));
        s.lbLuckMoney = (s.getChild("lbLuckMoney"));
        s.lbLucker = (s.getChild("lbLucker"));
        s.g2 = (s.getChild("g2"));
        s.lbTip = (s.getChild("lbTip"));
        s.btn.addClickListener(s.onClick, s);
        s.g2.visible = s.g0.visible = s.g1.visible = false;
        s.lbTip.visible = true;
    };
    WardItem.prototype.setIndex = function (v) {
        var s = this;
        s.libIndex = v;
        s.box.url = fairygui.UIPackage.getItemURL("Arena", "bx" + v);
        s.lbTitle.text = s.arr[s.libIndex] + "奖池";
        s.lbTip.text = s.arr[v] + "结束后可抢<font color='#ffc334'>元宝</font>大奖\n<font color='#fe0000'>数量有限，先到先得</font>";
    };
    WardItem.prototype.onClick = function () {
        GGlobal.modelsgws.CG_TAKE_1837(this.libIndex);
    };
    WardItem.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelsgws;
        var st = m.state;
        var lun = m.lun;
        if (m.wardPool[s.libIndex]) {
            var dta = m.wardPool[s.libIndex];
            var lib = Config.doublereward_230[s.libIndex];
            var remain = lib.num - dta.count;
            if (remain > 0) {
                s.lbRemain.text = "剩余次数：<font color='#15f234'>" + remain + "/" + lib.num + "</font>";
            }
            else {
                s.lbRemain.text = "剩余次数：<font color='#fe0000'>" + remain + "/" + lib.num + "</font>";
            }
            var isOpen = s.libIndex < lun;
            if (isOpen) {
                s.g2.visible = s.g0.visible = s.g1.visible = true;
                if (dta.myCount > 0) {
                    s.g1.visible = false;
                    s.lbMyYuanBao.visible = true;
                    s.lbMyYuanBao.text = dta.myCount + "元宝";
                }
                else if (remain > 0) {
                    s.g0.visible = false;
                    s.btn.visible = true;
                    s.yqw.visible = false;
                    s.lbMyYuanBao.visible = false;
                }
                else {
                    s.yqw.visible = true;
                    s.g1.visible = true;
                    s.btn.visible = false;
                    s.g0.visible = false;
                }
                s.lbTip.visible = false;
                if (dta.luckerName) {
                    s.lbLucker.text = dta.luckerName;
                    s.lbLuckMoney.text = "" + dta.luckNum;
                    this.g2.visible = true;
                }
            }
            else {
                s.lbTip.visible = true;
                s.g0.visible = s.g1.visible = s.g2.visible = false;
            }
        }
    };
    WardItem.URL = "ui://me1skowl608ax";
    return WardItem;
}(fairygui.GComponent));
__reflect(WardItem.prototype, "WardItem");
