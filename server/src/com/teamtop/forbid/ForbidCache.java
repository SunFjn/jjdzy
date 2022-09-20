package com.teamtop.forbid;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.houtaiHttp.events.gameSystem.GameSystemCache;
import com.teamtop.houtaiHttp.events.systemSwitch.SystemSwitchCache;
import com.teamtop.netty.util.nettyCache.FunCmd;
import com.teamtop.util.cache.union.UC;
/**
 * 功能屏蔽缓存
 */
public class ForbidCache{
	/**
	 * class与cmd的对应关系
	 */
	private static Map<Class<?>,List<Integer>> cmdMap = new HashMap<Class<?>,List<Integer>>();
	/**
	 * 要屏蔽的协议集合
	 */
	private static List<Integer> forbidCmds = new ArrayList<Integer>();
	/**
	 * 要屏蔽的图标ID集合
	 */
	private static List<Integer> forbidIcons = new ArrayList<Integer>();
	/**
	 * 要屏蔽的事件集合
	 */
	private static Map<Class<?>,ForbidEventRec> forbidEventsMap = new HashMap<Class<?>,ForbidEventRec>();
	
	private static HashMap<Integer, int[]> sceneForbidMap =UC.reg("sceneForbidMap", new HashMap<Integer, int[]>());
	private static HashMap<Integer, FunCmd> funCmdMap = UC.reg("forbidCacheFunCmdMap", new HashMap<Integer, FunCmd>());
	public static HashMap<Integer, int[]> getSceneForbidMap(){
		return sceneForbidMap;
	}
	public static HashMap<Integer, FunCmd> getFunCmdMap(){
		return funCmdMap;
	}
	
	public static List<Integer> getForbidIcons() {
		return forbidIcons;
	}
	public static void addForbidIcon(int id){
		forbidIcons.add(id);
	}
	/**
	 * clazz关联协议，用于协议屏蔽
	 * @param clazz
	 * @param cmd
	 */
	public static void addCmdMap(Class<?> clazz,Integer cmd){
		List<Integer> list = cmdMap.get(clazz);
		if(list==null){
			list = new ArrayList<Integer>();
			cmdMap.put(clazz, list);
		}
		list.add(cmd);
	}
	/**
	 * 屏蔽某个Event
	 * @param clazz
	 */
	public static void addForbidEventsClazz(ForbidEventRec rec){
		forbidEventsMap.put(rec.getClazz(),rec);
	}
	/**
	 * 屏蔽某个CG的class对应的协议号
	 * @param clazz
	 */
	public static void addForbidCGClazz(Class<?> clazz){
		List<Integer> cmds = cmdMap.get(clazz);
		if(cmds!=null){
			forbidCmds.addAll(cmds);
		}
	}
	/**
	 * 屏蔽单个cmd
	 * @param cmd
	 */
	public static void addForbidCmd(int cmd){
		forbidCmds.add(cmd);
	}
	/**
	 * 移除被屏蔽的cmd
	 * @param cmd
	 */
	public static void removeForbidCmd(Integer cmd){
		forbidCmds.remove(cmd);
	}
	/**
	 * 验证cmd是否被屏蔽
	 * @param cmd
	 * @return true被屏蔽
	 */
	public static boolean validateCmd(Integer cmd){
		return forbidCmds.contains(cmd);
	}
	
	/**
	 * 验证事件是否被屏蔽
	 * @param clazz 事件类
	 * @return true被屏蔽
	 */
	public static ForbidEventRec validateEvent(Class<?> clazz){
		return forbidEventsMap.get(clazz);
	}
	/**
	 * 在某个场景做这个cmd是否需要屏蔽
	 * @param sceneSysId 场景id
	 * @param cmd 协议号
	 * @return true，需要屏蔽
	 */
	public static boolean forbid(Integer sceneSysId,int cmd){
		int[] is = getSceneForbidMap().get(sceneSysId);
		if(is!=null){
			for(int forbid:is){
				if(forbid==cmd){
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 检查CG的cmd请求玩家等级是否满足
	 * @param level 玩家等级
	 * @param cmd cmd
	 * @return true为满足或者没有注册这条cmd，false为不满足
	 */ 
	public static boolean validateFunCmd(int level,int cmd){
		FunCmd funCmd = getFunCmdMap().get(cmd);
		if(funCmd==null || level>=funCmd.getLevel()){
			return true;
		}
		return false;
	}
	
	/**
	 * 检查CG的cmd请求玩家通关关卡是否满足
	 * @param level 玩家等级
	 * @param cmd cmd
	 * @return true为满足或者没有注册这条cmd，false为不满足
	 */ 
	public static boolean validateFunGuanqiaCmd(int curGuanqia,int cmd){
		FunCmd funCmd = getFunCmdMap().get(cmd);
		if(funCmd==null || curGuanqia>=funCmd.getGuanqiaId()){
			return true;
		}
		return false;
	}
	
	/**
	 * 检查cmd是否通过后台屏蔽
	 * @param zoneid 区号
	 * @param cmd 协议号
	 * @return true为需要屏蔽，false为不需要屏蔽
	 */
	public static boolean forbidSystemFromHoutai(int zoneid, int cmd){
		List<Integer> list = SystemSwitchCache.getFunIdCache().get(zoneid);
		if(list != null){
			FunCmd funCmd = getFunCmdMap().get(cmd);
			if(funCmd != null){
				int funid = funCmd.getFunid();
				if(list.contains(funid)){
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 跨服活动cmd是否屏蔽
	 * 
	 * @param cmd
	 * @return
	 */
	public static boolean forbidCrossAct(int cmd) {
		FunCmd funCmd = getFunCmdMap().get(cmd);
		if (funCmd != null) {
			int funid = funCmd.getFunid();
			if (!CrossActivitySwitchCache.checkCrossOpen(funid)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 检测功能玩法是否屏蔽
	 * @param cmd
	 * @return
	 */
	public static boolean forbidGameSystem(int cmd) {
		FunCmd funCmd = getFunCmdMap().get(cmd);
		if (funCmd != null) {
			int funid = funCmd.getFunid();
			if (GameSystemCache.checkForbid(funid)) {
				return true;
			}
		}
		return false;
	}
}
