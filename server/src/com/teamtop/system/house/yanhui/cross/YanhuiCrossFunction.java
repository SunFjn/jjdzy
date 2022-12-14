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
	// ????????????????????????
	private boolean isStartServer = true;
	
	public boolean isStartServer() {
		return isStartServer;
	}

	public void setStartServer(boolean isStartServer) {
		this.isStartServer = isStartServer;
	}
	
	/**
	 * ??????????????????
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
	 * ????????????
	 * @param hero
	 */
	public int createYanhui(CrossHeroBaseModel heroBase,int type,int accept) {
		int id = YanhuiCrossCache.getYanhuiUnitId();//??????????????????Id
		int sceneUnitId = SceneCache.getSceneUnitId();//??????????????????Id
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
	 * ????????????????????????
	 */
	public void removeYanhui(int partId,Yanhui yanhui) {
		try {
			Map<Long, YanhuiMember> members = yanhui.getYanhuiMemberMap(); 
			for(YanhuiMember member : members.values()) {
				if(member.getSentReward() == 0) {
					member.setSentReward(1);
					long hid = member.getHid();
					//????????????????????????????????????
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
	
	//???????????????????????????
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
	 * ????????????
	 */
	public void broadCast(Yanhui yanhui,int castNum,Object params) {
		String setReturnParam = ChatManager.getIns().setReturnParam(params);
		//??????????????????????????????id
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
	
	//????????????????????????
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
			sceneData(hero);//??????????????????
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
			
			//????????????
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
			
			//??????????????????
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
								int flag = 1; //1.?????? 2.??????
								Map<Integer, Integer> jingjiuAwardMap = member.getJingjiuAwardMap();
								Integer jjAward = jingjiuAwardMap.get(id);
								if(jjAward != null) {
									flag = 2;//??????
								}
								lingJiang.add(new Object[] {thousehero.getName(),id,type,flag});
							}
						}
					}
				}
			}
			
			//????????????
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
			
			//????????????
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
			//??????
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
			//U:????????????B:??????idS:????????????I:?????????I:????????????[B:??????idI:??????]?????? [U:????????????L:??????idB:??????idB:1.???????????? 2.?????????] ??????  [B:bossIdB:0.????????? 1.?????????]??????  [U:????????????B:????????????]
			YanhuiSender.sendCmd_11454(hid, 1, yanhui.getName(), yanhui.getType(), yanhuiMemberMap.size(), yanhui.getFenweiVal(), time, yanhui.getHid(), jingjiu, lingJiang.toArray(), biwu, binkeList,shenqingList.toArray(),yanhui.getApplyType());
		} catch (Exception e) {
			LogTool.error(e, YanhuiManager.class, "openHouseUI has wrong");
		}
	}
    
	/**
	 * ????????????boss
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
	 * ????????????????????????????????????
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
