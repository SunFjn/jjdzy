package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sonqy_267;
public class Config_sonqy_267 extends ConfigBase<Struct_sonqy_267> {
    private static Config_sonqy_267 ins = null;
    public static Config_sonqy_267 getIns(){
        if(ins==null){
            ins = new Config_sonqy_267();
        }
        return ins;
    }
    private Config_sonqy_267(){
        put(1,new Struct_sonqy_267(1,"[1,410054,5,10300,0;1,410055,1,8300,0;1,412001,1,5500,0;1,412003,1,4500,0;1,412005,1,5200,0;1,412013,1,4800,0;1,412009,1,4800,0;1,412011,1,3400,0;1,412007,1,4100,0;1,410065,1,49100,0]"));
    }
    public void reset(){
        ins = null;
    }
}