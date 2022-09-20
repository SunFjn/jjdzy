package excel.struct;
/**
 * B_236_宝库表.xlsx
 */
public class Struct_bk_236 {
    /**id*/
    private int id;
    /**宝库名字*/
    private String name;
    /**兑换道具*/
    private int item;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 宝库名字
     */
    public String getName() {
        return name;
    }
    /**
     * 兑换道具
     */
    public int getItem() {
        return item;
    }
    public Struct_bk_236(int id,String name,int item) {
        this.id = id;
        this.name = name;
        this.item = item;
    }
}