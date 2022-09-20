package excel.struct;
/**
 * S_750_专属神兵-皮肤表.xlsx
 */
public class Struct_sbpf_750 {
    /**皮肤id
	 * 
	 * Axxx
	 * 
	 * A：武将职业  支持两位数
	 * 
	 * 5xx：具体皮肤编号
	 * */
    private int id;
    /**激活条件
	 * 淬炼等级*/
    private int tj;
    /**
     * 皮肤id
	 * 
	 * Axxx
	 * 
	 * A：武将职业  支持两位数
	 * 
	 * 5xx：具体皮肤编号
	 * 
     */
    public int getId() {
        return id;
    }
    /**
     * 激活条件
	 * 淬炼等级
     */
    public int getTj() {
        return tj;
    }
    public Struct_sbpf_750(int id,int tj) {
        this.id = id;
        this.tj = tj;
    }
}