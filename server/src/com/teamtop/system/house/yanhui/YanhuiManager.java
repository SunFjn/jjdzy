package com.teamtop.system.house.yanhui;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossSender;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.callback.Callback;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.yanhui.cross.YanhuiCrossCache;
import com.teamtop.system.house.yanhui.cross.YanhuiCrossFunction;
import com.teamtop.system.house.yanhui.cross.YanhuiCrossIO;
import com.teamtop.system.house.yanhui.cross.YanhuiEnum;
import com.teamtop.system.house.yanhui.event.YanhuiCrossSceneEvent;
import com.teamtop.system.house.yanhui.model.ShenqingMember;
import com.teamtop.system.house.yanhui.model.Yanhui;
import com.teamtop.system.house.yanhui.model.YanhuiBoss;
import com.teamtop.system.house.yanhui.model.YanhuiMember;
import com.teamtop.system.houseShopTask.HouseShopTaskConst;
import com.teamtop.system.houseShopTask.HouseShopTaskFunction;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_party9_298;
import excel.config.Config_party_298;
import excel.config.Config_partyboss_298;
import excel.config.Config_partylw_298;
import excel.struct.Struct_party9_298;
import excel.struct.Struct_party_298;
import excel.struct.Struct_partyboss_298;
import excel.struct.Struct_partylw_298;
import io.netty.channel.Channel;

public class YanhuiManager {

	private static YanhuiManager ins;
	
	private YanhuiManager() {
		
	}
	
	public static synchronized YanhuiManager getIns() {
		if (ins == null) {
			ins = new YanhuiManager();
		}
		return ins;
	}

	//宴会列表(子服)
	public void openListUI(Hero hero) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YANHUI)) {
				return;
			}
			long hid = hero.getId();
			boolean isStart = YanhuiFunction.getIns().isStart();
			if(!isStart) {
				YanhuiSender.sendCmd_11458(hid, 5, 0);
				return;
			}
			int zoneid = hero.getZoneid();
			int partId = CrossCache.getPartId(zoneid);
			if(CrossZone.isCrossServer()){
				//在跨服
				return;
//				int id = YanhuiCrossCache.getIns().getYanhuiId(hid);
//				Map<Integer, Yanhui> allHouse = YanhuiCrossCache.getIns().getAllYanhuibyPartId(partId);
//				Object[] houseList = null;
//				if(allHouse!=null && allHouse.size()>0) {
//					houseList = new Object[allHouse.size()];
//					int i = 0;
//					Iterator<Entry<Integer, Yanhui>> it = allHouse.entrySet().iterator();  
//					while(it.hasNext()){  
//						Entry<Integer, Yanhui> entry = it.next();  
//						Yanhui houseModel = entry.getValue();
//						int time = YanhuiCrossFunction.getIns().getTime(houseModel);
//						if(time == 0) {
//							//it.remove();//使用迭代器的remove()方法删除元素  
//						}else {
//							Map<Long, YanhuiMember> houseHeroMap = houseModel.getYanhuiMemberMap();
//							houseList[i] = new Object[] {houseModel.getType(),houseModel.getId(),houseModel.getIcon(),houseModel.getFrame(),houseModel.getName(),houseHeroMap.size(),houseModel.getAccept(),houseModel.getHid()};
//							i++;
//						}
//					}
//				}
//				houseList=CommonUtil.removeNull(houseList);
//				YanhuiSender.sendCmd_11452(hid, id, houseList);
			}else {
				//在本服
				Channel channel = Client_2.getIns().getCrossChannel();
				CrossData crossData = new CrossData(); 
				crossData.putObject(YanhuiEnum.hid.name(), hid);
				crossData.putObject(YanhuiEnum.partId.name(), partId);
				
				NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_CROSSOPENLISTUI, crossData, new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						int id = crossData.getObject(YanhuiEnum.id.name(), Integer.class);
						Type type = new TypeReference<List<Object[]>>() {}.getType();
						List<Object[]> list = crossData.getObject(YanhuiEnum.yanhuiList.name(), type);
						YanhuiSender.sendCmd_11452(hid, id, list.toArray());
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "openListUI has wrong");
		}
	}
	
	//进入场景(子服)
	public void enterScene(Hero hero) {
		try {
			if(CrossZone.isCrossServer()){
				return;
			}
			boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YANHUI);
			if(!checkSystemOpen) {
				//系统未开启
				return;
			}
			CrossFunction.askCross(hero, SystemIdConst.YANHUI);
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "enterScene has wrong");
		}
	}
	
	//赴宴(子服)
	public void fuyan(Hero hero, int id, int type) {
		try {
			if(CrossZone.isCrossServer()){
				return;
			}
			long hid = hero.getId();
			boolean isStart = YanhuiFunction.getIns().isStart();
			if(!isStart) {
				YanhuiSender.sendCmd_11458(hid, 5, 0);
				return;
			}
			//赴宴消耗
			Struct_partylw_298 struct_partylw_298 = Config_partylw_298.getIns().get(type);
			int[][] consume = struct_partylw_298.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				YanhuiSender.sendCmd_11458(hid, 3, 0);
				return;
			}
			
			int zoneid = hero.getZoneid();
			int partId = CrossCache.getPartId(zoneid);
			String name = hero.getNameZoneid();
			
			Channel channel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData(); 
			crossData.putObject(YanhuiEnum.hid.name(), hid);
			crossData.putObject(YanhuiEnum.id.name(), id);
			crossData.putObject(YanhuiEnum.partId.name(), partId);
			crossData.putObject(YanhuiEnum.liwuType.name(), type);
			crossData.putObject(YanhuiEnum.name.name(), name);
			NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_CROSSFUYAN, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int state = crossData.getObject(YanhuiEnum.state.name(), Integer.class);
					if(state != 1) {
						YanhuiSender.sendCmd_11456(hid, state, 0);
						return;
					}else {
						//主人获得礼物
						///long thid = crossData.getObject(YanhuiEnum.hid.name(), Long.class);
						///Struct_partylw_298 struct_partylw_298 = Config_partylw_298.getIns().get(type);
						///int[][] reward = struct_partylw_298.getReward();
						///MailFunction.getIns().sendMailWithFujianData2(thid, MailConst.YANHUI_FUYAN, new Object[] { MailConst.YANHUI_FUYAN,hero.getNameZoneid(),type }, reward);
						
						UseAddUtil.use(hero, consume, SourceGoodConst.YANHUI_FUYAN_COST,  true);
						YanhuiSender.sendCmd_11456(hid, 1, id);
						//日常
						HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.DAYTASK_7, HouseShopTaskConst.DAYTASK_3, 0, 0);
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "fuyan has wrong");
		}
	}

	//举办宴会(子服)
	public void juban(Hero hero, int type, int accept) {
		try {
			if(CrossZone.isCrossServer()){
				return;
			}
			Struct_party_298 struct_party_298 = Config_party_298.getIns().get(type);
			if(struct_party_298 == null) {
				return;
			}
			long hid = hero.getId();
			//B:1.成功 2.vip不足 3.元宝不足 4.同一时间只能参加一场宴会 5.举办时间已过I:宴会唯一id
			if(hero.getVipLv() < struct_party_298.getVip()) {
				YanhuiSender.sendCmd_11458(hid, 2, 0);
				return;
			}
			int[][] consume = struct_party_298.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				YanhuiSender.sendCmd_11458(hid, 3, 0);
				return;
			}
			
			boolean isStart = YanhuiFunction.getIns().isStart();
			if(isStart) {
				int hour = TimeDateUtil.getHour();
				if(hour == YanhuiConst.END) {
					YanhuiSender.sendCmd_11458(hid, 5, 0);
					return;
				}
				if(type == 1) {
					if(accept > 0) {
						accept = 0;
					}
				}
			}else {
				YanhuiSender.sendCmd_11458(hid, 5, 0);
				return;
			}
			
			CrossHeroBaseModel heroBase = new CrossHeroBaseModel();
			heroBase.setId(hid);
			heroBase.setZoneid(hero.getZoneid());
			heroBase.setName(hero.getName());
			heroBase.setNameZoneid(hero.getNameZoneid());
			heroBase.setVip(hero.getVipLv());
			heroBase.setIcon(hero.getIcon());
			heroBase.setFrame(hero.getFrame());
			
			Channel channel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData(); 
			crossData.putObject(YanhuiEnum.heroBase.name(), heroBase);
			crossData.putObject(YanhuiEnum.yanhuiType.name(), type);
			crossData.putObject(YanhuiEnum.accept.name(), accept);
			NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_CROSSJUBAN, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int state = crossData.getObject(YanhuiEnum.state.name(), Integer.class);
					if(state != 1) {
						YanhuiSender.sendCmd_11458(hid, state, 0);
						return;
					}else {
						int id = crossData.getObject(YanhuiEnum.id.name(), Integer.class);
						if(id > 0) {
							UseAddUtil.use(hero, consume, SourceGoodConst.YANHUI_JUBAN_COST,  true);
							YanhuiSender.sendCmd_11458(hid, 1, id);
							//府邸任务
							HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_2, HouseShopTaskConst.GOAL_TYPE_501, type, 1);
							//日常
							HouseShopTaskFunction.getIns().CTLSuccessTaskOrGoal(hero,HouseShopTaskConst.INDEXTYPE_1, HouseShopTaskConst.DAYTASK_3, 0, 0);
							//宴会邀请广播(滚动)
							ChatManager.getIns().broadCast(ChatConst.YANHUI_YAOQING,new Object[] {hero.getNameZoneid(),type});
						}
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "juban has wrong");
		}
	}

	//敬酒(中央服)
	public void jingjiu(Hero hero, int type) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			long hid = hero.getId();
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			if(yanhui == null) return;
			Struct_party9_298 struct_party9_298 = Config_party9_298.getIns().get(type);
			int[][] consume = struct_party9_298.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				YanhuiSender.sendCmd_11460(hid, 3, type, 0);
				return;
			}
			
			Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap();
			YanhuiMember member = members.get(hid);
			Map<Integer, Integer> jjnum = member.getJingjiuNumMap();
			Integer num = jjnum.get(type);
			if(num == null) {
				num = 0;
			}
			if(num >= struct_party9_298.getTime()) {
				YanhuiSender.sendCmd_11460(hid, 2, type, 0);
				return;
			}
			
			//敬酒<玩家id<标识(次数递增)，敬酒id>>
			Map<Long, Map<Integer, Integer>> jingjiuMap = yanhui.getJingjiuMap();
			Map<Integer, Integer> jingjiu = jingjiuMap.get(hid);
			if(jingjiu == null) {
				jingjiu = new HashMap<Integer, Integer>();
				jingjiuMap.put(hid, jingjiu);
			}
			
			UseAddUtil.use(hero, consume, SourceGoodConst.YANHUI_JINGJIU_COST,  true);
			
			//敬酒获得
			if (UseAddUtil.canAdd(hero, struct_party9_298.getReward(), false)) {
				UseAddUtil.add(hero, struct_party9_298.getReward(), SourceGoodConst.YANHUI_JINGJIU_ADD, null, true);
			}
			
			int fw = struct_party9_298.getFw();
			yanhui.setFenweiVal(yanhui.getFenweiVal()+fw);
			
			int id = YanhuiCrossCache.getYanhuiUnitId();//敬酒标识id
			jingjiu.put(id, type);
			num = num+1;
			jjnum.put(type, num);
			
			
			int synum = struct_party9_298.getTime()-num;
			
			YanhuiCrossFunction.getIns().broadCast(yanhui,ChatConst.YANHUI_JINGJIU,new Object[] {hero.getNameZoneid(),type,fw});
			
			YanhuiCrossFunction.getIns().reshSceneHeroDate(yanhui);//刷新场景玩家数据
			
			//B:1.成功 2.剩余次数不足 3.元宝不足B:敬酒类型I:剩余次数
			YanhuiSender.sendCmd_11460(hid, 1, type, synum);
			
			//敬酒奖励红点
			long sceneUnitId = yanhui.getSceneUnitId();
			List<Long> list = SceneFunction.getIns().getSceneHero(sceneUnitId, SceneConst.SCENE_SYSID_YANHUI);
			for(long thid : members.keySet()) {
				if(!list.contains(thid)) {
					CrossData crossData = new CrossData(); 
					crossData.putObject(YanhuiEnum.hid.name(), thid);
					Channel localChannel = CrossCache.getLocalChannel(thid);
					NettyWrite.writeXData(localChannel, CrossConst.CROSS2LOCAL_LOCALJINGJIU, crossData);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "jingjiu has wrong");
		}
	}

	//领取敬酒奖励(中央服)
	public void lingjiang(Hero hero, int id) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			long hid = hero.getId();
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap();
			YanhuiMember member = members.get(hid);
			Map<Integer, Integer> jjAwardMap = member.getJingjiuAwardMap();
			Integer state = jjAwardMap.get(id);
			if(state != null) {
				YanhuiSender.sendCmd_11462(hid, 2, id);//已领
				return;
			}
			
			Map<Long, Map<Integer, Integer>> jingjiuMap = yanhui.getJingjiuMap();
			Map<Integer, Integer> jjMap = jingjiuMap.get(hid);
			if(jjMap != null) {
				if(jjMap.get(id) != null) {
					YanhuiSender.sendCmd_11462(hid, 3, id);//不能领取自己敬酒凉凉
					return;
				}
			}
			
			int type = 0;
			for(Map<Integer, Integer> map : jingjiuMap.values()) {
				Integer t = map.get(id);
				if(t != null) {
					type = t;
					break;
				}
			}
			if(type == 0) {
				YanhuiSender.sendCmd_11462(hid, 3, id);
				return;
			}
			
			jjAwardMap.put(id, 2);
			//敬酒获得
			Struct_party9_298 struct_party9_298 = Config_party9_298.getIns().get(type);
			if (UseAddUtil.canAdd(hero, struct_party9_298.getReward1(), false)) {
				UseAddUtil.add(hero, struct_party9_298.getReward1(), SourceGoodConst.YANHUI_JINGJIU_ADD, null, true);
			}
			
			// B:1.成功 2.已领取 3.条件不符
			YanhuiSender.sendCmd_11462(hid, 1, id);
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "lingjiang has wrong");
		}
	}

	//开启boss(中央服)
	public void kaiqiBiwu(Hero hero, int bossId) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			long hid = hero.getId();
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			if(yanhui == null) return;
			if(hid != yanhui.getHid()) {
				YanhuiSender.sendCmd_11464(hid, 2, bossId);
				return;
			}
			Struct_partyboss_298 struct_partyboss_298 = Config_partyboss_298.getIns().get(bossId);
			int[][] consume = struct_partyboss_298.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				YanhuiSender.sendCmd_11464(hid, 3, bossId);
				return;
			}
			
			Map<Integer, YanhuiBoss> bossMap = yanhui.getBossMap();
			if(bossMap == null) {
				bossMap = new HashMap<Integer, YanhuiBoss>();
			}
			YanhuiBoss yanhuiBoss = bossMap.get(bossId);
			if(yanhuiBoss != null) {
				YanhuiSender.sendCmd_11464(hid, 1, bossId);
				return;
			}
			
			UseAddUtil.use(hero, consume, SourceGoodConst.YANHUI_BOSS_COST,  true);
			
			//开启boss获得
			if (UseAddUtil.canAdd(hero, struct_partyboss_298.getReward(), false)) {
				UseAddUtil.add(hero, struct_partyboss_298.getReward(), SourceGoodConst.YANHUI_BOSS_ADD, null, true);
			}
			
			YanhuiCrossFunction.getIns().broadCast(yanhui,ChatConst.YANHUI_BIWU,new Object[] {hero.getNameZoneid(),bossId});
			
			NPC npc = YanhuiCrossFunction.getIns().addYanhuiBoss(yanhui.getSceneUnitId(), bossId);
			yanhuiBoss = new YanhuiBoss(npc.getId(), bossId);
			bossMap.put(bossId, yanhuiBoss);
			
			YanhuiCrossFunction.getIns().reshSceneHeroDate(yanhui);//刷新场景玩家数据
			
			//B:1成功 2.比武只有主人才可开启 3.元宝不足I:boss ID
			YanhuiSender.sendCmd_11464(hid, 1, bossId);
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "kaiqiBiwu has wrong");
		}
	}

	//邀请(中央服)
	public void yaoqing(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			long hid = hero.getId();
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			if(yanhui == null) return;
			if(hid != yanhui.getHid()) {
				YanhuiSender.sendCmd_11466(hid, 2);
				return;
			}
			CrossData crossData = new CrossData(); 
			crossData.putObject(YanhuiEnum.name.name(), hero.getNameZoneid());
			crossData.putObject(YanhuiEnum.liwuType.name(), yanhui.getType());
			crossData.putObject(YanhuiEnum.id.name(), yanhui.getId());
			crossData.putObject(YanhuiEnum.accept.name(), yanhui.getAccept());
			
			int zoneid = hero.getZoneid();
			int partId = CrossCache.getPartId(zoneid);
			
			YanhuiCrossIO.getIns().cross2local(partId, crossData, CrossConst.CROSS2LOCAL_LOCALYAOQING);
			
			//ChatManager.getIns().broadCast(ChatConst.YANHUI_YAOQING_LT,new Object[] {hero.getNameZoneid(),yanhui.getType(),SystemIdConst.YANHUI});
			//ChatManager.getIns().broadCast(ChatConst.YANHUI_YAOQING,new Object[] {hero.getNameZoneid(),yanhui.getType()});
			YanhuiSender.sendCmd_11466(hid, 1);
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "yaoqing has wrong");
		}
	}

	//退出场景(中央服)
	public void quit(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			long hid = hero.getId();
			//int id = YanhuiCrossCache.getIns().getYanhuiId(hid);
			///YanhuiCrossCache.getIns().removeFubenRole(id, hid);
			
			
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			if(yanhui == null) {
				return;
			}
			long sceneUnitId = yanhui.getSceneUnitId();
			List<Long> list = SceneFunction.getIns().getSceneHero(sceneUnitId, SceneConst.SCENE_SYSID_YANHUI);
			if(list.contains(hid)) {
				YanhuiSender.sendCmd_11468(hid, 1);
				YanhuiCrossSceneEvent.getIns().out(hero);
				CrossSender.sendCmd_1666(hero.getId(), SystemIdConst.YANHUI);
			}
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "quit has wrong");
		}
	}

	//boss比武
	public void battleboss(Hero hero, int bossId) {
		try {
			if(!CrossZone.isCrossServer()){
				//本服
				return;
			}
			long hid = hero.getId();
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			if(yanhui == null) {
				return;
			}
			
			Map<Integer, YanhuiBoss> bossMap = yanhui.getBossMap();
			YanhuiBoss yanhuiBoss = bossMap.get(bossId);
			if(yanhuiBoss == null) {
				YanhuiSender.sendCmd_11470(hid, 3, bossId);
				return;
			}
			
			Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap();
			YanhuiMember member = members.get(hid);
			Set<Integer> kills = member.getHasKill();
			if(kills.contains(bossId)) {
				YanhuiSender.sendCmd_11470(hid, 2, bossId);
				return;
			}
//			int state = yanhuiBoss.getState();
//			if(state == 1) {
//				YanhuiSender.sendCmd_11470(hid, 2, bossId);
//				return;
//			}
			
			YanhuiSender.sendCmd_11470(hid, 1, bossId);
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "battleboss has wrong");
		}
	}

	//战斗结果验证(中央服)
	public void battlerest(Hero hero, int battlerest, int bossId) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			long hid = hero.getId();
			if(battlerest == 0) {
				YanhuiSender.sendCmd_11474(hid, battlerest, bossId);
				return;
			}
			Map<Integer, Integer> battleCheckMap = hero.getBattleCheckMap();
			if(battleCheckMap==null){
				battleCheckMap = new HashMap<Integer, Integer>();
				hero.setBattleCheckMap(battleCheckMap);
			}
			//验证
			int result = BattleFunction.checkWinBoss(hero, bossId, BattleConst.OTHER);
			if(result == 0) {
				YanhuiSender.sendCmd_11474(hid, result, bossId);
				return;
			}
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			if(yanhui != null) {
				Map<Integer, YanhuiBoss> bossMap = yanhui.getBossMap();
				YanhuiBoss boss = bossMap.get(bossId);
				if(boss != null) {
					Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap();
					YanhuiMember member = members.get(hid);
					Set<Integer> kills = member.getHasKill();
					if(!kills.contains(bossId)) {
						kills.add(bossId);
						Struct_partyboss_298 struct_partyboss_298 = Config_partyboss_298.getIns().get(bossId);
						int fw = struct_partyboss_298.getFw();
						yanhui.setFenweiVal(yanhui.getFenweiVal()+fw);
						//战胜boss获得
						if (UseAddUtil.canAdd(hero, struct_partyboss_298.getReward1(), false)) {
							UseAddUtil.add(hero, struct_partyboss_298.getReward1(), SourceGoodConst.YANHUI_WIN_BOSS_ADD, null, true);
						}
						YanhuiCrossFunction.getIns().reshSceneHeroDate(yanhui);//刷新场景玩家数据
					}
				}
			}
			YanhuiSender.sendCmd_11474(hid, 1, bossId);
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "battlerest has wrong");
		}
	}

	//战斗结束后前端请求回到宴会场景(中央服)
	public void backIntoScene(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			long hid = hero.getId();
			//YanhuiCrossFunction.getIns().inCrossScene(hero);
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			if(yanhui != null) {
				YanhuiCrossSceneEvent.getIns().in(hero, SceneConst.SCENE_SYSID_YANHUI, yanhui.getSceneUnitId());
			}
			YanhuiSender.sendCmd_11476(hid, 1);
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "backIntoScene has wrong");
		}
	}

	//申请加入宴会(子服)
	public void shenqing(Hero hero, int id, int type) {
		try {
			if(CrossZone.isCrossServer()){
				return;
			}
			long hid = hero.getId();
			boolean isStart = YanhuiFunction.getIns().isStart();
			if(!isStart) {
				YanhuiSender.sendCmd_11458(hid, 5, 0);
				return;
			}
			 
			String name = hero.getNameZoneid();
			
			Channel channel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData(); 
			crossData.putObject(YanhuiEnum.hid.name(), hid);
			crossData.putObject(YanhuiEnum.id.name(), id);
			crossData.putObject(YanhuiEnum.liwuType.name(), type);
			crossData.putObject(YanhuiEnum.name.name(), name);
			
			NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_CROSSSHENQING, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int state = crossData.getObject(YanhuiEnum.state.name(), Integer.class);
					YanhuiSender.sendCmd_11480(hid, state, id, type);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "shenqing has wrong");
		}
	}
	//勾选申请框(中央服)
	public void gouxuan(Hero hero, int type) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			if(type<0 || type>1) {
				return;
			}
			
			long hid = hero.getId();
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			if(yanhui == null) return;
			if(hid != yanhui.getHid()) {
				YanhuiSender.sendCmd_11482(hid, 2, type);
				return;
			}
			
			yanhui.setApplyType(type);
			YanhuiSender.sendCmd_11482(hid, 1, type);
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "yaoqing has wrong");
		}
	}
	//批准申请(中央服)
	public void pizhunShenqing(Hero hero, int type, long thid) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			long hid = hero.getId();
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			if(yanhui == null) return;
			if(hid != yanhui.getHid()) {
				YanhuiSender.sendCmd_11484(hid, 2, type, thid);
				return;
			}
			
			Map<Long, ShenqingMember> memberMap = yanhui.getShenqingMemberMap();
			
			switch(type) {
			case -1: memberMap.clear(); break;
			case 0: memberMap.remove(thid); break;
			case 1: 
				ShenqingMember member = memberMap.get(thid);
				if(member != null) {
					member.setType(1);
				}
				break;
			case 2:
				for(ShenqingMember m : memberMap.values()) {
					m.setType(1);
				}
				break;
			default: return;
			}
			
			//B:1.成功 2.无此权限 3.对方已参与宴会B:-1.全部拒绝 0.拒绝 1.同意 2.全部同意
			YanhuiSender.sendCmd_11484(hid, 1, type, thid);
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "yaoqing has wrong");
		}
	}
}
