package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_263_符文收集表.xlsx
 */
public class Struct_fwsj_263 {
    /**id*/
    private int id;
    /**要求数量*/
    private int num;
    /**要求品质*/
    private int pz;
    /**奖励*/
    private int[][] reward;
    /**期数
	 * 1 8-14天
	 * 2 15-21天
	 * 3 22-28天*/
    private int qs;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 要求数量
     */
    public int getNum() {
        return num;
    }
    /**
     * 要求品质
     */
    public int getPz() {
        return pz;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 期数
	 * 1 8-14天
	 * 2 15-21天
	 * 3 22-28天
     */
    public int getQs() {
        return qs;
    }
    public Struct_fwsj_263(int id,int num,int pz,String reward,int qs) {
        this.id = id;
        this.num = num;
        this.pz = pz;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.qs = qs;
    }
}