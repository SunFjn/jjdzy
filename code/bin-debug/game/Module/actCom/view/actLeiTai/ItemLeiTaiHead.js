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
var ItemLeiTaiHead = (function (_super) {
    __extends(ItemLeiTaiHead, _super);
    function ItemLeiTaiHead() {
        return _super.call(this) || this;
    }
    ItemLeiTaiHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComLeiTai", "ItemLeiTaiHead"));
    };
    ItemLeiTaiHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.closeBt.addClickListener(s.onKitOut, s);
        s.vhead.addClickListener(s.onAssist, s);
    };
    ItemLeiTaiHead.prototype.setVo = function (v, leiTai, pos) {
        var s = this;
        s._vo = v;
        s._leiTai = leiTai;
        s._pos = pos;
        if (s._vo == null) {
            s.vhead.setdata(null);
            s.lbTil.text = "";
            s.lbCt.text = "";
            s.closeBt.visible = false;
            s.imgAdd.visible = !leiTai.isNoPly;
            s.imgLei.visible = false;
        }
        else {
            s.imgAdd.visible = false;
            if (v.npcId) {
                s.vhead.setdata(RoleUtil.getHeadImg(v.npcCfg.head + ""), -1, "", -1, true);
                s.lbCt.text = "战力：" + v.npcCfg.power;
                s.lbTil.text = v.npcCfg.name;
            }
            else {
                s.vhead.setdata(v.headId, -1, "", -1, false, v.frameId);
                s.lbCt.text = v.power > 0 ? "战力：" + v.power : "";
                s.lbTil.text = v.name;
            }
            if (leiTai.isLeiZhu && v.pos > 0) {
                s.closeBt.visible = true;
            }
            else {
                s.closeBt.visible = false;
            }
            s.imgLei.visible = (pos == 0 && v.plyId > 0);
        }
    };
    ItemLeiTaiHead.prototype.onKitOut = function () {
        var m = GGlobal.model_ActLeiTai;
        var s = this;
        if (!s._leiTai || !s._vo) {
            return;
        }
        //擂台开启时间已过
        if (!m.isOpenTime()) {
            ViewCommonWarn.text("不在开启时间");
            return;
        }
        m.CG_KICKOUT_11607(s._leiTai.id, s._vo.pos);
    };
    ItemLeiTaiHead.prototype.onAssist = function () {
        var s = this;
        if (!s._leiTai) {
            return;
        }
        if (s._leiTai.isNoPly) {
            return;
        }
        if (s._vo && s._vo.isLei) {
            return;
        }
        if (s._vo && s._vo.plyId > 0) {
            // ViewCommonWarn.text("该位置已有人");
            return;
        }
        //擂台开启时间已过
        var m = GGlobal.model_ActLeiTai;
        if (!m.isOpenTime()) {
            ViewCommonWarn.text("不在开启时间");
            return;
        }
        if (s._leiTai.isLeiZhu) {
            ViewCommonWarn.text("是擂主不能协助");
            return;
        }
        if (m.hasMine()) {
            ViewAlert.show("同一时间只能守擂（协助）一个擂台\n是否确定挑战（协助）", new Handler(s, s.onAssistSure));
        }
        else {
            s.onAssistSure();
        }
    };
    ItemLeiTaiHead.prototype.onAssistSure = function () {
        var m = GGlobal.model_ActLeiTai;
        var s = this;
        m.CG_ASSIST_11605(s._leiTai.id, s._pos);
    };
    ItemLeiTaiHead.URL = "ui://rhfap29in0933";
    return ItemLeiTaiHead;
}(fairygui.GComponent));
__reflect(ItemLeiTaiHead.prototype, "ItemLeiTaiHead");
