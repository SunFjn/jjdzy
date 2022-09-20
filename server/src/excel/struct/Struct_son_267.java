package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-267-少主表.xlsx
 */
public class Struct_son_267 {
    /**少主id*/
    private int id;
    /**少主名字*/
    private String name;
    /**品质*/
    private int pz;
    /**亲密度道具
	 * A,B
	 * A=道具id
	 * B=提升亲密度经验*/
    private int[][] qm;
    /**技能*/
    private int[][] skill;
    /**
     * 少主id
     */
    public int getId() {
        return id;
    }
    /**
     * 少主名字
     */
    public String getName() {
        return name;
    }
    /**
     * 品质
     */
    public int getPz() {
        return pz;
    }
    /**
     * 亲密度道具
	 * A,B
	 * A=道具id
	 * B=提升亲密度经验
     */
    public int[][] getQm() {
        return qm;
    }
    /**
     * 技能
     */
    public int[][] getSkill() {
        return skill;
    }
    public Struct_son_267(int id,String name,int pz,String qm,String skill) {
        this.id = id;
        this.name = name;
        this.pz = pz;
        this.qm = ExcelJsonUtils.toObj(qm,int[][].class);
        this.skill = ExcelJsonUtils.toObj(skill,int[][].class);
    }
}