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
var TipZhanJiaSkill = (function (_super) {
    __extends(TipZhanJiaSkill, _super);
    function TipZhanJiaSkill() {
        var _this = _super.call(this) || this;
        _this._condition = false;
        _this._need = false;
        _this.childrenCreated();
        return _this;
    }
    TipZhanJiaSkill.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("wuJiang", "TipZhanJiaSkill").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        _super.prototype.childrenCreated.call(this);
    };
    TipZhanJiaSkill.prototype.onShown = function () {
        this.addListen();
    };
    TipZhanJiaSkill.prototype.onHide = function () {
        this.removeListen();
        GGlobal.layerMgr.close(UIConst.ZHAN_JIA_SKILL);
    };
    TipZhanJiaSkill.prototype.addListen = function () {
        this.btnUp.addClickListener(this.onClickUp, this);
        GGlobal.control.listen(Enum_MsgType.ZHANJIA_UP_SKILL, this.update, this);
    };
    TipZhanJiaSkill.prototype.removeListen = function () {
        this.btnUp.removeClickListener(this.onClickUp, this);
        GGlobal.control.remove(Enum_MsgType.ZHANJIA_UP_SKILL, this.update, this);
    };
    TipZhanJiaSkill.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this._vo = arg;
        this.show();
    };
    TipZhanJiaSkill.prototype.update = function (id) {
        this._vo = Config.clotheslvskill_212[id];
        this.show();
    };
    TipZhanJiaSkill.prototype.show = function () {
        var vo = this._vo;
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_5.png", this.bg);
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + vo.icon + ".png", this.imgIcon);
        this.labName.text = vo.name;
        this.labPower.text = "战斗力：" + vo.power;
        this.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(vo.attr), "+");
        var level = Number(vo.id) % 1000;
        if (level == 0) {
            this.labLevel.text = "";
            this.btnUp.text = "激活";
        }
        else {
            this.labLevel.text = "Lv." + level;
            this.btnUp.text = "升级";
        }
        if (vo.next == 0) {
            this.labNext.text = "";
            this.labAttrNext.text = "";
            this.labNeedName.text = "";
            this.boxNeed.visible = false;
            this.boxMax.visible = true;
            this.btnUp.touchable = this.btnUp.visible = false;
            this.labCondition.text = "";
            this.btnUp.checkNotice = false;
            this.c1.selectedIndex = 1;
        }
        else {
            this.labNext.text = "下级效果";
            var nextVo = Config.clotheslvskill_212[vo.next];
            this.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(nextVo.attr), "+");
            var consume = ConfigHelp.SplitStr(vo.consume);
            this._needItem = VoItem.create(Number(consume[0][1]));
            var count = Model_Bag.getItemCount(Number(consume[0][1]));
            this.labNeedName.text = this._needItem.name;
            this.boxNeed.visible = true;
            this.boxMax.visible = false;
            this.boxNeed.setLb(count, Number(consume[0][2]));
            this.boxNeed.setImgUrl(this._needItem.icon);
            this._need = count >= Number(consume[0][2]);
            var clotheslv = Config.clotheslv_212[vo.lv];
            this.labCondition.text = "升级条件：达到" + clotheslv.jie;
            this.labCondition.color = Model_ZhanJia.jieShu >= vo.lv ? 0x00ff00 : 0xff0000;
            this._condition = Model_ZhanJia.jieShu >= vo.lv;
            this.btnUp.touchable = this.btnUp.visible = true;
            this.btnUp.checkNotice = (this._condition && this._need);
            this.c1.selectedIndex = 0;
        }
        this.btnUp.enabled = this._condition;
    };
    TipZhanJiaSkill.prototype.onClickUp = function () {
        if (!this._condition) {
            ViewCommonWarn.text("未满足升级条件");
            return;
        }
        if (!this._need) {
            View_CaiLiao_GetPanel.show(this._needItem);
            return;
        }
        var index = Model_ZhanJia.skillArr.indexOf(this._vo.id);
        if (index != -1) {
            GGlobal.modelZhanJia.CGJihuoSkill(index + 1);
        }
    };
    return TipZhanJiaSkill;
}(UIModalPanel));
__reflect(TipZhanJiaSkill.prototype, "TipZhanJiaSkill");
