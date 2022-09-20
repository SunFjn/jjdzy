package com.teamtop.util.log;

import java.io.File;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.log4j.Appender;
import org.apache.log4j.FileAppender;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;
import org.apache.log4j.RollingFileAppender;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.util.db.orm.FieldXml;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 使用log4j框架定义流水的日志打印，文件名定义为流水表名，输出路径包含日期yyyy-MM-dd
 * @author hepl
 *
 */
public class LogFlowUtil {
	/**
	 * 年月日，yyyy-MM-dd
	 */
	private static String dateTime = null;
	/**
	 * 流水的日志路径
	 */
	private static String flowPath = ".."+GamePath.SEP+"flow";
	/**
	 * 系统日志的路径
	 */
	private static String logPath = "logs";
	/**
	 * 存放logger的缓存map，key为表名，value为日志对象
	 */
	private static ConcurrentHashMap<String, Logger> loggerCache = new ConcurrentHashMap<String, Logger>();

	/**
	 * 新生成一个logger
	 * @param tableName 表名
	 * @return 返回logger
	 */
	private static Logger createNewLogger(String tableName) {
		Logger logger = Logger.getLogger(tableName);
		// 生成新的Appender
        FileAppender appender = new RollingFileAppender();
        // 设置Appender名称
        appender.setName(tableName);
        PatternLayout layout = new PatternLayout();
        // log的输出形式
        String conversionPattern = "[%d{yyyy-MM-dd-HH-mm-ss}],%m%n";
        layout.setConversionPattern(conversionPattern);
        appender.setLayout(layout);
        // log输出路径
        if(dateTime == null){
        	dateTime = TimeDateUtil.printFormatIntTime2StrTime(TimeDateUtil.getCurrentTime(), "yyyy-MM-dd");
        }
        appender.setFile(GamePath.USER_DIR+GamePath.SEP+flowPath+GamePath.SEP+dateTime+GamePath.SEP+tableName+".log");
        // log的文字码
        appender.setEncoding("UTF-8");
        // true:在已存在log文件后面追加 false:新log覆盖以前的log
        appender.setAppend(true);
        // 适用当前配置
        appender.activateOptions();
        // 将新的Appender加到Logger中
        logger.addAppender(appender);
		return logger;
	}
	
	/**
	 * 根据表名获得logger
	 * @param tableName 表名
	 * @return 返回logger
	 */
    private static Logger getLoggerByName(String tableName) {
    	Logger logger = loggerCache.get(tableName);
    	if(logger == null){
    		//生成新的logger
    		logger = createNewLogger(tableName);
    		loggerCache.put(tableName, logger);
    	}else {
    		String time = TimeDateUtil.printFormatIntTime2StrTime(TimeDateUtil.getCurrentTime(), "yyyy-MM-dd");
    		if(dateTime == null || !time.equals(dateTime)){
    			//重新定义log输出路径
    			dateTime = time;
    			Appender appender = logger.getAppender(tableName);
    			if(appender!=null){
    				FileAppender fileAppender = (FileAppender) appender;
    				// log输出路径
    				fileAppender.setFile(GamePath.USER_DIR+GamePath.SEP+flowPath+GamePath.SEP+dateTime+GamePath.SEP+tableName+".log");
    				// 适用当前配置
    				fileAppender.activateOptions();
    			}
    		}
    	}
        return logger;
    }
    public static void tt(){
    	LogTool.info("abc", LogFlowUtil.class);
    }
    /**
     * 记录流水为日志形式
     * @param obj 流水对象
     */
    public static void recordLog(Object obj){
    	if(obj == null){
    		return;
    	}
    	FieldXml fieldXml = null;
    	Class<? extends Object> clazz = null;
		clazz = obj.getClass();
		fieldXml = OrmSqlUtil.getFieldXml(clazz);
		String tbname = fieldXml.getTbname();
		Logger logger = getLoggerByName(tbname);
		String flowData = OrmSqlUtil.makeBackstageLogformat(obj);
		logger.info(flowData);
    }
    
    /**
     * 删除一个月之前的流水日志
     * @param time
     */
    public static void deleteOldLog(int time){
    	int deleteTime = time - TimeDateUtil.ONE_DAY_INT * 30;
    	String deleteStr = TimeDateUtil.printFormatIntTime2StrTime(deleteTime, "yyyy-MM-dd");
    	deleteDir(new File(GamePath.USER_DIR+GamePath.SEP+flowPath+GamePath.SEP+deleteStr));
    }
    
    /**
     * 删除两天前的zip压缩文件
     * @param time
     */
    public static void deleteOldZipLog(int time){
    	int deleteTime = time - TimeDateUtil.ONE_DAY_INT * 2;
    	String deleteStr = TimeDateUtil.printFormatIntTime2StrTime(deleteTime, "yyyy-MM-dd");
    	//info
    	deleteDirZip(new File(GamePath.LOG_DOWNLOAD_DIR+GamePath.SEP+logPath+GamePath.SEP+"info"+GamePath.SEP+deleteStr));
    	//warn
    	deleteDirZip(new File(GamePath.LOG_DOWNLOAD_DIR+GamePath.SEP+logPath+GamePath.SEP+"warn"+GamePath.SEP+deleteStr));
    	//error
    	deleteDirZip(new File(GamePath.LOG_DOWNLOAD_DIR+GamePath.SEP+logPath+GamePath.SEP+"error"+GamePath.SEP+deleteStr));
    }
    
    /**
     * 递归删除目录下的所有文件及子目录下所有文件
     * @param dir 将要删除的文件目录
     * @return boolean Returns "true" if all deletions were successful.
     *                 If a deletion fails, the method stops attempting to
     *                 delete and returns "false".
     */
    private static boolean deleteDir(File dir) {
        if (dir.isDirectory()) {
            String[] children = dir.list();
            //递归删除目录中的子目录下
            for (int i=0; i<children.length; i++) {
        		boolean success = deleteDir(new File(dir, children[i]));
        		if (!success) {
        			return false;
        		}
            }
        }
        //目录此时为空，可以删除
        return dir.delete();
    }
    
    /**
     * 递归删除目录下的所有zip压缩文件
     * @param dir 将要删除的文件目录
     * @return boolean true删除完成，false删除失败
     */
    private static boolean deleteDirZip(File dir) {
        if (dir.isDirectory()) {
            String[] children = dir.list();
            //递归删除目录中的子目录下
            for (int i=0; i<children.length; i++) {
            	if(children[i].contains(".zip")){
            		boolean success = deleteDir(new File(dir, children[i]));
            		if (!success) {
            			return false;
            		}
            	}
            }
        }
        return true;
    }
    
    public static void main(String[] args) {
//    	Logger logger = getLoggerByName("testTable");
//    	logger.info("123");
//    	Logger logger2 = getLoggerByName("testTable");
//    	logger2.info("345");
    	
    	deleteOldZipLog(TimeDateUtil.getCurrentTime());
	}
}
