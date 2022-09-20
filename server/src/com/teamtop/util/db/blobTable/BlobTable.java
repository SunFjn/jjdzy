package com.teamtop.util.db.blobTable;

import com.teamtop.util.db.trans.crossTrans.CrossTrans;

public class BlobTable {
	private long id;
	private byte[] data;
	private String tbname;
	
	public String getTbname() {
		return tbname;
	}
	public void setTbname(String tbname) {
		this.tbname = tbname;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public byte[] getData() {
		return data;
	}
	public void setData(byte[] data) {
		this.data = data;
	}
	public BlobTable() {
		super();
	}
	public BlobTable(String tbname,Object obj) {
		super();
		byte[] write = CrossTrans.write(obj, obj.getClass());
		this.data = write;
		this.tbname = tbname;
	}
}
