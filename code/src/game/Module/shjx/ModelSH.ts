class ModelSH extends BaseModel {
    public static msg_ui = "msg_ui";
    public static msg_onbat = "msg_onbat";//出战
    public static msg_lock = "msg_lock";//印记上锁
    public static msg_enable = "msg_enable";//激活
    public static msg_xingSuUp = "msg_xingSuUp";//星宿升级
    public static msg_xingUpJie = "msg_xingUpJie";//新宿升阶
    public static msg_xilian = "msg_xilian";//洗练
    public static msg_chuanDai = "msg_chuanDai";//穿戴
    public static msg_itemSel = "msg_itemSel";//类型切换
    public static msg_notice = "msg_notice";//红点
    /**一键洗练 */
    public static msg_yijianxilian = "msg_yijianxilian";
    /**幻形 */
    public static msg_huanx_ui = "msg_huanx_ui";
    public static msg_huanx_buy = "msg_huanx_buy";
    public static msg_huanx_red = "msg_huanx_red";

    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        wsm.regHand(868, this.GC868, this);
        wsm.regHand(866, this.GC866, this);
        wsm.regHand(864, this.GC864, this);
        wsm.regHand(862, this.GC862, this);
        wsm.regHand(860, this.GC860, this);
        wsm.regHand(858, this.GC858, this);
        wsm.regHand(856, this.GC856, this);
        wsm.regHand(852, this.GC852, this);
        wsm.regHand(5692, this.GC5692, this);
        wsm.regHand(5694, this.GC5694, this);
        //幻化
        wsm.regHand(5696, this.GCHXUI_5696, this);
        wsm.regHand(5698, this.GCBUY_5698, this);
        wsm.regHand(5700, this.GCWEAR_5700, this);
    }

    /**5691	印记替换 B:兽灵类型S:装备位置 */
    public CG5691(type: number, equipPos: number) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeShort(equipPos);
        this.sendSocket(5691, bytes);
    }
    /**5693	一键升星 I:兽灵类型1青龙2白虎3朱雀4玄武 I:洗练装备位置I:当前星级 */
    public CG5693(type: number, pos: number, starLv: number) {
        let self = this;
        let bytes = self.getBytes();
        bytes.writeInt(type);
        bytes.writeInt(pos);
        bytes.writeInt(starLv);
        self.sendSocket(5693, bytes);
    }

    /**5692	印记替换结果 B:结果：0：失败，1：成功B:失败（0：无可替换印记），成功：兽灵类型S:装备位置 */
    private GC5692(self: ModelSH, bytes: BaseBytes) {
        let result = bytes.readByte();
        if (result == 1) {
            let type = bytes.readByte();
            let pos = bytes.readShort();
            const data: IJXServData = ModelSH.servDatas[type];
            for (let i = 0; i < data.datas.length; i++) {
                if (data.datas[i].position == pos) {
                    data.datas[i].datas = data.datas[i].thdatas;
                    data.datas[i].thdatas = [];
                    if (data.datas[i].suitVal == 0) {
                        if (ModelSH.hasJH4Attr(Config.shjx_266[pos], 1)) data.datas[i].suitVal = 4;
                    }

                    let minStarLv: number = 1000;
                    let yinJiInfos = data.datas[i].datas
                    for (let j = 0; j < yinJiInfos.length; j++) {
                        let yinJi = yinJiInfos[j];
                        if (Config.shjxstar_266[yinJi.starID].star < minStarLv && yinJi.type == type) {
                            minStarLv = Config.shjxstar_266[yinJi.starID].star;
                        }
                        if (yinJi.type != type) minStarLv = 0;
                    }
                    if (minStarLv == 1000) {
                        minStarLv = 0;
                    }
                    if (minStarLv > data.datas[i].suitStar) {
                        data.datas[i].suitStar = minStarLv;
                    }
                    break;
                }
            }
            self.notify(ModelSH.msg_xilian);
            self.notify(ModelSH.msg_notice);
        }
    }

    /**5694	一键升星 B:0没有此兽灵 1道具不足 2成功I:一键升星增加的洗练次数 */
    private GC5694(self: ModelSH, bytes: BaseBytes) {
        let result = bytes.readByte();
        if (result == 0) {
            ViewCommonWarn.text("没有此兽魂");
        } else if (result == 1) {
            ViewCommonWarn.text("道具不足");
        } else if (result == 2) {
            let count = bytes.readInt();
            ViewCommonWarn.text("洗练成功");
            self.notify(ModelSH.msg_yijianxilian, { count: count });
        }
    }
    //幻形数据
    public huanXObj: { [t: number]: { id: number, st: number }[] } = {};

    /**打开兽魂化形界面 B:类型 1青龙2白虎3朱雀4玄武 */
    public CGHXUI_5695(type: number) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(5695, bytes);
    }

    /**打开兽魂化形界面 B:0没拥有此兽灵 1没激活兽魂 2成功[I:兽魂模型idI:0未化形 1已化形 2激活]兽魂化形数据 */
    private GCHXUI_5696(self: ModelSH, bytes: BaseBytes) {
        let result = bytes.readByte();
        if (result == 0) {
            // ViewCommonWarn.text("没有此兽魂");
        } else if (result == 1) {
            // ViewCommonWarn.text("没激活兽魂");
        } else if (result == 2) {
            let type = bytes.readByte();
            let len = bytes.readShort();
            self.huanXObj[type] = []
            for (let i = 0; i < len; i++) {
                let id = bytes.readInt();
                let st = bytes.readInt();
                self.huanXObj[type].push({ id: id, st: st });
            }
            self.notify(ModelSH.msg_huanx_ui);
            self.notify(ModelSH.msg_huanx_red);
        }
    }
    /**购买皮肤 兽灵化形 B:类型 1青龙2白虎3朱雀4玄武I:兽魂化形表的id */
    public CGBUY_5697(type: number, id: number) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeInt(id);
        this.sendSocket(5697, bytes);
    }

    /**打开兽魂化形界面 B:0没拥有此兽灵 1没激活兽魂 2成功I:0未化形 1已化形 2激活 */
    private GCBUY_5698(self: ModelSH, bytes: BaseBytes) {
        let result = bytes.readByte();
        if (result == 0) {
            ViewCommonWarn.text("没有此兽魂");
        } else if (result == 1) {
            ViewCommonWarn.text("没激活兽魂");
        } else if (result == 2) {
            ViewCommonWarn.text("幻化失败");
        } else if (result == 3) {
            ViewCommonWarn.text("元宝不足");
        } else if (result == 4) {
            ViewCommonWarn.text("幻化成功");
            let type = bytes.readByte();
            let id = bytes.readInt();
            let arr: Array<any> = self.huanXObj[type];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    arr[i].st = 1;
                } else if (arr[i].st == 1) {
                    arr[i].st = 2;
                }
            }
            //自动穿上  自动战斗  
            for (let key in ModelSH.servDatas) {
                let data = ModelSH.servDatas[key];
                if (Number(key) == type) {
                    data.pifu = id
                    data.isOnBat = 1
                    self.curOnBatDt = data;
                    Model_player.voMine.shouHun = id;
                } else {
                    data.isOnBat = 0
                }
            }
            self.notify(ModelSH.msg_huanx_buy);
            self.notify(ModelSH.msg_onbat);
            self.notify(ModelSH.msg_huanx_red);
        }
    }
    /**穿戴皮肤 兽灵化形 B:类型 1青龙2白虎3朱雀4玄武I:兽魂化形表的id */
    public CGWEAR_5699(type: number, id: number) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeInt(id);
        this.sendSocket(5699, bytes);
    }

    /**穿戴皮肤 B:0没拥有此兽灵 1没激活兽魂 2成功I:0未化形 1已化形 2激活 */
    private GCWEAR_5700(self: ModelSH, bytes: BaseBytes) {
        let result = bytes.readByte();
        if (result == 0) {
            ViewCommonWarn.text("没有此兽魂");
        } else if (result == 1) {
            ViewCommonWarn.text("没激活兽魂");
        } else if (result == 2) {
            ViewCommonWarn.text("幻化失败");
        } else if (result == 3) {
            ViewCommonWarn.text("幻化成功");
            let type = bytes.readByte();
            let id = bytes.readInt();
            let arr: Array<any> = self.huanXObj[type];
            for (let i = 0; i < arr.length; i++) {
                let v = arr[i]
                if (v.id == id) {
                    v.st = 1;
                } else if (v.st == 1) {
                    v.st = 2;//把原来已幻形的 还原未幻形
                }
            }
            //自动穿上  自动战斗  
            for (let key in ModelSH.servDatas) {
                let data = ModelSH.servDatas[key];
                if (Number(key) == type) {
                    data.pifu = id
                    data.isOnBat = 1
                    self.curOnBatDt = data;
                    Model_player.voMine.shouHun = id;
                } else {
                    data.isOnBat = 0
                }
            }
            self.notify(ModelSH.msg_huanx_buy);
            self.notify(ModelSH.msg_onbat);
        }
    }

    public static servDatas: { [key: string]: IJXServData } = {};
    /**返回界面信息 [B:兽灵类型I:兽灵等级I:星宿等级I:星宿当前阶数B:是否激活（0：未激活，1：激活）B:是否出战（0：未出战，1：出战）
     * [S:装位置I:装备idI:已洗练次数[B:印记位置I:印记idB:印记类型B:是否上锁（0：未上锁，1：上锁）]印记数据
     * [B:替换印记位置I:替换印记idB:替换印记类型B:替换印记是否上锁（0：未上锁，1：上锁）]替换印记数据]兽灵装备数据]兽灵数据*/
    private GC852(self: ModelSH, bytes: BaseBytes) {
        Model_ShouLing.isFirst = true;
        const len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            const type: number = bytes.readByte();
            const data: IJXServData = ModelSH.servDatas[type] || (ModelSH.servDatas[type] = <any>{});
            data.type = type;
            data.level = bytes.readInt();//兽灵等级
            Model_ShouLing.slArr[Math.floor(data.level / 1000) - 1] = data.level;//兼容一下以前的数据
            data.suLv = bytes.readInt();//星宿等级
            data.suJie = bytes.readInt();//星宿阶数
            data.state = bytes.readByte();//是否激活（1是，0否）
            data.isOnBat = bytes.readByte();//是否出战（1是，0否）
            data.pifu = bytes.readInt();//幻形id
            if (data.isOnBat == 1) {
                self.curOnBatDt = data;
            }
            var datas = data.datas || (data.datas = []);
            datas.length = 0;
            const len2 = bytes.readShort();
            for (let j = 0; j < len2; j++) {
                let tempDt: IJXData = <any>{};
                tempDt.position = bytes.readShort();
                tempDt.equipID = bytes.readInt();
                tempDt.xiLianNum = bytes.readInt();
                tempDt.suitVal = bytes.readInt();
                tempDt.suitStar = bytes.readInt();

                tempDt.datas = tempDt.datas || (tempDt.datas = []);
                tempDt.thdatas = tempDt.thdatas || (tempDt.thdatas = []);
                tempDt.thdatas.length = tempDt.datas.length = 0;
                const len3 = bytes.readShort();
                for (let k = 0; k < len3; k++) {
                    let tempDt2: IJXDetail = <any>{};
                    tempDt2.position = bytes.readByte();
                    tempDt2.starID = bytes.readInt();
                    tempDt2.type = bytes.readByte();
                    tempDt2.isLock = bytes.readByte();//（1是，0否)
                    tempDt.datas.push(tempDt2);
                }
                const len4 = bytes.readShort();
                for (let n = 0; n < len4; n++) {
                    let tempDt2: IJXDetail = <any>{};
                    tempDt2.position = bytes.readByte();
                    tempDt2.starID = bytes.readInt();
                    tempDt2.type = bytes.readByte();
                    tempDt2.isLock = bytes.readByte();//（1是，0否)
                    tempDt.thdatas.push(tempDt2);
                }
                datas.push(tempDt);
            }
        }
        ModelSH.updateNotAll();
        self.notify(ModelSH.msg_ui);
        self.notify(ModelSH.msg_notice);
    }
    /**星宿升阶 */
    public CG867(type: number) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(867, bytes);
    }
    private GC868(self: ModelSH, bytes: BaseBytes) {
        const state = bytes.readByte();
        const type = bytes.readByte();
        if (state == 1) {
            const curJie = bytes.readInt();
            const info = ModelSH.servDatas[type];
            if (info) {
                info.suJie = curJie;
            }
            ModelSH.updateNotAll();
            self.notify(ModelSH.msg_xingUpJie);
            self.notify(ModelSH.msg_notice);
        } else {
            //1:已经最高，2：未满足条件
            ViewCommonWarn.text(["", "已经最高", "未满足条件"][type]);
        }
    }
    /**出战 */
    public CG865(type: number) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(865, bytes);
    }
    private curOnBatDt: IJXServData;
    private GC866(self: ModelSH, bytes: BaseBytes) {
        const state = bytes.readByte();
        const type: number = bytes.readByte();
        if (state == 1) {
            const data = ModelSH.servDatas[type];
            if (data) {
                if (self.curOnBatDt) {
                    self.curOnBatDt.isOnBat = 0;
                }
                data.isOnBat = 1;
                self.curOnBatDt = data;
            }
            self.notify(ModelSH.msg_onbat);
            Model_player.voMine.shouHun = data.pifu;
        } else {
            ViewCommonWarn.text(["", "未激活"][type]);
        }
    }
    /**锁定印记 type: 类型 equipPos: 装备位置(110 111这些) yjPos:印记位置(1-4) operType: 1锁*/
    public CG863(type: number, equipPos: number, yjPos: number, operType: number) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeShort(equipPos);
        bytes.writeByte(yjPos);
        bytes.writeByte(operType);
        this.sendSocket(863, bytes);
    }
    public static isLockBack: boolean = false;
    private GC864(self: ModelSH, bytes: BaseBytes) {
        const state = bytes.readByte();
        const type = bytes.readByte();
        if (state == 1) {
            const equipPos = bytes.readShort();
            const yjPos = bytes.readByte();
            const isLock = bytes.readByte();
            const info = ModelSH.servDatas[type];
            if (info) {
                const datas = info.datas;
                for (let i = 0; i < datas.length; i++) {
                    const tempDt = datas[i];
                    if (tempDt.position == equipPos) {
                        for (let j = 0; j < tempDt.datas.length; j++) {
                            if (tempDt.datas[j].position == yjPos) {
                                tempDt.datas[j].isLock = isLock;
                                break;
                            }
                        }
                        for (let j = 0; j < tempDt.thdatas.length; j++) {
                            if (tempDt.thdatas[j].position == yjPos) {
                                tempDt.thdatas[j].isLock = isLock;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            ModelSH.isLockBack = true;
            self.notify(ModelSH.msg_lock);
        } else {
            //1：未洗练到印记不用锁定，2：已锁定，3：消耗道具不足
            ViewCommonWarn.text(["", "未洗练到印记不用锁定", "已锁定", "消耗道具不足"][type]);
        }
    }
    /**兽灵激活 */
    public CG861(type: number) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(861, bytes);
    }
    private GC862(self: ModelSH, bytes: BaseBytes) {
        const state = bytes.readByte();
        const type = bytes.readByte();
        if (state == 1) {
            const info = ModelSH.servDatas[type];
            if (info) {
                info.state = 1;
                info.pifu = type
            }
            ModelSH.updateNotAll();
            self.notify(ModelSH.msg_enable);
            self.notify(ModelSH.msg_notice);
            //激活后 显示幻形红点
            GGlobal.modelSHJX.CGHXUI_5695(type);
        } else {
            ViewCommonWarn.text(["", "对应类型印记数量不足"][type]);
        }
    }
    /**升级星宿 */
    public CG859(type: number) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(859, bytes);
    }
    private GC860(self: ModelSH, bytes: BaseBytes) {
        const state = bytes.readByte();
        const type = bytes.readByte();
        if (state == 1) {
            const info = ModelSH.servDatas[type];
            if (info) {
                info.suLv = bytes.readInt();
            }
            ModelSH.updateNotAll();
            self.notify(ModelSH.msg_xingSuUp);
            self.notify(ModelSH.msg_notice);
        } else {
            //1：已达最高等级，2：道具不足，3：未激活
            ViewCommonWarn.text(["", "已达最高级", "道具不足", "未激活"][type]);
        }
    }
    /**洗练 */
    public CG857(type: number, equipPos: number, itemId: number) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeShort(equipPos);
        bytes.writeInt(itemId);
        this.sendSocket(857, bytes);
    }
    /**洗练结果返回 B:结果：0：失败，1：成功B:失败：（1：没穿装备不能洗练，2：不是对应类型的印记，3：印记道具不足，4：洗练石不足，5：洗练锁不足）；成功：
     * 兽灵类型S:装备位置I:洗练次数[I:印记星级idB:位置B:印记类型B:是否上锁（是：1，否：0）]印记数据 */
    private GC858(self: ModelSH, bytes: BaseBytes) {
        const state = bytes.readByte();
        const type = bytes.readByte();
        if (state == 1) {
            const equipPos = bytes.readShort();
            const xiLianNum = bytes.readInt();
            const len = bytes.readShort();
            var arr = [];
            for (let i = 0; i < len; i++) {
                const tempDt: IJXDetail = <any>{};
                tempDt.starID = bytes.readInt();
                tempDt.position = bytes.readByte();
                tempDt.type = bytes.readByte();
                tempDt.isLock = bytes.readByte();
                arr.push(tempDt);
            }
            const info = ModelSH.servDatas[type];
            let preTZDatas: IJXDetail[] = null;
            if (info) {
                for (let i = 0; info.datas && i < info.datas.length; i++) {
                    const data = info.datas[i];
                    if (data.position == equipPos) {
                        preTZDatas = data.datas.concat();
                        data.thdatas = arr;
                        data.xiLianNum = xiLianNum;
                        break;
                    }
                }
            }
            ModelSH.updateNotAll();
            self.notify(ModelSH.msg_xilian);
            self.notify(ModelSH.msg_notice);
            const preTZLv = self.calcutTZLv(preTZDatas, type);
            const curTZLv = self.calcutTZLv(arr, type);
            const view: VSHJXPeiyang = GGlobal.layerMgr.getView(UIConst.SHJXXILIAN);
            if (view) {
                view.checkShowEff(preTZLv, curTZLv);
            }
        } else {
            //1：没穿装备不能洗练，2：不是对应类型的印记，3：印记道具不足，4：洗练石不足，5：洗练锁不足
            ViewCommonWarn.text(["", "没穿装备不能洗练", "不是对应类型的印记", "消耗道具不足", "洗练石不足", "洗练锁不足"][type]);
        }
    }
    /**穿戴 */
    public CG855(type: number, equipPos: number) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeShort(equipPos);
        this.sendSocket(855, bytes);
    }
    private GC856(self: ModelSH, bytes: BaseBytes) {
        const state = bytes.readByte();
        const type = bytes.readByte();
        if (state == 1) {
            const equipPos = bytes.readShort();
            const equipID = bytes.readInt();
            const len = bytes.readShort();
            var arr = [];
            for (let i = 0; i < len; i++) {
                const pos = bytes.readByte();
                const eqId = bytes.readInt();
                const type = bytes.readByte();
                const isLock = bytes.readByte();
                arr.push({ position: pos, starID: eqId, type: type, isLock: isLock });
            }
            const info = ModelSH.servDatas[type];
            if (info) {
                let datas = info.datas || (info.datas = []);
                let indata: boolean = false;
                for (let i = 0; i < datas.length; i++) {
                    let data = datas[i];
                    if (data.position == equipPos) {
                        data.equipID = equipID;
                        data.datas = arr;
                        indata = true;
                    }
                }
                if (!indata) {
                    datas.push({ position: equipPos, equipID: equipID, datas: arr, xiLianNum: 0, thdatas: [], suitVal: 0, suitStar: 0 });
                }
            }
            ModelSH.updateNotAll();
            self.notify(ModelSH.msg_chuanDai);
            self.notify(ModelSH.msg_notice);
        } else {
            View_CaiLiao_GetPanel.show(VoItem.create(410052));
        }
    }
    private calcutTZLv(param: IJXDetail[], type: number) {
        let minStarLv = 1000;
        let count = 0;
        for (let i = 0; i < param.length; i++) {
            const tempData = param[i];
            if (tempData.type == type) {
                count++;
                if (Config.shjxstar_266[tempData.starID].star < minStarLv) {
                    minStarLv = Config.shjxstar_266[tempData.starID].star;
                }
            }
        }
        return count >= 4 ? minStarLv : 0;
    }
    /**判断某部位装备是否属性满星 */
    public static hasFullStar(attrs: IJXDetail[]) {
        const fullStar = 10;
        let fullCnt = 0;
        for (let i = 0; i < attrs.length; i++) {
            const attr = attrs[i];
            const cfg = Config.shjxstar_266[attr.starID];
            if (cfg && cfg.star >= fullStar) {
                fullCnt++;
            }
        }
        return fullCnt >= 4;
    }
    /**获取相应印记 */
    public static hasYinJi(type: number) {
        const lib = Config.shjxyj_266;
        for (let key in lib) {
            const cfg = lib[key];
            if (cfg.yj == type) {
                if (Model_Bag.getItemCount(cfg.id) > 0) {
                    return true;
                }
            }
        }
        return false;
    }
    public static readonly icUrls = ["qingLongYJ", "baiHuYJ", "zhuQueYJ", "xuanWuYJ"];
    public static readonly icNameUrls = ["ui://4aepcdbwtu9m44", "ui://4aepcdbwtu9m47", "ui://4aepcdbwi1zl5w", "ui://4aepcdbwtu9m45"];
    /**获取兽魂觉醒表数据 */
    private static _oriDatas: { [key: number]: Ishjx_266[] };
    public static getOrigDatas() {
        if (!this._oriDatas) {
            this._oriDatas = {};
            const lib = Config.shjx_266;
            for (let key in lib) {
                const cfg = lib[key];
                var arr = this._oriDatas[cfg.yj] || (this._oriDatas[cfg.yj] = []);
                arr.push(cfg);
            }
        }
        return this._oriDatas;
    }
    public static getTotalPower(type: number) {
        let power = 0;
        const info = this.servDatas[type];
        if (info) {
            const datas = info.datas;
            for (let i = 0; datas && i < datas.length; i++) {
                const data = datas[i];
                if (data.equipID) {
                    power += Config.zhuangbei_204[data.equipID].zhanli;//装备总战力
                }
                let minStarLv: number = 1000;
                let sameT: boolean = true;
                for (let j = 0; data.datas && j < data.datas.length; j++) {
                    var tempDt = data.datas[j];
                    if (tempDt) {
                        power += Config.shjxstar_266[tempDt.starID].power;//印记总战力
                        if (Config.shjxstar_266[tempDt.starID].star < minStarLv) {
                            minStarLv = Config.shjxstar_266[tempDt.starID].star;
                        }
                        if (type != tempDt.type) {
                            sameT = false;
                        }
                    }
                }
                // if (data && data.datas.length == 4 && sameT) {
                const cfg = this.getByMinStarLv(data.suitStar, data.position);
                // const cfg = this.getByMinStarLv(minStarLv, data.position);
                if (cfg) {
                    power += cfg.power;//套装总战力
                }
                if (data.suitVal == 4) {
                    power += Config.shjx_266[data.position].power;//套装总战力
                }
                // }
            }
            if (info.pifu > 1000) {//幻形战力
                power += Config.shhx_266[info.pifu].power
            }

            // for (let key in Config.shjx_266) {
            //     const cfg = Config.shjx_266[key];
            //     if (cfg.yj == type && this.hasJH4Attr(cfg, 1)) {
            //         power += Config.shjx_266[key].power;//套装总战力
            //     }
            // }
        }
        return power;
    }
    public static hasJH4Attr(cfg: Ishjx_266, star: number) {
        const info = ModelSH.servDatas[cfg.yj];
        let counter = 0;
        if (info) {
            const equips = info.datas;
            for (let i = 0; i < equips.length; i++) {
                const equip = equips[i];
                if (equip.position == cfg.id) {
                    const attrs = equip.datas;
                    for (let j = 0; j < attrs.length; j++) {
                        const attr = attrs[j];
                        if (attr.type == cfg.yj && Config.shjxstar_266[attr.starID].star >= star) {
                            counter++;
                        }
                    }
                    break;
                }
            }
        }
        return counter >= 4;
    }
    /**做一个 套装表数据 部位->表元素的映射 */
    public static posToCfg: { [pos: number]: Ishjxstartz_266[] } = {};
    public static getByMinStarLv(minStarLv: number, position: number):Ishjxstartz_266 {
        const lib = Config.shjxstartz_266;
        var arr = this.posToCfg[position];
        if (!arr) {
            arr = this.posToCfg[position] = [];
            for (let key in lib) {
                const cfg = lib[key];
                if (cfg.bw == position) {
                    arr.push(cfg);
                }
            }
            arr.sort((a, b) => a.star - b.star);
        }
        for (let i = arr.length - 1; i >= 0; i--) {
            if (minStarLv >= arr[i].star) {
                return arr[i];
            }
        }
        return null;
    }
    /**通过某个部位获取装备id */
    public static getEquipByPos(type: number, position: number) {
        const info = this.servDatas[type];
        if (info) {
            const datas = info.datas;
            for (let i = 0; i < datas.length; i++) {
                const data = datas[i];
                if (data && data.position == position) {
                    return data;
                }
            }
        }
        return null;
    }
    /**印记到套装表元素的映射 */
    private static typeToTZCfg: { [key: number]: { cfg: Ixjtz_266, fitJie: number, jie: number }[] } = {};
    public static resolveTZ(jie: number, type: number) {
        let arr = this.typeToTZCfg[type];
        if (!arr) {
            arr = this.typeToTZCfg[type] = [];
            const lib = Config.xjtz_266;
            for (let key in lib) {
                const cfg = lib[key];
                const tempType = ((cfg.lv / 100 >> 0) % 10 >> 0) + 1;
                if (type == tempType) {
                    const fitJie = cfg.next % 100 >> 0;
                    const jie = cfg.lv % 100 >> 0;
                    arr.push({ cfg: cfg, fitJie: fitJie, jie: jie });
                }
            }
            arr.sort((a, b) => a.jie - b.jie);
        }
        return arr;
    }
    /**背包是否有更好的 */
    public static hasBetterEQ(eqID: number, part: number) {
        const equipMap = Model_Bag.equipMap;
        let arr: number[] = [];
        for (let key in equipMap) {
            const voe: VoEquip = equipMap[key];
            const cfg = Config.zhuangbei_204[voe.id];
            if (cfg.part == part) {
                arr.push(voe.id);
            }
        }
        let zhuanCnt: number = 0;
        let power = 0;
        if (eqID != 0) {
            power = Config.zhuangbei_204[eqID].zhanli;
        }
        for (let i = 0; i < arr.length; i++) {
            const id = arr[i];
            const cfg = Config.zhuangbei_204[id];
            if (cfg) {
                const zsVal = JSON.parse(cfg.lv)[0][0];
                if (Config.zhuangbei_204[id].zhanli > power) {
                    if (Model_player.voMine.zsID >= zsVal) {
                        return true;
                    } else {
                        zhuanCnt = zsVal;
                    }
                }
            }
        }
        if (zhuanCnt) {
            return { zhuanCnt: zhuanCnt, bool: false };
        } else {
            return false;
        }
    }
    /**升级 */
    public static checkSJ(type: number) {
        let cfg = Config.shoulin_704[Model_ShouLing.slArr[type - 1]];
        let costArr: Array<any> = JSON.parse(cfg.consume);
        if (costArr && costArr.length > 0) {
            let count = Model_Bag.getItemCount(costArr[0][1]);
            if (cfg.next > 0) {
                return count >= costArr[0][2];
            } else {
                return false;
            }
        }
        return false;
    }
    /**觉醒 */
    public static checkJX(type: number) {
        if (!ModuleManager.isOpen(UIConst.SHJX)) {
            return false;
        }
        const info = ModelSH.servDatas[type];
        if (info) {
            const equips = info.datas;
            for (let i = 0; i < 3; i++) {
                const pos = 100 + type * 10 + i;
                const equip = getEquip(pos);
                if (equip) {
                    const betJug: any = this.hasBetterEQ(equip.equipID, equip.position);
                    if (betJug && !betJug.zhuanCnt) {
                        return true;
                    }
                    if (equip && equip.equipID) {
                        if (!ModelSH.hasFullStar(equip.datas) && Model_Bag.getItemCount(410049) >= JSON.parse(Config.xtcs_004[5601].other)[0][2]) {
                            return true;
                        }
                    }
                } else {
                    const betJug: any = this.hasBetterEQ(0, pos);
                    if (betJug && !betJug.zhuanCnt) {
                        return true;
                    }
                }

            }
        }
        function getEquip(pos: number) {
            if (info) {
                for (let i = 0; info.datas && i < info.datas.length; i++) {
                    if (info.datas[i].position == pos) {
                        return info.datas[i];
                    }
                }
            }
            return null;
        }
        return false;
    }
    /**二十八星宿 */
    public static checkXS(type: number) {
        if (!ModuleManager.isOpen(UIConst.ERBASU)) {
            return false;
        }
        const info = ModelSH.servDatas[type];
        if (info) {
            //星宿等级
            const cfg = Config.xj_266[info.suLv];
            if (cfg && cfg.cost != 0) {
                const cost = ConfigHelp.makeItem(JSON.parse(cfg.cost)[0]);
                if (Model_Bag.getItemCount(cost.id) >= cost.count) {
                    return true;
                }
            }
            //套装
            const nextCfg = info.suJie ? Config.xjtz_266[info.suJie + 1] : Config.xjtz_266[info.type * 1000 + 1];
            if (nextCfg) {
                const fitJi = nextCfg.next % 1000 >> 0;
                const ji = info.suLv ? info.suLv : info.type * 100000;
                if ((ji % 1000 >> 0) >= fitJi) {
                    return true;
                }
            }
        }
        return false;
    }
    /**checkALl */
    public static updateNotAll() {
        let ret: boolean = false;
        for (let i = 1; i <= 4; i++) {
            ret = this.checkSJ(i) || this.checkJX(i) || this.checkXS(i);
            if (ret == true) {
                break;
            }
        }
        ret = ret || GGlobal.reddot.checkCondition(UIConst.ACTHB_XUNBAO, 0)
        GGlobal.reddot.setCondition(UIConst.SHOULING, 0, ret);
    }

    public checkHuanXType(type){
        const info = ModelSH.servDatas[type];
        if (!info || info.state != 1){//未激活
            return false;
        }
        if(this.huanXObj == null || this.huanXObj[type] == null){
            return false;
        }
        let arr = this.huanXObj[type];
        for(let j = 0; j < arr.length; j++){
            if(arr[j].st > 0)continue;
            let v = Config.shhx_266[arr[j].id]
            if(v.conmuse == "0")continue;
            let cost = Number(JSON.parse(v.conmuse)[0][2])
            if(Model_player.voMine.yuanbao >= cost){
                return true;
            }
        }
        return false
    }



    public static canRongLian(part: number) {
        const info = ModelSH.servDatas[part % 100 / 10 >> 0];
        if (info) {
            const equips = info.datas;
            for (let i = 0; i < equips.length; i++) {
                const equip = equips[i];
                if (equip && equip.position == part) {
                    return Config.zhuangbei_204[equip.equipID].zhanli;
                }
            }
        }
        return 0;
    }

    public static hasJH4Attr111(cfg: Ishjx_266, star: number) {
        const info = ModelSH.servDatas[cfg.yj];
        let counter = 0;
        if (info) {
            const equips = info.datas;
            for (let i = 0; i < equips.length; i++) {
                const equip = equips[i];
                if (equip.position == cfg.id) {
                    const attrs = equip.datas;
                    for (let j = 0; j < attrs.length; j++) {
                        const attr = attrs[j];
                        if (attr.type == cfg.yj && Config.shjxstar_266[attr.starID].star >= star) {
                            counter++;
                        }
                    }
                    break;
                }
            }
        }
        counter >= 4;
    }
}
interface IJXServData {
    type: number;//类型
    level: number;//等级(兽灵id)
    suLv: number;//星宿等级(表id)
    suJie: number;//星宿阶数
    state: number;//是否激活（1是，0否）
    isOnBat: number;//是否出战（1是，0否）
    pifu: number;//幻形id
    datas: IJXData[];
}
interface IJXData {
    position: number;//位置110 111那些
    equipID: number;//装备id
    xiLianNum: number;//洗练次数
    datas: IJXDetail[];//上面的图标
    thdatas: IJXDetail[];//下面的图标

    suitVal: number;//套装属性 如果有就发4 代表永久激活
    suitStar: number;//星级属性1-10 代表该数字之前全部激活
}
interface IJXDetail {
    position: number;//位置1-4
    type: number;//1-4青龙 白虎 朱雀 玄武
    starID: number;//星级id
    isLock: number;//是否上锁（1是，0否)
}