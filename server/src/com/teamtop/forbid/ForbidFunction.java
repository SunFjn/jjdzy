package com.teamtop.forbid;

import java.io.File;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.common.CommonUtil;

/**
 * 屏蔽协议，事件，图标
 * @author Administrator
 *
 */
public class ForbidFunction extends AbsServerEvent{

	@Override
	public void startServer() throws RunServerException {
		try {
			String SEP = GamePath.SEP;
			String realFile = GamePath.CONFIG_DIR + SEP + "forbid.xml";
			realFile = URLDecoder.decode(realFile,"utf-8");  
			File file = new File(realFile);
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			for(Iterator<?> it = root.elementIterator("bean");it.hasNext();){
				Element bean = (Element) it.next();
				String cg = bean.attributeValue("cg");
				String event = bean.attributeValue("event");
				String unforbidFunStr = bean.attributeValue("unforbidFun");
				String cmdStr = bean.attributeValue("cmd");
				String unforbidCmdStr = bean.attributeValue("unforbidCmd");
				int iconHiddenId = CommonUtil.transforObjtoInt(bean.attributeValue("iconHiddenId"));
				if(cg!=null){
					Class<?> cgClazz = Class.forName(cg);
					ForbidCache.addForbidCGClazz(cgClazz);
				}
				if(event!=null){
					Class<?> eventClazz = Class.forName(event);
					ForbidEventRec rec = new ForbidEventRec();
					rec.setClazz(eventClazz);
					if(unforbidFunStr!=null){
						String[] unforbidArr = unforbidFunStr.split("_");
						List<String> list = new ArrayList<String>();
						for(String methodName:unforbidArr){
							list.add(methodName);
						}
						rec.setUnForbidFun(list);
					}
					ForbidCache.addForbidEventsClazz(rec);
				}
				if(iconHiddenId>0){
					ForbidCache.addForbidIcon(iconHiddenId);
				}
				if(cmdStr!=null){
					String[] cmdArr = cmdStr.split("_");
					for(String cmd:cmdArr){
						ForbidCache.addForbidCmd(Integer.parseInt(cmd));
					}
				}
				if(unforbidCmdStr!=null){
					String[] unforbidCmdArr = unforbidCmdStr.split("_");
					for(String cmd:unforbidCmdArr){
						ForbidCache.removeForbidCmd(Integer.parseInt(cmd));
					}
				}
			}
		} catch (Exception e) {
			throw new RunServerException(e, "ForbidFunction startServer err");
		}
	}
	@Override
	public void initExcel() throws RunServerException {/*
		HashMap<Integer, int[]> sceneForbidMap = ForbidCache.getSceneForbidMap();
		HashMap<Integer, List<Integer>> funCmdMap = ForbidCache.getFunCmdMap();
		List<Struct_map_204> sortList = Config_map_204.getIns().getSortList();
		for(Struct_map_204 map:sortList){
			int id = map.getId();
			int[][] forbidFun = map.getForbidFun();
			if(forbidFun==null) continue;
			int[] list = forbidFun[0];
			Set<Integer> set = new HashSet<Integer>();
			for(int funid:list){
				List<Integer> cmdList = funCmdMap.get(funid);
				for(Integer cmd:cmdList){
					set.add(cmd);
				}
			}
			int[] cmdArr = new int[set.size()];
			int i = 0;
			for(Integer cmd:set){
				cmdArr[i++] = cmd;
			}
			sceneForbidMap.put(id, cmdArr);
		}
	*/}
}
