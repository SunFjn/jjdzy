package com.teamtop.houtaiHttp.events.version;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.redeploy.cross.RedeployCrossToLocal;
import com.teamtop.util.common.ZoneIDUtil;
import com.teamtop.util.log.LogTool;

public class VersionFunction {


	public static void setVersionZid(String zidStr, String version){
		Map<String, List<Integer>> versionMap = VersionCache.getVersionMap();
		List<Integer> zidList = versionMap.get( version);
		if( zidList==null){
			zidList = new ArrayList<Integer>();
			versionMap.put( version, zidList);
		}
		
		String[] split = zidStr.split("_");
		for( String temp:split){
			int parseInt = Integer.parseInt( temp);
			zidList.add( parseInt);
		}
		LogTool.info("Save finish version:"+version+" zid:"+zidStr, RedeployCrossToLocal.class);
	}
	
	public static String getVersionZidStr(){
		StringBuilder log = new StringBuilder("耗时").append(VersionCache.getTimeEnd()-VersionCache.getTimeBegin()).append("ms ");
		Map<String, List<Integer>> versionMap = VersionCache.getVersionMap();
		Iterator<Entry<String, List<Integer>>> iterator = versionMap.entrySet().iterator();
		while( iterator.hasNext()){
			Entry<String, List<Integer>> next = iterator.next();
			String version = next.getKey();
			List<Integer> zidList = next.getValue();
			String zidStrTemp = ZoneIDUtil.getZidStr(zidList);
//			if( log.length()==0){
//				log.append("版本号 区号：\n").append( zidStrTemp).append("    ").append( version);
//			}else{
				log.append("\n         ").append( zidStrTemp).append("    ").append( version);
//			}
		}
		
		versionMap = VersionCache.getVersionCrossMap();
		iterator = versionMap.entrySet().iterator();
		while( iterator.hasNext()){
			Entry<String, List<Integer>> next = iterator.next();
			String version = next.getKey();
			List<Integer> zidList = next.getValue();
			StringBuilder nameListStr = new StringBuilder();
			zidList.forEach(temp -> {
				if(nameListStr.length()==0){
					nameListStr.append(ZoneIDUtil.getCrossServerName(temp));
				}else{
					nameListStr.append(",").append(ZoneIDUtil.getCrossServerName(temp));
				}
			});
			log.append("\n         ").append( nameListStr).append("  ").append( version);
		}
		return log.toString();
	}
	
	public static void setVersionZidCross(String zidStr, String version){
		Map<String, List<Integer>> versionMap = VersionCache.getVersionCrossMap();
		List<Integer> zidList = versionMap.get(version);
		if(zidList == null){
			zidList = new ArrayList<Integer>();
			versionMap.put( version, zidList);
		}
		
		String[] split = zidStr.split("_");
		for( String temp:split){
			int parseInt = Integer.parseInt( temp);
			zidList.add( parseInt);
		}
	}
}
