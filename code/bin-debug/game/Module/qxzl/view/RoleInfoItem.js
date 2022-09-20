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
 * @date: 2019-09-29 11:53:48
 */
var RoleInfoItem = (function (_super) {
    __extends(RoleInfoItem, _super);
    function RoleInfoItem() {
        var _this = _super.call(this) || this;
        _this._posIndex = 0;
        _this._cityId = 0;
        _this.awatar = null;
        return _this;
    }
    RoleInfoItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "RoleInfoItem"));
    };
    RoleInfoItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.pbHp.titleType = fairygui.ProgressTitleType.ValueAndMax;
    };
    //=========================================== API ==========================================
    /**
     * 设置数据
     * @param pIndex 位置索引
     * @param pData 玩家数据
     */
    RoleInfoItem.prototype.setData = function (pIndex, pData, pCityId) {
        var t = this;
        t._curVo = pData;
        t._posIndex = pIndex;
        t._cityId = pCityId;
        t.imageAdd.visible = false;
        t.tfLimit.visible = false;
        var t_myCountry = GGlobal.modelQxzl.myCountry;
        var t_cityVo = GGlobal.modelQxzl.getCityVoById(pCityId);
        if (t_cityVo) {
            if (!pData) {
                if (t_cityVo.countryId == t_myCountry || (t_cityVo.countryId == 0 && t_cityVo.isEmpty)) {
                    t.imageAdd.visible = true;
                    t.tfLimit.visible = true;
                    t.tfLimit.text = ConfigHelp.reTxt("体力≥{0}可驻守", t_cityVo.cfg.tl);
                }
            }
        }
        if (t._curVo) {
            t.stateCtrl.selectedIndex = 1;
            t.pbHp.value = t._curVo.stamina;
            t.pbHp.max = t._curVo.maxStamina;
            t.countryCtrl.selectedIndex = t._curVo.country;
            t.tfName.text = t._curVo.name;
            t.tfPower.text = "战力：" + t._curVo.power;
            t.showModel(true);
        }
        else {
            //空数据也有意义
            t.stateCtrl.selectedIndex = 0;
            t.countryCtrl.selectedIndex = 0;
            t.showModel(false);
        }
        t.registerEvent(true);
    };
    RoleInfoItem.prototype.clean = function () {
        this.registerEvent(false);
        this.showModel(false);
        _super.prototype.clean.call(this);
    };
    RoleInfoItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    RoleInfoItem.prototype.showModel = function (pFlag) {
        var t = this;
        if (t.awatar) {
            t.awatar.onRemove();
            t.awatar = null;
        }
        if (pFlag && this._curVo) {
            if (!t.awatar) {
                t.awatar = UIRole.create();
                // t.awatar.setScaleXY(1, 1);
            }
            var fscfg = Config.sz_739[t._curVo.job];
            var moxing = 0;
            if (fscfg) {
                moxing = fscfg.moxing;
                t.awatar.setBody(moxing);
                t.awatar.setWeapon(t._curVo.job);
            }
            else {
                moxing = t._curVo.job;
                t.awatar.setBody(moxing);
                t.awatar.setWeapon(moxing);
            }
            t.awatar.setGodWeapon(t._curVo.weapon);
            t.awatar.setHorseId(t._curVo.horseId);
            if (t._curVo.horseId) {
                t.awatar.setScaleXY(0.6, 0.6);
            }
            else {
                t.awatar.setScaleXY(1, 1);
            }
            t.awatar.setPos(0, 0);
            t.awatar.setAction(0);
            t.awatar.uiparent = t.role.displayListContainer;
            t.awatar.onAdd();
        }
    };
    RoleInfoItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.clickBg, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    };
    //======================================== handler =========================================
    RoleInfoItem.prototype.onClick = function (e) {
        var t = this;
        GGlobal.modelQxzl.CG_QunXiongZhuLu_attack_8971(t._cityId, t._posIndex);
    };
    //>>>>end
    RoleInfoItem.URL = "ui://6d8dzzdgfmjxx";
    return RoleInfoItem;
}(fairygui.GComponent));
__reflect(RoleInfoItem.prototype, "RoleInfoItem");
