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
/**
 * 奇策兵魂吞噬界面
 * @author: lujiahao
 * @date: 2019-10-23 14:43:15
 */
var ViewHunQice = (function (_super) {
    __extends(ViewHunQice, _super);
    function ViewHunQice() {
        var _this = _super.call(this) || this;
        _this._hunType = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewHunQice.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "TipEatDan").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        _super.prototype.childrenCreated.call(this);
    };
    ViewHunQice.prototype.onShown = function () {
        var t = this;
        var t_arg = t._args;
        if (t_arg) {
            t._curVo = GGlobal.modelQice.getVoById(t_arg.id);
            t._hunType = t_arg.hunType;
        }
        t.registerEvent(true);
        t.refreshData();
    };
    ViewHunQice.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.grid.clean();
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ViewHunQice.prototype.refreshData = function () {
        var t = this;
        if (t._curVo) {
            var t_cfg = Config.qcts_760[t._hunType];
            if (!t_cfg)
                return;
            var t_itemCfg = Config.daoju_204[t_cfg.id];
            if (!t_itemCfg)
                return;
            var itvo = VoItem.create(t_cfg.id);
            t.grid.tipEnabled = false;
            t.grid.isShowEff = true;
            t.grid.vo = itvo;
            // ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + t_itemCfg.quality + ".png", this.bg);
            // ImageLoader.instance.loader(Enum_Path.ICON70_URL + t_itemCfg.icon + ".png", this.imgIcon);
            t.lab.text = "奇策激活（升星）可增加吞噬上限";
            t.lab1.text = ConfigHelp.reTxt("已永久增加{0}属性", HtmlUtil.font(t._curVo.cfg.name, Color.getColorStr(t._curVo.cfg.pz)));
            t.labName.text = FastAPI.getItemName(t_itemCfg.id, true);
            var t_bagCount = Model_Bag.getItemCount(t_itemCfg.id);
            t.labCount.text = "拥有数量：" + t_bagCount;
            var t_hunCount = 0;
            var t_hunMax = 0;
            var attstr = "";
            switch (t._hunType) {
                case EnumQice.HUN_TYPE_BH:
                    t_hunCount = t._curVo.bHun;
                    t_hunMax = t._curVo.bhMax;
                    var attArr1 = JSON.parse(t_cfg.attr1);
                    for (var i = 0; i < attArr1.length; i++) {
                        if (i == 0) {
                            attstr += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1] * t_hunCount);
                        }
                        else {
                            attstr += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1] * t_hunCount);
                        }
                    }
                    break;
                case EnumQice.HUN_TYPE_JH:
                    t_hunCount = t._curVo.jHun;
                    t_hunMax = t._curVo.jhMax;
                    var t_value = (~~t_cfg.attr2) * 100 * t_hunCount / 100000;
                    attstr += "升星属性 +" + t_value + "%";
                    attstr += "\n升阶属性 +" + t_value + "%";
                    break;
            }
            t.labHas.text = "已吞噬：" + t_hunCount + "/" + t_hunMax;
            t.labAttr.text = attstr;
            if (t_hunCount >= t_hunMax)
                t.btnOneKey.checkNotice = t.btnEat.checkNotice = false;
            else
                t.btnOneKey.checkNotice = t.btnEat.checkNotice = t_bagCount > 0;
        }
        else {
        }
    };
    ViewHunQice.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnEat, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnOneKey, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_HUN_CHANGE, t.onHunChange, t);
    };
    //======================================== handler =========================================
    ViewHunQice.prototype.onHunChange = function () {
        var t = this;
        t.refreshData();
    };
    ViewHunQice.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelQice;
        switch (e.currentTarget) {
            case t.btnEat:
                if (t._curVo) {
                    t_model.CG_QiCe_eatDan_9707(0, t._curVo.id, t._hunType);
                }
                break;
            case t.btnOneKey:
                if (t._curVo) {
                    t_model.CG_QiCe_eatDan_9707(1, t._curVo.id, t._hunType);
                }
                break;
        }
    };
    //>>>>end
    ViewHunQice.URL = "ui://jvxpx9emur2m3da";
    return ViewHunQice;
}(UIModalPanel));
__reflect(ViewHunQice.prototype, "ViewHunQice");
