package com.teamtop.houtaiHttp.events.adMonitor;

import java.util.Iterator;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

/**
 * 广告号监控中央服与子服传输方法类
 * @author hepl
 *
 */
public class AdMonitorIO {

	private static AdMonitorIO ins = null;
	
	public static AdMonitorIO getIns(){
		if(ins == null){
			ins = new AdMonitorIO();
		}
		return ins;
	}
	
	private static Logger logger = LoggerFactory.getLogger(AdMonitorIO.class);
	
	/**
	 * 子服通知中央服设置广告号的账号数据
	 * @param openid 玩家账号
	 * @param type 操作类型，1标记为广告号，2取消广告号
	 * @param zoneid 区号
	 */
	public void setAdAccount(String openid, int type, int zoneid){
		try {
			Channel channel = Client_1.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			crossData.putObject(AdMonitorEnum.openid, openid);
			crossData.putObject(AdMonitorEnum.type, type);
			crossData.putObject(AdMonitorEnum.zoneid, zoneid);
			NettyWrite.writeXData(channel, CrossConst.SET_AD_ACCOUNT, crossData);
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "AdMonitorIO setAdAccount error!openid:"+openid+",type:"+type));
		}
	}
	
	/**
	 * 中央服设置广告号的账号数据
	 * @param channel
	 * @param crossData
	 */
	public void setAdAccountServer(Channel channel, CrossData crossData){
		try {
			String openid = (String) crossData.getObject(AdMonitorEnum.openid, String.class);
			Integer type = (Integer) crossData.getObject(AdMonitorEnum.type, Integer.class);
			Integer zoneid = (Integer) crossData.getObject(AdMonitorEnum.zoneid, Integer.class);
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			if(type == 1){
				//标记为广告号
				M_AdAccount adAccount = new M_AdAccount();
				adAccount.setOpenid(openid);
				adAccount.setTime(TimeDateUtil.getCurrentTime());
				AdAccountDao.getIns().insert(adAccount, CrossZone.houtai);
				//通知全服的相同账号都为广告号
				Iterator<Entry<Integer, Channel>> iterator = zoneidToChannel.entrySet().iterator();
				while(iterator.hasNext()){
					Entry<Integer, Channel> next = iterator.next();
					if(!zoneid.equals(next.getKey())){
						crossData.putObject(AdMonitorEnum.zoneid, next.getKey());
						NettyWrite.writeXData(next.getValue(), CrossConst.SET_AD_MONITOR_DATA, crossData);
					}
				}
			}else if(type == 2){
				//取消广告号
				AdAccountDao.getIns().delByOpenid(openid, CrossZone.houtai);
				//通知全服的相同账号都取消广告号
				Iterator<Entry<Integer, Channel>> iterator = zoneidToChannel.entrySet().iterator();
				while(iterator.hasNext()){
					Entry<Integer, Channel> next = iterator.next();
					if(!zoneid.equals(next.getKey())){
						crossData.putObject(AdMonitorEnum.zoneid, next.getKey());
						NettyWrite.writeXData(next.getValue(), CrossConst.SET_AD_MONITOR_DATA, crossData);
					}
				}
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "AdMonitorIO setAdAccountServer error!"));
		}
	}
	
	/**
	 * 子服设置广告号数据
	 * @param channel
	 * @param crossData
	 */
	public void setAdMonitorData(Channel channel, CrossData crossData){
		try {
			
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "AdMonitorIO setAdMonitorData error!"));
		}
	}
	
	/**
	 * 子服登陆时判断是否广告号账号，如果是则标记为广告号
	 * @param hero
	 */
	public void checkAdAccount(final Hero hero){
		try {
			
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "AdMonitorIO checkAdAccount error!"));
		}
	}
	
	/**
	 * 中央服验证账号是否是广告号账号
	 * @param channel
	 * @param crossData
	 */
	public void checkAdAccountServer(Channel channel, CrossData crossData){
		try {
			String openid = (String) crossData.getObject(AdMonitorEnum.openid, String.class);
			M_AdAccount adAccount = AdAccountDao.getIns().findByOpenid(openid, CrossZone.houtai);
			int rtnCode = 0;
			if(adAccount != null){
				rtnCode = 1;
			}
			crossData.putObject(AdMonitorEnum.rtnCode, rtnCode);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "AdMonitorIO checkAdAccountServer error!"));
		}
	}
}
