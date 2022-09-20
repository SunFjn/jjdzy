package com.teamtop.houtaiHttp.events.log;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;

public class LogFunction {

	public static void main(String[] args) {
		Map<String, Integer> logException = getLogException("console.log", "2018-12-05");
		
		Iterator<Entry<String, Integer>> iterator = logException.entrySet().iterator();
		while(iterator.hasNext()){
			Entry<String, Integer> next = iterator.next();
			Integer value = next.getValue();
			String key = next.getKey();
			System.out.println(key+" : "+value);
		}
		System.out.println("完成");
	}
	
	public static Map<String,Integer> getLogException(String name, String time){
		Map<String, Integer> allMap = new HashMap<>();
		if(name.contains("console")){
			String urlTemp = GamePath.USER_DIR+File.separator+"log"+File.separator+name;
			File file = new File(urlTemp);
			if (file.exists()){
				allMap = readBigFileByUrl(urlTemp);
			}else{
				allMap.put(name+"DoNoExists.zid:"+GameProperties.getZoneIdStr(), 1);
			}
		}else{
			List<String> url = new ArrayList<>();
			url.add(GamePath.USER_DIR+File.separator+"log"+File.separator+"error"+File.separator+time);
			url.add(GamePath.USER_DIR+File.separator+"log"+File.separator+"info"+File.separator+time);
			url.add(GamePath.USER_DIR+File.separator+"log"+File.separator+"warn"+File.separator+time);
			
			for(String urlTemp:url){
				File file = new File(urlTemp);
				if (file.exists()){
					File[] listFiles = file.listFiles();
					for( int i=0; i<listFiles.length; i++){
						Map<String, Integer> mapTemp = readBigFileByUrl(listFiles[i].getPath());
						addAllMap(allMap, mapTemp);
					}
				}
			};
		}
		return allMap;
	}
	
	private static void addAllMap(Map<String, Integer> allMap, Map<String, Integer> mapTemp){
		Iterator<Entry<String, Integer>> iterator = mapTemp.entrySet().iterator();
		while(iterator.hasNext()){
			Entry<String, Integer> next = iterator.next();
			Integer num = next.getValue();
			String key = next.getKey();
			Integer numAll = allMap.get(key);
			if(numAll==null){
				allMap.put(key, num);
			}else{
				allMap.put(key, num+numAll);
			}
		}
	}
	
	/**
	 * @param url GamePath.USER_DIR+File.separator+"log"+File.separator+"console2.log"
	 * @return
	 */
	public static Map<String,Integer> readBigFileByUrl( String url){
		Map<String,Integer> logMapAll = new HashMap<>();
        try {
            BufferedInputStream bis = new BufferedInputStream(new FileInputStream(new File(url)));
            BufferedReader in = new BufferedReader(new InputStreamReader(bis, "utf-8"), 10 * 1024 * 1024);// 10M缓存
            while (in.ready()) {
                String line = in.readLine();
                if( line.contains("Exception")){
                	String[] split = line.split(" ");
                	for(int i=0; i<split.length; i++){
                		if(split[i].contains("Exception")){
                			String key = split[i];
                        	Integer num = logMapAll.get(key);
                        	if(num==null){
                        		logMapAll.put(key, 1);
                        	}else{
                        		logMapAll.put(key, num+1);
                        	}
                        	break;
                		}
                	}
                }
            }
            in.close();
            
            //TODO console/ log日志指定日期
            //TODO 区+合服区：报错总数量
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return logMapAll;
	}
}
