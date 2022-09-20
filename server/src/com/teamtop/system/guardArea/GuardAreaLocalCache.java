package com.teamtop.system.guardArea;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.guardArea.model.ZhanBao;
import com.teamtop.util.common.ConcurrentHashSet;

public class GuardAreaLocalCache {
	/** 战报缓存(不存库) */
	public static ConcurrentHashMap<Long, List<ZhanBao>> zhanBaoMap = new ConcurrentHashMap<Long, List<ZhanBao>>();
	/** 战报红点缓存(不存库) */
	public static ConcurrentHashSet<Long> redPointPushZhanBao = new ConcurrentHashSet<Long>();
	/** 掠夺缓存(不存库) */
	public static ConcurrentHashMap<Long, List<Integer>> plunderMap = new ConcurrentHashMap<Long, List<Integer>>();
}
