package com.teamtop.system.friends;


import java.util.Comparator;

import com.teamtop.system.friends.model.FriendModel;

/**
 * 好友排序
 * @author Administrator
 *
 */
public class FriendComparable implements Comparator<FriendModel> {

	@Override
	public int compare(FriendModel friend1, FriendModel friend2) {
		/**
		if(friend2.getRelationship() == 3){
			return 1;
		}
		if(friend1.getRelationship() == 3) {
			return -1;
		}
		int ret = friend2.getOnlineState() - friend1.getOnlineState();
		if(ret != 0)
			return ret;
		ret = friend2.getRelationship() - friend1.getRelationship();
		if(ret != 0)
			return ret;
		*/
		return friend1.getName().compareTo(friend2.getName());
	}

}