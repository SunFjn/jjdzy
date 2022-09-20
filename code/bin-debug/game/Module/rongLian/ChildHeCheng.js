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
var ChildHeCheng = (function (_super) {
    __extends(ChildHeCheng, _super);
    function ChildHeCheng() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        return _this;
    }
    ChildHeCheng.createInstance = function () {
        return (fairygui.UIPackage.createObject("rongLian", "ChildHeCheng"));
    };
    ChildHeCheng.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildHeCheng.prototype.openPanel = function (pData) {
        this.addListen();
        this.update();
    };
    ChildHeCheng.prototype.closePanel = function (pData) {
        this.removeListen();
    };
    ChildHeCheng.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.list.setVirtual();
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandle;
        this.listCost.callbackThisObj = this;
        this.listCost.itemRenderer = this.renderCost;
        this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.update, this);
        // ImageLoader.instance.loader(Enum_Path.BACK_URL + "hechen.jpg", this.imgBg);
    };
    ChildHeCheng.prototype.addListen = function () {
        // IconUtil.setImg(this.imgBg, Enum_Path.BACK_URL + "hechen.jpg");
        this.list.addEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
        this.btnHe.addClickListener(this.onHeCheng, this);
        this.btnMin.addClickListener(this.onMinCountHandler, this);
        this.btnMax.addClickListener(this.onMaxCountHandler, this);
        this.btnReduce.addClickListener(this.onReduceHandler, this);
        this.btnAdd.addClickListener(this.onAddHandler, this);
        GGlobal.control.listen(Enum_MsgType.HE_CHENG_SUCCESS, this.success, this);
    };
    ChildHeCheng.prototype.removeListen = function () {
        // IconUtil.setImg(this.imgBg, null);
        this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
        this.btnHe.removeClickListener(this.onHeCheng, this);
        this.btnMin.removeClickListener(this.onMinCountHandler, this);
        this.btnMax.removeClickListener(this.onMaxCountHandler, this);
        this.btnReduce.removeClickListener(this.onReduceHandler, this);
        this.btnAdd.removeClickListener(this.onAddHandler, this);
        GGlobal.control.remove(Enum_MsgType.HE_CHENG_SUCCESS, this.success, this);
        this.currentVo = null;
        this.list.numItems = 0;
        this.listCost.numItems = 0;
    };
    ChildHeCheng.prototype.update = function () {
        var arr = Model_RongLian.getHeCheng(this.c1.selectedIndex + 1);
        this.list.numItems = arr.length;
        var index = 0;
        for (var i = 0; i < arr.length; i++) {
            if (Model_RongLian.checkHeChengVo(arr[i])) {
                index = i;
                break;
            }
        }
        this.list.selectedIndex = index;
        this.list.scrollToView(index);
        this.selectdUpdate(Model_RongLian.getHeCheng(this.c1.selectedIndex + 1)[index]);
    };
    ChildHeCheng.prototype.itemClick = function (e) {
        var clickItem = e.itemObject;
        this.selectdUpdate(clickItem.vo);
    };
    ChildHeCheng.prototype.selectdUpdate = function (vo) {
        this._clickVo = vo;
        this.grid.tipEnabled = true;
        this.currentVo = this.grid.vo = Model_RongLian.getHCItem(vo);
        if (vo.itemArr == null) {
            var iArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(vo.item));
            for (var i = 0; i < iArr.length; i++) {
                if (iArr[i] instanceof Vo_Currency) {
                    vo.itemCost = iArr[i];
                    iArr.splice(i, 1);
                    break;
                }
            }
            vo.itemArr = iArr;
        }
        this._costArr = vo.itemArr;
        this.lbCount.text = "1";
        this.count = 1;
        this._consumeCount = vo.itemCost.count;
        this.imgCost.url = CommonManager.getMoneyUrl(vo.itemCost.gType);
        this.upCount();
        this.btnHe.checkNotice = Model_RongLian.checkHeChengVo(vo);
        this.txtVIP.text = "VIP" + vo.vip + "可合成";
        if (Model_player.voMine.viplv < vo.vip) {
            this.txtVIP.visible = true;
            this.imgCost.visible = false;
            this.labCost.visible = false;
        }
        else {
            this.txtVIP.visible = false;
            this.imgCost.visible = true;
            this.labCost.visible = true;
        }
        this.tab0.checkNotice = Model_RongLian.getNotByType(1);
        this.tab1.checkNotice = Model_RongLian.getNotByType(2);
        this.txtTips.text = "";
        var headItem = this._costArr[0];
        if (headItem && headItem.cfg.sys == UIConst.SETTING_HEAD) {
            var headid = parseInt(headItem.cfg.use);
            if (Model_Setting.frameIdArr.indexOf(headid) == -1 && Model_Setting.headIdArr.indexOf(headid) == -1) {
                this.txtTips.text = "你还未激活过该头像或头像框";
            }
        }
    };
    ChildHeCheng.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.vo = Model_RongLian.getHeCheng(this.c1.selectedIndex + 1)[index];
    };
    ChildHeCheng.prototype.renderCost = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.vo = this._costArr[index];
        if (item.vo) {
            var count = item.vo.count * this.count;
            var hasCout = Model_Bag.getItemCount(item.vo.id);
            item.grid.lbNum.text = hasCout + "/" + count;
            item.grid.lbNum.visible = true;
            if (hasCout >= count) {
                item.grid.lbNum.color = Color.GREENINT;
            }
            else {
                item.grid.lbNum.color = Color.REDINT;
            }
        }
    };
    ChildHeCheng.prototype.onMinCountHandler = function (event) {
        if (this.currentVo == null) {
            return;
        }
        this.count -= 10;
        if (this.count < 1) {
            this.count = 1;
        }
        this.upCount();
    };
    ChildHeCheng.prototype.onMaxCountHandler = function (event) {
        if (this.currentVo == null) {
            return;
        }
        this.count += 10;
        if (this.count > Model_Bag.CONST_MAX_MUL_USE_NUM) {
            this.count = Model_Bag.CONST_MAX_MUL_USE_NUM;
        }
        this.upCount();
    };
    ChildHeCheng.prototype.onReduceHandler = function (event) {
        if (this.currentVo == null) {
            return;
        }
        this.count--;
        if (this.count < 1) {
            this.count = 1;
        }
        this.upCount();
    };
    ChildHeCheng.prototype.onAddHandler = function (event) {
        if (this.currentVo == null) {
            return;
        }
        this.count++;
        if (this.count > Model_Bag.CONST_MAX_MUL_USE_NUM) {
            this.count = Model_Bag.CONST_MAX_MUL_USE_NUM;
        }
        this.upCount();
    };
    ChildHeCheng.prototype.upCount = function () {
        this.lbCount.text = "" + this.count;
        this.listCost.numItems = this._costArr.length;
        ;
        this.labCost.text = (this._consumeCount * this.count) + "";
        if (Model_player.voMine.tongbi < this._consumeCount * this.count) {
            this.labCost.color = Color.REDINT;
        }
        else {
            this.labCost.color = Color.GREENINT;
        }
    };
    ChildHeCheng.prototype.onHeCheng = function () {
        if (!this.currentVo) {
            return;
        }
        var CurCount = Model_player.getCurrencyCount(this._clickVo.itemCost.gType);
        if (CurCount < this._consumeCount * this.count) {
            if (this._clickVo.itemCost.gType == Enum_Attr.yuanBao) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            if (this._clickVo.itemCost.gType == Enum_Attr.TONGBI) {
                ViewCommonWarn.text("铜钱不足");
                return;
            }
        }
        var isFull = true;
        for (var i = 0; i < this._costArr.length; i++) {
            var costVo = this._costArr[i];
            var count = costVo.count * this.count;
            var hasCout = Model_Bag.getItemCount(costVo.id);
            if (hasCout < count) {
                isFull = false;
                break;
            }
        }
        if (!isFull) {
            ViewCommonWarn.text("材料不足");
            return;
        }
        if (this.currentVo instanceof VoItem) {
            GGlobal.modelRL.CG_HE_CHENG(this.currentVo.id, this.count);
        }
    };
    ChildHeCheng.prototype.success = function () {
        this.list.numItems = Model_RongLian.getHeCheng(this.c1.selectedIndex + 1).length;
        this.selectdUpdate(this._clickVo);
    };
    //>>>>end
    ChildHeCheng.URL = "ui://ny9kb4yznflud";
    return ChildHeCheng;
}(fairygui.GComponent));
__reflect(ChildHeCheng.prototype, "ChildHeCheng", ["IPanel"]);
