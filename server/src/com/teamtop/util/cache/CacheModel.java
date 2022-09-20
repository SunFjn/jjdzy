package com.teamtop.util.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.annotation.JSONField;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.log.LogTool;
/**
 * 用于方便生成insert语句和做定时入库
 * @author kyle
 *
 */
public class CacheModel {
	private Logger logger = LoggerFactory.getLogger(CacheModel.class);
	private int syncTime;// 同步时间
	@JSONField(serialize = false)
	private transient String insertSql;// 用于生成insert语句
	private boolean insertSupper;

	public boolean isInsertSupper() {
		return insertSupper;
	}

	public void setInsertSupper(boolean insertSupper) {
		this.insertSupper = insertSupper;
	}


	public int getSyncTime() {
		return syncTime;
	}

	public void setSyncTime(int syncTime) {
		this.syncTime = syncTime;
	}

	public CacheModel() {
		super();
	}

	public String getInsertSql() {
		try {
			if(insertSupper){
				insertSql = OrmSqlUtil.makeInsert(this,this.getClass().getSuperclass(),true);
			}else{
				insertSql = OrmSqlUtil.makeInsert(this,true);
			}
			return insertSql;
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
			return null;
		}
	}


}
