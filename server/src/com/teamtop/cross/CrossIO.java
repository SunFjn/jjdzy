package com.teamtop.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.callback.ListenerLogic;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossConnFunction;
import com.teamtop.cross.connEvent.CrossLoginCache;
import com.teamtop.cross.connEvent.CrossLoginType;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.cross.upload.CrossHeroSceneModel;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.houtaiHttp.events.serverMaintain.ServerMaintainEnum;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.db.trans.LMessageFormat;
import com.teamtop.util.db.trans.crossTrans.CrossTrans;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DataBaseProp;
import com.teamtop.util.mybatis.MybatisUtil;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class CrossIO {
	private static CrossIO ins = null;
	public static CrossIO getIns() {
		if (ins == null) {
			ins = new CrossIO();
		}
		return ins;
	}
	private Logger logger = LoggerFactory.getLogger(CrossIO.class);
	/**
	 * 接受子服 访问中央服并且建立连接
	 * @param channel
	 * @param data
	 */
	@SuppressWarnings("unchecked")
	public void bindChannelZoneid(Channel channel,CrossData data){
		Type type = new TypeReference<List<Integer>>() {}.getType();
		List<Integer> zoneList = (List<Integer>) data.getObject(CrossEnum.zoneidList, type);
		if(!CrossCache.getMainServerSet().contains(zoneList.get(0))) {			
			Channel oldChannel = CrossCache.getChannel(zoneList.get(0));
			if(oldChannel!=null) {
				List<Integer> oldList = CrossCache.getZoneidListByChannel(oldChannel);
				if (oldList != null && oldList.size() > 0) {
					if (oldList.get(0) != zoneList.get(0)) {
						LogTool.info("hefu 子服错误连接" + zoneList.get(0) + ", mainZone=" + oldList.get(0), this);
						return;
					}
				}
			}
		}
		for(Integer zoneid:zoneList){
			CrossCache.bindChannelZoneid(channel, zoneid);
		}
		if (zoneList.size() > 0) {
			CrossCache.getMainServerSet().add(zoneList.get(0));
			int size = zoneList.size();
			for (int i = 0; i < size; i++) {
				if (i > 0) {
					CrossCache.getMainServerSet().remove(zoneList.get(i));
					LogTool.info("CrossCache.getMainServerSet() remove " + zoneList.get(i), this);
				}
			}
			LogTool.info("CrossCache.getMainServerSet() zoneid=" + zoneList.get(0), this);
			LogTool.info("CrossCache.getMainServerSet() size=" + CrossCache.getMainServerSet().size(), this);
		}
		type = new TypeReference<Map<Integer,DataBaseProp>>() {}.getType();
		Map<Integer,DataBaseProp> propMap = (Map<Integer, DataBaseProp>) data.getObject(CrossEnum.databaseProp, type);
		for(DataBaseProp db:propMap.values()){
			MybatisUtil.getDataBasePropMap().put(db.getZoneid(), db);
		}
		if(GameProperties.serverPort>0){
			data.finishGet();
			data.putObject(CrossEnum.sendToAsPort, GameProperties.serverPort);
			data.putObject(CrossEnum.serverid, GameProperties.serverId);
			NettyWrite.writeXData(channel, CrossConst.CMD_SEND_TO_AS_PORT,data);
			CrossConnFunction.getIns().connEvent(channel);
		}
		synServerState(zoneList, channel);
	}

	/**
	 * 子服连接上后同步服务状态
	 * 
	 * @param zoneList
	 * @param channel
	 */
	public void synServerState(List<Integer> zoneList, Channel channel) {
		try {
			if (zoneList != null && zoneList.size() > 0) {
				int zoneid = zoneList.get(0);
				M_ServerInfo serverInfo = null;
				M_ServerInfo tempServerInfo = null;
				Iterator<String> iterator = ServerInfoCache.pfServerMap.keySet().iterator();
				for (; iterator.hasNext();) {
					String pf = iterator.next();
					Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
					if (map != null && map.containsKey(zoneid)) {
						tempServerInfo = map.get(zoneid);
						if (tempServerInfo != null) {
							serverInfo = tempServerInfo;
							break;
						}
					}
				}
				if (serverInfo != null) {
					// 通知子服
					CrossData crossData = new CrossData();
					crossData.putObject(ServerMaintainEnum.state, serverInfo.getState());
					crossData.putObject(ServerMaintainEnum.content, serverInfo.getContent());
					NettyWrite.writeXData(channel, CrossConst.SERVER_MAINTAIN, crossData);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossIO.class, "CrossIO synServerState");
		}
	}
		
	public void sendToAsPort(Channel channel,CrossData data){
		int cmd = CrossConst.CMD_SEND_TO_AS_PORT;
		/*int port = (int) data.get(CrossEnum.sendToAsPort);
		int serverid = (int) data.get(CrossEnum.serverid);
		if(serverid==GameConst.SERVER_ID_JIANGHU){
			Client_1.getIns().setCrossToAsPort(port);
		}*/
		int serverid = data.getObject(CrossEnum.serverid.name(), Integer.class);
		if( serverid==GameConst.SERVER_ID_HOUTAI){
//			System.out.println("与【跨服-后台】连接成功。CrossIO.sendToAsPort.");
			LogTool.info("与【跨服-后台】连接成功。CrossIO.sendToAsPort.remoteAddress:"+channel.remoteAddress(), this);
		}else if( serverid==GameConst.SERVER_ID_CENTRAL){
//			System.out.println("与【跨服-玩法】连接成功。CrossIO.sendToAsPort.");
			LogTool.info("与【跨服-玩法】连接成功。CrossIO.sendToAsPort.remoteAddress:"+channel.remoteAddress(), this);
		}
	}
	
	public void dispatchCallback(Channel channel,CrossData data){
		int callbackcmd = data.getCallbackCmd();
		ListenerLogic.dispatch(channel,callbackcmd, data);
	}
	
	public void dispatchBlock(Channel channel,CrossData data){
		int callbackcmd = data.getCallbackCmd();
		ListenerLogic.receiveBlockData(callbackcmd, data);
	}
	/**
	 * 请求连接跨服
	 * @param channel
	 * @param data
	 */
	public void askCross(Channel channel,CrossData data){
		int askCross = CrossConst.ASK_CROSS;
		int callbackcmd = data.getCallbackCmd();
		int crossLoginType = (int) data.getObject(CrossEnum.crossLoginType, Integer.class);
		String crossLoginParam = (String) data.getObject(CrossEnum.crossLoginParam, String.class);
		data.finishGet();
		AbsCrossLoginEvent event = CrossLoginCache.getEvent(crossLoginType);
		if (event != null) {
			CrossSelectRoom crossSelectRoom = null;
			try {
				crossSelectRoom = event.crossSelectRoom(crossLoginType, crossLoginParam);
			} catch (Exception e) {
				logger.error(LogTool.exception(e, "AskCross selectRoom error!crossLoginType:"+crossLoginType));
			}
			data.putObject(CrossEnum.crossSelectRoom, crossSelectRoom);
		}else{
			LogTool.warn("crossSelectRoom,can not found event,crossLoginType:" + crossLoginType, this);
		}
		NettyWrite.writeCallbackData(channel, data, callbackcmd);
	}
	
	/**
	 * 上传玩家数据（场景数据）
	 * @param channel
	 * @param data
	 */
	@SuppressWarnings("unchecked")
	public void uploadHeroScene(Channel channel,CrossData data){
		int cmd = CrossConst.UPDATE_HERO_SCENE;
		CrossHeroSceneModel model = (CrossHeroSceneModel) data.getObject(CrossEnum.update_hero_scene, CrossHeroSceneModel.class);
//		Ride ride = (Ride) data.get(CrossEnum.update_ride);
		int callbackcmd = data.getCallbackCmd();
		int crossLoginType = (int) data.getObject(CrossEnum.crossLoginType, Integer.class);
		int crossLoginRoomId = (int) data.getObject(CrossEnum.crossLoginRoomId, Integer.class);
		Object[] crossLoginParam = data.getObject(CrossEnum.crossLoginParam, Object[].class);
		Hero hero = CrossFunction.makeHeroForScene(model);
		logger.info("Cross login start.recieve hero and scene data.hid:"+hero.getId()+" name:"+hero.getName()+" type:"+CrossLoginType.getSystemName(crossLoginType)+" roomeID:"+crossLoginRoomId+" param:"+crossLoginParam+" localChannel="+channel.remoteAddress());
//		if(ride!=null){
//			RideCache.putOnlineRide(ride);
//		}
		byte[] sceneDataarr = (byte[]) data.getObject(CrossEnum.sceneData, byte[].class);
		HashMap<Object, Object> sceneData  = (HashMap<Object, Object>) LMessageFormat.read(sceneDataarr);
		hero.setSceneShowData(sceneData);
		HeroCache.putHero(hero);
		hero.getTempVariables().setCrossLoginType(crossLoginType);
		hero.getTempVariables().setCrossLoginRoomId(crossLoginRoomId);
		hero.getTempVariables().setCrossLoginParam(crossLoginParam);
		hero.setLoginTime(TimeDateUtil.getCurrentTime());
		hero.setLocalChannel(channel);
		AbsCrossLoginEvent event = CrossLoginCache.getEvent(crossLoginType);
		CrossData crossAfterReciSucc = null;
		if (event != null) {
			try {
				crossAfterReciSucc = event.crossAfterReciSucc(hero, channel,crossLoginParam, data);
			} catch (Exception e) {
				LogTool.error(e, this, LogTool.exception(e));
			}
		}else{
			LogTool.warn("uploadHeroScene,can not found event,crossLoginType:" + crossLoginType,this);
		}
		data.finishGet();
		NettyWrite.writeCallbackData(channel, crossAfterReciSucc==null?new CrossData():crossAfterReciSucc, callbackcmd);
	}
	
	/**
	 * 玩家在子服广播变化同步到中央服
	 * @param channel
	 * @param data
	 */
	@SuppressWarnings("unchecked")
	public void syncBoardcastToCross(Channel channel,CrossData data){
		/*Long hid = (Long) data.get(CrossEnum.hid);
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
//			logger.warn(LogFormat.rec("syncChangeToCross hero is null,hid:"+hid));
			return;
		}
		
		byte[] chgarr = (byte[]) data.get(CrossEnum.chg);
		Map<Object, Object> chg  = (Map<Object, Object>) LMessageFormat.read(chgarr);
		
		byte[] sceneDataarr = (byte[]) data.get(CrossEnum.sceneData);
		HashMap<Object, Object> sceneData  = (HashMap<Object, Object>) LMessageFormat.read(sceneDataarr);
		
		hero.setSceneShowData(sceneData);
		
		SceneFunction.getIns().boardcastNewState(hero, chg, false);*/
		
	}
	/**
	 * 中央服同步子服心跳
	 * @param channel
	 * @param data
	 */
	public void getCrossHeartbeat(Channel channel,CrossData data){
		Long hid = (Long) data.getObject(CrossEnum.hid, Long.class);
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			LogTool.warn("crossToLocalHeartbeat hero is null,hid:"+hid, this);
			data.putObject(CrossEnum.heartbeat, 0);
			NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
			return;
		}
		data.putObject(CrossEnum.heartbeat, TimeDateUtil.getCurrentTime());
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}
	/**
	 * gm或者后台查找房间匹配规则
	 * @param channel
	 * @param data
	 */
	public void find_cross_roomMatch(Channel channel,CrossData data){
		//["room:1;zoneids:1,2,3","room:2;zoneids:4,5,6,7,8,9","room:3;zoneids:10,11,12,13,14,15,16,17"]
		ArrayList<RoomMatch> roomMatchExcel = CrossCache.getRoomMatchExcel();
		String[] arr = new String[roomMatchExcel.size()];
		int i = 0;
		for(RoomMatch rm:roomMatchExcel){
			StringBuilder sb = new StringBuilder();
			int room = rm.getRoom();
			sb.append("room:").append(room).append(";zoneids:");
			List<Integer> zoneids = rm.getZoneids();
			int size = zoneids.size();
			for(int j=0;j<size;j++){
				sb.append(zoneids.get(j));
				if(j<size-1){
					sb.append(",");
				}
			}
			arr[i++] = sb.toString();
		}
		data.putObject(CrossEnum.zoneidList, arr);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}
	
	/**
	 * 查看跨服角色
	 * @author lobbyer
	 * @param channel
	 * @param data
	 * @date 2016年12月27日
	 */
	public void look_cross_hero(Channel channel,CrossData data) {
		int zid = (int) data.getObject(CrossEnum.zoneid, Integer.class);
		String pf = (String) data.getObject(CrossEnum.pf, String.class);
		long hid = (long) data.getObject(CrossEnum.hid, Long.class);
		long lhid = (long) data.getObject(CrossEnum.otherhid, Long.class);
		int type = (int) data.getObject(CrossEnum.type, Integer.class);
		int gid = (int) data.getObject(CrossEnum.gid, Integer.class);
		Channel localChannel = CrossCache.getChannel(zid);
		if(localChannel!=null){
			try {
				CrossData crossData = new CrossData();
				crossData.putObject(CrossEnum.pf, pf);
				crossData.putObject(CrossEnum.otherhid, lhid);
				crossData.putObject(CrossEnum.type, type);
				crossData.putObject(CrossEnum.gid, gid);
				CrossData writeBlockData = NettyWrite.writeBlockData(localChannel, CrossConst.LOOK_OTHER_HERO, hid, crossData);
				NettyWrite.writeBlockCallback(channel, writeBlockData, data.getCallbackCmd());
			} catch (Exception e) {
//				logger.error(LogTool.exception(e));
			}
		}
	}

	/**
	 * 查看跨服角色宠物
	 * @author lobbyer
	 * @param channel
	 * @param data
	 * @date 2016年12月27日
	 */
	public void look_cross_pet(Channel channel,CrossData data) {
		int zid = (int) data.getObject(CrossEnum.zoneid, Integer.class);
		long hid = (long) data.getObject(CrossEnum.hid, Long.class);
		long lhid = (long) data.getObject(CrossEnum.otherhid, Long.class);
		Channel localChannel = CrossCache.getChannel(zid);
		if(localChannel!=null){
			try {
				CrossData crossData = new CrossData();
				crossData.putObject(CrossEnum.otherhid, lhid);
				CrossData writeBlockData = NettyWrite.writeBlockData(localChannel, CrossConst.LOOK_OTHER_PET, hid, crossData);
				NettyWrite.writeBlockCallback(channel, writeBlockData, data.getCallbackCmd());
			} catch (Exception e) {
//				logger.error(LogTool.exception(e));
			}
		}
	}
	/**
	 * 子服让中央服关闭连接
	 * @param channel
	 * @param data
	 */
	public void tellCrossServerCloseClient(Channel channel,CrossData data){
		long hid = (long) data.getObject(CrossEnum.hid, Long.class);
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
//			logger.warn(LogFormat.rec("tellCrossServerCloseClient hero is null,hid:"+hid));
			return;
		}
		if (hero.getChannel() != null) {
			hero.getChannel().close();
		}
//		HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
	}
	public static void main(String[] args) {
		CrossData crossData = new CrossData();
		crossData.putObject("abc", true);
		
		byte[] write = CrossTrans.write(crossData, CrossData.class);
		CrossData read = CrossTrans.read(write, CrossData.class);
		System.err.println(read);
	}
}
