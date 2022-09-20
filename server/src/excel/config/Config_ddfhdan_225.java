package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ddfhdan_225;
public class Config_ddfhdan_225 extends ConfigBase<Struct_ddfhdan_225> {
    private static Config_ddfhdan_225 ins = null;
    public static Config_ddfhdan_225 getIns(){
        if(ins==null){
            ins = new Config_ddfhdan_225();
        }
        return ins;
    }
    private Config_ddfhdan_225(){
        put(1,new Struct_ddfhdan_225(1,150,"0"));
        put(2,new Struct_ddfhdan_225(2,450,"[[1,400025,2],[1,410017,500],[1,400175,200],[1,410002,10],[3,0,1200000],[9,0,100000]]"));
        put(3,new Struct_ddfhdan_225(3,900,"[[1,400027,2],[1,410017,1000],[1,400175,400],[1,410002,20],[3,0,2300000],[9,0,100000]]"));
        put(4,new Struct_ddfhdan_225(4,1200,"[[1,400029,2],[1,410017,1500],[1,400175,550],[1,410002,30],[3,0,3500000],[9,0,200000]]"));
        put(5,new Struct_ddfhdan_225(5,0,"[[1,400031,2],[1,410017,2000],[1,400175,800],[1,410002,40],[3,0,4700000],[9,0,300000]]"));
    }
    public void reset(){
        ins = null;
    }
}