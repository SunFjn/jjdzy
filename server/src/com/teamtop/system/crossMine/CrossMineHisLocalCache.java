package com.teamtop.system.crossMine;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.crossMine.model.CrossMineZhanBao;
import com.teamtop.util.common.ConcurrentHashSet;

public class CrossMineHisLocalCache {
	/** 战报缓存(不存库) */
	public static ConcurrentHashMap<Long, CrossMineZhanBao> CrossMineZhanBao = new ConcurrentHashMap<Long, CrossMineZhanBao>();
	/** 矿字弹框缓存(不存库) */
	public static ConcurrentHashSet<Long> LoginPushZhanBao = new ConcurrentHashSet<Long>();
	/** 战报红点缓存(不存库) */
	public static ConcurrentHashSet<Long> redPointPushZhanBao = new ConcurrentHashSet<Long>();

}
