package com.teamtop.netty.firewall.skyeye;

import io.netty.channel.Channel;

import java.net.SocketAddress;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class SkyEyeCache {

	static Logger logger = LoggerFactory.getLogger(SkyEyeCache.class);
	/**
	 * 白名单ip 不受ip登陆人数限制
	 */
	private static Set<String> whiteIpSet = UC.reg("whiteIpSet", new HashSet<String>());
	static{
		whiteIpSet.add("121.8.243.66"); //公司ip
	}
	/**
	 * 加速角色<key:openid,value:违法时间>
	 */
	private static Map<String, Integer> badSpeedMap = UC.reg("badSpeedMap",new ConcurrentHashMap<String, Integer>(500));
	/**
	 * 违法ip <key:ip,value:BadIp对象>
	 */
	private static Map<String, BadIp> badIpMap = UC.reg("badIpMap", new ConcurrentHashMap<String, BadIp>(500));
	/**
	 * 在线ip <key:ip,value:相同登陆人数>
	 */
	private static Map<String, ConcurrentLinkedQueue<Channel>> onlineIpMap = UC.reg("onlineIpMap", new ConcurrentHashMap<String,ConcurrentLinkedQueue<Channel>>(4000));
	/**
	 * channel连接上后，如果长期没有进入场景，就剔除
	 */
	private static ConcurrentHashMap<Channel,Integer> channelConnMap = UC.reg("channelConnMap", new ConcurrentHashMap<Channel,Integer>());
	/**
	 * 违法角色 <key:openid,value:BadRole对象>
	 */
	private static ConcurrentHashMap<String, BadHero> badOpenIdMap = UC.reg("skyEyeCacheBadOpenIdMap", new ConcurrentHashMap<String, BadHero>(500));
	/**
	 * cg协议记录 key1：hid，value：Object[]
	 */
	private static ConcurrentHashMap<Integer,ConcurrentLinkedQueue<CGRec>> cgMap =UC.reg("cgMap",  new ConcurrentHashMap<Integer,ConcurrentLinkedQueue<CGRec>>(1000));
	private static ScheduledExecutorService channelConnExec = ScheduleUtil.makeThread("channelConnThread");
	/**
	 * 增加cg记录
	 * @param zoneid
	 * @param rec
	 */
	public static void addCg(int zoneid,CGRec rec){
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<CGRec>> cgMap = getCgMap();
		ConcurrentLinkedQueue<CGRec> queue = cgMap.get(zoneid);
		if(queue==null){
			queue = new ConcurrentLinkedQueue<CGRec>();
			cgMap.put(zoneid, queue);
		}
		queue.add(rec);
	}
	public static ConcurrentHashMap<Integer,ConcurrentLinkedQueue<CGRec>> getCgMap(){
		return cgMap;
	}
	public static ConcurrentHashMap<Channel,Integer> getChannelConnMap(){
		return channelConnMap;
	}
	public static ConcurrentHashMap<String, BadHero> getBadOpenIdMap(){
		return badOpenIdMap;
	}
	/**
	 * channel建立连接后记录
	 * @param channel
	 */
	public static void addChannelConn(Channel channel){
		getChannelConnMap().put(channel,TimeDateUtil.getCurrentTime()+SkyEyeConst.CHANNEL_CONNECT_TIMEOUT);
	}
	/**
	 * channel进入场景后移除
	 * @param channel
	 */
	public static void removeChannelConn(Channel channel){
		getChannelConnMap().remove(channel);
	}
	public static void startSchedule() {
		//检查channel连接后没有登陆
		channelConnExec.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				int now = TimeDateUtil.getCurrentTime();
				Iterator<Entry<Channel, Integer>> it = getChannelConnMap().entrySet().iterator();
				while(it.hasNext()){
					try {
						Entry<Channel, Integer> next = it.next();
						if(now > next.getValue()){
							Channel channel = next.getKey();
							TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
							int zoneid = 0;
							String openid = null;
							long hid = 0;
							if(tempData!=null){
								zoneid = tempData.getZoneid();
								openid = tempData.getOpenid();
								Hero hero = tempData.getHero();
								if(hero!=null){
									hid = hero.getId();
								}
							}
							if(zoneid==0){
								zoneid = GameProperties.getFirstZoneId();
							}
							logger.warn("channel connect too long,channel:"+channel.toString()+",connect time:"+TimeDateUtil.printOnlyTime(next.getValue())+"openid:"+openid+"zoneid:"+zoneid);
//							FlowSkyEyeEvent.getIns().addProtocolWatch(hid, zoneid,openid, SkyEyeConst.REASON_CHANNEL);
							channel.close();
							it.remove();
						}
					} catch (Exception e) {
						LogTool.error(e,this);
						it.remove();
					}
				}
			}
		}, 0, TimeDateUtil.ONE_MINUTE, TimeUnit.SECONDS);
		//检查玩家没有同步心跳包
		channelConnExec.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				if(!SkyEyeFunction.watch) return;
				int now = TimeDateUtil.getCurrentTime();
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				for(Hero hero:heroMap.values()){
					if(hero.isOnline()){
						int lastHeartBeatTime = hero.getTempVariables().getLastHeartBeatTime();
						if(hero.getTempVariables().isLoginSuccess() && lastHeartBeatTime>0 && now - lastHeartBeatTime > SkyEyeConst.HEART_BEAT_TIMEOUT){
							LogTool.warn(hero.getId()+ hero.getNameZoneid()+ "hero heartbeat check false,last time:"+TimeDateUtil.printOnlyTime(lastHeartBeatTime),SkyEyeCache.class);
//							FlowSkyEyeEvent.getIns().addProtocolWatch(hero.getId(), hero.getZoneid(),hero.getOpenid(), SkyEyeConst.REASON_HEARTBEAT);
							hero.getChannel().close();
						}
					}
				}
			}
		}, 0, TimeDateUtil.ONE_MINUTE, TimeUnit.SECONDS);
	}
	/**
	 * 加入违法ip
	 * @param channel
	 */
	public static void addBadIp(Channel channel,String reason){
		try {
			TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
			final Long hid = tempData.getHero().getId();
			boolean addIp = false;
			String openid = null;
			StringBuilder sb = new StringBuilder();
			sb.append("rid:").append(hid);
			BadHero badRole = null;
			if(hid!=null){
				Hero hero = tempData.getHero();
				if(hero!=null){
					openid = hero.getOpenid();
					badRole = getBadOpenIdMap().get(openid);
					if(badRole==null){
						badRole = new BadHero();
						badRole.setRid(hid);
						badRole.setOpenid(hero.getOpenid());
						badRole.setName(hero.getNameZoneid());
						getBadOpenIdMap().put(hero.getOpenid(), badRole);
					}
					badRole.setNowTime();
					badRole.addNum(reason);
					sb.append(",name:").append(hero.getNameZoneid()).append(",badRoleNum:").append(badRole.getNum());
					//if role num > 5,add ip
					if(badRole.getNum() > 5){
						addIp = true;
					}
				}
			}
			String ip = getIp(channel);
			if(ip==null){
				logger.warn(sb.append(",time:").append(TimeDateUtil.printOnlyTime(TimeDateUtil.getCurrentTime())).append(",ip:").append(ip).toString());
				return;
			}
			synchronized (ip) {
				BadIp badIp = badIpMap.get(ip);
				if(badIp==null){
					//new and add it
					badIp = new BadIp();
					badIp.setIp(ip);
					badIpMap.put(ip, badIp);
				}
				badIp.addBadOpenId(badRole);
				if(addIp){
					badIp.setNowTime();
					badIp.addNum();
				}
				sb.append(",badIPNum:").append(badIp.getNum());
			}
			logger.warn(sb.append(",time:").append(TimeDateUtil.printOnlyTime(TimeDateUtil.getCurrentTime())).append(",ip:").append(ip).toString());
		} catch (Exception e) {
			LogTool.error(e,SkyEyeCache.class);
		}
	}
	/**
	 * 增加违法角色
	 * @param openid
	 */
	public static void addBadRole(String openid,String reason){
		try {
			BadHero badHero = getBadOpenIdMap().get(openid);
			if(badHero==null){
				badHero = new BadHero();
				getBadOpenIdMap().put(openid,badHero);
			}
			badHero.setTime(TimeDateUtil.getCurrentTime());
			badHero.addNum(reason);
		} catch (Exception e) {
			LogTool.error(e,SkyEyeCache.class);
		}
	}
	/**
	 * 增加违法ip,同时会剔除所有从这个ip上线的角色
	 * @param ip
	 */
	public static void addBadIp(String ip){
		if(ip==null){
			return;
		}
		StringBuilder sb = new StringBuilder();
		logger.warn(sb.append(",time:").append(TimeDateUtil.printOnlyTime(TimeDateUtil.getCurrentTime())).append(",ip:").append(ip).toString());
		synchronized (ip) {
			BadIp badIp = badIpMap.get(ip);
			if(badIp==null){
				//new and add it
				badIp = new BadIp();
				badIp.setIp(ip);
				badIpMap.put(ip, badIp);
			}
			badIp.setNowTime();
			badIp.addNum();
			sb.append(",badIPNum:").append(badIp.getNum());
			
			ConcurrentLinkedQueue<Channel> set = onlineIpMap.get(ip);
			if(set!=null){
				for(Channel channel:set){
					TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
					if(tempData!=null){
						//close channel in this ip
						tempData.getChannel().close();
					}
				}
			}
		}
		logger.warn(sb.append(",time:").append(TimeDateUtil.printOnlyTime(TimeDateUtil.getCurrentTime())).append(",ip:").append(ip).toString());
	}
	
	/**
	 * 移除违法角色,若此角色在线,会移除对应的违法ip
	 * @param openid
	 */
	public static void removeBadRole(String openid,int zoneid){
		getBadOpenIdMap().remove(openid);
	}
	
	/**
	 * 移除违法ip,同时会移除这个ip所有违法openid
	 * @param ip
	 */
	public static void removeBadIp(String ip){
		if(ip==null) return;
		BadIp badIp = badIpMap.remove(ip);
		if(badIp!=null){
			Set<BadHero> badOpendIdSet = badIp.getBadOpendIdSet();
			for(BadHero badRole:badOpendIdSet){
				getBadOpenIdMap().remove(badRole);
			}
		}
	}
	
	/**
	 * 是否违法ip
	 * @param ip
	 * @return
	 */
	public static boolean isBadIp(String ip){
		try {
			BadIp badIp = badIpMap.get(ip);
			if(badIp==null) return false;
			Integer num = badIp.getNum();
			if(num==0) return false;//没有次数的可以正常登陆
			if(TimeDateUtil.getCurrentTime() - badIp.getTime() >  num * SkyEyeConst.BAD_IP_TIMEOUT){
				if(num>10){
					//give him a chance
					badIpMap.remove(ip);
					System.err.println("give him a chance:");
				}
				return false;
			}else{
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e,SkyEyeCache.class);
			return false;
		}
	}
	/**
	 * 在线ip是否超过最大值
	 * @param ip
	 * @return 若在线ip没有超过最大值或则在白名单 返回false，否则返回true
	 */
	public static boolean onlineIpOverMax(String ip){
		if(!GameProperties.ipConnLimit) return false;
		try {
			ConcurrentLinkedQueue<Channel> set = onlineIpMap.get(ip);
			if(!whiteIpSet.contains(ip) && set!=null && set.size()>=SkyEyeConst.SAME_IP_MAX_ROLE){
				return true;
			}
			return false;
		} catch (Exception e) {
			LogTool.error(e,SkyEyeCache.class);
			return false;
		}
	}
	
	/**
	 * 此ip能否连接
	 * @param ip
	 * @return 若ip连接数已超过最大值 或者 ip违法且不在白名单,不能连接 返回false,其他返回true
	 */
	public static boolean ipCanConnect(String ip){
		return !isBadIp(ip) && !onlineIpOverMax(ip);
	}
	/**
	 * 角色能否登陆
	 * @param channel
	 * @param rid
	 * @return 没有被记录违规或超过违规时间的返回true
	 */
	public static boolean canLogin(String openid){
		try {
			BadHero badRole = getBadOpenIdMap().get(openid);
			if(badRole!=null){
				if(TimeDateUtil.getCurrentTime() - badRole.getTime() > badRole.getNum() * SkyEyeConst.BAD_IP_TIMEOUT){
					return true;
				}else{
					return false;
				}
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e,SkyEyeCache.class);
			return true;
		}
	}
	
	/**
	 * 往在线ip加入连接
	 * @param channel
	 */
	public static void addToOnlineIp(Channel channel){
		try {
			String ip = getIp(channel);
			if(ip==null) return;
			ConcurrentLinkedQueue<Channel> set = onlineIpMap.get(ip);
			if(set==null){
				set = new ConcurrentLinkedQueue<Channel>();
				onlineIpMap.put(ip, set);
			}
			set.add(channel);
		} catch (Exception e) {
			LogTool.error(e,SkyEyeCache.class);
		}
	}
	
	/**
	 * 返回某个ip的登录角色信息
	 * @param ip
	 * @return
	 */
	public static ConcurrentLinkedQueue<Channel> getIpNum(String ip){
		return onlineIpMap.get(ip);
	}
	
	public static Map<String, ConcurrentLinkedQueue<Channel>> getOnlineIp(){
		return onlineIpMap;
	}
	/**
	 * 从在线ip中移除连接
	 * @param channel
	 */
	public static void removeFromOnlineIp(Channel channel){
		try {
			String ip = getIp(channel);
			ConcurrentLinkedQueue<Channel> set = onlineIpMap.get(ip);
			if(set==null) return;
			set.remove(channel);
		} catch (Exception e) {
			LogTool.error(e,SkyEyeCache.class);
		}
		
	}
	/**
	 * 增加白名单
	 * @param ip
	 */
	public static void addWhiteIp(String ip){
		if(ip==null) return;
		whiteIpSet.add(ip);
	}
	/**
	 * 移除白名单
	 * @param ip
	 */
	public static void removeWhiteIp(String ip){
		if(ip==null) return;
		whiteIpSet.remove(ip);
	}
	
	public static Set<String> getWhiteIpSet(){
		return whiteIpSet;
	}
	/**
	 * 获取ip
	 * @param channel 连接
	 * @return 连接对应的ip
	 */
	public static String getIp(Channel channel){
		try {
			SocketAddress remoteAddress = channel.remoteAddress();
			String[] ipArr = remoteAddress.toString().split("\\:");
			return ipArr[0].substring(1, ipArr[0].length());
		} catch (Exception e) {
			LogTool.error(e,SkyEyeCache.class);
			return null;
		}
	}
	public static Map<String, BadIp> getBadIpMap() {
		return badIpMap;
	}
	
	public static Map<String, BadHero> getBadRoleMap(){
		return getBadOpenIdMap();
	}
	/**
	 * 移除所有违法ip和角色
	 */
	public static void removeAllBad(){
		badIpMap.clear();
		getBadOpenIdMap().clear();
	}
	
	public static void addBadSpeed(String openid){
		badSpeedMap.put(openid, TimeDateUtil.getCurrentTime());
	}
	/**
	 * 登陆验证加速 超过5分钟可以登陆
	 * @param openid
	 * @return
	 */
	public static boolean canGoOnBadSpeed(String openid){
		Integer time = badSpeedMap.get(openid);
		if(time==null || TimeDateUtil.getCurrentTime()-time>SkyEyeConst.BAD_SPEED_TIMEOUT){
			badSpeedMap.remove(openid);
			return true;
		}
		return false;
	}
}
