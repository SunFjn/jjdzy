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
var Child_ShaoZhu_QinMi = (function (_super) {
    __extends(Child_ShaoZhu_QinMi, _super);
    function Child_ShaoZhu_QinMi() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        _this.rewardArr = [];
        _this.numLbArr = [];
        _this.type = 0;
        return _this;
    }
    Child_ShaoZhu_QinMi.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "Child_ShaoZhu_QinMi"));
    };
    Child_ShaoZhu_QinMi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.expbar.titleType = fairygui.ProgressTitleType.ValueAndMax;
        for (var i = 0; i < 4; i++) {
            if (i < 2) {
                var grid = (self.getChild("grid" + i));
                grid.isShowEff = true;
                self.rewardArr.push(grid);
            }
            self.gridArr.push((self.getChild("grid0" + i)));
            self.numLbArr.push((self.getChild("numLb" + i)));
        }
        self.showGroup.visible = false;
        self.keyBt.addClickListener(self.keyHandler, self);
    };
    Child_ShaoZhu_QinMi.prototype.setVo = function (vo) {
        var self = this;
        self.vo = vo;
        self.powerLb.text = vo.qinMiCfg.power + "";
        if (vo.qinMiCfg.show != "0") {
            var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(vo.qinMiCfg.show));
            for (var i = 0; i < self.rewardArr.length; i++) {
                if (i < rewardArr.length) {
                    self.rewardArr[i].visible = true;
                    self.rewardArr[i].vo = rewardArr[i];
                    self.rewardArr[i].tipEnabled = true;
                }
                else {
                    self.rewardArr[i].clean();
                    self.rewardArr[i].visible = false;
                }
            }
            self.rewardGroup.visible = true;
        }
        else {
            self.rewardGroup.visible = false;
        }
        IconUtil.setImg(self.nameImg, "resource/image/son/qm" + Math.floor(vo.qinMiCfg.jie / 100) + ".png");
        self.promptLb.visible = self.costGroup.visible = self.labAttrMax.visible = self.attGroup.visible = false;
        self.levelLb.text = vo.qinMiCfg.jie % 100 + "/" + vo.qinMiCfg.max;
        var bagExp = 0;
        if (vo.starLv <= 0) {
            self.costGroup.visible = false;
            self.promptLb.text = ConfigHelp.reTxt("需激活少主·{0}", [vo.cfg.name]);
            self.promptLb.visible = true;
        }
        else {
            var arr = JSON.parse(vo.cfg.qm);
            for (var i = 0; i < self.gridArr.length; i++) {
                var itemVo = VoItem.create(arr[i][0]);
                itemVo.count = Model_Bag.getItemCount(itemVo.id);
                self.gridArr[i].isShowEff = true;
                self.gridArr[i].vo = itemVo;
                if (itemVo.count == 1) {
                    self.gridArr[i].showText = "1";
                }
                self.gridArr[i].tipEnabled = true;
                self.numLbArr[i].text = "+" + arr[i][1];
                bagExp += itemVo.count * arr[i][1];
            }
            self.costGroup.visible = true;
        }
        if (vo.qinMiCfg.exp == 0) {
            self.expbar.value = 1;
            self.expbar.max = 1;
            self.expbar._titleObject.text = "已满级";
            self.labAttrMax.visible = true;
            self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(vo.qinMiCfg.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            self.promptLb.text = "亲密度已满";
            self.promptLb.visible = true;
            self.costGroup.visible = false;
        }
        else {
            self.expbar.value = vo.exp;
            self.expbar.max = vo.qinMiCfg.exp;
            self.attGroup.visible = true;
            self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(vo.qinMiCfg.attr), "+", Color.getColorStr(1), Color.getColorStr(1));
            self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(Config.sonqm_267[vo.qinMiCfg.lv + 1].attr), "+", Color.getColorStr(2), Color.getColorStr(2));
            self.keyBt.checkNotice = bagExp >= vo.qinMiCfg.exp - vo.exp;
        }
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
        if (vo.bodyID > 0 && Config.sonshow_267[vo.bodyID]) {
            if (!self.awatar) {
                self.awatar = EffectMgr.addEff("uieff/" + Config.sonshow_267[vo.bodyID].zs, self.modelIcon.displayObject, self.modelIcon.width / 2, self.modelIcon.height, 1000, -1, true);
            }
        }
        else {
            if (!self.awatar) {
                self.awatar = EffectMgr.addEff("uieff/" + vo.cfg.zs, self.modelIcon.displayObject, self.modelIcon.width / 2, self.modelIcon.height, 1000, -1, true);
            }
        }
    };
    Child_ShaoZhu_QinMi.prototype.keyHandler = function () {
        var self = this;
        var index = 0;
        var arr = JSON.parse(self.vo.cfg.qm);
        for (var i = 0; i < self.gridArr.length; i++) {
            var count = Model_Bag.getItemCount(arr[i][0]);
            if (count > 0) {
                index++;
                break;
            }
        }
        if (index > 0) {
            GGlobal.modelShaoZhu.CG_ADDQINMI_SHAOZHU_5113(self.vo.cfg.id);
        }
        else {
            ViewCommonWarn.text("道具不足");
        }
    };
    Child_ShaoZhu_QinMi.prototype.showText = function () {
        var self = this;
        if (!self.showGroup.visible) {
            self.showGroup.visible = true;
            var arr = JSON.parse(self.vo.cfg.tips);
            self.showLb.text = arr[Math.floor(Math.random() * arr.length)][0];
            setTimeout(function () {
                self.showGroup.visible = false;
            }, 2000);
        }
    };
    Child_ShaoZhu_QinMi.prototype.open = function (vo) {
        var self = this;
        self.setVo(vo);
        self.keyBt.addClickListener(self.keyHandler, self);
        GGlobal.control.listen(Enum_MsgType.SHAOZHU_QINMI, self.showText, self);
    };
    Child_ShaoZhu_QinMi.prototype.close = function () {
        var self = this;
        for (var i = 0; i < self.gridArr.length; i++) {
            if (i < self.rewardArr.length) {
                self.rewardArr[i].clean();
            }
            self.gridArr[i].clean();
        }
        self.keyBt.removeClickListener(self.keyHandler, self);
        GGlobal.control.remove(Enum_MsgType.SHAOZHU_QINMI, self.showText, self);
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
    };
    Child_ShaoZhu_QinMi.URL = "ui://p83wyb2bng03c";
    return Child_ShaoZhu_QinMi;
}(fairygui.GComponent));
__reflect(Child_ShaoZhu_QinMi.prototype, "Child_ShaoZhu_QinMi", ["ChildShaoZhu"]);
