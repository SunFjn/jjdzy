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
var View_TuJian_Panel = (function (_super) {
    __extends(View_TuJian_Panel, _super);
    function View_TuJian_Panel() {
        var _this = _super.call(this) || this;
        _this.tabArr = [];
        _this.listArr = [];
        _this.setSkin("TuJian", "TuJian_atlas0", "View_TuJian_Panel");
        return _this;
    }
    View_TuJian_Panel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(TuJianItem.URL, TuJianItem);
        f.setPackageItemExtension(TuJianListItem.URL, TuJianListItem);
        f.setPackageItemExtension(View_TuJianUp_Panel.URL, View_TuJianUp_Panel);
        f.setPackageItemExtension(TuJianUpStarItem.URL, TuJianUpStarItem);
    };
    View_TuJian_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        for (var i = 0; i < 4; i++) {
            var tab = this["tab" + i];
            s.tabArr.push(tab);
        }
        s.list.callbackThisObj = this;
        s.list.itemRenderer = s.renderHandle;
        s.list.setVirtual();
        s.list.addEventListener(fairygui.ItemEvent.CLICK, s.listHandle, this);
        s.suitBt.addClickListener(s.suitHandle, this);
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.OnChange, this);
        GGlobal.modelTuJian.CG_OPEN_TUJIAN();
    };
    View_TuJian_Panel.prototype.OnChange = function () {
        var s = this;
        s.list.numItems = 0;
        if (s.curSelItem)
            s.curSelItem.setChoose(false);
        s.curSelItem = null;
        s.curSelVo = null;
        s.updateShow();
    };
    View_TuJian_Panel.prototype.suitHandle = function () {
        GGlobal.layerMgr.open(UIConst.TUJIAN_SUIT, Model_TuJian.suitVoArr[this.c1.selectedIndex]);
    };
    View_TuJian_Panel.prototype.listHandle = function (event) {
        var s = this;
        var item = event.itemObject;
        if (s.curSelVo && s.curSelVo.ID == item.vo.ID)
            return;
        if (s.curSelItem)
            s.curSelItem.setChoose(false);
        s.curSelVo = null;
        item.setChoose(true);
        s.curSelItem = item;
        s.curSelVo = item.vo;
        s.updateItem();
    };
    View_TuJian_Panel.prototype.updateItem = function () {
        var s = this;
        if (!s.curSelVo)
            return;
        s.item.onShown(s.curSelVo);
    };
    View_TuJian_Panel.prototype.renderHandle = function (index, obj) {
        var s = this;
        var item = obj;
        item.setVo(s.listArr[index]);
        if (Model_GlobalMsg.selectID > 0 && Model_GlobalMsg.selectID == item.vo.ID) {
            if (s.curSelItem)
                s.curSelItem.setChoose(false);
            s.curSelVo = item.vo;
            item.setChoose(true);
            s.curSelItem = item;
            s.item.onShown(s.curSelVo);
            Model_GlobalMsg.selectID = 0;
        }
        else if (!s.curSelVo && index == 0) {
            s.curSelVo = item.vo;
            item.setChoose(true);
            s.curSelItem = item;
            s.item.onShown(s.curSelVo);
        }
        else if (s.curSelVo && s.curSelVo.ID == item.vo.ID) {
            s.curSelVo = item.vo;
            item.setChoose(true);
            s.curSelItem = item;
            s.item.onShown(s.curSelVo);
        }
        else {
            item.setChoose(false);
        }
    };
    View_TuJian_Panel.prototype.updateShow = function () {
        var s = this;
        for (var i = 0; i < 4; i++) {
            if (i == 0) {
                s.tabArr[i].checkNotice = Model_TuJian.checkTabNotice(i);
            }
            else {
                s.tabArr[i].checkNotice = GGlobal.reddot.checkCondition(UIConst.TUJIAN, i);
            }
        }
        s.listArr = Model_TuJian.tuJianArr[s.c1.selectedIndex];
        s.list.numItems = s.listArr.length;
        if (!s.curSelVo) {
            s.curSelVo = s.listArr[0];
        }
        else {
            for (var i = 0; i < s.listArr.length; i++) {
                if (s.curSelVo.ID == s.listArr[i].ID) {
                    s.curSelVo = s.listArr[i];
                    break;
                }
            }
        }
        if (s.curSelVo)
            s.item.onShown(s.curSelVo);
        var vo = Model_TuJian.suitVoArr[s.c1.selectedIndex];
        vo.tujianLv = Model_TuJian.getTuJianLv(s.c1.selectedIndex);
        var nextcfg;
        var attArr;
        if (vo.suitNext > 0) {
            nextcfg = Config.picteam_005[vo.suitNext];
            if (vo.tujianLv >= nextcfg.need) {
                s.noticeImg.visible = true;
            }
            else {
                s.noticeImg.visible = false;
            }
        }
        else {
            s.noticeImg.visible = false;
        }
        attArr = vo.suitAttArr;
        s.powerLb.text = (vo.suitPower + Model_TuJian.getTuJianPower(s.c1.selectedIndex)) + "";
        var len = attArr.length;
        var attstr = "";
        for (var i = 0; i < len; i++) {
            if (i == 0) {
                attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
            }
            else {
                attstr += "    " + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
            }
        }
        s.suitLvLb.text = vo.suitLv + "级";
    };
    View_TuJian_Panel.prototype.onShown = function () {
        var s = this;
        if (Model_GlobalMsg.selectID > 0 && Config.picture_005[Model_GlobalMsg.selectID]) {
            var cfg = Config.picture_005[Model_GlobalMsg.selectID];
            if (s.c1.selectedIndex == cfg.type - 1) {
                s.updateShow();
            }
            else {
                s.c1.selectedIndex = cfg.type - 1;
            }
        }
        else {
            if (s.c1.selectedIndex == 0) {
                s.updateShow();
            }
            else {
                s.c1.selectedIndex = 0;
            }
        }
        GGlobal.reddot.listen(ReddotEvent.CHECK_TUJIAN, s.updateShow, s);
    };
    View_TuJian_Panel.prototype.onHide = function () {
        var self = this;
        if (self.curSelItem)
            self.curSelItem.setChoose(false);
        self.curSelItem = null;
        self.curSelVo = null;
        self.item.onHide();
        self.list.numItems = 0;
        Model_GlobalMsg.selectID = 0;
        GGlobal.layerMgr.close(UIConst.TUJIAN);
        GGlobal.reddot.remove(ReddotEvent.CHECK_TUJIAN, self.updateShow, self);
    };
    View_TuJian_Panel.URL = "ui://m0rbmsgsrcvu24";
    return View_TuJian_Panel;
}(UIPanelBase));
__reflect(View_TuJian_Panel.prototype, "View_TuJian_Panel");
