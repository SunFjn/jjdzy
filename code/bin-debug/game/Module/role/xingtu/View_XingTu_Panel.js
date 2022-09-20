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
var View_XingTu_Panel = (function (_super) {
    __extends(View_XingTu_Panel, _super);
    function View_XingTu_Panel() {
        var _this = _super.call(this) || this;
        //>>>>end
        _this.iconImgArr = [];
        return _this;
    }
    View_XingTu_Panel.createInstance = function () {
        return (fairygui.UIPackage.createObject("Skill", "View_XingTu_Panel"));
    };
    View_XingTu_Panel.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    View_XingTu_Panel.prototype.openPanel = function (pData) {
        this.open();
    };
    View_XingTu_Panel.prototype.closePanel = function (pData) {
        this.close();
    };
    View_XingTu_Panel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        for (var i = 0; i < 7; i++) {
            var iconImg0 = self["iconImg" + i];
            self.iconImgArr.push(iconImg0);
        }
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandle;
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);
        Model_XingTu.getXingTuArr();
        GGlobal.modelxt.CG_OPEN_XINGTU();
    };
    View_XingTu_Panel.prototype.listHandle = function (event) {
        var a = this;
        var tab = event.itemObject;
        if (a.curItem && a.curItem.vo.type == tab.vo.type)
            return;
        if (a.curItem)
            a.curItem.selected = false;
        tab.selected = true;
        a.curItem = tab;
        a.updateXingTuShow();
    };
    View_XingTu_Panel.prototype.OnGet = function () {
        View_CaiLiao_GetPanel.show(VoItem.create(9));
    };
    View_XingTu_Panel.prototype.upHandle = function () {
        var a = this;
        if (a.upBt.checkNotice) {
            GGlobal.modelxt.CG_XINGTU_UPGRADE(a.curItem.vo.type);
        }
        else {
            var xingtuID = Model_XingTu.xingtuIDArr[a.curItem.vo.type - 1];
            var cfg = Config.xingtu_706[xingtuID];
            if (cfg.next > 0) {
                a.OnGet();
            }
            else {
                ViewCommonWarn.text("已满级");
            }
        }
    };
    View_XingTu_Panel.prototype.renderHandle = function (index, obj) {
        var a = this;
        var tab = obj;
        tab.setVo(Model_XingTu.xingtuArr[index]);
        tab.checkNotice = Model_XingTu.checkTabNotice(tab.vo.type);
        if (!a.curItem && index == 0) {
            tab.selected = true;
            a.curItem = tab;
        }
    };
    View_XingTu_Panel.prototype.updateShow = function () {
        var a = this;
        a.list.numItems = Model_XingTu.xingtuArr.length;
        a.updateXingTuShow();
    };
    View_XingTu_Panel.prototype.updateXingTuShow = function () {
        var a = this;
        if (!a.curItem)
            return;
        var xingtuID = Model_XingTu.xingtuIDArr[a.curItem.vo.type - 1];
        var jie = Math.floor(xingtuID % 100000 / 100);
        var level = xingtuID % 100;
        var cfg = Config.xingtu_706[xingtuID];
        a.levelLb.text = jie + "阶";
        a.powerLb.text = cfg.fight + "";
        var str = a.curItem.vo.lv;
        var arr = str.split(",");
        for (var i = 0; i < a.iconImgArr.length; i++) {
            if (i < level) {
                a.iconImgArr[i].grayed = false;
            }
            else {
                a.iconImgArr[i].grayed = true;
            }
        }
        if (jie <= 0) {
            a.iconImg.grayed = true;
        }
        else {
            a.iconImg.grayed = false;
        }
        IconUtil.setImg(a.iconImg, Enum_Path.IMAGE_URL + "xingtu/icon_" + a.curItem.vo.type + ".png");
        IconUtil.setImg(a.iconLbImg, Enum_Path.IMAGE_URL + "xingtu/icon_title_" + a.curItem.vo.type + ".png");
        if (Model_player.voMine.zsID >= a.curItem.vo.condition) {
            a.jihuoLb.visible = false;
            a.upGroup.visible = true;
            a.maxGroup.visible = false;
            a.btGroup.visible = true;
            var nextcfg = Config.xingtu_706[cfg.next];
            var attstr = "";
            var attstr1 = "";
            if (cfg.attr != "0") {
                var attArr = JSON.parse(cfg.attr);
                if (nextcfg) {
                    var attArr1 = JSON.parse(nextcfg.attr);
                    for (var i = 0; i < attArr.length; i++) {
                        if (i == 0) {
                            attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                            attstr1 += Vo_attr.getShowStr(attArr[i][0], attArr1[i][1]);
                        }
                        else {
                            attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                            attstr1 += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr1[i][1]);
                        }
                    }
                    this.showAtt(cfg);
                }
                else {
                    for (var i = 0; i < attArr.length; i++) {
                        if (i == 0) {
                            attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                            attstr1 += "已满阶";
                        }
                        else {
                            attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                            attstr1 += "\n" + "已满阶";
                        }
                    }
                    a.maxGroup.visible = true;
                    a.btGroup.visible = false;
                }
            }
            else {
                var attArr1 = JSON.parse(nextcfg.attr);
                for (var i = 0; i < attArr1.length; i++) {
                    if (i == 0) {
                        attstr += Vo_attr.getShowStr(attArr1[i][0], 0);
                        attstr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    }
                    else {
                        attstr += "\n" + Vo_attr.getShowStr(attArr1[i][0], 0);
                        attstr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    }
                }
                this.showAtt(cfg);
            }
            a.curAtt.text = attstr;
            a.nextAtt.text = attstr1;
        }
        else {
            a.powerLb.text = "0";
            a.upGroup.visible = false;
            a.jihuoLb.text = Config.zhuansheng_705[a.curItem.vo.condition].lv + "激活";
            a.jihuoLb.visible = true;
        }
    };
    View_XingTu_Panel.prototype.showAtt = function (cfg) {
        var a = this;
        var costArr = JSON.parse(cfg.need);
        a.labCount.setImgUrl(costArr[0][0]);
        if (Model_player.voMine.xinghun >= costArr[0][2]) {
            a.upBt.checkNotice = true;
            a.labCount.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(Model_player.voMine.xinghun) + "/" + ConfigHelp.numToStr(costArr[0][2]), Color.getColorStr(1)));
        }
        else {
            a.upBt.checkNotice = false;
            a.labCount.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(Model_player.voMine.xinghun) + "/" + ConfigHelp.numToStr(costArr[0][2]), Color.getColorStr(6)));
        }
    };
    View_XingTu_Panel.prototype.open = function () {
        var a = this;
        a.updateShow();
        a.upBt.addClickListener(a.upHandle, a);
        GGlobal.reddot.listen(ReddotEvent.CHECK_XINGTU, a.updateShow, a);
    };
    View_XingTu_Panel.prototype.close = function () {
        var a = this;
        if (a.curItem) {
            a.curItem.selected = false;
            a.curItem = null;
        }
        IconUtil.setImg(a.iconImg, null);
        IconUtil.setImg(a.iconLbImg, null);
        a.upBt.removeClickListener(a.upHandle, a);
        GGlobal.reddot.remove(ReddotEvent.CHECK_XINGTU, a.updateShow, a);
        a.list.numItems = 0;
    };
    View_XingTu_Panel.URL = "ui://c7onhgk8t2re7";
    return View_XingTu_Panel;
}(fairygui.GComponent));
__reflect(View_XingTu_Panel.prototype, "View_XingTu_Panel", ["IPanel"]);
