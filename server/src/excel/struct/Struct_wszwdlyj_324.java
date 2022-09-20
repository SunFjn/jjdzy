package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W-324万兽之王-登录有奖表.xlsx
 */
public class Struct_wszwdlyj_324 {
    /**索引id*/
    private int id;
    /**期数
	 * 1期：万兽之王
	 * 2期：龙飞凤舞
	 * 3期：运筹帷幄
	 * 4期：飞龙在天
	 * 5期：无极而生*/
    private int qs;
    /**登录天数*/
    private int day;
    /**奖励*/
    private int[][] reward;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
	 * 1期：万兽之王
	 * 2期：龙飞凤舞
	 * 3期：运筹帷幄
	 * 4期：飞龙在天
	 * 5期：无极而生
     */
    public int getQs() {
        return qs;
    }
    /**
     * 登录天数
     */
    public int getDay() {
        return day;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_wszwdlyj_324(int id,int qs,int day,String reward) {
        this.id = id;
        this.qs = qs;
        this.day = day;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}