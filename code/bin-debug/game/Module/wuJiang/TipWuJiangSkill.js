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
var TipWuJiangSkill = (function (_super) {
    __extends(TipWuJiangSkill, _super);
    function TipWuJiangSkill() {
        var _this = _super.call(this) || this;
        _this._condition = false;
        _this._need = false;
        _this.childrenCreated();
        return _this;
    }
    TipWuJiangSkill.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("wuJiang", "TipZhanJiaSkill").asCom;
        this.contentPane = this.view;
        this.c1 = this.view.getController("c1");
        this.labTitle = (this.view.getChild("labTitle"));
        this.bg = (this.view.getChild("bg"));
        this.imgIcon = (this.view.getChild("imgIcon"));
        this.labName = (this.view.getChild("labName"));
        this.labLevel = (this.view.getChild("labLevel"));
        this.labPower = (this.view.getChild("labPower"));
        this.labCur = (this.view.getChild("labCur"));
        this.labAttrCur = (this.view.getChild("labAttrCur"));
        this.labNext = (this.view.getChild("labNext"));
        this.labAttrNext = (this.view.getChild("labAttrNext"));
        this.labCondition = (this.view.getChild("labCondition"));
        this.labNeedName = (this.view.getChild("labNeedName"));
        this.btnUp = (this.view.getChild("btnUp"));
        this.boxNeed = (this.view.getChild("boxNeed"));
        this.boxUp = (this.view.getChild("boxUp"));
        this.boxMax = (this.view.getChild("boxMax"));
        _super.prototype.childrenCreated.call(this);
    };
    TipWuJiangSkill.prototype.onShown = function () {
        this.addListen();
    };
    TipWuJiangSkill.prototype.onHide = function () {
        this.removeListen();
        GGlobal.layerMgr.close(UIConst.WU_JIANG_SKILL);
    };
    TipWuJiangSkill.prototype.addListen = function () {
        this.btnUp.addClickListener(this.onClickUp, this);
        GGlobal.control.listen(Enum_MsgType.WUJIANG_UP_SKILL, this.update, this);
    };
    TipWuJiangSkill.prototype.removeListen = function () {
        this.btnUp.removeClickListener(this.onClickUp, this);
        GGlobal.control.remove(Enum_MsgType.WUJIANG_UP_SKILL, this.update, this);
    };
    TipWuJiangSkill.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this._vo = arg;
        this.show();
    };
    TipWuJiangSkill.prototype.update = function (id) {
        this._vo = Config.herolvskill_211[id];
        this.show();
    };
    TipWuJiangSkill.prototype.show = function () {
        var obj = this._vo;
        this.labName.text = obj.name;
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_5.png", this.bg);
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + obj.icon + ".png", this.imgIcon);
        var level = Number(obj.id) % 1000;
        this.labLevel.text = level > 0 ? "Lv." + level : "";
        this.labPower.text = "战力：" + obj.power;
        this.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(obj.attr), "+");
        if (obj.power == 0) {
            this.btnUp.text = "激活";
        }
        else {
            this.btnUp.text = "升级";
        }
        if (obj.next == 0) {
            this.labNext.text = "";
            this.labAttrNext.text = "";
            this.boxUp.visible = this.boxUp.touchable = false;
            this.boxMax.visible = true;
            this.btnUp.checkNotice = false;
            this.c1.selectedIndex = 1;
        }
        else {
            var nextObj = Config.herolvskill_211[obj.next];
            this.labNext.text = "下级效果";
            this.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(nextObj.attr), "+");
            this.boxUp.visible = this.boxUp.touchable = true;
            this.boxMax.visible = false;
            this.labCondition.text = "升级条件：达到" + Config.herolv_211[obj.lv].jie;
            this._condition = true;
            this._need = true;
            if (Model_WuJiang.jieShu >= obj.lv) {
                this.labCondition.color = 0x00ff00;
            }
            else {
                this.labCondition.color = 0xff0000;
                this._condition = false;
            }
            var consumeArr = ConfigHelp.SplitStr(obj.consume);
            this._needItem = VoItem.create(Number(consumeArr[0][1]));
            var hasCont = Model_Bag.getItemCount(Number(consumeArr[0][1]));
            this.boxNeed.setLb(hasCont, Number(consumeArr[0][2]));
            this.boxNeed.setImgUrl(this._needItem.icon);
            if (hasCont < Number(consumeArr[0][2])) {
                this._need = false;
            }
            this.labNeedName.text = this._needItem.name;
            this.btnUp.checkNotice = (this._condition && this._need);
            this.c1.selectedIndex = 0;
        }
    };
    TipWuJiangSkill.prototype.onClickUp = function () {
        if (!this._condition) {
            ViewCommonWarn.text("未满足升级条件");
            return;
        }
        if (!this._need) {
            View_CaiLiao_GetPanel.show(this._needItem);
            return;
        }
        GGlobal.modelWuJiang.CGJihuoSkill(this._vo.wz);
    };
    return TipWuJiangSkill;
}(UIModalPanel));
__reflect(TipWuJiangSkill.prototype, "TipWuJiangSkill");
