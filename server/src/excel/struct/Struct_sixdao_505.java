package excel.struct;
/**
 * L_505_六道表.xlsx
 */
public class Struct_sixdao_505 {
    /**部位id
	 * 天道id*10+部位id*/
    private int id;
    /**开启条件（轮回id）*/
    private int lh;
    /**
     * 部位id
	 * 天道id*10+部位id
     */
    public int getId() {
        return id;
    }
    /**
     * 开启条件（轮回id）
     */
    public int getLh() {
        return lh;
    }
    public Struct_sixdao_505(int id,int lh) {
        this.id = id;
        this.lh = lh;
    }
}