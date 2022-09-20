package com.teamtop.redeploy.ui;

import java.util.Timer;
import java.util.TimerTask;

import com.teamtop.redeploy.RedeployClientCache;

public class FrameFunction {
	
	/**
	 * 获取本次操作所需时长
	 * @param	pro	 时间占比，假如10个区，时间返回    区服数量*pro=时长秒
	 * @return 秒
	 */
//	public static int getNeedTime( int zone, float pro, String zidStr){
//		int numZID = 0;
//		if( zidStr.equals("-1")){
//			String numServerStr = RedeployClientFunction.updateBinJar( zone, "", RedeployEnum.numServer.name(), "", "");
//			numZID = RedeployClientCache.getNumZID();
//			try {
//				if( !numServerStr.equals("")){
//					int numSer = Integer.parseInt( numServerStr);
//					if( numSer>numZID){
//						numZID = numSer;
//						RedeployClientCache.setNumZID(numSer);
//					}
//				}
//			} catch (Exception e) {
//			}
//		}else{
//			String[] split = zidStr.split(",");
//			for( String temp:split){
//				String[] split2 = temp.split("_");
//				if( split2.length==1){
//					numZID++;
//				}else if( split2.length==2){
//					int zID1 = Integer.parseInt(split2[0]);
//					int zID2 = Integer.parseInt(split2[1]);
//					numZID = numZID+zID2-zID1;
//				}
//			}
//		}
//		
//		if( numZID<=1)
//			numZID = 5;
//		
//		int time = (int) (numZID*pro);
//		if( numZID>30){
//			time = (int) (numZID*pro*0.8);
//		}else if( numZID>50){
//			time = (int) (numZID*pro*0.6);
//		}else if( numZID>100){
//			time = (int) (numZID*pro*0.5);
//		}
//		return time;
//	}
	
	/**
	 * 启动显示进程
	 */
	public static void updateInfoLabelRunable( ){
//        TimerTask task = new TimerTask() {  
//            @Override  
//            public void run() {
//            	int zone = BanshuPanel.getZone();
//            	BanshuPanel panel = RedeployClientCache.getClients().get(zone).getPanel();
//            	panel.updateInfoLabel(getText());
//            }  
//        };  
//        Timer timer = new Timer();  
//        timer.scheduleAtFixedRate(task, 1000l, 1000l); 
	}
	
	public static String getText(){
//		int infoType = RedeployClientCache.getInfoType();
//		int timeNow= TimeDateUtil.getCurrentTime();
//		String text = ""; 
//		int infoParamInt1 = 0;
//		switch ( infoType) {
//		case RedeployConst.UPDATE_BIN_JAR:
//			infoParamInt1 = RedeployClientCache.getInfoParamInt(0);
//			int result = timeNow%3;
//			if(result==0){
//				text = (infoParamInt1-timeNow)+"s,更新中。";
//			}else if( result==1){
//				text = (infoParamInt1-timeNow)+"s,更新中。。";
//			}else if( result==2){
//				text = (infoParamInt1-timeNow)+"s,更新中。。。";
//			}
//			break;
//		case RedeployConst.UPDATE_BIN_JAR2:
//			infoParamInt1 = RedeployClientCache.getInfoParamInt(0);
//			int result2 = timeNow%3;
//			if(result2==0){
//				text = (infoParamInt1-timeNow)+"s,解压中。";
//			}else if( result2==1){
//				text = (infoParamInt1-timeNow)+"s,解压中。。";
//			}else if( result2==2){
//				text = (infoParamInt1-timeNow)+"s,解压中。。。";
//			}
//			break;
//		case RedeployConst.START_STOP:
//			infoParamInt1 = RedeployClientCache.getInfoParamInt(0);
//			int result3 = timeNow%3;
//			if(result3==0){
//				text = (infoParamInt1-timeNow)+"s,生成脚本。";
//			}else if( result3==1){
//				text = (infoParamInt1-timeNow)+"s,执行脚本。。";
//			}else if( result3==2){
//				text = (infoParamInt1-timeNow)+"s,等待脚本。。。";
//			}
//			break;
//
//		default:
//			break;
//		}
//		return text;
		return "待补充";
	}
	
}
