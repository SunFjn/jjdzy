package com.teamtop.system.gm.event;

import java.util.Iterator;
import java.util.List;

import com.teamtop.cross.CrossCache;
import com.teamtop.houtaiHttp.events.serverMaintain.ServerMaintainCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.CrossEightDoorAppraiseRankActLC;
import com.teamtop.system.activity.ativitys.godGenDiscount.GodGenDiscountFunction;
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.CrossRechargeRankActLC;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.CrossShaoZhuQiYuanRankActLC;
import com.teamtop.system.battleGoods.BattleGoodsFunction;
import com.teamtop.system.boss.monsterGod.MonsterGodFunction;
import com.teamtop.system.crossBoss.CrossBossFunction;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankLC;
import com.teamtop.system.crossKing.local.CrossKingLocalIO;
import com.teamtop.system.crossKing.local.CrossKingSender;
import com.teamtop.system.crossSelectKing.local.CrossSelectKingLocalIO;
import com.teamtop.system.eightDoor.EightDoorSysCache;
import com.teamtop.system.eightDoor.EightDoorSysModel;
import com.teamtop.system.eightDoorAppraiseRank.EightDoorAppraiseRankSysCache;
import com.teamtop.system.eightDoorAppraiseRank.cross.CrossEightDoorAppraiseRankLC;
import com.teamtop.system.eightDoorAppraiseRank.model.EightDoorAppraiseRank;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.gm.AbsGMEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.MonsterKingSearchMonsterFunction;
import com.teamtop.system.shaozhuQiYuanRank.ShaoZhuQiYuanRankSysCache;
import com.teamtop.system.shaozhuQiYuanRank.cross.CrossShaoZhuQiYuanRankLC;
import com.teamtop.system.shaozhuQiYuanRank.model.ShaoZhuQiYuanRank;

import excel.config.Config_hdfl_012;
import excel.config.Config_kuafu_200;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_kuafu_200;
/**
 * 活动GM事件类
 * @author lobbyer
 * @date 2017年3月30日
 */
public class ActivityGMEvent extends AbsGMEvent {
	private static ActivityGMEvent ins;
	public static ActivityGMEvent getIns(){
		if(ins == null) {
			ins = new ActivityGMEvent();
		}
		return ins;
	}

	@Override
	public void gm(Hero hero, int type, String[] param) {
		switch (type) {
		case 1://修改查询服务器时间
			TimeGMFunction.getIns().changeSysTime(hero, 1, param);
			break;
		case 2://修改查询开服时间
			TimeGMFunction.getIns().changeOpenServerTime(hero, 2, param);
			break;
		case 3://跨服转生boss
			int state = Integer.parseInt(param[0]);
			CrossBossFunction.getIns().GM(hero,state);
			break;
		case 4://决斗无双活动时间
			state = Integer.parseInt(param[0]);
			break;
		case 5://查询、修改合服时间
			TimeGMFunction.getIns().changeHeFuTime(hero, type, param);
			break;
		case 6://关闭合服活动
			TimeGMFunction.getIns().closeHeFuActivity(hero, type, param);
			break;
		case 7://军团战
			//GangWarFunction.getIns().GMGangWar(hero, param);
			break;
		case 8://阵营战
			break;
		case 9://乱世枭雄
			state = Integer.parseInt(param[0]);
			CrossKingLocalIO.getIns().GM(state);
			break;
		case 10://枭雄争霸
			state = Integer.parseInt(param[0]);
			CrossSelectKingLocalIO.getIns().GM(state);
			break;
		case 11://枭雄争霸 交互位置
			int dw = Integer.parseInt(param[0]);
			int rank = Integer.parseInt(param[1]);
			CrossKingLocalIO.getIns().GMcharge(hero, dw, rank);
			break;
		case 12://魔神吕布
			state = Integer.parseInt(param[0]);
			MonsterGodFunction.getIns().GM(hero,state);
			break;			
		case 13://乱世枭雄加次数
			state = Integer.parseInt(param[0]);
			hero.getCrossKing().setChallCount(hero.getCrossKing().getChallCount()+state);
			CrossKingSender.sendCmd_1864(hero.getId(), 0,hero.getCrossKing().getChallCount() , hero.getCrossKing().getBuyCount());
			break;
		case 14://设置服务器状态 0:维护, 1:正常， 2：火爆，3：白名单
			state = Integer.parseInt(param[0]);
			ServerMaintainCache.MAINTAIN_STATE=state;
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SERVER_MAINTAIN);
			StringBuilder sb = new StringBuilder();
			sb.append(ServerMaintainCache.MAINTAIN_STATE).append("_&").append(ServerMaintainCache.CONTENT);
			globalData.setContent(sb.toString());
			GlobalCache.doSync(globalData);
			MonsterKingSearchMonsterFunction.getIns().zeroCheck();
			break;	
		case 15:
			int num = Integer.parseInt(param[0]);
			if (num<0) {
				num=0;
			}
			hero.getCrossBoss().setNum(num);
			break;
		case 16:
			TimeGMFunction.getIns().changeCrossSysTime(hero, 3, param);
			break;
		case 17:
			int sysId = Integer.parseInt(param[0]);
			if (sysId == SystemIdConst.EIGHTDOOR_APPRAISERANK) {
				CrossEightDoorAppraiseRankLC.getIns().gmToCen();
				EightDoorSysCache.setEightDoorSysModel(new EightDoorSysModel());
				EightDoorAppraiseRankSysCache.getRankTreeSet().clear();
				for (Hero hero1 : HeroCache.getHeroMap().values()) {
					EightDoorAppraiseRank eightDoorAppraiseRank = hero1.getEightDoorAppraiseRank();
					eightDoorAppraiseRank.setAppraiseTimes(0);
				}
			} else if (sysId == SystemIdConst.SHAOZHU_QIYUANRANK) {
				CrossShaoZhuQiYuanRankLC.getIns().gmToCen();
				ShaoZhuQiYuanRankSysCache.getRankTreeSet().clear();
				for (Hero hero1 : HeroCache.getHeroMap().values()) {
					ShaoZhuQiYuanRank shaoZhuQiYuanRank = hero1.getShaoZhuQiYuanRank();
					shaoZhuQiYuanRank.setQiyuanTimes(0);
				}
			} else if (sysId == SystemIdConst.SAINT_MONSTER_WASH_RANK) {
				OpenDaysSystemSysCache.getOpenedSet().remove(SystemIdConst.SAINT_MONSTER_WASH_RANK);
				Iterator<Integer> iterator = OpenDaysSystemSysCache.getOpenMap().keySet().iterator();
				while (iterator.hasNext()) {
					Integer next = iterator.next();
					Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(next);
					if (struct_hdfl_012.getId() == SystemIdConst.SAINT_MONSTER_WASH_RANK) {
						iterator.remove();
						OpenDaysSystemSysCache.getPassOpenedSet().remove(struct_hdfl_012.getBianhao());
					}
				}
				int getlocalPartId = CrossCache.getlocalPartId();
				Struct_kuafu_200 struct_kuafu_200 = Config_kuafu_200.getIns().get(getlocalPartId);
				int[][] boss = struct_kuafu_200.getBoss();
				if (hero.getZoneid() == boss[0][0]) {
					// SaintMonsterWashRankFunction.getIns().gmToCen();
				}
			} else if (sysId == ActivitySysId.CROSS_RECHARGE_RANK_ACT) {
				CrossRechargeRankActLC.getIns().gmToCen();
			} else if (sysId == SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE) {
				OpenDaysSystemSysCache.getOpenedSet().remove(SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE);
				List<Struct_hdfl_012> sortList = Config_hdfl_012.getIns().getSortList();
				for (Struct_hdfl_012 struct_hdfl_012 : sortList) {
					int id = struct_hdfl_012.getId();
					if (id == SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE) {
						int bianhao = struct_hdfl_012.getBianhao();
						OpenDaysSystemSysCache.getPassOpenedSet().remove(bianhao);
						OpenDaysSystemSysCache.getOpenMap().remove(bianhao);
					}
				}
			} else if (sysId == ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT) {
				CrossEightDoorAppraiseRankActLC.getIns().gmToCen();
			} else if (sysId == ActivitySysId.SHAOZHU_QIYUANRANK_ACT) {
				CrossShaoZhuQiYuanRankActLC.getIns().gmToCen();
			} else if (sysId == ActivitySysId.GODGENDISCOUNT_ACT) {
				GodGenDiscountFunction.getIns().gm();
			} else {
				CrossCommonRankLC.getIns().gmToCen(sysId);
			}
			break;
		case 18:
			state = Integer.parseInt(param[0]);
			BattleGoodsFunction.getIns().gm(state);
			break;
		default:
			break;
		}
	}

}
