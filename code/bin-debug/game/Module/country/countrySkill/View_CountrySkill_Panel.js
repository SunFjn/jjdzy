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
var View_CountrySkill_Panel = (function (_super) {
    __extends(View_CountrySkill_Panel, _super);
    function View_CountrySkill_Panel() {
        var _this = _super.call(this) || this;
        _this._first = true;
        _this._curpage = 0;
        _this.setSkin("country", "country_atlas0", "View_CountrySkill_Panel");
        return _this;
    }
    View_CountrySkill_Panel.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "View_CountrySkill_Panel"));
    };
    View_CountrySkill_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ViewCouSkillItem.URL, ViewCouSkillItem);
    };
    View_CountrySkill_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHander;
        this.list.setVirtual();
        this.lbShuoMing.text = HtmlUtil.createLink("玩法说明");
        this.vres.setImgUrl(Enum_Attr.PRESTIGE);
    };
    View_CountrySkill_Panel.prototype.onShown = function () {
        this.addListen();
        this.updateView();
        GGlobal.modelCouSkill.CG_OPENUI();
    };
    View_CountrySkill_Panel.prototype.onHide = function () {
        this.removeListen();
        this.list.numItems = 0;
        this._curpage = 0;
        GGlobal.layerMgr.close(UIConst.COUNTRY_SKILL);
    };
    View_CountrySkill_Panel.prototype.addListen = function () {
        this.btnGet.addClickListener(this.onClickGet, this);
        this.lbShuoMing.addEventListener(egret.TextEvent.LINK, this.openShuoM, this);
        this.list.addEventListener(fairygui.ItemEvent.CLICK, this.listHander, this);
        this.btnLeft.addClickListener(this.pageHandler, this);
        this.btnRight.addClickListener(this.pageHandler, this);
        GGlobal.control.listen(Enum_MsgType.COUNTRY_SKILL_OPEN_UI, this.updateView, this);
        GGlobal.control.listen(Enum_MsgType.COUNTRY_SKILL_UP, this.upLevel, this);
        this.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
    };
    View_CountrySkill_Panel.prototype.removeListen = function () {
        this.btnGet.removeClickListener(this.onClickGet, this);
        this.lbShuoMing.removeEventListener(egret.TextEvent.LINK, this.openShuoM, this);
        this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.listHander, this);
        this.btnLeft.removeClickListener(this.pageHandler, this);
        this.btnRight.removeClickListener(this.pageHandler, this);
        GGlobal.control.remove(Enum_MsgType.COUNTRY_SKILL_OPEN_UI, this.updateView, this);
        GGlobal.control.remove(Enum_MsgType.COUNTRY_SKILL_UP, this.upLevel, this);
        this.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
    };
    View_CountrySkill_Panel.prototype.updateView = function () {
        if (Model_player.voMine.country == 0)
            return;
        if (GGlobal.modelCouSkill.status == 1) {
            this.labName.text = "虚位以待";
            this.viewHead.setdata(null);
        }
        else {
            this.labName.text = Model_Country.kingName ? Model_Country.kingName : "虚位以待";
            if (Model_Country.kingName) {
                this.viewHead.setdata(Model_Country.kingHead, Model_Country.kingLv, "", -1, false, Model_Country.kingFrame);
            }
            else {
                this.viewHead.setdata(null);
            }
        }
        var titleArr = JSON.parse(Config.xtcs_004[1067].other);
        var cfgCH = Config.chenghao_702[titleArr[Model_player.voMine.country - 1][0]];
        ImageLoader.instance.loader(Enum_Path.TITLE_URL + cfgCH.picture + ".png", this.imgTitle);
        var model = GGlobal.modelCouSkill;
        this._skillArr = model.skillArr;
        this.list.numItems = this._skillArr.length;
        if (this._skillArr.length > 0) {
            this._selVo = this._skillArr[0];
            this.list.scrollToView(0);
            this.list.selectedIndex = 0;
        }
        else {
            this._selVo = null;
        }
        this.upSelVo();
        this.upPower();
        this.setNotice();
    };
    View_CountrySkill_Panel.prototype.upLevel = function () {
        var model = GGlobal.modelCouSkill;
        this._skillArr = model.skillArr;
        this.list.numItems = this._skillArr.length;
        if (this._selVo) {
            var wz = this._selVo.cfg.wz;
            this._selVo = this._skillArr[wz - 1];
        }
        this.upSelVo();
        this.upPower();
    };
    View_CountrySkill_Panel.prototype.upPower = function () {
        var total = 0;
        for (var i = 0; i < this._skillArr.length; i++) {
            var v = this._skillArr[i];
            total += v.cfg.power;
        }
        this.lbPower.text = total + "";
    };
    View_CountrySkill_Panel.prototype.onClickGet = function () {
        if (this._selVo == null)
            return;
        if (!this._red1) {
            ViewCommonWarn.text("未达到条件");
            return;
        }
        if (!this._red2) {
            ViewCommonWarn.text("国家声望不足");
            return;
        }
        GGlobal.modelCouSkill.CG_JIHUO_OR_UPLV(this._selVo.skillId);
    };
    View_CountrySkill_Panel.prototype.renderHander = function (index, obj) {
        var gird = obj;
        gird.vo = this._skillArr[index];
    };
    View_CountrySkill_Panel.prototype.openShuoM = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.COUNTRY_SKILL);
    };
    View_CountrySkill_Panel.prototype.listHander = function (e) {
        var gird = e.itemObject;
        this._selVo = gird.vo;
        this.upSelVo();
    };
    View_CountrySkill_Panel.prototype.upSelVo = function () {
        var model = GGlobal.modelCouSkill;
        if (!model.canUpSkill()) {
            this.c1.selectedIndex = 0;
            this.vres.setCount(GGlobal.modelCouSkill.shengwang);
            this.vres.color = Color.WHITEINT;
            return;
        }
        if (!this._selVo) {
            this.c1.selectedIndex = 1;
            this.lbCondition.text = "";
            this.btnGet.text = "升级";
            this.btnGet.checkNotice = false;
            this.vres.setCount(0);
            return;
        }
        if (this._selVo.cfg.next == 0) {
            this.c1.selectedIndex = 2;
        }
        else {
            this.c1.selectedIndex = 1;
            var red1 = false;
            if (this._selVo.cfg.tj > 0) {
                var total = 0;
                for (var i = 0; i < this._skillArr.length; i++) {
                    var v = this._skillArr[i];
                    total += (v.skillId % 1000);
                }
                this.lbCondition.text = "升级条件：技能总等级到达" + total + "/" + this._selVo.cfg.tj + "级";
                this.lbCondition.color = total >= this._selVo.cfg.tj ? Color.GREENINT : Color.REDINT;
                red1 = total >= this._selVo.cfg.tj;
            }
            else {
                this.lbCondition.text = "";
                red1 = true;
            }
            var consume = JSON.parse(this._selVo.cfg.consume);
            this.vres.setLb(GGlobal.modelCouSkill.shengwang, Number(consume[0][2]));
            var red2 = GGlobal.modelCouSkill.shengwang >= Number(consume[0][2]);
            if ((this._selVo.skillId % 1000) == 0) {
                this.btnGet.text = "激活";
            }
            else {
                this.btnGet.text = "升级";
            }
            this._red1 = red1;
            this._red2 = red2;
            this.btnGet.checkNotice = (red1 && red2);
        }
    };
    View_CountrySkill_Panel.prototype.pageHandler = function (event) {
        var btn = event.target;
        var curpage = this.list.getFirstChildInView();
        switch (btn.id) {
            case this.btnLeft.id:
                if (curpage > 0) {
                    curpage = curpage - 3;
                    if (curpage < 0)
                        curpage = 0;
                }
                break;
            case this.btnRight.id:
                if (curpage < this.list.numItems - 1) {
                    curpage = curpage + 3;
                    if (curpage >= this.list.numItems - 1)
                        curpage = this.list.numItems - 1;
                }
                break;
        }
        this._curpage = curpage;
        if (this.list.numItems > 0)
            this.list.scrollToView(curpage, true, true);
        this.setNotice();
    };
    View_CountrySkill_Panel.prototype.setNotice = function () {
        this.btnRight.checkNotice = false;
        this.btnLeft.checkNotice = false;
        for (var i = 0; i < this._skillArr.length; i++) {
            var id = this._skillArr[i].skillId;
            var red = GGlobal.modelCouSkill.checkRedVo(id);
            if (red && i > this._curpage + 2) {
                this.btnRight.checkNotice = true;
            }
            if (red && i < this._curpage) {
                this.btnLeft.checkNotice = true;
            }
        }
    };
    View_CountrySkill_Panel.prototype.scrollComp = function () {
        var curpage = this.list.getFirstChildInView();
        this._curpage = curpage;
        this.setNotice();
    };
    View_CountrySkill_Panel.URL = "ui://uwzc58njdr4r6c";
    return View_CountrySkill_Panel;
}(UIPanelBase));
__reflect(View_CountrySkill_Panel.prototype, "View_CountrySkill_Panel");
