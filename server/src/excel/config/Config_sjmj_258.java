package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sjmj_258;
public class Config_sjmj_258 extends ConfigBase<Struct_sjmj_258> {
    private static Config_sjmj_258 ins = null;
    public static Config_sjmj_258 getIns(){
        if(ins==null){
            ins = new Config_sjmj_258();
        }
        return ins;
    }
    private Config_sjmj_258(){
        put(1,new Struct_sjmj_258(1,1,1));
        put(2,new Struct_sjmj_258(2,200,2));
        put(3,new Struct_sjmj_258(3,4,3));
        put(4,new Struct_sjmj_258(4,100,4));
        put(5,new Struct_sjmj_258(5,35,5));
        put(6,new Struct_sjmj_258(6,180,6));
        put(7,new Struct_sjmj_258(7,240,7));
    }
    public void reset(){
        ins = null;
    }
}