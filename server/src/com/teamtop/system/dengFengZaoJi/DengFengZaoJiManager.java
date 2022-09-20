package com.teamtop.system.dengFengZaoJi;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.dengFengZaoJi.cross.DengFengZaoJiCrossEnum;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJi;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJiBattleInfo;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJiModel;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mount.Mount;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_dfzjhx2_261;
import excel.config.Config_dfzjhx3_261;
import excel.config.Config_dfzjjs3_261;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_dfzjhx2_261;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class DengFengZaoJiManager {

	private static DengFengZaoJiManager ins;
	
	private DengFengZaoJiManager() {
		
	}
	
	public static synchronized DengFengZaoJiManager getIns() {
		if (ins == null) {
			ins = new DengFengZaoJiManager();
		}
		return ins;
	}

	public void openUI(Hero hero, int type) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) {
				return;
			}
			long hid = hero.getId();
			
			DengFengZaoJiFunction.getIns().reset(hero);
			DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
			
			HashMap<Integer, DengFengZaoJiModel> dengFengZaoJiModelMap = dengFengZaoJi.getDengFengZaoJiModel();
			DengFengZaoJiModel dengFengZaoJiModel = dengFengZaoJiModelMap.get(type);
			//在本服
			Channel channel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData(); 
			crossData.putObject(DengFengZaoJiCrossEnum.hid.name(), hid);
			crossData.putObject(DengFengZaoJiCrossEnum.type.name(), type);
			
			if(dengFengZaoJiModel!=null && dengFengZaoJiModel.getBattleMap().size()>0) {
				NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_MYRANK, crossData, new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						int myRank = crossData.getObject(DengFengZaoJiCrossEnum.myRank.name(), Integer.class);
						
						Map<Long, DengFengZaoJiBattleInfo> dengFengZaoJiBattleInfoMap = dengFengZaoJiModel.getBattleMap();
						if(type == 1) {
							DengFengZaoJiBattleInfo newDengFengZaoJiBattleInfo = crossData.getObject(DengFengZaoJiCrossEnum.rankData.name(), DengFengZaoJiBattleInfo.class);
							if(newDengFengZaoJiBattleInfo != null) {
								if(dengFengZaoJiBattleInfoMap.size() > 0) {
									int rank = 0;
									DengFengZaoJiBattleInfo oldDengFengZaoJiBattleInfo = null;
									for(DengFengZaoJiBattleInfo dengFengZaoJiBattleInfo : dengFengZaoJiBattleInfoMap.values()) {
										if(rank == 0) {
											rank = dengFengZaoJiBattleInfo.getRank();
											oldDengFengZaoJiBattleInfo = dengFengZaoJiBattleInfo;
										}else {
											if(rank > dengFengZaoJiBattleInfo.getRank()) {
												rank = dengFengZaoJiBattleInfo.getRank();
												oldDengFengZaoJiBattleInfo = dengFengZaoJiBattleInfo;
											}
										}
									}
									if(newDengFengZaoJiBattleInfo.getModel().getId() != oldDengFengZaoJiBattleInfo.getModel().getId()) {
										dengFengZaoJiBattleInfoMap.remove(oldDengFengZaoJiBattleInfo.getModel().getId());
										dengFengZaoJiBattleInfoMap.put(newDengFengZaoJiBattleInfo.getModel().getId(), newDengFengZaoJiBattleInfo);
									}
								}
							}else {
								dengFengZaoJiBattleInfoMap.clear();
							}
						}
						
						List<Object[]> objectList = new ArrayList<>();
						for(DengFengZaoJiBattleInfo dengFengZaoJiBattleInfo : dengFengZaoJiBattleInfoMap.values()) {
							CrossHeroBaseModel model = dengFengZaoJiBattleInfo.getModel();
							Mount mount = model.getMount();
							int mountId = 0;
							if(mount != null) {
								mountId = mount.getRideId();
							}
							int godWeapon = GodWeaponFunction.getIns().getNowGodWeapon(model);
							int body = FashionClothesManager.getIns().getBodyid(model.getJob(), model.getBodyModel());
							int rank = dengFengZaoJiBattleInfo.getRank();
							objectList.add(new Object[] {rank,model.getId(),model.getNameZoneid(), model.getTotalStrength(),body, godWeapon, mountId,dengFengZaoJiBattleInfo.getBattleState()});
						}
						
						int score = dengFengZaoJiModel.getScore();
						int num = DengFengZaoJiFunction.getIns().hasBattleNum(dengFengZaoJiModel, type);
						DengFengZaoJiSender.sendCmd_11952(hid, type, objectList.toArray(), hero.getTotalStrength(), myRank, score, num, dengFengZaoJiModel.getResetBuyNum());
					}
				});
			}else {
				NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_OPENUI, crossData, new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						int myRank = crossData.getObject(DengFengZaoJiCrossEnum.myRank.name(), Integer.class);
						if(type == 1) {
							dengFengZaoJi.setMyRank(myRank);
						}
						int num = DengFengZaoJiFunction.getIns().getNum(type);
						int score = 0;
						int buyNum = 0;
						if(dengFengZaoJiModel != null) {
							score = dengFengZaoJiModel.getScore();
							num = DengFengZaoJiFunction.getIns().hasBattleNum(dengFengZaoJiModel, type);
							buyNum = dengFengZaoJiModel.getResetBuyNum();
						}
						
						List<Object[]> objectList = DengFengZaoJiFunction.getIns().rankList(type, dengFengZaoJiModelMap, crossData);
						
						DengFengZaoJiSender.sendCmd_11952(hid, type, objectList.toArray(), hero.getTotalStrength(), myRank, score, num,buyNum);
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiManager.class, "openListUI has wrong");
		}
	}

	public void buyTime(Hero hero, int type, int num) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) return;
			if(type>1 || type<0) {
				return;
			}
			DengFengZaoJiFunction.getIns().reset(hero);
			DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
			HashMap<Integer, DengFengZaoJiModel> map = dengFengZaoJi.getDengFengZaoJiModel();
			DengFengZaoJiModel dengFengZaoJiModel = map.get(type);
			
			int size = 0;
			if(type == 0) {
				size = Config_dfzjhx3_261.getIns().size();
			}else {
				size = Config_dfzjjs3_261.getIns().size();
			}
			
			int resetBuyNum = dengFengZaoJiModel.getResetBuyNum();
			
			int itemType = 0;
			int itemId = 0;
			int itemNum = 0;
			
			int totalBuyNum = resetBuyNum+num;
			
			if(resetBuyNum < size) {
				int lastNum = totalBuyNum;
				if(totalBuyNum > size) {
					lastNum = size;
					int i = totalBuyNum-size;
					int[][] consume = DengFengZaoJiFunction.getIns().getConsume(type, size);
					int[] item = consume[0];
					itemType = item[0];
					itemId = item[1];
					itemNum = itemNum+ item[2]*i;
				}
				
				for(int i=resetBuyNum+1; i<=lastNum; i++) {
					int[][] consume = DengFengZaoJiFunction.getIns().getConsume(type, i);
					int[] item = consume[0];
					itemType = item[0];
					itemId = item[1];
					itemNum += item[2];
				}
			}else {
				int[][] consume = DengFengZaoJiFunction.getIns().getConsume(type, size);
				int[] item = consume[0];
				itemType = item[0];
				itemId = item[1];
				itemNum = itemNum+ item[2]*num;
			}
			
			int item[] = new int[] {itemType,itemId,itemNum};
			int[][] consume = new int[][] {item};
			if (!UseAddUtil.canUse(hero, consume)) {
				DengFengZaoJiSender.sendCmd_11954(hid, 2, 0, type,0);
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.DENGFENGZAOJI_BUYTIME_COST,  true);
			
			dengFengZaoJiModel.setResetBuyNum(totalBuyNum);
			dengFengZaoJiModel.setBuyNum(dengFengZaoJiModel.getBuyNum()+num);
			
			int tzNum = DengFengZaoJiFunction.getIns().hasBattleNum(dengFengZaoJiModel, type);
			
			DengFengZaoJiSender.sendCmd_11954(hid, 1, tzNum, type,totalBuyNum);
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiManager.class, hid, hero.getName(), "DengFengZaoJiManager buyTime");
		}
	}

	public void rankReward(Hero hero, int type) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) {
				return;
			}
			
			long hid = hero.getId();
			//在本服
			Channel channel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData(); 
			crossData.putObject(DengFengZaoJiCrossEnum.hid.name(), hid);
			crossData.putObject(DengFengZaoJiCrossEnum.type.name(), type);
			
			NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_RANKREWARD, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int myRank = crossData.getObject(DengFengZaoJiCrossEnum.myRank.name(), Integer.class);
					
					Type typeReference = new TypeReference<List<Object[]>>() {}.getType();
					List<Object[]> rankList = crossData.getObject(DengFengZaoJiCrossEnum.objectList.name(), typeReference);
					
					DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
					HashMap<Integer, DengFengZaoJiModel> map = dengFengZaoJi.getDengFengZaoJiModel();
					DengFengZaoJiModel dengFengZaoJiModel = map.get(type);
					int score = 0; 
					if(dengFengZaoJiModel != null) {
						score = dengFengZaoJiModel.getScore();
					}
					DengFengZaoJiSender.sendCmd_11956(hid, rankList.toArray(), score, myRank);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiManager.class, "rankReward has wrong");
		}
	}

	/**积分奖励列表*/
	public void scoreReward(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) return;
			List<Object[]> idList = new ArrayList<Object[]>();
			DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
			Map<Integer, Integer> map = dengFengZaoJi.getHasReceiveScoreReward();
			for(Integer id : map.keySet()) {
				Object[] obj = new Object[] {id};
				idList.add(obj);
			}
			DengFengZaoJiSender.sendCmd_11958(hid, idList.toArray());
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiManager.class, hid, hero.getName(), "DengFengZaoJiManager scoreReward has wrong");
		}
	}
	/**换一批*/
	public void replace(Hero hero, int type) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) {
				return;
			}
			if(type>1 || type<0) {
				return;
			}
			
			long hid = hero.getId();
			
			boolean isStart = DengFengZaoJiFunction.getIns().isStart(type);
			if(!isStart) {
				DengFengZaoJiSender.sendCmd_11960(hid, type, 3, null);
				return;
			}
			DengFengZaoJiFunction.getIns().reset(hero);
			int[][] consume = null; 
			if(type == 0) {
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DengFengZaoJiConst.DENGFENGZAOJI_HAIXUAN_SHUAXIN_COST);
				consume = struct_xtcs_004.getOther();
			}else {
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DengFengZaoJiConst.DENGFENGZAOJI_JUESAI_SHUAXIN_COST);
				consume = struct_xtcs_004.getOther();
			}
			
			if (!UseAddUtil.canUse(hero, consume)) {
				DengFengZaoJiSender.sendCmd_11960(hid, type, 2, null);
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.DENGFENGZAOJI_BUYTIME_COST,  true);
			
			Channel channel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData(); 
			crossData.putObject(DengFengZaoJiCrossEnum.hid.name(), hid);
			crossData.putObject(DengFengZaoJiCrossEnum.type.name(), type);
			NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_REPLACE, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
					HashMap<Integer, DengFengZaoJiModel> dengFengZaoJiModelMap = dengFengZaoJi.getDengFengZaoJiModel();
					int myRank = crossData.getObject(DengFengZaoJiCrossEnum.myRank.name(), Integer.class);
					if(type == 1) {
						dengFengZaoJi.setMyRank(myRank);
					}
					List<Object[]> objectList = DengFengZaoJiFunction.getIns().rankList(type, dengFengZaoJiModelMap, crossData);
					
					DengFengZaoJiSender.sendCmd_11960(hid, type, 1, objectList.toArray());
				}
			});
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiManager.class, "replace has wrong");
		}
	}

	/**冠军预测数据*/
	public void getPredictData(Hero hero) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) {
				return;
			}
			long hid = hero.getId();
			//在本服
			Channel channel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData(); 
			NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_GETPREDICTDATA, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					Type typeReference = new TypeReference<List<Object[]>>() {}.getType();
					List<Object[]> objectList = crossData.getObject(DengFengZaoJiCrossEnum.objectList.name(), typeReference);
					DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
					long betHid  = dengFengZaoJi.getBetHid(); 
					if(betHid == 0) {
						int week = TimeDateUtil.getWeek();
						if(week != 6) {
							betHid = -1;
						}
					}
					DengFengZaoJiSender.sendCmd_11962(hid, objectList.toArray(), betHid);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiManager.class, "getPredictData has wrong");
		}
	}

	//下注
	public void bet(Hero hero, long thid) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) return;
			DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
			long betHid = dengFengZaoJi.getBetHid();
			if(betHid != 0) {
				DengFengZaoJiSender.sendCmd_11964(hid, 4, thid);
				return;
			}
			int week = TimeDateUtil.getWeek();
			if(week != 6) {
				DengFengZaoJiSender.sendCmd_11964(hid, 3, thid);
				return;
			}
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DengFengZaoJiConst.DENGFENGZAOJI_XIAZHU_COST);
			int[][] consume = struct_xtcs_004.getOther(); 
			if (!UseAddUtil.canUse(hero, consume)) {
				DengFengZaoJiSender.sendCmd_11964(hid, 2, thid);
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.DENGFENGZAOJI_BUYTIME_COST,  true);
			dengFengZaoJi.setBetHid(thid);
			DengFengZaoJiSender.sendCmd_11964(hid, 1, thid);
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiManager.class, hid, hero.getName(), "bet has wrong");
		}
	}

	public void battle(Hero hero, int type, long thid) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) {
				return;
			}
			
			if(type<0 || type>1) {
				return;
			}
			DengFengZaoJiFunction.getIns().reset(hero);
			if(type == 0) {
				if(!DengFengZaoJiCache.isStart_haixuan) {
					int week = TimeDateUtil.getWeek();
					if(week == 1) {
						DengFengZaoJiSender.sendCmd_11966(hid, 11, type, thid);
						return;//比赛尚未开始
					}
					DengFengZaoJiSender.sendCmd_11966(hid, 12, type, thid);
					return;//本周赛事已结束
				}
			}else {
				if(!DengFengZaoJiCache.isStart_juesai) {
					int week = TimeDateUtil.getWeek();
					if(week == 6) {
						if(TimeDateUtil.getHour() < 10) {
							DengFengZaoJiSender.sendCmd_11966(hid, 11, type, thid);
							return;//比赛尚未开始
						}
					}
					DengFengZaoJiSender.sendCmd_11966(hid, 12, type, thid);
					return;//本周赛事已结束
				}
			}
			
			DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
			HashMap<Integer, DengFengZaoJiModel> dengFengZaoJiModelMap = dengFengZaoJi.getDengFengZaoJiModel();
			
			DengFengZaoJiModel dengFengZaoJiModel = dengFengZaoJiModelMap.get(type);
			if(dengFengZaoJiModel == null) {
				DengFengZaoJiSender.sendCmd_11966(hid, 8, type, thid);
				return;
			}
			
			int hasBattleNum = DengFengZaoJiFunction.getIns().hasBattleNum(dengFengZaoJiModel, type);
			if(hasBattleNum <= 0) {//没有挑战次数
				if(type == 0) {
					int goodsNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), DengFengZaoJiConst.DENGFENGZAOJI_ITEM_ID);
					if(goodsNum <=0) {
						DengFengZaoJiSender.sendCmd_11966(hid, 2, type, thid);
						return;
					}
				}else {
					DengFengZaoJiSender.sendCmd_11966(hid, 2, type, thid);
					return;
				}
			}
			
			Map<Long, DengFengZaoJiBattleInfo> battleInfoMap = dengFengZaoJiModel.getBattleMap();
			DengFengZaoJiBattleInfo battleInfo = battleInfoMap.get(thid);
			if(battleInfo == null) {
				DengFengZaoJiSender.sendCmd_11966(hid, 8, type, thid);
				return;
			}
			
			CrossHeroBaseModel model = battleInfo.getModel();
			int rank = battleInfo.getRank();
			
			if(type==1 && rank==1) {
				Channel channel = Client_2.getIns().getCrossChannel();
				CrossData crossData = new CrossData(); 
				crossData.putObject(DengFengZaoJiCrossEnum.hid.name(), hid);
				crossData.putObject(DengFengZaoJiCrossEnum.type.name(), type);
				
				CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.LOCAL2CROSS_FIRST_RANK, hero.getId(), crossData);
				if(writeBlockData != null) {
					DengFengZaoJiBattleInfo newDengFengZaoJiBattleInfo = writeBlockData.getObject(DengFengZaoJiCrossEnum.rankData.name(), DengFengZaoJiBattleInfo.class);
					if(newDengFengZaoJiBattleInfo != null) {
						if(newDengFengZaoJiBattleInfo.getModel().getId() != model.getId()) {
							DengFengZaoJiSender.sendCmd_11966(hid, 10, type, thid);
							openUI(hero, type);
							return;//排名已变更,重新刷新界面数据
						}
					}
				}
			}
			
			if(type == 0) {
				int battleState = battleInfo.getBattleState();
				if(battleState == 1) {
					DengFengZaoJiSender.sendCmd_11966(hid, 4, type, thid);
					return;//已挑战
				}
				Integer grade = DengFengZaoJiConst.gradeMap.get(rank);
				if(grade != null) {
					Integer gradeNum = DengFengZaoJiConst.gradeNumMap.get(grade);
					if(gradeNum > 0) {
						int num = DengFengZaoJiFunction.getIns().getBattleNum(dengFengZaoJiModel);
						if(num < gradeNum) {
							DengFengZaoJiSender.sendCmd_11966(hid, 3, type, thid);
							return;//不可越级挑战
						}
					}
				}
			}else {
				int myRank = dengFengZaoJi.getMyRank();
				if(myRank==0 || myRank>DengFengZaoJiConst.JUESAI) {
					DengFengZaoJiSender.sendCmd_11966(hid, 9, type, thid);
					return;//未进入决赛不能挑战
				}
				if(rank == 1) {
					if(hid == battleInfo.getModel().getId()) {
						DengFengZaoJiSender.sendCmd_11966(hid, 7, type, thid);
						return;//不能挑战自己
					}
					if(myRank > DengFengZaoJiConst.TOPFIVE) {
						DengFengZaoJiSender.sendCmd_11966(hid, 6, type, thid);
						return;//第一名需要前5名才可挑战
					}
				}
			}
			if(type == 1) {
				dengFengZaoJiModel.setBattleNum(dengFengZaoJiModel.getBattleNum()+1);
			}else {
				if(hasBattleNum <= 0) {
					if(!UseAddUtil.canUse(hero, GameConst.TOOL, 1, DengFengZaoJiConst.DENGFENGZAOJI_ITEM_ID)) {
						return;
					}
					UseAddUtil.use(hero, GameConst.TOOL, 1, DengFengZaoJiConst.DENGFENGZAOJI_ITEM_ID, SourceGoodConst.DENGFENGZAOJI_BATTLE_COST, true);
				}else {
					dengFengZaoJiModel.setBattleNum(dengFengZaoJiModel.getBattleNum()+1);
				}
			}
			dengFengZaoJi.setType(type);
			dengFengZaoJi.setThid(thid);
			
			HeroFunction.getIns().sendBattleHeroAttr(hero, model);
			DengFengZaoJiSender.sendCmd_11966(hid, 1, type, thid);
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiManager.class, hid, hero.getName(), "DengFengZaoJiManager battle");
		}
	}

	public void battlerest(Hero hero, int result) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) {
				return;
			}
			
			DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
			int type = dengFengZaoJi.getType();
			long thid = dengFengZaoJi.getThid();
			
			if(thid == 0) {
				return;
			}
			
			HashMap<Integer, DengFengZaoJiModel> dengFengZaoJiModelMap = dengFengZaoJi.getDengFengZaoJiModel();
			if(dengFengZaoJiModelMap == null) {
				return;
			}
			DengFengZaoJiModel dengFengZaoJiModel = dengFengZaoJiModelMap.get(type);
			if(dengFengZaoJiModel == null) {
				return;
			}
			Map<Long, DengFengZaoJiBattleInfo> dengFengZaoJiBattleInfoMap = dengFengZaoJiModel.getBattleMap();
			if(dengFengZaoJiBattleInfoMap == null) {
				return;
			}
			DengFengZaoJiBattleInfo dengFengZaoJiBattleInfo = dengFengZaoJiBattleInfoMap.get(thid);
			if(dengFengZaoJiBattleInfo == null) {
				return;
			}
			int battleState = dengFengZaoJiBattleInfo.getBattleState();
			if(type==0 && battleState==1) {
				return;//已挑战
			}
			
			int rank = dengFengZaoJiBattleInfo.getRank();
			CrossHeroBaseModel model = dengFengZaoJiBattleInfo.getModel();
			long myTotalStrength = hero.getTotalStrength();
			long tStrength = model.getTotalStrength();
			
			if(result != 2) {
				int checkResult = BattleFunction.checkWinByFightForCrossTrial(myTotalStrength, tStrength,SystemIdConst.DENGFENGZAOJI);
				if (checkResult == 0) {
					result = 0;
				}
			}
			
			dengFengZaoJi.setThid(0);
			int isPlayAll = 0;
			if (result == 1) {// 胜利
				dengFengZaoJiBattleInfo.setBattleState(1);
				int sourceGoodConst = 0;
				if(type == 0) {
					sourceGoodConst = DengFengZaoJiConst.DENGFENGZAOJI_BATTLE_HAIXUAN_ADD;
					int num = DengFengZaoJiFunction.getIns().getBattleNum(dengFengZaoJiModel);
					if(num >= DengFengZaoJiConst.SHOW_HAIXUAN) {
						isPlayAll = 1;
						//dengFengZaoJiBattleInfoMap.clear();
						//DengFengZaoJiFunction.getIns().replace(hero, type);
					}
				}else {
					isPlayAll = 1;
					sourceGoodConst = DengFengZaoJiConst.DENGFENGZAOJI_BATTLE_JUESAI_ADD;
					//dengFengZaoJiBattleInfoMap.clear();
				}
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(sourceGoodConst);
				int[][] reward = struct_xtcs_004.getOther();
				UseAddUtil.add(hero, reward, SourceGoodConst.DENGFENGZAOJI_BATTLE_ADD, UseAddUtil.getDefaultMail(),false);
			} 
			int addScore = DengFengZaoJiFunction.getIns().getScore(result, type, rank, dengFengZaoJiModel);
			if(addScore > 0) {
				DengFengZaoJiFunction.getIns().addScore(hero, dengFengZaoJiModel, addScore, type);
			}
			if(isPlayAll==1 || type==1) {
				dengFengZaoJiBattleInfoMap.clear();
			}
			DengFengZaoJiSender.sendCmd_11968(hid, result, type, thid, isPlayAll);
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiManager.class, hid, hero.getName(), "DengFengZaoJiManager battlerest");
		} 
	}

	/**领取积分奖励*/
	public void receive(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) {
				return;
			}
			
			DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
			Map<Integer, Integer> map = dengFengZaoJi.getHasReceiveScoreReward();
			Integer state = map.get(id);
			if(state != null) {
				DengFengZaoJiSender.sendCmd_11970(hid, 2, id);
				return;//已领
			}
			DengFengZaoJiModel dengFengZaoJiModel = dengFengZaoJi.getDengFengZaoJiModel().get(0);
			if(dengFengZaoJiModel == null) {
				DengFengZaoJiSender.sendCmd_11970(hid, 3, id);
				return;//条件不符
			}
			int score = dengFengZaoJiModel.getScore();
			Struct_dfzjhx2_261 struct_dfzjhx2_261 = Config_dfzjhx2_261.getIns().get(id);
			if(struct_dfzjhx2_261 == null) {
				DengFengZaoJiSender.sendCmd_11970(hid, 4, id);
				return;//参数错误
			}
			if(score < struct_dfzjhx2_261.getPoint()) {
				DengFengZaoJiSender.sendCmd_11970(hid, 3, id);
				return;//积分不足
			}
			int[][] reward = struct_dfzjhx2_261.getReward();
			boolean canAdd = UseAddUtil.canAdd(hero, reward, false);
			if(!canAdd){
				DengFengZaoJiSender.sendCmd_11970(hid, 5, id);
				 return;//背包已满
			}
			map.put(id, 2);
			UseAddUtil.add(hero, reward, SourceGoodConst.DENGFENGZAOJI_SCORE_REWARD_ADD, UseAddUtil.getDefaultMail(), true);
			DengFengZaoJiSender.sendCmd_11970(hid, 1, id);
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiManager.class, hid, hero.getName(), "DengFengZaoJiManager buyTime");
		}
	}

}
