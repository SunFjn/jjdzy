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
var Child_XSXS = (function (_super) {
    __extends(Child_XSXS, _super);
    function Child_XSXS() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        _this.gridArr1 = [];
        _this.surNum = 0;
        _this.rewardID = 0;
        _this._st = 0;
        _this._lastTime = 0;
        return _this;
    }
    Child_XSXS.createInstance = function () {
        return (fairygui.UIPackage.createObject("YiShouLu", "Child_XSXS"));
    };
    Child_XSXS.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_XSXS.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        for (var i = 0; i < 10; i++) {
            var grid = self["grid" + i];
            grid.data = i + 1;
            grid.text = Config.xsxs_283[i + 1].name;
            self.gridArr.push(grid);
            if (i < 3) {
                self.gridArr1.push(self["grid0" + i]);
            }
        }
        var costArr = JSON.parse(Config.xsxsreward_283[1].conmuse);
        self.promptLb.setVar("money", costArr[0][2] + "元宝").flushVars();
    };
    Child_XSXS.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelxsxs;
        self.surNum = 0;
        var expArr = [0, 300, 700, 1000];
        var jifenArr = [0];
        for (var i = 0; i < self.gridArr.length; i++) {
            if (model.xunShouData[i + 1]) {
                self.gridArr[i].setVo(model.xunShouData[i + 1]);
                self.gridArr[i].removeClickListener(self.onGrid, self);
            }
            else {
                self.surNum++;
                self.gridArr[i].setVo(null);
                self.gridArr[i].addClickListener(self.onGrid, self);
            }
            if (i < self.gridArr1.length) {
                var cfg = Config.xsxspoint_283[i + 1];
                jifenArr.push(cfg.point);
                self.gridArr1[i].setVo(cfg);
                self.gridArr1[i].addClickListener(self.onDraw, self);
            }
        }
        var count = Model_Bag.getItemCount(model.itemID);
        var itemVo = VoItem.create(model.itemID);
        self.resourceLb.setImgUrl(itemVo.icon);
        self.resourceLb.setCount(count);
        self.resourceLb.setType(1);
        if (self.surNum <= 0) {
            self.resetBt.visible = true;
            self.costLb.visible = self.costGrid.visible = self.keyBt.visible = false;
        }
        else {
            self.resetBt.visible = false;
            self.costLb.visible = self.costGrid.visible = self.keyBt.visible = true;
            if (count >= self.surNum) {
                self.costLb.text = count + "";
                self.costGrid.vo = itemVo;
                self.keyBt.checkNotice = true;
                self.costLb.color = Color.getColorInt(1);
            }
            else {
                self.keyBt.checkNotice = false;
                var costArr = ConfigHelp.makeItemListArr(JSON.parse(Config.xsxsreward_283[1].conmuse));
                self.costGrid.vo = costArr[0];
                self.costLb.text = (costArr[0].count * self.surNum) + "";
                if (Model_player.voMine.yuanbao >= costArr[0].count * self.surNum) {
                    self.costLb.color = Color.getColorInt(1);
                }
                else {
                    self.costLb.color = Color.getColorInt(6);
                }
            }
        }
        var curExp = 0;
        if (model.jifen >= jifenArr[jifenArr.length - 1]) {
            curExp = expArr[expArr.length - 1];
        }
        else {
            for (var i = 0; i < jifenArr.length; i++) {
                if (model.jifen < jifenArr[i]) {
                    curExp = expArr[i - 1] + (expArr[i] - expArr[i - 1]) / (jifenArr[i] - jifenArr[i - 1]) * (model.jifen - jifenArr[i - 1]);
                    break;
                }
            }
        }
        self.expBar.value = curExp;
        self.expBar.max = expArr[expArr.length - 1];
        self.expBar._titleObject.text = model.jifen + "/" + jifenArr[jifenArr.length - 1];
    };
    Child_XSXS.prototype.drawCallFun = function () {
        GGlobal.modelxsxs.CG_SearchAnimals_getAward_8765(this.rewardID);
    };
    Child_XSXS.prototype.onDraw = function (evt) {
        var self = this;
        var model = GGlobal.modelxsxs;
        var grid = evt.target;
        var cfg = grid.vo;
        var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.rewardID = cfg.id;
        View_Reward_Show3.show(arr, model.rewardData[cfg.id], model.rewardData[cfg.id], Handler.create(self, self.drawCallFun));
    };
    Child_XSXS.prototype.onGrid = function (evt) {
        var model = GGlobal.modelxsxs;
        var grid = evt.target;
        var count = Model_Bag.getItemCount(model.itemID);
        if (count > 0 || ConfigHelp.checkEnough(Config.xsxsreward_283[1].conmuse, false)) {
            model.CG_SearchAnimals_search_8763(grid.data);
        }
        else {
            ModelChongZhi.guideToRecharge();
        }
    };
    Child_XSXS.prototype.showEff = function (idArr) {
        var self = this;
        var arr = [];
        for (var i = 0; i < idArr.length; i++) {
            arr.push(self.gridArr[idArr[i] - 1].grid);
        }
        AnimationUtil.gridToBag(arr, null, 1000);
    };
    Child_XSXS.prototype.updateReward = function () {
        var self = this;
        var model = GGlobal.modelxsxs;
        var cfg = self.gridArr1[self.rewardID - 1].vo;
        var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        View_Reward_Show3.show(arr, model.rewardData[cfg.id], model.rewardData[cfg.id], Handler.create(self, self.drawCallFun));
    };
    Child_XSXS.prototype.keyHandler = function () {
        var self = this;
        var model = GGlobal.modelxsxs;
        var count = Model_Bag.getItemCount(model.itemID);
        if (count >= self.surNum) {
            model.CG_SearchAnimals_search_8763(0);
        }
        else {
            var costArr = ConfigHelp.makeItemListArr(JSON.parse(Config.xsxsreward_283[1].conmuse));
            if (Model_player.voMine.yuanbao >= costArr[0].count * self.surNum) {
                model.CG_SearchAnimals_search_8763(0);
            }
            else {
                ModelChongZhi.guideToRecharge();
            }
        }
    };
    Child_XSXS.prototype.onReset = function () {
        GGlobal.modelxsxs.CG_XIANSHAN_XUNSHOU_RESET();
    };
    Child_XSXS.prototype.randomEff = function () {
        var self = this;
        var st = 0;
        var now = egret.getTimer();
        if (self.surNum > 0) {
            if (this._st == 0) {
                if (now - 2000 > self._lastTime) {
                    st = 1;
                    self._lastTime = now;
                }
                else {
                    st = 0;
                }
            }
            else {
                if (now - 3000 > self._lastTime) {
                    st = 0;
                    self._lastTime = now;
                }
                else {
                    st = 1;
                }
            }
        }
        else {
            st = 0;
        }
        self.setTip(st);
    };
    Child_XSXS.prototype.setTip = function (val) {
        var self = this;
        if (self._st == val)
            return;
        self._st = val;
        if (val == 0) {
            self.randomGroup.visible = false;
        }
        else if (val == 1) {
            self.findNewPos();
        }
    };
    Child_XSXS.prototype.findNewPos = function () {
        var self = this;
        var model = GGlobal.modelxsxs;
        var countArr = [];
        for (var i = 0; i < self.gridArr.length; i++) {
            if (!model.xunShouData[i + 1]) {
                countArr.push(self.gridArr[i]);
            }
        }
        if (countArr.length <= 0) {
            self.randomGroup.visible = false;
        }
        else {
            self.randomGroup.visible = true;
            var count = Math.floor(Math.random() * countArr.length);
            self.randomGroup.visible = true;
            self.randomGroup.setXY(countArr[count].x + 47, countArr[count].y - 45);
        }
    };
    Child_XSXS.prototype.openPanel = function (pData) {
        var self = this;
        if (Model_SearchAnimals.hasData) {
            self.updateShow();
        }
        else {
            GGlobal.modelxsxs.CG_SearchAnimals_openUI_8761();
        }
        self.randomGroup.visible = false;
        self.keyBt.addClickListener(self.keyHandler, self);
        self.resetBt.addClickListener(self.onReset, self);
        IconUtil.setImg(self.backImg, Enum_Path.YISHOULU_URL + "back_7121.jpg");
        Timer.instance.listen(self.randomEff, self, 1000);
        var c = GGlobal.control;
        GGlobal.reddot.listen(UIConst.XIANSHAN_XUNSHOU, self.updateShow, self);
        c.listen(Enum_MsgType.XIANSHAN_XUNSHOU_SHOWEFF, self.showEff, self);
        c.listen(Enum_MsgType.XIANSHAN_XUNSHOU_REWARD, self.updateReward, self);
    };
    Child_XSXS.prototype.closePanel = function (pData) {
        var self = this;
        IconUtil.setImg(self.backImg, null);
        for (var i = 0; i < self.gridArr.length; i++) {
            self.gridArr[i].clean();
            self.gridArr[i].removeClickListener(self.onGrid, self);
            if (i < self.gridArr1.length) {
                self.gridArr1[i].clean();
                self.gridArr1[i].removeClickListener(self.onDraw, self);
            }
        }
        Timer.instance.remove(self.randomEff, self);
        self.resetBt.removeClickListener(self.onReset, self);
        self.keyBt.removeClickListener(self.keyHandler, self);
        var c = GGlobal.control;
        GGlobal.reddot.remove(UIConst.XIANSHAN_XUNSHOU, self.updateShow, self);
        c.remove(Enum_MsgType.XIANSHAN_XUNSHOU_SHOWEFF, self.showEff, self);
        c.remove(Enum_MsgType.XIANSHAN_XUNSHOU_REWARD, self.updateReward, self);
    };
    Child_XSXS.URL = "ui://7y83phvndsdyo";
    return Child_XSXS;
}(fairygui.GComponent));
__reflect(Child_XSXS.prototype, "Child_XSXS", ["IPanel"]);
