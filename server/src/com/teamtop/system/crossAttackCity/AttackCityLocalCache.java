package com.teamtop.system.crossAttackCity;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.crossAttackCity.model.ZhanBao;
import com.teamtop.util.common.ConcurrentHashSet;

public class AttackCityLocalCache {
	/** 战报缓存(不存库) */
	public static ConcurrentHashMap<Long, List<ZhanBao>> zhanBaoMap = new ConcurrentHashMap<Long, List<ZhanBao>>();
	/** 界面缓存(不存库) */
	public static ConcurrentHashSet<Long> redPointPushZhanBao = new ConcurrentHashSet<Long>();
	/** 战报红点缓存(不存库) */
	public static ConcurrentHashSet<Long> redPoint = new ConcurrentHashSet<Long>();
}
