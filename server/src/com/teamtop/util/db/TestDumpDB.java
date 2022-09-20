package com.teamtop.util.db;

public class TestDumpDB {

	public static void main(String[] args) {

		int zid = 1;
		String duankou = "9999";//文件夹名
		String databaseName = "sgzj_"+zid;//库名
		String cd = "cd /data/sgzjgame/sgzjserver/"+duankou+"/";
		String orderStr = "mysqldump -usgzjguser -p'sgzj_ZTRlNTY5YTI4N2E0NWI1MzJiNzhkYjAx' "+databaseName+" "
				+ "--ignore-table="+databaseName+".b_flowheromoney --ignore-table="+databaseName+".b_flowtool "
						+ "--ignore-table="+databaseName+".b_flowherostrength --ignore-table="+databaseName+".b_flowheroexp "
								+ "--ignore-table="+databaseName+".b_flowheroattr --ignore-table="+databaseName+".b_flowmail "
										+ "--ignore-table="+databaseName+".b_flowherostrengthxifen --ignore-table="+databaseName+".m_flowlogininfo "
												+ "--ignore-table="+databaseName+".m_admonitorflow --ignore-table="+databaseName+".b_flowequip "
														+ "--ignore-table="+databaseName+".b_flowfuwen --ignore-table="+databaseName+".m_loginout "
																+ "--ignore-table="+databaseName+".m_mallconsume --skip-lock-tables > "+databaseName+".sql";
		System.out.println( cd+"\n"+orderStr);
	}

}
