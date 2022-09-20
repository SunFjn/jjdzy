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
var View_SanGuoYT_Panel = (function (_super) {
    __extends(View_SanGuoYT_Panel, _super);
    function View_SanGuoYT_Panel() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        _this.setSkin("sanGuoYiTong", "sanGuoYiTong_atlas0", "View_SanGuoYT_Panel");
        return _this;
    }
    View_SanGuoYT_Panel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(View_SanGuoYT_ButtomUI.URL, View_SanGuoYT_ButtomUI);
    };
    View_SanGuoYT_Panel.prototype.childrenCreated = function () {
        var self = this;
        _super.prototype.childrenCreated.call(this);
        self.gridArr = [self.grid0, self.grid1, self.grid2, self.grid3, self.grid4];
        self.bt0.addClickListener(self.clickHandler, self);
        self.bt1.addClickListener(self.clickHandler, self);
        self.bt1.addClickListener(self.clickHandler, self);
        self.bt1.addClickListener(self.clickHandler, self);
        self.battleBt.addClickListener(self.clickHandler, self);
    };
    View_SanGuoYT_Panel.prototype.clickHandler = function (evt) {
        var self = this;
        var bt = evt.target;
        switch (bt.hashCode) {
            case self.bt0.hashCode:
                GGlobal.layerMgr.open(UIConst.SANGUO_YITONG_ZLP);
                break;
            case self.bt1.hashCode:
                break;
            case self.bt2.hashCode:
                break;
            case self.bt3.hashCode:
                break;
            case self.battleBt.hashCode:
                GGlobal.modelSanGuoYT.CG_ENTER_SCENE_5801();
                break;
        }
    };
    View_SanGuoYT_Panel.prototype.updateShow = function () {
        var self = this;
        var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[6303].other));
        for (var i = 0; i < self.gridArr.length; i++) {
            var grid = self.gridArr[i];
            grid.isShowEff = true;
            grid.tipEnabled = true;
            grid.vo = rewardArr[i];
        }
        self.roleGroup.visible = false;
        var model = GGlobal.modelSanGuoYT;
        if (model.roleData.id > 0) {
            if (!self.awatar) {
                self.awatar = UIRole.create();
                self.awatar.setPos(270, 250);
            }
            var fashioncfg = Config.sz_739[model.roleData.fashion];
            if (fashioncfg) {
                self.awatar.setBody(fashioncfg.moxing);
                self.awatar.setWeapon(fashioncfg.moxing);
            }
            else {
                self.awatar.setBody(model.roleData.fashion);
                self.awatar.setWeapon(model.roleData.fashion);
            }
            self.awatar.uiparent = self.displayListContainer;
            self.awatar.onAdd();
        }
        else {
            self.roleGroup.visible = true;
            if (self.awatar) {
                self.awatar.onRemove();
                self.awatar = null;
            }
        }
        self.battleBt.visible = model.state == 1;
        self.timeLb.visible = model.state != 1;
    };
    View_SanGuoYT_Panel.prototype.onShown = function () {
        var self = this;
        IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "sgyt.png");
        self.updateShow();
        GGlobal.modelSanGuoYT.CG_OPENUI_5819();
    };
    View_SanGuoYT_Panel.prototype.addListen = function () {
        var self = this;
        GGlobal.reddot.listen(UIConst.SANGUO_YITONG, self.updateShow, self);
    };
    View_SanGuoYT_Panel.prototype.removeListen = function () {
        var self = this;
        GGlobal.reddot.remove(UIConst.SANGUO_YITONG, self.updateShow, self);
    };
    View_SanGuoYT_Panel.prototype.onHide = function () {
        var self = this;
        IconUtil.setImg(self.backImg, null);
        ConfigHelp.cleanGridEff(self.gridArr);
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        GGlobal.layerMgr.close(UIConst.SANGUO_YITONG);
    };
    View_SanGuoYT_Panel.URL = "ui://z4ijxlqktdwd2";
    return View_SanGuoYT_Panel;
}(UIPanelBase));
__reflect(View_SanGuoYT_Panel.prototype, "View_SanGuoYT_Panel");
