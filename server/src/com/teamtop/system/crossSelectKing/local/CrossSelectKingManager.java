package com.teamtop.system.crossSelectKing.local;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.crossKing.CrossKingAssist;
import com.teamtop.system.crossSelectKing.CrossSelectKingConst;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKing;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingNode;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;

public class CrossSelectKingManager {
	
	private static CrossSelectKingManager ins;
	public static CrossSelectKingManager getIns() {
		if(ins == null) {
			ins = new CrossSelectKingManager();
		}
		return ins;
	}
	/**
	 * 
	 * @param hero
	 * @param flog 第几轮
	 */
	public void openUi(Hero hero, int round) {
		try {
			//B:轮数0-4B:场数0-8L:对手hid1L:对手hid2U:对手姓名name1U:对手姓名name2I:job1I:job2I:weap1I:weap2L:str1L:str2B:win战斗结果0未有结果, 1为ID1赢, 2为ID2赢B:buywin买输赢情况0没有买, 1为ID1赢, 2为ID2赢
			if(hero.getCrossKing().getRebornType()==0) {
				LogTool.warn("hero.getCrossKing().getRebornType()==0 ", CrossSelectKingManager.class);
				return;
			}
			if (round<0||round>=5) {
				LogTool.warn("round<0||round>5 ", CrossSelectKingManager.class);
				return;
			}
			int reborn=hero.getCrossKing().getRebornType();
			int bang = CrossKingAssist.getIns().getRebornLvType(reborn);
			CrossSelectKingNode[][] nodes=CrossSelectKingLocalCache.getLocalBattleNodeMap().get(bang);
			if (nodes==null) {
				LogTool.warn("nodes==null", CrossSelectKingManager.class);
				return;
			}
			if (nodes[round]==null) {
				LogTool.warn("nodes[round]==null", CrossSelectKingManager.class);
				return;
			}
			CrossSelectKingBet crossSelectKingBet=null;
			ConcurrentHashMap<Long, CrossSelectKingBet> buyWinMap=CrossSelectKingLocalCache.crossSelectKingLocalBuyWin.getBuyWinMap().get(round);
			if (buyWinMap!=null&&buyWinMap.containsKey(hero.getId())) {
				crossSelectKingBet=buyWinMap.get(hero.getId());
			}
			ConcurrentHashMap<Long, CrossSelectKing> joinKingers=CrossSelectKingLocalCache.getKingHeroMap().get(bang);
			
			CrossSelectKingNode[] nodeArr=nodes[round];
			Object[] infos=new Object[nodeArr.length];
			for (int i = 0; i < nodeArr.length; i++) {
				CrossSelectKingNode KingNode=nodeArr[i];
				long hid1=KingNode.getId1();
				long hid2=KingNode.getId2();
				String name1="";
				String name2="";
				int job1=0;
				int job2=0;
				int wean1=0;
				int wean2=0;
				long str1=0;
				long str2=0;
				int guanxian1=0;
				int guanxian2=0;
				int head1=0;
				int head2=0;
				int frame1=0;
				int frame2=0;
				int buywin=0;
				int bodyid1=0;
				int bodyid2=0;
				int mountId1=0;
				int mountId2=0;
				if (hid1!=0) {
					CrossSelectKing crossSelectKing=joinKingers.get(hid1);
					if (crossSelectKing==null) {
						LogTool.warn("crossSelectKing==null hid1:"+hid1, CrossSelectKingManager.class);
					}else {
						name1=crossSelectKing.getName();
						job1=crossSelectKing.getJob();
						wean1=crossSelectKing.getModel().getWeaponModel();
						str1=crossSelectKing.getStrength();
						guanxian1=crossSelectKing.getModel().getOfficial();
						head1=crossSelectKing.getModel().getHerdid();
						frame1=crossSelectKing.getModel().getHerdUi();
						bodyid1=FashionClothesManager.getIns().getBodyid(job1, crossSelectKing.getModel().getBodyModel());
						mountId1=crossSelectKing.getModel().getRideModel();
					}
				}
                if (hid2!=0) {
                	CrossSelectKing crossSelectKing=joinKingers.get(hid2);
					if (crossSelectKing==null) {
						LogTool.warn("crossSelectKing==null hid1:"+hid2, CrossSelectKingManager.class);
					}else {
						name2=crossSelectKing.getName();
						job2=crossSelectKing.getJob();
						wean2=crossSelectKing.getModel().getWeaponModel();
						str2=crossSelectKing.getStrength();
						guanxian2=crossSelectKing.getModel().getOfficial();
						head2=crossSelectKing.getModel().getHerdid();
						frame2=crossSelectKing.getModel().getHerdUi();
						bodyid2=FashionClothesManager.getIns().getBodyid(job2, crossSelectKing.getModel().getBodyModel());
						mountId2=crossSelectKing.getModel().getRideModel();
					}
				}
				if (crossSelectKingBet!=null&&crossSelectKingBet.getRound()==KingNode.getRound()&&crossSelectKingBet.getCount()==KingNode.getCount()) {
					buywin=crossSelectKingBet.getWin();
				}
				infos[i]=new Object[] {KingNode.getRound(),KingNode.getCount(),hid1,hid2,name1,name2,bodyid1,bodyid2,wean1,wean2,str1,str2,(byte)guanxian1,(byte)guanxian2,head1,head2,frame1,frame2,KingNode.getWin(),buywin,mountId1,mountId2};
			}
			CrossSelectKingSender.sendCmd_2102(hero.getId(), infos);
		} catch (Exception e) {
			LogTool.error(e, CrossSelectKingManager.class, "openUi has wrong");
		}
		
	}
	/**
	 * CG 买比赛输赢 2103
	 * @param round| 第几轮| byte
	 * @param count| 第几场| byte
	 * @param win| 1为ID1赢, 2为ID2赢| byte
	 */
	public void buyWin(Hero hero, int round, int count, int win) {
		try {
			if (CrossSelectKingLocalCache.getKingInfo().getState()==0) {
				LogTool.warn("getKingInfo.getState()==0 ", CrossSelectKingManager.class);
				return;
			}
			if (win!=1&&win!=2) {
				LogTool.warn("win!=1&&win!=2", CrossSelectKingManager.class);
				return;

			}
			if(hero.getCrossKing().getRebornType()==0) {
				LogTool.warn("hero.getCrossKing().getRebornType()==0 ", CrossSelectKingManager.class);
				return;
			}
			if (round<0||round>=5) {
				LogTool.warn("round<0||round>5 ", CrossSelectKingManager.class);
				return;
			}
			int indexRound=round+1;
			int nowRound=CrossSelectKingLocalCache.getKingInfo().getProFlag();
			if (indexRound!=nowRound) {
				LogTool.warn("indexRound!=nowRound", CrossSelectKingManager.class);
				return;
			}
			int state=CrossSelectKingLocalCache.getKingInfo().getState();
			if (state==CrossSelectKingConst.INFO_STATE_2) {
				CrossSelectKingSender.sendCmd_2104(hero.getId(), 3, nowRound, count, win);
				return;
			}
			ConcurrentHashMap<Long, CrossSelectKingBet> buyWinMap=CrossSelectKingLocalCache.crossSelectKingLocalBuyWin.getBuyWinMap().get(round);
			if (buyWinMap==null) {
				buyWinMap=new ConcurrentHashMap<Long, CrossSelectKingBet>();
				CrossSelectKingLocalCache.crossSelectKingLocalBuyWin.getBuyWinMap().put(round, buyWinMap);
			}
			if (buyWinMap.containsKey(hero.getId())) {
				CrossSelectKingSender.sendCmd_2104(hero.getId(), 2, nowRound, count, win);
				return;
			}
			int bang = CrossKingAssist.getIns().getRebornLvType(hero.getCrossKing().getRebornType());
			CrossSelectKingNode[][] nodes=CrossSelectKingLocalCache.getLocalBattleNodeMap().get(bang);
			if (nodes[round][count]==null) {
				LogTool.warn("nodes[round][count]==null round"+round+" count"+count, CrossSelectKingManager.class);
				return;
			}
			/*if (nodes[round][count].getId1()==0||nodes[round][count].getId2()==0) {
				LogTool.warn("getId1()==0||getId2()==0", CrossSelectKingManager.class);
				return;
			}*/
			int[][] cost=Config_xtcs_004.getIns().get(CrossSelectKingConst.BUYWIN_COST).getOther();
			if(UseAddUtil.canUse(hero, cost)) {
				UseAddUtil.use(hero, cost, SourceGoodConst.BUYWIN_COST, true);
				CrossSelectKingBet crossSelectKingBet=new CrossSelectKingBet();
				crossSelectKingBet.setHid(hero.getId());
				crossSelectKingBet.setRound(round);
				crossSelectKingBet.setCount(count);
				crossSelectKingBet.setWin(win);
				crossSelectKingBet.setBang(bang);
				buyWinMap.put(hero.getId(), crossSelectKingBet);
				CrossSelectKingSender.sendCmd_2104(hero.getId(), 0, nowRound, count, win);
				return;
			}
			CrossSelectKingSender.sendCmd_2104(hero.getId(), 1, nowRound, count, win);
			return;
		} catch (Exception e) {
			LogTool.error(e, CrossSelectKingManager.class, "buyWin has wrong");
		}
		
	}
	/**
	 * CG 观看比赛 2105
	 * @param round| 第几轮| byte
	 * @param count| 第几场| byte
	 */
	public void lookBattle(Hero hero, int round, int count) {
		try {
			if(hero.getCrossKing().getRebornType()==0) {
				LogTool.warn("hero.getCrossKing().getRebornType()==0 ", CrossSelectKingManager.class);
				return;
			}
			if (round<0||round>=5) {
				LogTool.warn("round<0||round>5 ", CrossSelectKingManager.class);
				return;
			}
			
			int indexRound=round+1;
			int nowRound=CrossSelectKingLocalCache.getKingInfo().getProFlag();
			if (indexRound>nowRound) {
				LogTool.warn("indexRound>nowRound", CrossSelectKingManager.class);
				return;
			}
			int bang = CrossKingAssist.getIns().getRebornLvType(hero.getCrossKing().getRebornType());
			CrossSelectKingNode[][] nodes=CrossSelectKingLocalCache.getLocalBattleNodeMap().get(bang);
			if (nodes[round][count]==null) {
				LogTool.warn("nodes[round][count]==null round"+round+" count"+count, CrossSelectKingManager.class);
				return;
			}
			if (nodes[round][count].getId1()==0||nodes[round][count].getId2()==0) {
				LogTool.warn("getId1()==0||getId2()==0", CrossSelectKingManager.class);
				return;
			}
			if (nodes[round][count].getWin()==0) {
				LogTool.warn("nodes[round][count].getWin()==0", CrossSelectKingManager.class);
				return;
			}
			ConcurrentHashMap<Long, CrossSelectKing> joinKingers=CrossSelectKingLocalCache.getKingHeroMap().get(bang);
			long hid1=nodes[round][count].getId1();
			long hid2=nodes[round][count].getId2();
			CrossSelectKing crossSelectKing1=joinKingers.get(hid1);
			CrossSelectKing crossSelectKing2=joinKingers.get(hid2);
			Object[] attr1=CrossSelectKingLocalFunction.getIns().getFinalAtt(crossSelectKing1.getFinalFightAttr());
			Object[] attr2=CrossSelectKingLocalFunction.getIns().getFinalAtt(crossSelectKing2.getFinalFightAttr());
			Object[][] skillinfoArray1 = CrossSelectKingLocalFunction.getIns().getKillInfo(hero, crossSelectKing1);
			Object[] skillinfo1 = skillinfoArray1[0];
			Object[] skillinfo1_130 = skillinfoArray1[1];
			Object[][] skillinfoArray2 = CrossSelectKingLocalFunction.getIns().getKillInfo(hero, crossSelectKing2);
			Object[] skillinfo2 = skillinfoArray2[0];
			Object[] skillinfo2_130 = skillinfoArray2[1];
			//[L:选手id[I:属性keyL:属性数值][B:技能位置I:技能idI:技能等级]]
			Object[] joiners=new Object[2];
			joiners[0]=new Object[] {hid1,attr1,skillinfo1};
			joiners[1]=new Object[] {hid2,attr2,skillinfo2};
			
			
			int withLeaderId=0;
			int withLeaderFid=0;
			int leaderStarId=0;
			int leaderSkillId=0;
			if (crossSelectKing1.getLittleLeaderInfo()!=null&&crossSelectKing1.getLittleLeaderInfo().size()>0) {
				List<Integer> littleLeaderInfo = crossSelectKing1.getLittleLeaderInfo();
				withLeaderId=littleLeaderInfo.get(0);
				withLeaderFid=littleLeaderInfo.get(1);;
				leaderStarId=littleLeaderInfo.get(2);;
				leaderSkillId=littleLeaderInfo.get(3);;
			}
			//GC[I:0（宝物1id）1（宝物1星级）2（宝物2）3（宝物2星级）4（天书id）5（天书星级）6（武将星级）]其他参数数组
			List<Object[]> extdataList = new ArrayList<>();
			extdataList.add(new Object[] {0});
			extdataList.add(new Object[] {0});
			extdataList.add(new Object[] {0});
			extdataList.add(new Object[] {0});
			extdataList.add(new Object[] {0});
			extdataList.add(new Object[] {0});
			if (crossSelectKing1.getFinalFightAttr()!=null) {
				extdataList.add(new Object[] {crossSelectKing1.getFinalFightAttr().getStar()});
			}else {
				extdataList.add(new Object[] {0});
			}
			extdataList.add(new Object[] {crossSelectKing1.getModel().getWeaponModel()});
			extdataList.add(new Object[] {0});
			List<Object[]> attrData = new ArrayList<Object[]>();
			attrData.add(new Object[] { hid1, crossSelectKing1.getJob(), attr1, skillinfo1_130,
					crossSelectKing1.getModel().getBodyModel() });
			HeroSender.sendCmd_130(hero.getId(), hid1, crossSelectKing1.getName(), 0,
					0, 0, crossSelectKing1.getFigthMonsterSpirit(), attrData.toArray(), crossSelectKing1.getStrength(),extdataList.toArray(),withLeaderId,withLeaderFid,leaderStarId,leaderSkillId);
			withLeaderId=0;
			withLeaderFid=0;
			leaderStarId=0;
			leaderSkillId=0;
			if (crossSelectKing2.getLittleLeaderInfo()!=null&&crossSelectKing2.getLittleLeaderInfo().size()>0) {
				List<Integer> littleLeaderInfo = crossSelectKing2.getLittleLeaderInfo();
				withLeaderId=littleLeaderInfo.get(0);
				withLeaderFid=littleLeaderInfo.get(1);;
				leaderStarId=littleLeaderInfo.get(2);;
				leaderSkillId=littleLeaderInfo.get(3);;
			}
			//GC[I:0（宝物1id）1（宝物1星级）2（宝物2）3（宝物2星级）4（天书id）5（天书星级）6（武将星级）]其他参数数组
			extdataList = new ArrayList<>();
			extdataList.add(new Object[] {0});
			extdataList.add(new Object[] {0});
			extdataList.add(new Object[] {0});
			extdataList.add(new Object[] {0});
			extdataList.add(new Object[] {0});
			extdataList.add(new Object[] {0});
			if (crossSelectKing2.getFinalFightAttr()!=null) {
				extdataList.add(new Object[] {crossSelectKing2.getFinalFightAttr().getStar()});
			}else {
				extdataList.add(new Object[] {0});
			}
			extdataList.add(new Object[] {crossSelectKing2.getModel().getWeaponModel()});
			extdataList.add(new Object[] {0});
			attrData = new ArrayList<Object[]>();
			attrData.add(new Object[] { hid2, crossSelectKing2.getJob(), attr2, skillinfo2_130,
					crossSelectKing2.getModel().getBodyModel() });
			HeroSender.sendCmd_130(hero.getId(), hid2, crossSelectKing2.getName(), 0,
					0, 0, crossSelectKing2.getFigthMonsterSpirit(), attrData.toArray(), crossSelectKing2.getStrength(),extdataList.toArray(),withLeaderId,withLeaderFid,leaderStarId,leaderSkillId);
			
			CrossSelectKingSender.sendCmd_2106(hero.getId(), joiners);
		} catch (Exception e) {
			LogTool.error(e, CrossSelectKingManager.class, "lookBattle has wrong");
		}
		
	}
	/**
	 * 打开名人堂
	 * @param hero
	 */
	public void openWiners(Hero hero) {
		try {
			Object[] winers=null;
			int partId = CrossCache.getlocalPartId();
			Map<Integer, Map<Integer, Long>> winIdMap = CrossSelectKingLocalCache.getKingInfo().getWinIdMap();
			Map<Integer, Long> chamPoin = winIdMap.get(partId);
			if (chamPoin == null) {
				chamPoin = new HashMap<>();
				winIdMap.put(partId, chamPoin);
			}
			int a=0;
			if (chamPoin!=null) {
				winers=new Object[chamPoin.size()];
				for (int bang : chamPoin.keySet()) {
					long chamPoinid=chamPoin.get(bang);
					ConcurrentHashMap<Long, CrossSelectKing> map = CrossSelectKingLocalCache.getKingHeroMap().get(bang);
					if(map==null) {
						continue;
					}
					CrossSelectKing crossSelectKing=map.get(chamPoinid);
					String name=crossSelectKing.getName();
					long strengId=crossSelectKing.getStrength();
					int job=crossSelectKing.getJob();
					int waponid=crossSelectKing.getModel().getWeaponModel();
					int mountId=crossSelectKing.getModel().getRideModel();
					winers[a]=new Object[] {bang,name,strengId,job,waponid,mountId};
					a++;
				}
			}
			CrossSelectKingSender.sendCmd_2110(hero.getId(), winers, hero.getCrossSelectKingLocal().getMobai(), hero.getCrossSelectKingLocal().getReward());
		} catch (Exception e) {
			LogTool.error(e, CrossSelectKingManager.class, "openWiners has wrong");
		}
		
	}
	/**
	 * 膜拜
	 * @param hero
	 */
	public void mobai(Hero hero) {
		try {
			if (CrossSelectKingLocalCache.getKingInfo().getState()==CrossSelectKingConst.STATE_0) {
				if (hero.getCrossSelectKingLocal().getMobai()==0) {
					int[][] reward=Config_xtcs_004.getIns().get(CrossSelectKingConst.MOBAI).getOther();
					UseAddUtil.add(hero, reward, SourceGoodConst.CROSS_MOBAI_REWARD, null, true);
					hero.getCrossSelectKingLocal().setMobai(1);
					CrossSelectKingSender.sendCmd_2112(hero.getId(), 0, hero.getCrossSelectKingLocal().getMobai());
					return;
				}
			}
			CrossSelectKingSender.sendCmd_2112(hero.getId(), 1, hero.getCrossSelectKingLocal().getMobai());
			return;
		} catch (Exception e) {
			LogTool.error(e, CrossSelectKingManager.class, "openWiners has wrong");
		}
	}
	/**
	 * 获取冠军服奖励
	 * @param hero
	 */
	public void getFrist(Hero hero) {
		try {
			if (CrossSelectKingLocalCache.getKingInfo().getState()==CrossSelectKingConst.STATE_0) {
				if (hero.getCrossSelectKingLocal().getReward()>0) {
					int[][] reward=Config_xtcs_004.getIns().get(CrossSelectKingConst.ChamPoin).getOther();
					UseAddUtil.add(hero, reward, SourceGoodConst.CROSS_CHAMPOIN_REWARD, null, true);
					hero.getCrossSelectKingLocal().setReward(hero.getCrossSelectKingLocal().getReward()-1);
					CrossSelectKingSender.sendCmd_2114(hero.getId(), 0, hero.getCrossSelectKingLocal().getReward());
					return;
				}
			}
			CrossSelectKingSender.sendCmd_2114(hero.getId(), 1, hero.getCrossSelectKingLocal().getReward());
		} catch (Exception e) {
			LogTool.error(e, CrossSelectKingManager.class, "getFrist has wrong");
		}
		
	}
	
	

}
