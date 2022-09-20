package com.teamtop.houtaiHttp.events.exclusiveActivity;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.exclusiveActivity.AbsExclusiveActivityManager;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityConst;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.ExclusiveActivitySender;
import com.teamtop.system.exclusiveActivity.ExclusiveActivitySysCache;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.excel.ConfigBase;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zshdb_315;
import excel.struct.Struct_zshdb_315;
import io.netty.channel.Channel;

public class ExclusiveActivityHoutaiIO {

	private static ExclusiveActivityHoutaiIO ins;

	private ExclusiveActivityHoutaiIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExclusiveActivityHoutaiIO getIns() {
		if (ins == null) {
			ins = new ExclusiveActivityHoutaiIO();
		}
		return ins;
	}

	public void setExActDataCL(int opType, int actId, ConfigBase config) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(ExclusiveActivityHoutaiEnum.opType.name(), opType);
			crossData.putObject(ExclusiveActivityHoutaiEnum.actId.name(), actId);
			if (opType == 1 || opType == 2) {
				crossData.putObject(ExclusiveActivityHoutaiEnum.actData.name(), config);
			}
			Iterator<Channel> iterator = CrossCache.getChannelToZoneid().keySet().iterator();
			for (; iterator.hasNext();) {
				Channel channel = iterator.next();
				if (channel == null) {
					continue;
				}
				NettyWrite.writeXData(channel, CrossConst.EXCLUSIVE_ACT_SET, crossData);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "ExclusiveActivityHoutaiIO setExActDataCL");
		}
	}

	@SuppressWarnings("unchecked")
	public void setExActDataLocalHandel(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.EXCLUSIVE_ACT_SET;
			int opType = crossData.getObject(ExclusiveActivityHoutaiEnum.opType.name(), Integer.class);
			int actId = crossData.getObject(ExclusiveActivityHoutaiEnum.actId.name(), Integer.class);
			if(opType==1){
				Config_zshdb_315 tempConfig = (Config_zshdb_315) crossData.getObject(ExclusiveActivityHoutaiEnum.actData.name(), Config_zshdb_315.class);
				// tempConfig.getMap().clear();
				Config_zshdb_315 config_zshdb_315 = Config_zshdb_315.getIns();
				config_zshdb_315.getSortList().clear();
				config_zshdb_315.getMap().putAll(tempConfig.getMap());
				config_zshdb_315.getSortList().addAll(config_zshdb_315.getMap().values());
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
			} else if (opType == 2) {
				Class clazz = ExclusiveActivitySysCache.getExActConfigMap().get(actId);
				ConfigBase tempConfig = (ConfigBase) crossData.getObject(ExclusiveActivityHoutaiEnum.actData.name(), clazz);
				ConfigBase configBase = ExclusiveActivitySysCache.getExActConfigInsMap().get(actId);
				configBase.getMap().clear();
				configBase.getSortList().clear();
				configBase.getMap().putAll(tempConfig.getMap());
				configBase.getSortList().addAll(configBase.getMap().values());
				AbsExclusiveActivityManager manager = ExclusiveActivitySysCache.getExActManagerMap().get(actId);
				manager.houtaiInitExcel();
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				for (Hero hero : heroMap.values()) {
					if (hero.isOnline()) {
						// 更新表数据
						manager.updateTable(hero);
					}
				}
			} else if (opType == 3) {// 开启
				Map<Integer, Struct_zshdb_315> map = Config_zshdb_315.getIns().getMap();
				// 不另外添加后台参数，所以唯有id通过actId发过来
				int id = actId;
				if (map.containsKey(id)) {
					Map<Integer, ExclusiveActivityInfo> openExActMap = ExclusiveActivitySysCache.getOpenExActMap();
					ExclusiveActivityInfo activityInfo = openExActMap.get(id);
					if (activityInfo != null) {
						activityInfo.setState(ExclusiveActivityConst.STATE_OPEN);
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
			} else if (opType == 4) {// 关闭
				Map<Integer, Struct_zshdb_315> map = Config_zshdb_315.getIns().getMap();
				// 不另外添加后台参数，所以唯有id通过actId发过来
				int id = actId;
				if (map.containsKey(id)) {
					Map<Integer, ExclusiveActivityInfo> openExActMap = ExclusiveActivitySysCache.getOpenExActMap();
					ExclusiveActivityInfo activityInfo = openExActMap.get(id);
					if (activityInfo != null) {
						activityInfo.setState(ExclusiveActivityConst.STATE_CLOSE);
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
		} catch (Exception e) {
			LogTool.error(e, this, "ExclusiveActivityHoutaiIO setExActDataLocalHandel");
		}
	}

}
