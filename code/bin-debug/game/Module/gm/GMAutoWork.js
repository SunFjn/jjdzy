if (true) {
    var GMAutoWork_1 = (function () {
        function GMAutoWork() {
        }
        /**
         * 自动做任务
         */
        GMAutoWork.autoWork = function () {
            var gmDataAll = GGlobal.layerMgr.getView(UIConst.GM);
            if (!gmDataAll)
                return;
            var info = gmDataAll.gmConfig[0];
            if (!info)
                return;
            var gmOpenData = info[6];
            var open = gmOpenData.text;
            var openInt = parseInt(open);
            if (openInt != 1)
                return;
            if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelGuanQia.inGuanQiaBoss()) {
                return;
            }
            ViewCommonWarn.text("Bibi..Bibibi.....");
            var str = Model_player.voMine.str;
            var timeNow = Model_GlobalMsg.getServerTime();
            var hours9 = TimeUitl.getTimeByHoursMin(timeNow, 9);
            var hours10 = TimeUitl.getTimeByHoursMin(timeNow, 10);
            var hours12 = TimeUitl.getTimeByHoursMin(timeNow, 12);
            var hours1207 = TimeUitl.getTimeByHoursMin(timeNow, 12, 7);
            var hours1230 = TimeUitl.getTimeByHoursMin(timeNow, 12, 30);
            var hours13 = TimeUitl.getTimeByHoursMin(timeNow, 13);
            var hours14 = TimeUitl.getTimeByHoursMin(timeNow, 14);
            var hours1407 = TimeUitl.getTimeByHoursMin(timeNow, 14, 7);
            var hours1415 = TimeUitl.getTimeByHoursMin(timeNow, 14, 15);
            var hours18 = TimeUitl.getTimeByHoursMin(timeNow, 18);
            var hours1830 = TimeUitl.getTimeByHoursMin(timeNow, 18, 30);
            var hours19 = TimeUitl.getTimeByHoursMin(timeNow, 19);
            var hours2030 = TimeUitl.getTimeByHoursMin(timeNow, 20, 30);
            var hours21 = TimeUitl.getTimeByHoursMin(timeNow, 21);
            var hours2130 = TimeUitl.getTimeByHoursMin(timeNow, 21, 30);
            var hours22 = TimeUitl.getTimeByHoursMin(timeNow, 22);
            //自动熔炼
            // GGlobal.layerMgr.open(UIConst.RONGLIAN);
            var _sendList = Model_RongLian.onekeyRongLianArr();
            if (_sendList.length > 0) {
                GGlobal.modelRL.CG_RL_EQUIP_LIST(1, _sendList);
            }
            // GGlobal.layerMgr.close2(UIConst.RONGLIAN);
            //1小时只执行1次
            if (GMAutoWork.workOneTimes == 0) {
                GGlobal.layerMgr.open(UIConst.RUNMAN);
                GMAutoWork.workOneTimes = 1;
            }
            else if (timeNow - GMAutoWork.workOneTimes >= 60 * 60) {
                //过关斩将
                GGlobal.modelRunMan.CG_OneKey(1);
                GMAutoWork.workOneTimes = 2;
                GGlobal.layerMgr.close(UIConst.RUNMAN);
                //活动预览每日礼包
                GGlobal.modelactPreView.CG4051();
                //个人boss 扫荡
                GGlobal.modelBoss.CG_SWEEP_1257();
                //升阶秘境 扫荡  不自动扫荡了，会熔炼掉
                // GGlobal.modelSJMJ.CG3787(0);
                //材料副本 扫荡
                GGlobal.modelcailiao.CG_CAILIAOFUBEN_SAODANG();
                //闯关 千人斩
                GGlobal.modelGuanQia.CG_ZHANSHA_1111();
                GMAutoWork.workOneTimes = timeNow;
            }
            // 每1分钟执行一次
            if (GMAutoWork.timeOneMinute == 0)
                GMAutoWork.timeOneMinute = timeNow;
            if (timeNow - GMAutoWork.timeOneMinute > 60 * 1000) {
                GMAutoWork.timeOneMinute = timeNow;
                //宝物现世
                GGlobal.modelbwXianShi.CG_GETAWARDS_4001();
                //闯关 扫荡
                // GGlobal.modelGuanQia.CG_SWEEP_1109();
                //国家捐献
                // GGlobal.layerMgr.open(UIConst.COUNTRY_DONATE);	
                // if (Model_Country.donateNumCoin > 0) {
                GGlobal.modelCountry.CG_DONATION(1);
                // }
                // GGlobal.layerMgr.close(UIConst.COUNTRY_DONATE);	
            }
            // 跨服组队  10-12点  
            if (hours10 < timeNow && timeNow < hours12 && Model_CrossTeam.surNum > 0) {
                if (!GGlobal.layerMgr.isOpenView(UIConst.CROSS_TEAM)) {
                    // if(!ModuleManager.isOpen(UIConst.CROSS_TEAM)){
                    GGlobal.layerMgr.open(UIConst.CROSS_TEAM);
                    // if(Model_CrossTeam.surNum <= 0)
                    // 	GGlobal.layerMgr.close(UIConst.CROSS_TEAM);
                    // }
                }
                return;
            }
            //隆中对（14-14点10）
            if (hours12 <= timeNow && timeNow <= hours1207) {
                GGlobal.layerMgr.open(UIConst.LONGZHONGDUI);
                var m = GGlobal.modelActivityHall;
                var score = m.lzd_score;
                if (score >= 260)
                    return;
                var state = m.lzd_st;
                if (state == 2) {
                    var lib = Config.lzd_234[m.lzd_id];
                    var it = m.lzd_data;
                    var answer = 1;
                    for (var i = 0; i < 4; i++) {
                        var index = it[i];
                        if (index == 1) {
                            answer = i + 1;
                            break;
                        }
                    }
                    // var rightPro=Math.floor(Math.random()*10+1);
                    // if( rightPro<=2)//答题，百分之80概率正确
                    // if(GMAutoWork.lzdWrong1Times==0){//做错1道题
                    // 	GMAutoWork.lzdWrong1Times = 1;
                    // 	answer = answer >2? answer-1: answer+1;
                    // }
                    GGlobal.modelActivityHall.CG_ANSWER_1983(answer); //全对。。
                }
                return;
            }
            //魔神吕布  12:30-13  18:30-19  21:30-22
            if ((hours1230 < timeNow && timeNow < hours13) || (hours1830 < timeNow && timeNow < hours19) || (hours2130 < timeNow && timeNow < hours22)) {
                GGlobal.layerMgr.open(UIConst.LBBOSS);
                setTimeout(function () {
                    GGlobal.modelBoss.CG_LB_ENTER_1517();
                    GGlobal.layerMgr.close(UIConst.LBBOSS);
                }, 1000);
            }
            //单刀赴会  20:30-21:20
            if (hours2030 < timeNow && timeNow < hours2130) {
                GGlobal.layerMgr.open(UIConst.ARENA, 1);
                if (Model_DDFH.battleNum > 0) {
                    GGlobal.modelddfh.CG_DANDAOFH_MATHENEMY(); //请求匹配
                    return;
                }
            }
            // 9-10点，或者每1分钟执行一次
            if ((hours9 < timeNow && timeNow < hours10) || timeNow - GMAutoWork.timeOneMinute2 > 60 * 1000) {
                GMAutoWork.timeOneMinute2 = timeNow;
                //南征北战
                GGlobal.layerMgr.open(UIConst.NANZHENG_BEIZHAN);
                if (Model_NZBZ.battleNum > 0) {
                    GGlobal.modelnzbz.CG_NZBZ_RES_ENEMY();
                    var enemyArr = Model_NZBZ.enemyArr;
                    for (var i = 0, len = enemyArr.length; i < len; i++) {
                        var data = enemyArr[i];
                        var power = data.power;
                        if (str > power) {
                            GGlobal.modelnzbz.CG_NZBZ_BATTLE(data.id);
                            return;
                        }
                    }
                }
                GGlobal.layerMgr.close2(UIConst.NANZHENG_BEIZHAN);
                //三国战神
                GGlobal.layerMgr.open(UIConst.SANGUO_ZHANSHEN);
                if (Model_SGZS.battleNum > 0) {
                    GGlobal.modelsgzs.CG_RESENEMY_SANGUO_ZHANSHEN();
                    var enemyArr = Model_SGZS.roleVoArr;
                    for (var i = 0, len = enemyArr.length; i < len; i++) {
                        var data = enemyArr[i];
                        var power = data.power;
                        if (i == 5 && str > power && Model_SGZS.battleNum > 0) {
                            GGlobal.modelsgzs.CG_BATTLE_SANGUO_ZHANSHEN(data.roleId, data.rank);
                            return;
                        }
                    }
                    return;
                }
                GGlobal.layerMgr.close2(UIConst.SANGUO_ZHANSHEN);
                //全民boss
                GGlobal.layerMgr.open(UIConst.BOSS, 1);
                if (GGlobal.modelBoss.qmCount > 0) {
                    var m = GGlobal.modelBoss;
                    var dta = m.qmData;
                    var selID = 0;
                    for (var i = dta.length - 1; i >= 0; i--) {
                        var v = dta[i];
                        if (selID == 0 && v.isOpen() && v.curHp != 0 && GMAutoWork.qmBossMaxID <= v.id) {
                            selID = v.id;
                            break;
                        }
                    }
                    if (selID != 0) {
                        GMAutoWork.qmBossMaxID = selID;
                        GGlobal.modelBoss.CG_ENTER_1353(selID);
                        return;
                    }
                }
                GGlobal.layerMgr.close2(UIConst.BOSS);
                //王位之争 王位争夺  好像还有问题
                GGlobal.layerMgr.open(UIConst.COUNTRY_KINGSHIP);
                // GGlobal.modelKingship.CG_OPENUI();
                var kingShip = Model_Kingship.status;
                var battleCount = Model_Kingship.battleCount;
                if (kingShip == 1 && battleCount > 0) {
                    // GGlobal.modelKingship.CG_COUNTRY_CHALLENGE();
                    return;
                }
                GGlobal.layerMgr.close(UIConst.COUNTRY_KINGSHIP);
                //国家boss
                GGlobal.layerMgr.open(UIConst.COUNTRY_BOSS);
                var ctryBossData = GGlobal.modelCtryBoss.data;
                if (ctryBossData) {
                    var curBossID = ctryBossData.curBossId;
                    var countryBossID = GMAutoWork.countryBossID;
                    var count = ctryBossData.leftCount;
                    if (count == 0) {
                        //没挑战次数，跳过
                    }
                    else if (countryBossID == 0) {
                        GMAutoWork.countryBossID = curBossID;
                    }
                    else if (countryBossID <= ctryBossData.curBossId && !ctryBossData.states[countryBossID]) {
                        GGlobal.modelCtryBoss.CG3203(countryBossID);
                        return;
                    }
                    else if (ctryBossData.states[countryBossID] == 1) {
                        GGlobal.modelCtryBoss.CG3215(countryBossID);
                        GMAutoWork.countryBossID = countryBossID + 1;
                    }
                    else if (ctryBossData.states[countryBossID] == 2) {
                        GMAutoWork.countryBossID = countryBossID + 1;
                    }
                    else if (countryBossID > ctryBossData.curBossId) {
                        console.log("boss id 要减1？");
                    }
                    GGlobal.layerMgr.close(UIConst.COUNTRY_BOSS);
                }
            }
            //孟获 10-22点开打（放最后）；隆中对（12-12点15）;魔神吕布(12:30-13  18:30-19  21:30-22)；单刀赴会（20:30-21：20）
            if ((hours12 < timeNow && timeNow < hours1207) || (hours18 < timeNow && timeNow < hours19) || (hours2030 < timeNow && timeNow < hours2130) || (hours21 < timeNow && timeNow < hours22))
                return;
            var battleMH = false;
            for (var time = 10; time <= 22; time++) {
                var hours111 = TimeUitl.getTimeByHoursMin(timeNow, time, 1);
                var hours666 = TimeUitl.getTimeByHoursMin(timeNow, time, 6);
                if (hours111 < timeNow && timeNow < hours666) {
                    battleMH = true;
                    break;
                }
            }
            if (ModuleManager.isOpen(UIConst.BOSS) && ModuleManager.isOpen(UIConst.MHBOSS) && battleMH) {
                var m = GGlobal.modelBoss;
                var c = ((m.MHcd - Model_GlobalMsg.getServerTime()) / 1000) >> 0;
                if (c <= 0) {
                    GGlobal.layerMgr.open(UIConst.BOSS, 2);
                    var mh = GGlobal.modelBoss;
                    // let mx = ConfigHelp.getSystemNum(1083);//购买次数
                    if (mh.mhCount >= 1) {
                        GGlobal.modelBoss.CG_MHENTER_1709();
                    }
                }
                GGlobal.layerMgr.close2(UIConst.BOSS);
            }
        };
        GMAutoWork.autoSaySomething = ["喵喵喵。。(￣ˇ￣)/", "嘤嘤嘤。。。~(～￣▽￣)～", "咩咩咩。。。╰(￣▽￣)╭", "啾啾啾。。。(づ｡◕‿‿◕｡)づ", "哇哈哈。。Ｏ(≧口≦)Ｏ", "旺旺旺。。Σ(｀д′*ノ)ノ", "嘟嘟嘟。。。ヾ(o◕∀◕)ﾉヾ", "哔哔哔。。⁽⁽ଘ( ˊᵕˋ )ଓ⁾⁾*"];
        GMAutoWork.countryBossID = 0; //可挑战的国家bossID
        GMAutoWork.workOneTimes = 0; //每个小时执行一次，记录上次执行的时间
        GMAutoWork.timeOneMinute = 0; //1分钟执行1次
        GMAutoWork.timeOneMinute2 = 0; //1分钟执行1次
        GMAutoWork.qmBossMaxID = 0; //全民boss最高级BossID
        return GMAutoWork;
    }());
}
