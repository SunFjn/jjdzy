package com.teamtop.system.event.useAddEvent;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.backstage.events.flowJianKong.FlowJianKongEvent;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.restrictedAccess.RestrictedAccessUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
/**
 * 投入产出工具类<br/>
 * 配合格式int[][]作为数据源使用，统一配置到excel表中<br/>
 * 格式对应为[type,id,num][type,id,num]，若不是道具和装备为[type,0,num][type,0,num]<br/>
 * 额外提供简单的单一货币、道具装备的投入产出的使用方法
 * @author Administrator
 *
 */
public class UseAddUtil {
	/**
	 * 货币canUse
	 * @param hero
	 * @param type
	 * @param num
	 * @return
	 */
	public static boolean canUseHuobi(Hero hero,int type,long num){
		if(type == UseAddCache.BAG_TYPE){
			return false;
		}
		AbsUseAddEvent event = UseAddCache.getEvent(type);
		return event.canUseHuobi(hero, num);
	}
	/**
	 * 货币use
	 * @param hero
	 * @param type
	 * @param num
	 * @param reason
	 * @param notice 是否提示事件
	 */
	public static void useHuobi(Hero hero,int type,long num,int reason){
		if(num<=0) return;
		if(type == UseAddCache.BAG_TYPE){
			return;
		}
//		boolean notice = false;
		AbsUseAddEvent event = UseAddCache.getEvent(type);
		long currentNum = event.useHuobi(hero, num,reason);
		//刷新前端
		//推送属性改变
		if(hero.isOnline()){
			String typeStr = GameConst.huobiMap.get(type);
			if(typeStr == null){
				LogTool.warn("GameConst.huobiMap can not find5,type:"+type, UseAddUtil.class);
			}else{
				HeroFunction.getIns().sendChange120(hero, typeStr, currentNum);
			}
		}
//		if(notice)
//			GlobalSender.sendCmd_254(hero.getId(), 0, type, 0, (int)num);
//		NettyWrite.writeXData(hero.getId(), HeroCmd.GC_RetChange_118, dataMap);
//		NettyWrite.writeData(hero.getId(), GlobalCmd.GC_GcSysEvent_508, new GcSysEventResp(0, type, num, 0));
		//弹出使用提醒 统一
		//返回剩余值(货币) 统一
		//加入使用警告 统一
		//加入流水 impl
		event.flowRecHuobi(hero,num,false, reason);
		//其他系统插入的代码
		event.useInsertCode(hero, num, type);
		// 功能玩法系统对道具使用后的特殊处理事件（如：加积分）
		for (AbsUseHandleEvent uhEvent : UseAddCache.funcUseHandleEventList) {
			try {
				uhEvent.useFunctionHandle(hero, type, 0, num);
			} catch (Exception e) {
				LogTool.error(e, UseAddUtil.class, hero.getId(), hero.getName(), "UseAddUtil useFunctionHandle");
			}
		}
	}
	/**
	 * 货币canAdd
	 * @param hero
	 * @param type
	 * @param num
	 * @return
	 */
	public static boolean canAddHuobi(Hero hero,int type,long num){
		if(type == UseAddCache.BAG_TYPE){
			return false;
		}
		AbsUseAddEvent event = UseAddCache.getEvent(type);
		return event.canAddHuobi(hero, num);
	}
	
	
	public static void addHuobi(Hero hero,int type,long num,int reason,boolean isNotice){
		if(num<=0) return;
		AbsUseAddEvent event = UseAddCache.getEvent(type);
		long currentNum = event.addHuobi(hero,num);
		//刷新前端
		//推送属性改变
		String typeStr = GameConst.huobiMap.get(type);
		if(typeStr == null){
			LogTool.warn("GameConst.huobiMap can not find2,type:"+type, UseAddUtil.class);
		}else{
			HeroFunction.getIns().sendChange120(hero, typeStr, currentNum);
		}
//		NettyWrite.writeXData(hero.getId(), HeroCmd.GC_RetChange_118, dataMap);
		if(isNotice && currentNum > 0){
//			NettyWrite.writeData(hero.getId(), GlobalCmd.GC_GcSysEvent_508, new GcSysEventResp(1, type, num, 0));
			GlobalSender.sendCmd_254(hero.getId(), 1, type, 0, (int)num);
		}
		//弹出使用提醒 统一
		//返回剩余值(货币) 统一
		//加入使用警告 统一
		//加入流水 impl
		event.flowRecHuobi(hero,num,true, reason);
		//其他系统插入的代码
		event.addInsertCode(hero, num, type);
		//检查货币监控
		FlowJianKongEvent.checkMoney(hero, type, currentNum, num, reason);
	}

	/**
	 * 能否使用非道具装备的货币和其他单位，如元宝，银两，经验，体力，侠魂，声望
	 * @param hero hero
	 * @param type 类型，详细查看GameConst
	 * @param num 数量
	 * @return true为能使用，false为不能使用
	 */
	public static boolean canUse(Hero hero,int type,int num){
		int[][] data = new int[1][];
		data[0] = new int[]{type,0,num,0};
		return canUse(hero, data);
	}
	/**
	 * 使用非道具装备的货币和其他单位，如元宝，银两，经验，体力，侠魂，声望
	 * @param hero hero
	 * @param type 类型，详细查看GameConst
	 * @param num 数量
	 * @param reason 操作原因，用于流水记录
	 * @param notice 是否提示事件
	 */
	public static void use(Hero hero,int type,int num,int reason,boolean ...notice){
		boolean flag = (Boolean) (notice.length==0?false:notice[0]);
		boolean houbi = (Boolean) (notice.length < 2 ? true : notice[1]);
		int[][] data = new int[1][];
		data[0] = new int[]{type,0,num,0};
		use(hero, data, reason, flag, houbi);
	}
	/**
	 * 能否使用单种道具或者装备
	 * @param hero hero
	 * @param type 类型，为道具或装备类型，详细查看GameConst
	 * @param num 数量
	 * @param id 系统id
	 * @return true为可以使用,false为不能使用
	 */
	public static boolean canUse(Hero hero,int type,int num,int id){
		int[][] data = new int[1][];
		data[0] = new int[]{type,id,num};
		return canUse(hero, data);
	}
	/**
	 * 使用单种道具或者装备
	 * @param hero hero
	 * @param type 类型，为道具或装备类型，详细查看GameConst
	 * @param num 数量
	 * @param id 系统id
	 * @param reason 操作原因，用于流水记录
	 * @param notice 是否提示事件
	 */
	public static void use(Hero hero,int type,int num,int id,int reason,boolean ...notice){
		boolean flag = (Boolean) (notice.length==0?false:notice[0]);
		int[][] data = new int[1][];
		data[0] = new int[]{type,id,num};
		use(hero, data,reason,flag);
	}
	/**
	 * 能否使用，把默认的excel数据里面的数量 * num
	 * @param hero hero
	 * @param data excel配置表格式:int[][],格式对应为[type,id,num][type,id,num]，若不是道具和装备为[type,0,num][type,0,num]
	 * @param num 对应的excel数据默认数量 * num
	 * @return true为可以使用,false为不能使用
	 */
	public static boolean canUse(Hero hero,int[][] data,int num){
		int[][] copy = CommonUtil.copyDyadicArray(data);
		for(int[] arr:copy){
			arr[2] = arr[2] * num;
		}
		return canUse(hero, copy);
	}
	/**
	 * 使用，把默认的excel数据里面的数量 * num
	 * @param hero hero
	 * @param data excel配置表格式:int[][],格式对应为[type,id,num][type,id,num]，若不是道具和装备为[type,0,num][type,0,num]
	 * @param num 对应的excel数据默认数量 * num
	 * @param reason 操作原因，用于流水记录
	 */
	public static void use(Hero hero,int[][] data,int num,int reason,boolean notice){
		int[][] copy = CommonUtil.copyDyadicArray(data);
		for(int[] arr:copy){
			arr[2] = arr[2] * num;
		}
		use(hero, copy, reason, notice);
	}
	
	/**
	 * 能否使用
	 * @param hero hero
	 * @param data excel配置表格式:int[][],格式对应为[type,id,num][type,id,num]，若不是道具和装备为[type,0,num][type,0,num]
	 * @return true为可以使用,false为不能使用
	 */
	public static boolean canUse(Hero hero,int[][] data){
		if(CrossZone.isCrossServer()){
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.hid, hero.getId());
			crossData.putObject(UseAddCrossEnum.data, data);
			CrossData canAdd = NettyWrite.writeBlockData(hero.getLocalChannel(), CrossConst.ASK_LOCAL_CANUSE, hero.getId(), crossData);
			boolean rtn = (boolean) canAdd.getObject(UseAddCrossEnum.rtn, Boolean.class);
			return rtn;
		}
		if(data==null) return true;
		Map<Integer,int[]> huobiMap = null;
		Map<Integer,int[]> toolEquipMap = null;
		
		for(int[] d:data){
			int type = d[0];
			if(type==GameConst.TOOL || type==GameConst.EQUIP){
				int id = d[1];
				if(toolEquipMap==null) toolEquipMap = new HashMap<Integer, int[]>(3);
				Integer key = id;
				int[] is = toolEquipMap.get(key);
				if(is==null){
					toolEquipMap.put(key, Arrays.copyOf(d, d.length));
				}else{
					is[2] = is[2] + d[2];
				}
			}else{
				if(huobiMap==null) huobiMap = new HashMap<Integer, int[]>(3);
				int[] is = huobiMap.get(type);
				if(is==null){
					huobiMap.put(type, Arrays.copyOf(d, d.length));
				}else{
					//其他货币类型数量相加
					is[2] = is[2] + d[2];
				}
			}
		}
		if(huobiMap!=null){
			for(int[] d:huobiMap.values()){
				AbsUseAddEvent event = UseAddCache.getEvent(d[0]);
				if(!event.canUse(hero, d[2], d[1])){
					//加提醒？
					return false;
				}
			}
		}
		if(toolEquipMap!=null){
			for(int[] d:toolEquipMap.values()){
				AbsUseAddEvent event = UseAddCache.getEvent(UseAddCache.BAG_TYPE);
				if(!event.canUse(hero, d[2], d[1])){
					//加提醒？
					return false;
				}
			}
		}
		return true;
	}
	
	/**
	 * 能否使用
	 * @param hero hero
	 * @param data 格式:List<int[]>,格式对应为[type,id,num][type,id,num]，若不是道具和装备为[type,0,num][type,0,num]
	 * @return true为可以使用,false为不能使用
	 */
	public static boolean canUse(Hero hero, List<int[]> data){
		if(CrossZone.isCrossServer()){
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.hid, hero.getId());
			crossData.putObject(UseAddCrossEnum.data, data);
			CrossData canAdd = NettyWrite.writeBlockData(hero.getLocalChannel(), CrossConst.ASK_LOCAL_CANUSE, hero.getId(), crossData);
			boolean rtn = (boolean) canAdd.getObject(UseAddCrossEnum.rtn, Boolean.class);
			return rtn;
		}
		if(data==null) return true;
		Map<Integer,int[]> huobiMap = null;
		Map<Integer,int[]> toolEquipMap = null;
		
		for(int[] d:data){
			int type = d[0];
			if(type==GameConst.TOOL || type==GameConst.EQUIP){
				int id = d[1];
				if(toolEquipMap==null) toolEquipMap = new HashMap<Integer, int[]>(3);
				Integer key = id;
				int[] is = toolEquipMap.get(key);
				if(is==null){
					toolEquipMap.put(key, Arrays.copyOf(d, d.length));
				}else{
					is[2] = is[2] + d[2];
				}
			}else{
				if(huobiMap==null) huobiMap = new HashMap<Integer, int[]>(3);
				int[] is = huobiMap.get(type);
				if(is==null){
					huobiMap.put(type, Arrays.copyOf(d, d.length));
				}else{
					//其他货币类型数量相加
					is[2] = is[2] + d[2];
				}
			}
		}
		if(huobiMap!=null){
			for(int[] d:huobiMap.values()){
				AbsUseAddEvent event = UseAddCache.getEvent(d[0]);
				if(!event.canUse(hero, d[2], d[1])){
					//加提醒？
					return false;
				}
			}
		}
		if(toolEquipMap!=null){
			for(int[] d:toolEquipMap.values()){
				AbsUseAddEvent event = UseAddCache.getEvent(UseAddCache.BAG_TYPE);
				if(!event.canUse(hero, d[2], d[1])){
					//加提醒？
					return false;
				}
			}
		}
		return true;
	}
	
	/**
	 * 使用
	 * @param hero hero
	 * @param data excel配置表格式:int[][],格式对应为[type,id,num][type,id,num]，若不是道具和装备为[type,0,num][type,0,num]
	 * @param reason 操作原因，用于流水记录
	 * @param houbiUpdate 
	 */
	public static void use(Hero hero, int[][] data, int reason, boolean notice, boolean... houbiUpdate) {
		if(data==null) return;
		if(CrossZone.isCrossServer()){
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.hid, hero.getId());
			crossData.putObject(UseAddCrossEnum.data, data);
			crossData.putObject(UseAddCrossEnum.reason, reason);
			NettyWrite.writeXData(hero.getLocalChannel(), CrossConst.ASK_LOCAL_USE, crossData);
			return;
		}
		for(int[] d:data){
			int type = d[0];
			if(type==GameConst.EQUIP|| type==GameConst.TOOL){
				type = UseAddCache.BAG_TYPE;
			}
			doUse(hero, type, d[1], d[2], reason, notice, houbiUpdate);
		}
	}
	
	/**
	 * 使用
	 * @param hero hero
	 * @param data 格式:List<int[]>,格式对应为[type,id,num][type,id,num]，若不是道具和装备为[type,0,num][type,0,num]
	 * @param reason 操作原因，用于流水记录
	 * @param notice 是否提示事件
	 * @param houbiUpdate 是否更新货币
	 */
	public static void use(Hero hero, List<int[]> data, int reason, boolean notice, boolean... houbiUpdate) {
		if(data==null) return;
		if(CrossZone.isCrossServer()){
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.hid, hero.getId());
			crossData.putObject(UseAddCrossEnum.data, data);
			crossData.putObject(UseAddCrossEnum.reason, reason);
			NettyWrite.writeXData(hero.getLocalChannel(), CrossConst.ASK_LOCAL_USE, crossData);
			return;
		}
		for(int[] d:data){
			int type = d[0];
			if(type==GameConst.EQUIP|| type==GameConst.TOOL){
				type = UseAddCache.BAG_TYPE;
			}
			doUse(hero, type, d[1], d[2], reason, notice, houbiUpdate);
		}
	}
	/**
	 * 使用
	 * @param hero hero
	 * @param type 类型包括：元宝、银两、经验、声望、体力、装备、道具、蓝色侠魂、紫色侠魂、橙色侠魂
	 * @param id 若是道具和装备为道具装备id
	 * @param num 数量
	 * @param reason 操作原因，用于流水记录
	 * @param notice 是否提示事件
	 * @param houbiUpdate 是否更新货币 true:更新
	 */
	public static void doUse(Hero hero, int type, int id, int num, int reason, boolean notice, boolean... houbiUpdate) {
		if(num<=0) return;
		AbsUseAddEvent event = UseAddCache.getEvent(type);
		long currentNum = event.use(hero,num,id,reason);
		//刷新前端
		//推送属性改变
		if(type != UseAddCache.BAG_TYPE){
			boolean houbi = true;
			if (houbiUpdate != null && houbiUpdate.length > 0) {
				houbi = houbiUpdate[0];
			}
			if(houbi) {
				String typeStr = GameConst.huobiMap.get(type);
				if(typeStr == null){
					LogTool.warn("GameConst.huobiMap can not find4,type:"+type, UseAddUtil.class);
				}else{
					HeroFunction.getIns().sendChange120(hero, typeStr, currentNum);
				}
			}
			if(notice)
				GlobalSender.sendCmd_254(hero.getId(), 0, type, 0, num);
			//NettyWrite.writeXData(hero.getId(), HeroCmd.GC_RetChange_118, dataMap);
		}
		
//		NettyWrite.writeData(hero.getId(), GlobalCmd.GC_GcSysEvent_508, new GcSysEventResp(0, type, num, id));
		//弹出使用提醒 统一
		//返回剩余值(货币) 统一
		//加入使用警告 统一
		//加入流水 impl
		event.flowRecBase(hero, num, id, false, reason);
		//插入其他系统代码 impl
		event.useInsertCode(hero,num,id);
		// 功能玩法系统对道具使用后的特殊处理事件（如：加积分）
		for (AbsUseHandleEvent uhEvent : UseAddCache.funcUseHandleEventList) {
			try {
				uhEvent.useFunctionHandle(hero, type, id, num);
			} catch (Exception e) {
				LogTool.error(e, UseAddUtil.class, hero.getId(), hero.getName(), "UseAddUtil useFunctionHandle");
			}
		}
	}
	
	/**
	 * 运营需求，限制领取检查
	 * @param resID 监控ID，叫策划配表
	 * @param num 数量
	 * @return true为能使用，false为不能使用
	 */
	public static boolean canAddXianZhi(Hero hero,int resID,int num){
		return RestrictedAccessUtil.canAdd(hero, resID, num);
	}
	
	/**
	 * 能否添加,适用于非道具装备类型包括：元宝、银两、经验、声望、体力、装备、道具、蓝色侠魂、紫色侠魂、橙色侠魂
	 * @param hero hero
	 * @param type 类型，详细查看GameConst
	 * @param num 数量
	 * @return true为能添加，false为不能添加
	 */
	public static boolean canAdd(Hero hero,int type,int num){
		int[][] data = new int[1][];
		data[0] = new int[]{type,0,num,0};
		return canAdd(hero, data, false);
	}
	/**
	 * 添加，适用于非道具装备类型包括：元宝、银两、经验、声望、体力、装备、道具、蓝色侠魂、紫色侠魂、橙色侠魂
	 * @param hero hero
	 * @param type 类型，详细查看GameConst
	 * @param num 数量
	 * @param reason 操作原因，用于流水记录
	 * @param isNotice 是否需要客户端提示属性改变  true:前端有tips
	 */
	public static void add(Hero hero,int type,int num,int reason,boolean isNotice){
		int[][] data = new int[1][];
		data[0] = new int[]{type,0,num};
		add(hero, data, reason, null,isNotice);
	}
	/**
	 * 能否获得单种道具或者装备
	 * @param hero hero
	 * @param type 类型，为道具或装备类型，详细查看GameConst
	 * @param num 数量
	 * @param id 系统id
	 * @param sendMail 背包满是否发送邮件
	 * @return true为能添加，false为不能添加
	 */
	public static boolean canAdd(Hero hero,int type,int num,int id,boolean sendMail){
		int[][] data = new int[1][];
		data[0] = new int[]{type,id,num};
		return canAdd(hero, data, sendMail);
	}
	/**
	 * 获得单种道具或者装备
	 * @param hero hero
	 * @param type 类型，为道具或装备类型，详细查看GameConst
	 * @param num 数量
	 * @param id 系统id
	 * @param sendMail 背包满是否发送邮件  填null或者默认邮件：UseAddUtil.getDefaultMail()
	 * @param reason 操作原因，用于流水记录
	 * @param isNotice 是否需要客户端提示属性改变
	 */
	public static void add(Hero hero,int type,int num,int id,MailInfo sendMail,int reason,boolean isNotice){
		int[][] data = new int[1][];
		data[0] = new int[]{type,id,num};
		add(hero, data, reason, sendMail,isNotice);
	}
	
	/**
	 * 能否添加，把默认的excel数据里面的数量 * num  
	 * </br>（本方法不是废弃，而是提醒你用下面带监控ID的方法。不清楚就找离水大佬要不要监控，不要就用此方法）
	 */
	public static boolean canAdd(Hero hero,int[][] data,int num,boolean sendMail){
		int[][] copy = CommonUtil.copyDyadicArray(data);
		for(int[] arr:copy){
			arr[2] = arr[2] * num;
		}
		return canAdd(hero, copy, sendMail);
	}
	/**
	 * 能否添加，把默认的excel数据里面的数量 * num  
	 * @param data excel配置表格式:int[][],格式对应为[type,id,num][type,id,num]，若不是道具和装备为[type,0,num][type,0,num]
	 * @param num excel数据里面的数量 * num
	 * @param sendMail 若有包含道具装备，是否背包满了发邮件，不是道具装备类型直接填false
	 * @param  jianKongID	监控ID，不监控填0，叫策划配表，不懂就问离水大大佬要不要监控
	 * @return true为能添加，false为不能添加
	 */
	public static boolean canAddJK(Hero hero,int[][] data,int num,boolean sendMail, int jianKongID){
		boolean canAdd = RestrictedAccessUtil.canAdd(hero, jianKongID, num);
		if(!canAdd)
			return false;
		return canAdd(hero, data, num, sendMail);
	}
	
	/**
	 * 能否添加   </br>（本方法不是废弃，而是提醒你用下面带监控ID的方法。不清楚就找离水大佬要不要监控，不要就用此方法）
	 */
	public static boolean canAdd(Hero hero,int[][] data,boolean sendMail){
		if(CrossZone.isCrossServer()){
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.hid, hero.getId());
			crossData.putObject(UseAddCrossEnum.sendmail, sendMail);
			crossData.putObject(UseAddCrossEnum.data, data);
			CrossData canAdd = NettyWrite.writeBlockData(hero.getLocalChannel(), CrossConst.ASK_LOCAL_CANADD, hero.getId(), crossData);
			boolean rtn = (boolean) canAdd.getObject(UseAddCrossEnum.rtn, Boolean.class);
			return rtn;
		}
		synchronized (hero) {
			List<int[]> toolEquip = null;
			List<int[]> others = new ArrayList<>();
			for(int[] d:data){
				if(d == null) continue;
				if(d[0]==GameConst.TOOL || d[0]==GameConst.EQUIP){
					//道具或者装备
					if(toolEquip==null){
						toolEquip = new ArrayList<>();
					}
					toolEquip.add(d);
				}else{
					others.add(d);
				}
			}
			for(int[] d:others){
				//防沉迷收益减半检测
				//if(AntiAddcationCache.isNeedHalf(reason, 1)){
				//int num = (int) AntiAddcationFunction.getIns().addIncome(hero, d[2]);
				if(!UseAddCache.getEvent(d[0]).canAdd(hero, d[2], d[1])){
					return false;
				}
			}
			if(toolEquip!=null){
				int[][] te = new int[toolEquip.size()][];
				toolEquip.toArray(te);
				if(!UseAddCache.getEvent(UseAddCache.BAG_TYPE).canAdd(hero, te,sendMail)){
					return false;
				}
			}
			return true;
		}
	}
	/**
	 * 能否添加
	 * @param data excel配置表格式:int[][],格式对应为[type,id,num][type,id,num]，若不是道具和装备为[type,0,num][type,0,num]
	 * @param sendMail 若有包含道具装备，是否背包满了发邮件，不是道具装备类型直接填false，true:背包满就发邮件
	 * @param	jianKongID	监控ID，不监控填0，叫策划配表，不懂就问离水大大佬要不要监控
	 * @return true为能添加，false为不能添加
	 */
	public static boolean canAddJK(Hero hero,int[][] data,boolean sendMail, int jianKongID){
		boolean canAdd = RestrictedAccessUtil.canAdd(hero, jianKongID, 1);
		if(!canAdd)
			return false;
		return canAdd(hero, data, sendMail);
	}
	
	/**
	 * 增加，把默认的excel数据里面的数量 * num 
	 * </br>（本方法不是废弃，而是提醒你用下面带监控ID的方法。不清楚就找离水大佬要不要监控，不要就用此方法）
	 */
	public static void add(Hero hero,int[][] data,int num,int reason,MailInfo sendMail,boolean isNotice){
		int[][] copy = CommonUtil.copyDyadicArray(data);
		for(int[] arr:copy){
			arr[2] = arr[2] * num;
		}
		add(hero, copy, reason, sendMail, isNotice);
	}
	/**
	 * 增加，把默认的excel数据里面的数量 * num
	 * @param data excel配置表格式:int[][],格式对应为[type,id,num][type,id,num]，若不是道具和装备为[type,0,num][type,0,num]
	 * @param num excel数据里面的数量 * num
	 * @param reason 操作原因，用于流水记录
	 * @param sendMail 若有包含道具装备，是否背包满了发邮件，传入MailInfo对象，若想使用默认邮件提醒：由于背包已满，你所得的物品通过附件发送给你，请注意查收。调用UseAddUtil.getDefaultMail()方法。
	 * @param isNotice 是否需要客户端提示属性改变
	 * @param	jianKongID	监控ID，不监控填0，叫策划配表，不懂就问离水大大佬要不要监控
	 */
	public static void addJK(Hero hero,int[][] data,int num,int reason,MailInfo sendMail,boolean isNotice,int jianKongID){
		add(hero, data, num, reason, sendMail, isNotice);
		RestrictedAccessUtil.use(hero, jianKongID, num);
	}
	
	/**
	 * 增加  </br>（本方法不是废弃，而是提醒你用下面带监控ID的方法。不清楚就找离水大佬要不要监控，不要就用此方法）
	 */
	public static List<long[]> add(Hero hero,int[][] data,int reason,MailInfo sendMail,boolean isNotice){
		if(CrossZone.isCrossServer()){
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.hid, hero.getId());
			crossData.putObject(UseAddCrossEnum.sendmail, sendMail==null?false:true);
			crossData.putObject(UseAddCrossEnum.data, data);
			crossData.putObject(UseAddCrossEnum.reason, reason);
			crossData.putObject(UseAddCrossEnum.notice, isNotice);
			NettyWrite.writeXData(hero.getLocalChannel(), CrossConst.ASK_LOCAL_ADD, crossData);
			return null;
		}
		List<long[]> retList = new ArrayList<long[]>();
		List<int[]> toolEquipList = null;
		Map<Integer,int[]> others = null;
		Map<Integer, Integer> itemMap=new HashMap<Integer, Integer>();
		for(int[] d:data){
			int type = d[0];
			if(d[0]==GameConst.EQUIP|| d[0]==GameConst.TOOL){
				//道具或者装备
				if (toolEquipList == null) {
					toolEquipList = new ArrayList<>();
				}
				toolEquipList.add(d);
				if(d[0]==GameConst.TOOL){
					if (!itemMap.containsKey(d[1])) {
						itemMap.put(d[1], d[2]);
					}else {
						itemMap.put(d[1], itemMap.get(d[1])+d[2]);
					}
				}
			}else{
				if(others==null) others = new HashMap<Integer,int[]>();
				int[] is = others.get(type);
				if(is!=null){
					is[2] = is[2] + d[2];
				}else{
					others.put(type, new int[]{d[0],d[1],d[2]});
				}
			}
		}
		if(others!=null){
			for(int[] d:others.values()){
				doAdd(hero, d[0], d[2], reason,isNotice);
			}
		}
		if (itemMap.size()>0) {
			for(Entry<Integer, Integer> entry:itemMap.entrySet()) {
				retList.add(new long[]{0, entry.getKey(), entry.getValue()});
//				// 功能玩法系统对获得物品后的特殊处理事件（如：加积分）
//				for (AbsAddHandleEvent ahEvent : UseAddCache.funcAddHandleEventList) {
//					try {
//						ahEvent.addFunctionHandle(hero, GameConst.TOOL, entry.getKey(), entry.getValue());
//					} catch (Exception e) {
//						LogTool.error(e, UseAddUtil.class, hero.getId(), hero.getName(), "UseAddUtil addFunctionHandle");
//					}
//				}
			}
		}
		if (toolEquipList != null) {
			int[][] te = new int[toolEquipList.size()][];
			toolEquipList.toArray(te);
			List<long[]> tempList = UseAddCache.getEvent(UseAddCache.BAG_TYPE).add(hero, te,reason,sendMail,isNotice);
			if(tempList != null && !tempList.isEmpty()){
				retList.addAll(tempList);
			}
		}
		// 功能玩法系统对获得道具后的特殊处理事件
		for (Entry<Integer, Integer> entry : itemMap.entrySet()) {
			for (AbsAddHandleEvent ahEvent : UseAddCache.funcAddHandleEventList) {
				try {
					ahEvent.addFunctionHandle(hero, GameConst.TOOL, entry.getKey(), entry.getValue());
				} catch (Exception e) {
					LogTool.error(e, UseAddUtil.class, hero.getId(), hero.getName(),
							"UseAddUtil add tool" + " itemId:" + entry.getKey() + " num:" + entry.getValue());
				}
			}
		}
		return retList;
	}
	/**
	 * 增加
	 * @param data excel配置表格式:int[][],格式对应为[type,id,num][type,id,num]，若不是道具和装备为[type,0,num][type,0,num]，如果提前指定附加属性的话格式为[type,0,num,addAtt][type,0,num,addAtt]
	 * @param reason 操作原因，用于流水记录
	 * @param sendMail 若有包含道具装备，是否背包满了发邮件，传入MailInfo对象，若想使用默认邮件提醒：由于背包已满，你所得的物品通过附件发送给你，请注意查收。调用UseAddUtil.getDefaultMail()方法。
	 * @param isNotice 是否需要客户端提示属性改变
	 * @param	jianKongID	监控ID，不监控填0，叫策划配表，不懂就问离水大大佬要不要监控
	 * @return 返回放入背包的道具与装备数据（用于合服寻宝）
	 */
	public static List<long[]> addJK(Hero hero,int[][] data,int reason,MailInfo sendMail,boolean isNotice, int jianKongID){
		List<long[]> add = add(hero, data, reason, sendMail, isNotice);
		RestrictedAccessUtil.use(hero, jianKongID, 1);
		return add;
	}
	
	/**
	 * 其他只记录流水的数值添加
	 * @author lobbyer
	 * @param hero
	 * @param type 类型
	 * @param resultNum 处理后的总数
	 * @param changeNum 改变数
	 * @param reason 操作类型
	 * @param isNotice true通知前端
	 * @date 2016年3月23日
	 */
	public static void add(Hero hero,int type,int resultNum,int changeNum,int reason,boolean isNotice){
		if(changeNum<=0) return;
		AbsUseAddEvent event = UseAddCache.getEvent(type);
		long currentNum = resultNum;
		//刷新前端
				//推送属性改变
		if(type != UseAddCache.BAG_TYPE){
			String typeStr = GameConst.huobiMap.get(type);
			if(typeStr == null){
				LogTool.warn("GameConst.huobiMap can not find1,type:"+type, UseAddUtil.class);
			}else{
				HeroFunction.getIns().sendChange120(hero, typeStr, currentNum);
			}
//			NettyWrite.writeXData(hero.getId(), HeroCmd.GC_RetChange_118, dataMap);
		}
//		NettyWrite.writeData(hero.getId(), GlobalCmd.GC_GcSysEvent_508, new GcSysEventResp(1, type, currentNum, 0));
		if(isNotice){
//			NettyWrite.writeData(hero.getId(), GlobalCmd.GC_GcSysEvent_508, new GcSysEventResp(1, type, changeNum, resultNum));
		}
		//弹出使用提醒 统一
		//返回剩余值(货币) 统一
		//加入使用警告 统一
		//加入流水 impl
		event.flowRecBase(hero, changeNum, resultNum, true, reason);
		//插入其他系统代码 impl
		event.addInsertCode(hero,changeNum,resultNum);
		//检查货币监控
//		FlowJianKongEvent.checkMoney(hero, type, currentNum, reason);
	}
	
	public static void doAdd(Hero hero,int type,int num,int reason,boolean isNotice){
		if(num<=0) return;
		AbsUseAddEvent event = UseAddCache.getEvent(type);
		//特殊处理体力，判断是否溢出计算
		/*if(type == GameConst.PH){
			if(bind == 0){
				//元宝购买或体力药，则不计算到溢出的体力，需继续增加体力值，表现为700/600
				//增加侠客令、美味佳肴、帮会领取体力超过上限可溢出，20160407，hepl
				if(reason == SourceGoodConst.INCOME_BUY_VIGOR || reason == SourceGoodConst.USE_MATERIAL ||
						reason == SourceGoodConst.INCOME_VIGOR_DELICIOUS || reason == SourceGoodConst.INCOME_XIAKELING_VIGOR ||
						reason == SourceGoodConst.INCOME_VIGOR_GANG||reason==SourceGoodConst.USE_VIGOR_MODUP){
					bind = 1;
				}
			}
		}*/
		long currentNum = event.add(hero,num,0);
		//刷新前端
				//推送属性改变
		if(type != UseAddCache.BAG_TYPE){
			String typeStr = GameConst.huobiMap.get(type);
			if(typeStr == null){
				LogTool.warn("GameConst.huobiMap can not find3,type:"+type, UseAddUtil.class);
			}else{
				HeroFunction.getIns().sendChange120(hero, typeStr, currentNum);
			}
//			NettyWrite.writeXData(hero.getId(), HeroCmd.GC_RetChange_118, dataMap);
		}
		if(isNotice){
			GlobalSender.sendCmd_254(hero.getId(), 1, type, 0, num);
		}
		//弹出使用提醒 统一
		//返回剩余值(货币) 统一
		//加入使用警告 统一
		//加入流水 impl
		event.flowRecBase(hero, num, 0, true, reason);
		//插入其他系统代码 impl
		event.addInsertCode(hero,num,0);
		//检查货币监控
		FlowJianKongEvent.checkMoney(hero, type, currentNum, num, reason);
		// 功能玩法系统对获得物品后的特殊处理事件（如：加积分）
		for (AbsAddHandleEvent ahEvent : UseAddCache.funcAddHandleEventList) {
			try {
				ahEvent.addFunctionHandle(hero, type, 0, num);
			} catch (Exception e) {
				LogTool.error(e, UseAddUtil.class, hero.getId(), hero.getName(), "UseAddUtil addFunctionHandle");
			}
		}
	}
	/**
	 * 默认邮件提醒
	 * @return
	 */
	public static MailInfo getDefaultMail(){
		return new MailInfo(MailConst.MAIL_ID_SYSTEM, new Object[]{MailConst.MAIL_ID_SYSTEM});
	}
	/**
	 * 绑定元宝 买到绑定道具 元宝买到非绑定道具(商城 ，寻宝)
	 * @param hero
	 * @param type 购买方式
	 * @param id 道具id
	 * @param num 购买数量
	 * @param goodtype 物品类型
	 * @param cost 单价
	 * @param reasonUse
	 * @param reasonAdd
	 */
	public static void useAndAdd(Hero hero,int type,int id,int num,int goodtype,int cost,int reasonUse, int reasonAdd){
		if (canUse(hero,  type, cost*num)) {
			use(hero, type, cost*num, reasonUse);
			add(hero, goodtype, num, id, UseAddUtil.getDefaultMail(), reasonAdd, true);
		}
	}
	
	/**
	 * 判断能否添加装备进背包
	 * @author lobbyer
	 * @param hero
	 * @param data [装备唯一id,系统id,数量]
	 * @param sendMail
	 * @return
	 * @date 2017年3月31日
	 */
	public static boolean canAddEquip(Hero hero,long[][] data,boolean sendMail) {
		if(sendMail) return true;
		int size = 0;
		for(long[] good:data) {
			size += good[2];
		}
		int emptyGrid = BagFunction.getIns().getEquipEmptyGrid(hero, null);
		if(emptyGrid < size) return false;
		return true;
	}
	
	/**
	 * 判断能否添加装备进背包
	 * @author lobbyer
	 * @param hero
	 * @param uid 装备唯一id
	 * @param sendMail
	 * @return
	 * @date 2017年3月31日
	 */
	public static boolean canAddEquip(Hero hero,int num,boolean sendMail) {
		if(sendMail) return true;
		int emptyGrid = BagFunction.getIns().getEquipEmptyGrid(hero, null);
		if(emptyGrid < num) return false;
		return true;
	}
	
	/**
	 * 装备添加到背包，更改装备状态为在背包中
	 * @author lobbyer
	 * @param hero
	 * @param data[long:唯一id,int:系统sysId]
	 * @param reason 添加途径
	 * @param sendMail 背包不够是否发送邮件
	 * @param notice 是否提示背包不足
	 * @date 2017年3月30日
	 */
	public static void addEquip(Hero hero, long[][] data, int reason, MailInfo sendMail, boolean notice) {
		AbsUseAddEvent event = UseAddCache.getEvent(UseAddCache.BAG_TYPE);
		event.addEquip(hero, data, reason, sendMail, notice);
	}

	/**
	 * 判断是否能添加已有装备入背包
	 * @author lobbyer
	 * @param hero
	 * @param ids 装备唯一id集合
	 * @param reason 添加途径
	 * @return true可以 false背包不足
	 * @date 2017年3月30日
	 */
	public static boolean canUseEquip(Hero hero, List<Long> ids, int reason) {
		AbsUseAddEvent event = UseAddCache.getEvent(UseAddCache.BAG_TYPE);
		return event.canUseEquip(hero, ids, reason);
	}
	
	public static boolean canUseEquip(Hero hero, long uid, int reason) {
		List<Long> ids = new ArrayList<Long>();
		ids.add(uid);
		return canUseEquip(hero, ids, reason);
	}

	/**
	 * 使用背包装备
	 * @author lobbyer
	 * @param hero
	 * @param ids 装备唯一id集合
	 * @param canDel true删除装备缓存 false只拿出装备
	 * @param reaso n 使用途径
	 * @param notice 是否提示物品使用信息
	 * @return
	 * @date 2017年3月30日
	 */
	public static boolean useEquip(Hero hero, List<Long> ids, boolean canDel, int reason, boolean notice) {
		AbsUseAddEvent event = UseAddCache.getEvent(UseAddCache.BAG_TYPE);
		return event.useEquip(hero, ids, canDel, reason, notice);
	}
	/**
	 * 使用背包装备
	 * @author lobbyer
	 * @param hero
	 * @param ids 装备唯一id集合
	 * @param canDel true删除装备缓存 false只拿出装备
	 * @param reaso n 使用途径
	 * @param notice 是否提示物品使用信息
	 * @return
	 * @date 2017年3月30日
	 */
	public static boolean useEquip(Hero hero, long uid, boolean canDel, int reason, boolean notice) {
		List<Long> ids = new ArrayList<Long>();
		ids.add(uid);
		return useEquip(hero, ids, canDel, reason, notice);
	}
	
	/**
	 * 能否添加到仓库
	 * @param hero hero
	 * @param data excel配置表格式:int[][],格式对应为[type,id,num][type,id,num]，只能是道具或装备
	 * @return true为能添加，false为不能添加
	 */
	public static boolean canAddToStore(Hero hero,int[][] data){
		synchronized (hero) {
			List<int[]> toolEquip = null;
			for(int[] d:data){
				if(d[0]==GameConst.TOOL || d[0]==GameConst.EQUIP){
					//道具或者装备
					if(toolEquip==null){
						toolEquip = new ArrayList<>();
					}
					toolEquip.add(d);
				}
			}
			if(toolEquip!=null){
				int[][] te = new int[toolEquip.size()][];
				toolEquip.toArray(te);
				if(!UseAddCache.getEvent(UseAddCache.STORE_TYPE).canAdd(hero, te, false)){
					return false;
				}
			}
			return true;
		}
	}
	
	/**
	 * 添加物品到仓库（新创建的物品）
	 * @param hero
	 * @param type
	 * @param num
	 * @param id
	 * @param reason
	 * @param isNotice
	 */
	public static List<long[]> addToStore(Hero hero,int type,int num,int id,int reason,boolean isNotice){
		int[][] data = new int[1][];
		data[0] = new int[]{type,id,num};
		return addToStore(hero, data, reason, isNotice);
	}
	
	/**
	 * 添加物品到仓库（新创建的物品）
	 * @param hero
	 * @param data
	 * @param reason
	 * @param isNotice
	 */
	public static List<long[]> addToStore(Hero hero,int[][] data,int reason,boolean isNotice){
		List<long[]> list = UseAddCache.getEvent(UseAddCache.STORE_TYPE).addToStore(hero, data,reason,null,isNotice);
		return list;
	}
}
