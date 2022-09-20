package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cjdjxs1_010;
public class Config_cjdjxs1_010 extends ConfigBase<Struct_cjdjxs1_010> {
    private static Config_cjdjxs1_010 ins = null;
    public static Config_cjdjxs1_010 getIns(){
        if(ins==null){
            ins = new Config_cjdjxs1_010();
        }
        return ins;
    }
    private Config_cjdjxs1_010(){
        put(1,new Struct_cjdjxs1_010(1,1,1));
        put(2,new Struct_cjdjxs1_010(2,1,2));
        put(3,new Struct_cjdjxs1_010(3,1,3));
        put(4,new Struct_cjdjxs1_010(4,1,4));
        put(5,new Struct_cjdjxs1_010(5,1,5));
        put(6,new Struct_cjdjxs1_010(6,1,6));
        put(7,new Struct_cjdjxs1_010(7,1,7));
        put(8,new Struct_cjdjxs1_010(8,1,8));
        put(9,new Struct_cjdjxs1_010(9,2,1));
        put(10,new Struct_cjdjxs1_010(10,2,2));
        put(11,new Struct_cjdjxs1_010(11,2,3));
        put(12,new Struct_cjdjxs1_010(12,2,4));
        put(13,new Struct_cjdjxs1_010(13,2,5));
        put(14,new Struct_cjdjxs1_010(14,2,6));
        put(15,new Struct_cjdjxs1_010(15,2,7));
        put(16,new Struct_cjdjxs1_010(16,2,8));
        put(31,new Struct_cjdjxs1_010(31,3,1));
        put(32,new Struct_cjdjxs1_010(32,3,2));
        put(33,new Struct_cjdjxs1_010(33,3,3));
        put(34,new Struct_cjdjxs1_010(34,3,4));
        put(35,new Struct_cjdjxs1_010(35,3,5));
        put(36,new Struct_cjdjxs1_010(36,3,6));
        put(37,new Struct_cjdjxs1_010(37,3,7));
        put(38,new Struct_cjdjxs1_010(38,3,8));
        put(39,new Struct_cjdjxs1_010(39,4,1));
        put(40,new Struct_cjdjxs1_010(40,4,2));
        put(41,new Struct_cjdjxs1_010(41,4,3));
        put(42,new Struct_cjdjxs1_010(42,4,4));
        put(43,new Struct_cjdjxs1_010(43,4,5));
        put(44,new Struct_cjdjxs1_010(44,4,6));
        put(45,new Struct_cjdjxs1_010(45,4,7));
        put(46,new Struct_cjdjxs1_010(46,4,8));
        put(47,new Struct_cjdjxs1_010(47,5,1));
        put(48,new Struct_cjdjxs1_010(48,5,2));
        put(49,new Struct_cjdjxs1_010(49,5,3));
        put(50,new Struct_cjdjxs1_010(50,5,4));
        put(51,new Struct_cjdjxs1_010(51,5,5));
        put(52,new Struct_cjdjxs1_010(52,5,6));
        put(53,new Struct_cjdjxs1_010(53,5,7));
        put(54,new Struct_cjdjxs1_010(54,5,8));
    }
    public void reset(){
        ins = null;
    }
}