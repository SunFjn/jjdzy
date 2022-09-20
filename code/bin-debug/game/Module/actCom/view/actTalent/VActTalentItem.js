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
var VActTalentItem = (function (_super) {
    __extends(VActTalentItem, _super);
    function VActTalentItem() {
        return _super.call(this) || this;
    }
    VActTalentItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actTalent", "VActTalentItem"));
    };
    VActTalentItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.itemRenderer = s.renderHandle;
        s.list.callbackThisObj = s;
        s.btnGet.addClickListener(s.onClickGet, s);
        s.btnRec.addClickListener(s.onClickRec, s);
    };
    VActTalentItem.prototype.setVo = function (v, hid) {
        var s = this;
        s._vo = v;
        s._hid = hid;
        var colorStr;
        var model = GGlobal.modelActTalent;
        var count;
        s.btnRec.text = "前往";
        if (hid == UIConst.ACTCOM_TALENT) {
            s._cfg = Config.lffwxltf_285[v.id];
            count = model.xlCt;
            colorStr = count >= s._cfg.cs ? Color.GREENSTR : Color.REDSTR;
            s.lab.text = "修炼天赋<font color='" + colorStr + "'>（" + count + "/" + s._cfg.cs + "）</font>";
        }
        else if (hid == UIConst.YUNCHOUWEIWO_JLMJ) {
            s._cfg = Config.jnmj_327[v.id];
            count = model.jlmjCount;
            colorStr = count >= s._cfg.cs ? Color.GREENSTR : Color.REDSTR;
            s.lab.text = "出谋划策次数<font color='" + colorStr + "'>（" + count + "/" + s._cfg.cs + "）</font>";
        }
        // colorStr = model.xlCt >= s._cfg.cs ? Color.GREENSTR : Color.REDSTR;
        // s.lab.text = "修炼天赋<font color='" + colorStr + "'>（" + model.xlCt + "/" + s._cfg.cs + "）</font>"
        s._status = v ? v.status : 0;
        if (s._status == 0) {
            s.btnGet.touchable = s.btnGet.visible = false;
            s.btnRec.touchable = s.btnRec.visible = true;
            s.imgGet.visible = false;
        }
        else if (s._status == 1) {
            s.btnGet.checkNotice = s.btnGet.touchable = s.btnGet.visible = true;
            s.btnRec.touchable = s.btnRec.visible = false;
            s.imgGet.visible = false;
        }
        else if (s._status == 2) {
            s.btnGet.touchable = s.btnGet.visible = false;
            s.btnRec.touchable = s.btnRec.visible = false;
            s.imgGet.visible = true;
        }
        else {
            s.btnGet.touchable = s.btnGet.visible = false;
            s.btnRec.touchable = s.btnRec.visible = false;
            s.imgGet.visible = false;
        }
        s._listData = null;
        //奖励显示
        s._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(s._cfg.jl));
        s.list.numItems = s._listData ? s._listData.length : 0;
    };
    VActTalentItem.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    VActTalentItem.prototype.onClickGet = function () {
        if (this._status == 0) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        if (this._hid == UIConst.ACTCOM_TALENT) {
            GGlobal.modelActTalent.CG_TALENT_GET9351(this._vo.id);
        }
        else if (this._hid == UIConst.YUNCHOUWEIWO_JLMJ) {
            GGlobal.modelActTalent.CG_YCWW_JLMJ_GET(this._vo.id);
        }
    };
    VActTalentItem.prototype.onClickRec = function (e) {
        if (this._hid == UIConst.ACTCOM_TALENT) {
            GGlobal.layerMgr.open(UIConst.XIULIAN_TF);
        }
        else if (this._hid == UIConst.YUNCHOUWEIWO_JLMJ) {
            GGlobal.layerMgr.open(UIConst.QICE_LOTTERY);
        }
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    VActTalentItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VActTalentItem.URL = "ui://smvxlnhhoiu11";
    return VActTalentItem;
}(fairygui.GComponent));
__reflect(VActTalentItem.prototype, "VActTalentItem");
