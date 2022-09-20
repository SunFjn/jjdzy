package com.teamtop.system.crossSelectKing.cross;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossPartCache;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossSelectKing.CrossSelectKingConst;
import com.teamtop.system.crossSelectKing.CrossSelectKingDao;
import com.teamtop.system.crossSelectKing.CrossSelectKingEnum;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lsxxkf_232;
import excel.config.Config_xxzb_233;
import excel.struct.Struct_lsxxkf_232;
import io.netty.channel.Channel;


public class CrossSelectKingCrossFunction {
	private static CrossSelectKingCrossFunction ins;
	public static CrossSelectKingCrossFunction getIns() {
		if(ins == null) {
			ins = new CrossSelectKingCrossFunction();
		}
		return ins;
	}
	
	public void statr() {
		//清库
		CrossSelectKingCache.resetTerm();
		CrossSelectKingCache.updateInfo();
		CrossSelectKingCache.initKingHeroMap();
		initBangByReborn();
		Set<Integer> keySet = CrossPartCache.getPartMap().keySet();
		for (int partId : keySet) {
			CrossSelectKingCrossIO.getIns().GSnotice(partId);
		}
		CrossSelectKingCrossIO.getIns().GSstar();
	}
	public void end(int partid) {
		try {
			//活动结束发奖励
			List<Struct_lsxxkf_232> sortList = Config_lsxxkf_232.getIns().getSortList();
			for(Struct_lsxxkf_232 struct:sortList) {
				int bangid=struct.getId();
				CrossSelectKingNode[][] battleNodes=CrossSelectKingCache.getBattleNodeMap(partid).get(bangid);
				if (battleNodes!=null) {
					for (int i = 0; i < battleNodes.length; i++) {
						CrossSelectKingNode Nodes[]=battleNodes[i];
						for (int j = 0; j < Nodes.length; j++) {
							CrossSelectKingNode node=Nodes[j];
							int rewardid=bangid*10;
							if (i<3) {
								int rank=16;
								if (i==0) {
									//16强
									rewardid=rewardid+5;
								}
								if (i==1) {
									rank=8;
									//8强
									rewardid=rewardid+4;
								}
								if (i==2) {
									rank=4;
									//4强
									rewardid=rewardid+3;
								}
								int[][] reward=Config_xxzb_233.getIns().get(rewardid).getReward();
								if (node.getId1()!=0&&reward!=null&&node.getWin()==2) {
									MailFunction.getIns().sendMailWithFujianData2(node.getId1(),  MailConst.CROSSK_RANK,  new Object[]{MailConst.CROSSK_RANK,rank}, reward);
								}
								if (node.getId2()!=0&&reward!=null&&node.getWin()==1) {
									MailFunction.getIns().sendMailWithFujianData2(node.getId2(),  MailConst.CROSSK_RANK,  new Object[]{MailConst.CROSSK_RANK,rank}, reward);
								}
							}else if (i==3) {
								//2强 赢了冠军 输了亚军
								int secondrewardid=rewardid+2;
								int fristRewardId=rewardid+1;
								int[][] secondReward=Config_xxzb_233.getIns().get(secondrewardid).getReward();
								int[][] fristReward=Config_xxzb_233.getIns().get(fristRewardId).getReward();
								long fristId=node.getId1();
								long secondid=node.getId2();
								if(node.getWin()==2){
									fristId = node.getId2();
									secondid=node.getId1();
								}
								if (fristId!=0) {
									MailFunction.getIns().sendMailWithFujianData2(fristId,  MailConst.CROSSK_RANK,  new Object[]{MailConst.CROSSK_RANK,1}, fristReward);
								}
								if (secondid!=0) {
									MailFunction.getIns().sendMailWithFujianData2(secondid,  MailConst.CROSSK_RANK,  new Object[]{MailConst.CROSSK_RANK,2}, secondReward);
								}
								
							}
						}
						
					}
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e,CrossSelectKingCrossFunction.class,"initBangNode exception");
		}
	}
	
	/**
	 * 初始化各个转生段的战斗节点
	 */
	public void initBangByReborn() {
		Set<Integer> keySet = CrossPartCache.getPartMap().keySet();
		List<Struct_lsxxkf_232> sortList = Config_lsxxkf_232.getIns().getSortList();
		for (int partId : keySet) {
			CrossSelectKingCache.getBattleNodeMap(partId).clear();
			for(Struct_lsxxkf_232 struct:sortList) {
				initBangNode(partId,struct.getId());
			}
		}
		
	}
	
	/**
	 * 初始化一个榜的节点数据(分4轮节点进行战斗)
	 * @author lobbyer
	 * @param bang
	 * @date 2016年6月20日
	 */
	public static void initBangNode(int partId,int rebornLv) {
		try {
			CrossSelectKingInfo info = CrossSelectKingCache.getKingInfo();
			int term = info.getTerm();
			ConcurrentHashMap<Long, CrossSelectKing> joinerMap=CrossSelectKingCache.getKingHeroMap(partId).get(rebornLv);
			if(joinerMap==null||joinerMap.size()==0) return;
			CrossSelectKing[] joiner=new CrossSelectKing[joinerMap.size()];
			int a=0;
			for (CrossSelectKing crossSelectKing:joinerMap.values()) {
				joiner[a]=crossSelectKing;
				a++;
			}
			int rankLen = joiner.length;
			int finalNum = 16;
			int round = CrossSelectKingConst.ROUND;
			int count = 1;
			int halfFinalNum = finalNum / 2;
			CrossSelectKingNode[][] nodes = new CrossSelectKingNode[round][];
			nodes[0] = new CrossSelectKingNode[halfFinalNum];
			List<Integer> indexs = new ArrayList<Integer>();
			for (int i = 0; i < finalNum; i++) {
				indexs.add(i);
			}
			//16强进8
			Random random = new Random();
			CrossSelectKing[] newPosRan = new CrossSelectKing[finalNum];
			int selSize = rankLen>finalNum?finalNum:rankLen;
			for(int i=0;i<selSize;i++) {
				int size = indexs.size();
				if(size>0){
					int nextInt = random.nextInt(size);
					int pos = indexs.get(nextInt);
					newPosRan[pos] = joiner[i];
					indexs.remove(nextInt);
				}
			}
			List<CrossSelectKingNode> list = new ArrayList<CrossSelectKingNode>();
			for (int i = 0; i < halfFinalNum; i++) {
				// 随机匹配玩家
				CrossSelectKingNode node = null;
				CrossSelectKing c1Rank = newPosRan[i*2];
				CrossSelectKing c2Rank = newPosRan[i*2+1];
				long c1ID = 0;
				long c2ID = 0;
				if (c1Rank != null) {
					c1ID = c1Rank.getHid();
				}
				if (c2Rank != null) {
					c2ID = c2Rank.getHid();
				}
				int battleIndex=CrossSelectKingCache.getAndAddBattleUnitId();
				node = new CrossSelectKingNode(battleIndex,c1ID, c2ID, i, term, rebornLv,0,i,partId);
				node.setState(2);
				nodes[0][i] = node;
				list.add(node);
			}
			
			// 剩下3组节点的默认值
			int nowIndex = halfFinalNum;
			for (int m = 1; m < round; m++) {
				int n = 0;
				if (m == 1) {
					//16强进8强
					n = 4/count;
				} else if (m == 2) {
					//8强进4强
					n = 2/count;
				} else if (m == 3) {
					//4强进2强 半决赛
					n = 1;
				}
				nodes[m] = new CrossSelectKingNode[n];
				for (int k = 0; k < n; k++) {
					int battleIndex=CrossSelectKingCache.getAndAddBattleUnitId();
					CrossSelectKingNode node = new CrossSelectKingNode(battleIndex,0, 0, nowIndex++, term, rebornLv,m,k,partId);
					nodes[m][k] = node;
					list.add(node);
				}
			}
			try {
				CrossSelectKingDao.getIns().updateNodeBatch(list);
			} catch (SQLException e) {
				LogTool.error(e,CrossSelectKingCrossFunction.class,"add primary node exception");
			}
			CrossSelectKingCache.getBattleNodeMap(partId).put(rebornLv, nodes);
		} catch (Exception e) {
			LogTool.error(e,CrossSelectKingCrossFunction.class,"initBangNode exception");
		}
	}
	/**
	 * 同步这一轮的参赛选手的战力属性
	 */
	public void synStrength(int partid) {
		try {
			CrossSelectKingInfo info = CrossSelectKingCache.getKingInfo();
			int round = info.getProFlag()-1;
			Map<Integer,List<Long>> zoneMap = new HashMap<Integer, List<Long>>();
		    List<Struct_lsxxkf_232> sortList = Config_lsxxkf_232.getIns().getSortList();
		    int num=0;
			for(Struct_lsxxkf_232 struct:sortList) {
				int bang=struct.getId();
				CrossSelectKingNode[][] nodes=CrossSelectKingCache.getBattleNodeMap(partid).get(bang);
				if(nodes!=null){
					CrossSelectKingNode[] roundNodes = nodes[round];
					int nodesLen = roundNodes.length;
					for (int i = 0; i < nodesLen; i++) {
						CrossSelectKingNode node = roundNodes[i];
						if(node.getState()==4){
							//这个点已经打完了
							continue;
						}
						long id1 = node.getId1();
						long id2 = node.getId2();
						if (id1!=0) {
							int zid = CommonUtil.getZoneIdById(id1);
							List<Long> list = zoneMap.get(zid);
							if(list == null) {
								list = new ArrayList<Long>();
								zoneMap.put(zid, list);
							}
							list.add(id1);
							num++;
						}
						if (id2!=0) {
							int zid = CommonUtil.getZoneIdById(id2);
							List<Long> list = zoneMap.get(zid);
							if(list == null) {
								list = new ArrayList<Long>();
								zoneMap.put(zid, list);
							}
							list.add(id2);
							num++;
						}
						
					}
				}
			}
			CrossSelectKingCache.setCTLNum(partid,num);
			for(Integer zoneid:zoneMap.keySet()) {
				List<Long> list = zoneMap.get(zoneid);
				Channel channel = CrossCache.getChannel(zoneid);
				CrossData data = new CrossData();
				data.putObject(CrossSelectKingEnum.SynLocalStrength.name(), list);
				NettyWrite.writeXData(channel, CrossConst.CROSSSK_GS_SYNSTRENGTH, data);
			}
			
		} catch (Exception e) {
			LogTool.error(e,CrossSelectKingCrossFunction.class,"synStrength exception");
		}
		
	}
	
	/**
	 * 打一场比赛
	 */
	public void runFight() {
		try {
			CrossSelectKingInfo info = CrossSelectKingCache.getKingInfo();
			int round = info.getProFlag();
			info.setProState(CrossSelectKingConst.INFO_STATE_2);
			List<Struct_lsxxkf_232> sortList = Config_lsxxkf_232.getIns().getSortList();
			for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
				List<CrossSelectKingNode>  updateNodeList=new ArrayList<CrossSelectKingNode>();
				for(Struct_lsxxkf_232 struct:sortList) {
					List<CrossSelectKingNode>  updateList= doRunJuFight(partId,struct.getId(),round);
					if (updateList!=null&&updateList.size()>0) {
						updateNodeList.addAll(updateList);
					}
				}
				CrossSelectKingCrossIO.getIns().GSnotice(partId);
				CrossSelectKingCrossIO.getIns().GSchangeNode(updateNodeList, partId);
			}
		} catch (Exception e) {
			LogTool.error(e,CrossSelectKingCrossFunction.class,"runFight has wrong");
		}
		
	}
	
	/**
	 * 运行一局比赛
	 * @author lobbyer
	 * @param bang 榜
	 * @param 第几轮
	 * @date 2016年6月23日
	 */
	public List<CrossSelectKingNode> doRunJuFight(int partid,int bang,int process) {
		try {
			List<CrossSelectKingNode> updateList = new ArrayList<CrossSelectKingNode>();
			int roundProcess = process - 1;
			CrossSelectKingNode[][] nodes=CrossSelectKingCache.getBattleNodeMap(partid).get(bang);
			if(nodes==null){
				LogTool.info("bang:"+bang+"nodes==null ", CrossSelectKingCrossFunction.class);
				return updateList;
			}
			
			CrossSelectKingNode[] roundNodes = nodes[roundProcess];
			int nodesLen = roundNodes.length;
			for (int i = 0; i < nodesLen; i++) {
				try {
					CrossSelectKingNode node = roundNodes[i];
					if(node.getState()==4){
						//这个点已经打完了
						continue;
					}
					long id1 = node.getId1();
					long id2 = node.getId2();
					if(id1==0 && id2==0){
						node.setState(4);
						continue;
					}
					if(id1==0 || id2==0){
						if(id1==0){
							node.setWin(2);
						}else{
							node.setWin(1);
						}
					}else{
						CrossSelectKing attData = CrossSelectKingCache.getKingHeroMap(partid).get(bang).get(id1);
						CrossSelectKing beAttData = CrossSelectKingCache.getKingHeroMap(partid).get(bang).get(id2);
					    if (attData.getStrength()>=beAttData.getStrength()) {
					    	node.setWin(1);
						}else {
							node.setWin(2);
						}
					}
					if(nodesLen>1){
						//有下一场晋级赛
						int nextRound = i/2;
						long nextId = 0;
						CrossSelectKingNode nextNode = nodes[roundProcess+1][nextRound];
						if(node.getWin()==1){
							//c1晋级
							nextId = id1;
						}else{
							//c2晋级
							nextId = id2;
						}
						if(i%2==0){
							nextNode.setId1(nextId);
						}else{
							nextNode.setId2(nextId);
						}
						updateList.add(nextNode);
					}else {
						long winId=0;
						if(node.getWin()==1){
							//c1晋级
							winId = id1;
						}else{
							//c2晋级
							winId = id2;
						}
						//是决赛
						if (CrossSelectKingCache.getKingInfo().getWinIdMap()==null) {
							CrossSelectKingCache.getKingInfo().setWinIdMap(new HashMap<>());
						}
						Map<Integer, Map<Integer, Long>> winIdMap = CrossSelectKingCache.getKingInfo().getWinIdMap();
						Map<Integer, Long> map = winIdMap.get(partid);
						if (map == null) {
							map = new HashMap<>();
							winIdMap.put(partid, map);
						}
						map.put(bang, winId);
						
					}
					updateList.add(node);
				} catch (Exception e) {
					LogTool.error(e, this, "doRunJuFight has wrong");
				}
			}
			
			try {
				//更新到数据库
				CrossSelectKingDao.getIns().updateNodeBatch(updateList);
			} catch (SQLException e) {
				LogTool.error(e, this, "update final node exception");
			}
			return updateList;
		} catch (Exception e) {
			LogTool.error(e, this, "final fight exception");
		}
		return null;
	}
	
	
	
	/**
	 * 活动操作处理
	 * @author lobbyer
	 * @param cmdId
	 * @param now
	 * @param flag 0fixTime 1GM
	 * @date 2017年8月1日
	 */
	public boolean activityOper(int cmdId){
		CrossSelectKingCrossFunction function = CrossSelectKingCrossFunction.getIns();
		CrossSelectKingInfo info = CrossSelectKingCache.getKingInfo();
		int proFlag = info.getProFlag();
		int proState = info.getProState();
		boolean canGo = true;
		if(cmdId == 0) {
			//乱世枭雄结束产生16强
			// Set<Integer> keySet = Config_kuafu_200.getIns().getMap().keySet();
			// for (int partId : keySet) {
			statr();
			// }
		}else if(cmdId == 1) {
			if(proFlag >= CrossSelectKingConst.INFO_FLAG_1 && proFlag < CrossSelectKingConst.INFO_FLAG_4) {
				//准备阶段
				info.setProState(CrossSelectKingConst.INFO_STATE_1);
				info.setProFlag(proFlag+1);
				Set<Integer> keySet = CrossPartCache.getPartMap().keySet();
				for (int partId : keySet) {
					CrossSelectKingCrossIO.getIns().GSnotice(partId);
				}
			}else {
				canGo = false;
			}

		}else if(cmdId == 2) {
			//战斗阶段
			if(proFlag >= CrossSelectKingConst.INFO_FLAG_1 && proFlag <= CrossSelectKingConst.INFO_FLAG_4 && proState == CrossSelectKingConst.INFO_STATE_1){
				function.runFight();
			}else if(proFlag == CrossSelectKingConst.INFO_FLAG_4 && proState == CrossSelectKingConst.INFO_STATE_2){
				canGo = false;
			}else{
				canGo = false;
			}
		}else if (cmdId==3) {
			//同步战斗力
			for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
				function.synStrength(partId);
			}
		}else if (cmdId==4) {
			//活动结束
			CrossSelectKingInfo kingInfo=CrossSelectKingCache.getKingInfo();
			kingInfo.setState(CrossSelectKingConst.STATE_0);
			for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
				CrossSelectKingCrossIO.getIns().GSnotice(partId);
				function.end(partId);
			}
			
		}
		if(!canGo) {
			LogTool.warn("activityOper type:"+cmdId+"final proFlag:"+proFlag+" proState:"+proState+"!", this);
			return false;
		}
		LogTool.info("activityOper type:"+cmdId+" success,proFlag:"+proFlag+" proState:"+proState, this);
		CrossSelectKingCache.updateInfo();
		return true;
	}
	
	





	/**
	 * 初始化节点数据(适用缓存中没有时数据库取)
	 * @author lobbyer
	 * @date 2016年6月23日
	 */
	public void initFinalNodeFromDB(int partid) {
		try {
			//初始化当前届节点数据
			ConcurrentHashMap<Integer, CrossSelectKingNode[][]> allNodes = CrossSelectKingCache.getBattleNodeMap(partid);
			List<CrossSelectKingNode> finalNodes = CrossSelectKingDao.getIns().findCrossSelectKingNode();
			if (finalNodes != null) {
				Iterator<CrossSelectKingNode> it = finalNodes.iterator();
				for (; it.hasNext();) {
					CrossSelectKingNode node = it.next();
					if (node.getPartId()!=partid) {
						continue;
					}
					int bang = node.getBang();
					CrossSelectKingNode[][] nodes = allNodes.get(bang);
					if (nodes == null) {
						nodes = new CrossSelectKingNode[CrossSelectKingConst.ROUND][];
						allNodes.put(bang, nodes);
					}
					int pos = node.getPos();
					int index1 = 0;
					int index2 = 0;
					int firstLen = 0;
					if (pos >= 14) {
						index1 = 3;
						index2 = pos - 14;
						firstLen = 1;
					} else if (pos >= 12) {
						index1 = 2;
						index2 = pos - 12;
						firstLen = 2;
					} else if (pos >= 8) {
						index1 = 1;
						index2 = pos - 8;
						firstLen = 4;
					} else if (pos >= 0) {
						index1 = 0;
						index2 = pos;
						firstLen = 8;
					}
					if (nodes[index1] == null) {
						nodes[index1] = new CrossSelectKingNode[firstLen];
					}
					nodes[index1][index2] = node;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "initFinalNodeFromDB Exception!");
		}
	}

}
