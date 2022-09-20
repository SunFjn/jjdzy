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
var ChildJX = (function (_super) {
    __extends(ChildJX, _super);
    function ChildJX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.urls = ["ui://4aepcdbweium2l", "ui://4aepcdbweium2k", "ui://4aepcdbweium2j", "ui://4aepcdbweium2m"];
        return _this;
    }
    ChildJX.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "ChildJX"));
    };
    ChildJX.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.btnJH.addClickListener(self.onHand, self);
        self.btnHX.addClickListener(self.onHandHX, self);
        self.btnBattle.addClickListener(self.onHand, self);
        self.txtShuoMing.text = HtmlUtil.createLink(self.txtShuoMing.text);
        self.txtShuoMing.displayObject.touchEnabled = true;
        self.txtShuoMing.displayObject.addEventListener(egret.TextEvent.LINK, self.onLink, self);
    };
    ChildJX.prototype.initView = function (pParent) {
    };
    ChildJX.prototype.openPanel = function (pData) {
        var self = this;
        var model = GGlobal.modelSHJX;
        GGlobal.modelsl.CG_OPEN_SHOULING();
        self.onSel(pData);
        model.listen(ModelSH.msg_ui, self.onUpdate, self); //ui数据
        model.listen(ModelSH.msg_itemSel, self.onSel, self);
        model.listen(ModelSH.msg_enable, self.onUpdate, self); //激活
        model.listen(ModelSH.msg_chuanDai, self.onUpdate, self); //穿戴
        model.listen(ModelSH.msg_onbat, self.onUpdate, self); //出战
        model.listen(ModelSH.msg_xilian, self.onUpdate, self); //洗练
        model.listen(ModelSH.msg_onbat, self.upSkin, self); //换皮肤
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.onBagUpdate, self); //添加装备更新消息
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self); //添加背包物品更新消息
        GGlobal.reddot.listen(UIConst.SH_HUANX, self.upHxRed, self);
    };
    ChildJX.prototype.closePanel = function () {
        var self = this;
        GGlobal.modelSHJX.remove(ModelSH.msg_ui, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_itemSel, self.onSel, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_enable, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_chuanDai, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_onbat, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_xilian, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_onbat, self.upSkin, self); //换皮肤
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.onBagUpdate, self);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self);
        GGlobal.reddot.remove(UIConst.SH_HUANX, self.upHxRed, self);
        self.container.setEff(null);
    };
    ChildJX.prototype.onLink = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SHJX);
    };
    ChildJX.prototype.onHand = function (evt) {
        var tar = evt.currentTarget;
        switch (tar) {
            case this.btnBattle:
                GGlobal.modelSHJX.CG865(this._data.yj);
                break;
            case this.btnJH:
                GGlobal.modelSHJX.CG861(this._data.yj);
                break;
        }
    };
    ChildJX.prototype.onHandHX = function () {
        if (this.btnJH.visible) {
            ViewCommonWarn.text("请先激活兽魂");
            return;
        }
        GGlobal.layerMgr.open(UIConst.SH_HUANX, this._data);
    };
    ChildJX.prototype.onUpdate = function () {
        var self = this;
        if (!self._data) {
            return;
        }
        self.powerLb.text = ModelSH.getTotalPower(self._data.yj) + "";
        var name = ["青龙", "白虎", "朱雀", "玄武"][self._data.yj - 1];
        self.txtCost.text = "集齐12枚" + name + "印可激活" + name + "之魂";
        self.iconType.icon = self.urls[self._data.yj - 1];
        var datas = ModelSH.getOrigDatas()[self._data.yj];
        datas.sort(function (a, b) { return a.id - b.id; }); //按部位从小到大排序
        self.item1.setData(datas[0]);
        self.item2.setData(datas[1]);
        self.item3.setData(datas[2]);
        var state = self.getState();
        switch (state) {
            case 0://未激活
                self.txtCost.visible = self.btnJH.visible = true;
                self.btnBattle.visible = self.iconOnBat.visible = false;
                if (self.canBeJH()) {
                    self.btnJH.checkNotice = true;
                    self.btnJH.enabled = true;
                }
                else {
                    self.btnJH.checkNotice = false;
                    self.btnJH.enabled = false;
                }
                break;
            case 1://已激活 未出战
                self.btnBattle.visible = true;
                self.iconOnBat.visible = self.txtCost.visible = self.btnJH.visible = false;
                break;
            case 2://已激活 已出战
                self.iconOnBat.visible = true;
                self.btnBattle.visible = self.txtCost.visible = self.btnJH.visible = false;
                break;
        }
        self.upHxRed();
    };
    ChildJX.prototype.upHxRed = function () {
        this.btnHX.checkNotice = GGlobal.reddot.checkCondition(UIConst.SH_HUANX, this._data.yj - 1);
    };
    ChildJX.prototype.canBeJH = function () {
        var info = ModelSH.servDatas[this._data.yj];
        var counter = 0;
        if (info) {
            var equips = info.datas;
            for (var i = 0; i < equips.length; i++) {
                var attrs = equips[i].datas;
                for (var j = 0; j < attrs.length; j++) {
                    var attr = attrs[j];
                    if (attr.type == this._data.yj) {
                        counter++;
                    }
                }
            }
        }
        return counter >= 12;
    };
    ChildJX.prototype.getState = function () {
        var info = ModelSH.servDatas[this._data.yj];
        if (info) {
            if (info.state == 1) {
                if (info.isOnBat) {
                    return 2;
                }
                else {
                    return 1;
                }
            }
            else {
                return 0;
            }
        }
    };
    ChildJX.prototype.getByPart = function (part) {
        var lib = Config.zhuangbei_204;
        for (var key in lib) {
            var cfg = lib[key];
            if (cfg.part == part) {
                return cfg;
            }
        }
        return null;
    };
    ChildJX.prototype.onSel = function (data) {
        this._data = data;
        if (data) {
            this.upSkin();
            this.onUpdate();
        }
    };
    ChildJX.prototype.upSkin = function () {
        var info = ModelSH.servDatas[this._data.yj];
        if (info == null || info.pifu == 0) {
            this.container.setEff("uieff/" + Config.sh_266[this._data.yj * 1000].mod2);
        }
        else {
            this.container.setEff("uieff/" + Config.shhx_266[info.pifu].mod2);
        }
    };
    ChildJX.prototype.onBagUpdate = function (itemMap) {
        if (itemMap["equip12"] || itemMap[UIConst.SHOULING] || itemMap[UIConst.SHJX]) {
            this.onUpdate();
        }
    };
    ChildJX.URL = "ui://4aepcdbw811a2";
    return ChildJX;
}(fairygui.GComponent));
__reflect(ChildJX.prototype, "ChildJX", ["IPanel"]);
