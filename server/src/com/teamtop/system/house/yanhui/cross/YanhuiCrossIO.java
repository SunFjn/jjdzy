package com.teamtop.system.house.yanhui.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.callback.Callback;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.yanhui.YanhuiConst;
import com.teamtop.system.house.yanhui.YanhuiSender;
import com.teamtop.system.house.yanhui.model.ShenqingMember;
import com.teamtop.system.house.yanhui.model.Yanhui;
import com.teamtop.system.house.yanhui.model.YanhuiMember;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_party9_298;
import excel.config.Config_party_298;
import excel.config.Config_partyfw_298;
import excel.config.Config_partylw_298;
import excel.struct.Struct_party9_298;
import excel.struct.Struct_party_298;
import excel.struct.Struct_partyfw_298;
import excel.struct.Struct_partylw_298;
import io.netty.channel.Channel;

public class YanhuiCrossIO {
	
	private static YanhuiCrossIO ins;
	
	public static synchronized YanhuiCrossIO getIns(){
		if(ins == null) {
			ins = new YanhuiCrossIO();
		}
		return ins;
	}
	
	public void crossOpenListUI(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(YanhuiEnum.hid.name(), Long.class);
			int partId = crossData.getObject(YanhuiEnum.partId.name(), Integer.class);
			//long hid = hero.getId();
			int id = YanhuiCrossCache.getIns().getYanhuiId(hid);
			if(id > 0) {
				Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(id, partId);
				if(yanhui == null) {
					YanhuiCrossCache.getIns().removeYanhuiId(hid);
					id = 0;
				}else {
					int time = YanhuiCrossFunction.getIns().getTime(yanhui);
					if(time == 0) {
						YanhuiCrossFunction.getIns().removeYanhui(partId, yanhui);
						Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap();
						for(long thid : members.keySet()) {
							YanhuiCrossCache.getIns().removeYanhuiId(thid);
							YanhuiSender.sendCmd_11472(thid, SystemIdConst.YANHUI, YanhuiConst.JUBAN_END);
						}
						YanhuiCrossCache.getIns().removeYanhui(partId, yanhui);
						id = 0;
						LogTool.info("YanhuiCrossIO crossOpenListUI time==0, hid="+ hid+ " partId="+partId, YanhuiCrossIO.class);
					}
				}
			}
			//int zoneid = hero.getZoneid();
			//int partId = CrossCache.getPartId(zoneid);
			Map<Integer, Yanhui> allHouse = YanhuiCrossCache.getIns().getAllYanhuibyPartId(partId);
			//[B:宴会type(1.普通 2.豪华)I:宴会唯一idI:头像I:头像框U:玩家名称S:参与人数B:是否接受普通赴宴礼物(0.接受 1.不接受)L:宴会举办者id]
			List<Object[]> list = new ArrayList<Object[]>();
			if(allHouse!=null && allHouse.size()>0) {
				Iterator<Entry<Integer, Yanhui>> it = allHouse.entrySet().iterator();  
				while(it.hasNext()){  
					int type = 0;//申请状态：0.未申请 1.已申请 2.已同意申请
					Entry<Integer, Yanhui> entry = it.next();  
					Yanhui houseModel = entry.getValue();
					int time = YanhuiCrossFunction.getIns().getTime(houseModel);
					if(time == 0) {
						//it.remove();//使用迭代器的remove()方法删除元素  
					}else {
						int applyType = houseModel.getApplyType();
						if(applyType == 0) {
							type = 2;//无需申请或已同意
						}else {
							if(hid == houseModel.getHid()) {//举办人
								type = 2;//无需申请或已同意
							}else {
								Map<Long, ShenqingMember> sqMembers = houseModel.getShenqingMemberMap();
								ShenqingMember member = sqMembers.get(hid);
								if(member != null) {
									type = member.getType()+1;
								}
							}
						}
						
						Map<Long, YanhuiMember> houseHeroMap = houseModel.getYanhuiMemberMap();
						//houseList[i] = new Object[] {houseModel.getType(),houseModel.getId(),houseModel.getIcon(),houseModel.getFrame(),houseModel.getName(),houseHeroMap.size(),houseModel.getAccept(),houseModel.getHid()};
						Object[] obj = new Object[] {houseModel.getType(),houseModel.getId(),houseModel.getIcon(),houseModel.getFrame(),houseModel.getName(),houseHeroMap.size(),houseModel.getAccept(),houseModel.getHid(),type};
						list.add(obj);
					}
				}
			}
			crossData.putObject(YanhuiEnum.id.name(), id);
			crossData.putObject(YanhuiEnum.yanhuiList.name(), list);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossIO.class, "YanhuiCrossIO crossOpenListUI");
		}
	}
	public void crossJuban(Channel channel, CrossData crossData) {
		try {
			CrossHeroBaseModel heroBase = crossData.getObject(YanhuiEnum.heroBase.name(), CrossHeroBaseModel.class);
			int yanhuiType = crossData.getObject(YanhuiEnum.yanhuiType.name(), Integer.class);
			int accept = crossData.getObject(YanhuiEnum.accept.name(), Integer.class);
			long hid = heroBase.getId();
			
			int state = 0;
			int id = YanhuiCrossCache.getIns().getYanhuiId(hid);
			if(id > 0) {
				state = 4;
			}else {
				id = YanhuiCrossFunction.getIns().createYanhui(heroBase, yanhuiType, accept);
				state = 1;
			}
			
			crossData.putObject(YanhuiEnum.state.name(), state);
			crossData.putObject(YanhuiEnum.id.name(), id);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			
//			Hero hero = HeroCache.getHero(hid);
//			if(hero != null) {
//				YanhuiManager.getIns().yaoqing(hero);
//			}
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossIO.class, "YanhuiCrossIO crossJuban");
		}
	}
	
	public void crossFuyan(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(YanhuiEnum.hid.name(), Long.class);
			int id = crossData.getObject(YanhuiEnum.id.name(), Integer.class);
			int partId = crossData.getObject(YanhuiEnum.partId.name(), Integer.class);
			int liwuType = crossData.getObject(YanhuiEnum.liwuType.name(), Integer.class);
			String name = crossData.getObject(YanhuiEnum.name.name(), String.class);
			 
			int state = 0;
			int oldId = YanhuiCrossCache.getIns().getYanhuiId(hid);
			if(oldId > 0) {
				state = 5;
				crossData.putObject(YanhuiEnum.state.name(), state);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(id, partId);
			if(yanhui == null) {
				state = 4;
				crossData.putObject(YanhuiEnum.state.name(), state);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			int time = YanhuiCrossFunction.getIns().getTime(yanhui);
			if(time == 0) {
				state = 4;
				crossData.putObject(YanhuiEnum.state.name(), state);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap();
			int yhType = yanhui.getType();
			Struct_party_298 struct_party_298 = Config_party_298.getIns().get(yhType);
			if(members.size() >= struct_party_298.getNum()) {
				state = 3;
				crossData.putObject(YanhuiEnum.state.name(), state);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			
			if(liwuType < yanhui.getAccept()) {
				state = 6;
				crossData.putObject(YanhuiEnum.state.name(), state);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			
			int applyTpey = yanhui.getApplyType();
			if(applyTpey == 1) {
				Map<Long, ShenqingMember> shenqingMemberMap = yanhui.getShenqingMemberMap();
				ShenqingMember member = shenqingMemberMap.get(hid);
				if(member == null) {
					state = 7;
					crossData.putObject(YanhuiEnum.state.name(), state);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
					return;
				}else {
					if(member.getType() == 0) {
						state = 7;
						crossData.putObject(YanhuiEnum.state.name(), state);
						NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
						return;
					}
				}
			}
			
			//主人获得礼物
			Struct_partylw_298 struct_partylw_298 = Config_partylw_298.getIns().get(liwuType);
			long thid = yanhui.getHid();
//			Hero thero = HeroCache.getHero(thid);
//			if(thero != null) {
//				if (UseAddUtil.canAdd(thero, struct_partylw_298.getReward(), false)) {
//					UseAddUtil.add(thero, struct_partylw_298.getReward(), SourceGoodConst.YANHUI_FUYAN_ADD, null, true);
//				}
//			}
			
			YanhuiCrossCache.getIns().addYanhuiMember(hid, name, yanhui, liwuType);
			
			int fw = struct_partylw_298.getFw();
			yanhui.setFenweiVal(yanhui.getFenweiVal()+fw);
			state = 1;
			
			YanhuiCrossFunction.getIns().broadCast(yanhui,ChatConst.YANHUI_FUYAN,new Object[] {name,liwuType,fw});
			
			List<Long> list = SceneFunction.getIns().getSceneHero(yanhui.getSceneUnitId(), SceneConst.SCENE_SYSID_YANHUI);
			for(long theroId : list) {
				Hero thero = HeroCache.getHero(theroId);
				YanhuiCrossFunction.getIns().sceneData(thero);
			}
			
			YanhuiCrossFunction.getIns().reshSceneHeroDate(yanhui);
			
			crossData.putObject(YanhuiEnum.state.name(), state);
			crossData.putObject(YanhuiEnum.hid.name(), thid);
			crossData.putObject(YanhuiEnum.name.name(), name);
			Channel tChannel = CrossCache.getLocalChannel(thid);
			NettyWrite.writeXData(tChannel, CrossConst.CROSS2LOCAL_LOCALFUYANREWARD, crossData);
			
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossIO.class, "YanhuiCrossIO crossJuban");
		}
	}
	//宴会红点
	public void crossRedPoint(Channel channel, CrossData crossData) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			
			long hid = crossData.getObject(YanhuiEnum.hid.name(), Long.class);
			int id = YanhuiCrossCache.getIns().getYanhuiId(hid);
			if(id == 0) {
				crossData.putObject(YanhuiEnum.id.name(), id);
				crossData.putObject(YanhuiEnum.state.name(), 0);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			int partId = CrossCache.getPartId(channel);
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(id, partId);
			if(yanhui == null) {
				crossData.putObject(YanhuiEnum.id.name(), id);
				crossData.putObject(YanhuiEnum.state.name(), 0);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			int endTime = YanhuiCrossFunction.getIns().getTime(yanhui);
			if(endTime == 0) {
				crossData.putObject(YanhuiEnum.id.name(), id);
				crossData.putObject(YanhuiEnum.state.name(), 0);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			
			Map<Long, YanhuiMember> yanhuiMemberMap = yanhui.getYanhuiMemberMap();
			YanhuiMember househero = yanhuiMemberMap.get(hid);
			
			int state = 0;
			//敬酒领奖信息
			Map<Long, Map<Integer, Integer>> jingjiuMap = yanhui.getJingjiuMap();
			for(Entry<Long, Map<Integer, Integer>> it : jingjiuMap.entrySet()) {
				Long thid = it.getKey();
				if(hid != thid) {
					Map<Integer, Integer> value = it.getValue();
					if(value != null) {
						YanhuiMember thousehero = yanhuiMemberMap.get(thid);
						if(thousehero != null) {
							for(Entry<Integer,Integer> entry : value.entrySet()) {
								int key = entry.getKey();
								Map<Integer, Integer> jingjiuAwardMap = househero.getJingjiuAwardMap();
								Integer jjAward = jingjiuAwardMap.get(key);
								if(jjAward == null) {
									state = 1;
								}
							}
						}
					}
				}
			}
			
			//申请红点
			Map<Long, ShenqingMember> shenqingMap = yanhui.getShenqingMemberMap();
			if(shenqingMap.size() > 0) {
				state = 1;
			}
			
			crossData.putObject(YanhuiEnum.id.name(), id);
			crossData.putObject(YanhuiEnum.state.name(), state);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
			
			//敬酒信息
//			Map<Integer, Integer> jingjiuNumMap = househero.getJingjiuNumMap();
//			List<Struct_party9_298> jjList = Config_party9_298.getIns().getSortList();
//			for(Struct_party9_298 struct_party9_298 : jjList) {
//				int jjId = struct_party9_298.getId();
//				Integer num = jingjiuNumMap.get(jjId);
//				if(num == null) num=0;
//				if(struct_party9_298.getTime()-num>0) {
//					crossData.putObject(YanhuiEnum.id.name(), id);
//					crossData.putObject(YanhuiEnum.state.name(), 1);
//					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
//					return;
//				}
//			}
			
			//比武信息
//			List<Struct_partyboss_298> struct_partyboss_298List = Config_partyboss_298.getIns().getSortList();
//			Map<Integer, YanhuiBoss> bossMap = yanhui.getBossMap();
//			for(Struct_partyboss_298 struct_partyboss_298 : struct_partyboss_298List) {
//				int bossid = struct_partyboss_298.getId();
//				YanhuiBoss boss = bossMap.get(bossid);
//				if(boss != null) {
//					Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap();
//					YanhuiMember member = members.get(hid);
//					Set<Integer> kills = member.getHasKill();
//					if(!kills.contains(bossid)) {
//						crossData.putObject(YanhuiEnum.id.name(), id);
//						crossData.putObject(YanhuiEnum.state.name(), 1);
//						NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
//						return;
//					}
//				}else {
//					//可开启比武
//					if(hid == yanhui.getHid()) {
//						crossData.putObject(YanhuiEnum.id.name(), id);
//						crossData.putObject(YanhuiEnum.state.name(), bossid);
//						NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
//						return;
//					}
//				}
//			}
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossIO.class, "YanhuiCrossIO crossRedPoint");
		}
	}
	
	public void localYaoqing(Channel channel, CrossData crossData) {
		try {
			String name = crossData.getObject(YanhuiEnum.name.name(),String.class);
			Integer type = crossData.getObject(YanhuiEnum.liwuType.name(), Integer.class);
			Integer id = crossData.getObject(YanhuiEnum.id.name(), Integer.class);
			Integer accept = crossData.getObject(YanhuiEnum.accept.name(), Integer.class);
			ChatManager.getIns().broadCast(ChatConst.YANHUI_YAOQING_LT,new Object[] {name,type,id,accept});
			ChatManager.getIns().broadCast(ChatConst.YANHUI_YAOQING,new Object[] {name,type});
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossIO.class, "YanhuiCrossIO localYaoqing");
		}
	}
	
	//敬酒申请主推红点
	public void localJingjiu(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(YanhuiEnum.hid.name(), Long.class);
			Hero hero = HeroCache.getHero(hid);
			if(hero != null) {
				//RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.YANHUI, RedPointConst.RED_1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.YANHUI,RedPointConst.RED_1, RedPointConst.HAS_RED);
				
				//主推申请玩家
//				String hName = crossData.getObject(YanhuiEnum.name.name(), String.class);
//				if(hName != null) {
//					String[] arr = hName.split("\\_");
//					long thid = Long.parseLong(arr[0]);
//					String name = arr[1]; 
//					YanhuiSender.sendCmd_11486(hid, thid, name);
//				}
			}
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossIO.class, "YanhuiCrossIO localYaoqing");
		}
	}
	
	//补发宴会奖励
	public void localMailReward(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(YanhuiEnum.hid.name(), Long.class);
			int yanhuiType = crossData.getObject(YanhuiEnum.yanhuiType.name(), Integer.class);
			int fw = crossData.getObject(YanhuiEnum.fw.name(), Integer.class);
			Type type = new TypeReference<Map<Integer, Integer>>() {}.getType();
			Map<Integer, Integer> jingjiuMap = crossData.getObject(YanhuiEnum.jingjiuMap.name(), type);
			//敬酒奖励
			for(Entry<Integer,Integer> entry : jingjiuMap.entrySet()) {
				int id = entry.getKey();
				int num = entry.getValue();
				Struct_party9_298 struct_party9_298 = Config_party9_298.getIns().get(id);
				int[][] reward = struct_party9_298.getReward1();
				for(int i=0; i<num; i++) {
					MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.YANHUI_JINGJIU, new Object[] { MailConst.YANHUI_JINGJIU }, reward);
				}
			}
			//氛围奖励
			List<Struct_partyfw_298> list = Config_partyfw_298.getIns().getSortList();
			for(int i=1; i<=YanhuiConst.GRADE; i++) {
				int[][] reward = null;
				for(Struct_partyfw_298 struct_partyfw_298 : list) {
					if(yanhuiType == struct_partyfw_298.getParty()) {
						if(i == struct_partyfw_298.getNext()) {
							if(fw >= struct_partyfw_298.getFw()) {
								reward = struct_partyfw_298.getReward();
							}
						}
					}
				}
				if(reward != null) {
					MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.YANHUI_FENWEI, new Object[] { MailConst.YANHUI_FENWEI }, reward);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossIO.class, "YanhuiCrossIO localYaoqing");
		}
	}
	
	//主人获得对方赴宴奖励
	public void localFuyanReward(Channel channel, CrossData crossData) {
		try {
			//主人获得礼物
			long thid = crossData.getObject(YanhuiEnum.hid.name(), Long.class);
			int type = crossData.getObject(YanhuiEnum.liwuType.name(), Integer.class);
			String name = crossData.getObject(YanhuiEnum.name.name(), String.class);
			
			Struct_partylw_298 struct_partylw_298 = Config_partylw_298.getIns().get(type);
			int[][] reward = struct_partylw_298.getReward();
			
			MailFunction.getIns().sendMailWithFujianData2(thid, MailConst.YANHUI_FUYAN, new Object[] { MailConst.YANHUI_FUYAN,name,type }, reward);
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossIO.class, "YanhuiCrossIO localYaoqing");
		}
	}
	
	/**
	 * (中央服-->向子服发数据)
	 * @param channel
	 */
//	public void connEvent(Channel channel) {
//		try {
//			int partId = CrossCache.getPartId(channel);
//			//ConcurrentHashMap<Integer, ZcBoss> bossMap = HouseCrossCache.getIns().getBossMap(partId);
//			CrossData crossData = new CrossData();
//			//crossData.putObject(HouseEnum.zcBossMap, bossMap);
//			//NettyWrite.writeXData(channel, CrossConst.CROSS_ZCBOSS_CL, crossData);
//		} catch (Exception e) {
//			LogTool.error(e, this, "YanhuiCrossIO connEvent Exception!");
//		}
//	}
	public void local2Cross(Channel channel,CrossData crossData, int cmd) {
		NettyWrite.writeXData(channel, cmd, crossData);
	}
	
	public CrossData local2Cross(Hero hero, CrossData crossData, int cmd) {
		Channel channel = Client_2.getIns().getCrossChannel();
		CrossData writeBlockData = NettyWrite.writeBlockData(channel, cmd, hero.getId(), crossData);
		return writeBlockData;
	}
	
	public void local2Cross(CrossData crossData, int cmd) {
		Channel channel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(channel, cmd, crossData, new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				
			}
		});
	}
	
	public void cross2local(Hero hero, CrossData crossData, int cmd) {
		Channel localChannel = CrossCache.getLocalChannel(hero.getId());
		NettyWrite.writeXData(localChannel, cmd, crossData);
	}
	
	public void cross2local(int partId, CrossData crossData, int cmd) {
		ConcurrentHashMap<Channel, List<Integer>> channelMap = CrossCache.getChannelToZoneidByPartId(partId);
		for(Channel channel : channelMap.keySet()) {
			NettyWrite.writeXData(channel, cmd, crossData);
		}
		
//		ConcurrentHashMap<Integer, Channel> map = CrossCache.getZoneidToChannelByPartId(partId);
//		Iterator<Channel> channelSetIterator = map.values().iterator();
//		while(channelSetIterator.hasNext()) {
//			Channel tempChannel = channelSetIterator.next();
//			if (tempChannel == null) {
//				continue;
//			}
//			NettyWrite.writeXData(tempChannel, cmd, crossData);
//		}
	}
	
	//申请
	public void crossShenqing(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(YanhuiEnum.hid.name(), Long.class);
			int id = crossData.getObject(YanhuiEnum.id.name(), Integer.class);
			int type = crossData.getObject(YanhuiEnum.liwuType.name(), Integer.class);
			String name = crossData.getObject(YanhuiEnum.name.name(), String.class);
			
			int oldId = YanhuiCrossCache.getIns().getYanhuiId(hid);
			if(oldId > 0) {
				crossData.putObject(YanhuiEnum.state.name(), 2);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			
			crossData.putObject(YanhuiEnum.state.name(), 1);
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhuiById(id);
			if(yanhui == null) {
				crossData.putObject(YanhuiEnum.state.name(), 3);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			if(yanhui != null) {
				Map<Long, ShenqingMember> memberMap = yanhui.getShenqingMemberMap();
				if(type == 0) {//取消申请
					memberMap.remove(hid);
				}else {
					int time = TimeDateUtil.getCurrentTime();
					ShenqingMember value = new ShenqingMember(hid, name, time); 
					memberMap.put(hid, value);
				}
				
				//举报人申请红点
				if(type==1 && memberMap.size() > 0) {
					List<Long> list = SceneFunction.getIns().getSceneHero(yanhui.getSceneUnitId(), SceneConst.SCENE_SYSID_YANHUI);
					if(list.contains(yanhui.getHid())) {
						YanhuiSender.sendCmd_11486(yanhui.getHid(), hid, name);
					}else {
						CrossData crossData2 = new CrossData(); 
						crossData2.putObject(YanhuiEnum.hid.name(), yanhui.getHid());
						//crossData2.putObject(YanhuiEnum.name.name(), (hid+"_"+name));
						Channel localChannel = CrossCache.getLocalChannel(yanhui.getHid());
						NettyWrite.writeXData(localChannel, CrossConst.CROSS2LOCAL_LOCALJINGJIU, crossData2);
					}
				}
			}
			
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossIO.class, "YanhuiCrossIO crossJuban");
		}
	}
}
