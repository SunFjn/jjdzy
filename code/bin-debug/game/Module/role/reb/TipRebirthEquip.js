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
var TipRebirthEquip = (function (_super) {
    __extends(TipRebirthEquip, _super);
    function TipRebirthEquip() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    TipRebirthEquip.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "TipRebirthEquip"));
    };
    TipRebirthEquip.prototype.childrenCreated = function () {
        GGlobal.createPack("role");
        this.view = fairygui.UIPackage.createObject("role", "TipRebirthEquip").asCom;
        this.contentPane = this.view;
        this.btnUp = (this.view.getChild("btnUp"));
        this.g22 = (this.view.getChild("g22"));
        this.lbName = (this.view.getChild("lbName"));
        this.grid = (this.view.getChild("grid"));
        this.lbNum = (this.view.getChild("lbNum"));
        this.lbLevel = (this.view.getChild("lbLevel"));
        this.lbDes = (this.view.getChild("lbDes"));
        this.lbSourceTit = (this.view.getChild("lbSourceTit"));
        this.lbDesTit = (this.view.getChild("lbDesTit"));
        this.lbSource = (this.view.getChild("lbSource"));
        this.imgDes = (this.view.getChild("imgDes"));
        this.imgSource = (this.view.getChild("imgSource"));
        this.btnOneKey = (this.view.getChild("btnOneKey"));
        this.expBar = (this.view.getChild("expBar"));
        this.lbLv = (this.view.getChild("lbLv"));
        this.viewRes = (this.view.getChild("viewRes"));
        this.lbBase = (this.view.getChild("lbBase"));
        this.lbLH = (this.view.getChild("lbLH"));
        this.lbLhName = (this.view.getChild("lbLhName"));
        this.lbValue = (this.view.getChild("lbValue"));
        _super.prototype.childrenCreated.call(this);
    };
    TipRebirthEquip.prototype.onOpen = function (arg) {
        this._vo = arg;
        _super.prototype.onOpen.call(this, arg);
    };
    TipRebirthEquip.prototype.onShown = function () {
        var a = this;
        a.btnUp.addClickListener(a.onUp, a);
        a.btnOneKey.addClickListener(a.onUp, a);
        GGlobal.control.listen(Enum_MsgType.REBIRTH_EQUIP_UPDATA, a.updateShow, a);
        a.updateShow();
    };
    TipRebirthEquip.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        var a = this;
        a.btnUp.removeClickListener(a.onUp, a);
        a.btnOneKey.removeClickListener(a.onUp, a);
        GGlobal.layerMgr.close(UIConst.TIP_REBIRTH_EQUIP);
        GGlobal.control.remove(Enum_MsgType.REBIRTH_EQUIP_UPDATA, a.updateShow, a);
    };
    TipRebirthEquip.prototype.updateShow = function () {
        var s = this;
        s.grid.vo = s._vo;
        s.grid.showEff(true);
        s.lbName.text = s._vo.name;
        s.lbName.color = s._vo.qColor;
        s.lbBase.text = "基础战力：[color=#16f60b]" + s._vo.basePower + "[/color]";
        var type = s._vo.type - 30;
        var lh = Model_Equip.lhArr[type];
        s.lbLv.text = "Lv." + lh.lv;
        var lhCfg = Config.zhuanshenglh_256[lh.lv];
        s.lbLH.text = "炼魂战力：[color=#16f60b]" + lhCfg.fight + "[/color]";
        if (lhCfg.exp == 0) {
            s.expBar.value = 1;
            s.expBar.max = 1;
            s.expBar._titleObject.text = "MAX";
        }
        else {
            s.expBar.value = lh.exp;
            s.expBar.max = lhCfg.exp;
        }
        var needExp = lhCfg.exp - lh.exp;
        if (needExp < 0) {
            needExp = 0;
        }
        var need = Math.ceil(needExp / Model_Equip.lhAddExp);
        //炼魂石
        var lhItem = VoItem.create(Model_Equip.lhItemId);
        s.viewRes.setImgUrl(lhItem.icon);
        var has = Model_Bag.getItemCount(Model_Equip.lhItemId);
        s.viewRes.setCount(has);
        s.lbLhName.text = lhItem.name;
        var lhAttr = lhCfg["bw" + (type + 1)];
        s.lbValue.text = s.attrString(s._vo.baseAttr, ConfigHelp.SplitStr(lhAttr), "+", "#FFFFFF", "#15f234");
        // this.btnUp.checkNotice = has > 0 && lhCfg.exp != 0;
        this.btnOneKey.checkNotice = (has * 10 + lh.exp >= lhCfg.exp) && (lhCfg.exp != 0);
        this._isFull = lhCfg.exp == 0;
    };
    TipRebirthEquip.prototype.onUp = function (e) {
        var has = Model_Bag.getItemCount(Model_Equip.lhItemId);
        if (has == 0) {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_Equip.lhItemId));
            return;
        }
        if (this._isFull) {
            ViewCommonWarn.text("已满级");
            return;
        }
        var cur = e.currentTarget;
        if (cur.id == this.btnUp.id) {
            GGlobal.modelEquip.addLHLv(this._vo.type, 0);
        }
        else {
            GGlobal.modelEquip.addLHLv(this._vo.type, 1);
        }
    };
    /**属性描述  格式 [[101,100],[102,100],[104,100]] return 攻击：100 防御：100*/
    TipRebirthEquip.prototype.attrString = function (arr, arr1, gap, ATTColor, valColor) {
        if (gap === void 0) { gap = "："; }
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            var attrType = Number(arr[i][0]);
            var attrValue = Number(arr[i][1]);
            var attrType1 = 0;
            var attrValue1 = 0;
            var same = false;
            for (var j = 0; j < arr1.length; j++) {
                attrType1 = Number(arr1[j][0]);
                attrValue1 = Number(arr1[j][1]);
                if (attrType1 == attrType) {
                    same = true;
                    break;
                }
            }
            var name = "";
            var val = '';
            var jssxCfg = Config.jssx_002[attrType];
            if (jssxCfg) {
                name = jssxCfg.name;
                if (jssxCfg.type == 2) {
                    val = gap + "" + (attrValue / 1000) + "%";
                }
                else {
                    val = gap + "" + attrValue + "";
                }
                if (same) {
                    val += " (炼魂+" + attrValue1 + ")";
                }
                if (ATTColor) {
                    name = HtmlUtil.fontNoSize(name, ATTColor);
                }
                else {
                    if (valColor) {
                        name = HtmlUtil.fontNoSize(name, valColor);
                    }
                }
                if (valColor) {
                    val = HtmlUtil.fontNoSize(val, valColor);
                }
                str += name + val;
            }
            if (i != arr.length - 1) {
                str += "\n";
            }
        }
        return str;
    };
    TipRebirthEquip.URL = "ui://3tzqotadm20j42";
    return TipRebirthEquip;
}(UIModalPanel));
__reflect(TipRebirthEquip.prototype, "TipRebirthEquip");
