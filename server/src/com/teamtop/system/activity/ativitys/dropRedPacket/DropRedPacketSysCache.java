package com.teamtop.system.activity.ativitys.dropRedPacket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.dropRedPacket.cross.CrossDropRedPacketIO;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_tjhb_296;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_tjhb_296;

public class DropRedPacketSysCache extends AbsServerEvent {
	/**
	 * 天降红包配置 key:type
	 **/
	private static Map<Integer, List<Struct_tjhb_296>> configMap = new HashMap<>();

	/**
	 * 系统红包配置key:id value:当日时间戳
	 **/
	private static TreeMap<Integer, Integer> sysConfigMap = new TreeMap<>();

	/**
	 * 系统红包Id
	 */
	private static int sysRedPacketId = 0;

	/**
	 * 红包列表,最大1000
	 */
	private static ConcurrentLinkedQueue<DropRedPacketModel> redpacketQueue = new ConcurrentLinkedQueue<>();
	/**
	 * 红包列表(没次数),最大50
	 */
	private static ConcurrentLinkedQueue<DropRedPacketModel> redpacketNotTimesQueue = new ConcurrentLinkedQueue<>();

	public static Map<Integer, List<Struct_tjhb_296>> getConfigMap() {
		return configMap;
	}

	public static TreeMap<Integer, Integer> getSysConfigMap() {
		return sysConfigMap;
	}

	public static void setSysConfigMap(TreeMap<Integer, Integer> sysConfigMap) {
		DropRedPacketSysCache.sysConfigMap = sysConfigMap;
	}

	public static int getSysRedPacketId() {
		return sysRedPacketId;
	}

	public static void setSysRedPacketId(int sysRedPacketId) {
		DropRedPacketSysCache.sysRedPacketId = sysRedPacketId;
	}

	public static ConcurrentLinkedQueue<DropRedPacketModel> getRedpacketQueue() {
		return redpacketQueue;
	}

	public static void setRedpacketQueue(ConcurrentLinkedQueue<DropRedPacketModel> redpacketQueue) {
		DropRedPacketSysCache.redpacketQueue = redpacketQueue;
	}

	public static ConcurrentLinkedQueue<DropRedPacketModel> getRedpacketNotTimesQueue() {
		return redpacketNotTimesQueue;
	}

	public static void setRedpacketNotTimesQueue(ConcurrentLinkedQueue<DropRedPacketModel> redpacketNotTimesQueue) {
		DropRedPacketSysCache.redpacketNotTimesQueue = redpacketNotTimesQueue;
	}

	public static void addRedpacketNotTimesQueue(DropRedPacketModel model) {
		int maxNum = Config_xtcs_004.getIns().get(DropRedPacketConst.MAXNUM).getNum();
		CrossDropRedPacketIO.getIns().addCacheBeforeMore(maxNum, redpacketNotTimesQueue.size(),
				redpacketNotTimesQueue.iterator(), model);
		redpacketNotTimesQueue.add(model);
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		if (CrossZone.isCrossServer()) {
			return;
		}
		configMap.clear();
		sysConfigMap.clear();
		List<Struct_tjhb_296> sortList = Config_tjhb_296.getIns().getSortList();
		for (Struct_tjhb_296 struct_tjhb_296 : sortList) {
			int id = struct_tjhb_296.getId();
			int type = id / 10;
			List<Struct_tjhb_296> list = configMap.get(type);
			if (list == null) {
				list = new ArrayList<>();
				configMap.put(type, list);
			}
			list.add(struct_tjhb_296);
		}
		DropRedPacketFunction.getIns().initSysConfigMap();
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
	}

}
