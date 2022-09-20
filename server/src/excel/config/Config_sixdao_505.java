package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sixdao_505;
public class Config_sixdao_505 extends ConfigBase<Struct_sixdao_505> {
    private static Config_sixdao_505 ins = null;
    public static Config_sixdao_505 getIns(){
        if(ins==null){
            ins = new Config_sixdao_505();
        }
        return ins;
    }
    private Config_sixdao_505(){
        put(11,new Struct_sixdao_505(11,1));
        put(12,new Struct_sixdao_505(12,1));
        put(13,new Struct_sixdao_505(13,1));
        put(14,new Struct_sixdao_505(14,1));
        put(15,new Struct_sixdao_505(15,1));
        put(16,new Struct_sixdao_505(16,1));
        put(21,new Struct_sixdao_505(21,1));
        put(22,new Struct_sixdao_505(22,1));
        put(23,new Struct_sixdao_505(23,1));
        put(24,new Struct_sixdao_505(24,1));
        put(25,new Struct_sixdao_505(25,1));
        put(26,new Struct_sixdao_505(26,1));
        put(31,new Struct_sixdao_505(31,2));
        put(32,new Struct_sixdao_505(32,2));
        put(33,new Struct_sixdao_505(33,2));
        put(34,new Struct_sixdao_505(34,2));
        put(35,new Struct_sixdao_505(35,2));
        put(36,new Struct_sixdao_505(36,2));
        put(41,new Struct_sixdao_505(41,3));
        put(42,new Struct_sixdao_505(42,3));
        put(43,new Struct_sixdao_505(43,3));
        put(44,new Struct_sixdao_505(44,3));
        put(45,new Struct_sixdao_505(45,3));
        put(46,new Struct_sixdao_505(46,3));
        put(51,new Struct_sixdao_505(51,4));
        put(52,new Struct_sixdao_505(52,4));
        put(53,new Struct_sixdao_505(53,4));
        put(54,new Struct_sixdao_505(54,4));
        put(55,new Struct_sixdao_505(55,4));
        put(56,new Struct_sixdao_505(56,4));
        put(61,new Struct_sixdao_505(61,5));
        put(62,new Struct_sixdao_505(62,5));
        put(63,new Struct_sixdao_505(63,5));
        put(64,new Struct_sixdao_505(64,5));
        put(65,new Struct_sixdao_505(65,5));
        put(66,new Struct_sixdao_505(66,5));
    }
    public void reset(){
        ins = null;
    }
}