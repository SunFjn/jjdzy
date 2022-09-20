package excel.struct;
/**
 * J_200_经验加成表.xlsx
 */
public class Struct_expup_200 {
    /**索引id*/
    private int id;
    /**类型
	 * jingyu:
	 * 1：称号
	 * 2：特权卡*/
    private int type;
    /**条件
	 * jingyu:
	 * 1：称号id
	 * 2：特权卡id*/
    private int tj;
    /**经验加成百分比*/
    private int up;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 类型
	 * jingyu:
	 * 1：称号
	 * 2：特权卡
     */
    public int getType() {
        return type;
    }
    /**
     * 条件
	 * jingyu:
	 * 1：称号id
	 * 2：特权卡id
     */
    public int getTj() {
        return tj;
    }
    /**
     * 经验加成百分比
     */
    public int getUp() {
        return up;
    }
    public Struct_expup_200(int id,int type,int tj,int up) {
        this.id = id;
        this.type = type;
        this.tj = tj;
        this.up = up;
    }
}