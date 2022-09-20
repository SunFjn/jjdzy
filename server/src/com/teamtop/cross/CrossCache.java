package com.teamtop.cross;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.common.ConcurrentHashSet;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_kuafu_200;
import io.netty.channel.Channel;

public class CrossCache extends AbsServerEvent{
	private static Logger logger = LoggerFactory.getLogger(CrossCache.class);

	private static ConcurrentHashMap<Integer, ConcurrentHashMap<Channel, List<Integer>>> pchToZoneMap = UC
			.reg("pchToZoneMap", new ConcurrentHashMap<Integer, ConcurrentHashMap<Channel, List<Integer>>>());// channel关联zoneid集合

	private static ConcurrentHashMap<Channel, List<Integer>> chToZoneMap = UC.reg("chToZoneMap",
			new ConcurrentHashMap<Channel, List<Integer>>());// channel关联zoneid集合

	private static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Channel>> pZoneToChMap = UC.reg("pZoneToChMap",
			new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Channel>>());// zoneid关联channel

	private static ConcurrentHashMap<Integer, Channel> zoneToChMap = UC.reg("zoneToChMap", new ConcurrentHashMap<Integer, Channel>());// zoneid关联channel
	private static ConcurrentHashMap<Integer, ConcurrentHashMap<Long, FightChange>> figheChangeMap = UC
			.reg("figheChangeMap", new ConcurrentHashMap<Integer, ConcurrentHashMap<Long, FightChange>>());// 战力变化

	private static ConcurrentHashSet<Integer> mainServerSet = new ConcurrentHashSet<>();

	private static ArrayList<RoomMatch> roomMatchExcel = UC.reg("roomMatchExcel", new ArrayList<RoomMatch>());//群雄逐鹿和帮战分配房间（制定版本）

	private static int zidMax = 0;//连接所有子服后，这里记录最大的ZID
	
	public static ArrayList<RoomMatch> getRoomMatchExcel(){
		return roomMatchExcel;
	}
	
	
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Long, FightChange>> getFightChange() {
		return figheChangeMap;
	}
	/**
	 * 战力变化通知中央服
	 * @param hero
	 */
	public static void addFightChange(Hero hero,Map<Object, Object> petDataMap,Map<Object, Object> genMap){
		try {
			if(hero.getCrossChannel()==null) return;
			int partId = 0;
			ConcurrentHashMap<Long, FightChange> map = getFightChange().get(partId);
			if (map == null) {
				map = new ConcurrentHashMap<>();
				getFightChange().put(partId, map);
			}
			FightChange fightChange = map.get(hero.getId());
			if(fightChange==null){
				fightChange = new FightChange();
				map.put(hero.getId(), fightChange);
			}
			if(hero!=null){
				fightChange.setHeroCount(fightChange.getHeroCount()+1);
			}
			if(petDataMap!=null){ 
				fightChange.setPetCount(fightChange.getPetCount()+1);
			}
			if(genMap!=null){
				Map<Integer, Integer> genCountMap = fightChange.getGenCountMap();
				if(genCountMap==null){
					genCountMap = new HashMap<Integer, Integer>();
					fightChange.setGenCountMap(genCountMap);
				}
				Iterator<Object> it = genMap.keySet().iterator();
				while(it.hasNext()){
					Integer gid = (Integer) it.next();
					Integer count = genCountMap.get(gid);
					if(count==null){
						count = 0;
					}
					count++;
					genCountMap.put(gid, count);
				}
			}
		} catch (Exception e) {
			LogTool.error(e,CrossCache.class,hero.getId()+" addFightChange err");
		}
	}

	
	/**
	 * 获取跨服分区id
	 * @param zoneid
	 * @return
	 */
	public static int getPartId(int zoneid) {
		Iterator<Struct_kuafu_200> iterator = CrossPartCache.getPartMap().values().iterator();
		Struct_kuafu_200 kuafu_200 = null;
		for (; iterator.hasNext();) {
			kuafu_200 = iterator.next();
			int[][] boss = kuafu_200.getBoss();
			if (zoneid >= boss[0][0] && zoneid <= boss[0][1]) {
				return kuafu_200.getId();
			}
		}
		return 0;
	}

	/**
	 * 获取跨服分区id
	 * 
	 * @param zoneid
	 * @return
	 */
	public static int getlocalPartId() {
		int zoneid = GameProperties.getFirstZoneId();
		Iterator<Struct_kuafu_200> iterator = CrossPartCache.getPartMap().values().iterator();
		Struct_kuafu_200 kuafu_200 = null;
		for (; iterator.hasNext();) {
			kuafu_200 = iterator.next();
			int[][] boss = kuafu_200.getBoss();
			if (zoneid >= boss[0][0] && zoneid <= boss[0][1]) {
				return kuafu_200.getId();
			}
		}
		return 0;
	}

	/**
	 * 获取跨服分区id
	 * 
	 * @param zoneid
	 * @return
	 */
	public static int getPartId(Channel channel) {
		List<Integer> list = chToZoneMap.get(channel);
		int zoneid = list.get(0);
		int partId = getPartId(zoneid);
		return partId;
	}

	/**
	 * 跨服分区集合
	 * 
	 * @return
	 */
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Channel>> getZoneidToChannelMap() {
		return pZoneToChMap;
	}

	/**
	 * 跨服分区集合
	 * 
	 * @return
	 */
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Channel, List<Integer>>> getPchToZoneMap() {
		return pchToZoneMap;
	}

	/**
	 * 根据跨服分区id获取所有的zoneid映射channel
	 * 
	 * @return
	 */
	public static ConcurrentHashMap<Integer, Channel> getZoneidToChannelByPartId(int partId) {
		return pZoneToChMap.get(partId);
	}
	
	/**
	 * 根据zoneId获取所属跨服分区所有的zoneid映射channel
	 * 
	 * @return
	 */
	public static ConcurrentHashMap<Integer, Channel> getZoneidToChannelByZoneid(int zoneid) {
		int partId = getPartId(zoneid);
		return pZoneToChMap.get(partId);
	}

	/**
	 * 获取所有的zoneid映射channel
	 * 注意:包含合服的zoneid（如：1区和2区已经合服，此处包含1和2）
	 * @return
	 */
	public static ConcurrentHashMap<Integer, Channel> getZoneidToChannel() {
		return zoneToChMap;
	}

	/**
	 * 获取所有的channel映射zoneid
	 * 
	 * @return
	 */
	public static ConcurrentHashMap<Channel, List<Integer>> getChannelToZoneidByPartId(int partId) {
		return pchToZoneMap.get(partId);
	}

	/**
	 * 获取所有的channel映射zoneid
	 * 
	 * @return
	 */
	public static ConcurrentHashMap<Channel, List<Integer>> getChannelToZoneidByZoneid(int zoneid) {
		int partId = getPartId(zoneid);
		return pchToZoneMap.get(partId);
	}

	public static void setToPchToZoneMap(int partId, ConcurrentHashMap<Channel, List<Integer>> map) {
		pchToZoneMap.put(partId, map);
	}

	/**
	 * 获取所有的channel映射zoneid
	 * 
	 * @return
	 */
	public static ConcurrentHashMap<Channel, List<Integer>> getChannelToZoneid() {
		return chToZoneMap;
	}

	/**
	 * 获取所有的channel映射zoneid
	 * 
	 * @return
	 */
	public static ConcurrentHashMap<Channel, List<Integer>> getChannelToZoneid(Channel channel) {
		List<Integer> list = chToZoneMap.get(channel);
		Integer zoneid = list.get(0);
		int partId = getPartId(zoneid);
		ConcurrentHashMap<Channel, List<Integer>> map = pchToZoneMap.get(partId);
		return map;
	}

	/**
	 * 根据zoneid获取channel
	 * @param zoneid
	 * @return
	 */
	public static Channel getChannel(int zoneid){
		return getZoneidToChannel().get(zoneid);
	}
	/**
	 * 根据hid获取子服channel
	 * @param hid
	 * @return
	 */
	public static Channel getLocalChannel(long hid){
		Channel channel = getZoneidToChannel().get(CommonUtil.getZoneIdById(hid));
		return channel;
	}
	/**
	 * 根据channel获取zoneid
	 * @param channel
	 * @return
	 */
	public static List<Integer> getZoneidListByChannel(Channel channel){
		return getChannelToZoneid().get(channel);
	}
	public static String getZoneidStrByChannel(Channel channel, String part){
		List<Integer> list = getChannelToZoneid().get(channel);
		StringBuilder zidStr = new StringBuilder(); 
		for( int zid:list){
			if(zidStr.length()==0){
				zidStr.append(zid);
			}else{
				zidStr.append(part).append(zid);
			}
		}
		return zidStr.toString();
	}
	/**
	 * 获取区号对于的链接集合
	 * @author lobbyer
	 * @param zoneids
	 * @return
	 * @date 2016年9月24日
	 */
	public static List<Channel> getZoneidsChannel(List<Integer> zoneids) {
		List<Channel> list = new ArrayList<Channel>();
		for(int zoneid:zoneids) {
			Channel channel = CrossCache.getChannel(zoneid);
			if(!list.contains(channel)) list.add(channel);
		}
		return list;
	}
	
	public static void bindChannelZoneid(Channel channel, Integer zoneid) {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = getChannelToZoneid();
		List<Integer> zoneidList = channelToZoneid.get(channel);
		if(zoneidList==null){
			zoneidList = new ArrayList<Integer>();
			channelToZoneid.put(channel, zoneidList);
		}
		zoneidList.add(zoneid);
		int partId = getPartId(zoneid);
		ConcurrentHashMap<Channel, List<Integer>> pchToZoneMap = getChannelToZoneidByPartId(partId);
		if (pchToZoneMap == null) {
			pchToZoneMap = new ConcurrentHashMap<>();
			setToPchToZoneMap(partId, pchToZoneMap);
		}
		List<Integer> list = pchToZoneMap.get(channel);
		if (list == null) {
			list = new ArrayList<>();
			pchToZoneMap.put(channel, list);
		}
		list.add(zoneid);
		ConcurrentHashMap<Integer, Channel> pZoneToChMap = getZoneidToChannelByPartId(partId);
		if (pZoneToChMap == null) {
			pZoneToChMap = new ConcurrentHashMap<>();
			getZoneidToChannelMap().put(partId, pZoneToChMap);
		}
		pZoneToChMap.put(zoneid, channel);
		ConcurrentHashMap<Integer, Channel> zoneidToChannel = getZoneidToChannel();
		Channel oldChannel = zoneidToChannel.get(zoneid);
		if(oldChannel!=null){
			logger.info("bind zoneid and channel,found zoneid bind other channel:"+channel.remoteAddress()+", zoneid="+zoneid);
		}
		zoneidToChannel.put(zoneid, channel);
		InetSocketAddress address = (InetSocketAddress) channel.remoteAddress();
		address.getHostString();
		logger.info("与子服【"+zoneid+"】服连接成功。CrossCache.bindChannelZoneid.bind zoneid and channel,remote address:"+channel.remoteAddress()+" zoneid:"+zoneid+" id:"+address.getHostString());
//		System.out.println("与子服【"+zoneid+"】服连接成功。CrossCache.bindChannelZoneid.bind zoneid and channel,remote address:"+channel.remoteAddress()+",zoneid:"+zoneid);
//		System.err.println("HHH :: "+address.getHostString());
		if(zoneid>zidMax)
			zidMax = zoneid;
	}
	
	public static ConcurrentHashSet<Integer> getMainServerSet() {
		return mainServerSet;
	}

	public static void setMainServerSet(ConcurrentHashSet<Integer> mainServerSet) {
		CrossCache.mainServerSet = mainServerSet;
	}

	@Override
	public void startServer() throws RunServerException {
		//从数据库读取
		/*ArrayList<RoomMatch> roomMatchExcel = getRoomMatchExcel();
		List<RoomMatch> all = RoomMatchDao.getAll();
		if(all==null || all.size()==0){
			//init 没有就初始化一个默认的分配
			int num = 100;
			int zoneid = 0;
			int jg = 3;
			for(int i=1;i<=num;i++){
				RoomMatch roomMatch = new RoomMatch();
				roomMatch.setRoom(i);
				List<Integer> zoneids = new ArrayList<Integer>();
				for(int j=1;j<=jg;j++){
					zoneids.add(j+jg*zoneid);
				}
				zoneid++;
				roomMatch.setZoneids(zoneids);
				roomMatchExcel.add(roomMatch);
			}
		}else{
			roomMatchExcel.addAll(all);
		}
		logger.info("all:"+(all==null?0:all.size())+",roomMatchExcel:"+roomMatchExcel.size());*/
	}


	public static int getZidMax() {
		return zidMax;
	}
}
