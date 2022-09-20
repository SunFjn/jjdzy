package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_paihangbang_711;
public class Config_paihangbang_711 extends ConfigBase<Struct_paihangbang_711> {
    private static Config_paihangbang_711 ins = null;
    public static Config_paihangbang_711 getIns(){
        if(ins==null){
            ins = new Config_paihangbang_711();
        }
        return ins;
    }
    private Config_paihangbang_711(){
        put(1,new Struct_paihangbang_711(1,21,0));
        put(2,new Struct_paihangbang_711(2,22,0));
        put(3,new Struct_paihangbang_711(3,23,0));
        put(4,new Struct_paihangbang_711(4,24,0));
        put(5,new Struct_paihangbang_711(5,25,0));
        put(6,new Struct_paihangbang_711(6,26,0));
        put(7,new Struct_paihangbang_711(7,27,0));
        put(8,new Struct_paihangbang_711(8,28,0));
        put(9,new Struct_paihangbang_711(9,29,0));
        put(10,new Struct_paihangbang_711(10,30,0));
        put(11,new Struct_paihangbang_711(11,31,0));
        put(12,new Struct_paihangbang_711(12,32,0));
        put(13,new Struct_paihangbang_711(13,33,0));
    }
    public void reset(){
        ins = null;
    }
}