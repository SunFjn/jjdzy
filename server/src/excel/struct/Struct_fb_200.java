package excel.struct;
/**
 * F_200_副本表.xlsx
 */
public class Struct_fb_200 {
    /**索引id*/
    private int id;
    /**系统id*/
    private int sysid;
    /**子副本*/
    private int sub;
    /**类型
	 * 
	 * 1.PVE（PVE有BOSS大血条，以及奖励展示）
	 * 2.PVP（PVP无BOSS大血条，没有奖励展示）*/
    private int type;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 系统id
     */
    public int getSysid() {
        return sysid;
    }
    /**
     * 子副本
     */
    public int getSub() {
        return sub;
    }
    /**
     * 类型
	 * 
	 * 1.PVE（PVE有BOSS大血条，以及奖励展示）
	 * 2.PVP（PVP无BOSS大血条，没有奖励展示）
     */
    public int getType() {
        return type;
    }
    public Struct_fb_200(int id,int sysid,int sub,int type) {
        this.id = id;
        this.sysid = sysid;
        this.sub = sub;
        this.type = type;
    }
}