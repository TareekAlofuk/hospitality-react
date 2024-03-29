import axios from "axios";
import { DataFetcherBase, FetcherOptions} from "@autofiy/rac-core";

interface Options extends FetcherOptions{
    method?: any;
    url : string;
}

class ReportByItemFetcher extends  DataFetcherBase<Options>{
    protected async fetchData(): Promise<any> {

        let  data:any = await axios({
            method: this.getOptions().method ?? 'get',
            url: this.getOptions().url
        });
        console.log(data)

        data = data.data
        data.sort((a:any , b:any )=>{return  b.count -  a.count })

        return data;
    }
}

export default ReportByItemFetcher
