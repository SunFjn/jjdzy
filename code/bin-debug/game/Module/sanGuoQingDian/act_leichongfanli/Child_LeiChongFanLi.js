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
/**累充返利 */
var Child_LeiChongFanLi = (function (_super) {
    __extends(Child_LeiChongFanLi, _super);
    function Child_LeiChongFanLi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child_LeiChongFanLi.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "Child_LeiChongFanLi"));
    };
    Child_LeiChongFanLi.setExtends = function () {
    };
    Child_LeiChongFanLi.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    Child_LeiChongFanLi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.itemRender;
        self.list.setVirtual();
        self.list.callbackThisObj = self;
        self.currentData = new VO_LeiChongFanLi();
        self.currentValue = 0;
        self.desc.color = 0xffffff;
    };
    /**列表点击事件 */
    Child_LeiChongFanLi.prototype.onListClick = function (evt) {
        var item = evt.itemObject;
        this.setSelected(item.getData());
    };
    /**设置选中的项 */
    Child_LeiChongFanLi.prototype.setSelected = function (data) {
        var item = this.getItem(data.id);
        if (item) {
            this.showSelectedItem(item);
        }
    };
    Child_LeiChongFanLi.prototype.showSelectedItem = function (curItem) {
        this.currentData = curItem.getData();
        this.currentItem.setSelectedState(false);
        curItem.setSelectedState(true);
        this.currentItem = curItem;
        this.setReward(curItem.getData().reward);
        this.setDesc();
        this.upGrad.noticeImg.visible = this.currentData.state == 1;
    };
    /**根据id 获得选中的项 */
    Child_LeiChongFanLi.prototype.getItem = function (id) {
        var arr = this.list._children;
        for (var i = 0; i < arr.length; ++i) {
            var item = arr[i];
            if (item.getData().id == id) {
                return item;
            }
        }
        return null;
    };
    Child_LeiChongFanLi.prototype.itemRender = function (index, item) {
        item.setData(this.VOdata[index]);
    };
    Child_LeiChongFanLi.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        self.initGrid();
        self.startTime();
        self.list.numItems = 0;
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onListClick, self);
        GGlobal.control.listen(Enum_MsgType.LEICHONGFANLI, self.setList, self);
        GGlobal.control.listen(Enum_MsgType.LEICHONGFANLIReward, self.refreshPanel, self);
        self.upGrad.addClickListener(self.onClickUpgrad, self);
        GGlobal.modelActivity.CG_OPENACT(UIConst.LEICHONGFANLI);
        IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "LeiChongBack.png");
        IconUtil.setImg(self.rewardBackImg, Enum_Path.BACK_URL + "leichongFanliBack.png");
    };
    /**领取奖励后刷新当前页 */
    Child_LeiChongFanLi.prototype.refreshPanel = function (arg) {
        var id = arg.id;
        var index = 0;
        for (var i = 0; i < this.VOdata.length; ++i) {
            var temp = this.VOdata[i];
            if (id == temp.id) {
                temp.state = 2;
                index = i;
                break;
            }
        }
        this.VOdata.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
        this.list.numItems = this.VOdata.length;
        for (var i = 0; i < this.VOdata.length; ++i) {
            var state = this.VOdata[i].state == 1;
            GGlobal.reddot.setCondition(UIConst.LEICHONGFANLI, 0, state);
            if (state) {
                break;
            }
        }
        GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);
        GGlobal.control.notify(Enum_MsgType.ACTIVITY_ACTOPENSTATE);
        this.setSelected(index == this.VOdata.length - 1 ? this.VOdata[0] : this.VOdata[index]);
    };
    /**点击领取 */
    Child_LeiChongFanLi.prototype.onClickUpgrad = function () {
        if (this.currentData.state == 1) {
            GGlobal.modelSGQD.CGGET4931(this.currentData.id);
        }
        else if (this.currentData.state == 0) {
            GGlobal.layerMgr.open(UIConst.CHONGZHI);
        }
        else if (this.currentData.state == 2) {
            ViewCommonWarn.text("您已领取奖励");
        }
    };
    /**设置列表 */
    Child_LeiChongFanLi.prototype.setList = function (arg) {
        this.VOdata = arg.data;
        //this.VOdata = GGlobal.modelSGQD.LeiChongFanLiCfg;
        this.currentValue = arg.currentValue;
        this.VOdata.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
        var id = 0;
        var temp;
        var isFind = false;
        for (var i = 0; i < this.VOdata.length; i++) {
            temp = this.VOdata[i];
            if (temp.state == 1) {
                this.currentData = temp;
                id = temp.id;
                this.setReward(temp.reward);
                isFind = true;
                break;
            }
            else if (this.currentValue <= temp.lj) {
                this.currentData = temp;
                id = temp.id;
                this.setReward(temp.reward);
                isFind = true;
                break;
            }
        }
        if (temp && !isFind) {
            temp = this.VOdata[0];
            this.currentData = temp;
            id = temp.id;
            this.setReward(temp.reward);
        }
        this.list.numItems = this.VOdata.length;
        var arr = this.list._children;
        for (var i = 0; i < arr.length; ++i) {
            var temp_1 = arr[i];
            if (temp_1.getData().id == id) {
                temp_1.setSelectedState(true);
                this.currentItem = temp_1;
                break;
            }
        }
        this.setDesc();
        this.upGrad.noticeImg.visible = this.currentData.state == 1;
    };
    Child_LeiChongFanLi.prototype.closePanel = function () {
        var self = this;
        self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.onListClick, self);
        Timer.instance.remove(self.timeHandler, self);
        GGlobal.control.remove(Enum_MsgType.LEICHONGFANLI, self.setList, self);
        GGlobal.control.remove(Enum_MsgType.LEICHONGFANLIReward, self.refreshPanel, self);
        self.upGrad.removeClickListener(self.onClickUpgrad, self);
        var len = self.gridArr.length;
        for (var i = 0; i < len; ++i) {
            self.gridArr[i].tipEnabled = false;
            self.gridArr[i].isShowEff = false;
        }
        self.gridArr = [];
        self.VOdata = [];
        self.list.numItems = 0;
        IconUtil.setImg(self.backImg, null);
        IconUtil.setImg(self.rewardBackImg, null);
    };
    /**设置奖励的显示 */
    Child_LeiChongFanLi.prototype.setReward = function (data) {
        var rewardItem = ConfigHelp.makeItemListArr(JSON.parse(data));
        if (rewardItem) {
            for (var i = 0; i < rewardItem.length; ++i) {
                this.gridArr[i].tipEnabled = true;
                this.gridArr[i].isShowEff = true;
                this.gridArr[i].vo = rewardItem[i];
            }
        }
    };
    Child_LeiChongFanLi.prototype.initGrid = function () {
        this.gridArr = [];
        for (var i = 0; i < 6; ++i) {
            this.gridArr[i] = this["grid" + i];
        }
    };
    Child_LeiChongFanLi.prototype.setDesc = function () {
        this.ylq.visible = false;
        this.upGrad.visible = true;
        if (this.currentData.lj <= this.currentValue) {
            this.desc.text = "已充值[color=#00ff00]" + this.currentValue + "[/color]元";
            if (this.currentData.state == 1) {
                this.upGrad.text = "领取";
            }
            else if (this.currentData.state == 2) {
                this.ylq.visible = true;
                this.upGrad.visible = false;
            }
        }
        else {
            this.desc.text = "已充值[color=#ff0000]" + this.currentValue + "[/color]元";
            this.upGrad.text = "前往充值";
        }
        this.lbTitle.text = this.currentData.tips;
    };
    Child_LeiChongFanLi.prototype.startTime = function () {
        var self = this;
        var vo = self.vo;
        self.times = vo.getSurTime();
        self.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.times);
        if (self.times > 0) {
            Timer.instance.listen(self.timeHandler, self, 1000);
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    Child_LeiChongFanLi.prototype.timeHandler = function () {
        var s = this;
        s.times--;
        s.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        if (s.times <= 0) {
            Timer.instance.remove(s.timeHandler, s);
        }
    };
    Child_LeiChongFanLi.pkg = "sanGuoQingDian";
    Child_LeiChongFanLi.URL = "ui://kdt501v2mq0c1i";
    return Child_LeiChongFanLi;
}(fairygui.GComponent));
__reflect(Child_LeiChongFanLi.prototype, "Child_LeiChongFanLi", ["IPanel"]);
