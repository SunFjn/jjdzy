package com.teamtop.util.common;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.cross.CrossZone;

public class ZoneIDUtil {

	public static void main(String[] args){
		List<Integer> list = new ArrayList<>();
		list.add(1);
		list.add(111);
		list.add(11);
		list.add(35);
		list.add(333);
		list.add(1);
		list.add(33);
		list.add(34);
		String zidStr = getZidStr(list);
		System.out.println(zidStr);
	}
	
	/**
	 * 检查格式；区号输入不正确，请重新输入： 全服-1    某些区id_id,id,id...
	 */
	public static boolean checkZIDStr(String zidStr){
		try {
			if(zidStr == null|| zidStr.equals("")){
				return false;
			}

			zidStr = zidStr.trim();
			if(zidStr.equals("-1")){
				return true;
			}else{
				String[] split = zidStr.split(",");
				for( String temp:split){
					String[] split2 = temp.split("_");
					if( split2.length==1){
						int zID1 = Integer.parseInt(split2[0]);
					}else if( split2.length==2){
						int zID1 = Integer.parseInt(split2[0]);
						int zID2 = Integer.parseInt(split2[1]);
						if( zID1>=zID2){
							return false;
						}
					}else
						return false;
				}
			}
		} catch (Exception e) {
			System.out.println("CheckZIDStr.ZID:"+zidStr);
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	
	public static List<Integer> getzidListByStr(String zidStr){
		List<Integer> zidList = new ArrayList<>();
		String[] split = zidStr.split(",");//格式是  1_10,22,25_30
		for( String temp:split){
			String[] split2 = temp.split("_");
			if( split2.length==1){
				int parseInt = Integer.parseInt( split2[0]);
				zidList.add( parseInt);
			}else{
				int begin = Integer.parseInt( split2[0]);
				int end = Integer.parseInt( split2[1]);
				for( int i=begin; i<=end; i++){
					zidList.add( i);
				}
			}
		}
		return zidList;
	}
	
	/**
	 * 返回id;id_id
	 */
	public static String getZidStr(List<Integer> zidList){
		Collections.sort(zidList, new Comparator<Integer>() {
			@Override
			public int compare(Integer o1, Integer o2) {
				return o1-o2;
			}
		});
		
		Map<Integer,Integer> zidSortMap = new HashMap<>();
		for( int i=0; i<zidList.size();i++){
			int temp = zidList.get( i);
			Iterator<Entry<Integer, Integer>> iterator = zidSortMap.entrySet().iterator();
			boolean hadData = false;//true:有，已经更新Map
			while( iterator.hasNext()){
				Entry<Integer, Integer> next = iterator.next();
				int min = next.getKey();
				int max = next.getValue();
				if( max==temp-1){
					zidSortMap.put( min, temp);
					hadData = true;
					break;
				}
			}
			if( !hadData){
				zidSortMap.put( temp, temp);
			}
		}
		int zidMax = 10000;
		StringBuilder dataLog = new StringBuilder( );
		for( int i=1; i<zidMax; i++){
			Integer temp = zidSortMap.get( i);
			if( temp==null)
				continue;
			int min = i;
			int max = temp;
			if(dataLog.length()==0&& min==max){
				dataLog.append(min);
			}else if(min==max){
				dataLog.append(";").append(min);
			}else
				dataLog.append(";").append(min).append("-").append( max);
		}
		return dataLog.toString();
	}
	
	public static String getCrossServerName(int zid){
		switch (zid) {
		case CrossZone.central:
			return "玩法服";
		case CrossZone.houtai:
			return "后台";
		default:
			break;
		}
		return "胸弟，"+zid+"还没配名啊";
	}
	
	/**
	 * 检查是否为正数
	 */
	public static boolean checkInt(String zidStr){
		try {
			if(zidStr == null|| zidStr.equals(""))
				return false;
			
			int zID1 = Integer.parseInt(zidStr);
			if(zID1 < 1)
				return false;
		} catch (Exception e) {
			System.out.println("checkInt.ZID:"+zidStr);
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
