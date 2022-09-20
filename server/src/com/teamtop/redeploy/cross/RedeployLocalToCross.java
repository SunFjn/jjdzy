package com.teamtop.redeploy.cross;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.version.VersionCache;
import com.teamtop.houtaiHttp.events.version.VersionFunction;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.redeploy.RedeployEnum;
import com.teamtop.redeploy.platformInfo.PlatformInfoCache;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class RedeployLocalToCross {

	/**
	 * @param zonelist
	 * @param 平台号
	 * @param hero	默认填null
	 */
	public static boolean hotSwapByZIDListLC(List<Integer> zonelist, String pf) {
		LogTool.info("hotSwapByZIDListLC.ZIDlist:"+zonelist, RedeployLocalToCross.class);
		String tmpPath = GameProperties.hotswapDir + File.separator+"newfile.zip";
		try {
			FileInputStream fis = new FileInputStream(tmpPath);
			int binLen = fis.available();
			byte[] newfileData = new byte[binLen];
			fis.read(newfileData);
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			DataOutputStream output = new DataOutputStream(bos);
			output.write(newfileData);

			byte[] sendData = bos.toByteArray();
			fis.close();
			bos.close();
			output.close();
			CrossData crossData = new CrossData();
			crossData.putObject(RedeployEnum.bin.name(), sendData);
			crossData.putObject(RedeployEnum.type.name(), RedeployEnum.hotswap.name());
			crossData.putObject(RedeployEnum.zonelist.name(), zonelist);
			Client_1 client = Client_1.getIns();
			if (StringUtils.isNotEmpty(pf)) {
				LogTool.info("RedeployLocalToCross pf="+pf, RedeployLocalToCross.class);
				client = PlatformInfoCache.clientMap.get(pf);
			}
			NettyWrite.writeXData(client.getCrossChannel(), CrossConst.HOTSWAP_STEP1, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
				}
			});
			LogTool.info("hotSwapByZIDListLC ok", RedeployLocalToCross.class);
			return true;
		} catch (Exception e) {
			LogTool.error(e, RedeployLocalToCross.class, "热更其他正式服报错");
			return false;
		}
	}

	/**
	 * 通知中央服拉版本号
	 */
	public static void getAllVersionLC(){
		VersionCache.clearVersionMap();
		CrossData crossData = new CrossData();
		NettyWrite.writeXData(Client_1.getIns().getCrossChannel(), CrossConst.GET_ALL_VERSION_LC, crossData);
	}
	
	/**
	 * 获取中央服拉版本号
	 */
	public static void getAllCrossVersionLC(){
		VersionCache.clearVersionCrossMap();
		CrossData crossData = new CrossData();
		List<Channel> allChannel = new ArrayList<>();
		allChannel.add(Client_1.getIns().getCrossChannel());
		allChannel.add(Client_2.getIns().getCrossChannel());
		allChannel.forEach(temp -> {
			NettyWrite.writeXData(temp, CrossConst.GET_CROSS_VERSION_LC, crossData, new Callback() {
				
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					String zoneidList = crossData.getObject(CrossEnum.zoneidList, String.class);
					String version = crossData.getObject(CrossEnum.version, String.class);
					VersionFunction.setVersionZidCross(zoneidList, version);
					VersionCache.setTimeEnd(System.currentTimeMillis());
				}
			});
		});
	}

	/**
	 * @param zonelist
	 * @param hero	默认填null
	 */
	public static boolean groovyByZIDListLC(List<Integer> zonelist, String groovyFile, String groovyEnum){
		LogTool.info("groovyByZIDListLC.ZIDlist:"+zonelist, RedeployLocalToCross.class);
		String tmpPath = GamePath.USER_DIR+GamePath.SEP+"bin"+GamePath.SEP+"groovyScript"+GamePath.SEP+groovyFile;
		try {
			FileInputStream fis = new FileInputStream(tmpPath);
			int binLen = fis.available();
			byte[] newfileData = new byte[binLen];
			fis.read(newfileData);
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			DataOutputStream output = new DataOutputStream(bos);
			output.write(newfileData);

			byte[] sendData = bos.toByteArray();
			fis.close();
			bos.close();
			output.close();
			CrossData crossData = new CrossData();
			crossData.putObject(RedeployEnum.bin.name(), sendData);
			crossData.putObject(RedeployEnum.type.name(), groovyEnum);
			crossData.putObject(RedeployEnum.zonelist.name(), zonelist);
			NettyWrite.writeXData(Client_1.getIns().getCrossChannel(), CrossConst.HOTSWAP_STEP1, crossData,new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
				}
			});
			LogTool.info("groovyByZIDListLC ok", RedeployLocalToCross.class);
			return true;
		} catch (Exception e) {
			LogTool.error(e, RedeployLocalToCross.class, "脚本同步其他服报错");
			return false;
		}
	}
	
	/**
	 */
	public static boolean getLogExceptiomByZIDListLC(List<Integer> zonelist, String name, String logTime){
		LogTool.info("getLogExceptiomByZIDListLC.ZIDlist:"+zonelist, RedeployLocalToCross.class);
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(RedeployEnum.name.name(), name);
			crossData.putObject(RedeployEnum.logTime.name(), logTime);
			crossData.putObject(RedeployEnum.zonelist.name(), zonelist);
			NettyWrite.writeXData(Client_1.getIns().getCrossChannel(), CrossConst.LOG_EXCEPTION_LC, crossData,new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
				}
			});
			LogTool.info("getLogExceptiomByZIDListLC ok", RedeployLocalToCross.class);
			return true;
		} catch (Exception e) {
			LogTool.error(e, RedeployLocalToCross.class, "热更其他正式服报错");
			return false;
		}
	}
}
