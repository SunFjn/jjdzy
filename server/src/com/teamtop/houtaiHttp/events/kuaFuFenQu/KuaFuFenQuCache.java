package com.teamtop.houtaiHttp.events.kuaFuFenQu;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossPartCache;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.backstage.events.backstage.kuaFuFenQu.KuaFuFenQuDao;
import com.teamtop.system.event.backstage.events.backstage.kuaFuFenQu.KuaFuFenQuInfo;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.log.LogTool;

public class KuaFuFenQuCache extends AbsServerEvent {

	/** 后台中央服跨服分组配置*/
	public static Map<Integer, KuaFuFenQuInfo> kuaFuMap = new HashMap<>();

	/** 后台中央服跨服分组配置平台集合*/
	public static Map<String, Map<Integer, KuaFuFenQuInfo>> pfKuaFuMap = new HashMap<>();

	/** 本游戏服  对应的跨服分组  玩法中央服的编号*/
	public static int centralIndex = 0;
	/** 本游戏服  对应的跨服分组  玩法中央服的域名*/
	public static String centralIp = "";
	/** 本游戏服  对应的跨服分组  玩法中央服的连接端口*/
	public static int centralPort = 0;

	public static Map<Integer, KuaFuFenQuInfo> getKuaFuMap() {
		return kuaFuMap;
	}

	public static void setKuaFuMap(Map<Integer, KuaFuFenQuInfo> kuaFuMap) {
		KuaFuFenQuCache.kuaFuMap = kuaFuMap;
	}

	public static Map<String, Map<Integer, KuaFuFenQuInfo>> getPfKuaFuMap() {
		return pfKuaFuMap;
	}

	public static void setPfKuaFuMap(Map<String, Map<Integer, KuaFuFenQuInfo>> pfKuaFuMap) {
		KuaFuFenQuCache.pfKuaFuMap = pfKuaFuMap;
	}

	/** 获取跨服分组信息
	 * 后台中央
	 * */
	public static KuaFuFenQuInfo getKuaFuFenQuInfo(String pf, int zoneid) {
		Map<Integer, KuaFuFenQuInfo> map = pfKuaFuMap.get(pf);
		int centralIndex = CrossPartCache.getCentralIndex(pf, zoneid);
		KuaFuFenQuInfo kuaFuFenQuInfo = map.get(centralIndex);
		return kuaFuFenQuInfo;
	}

	/** 初始化跨服分区配置数据*/
	public static void initKuafuFenQuMap() throws Exception {
		try {
			List<KuaFuFenQuInfo> allPlatform = KuaFuFenQuDao.getDao().findAllPlatform();
			int size = allPlatform.size();
			LogTool.info("KuaFuFenQuCache size=" + size, KuaFuFenQuCache.class);
			Map<Integer, KuaFuFenQuInfo> kuaFuTempMap = new HashMap<>();
			Map<String, Map<Integer, KuaFuFenQuInfo>> pfKuaFuTempMap = new HashMap<>();
			KuaFuFenQuInfo info = null;
			String pf = "";
			for (int i = 0; i < size; i++) {
				info = allPlatform.get(i);
				kuaFuTempMap.put(info.getCentralIndex(), info);
				pf = info.getPf();
				Map<Integer, KuaFuFenQuInfo> map = pfKuaFuTempMap.get(pf);
				if (map == null) {
					map = new HashMap<>();
					pfKuaFuTempMap.put(pf, map);
				}
				map.put(info.getCentralIndex(), info);
			}
			setKuaFuMap(kuaFuTempMap);
			setPfKuaFuMap(pfKuaFuTempMap);
		} catch (Exception e) {
			LogTool.error(e, KuaFuFenQuCache.class, "KuaFuFenQuCache initKuafuFenQuMap fail");
			throw e;
		}
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			initKuafuFenQuMap();
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
	
	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		super.shutdownServer();
	}

}
