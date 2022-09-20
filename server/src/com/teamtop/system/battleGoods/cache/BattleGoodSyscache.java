package com.teamtop.system.battleGoods.cache;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class BattleGoodSyscache {
	
	/**3,6开活动 */
	public static Set<Integer> openDays = new HashSet<>();
	/* 活动缓存数据 */
	static {
		openDays.add(3);
		openDays.add(6);
	}
	
	/** 活动状态 0未开启 1准备 2开始  */ 
	public static int State = 0;
	/**
	 * 记录活动已经开启 秒 
	 */
	public static int timeCd=0;
	/**
	 * 刷新npc时间
	 */
	public static int reshNpcCd=0;
	/**
	 * 首服区号-房间号
	 */
	public static ConcurrentHashMap<Integer,Integer> fristzoneidToRoomId=new ConcurrentHashMap<Integer,Integer>();
	/**
	 * 房间序号
	 */
	public static AtomicInteger roomIdCreator = new AtomicInteger(0);
	/**
	 * 各个跨服分区的各个房间情况 活动情况
	 * */
	public static ConcurrentHashMap<Integer,BattleGoodsCrossPartCaChe> BattleGoodsCrossPartCaChes=new ConcurrentHashMap<Integer,BattleGoodsCrossPartCaChe>();
	
	public static int getState() {
		return State;
	}
	public static void setState(int state) {
		State = state;
	}
	public static Set<Integer> getOpenDays() {
		return openDays;
	}
	public static void setOpenDays(Set<Integer> openDays) {
		BattleGoodSyscache.openDays = openDays;
	}
	public static AtomicInteger getRoomIdCreator() {
		return roomIdCreator;
	}
	public static void setRoomIdCreator(AtomicInteger roomIdCreator) {
		BattleGoodSyscache.roomIdCreator = roomIdCreator;
	}
	public static ConcurrentHashMap<Integer, BattleGoodsCrossPartCaChe> getBattleGoodsCrossPartCaChes() {
		return BattleGoodsCrossPartCaChes;
	}
	public static void setBattleGoodsCrossPartCaChes(
			ConcurrentHashMap<Integer, BattleGoodsCrossPartCaChe> battleGoodsCrossPartCaChes) {
		BattleGoodsCrossPartCaChes = battleGoodsCrossPartCaChes;
	}
	
	public static ConcurrentHashMap<Integer, Integer> getFristzoneidToRoomId() {
		return fristzoneidToRoomId;
	}
	public static void setFristzoneidToRoomId(ConcurrentHashMap<Integer, Integer> fristzoneidToRoomId) {
		BattleGoodSyscache.fristzoneidToRoomId = fristzoneidToRoomId;
	}
	public static int getTimeCd() {
		return timeCd;
	}
	public static void setTimeCd(int timeCd) {
		BattleGoodSyscache.timeCd = timeCd;
	}
	public static int getReshNpcCd() {
		return reshNpcCd;
	}
	public static void setReshNpcCd(int reshNpcCd) {
		BattleGoodSyscache.reshNpcCd = reshNpcCd;
	}
	
	
	

}
