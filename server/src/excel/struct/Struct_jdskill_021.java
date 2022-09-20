package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_021_家丁技能表.xlsx
 */
public class Struct_jdskill_021 {
    /**技能ID*/
    private int[][] skill;
    /**参数1
	 * 要除以100000*/
    private int canshu1;
    /**参数2
	 * 要除以100000*/
    private int canshu2;
    /**
     * 技能ID
     */
    public int[][] getSkill() {
        return skill;
    }
    /**
     * 参数1
	 * 要除以100000
     */
    public int getCanshu1() {
        return canshu1;
    }
    /**
     * 参数2
	 * 要除以100000
     */
    public int getCanshu2() {
        return canshu2;
    }
    public Struct_jdskill_021(String skill,int canshu1,int canshu2) {
        this.skill = ExcelJsonUtils.toObj(skill,int[][].class);
        this.canshu1 = canshu1;
        this.canshu2 = canshu2;
    }
}