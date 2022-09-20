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
var Child_ActCom_CZPH = (function (_super) {
    __extends(Child_ActCom_CZPH, _super);
    function Child_ActCom_CZPH() {
        return _super.call(this) || this;
    }
    Child_ActCom_CZPH.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActComCZPH", "Child_ActCom_CZPH"));
    };
    Child_ActCom_CZPH.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list0.callbackThisObj = self;
        self.list0.itemRenderer = self.renderHandler0;
        self.list1.callbackThisObj = self;
        self.list1.itemRenderer = self.renderHandler1;
    };
    Child_ActCom_CZPH.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ActCom_CZPHItem.URL, ActCom_CZPHItem);
        f(ActCom_CZPHRankItem.URL, ActCom_CZPHRankItem);
    };
    Child_ActCom_CZPH.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_ActCom_CZPH.prototype.renderHandler0 = function (index, grid) {
        var self = this;
        grid.isShowEff = true;
        grid.tipEnabled = true;
        grid.vo = self.firstReward[index];
    };
    Child_ActCom_CZPH.prototype.renderHandler1 = function (index, item) {
        var model = GGlobal.modelczph;
        item.setVo(model.czphData[model.qishu - 1][index + 1]);
    };
    Child_ActCom_CZPH.prototype.updateShow = function () {
        var model = GGlobal.modelczph;
        var self = this;
        if (model.czphData.length <= 0)
            model.getCZPHData();
        self.firstReward = ConfigHelp.makeItemListArr(model.czphData[model.qishu - 1][0].tips);
        self.list0.numItems = self.firstReward.length;
        self.list1.numItems = model.czphData[model.qishu - 1].length - 1;
        self.nameLb.text = model.rankArr[0][1] + "";
        if (model.myRank > model.rankArr.length || model.myRank == 0) {
            self.rankLb.setVar("rank", "未上榜").flushVars();
        }
        else {
            self.rankLb.setVar("rank", model.myRank + "").flushVars();
        }
        self.moneyLb.setVar("money", model.myMoney + "元宝").flushVars();
        if (model.firstJob > 0) {
            if (Config.sz_739[model.firstJob]) {
                var mx = Config.sz_739[model.firstJob].moxing;
                self.role.setBody(mx);
                self.role.setWeapon(model.firstJob);
            }
            else {
                self.role.setBody(model.firstJob);
                self.role.setWeapon(model.firstJob);
            }
            self.role.setGodWeapon(model.firstGodWeapon);
            self.role.setHorseId(model.firstHorseId);
            if (model.firstHorseId) {
                self.role.setScaleXY(0.8, 0.8);
            }
            else {
                self.role.setScaleXY(1, 1);
            }
            self.role.onAdd();
        }
    };
    Child_ActCom_CZPH.prototype.timeHandler = function () {
        var self = this;
        if (self.vo.getSurTime() > 0) {
            self.timeLb.text = "活动剩余时间：" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(self.vo.getSurTime()), Color.getColorStr(2));
        }
        else {
            self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    Child_ActCom_CZPH.prototype.onLink = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.ACTCOM_CZPH_RANK);
    };
    Child_ActCom_CZPH.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        self.promptLb.setVar("money", Config.xtcs_004[7008].num + "元宝").flushVars();
        if (pData.getSurTime() > 0) {
            self.timeLb.text = "活动剩余时间：" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(pData.getSurTime()), Color.getColorStr(2));
            Timer.instance.listen(self.timeHandler, self, 1000);
        }
        else {
            self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
        }
        if (!self.role) {
            self.role = UIRole.create();
            self.role.setScaleXY(1, 1);
            self.role.setPos(self.roleBackImg.width / 2, self.roleBackImg.height / 2 + 20);
            self.role.view.touchEnabled = self.role.view.touchChildren = false;
            self.role.uiparent = self.roleBackImg.displayObject;
        }
        IconUtil.setImg(self.roleBackImg, Enum_Path.ACTCOM_URL + UIConst.ACTCOM_CZPH + ".jpg");
        IconUtil.setImg(self.rankBackImg, Enum_Path.ACTCOM_URL + "720901.png");
        self.linkLb.addClickListener(self.onLink, self);
        GGlobal.control.listen(UIConst.ACTCOM_CZPH, self.updateShow, self);
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_CZPH);
    };
    Child_ActCom_CZPH.prototype.closePanel = function (pData) {
        var self = this;
        self.list0.numItems = 0;
        self.list1.numItems = 0;
        if (self.role) {
            self.role.onRemove();
            self.role = null;
        }
        Timer.instance.remove(self.timeHandler, self);
        IconUtil.setImg(self.roleBackImg, null);
        IconUtil.setImg(self.rankBackImg, null);
        self.linkLb.removeClickListener(self.onLink, self);
        GGlobal.control.remove(UIConst.ACTCOM_CZPH, self.updateShow, self);
    };
    Child_ActCom_CZPH.URL = "ui://q5asybs1k1rz4";
    Child_ActCom_CZPH.pkg = "ActComCZPH";
    return Child_ActCom_CZPH;
}(fairygui.GComponent));
__reflect(Child_ActCom_CZPH.prototype, "Child_ActCom_CZPH", ["IPanel"]);
