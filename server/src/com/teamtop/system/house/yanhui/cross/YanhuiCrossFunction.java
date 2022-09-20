package com.teamtop.system.house.yanhui.cross;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.chat.ChatSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.yanhui.YanhuiConst;
import com.teamtop.system.house.yanhui.YanhuiManager;
import com.teamtop.system.house.yanhui.YanhuiSender;
import com.teamtop.system.house.yanhui.event.YanhuiCrossSceneEvent;
import com.teamtop.system.house.yanhui.model.ShenqingMember;
import com.teamtop.system.house.yanhui.model.Yanhui;
import com.teamtop.system.house.yanhui.model.YanhuiBoss;
import com.teamtop.system.house.yanhui.model.YanhuiMember;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_party9_298;
import excel.config.Config_partyboss_298;
import excel.config.Config_tishi_703;
import excel.struct.Struct_party9_298;
import excel.struct.Struct_partyboss_298;
import excel.struct.Struct_tishi_703;
import io.netty.channel.Channel;

public class YanhuiCrossFunction {
	
	private static YanhuiCrossFunction yanhuiCrossFunction;

	private YanhuiCrossFunction() {
		
	}
	public static synchronized YanhuiCrossFunction getIns() {
		if (yanhuiCrossFunction == null) {
			yanhuiCrossFunction = new YanhuiCrossFunction();
		}
		return yanhuiCrossFunction;
	}
	// 是否刚开启服务器
	private boolean isStartServer = true;
	
	public boolean isStartServer() {
		return isStartServer;
	}

	public void setStartServer(boolean isStartServer) {
		this.isStartServer = isStartServer;
	}
	
	/**
	 * 获得宴会时间
	 * @param houseModel
	 * @return
	 */
	public int getTime(Yanhui yanhui) {
		int time = yanhui.getTime();
		if(time == 0) {
			return 0;
		}
		if(TimeDateUtil.getCurrentTime() >= time) {
			return 0;
		}
		return time;
	}
	
	
	/**
	 * 创建宴会
	 * @param hero
	 */
	public int createYanhui(CrossHeroBaseModel heroBase,int type,int accept) {
		int id = YanhuiCrossCache.getYanhuiUnitId();//生成宴会唯一Id
		int sceneUnitId = SceneCache.getSceneUnitId();//生成场景唯一Id
		int mapId = 0;
		int time = TimeDateUtil.getCurrentTime()+YanhuiConst.TIME;
		Yanhui yanhuiModel = new Yanhui(heroBase,id, sceneUnitId, mapId,time,type,accept);
		int zoneid = heroBase.getZoneid();
		int partId = CrossCache.getPartId(zoneid);
		YanhuiCrossCache.getIns().addYanhui(id, yanhuiModel, partId);
		YanhuiCrossCache.getIns().addYanhuiMember(heroBase, yanhuiModel, 0);
		return id;
	}
	
	/**
	 * 宴会结束移除宴会
	 */
	public void removeYanhui(int partId,Yanhui yanhui) {
		try {
			Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap(); 
			for(YanhuiMember member : members.values()) {
				if(member.getSentReward() == 0) {
					member.setSentReward(1);
					long hid = member.getHid();
					//发到子服补发宴会邮件奖励
					CrossData crossData = new CrossData();
					crossData.putObject(YanhuiEnum.hid.name(), hid);
					crossData.putObject(YanhuiEnum.yanhuiType.name(), yanhui.getType());
					Map<Integer, Integer> jingjiuMap = jingjiuReward(yanhui, member);
					crossData.putObject(YanhuiEnum.jingjiuMap.name(), jingjiuMap);
					crossData.putObject(YanhuiEnum.fw.name(), yanhui.getFenweiVal());
					
					Channel localChannel = CrossCache.getLocalChannel(hid);
					NettyWrite.writeXData(localChannel, CrossConst.CROSS2LOCAL_LOCALMAILREWARD, crossData);
					
					Hero hero = HeroCache.getHero(hid);
					if(hero != null) {
						//YanhuiCrossIO.getIns().cross2local(hero, crossData, CrossConst.CROSS2LOCAL_LOCALMAILREWARD);
						YanhuiManager.getIns().quit(hero);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossFunction.class, "removeYanhui has wrong");
		}
	}
	
	//补发剩余的敬酒奖励
	private Map<Integer, Integer> jingjiuReward(Yanhui yanhui,YanhuiMember member) {
		Map<Integer, Integer> map = new HashMap<Integer,Integer>();
		long hid = member.getHid();
		Map<Integer, Integer> jjAwardMap = member.getJingjiuAwardMap();
		Map<Long, Map<Integer, Integer>> jingjiuMap = yanhui.getJingjiuMap();
		for(Entry<Long, Map<Integer, Integer>> entry : jingjiuMap.entrySet()) {
			Long thid = entry.getKey();
			if(thid != hid) {
				Map<Integer, Integer> jjMap = entry.getValue();
				for(Entry<Integer,Integer> entry2 : jjMap.entrySet()) {
					Integer id = entry2.getKey();
					Integer state = jjAwardMap.get(id);
					if(state == null) {
						jjAwardMap.put(id, 2);
						Integer type = entry2.getValue();
						Integer num = map.get(type);
						if(num == null) {
							num = 0;
						}
						num++;
						map.put(type, num);
					}
				}
			}
		}
		return map;
	}
	
	/**
	 * 宴会广播
	 */
	public void broadCast(Yanhui yanhui,int castNum,Object params) {
		String setReturnParam = ChatManager.getIns().setReturnParam(params);
		//通过广播编号获得系统id
		Struct_tishi_703 guangbo_205 = Config_tishi_703.getIns().get(castNum);
		if(guangbo_205 == null){
			LogTool.warn("broadCast castNum is error!castNum:"+castNum,this);
			return;
		}
		Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap();
		for(long hid : members.keySet()) {
			ChatSender.sendCmd_456(hid, castNum, setReturnParam);
		}
	}
	
	//前往进入宴会场景
	public void inCrossScene(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YANHUI)) return;
			long hid = hero.getId();
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			if(yanhui == null) {
				YanhuiSender.sendCmd_11454(hid, 3, null, 0, 0, 0, 0, 0, null, null, null, null, null, 0);
				return;
			}
			
			int endTime = YanhuiCrossFunction.getIns().getTime(yanhui);
			if(endTime == 0) {
				YanhuiSender.sendCmd_11454(hid, 2, null, 0, 0, 0, 0, 0, null, null, null, null, null, 0);
				return;
			}
			
			YanhuiCrossSceneEvent.getIns().in(hero, SceneConst.SCENE_SYSID_YANHUI, yanhui.getSceneUnitId());
			sceneData(hero);//发送宴会数据
			///YanhuiCrossCache.getIns().addFubenRole(yanhui.getId(), hid);
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "openHouseUI has wrong");
		}
	}
	
	public void sceneData(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YANHUI)) return;
			long hid = hero.getId();
			Yanhui yanhui = YanhuiCrossCache.getIns().getYanhui(hero);
			if(yanhui == null) {
				YanhuiSender.sendCmd_11454(hid, 3, null, 0, 0, 0, 0, 0, null, null, null, null, null, 0);
				return;
			}
			int endTime = YanhuiCrossFunction.getIns().getTime(yanhui);
			if(endTime == 0) {
				YanhuiSender.sendCmd_11454(hid, 2, null, 0, 0, 0, 0, 0, null, null, null, null, null, 0);
				return;
			}
			
			Map<Long, YanhuiMember> yanhuiMemberMap = yanhui.getYanhuiMemberMap();
			int time = yanhui.getTime();
			YanhuiMember member = yanhuiMemberMap.get(hid);
			
			//敬酒信息
			Map<Integer, Integer> jingjiuNumMap = member.getJingjiuNumMap();
			List<Struct_party9_298> jjList = Config_party9_298.getIns().getSortList();
			int size = jjList.size();
			Object[] jingjiu = new Object[size];
			for(int i=0; i<size; i++) {
				Struct_party9_298 struct_party9_298 = jjList.get(i);
				int jjId = struct_party9_298.getId();
				Integer num = jingjiuNumMap.get(jjId);
				if(num == null) num=0;
				jingjiu[i] = new Object[] {jjId,struct_party9_298.getTime()-num};
			}
			
			//敬酒领奖信息
			List<Object[]> lingJiang = new ArrayList<>();
			Map<Long, Map<Integer, Integer>> jingjiuMap = yanhui.getJingjiuMap();
			for(Entry<Long, Map<Integer, Integer>> it : jingjiuMap.entrySet()) {
				Long thid = it.getKey();
				if(hid != thid) {
					Map<Integer, Integer> value = it.getValue();
					if(value != null) {
						YanhuiMember thousehero = yanhuiMemberMap.get(thid);
						if(thousehero != null) {
							for(Entry<Integer,Integer> entry : value.entrySet()) {
								int id = entry.getKey();
								int type = entry.getValue();
								//long tid = Long.parseLong(thid+""+num);
								int flag = 1; //1.可领 2.已领
								Map<Integer, Integer> jingjiuAwardMap = member.getJingjiuAwardMap();
								Integer jjAward = jingjiuAwardMap.get(id);
								if(jjAward != null) {
									flag = 2;//已领
								}
								lingJiang.add(new Object[] {thousehero.getName(),id,type,flag});
							}
						}
					}
				}
			}
			
			//比武信息
			List<Struct_partyboss_298> struct_partyboss_298List = Config_partyboss_298.getIns().getSortList();
			int bossSize = struct_partyboss_298List.size();
			Map<Integer, YanhuiBoss> bossMap = yanhui.getBossMap();
			Set<Integer> kills = member.getHasKill();
			Object[] biwu = new Object[bossSize];
			for(int j=0; j<bossSize; j++) {
				Struct_partyboss_298 struct_partyboss_298 = struct_partyboss_298List.get(j);
				int flag = 0;
				int bossid = struct_partyboss_298.getId();
				YanhuiBoss boss = bossMap.get(bossid);
				long bossUid = 0;
				if(boss != null) {
					flag = 1;
					bossUid = boss.getUnitBossId();
				}
				int isKill = 0;
				if(kills.contains(bossid)) {
					isKill = 1;
				}
				biwu[j] = new Object[] {bossid,flag,isKill,-bossUid};
			}
			
			//宾客列表
			Object[] binkeList = null;
			if(yanhuiMemberMap.size() > 1) {
				binkeList = new Object[yanhuiMemberMap.size()-1];
				int k=0;
				for(YanhuiMember yanhuiMember : yanhuiMemberMap.values()) {
					if(yanhuiMember.getType() > 0) {
						binkeList[k] = new Object[] {yanhuiMember.getName(),yanhuiMember.getType()};
						k++;
					}
				}
			}
			
			Map<Long, ShenqingMember> shengqingMember = yanhui.getShenqingMemberMap();
			//排序
			List<Map.Entry<Long, ShenqingMember>> memberList = new ArrayList<Map.Entry<Long, ShenqingMember>>(shengqingMember.entrySet());
			Collections.sort(memberList, new Comparator<Map.Entry<Long, ShenqingMember>>() {   
			    public int compare(Map.Entry<Long, ShenqingMember> o1, Map.Entry<Long, ShenqingMember> o2) { 
			    	if(o1.getValue().getTime() > o2.getValue().getTime()) {
		    			return 1;
		    		}else if(o1.getValue().getTime() < o2.getValue().getTime()) {
		    			return -1;
		    		}else {
		    			return 0;
		    		}
			    }
			});
			
			List<Object[]> shenqingList = new ArrayList<>();
			Iterator<Entry<Long, ShenqingMember>> it = memberList.iterator();
			while(it.hasNext()) {
				Entry<Long, ShenqingMember> entry = it.next();
				ShenqingMember m = entry.getValue();
				if(m.getType() == 0) {
					shenqingList.add(new Object[] {m.getHid(),m.getName()});
				}
			}
			
			//YanhuiCrossCache.getIns().addFubenRole(yanhui.getId(), hid);
			//U:玩家名称B:宴会idS:参与人数I:氛围值I:宴会时间[B:敬酒idI:次数]敬酒 [U:玩家名称L:玩家idB:敬酒idB:1.领取奖励 2.已领取] 领奖  [B:bossIdB:0.未开启 1.已开启]比武  [U:玩家名称B:礼物类型]
			YanhuiSender.sendCmd_11454(hid, 1, yanhui.getName(), yanhui.getType(), yanhuiMemberMap.size(), yanhui.getFenweiVal(), time, yanhui.getHid(), jingjiu, lingJiang.toArray(), biwu, binkeList,shenqingList.toArray(),yanhui.getApplyType());
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "openHouseUI has wrong");
		}
	}
    
	/**
	 * 开启宴会boss
	 */
	public NPC addYanhuiBoss(int sceneUnitId,int npcSysId) {
		try {
			//Struct_map_200 struct_map_200 = Config_map_200.getIns().get(SceneConst.SCENE_SYSID_YANHUI);
			Struct_partyboss_298 struct_partyboss_298 = Config_partyboss_298.getIns().get(npcSysId);
			int[] newPosByRandom = struct_partyboss_298.getPosition()[0];
			
			NPC npc=SceneFunction.getIns().addNpcToScene(npcSysId, newPosByRandom[0], newPosByRandom[1], -1, sceneUnitId, SceneConst.SCENE_SYSID_YANHUI, true);
			
			return npc;
		}catch (Exception e) {
			LogTool.error(e, YanhuiCrossFunction.class, "addYanhuiBoss npcSysId=" + npcSysId);
		}
		return null;
	}
	
	/**
	 * 刷新宴会场景里面玩家数据
	 * @param yanhui
	 */
	public void reshSceneHeroDate(Yanhui yanhui) {
		try {
			long sceneUnitId = yanhui.getSceneUnitId();
			List<Long> list = SceneFunction.getIns().getSceneHero(sceneUnitId, SceneConst.SCENE_SYSID_YANHUI);
			//List<Long> list2 = YanhuiCrossCache.getIns().getFubenRoles(yanhui.getId());
			for(long theroId : list) {
				Hero thero = HeroCache.getHero(theroId);
				YanhuiCrossFunction.getIns().sceneData(thero);
			}
		} catch (Exception e) {
			LogTool.error(e, YanhuiCrossFunction.class, "reshSceneHeroDate sceneUnitId=" + SceneConst.SCENE_SYSID_YANHUI);
		}
	}

}
