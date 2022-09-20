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
var ChildEBS = (function (_super) {
    __extends(ChildEBS, _super);
    function ChildEBS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [];
        _this.xsNames = [
            "角宿、亢宿、氐宿、房宿、心宿、尾宿、箕宿", "斗宿、牛宿、女宿、虚宿、危宿、室宿、壁宿", "奎宿、娄宿、胃宿、昴宿、毕宿、觜宿、参宿", "井宿、鬼宿、柳宿、星宿、张宿、翼宿、轸宿"
        ];
        _this.urls = ["ui://4aepcdbwsh622w", "ui://4aepcdbwsh622y", "ui://4aepcdbwsh622x", "ui://4aepcdbwsh622z"];
        _this.urls2 = ["ui://4aepcdbwvwaa32", "ui://4aepcdbwvwaa31", "ui://4aepcdbwvwaa34", "ui://4aepcdbwvwaa33"];
        return _this;
    }
    ChildEBS.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "ChildEBS"));
    };
    ChildEBS.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.iconType2.displayObject.touchEnabled = true;
        Utils.DisplayUtil.addPop(self.iconType2.displayObject);
        self.iconType2.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openTZ, self);
        for (var i = 1; i <= 7; i++) {
            var item = self["item" + i];
            item.enabled = false;
            self.items.push(item);
        }
        self.btnSJ.addClickListener(self.onHand, self);
        self.btnJH.addClickListener(self.onHand, self);
    };
    ChildEBS.prototype.initView = function (pParent) {
    };
    ChildEBS.prototype.openPanel = function (pData) {
        var self = this;
        self.onSel(pData);
        GGlobal.modelsl.CG_OPEN_SHOULING();
        GGlobal.modelSHJX.listen(ModelSH.msg_ui, self.onUpdate, self); //ui数据
        GGlobal.modelSHJX.listen(ModelSH.msg_itemSel, self.onSel, self);
        GGlobal.modelSHJX.listen(ModelSH.msg_xingSuUp, self.onUpdate, self);
        GGlobal.modelSHJX.listen(ModelSH.msg_xingUpJie, self.onUpdate, self);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self);
        IconUtil.setImg(self.back, "resource/image/shjx/back.png");
    };
    ChildEBS.prototype.closePanel = function () {
        var self = this;
        GGlobal.modelSHJX.remove(ModelSH.msg_ui, self.onUpdate, self); //ui数据
        GGlobal.modelSHJX.remove(ModelSH.msg_itemSel, self.onSel, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_xingSuUp, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_xingUpJie, self.onUpdate, self);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self);
        IconUtil.setImg(self.back, null);
    };
    ChildEBS.prototype.getXSName = function () {
        var info = this.xsNames[this._data.yj - 1];
        var arr = info.split("\、");
        return arr;
    };
    ChildEBS.prototype.onHand = function (evt) {
        var info = ModelSH.servDatas[this._data.yj];
        if (info) {
            var cfg = Config.xj_266[info.suLv];
            var cost = ConfigHelp.makeItem(JSON.parse(cfg.cost)[0]);
            if (cost.count > Model_Bag.getItemCount(cost.id)) {
                View_CaiLiao_GetPanel.show(VoItem.create(cost.id));
                return;
            }
            GGlobal.modelSHJX.CG859(this._data.yj);
        }
    };
    ChildEBS.prototype.openTZ = function () {
        GGlobal.layerMgr.open(UIConst.SHSHENGSUDS, this._data);
    };
    ChildEBS.prototype.onUpdate = function () {
        if (!this._data) {
            return;
        }
        var info = ModelSH.servDatas[this._data.yj];
        if (info) {
            var cfg = Config.xj_266[info.suLv];
            this.powerLb.text = cfg ? cfg.power + "" : "0";
            var jie_ji = info.suLv % 1000;
            var jie = Math.floor(jie_ji / 10);
            var ji = jie_ji % 10;
            this.txtJie.text = jie + "";
            if (info.suJie) {
                this.txtTZJie.text = (info.suJie % 100) + "级";
            }
            else {
                this.txtTZJie.text = info.suJie + "级";
            }
            var i = this.items.length;
            for (; i--;) {
                if (i < ji) {
                    this.items[i].enabled = true;
                }
                else {
                    this.items[i].enabled = false;
                }
            }
            if ((jie == 0 && ji == 0) || cfg.next == 0) {
                this.grpAttr.visible = false;
                this.txtMid.text = ConfigHelp.attrString(JSON.parse(cfg.attr));
            }
            else {
                this.grpAttr.visible = true;
                this.txtMid.text = "";
                this.txtLeft.text = ConfigHelp.attrString(JSON.parse(cfg.attr));
                this.txtRight.text = ConfigHelp.attrString(JSON.parse(Config.xj_266[cfg.next].attr));
            }
            if (cfg.next == 0) {
                this.labFull.visible = true;
                this.grpOpe.visible = false;
            }
            else {
                this.labFull.visible = false;
                this.grpOpe.visible = true;
                var cost = ConfigHelp.makeItem(JSON.parse(cfg.cost)[0]);
                this.txtCostN.text = cost.name;
                this.txtCostN.color = cost.qColor;
                IconUtil.setImg(this.costItem.getChild("icon").asLoader, Enum_Path.ICON70_URL + cost.icon + ".png");
                this.costItem.text = ConfigHelp.numToStr(Model_Bag.getItemCount(cost.id)) + "/" + ConfigHelp.numToStr(cost.count);
                if (cost.count > Model_Bag.getItemCount(cost.id)) {
                    this.costItem.color = 0xff0000;
                    // this.btnSJ.enabled = this.btnJH.enabled = false;
                }
                else {
                    this.costItem.color = 0xffffff;
                    // this.btnJH.enabled = this.btnSJ.enabled = true;
                }
            }
            if ((info.suLv % 10) == 7) {
                this.btnJH.visible = false;
                this.btnSJ.visible = true;
                this.btnSJ.checkNotice = this.checkNot();
            }
            else {
                this.btnJH.visible = true;
                this.btnSJ.visible = false;
                this.btnJH.checkNotice = this.checkNot();
            }
            this.noticeImg.visible = this.checkNotJie();
            var names = this.getXSName();
            for (var i_1 = 0; i_1 < this.items.length; i_1++) {
                this.items[i_1].getChild("title").text = names[i_1];
            }
        }
    };
    ChildEBS.prototype.checkNot = function () {
        var info = ModelSH.servDatas[this._data.yj];
        if (info) {
            var cfg = Config.xj_266[info.suLv];
            if (cfg && cfg.cost != 0) {
                var cost = ConfigHelp.makeItem(JSON.parse(cfg.cost)[0]);
                if (Model_Bag.getItemCount(cost.id) >= cost.count) {
                    return true;
                }
            }
        }
    };
    ChildEBS.prototype.checkNotJie = function () {
        var info = ModelSH.servDatas[this._data.yj];
        if (info) {
            var nextCfg = info.suJie ? Config.xjtz_266[info.suJie + 1] : Config.xjtz_266[this._data.yj * 1000 + 1];
            if (nextCfg) {
                var fitJi = nextCfg.next % 1000 >> 0;
                var ji = info.suLv ? info.suLv : this._data.yj * 100000;
                if ((ji % 1000 >> 0) >= fitJi) {
                    return true;
                }
            }
        }
        return false;
    };
    ChildEBS.prototype.resolveTZ = function (jie) {
        var arr = ModelSH.resolveTZ(jie, this._data.yj);
        if (jie >= arr[arr.length - 1].fitJie) {
            return arr[arr.length - 1].jie;
        }
        else if (jie < arr[0].fitJie) {
            return 0;
        }
        else {
            for (var i = 0; i < arr.length - 1; i++) {
                if (jie >= arr[i].fitJie && jie < arr[i + 1].fitJie) {
                    return arr[i].jie;
                }
            }
        }
    };
    ChildEBS.prototype.onSel = function (data) {
        this._data = data;
        if (data) {
            IconUtil.setImg(this.bg, "resource/image/shjx/shouHun" + data.yj + ".png");
            this.iconType.url = this.urls[data.yj - 1];
            this.iconType2.url = this.urls2[data.yj - 1];
            this.onUpdate();
        }
    };
    ChildEBS.prototype.onBagUpdate = function (itemMap) {
        if (itemMap[UIConst.SHOULING]) {
            this.onUpdate();
        }
    };
    ChildEBS.URL = "ui://4aepcdbw811a4";
    return ChildEBS;
}(fairygui.GComponent));
__reflect(ChildEBS.prototype, "ChildEBS", ["IPanel"]);
