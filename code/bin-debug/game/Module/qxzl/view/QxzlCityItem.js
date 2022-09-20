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
 * @author: lujiahao
 * @date: 2019-09-26 10:18:06
 */
var QxzlCityItem = (function (_super) {
    __extends(QxzlCityItem, _super);
    function QxzlCityItem() {
        var _this = _super.call(this) || this;
        _this.cityId = 0;
        return _this;
    }
    QxzlCityItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "QxzlCityItem"));
    };
    QxzlCityItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    QxzlCityItem.prototype.itniData = function () {
        this.curVo = GGlobal.modelQxzl.getCityVoById(~~this.data);
        this.cityId = this.curVo.id;
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + "18" + ".png", this.imageIcon);
        this.tfNeed.text = GGlobal.modelQxzl.moveNeedStamina + "";
    };
    QxzlCityItem.prototype.refreshData = function () {
        var t = this;
        if (t.curVo) {
            t.registerEvent(true);
            t.tfCityName.text = t.curVo.cfg.name;
            t.tfId.text = t.curVo.id + "";
            t.tfCount.text = t.curVo.guardCount + "";
            t.countryCtrl.selectedIndex = t.curVo.countryId;
            t.btnGo.visible = false;
            t.imgArrow.visible = false;
            t.groupNeed.visible = false;
            t.btnAttack.visible = false;
            if (t.curVo.isDouble) {
                t.showDoubleEffect(true);
            }
            else {
                t.showDoubleEffect(false);
            }
            if (t.curVo.isMyPosCity) {
                if (GGlobal.modelQxzl.isInCity) {
                    t.imgArrow.visible = true;
                }
                else {
                    if (t.curVo.isMyCountryCity || t.curVo.countryId == 0) {
                        t.btnAttack.title = "驻守城池";
                    }
                    else {
                        t.btnAttack.title = "攻打城池";
                    }
                    if (t.curVo.isMainCity && !t.curVo.isMyCountryCity) {
                        //非自己的主城不显示
                    }
                    else {
                        t.btnAttack.visible = true;
                    }
                }
            }
            else {
                if (t.curVo.isPosNear)
                    t.groupNeed.visible = t.btnGo.visible = true;
            }
        }
        else {
        }
    };
    /** 隐藏移动的按钮，在角色移动时候调用 */
    QxzlCityItem.prototype.hideBtnGo = function () {
        if (this.btnGo.visible)
            this.groupNeed.visible = this.btnGo.visible = false;
        if (this.btnAttack.visible)
            this.btnAttack.visible = false;
    };
    QxzlCityItem.prototype.showDoubleEffect = function (pFlag) {
        var t = this;
        if (pFlag) {
            if (!t._effDouble) {
                t._effDouble = EffectMgr.addEff("uieff/10056", t.displayListContainer, t.width / 2, t.height / 2, 1000, -1);
            }
        }
        else {
            if (t._effDouble) {
                EffectMgr.instance.removeEff(t._effDouble);
                t._effDouble = null;
            }
        }
    };
    QxzlCityItem.prototype.clean = function () {
        this.registerEvent(false);
        this.showDoubleEffect(false);
    };
    QxzlCityItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    QxzlCityItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCheck, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnAttack, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.imageIcon, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    QxzlCityItem.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnGo:
                //移动
                if (GGlobal.modelQxzl.isInCity) {
                    ViewAlert.show("您当前处于驻守状态，移动会退出驻守状态\n是否执行移动操作？", Handler.create(t, t.onMoveSure));
                }
                else {
                    GGlobal.modelQxzl.CG_QunXiongZhuLu_move_8967(t.cityId);
                }
                break;
            case t.btnCheck: //查看城池信息
            case t.btnAttack://驻守/攻击
                GGlobal.layerMgr.open(UIConst.QXZL_CITY_INFO, { "cityId": t.cityId });
                break;
            case t.imageIcon:
                FastAPI.showItemTips(18);
                break;
        }
    };
    QxzlCityItem.prototype.onMoveSure = function () {
        GGlobal.modelQxzl.CG_QunXiongZhuLu_move_8967(this.cityId);
    };
    //>>>>end
    QxzlCityItem.URL = "ui://6d8dzzdgems47";
    return QxzlCityItem;
}(fairygui.GLabel));
__reflect(QxzlCityItem.prototype, "QxzlCityItem");
