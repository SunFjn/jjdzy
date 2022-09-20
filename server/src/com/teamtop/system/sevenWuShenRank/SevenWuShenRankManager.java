package com.teamtop.system.sevenWuShenRank;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ws_238;
import excel.config.Config_wsmb_238;
import excel.struct.Struct_ws_238;

public class SevenWuShenRankManager {
	public static SevenWuShenRankManager ins;
	
	public static  SevenWuShenRankManager getIns() {
		if(ins == null){
			ins = new SevenWuShenRankManager();
		}
		return ins;
	}

	public void openUi(Hero hero, int type) {
		try {
			if (type<=0||type>SevenWuShenRankConst.TYPE_TOTLSTR) {
				return;
			}
			if(!HeroFunction.getIns().checkSystemOpen(hero, SevenWuShenRankConst.FUN_WUSHENRANK)) return;
			SevenWuShenRank sevenWuShenRank=hero.getSevenWuShenRank();
			long str=0;
			int rankIndex=0;
			Object[] rewards=new Object[20];
			Object[] rankers=new Object[10];
			if (sevenWuShenRank.getCountNum()==null) {
				sevenWuShenRank.setCountNum(new HashMap<Integer, Integer>());
			}
			if (sevenWuShenRank.getCountNum().containsKey(type)) {
				str=sevenWuShenRank.getCountNum().get(type);
			}
			int i=0;
			for (int index :sevenWuShenRank.getRewardMap().keySet()) {
				if (index>=type*100&&index<type*100+100) {
					rewards[i]=new Object[] {index,sevenWuShenRank.getRewardMap().get(index)};
					i++;
				}
			}
			//排行
			if (SevenWuShenRankCache.getWushenranksys().getRankCache().containsKey(type)) {
				ConcurrentHashMap<Integer,List<WuShenRank>> rankerMap=SevenWuShenRankCache.getWushenranksys().getRankCache().get(type);
				List<WuShenRank> lowList=rankerMap.get(SevenWuShenRankConst.LOW);
				int j=0;
				Struct_ws_238 ws_238=Config_ws_238.getIns().get(type);
				int highTj=ws_238.getTj()[0][0];
				int num=0;
				List<Integer> regengindex=new ArrayList<>();
				if (lowList!=null&&lowList.size()>0) {
					for (int a = 0; a < lowList.size(); a++) {
						WuShenRank wuShenRank=	lowList.get(a);
						if (wuShenRank==null) {
							regengindex.add(a);
							continue;
						}
						if (wuShenRank.getRank()>=1&&wuShenRank.getRank()<=3&&wuShenRank.getCount()<highTj) {
							if (wuShenRank.getRank()==1) {
								num=3;
								break;
							}else if (wuShenRank.getRank()==2) {
								num=2;
								break;
							}else if (wuShenRank.getRank()==3) {
								num=1;
								break;
							}
						}
					}
					for (int a = 0; a < lowList.size(); a++) {
						WuShenRank wuShenRank=	lowList.get(a);
						if (wuShenRank==null) {
							continue;
						}
						int rank=wuShenRank.getRank();
						if (wuShenRank.getCount()<highTj) {
							rank=wuShenRank.getRank()+num;
						}
						if (j<10) {
							Hero h=HeroCache.getHero(wuShenRank.getHid(), HeroConst.FIND_TYPE_BASIC);
							String name=h.getNameZoneid();
							rankers[j]=new Object[] {wuShenRank.getHid(),name,wuShenRank.getCount(),rank};
							j++;
						}
						if (wuShenRank.getHid()==hero.getId()) {
							rankIndex=rank;
						}
						
						
					}
					if (regengindex.size()>0) {
						for (int k = 0; k < regengindex.size(); k++) {
							int index = regengindex.get(k);
							lowList.remove(index);
						}
					}
				}
			}
			rewards=CommonUtil.removeNull(rewards);
			rankers=CommonUtil.removeNull(rankers);
			SevenWuShenRankSender.sendCmd_2302(hero.getId(), str,rankIndex, rewards, rankers);
			return;
		} catch (Exception e) {
			LogTool.error(e, SevenWuShenRankManager.class, "openUi has wrong");
		}
	}

	public void getreward(Hero hero, int index) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SevenWuShenRankConst.FUN_WUSHENRANK)) return;
			SevenWuShenRank sevenWuShenRank=hero.getSevenWuShenRank();
			if (sevenWuShenRank.getRewardMap().containsKey(index)&&sevenWuShenRank.getRewardMap().get(index)==GameConst.REWARD_1) {
				int[][] reward=Config_wsmb_238.getIns().get(index).getReward();
				sevenWuShenRank.getRewardMap().put(index, GameConst.REWARD_2);
				UseAddUtil.add(hero,reward,SourceGoodConst.WUSHENGOAL, UseAddUtil.getDefaultMail(), true);
				SevenWuShenRankSender.sendCmd_2304(hero.getId(), index, GameConst.REWARD_2);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, SevenWuShenRankManager.class, "getreward has wrong");
		}

	}
	
	
}
