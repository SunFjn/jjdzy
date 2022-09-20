package com.teamtop.system.alarmSystem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConst;
import com.teamtop.houtaiHttp.events.serverEvent.setServerWarn.SetServerWarnFuntion;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mail.QQMail;
import com.teamtop.util.time.TimeDateUtil;

public class AlarmSystemFunction {
	/*
	 * （1）入库失败警报：数据库字段太长入库失败预警，预警知会人员包括研发技术，策划，运营、运维； （2）元宝铜币超出报警：
	 * A、身上元宝大于450万，并且大于等级充值总额5倍元宝数量； B、铜钱超过3千万。 以上两种情况都会预警知会人员包括研发技术，策划，运营；
	 * （3）服务器启动失败预警：服务器启动异常会进行预警，预警人员包括研发技术，运维、运营。
	 * （4）后台同步失败预警：开服后会同步后台相关数据，同步失败会进行预警，预警人员包括研发技术，运营。
	 * （5）充值发货失败预警：微端出现玩家充值不到账的情况会进行预警，预警人员包括研发技术，策划，运营，运维。
	 * （6）充值白名单充值预警：当内部充值白名单账号充值时会进行预警，方便监控异常订单充值情况，预警人员包括运营
	 * 
	 * 相关人员邮件详情如下： 发送人员
	 * 邮箱
	 * 研发策划
	 * 罗毅<luoyi@aaaa000.com>
	 * 研发前端
	 * 高明<gaoming@aaaa000.com>
	 * 研发后端
	 * 胡志鹏<huzhipeng@aaaa000.com>
	 * 运维
	 * 运维群组<yunwei@aaaa000.com>
	 * 运营
	 * 运营<yy@aaaa000.com>
	 * 客服
	 * 客服组<kefu@aaaa000.com>
	 */

	private static AlarmSystemFunction ins;

	private AlarmSystemFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized AlarmSystemFunction getIns() {
		if (ins == null) {
			ins = new AlarmSystemFunction();
		}
		return ins;
	}

	public void alarmSend(AlarmType alarmType, long hid, Object[] objs) {
		// if (!GameProperties.alarmFlag) {
			return;
		// }
//		if(alarmType==AlarmType.YB||alarmType==AlarmType.ONCE_YB||alarmType==AlarmType.COIN||alarmType==AlarmType.ONCE_COIN) {
//			return;
//		}
/*		Hero hero = null;
		try {
			if (hid > 0) {
				hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
			}
			List<String> mailAddressList = new ArrayList<>();
			Map<String, String> mailAddressMap = QQMail.getMailAddressMap();
			String title = "";
			StringBuilder content = new StringBuilder();
			content.append("平台：").append(GameProperties.platform).append("\n");
			content.append("区服：").append(GameProperties.getFirstZoneId()).append("\n");
			long currentTime = TimeDateUtil.getCurrentTimeInMillis();
			content.append("时间戳：").append(currentTime).append("\n");
			content.append("时间：").append(TimeDateUtil.getCurrentDateTimeStr("yyyy-MM-dd HH:mm:ss")).append("\n");
			switch (alarmType) {
			case SAVE_DB:
				if(!checkDBAlarm((String)objs[0], (String)objs[1])) {
					return;
				}
				title = "入库失败预警";
				content.append("table：").append(objs[0]).append(", column=").append(objs[1]).append("\n");
				mailAddressList.add(mailAddressMap.get(AlarmConst.LUO_YI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.GAO_MING));
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YUN_WEI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				break;
			case YB:
				if(!checkYBAlarm(hid)) {
					return;
				}
				long dailyYB = (long) objs[0];
				title = "元宝超出预警";
				content.append("玩家账号：").append(hero.getOpenid()).append("\n").append("玩家id：").append(hero.getId())
						.append("\n").append("玩家名称：").append(hero.getNameZoneid()).append("\n").append("总元宝：")
						.append(hero.getYuanbao()).append("\n").append("充值：").append(hero.getChongZhiYuan())
						.append("\n").append("今日获得元宝：").append(dailyYB).append("\n");
				mailAddressList.add(mailAddressMap.get(AlarmConst.LUO_YI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.GAO_MING));
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				break;
			case ONCE_YB:
				// if(!checkCoinAlarm(hid)) {
				// return;
				// }
				long onceYB = (long) objs[0];
				title = "单次元宝超出预警";
				content.append("玩家账号：").append(hero.getOpenid()).append("\n").append("玩家id：").append(hero.getId())
						.append("\n").append("玩家名称：").append(hero.getNameZoneid()).append("\n").append("单次获得元宝：")
						.append(onceYB).append("\n").append("总元宝：").append(hero.getYuanbao()).append("\n");
				mailAddressList.add(mailAddressMap.get(AlarmConst.LUO_YI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.GAO_MING));
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				break;
			case COIN:
				if(!checkCoinAlarm(hid)) {
					return;
				}
				long dailyCoin = (long) objs[0];
				title = "铜币超出预警";
				content.append("玩家账号：").append(hero.getOpenid()).append("\n").append("玩家id：").append(hero.getId())
						.append("\n").append("玩家名称：").append(hero.getNameZoneid()).append("\n").append("今日获得铜币：")
						.append(dailyCoin).append("\n").append("总铜币：").append(hero.getCoin()).append("\n");
				mailAddressList.add(mailAddressMap.get(AlarmConst.LUO_YI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.GAO_MING));
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				break;
			case ONCE_COIN:
				// if(!checkCoinAlarm(hid)) {
				// return;
				// }
				long onceCoin = (long) objs[0];
				title = "单次铜币超出预警";
				content.append("玩家账号：").append(hero.getOpenid()).append("\n").append("玩家id：").append(hero.getId())
						.append("\n").append("玩家名称：").append(hero.getNameZoneid()).append("\n").append("单次获得铜币：")
						.append(onceCoin).append("\n").append("总铜币：").append(hero.getCoin()).append("\n");
				mailAddressList.add(mailAddressMap.get(AlarmConst.LUO_YI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.GAO_MING));
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				break;
			case STARTUP_FAIL:
				title = "启服失败预警";
				mailAddressList.add(mailAddressMap.get(AlarmConst.GAO_MING));
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YUN_WEI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				break;
			case HOUTAI_SYN:
				title = "后台同步失败预警";
				content.append("后台同步失败").append("\n").append("失败原因：").append(objs[0]).append("\n");
				mailAddressList.add(mailAddressMap.get(AlarmConst.GAO_MING));
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				break;
			case RECHARGE_SEND:
				title = "充值发货失败预警";
				if (hero != null) {
					content.append("玩家账号：").append(hero.getOpenid()).append("\n").append("玩家id：").append(hero.getId())
							.append("\n").append("玩家名称：").append(hero.getNameZoneid()).append("\n");
				}
				content.append("充值订单号：").append(objs[0]).append("\n").append("错误信息：").append(objs[1]).append("\n");
				mailAddressList.add(mailAddressMap.get(AlarmConst.LUO_YI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.GAO_MING));
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				break;
			case WHITE_RECHARGE:
				title = "充值白名单充值预警";
				if (hero != null) {
					content.append("玩家账号：").append(hero.getOpenid()).append("\n").append("玩家id：").append(hero.getId())
							.append("\n").append("玩家名称：").append(hero.getNameZoneid()).append("\n");
				}
				content.append("充值订单号：").append(objs[0]).append("\n").append("充值money：").append(objs[1]).append("\n");
				mailAddressList.add(mailAddressMap.get(AlarmConst.LUO_YI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				//正式去掉
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				break;
			case SERVER_WARN:
				title = "服务器预警";
				List<M_ServerInfo> OpenList = SetServerWarnFuntion.getIns()
						.getServerNumByType(ServerInfoConst.OPEN_NOMAL);
				List<M_ServerInfo> OpenListHot = SetServerWarnFuntion.getIns()
						.getServerNumByType(ServerInfoConst.OPEN_HOT);
				OpenList.addAll(OpenListHot);
				List<M_ServerInfo> notOpenList = SetServerWarnFuntion.getIns()
						.getServerNumByType(ServerInfoConst.NOT_OPEN);
				content.append("已开的服：");
				for(int i=0;i<OpenList.size();i++) {
					M_ServerInfo m_ServerInfo = OpenList.get(i);
					content.append("id:").append(m_ServerInfo.getId()).append(" pf:")
					.append(m_ServerInfo.getPf()).append(" zoneid:").append(m_ServerInfo.getZoneid());
					if(i<OpenList.size()-1) {
						content.append(",");
					}
				}
				content.append("\n");
				content.append("备用服：");
				for(int i=0;i<notOpenList.size();i++) {
					M_ServerInfo m_ServerInfo = notOpenList.get(i);
					content.append("id:").append(m_ServerInfo.getId()).append(" pf:")
					.append(m_ServerInfo.getPf()).append(" zoneid:").append(m_ServerInfo.getZoneid());
					if(i<notOpenList.size()-1) {
						content.append(",");
					}
				}
				content.append("\n");
				mailAddressList.add(mailAddressMap.get(AlarmConst.LUO_YI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.GAO_MING));
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YUN_WEI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				break;
			case TOOL_WARN:
				Set<Integer> alarmSet = (Set<Integer>) objs[1];
				if (!checkToolAlarm(hid, alarmSet)) {
					return;
				}
				title = "背包道具预警";
				if (hero != null) {
					content.append("玩家账号：").append(hero.getOpenid()).append("\n").append("玩家id：").append(hero.getId())
							.append("\n").append("玩家名称：").append(hero.getNameZoneid()).append("\n");
				}
				content.append("道具信息：").append(objs[0]).append("\n");
				mailAddressList.add(mailAddressMap.get(AlarmConst.LUO_YI));
				// mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.LI_BI_JUN));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				// 正式去掉
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				break;
			case CROSS_ACT_WARN:
				title = "跨服活动异常预警";
				for(Object obj:objs) {
					Object[] objArray=(Object[])obj;
					int actId=(Integer)objArray[0];
					String tips=(String)objArray[1];
					int week=(Integer)objArray[2];
					content.append("异常的活动id：").append(actId).append(",提示：").append(tips).append(",星期：").append(week).append("\n");
				}
				mailAddressList.add(mailAddressMap.get(AlarmConst.LUO_YI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.GAO_MING));
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				mailAddressList.add(mailAddressMap.get(AlarmConst.LI_BI_JUN));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				break;
			case SELF_MOTION_CHECK_NUM:
				if (!checkPublicAlarm(alarmType)) {
					return;
				}
				title = "自动开服检查人数失败预警";
				content.append("区号：").append(objs[0]).append(", 当前人数：").append(objs[1]).append("\n");
				mailAddressList.add(mailAddressMap.get(AlarmConst.LUO_YI));
				mailAddressList.add(mailAddressMap.get(AlarmConst.YUN_WEI));
				// mailAddressList.add(mailAddressMap.get(AlarmConst.YY));
				mailAddressList.add(mailAddressMap.get(AlarmConst.LI_BI_JUN));
				mailAddressList.add(mailAddressMap.get(AlarmConst.NIE_YING_XIA));
				// 正式去掉
				mailAddressList.add(mailAddressMap.get(AlarmConst.HU_ZHI_PENG));
				break;
			default:
				break;
			}
			String gameName = "《" + GameProperties.platform + "》";
			QQMail.sendMail(gameName + title, content.toString(), mailAddressList);
		} catch (Exception e) {
			if (hero != null) {
				LogTool.error(e, AlarmSystemFunction.class, hero.getId(), hero.getName(),
						"AlarmSystemFunction alarmSend");
			} else {
				LogTool.error(e, AlarmSystemFunction.class, "AlarmSystemFunction alarmSend");
			}
		}*/
	}
	
	public boolean checkYBAlarm(long hid) {
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			Map<Long, Integer> ybAlarm = AlarmSysCache.getYbAlarm();
			Integer oldTime = ybAlarm.get(hid);
			if(oldTime==null) {
				oldTime = 0;
			}
			if(oldTime==0) {
				ybAlarm.put(hid, currentTime);
				return true;
			}else {
				int passTime = currentTime - oldTime;
				if(passTime>=AlarmConst.ALARM_TIME) {
					ybAlarm.put(hid, currentTime);
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, AlarmSystemFunction.class, "AlarmSystemFunction checkYBAlarm");
		}
		return false;
	}
	
	public boolean checkCoinAlarm(long hid) {
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			Map<Long, Integer> coinAlarm = AlarmSysCache.getCoinAlarm();
			Integer oldTime = coinAlarm.get(hid);
			if(oldTime==null) {
				oldTime = 0;
			}
			if(oldTime==0) {
				coinAlarm.put(hid, currentTime);
				return true;
			}else {
				int passTime = currentTime - oldTime;
				if(passTime>=AlarmConst.ALARM_TIME) {
					coinAlarm.put(hid, currentTime);
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, AlarmSystemFunction.class, "AlarmSystemFunction checkCoinAlarm");
		}
		return false;
	}
	
	public boolean checkToolAlarm(long hid, Set<Integer> alarmSet) {
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			Map<Long, Map<Integer, Integer>> toolAlarm = AlarmSysCache.getToolAlarm();
			Map<Integer, Integer> map = toolAlarm.get(hid);
			if (map == null) {
				map = new HashMap<>();
				toolAlarm.put(hid, map);
			}
			boolean check = true;
			for (int toolSysId : alarmSet) {
				Integer oldTime = map.get(toolSysId);
				if (oldTime == null) {
					oldTime = 0;
				}
				if (oldTime == 0) {
					map.put(toolSysId, currentTime);
				} else {
					int passTime = currentTime - oldTime;
					if (passTime >= AlarmConst.ALARM_TIME) {
						map.put(toolSysId, currentTime);
					} else {
						check = false;
					}
				}
			}
			return check;
		} catch (Exception e) {
			LogTool.error(e, AlarmSystemFunction.class, "AlarmSystemFunction checkToolAlarm");
		}
		return false;
	}

	public boolean checkDBAlarm(String table, String column) {
		try {
			Map<String, Set<String>> dbAlarm = AlarmSysCache.getDbAlarm();
			Set<String> set = dbAlarm.get(table);
			if(set==null) {
				set = new HashSet<>();
				dbAlarm.put(table, set);
			}
			if(!set.contains(column)) {
				set.add(column);
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, AlarmSystemFunction.class, "AlarmSystemFunction checkDBAlarm");
		}
		return false;
	}

	public boolean checkPublicAlarm(AlarmType type) {
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			Map<AlarmType, Integer> alarmLimitMap = AlarmSysCache.getAlarmLimitMap();
			Integer endTime = alarmLimitMap.get(type);
			if (endTime == null) {
				endTime = currentTime + AlarmSysCache.getAlarmTimeMap().get(type);
				alarmLimitMap.put(type, endTime);
				return true;
			}
			if (currentTime >= endTime) {
				endTime = currentTime + AlarmSysCache.getAlarmTimeMap().get(type);
				alarmLimitMap.put(type, endTime);
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, AlarmSystemFunction.class, "AlarmSystemFunction checkPublicAlarm");
		}
		return false;
	}

}
