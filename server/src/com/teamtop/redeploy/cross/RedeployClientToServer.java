package com.teamtop.redeploy.cross;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.redeploy.RedeployClientCache;
import com.teamtop.redeploy.RedeployEnum;
import com.teamtop.redeploy.model.RedeployClient;
import com.teamtop.redeploy.ui.MainFrame;
import com.teamtop.util.json.JsonUtils;

import io.netty.channel.Channel;

public class RedeployClientToServer {

	public static void hotSwapByZidCS(int zone, String zidListStr){
		CrossData crossData = new CrossData();
		crossData.putObject(RedeployEnum.zonelist, zidListStr);
		RedeployClient redeployClient = RedeployClientCache.getClients().get(zone);
		NettyWrite.writeXData(redeployClient.getCrossChannel(), CrossConst.HOTSWAP_BY_ZID_CS, crossData,new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
//				MainFrame.info("结果："+crossData.getObject("info", String.class).toString(), zone);
				MainFrame.info("*******热更进行中，请检查成功的区*******", zone);
			}
		});
	}

	public static void hotSwapByZidCheckCS(int zone){
		CrossData crossData = new CrossData();
		RedeployClient redeployClient = RedeployClientCache.getClients().get(zone);
		NettyWrite.writeXData(redeployClient.getCrossChannel(), CrossConst.HOTSWAP_BY_ZID_CHECK_CS, crossData,new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				MainFrame.info("检查热更结果："+crossData.getObject(CrossEnum.data1, String.class), zone);
			}
		});
	}

	public static void getAllVersionCS(int zone, int type){
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.type, type);
		RedeployClient redeployClient = RedeployClientCache.getClients().get(zone);
		NettyWrite.writeXData(redeployClient.getCrossChannel(), CrossConst.GET_ALL_VERSION_CS, crossData, new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				MainFrame.info(crossData.getObject(CrossEnum.data1, String.class), zone);
			}
		});
	}
	
	public static void groovyByZidCS(int zone, String zidListStr){
		CrossData crossData = new CrossData();
		crossData.putObject(RedeployEnum.zonelist, zidListStr);
		RedeployClient redeployClient = RedeployClientCache.getClients().get(zone);
		NettyWrite.writeXData(redeployClient.getCrossChannel(), CrossConst.GROOVY_BY_ZID_CS, crossData,new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
//				MainFrame.info("结果："+crossData.getObject("info", String.class).toString(), zone);
				MainFrame.info("*******脚本同步中，请检查成功的区*******", zone);
			}
		});
	}
	
	public static void groovyByZidCheckCS(int zone){
		CrossData crossData = new CrossData();
		RedeployClient redeployClient = RedeployClientCache.getClients().get(zone);
		NettyWrite.writeXData(redeployClient.getCrossChannel(), CrossConst.GROOVY_BY_ZID_CHECK_CS, crossData,new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				MainFrame.info("检查脚本结果："+crossData.getObject(CrossEnum.data1, String.class), zone);
			}
		});
	}
	
	public static void groovyConvenientByZidCS(int zone, String zidListStr){
		CrossData crossData = new CrossData();
		crossData.putObject(RedeployEnum.zonelist, zidListStr);
		RedeployClient redeployClient = RedeployClientCache.getClients().get(zone);
		NettyWrite.writeXData(redeployClient.getCrossChannel(), CrossConst.GROOVY_CONVENEINT_BY_ZID_CS, crossData,new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
//				MainFrame.info("结果："+crossData.getObject("info", String.class).toString(), zone);
				MainFrame.info("*******脚本便捷式同步子服中（脚本历史记录可查看本地log日志）*******", zone);
			}
		});
	}
	
	public static void groovyConvenientCS(int zone){
		CrossData crossData = new CrossData();
		RedeployClient redeployClient = RedeployClientCache.getClients().get(zone);
		NettyWrite.writeXData(redeployClient.getCrossChannel(), CrossConst.GROOVY_CONVENEINT_BY_ZID_CHECK_CS, crossData,new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				MainFrame.info(crossData.getObject(CrossEnum.data1, String.class), zone);
			}
		});
	}
	
	public static void initExceptionNumCS(int zone, String name, String time, String zidListStr){
		if(!name.contains("console")&& time.equals("")){
			MainFrame.err("请选择时间再查询 "+name, zone);
			return;
		}
		
		CrossData crossData = new CrossData();
		crossData.putObject(RedeployEnum.name, name);
		crossData.putObject(RedeployEnum.logTime, time);
		crossData.putObject(RedeployEnum.zonelist, zidListStr);
		RedeployClient redeployClient = RedeployClientCache.getClients().get(zone);
		NettyWrite.writeXData(redeployClient.getCrossChannel(), CrossConst.LOG_EXCEPTION_CS, crossData);
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		MainFrame.info("统计完成，请收到查看结果", zone);
	}
	
	public static void getExceptionNumResultCS(int zone){
		CrossData crossData = new CrossData();
		RedeployClient redeployClient = RedeployClientCache.getClients().get(zone);
		NettyWrite.writeXData(redeployClient.getCrossChannel(), CrossConst.LOG_EXCEPTION_RESULT_CS, crossData,new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				//控制台显示报错
				String data = crossData.getObject(CrossEnum.data1, String.class);
				HashMap<String, Integer> map = null;
				try {
					map = JsonUtils.toMap( data, String.class, Integer.class);
				} catch (IOException e) {
					e.printStackTrace();
				}

				MainFrame.info("结果如下:", zone);
				if(map == null){
					MainFrame.info("返回数据为空", zone);
				}else{
					Iterator<Entry<String, Integer>> iterator = map.entrySet().iterator();
					while(iterator.hasNext()){
						Entry<String, Integer> next = iterator.next();
						MainFrame.info(next.getKey()+" 数量："+next.getValue(), zone);
					}
				}
				MainFrame.info("", zone);
			}
		});
	}
}
