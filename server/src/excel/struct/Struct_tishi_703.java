package excel.struct;
/**
 * T_703_提示.xlsx
 */
public class Struct_tishi_703 {
    /**提示ID*/
    private int ID;
    /**系统ID
	 * 关联系统ID，XXXX代表相应的系统ID，0代表无限制*/
    private int systemid;
    /**
     * 提示ID
     */
    public int getID() {
        return ID;
    }
    /**
     * 系统ID
	 * 关联系统ID，XXXX代表相应的系统ID，0代表无限制
     */
    public int getSystemid() {
        return systemid;
    }
    public Struct_tishi_703(int ID,int systemid) {
        this.ID = ID;
        this.systemid = systemid;
    }
}