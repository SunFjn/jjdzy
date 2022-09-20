package com.teamtop.system.tigerPass.cross;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.tigerPass.model.TigerPassEmployer;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class TigerPassCrossCrossIO {
	
	private static TigerPassCrossCrossIO ins;
	public static TigerPassCrossCrossIO getIns(){
		if(ins == null) {
			ins = new TigerPassCrossCrossIO();
		}
		return ins;
	}
	/**
	 * 收到子服上传的虎牢关雇佣兵
	 * @param channel
	 * @param crossData
	 */
	public void CRLaddemploy(Channel channel, CrossData crossData) {
		try {
			TigerPassEmployer employer = crossData.getObject(TigerPassEnum.employ,TigerPassEmployer.class);
			
			int partid=CrossCache.getPartId(channel);
			crossData.finishGet();
			ConcurrentHashMap<Long, TigerPassEmployer> tigerPassEmployerMap = TigerPassCrossCache.getTigerPassEmployerMap(partid);
			if (!tigerPassEmployerMap.containsKey(employer.getHid())) {
				employer.setBelongZoneid(partid);
				tigerPassEmployerMap.put(employer.getHid(), employer);
				crossData.putObject(TigerPassEnum.addemployresult, 0);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				
			}else {
				crossData.putObject(TigerPassEnum.addemployresult, 1);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			}
			LogTool.info("CRLaddemploy partid=" + partid + ", hid=" + employer.getHid(), this);
		} catch (Exception e) {
			LogTool.error(e, TigerPassCrossCrossIO.class, "CRLaddemploy has wrong");
		}
	}
	/**
	 * 收到子服刷新虎牢关雇佣兵
	 * @param channel
	 * @param crossData
	 */
	public void CRLreshemploylist(Channel channel, CrossData crossData) {
		try {
			long resherhid = crossData.getObject(TigerPassEnum.hid,Long.class);
			int partid=CrossCache.getPartId(channel);
			crossData.finishGet();
			ConcurrentHashMap<Long, TigerPassEmployer> tigerPassEmployerMap = TigerPassCrossCache.getTigerPassEmployerMap(partid);
			if (tigerPassEmployerMap.size()>0) {
				if (tigerPassEmployerMap.size()==1&&tigerPassEmployerMap.containsKey(resherhid)) {
					crossData.putObject(TigerPassEnum.reshresult, 1);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					return;
				}
				
				Long[] keys=null;
				if (tigerPassEmployerMap.containsKey(resherhid)) {
					//雇佣兵集合中包括自己
					ConcurrentHashMap<Long, TigerPassEmployer> newMap=new ConcurrentHashMap<>();
					newMap.putAll(tigerPassEmployerMap);
					newMap.remove(resherhid);
					keys = newMap.keySet().toArray(new Long[0]);
					
				}else {
					//雇佣集合中不包括自己
					keys = tigerPassEmployerMap.keySet().toArray(new Long[0]);
				}
				ConcurrentHashMap<Long, TigerPassEmployer> chooseMap=new ConcurrentHashMap<>();
				
				if (keys.length<=6) {
					//
					for (int i = 0; i < keys.length; i++) {
						Long hid1 = keys[i];
						TigerPassEmployer tigerPassEmployer=tigerPassEmployerMap.get(hid1);
						chooseMap.put(hid1, tigerPassEmployer);
					}
				}else {
					//随机从中取出6人
					List<Integer> multiRandomNumInArea = RandomUtil.getMultiRandomNumInArea(0, keys.length-1, 6);
					
					for (int i = 0; i < multiRandomNumInArea.size(); i++) {
						Integer index = multiRandomNumInArea.get(i);
						Long hid1 = keys[index];
						TigerPassEmployer tigerPassEmployer=tigerPassEmployerMap.get(hid1);
						chooseMap.put(hid1, tigerPassEmployer);
					}
				}
				
				crossData.putObject(TigerPassEnum.reshresult, 0);
				crossData.putObject(TigerPassEnum.employMap, chooseMap);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				
			}else {
				crossData.putObject(TigerPassEnum.reshresult, 1);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			}
		} catch (Exception e) {
			LogTool.error(e, TigerPassCrossCrossIO.class, "CRLreshemploylist has wrong");
		}
	}
	
	
	/**
	 * 收到子服雇佣其他玩家
	 * @param channel
	 * @param crossData
	 */
	public void CRLchooseemployer(Channel channel, CrossData crossData) {
		try {
			Long employerhid = crossData.getObject(TigerPassEnum.choosehid,Long.class);
			
			int partid=CrossCache.getPartId(channel);
			crossData.finishGet();
			ConcurrentHashMap<Long, TigerPassEmployer> tigerPassEmployerMap = TigerPassCrossCache.getTigerPassEmployerMap(partid);
			if (tigerPassEmployerMap.containsKey(employerhid)) {
				TigerPassEmployer tigerPassEmployer = tigerPassEmployerMap.get(employerhid);
				if (tigerPassEmployer.getBechoosenum()>0) {
					
					tigerPassEmployer.setBechoosenum(tigerPassEmployer.getBechoosenum()-1);
					//有次数
					crossData.putObject(TigerPassEnum.chooserest, 0);
					crossData.putObject(TigerPassEnum.chooserestnum, tigerPassEmployer.getBechoosenum());
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					//同时给被雇佣的人发邮件
					//MailFunction.getIns().sendMailWithFujianData2(receiverId, MailSysId, contentData, fujianData);
					Channel channel1 = CrossCache.getChannel(tigerPassEmployer.getZoneid());
					CrossData data = new CrossData();
					data.putObject(TigerPassEnum.hid, tigerPassEmployer.getHid());
					NettyWrite.writeXData(channel1, CrossConst.TIGER_BECHOOSE_REWARD, data);
					LogTool.info("tigerPassEmployer.getHid(): "+tigerPassEmployer.getHid()+"CRLchooseemployer", TigerPassCrossCrossIO.class);
				}else {
					tigerPassEmployer.setBechoosenum(0);
					//没次数
					crossData.putObject(TigerPassEnum.chooserest, 1);
					crossData.putObject(TigerPassEnum.chooserestnum, 0);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				}
			
				
				
			}
			
		} catch (Exception e) {
			LogTool.error(e, TigerPassCrossCrossIO.class, "CRLaddemploy has wrong");
		}
	}
	
	
	

}
