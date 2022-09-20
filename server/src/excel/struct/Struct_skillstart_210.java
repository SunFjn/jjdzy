package excel.struct;
/**
 * J_210_技能开启表.xlsx
 */
public class Struct_skillstart_210 {
    /**技能位置*/
    private int id;
    /**开启条件
	 * jingyu:
	 * 技能位置为关卡开启
	 * 参数=通关关数*/
    private int start;
    /**
     * 技能位置
     */
    public int getId() {
        return id;
    }
    /**
     * 开启条件
	 * jingyu:
	 * 技能位置为关卡开启
	 * 参数=通关关数
     */
    public int getStart() {
        return start;
    }
    public Struct_skillstart_210(int id,int start) {
        this.id = id;
        this.start = start;
    }
}