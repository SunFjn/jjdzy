package com.teamtop.houtaiHttp.events.exclusiveActivity;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossZone;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossBaseOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.exclusiveActivity.AbsExclusiveActivityManager;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.ExclusiveActivitySender;
import com.teamtop.system.exclusiveActivity.ExclusiveActivitySysCache;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.excel.ConfigBase;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zshdb_315;
import excel.struct.Struct_zshdb_315;
import io.netty.channel.ChannelHandlerContext;

public class ExclusiveActivityHttpEvent extends AbsHouTaiHttpEvent {

	private static ExclusiveActivityHttpEvent ins;

	private ExclusiveActivityHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExclusiveActivityHttpEvent getIns() {
		if (ins == null) {
			ins = new ExclusiveActivityHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		int actId = -1;
		int opType = -1;
		try {
			String opTypeStr = paramMap.get("opType");// 操作类型
			String actIdStr = paramMap.get("actId");// 活动id
			String paramStr = paramMap.get("params");// 配置表参数;
			String valueStr = paramMap.get("value");// 配置表数据;
			if (CommonUtil.isNull(opTypeStr) && CommonUtil.isNull(actIdStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			actId = Integer.parseInt(actIdStr);
			opType = Integer.parseInt(opTypeStr);
			int tempActId = actId;
			int tempOpTyp = opType;
			OpTaskExecutorService.PublicOrderService.execute(new CrossBaseOpTaskRunnable() {

				@Override
				public void run() {
					handle(paramMap, ctx, tempActId, tempOpTyp, paramStr, valueStr);
				}

				@Override
				public Object getSession() {
					return OpTaskConst.CROSS_BASE_OP;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityHttpEvent.class,
					"ExclusiveActivityHttpEvent fail, actId=" + actId + ", opType=" + opType);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	public void handle(Map<String, String> paramMap, ChannelHandlerContext ctx, int actId, int opType, String paramStr,
			String valueStr) {
		try {
			ConfigBase tempConfig = null;
			if(opType==1) {
				Config_zshdb_315 ins = Config_zshdb_315.getIns();
				Type typeValue = new TypeReference<List<List<Object>>>() {
				}.getType();
				List<List<Object>> valueLists = JSONObject.parseObject(valueStr, typeValue);
				List<Struct_zshdb_315> sortList = new ArrayList<>();
				for (List<Object> valueList : valueLists) {
					Object[] objs = new Object[valueList.size()];
					valueList.toArray(objs);
					// int id,String wdid,String fwq,String vip,int type,int hdid,int qs,String
					// hstart,String hend
					Struct_zshdb_315 struct = new Struct_zshdb_315((Integer) objs[0], (String) objs[1],
							(String) objs[2], (String) objs[3], (Integer) objs[4], (Integer) objs[5], (Integer) objs[6],
							(String) objs[7], (String) objs[8], (String) objs[9], (String) objs[10]);
					sortList.add(struct);
					ins.getMap().put(struct.getId(), struct);
				}
				ins.getSortList().clear();
				ins.getSortList().addAll(ins.getMap().values());
				tempConfig = ins;
				if (!CrossZone.isCrossServer()) {
					// 重新初始化
					ExclusiveActivitySysCache.houtaiInitExcel();
					Map<Long, Hero> heroMap = HeroCache.getHeroMap();
					for (Hero hero : heroMap.values()) {
						if (hero.isOnline()) {
							// 更新表数据
							ExclusiveActivityFunction.getIns().updateExAct(hero);
						}
					}
					// 定时检测活动状态
					ExclusiveActivityFunction.getIns().checkActTime();
					// 是否有活动结束
					ExclusiveActivityFunction.getIns().checkExActEnd();
					// 是否有活动开启
					ExclusiveActivityFunction.getIns().checkActOpenInitExcel();
				}
			}else if(opType==2){				
				Class<?> structClazz = ExclusiveActivitySysCache.getExActStructMap().get(actId);
				Class<?> configClazz = ExclusiveActivitySysCache.getExActConfigMap().get(actId);
				Type pType = new TypeReference<List<String>>() {}.getType();
				List<String> pList = JSONObject.parseObject(paramStr, pType);
				
				Type typeValue = new TypeReference<List<List<Object>>>() {}.getType();
				List<List<Object>> valueLists = JSONObject.parseObject(valueStr, typeValue);
				
				Method insMethod = configClazz.getMethod("getIns");
				// ConfigBase config = (ConfigBase) insMethod.invoke(configClazz);// config
				ConfigBase newConfig = ExclusiveActivitySysCache.getExActConfigInsMap().get(actId);
				newConfig.getMap().clear();
				List<Object> sortList = new ArrayList<Object>();
				for (List<Object> valueList : valueLists) {
					Object[] objs = new Object[valueList.size()];
					valueList.toArray(objs);
					Constructor<?>[] declaredConstructors = structClazz.getDeclaredConstructors();
					Object obj = declaredConstructors[0].newInstance(objs);// struct
					Object key = valueList.get(0);
//					for (int i = 0; i < valueList.size(); i++) {
//						Method setMethod = methodMap.get(i);
//						if (setMethod == null) {
//							Field field = structClazz.getField(pList.get(i));
//							PropertyDescriptor pd = new PropertyDescriptor(field.getName(), structClazz);
	//
//							setMethod = pd.getWriteMethod();// 获得set方法
//							methodMap.put(i, setMethod);
//						}
//						Object valueObj = valueList.get(i);
//						setMethod.invoke(obj, valueObj);
//					}
					// config.getMap().put(key, obj);
					if (!newConfig.getMap().containsKey(key)) {
						sortList.add(obj);
					}
					newConfig.getMap().put(key, obj);
				}
				// newConfig.getMap().putAll(config.getMap());
				newConfig.getSortList().clear();
				newConfig.getSortList().addAll(sortList);
				ExclusiveActivitySysCache.getExActConfigInsMap().put(actId, newConfig);
				LogTool.info("ExclusiveActivityHttpEvent newConfig" + newConfig.getClass().getSimpleName() + ", size="
						+ newConfig.getSortList().size(), ExclusiveActivityHttpEvent.class);
				tempConfig = newConfig;
				if (!CrossZone.isCrossServer()) {
					// 重新初始化
					AbsExclusiveActivityManager manager = ExclusiveActivitySysCache.getExActManagerMap().get(actId);
					manager.houtaiInitExcel();
					Map<Long, Hero> heroMap = HeroCache.getHeroMap();
					for (Hero hero : heroMap.values()) {
						if (hero.isOnline()) {
							// 更新表数据
							manager.updateTable(hero);
						}
					}
				}
			} else if (opType == 3) {
				if (!CrossZone.isCrossServer()) {
					Map<Integer, Struct_zshdb_315> map = Config_zshdb_315.getIns().getMap();
					// 不另外添加后台参数，所以唯有id通过actId发过来
					int id = actId;
					if (map.containsKey(id)) {
						Map<Integer, ExclusiveActivityInfo> openExActMap = ExclusiveActivitySysCache.getOpenExActMap();
						ExclusiveActivityInfo activityInfo = openExActMap.get(id);
						if (activityInfo != null) {
							activityInfo.setState(0);
							Map<Long, Hero> heroMap = HeroCache.getHeroMap();
							for (Hero hero : heroMap.values()) {
								if (hero.isOnline()) {
									// 开启
									ExclusiveActivitySender.sendCmd_7902(hero.getId(), id, activityInfo.getStartTime(),
											activityInfo.getEndTime(), 1);
								}
							}
						}
					}
				}
			} else if (opType == 4) {
				Map<Integer, Struct_zshdb_315> map = Config_zshdb_315.getIns().getMap();
				// 不另外添加后台参数，所以唯有id通过actId发过来
				if (!CrossZone.isCrossServer()) {
					int id = actId;
					if (map.containsKey(id)) {
						Map<Integer, ExclusiveActivityInfo> openExActMap = ExclusiveActivitySysCache.getOpenExActMap();
						ExclusiveActivityInfo activityInfo = openExActMap.get(id);
						if (activityInfo != null) {
							activityInfo.setState(1);
							Map<Long, Hero> heroMap = HeroCache.getHeroMap();
							for (Hero hero : heroMap.values()) {
								if (hero.isOnline()) {
									// 关闭
									ExclusiveActivitySender.sendCmd_7902(hero.getId(), id, activityInfo.getStartTime(),
											activityInfo.getEndTime(), 0);
								}
							}
						}
					}
				}
			}
			// 同步到子服
			if (CrossZone.isCrossServer()) {
				ExclusiveActivityHoutaiIO.getIns().setExActDataCL(opType, actId, tempConfig);
				LogTool.info("ExclusiveActivityHttpEvent setExActDataCL", ExclusiveActivityHttpEvent.class);
			}
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityHttpEvent.class,
					"ExclusiveActivityHttpEvent fail, actId=" + actId + ", opType=" + opType);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	public static void main(String[] args) {
		try {
			ExclusiveActivitySysCache.initExActStruct();
			ExclusiveActivitySysCache.initExActConfig();
			int actId = 7102;
			JSONObject jobj = new JSONObject();
			List<String> list = new ArrayList<>();
			list.add("xh");
			list.add("qs");
			list.add("je");
			list.add("jl");
			list.add("cs");
			String paramStr = JSON.toJSONString(list);
			List<List<Object>> allList = new ArrayList<>();
			List<Object> vList = new ArrayList<>();
			vList.add(1001);
			vList.add(1);
			vList.add(6);
			vList.add("[[4,0,111],[1,414001,1],[1,411001,48]]");
			vList.add(5);
			allList.add(vList);
			String valueStr = JSON.toJSONString(allList);
			Class<?> structClazz = ExclusiveActivitySysCache.getExActStructMap().get(actId);
			Class<?> configClazz = ExclusiveActivitySysCache.getExActConfigMap().get(actId);
			Type pType = new TypeReference<List<String>>() {
			}.getType();
			List<String> pList = JSONObject.parseObject(paramStr, pType);
			Type typeValue = new TypeReference<List<List<Object>>>() {
			}.getType();
			List<List<Object>> valueLists = JSONObject.parseObject(valueStr, typeValue);
			Map<Integer, Method> methodMap = new HashMap<Integer, Method>();
			Method insMethod = configClazz.getMethod("getIns");
			ConfigBase config = (ConfigBase) insMethod.invoke(configClazz);// config
			List<Object> sortList = new ArrayList<Object>();
			for (List<Object> valueList : valueLists) {
				Object[] objs = new Object[valueList.size()];
				valueList.toArray(objs);
				Constructor<?>[] declaredConstructors = structClazz.getDeclaredConstructors();
				Object obj = declaredConstructors[0].newInstance(objs);// struct
				Object key = valueList.get(0);
//				for (int i = 0; i < valueList.size(); i++) {
//					Method setMethod = methodMap.get(i);
//					if (setMethod == null) {
//						Field field = structClazz.getField(pList.get(i));
//						PropertyDescriptor pd = new PropertyDescriptor(field.getName(), structClazz);
//
//						setMethod = pd.getWriteMethod();// 获得set方法
//						methodMap.put(i, setMethod);
//					}
//					Object valueObj = valueList.get(i);
//					setMethod.invoke(obj, valueObj);
//				}
				sortList.add(obj);
				config.getMap().put(key, obj);
			}
			config.getSortList().addAll(sortList);
			ExclusiveActivitySysCache.getExActConfigInsMap().put(actId, config);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
