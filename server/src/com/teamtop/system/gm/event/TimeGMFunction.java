package com.teamtop.system.gm.event;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossBaseOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossBoss.CrossBossEnum;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.gm.GMConst;
import com.teamtop.system.gm.GMSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

/**
 * 系统时间GM功能接口类
 * @author lobbyer
 * @date 2017年4月12日
 */
public class TimeGMFunction {
	private static TimeGMFunction ins;
	public static TimeGMFunction getIns(){
		if(ins == null) {
			ins = new TimeGMFunction();
		}
		return ins;
	}
	
	public void changeSysTime(Hero hero, int type, String[] param) {
		String timeStr = param[0];
		if(timeStr == null) return;
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(timeStr.length() == 19) {//修改时间
			if(CrossZone.isCrossServer()) {
				return;
			}
			sendToCross(type, param);
			try {
				Date date = simpleDateFormat.parse(timeStr);
				int time = (int)(date.getTime() /1000);
				int now = TimeDateUtil.getCurrentTime();
				int nowRecord = now;
				if(time > now){
					System.err.println("888888888888=="+time);
					TimeDateUtil.isModifyTime = true;
					//if(hero!=null) GmSender.sendCmd_98(hero.getId(), GMConst.GM_SYSTIME, "正在修改系统时间...",type);
					int addtion = time - now;
					//循环之间的事件
					//ScheduleUtil.cancelTask(ScheduleConst.QURATZ);
					ScheduleUtil.cancelAllTask();
					long currentTime = System.currentTimeMillis();
					Map<String, AbsScheduleExecutor> executors = ScheduleUtil.executorEvent;
				
					while(now <= time) {
//						ScheduleFixtime_old.gmModifyTime(now);
						Iterator<Entry<String, AbsScheduleExecutor>> iterator = executors.entrySet().iterator();
						TimeDateUtil.setModifyTime(now);
						while(iterator.hasNext()) {
							Entry<String, AbsScheduleExecutor> next = iterator.next();
							String target = next.getKey();
							try{
								AbsScheduleExecutor executor = next.getValue();
								if(executor == null) continue;
								long interval = executor.getInterval() / 1000;
								if(interval > 1  && now % interval != 0) {
									continue;
								}
								executor.execute(now);
							}catch(Exception e){
								LogTool.error(e, target);
							}
						}
						now ++;
					}
					TimeDateUtil.isModifyTime = false;
					int gapTime = (int)(System.currentTimeMillis() - currentTime)/1000;
					TimeDateUtil.addTime += addtion - gapTime;
					ScheduleUtil.initStartServerTask();
					if(hero!=null) GMSender.sendCmd_98(hero.getId(), GMConst.GM_ACTIVITY, simpleDateFormat.format(new Date(TimeDateUtil.getCurrentTime() * 1000l)),type);
					int hour = (time - nowRecord)/ TimeDateUtil.ONE_HOUR_INT;
					int minute = (time - nowRecord)/ TimeDateUtil.ONE_MINUTE %TimeDateUtil.ONE_MINUTE ;
					int seconds = (time - nowRecord)% TimeDateUtil.ONE_MINUTE;
					ChatManager.getIns().broadCast(ChatConst.BROCAST_SYSTIME, new Object[]{simpleDateFormat.format(new Date(nowRecord * 1000l)),
							timeStr, hour + ":" + minute + ":" + seconds});
					//通知在线玩家服务器时间改变
					for(Hero tempHero : HeroCache.getHeroMap().values()){
						//通知前端当前服务器时间
						if(tempHero!=null && HeroFunction.getIns().isOnline(tempHero.getId())){
							GlobalSender.sendCmd_252(tempHero.getId(), TimeDateUtil.getCurrentTimeInMillis(), TimeDateUtil.serverTimezone.getDisplayName());
						}
					}
				}else {
					if(hero!=null) GMSender.sendCmd_98(hero.getId(), GMConst.GM_ACTIVITY, "无效时间...",type);
					return;
				}
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return;
		}else {//查询时间
			if(hero!=null) {
				if(CrossZone.isCrossServer()) {
					return;
				}
				GMSender.sendCmd_98(hero.getId(), GMConst.GM_ACTIVITY, simpleDateFormat.format(new Date(TimeDateUtil.getCurrentTime() * 1000l)),type);
			}
		}
	}
	
	
	
	public void changeCrossSysTime(Hero hero, int type, String[] param) {
		String timeStr = param[0];
		if(timeStr == null) return;
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(timeStr.length() == 100) {//修改时间
			sendToCross(type, param);
			try {
				Date date = simpleDateFormat.parse(timeStr);
				int time = (int)(date.getTime() /1000);
				int now = TimeDateUtil.getCurrentTime();
				if(time > now){
				
				}else {
					if(hero!=null) GMSender.sendCmd_98(hero.getId(), GMConst.GM_ACTIVITY, "无效时间...",type);
					return;
				}
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return;
		}else {//查询时间
			if(hero!=null) {
				LTC_getCentryTime(hero.getId(),type);
			}
		}
	}
	
	/**
	 * 修改开服时间
	 * @author lobbyer
	 * @date 2017年4月13日
	 */
	public void changeOpenServerTime(Hero hero, int type, String[] param){
		String timeStr = param[0];
		if(timeStr == null) return;
		if(timeStr.length() == 19) {//修改时间
			if(timeStr.length() == 19) {
				int oldTime = GameProperties.serverOpenTime;
				int time=TimeDateUtil.getTimeIntByStr(timeStr);
				GameProperties.serverOpenTime=time;
				if(oldTime != time){
					//开服时间调整，则重置开服活动
					try {
						//KaifuActivityFunction.getIns().resetKaifuTime();
						//修改开服时间时，清除所有活动信息
						//重置开服比拼活动
						//KaiFuBiPinCache.getIns().startServer();
						OpenDaysSystemFunction.getIns().gmResetOpenTimeClear();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
//		if (type==1) {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			GMSender.sendCmd_98(hero.getId(), GMConst.GM_ACTIVITY, simpleDateFormat.format(new Date(GameProperties.serverOpenTime * 1000l)),type);
			
			GlobalSender.sendCmd_258(hero.getId(), GameProperties.serverOpenTime);
//		}
			
			
	}
	
	/**
	 * 同步修改时间到中央服务器
	 * @param type
	 * @param param
	 */
	private static void sendToCross(int type,String[] param){
		try {
			//江湖试炼跨服服务器
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.update_time_type, type);
			crossData.putObject(CrossEnum.update_time_param, param);
			crossData.putObject(CrossBossEnum.firstZoneid, GameProperties.getFirstZoneId());
			NettyWrite.writeXData(Client_1.getIns().getCrossChannel(), CrossConst.GM_UPDATETIME_LTC, crossData);
			NettyWrite.writeXData(Client_2.getIns().getCrossChannel(), CrossConst.GM_UPDATETIME_LTC, crossData);
		} catch (Exception e) {
			LogTool.error(e,"");
		}
	}
	
	/**
	 * 中央服收到修改时间
	 * @author lobbyer
	 * @param channel
	 * @param data
	 * @date 2017年8月14日
	 */
	public void LTC_UpdateTime(Channel channel,final CrossData data){
		int cmd = CrossConst.GM_UPDATETIME_LTC;
		int firstZoneid = (int) data.getObject(CrossBossEnum.firstZoneid, Integer.class);
		int type = (int) data.getObject(CrossEnum.update_time_type, Integer.class);
		String[] param = (String[]) data.getObject(CrossEnum.update_time_param, String[].class);
		LogTool.info("cross systime gm,type:"+type+",param:"+param[0]+",now:"+TimeDateUtil.pringNow(),this);
		if(GameProperties.getFirstZoneId()!=CrossZone.houtai) {
			//通知除上传时间服以外的子服
			for (Channel channelTemp : CrossCache.getChannelToZoneid().keySet()) {
				if( channelTemp == channel || channelTemp.equals(channel))
					continue;
				System.err.println("channelTemp="+channelTemp.remoteAddress().toString());
				NettyWrite.writeXData(channelTemp, CrossConst.GM_UPDATETIME_CTL, data);
			}
		}
		//中央服 修改时间
		OpTaskExecutorService.PublicOrderService.execute(new CrossBaseOpTaskRunnable() {
			
			@Override
			public void run() {
				UpdateTime(null, type, param);
			}
			
			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.CROSS_BASE_OP;
			}
		});
	
	}
	
	public void CRL_getCentryTime(Channel channel,final CrossData data) {
		long hid = (long) data.getObject(CrossEnum.hid, Long.class);
		int  type = (int) data.getObject(CrossEnum.type, Integer.class);
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.time, TimeDateUtil.getCurrentTime());
		crossData.putObject(CrossEnum.hid, hid);
		crossData.putObject(CrossEnum.type, type);
		NettyWrite.writeXData(channel, CrossConst.GM_TONGBUTIME_CTL, crossData);
		
	}
	
	public void LTC_getCentryTime(long hid,int type) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hid);
		crossData.putObject(CrossEnum.type, type);
		NettyWrite.writeXData(Client_2.getIns().getCrossChannel(), CrossConst.GM_TONGBUTIME_LTC, crossData);
	}
	
	public void sendCentryTime(Channel channel,CrossData data) {
		long hid = (long) data.getObject(CrossEnum.hid, Long.class);
		int  time = (int) data.getObject(CrossEnum.time, Integer.class);
		int  type = (int) data.getObject(CrossEnum.type, Integer.class);
		if (time!=TimeDateUtil.getCurrentTime()) {
			for (Hero hero:HeroCache.getHeroMap().values()) {
				if(HeroFunction.getIns().isOnline(hero.getId())) {
					System.err.println("中央服与子服时间不一致： 中央服时间："+TimeDateUtil.printTime(time)+"本地服时间："+TimeDateUtil.printTime(TimeDateUtil.getCurrentTime()));
					GlobalSender.sendCmd_260(hero.getId(), 1, "中央服与子服时间不一致： 中央服时间："+TimeDateUtil.printTime(time)+"本地服时间："+TimeDateUtil.printTime(TimeDateUtil.getCurrentTime()));
				}
			}
		}
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		GMSender.sendCmd_98(hid, GMConst.GM_ACTIVITY, simpleDateFormat.format(new Date(TimeDateUtil.getCurrentTime() * 1000l)),16);
	}
	
	public void CTL_UpdateTime(Channel channel,CrossData data) {
		int type = (int) data.getObject(CrossEnum.update_time_type, Integer.class);
		String[] param = (String[]) data.getObject(CrossEnum.update_time_param, String[].class);
		LogTool.info("cross systime gm,type:"+type+",param:"+param[0]+",now:"+TimeDateUtil.pringNow(),this);
		//中央服 修改时间
		OpTaskExecutorService.PublicOrderService.execute(new CrossBaseOpTaskRunnable() {
			
			@Override
			public void run() {
				UpdateTime(null, type, param);
			}
			
			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.LOCAL_SOLORUN_KEY;
			}
		});
	}
	
	
	public void UpdateTime(Hero hero, int type, String[] param) {
		try {
			String timeStr = param[0];
			if(timeStr == null) return;
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			if(timeStr.length() == 19) {//修改时间
				try {
					Date date = simpleDateFormat.parse(timeStr);
					int time = (int)(date.getTime() /1000);
					int now = TimeDateUtil.getCurrentTime();
					int nowRecord = now;
					if(time > now){
						TimeDateUtil.isModifyTime = true;
						//if(hero!=null) GmSender.sendCmd_98(hero.getId(), GMConst.GM_SYSTIME, "正在修改系统时间...",type);
						int addtion = time - now;
						if(CrossZone.isCrossServer()) {							
							LogTool.info(GameProperties.getFirstZoneId()+"我来测试时间的："+addtion, this);
						}
						//循环之间的事件
						//ScheduleUtil.cancelTask(ScheduleConst.QURATZ);
						ScheduleUtil.cancelAllTask();
						long currentTime = System.currentTimeMillis();
						Map<String, AbsScheduleExecutor> executors = ScheduleUtil.executorEvent;
					
						while(now <= time) {
//							ScheduleFixtime_old.gmModifyTime(now);
							Iterator<Entry<String, AbsScheduleExecutor>> iterator = executors.entrySet().iterator();
							TimeDateUtil.setModifyTime(now);
							while(iterator.hasNext()) {
								Entry<String, AbsScheduleExecutor> next = iterator.next();
								String target = next.getKey();
								try{
									AbsScheduleExecutor executor = next.getValue();
									if(executor == null) continue;
									long interval = executor.getInterval() / 1000;
									if(interval > 1  && now % interval != 0) {
										continue;
									}
									executor.execute(now);
								}catch(Exception e){
									LogTool.error(e, target);
								}
							}
							now ++;
						}
						TimeDateUtil.isModifyTime = false;
						int gapTime = (int)(System.currentTimeMillis() - currentTime)/1000;
						TimeDateUtil.addTime += addtion - gapTime;
						ScheduleUtil.initStartServerTask();
						if(hero!=null) GMSender.sendCmd_98(hero.getId(), GMConst.GM_ACTIVITY, simpleDateFormat.format(new Date(TimeDateUtil.getCurrentTime() * 1000l)),type);
						int hour = (time - nowRecord)/ TimeDateUtil.ONE_HOUR_INT;
						int minute = (time - nowRecord)/ TimeDateUtil.ONE_MINUTE %TimeDateUtil.ONE_MINUTE ;
						int seconds = (time - nowRecord)% TimeDateUtil.ONE_MINUTE;
						ChatManager.getIns().broadCast(ChatConst.BROCAST_SYSTIME, new Object[]{simpleDateFormat.format(new Date(nowRecord * 1000l)),
								timeStr, hour + ":" + minute + ":" + seconds});
						
						//通知在线玩家服务器时间改变
						for(Hero tempHero : HeroCache.getHeroMap().values()){
							//通知前端当前服务器时间
							if(tempHero!=null && HeroFunction.getIns().isOnline(tempHero.getId())){
								GlobalSender.sendCmd_252(tempHero.getId(), TimeDateUtil.getCurrentTimeInMillis(), TimeDateUtil.serverTimezone.getDisplayName());
							}
						}
						System.err.println(TimeDateUtil.pringNow());
						if(CrossZone.isCrossServer()) {
							LogTool.info(GameProperties.getFirstZoneId()+"中央服当前时间::"+TimeDateUtil.pringNow(), this);
						}
					}else {
						if(hero!=null) GMSender.sendCmd_98(hero.getId(), GMConst.GM_ACTIVITY, "无效时间...",type);
						return;
					}
				} catch (ParseException e) {
					e.printStackTrace();
				}
				return;
			}else {//查询时间
				if(hero!=null) 
					GMSender.sendCmd_98(hero.getId(), GMConst.GM_ACTIVITY, simpleDateFormat.format(new Date(TimeDateUtil.getCurrentTime() * 1000l)),type);
			}
		} catch (Exception e) {
			LogTool.error(e, TimeGMFunction.class, "LRCUpdateTime");
		}
		
	}
	
	
	
	
	
	public static void main(String[] args) {
		String time = "2015-09-08 10:10:10";
		System.out.println(time.length());
	}
	
	/**
	 * 修改合服时间
	 */
	public void changeHeFuTime(Hero hero, int type, String[] param){
	}
	
	/**
	 * 关闭合服活动
	 */
	public void closeHeFuActivity(Hero hero, int type, String[] param){
		//关闭
	}
}
