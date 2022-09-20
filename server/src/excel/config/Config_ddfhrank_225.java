package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ddfhrank_225;
public class Config_ddfhrank_225 extends ConfigBase<Struct_ddfhrank_225> {
    private static Config_ddfhrank_225 ins = null;
    public static Config_ddfhrank_225 getIns(){
        if(ins==null){
            ins = new Config_ddfhrank_225();
        }
        return ins;
    }
    private Config_ddfhrank_225(){
        put(101,new Struct_ddfhrank_225(101,"[[1,1]]","[[1,410017,2000],[3,0,880000],[9,0,168000]]"));
        put(102,new Struct_ddfhrank_225(102,"[[2,2]]","[[1,410017,1500],[3,0,880000],[9,0,128000]]"));
        put(103,new Struct_ddfhrank_225(103,"[[3,3]]","[[1,410017,1000],[3,0,880000],[9,0,128000]]"));
        put(104,new Struct_ddfhrank_225(104,"[[4,5]]","[[1,410017,800],[3,0,660000],[9,0,88000]]"));
        put(105,new Struct_ddfhrank_225(105,"[[6,10]]","[[1,410017,500],[3,0,280000],[9,0,66000]]"));
        put(201,new Struct_ddfhrank_225(201,"[[1,1]]","[[1,410017,8000],[3,0,1888000],[9,0,288000]]"));
        put(202,new Struct_ddfhrank_225(202,"[[2,2]]","[[1,410017,6000],[3,0,1288000],[9,0,188000]]"));
        put(203,new Struct_ddfhrank_225(203,"[[3,3]]","[[1,410017,4000],[3,0,1288000],[9,0,188000]]"));
        put(204,new Struct_ddfhrank_225(204,"[[4,10]]","[[1,410017,3000],[3,0,888000],[9,0,128000]]"));
        put(205,new Struct_ddfhrank_225(205,"[[11,20]]","[[1,410017,1600],[3,0,666000],[9,0,88000]]"));
        put(206,new Struct_ddfhrank_225(206,"[[21,30]]","[[1,410017,1000],[3,0,288000],[9,0,58000]]"));
    }
    public void reset(){
        ins = null;
    }
}