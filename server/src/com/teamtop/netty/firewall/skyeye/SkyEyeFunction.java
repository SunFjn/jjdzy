package com.teamtop.netty.firewall.skyeye;

import io.netty.channel.Channel;

import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.pf.PfConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCmd;
import com.teamtop.system.hero.TempData;
import com.teamtop.system.hero.TempVariables;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 协议监控
 * @author Administrator
 *
 */
public class SkyEyeFunction {
	public static boolean watch = !GameProperties.gmFlag;
	public static void main(String[] args) {
		int a = 10;
		int b = 3;
		float c = a / (float)b;
		System.err.println(c);
	}
	public static void checkProtocol(TempData tempData,int cmd){
		if(!watch) return;
		try {
			Map<Integer, SkyEyeRec> protocolWatch = tempData.getProtocolWatch();
			SkyEyeRec pr = protocolWatch.get(cmd);
			if(pr==null){
				pr = new SkyEyeRec();
				pr.setCmd(cmd);
				protocolWatch.put(cmd, pr);
			}
			Hero hero = tempData.getHero();
			boolean rtn = false;
			if(cmd==223){
				//同步路径
			}else if(cmd==6145){
				//反恐同步
			}else if(cmd==181){
				//心跳包
				rtn = syncHeartbeat(pr,hero);
			}else if(cmd==303){
			}else{
				return;
			}
			if(rtn){
				pr.setFixtimes(0);
				if(hero!=null){
					LogTool.warn(hero.getId()+ hero.getNameZoneid()+ "protocol fix,cmd:"+cmd,SkyEyeFunction.class);
				}else{
					LogTool.warn("hid:"+tempData.getAccount().getHid() + ",protocol fix,cmd:"+cmd,SkyEyeFunction.class);
				}
//				FlowSkyEyeEvent.getIns().addProtocolWatch(hero.getId(), hero.getZoneid(),hero.getOpenid(), cmd);
				if(!GameProperties.platform.equals(PfConst.PF_vietnamese) &&!GameProperties.platform.equals(PfConst.PF_TW)){
					//越南 台湾不弹
//					GlobalSender.sendCmd_520(hero.getId(), 9, 0);
				}
			}
		} catch (Exception e) {
			LogTool.error(e,SkyEyeFunction.class);
		}
	}
	private static boolean syncHeartbeat(SkyEyeRec pr,Hero hero){
		int max = 4;
		int maxtime = 3100;
		List<Long> list = pr.getTime();
		list.add(TimeDateUtil.getRealTime());
		
		int size = list.size();
		TempVariables tempVariables = hero.getTempVariables();
		tempVariables.setLastHeartBeatTime(TimeDateUtil.getCurrentTime());
//		logger.info(LogFormat.rec(hero.getId(), hero.getName(), "heart beat time:"+TimeDateUtil.printTime(tempVariables.getLastHeartBeatTime())));
		if(size>=max){
			pr.setCounts(pr.getCounts()+1);
			int fixtimes = pr.getFixtimes();
			Long last = list.get(size-1);
			Long first = list.get(0);
			list.clear();
			int usetime = (int) (last - first);
			float devide = maxtime / (float)usetime;
			if(devide > 2){
				fixtimes +=10;
			}else if(devide > 1.5f){
				fixtimes += 4;
			}else if(devide > 1.2f){
				fixtimes += 2;
			}
			pr.setFixtimes(fixtimes);
//			System.err.println("44444444444 fixtimes="+fixtimes+", usetime="+usetime+", devide="+devide);
			if(fixtimes>=20){
				if(devide<=20){
					LogTool.warn(hero.getId()+ hero.getNameZoneid()+"cmd:"+pr.getCmd()+"counts:"+pr.getCounts()+",first:"+first+",last:"+last+",max:"+max+",devide:"+devide+",fixtimes:"+fixtimes+",maxtime:"+maxtime+",usetime:"+usetime
							,SkyEyeFunction.class);
					Channel channel = hero.getChannel();
					if(channel!=null) {						
						NettyWrite.writeData(channel, new Object[] { "请勿使用第三方软件进行加速", 4 }, HeroCmd.GC_NoticeMsg_164);
					}
					hero.getChannel().close();
					return true;
				}
			}
			if(pr.getCounts()>=30 && pr.getFixtimes()/10<=5){
				pr.setFixtimes(0);
				pr.setCounts(0);
			}
		}
		return false;
	}
	
	/**
	 * 如果收到的cg是偶数
	 * @param tempData
	 */
	public static void cgBadCmd(TempData tempData){
		try {
			int cmd = SkyEyeConst.REASON_BADCMD;
			Map<Integer, SkyEyeRec> protocolWatch = tempData.getProtocolWatch();
			SkyEyeRec pr = protocolWatch.get(cmd);
			if(pr==null){
				pr = new SkyEyeRec();
				pr.setCmd(cmd);
				protocolWatch.put(cmd, pr);
			}
			pr.setCounts(pr.getCounts() + 1);
			if(pr.getCounts()>=2){
				Channel channel = tempData.getChannel();
				if(channel!=null){
					channel.close();
				}
				SkyEyeCache.addBadRole(tempData.getOpenid(), SkyEyeConst.BADCGCMD);
				LogTool.warn("cmd is "+cmd+",not a cg request",SkyEyeFunction.class);
				Hero hero = tempData.getHero();
				if(hero!=null){
//					FlowSkyEyeEvent.getIns().addProtocolWatch(hero.getId(), hero.getZoneid(),hero.getOpenid(), cmd);
				}else{
					LogTool.warn("cmd is "+cmd+",not a cg request,but hero is null,channel:"+tempData.getChannel(),SkyEyeFunction.class);
				}
			}
		} catch (Exception e) {
			LogTool.error(e,SkyEyeFunction.class);
		}
	}
}
