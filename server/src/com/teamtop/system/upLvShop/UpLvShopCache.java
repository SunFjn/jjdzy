package com.teamtop.system.upLvShop;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_shengjiestore_301;
import excel.struct.Struct_shengjiestore_301;

public class UpLvShopCache extends AbsServerEvent {
	/** key:天数,value:配置表数据 **/
	private static Map<Integer, List<Struct_shengjiestore_301>> configMap = UC.reg("UpLvShopCacheConfigMap",
			new HashMap<>());

	public static Map<Integer, List<Struct_shengjiestore_301>> getConfigMap() {
		return configMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		configMap.clear();
		List<Struct_shengjiestore_301> sortList = Config_shengjiestore_301.getIns().getSortList();
		for (Struct_shengjiestore_301 struct_shengjiestore_301 : sortList) {
			List<Struct_shengjiestore_301> list = configMap.get(struct_shengjiestore_301.getDay());
			if (list == null) {
				list = new ArrayList<>();
				configMap.put(struct_shengjiestore_301.getDay(), list);
			}
			list.add(struct_shengjiestore_301);
		}
	}

}
