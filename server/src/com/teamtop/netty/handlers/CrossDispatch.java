package com.teamtop.netty.handlers;

import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.ServerProperties;
import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossBaseOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.zlib.ZipUtils;

import io.netty.channel.Channel;

public class CrossDispatch {
	private static ThreadPoolExecutor executor= new ThreadPoolExecutor(Runtime.getRuntime().availableProcessors(), Runtime.getRuntime().availableProcessors()*2, 10, TimeUnit.SECONDS, 
			new ArrayBlockingQueue<Runnable>(300),
			
			new ThreadFactory() {
				AtomicInteger sn = new AtomicInteger();
				public Thread newThread(Runnable r) {
					SecurityManager s = System.getSecurityManager();
					ThreadGroup group = (s != null) ? s.getThreadGroup(): Thread.currentThread().getThreadGroup();
					Thread t = new Thread(group, r);
					t.setName("crossChannelEx - " + sn.incrementAndGet());
					return t;
				}
			},
			
			new RejectedExecutionHandler() {
				
				@Override
				public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
					if (!executor.isShutdown()) {
//						Runnable poll = executor.getQueue().poll();
						LogTool.warn("remove task:"+r,CrossDispatch.class);
//						executor.execute(r);
		            }						
				}
			});
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
	public static void dispatcherMethod(final int cmdId, final byte[] data, final Channel channel) {
		final Method method = NettyCache.crossCmdToMethodCache.get(cmdId);
		final Object object = NettyCache.crossCmdToObject.get(cmdId);
		if(method==null || object==null){
			LogTool.warn("dispatcherMethod warn,cmd:"+cmdId+",channel:"+channel.toString(),CrossDispatch.class);
			return;
		}
		LogTool.warn("CrossDispatch.dispatcherMethod 跨服消息打印 cmd="+cmdId+",channel:"+channel.toString(), object.getClass());
		/*CrossData crossData = CrossTrans.read(data,CrossData.class);
		try {
			method.invoke(object, channel,crossData);
		} catch (Exception e) {
			logger.error(LogFormat.exception(e,"dispatcherMethod err,cmd:"+cmdId+",channel:"+channel.toString()));
		}*/
		if (!CrossActivitySwitchCache.checkCrossOpenCrossCmd(object)) {
			return;
		}
		try {
			executor.execute(new Runnable() {
				
				@Override
				public String toString() {
					return super.toString()+"cmd:"+cmdId;
				}

				@Override
				public void run() {
					// CrossData crossData = CrossTrans.read(data,CrossData.class);
					String dataStr = new String(ZipUtils.decompress(data), Charset.forName("utf-8"));
					CrossData crossData = JSONObject.parseObject(dataStr, CrossData.class);
					try {
						if (cmdId == 30001) {
							OpTaskExecutorService.PublicOrderService.execute(new CrossBaseOpTaskRunnable() {

								@Override
								public void run() {
									try {
										method.invoke(object, channel, crossData);
										if (ServerProperties.showUI) {
											boolean crossServer = CrossZone.isCrossServer();
											if (crossServer) {
												// String timeStr = TimeDateUtil.getCurrentDateTimeStr("HH:mm:ss");
												String zidStr = CrossCache.getZoneidStrByChannel(channel, "_");
												System.err.println(
														"⊱" + zidStr + "区⊰  cmd::" + cmdId + " length:" + data.length);
											} else {
												System.err.println("⊱Cross⊰ cmd::" + cmdId + " length:" + data.length);
											}
										}
									} catch (Exception e) {
										LogTool.error(e, CrossDispatch.class,
												"dispatcherMethod err,cmd:" + cmdId + ",channel:" + channel.toString());
									}
								}

								@Override
								public Object getSession() {
									return OpTaskConst.CROSS_BASE_OP;
								}
							});
						} else {
							method.invoke(object, channel, crossData);
							if (ServerProperties.showUI) {
								boolean crossServer = CrossZone.isCrossServer();
								if (crossServer) {
//								String timeStr = TimeDateUtil.getCurrentDateTimeStr("HH:mm:ss");
									String zidStr = CrossCache.getZoneidStrByChannel(channel, "_");
									System.err.println("⊱" + zidStr + "区⊰  cmd::" + cmdId + " length:" + data.length);
								} else {
									System.err.println("⊱Cross⊰ cmd::" + cmdId + " length:" + data.length);
								}
							}
						}
					} catch (Exception e) {
						LogTool.error(e,CrossDispatch.class,"dispatcherMethod err,cmd:"+cmdId+",channel:"+channel.toString());
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e,CrossDispatch.class);
		}
	}
}
