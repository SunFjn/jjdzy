package com.teamtop.houtaiHttp.events.mail;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_daoju_204;
import excel.config.Config_lunhui_274;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_lunhui_274;
import excel.struct.Struct_zhuangbei_204;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class MailCrossIO {

	private static MailCrossIO mailCrossIO;

	private MailCrossIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MailCrossIO getIns() {
		if (mailCrossIO == null) {
			mailCrossIO = new MailCrossIO();
		}
		return mailCrossIO;
	}

	/** 中央服通知子服发送个人邮件 */
	public void sendPersonalMail(int playerType, String[] heroList, String title, String content, String goods,
			int zoneid, ChannelHandlerContext ctx) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(MailCrossEnum.playerType, playerType);
			crossData.putObject(MailCrossEnum.heroList, heroList);
			crossData.putObject(MailCrossEnum.title, title);
			crossData.putObject(MailCrossEnum.content, content);
			crossData.putObject(MailCrossEnum.goods, goods);
			crossData.putObject(MailCrossEnum.zoneid, zoneid);
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			Set<Integer> zoneids = new HashSet<>(zoneidToChannel.keySet());
			Iterator<Integer> iterator = zoneids.iterator();
			if (zoneid == 0) {
				for (; iterator.hasNext();) {
					zoneid = iterator.next();
					Channel channel = zoneidToChannel.get(zoneid);
					crossData.putObject(MailCrossEnum.zoneid, zoneid);
					NettyWrite.writeXData(channel, CrossConst.SEND_PERSONAL_MAIL, crossData);
				}
				HoutaiResponseUtil.responseSucc(ctx);
			} else {
				Channel channel = zoneidToChannel.get(zoneid);
				NettyWrite.writeXData(channel, CrossConst.SEND_PERSONAL_MAIL, crossData, new Callback() {

					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						List<String> list = crossData.getObject(MailCrossEnum.failHeroList, new TypeReference<List<String>>() {}.getType());
						if (list == null) {
							return;
						}
						if (list.size() == 0) {
							HoutaiResponseUtil.responseSucc(ctx);
						} else {
							String message = "玩家邮件局部发送成功";
							JSONObject data = new JSONObject();
							data.put("playerType", playerType);
							data.put("title", title);
							data.put("cond", list);
							HoutaiResponseUtil.responseFail(true, HoutaiConst.SendBack_Code_5006, message, data, ctx);
						}
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, MailCrossIO.class, "MailCrossIO sendPersonalMail fail! title=" + title + ", content="
					+ content + ", playerType=" + playerType + ", heroList=" + heroList.toString());
		}
	}

	/** 接收中央服数据发送个人邮件 */
	public void sendPersonalMailHandle(Channel channel, CrossData crossData) {
		try {
			int playerType = crossData.getObject(MailCrossEnum.playerType, Integer.class);
			String[] heroList = crossData.getObject(MailCrossEnum.heroList, String[].class);
			String title = crossData.getObject(MailCrossEnum.title, String.class);
			String content = crossData.getObject(MailCrossEnum.content, String.class);
			String goods = crossData.getObject(MailCrossEnum.goods, String.class);
			int zoneid = crossData.getObject(MailCrossEnum.zoneid, Integer.class);
			int[][] fujian = null;
			if (goods != null && (!"".equals(goods))) {
				fujian = getFujian(goods);
			}
			if (fujian == null) {
				fujian = new int[0][];
			}
			List<String> asList = new ArrayList<>(Arrays.asList(heroList));
			if (heroList != null) {
				for (String heroStr : heroList) {
					try {
						long hid = getHeroId(playerType, heroStr, zoneid);
						if (hid == 0) {
							continue;
						}
						MailFunction.getIns().sendMailWithFujianData2(hid, 0, title, content, fujian);
						asList.remove(heroStr);
					} catch (Exception e) {
						LogTool.error(e, MailCrossIO.class, "MailCrossIO heroStr=" + heroStr);
					}
				}
				crossData.putObject(MailCrossEnum.failHeroList, asList);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			}
		} catch (Exception e) {
			LogTool.error(e, MailCrossIO.class, "MailCrossIO sendPersonalMailHandle");
		}
	}

	/**
	 * 获取玩家id
	 */
	public long getHeroId(int playerType, String heroStr, int zoneid) {
		Long hid = 0L;
		try {
			// 1角色名，2角色id，3平台账号
			switch (playerType) {
			case 1:
				hid = HeroDao.getIns().getHidByName(heroStr, zoneid);
				break;
			case 2:
				hid = Long.parseLong(heroStr);
				break;
			case 3:
				hid = HeroDao.getIns().findHidByOpenid(heroStr, zoneid);
				break;

			default:
				break;
			}
		} catch (Exception e) {
			LogTool.error(e, MailCrossIO.class, "getHeroId fail");
		}
		if (hid == null) {
			hid = 0L;
		}
		return hid;
	}

	public int[][] getFujian(String goods) {
		String[] arrs = goods.split(";");
		int[][] fujian = new int[arrs.length][];
		int type = 0;
		int id = 0;
		for (int i = 0; i < arrs.length; i++) {
			String[] arr = arrs[i].split(",");
			int value = Integer.parseInt(arr[0]);
			if (value > 100) {
				// 道具或装备
				id = value;
				Struct_zhuangbei_204 equip = Config_zhuangbei_204.getIns().get(id);
				if (equip != null) {
					type = GameConst.EQUIP;
				} else {
					Struct_daoju_204 tool = Config_daoju_204.getIns().get(id);
					if (tool != null) {
						type = GameConst.TOOL;
					}
				}
			} else {
				type = value;
				id = 0;
			}
			fujian[i] = new int[] { type, id, Integer.parseInt(arr[1]) };
		}
		return fujian;
	}

	/** 中央服通知子服发送区服邮件 */
	public boolean sendZoneMail(List<Integer> zoneidList, String title, String content, String lvStr,
			String strengthStr, String moneyStr, String goods) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(MailCrossEnum.title, title);
			crossData.putObject(MailCrossEnum.content, content);
			crossData.putObject(MailCrossEnum.lvStr, lvStr);
			crossData.putObject(MailCrossEnum.strengthStr, strengthStr);
			crossData.putObject(MailCrossEnum.moneyStr, moneyStr);
			crossData.putObject(MailCrossEnum.goods, goods);
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			int zoneid = 0;
			int size = zoneidList.size();
			if (size == 0) {
				zoneidList = new ArrayList<>(zoneidToChannel.keySet());
				size = zoneidList.size();
			}
			for (int i = 0; i < size; i++) {
				zoneid = zoneidList.get(i);
				Channel channel = zoneidToChannel.get(zoneid);
				if (channel != null) {
					crossData.putObject(MailCrossEnum.zoneid, zoneid);
					NettyWrite.writeXData(channel, CrossConst.SEND_ZONE_MAIL, crossData);
				}
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, MailCrossIO.class, "MailCrossIO sendZoneMail fail, zoneidList=" + zoneidList.toString());
		}
		return false;
	}

	/** 收到中央服通知发送区服邮件 */
	public void sendZoieMailHandle(Channel channel, CrossData crossData) {
		try {
			String title = crossData.getObject(MailCrossEnum.title, String.class);
			String content = crossData.getObject(MailCrossEnum.content, String.class);
			String lvStr = crossData.getObject(MailCrossEnum.lvStr, String.class);
			String strengthStr = crossData.getObject(MailCrossEnum.strengthStr, String.class);
			String moneyStr = crossData.getObject(MailCrossEnum.moneyStr, String.class);
			String goods = crossData.getObject(MailCrossEnum.goods, String.class);
			int zoneid = crossData.getObject(MailCrossEnum.zoneid, Integer.class);
			int minLvl = 0;
			int maxLvl = 0;
			if(!CommonUtil.isNull(lvStr)) {
				String[] arr = lvStr.split("_");
				minLvl = Integer.parseInt(arr[0]);
				maxLvl = Integer.parseInt(arr[1]);
			}
			long minStrength = 0;
			long maxStrength = 0;
			if(!CommonUtil.isNull(strengthStr)) {
				String[] arr = strengthStr.split("_");
				minStrength = Long.parseLong(arr[0]);
				maxStrength = Long.parseLong(arr[1]);
			}
			int minMoney = 0;
			int maxMoney = 0;
			if(!CommonUtil.isNull(moneyStr)) {
				String[] arr = moneyStr.split("_");
				minMoney = Integer.parseInt(arr[0]);// * RechargeConst.BaseYb;
				maxMoney = Integer.parseInt(arr[1]);// * RechargeConst.BaseYb;
			}
			int[][] fujianData = null;
			if(!CommonUtil.isNull(goods)) {
				fujianData = getFujian(goods);
			}
			Set<Long> onlinePlayers = new HashSet<>();
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				if (hero.getZoneid() != zoneid) {
					continue;
				}
				int level = hero.getRealLevel();
				if (maxLvl > 0 && level >= minLvl && level <= maxLvl) {
					long totalStrength = hero.getTotalStrength();
					if (maxStrength > 0 && totalStrength >= minStrength && totalStrength <= maxStrength) {
						long chongZhiYuan = hero.getChongZhiYuan();
						if (maxMoney > 0 && chongZhiYuan >= minMoney && chongZhiYuan <= maxMoney) {
							onlinePlayers.add(hero.getId());
						}
					}
				}
			}
			List<Long> hidList = HeroDao.getIns().findAllHidByConditions(zoneid, minLvl, maxLvl, minStrength, maxStrength, minMoney, maxMoney);
			List<HeroLevelInfo> hrList = HeroDao.getIns().findAllHidByConditionsLh(zoneid, minLvl, maxLvl, minStrength, maxStrength, minMoney, maxMoney);
			if (hidList == null && hrList == null) {
				return;
			}
			if (fujianData == null) {
				fujianData = new int[0][];
			}
			Set<Long> allPlayers = new HashSet<>();
			allPlayers.addAll(onlinePlayers);
			if(hidList != null) {				
				allPlayers.addAll(hidList);
			}
			if(hrList != null) {
				List<Long> selectList = new ArrayList<>();
				for(HeroLevelInfo hInfo : hrList) {
					int realLevel = getNowLevel(hInfo);
					if(maxLvl > 0 && realLevel >= minLvl && realLevel <= maxLvl) {						
						selectList.add(hInfo.getId());
					}
				}
				allPlayers.addAll(selectList);
			}
			//给满足条件的玩家发送邮件
			Long hid = 0L;
			Iterator<Long> iteratorPlayer = allPlayers.iterator();
			for (; iteratorPlayer.hasNext();) {
				hid = iteratorPlayer.next();
				if (hid == null) {
					continue;
				}
				MailFunction.getIns().sendMailWithFujianData2(hid, 0, title, content, fujianData);
			}
			// 暂不做返回
			// NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, MailCrossIO.class, "MailCrossIO sendZoieMailHandle fail");
		}
	}
	
	public int getNowLevel(HeroLevelInfo hInfo) {
		int level = hInfo.getLevel();
		int reincarnationLevel = hInfo.getReincarnationLevel();
		int totalAddLevel = 0;
		try {
			List<Struct_lunhui_274> sortList = Config_lunhui_274.getIns().getSortList();
			if(reincarnationLevel>0) {
				for(int i=reincarnationLevel;i>0;i--) {
					totalAddLevel += sortList.get(i-1).getLv();
				}
			}
		} catch (Exception e) {
			LogTool.info("Hero getRealLevel", this);
		}
		return level+totalAddLevel;
	}

	public static void main(String[] args) {
		List<Integer> zoneidList = new ArrayList<>();
		zoneidList.add(65);
		zoneidList.add(9);
		System.err.println(zoneidList.toString());
	}

}
