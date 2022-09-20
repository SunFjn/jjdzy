package com.teamtop.system.hero;

import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class SpecialRechargeInfo {
	@FieldOrder(order = 1)
	private long hid;
	@FieldOrder(order = 2)
	private byte gm;
	@FieldOrder(order = 3)
	private long product_id;
	@FieldOrder(order = 4)
	private Map<String, String> paramMap;
	@FieldOrder(order = 5)
	private String parameters;

	public SpecialRechargeInfo() {
		// TODO Auto-generated constructor stub
	}

	public SpecialRechargeInfo(long hid, byte gm, long product_id, Map<String, String> paramMap,
			String parameters) {
		super();
		this.hid = hid;
		this.gm = gm;
		this.product_id = product_id;
		this.paramMap = paramMap;
		this.parameters = parameters;
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public byte getGm() {
		return gm;
	}

	public void setGm(byte gm) {
		this.gm = gm;
	}

	public long getProduct_id() {
		return product_id;
	}

	public void setProduct_id(long product_id) {
		this.product_id = product_id;
	}

	public Map<String, String> getParamMap() {
		return paramMap;
	}

	public void setParamMap(Map<String, String> paramMap) {
		this.paramMap = paramMap;
	}

	public String getParameters() {
		return parameters;
	}

	public void setParameters(String parameters) {
		this.parameters = parameters;
	}

}
