package com.teamtop.houtaiHttp.qqGift;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class QqGiftLocalIo {
	
	private static QqGiftLocalIo qqGiftLocalIo;

	private QqGiftLocalIo() {
		
	}

	public static synchronized QqGiftLocalIo getIns() {
		if (qqGiftLocalIo == null) {
			qqGiftLocalIo = new QqGiftLocalIo();
		}
		return qqGiftLocalIo;
	}
	
	public void LRCGiftGet(Channel channel,CrossData data) {
		int callbackcmd = data.getCallbackCmd();
		try {
			
			Type type = new TypeReference<HashMap<String, String>>() {}.getType();
			Map<String, String> param=data.getObject(CrossEnum.giftdata, type);
			
			String openid = param.get(QqGiftConst.openid);
			int taskid = Integer.parseInt(param.get(QqGiftConst.taskid));
			data.finishGet();
			Long findHidByOpenid = HeroDao.getIns().findHidByPfOpenid(openid, GameProperties.getFirstZoneId());
			
			if (findHidByOpenid==null) {
				String massage = "findHidByOpenid==null: LRCGiftGet :"+openid;
				LogTool.warn(massage,QqGiftLocalIo.class);
				data.putObject(CrossEnum.giftdataRest, QqGiftConst.rest_101);
				NettyWrite.writeCallbackData(channel, data, callbackcmd);
			}else {
				Hero hero = HeroCache.getHeroMap().get(findHidByOpenid);
				if (hero==null) {
					//不在线 发邮件
					hero=HeroCache.getHero(findHidByOpenid, HeroConst.FIND_TYPE_BASIC);
					Set<Integer> giftTaskIds = hero.getGiftTaskIds();
					if (giftTaskIds.contains(taskid)) {
						//已经领取过了
						data.putObject(CrossEnum.giftdataRest, QqGiftConst.rest_102);
						NettyWrite.writeCallbackData(channel, data, callbackcmd);
					}else {
						//发邮件
						giftTaskIds.add(taskid);
						//先修改状态 
						HeroDao.getIns().updateGiftTaskIds(hero);
						
						int[][] reward = new int[1][];
						reward[0]=new int[]{GameConst.TOOL,taskid,1};
						MailFunction.getIns().sendMailWithFujianData2(findHidByOpenid, taskid, new Object[]{taskid}, reward);
						
						data.putObject(CrossEnum.giftdataRest, QqGiftConst.rest_0);
						NettyWrite.writeCallbackData(channel, data, callbackcmd);
						LogTool.info("hid:"+findHidByOpenid+" success get taskid"+taskid, QqGiftLocalIo.class);
					}
				}else {
					//在线
					Set<Integer> giftTaskIds = hero.getGiftTaskIds();
					if (giftTaskIds.contains(taskid)) {
						//已经领取过了
						data.putObject(CrossEnum.giftdataRest, QqGiftConst.rest_102);
						NettyWrite.writeCallbackData(channel, data, callbackcmd);
					}else {
						//发放礼包
						giftTaskIds.add(taskid);
						
						int[][] reward = new int[1][];
						reward[0]=new int[]{GameConst.TOOL,taskid,1};
						MailFunction.getIns().sendMailWithFujianData2(findHidByOpenid, taskid, new Object[]{taskid}, reward);
						
						data.putObject(CrossEnum.giftdataRest, QqGiftConst.rest_0);
						NettyWrite.writeCallbackData(channel, data, callbackcmd);
						LogTool.info("hid:"+findHidByOpenid+" success get taskid"+taskid, QqGiftLocalIo.class);
					}
				}
			}
		} catch (Exception e) {
			data.putObject(CrossEnum.giftdataRest, QqGiftConst.rest_103);
			NettyWrite.writeCallbackData(channel, data, callbackcmd);
			LogTool.error(e, QqGiftLocalIo.class, "LRCGiftGet has wrong");
		}
		
		
	}
	
	
	
	public void LRCGiftGetHero(Channel channel,CrossData data) {
		int callbackcmd = data.getCallbackCmd();
		try {
			Type type = new TypeReference<HashMap<String, String>>() {}.getType();
			Map<String, String> param=data.getObject(CrossEnum.getGiftName, type);
			
			String openid = param.get(QqGiftConst.openid);
			data.finishGet();
			Long findHidByOpenid = HeroDao.getIns().findHidByPfOpenid(openid, GameProperties.getFirstZoneId());
			
         	if (findHidByOpenid==null) {
				String massage = "LRCGiftGetHero==null: LRCGiftGetHero :"+openid;
				LogTool.warn(massage,QqGiftLocalIo.class);
				data.putObject(CrossEnum.getGiftNameRest, QqGiftConst.rest_101);
				NettyWrite.writeCallbackData(channel, data, callbackcmd);
			}else {
				Hero hero = HeroCache.getHeroMap().get(findHidByOpenid);
				if (hero==null) {
					hero=HeroCache.getHero(findHidByOpenid, HeroConst.FIND_TYPE_BASIC);
				}
				String massage = "hero!=null hid:"+findHidByOpenid;
				LogTool.info(massage,QqGiftLocalIo.class);
				data.putObject(CrossEnum.getGiftNameRest, QqGiftConst.rest_0);
				data.putObject(CrossEnum.hid, hero.getId());
				data.putObject(CrossEnum.name, hero.getName());
				NettyWrite.writeCallbackData(channel, data, callbackcmd);
			}
		} catch (Exception e) {
			data.putObject(CrossEnum.getGiftNameRest, 109);
			NettyWrite.writeCallbackData(channel, data, callbackcmd);
			LogTool.error(e, QqGiftLocalIo.class, "LRCGiftGetHero has wrong");
		}
	}
	
	
	
	

}
