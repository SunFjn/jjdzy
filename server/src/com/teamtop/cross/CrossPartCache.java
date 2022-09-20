package com.teamtop.cross;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.log.LogTool;

import excel.config.Config_kuafu_200;
import excel.struct.Struct_kuafu_200;

public class CrossPartCache extends AbsServerEvent {

	private static Map<Integer, Struct_kuafu_200> allPartMap = new HashMap<>();

	private static Map<String, Map<Integer, Struct_kuafu_200>> pfPartMap = new HashMap<>();

	// public static Map<Integer, Struct_kuafu_200> getPartMap() {
	// return partMap;
	// }
	//
	// public static void setPartMap(Map<Integer, Struct_kuafu_200> partMap) {
	// CrossPartCache.partMap = partMap;
	// }

	public static Map<Integer, Struct_kuafu_200> getPartMap() {
		Map<Integer, Struct_kuafu_200> map = pfPartMap.get(GameProperties.platform);
		return map;
	}

	public static int getCentralIndex(String pf, int zoneid) {
		try {
			Map<Integer, Struct_kuafu_200> map = pfPartMap.get(pf);
			Iterator<Struct_kuafu_200> iterator = map.values().iterator();
			Struct_kuafu_200 struct_kuafu_200 = null;
			for(;iterator.hasNext();) {
				struct_kuafu_200 = iterator.next();
				int[] range = struct_kuafu_200.getBoss()[0];
				if(zoneid>=range[0]&&zoneid<=range[1]) {
					return struct_kuafu_200.getZyf();
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossPartCache.class, "CrossPartCache getCentralIndex");
		}
		return -1;
	}

	@Override
	public void startServer() throws RunServerException {
		List<Struct_kuafu_200> sortList = Config_kuafu_200.getIns().getSortList();
		int size = sortList.size();
		Struct_kuafu_200 struct_kuafu_200 = null;
		for (int i = 0; i < size; i++) {
			struct_kuafu_200 = sortList.get(i);
			allPartMap.put(struct_kuafu_200.getId(), struct_kuafu_200);
			String pf = struct_kuafu_200.getWd();
			Map<Integer, Struct_kuafu_200> map = pfPartMap.get(pf);
			if (map == null) {
				map = new HashMap<>();
				pfPartMap.put(pf, map);
			}
//			LogTool.info("crossPartCache partMap centralIndex="+GameProperties.centralIndex, this);
//			LogTool.info("crossPartCache partMap GameProperties.isCentralServer()="+GameProperties.isCentralServer(), this);
			if(GameProperties.isCentralServer()) {
				if(struct_kuafu_200.getZyf()==GameProperties.centralIndex){					
					map.put(struct_kuafu_200.getId(), struct_kuafu_200);
				}
			}else {
				map.put(struct_kuafu_200.getId(), struct_kuafu_200);
			}
		}
		Map<Integer, Struct_kuafu_200> partMap = getPartMap();
		if (partMap == null) {
			throw new RuntimeException("跨服分组null, pf=" + GameProperties.platform);
		}else {			
			LogTool.info("crossPartCache partMap size="+partMap.size(), this);
		}
	}
	
	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		super.shutdownServer();
	}

	@Override
	public void initExcel() throws RunServerException {

	}

}
