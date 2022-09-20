package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_272_少主活动七日目标表.xlsx
 */
public class Struct_scqrmb_272 {
    /**id
	 * 1XXX：少主升星
	 * 2XXX：亲密度
	 * 3XXX：技能洗练
	 * 4XXX：技能星级
	 * 5XXX：少主战力
	 * */
    private int id;
    /**参数1*/
    private int c1;
    /**参数2*/
    private int c2;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * 1XXX：少主升星
	 * 2XXX：亲密度
	 * 3XXX：技能洗练
	 * 4XXX：技能星级
	 * 5XXX：少主战力
	 * 
     */
    public int getId() {
        return id;
    }
    /**
     * 参数1
     */
    public int getC1() {
        return c1;
    }
    /**
     * 参数2
     */
    public int getC2() {
        return c2;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_scqrmb_272(int id,int c1,int c2,String reward) {
        this.id = id;
        this.c1 = c1;
        this.c2 = c2;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}