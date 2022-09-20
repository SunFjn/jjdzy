package com.teamtop.system.sevenWuShenRank;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.excalibur.ExcaliburFunction;
import com.teamtop.system.godbook.GodBookFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.specialTreasure.SpecialTreasureManager;
import com.teamtop.system.treasure.TreasureFunction;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_ws_238;
import excel.config.Config_wsbc_022;
import excel.config.Config_wsmb_238;
import excel.struct.Struct_ws_238;
import excel.struct.Struct_wsbc_022;
import excel.struct.Struct_wsmb_238;

public class SevenWuShenRankFunction {
	public static SevenWuShenRankFunction ins;
	
	public static synchronized SevenWuShenRankFunction getIns() {
		if(ins == null){
			ins = new SevenWuShenRankFunction();
		}
		return ins;
	}
	/**
	 * 七日武圣的排行变化
	 * @param hero
	 * @param type
	 */
	public void refreshSevenWuShenRank(Hero hero,int type) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SevenWuShenRankConst.FUN_WUSHENRANK)) return;
		try {
			long count=0;
			long goal=0;
			switch (type) {
			//武将战力	
			case SevenWuShenRankConst.TYPE_WUJIANG:
				count=WuJiangFunction.getIns().getWuJiangTotelStr(hero);
				goal=hero.getWujiang().getJieLv();
				break;
			//宝物战力
			case SevenWuShenRankConst.TYPE_TREASURE:
				count=TreasureFunction.getIns().getTreasureTotalStrength(hero);
				goal=hero.getTreasureData().getLevel();
				break;
			//天书
			case SevenWuShenRankConst.TYPE_GODBOOK:
				count=GodBookFunction.getIns().getZhanJiaTotelStr(hero);
				goal=hero.getGodbook().getLevel();
				break;
			//神剑	
			case SevenWuShenRankConst.TYPE_EXCALIBUR:
				count=ExcaliburFunction.getIns().getExcaliburTotalStrength(hero);
				goal=hero.getExcalibur().getJieLv();
				break;
			//异宝
			case SevenWuShenRankConst.TYPE_SPETREASURE:
				count=SpecialTreasureManager.getIns().getSpeTreasureTotalStrength(hero);
				goal=hero.getSpecialTreasure().getJieLv();				
				break;				
			//装备战力	
			/*case SevenWuShenRankConst.TYPE_EQUIP:
				count=EquipFunction.getIns().getAllEquipTotalStrength(hero);
				goal=EquipFunction.getIns().getAllEquipTotalStrength(hero);
				break;*/
			
			//战甲战力	
			/*case SevenWuShenRankConst.TYPE_ZHANJIA:
				count=ZhanJiaFunction.getIns().getZhanJiaTotelStr(hero);
				goal=hero.getZhanJia().getJieLv();
				break;*/
			//图鉴战力	
			/*case SevenWuShenRankConst.TYPE_TUJIAN:
				count=ArchiveFunction.getIns().getArchiveTotalStrength(hero);
				goal=ArchiveFunction.getIns().sumLevel(hero);
				break;*/
			//铜雀台层数	
			case SevenWuShenRankConst.TYPE_TONGQUTAI:
				count=hero.getPeacockFloor().getFloorNum();
				goal=hero.getPeacockFloor().getFloorNum();
				break;
			//总战力	
			case SevenWuShenRankConst.TYPE_TOTLSTR:
				count=hero.getTotalStrength();
				goal=hero.getTotalStrength();
				break;
		    //将魂
			/*case SevenWuShenRankConst.TYPE_GENERAL:
				count=GeneralSoulFunction.getIns().getGeneralSoulTotelStr(hero);
				goal=GeneralSoulFunction.getIns().getGeneralSoulSumLevel(hero);
				break;*/	
			default:
				break;
			}
			//目标
			ConcurrentHashMap<Integer, Struct_wsmb_238> concurrentHashMap = SevenWuShenRankCache.getWuShenRankGoalMap().get(type);
			HashMap<Integer, Integer> rewardMap = hero.getSevenWuShenRank().getRewardMap();
			for (Struct_wsmb_238 wsmb_238:concurrentHashMap.values()) {
				if(goal>=wsmb_238.getCanshu()&&rewardMap.containsKey(wsmb_238.getId())&&rewardMap.get(wsmb_238.getId())==GameConst.REWARD_0) {
					hero.getSevenWuShenRank().getRewardMap().put(wsmb_238.getId(), GameConst.REWARD_1);
					/*if (!TimeDateUtil.serverOpenOverDays(type)) {
					}*/
					SevenWuShenRankSender.sendCmd_2304(hero.getId(), wsmb_238.getId(), GameConst.REWARD_1);
				}
			}
			//排行
			if (TimeDateUtil.serverOpenOverDays(type)) {
				return;
			}
			if (!SevenWuShenRankCache.getWushenranksys().getRankCache().containsKey(type)) {
				ConcurrentHashMap<Integer,List<WuShenRank>> rankers=new ConcurrentHashMap<Integer,List<WuShenRank>>();
				SevenWuShenRankCache.getWushenranksys().getRankCache().put(type, rankers);
				//rankers.put(SevenWuShenRankConst.HIGH, new ArrayList<WuShenRank>());
				rankers.put(SevenWuShenRankConst.LOW, new ArrayList<WuShenRank>());
			}
			ConcurrentHashMap<Integer,List<WuShenRank>> rankers=SevenWuShenRankCache.getWushenranksys().getRankCache().get(type);
			//List<WuShenRank> highList=rankers.get(SevenWuShenRankConst.HIGH);
			List<WuShenRank> lowList=rankers.get(SevenWuShenRankConst.LOW);
			
			WuShenRank wuShenRank=new WuShenRank();
			wuShenRank.setHid(hero.getId());
			wuShenRank.setTime(TimeDateUtil.getCurrentTime());
			wuShenRank.setType(SevenWuShenRankConst.FUN_WUSHENRANK);
			wuShenRank.setCount(count);
			Struct_ws_238 ws_238=Config_ws_238.getIns().get(type);
			int lowTj=ws_238.getTj()[0][1];
			if (count>=lowTj) {
				sortWuShenRank(lowList, wuShenRank,SevenWuShenRankConst.MAXNUM_LOW);
			}
			hero.getSevenWuShenRank().getCountNum().put(type, (int)count);
			/*if (count>=highTj) {
				//low榜已经存在 移除
				int index = lowList.indexOf(wuShenRank);
				if(index >= 0){
					lowList.remove(index);
					Collections.sort(lowList, new WuShenRankComparator());
				}
				sortWuShenRank(highList, wuShenRank,SevenWuShenRankConst.MAXNUM_HIGH);
			}*/
		} catch (Exception e) {
			LogTool.error(e, SevenWuShenRankFunction.class, "refreshSevenWuShenRank has wrong");
		}
		
		
	}
	
	public void sortWuShenRank(List<WuShenRank> wuShenRankList,WuShenRank wuShenRank,int maxRank) {
		try {
			if (wuShenRank==null) {
				LogTool.warn("wuShenRank==null", SevenWuShenRankFunction.class);
				return;
			}
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					int index = 0;
					WuShenRank tempWuShenRank = null;
					index = wuShenRankList.indexOf(wuShenRank);
					if(index >= 0){
						//存在缓存则更新
						tempWuShenRank = wuShenRankList.get(index);
						if (wuShenRank.getCount()!=tempWuShenRank.getCount()) {
							tempWuShenRank.setTime(TimeDateUtil.getCurrentTime());
						}
						tempWuShenRank.setHid(wuShenRank.getHid());
						tempWuShenRank.setCount(wuShenRank.getCount());
					}else {
						
						//不存在缓存则添加
						wuShenRankList.add(wuShenRank);
					}
					Collections.sort(wuShenRankList, new WuShenRankComparator());
					int i = 1;
					Iterator<WuShenRank> iterator = wuShenRankList.iterator();
					while(iterator.hasNext()){
						WuShenRank model = iterator.next();
						if(i > maxRank){
							model.setRank(0);
							iterator.remove();
						}else {
							model.setRank(i);
						}
						i++;
					}
				}
				@Override
				public Object getSession() {
					return OpTaskConst.SEVENWUSHENG_SCORERANK;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "refreshLingLongGeRankList refreshLingLongGeRankList has wrong");
		}
		
	}
	/**
	 * 0点发奖励
	 * @param num
	 */
	public void zero(int type) {
		try {
			ConcurrentHashMap<Integer, List<WuShenRank>> rankers = SevenWuShenRankCache.getWushenranksys().getRankCache().get(type);
			if (rankers!=null) {
				Struct_ws_238 ws_238=Config_ws_238.getIns().get(type);
				int highTj=ws_238.getTj()[0][0];
				//List<WuShenRank> highList=rankers.get(SevenWuShenRankConst.HIGH);
				List<WuShenRank> lowList=rankers.get(SevenWuShenRankConst.LOW);
				int[][] reward=null;
				int[][] bigReward=null;
				int num=0;
				if (lowList!=null&&lowList.size()>0) {
					for (int a = 0; a < lowList.size(); a++) {
						WuShenRank wuShenRank=	lowList.get(a);
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
					for (int i = 0; i < lowList.size(); i++) {
						WuShenRank wuShenRank=	lowList.get(i);
						int rank=wuShenRank.getRank();
						if (wuShenRank.getCount()<highTj) {
							rank=wuShenRank.getRank()+num;
						}
						if (rank==1) {
							reward=getRewardByType(0,ws_238.getReward1());
							bigReward=getRewardByType(1,ws_238.getReward1());
						}else if (rank==2) {
							reward=getRewardByType(0,ws_238.getReward2());
							bigReward=getRewardByType(1,ws_238.getReward2());
						}else if (rank==3) {
							reward=getRewardByType(0,ws_238.getReward3());
							bigReward=getRewardByType(1,ws_238.getReward3());
						}else if (rank>=4&&rank<=10) {
							reward=ws_238.getReward4();
						}else if(rank>=11&&rank<=100){
							reward=ws_238.getReward6();
						}
						if (reward!=null) {
							MailFunction.getIns().sendMailWithFujianData2(wuShenRank.getHid(), MailConst.SEVENWUSHENRANK, new Object[] {MailConst.SEVENWUSHENRANK,type,rank}, reward);
							if (rank<=3&&wuShenRank.getCount()>=ws_238.getYq()[0][1]) {
								MailFunction.getIns().sendMailWithFujianData2(wuShenRank.getHid(), MailConst.WUSHENG_BIGWARD, new Object[] {MailConst.WUSHENG_BIGWARD,type,rank}, bigReward);
							}
						}
					}
				}

			}
		} catch (Exception e) {
			LogTool.error(e, SevenWuShenRankFunction.class, "zero has wrong:num"+type);
		}
		
	}
	/**
	 * 
	 * @param type 0普通奖励  1大奖
	 * @return
	 */
	public int[][] getRewardByType(int type,int[][] reward){
		List<int[]> rewardByTypelist=new ArrayList<>();
		int size=0;
		for (int i = 0; i < reward.length; i++) {
			int[] js = reward[i];
			if (js.length!=4) {
				LogTool.warn("SevenWuShenRankFunction has wrong js.length!=4", SevenWuShenRankFunction.class);
				return null;
			}
			if (js[3]==type) {
				rewardByTypelist.add(new int[] {js[0],js[1],js[2]});
				size++;
			}
		}
		int[][] rewardByType=new int[size][];;
		rewardByTypelist.toArray(rewardByType);
		return rewardByType;
	}	
	/**
	 * 武圣红点
	 * @param hero
	 */
	public void rebornUpReadPoint(Hero hero,boolean islogin) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SevenWuShenRankConst.FUN_WUSHENRANK)) return;
		
		SevenWuShenRank sevenWuShenRank=hero.getSevenWuShenRank();
		for (Struct_wsmb_238 struct_wsmb_238: Config_wsmb_238.getIns().getSortList()) {
			int index=struct_wsmb_238.getId();
			if (sevenWuShenRank.getRewardMap().containsKey(index)&&sevenWuShenRank.getRewardMap().get(index)==GameConst.REWARD_1) {
				if (islogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero,SevenWuShenRankConst.FUN_WUSHENRANK, struct_wsmb_238.getType(), RedPointConst.HAS_RED);
				}
			}
		}
		
	}
	/**
	 * 补发武圣榜奖励
	 * @param type
	 */
	public  void  buFaReward(int type) {
		try {
			ConcurrentHashMap<Integer, List<WuShenRank>> rankers = SevenWuShenRankCache.getWushenranksys().getRankCache().get(type);
			if (rankers!=null) {
				Struct_ws_238 ws_238=Config_ws_238.getIns().get(type);
				Struct_wsbc_022 struct_wsbc_022 = Config_wsbc_022.getIns().get(type);
				
				int highTj=ws_238.getTj()[0][0];
				List<WuShenRank> lowList=rankers.get(SevenWuShenRankConst.LOW);
				int[][] reward=null;
				int num=0;
				if (lowList!=null&&lowList.size()>0) {
					for (int a = 0; a < lowList.size(); a++) {
						WuShenRank wuShenRank=	lowList.get(a);
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
					for (int i = 0; i < lowList.size(); i++) {
						WuShenRank wuShenRank=	lowList.get(i);
						int rank=wuShenRank.getRank();
						if (wuShenRank.getCount()<highTj) {
							rank=wuShenRank.getRank()+num;
						}
						if (rank==1) {
							reward=struct_wsbc_022.getOne();
						}else if (rank==2) {
							reward=struct_wsbc_022.getTwo();
						}else if (rank==3) {
							reward=struct_wsbc_022.getThree();
						}else if (rank>=4&&rank<=10) {
							reward=struct_wsbc_022.getOther();
						}
						if (reward!=null) {
							if (rank>0&&rank<=10) {
								MailFunction.getIns().sendMailWithFujianData2(wuShenRank.getHid(), MailConst.BUFA_WUSHENG_REWARD, new Object[] {MailConst.BUFA_WUSHENG_REWARD,type,rank}, reward);
							}
							
						}
					}
				}
				
			}
			
		} catch (Exception e) {
			LogTool.error(e, SevenWuShenRankFunction.class, "buFaReward has wrong:num"+type);
		}
	}
	
	
	
	
	
	
	
}
