package com.teamtop.cross.battleVideo;

import java.io.File;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 战报定时器，删除过期的战报文件
 * 
 * @author Administrator
 *
 */
public class BattleVideoSchedule extends AbsServerEvent {
	private static ScheduledExecutorService executors = ScheduleUtil.makeThread("BattleVideoSchedule");
	private static Logger logger = LoggerFactory.getLogger(BattleVideoSchedule.class);
	@Override
	public void startServer() throws RunServerException {
		executors.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				int deadtime = TimeDateUtil.getDayPassOrFuture(-7, TimeDateUtil.getRealTime());
				String path = GamePath.USER_DIR + GamePath.SEP + "battleVideo";
				checkBattleVideo(path, deadtime);
			}
		}, 0, 24, TimeUnit.HOURS);
	}

	public static void checkBattleVideo(String path,int deadtime) {
		File file = new File(path);
		if(file.exists()){
			File[] listFiles = file.listFiles();
			for(File f:listFiles){
				if(f.isDirectory()){
					checkBattleVideo(f.getPath(),deadtime);
				}else{
					//F:\workspace\YT2\battleVideo\zoneid\1\battleType\20031\7_1458219189
					//bid_time
					try {
						String[] arr = f.getName().split("_");
						int time = Integer.parseInt(arr[1]);
						if(time<deadtime){
							logger.info("del battlevideo:"+f.getPath());
							FileUtils.deleteFile(f.getPath());
						}
					} catch (NumberFormatException e) {
						LogTool.error(e,BattleVideoSchedule.class,f.getPath());
					}
				}
			}
		}
	}
}
