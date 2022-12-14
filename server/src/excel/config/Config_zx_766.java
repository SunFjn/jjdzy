package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zx_766;
public class Config_zx_766 extends ConfigBase<Struct_zx_766> {
    private static Config_zx_766 ins = null;
    public static Config_zx_766 getIns(){
        if(ins==null){
            ins = new Config_zx_766();
        }
        return ins;
    }
    private Config_zx_766(){
        put(1000,new Struct_zx_766(1000,1001,10010,"[[102,0],[107,0],[108,0]]",0,0,"[[0,0]]","[[1,446101,1]]"));
        put(1001,new Struct_zx_766(1001,1002,10020,"[[102,4000000],[112,500],[113,500]]",5000,8000,"[[30000,20000]]","[[1,446101,1]]"));
        put(1002,new Struct_zx_766(1002,1003,10030,"[[102,8000000],[112,1000],[113,1000]]",10000,16000,"[[33000,22000]]","[[1,446101,1]]"));
        put(1003,new Struct_zx_766(1003,1004,10040,"[[102,12000000],[112,1500],[113,1500]]",13000,24000,"[[35000,25000]]","[[1,446101,2]]"));
        put(1004,new Struct_zx_766(1004,1005,10050,"[[102,20000000],[112,2000],[113,2000]]",16000,30000,"[[38000,27000]]","[[1,446101,2]]"));
        put(1005,new Struct_zx_766(1005,1006,10060,"[[102,28000000],[112,2500],[113,2500]]",19000,35000,"[[40000,30000]]","[[1,446101,2]]"));
        put(1006,new Struct_zx_766(1006,1007,10070,"[[102,36000000],[112,3000],[113,3000]]",22000,40000,"[[43000,32000]]","[[1,446101,3]]"));
        put(1007,new Struct_zx_766(1007,1008,10080,"[[102,48000000],[112,3500],[113,3500]]",24000,45000,"[[45000,35000]]","[[1,446101,3]]"));
        put(1008,new Struct_zx_766(1008,1009,10090,"[[102,61000000],[112,4000],[113,4000]]",26000,50000,"[[48000,37000]]","[[1,446101,3]]"));
        put(1009,new Struct_zx_766(1009,1010,10100,"[[102,73000000],[112,4500],[113,4500]]",28000,55000,"[[50000,40000]]","[[1,446101,4]]"));
        put(1010,new Struct_zx_766(1010,1011,10120,"[[102,93000000],[112,5000],[113,5000]]",30000,60000,"[[53000,42000]]","[[1,446101,4]]"));
        put(1011,new Struct_zx_766(1011,1012,10140,"[[102,113000000],[112,5500],[113,5500]]",32000,64000,"[[55000,45000]]","[[1,446101,4]]"));
        put(1012,new Struct_zx_766(1012,1013,10160,"[[102,133000000],[112,6000],[113,6000]]",34000,68000,"[[58000,47000]]","[[1,446101,5]]"));
        put(1013,new Struct_zx_766(1013,1014,10180,"[[102,161000000],[112,6500],[113,6500]]",36000,72000,"[[60000,50000]]","[[1,446101,5]]"));
        put(1014,new Struct_zx_766(1014,1015,10200,"[[102,190000000],[112,7000],[113,7000]]",38000,76000,"[[63000,52000]]","[[1,446101,7]]"));
        put(1015,new Struct_zx_766(1015,1016,10220,"[[102,218000000],[112,7500],[113,7500]]",40000,80000,"[[65000,55000]]","[[1,446101,7]]"));
        put(1016,new Struct_zx_766(1016,1017,10240,"[[102,258000000],[112,8000],[113,8000]]",42000,84000,"[[68000,57000]]","[[1,446101,10]]"));
        put(1017,new Struct_zx_766(1017,1018,10260,"[[102,299000000],[112,8500],[113,8500]]",44000,88000,"[[70000,60000]]","[[1,446101,10]]"));
        put(1018,new Struct_zx_766(1018,1019,10280,"[[102,339000000],[112,9000],[113,9000]]",46000,92000,"[[73000,62000]]","[[1,446101,12]]"));
        put(1019,new Struct_zx_766(1019,1020,10300,"[[102,387000000],[112,9500],[113,9500]]",48000,96000,"[[77000,66000]]","[[1,446101,14]]"));
        put(1020,new Struct_zx_766(1020,0,0,"[[102,448000000],[112,10000],[113,10000]]",50000,100000,"[[80000,70000]]","0"));
    }
    public void reset(){
        ins = null;
    }
}