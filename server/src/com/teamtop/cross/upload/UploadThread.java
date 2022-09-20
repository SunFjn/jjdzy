package com.teamtop.cross.upload;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.time.TimeDateUtil;
/**
 * 跨服上传线程，检测上传是否完成
 * @author Administrator
 *
 */
public class UploadThread extends AbsScheduleExecutor {
	Logger logger = LoggerFactory.getLogger(UploadThread.class);
	public UploadThread(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		Iterator<AbsCrossUploadEvent> it = UploadCache.getCheckMap().values().iterator();
		while(it.hasNext()){
			AbsCrossUploadEvent check = it.next();
//			if(!check.isReady()) continue;
			if(now > check.getDeadline()){
				logger.info("deadline reach,remove it,system name:"+check.getName());
				it.remove();
			}
			Map<Integer, UploadModel> processMap = check.getProcessMap();
			Iterator<Entry<Integer, UploadModel>> pit = processMap.entrySet().iterator();
			while(pit.hasNext()){
				Entry<Integer, UploadModel> next = pit.next();
				UploadModel um = next.getValue();
				if(um.getStartUploadTime()==0){
					//开始让子服X区上传
					um.setStartUploadTime(TimeDateUtil.getCurrentTime());
					check.tellUpload(um.getZoneid());
				}else{
					if(um.getNeedNum()<=um.getRealNum()){
						//这个子服已经上传完成
						pit.remove();
						logger.info("sub server "+next.getKey()+" upload finish,neednum:"+um.getNeedNum()+",realnum:"+um.getRealNum()+",system name:"+check.getName());
						check.addFinish(um);
					}else{
						//wait for upload finish
						break;
					}
				}
			}
		}
	}
}
