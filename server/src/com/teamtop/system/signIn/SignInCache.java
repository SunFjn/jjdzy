package com.teamtop.system.signIn;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_qiandao_720;
import excel.struct.Struct_qiandao_720;

public class SignInCache extends AbsServerEvent {
	private static Map<Integer, Map<Integer, Struct_qiandao_720>> signInConfig = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_qiandao_720>> getSignInConfig() {
		return signInConfig;
	}

	public static void setSignInConfig(Map<Integer, Map<Integer, Struct_qiandao_720>> signInConfig) {
		SignInCache.signInConfig = signInConfig;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		List<Struct_qiandao_720> sortList = Config_qiandao_720.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_qiandao_720 struct_qiandao_720 = sortList.get(i);
			int qs = struct_qiandao_720.getQs();
			Map<Integer, Struct_qiandao_720> map = signInConfig.get(qs);
			if (map == null) {
				map = new HashMap<>();
				signInConfig.put(qs, map);
			}
			int day = struct_qiandao_720.getNUM() % 1000;
			map.put(day, struct_qiandao_720);
		}
	}

}
