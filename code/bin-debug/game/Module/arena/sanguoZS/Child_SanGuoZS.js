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
var Child_SanGuoZS = (function (_super) {
    __extends(Child_SanGuoZS, _super);
    function Child_SanGuoZS() {
        return _super.call(this) || this;
    }
    Child_SanGuoZS.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "Child_SanGuoZS"));
    };
    Child_SanGuoZS.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_SanGuoZS.prototype.openPanel = function (pData) {
        this.show(pData);
    };
    Child_SanGuoZS.prototype.closePanel = function (pData) {
        this.clean();
    };
    Child_SanGuoZS.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandle;
        self.tfDes.text = "VIP" + Config.xtcs_004[1005].num + "开启扫荡";
        self.listBt.addClickListener(self.openRankHandler, self);
        self.addBt.addClickListener(self.buyHandle, self);
        self.resBt.addClickListener(self.resHandle, self);
        self.boxImg.addClickListener(self.boxHandle, self);
        self.shopBt.addClickListener(self.shopHandle, self);
        self.groupItem.visible = false;
    };
    Child_SanGuoZS.prototype.shopHandle = function () {
        GGlobal.layerMgr.open(UIConst.SANGUO_ZHANSHEN_BZ);
    };
    Child_SanGuoZS.prototype.boxHandle = function () {
        GGlobal.layerMgr.open(UIConst.SANGUO_ZHANSHEN_REWARD);
    };
    Child_SanGuoZS.prototype.openRankHandler = function () {
        GGlobal.layerMgr.open(UIConst.RANK, 3);
    };
    Child_SanGuoZS.prototype.resHandle = function () {
        GGlobal.modelsgzs.CG_RESENEMY_SANGUO_ZHANSHEN();
    };
    Child_SanGuoZS.prototype.buyHandle = function () {
        SanGuoZSItem.buyHandle();
        // 	// if (Model_SGZS.battleNum >= 5) {
        // 	// 	ViewCommonWarn.text("挑战次数已达上限");
        // 	// 	return;
        // 	// }
        // 	if (Model_SGZS.buyNum <= 0) {
        // 		ViewCommonWarn.text("已达购买上限");
        // 		return;
        // 	}
        // 	// let buyMax = Config.xtcs_004[1003].num + Config.VIP_710[Model_player.voMine.viplv + 1].JJCBUYNUM;
        // 	let costNum = Config.xtcs_004[1006].num;
        // 	ViewAlertBuy.show(costNum, Model_SGZS.buyNum, Model_SGZS.buyNum, "", Handler.create(null, this.okHandle));
        // 	// ViewAlert.show("是否花费" + HtmlUtil.fontNoSize("100元宝", Color.getColorStr(2)) + "购买1次挑战次数？\n今日剩余购买次数" +
        // 	// 	HtmlUtil.fontNoSize("(" + Model_SGZS.buyNum + "/" + buyMax + ")", Color.getColorStr(2)), Handler.create(this, this.okHandle));
    };
    // private okHandle(count): void {
    // 	let costNum = Config.xtcs_004[1006].num;
    // 	if (Model_player.voMine.yuanbao < costNum * count) {
    // 		ModelChongZhi.guideToRecharge();
    // 		return;
    // 	}
    // 	GGlobal.modelsgzs.CG_BUYNUM_SANGUO_ZHANSHEN(count);
    // }
    Child_SanGuoZS.prototype.renderHandle = function (index, obj) {
        var item = obj;
        // if (index % 2 == 0) {
        // 	item.x = 260;
        // }
        item.vo = this._listData[index];
    };
    Child_SanGuoZS.prototype.updateShow = function () {
        //头像
        var s = this;
        var headPic = Config.shezhi_707[Model_Setting.headId];
        var framePic = Config.shezhi_707[Model_Setting.frameId];
        // ImageLoader.instance.loader(Enum_Path.HEAD_URL + headPic.picture + ".png", this.headImg);
        // ImageLoader.instance.loader(Enum_Path.HEAD_URL + framePic.picture + ".png", this.frameImg);
        IconUtil.setImg(this.headImg, Enum_Path.HEAD_URL + headPic.picture + ".png");
        IconUtil.setImg(this.frameImg, Enum_Path.HEAD_URL + framePic.picture + ".png");
        this.roleLb.text = HtmlUtil.fontNoSize("排名：", Color.getColorStr(5)) + Model_SGZS.myRank + "\n" + HtmlUtil.fontNoSize("名字：", Color.getColorStr(5))
            + Model_player.voMine.name + "\n" + HtmlUtil.fontNoSize("战力：", Color.getColorStr(5)) + Model_player.voMine.str;
        this.battleLb.text = "挑战次数：" + Model_SGZS.battleNum + "/5";
        s.addBt.visible = true;
        s.battleLb.visible = true;
        this.groupItem.visible = false;
        if (Model_SGZS.battleNum == 0) {
            var itemvo = VoItem.create(Model_SGZS.ITEM_ID);
            var itemCount = Model_Bag.getItemCount(Model_SGZS.ITEM_ID);
            if (itemCount > 0) {
                s.groupItem.visible = true;
                s.battleLb.visible = false;
                s.addBt.visible = false;
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemvo.icon + ".png", s.iconItem);
                s.lbItemCount.text = itemvo.name + "：      <font color='#15f234'>" + itemCount + "/1</font>";
            }
        }
        this._listData = [];
        for (var i = 0; i < Model_SGZS.roleVoArr.length; i++) {
            var v = Model_SGZS.roleVoArr[i];
            if (v.rank == 1) {
                this.pre0.vo = v;
            }
            else if (v.rank == 2) {
                this.pre1.vo = v;
            }
            else if (v.rank == 3) {
                this.pre2.vo = v;
            }
            else {
                this._listData.push(v);
            }
        }
        if (!this.pre0.vo) {
            this.pre0.vo = null;
        }
        if (!this.pre1.vo) {
            this.pre1.vo = null;
        }
        if (!this.pre2.vo) {
            this.pre2.vo = null;
        }
        this.list.numItems = this._listData.length;
        if (this.list.numItems > 0) {
            this.list.scrollToView(this.list.numItems - 1, false, true);
        }
        this.tfDes.visible = Config.VIP_710[Model_player.voMine.viplv + 1].SAODANGJJC != 1;
        if (!Model_SGZS.isFirstOpenBZ) {
            this.shopBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.SANGUO_ZHANSHEN, 1);
        }
        else {
            var index = 0;
            for (var i = 0; i < Model_SGZS.shopArr.length; i++) {
                var cfg = Model_SGZS.shopArr[i];
                if (Model_SGZS.buyShopArr.indexOf(cfg.id) != -1) {
                }
                else {
                    if (Model_SGZS.lastRank <= cfg.time) {
                        index++;
                    }
                }
            }
            this.shopBt.checkNotice = index > 0;
        }
        if (this.guideHandler) {
            this.guideHandler.run();
            this.guideHandler = null;
        }
    };
    Child_SanGuoZS.prototype.timeHandle = function () {
        Model_SGZS.coolTime--;
        this.timeLb.text = DateUtil.getHMSBySecond2(Model_SGZS.coolTime) + "后恢复1次";
        if (Model_SGZS.coolTime <= 0) {
            Model_SGZS.battleNum++;
            this.battleLb.text = "挑战次数：" + Model_SGZS.battleNum + "/5";
            if (Model_SGZS.battleNum < 5) {
                Model_SGZS.coolTime = Config.xtcs_004[1004].num;
            }
            else {
                this.timeLb.visible = false;
                Timer.instance.remove(this.timeHandle, this);
            }
        }
    };
    Child_SanGuoZS.prototype.updateNotice = function () {
        if (!Model_SGZS.isFirstOpenBZ) {
            this.shopBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.SANGUO_ZHANSHEN, 1);
        }
        else {
            var index = 0;
            for (var i = 0; i < Model_SGZS.shopArr.length; i++) {
                var cfg = Model_SGZS.shopArr[i];
                if (Model_SGZS.buyShopArr.indexOf(cfg.id) != -1) {
                }
                else {
                    if (Model_SGZS.lastRank <= cfg.time) {
                        index++;
                    }
                }
            }
            this.shopBt.checkNotice = index > 0;
        }
    };
    Child_SanGuoZS.prototype.updateTime = function () {
        this.battleLb.text = "挑战次数：" + Model_SGZS.battleNum + "/5";
        if (Model_SGZS.coolTime > 0) {
            this.timeLb.visible = true;
            this.timeLb.text = DateUtil.getHMSBySecond2(Model_SGZS.coolTime) + "后恢复1次";
            if (!Timer.instance.has(this.timeHandle, this)) {
                Timer.instance.listen(this.timeHandle, this, 1000);
            }
        }
        else {
            this.timeLb.visible = false;
            Timer.instance.remove(this.timeHandle, this);
        }
        GGlobal.reddot.setCondition(UIConst.SANGUO_ZHANSHEN, 0, Model_SGZS.battleNum > 0);
        GGlobal.reddot.notifyMsg(UIConst.SANGUO_ZHANSHEN);
    };
    Child_SanGuoZS.prototype.show = function (pData) {
        var a = this;
        GGlobal.modelsgzs.CG_OPEN_SANGUO_ZHANSHEN();
        GGlobal.reddot.listen(UIConst.SANGUO_ZHANSHEN, a.updateNotice, a);
        GGlobal.control.listen(Enum_MsgType.SANGUO_ZHANSHEN_SHOP, a.updateNotice, a);
        GGlobal.control.listen(Enum_MsgType.SANGUO_ZHANSHEN_UPDATE, a.updateShow, a);
        GGlobal.control.listen(Enum_MsgType.SANGUO_ZHANSHEN_TIME, a.updateTime, a);
        this.updateTime();
        IconUtil.setImg1(Enum_Path.BACK_URL + "sgzs1" + ".jpg", this.imgBg);
    };
    Child_SanGuoZS.prototype.clean = function () {
        var a = this;
        IconUtil.setImg1(null, this.imgBg);
        IconUtil.setImg(a.frameImg, null);
        IconUtil.setImg(a.headImg, null);
        GGlobal.control.remove(Enum_MsgType.SANGUO_ZHANSHEN_UPDATE, a.updateShow, a);
        GGlobal.control.remove(Enum_MsgType.SANGUO_ZHANSHEN_TIME, a.updateTime, a);
        GGlobal.reddot.remove(UIConst.SANGUO_ZHANSHEN, a.updateNotice, a);
        GGlobal.control.remove(Enum_MsgType.SANGUO_ZHANSHEN_SHOP, a.updateNotice, a);
        Timer.instance.remove(a.timeHandle, a);
        a.list.numItems = 0;
        a.pre0.clean();
        a.pre1.clean();
        a.pre2.clean();
    };
    Child_SanGuoZS.prototype.setGuide = function (hd) {
        this.guideHandler = hd;
        if (this.list.numItems > 0) {
            if (this.guideHandler) {
                this.guideHandler.run();
                this.guideHandler = null;
            }
        }
    };
    Child_SanGuoZS.prototype.guide_battle = function (step) {
        if (this.list.numItems > 0) {
            var item = this.list._children[this.list.numItems - 1];
            GuideStepManager.instance.showGuide(item.battleBt, item.battleBt.width / 2, item.battleBt.height / 2);
            GuideStepManager.instance.showGuide1(step.source.index, item.battleBt, 0, item.battleBt.height / 2, 180, -250, -35);
            if (item.parent)
                item.parent.setChildIndex(item, item.parent.numChildren - 1);
        }
    };
    //>>>>end
    Child_SanGuoZS.URL = "ui://me1skowlqiai6";
    return Child_SanGuoZS;
}(fairygui.GComponent));
__reflect(Child_SanGuoZS.prototype, "Child_SanGuoZS", ["IPanel"]);
