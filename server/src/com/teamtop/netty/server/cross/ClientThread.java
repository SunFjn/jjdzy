package com.teamtop.netty.server.cross;

import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.serverMaintain.ServerMaintainCache;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.util.concurrent.GenericFutureListener;
/**
 * 连接跨服服务器线程
 */
public class ClientThread{
	private static Logger logger = LoggerFactory.getLogger(ClientThread.class);
	private static ConcurrentLinkedQueue<CrossClient> crossChannelList = new ConcurrentLinkedQueue<CrossClient>();
	private static ScheduledExecutorService executors = ScheduleUtil.makeThread(3,"clientNetty");
	public static void execute() {
		executors.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				for(CrossClient client:crossChannelList){
					Channel channel = client.getCrossChannel();
//					final String info = client.toString();
					if(channel==null || !channel.isActive()){
						if(channel!=null){
							channel.closeFuture().addListener(new GenericFutureListener<ChannelFuture>(){
								@Override
								public void operationComplete(ChannelFuture future) throws Exception {
//									logger.info("cross server close complete."+info);
								}
							});
						}
						if (client instanceof Client_2) {
							if (ServerMaintainCache.MAINTAIN_STATE != -1) {
								client.conn();
							}else if( GameProperties.gmFlag&& TimeDateUtil.getCurrentTime()%10==0){
								System.err.println("GlobalData 20 的值为-1，所以不连接玩法中央服。");
							}
						} else {
							client.conn();
						}
//						logger.info("cross server not connect,try connect,ip:"+client.getIp()+",port:"+client.getPort()+","+client.getServerName());
					}
				}
			}
		}, 0, 3, TimeUnit.SECONDS);
	}
	public static void addChannelCheck(CrossClient localClient){
		crossChannelList.add(localClient);
	}
}
