package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_gjbsgr_738;
public class Config_gjbsgr_738 extends ConfigBase<Struct_gjbsgr_738> {
    private static Config_gjbsgr_738 ins = null;
    public static Config_gjbsgr_738 getIns(){
        if(ins==null){
            ins = new Config_gjbsgr_738();
        }
        return ins;
    }
    private Config_gjbsgr_738(){
        put(1,new Struct_gjbsgr_738(1,"[[1,1]]","[[11,0,800],[1,410001,1000],[1,400148,10]]"));
        put(2,new Struct_gjbsgr_738(2,"[[2,2]]","[[11,0,600],[1,410001,1000],[1,400148,8]]"));
        put(3,new Struct_gjbsgr_738(3,"[[3,3]]","[[11,0,600],[1,410001,800],[1,400148,8]]"));
        put(4,new Struct_gjbsgr_738(4,"[[4,6]]","[[11,0,400],[1,410001,800],[1,400148,5]]"));
        put(5,new Struct_gjbsgr_738(5,"[[7,10]]","[[11,0,400],[1,410001,600],[1,400148,3]]"));
    }
    public void reset(){
        ins = null;
    }
}