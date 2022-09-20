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
var Item_XiuLianTF = (function (_super) {
    __extends(Item_XiuLianTF, _super);
    function Item_XiuLianTF() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        _this.gridArr0 = [];
        _this.rewardID = 0;
        return _this;
    }
    Item_XiuLianTF.createInstance = function () {
        return (fairygui.UIPackage.createObject("YiShouLu", "Item_XiuLianTF"));
    };
    Item_XiuLianTF.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        for (var i = 0; i < 8; i++) {
            self.gridArr.push(self["grid_" + i]);
            if (i < 4) {
                self.gridArr0.push(self["grid" + i]);
            }
        }
    };
    Item_XiuLianTF.prototype.initView = function (pParent) {
    };
    Item_XiuLianTF.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelTalent;
        var expArr = [0, 170, 440, 710, 1000];
        var jifenArr = [0];
        self.promptLb.text = ConfigHelp.reTxt("修炼次数满后重置进度\n再修炼{0}必出高级道具", HtmlUtil.fontNoSize("" + (10 - model.xiulianNum % 10), Color.getColorStr(2)));
        for (var i = 0; i < self.gridArr.length; i++) {
            self.gridArr[i].isShowEff = true;
            self.gridArr[i].tipEnabled = true;
            self.gridArr[i].vo = model.showData[i];
            if (i < self.gridArr0.length) {
                self.gridArr0[i].setTfVo(Config.xltfmb_758[i + 1]);
                jifenArr.push(Config.xltfmb_758[i + 1].cs);
            }
        }
        var cfg = Config.xltf_758[1];
        var count = Model_Bag.getItemCount(model.itemID);
        if (count > 0) {
            var itemVo = VoItem.create(model.itemID);
            self.vres1.setImgUrl(itemVo.icon);
            self.vres1.setCount(count);
            self.btnBuy1.checkNotice = true;
        }
        else {
            var itemVo = ConfigHelp.makeItemListArr(JSON.parse(cfg.cj1))[0];
            var color = 0;
            self.vres1.setImgUrl(itemVo.icon);
            if (ConfigHelp.checkEnough(cfg.cj1, false)) {
                color = 1;
            }
            else {
                color = 6;
            }
            self.vres1.setCount(HtmlUtil.fontNoSize(itemVo.count + "", Color.getColorStr(color)));
            self.btnBuy1.checkNotice = false;
        }
        if (count >= 10) {
            var itemVo = VoItem.create(model.itemID);
            self.vres10.setImgUrl(itemVo.icon);
            self.vres10.setCount(count);
            self.btnBuy10.checkNotice = true;
        }
        else {
            var itemVo = ConfigHelp.makeItemListArr(JSON.parse(cfg.cj2))[0];
            var color1 = 0;
            self.vres10.setImgUrl(itemVo.icon);
            if (ConfigHelp.checkEnough(cfg.cj2, false)) {
                color1 = 1;
            }
            else {
                color1 = 6;
            }
            self.vres10.setCount(HtmlUtil.fontNoSize(itemVo.count + "", Color.getColorStr(color1)));
            self.btnBuy10.checkNotice = false;
        }
        var curExp = 0;
        if (model.xiulianNum >= jifenArr[jifenArr.length - 1]) {
            curExp = expArr[expArr.length - 1];
        }
        else {
            for (var i = 0; i < jifenArr.length; i++) {
                if (model.xiulianNum < jifenArr[i]) {
                    curExp = expArr[i - 1] + (expArr[i] - expArr[i - 1]) / (jifenArr[i] - jifenArr[i - 1]) * (model.xiulianNum - jifenArr[i - 1]);
                    break;
                }
            }
        }
        self.expBar.value = curExp;
        self.expBar.max = expArr[expArr.length - 1];
        self.expBar._titleObject.text = "";
        self.labPoint.text = "修炼次数\n" + model.xiulianNum + "/" + jifenArr[jifenArr.length - 1];
    };
    Item_XiuLianTF.prototype.onBtnBuy1 = function () {
        var self = this;
        var model = GGlobal.modelTalent;
        var count = Model_Bag.getItemCount(model.itemID);
        if (count > 0 || ConfigHelp.checkEnough(Config.xltf_758[1].cj1, false)) {
            self.btnBuy1.touchable = self.btnBuy10.touchable = false;
            model.CG_Talent_xiuLian_9373(1);
        }
        else {
            ModelChongZhi.guideToRecharge();
        }
    };
    Item_XiuLianTF.prototype.onBtnBuy10 = function () {
        var self = this;
        var model = GGlobal.modelTalent;
        var count = Model_Bag.getItemCount(model.itemID);
        if (count >= 10 || ConfigHelp.checkEnough(Config.xltf_758[1].cj2, false)) {
            self.btnBuy1.touchable = self.btnBuy10.touchable = false;
            model.CG_Talent_xiuLian_9373(10);
        }
        else {
            ModelChongZhi.guideToRecharge();
        }
    };
    Item_XiuLianTF.prototype.onDraw = function (evt) {
        var self = this;
        var model = GGlobal.modelTalent;
        var grid = evt.target;
        var cfg = grid.vo1;
        var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jl));
        self.rewardID = cfg.id;
        View_Reward_Show3.show(arr, model.targetData[cfg.id], model.targetData[cfg.id], Handler.create(self, self.drawCallFun));
    };
    Item_XiuLianTF.prototype.drawCallFun = function () {
        GGlobal.modelTalent.CG_Talent_getAward_9375(this.rewardID);
    };
    Item_XiuLianTF.prototype.updateReward = function () {
        var self = this;
        var model = GGlobal.modelTalent;
        var cfg = self.gridArr0[self.rewardID - 1].vo1;
        var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jl));
        View_Reward_Show3.show(arr, model.targetData[cfg.id], model.targetData[cfg.id], Handler.create(self, self.drawCallFun));
    };
    Item_XiuLianTF.prototype.onCheck = function () {
        var self = this;
        GGlobal.modelTalent.skipTween = self.checkBox.selected;
        var key = "xiulian_TF";
        var val = GGlobal.modelTalent.skipTween ? "1" : "0";
        LocalStorageUtil.setItem(key, val);
    };
    Item_XiuLianTF.prototype.showEff = function (dropArr) {
        var self = this;
        var cfg = Config.xltf_758[1];
        var model = GGlobal.modelTalent;
        if (model.skipTween) {
            View_Reward_Show2.show(UIConst.XIULIAN_TF, dropArr.length, Handler.create(self, self.drawCall, [dropArr]), dropArr, JSON.parse(cfg.cj1)[0][2], JSON.parse(cfg.cj2)[0][2], model.itemID);
            self.btnBuy1.touchable = self.btnBuy10.touchable = true;
        }
        else {
            EffectMgr.addEff("uieff/10052", self.bg1.displayObject, self.bg1.width / 2, self.bg1.height / 2, 1000, 1000, false);
            var times = setTimeout(function () {
                View_Reward_Show2.show(UIConst.XIULIAN_TF, dropArr.length, Handler.create(self, self.drawCall, [dropArr]), dropArr, JSON.parse(cfg.cj1)[0][2], JSON.parse(cfg.cj2)[0][2], model.itemID);
                self.btnBuy1.touchable = self.btnBuy10.touchable = true;
            }, 1000);
        }
    };
    Item_XiuLianTF.prototype.drawCall = function (arr) {
        var self = this;
        if (arr.length > 1) {
            self.onBtnBuy10();
        }
        else {
            self.onBtnBuy1();
        }
    };
    Item_XiuLianTF.prototype.openPanel = function (pData) {
        var self = this;
        var model = GGlobal.modelTalent;
        IconUtil.setImg(self.bg0, Enum_Path.YISHOULU_URL + "xiulianTF0.png");
        IconUtil.setImg(self.bg1, Enum_Path.YISHOULU_URL + "xiulianTF1.png");
        self.btnBuy1.touchable = self.btnBuy10.touchable = true;
        self.btnBuy1.addClickListener(self.onBtnBuy1, self);
        self.btnBuy10.addClickListener(self.onBtnBuy10, self);
        for (var i = 0; i < self.gridArr0.length; i++) {
            self.gridArr0[i].addClickListener(self.onDraw, self);
        }
        var val = LocalStorageUtil.getItem("xiulian_TF");
        model.skipTween = val == "1" ? true : false;
        self.checkBox.selected = model.skipTween;
        self.checkBox.addClickListener(self.onCheck, self);
        GGlobal.reddot.listen(UIConst.YISHOULU_TF, self.updateShow, self);
        GGlobal.control.listen(Enum_MsgType.XIULIAN_TF_REWARD, self.updateReward, self);
        GGlobal.control.listen(Enum_MsgType.XIULIAN_TF_SHOWEFF, self.showEff, self);
        if (model.showData.length <= 0) {
            model.CG_Talent_openUI_9371();
        }
        else {
            self.updateShow();
        }
    };
    Item_XiuLianTF.prototype.closePanel = function (pData) {
        var self = this;
        IconUtil.setImg(self.bg0, null);
        IconUtil.setImg(self.bg1, null);
        GGlobal.reddot.remove(UIConst.YISHOULU_TF, self.updateShow, self);
        GGlobal.control.remove(Enum_MsgType.XIULIAN_TF_REWARD, self.updateReward, self);
        GGlobal.control.remove(Enum_MsgType.XIULIAN_TF_SHOWEFF, self.showEff, self);
        self.btnBuy1.removeClickListener(self.onBtnBuy1, self);
        self.btnBuy10.removeClickListener(self.onBtnBuy10, self);
        for (var i = 0; i < self.gridArr.length; i++) {
            self.gridArr[i].clean();
            if (i < self.gridArr0.length) {
                self.gridArr0[i].clean();
                self.gridArr0[i].removeClickListener(self.onDraw, self);
            }
        }
    };
    Item_XiuLianTF.URL = "ui://7y83phvnvxva11";
    return Item_XiuLianTF;
}(fairygui.GComponent));
__reflect(Item_XiuLianTF.prototype, "Item_XiuLianTF", ["IPanel"]);
