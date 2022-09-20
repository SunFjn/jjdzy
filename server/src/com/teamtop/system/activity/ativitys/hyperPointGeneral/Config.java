package com.teamtop.system.activity.ativitys.hyperPointGeneral;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;

import excel.struct.Struct_cjdj1_010;

public class Config {
//	private List<ProbabilityEventModel> pmList = new ArrayList<>();
	private List<Struct_cjdj1_010> configList = new ArrayList<>();

//	public List<ProbabilityEventModel> getPmList() {
//		return pmList;
//	}
//
//	public void setPmList(List<ProbabilityEventModel> pmList) {
//		this.pmList = pmList;
//	}

	public List<Struct_cjdj1_010> getConfigList() {
		return configList;
	}

	public void setConfigList(List<Struct_cjdj1_010> configList) {
		this.configList = configList;
	}
}
