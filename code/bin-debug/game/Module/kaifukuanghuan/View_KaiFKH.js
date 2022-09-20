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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var View_KaiFKH = (function (_super) {
    __extends(View_KaiFKH, _super);
    function View_KaiFKH() {
        var _this = _super.call(this) || this;
        _this.iconArr = [];
        _this.setSkin("kaifukuanghuan", "kaifukuanghuan_atlas0", "View_KaiFKH");
        View_KaiFKH.isShenJiangKuanghuan = false;
        return _this;
    }
    View_KaiFKH.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(KaiFuIt.URL, KaiFuIt);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_ShenJiangKuangHuan.URL, Child_ShenJiangKuangHuan);
        fairygui.UIObjectFactory.setPackageItemExtension(SJKH_Item.URL, SJKH_Item);
    };
    View_KaiFKH.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.lst.setVirtual();
        s.lst.callbackThisObj = s;
        s.lst.itemRenderer = s.itemRender;
        s.tabList.callbackThisObj = s;
        s.tabList.itemRenderer = s.renderHandle;
        s.tabList.addEventListener(fairygui.ItemEvent.CLICK, s.setTab, s);
        s.right.displayObject.touchEnabled = true;
        s.left.displayObject.touchEnabled = true;
        CommonManager.listPageChange("View_KaiFKH", s.tabList, s.left, s.right, 5);
        s.right.visible = View_KaiFKH.isShenJiangKuanghuan;
        s.left.visible = View_KaiFKH.isShenJiangKuanghuan;
    };
    View_KaiFKH.prototype.renderHandle = function (index, tab) {
        var a = this;
        tab.data = a.iconArr[index];
        tab.setActivityIcon(a.iconArr[index]);
        tab.checkNotice = a.check(parseInt(a.iconArr[index]));
        if (!a.curTab && index == 0) {
            tab.selected = true;
            a.curTab = tab;
        }
    };
    View_KaiFKH.prototype.check = function (id) {
        var redMgr = GGlobal.reddot;
        var m = GGlobal.model_KaiFKH;
        switch (id) {
            case 51011:
                return redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 0); //等级狂欢
            case 51012:
                return redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 1); //晋升狂欢
            case 51013:
                return redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, m.getThemeType() - 1); //主题狂欢
            case 51014:
                return redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 9); //元宝狂欢 
            case 51015:// type - 1 了，所以这里是 填 14， 15 而不是 15， 16
                return redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 14) || redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 15);
        }
        return false;
    };
    View_KaiFKH.prototype.createTabs = function () {
        // this.iconArr = Model_Activity.activityObj[UIConst.QUANMIN_KUANGHUAN];
        //51015, 这个序号是神将狂欢的
        if (View_KaiFKH.isShenJiangKuanghuan) {
            this.iconArr = [51015, 51011, 51012, 51013, 51014]; //GGlobal.modelActivity.getGroup(UIConst.KAIFUKUANGHUAN);
        }
        else {
            this.iconArr = [51011, 51012, 51013, 51014]; //GGlobal.modelActivity.getGroup(UIConst.KAIFUKUANGHUAN);
        }
        if (!this.iconArr)
            return;
        this.tabList.numItems = this.iconArr.length;
    };
    View_KaiFKH.prototype.itemRender = function (idx, obj) {
        var it = obj;
        it.setdata(this.dta[idx]);
    };
    View_KaiFKH.prototype.update = function (arg) {
        if (arg === void 0) { arg = 0; }
        var s = this;
        var m = GGlobal.model_KaiFKH;
        var day = Model_GlobalMsg.kaifuDay;
        var idx;
        if (View_KaiFKH.isShenJiangKuanghuan) {
            idx = s.tabList.selectedIndex + 1;
        }
        else {
            idx = s.tabList.selectedIndex;
        }
        //	this.c1.selectedIndex = 0;
        if (View_KaiFKH.isShenJiangKuanghuan) {
            if (idx == 0) {
                s.dta = m.data[5];
                this.c1.selectedIndex = 1;
            }
            else {
                this.c1.selectedIndex = 0;
                if (idx == 4) {
                    s.dta = m.data[3][day];
                }
                else if (idx == 1) {
                    //s.dta = m.data[5];
                }
                else {
                    s.dta = m.data[idx - 1];
                }
                s.dta.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
            }
        }
        else {
            if (idx == 2) {
                s.dta = m.data[idx + 1][day];
            }
            else {
                s.dta = m.data[idx + 1];
            }
            s.dta.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
        }
        s.lst.numItems = s.dta.length;
        s.createTabs();
    };
    //旧版本的红点检测
    // private check() {
    // 	let redMgr = GGlobal.reddot;
    // 	let m = GGlobal.model_KaiFKH;
    // 	for (let i = 0; i < 4; i++) {
    // 		let ret = false;
    // 		if (i == 2) {
    // 			ret = redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, m.getThemeType()-1);
    // 		} else 	if (i == 3) {
    // 			ret = redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 9);
    // 		} else{
    // 			ret = redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, i);
    // 		}
    // 		this["t" + i].checkNotice = ret;
    // 	}
    // }
    View_KaiFKH.prototype.updateX = function () {
        var idx = this.tabList.selectedIndex;
        //倒计时用 
        var ms = Model_GlobalMsg.getServerTime();
        var data = DateUtil.clearHourse(new Date(ms));
        var h0 = data.getTime();
        var ax = 86400000 - (ms - h0);
        if (idx == 3 && View_KaiFKH.isShenJiangKuanghuan) {
            this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getHMSBySecond((ax / 1000) >> 0) + "</font>";
        }
        else if (idx == 2 && !View_KaiFKH.isShenJiangKuanghuan) {
            this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getHMSBySecond((ax / 1000) >> 0) + "</font>";
        }
        else {
            var day = Model_GlobalMsg.kaifuDay;
            day = day > 7 ? 7 : day;
            if (8 - day > 1) {
                this.lbTime.text = "剩余时间：<font color='#15f234'>" + (7 - day) + "天" + DateUtil.getMSBySecond5((ax / 1000) >> 0) + "</font>";
            }
            else {
                this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getHMSBySecond((ax / 1000) >> 0) + "</font>";
            }
        }
    };
    //分别是神将狂欢，等级狂欢，晋升狂欢，主题狂欢，元宝狂欢
    View_KaiFKH.prototype.setTab = function () {
        this.child_SJKH.clean();
        var idx = this.tabList.selectedIndex + 1;
        var day = 0;
        var m = GGlobal.model_KaiFKH;
        if (View_KaiFKH.isShenJiangKuanghuan) {
            IconUtil.setImg(this.imgloader, Enum_Path.PIC_URL + "kaifukuanghuan" + idx + ".jpg");
        }
        else {
            IconUtil.setImg(this.imgloader, Enum_Path.PIC_URL + "kaifukuanghuan" + (idx + 1) + ".jpg");
        }
        if (this.tabList.selectedIndex == 0 && View_KaiFKH.isShenJiangKuanghuan) {
            this.c1.selectedIndex = 1;
        }
        else {
            this.c1.selectedIndex = 0;
        }
        day = Model_GlobalMsg.kaifuDay;
        day = day > 7 ? 7 : day;
        var vo;
        this.updateX();
        if (View_KaiFKH.isShenJiangKuanghuan) {
            if (idx == 4) {
                vo = m.data[3][day][0]; //主题狂欢的
            }
            else if (idx == 1) {
                vo = m.data[5][0]; //这是申请神将狂欢的
            }
            else {
                vo = m.data[idx - 1][0]; //其他类型的
            }
        }
        else {
            if (idx == 3) {
                vo = m.data[idx][day][0];
            }
            else {
                vo = m.data[idx][0];
            }
        }
        idx = vo.type;
        GGlobal.model_KaiFKH.CG_OPEN(idx);
    };
    View_KaiFKH.prototype.refreshSJKHList = function (arg) {
        var data = arg.data;
        if (this.SJKHVO.length > 0) {
            for (var i = 0; i < this.SJKHVO.length; i++) {
                if (data.id == this.SJKHVO[i].id) {
                    if (this.SJKHVO[i].reward == 1) {
                        this.SJKHVO[i].reward = data.reward;
                    }
                    if (this.SJKHVO[i].limitSt == 1) {
                        this.SJKHVO[i].limitSt = data.limitSt;
                        this.SJKHVO[i].lastNum = data.lastNum;
                    }
                    this.child_SJKH.updateData(this.SJKHVO);
                    GGlobal.reddot.setCondition(UIConst.KAIFUKUANGHUAN, this.SJKHVO[i].type - 1, false);
                    break;
                }
            }
            for (var i = 0; i < this.SJKHVO.length; i++) {
                var state = this.SJKHVO[i].reward == 1 || (this.SJKHVO[i].limitSt == 1 && this.SJKHVO[i].lastNum > 0);
                GGlobal.reddot.setCondition(UIConst.KAIFUKUANGHUAN, this.SJKHVO[i].type - 1, state);
                if (state) {
                    break;
                }
            }
            GGlobal.reddot.notify(Enum_MsgType.KAIFUKUANGHUAN);
            this.createTabs();
        }
    };
    View_KaiFKH.prototype.onShown = function () {
        var s = this;
        var m = GGlobal.model_KaiFKH;
        if (!m.mapObj)
            m.init();
        var day = Model_GlobalMsg.kaifuDay;
        s.createTabs();
        s.tabList.selectedIndex = 0;
        //s.lbTime.text = "剩余时间：<font color='#15f234'>" + (8 - day) + "天</font>";
        GGlobal.reddot.listen(ReddotEvent.CHECKKFKH, s.createTabs, s);
        GGlobal.control.listen(Enum_MsgType.KAIFUKUANGHUAN, s.update, s);
        GGlobal.control.listen(Enum_MsgType.SHENJIANGKUANGHUAN, s.updateSJKH, s);
        GGlobal.control.listen(Enum_MsgType.SJKHREFRESHLIST, s.refreshSJKHList, s);
        Timer.instance.listen(s.updateX, s, 1000);
        //s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.ctrlChange, s)
        s.setTab();
    };
    View_KaiFKH.prototype.onHide = function () {
        var s = this;
        s.lst.numItems = 0;
        GGlobal.reddot.remove(ReddotEvent.CHECKKFKH, s.createTabs, s);
        GGlobal.control.remove(Enum_MsgType.KAIFUKUANGHUAN, s.update);
        GGlobal.control.remove(Enum_MsgType.SHENJIANGKUANGHUAN, s.updateSJKH);
        GGlobal.control.remove(Enum_MsgType.SJKHREFRESHLIST, s.refreshSJKHList);
        Timer.instance.remove(s.updateX, s);
        //s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.ctrlChange, s)
        GGlobal.layerMgr.close(UIConst.KAIFUKUANGHUAN);
        IconUtil.setImg(this.imgloader, null);
    };
    View_KaiFKH.prototype.updateSJKH = function (arg) {
        this.SJKHVO = arg.data;
        this.child_SJKH.updateData(arg.data);
    };
    /**用于控制是否开启神将狂欢的 */
    View_KaiFKH.isShenJiangKuanghuan = false;
    View_KaiFKH.URL = "ui://yk4rwc6rd7mw0";
    return View_KaiFKH;
}(UIPanelBase));
__reflect(View_KaiFKH.prototype, "View_KaiFKH");
