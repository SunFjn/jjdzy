package com.teamtop.system.shaozhuEscort;

import java.util.TreeSet;

import com.teamtop.system.shaozhuEscort.model.ShaoZhuEscortInfo;

public class ShaoZhuEscortCache {
	private TreeSet<ShaoZhuEscortInfo> shaozhuEscortInfoTreeSet = new TreeSet<>();

	public TreeSet<ShaoZhuEscortInfo> getShaozhuEscortInfoTreeSet() {
		return shaozhuEscortInfoTreeSet;
	}

	public void setShaozhuEscortInfoTreeSet(TreeSet<ShaoZhuEscortInfo> shaozhuEscortInfoTreeSet) {
		this.shaozhuEscortInfoTreeSet = shaozhuEscortInfoTreeSet;
	}
}
