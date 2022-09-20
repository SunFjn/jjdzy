package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sonshow_267;
public class Config_sonshow_267 extends ConfigBase<Struct_sonshow_267> {
    private static Config_sonshow_267 ins = null;
    public static Config_sonshow_267 getIns(){
        if(ins==null){
            ins = new Config_sonshow_267();
        }
        return ins;
    }
    private Config_sonshow_267(){
        put(480101,new Struct_sonshow_267(480101,1,"[[102,480000],[103,8000],[104,8000]]","[[1,472001,1]]",100));
        put(480201,new Struct_sonshow_267(480201,2,"[[102,480000],[103,8000],[104,8000]]","[[1,472002,1]]",100));
        put(480301,new Struct_sonshow_267(480301,3,"[[102,480000],[103,8000],[104,8000]]","[[1,472003,1]]",100));
        put(480401,new Struct_sonshow_267(480401,4,"[[102,480000],[103,8000],[104,8000]]","[[1,472004,1]]",100));
        put(480501,new Struct_sonshow_267(480501,5,"[[102,2400000],[103,40000],[104,40000]]","[[1,472005,1]]",100));
    }
    public void reset(){
        ins = null;
    }
}