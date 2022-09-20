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
var Child_Peacock = (function (_super) {
    __extends(Child_Peacock, _super);
    function Child_Peacock() {
        return _super.call(this) || this;
    }
    Child_Peacock.createInstance = function () {
        return (fairygui.UIPackage.createObject("FuBen", "Child_Peacock"));
    };
    Child_Peacock.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_Peacock.prototype.openPanel = function (pData) {
        this.addListen();
        this.update();
    };
    Child_Peacock.prototype.closePanel = function (pData) {
        this.removeListen();
    };
    Child_Peacock.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.listDrop.itemRenderer = this.renderHandle;
        this.listDrop.callbackThisObj = this;
        this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    Child_Peacock.prototype.onAdd = function () {
        // ImageLoader.instance.loader(Enum_Path.BACK_URL + "bg3.jpg", this.imgBg);
        IconUtil.setImg(this.imgBg, Enum_Path.BACK_URL + "bg3.jpg");
    };
    Child_Peacock.prototype.onRemove = function () {
        IconUtil.setImg(this.imgBg, null);
    };
    Child_Peacock.prototype.addListen = function () {
        this.btnRank.addClickListener(this.onRank, this);
        this.btnChallenge.addClickListener(this.onChallenge, this);
        this.btnGetReward.addClickListener(this.onGetReward, this);
        GGlobal.control.listen(Enum_MsgType.PEACOCK_PASSLAYER_NUM, this.showNumReward1, this);
    };
    Child_Peacock.prototype.removeListen = function () {
        this.btnRank.removeClickListener(this.onRank, this);
        this.btnChallenge.removeClickListener(this.onChallenge, this);
        this.btnGetReward.removeClickListener(this.onGetReward, this);
        GGlobal.control.remove(Enum_MsgType.PEACOCK_PASSLAYER_NUM, this.showNumReward1, this);
        this.layer1.removeListen();
        this.layer2.removeListen();
        this.layer3.removeListen();
        this.listDrop.numItems = 0;
        this.gridBigReward.clean();
    };
    Child_Peacock.prototype.update = function () {
        var curLayer = Model_Peacock.curLayer + 1;
        this.labMaxLayer.text = "通关:" + (Model_Peacock.maxLayer ? Model_Peacock.maxLayer : "0") + "层";
        this.labMaxName.text = Model_Peacock.maxName ? Model_Peacock.maxName : "";
        this.viewHead.setdata(Model_Peacock.maxHead, -1, null, -1, false, Model_Peacock.maxFrame);
        // this.labUltimateName.text = "极限通关：[color=#ffffff]" + (Model_Peacock.ultimateName == "" ? "" : Model_Peacock.ultimateName) + "[/color]";
        // this.labUltimatePower.text = "通关战力：[color=#ffffff]" + (Model_Peacock.ultimatePower == 0 ? "" : Model_Peacock.ultimatePower) + "[/color]";
        //大奖
        var bigLayer = 0;
        var bigReward = "";
        var bigPower = 0;
        for (var i = curLayer - 1; i < Model_Peacock.towerArr.length; i++) {
            var tower_1 = Model_Peacock.towerArr[i];
            if (tower_1.reward != "0") {
                bigLayer = tower_1.id;
                bigReward = tower_1.reward;
                bigPower = tower_1.power;
                break;
            }
        }
        if (bigReward == "") {
            for (var i = curLayer - 1; i >= 0; i--) {
                var tower_2 = Model_Peacock.towerArr[i];
                if (tower_2 && tower_2.reward != "0") {
                    bigLayer = tower_2.id;
                    bigReward = tower_2.reward;
                    bigPower = tower_2.power;
                    break;
                }
            }
        }
        if (bigReward == "") {
            this.labBigReward.text = "";
            this.gridBigReward.visible = this.gridBigReward.touchable = false;
            this.labBigPower.text = "";
        }
        else {
            this.labBigReward.text = bigLayer + "层大奖";
            this.gridBigReward.visible = this.gridBigReward.touchable = true;
            this.gridBigReward.tipEnabled = true;
            this.gridBigReward.vo = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(bigReward))[0];
            if (bigPower == 0) {
                this.labBigPower.text = "战力飙升";
            }
            else {
                this.labBigPower.text = "战力+" + bigPower;
            }
        }
        //小奖
        this.showNumReward1();
        //每层奖励
        var tower = Config.tower_219[curLayer];
        if (tower) {
            this.labCurLayer.text = "当前关卡：" + curLayer + "层";
            this.labReachMax.text = "";
            this.btnChallenge.touchable = this.btnChallenge.visible = true;
        }
        else {
            tower = Config.tower_219[curLayer - 1];
            this.labCurLayer.text = "当前关卡：" + (curLayer - 1) + "层";
            this.labReachMax.text = "已通关";
            this.btnChallenge.touchable = this.btnChallenge.visible = false;
        }
        if (tower) {
            this._dropReward = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(tower.reward2));
            this.listDrop.numItems = this._dropReward.length;
        }
        else {
            this.listDrop.numItems = 0;
        }
        var lay;
        if (curLayer == 1) {
            lay = 2;
        }
        else if (Config.tower_219[curLayer] == null) {
            lay = curLayer - 2;
        }
        else if (Config.tower_219[curLayer + 1] == null) {
            lay = curLayer - 1;
        }
        else {
            lay = curLayer;
        }
        this.layer1.vo = lay - 1;
        this.layer2.vo = lay;
        this.layer3.vo = lay + 1;
    };
    Child_Peacock.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.vo = this._dropReward[index];
        item.tipEnabled = true;
    };
    Child_Peacock.prototype.onRank = function () {
        GGlobal.layerMgr.open(UIConst.RANK, 2);
    };
    Child_Peacock.prototype.onChallenge = function () {
        GGlobal.modelPeacock.CG_UPTOWER();
    };
    Child_Peacock.prototype.onGetReward = function () {
        GGlobal.layerMgr.open(UIConst.PEACOCK_REWARD, this._layerReward1);
    };
    Child_Peacock.prototype.showNumReward1 = function () {
        var curLayer = Model_Peacock.curLayer + 1;
        //小奖
        this._layerReward1 = 0;
        var reward1 = "";
        var people1 = 0;
        var peoplePass = 0;
        if (Model_Peacock.rewLayerArr.length > 0) {
            this._layerReward1 = Model_Peacock.rewLayerArr[0];
            peoplePass = Model_Peacock.rewPeopleObj[this._layerReward1];
            people1 = Config.tower_219[this._layerReward1].num;
            reward1 = Config.tower_219[this._layerReward1].reward1;
        }
        else {
            for (var i = curLayer - 1; i < Model_Peacock.towerArr.length; i++) {
                var tower = Model_Peacock.towerArr[i];
                if (tower.reward1 != "0") {
                    this._layerReward1 = tower.id;
                    reward1 = tower.reward1;
                    people1 = tower.num;
                    peoplePass = Model_Peacock.rewPeopleObj[this._layerReward1];
                    if (peoplePass == null) {
                        GGlobal.modelPeacock.CG_GETNUM(this._layerReward1);
                        peoplePass = 0;
                    }
                    break;
                }
            }
        }
        if (this._layerReward1 == 0) {
            this.btnGetReward.visible = this.btnGetReward.touchable = false;
            this.labReward.text = "";
            this.labRewardPeople.text = "";
        }
        else {
            this.btnGetReward.visible = this.btnGetReward.touchable = true;
            this.labReward.text = this._layerReward1 + "层奖励";
            this.labRewardPeople.text = "前" + people1 + "双倍领取\n已通过：[color=#0ef619]" + peoplePass + "[/color]人";
            this.btnGetReward.checkNotice = Model_Peacock.curLayer >= this._layerReward1;
        }
    };
    Child_Peacock.prototype.guide_peacock_battle = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.btnChallenge, self.btnChallenge.width / 2, self.btnChallenge.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.btnChallenge, self.btnChallenge.width / 2, 0, -90, -106, -100);
        if (self.btnChallenge.parent)
            self.btnChallenge.parent.setChildIndex(self.btnChallenge, self.btnChallenge.parent.numChildren - 1);
    };
    //>>>>end
    Child_Peacock.URL = "ui://pkuzcu87hjjz3";
    return Child_Peacock;
}(fairygui.GComponent));
__reflect(Child_Peacock.prototype, "Child_Peacock", ["IPanel"]);
