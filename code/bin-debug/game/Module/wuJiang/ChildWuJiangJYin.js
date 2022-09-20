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
var ChildWuJiangJYin = (function (_super) {
    __extends(ChildWuJiangJYin, _super);
    function ChildWuJiangJYin() {
        var _this = _super.call(this) || this;
        _this.needBoo = false; //是否材料足够
        return _this;
    }
    ChildWuJiangJYin.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "ChildWuJiangJYin"));
    };
    ChildWuJiangJYin.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self._gridArr = [self.g0, self.g1, self.g2, self.g3, self.g4, self.g5, self.g6, self.g7, self.g8, self.g9];
        GGlobal.modelEquip.CGGetEquips(3);
    };
    ChildWuJiangJYin.prototype.addEvent = function () {
        var self = this;
        for (var i = 0; i < 10; i++) {
            self._gridArr[i].addClickListener(self.onSelectGrid, self);
        }
        self.btnOperate.addClickListener(self.onBtnHandler, self);
        self.btnDecompose.addClickListener(self.onDecompose, self);
        // self.labMat.addClickListener(self.onClickLink, self);
    };
    ChildWuJiangJYin.prototype.removeEvent = function () {
        var self = this;
        for (var i = 0; i < 10; i++) {
            self._gridArr[i].vo = null;
            self._gridArr[i].removeClickListener(self.onSelectGrid, self);
        }
        self.curEquip.vo = null;
        self.nextEquip.vo = null;
        self.maxEquip.vo = null;
        self.btnOperate.removeClickListener(self.onBtnHandler, self);
        self.btnDecompose.removeClickListener(self.onDecompose, self);
        // self.labMat.removeClickListener(self.onClickLink, self);
    };
    ChildWuJiangJYin.prototype.show = function () {
        var self = this;
        if (self.selectGrid) {
            self.selectGrid.grid.selectImg.visible = false;
            self.selectGrid = null;
        }
    };
    ChildWuJiangJYin.prototype.update = function () {
        var self = this;
        var equipData = Model_player.voMine.equipData;
        var voE;
        for (var i = 0; i < self._gridArr.length; i++) {
            self._gridArr[i].index = i;
            self._gridArr[i].vo = equipData[i + 20];
            self._gridArr[i].bagEquip = null;
            if (self._gridArr[i].isLocked) {
                self._gridArr[i].checkNotice = false;
            }
            else {
                self._gridArr[i].checkNotice = Model_WuJiang.checkJYinSyn(i + 20);
            }
        }
        var equipBag = Model_Bag.equipList;
        for (var i_1 = 0; i_1 < equipBag.length; i_1++) {
            var ve = equipBag[i_1];
            if (ve.type >= 20 && ve.type < 30) {
                if (self._gridArr[ve.type - 20].vo == null || ve.basePower > self._gridArr[ve.type - 20].vo.basePower) {
                    self._gridArr[ve.type - 20].checkNotice = true;
                    self._gridArr[ve.type - 20].bagEquip = ve;
                }
            }
        }
        if (self.selectGrid) {
            self.selectIndex(Number(self.selectGrid.index));
        }
        else {
            self.selectIndex(0);
        }
        self.labPower.text = "" + self.getJYinPower();
    };
    ChildWuJiangJYin.prototype.onSelectGrid = function (e) {
        var self = this;
        var target = e.currentTarget;
        if (target.isLocked) {
            return;
        }
        var index = target.index;
        self.selectIndex(index);
    };
    //分解
    ChildWuJiangJYin.prototype.onDecompose = function (e) {
        GGlobal.layerMgr.open(UIConst.RONGLIAN_FENJIE);
    };
    //合成  升级
    ChildWuJiangJYin.prototype.onBtnHandler = function (e) {
        var self = this;
        var _state = self.currentState;
        if (_state == "maxLevel") {
            return;
        }
        if (self.needBoo == false) {
            View_CaiLiao_GetPanel.show(self._matItem);
            return;
        }
        var vo;
        if (_state == "upgrade") {
            vo = self.curEquip.vo;
            GGlobal.modelWuJiang.CGUpJY(self.selectGrid.index + 20);
        }
        else if (_state == "puton") {
            vo = self.maxEquip.vo;
            GGlobal.modelEquip.CGWearEquipByid(vo.sid);
        }
        else {
            vo = self.nextEquip.vo;
            GGlobal.modelWuJiang.CGHechengJY(self.selectGrid.index + 20);
        }
    };
    ChildWuJiangJYin.prototype.selectIndex = function (index) {
        var self = this;
        if (self.selectGrid) {
            self.selectGrid.grid.selectImg.visible = false;
        }
        self.selectGrid = self._gridArr[index];
        self.selectGrid.grid.selectImg.visible = true;
        var curVo = self.selectGrid.vo;
        var nextVo = null;
        var bagEquip = self.selectGrid.bagEquip;
        var next;
        if (curVo) {
            next = Model_Equip.getNextEuipLv(index + 20, curVo.id);
        }
        else {
            next = Model_Equip.getNextEuipLv(index + 20, 0);
        }
        var needArr = null;
        self.boxMax.visible = false;
        self.btnOperate.visible = true;
        if (bagEquip) {
            curVo = bagEquip;
            self.currentState = "puton";
            self.btnOperate.text = "穿戴";
            self.btnOperate.enabled = true;
        }
        else if (curVo && next == null) {
            self.currentState = "maxLevel";
            self.btnOperate.text = "满阶";
            self.btnOperate.enabled = false;
            self.btnOperate.visible = false;
            self.boxMax.visible = true;
        }
        else {
            nextVo = VoEquip.create(next.id);
            var composeArr = ConfigHelp.SplitStr(next.compose);
            needArr = composeArr;
            self.btnOperate.enabled = true;
            if (!curVo) {
                self.currentState = "compose";
                self.btnOperate.text = "合成";
            }
            else {
                self.currentState = "upgrade";
                self.btnOperate.text = "升阶";
            }
        }
        self.setAttr(curVo, nextVo);
        self.updateNeed(needArr);
        self.btnOperate.checkNotice = self.selectGrid.checkNotice;
    };
    //显示属性
    ChildWuJiangJYin.prototype.setAttr = function (cur, next) {
        var self = this;
        if (cur == null || next == null) {
            cur = cur ? cur : next;
            self.arrow2.visible = false;
            self.arrow1.visible = false;
            self.curEquip.touchable = self.curEquip.visible = false;
            self.nextEquip.touchable = self.nextEquip.visible = false;
            self.maxEquip.touchable = self.maxEquip.visible = true;
            self.maxEquip.isShowEff = true;
            self.maxEquip.tipEnabled = true;
            self.maxEquip.vo = cur;
            self.maxEquip.lbNum.text = cur ? cur.jie + "阶" : "";
            self.lbMaxAttr.text = ConfigHelp.attrString(cur.baseAttr, "\n+", null, "#15f234");
            self.lbCurAttr.text = "";
            self.lbNextAttr.text = "";
        }
        else {
            self.arrow1.visible = true;
            self.arrow2.visible = true;
            self.curEquip.touchable = self.curEquip.visible = true;
            self.nextEquip.touchable = self.nextEquip.visible = true;
            self.maxEquip.touchable = self.maxEquip.visible = false;
            self.curEquip.isShowEff = true;
            self.curEquip.tipEnabled = true;
            self.curEquip.vo = cur;
            self.curEquip.lbNum.text = cur ? cur.jie + "阶" : "";
            self.nextEquip.isShowEff = true;
            self.nextEquip.tipEnabled = true;
            self.nextEquip.vo = next;
            self.nextEquip.lbNum.text = next.jie + "阶";
            self.lbCurAttr.text = ConfigHelp.attrString(cur.baseAttr, "\n+");
            self.lbNextAttr.text = ConfigHelp.attrString(next.baseAttr, "\n+", null, "#15f234");
            self.lbMaxAttr.text = "";
        }
        //名字
        self.lbName.text = cur.name;
        self.lbName.color = Color.getColorInt(cur.quality);
    };
    ChildWuJiangJYin.prototype.updateNeed = function (needArr) {
        var self = this;
        if (!needArr) {
            self.needBoo = true;
            self.boxMat.visible = false;
            self.imgMat.visible = false;
            return;
        }
        var count = Model_Bag.getItemCount(Number(needArr[0][1]));
        var needCount = Number(needArr[0][2]);
        self._matItem = VoItem.create(Number(needArr[0][1]));
        self.boxMat.setImgUrl(self._matItem.icon);
        self.boxMat.visible = true;
        self.imgMat.visible = true;
        self.boxMat.setLb(count, needCount);
        if (needCount > count) {
            self.needBoo = false;
        }
        else {
            self.needBoo = true;
        }
    };
    ChildWuJiangJYin.prototype.getJYinPower = function () {
        var power = 0;
        var equipData = Model_player.voMine.equipData;
        for (var i = 0; i < 10; i++) {
            var voE = equipData[i + 20];
            if (voE) {
                power += voE.getPower();
            }
        }
        return power;
    };
    ChildWuJiangJYin.prototype.onClickLink = function (e) {
        var self = this;
        if (self._matItem) {
            View_CaiLiao_GetPanel.show(self._matItem);
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
    };
    ChildWuJiangJYin.URL = "ui://zyx92gzwtht43";
    return ChildWuJiangJYin;
}(fairygui.GComponent));
__reflect(ChildWuJiangJYin.prototype, "ChildWuJiangJYin");
