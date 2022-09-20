package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sghyyl_261;
public class Config_sghyyl_261 extends ConfigBase<Struct_sghyyl_261> {
    private static Config_sghyyl_261 ins = null;
    public static Config_sghyyl_261 getIns(){
        if(ins==null){
            ins = new Config_sghyyl_261();
        }
        return ins;
    }
    private Config_sghyyl_261(){
        put(1,new Struct_sghyyl_261(1,1,1803,"[1,416005,1,1000],[1,416004,1,20000]"));
        put(2,new Struct_sghyyl_261(2,1,1804,"[1,416005,1,7000],[1,416004,1,100000]"));
        put(3,new Struct_sghyyl_261(3,1,1805,"[1,416005,1,10000],[1,416004,1,100000]"));
        put(4,new Struct_sghyyl_261(4,2,1803,"[1,416005,1,1000],[1,416004,1,20000]"));
        put(5,new Struct_sghyyl_261(5,2,1804,"[1,416005,1,7000],[1,416004,1,100000]"));
        put(6,new Struct_sghyyl_261(6,2,1805,"[1,416005,1,10000],[1,416004,1,100000]"));
        put(7,new Struct_sghyyl_261(7,3,1803,"[1,416005,1,1000],[1,416004,1,20000]"));
        put(8,new Struct_sghyyl_261(8,3,1804,"[1,416005,1,7000],[1,416004,1,100000]"));
        put(9,new Struct_sghyyl_261(9,3,1805,"[1,416005,1,10000],[1,416004,1,100000]"));
        put(10,new Struct_sghyyl_261(10,4,1803,"[1,416005,1,1000],[1,416004,1,20000]"));
        put(11,new Struct_sghyyl_261(11,4,1804,"[1,416005,1,7000],[1,416004,1,100000]"));
        put(12,new Struct_sghyyl_261(12,4,1805,"[1,416005,1,10000],[1,416004,1,100000]"));
        put(13,new Struct_sghyyl_261(13,5,1803,"[1,416005,1,1000],[1,416004,1,20000]"));
        put(14,new Struct_sghyyl_261(14,5,1804,"[1,416005,1,7000],[1,416004,1,100000]"));
        put(15,new Struct_sghyyl_261(15,5,1805,"[1,416005,1,10000],[1,416004,1,100000]"));
        put(16,new Struct_sghyyl_261(16,6,1803,"[1,416005,1,1000],[1,416004,1,20000]"));
        put(17,new Struct_sghyyl_261(17,6,1804,"[1,416005,1,7000],[1,416004,1,100000]"));
        put(18,new Struct_sghyyl_261(18,6,1805,"[1,416005,1,10000],[1,416004,1,100000]"));
        put(19,new Struct_sghyyl_261(19,7,1803,"[1,416005,1,1000],[1,416004,1,20000]"));
        put(20,new Struct_sghyyl_261(20,7,1804,"[1,416005,1,7000],[1,416004,1,100000]"));
        put(21,new Struct_sghyyl_261(21,7,1805,"[1,416005,1,10000],[1,416004,1,100000]"));
        put(22,new Struct_sghyyl_261(22,8,1803,"[1,416005,1,1000],[1,416004,1,20000]"));
        put(23,new Struct_sghyyl_261(23,8,1804,"[1,416005,1,7000],[1,416004,1,100000]"));
        put(24,new Struct_sghyyl_261(24,8,1805,"[1,416005,1,10000],[1,416004,1,100000]"));
    }
    public void reset(){
        ins = null;
    }
}