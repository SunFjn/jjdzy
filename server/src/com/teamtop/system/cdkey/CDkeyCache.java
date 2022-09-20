package com.teamtop.system.cdkey;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.cdkey.model.CDkeyData;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_jhm_721;
import excel.struct.Struct_jhm_721;

public class CDkeyCache extends AbsServerEvent {
	/** 激活码缓存 key为cdkey **/
	private static Map<String, CDkeyData> cdkeyCacheMap = UC.reg("cdkeyCacheMap",
			new ConcurrentHashMap<String, CDkeyData>());

	private static Map<Integer, String[]> configCdkeyMap = new HashMap<>();

	public static Map<String, CDkeyData> getCdkeyCacheMap() {
		return cdkeyCacheMap;
	}

	public static Map<Integer, String[]> getConfigCdkeyMap() {
		return configCdkeyMap;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			int houtaiZoneid = CrossZone.houtai;
			List<CDkeyData> findAllCDkeyData = CDkeyDao.getIns().findAllCDkeyData(houtaiZoneid);
			for (CDkeyData cdkeyData : findAllCDkeyData) {
				cdkeyCacheMap.put(cdkeyData.getCdkey(), cdkeyData);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		configCdkeyMap.clear();
		List<Struct_jhm_721> sortList = Config_jhm_721.getIns().getSortList();
		for (Struct_jhm_721 struct_jhm_721 : sortList) {
			String qudao = struct_jhm_721.getQudao();
			String[] split = qudao.split(",");
			configCdkeyMap.put(struct_jhm_721.getType(), split);
		}
	}

}
