package com.teamtop.system.global;

import com.teamtop.util.cache.CacheModel;

/**
 * @author Sam
 * 公共数据
 */
public class GlobalData extends CacheModel{

	private long id;
	/**
	 * 系统类型
	 */
	private int type;
	/**
	 * 数据   
	 */
	private String content;
	/**
	 * 插入时间
	 */
	private int insertTime;
	/**
	 * 过期时间
	 */
	private int invalidTime;
	
	private int zoneid;
	
	public GlobalData() {
		super();
	}
	public GlobalData(int type,String contend){
		super();
		this.type = type;
		this.content = contend;
	}
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getInsertTime() {
		return insertTime;
	}

	public void setInsertTime(int insertTime) {
		this.insertTime = insertTime;
	}

	public String getContent() {
		// try {
		// return ZipUtils.gzipDecompress(content);
		// } catch (IOException e) {
		// LogTool.error(e, GlobalData.class, "");
		// }
		return content;
	}
	public int getContentToInt() {
		return Integer.parseInt( content);
	}

	public void setContent(String content) {
		// String tempContent = "";
		// try {
		// tempContent = ZipUtils.gzipCompress(content);
		// } catch (IOException e) {
		// LogTool.error(e, GlobalData.class, "");
		// }
		this.content = content;
	}
	public void setContentByInt(int conInt) {
		this.content = conInt+"";
	}

	public int getInvalidTime() {
		return invalidTime;
	}

	public void setInvalidTime(int invalidTime) {
		this.invalidTime = invalidTime;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

}
