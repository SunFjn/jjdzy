class Model_Boss extends BaseModel {
    public constructor() {
        super();
    }

    public bossHp: number = 0;
    public bossMaxHp: number = 0;
    public myHurt: number = 0;
    public rankData: any[] = [];// rank name hurt
    public bossResult: number = 0;//当前这场战斗的胜负
    public bossAward: any[] = [];
    public curEnterId: number = 0;

    /**进入boss场景 type=0是个人boss 1全民boss 3吕布 4跨服BOSS*/
    public static exitBoss(type?: number): void {
        let bs = GGlobal.modelBoss;
        GGlobal.modelScene.returnMainScene();
        bs.curEnterId = 0;
        GGlobal.layerMgr.close2(UIConst.BATTLEWIN);
        if (type == 0) {
            bs.personalBoss = 0;
            GGlobal.layerMgr.open(UIConst.DRBOSS);
        } else if (type == 1) {
            bs.dmgAdd = 0;
            bs.toperDmg = 0;
            bs.toperName = "";
            GGlobal.layerMgr.open(UIConst.QMBOSS);
        } else if (type == 2) {
            bs.myHurt = 0;
            bs.mhRankdata = [[], []];
            GGlobal.layerMgr.open(UIConst.BOSS_BATTLEFIELD_LOCAL);
        } else if (type == 3) {
            GGlobal.layerMgr.open(UIConst.LBBOSS);
        } else if (type == 4) {
            GGlobal.layerMgr.open(UIConst.MHBOSS);
        }
    }

    //=============个人BOSO
    public needCheckPersonal: boolean = true;
    public personalData: VoPersonalBoss[] = [];
    public personalBoss = 0;
    public personalMap = {};
    public sortPersonal() {
        this.personalData.sort(function (a, b) {
            return a.sortIndex > b.sortIndex ? -1 : 1;
        });
    }
    public initPersonal() {
        let lib = Config.solo_220;
        let vo: VoPersonalBoss;
        for (let i in lib) {
            vo = new VoPersonalBoss();
            vo.id = lib[i].id;
            vo.initLib();
            this.personalMap[vo.id] = vo;
            this.personalData.push(vo);
        }
    }
    //===============个人BOSO end

    //=================2全民boss
    public qmCount: number = 0;
    public static max: number = 5;
    public remainSec: number = 0;
    public myHp: number = 0;
    public qmData: Vo_QuanMinBoss[] = [];
    public qmMap = {};
    public qmHpMul = 0;
    public initQM() {
        let lib = Config.all_221;
        let vo: Vo_QuanMinBoss;
        for (let i in lib) {
            vo = new Vo_QuanMinBoss();
            vo.id = lib[i]["id"];
            vo.initLib();
            this.qmMap[vo.id] = vo;
            this.qmData.push(vo);
        }
    }
    public sortQuanMin() {
        // this.qmData.sort(function (a, b) {
        //     return a.sortIndex < b.sortIndex ? -1 : 1;
        // });
    }
    //=================全民BOSS end
    //==================魔神吕布=================
    public roleCount: number = 0;//场景角色数量
    public CDEnter: number = 0;//进入冷却时间
    public lvbuSt: number = 0;//状态 0未开启 1 :魔神1 2:魔神2 3:魔神3 4:boss已被击杀
    public newBoss: number = 0;
    public lifeTime: number = 0;
    //=================魔神吕布 end
    //==================七擒孟获=================
    public mhState: number = 0;//0未开启 1准备 2开启
    public mhCount: number = 0;
    public mhBuyCount: number = 0;
    public hpMul: number = 0;
    public MHcd: number = 0;
    public mhRankdata: any[] = [[], []];
    public dmgAdd: number = 0;//攻击加成次数
    public toperName: string = "";
    public toperDmg: number = 0;
    public mhBossDeadList = [];
    public MHKiller = "无";

    mhCFG: any[];
    mhVO: Vo_7MH;//当前的BOSS数据
    dtaIndex: number = 0;//当前界面需要显示的tab开始表索引
    lastZS: number = -1;
    tagDta: Vo_MHTag[];
    tagLen: number = 0;
    mhid: number = 0;
    //初始化表格数据
    public initMH() {
        let s = this;
        let zs = Model_player.voMine.zsID;
        if (zs == s.lastZS) return;
        if (!s.mhCFG) {
            s.mhCFG = [];
            let l: any = Config.seven_223;
            for (let i in l) {
                let vo: Vo_7MH = new Vo_7MH();
                vo.lib = l[i];
                vo.init();
                s.mhCFG.push(vo);
            }
            s.mhCFG.sort(function (a, b) { return a.sortIndex > b.sortIndex ? 1 : -1; });

            l = Config.sevenmb_223;
            for (let i in l) {
                s.tagLen++;
            }
        }
        s.lastZS = zs;
        let vo: Vo_7MH;
        let e = s.mhCFG.length;
        let d: number = (zs / 1000) >> 0;
        for (let j = 0; j < e; j++) {
            vo = s.mhCFG[j];
            if (j == e - 1 || (vo.sortIndex <= d && vo.sortMxIndex >= d)) {
                s.mhid = vo.id;
                s.mhVO = vo;
                if (j < 4) {
                    s.dtaIndex = 0;
                } else if (j + 4 < e) {
                    s.dtaIndex = j;
                } else {
                    s.dtaIndex = e - 4;
                }
                break;
            }
        }
        s.tagDta = [];
        let link = vo.linkID;
        for (let k = 1; k < s.tagLen + 1; k++) {
            let v = new Vo_MHTag();
            v.id = k;
            let b = Config.sevenmb_223[k];
            v.awards = JSON.parse(b["reward" + link]);
            v.condition = b["damage" + link];
            s.tagDta.push(v);
        }
    }

    //在进入孟获和打开界面的时候做一次假数据
    public initMHData() {
        let s = this;
        s.mhRankdata = [];
        //初始化国家奖励 个人的奖励
        let perArr = [];
        let countryArr = [];
        for (let i = 0; i < 10; i++) {
            if (i < 3) {
                countryArr.push([0, 0]);
            }
            perArr.push(["虚位以待", 0, 0]);
        }
        s.mhRankdata = [perArr, countryArr];
    }

    //当前可挑战孟获的ID
    public getCurrentMHVO() {
        this.initMH();
        let d: number = Model_player.voMine.zsID;
        if (d == 0) return null;
        for (let i = 0; i < this.mhCFG.length; i++) {
            let vo: Vo_7MH = this.mhCFG[i];
            let sZs = vo.condition[0][0];
            let endZs = vo.condition[0][1];
            if (d >= sZs && d <= endZs) {
                return vo;
            }
        }
    }

    //==================七擒孟获END=================
    listenServ(sc: WebSocketMgr) {
        let s = this;
        s.socket = sc;
        sc.regHand(1252, s.GC_DATA_1252, s);
        sc.regHand(1254, s.GC_FIGHT_1254, s);
        sc.regHand(1256, s.GC_AWARDS_1256, s);
        sc.regHand(1258, s.GC_SWEEP_1258, s);
        //全民BOSS
        sc.regHand(1352, s.GC_OPENUI_1352, s);
        sc.regHand(1354, s.GC_ENTER_1354, s);
        sc.regHand(1356, s.GC_RANK_1356, s);
        sc.regHand(1358, s.GC_KILLER_1358, s);
        sc.regHand(1360, s.GC_EXITE_1360, s);
        sc.regHand(1362, s.GC_RANKUI_1362, s);
        sc.regHand(1364, s.GC_UPDATE_1364, s);
        sc.regHand(1366, s.GC_DROPITEM_1366, s);
        sc.regHand(1368, s.GC_DANJI_RES_1368, s);
        sc.regHand(1370, s.GC_MOPUP_1370, s);
        //魔神吕布
        sc.regHand(1500, s.GC_BOSSNOTICE_1500, s);
        sc.regHand(1502, s.GC_LBRANK_1502, s);
        sc.regHand(1504, s.GC_LBOPENUI_1504, s);
        sc.regHand(1506, s.GC_LBINFO_1506, s);
        sc.regHand(1508, s.GC_LBEXITE_1508, s);
        sc.regHand(1510, s.GC_LBHERO_1510, s);
        sc.regHand(1512, s.GC_LBSCENE_1512, s);
        sc.regHand(1514, s.GC_LBBOSS_1514, s);
        sc.regHand(1516, s.GC_LBBOSS_1516, s);
        sc.regHand(1518, s.GC_LBENTER_1518, s);
        sc.regHand(1520, s.GC_LB_EXTRA_AWARDS_1520, s);
        sc.regHand(1522, s.GC_LBOPENUI_1522, s);
        sc.regHand(1524, s.GC_OPEN_AUTO_REVIVE_LVBU, s);
        sc.regHand(1526, s.GC_OPEN_REVIVE_LVBU, s);
        //七擒拿孟获
        sc.regHand(1700, s.GC_MHNOTICE_1700, s);
        sc.regHand(1702, s.GC_MHOPENUI_1702, s);
        sc.regHand(1704, s.GC_MHRANK_1704, s);
        sc.regHand(1706, s.GC_MHRELIFE_1706, s);
        sc.regHand(1708, s.GC_MHCOUNT_1708, s);
        sc.regHand(1710, s.GC_MHENTER_1710, s);
        sc.regHand(1712, s.GC_MHUPDATE_1712, s);
        sc.regHand(1714, s.GC_MHRANK1_1714, s);
        sc.regHand(1716, s.GC_MHTARGET_1716, s);
        sc.regHand(1718, s.GC_MHGETTARGET_1718, s);
        sc.regHand(1720, s.GC_MHADDDMG_1720, s);
        sc.regHand(1722, s.GC_MHBOSSDEAD_1722, s);
        sc.regHand(1724, s.GC_MHLIFE_1724, s);
        sc.regHand(1726, s.GC_KILLBOSS_1726, s);
        sc.regHand(1728, s.GC_EXTRA_AWARDS_1728, s);
        sc.regHand(1730, s.GC_OPEN_AUTO_REVIVE_MH, s);
        sc.regHand(1732, s.GC_OPEN_REVIVE_MH, s);
    }

    /**
     * 1251
     * 打开个人boss界面
     * */
    public CG_DATA_1251() {
        let b = this.getBytes();
        this.socket.sendCMDBytes(1251, b);
    }
    /**
     * 1252
     * [I-I-I]
     * 个人boss信息返回 [I:bossIdI:剩余挑战次数I:剩余冷却时间B:是否通关（0：否，1：是）]boss信息
     * */
    private GC_DATA_1252(self: Model_Boss, data: BaseBytes) {
        if (self.personalData.length == 0) self.initPersonal();
        let vo: VoPersonalBoss;
        let id;
        let count;
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            id = data.readInt();
            vo = self.personalMap[id];
            vo.count = data.readInt();
            let time = data.readInt();
            vo.setTime(time);
            vo.isClearance = data.readByte() == 1;
        }
        self.sortPersonal();
        self.needCheckPersonal = true;
        GGlobal.control.notify(Enum_MsgType.MSG_PBOSS_UI_UPDATE);
    }
    /**
     * 1253
     * I
     * 请求挑战个人Boss I:bossId
     * */
    public CG_FIGHT_1253(idx) {
        let b = this.getBytes();
        b.writeInt(idx);
        this.socket.sendCMDBytes(1253, b);
    }
    /**
     * 1254
     *	B-I-B
     * 请求挑战Boss结果 B:0：失败，1：成功I:失败：错误码（1：装备背包格子不足，2：boss未开启，3：已无挑战次数，4：boss未复活），成功：bossIdB:战斗结果：0：失败，1：成功
     * */
    private GC_FIGHT_1254(s: Model_Boss, data: BaseBytes) {
        let ret = data.readByte();
        let cod = data.readInt();
        let bt = data.readByte();
        if (ret == 0) {
            if (cod == 1) ViewCommonWarn.text("装备背包格子不足");
            else if (cod == 2) ViewCommonWarn.text("boss未开启");
            else if (cod == 3) ViewCommonWarn.text("无挑战次数");
            else if (cod == 4) ViewCommonWarn.text("boss未复活");
        } else {
            s.personalBoss = cod;
            s.bossResult = bt + 1;
            s.bossResult = s.bossResult == 3 ? 0 : s.bossResult;
            GGlobal.mapscene.enterScene(SceneCtrl.PBOSS);
        }
        s.needCheckPersonal = true;
    }
    /**
     * 1255
     * B-I
     * 战斗胜利，请求掉落 B:0：失败，1：胜利I:bossId
     * */
    public CG_FIGHT_1255(ret, idx) {
        let b = this.getBytes();
        b.writeByte(ret);
        b.writeInt(idx);
        this.socket.sendCMDBytes(1255, b);
    }
    /**
     * 1256
     *I-I-[B-I-I]
     * 掉落结算 I:bossIdI:剩余挑战次数[B:类型I:idI:数量]掉落数据
     * */
    private GC_AWARDS_1256(s: Model_Boss, data: BaseBytes) {
        let id = data.readInt();
        let vo = s.personalMap[id]
        vo.count = data.readInt();
        vo.isClearance = true;
        s.sortPersonal();

        let len = data.readShort();
        let info: number[][] = [];
        for (let i = 0; i < len; i++) {
            let type = data.readByte();
            let id = data.readInt();
            let count = data.readInt();
            let extra = data.readByte();
            info.push([type, id, count, extra]);
        }
        s.bossAward = ConfigHelp.makeItemListArr(info);
        for (let i = 0; i < len; i++) {
            s.bossAward[i].extra = info[i][3];
        }
        let npcId = vo.bossid;
        SceneDropCtrl.instance.notify(SceneDropCtrl.MSG_SCENE_DROP, { "id": npcId, "drop": info });
        s.needCheckPersonal = true;
        GGlobal.control.notify(Enum_MsgType.MSG_PBOSS_UI_UPDATE);
    }
    /**
     * 1257
     * 一键扫荡
     * */
    public CG_SWEEP_1257() {
        let b = this.getBytes();
        this.socket.sendCMDBytes(1257, b);
    }
    /**
     * 1258
     * [I-I]-[B-I-I]
     *一键扫荡结果 [I:bossIdI:剩余挑战次数]扫荡了的boss集合[B:类型I:idI:数量]掉落奖励
     * */
    private GC_SWEEP_1258(s: Model_Boss, data: BaseBytes) {
        let len = data.readShort();
        let i;
        for (i = 0; i < len; i++) {
            let id = data.readInt();
            let vo: VoPersonalBoss = s.personalMap[id]
            vo.count = data.readInt();
        }
        s.sortPersonal();

        let awards: any[] = [];
        len = data.readShort();
        for (i = 0; i < len; i++) {
            awards.push(ConfigHelp.parseItemBa(data));
            ConfigHelp.addSerGainText(awards[i].gType, awards[i].id, true, awards[i].count);
        }
        s.needCheckPersonal = true;
        GGlobal.control.notify(Enum_MsgType.MSG_PBOSS_UI_UPDATE);
        s.CG_DATA_1251();
    }

    //==============全民BOSS==================================================================
    /**1351 打开UI*/
    public CG_OPENUI_1351() {
        let ba = this.getBytes();
        this.socket.sendCMDBytes(1351, ba);
    }
    /**
     * 1352
     *B-I-[I-I-U-B]
     * GC 打开全名bossUi I:剩余进入全民boss次数I:次数恢复剩余秒[I:bossidI:重生开始时间戳U:最后击杀者名字B:BOSS当前血量]
     * */
    private GC_OPENUI_1352(self: Model_Boss, data: BaseBytes) {
        if (self.qmData.length == 0) self.initQM();
        self.qmCount = data.readInt();
        let time = data.readInt();
        self.remainSec = time * 1000 + Model_GlobalMsg.getServerTime();
        let len = data.readShort();
        let vo: Vo_QuanMinBoss;
        let id;
        for (let i = 0; i < len; i++) {
            id = data.readInt();
            vo = self.qmMap[id];
            vo.reliveTime = data.readInt();
            vo.lastKiller = data.readUTF();
            vo.curHp = data.readByte();
            vo.update();
        }
        self.sortQuanMin();
        GGlobal.control.notify(Enum_MsgType.MSG_QMBOSS_UPDATE);
        GGlobal.control.notify(Enum_MsgType.MSG_QMBOSS_LOGIN);
    }

    /**1353 CG 进入全民boss副本 I:副本id*/
    public CG_ENTER_1353(id) {
        if (Config.all_221[id].single == 1) {
            this.curEnterId = id;
            GGlobal.mapscene.enterScene(SceneCtrl.QMBOSS_DJ);
        } else {
            let ba = this.getBytes();
            ba.writeInt(id);
            this.socket.sendCMDBytes(1353, ba);
        }
    }
    /**
     * 1354
     * B-I
     * GC 进入全名boss B:0成功 1失败 2等级/转生不够 3次数不够 4你要退出当前场景I:副本id
     * */
    private GC_ENTER_1354(self: Model_Boss, data: BaseBytes) {
        let ret = data.readByte();
        switch (ret) {
            case 1:
                ViewCommonWarn.text("进入失败");
                break;
            case 2:
                ViewCommonWarn.text("未达进入条件");
                break;
            case 3:
                ViewCommonWarn.text("没有次数");
                break;
            case 4:
                ViewCommonWarn.text("当前场景不允许进入");
                break;
            case 0:
                let scenetype = GGlobal.mapscene.scenetype
                if (scenetype == SceneCtrl.QMBOSS || scenetype == SceneCtrl.QMBOSS_DJ) {
                    return;//按键精灵 会触发多次进入
                }
                self.curEnterId = data.readInt();
                if (self.curEnterId == 0) {
                    ViewCommonWarn.text("BOSS尚未复活");
                    self.CG_OPENUI_1351();
                    return;
                }
                if (Config.all_221[self.curEnterId].single == 1) {
                    GGlobal.mapscene.enterScene(SceneCtrl.QMBOSS_DJ);
                } else {
                    GGlobal.mapscene.enterScene(SceneCtrl.QMBOSS);
                }
                break;
            case 5:
                ViewCommonWarn.text("BOSS尚未复活");
                self.CG_OPENUI_1351();
                break;
        }
    }
    /**
     * 1356
     *L-L-L-L-[U-L]
     * GC 全民BOSS场景刷新数据 I:我的剩余血量L:boss气血上限L:boss当前气血L:我的伤害[U:名字L:伤害]伤害排行数据
     * */
    private GC_RANK_1356(self: Model_Boss, data: BaseBytes) {
        self.myHp = data.readLong();
        GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: self.myHp });
        self.bossMaxHp = data.readLong();
        self.bossHp = data.readLong();
        self.myHurt = data.readLong();
        let len = data.readShort();
        let temp = [];
        for (let i = 0; i < len; i++) {
            temp.push([i + 1, data.readUTF(), data.readLong()]);
        }
        self.rankData = temp;
        GGlobal.control.notify(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, self.bossHp);
    }
    /**
     * 1358
     *[L]
     *GC 被杀死的玩家 [L:玩家id]
     * */
    private GC_KILLER_1358(self: Model_Boss, data: BaseBytes) {
        let len = data.readShort();
        let temp = [];
        for (let i = 0; i < len; i++)
            temp.push(data.readLong());
        GGlobal.control.notify(Enum_MsgType.MSG_PLAYER_BEKILLED, temp);
    }

    /**1359 CG CG 离开当前全民boss关卡*/
    public CG_EXITE_1359() {
        let ba = this.getBytes();
        this.socket.sendCMDBytes(1359, ba);
    }
    /**
     * 1360
     *B-I
     * GC 离开全民boss关卡 B:0成功 1失败I:当前关卡id
     * */
    private GC_EXITE_1360(self: Model_Boss, data: BaseBytes) {
        self.curEnterId = 0;
        Model_Boss.exitBoss(1);
    }

    /**1361 CG 打开全名boss排行榜*/
    public CG_RANKUI_1361() {
        let ba = this.getBytes();
        this.socket.sendCMDBytes(1361, ba);
    }

    /**1361 单机版获取奖励 I:副本id*/
    public CG_GET_DANJI_RES_1367(id) {
        let ba = this.getBytes();
        ba.writeInt(id);
        this.socket.sendCMDBytes(1367, ba);
    }

    /**CG 扫荡全名boss副本 I:副本id*/
    public CG_MOPUP_1369(id) {
        let ba = this.getBytes();
        ba.writeInt(id);
        this.socket.sendCMDBytes(1369, ba);
    }
    /**
     * 1362
     *	B-[U-I]
     * GC 打开排行榜 B:0成功 1失败 2不在副本内[U:名字I:伤害量]
     * */
    private GC_RANKUI_1362(self: Model_Boss, data: BaseBytes) {
        let ret = data.readByte();
        if (ret != 0) return;
        let len = data.readShort();
        let temp = [];
        for (let i = 0; i < len; i++) {
            temp.push([i + 1, data.readUTF(), data.readInt()]);
        }
        self.rankData = temp;
        GGlobal.control.notify(Enum_MsgType.MSG_QMBOSS_RANKUPDATE);
    }
    /**
     * GC 登录推送全民BOSS的数据 I:剩余挑战次数I:I:次数恢复时间戳[B:boss索引B:boss状态0:未刷新 1已刷新]
     * 	B-I-[B-B]
     * check red
    */
    private GC_UPDATE_1364(self: Model_Boss, data: BaseBytes) {
        if (!GGlobal.isEnterGame) return;
        if (self.qmData.length == 0) self.initQM();
        self.qmCount = data.readInt();
        self.remainSec = data.readInt() * 1000 + Model_GlobalMsg.getServerTime();
        let vo: Vo_QuanMinBoss;
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let id = data.readByte();
            let st = data.readByte();
            vo = self.qmMap[id];
            vo.st = st;
        }
        self.sortQuanMin();
        GGlobal.control.notify(Enum_MsgType.MSG_QMBOSS_LOGIN);
    }

    /**
     * 	B-[B-I-I]
     * 1366
     * 	GC boss死亡奖励发放 B:boss索引[B:道具类型I:道具idI:道具数量]
    */
    private GC_DROPITEM_1366(self: Model_Boss, data: BaseBytes) {
        let temp: any[] = [];
        let npcId = data.readByte();
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            temp.push([data.readByte(), data.readInt(), data.readInt(), data.readByte()]);
        }
        self.bossAward = ConfigHelp.makeItemListArr(temp);
        for (let i = 0; i < temp.length; i++) {
            self.bossAward[i].extra = temp[i][3]
        }

        GGlobal.control.notify(Enum_MsgType.MSG_QMBOSS_DEAD);
    }

    private GC_DANJI_RES_1368(self: Model_Boss, data: BaseBytes) {

        let res = data.readByte();
        if (res == 1) {
            let fubId = data.readInt();
            let size = data.readShort();
            let dropArr = []
            for (let i = 0; i < size; i++) {
                dropArr.push([data.readByte(), data.readInt(), data.readInt(), data.readByte()]);
            }
            self.bossAward = ConfigHelp.makeItemListArr(dropArr);
            for (let i = 0; i < dropArr.length; i++) {
                self.bossAward[i].extra = dropArr[i][3]
            }
            GGlobal.control.notify(Enum_MsgType.MSG_QMBOSS_DANJI_RES);
        }
    }
    //GC扫荡结果 B:0成功1等级或者vip未达标2没有通关过3有人在副本内不能扫荡I:副本id
    private GC_MOPUP_1370(self: Model_Boss, data: BaseBytes) {
        let res = data.readByte();
        if (res == 0) {
            let id = data.readInt();
            // if (self.qmCount > 0) {
            //     self.qmCount--;
            // }
            let size = data.readShort();
            let dropArr = []
            for (let i = 0; i < size; i++) {
                dropArr.push([data.readByte(), data.readInt(), data.readInt(), data.readByte()]);
            }
            ViewCommonWarn.text("扫荡成功");
            GGlobal.control.notify(Enum_MsgType.MSG_QMBOSS_SAODAN, ConfigHelp.makeItemListArr(dropArr));
            //请求boss 死亡后的数据
            self.CG_OPENUI_1351();
        } else {
            ViewCommonWarn.text(["等级或者vip未达标", "没有通关过", "有人在副本内不能扫荡"][res - 1])
        }
    }
    //===================全民BOSS END===============

    //===================吕布===========================
    /**1500
     * b
     * GC 魔神吕布活动信息 B:0未开启 1 :魔神1 2:魔神2 3:魔神3 4:boss已被击杀
    */
    private GC_BOSSNOTICE_1500(self: Model_Boss, data: BaseBytes) {
        self.lvbuSt = data.readByte();
        GGlobal.control.notify(Enum_MsgType.LB_NOTICE);
    }
    /**
     * CG 打开魔神上届排行榜 
     * */
    public CG_LBRANK_1501() {
        let ba = this.getBytes();
        this.socket.sendCMDBytes(1501, ba);
    }
    /**1502
     * [B-U-L]
     * GC 打开上一届魔神排行榜 [B:名次U:名字L:伤害]
    */
    private GC_LBRANK_1502(self: Model_Boss, data: BaseBytes) {
        self.rankData = [];
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            self.rankData.push([data.readByte(), data.readUTF(), data.readLong()]);
        }
        for (let i = len; i < 10; i++) {
            self.rankData.push([i + 1, "虚位以待", 0]);
        }
        GGlobal.control.notify(Enum_MsgType.RANK_UPDATE);
    }
    /**
   * CG CG 进入魔神吕布房间 
   * */
    public CG_LBENTER_1503() {
        let ba = this.getBytes();
        this.socket.sendCMDBytes(1503, ba);
    }
    /**1504
     * I-I-I-I-B
     * GC 打开魔神吕布界面 I:当前bossidI:副本内人数L:剩余血量L:血量最大值B:惩罚剩余时间
    */
    private GC_LBOPENUI_1504(self: Model_Boss, data: BaseBytes) {
        self.curEnterId = data.readInt();
        self.roleCount = data.readInt();
        self.bossHp = data.readLong();
        self.bossMaxHp = data.readLong();
        let s = data.readByte();
        self.CDEnter = s * 1000 + Model_GlobalMsg.getServerTime();
        GGlobal.control.notify(Enum_MsgType.LB_OPENUI);
    }

    private GC_LBOPENUI_1522(self: Model_Boss, data: BaseBytes) {
        self.qmHpMul = data.readInt();
    }
    /**1506
     * I-I-L-L-L-[U-L] 
     * GC 场景刷新个人以及boss数据 I:我的剩余血量I:bossidL:boss气血上限L:boss当前气血L:我的伤害[U:名字L:伤害]伤害排行数据
    */
    private GC_LBINFO_1506(self: Model_Boss, data: BaseBytes) {
        self.myHp = data.readLong();
        self.curEnterId = data.readInt();
        self.bossMaxHp = data.readLong();
        self.bossHp = data.readLong();
        self.myHurt = data.readLong();
        let len = data.readShort();
        self.rankData = [];
        for (let i = 0; i < len; i++) {
            self.rankData.push([i + 1, data.readUTF(), data.readLong()]);
        }
        for (let i = len; i < 10; i++) {
            self.rankData.push([i + 1, "虚位以待", 0]);
        }
        GGlobal.control.notify(Enum_MsgType.RANK_UPDATE);
    }
    /**1507
     * CG 离开魔神吕布 
     * */
    public CG_LBEXITE_1507() {
        let ba = this.getBytes();
        this.socket.sendCMDBytes(1507, ba);
        Model_Boss.exitBoss(3);
    }
    /**1508
    * GC 离开魔神吕布房间 B:0离开成功 1失败
    * */
    private GC_LBEXITE_1508(self: Model_Boss, data: BaseBytes) {
        let ret = data.readByte();
        if (ret == 0) {
            if (GGlobal.sceneType != SceneCtrl.GUANQIA) {//防止后端需要直接踢人
                Model_Boss.exitBoss(3);
            }
        }
        else ViewCommonWarn.text("退出场景失败");
    }
    /**1510
     *	[L]-B
    * GC 人物死亡或者复活 [L:玩家id]B:0活着 1死亡
    * */
    private GC_LBHERO_1510(self: Model_Boss, data: BaseBytes) {
        let temp = [];
        let hasMine = false;
        let mine = Model_player.voMine.id;
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let id = data.readLong();
            temp.push(id);
            if (id == mine) {
                hasMine = true;
            }
        }
        let ret = data.readByte();
        if (hasMine) {
            if (ret == 1) {
                self.lifeTime = Model_GlobalMsg.getServerTime() + ConfigHelp.getSystemNum(1012) * 1000;
            }
            GGlobal.control.notify(Enum_MsgType.LB_ROLE_LIFE, ret);
        }
        GGlobal.control.notify(Enum_MsgType.LB_SCENE_PLAYER_STATE, { st: ret, list: temp });
    }
    /**1512
     *  [L] 
     * GC 其他被击杀的玩家 [L:其他被boss杀死的玩家id]
     * */
    private GC_LBSCENE_1512(self: Model_Boss, data: BaseBytes) {
    }
    /**1514
    *   B-I-I-I-L 
    * GC boss被击杀 B:活动状态变化 0未开启 1 :魔神1 2:魔神2 3:魔神3 4:boss已被击杀 5挑战失败超时I:被击杀bossidI:新bossidL:新boss血量上限
    * */
    private GC_LBBOSS_1514(self: Model_Boss, data: BaseBytes) {
        self.lvbuSt = data.readByte();
        console.log("魔神吕布状态：" + self.lvbuSt);
        self.curEnterId = data.readInt();
        self.bossMaxHp = data.readLong();
        if (self.lvbuSt == 4) {
            GGlobal.control.notify(Enum_MsgType.LB_NOTICE);
        }
        GGlobal.control.notify(Enum_MsgType.LB_BOSS_STATE);
    }
    /**1515
     * CG 买活
     * */
    public CG_LBRELIFE_1515(i) {
        let ba = this.getBytes();
        ba.writeByte(i);
        this.socket.sendCMDBytes(1515, ba);
    }
    /**1516
     *   B
     * GC 买活返回 B:0成功 1失败
     * */
    private GC_LBBOSS_1516(self: Model_Boss, data: BaseBytes) {
        let ret = data.readByte();
        if (ret == 0) GGlobal.control.notify(Enum_MsgType.LB_ROLE_LIFE);
        // else ViewCommonWarn.text("复活失败");
    }

    /**
     * 1517
     * 进入房间
    */
    public CG_LB_ENTER_1517() {
        this.sendSocket(1517, this.getBytes());
    }

    /**1518
    * B
    *请求进入魔神吕布房间返回 B:0成功 1失败 2活动还没开始 3活动已经结束 4惩罚30s时间内
   */
    private GC_LBENTER_1518(self: Model_Boss, data: BaseBytes) {
        let ret = data.readByte();
        if (ret == 0) {
            GGlobal.layerMgr.close2(UIConst.LBBOSS);
            GGlobal.mapscene.enterScene(SceneCtrl.LVBU);
        } else if (ret == 1) {
            ViewCommonWarn.text("进入失败");
        } else if (ret == 2) {
            ViewCommonWarn.text("活动尚未开始");
        } else if (ret == 3) {
            ViewCommonWarn.text("活动已结束");
        } else if (ret == 4) {
            ViewCommonWarn.text("正在冷却中");
        }
    }

    /**
     * CG 通知后端本人死亡
    */
    public CG_TELL_DEAD_1519() {
        this.sendSocket(1519, this.getBytes());
    }

    public lb_extra_award = [];
    public GC_LB_EXTRA_AWARDS_1520(self: Model_Boss, data: BaseBytes) {
        data.readInt();
        self.lb_extra_award = ConfigHelp.parseItemListBa(data);
    }

    //GC 自动复活状态 B:1开启自动复活 0关闭自动
    public CG_OPEN_AUTO_REVIVE_LVBU(type) {
        let ba = this.getBytes();
        ba.writeByte(type);
        this.sendSocket(1523, ba);
    }
    //GC 自动复活状态 B:1开启自动复活 0关闭自动
    private GC_OPEN_AUTO_REVIVE_LVBU(m: Model_Boss, ba: BaseBytes) {
        let type = ba.readByte();
        GGlobal.control.notify("revieauto", type);
    }
    //GC 自动复活结果 B:0成功 1失败
    private GC_OPEN_REVIVE_LVBU(m: Model_Boss, ba: BaseBytes) {
        let type = ba.readByte();
        if (type == 0) {
            ViewCommonWarn.text("复活成功");
        } else {
            ViewCommonWarn.text("元宝不足,自动复活失败");
            m.CG_OPEN_AUTO_REVIVE_LVBU(0);
        }
    }

    /**=================七擒拿孟获**/
    /**
     * 1700 B
     * GC 登陆发生活动状态 B:0未开启 1准备 2开启中
    */
    private GC_MHNOTICE_1700(s: Model_Boss, d: BaseBytes) {
        s.mhState = d.readByte();
        if (GGlobal.isEnterGame) {
            s.setMengHuoState();
        } else {
            GGlobal.modelLogin.handList.push(Handler.create(s, s.setMengHuoState));
        }
    }

    private setMengHuoState() {
        console.log("GC_MHNOTICE_1700");
        let s = this;
        s.initMH();
        if (s.mhState != 2) s.mhBossDeadList = [];
        GGlobal.control.notify(Enum_MsgType.MH_STATE);
        GGlobal.control.notify(Enum_MsgType.MH_STATECHANGE);
    }
    /**
     * 1701 
     * 打开界面 I:zsbossid
    */
    public CG_MHOPENUI_1701(i) {
        let b = this.getBytes();
        b.writeInt(i);
        this.sendSocket(1701, b);
    }
    /**
    * 1702 B-B-B-B
    *GC 打开ui返回 B:剩余进入次数B:已经购买次数B:boss血量加成倍数B:进入冷却倒计时
   */
    private GC_MHOPENUI_1702(s: Model_Boss, d: BaseBytes) {
        s.mhCount = d.readByte();
        s.mhBuyCount = d.readByte();
        s.hpMul = d.readByte();
        s.MHcd = d.readByte() * 1000 + Model_GlobalMsg.getServerTime();
        s.MHKiller = d.readUTF();
        s.MHKiller = s.MHKiller == "" ? "无" : s.MHKiller;
        GGlobal.control.notify(Enum_MsgType.MH_OPEN);
    }
    /**
   * 1703 I
   *CG 查询某个boss的排行榜 I:bossid
  */
    public CG_MHRANK_1703(i) {
        let b = this.getBytes();
        b.writeInt(i);
        this.sendSocket(1703, b);
    }
    /**1704
    * [U-L-L]-B-[B-L]
    * GC 打开排行榜 [U:名字L:总伤害L:玩家id]B:我的势力[B:势力编号L:势力总伤害]
   */
    private GC_MHRANK_1704(s: Model_Boss, d: BaseBytes) {
        s.initMHData();
        let personArr = s.mhRankdata[0];
        for (let i = 0, j = d.readShort(); i < j; i++) {
            personArr[i] = [d.readUTF(), d.readLong(), d.readLong()];
        }
        d.readByte();
        let countryArr = s.mhRankdata[1];
        for (let i = 0, j = d.readShort(); i < j; i++) {
            countryArr[i] = [d.readByte(), d.readLong()];
        }
        GGlobal.control.notify(Enum_MsgType.MH_RANK);
    }

    /**1705
     * CG （跨服）买活
    */
    public CG_MHRELIFE_1705(i) {
        let b = this.getBytes();
        b.writeByte(i);
        this.sendSocket(1705, b, true);
    }
    /**
    *1706 B
    * GC 买活返回 B:0成功 1失败
   */
    private GC_MHRELIFE_1706(s: Model_Boss, d: BaseBytes) {
        if (d.readByte() == 0) GGlobal.control.notify(Enum_MsgType.MH_ROLELIFE);
        // else ViewCommonWarn.text("复活失败");
    }

    /**1707
     * CG 买进入次数
    */
    public GC_MHCOUNT_1707() {
        let b = this.getBytes();
        this.sendSocket(1707, b);
    }
    /**
    *1708 B B
    *GC 买次数返回 B:0成功 1失败B:剩余次数
   */
    private GC_MHCOUNT_1708(s: Model_Boss, d: BaseBytes) {
        let r = d.readByte();
        s.mhCount = d.readByte();
        if (r == 0) {
            s.mhBuyCount++;
            GGlobal.control.notify(Enum_MsgType.MH_OPEN);
            ViewCommonWarn.text("购买成功");
        }
    }

    /**1709
    * CG 进入跨服boss
    */
    public CG_MHENTER_1709() {
        let b = this.getBytes();
        this.sendSocket(1709, b);
    }
    /**
    *1710 B-[B]-B-I-L-L-L-L
    *GC 进入返回 B:0成功1失败 2活动未开启 3boss已经死亡 4次数不够[B:伤害目标奖励情况]B:购买攻击加成次数I:剩余复活时间L:自身血量L:自身最大血量L:boss血量L:boss最大血量
   */
    private GC_MHENTER_1710(s: Model_Boss, d: BaseBytes) {
        let r = d.readByte();
        if (r == 0) {
            s.initMHData();
            let l = d.readShort();
            for (let i = 0; i < l; i++) {
                s.tagDta[i].state = d.readByte();
            }
            s.dmgAdd = d.readByte();
            d.readInt();
            s.myHp = d.readLong();
            d.readLong();
            s.bossHp = d.readLong();
            s.bossMaxHp = d.readLong();
            GGlobal.control.notify(Enum_MsgType.MH_SCENE);
            GGlobal.mapscene.enterScene(SceneCtrl.MENGHUO);
        } else {
            if (r == 1) {
                ViewCommonWarn.text("进入失败");
            } else if (r == 2) {
                ViewCommonWarn.text("活动未开启");
            } else if (r == 3) {
                ViewCommonWarn.text("boss已经被击杀");
            } else if (r == 4) {
                ViewCommonWarn.text("没有进入次数");
                GGlobal.control.notify(Enum_MsgType.MH_ENTER_FAIL);
            } else if (r == 5) {
                ViewCommonWarn.text("正在冷却中");
            }
            Model_WorldNet.exiteCross();
            console.log("孟获击杀BOSS 断开中央服");
        }
    }

    /**1711
     * CG （跨服）离开跨服boss
    */
    public CG_MHEXITE_1711() {
        let b = this.getBytes();
        this.sendSocket(1711, b, true);
        Model_WorldNet.exiteCross();
        console.log("孟获 主动断开中央服");
    }
    /**
    *1712 I-L-L-L-L-U-L-[B-L]
    *GC 同步伤害 I:bossidL:boss当前血量L:boss最大血量L:本人当前血量L:我的伤害U:最高伤害玩家名字L:最高玩家的伤害[B:势力L:伤害总量]
   */
    private GC_MHUPDATE_1712(s: Model_Boss, d: BaseBytes) {
        s.curEnterId = d.readInt();
        s.bossHp = d.readLong();
        s.bossMaxHp = d.readLong();
        s.myHp = d.readLong();
        s.myHurt = d.readLong();
        s.toperName = d.readUTF();
        s.toperDmg = d.readLong();
        let countryArr = s.mhRankdata[1];
        for (let i = 0, j = d.readShort(); i < j; i++) {
            countryArr[i] = [d.readByte(), d.readLong()];
        }
        GGlobal.control.notify(Enum_MsgType.MH_SCENE);
    }

    /**1713 I
    * CG （跨服）打开boss伤害Rank I:bossid
   */
    public CG_MHRANK1_1713(i) {
        let b = this.getBytes();
        b.writeInt(i);
        this.sendSocket(1713, b, true);
    }
    /**
    *1714 I-[U-L]
    *GC 打开当前boss排行榜 I:bossid[U:玩家名字L:玩家伤害]
   */
    private GC_MHRANK1_1714(s: Model_Boss, d: BaseBytes) {
        d.readInt();
        let personArr = s.mhRankdata[0];
        for (let i = 0, j = d.readShort(); i < j; i++) {
            personArr[i] = [d.readUTF(), d.readLong()];
        }
        GGlobal.control.notify(Enum_MsgType.MH_RANK);
    }

    /**1715
     * CG （跨服）打开奖励状态
    */
    public CG_MHTARGET_1715() {
        let b = this.getBytes();
        this.sendSocket(1715, b, true);
    }
    /**
    *1716 [B]
    *CG 打开目标伤害奖励领取情况 [B:奖励状态]
   */
    private GC_MHTARGET_1716(s: Model_Boss, d: BaseBytes) {
        let l = d.readShort();
        for (let i = 0; i < l; i++) {
            s.tagDta[i].state = d.readByte();
        }
        GGlobal.control.notify(Enum_MsgType.MH_TAGERT, 0);
    }

    /**1717 b
     *CG （跨服）获取奖励 B:奖励索引
    */
    public CG_MHGETTARGET_1717(i) {
        let b = this.getBytes();
        b.writeByte(i);
        this.sendSocket(1717, b, true);
    }
    /**
    *1718 B-B-B
    *GC 获取奖励返回 B:0成功 1失败B:奖励下标B:奖励状态
   */
    private GC_MHGETTARGET_1718(s: Model_Boss, d: BaseBytes) {
        if (d.readByte() == 0) {
            s.tagDta[d.readByte()].state = d.readByte();
            GGlobal.control.notify(Enum_MsgType.MH_TAGERT, 1);
            ViewCommonWarn.text("领取成功");
        }
    }

    /**1719
     * CG （跨服）购买攻击buff
    */
    public CG_MHADDDMG_1719() {
        let b = this.getBytes();
        this.sendSocket(1719, b, true);
    }
    /**
    *1720 B-B
    *GC GC 购买攻击加成 B:0成功1失败B:当前攻击加成次数
   */
    private GC_MHADDDMG_1720(s: Model_Boss, d: BaseBytes) {
        if (d.readByte() == 0) {
            s.dmgAdd = d.readByte();
            ViewCommonWarn.text("伤害+" + (s.dmgAdd * 10) + "%");
            GGlobal.control.notify(Enum_MsgType.MH_SCENE);
        }
    }

    /**
     *1722 
    *GC 通知地图玩家 被boss击杀的玩家id [L:]玩家id
    */
    private GC_MHBOSSDEAD_1722(s: Model_Boss, d: BaseBytes) {
        let id = Model_player.voMine.id;
        let le = d.readShort();
        let temp = [];
        for (let i = 0; i < le; i++) {
            let l = d.readLong();
            if (l == id) {
                GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: 0 });
                s.lifeTime = Model_GlobalMsg.getServerTime() + ConfigHelp.getSystemNum(1012) * 1000;
                GGlobal.control.notify(Enum_MsgType.MH_ROLELIFE, 1);
            } else {
                temp.push(l);
            }
        }
        GGlobal.control.notify(Enum_MsgType.MH_SCENE_PLAYER_STATE, { st: 1, list: temp });
    }

    /**
     *1724 L
    *GC 通知玩家复活 L:玩家当前血量
    */
    private GC_MHLIFE_1724(s: Model_Boss, d: BaseBytes) {
        let id = Model_player.voMine.id;
        let le = d.readShort();
        let temp = [];
        for (let i = 0; i < le; i++) {
            let l = d.readLong();
            if (l == id) {
                if (Model_player.voMine.sceneChar) Model_player.voMine.sceneChar.curhp = Model_player.voMine.sceneChar.maxhp;
                GGlobal.control.notify(Enum_MsgType.MH_ROLELIFE, 0);
            } else {
                temp.push(l);
            }
        }
        GGlobal.control.notify(Enum_MsgType.MSG_PLAYER_RELIFE, temp);
    }


    /**
     * 1726
     * GC 被击杀的boss [I:bossid]
    */
    private GC_KILLBOSS_1726(s: Model_Boss, d: BaseBytes) {
        s.mhBossDeadList = [];
        for (let i = 0, j = d.readShort(); i < j; i++) {
            s.mhBossDeadList.push(d.readInt());
        }
        GGlobal.control.notify(Enum_MsgType.MH_STATE);
        let deadlist = GGlobal.modelBoss.mhBossDeadList;
        if (deadlist.indexOf(GGlobal.modelBoss.curEnterId) >= 0) {
            GGlobal.control.notify(Enum_MsgType.MH_STATECHANGE);
        }
    }


    /**1727
     * CG （跨服）通知后端本人死亡
    */
    public CG_MH_TELL_DEAD() {
        let b = this.getBytes();
        this.sendSocket(1727, b, true);
    }

    mh_extra_awards = [];
    public GC_EXTRA_AWARDS_1728(s: Model_Boss, d: BaseBytes) {
        let aid = d.readInt();
        s.mh_extra_awards = ConfigHelp.parseItemListBa(d);
        let awards = Config.seven_223[GGlobal.modelBoss.curEnterId].joinreward;
        awards = ConfigHelp.makeItemListArr(JSON.parse(awards));
        GGlobal.modelBoss.bossAward = s.mh_extra_awards.concat(awards);
        GGlobal.control.notify(Enum_MsgType.BATTLEWIN_AWARDSCHANGE);
    }

    //GC 自动复活状态 B:1开启自动复活 0关闭自动
    public CG_OPEN_AUTO_REVIVE_MH(type) {
        let ba = this.getBytes();
        ba.writeByte(type);
        this.sendSocket(1729, ba, true);
    }
    //GC 自动复活状态 B:1开启自动复活 0关闭自动
    private GC_OPEN_AUTO_REVIVE_MH(m: Model_Boss, ba: BaseBytes) {
        let type = ba.readByte();
        GGlobal.control.notify("revieauto", type);
    }

    //GC 自动复活结果 B:0成功 1失败
    private GC_OPEN_REVIVE_MH(m: Model_Boss, ba: BaseBytes) {
        let type = ba.readByte();
        if (type == 0) {
            ViewCommonWarn.text("复活成功");
        } else {
            ViewCommonWarn.text("元宝不足,自动复活失败");
            m.CG_OPEN_AUTO_REVIVE_MH(0);
        }
    }
}