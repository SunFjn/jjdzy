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
var ItemZJYW = (function (_super) {
    __extends(ItemZJYW, _super);
    function ItemZJYW() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemZJYW.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemZJYW.prototype.setData = function (value) {
        this._data = value;
        if (value && value.id) {
            this.container.setUIRole(value.id);
            this.txtName.text = Config.hero_211[value.id].name;
            var tempCfg = Config.hero_211[value.id];
            this.txtName.color = Color.getColorInt(Model_WuJiang.getHeroQuality(tempCfg));
            this.iconNoAct.visible = value.state == 0;
            this.visible = true;
        }
        else {
            this.visible = false;
        }
    };
    ItemZJYW.prototype.getData = function () {
        return this._data;
    };
    ItemZJYW.prototype.clean = function () {
        this.container.setUIRole(null);
    };
    ItemZJYW.prototype.selSel = function (value) {
        this.iconSel.visible = value;
    };
    ItemZJYW.prototype.playSkill = function (skillId) {
        var awatar = this.container.getUIRole();
        if (awatar) {
            awatar.playSkillID(skillId, false);
        }
    };
    ItemZJYW.URL = "ui://7a366usafxp31";
    return ItemZJYW;
}(fairygui.GComponent));
__reflect(ItemZJYW.prototype, "ItemZJYW");
