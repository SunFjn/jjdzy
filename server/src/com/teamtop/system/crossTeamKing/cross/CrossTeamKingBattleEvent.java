package com.teamtop.system.crossTeamKing.cross;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.battleNew.BattleNewFunction;
import com.teamtop.system.battleNew.BttleTypeConst;
import com.teamtop.system.battleNew.event.BattleNewEvent;
import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.battleNew.model.PeronalBattleData;
import com.teamtop.system.crossTeamKing.CrossTeamKingFunction;
import com.teamtop.system.crossTeamKing.CrossTeamKingSender;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;


public class CrossTeamKingBattleEvent extends BattleNewEvent{

	private static CrossTeamKingBattleEvent ins;

	public CrossTeamKingBattleEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossTeamKingBattleEvent getIns() {
		if (ins == null) {
			ins = new CrossTeamKingBattleEvent();
		}
		return ins;
	}
	
	
	@Override
	public void battleEnd(BattleNewInfo battleNewInfo) {
	   //afterBattleEnd(battleNewInfo);
	}

	@Override
	public boolean isNomalSendBack() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int[][] battleCountWin(long battleUid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int[][] battleCountLose(long battleUid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void afterBattleEnd(BattleNewInfo battleNewInfo) {
		long battleUid = battleNewInfo.getBattleUid();
		
		long winHID = BattleNewFunction.getIns().getWinHID(battleNewInfo);
		long winHp = battleNewInfo.getPlayerDataMap().get(winHID).getHp();
		long winHuDun = battleNewInfo.getPlayerDataMap().get(winHID).getHudun();
		//处理战斗结束逻辑
		List<CrossTeamKingterBattleInfo> list = CrossTeamKingCroCache.getBattleInfos().get(winHID);
		if (list==null) {
			LogTool.warn("CrossTeamKingBattleEvent has wrong"+winHID,CrossTeamKingBattleEvent.class);
			return;
		}
		CrossTeamKingterBattleInfo crossTeamKingterBattleInfo = list.get(list.size()-1);
		if (crossTeamKingterBattleInfo.getBattleRest()!=0) {
			return;
		}
		
		List<Long> teamKingBattlersA = crossTeamKingterBattleInfo.getTeamKingBattlersA();
		List<Long> teamKingBattlersB = crossTeamKingterBattleInfo.getTeamKingBattlersB();
		int teamASize=teamKingBattlersA.size();
		int teamBSize=teamKingBattlersB.size();
		
		int[] battleIndex = crossTeamKingterBattleInfo.getBattleIndex();
		int battleIndexA=battleIndex[0];
		int battleIndexB=battleIndex[1];
		
		Hero hero = HeroCache.getHero(winHID);
		
		Set<Long> synHidSet = crossTeamKingterBattleInfo.getSynHidSet();
		Map<Long, PeronalBattleData> playerDataMap = battleNewInfo.getPlayerDataMap();
		
		if (teamKingBattlersA.contains(winHID)) {
			//死亡的是B对
			for (int i = 0; i < teamASize; i++) {
				Long long1 = teamKingBattlersA.get(i);
				CrossTeamKingSender.sendCmd_10844(long1, crossTeamKingterBattleInfo.getTeamBId(), battleIndexB);
			}
			for (int i = 0; i < teamBSize; i++) {
				Long long1 = teamKingBattlersB.get(i);
				CrossTeamKingSender.sendCmd_10844(long1, crossTeamKingterBattleInfo.getTeamBId(), battleIndexB);
			}
			//这一轮A队赢啦
			crossTeamKingterBattleInfo.setTeamAKillNum(crossTeamKingterBattleInfo.getTeamAKillNum()+1);
			int nextIndex=battleIndexB+1;
			if (nextIndex>=teamBSize) {
				//B队没有下一个队友了  
				//A队胜利
				crossTeamKingterBattleInfo.setBattleRest(1);
				CrossTeamKingFunction.getIns().overBattle(crossTeamKingterBattleInfo,battleUid);
				return;
			}else {
				Hero heroBnext=null;
				int a=0;
				for (int i = nextIndex; i <teamBSize; i++) {
					Long longB = teamKingBattlersB.get(i);
					if (!synHidSet.contains(longB)) {
						//不在线算人头
						heroBnext=null;
						crossTeamKingterBattleInfo.setTeamAKillNum(crossTeamKingterBattleInfo.getTeamAKillNum()+1);
					}else {
						heroBnext = HeroCache.getHero(longB);
						if (heroBnext!=null&&HeroFunction.getIns().isOnline(longB)) {
							a++;
							break;
						}else {
							heroBnext=null;
							crossTeamKingterBattleInfo.setTeamAKillNum(crossTeamKingterBattleInfo.getTeamAKillNum()+1);
						}
						
					}
					a++;
				}
				nextIndex=nextIndex+a-1;
				if (heroBnext==null) {
					crossTeamKingterBattleInfo.setBattleRest(1);
					CrossTeamKingFunction.getIns().overBattle(crossTeamKingterBattleInfo,battleUid);
					return;
				}else {
					//在线
					crossTeamKingterBattleInfo.getBattleIndex()[1]=nextIndex;
					FinalFightAttr finalFightAttr = heroBnext.getFinalFightAttr();
					long enemyHp=finalFightAttr.getHpMax();
					long eHudun=finalFightAttr.getHudunMax();
					BattleNewFunction.getIns().nextTeamRoundPVPBattle(hero, heroBnext, SystemIdConst.CROSS_TEAMKING,  BttleTypeConst.BATTLETEAMKING, winHp, enemyHp, winHuDun, eHudun,battleUid,crossTeamKingterBattleInfo.getSynHidSet(),playerDataMap);
				}
			}
		}else {
			//B队赢啦
			//死亡的是A队
			for (int i = 0; i < teamKingBattlersA.size(); i++) {
				Long long1 = teamKingBattlersA.get(i);
				CrossTeamKingSender.sendCmd_10844(long1, crossTeamKingterBattleInfo.getTeamAId(), battleIndexA);
			}
			for (int i = 0; i < teamKingBattlersB.size(); i++) {
				Long long1 = teamKingBattlersB.get(i);
				CrossTeamKingSender.sendCmd_10844(long1, crossTeamKingterBattleInfo.getTeamAId(), battleIndexA);
			}
			
			crossTeamKingterBattleInfo.setTeamBKillNum(crossTeamKingterBattleInfo.getTeamBKillNum()+1);
			int nextIndex=battleIndexA+1;
			if (nextIndex>=teamASize) {
				//A队没有下一个队友了  
				//B队胜利
				crossTeamKingterBattleInfo.setBattleRest(2);
				CrossTeamKingFunction.getIns().overBattle(crossTeamKingterBattleInfo,battleUid);
				return;
			}else {
				Hero heroAnext=null;
				int a=0;
				for (int i = nextIndex; i <teamASize; i++) {
					Long longA = teamKingBattlersA.get(i);
					if (!synHidSet.contains(longA)) {
						//不在线算人头
						heroAnext=null;
						crossTeamKingterBattleInfo.setTeamBKillNum(crossTeamKingterBattleInfo.getTeamBKillNum()+1);
					}else {
						heroAnext = HeroCache.getHero(longA);
						if (heroAnext!=null&&HeroFunction.getIns().isOnline(longA)) {
							a++;
							break;
						}else {
							heroAnext=null;
							crossTeamKingterBattleInfo.setTeamBKillNum(crossTeamKingterBattleInfo.getTeamBKillNum()+1);
						}
						
					}
					a++;
				}
				nextIndex=nextIndex+a-1;
				if (heroAnext==null) {
					//A队没有下一个队友了  
					crossTeamKingterBattleInfo.setBattleRest(2);
					CrossTeamKingFunction.getIns().overBattle(crossTeamKingterBattleInfo,battleUid);
					return;
				}else {
					//在线
					crossTeamKingterBattleInfo.getBattleIndex()[0]=nextIndex;
					FinalFightAttr finalFightAttr = heroAnext.getFinalFightAttr();
					long enemyHp=finalFightAttr.getHpMax();
					long eHudun=finalFightAttr.getHudunMax();
					BattleNewFunction.getIns().nextTeamRoundPVPBattle(hero, heroAnext, SystemIdConst.CROSS_TEAMKING,  BttleTypeConst.BATTLETEAMKING, winHp, enemyHp, winHuDun, eHudun,battleUid,crossTeamKingterBattleInfo.getSynHidSet(),playerDataMap);
				}
			}
		}
		
	}


}
