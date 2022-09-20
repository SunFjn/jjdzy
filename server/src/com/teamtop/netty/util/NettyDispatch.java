package com.teamtop.netty.util;

import java.lang.reflect.Method;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossZone;
import com.teamtop.forbid.ForbidCache;
import com.teamtop.netty.firewall.skyeye.SkyEyeFunction;
import com.teamtop.netty.util.nettyCache.FunCmd;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.global.GlobalCmd;
import com.teamtop.system.global.GlobalFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class NettyDispatch {
	private static final Logger logger = LoggerFactory.getLogger(NettyDispatch.class);
	/**
	 * 指派协议号对应的处理方法(使用配置文件注册)
	 * 
	 * @param cmdId
	 *            请求的协议号cmdId
	 * @param connection
	 *            连接
	 * @param data
	 *            客户端发来的数据
	 */
	public static void dispatcherMethod(final int cmdId, final Object[] data/*final byte[] data*/, Channel channel) {
		TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
//		logger.info("cmdId:"+cmdId+","+tempData.getChannel().toString());
//		logger.info(tempData.toString());
		SkyEyeFunction.checkProtocol(tempData, cmdId);
		final Method method = NettyCache.cmdToMethodCache.get(cmdId);
		final Object object = NettyCache.cmdToObject.get(cmdId);
		if(method==null || object==null){
			logger.warn("dispatcherMethod warn,cmd:"+cmdId+",channel:"+channel.toString());
			return;
		}
		try {
			boolean crossServer = CrossZone.isCrossServer();
			if(cmdId==101 || cmdId==105 || cmdId==133||cmdId==171){
				if(!crossServer){
					method.invoke(object, channel, data);
				}else{
					return;
				}
			}else if(cmdId==1663){
				if(crossServer){
					method.invoke(object, channel, data);
					return;
				}else{
					return;
				}
			}else{
				final Hero hero = tempData.getHero();
				if(hero!=null){
					/*AbsCrossControl absCrossControl = NettyCache.crossControlMap.get(cmdId);
					if(absCrossControl!=null){
						boolean reciCG = absCrossControl.reciCG(hero, crossServer, cmdId);
						if(!reciCG){
							if(crossServer){
								logger.info(LogFormat.rec(hero.getId(),hero.getNameZoneid(),"reciCG not pass,cmd:"+cmdId+",crossServer:"+crossServer));
							}
							return;
						}
					}else{
						if(crossServer){
							return;
						}
					}
					if(tempData.isPrintcmd()){
						tempData.setPrintcmd(false);
						logger.info("print cmd:"+cmdId+",hid:"+hero.getId());
					}*/
					if(cmdId!=251){//特殊限制
						if(ForbidCache.validateCmd(cmdId)){
							//被屏蔽
							FunCmd funCmd = ForbidCache.getFunCmdMap().get(cmdId);
							NettyWrite.writeData(channel, new Object[]{2,funCmd.getFunid()}, GlobalCmd.GC_NoticeFunMsg_256);
							return;
						}
						//地图屏蔽
						/*if(ForbidCache.forbid(hero.getScene().getSceneSysId(), cmdId)){
							GlobalSender.sendCmd_520(hero.getId(), 3, 1);
							return;
						}*/
						//CG等级限制
						if(cmdId!=0){
							if(!ForbidCache.validateFunCmd(hero.getRealLevel(), cmdId)){
//								logger.warn(LogFormat.rec(hero.getId(), hero.getName(), "少年，你的等级不够这个操作。你知道两个B型血的人生出来的是什么吗？,cmd:"+cmdId+",method:"+method));
								FunCmd funCmd = ForbidCache.getFunCmdMap().get(cmdId);
								NettyWrite.writeData(channel, new Object[]{1,funCmd.getFunid()}, GlobalCmd.GC_NoticeFunMsg_256);
								return;
							}
							if(!ForbidCache.validateFunGuanqiaCmd(hero.getCurGuanqia(), cmdId)) {
								FunCmd funCmd = ForbidCache.getFunCmdMap().get(cmdId);
								//NettyWrite.writeData(channel, new Object[]{3,funCmd.getFunid()}, GlobalCmd.GC_NoticeFunMsg_256);
								LogTool.warn("ForbidCache warn:3", NettyDispatch.class);
								return;
							}
							//后台系统屏蔽
							if(ForbidCache.forbidSystemFromHoutai(hero.getZoneid(), cmdId)){
								FunCmd funCmd = ForbidCache.getFunCmdMap().get(cmdId);
								NettyWrite.writeData(channel, new Object[]{2,funCmd.getFunid()}, GlobalCmd.GC_NoticeFunMsg_256);
								return;
							}
							
							FunCmd funCmd = ForbidCache.getFunCmdMap().get(cmdId);
							if(funCmd != null && GlobalFunction.getIns().checkSysLimit(hero, funCmd.getFunid())){
								LogTool.warn("hid:"+hero.getId()+" name:"+hero.getNameZoneid()+"系统限制表限制了本功能,cmd:"+cmdId+",method:"+method,NettyDispatch.class);
								int rtnCode = 8;
								NettyWrite.writeData(channel, new Object[]{rtnCode,funCmd.getFunid()}, GlobalCmd.GC_NoticeFunMsg_256);
								return;
							}
							// 跨服活动屏蔽
							if (ForbidCache.forbidCrossAct(cmdId)) {
								NettyWrite.writeData(channel, new Object[] { 2, funCmd.getFunid() },
										GlobalCmd.GC_NoticeFunMsg_256);
								return;
							}
							// 功能玩法屏蔽
							if (ForbidCache.forbidGameSystem(cmdId)) {
								NettyWrite.writeData(channel, new Object[] { 2, funCmd.getFunid() },
										GlobalCmd.GC_NoticeFunMsg_256);
								return;
							}
						}
					}
					OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

						@Override
						public void run() {
							try {
								method.invoke(object, hero, data);
							} catch (Exception e) {
								logger.error("dispatcherMethod invoke, heroId=" + hero.getId()+", cmdId="+cmdId, e);
							}
						}

						@Override
						public Object getSession() {
							return hero.getId();
						}
					});
				} 
//				else {
//					method.invoke(object, hero, data);
//				}
				/*if(hero.getCrossChannel()!=null){
					//子服不处理地图协议
					if(cmdId>200 && cmdId<300 && !CrossZone.isCrossServer()){
						logger.info(LogFormat.rec(hero.getId(), hero.getName(), "not sync scene,cmd:"+cmdId+",isCrossServer:"+CrossZone.isCrossServer()));
						return;
					}
				}*/
//				if(cmdId>301 && cmdId<400){
//					//不在战斗不用处理，客户端会两条连接都发送
//					if(!BattleCache.inBattle(hero.getId()) && BattleCache.getFuhuoInfo(hero.getId())==null){
//						logger.info(LogFormat.rec(hero.getId(), hero.getName(), "hero not in battle,cmd:"+cmdId+",isCrossServer:"+crossServer));
//						return;
//					}
//				}
//				method.invoke(object, hero, data);
				/*try {
					if((cmdId >6100 & cmdId <6200) || (cmdId>200 && cmdId<400) || cmdId==181 || cmdId==501){
						
					}else{
						if(checkcg(data)){
							SkyEyeCache.addCg(hero.getZoneid(), new CGRec(hero.getId(), cmdId, TimeDateUtil.getCurrentTime(), Arrays.deepToString(data)));
							QQMailCache.sendWarn(QQMailEnum.CG, "name:"+hero.getNameZoneid()+",hid:"+hero.getId()+",cg cmd:"+cmdId+",data:"+Arrays.deepToString(data));
							channel.close();
						}
					}
				} catch (Exception e) {
					
				}*/
//				if(cmdId>=200 && cmdId<400) return; //地图和战斗忽略
				//检查hero战力标志
//				FightCalcFunction.checkCalc(hero);
			}
		} catch (Exception e) {
			logger.error(LogTool.errmsg(e)+"dispatcherMethod err,cmd:"+cmdId+",channel:"+channel.toString());
		}
	}
	
	private static boolean checkcg(Object[] data){
		if(data==null) return false;
		for(Object obj:data){
			if(obj.getClass().isArray()){
				boolean checkcg = checkcg((Object[])obj);
				if(checkcg){
					return true;
				}
			}else{
				boolean fushu = false;
				if(obj instanceof Byte && (Byte)obj<0){
					fushu = true;
				}else if(obj instanceof Integer && (Integer)obj<0){
					fushu = true;
				}else if(obj instanceof Short && (Short)obj<0){
					fushu = true;
				}else if(obj instanceof Long && (Long)obj<0){
					fushu = true;
				}
				if(fushu){
					return true;
				}
			}
		}
		return false;
	}
}
