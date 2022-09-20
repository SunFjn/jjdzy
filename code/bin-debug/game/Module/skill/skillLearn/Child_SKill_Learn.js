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
var Child_SKill_Learn = (function (_super) {
    __extends(Child_SKill_Learn, _super);
    function Child_SKill_Learn() {
        var _this = _super.call(this) || this;
        //>>>>end
        _this.itemArr = [];
        /**1已满级 2技能等级超过角色等级3铜币不足*/
        _this.skillRet = 0;
        return _this;
    }
    Child_SKill_Learn.createInstance = function () {
        return (fairygui.UIPackage.createObject("Skill", "Child_SKill_Learn"));
    };
    Child_SKill_Learn.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_SKill_Learn.prototype.openPanel = function (pData) {
        this.open();
    };
    Child_SKill_Learn.prototype.closePanel = function (pData) {
        this.close();
    };
    Child_SKill_Learn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        for (var i = 0; i < 3; i++) {
            var item = (a.getChild("item" + i));
            item.data = i;
            a.itemArr.push(item);
            item.addClickListener(a.itemHandle, this);
        }
        a.itemArr[0].choose = true;
        a.curItem = a.itemArr[0];
    };
    Child_SKill_Learn.prototype.itemHandle = function (event) {
        var a = this;
        var item = event.target;
        if (item == a.curItem || item.vo.level <= 0) {
            if (item.vo.level <= 0) {
                ViewCommonWarn.text("第" + Config.skillstart_210[item.data + 1].start + "关开启");
            }
            return;
        }
        if (a.curItem)
            a.curItem.choose = false;
        item.choose = true;
        a.curItem = item;
    };
    Child_SKill_Learn.prototype.keyHandle = function () {
        var arr = ["", "已满级", "技能等级不能超过角色等级", "铜币不足"];
        var a = this;
        if (a.skillRet == 3) {
            View_CaiLiao_GetPanel.show(VoItem.create(Enum_Attr.TONGBI));
        }
        else if (a.skillRet) {
            ViewCommonWarn.text(arr[a.skillRet]);
        }
        else if (a.keyBt.checkNotice) {
            GGlobal.modelSkill.CG_KEYUPGRADE_SKILL();
        }
    };
    Child_SKill_Learn.prototype.updateShow = function () {
        var a = this;
        var power = 0;
        a.skillRet = 0;
        var checkNotice = false;
        var arr = Model_player.voMine.skillList;
        var len = a.itemArr.length;
        var cfgids = JSON.parse(Config.hero_211[Model_player.voMine.job].attack);
        for (var i = 0; i < len; i++) {
            var vo = void 0;
            vo = arr[i + cfgids.length];
            var item = a.itemArr[i];
            item.vo = vo;
            if (vo.level > 0) {
                power += vo.skill_power;
            }
            if (item.checkNotice) {
                checkNotice = true;
            }
            if (item.ret > a.skillRet) {
                a.skillRet = item.ret;
            }
        }
        if (checkNotice)
            a.skillRet = 0;
        a.powerLb.text = power + "";
        a.keyBt.checkNotice = checkNotice;
    };
    Child_SKill_Learn.prototype.open = function () {
        this.updateShow();
        GGlobal.reddot.listen(ReddotEvent.CHECK_SKILL, this.updateShow, this);
        this.keyBt.addClickListener(this.keyHandle, this);
    };
    Child_SKill_Learn.prototype.close = function () {
        GGlobal.reddot.remove(ReddotEvent.CHECK_SKILL, this.updateShow, this);
        this.keyBt.removeClickListener(this.keyHandle, this);
    };
    Child_SKill_Learn.URL = "ui://c7onhgk8c14zm";
    return Child_SKill_Learn;
}(fairygui.GComponent));
__reflect(Child_SKill_Learn.prototype, "Child_SKill_Learn", ["IPanel"]);
