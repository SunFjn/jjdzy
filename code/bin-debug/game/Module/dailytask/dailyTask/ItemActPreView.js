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
var ItemActPreView = (function (_super) {
    __extends(ItemActPreView, _super);
    function ItemActPreView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.grids = []; //70 72
        return _this;
    }
    ItemActPreView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.iconMask.visible = false;
        self.btnHand.addClickListener(self.onHand, self);
        self.txtLink.displayObject.touchEnabled = true;
        self.txtLink.displayObject.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHand, this);
        self.txtLink.text = HtmlUtil.createLink("玩法说明");
    };
    ItemActPreView.prototype.onHand = function (evt) {
        var self = this;
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        var tar = evt.currentTarget;
        var cfg1 = self.getData();
        switch (tar) {
            case self.btnHand:
                var sysId = cfg1.open;
                if (sysId == UIConst.COUNTRY_KINGSHIP && Model_player.voMine.country <= 0) {
                    ViewCommonWarn.text("请先加入国家");
                    return;
                }
                else if (ModuleManager.isOpen(sysId, true)) {
                    if (sysId == UIConst.ACTIVITYHALL) {
                        var cfg = Config.hddt_200[cfg1.sysid];
                        if (cfg)
                            GGlobal.layerMgr.open(sysId, cfg.fenlei - 1);
                    }
                    else {
                        GGlobal.layerMgr.open(sysId);
                    }
                }
                break;
            default:
                GGlobal.layerMgr.open(UIConst.WFSM_PANEL, cfg1.sysid);
                break;
        }
    };
    ItemActPreView.prototype.setData = function (value) {
        var self = this;
        self._data = value;
        // self.iconImp.visible = value.zy;
        self.iconKuaFu.visible = value.kf;
        self.iconImp.visible = value.zy;
        self.iconKuaFu.x = value.zy ? 258 : 197;
        // self.txtName.text = value.name;
        IconUtil.setImg(self.txtName, Enum_Path.PIC_URL + value.sysid + "a.png");
        ConfigHelp.cleanGridview(self.grids);
        var awards = ConfigHelp.makeItemListArr(JSON.parse(value.tips));
        self.grids = ConfigHelp.addGridview(awards, self.emptyCon, 0, 0, true, false, 5, 110);
        IconUtil.setImg(self.bg, "resource/image/actpreview/" + value.sysid + ".png");
        var kaiQiSt = ModelActPreView.getState(this.getData());
        switch (kaiQiSt) {
            case 0://活动结束
                self.iconMask.visible = true;
                self.txtActTime.visible = true;
                self.txtActTime.text = "" + value.start + "-" + value.end;
                self.iconJX.visible = false;
                self["n16"].visible = true;
                self["n35"].visible = false;
                break;
            case 1://活动未开启
                self.iconMask.visible = false;
                self.txtActTime.visible = true;
                self.txtActTime.text = "" + value.start + "-" + value.end;
                self.iconJX.visible = false;
                self["n16"].visible = true;
                self["n35"].visible = false;
                break;
            case 2://活动进行中
                self.iconMask.visible = false;
                self.txtActTime.visible = false;
                self.iconJX.visible = true;
                self["n16"].visible = false;
                self["n35"].visible = true;
                break;
        }
    };
    ItemActPreView.prototype.getData = function () {
        return this._data;
    };
    ItemActPreView.prototype.clean = function () {
        var self = this;
        ConfigHelp.cleanGridview(self.grids);
        IconUtil.setImg(self.bg, null);
        IconUtil.setImg(self.txtName, null);
    };
    ItemActPreView.URL = "ui://b3p8szvvtc2x1q";
    return ItemActPreView;
}(fairygui.GComponent));
__reflect(ItemActPreView.prototype, "ItemActPreView");
