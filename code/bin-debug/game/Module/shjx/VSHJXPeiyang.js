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
var VSHJXPeiyang = (function (_super) {
    __extends(VSHJXPeiyang, _super);
    function VSHJXPeiyang() {
        var _this = _super.call(this) || this;
        _this.suitVal = 0;
        _this.suitStar = 0;
        _this.xilianNum = 0;
        _this.loadRes("shouhunJX", "shouhunJX_atlas0");
        return _this;
    }
    VSHJXPeiyang.prototype.childrenCreated = function () {
        var self = this;
        var view = fairygui.UIPackage.createObject("shouhunJX", "VSHJXPeiyang").asCom;
        self.contentPane = view;
        CommonManager.parseChildren(view, self);
        Utils.DisplayUtil.addPop(self.grid2.displayObject);
        self.grid2.addClickListener(self.onHand, self);
        self.compGray._container.touchChildren = false;
        self.btnZS.addClickListener(self.onHand, self);
        self.compGray.addClickListener(self.onHand, self);
        self.list.itemRenderer = self.onLstRender;
        self.list.callbackThisObj = self;
        self.list1.itemRenderer = self.onLstRender1;
        self.list1.callbackThisObj = self;
        self.huaWenLD = self.compGray.getChild("huaWenLD");
        self.yinJiLD = this.compGray.getChild("yinJiLD");
        self.btnHand.addClickListener(this.onHand, this);
        self.txtTZ1 = self["n10"];
        self.txtTZ2 = self["n12"];
        self.maskObj.visible = false;
        self.starBoxArr = [];
        for (var i = 0; i < 7; i++) {
            self.starBoxArr.push(view.getChild("starBox" + i));
        }
        _super.prototype.childrenCreated.call(this);
        self.thBt.addClickListener(self.thHandler, self);
    };
    VSHJXPeiyang.prototype.thHandler = function () {
        var self = this;
        if (self.thItemAttrs && self.thItemAttrs.length > 0) {
            GGlobal.modelSHJX.CG5691(self.info.yj, self.info.id);
        }
        else {
            ViewCommonWarn.text("无可替换印记");
        }
    };
    VSHJXPeiyang.prototype.onLstRender = function (index, renderer) {
        if (this.itemAttrs && this.itemAttrs.length) {
            var tempDt = { entityData: this.itemAttrs[index], equipPos: this.info.id, type: this.info.yj };
            renderer.setData(tempDt);
        }
    };
    VSHJXPeiyang.prototype.onLstRender1 = function (index, renderer) {
        if (this.thItemAttrs && this.thItemAttrs.length) {
            var tempDt = { entityData: this.thItemAttrs[index], equipPos: this.info.id, type: this.info.yj };
            renderer.touchable = false;
            renderer.setData(tempDt);
        }
    };
    VSHJXPeiyang.prototype.onHand = function (evt) {
        var self = this;
        var tar = evt.currentTarget;
        switch (tar) {
            case self.btnZS://展示
                GGlobal.modelchat.CG_CHAT_SHOW_DATA(10, this.info.yj * 1000 + this.info.id);
                break;
            case self.compGray:
            case self.grid2:
                var lib = Config.shjxyj_266;
                var bool = false;
                for (var key in lib) {
                    var cfg = lib[key];
                    if (cfg.yj == this.info.yj) {
                        if (Model_Bag.getItemCount(cfg.id) > 0) {
                            bool = true;
                            break;
                        }
                    }
                }
                if (bool) {
                    GGlobal.layerMgr.open(UIConst.SHJXXCAILIAO, this.info);
                }
                else {
                    ViewCommonWarn.text("\u7F3A\u5C11" + ["青龙", "白虎", "朱雀", "玄武"][this.info.yj - 1] + "\u5370\u8BB0");
                }
                break;
            case self.btnHand:
                if (self.hasAllLock()) {
                    ViewCommonWarn.text("印记全部锁定，不可洗练!");
                    return;
                }
                if (self.has10StarUnLock()) {
                    ViewAlert.show("已洗练出更高星级的" + ["青龙", "白虎", "朱雀", "玄武"][this.info.yj - 1] + "印记,\n是否替换", Handler.create(self, self.thHandler), ViewAlert.OKANDCANCEL, "替换", "洗练", Handler.create(self, function () {
                        inerFunc();
                    }));
                }
                else {
                    inerFunc();
                }
                break;
        }
        function inerFunc() {
            var cnt = JSON.parse(Config.xtcs_004[5601].other)[0][2];
            if (Model_Bag.getItemCount(410049) >= cnt) {
                if (self.hasLockAttr() && self.costLock && self.costLock.count > 0 && Model_Bag.getItemCount(410050) < self.costLock.count) {
                    View_QuickBuy_Panel.show(VoItem.create(410050));
                }
                else {
                    GGlobal.modelSHJX.CG857(self.info.yj, self.info.id, self.grid2.vo ? self.grid2.vo.id : 0);
                }
            }
            else {
                View_QuickBuy_Panel.show(VoItem.create(410049));
            }
        }
    };
    VSHJXPeiyang.prototype.hasAllLock = function () {
        var data = ModelSH.servDatas[this.info.yj];
        var lockCnt = 0;
        if (data) {
            var equips = data.datas;
            for (var i = 0; i < equips.length; i++) {
                var equip = equips[i];
                if (equip.position == this.info.id) {
                    var attrs = equip.datas;
                    for (var j = 0; j < attrs.length; j++) {
                        if (attrs[j].isLock == 1) {
                            lockCnt++;
                        }
                    }
                }
            }
        }
        return lockCnt >= 4;
    };
    VSHJXPeiyang.prototype.hasLockAttr = function () {
        var data = ModelSH.servDatas[this.info.yj];
        var counter = 0;
        if (data) {
            var equips = data.datas;
            for (var i = 0; i < equips.length; i++) {
                var equip = equips[i];
                if (equip.position == this.info.id) {
                    var attrs = equip.datas;
                    for (var j = 0; j < attrs.length; j++) {
                        if (attrs[j].isLock == 1) {
                            counter++;
                        }
                    }
                }
            }
        }
        return counter;
    };
    VSHJXPeiyang.prototype.onUpdate = function () {
        var self = this;
        var data = ModelSH.servDatas[self.info.yj];
        if (data) {
            var datas = data.datas;
            var equipID = 0;
            var yinJiInfos = void 0;
            for (var i = 0; i < datas.length; i++) {
                var tempDt = datas[i];
                if (tempDt.position == self.info.id) {
                    equipID = tempDt.equipID;
                    yinJiInfos = self.itemAttrs = tempDt.datas;
                    self.thItemAttrs = tempDt.thdatas;
                    self.xilianNum = tempDt.xiLianNum;
                    self.suitVal = tempDt.suitVal;
                    self.suitStar = tempDt.suitStar;
                    var max = 0;
                    var curIndex = void 0;
                    for (var i_1 = 0; i_1 < 7; i_1++) {
                        var cfg = Config.shjxxl_266[i_1 + 1];
                        var t = Number(JSON.parse(cfg.time)[0][0]);
                        self.starBoxArr[i_1].setVo(cfg.id, t, self.xilianNum);
                        if (self.xilianNum >= t) {
                            curIndex = i_1 + 1;
                        }
                        if (t > max) {
                            max = t;
                        }
                    }
                    self.starBar.max = 1500;
                    var a = [0, 150, 300, 500, 750, 1100, 1500]; //对应0 10 50 200 500 800 1500次
                    var xilianNum = self.xilianNum > max ? max : self.xilianNum;
                    var curCfg = Config.shjxxl_266[curIndex];
                    var nextCfg = Config.shjxxl_266[curIndex + 1];
                    self.curIndex = curIndex;
                    self.xilianMax = max;
                    if (curIndex == 7) {
                        self.starBar.value = 1500;
                    }
                    else {
                        var valT = Number(JSON.parse(nextCfg.time)[0][0]) - Number(JSON.parse(curCfg.time)[0][0]); //0,10...
                        self.starBar.value = a[curIndex - 1] + Math.floor((xilianNum - Number(JSON.parse(curCfg.time)[0][0])) * (a[curIndex] - a[curIndex - 1]) / valT);
                    }
                    self.starBar._titleObject.text = self.xilianNum + "/" + max;
                    var fws = JSON.parse(curCfg.fw);
                    self.starLb.text = "当前印记洗练范围：" + HtmlUtil.fontNoSize(fws[0][0] + "星-" + fws[0][1] + "星", "#17B2F5");
                    break;
                }
            }
            var power = 0;
            if (equipID > 0) {
                power += Config.zhuangbei_204[equipID].zhanli; //装备基础战力
            }
            var minStarLv = 1000;
            var yinJiIndex = 0;
            if (yinJiInfos) {
                for (var i = 0; i < yinJiInfos.length; i++) {
                    var yinJi = yinJiInfos[i];
                    power += Config.shjxstar_266[yinJi.starID].power; //印记战力
                    if (Config.shjxstar_266[yinJi.starID].star < minStarLv && yinJi.type == self.info.yj) {
                        minStarLv = Config.shjxstar_266[yinJi.starID].star;
                    }
                    if (yinJi.type != self.info.yj)
                        yinJiIndex++;
                }
                // if (yinJiInfos.length == 4 && yinJiIndex == 0) {
                //     const cfg = ModelSH.getByMinStarLv(minStarLv, self.info.id);
                //     if (cfg) {
                //         power += cfg.power;//套装总战力
                //     }
                //     power += self.info.power;//青龙套装战力
                // }
                var cfg = ModelSH.getByMinStarLv(self.suitStar, self.info.id);
                if (cfg) {
                    power += cfg.power; //套装总战力
                }
                if (self.suitVal == 4)
                    power += self.info.power; //青龙套装战力
                self.resolveTZ(self.suitStar); //套装
            }
            var nextPower = 0;
            if (equipID > 0) {
                nextPower += Config.zhuangbei_204[equipID].zhanli; //装备基础战力
            }
            var nextminStarLv = 1000;
            var nextyinJiIndex = 0;
            if (self.thItemAttrs) {
                for (var i = 0; i < self.thItemAttrs.length; i++) {
                    var yinJi = self.thItemAttrs[i];
                    nextPower += Config.shjxstar_266[yinJi.starID].power; //印记战力
                    if (Config.shjxstar_266[yinJi.starID].star < nextminStarLv && yinJi.type == self.info.yj) {
                        nextminStarLv = Config.shjxstar_266[yinJi.starID].star;
                    }
                    if (yinJi.type != self.info.yj)
                        nextyinJiIndex++;
                }
                if (nextminStarLv == 1000 || nextyinJiIndex > 0)
                    nextminStarLv = 0;
                if (self.suitVal == 4) {
                    nextPower += self.info.power; //青龙套装战力
                }
                else {
                    if (self.thItemAttrs.length == 4 && nextyinJiIndex == 0) {
                        nextPower += self.info.power; //青龙套装战力
                    }
                }
                var star = nextminStarLv > self.suitStar ? nextminStarLv : self.suitStar;
                var cfg = ModelSH.getByMinStarLv(star, self.info.id);
                if (cfg) {
                    nextPower += cfg.power; //套装总战力
                }
            }
            self.labPower1.text = nextPower + "";
            self.labPower.text = power + "";
            self.txtTZ1.text = ["青龙", "白虎", "朱雀", "玄武"][self.info.yj - 1] + "套装: 激活4个" + ["青龙", "白虎", "朱雀", "玄武"][self.info.yj - 1] + "印记";
            var attrStr = ConfigHelp.attrString(JSON.parse(self.info.attr)).replace(/\n/g, "      ").replace(/\:|\：/g, "+");
            // const str = HtmlUtil.fontNoSize(attrStr, ModelSH.hasJH4Attr(self.info, 1) ? "#FFFFFF" : "#AAAAAA");
            var str = HtmlUtil.fontNoSize(attrStr, self.suitVal == 4 ? "#FFFFFF" : "#AAAAAA");
            self.txtAttr2.text = str;
            self.updateCost();
            if (ModelSH.isLockBack) {
                ModelSH.isLockBack = false;
                self.switchMeti(this.grid2.vo);
            }
            else {
                self.switchMeti();
            }
            if (self.itemAttrs) {
                self.list.numItems = self.itemAttrs.length;
            }
            if (self.thItemAttrs) {
                self.nextGroup.visible = self.thItemAttrs.length > 0;
                self.list1.numItems = self.thItemAttrs.length;
            }
            else {
                self.nextGroup.visible = false;
            }
        }
        self.huaWenLD.icon = ["ui://4aepcdbweium27", "ui://4aepcdbweium2a", "ui://4aepcdbweium28", "ui://4aepcdbweium29"][self.info.yj - 1];
        self.yinJiLD.icon = ["ui://4aepcdbwsh622q", "ui://4aepcdbwsh622p", "ui://4aepcdbwsh622s", "ui://4aepcdbwsh622r"][self.info.yj - 1];
    };
    /**套装处理提出来处理 */
    VSHJXPeiyang.prototype.resolveTZ = function (minStarLv) {
        var minVo = ModelSH.getByMinStarLv(minStarLv, this.info.id);
        if (minVo)
            minStarLv = minVo.star;
        var arr = ModelSH.posToCfg && ModelSH.posToCfg[this.info.id];
        if (!arr) {
            arr = ModelSH.posToCfg[this.info.id];
        }
        var newArr = [];
        var newLen = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].star >= minStarLv) {
                newArr.push(arr[i]);
                newLen++;
            }
            if (newLen == 4) {
                break;
            }
        }
        if (newLen < 4) {
            for (var i = arr.length - 1; i >= 0; i--) {
                if (arr[i].star < minStarLv) {
                    newArr.unshift(arr[i]);
                    newLen++;
                }
                if (newLen == 4) {
                    break;
                }
            }
        }
        var suitStarLv = arr[0].star;
        var curPos = -1;
        for (var i = 0; i < 4; i++) {
            var v = newArr[i];
            var des = v.star + "\u661F\u5957\u88C5: " + ConfigHelp.attrString(JSON.parse(v.attr), "+");
            this["txtAttr" + (3 + i)].text = des;
            // if (minStarLv >= v.star && ModelSH.hasJH4Attr(this.info, v.star)) {
            if (minStarLv >= v.star) {
                this["txtAttr" + (3 + i)].color = "#FFFFFF";
                suitStarLv = v.star;
                curPos = i;
            }
            else {
                this["txtAttr" + (3 + i)].color = "#AAAAAA";
            }
        }
        this.txtTZ2.text = "星级套装: 激活4个" + suitStarLv + "星以上" + ["青龙", "白虎", "朱雀", "玄武"][this.info.yj - 1] + "印记";
        if (this._eff) {
            EffectMgr.instance.removeEff(this._eff);
            this._eff = null;
            EffectMgr.instance.removeEff(this._eff1);
            this._eff1 = null;
        }
        if (curPos >= 0) {
            var vcomp = this["txtAttr" + (3 + curPos)];
            this._eff = EffectMgr.addEff("uieff/10037", this.displayListContainer, vcomp.x + 36, vcomp.y + vcomp.height / 2 - 2);
            this._eff1 = EffectMgr.addEff("uieff/10037", this.displayListContainer, vcomp.x + vcomp.width - 40, vcomp.y + vcomp.height / 2 - 2);
            this._eff1.mc.scaleX = -1;
        }
    };
    VSHJXPeiyang.prototype.switchMeti = function (value) {
        this.compGray.visible = value == null;
        this.grid2.vo = value;
        if (value) {
            this.noticeImg.visible = false;
        }
    };
    VSHJXPeiyang.prototype.openShuoMing = function (e) {
        var self = this;
        GGlobal.layerMgr.open(UIConst.SHJXXILIAN_SHUOMING, self.info);
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    VSHJXPeiyang.prototype.updateCost = function (itemMap) {
        if (!itemMap || itemMap[UIConst.SHOULING]) {
            var itemVo0 = VoItem.create(410049);
            this.txtMet1.setImgUrl(itemVo0.icon);
            this.txtMet1.setLb(Model_Bag.getItemCount(410049), JSON.parse(Config.xtcs_004[5601].other)[0][2]);
            this.itemName0.text = itemVo0.name;
            this.itemName0.color = itemVo0.qColor;
            var lockCnt = this.hasLockAttr();
            var lockItem = void 0;
            switch (lockCnt) {
                case 0:
                    lockItem = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[5602].other))[0];
                    lockItem.count = 0;
                    break;
                case 1:
                    lockItem = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[5602].other))[0];
                    break;
                case 2:
                    lockItem = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[5603].other))[0];
                    break;
                case 3:
                case 4:
                    lockItem = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[5604].other))[0];
                    break;
            }
            this.costLock = lockItem;
            this.txtMet2.setImgUrl(lockItem.icon);
            this.txtMet2.setLb(Model_Bag.getItemCount(lockItem.id), lockItem.count);
            this.itemName1.text = lockItem.name;
            this.itemName1.color = lockItem.qColor;
            this.noticeImg.visible = !ModelSH.hasFullStar(this.itemAttrs) && ModelSH.hasYinJi(this.info.yj) && Model_Bag.getItemCount(410049) >= JSON.parse(Config.xtcs_004[5601].other)[0][2];
            this.btnHand.checkNotice = !ModelSH.hasFullStar(this.itemAttrs) && Model_Bag.getItemCount(410049) >= JSON.parse(Config.xtcs_004[5601].other)[0][2];
        }
    };
    VSHJXPeiyang.prototype.checkShowEff = function (preLv, curLv) {
        var _this = this;
        if (curLv > preLv) {
            var arr = ModelSH.posToCfg && ModelSH.posToCfg[this.info.id];
            var tzBool = false;
            for (var i = arr.length - 1; i >= 0; i--) {
                if (curLv >= arr[i].star) {
                    EffectMgr.addEff("uieff/10035", this.displayListContainer, 290, 410, 800, 800, false);
                    tzBool = true;
                    this.maskObj.visible = true;
                    Timer.instance.callLater(function () { _this.maskObj.visible = false; }, 800, this);
                    break;
                }
            }
            if (!tzBool) {
                EffectMgr.addEff("uieff/10036", this.displayListContainer, 290, 410, 800, 800, false);
                Timer.instance.callLater(function () { _this.maskObj.visible = false; }, 800, this);
                this.maskObj.visible = true;
            }
        }
    };
    VSHJXPeiyang.prototype.has10StarUnLock = function () {
        var self = this;
        var info = ModelSH.servDatas[this.info.yj];
        if (self.thItemAttrs) {
            //let star = 99;
            // for (let i = 0; i < self.itemAttrs.length; i++) {
            //     const attr = self.itemAttrs[i];
            //     if (Config.shjxstar_266[attr.starID].star < star && !attr.isLock) {
            //         star = Config.shjxstar_266[attr.starID].star;
            //     }
            // }
            for (var i = 0; i < self.thItemAttrs.length; i++) {
                var attr = self.thItemAttrs[i];
                if (!attr.isLock && Config.shjxstar_266[attr.starID].star >= 8 &&
                    (Config.shjxstar_266[attr.starID].star > Config.shjxstar_266[self.itemAttrs[i].starID].star || attr.type != this.info.yj) &&
                    attr.type == this.info.yj) {
                    return true;
                }
            }
        }
        return false;
    };
    VSHJXPeiyang.prototype.yijianxilianResult = function (arg) {
        var self = this;
        self.curIndex += 1;
        self.xilianNum += arg.count;
        self.updateXilianCount(arg.count);
        self.starBar.max = 1500;
        var a = [0, 150, 300, 500, 750, 1100, 1500]; //对应0 10 50 200 500 800 1500次
        var xilianNum = self.xilianNum > self.xilianMax ? self.xilianMax : self.xilianNum;
        var curCfg = Config.shjxxl_266[self.curIndex];
        var nextCfg = Config.shjxxl_266[self.curIndex + 1];
        if (self.curIndex == 7) {
            self.starBar.value = 1500;
        }
        else {
            var valT = Number(JSON.parse(nextCfg.time)[0][0]) - Number(JSON.parse(curCfg.time)[0][0]); //0,10...
            self.starBar.value = a[self.curIndex - 1] + Math.floor((xilianNum - Number(JSON.parse(curCfg.time)[0][0])) * (a[self.curIndex] - a[self.curIndex - 1]) / valT);
        }
        self.starBar._titleObject.text = self.xilianNum + "/" + self.xilianNum;
        var fws = JSON.parse(curCfg.fw);
        self.starLb.text = "当前印记洗练范围：" + HtmlUtil.fontNoSize(fws[0][0] + "星-" + fws[0][1] + "星", "#17B2F5");
        var cfg = Config.shjxxl_266[self.curIndex];
        var t = Number(JSON.parse(cfg.time)[0][0]);
        self.starBoxArr[self.curIndex - 1].setVo(cfg.id, t, self.xilianNum);
    };
    VSHJXPeiyang.prototype.updateXilianCount = function (count) {
        var self = this;
        var data = ModelSH.servDatas[self.info.yj];
        if (data) {
            for (var i = 0; i < data.datas.length; i++) {
                var tempDt = data.datas[i];
                if (tempDt.position == self.info.id) {
                    ModelSH.servDatas[self.info.yj].datas[i].xiLianNum += count;
                }
            }
        }
    };
    VSHJXPeiyang.prototype.onShown = function () {
        var self = this;
        self.info = self._args;
        self.onUpdate();
        GGlobal.modelSHJX.listen(ModelSH.msg_xilian, self.onUpdate, self);
        GGlobal.modelSHJX.listen(ModelSH.msg_lock, self.onUpdate, self);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.updateCost, this);
        GGlobal.modelSHJX.listen(ModelSH.msg_yijianxilian, self.yijianxilianResult, self);
        // self.starLb.addClickListener(self.openTips, self);
        self.txtShuoMing.addClickListener(self.openShuoMing, self);
    };
    VSHJXPeiyang.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(self.panelId);
        self.switchMeti(null);
        self.grid2.vo = null;
        GGlobal.modelSHJX.remove(ModelSH.msg_xilian, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_lock, self.onUpdate, self);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.updateCost, this);
        self.txtShuoMing.removeClickListener(self.openShuoMing, self);
        if (self._eff) {
            EffectMgr.instance.removeEff(self._eff);
            self._eff = null;
            EffectMgr.instance.removeEff(self._eff1);
            self._eff1 = null;
        }
    };
    return VSHJXPeiyang;
}(UIModalPanel));
__reflect(VSHJXPeiyang.prototype, "VSHJXPeiyang");
